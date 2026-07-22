/*
 * Cedar Hollow — form submission handler.
 *
 * The site is a static Webflow export, so Webflow's own form backend no longer
 * receives submissions. This script intercepts every Webflow form (.w-form) and
 * POSTs it to the self-hosted form-handler service instead, then shows Webflow's
 * existing success (.w-form-done) or error (.w-form-fail) message.
 */
(function () {
  "use strict";

  var ENDPOINT = "https://form-handler-production-f871.up.railway.app/api/contact";

  // Capture-phase listener on document so this runs before Webflow's jQuery
  // submit handler; stopPropagation then prevents Webflow from also handling it.
  document.addEventListener(
    "submit",
    function (event) {
      var form = event.target;
      if (!(form instanceof HTMLFormElement)) return;

      var wrapper = form.closest(".w-form");
      if (!wrapper) return; // only handle Webflow forms

      event.preventDefault();
      event.stopPropagation();

      var done = wrapper.querySelector(".w-form-done");
      var fail = wrapper.querySelector(".w-form-fail");
      var button = form.querySelector('[type="submit"], button');

      // Gather all named fields.
      var data = {};
      new FormData(form).forEach(function (value, key) {
        data[key] = value;
      });
      data._form = form.getAttribute("name") || form.id || "form";

      // Button "please wait" state.
      var original = null;
      if (button) {
        if (button.tagName === "INPUT") {
          original = button.value;
          button.value = button.getAttribute("data-wait") || "Please wait...";
        } else {
          original = button.innerHTML;
          button.innerHTML = "Please wait...";
        }
        button.disabled = true;
      }

      function restoreButton() {
        if (!button) return;
        button.disabled = false;
        if (button.tagName === "INPUT") button.value = original;
        else button.innerHTML = original;
      }

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          if (!response.ok) throw new Error("Request failed: " + response.status);
          return response.json();
        })
        .then(function () {
          form.style.display = "none";
          if (done) done.style.display = "block";
        })
        .catch(function (error) {
          if (fail) fail.style.display = "block";
          restoreButton();
          if (window.console) console.error("Form submission failed:", error);
        });
    },
    true
  );
})();
