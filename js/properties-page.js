/*
 * Properties page renderer — Figma 289:1205 (desktop) / 351:902 (mobile).
 *
 * Reads the same LISTINGS catalogue the homepage and search use, so the page
 * carries all six properties rather than the three the design mocks up, and
 * prices, sleeps and copy stay in one place.
 */
(function () {
  "use strict";

  var CH = window.CedarHollowSearch;
  if (!CH) return;

  var ARROW = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewbox="0 0 17 12" fill="none" class="button_icon">' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M13.2443 5.03644L9.48927 1.21321L10.6935 0L16.5 5.91195' +
    'L10.6783 11.55L9.50444 10.3067L13.17 6.75673H0V5.03644H13.2443Z" fill="currentColor"></path></svg>';

  function esc(s) { return CH.escapeHtml(s); }

  // The design sets the first word light-upright and the rest italic on the
  // tiles, and the reverse on the property headings. nameHtml already carries
  // that split for the site's own headings, so reuse it rather than re-parsing.
  function splitName(name) {
    var parts = name.split(" ");
    if (parts.length === 1) return { first: name, rest: "" };
    return { first: parts.slice(0, -1).join(" "), rest: parts[parts.length - 1] };
  }

  // A property's gallery is its `photos` array if it has one, otherwise the
  // single catalogue image. The arrows below are rendered only when there is
  // actually more than one, so they never promise a slideshow that isn't there.
  function photosOf(item) {
    return (item.photos && item.photos.length) ? item.photos : [item.image];
  }

  function frame(item, opts) {
    var shots = photosOf(item);
    var imgs = shots.map(function (ph, i) {
      return '<img src="' + esc(ph.src) + '" ' +
        (ph.srcset ? 'srcset="' + esc(ph.srcset) + '" ' : "") +
        'sizes="(max-width: 991px) 100vw, 762px" loading="lazy" alt="' + esc(item.name) +
        '" class="pp-shot"' + (i === 0 ? ' data-current="true"' : "") + ">";
    }).join("");
    return '<div class="pp-frame"' + (opts && opts.gallery ? ' data-gallery="true"' : "") + ">" + imgs + "</div>";
  }

  function tile(item) {
    var n = splitName(item.name);
    return '<li><a class="pp-tile" href="#property-' + esc(item.id) + '">' +
      frame(item, {}) +
      '<p class="pp-tile-name">' + esc(n.first) + ' <em>' + esc(n.rest) + '</em></p>' +
      "</a></li>";
  }

  function meta(item) {
    var beds = item.bedrooms + (item.bedrooms === 1 ? " bed" : " beds");
    var baths = item.bathrooms === 0 ? "Shared bathroom"
      : item.bathrooms + (item.bathrooms === 1 ? " bathroom" : " bathrooms");
    return '<ul class="pp-meta">' +
      '<li><img src="images/icons/icon-guests.svg" alt="" aria-hidden="true">' + item.sleeps + " guests</li>" +
      '<li><img src="images/icons/icon-beds.svg" alt="" aria-hidden="true">' + beds + "</li>" +
      '<li><img src="images/icons/icon-baths.svg" alt="" aria-hidden="true">' + baths + "</li>" +
      "</ul>";
  }

  function arrows(item) {
    if (photosOf(item).length < 2) return "";
    return '<button class="pp-arrow pp-arrow--prev" type="button" data-step="-1" aria-label="Previous photo of ' +
      esc(item.name) + '"><img src="images/icons/arrow-prev.svg" alt="" aria-hidden="true"></button>' +
      '<button class="pp-arrow pp-arrow--next" type="button" data-step="1" aria-label="Next photo of ' +
      esc(item.name) + '"><img src="images/icons/arrow-next.svg" alt="" aria-hidden="true"></button>';
  }

  // The design reserves a panel here for a Checked.in booking widget we do not
  // have. Rather than leave the space empty, it now carries the three things a
  // reader wants at this point -- which site it is on, what it is known for,
  // and how to book -- all from the catalogue, so nothing is hand-maintained.
  function bookingPanel(item) {
    var site = item.region === "Dorset" ? "Cedar Hollow Dorset" : "Cedar Hollow Oxford";
    return '<div class="pp-book">' +
      '<dl class="pp-book__facts">' +
        "<div><dt>Location</dt><dd>" + esc(site) + "</dd></div>" +
        "<div><dt>Known for</dt><dd>" + esc(item.highlight || "Woodland seclusion") + "</dd></div>" +
      "</dl>" +
      '<a class="button w-inline-block" href="' + esc(item.bookingUrl) +
        '" target="_blank" rel="noopener"><span>Check availability</span>' + ARROW + "</a>" +
      '<p class="pp-book__note">Booking opens on the ' +
        (item.region === "Dorset" ? "Mallinson" : "Oaks") + " site</p>" +
      "</div>";
  }

  function property(item) {
    var n = splitName(item.name);
    return '<article class="pp-item" id="property-' + esc(item.id) + '">' +
      '<div class="pp-item__row">' +
        '<div class="pp-item__media">' + frame(item, { gallery: true }) + arrows(item) + "</div>" +
        '<div class="pp-info">' +
          '<h2 class="pp-name"><em>' + esc(n.first) + '</em> <span class="pp-name__light">' + esc(n.rest) + "</span></h2>" +
          '<div class="pp-desc">' + meta(item) +
            "<p>" + esc(item.description) + "</p>" +
            '<p class="pp-price">From <strong>&pound;' + item.price + '</strong><span>pn</span></p>' +
          "</div>" +
          bookingPanel(item) +
        "</div>" +
      "</div>" +
      '<div class="pp-notes"><p>' + esc(item.longDescription) + "</p></div>" +
      "</article>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var tiles = document.getElementById("pp-tiles");
    var list = document.getElementById("pp-list");
    if (!tiles || !list) return;
    var items = CH.listings;
    tiles.innerHTML = items.map(tile).join("");
    list.innerHTML = items.map(property).join("");

    list.addEventListener("click", function (e) {
      var btn = e.target.closest(".pp-arrow");
      if (!btn) return;
      var frameEl = btn.parentElement.querySelector('[data-gallery="true"]');
      var shots = frameEl.querySelectorAll(".pp-shot");
      if (shots.length < 2) return;
      var i = 0;
      shots.forEach(function (s, n) { if (s.dataset.current) i = n; });
      shots[i].removeAttribute("data-current");
      var next = (i + Number(btn.dataset.step) + shots.length) % shots.length;
      shots[next].setAttribute("data-current", "true");
    });
  });
})();
