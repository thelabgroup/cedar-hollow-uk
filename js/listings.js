/*
 * Cedar Hollow — treehouse catalogue + client-side search.
 *
 * This is the single source of truth for the properties shown on the site.
 * It powers the search box on the homepage and the results rendered on
 * search-results.html. No backend required — filtering happens in the browser.
 *
 * To add or edit a property, change the LISTINGS array below. Every field is
 * plain data; `nameHtml` carries the italic styling used in headings, while
 * `name` is the plain-text version used for matching.
 */
(function () {
  "use strict";

  var LISTINGS = [
    {
      id: "cedar-hollow-treehouse",
      name: "Cedar Hollow Treehouse",
      nameHtml: '<span class="text-weight-normal text-style-italic">Cedar Hollow</span> Treehouse',
      destination: "Oxford",
      region: "Oxfordshire",
      sleeps: 6,
      bedrooms: 1,
      bathrooms: 1,
      price: 350,
      featured: 1,
      highlight: "Underfloor heating",
      image: {
        src: "images/Image-4.webp",
        sizes: "(max-width: 614px) 100vw, 614px",
        srcset:
          "images/bab72d306a7bfab5e8b38d99e1e859dff62b9558-p-500.webp 500w, images/bab72d306a7bfab5e8b38d99e1e859dff62b9558-p-800.webp 800w, images/Image-4.webp 900w"
      },
      description:
        "A 750 sq ft luxury treehouse set among the oaks, with underfloor heating, a full kitchen and a gas BBQ on the balcony.",
      longDescription:
        "Sleeps two adults and up to four children across an open-plan layout with en-suite facilities. Underfloor heating, a fully equipped kitchen and a top-of-the-line gas BBQ on the balcony.",
      bookingUrl: "https://www.theoaks.uk/availability"
    },
    {
      id: "fauns-hideaway",
      name: "Faun's Hideaway",
      nameHtml: '<span class="text-weight-normal text-style-italic">Faun’s </span>Hideaway',
      destination: "Oxford",
      region: "Oxfordshire",
      sleeps: 2,
      bedrooms: 1,
      bathrooms: 1,
      price: 175,
      featured: 4,
      highlight: "Narnia-inspired cave",
      image: {
        src: "images/Image-1.webp",
        sizes: "(max-width: 614px) 100vw, 614px",
        srcset: "images/Image-1.webp 900w"
      },
      description:
        "A Narnia-inspired cave hideaway lit by warm lantern light, with underfloor heating, air conditioning and a full kitchen.",
      longDescription:
        "One bedroom with en-suite, underfloor heating and air conditioning throughout, and a full kitchen — an enchanting realm tucked into the woodland.",
      bookingUrl: "https://www.theoaks.uk/availability"
    },
    {
      id: "beavers-den",
      name: "Beaver's Den",
      nameHtml: '<span class="text-weight-normal text-style-italic">Beaver’s </span>Den',
      destination: "Oxford",
      region: "Oxfordshire",
      sleeps: 2,
      bedrooms: 1,
      bathrooms: 0,
      price: 110,
      highlight: "Wood-fired hot tub",
      image: {
        src: "images/Image-2.webp",
        sizes: "(max-width: 614px) 100vw, 614px",
        srcset: "images/Image-2.webp 900w"
      },
      description:
        "An uninsulated woodland glamping pod with a private BBQ, firepit, wood-fired hot tub and an escape room challenge.",
      longDescription:
        "A simpler, wilder stay. Uninsulated pod with shared bathroom facilities in the nearby pool room, plus a private BBQ, firepit and wood-fired hot tub.",
      bookingUrl: "https://www.theoaks.uk/availability"
    },
    {
      id: "woodsmans-treehouse",
      name: "The Woodsman's Treehouse",
      nameHtml: 'The <span class="text-weight-normal text-style-italic">Woodsman’s </span>Treehouse',
      destination: "Dorset",
      region: "Dorset",
      sleeps: 2,
      bedrooms: 1,
      bathrooms: 1,
      price: 495,
      featured: 2,
      highlight: "Rooftop sauna",
      image: {
        src: "images/Image-3.webp",
        sizes: "(max-width: 614px) 100vw, 614px",
        srcset: "images/Image-3.webp 900w"
      },
      description:
        "Perched in an ancient oak and reached by rope bridge, with a rotating wood burner, roll-top bath and rooftop sauna.",
      longDescription:
        "RIBA South West award winner, 2016. A circular central room with a rotating wood burner, king bed, full kitchen and roll-top bath; upper deck with sauna and hot tub, plus a wood-fired pizza oven and an outdoor tree shower.",
      bookingUrl: "https://mallinson.co.uk/the-woodsmans-treehouse/"
    },
    {
      id: "dazzle-treehouse",
      name: "Dazzle Treehouse",
      nameHtml: '<span class="text-weight-normal text-style-italic">Dazzle </span>Treehouse',
      destination: "Dorset",
      region: "Dorset",
      sleeps: 2,
      bedrooms: 1,
      bathrooms: 1,
      price: 295,
      featured: 3,
      highlight: "Wood-fired hot tub",
      image: {
        src: "images/property-1.webp",
        sizes: "(max-width: 614px) 100vw, 614px",
        srcset: "images/property-1.webp 900w"
      },
      description:
        "A contemporary canopy retreat wearing WW1 ship-inspired dazzle camouflage, adults only, deep in Dorset woodland.",
      longDescription:
        "RIBA South West award winner, 2023. Ship-themed throughout — gangplank entry, glass spine and yacht-deck floors — with a wood-fired hot tub, pizza oven, ceramic wood-burning stove and a cargo-net day bed suspended above the stream.",
      bookingUrl: "https://mallinson.co.uk/dazzle-treehouse/"
    },
    {
      id: "pinwheel-treehouse",
      name: "Pinwheel Treehouse",
      nameHtml: '<span class="text-weight-normal text-style-italic">Pinwheel </span>Treehouse',
      destination: "Dorset",
      region: "Dorset",
      sleeps: 2,
      bedrooms: 1,
      bathrooms: 1,
      price: 295,
      highlight: "Two-person swing",
      image: {
        src: "images/property-2.webp",
        sizes: "(max-width: 614px) 100vw, 614px",
        srcset: "images/property-2.webp 900w"
      },
      description:
        "Inspired by a child’s pinwheel, set in a clearing of mature oaks with a glass-topped living space and one-way windows.",
      longDescription:
        "RIBA South West award-winning architecture by Guy Mallinson and Keith Brownlie. Ceramic wood-burning stove, wood-fired pizza oven, outdoor hot tub and a two-person swing. Featured in The World’s Most Secret Hotels.",
      bookingUrl: "https://mallinson.co.uk/pinwheel-treehouse/"
    }
  ];

  // Compact, self-contained feature icons (sized by the .icon-1x1-xsmall class).
  var ICONS = {
    sleeps:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="icon-1x1-xsmall"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    bedrooms:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="icon-1x1-xsmall"><path d="M3 18V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9"/><path d="M3 14h18"/><path d="M3 18v2M21 18v2"/><path d="M7 11h4"/></svg>',
    bathrooms:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="icon-1x1-xsmall"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z"/><path d="M6 12V6a2 2 0 0 1 2-2c1 0 1.5.5 2 1"/><path d="M5 19l-1 2M19 19l1 2"/></svg>'
  };

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Build <img> src/sizes/srcset attributes from an image object {src, sizes?, srcset?}.
  function imageAttrs(image) {
    var out = 'src="' + escapeHtml(image.src) + '"';
    if (image.sizes) out += ' sizes="' + escapeHtml(image.sizes) + '"';
    if (image.srcset) out += ' srcset="' + escapeHtml(image.srcset) + '"';
    return out;
  }

  // Read search parameters from a query string (defaults to the current URL).
  function parseParams(search) {
    var params = new URLSearchParams(
      search != null ? search : window.location.search
    );
    var guests = parseInt(params.get("guests"), 10);
    return {
      q: (params.get("q") || "").trim(),
      destination: (params.get("destination") || "").trim(),
      guests: isNaN(guests) ? 0 : guests
    };
  }

  // Filter the catalogue against the given params.
  function filterListings(params) {
    params = params || {};
    var q = (params.q || "").toLowerCase();
    var destination = (params.destination || "").toLowerCase();
    var guests = params.guests || 0;

    return LISTINGS.filter(function (item) {
      if (destination && item.destination.toLowerCase() !== destination) {
        return false;
      }
      if (guests && item.sleeps < guests) {
        return false;
      }
      if (q) {
        var haystack = [
          item.name,
          item.destination,
          item.region,
          item.description
        ]
          .join(" ")
          .toLowerCase();
        if (haystack.indexOf(q) === -1) {
          return false;
        }
      }
      return true;
    });
  }

  function feature(icon, label) {
    return (
      '<div class="feature-icon-wrap">' +
      icon +
      "<p>" +
      escapeHtml(label) +
      "</p></div>"
    );
  }

  // Build one result card matching the site's .search-result-item markup.
  function cardHtml(item) {
    var features =
      feature(ICONS.sleeps, "Sleeps " + item.sleeps) +
      feature(
        ICONS.bedrooms,
        item.bedrooms + (item.bedrooms === 1 ? " bedroom" : " bedrooms")
      ) +
      feature(
        ICONS.bathrooms,
        item.bathrooms + (item.bathrooms === 1 ? " bathroom" : " bathrooms")
      );

    return (
      '<div class="search-result-item">' +
      '<div class="search-item_content-wrap">' +
      '<div class="cabin-item_body">' +
      '<div class="max-width-xlarge align-center">' +
      '<div class="margin-bottom margin-medium">' +
      '<h3 class="heading-style-h2">' +
      item.nameHtml +
      "</h3>" +
      "</div>" +
      "</div>" +
      '<div class="margin-bottom margin-small">' +
      '<div class="cabin-item_feature-wrapper">' +
      '<div class="search-item_feature-wrap">' +
      features +
      "</div>" +
      "<p>" +
      escapeHtml(item.description) +
      "</p>" +
      '<div class="cabin-item_cost"><span>From</span>' +
      '<span class="text-size-large text-weight-bold">£' +
      item.price +
      "</span><span>pn</span></div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="search-item_widget-wrap">' +
      '<div class="cabin-item_body">' +
      '<a href="' +
      escapeHtml(item.bookingUrl) +
      '" target="_blank" rel="noopener" class="button w-inline-block">' +
      "<span>Check availability</span></a>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="search-item_content-left">' +
      '<div class="search-item_content-gallery-wrap">' +
      "<img " +
      imageAttrs(item.image) +
      ' loading="lazy" alt="' +
      escapeHtml(item.name) +
      '" class="search-item_gallery-img">' +
      "</div>" +
      "</div>" +
      '<div class="search-item_des-wrap">' +
      '<p class="text-size-small">' +
      escapeHtml(item.longDescription) +
      "</p>" +
      "</div>" +
      "</div>"
    );
  }

  // ---- Homepage "Featured Treehouses" carousel ----------------------------

  var ARROW_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewbox="0 0 17 12" fill="none" class="button_icon"><path fill-rule="evenodd" clip-rule="evenodd" d="M13.2443 5.03644L9.48927 1.21321L10.6935 0L16.5 5.91195L10.6783 11.55L9.50444 10.3067L13.17 6.75673H0V5.03644H13.2443Z" fill="currentColor"></path></svg>';

  // Listings flagged `featured`, in ascending `featured` order.
  function featured() {
    return LISTINGS.filter(function (l) {
      return typeof l.featured === "number";
    }).sort(function (a, b) {
      return a.featured - b.featured;
    });
  }

  // One carousel slide (`.splide__slide`) matching the homepage cabin-card markup.
  function featuredCardHtml(item) {
    var href = "search-results.html?q=" + encodeURIComponent(item.name);
    var bedrooms =
      item.bedrooms + (item.bedrooms === 1 ? " bedroom" : " bedrooms");

    return (
      '<li class="splide__slide">' +
      '<div class="cabin-item">' +
      '<a href="' +
      href +
      '" class="cabin-item_img-wrap w-inline-block"><img ' +
      imageAttrs(item.image) +
      ' loading="lazy" alt="' +
      escapeHtml(item.name) +
      '" class="cabin-item_img"></a>' +
      '<div class="cabin-item_body">' +
      '<div class="max-width-xlarge align-center">' +
      '<div class="margin-bottom margin-xxsmall">' +
      '<h3 class="heading-style-h4">' +
      escapeHtml(item.name) +
      "</h3>" +
      "</div>" +
      "</div>" +
      '<div class="margin-bottom margin-small">' +
      '<div class="cabin-item_feature-wrapper">' +
      '<div class="cabin-item_features">' +
      "<p>Sleeps " +
      item.sleeps +
      '</p><span class="seperator-dot">•</span>' +
      "<p>" +
      escapeHtml(bedrooms) +
      '</p><span class="seperator-dot">•</span>' +
      "<p>" +
      escapeHtml(item.highlight || "") +
      "</p>" +
      "</div>" +
      '<div class="cabin-item_cost"><span>From</span><span>£' +
      item.price +
      "</span><span>per night</span></div>" +
      "</div>" +
      "</div>" +
      '<a data-wf--button--variant="base" href="' +
      href +
      '" class="button w-inline-block"><span>View Treehouse</span>' +
      ARROW_SVG +
      "</a>" +
      "</div>" +
      "</div>" +
      "</li>"
    );
  }

  window.CedarHollowSearch = {
    listings: LISTINGS,
    parseParams: parseParams,
    filter: filterListings,
    cardHtml: cardHtml,
    featured: featured,
    featuredCardHtml: featuredCardHtml,
    escapeHtml: escapeHtml
  };
})();
