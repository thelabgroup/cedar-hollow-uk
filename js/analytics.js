/*
 * Cedar Hollow — analytics loader.
 *
 * DISABLED BY DEFAULT. Nothing is loaded and no cookies are set until you
 * change PROVIDER below, so the Cookies Policy stays accurate as-is.
 *
 * To switch analytics on:
 *
 *   Plausible (cookie-free, no consent banner needed — recommended)
 *     1. Sign up at plausible.io and add the domain cedarhollow.uk
 *     2. Set PROVIDER = "plausible" and DOMAIN = "cedarhollow.uk"
 *
 *   Google Analytics 4 (sets cookies — you will need a consent banner in the
 *   UK/EU, and the Cookies Policy must be updated before you enable it)
 *     1. Create a GA4 property and copy the Measurement ID (G-XXXXXXXXXX)
 *     2. Set PROVIDER = "ga4" and MEASUREMENT_ID = "G-XXXXXXXXXX"
 *
 * Whichever you choose, update cookies.html to describe it.
 */
(function () {
  "use strict";

  // ---- configuration -------------------------------------------------------
  var PROVIDER = "none"; // "none" | "plausible" | "ga4"
  var DOMAIN = "cedarhollow.uk"; // Plausible only
  var MEASUREMENT_ID = ""; // GA4 only, e.g. "G-XXXXXXXXXX"
  // -------------------------------------------------------------------------

  if (PROVIDER === "none") return;

  // Respect a browser "do not track" signal rather than ignoring it.
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return;

  function inject(src, attrs) {
    var s = document.createElement("script");
    s.async = true;
    s.src = src;
    Object.keys(attrs || {}).forEach(function (k) {
      s.setAttribute(k, attrs[k]);
    });
    document.head.appendChild(s);
    return s;
  }

  if (PROVIDER === "plausible") {
    if (!DOMAIN) return;
    inject("https://plausible.io/js/script.js", { "data-domain": DOMAIN });
    return;
  }

  if (PROVIDER === "ga4") {
    if (!MEASUREMENT_ID) return;
    inject("https://www.googletagmanager.com/gtag/js?id=" + MEASUREMENT_ID);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", MEASUREMENT_ID, { anonymize_ip: true });
  }
})();
