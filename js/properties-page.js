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

  function esc(s) { return CH.escapeHtml(s); }

  // The design sets the first word light-upright and the rest italic on the
  // tiles, and the reverse on the property headings. nameHtml already carries
  // that split for the site's own headings, so reuse it rather than re-parsing.
  function splitName(name) {
    var parts = name.split(" ");
    if (parts.length === 1) return { first: name, rest: "" };
    return { first: parts.slice(0, -1).join(" "), rest: parts[parts.length - 1] };
  }

  function frame(item) {
    return '<div class="pp-frame"><img src="' + esc(item.image.src) + '" ' +
      (item.image.srcset ? 'srcset="' + esc(item.image.srcset) + '" ' : "") +
      'sizes="(max-width: 991px) 100vw, 762px" loading="lazy" alt="' + esc(item.name) + '"></div>';
  }

  function tile(item) {
    var n = splitName(item.name);
    return '<li><a class="pp-tile" href="#property-' + esc(item.id) + '">' +
      frame(item) +
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

  function property(item) {
    var n = splitName(item.name);
    return '<article class="pp-item" id="property-' + esc(item.id) + '">' +
      '<div class="pp-item__row">' +
        '<div class="pp-item__media">' + frame(item) +
          '<button class="pp-arrow pp-arrow--prev" type="button" aria-label="Previous photo of ' + esc(item.name) + '">' +
            '<img src="images/icons/arrow-prev.svg" alt="" aria-hidden="true"></button>' +
          '<button class="pp-arrow pp-arrow--next" type="button" aria-label="Next photo of ' + esc(item.name) + '">' +
            '<img src="images/icons/arrow-next.svg" alt="" aria-hidden="true"></button>' +
        "</div>" +
        '<div class="pp-info">' +
          '<h2 class="pp-name"><em>' + esc(n.first) + '</em> <span class="pp-name__light">' + esc(n.rest) + "</span></h2>" +
          '<div class="pp-desc">' + meta(item) +
            "<p>" + esc(item.description) + "</p>" +
            '<p class="pp-price">From <strong>&pound;' + item.price + '</strong><span>pn</span></p>' +
          "</div>" +
          '<div class="pp-widget" role="note">Checked.in widget</div>' +
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
  });
})();
