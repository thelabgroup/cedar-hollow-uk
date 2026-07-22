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
      sleeps: 2,
      bedrooms: 1,
      bathrooms: 1,
      price: 120,
      rating: 4.9,
      reviews: 58,
      image: "images/Image-3.png",
      description:
        "A whimsical retreat nestled among towering oaks, with cosy nooks, rustic charm and views straight into the canopy.",
      longDescription:
        "No expense was spared in making the treehouse a 5★ facility. Underfloor heating, a fully equipped kitchen (oven, microwave, dishwasher, hob plus a top-of-the-line gas BBQ on the balcony), en-suite facilities and super comfy bedding — you will never want to leave.",
      bookingUrl: "https://theoaks.uk/availability"
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
      price: 135,
      rating: 4.8,
      reviews: 41,
      image: "images/Image-2.png",
      description:
        "A romantic bolthole tucked into the woodland edge, wrapped in birdsong and dappled afternoon light.",
      longDescription:
        "Designed for two, Faun's Hideaway pairs a king-size bed with a wood-fired hot tub on a private deck. Slow mornings, forest bathing and a bottle of something local by the fire pit.",
      bookingUrl: "https://theoaks.uk/availability"
    },
    {
      id: "owls-nest",
      name: "Owl's Nest",
      nameHtml: '<span class="text-weight-normal text-style-italic">Owl’s </span>Nest',
      destination: "Oxford",
      region: "Oxfordshire",
      sleeps: 4,
      bedrooms: 2,
      bathrooms: 1,
      price: 165,
      rating: 4.9,
      reviews: 73,
      image: "images/image-1.png",
      description:
        "A family-friendly treehouse high in the canopy, with a wood-burner and a wraparound deck above the ferns.",
      longDescription:
        "Two bedrooms, an open-plan living space and a generous deck make Owl's Nest ideal for families or two couples. Bring the kids, bring the dog — there is room to roam.",
      bookingUrl: "https://theoaks.uk/availability"
    },
    {
      id: "beavers-den",
      name: "Beaver's Den",
      nameHtml: '<span class="text-weight-normal text-style-italic">Beaver’s </span>Den',
      destination: "Dorset",
      region: "Dorset — Jurassic Coast",
      sleeps: 2,
      bedrooms: 1,
      bathrooms: 1,
      price: 125,
      rating: 4.7,
      reviews: 52,
      image: "images/Treehouse-.png",
      description:
        "A snug waterside cabin on the Dorset coast, steps from riverbank walks and its own private hot tub.",
      longDescription:
        "Beaver's Den sits low by the water, with a hot tub on the deck and the sound of the stream to send you to sleep. A short drive from the beaches of the Jurassic Coast.",
      bookingUrl: "https://mallinson.co.uk"
    },
    {
      id: "the-fox-den",
      name: "The Fox Den",
      nameHtml: 'The <span class="text-weight-normal text-style-italic">Fox</span> Den',
      destination: "Dorset",
      region: "Dorset — Jurassic Coast",
      sleeps: 4,
      bedrooms: 2,
      bathrooms: 2,
      price: 155,
      rating: 4.8,
      reviews: 66,
      image: "images/Image-4.webp",
      description:
        "A stylish woodland lodge for four, with a copper bath, log fire and skies full of stars.",
      longDescription:
        "Two en-suite bedrooms, a double-height living room and a freestanding copper bath with a forest view. The Fox Den is our design-lover's retreat.",
      bookingUrl: "https://mallinson.co.uk"
    },
    {
      id: "bear-lodge",
      name: "Bear Lodge",
      nameHtml: '<span class="text-weight-normal text-style-italic">Bear</span> Lodge',
      destination: "Dorset",
      region: "Dorset — Jurassic Coast",
      sleeps: 6,
      bedrooms: 3,
      bathrooms: 2,
      price: 210,
      rating: 5.0,
      reviews: 39,
      image: "images/marshwood-1.png",
      description:
        "Our largest retreat — a three-bedroom treehouse built for gatherings, feasts and long forest weekends.",
      longDescription:
        "Three bedrooms, two bathrooms and a huge open kitchen-diner that spills onto a deck with a hot tub and a pizza oven. Bear Lodge is made for celebrations.",
      bookingUrl: "https://mallinson.co.uk"
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
      '<div class="margin-bottom margin-xsmall"><p class="text-size-small">★ ' +
      item.rating.toFixed(1) +
      " (" +
      item.reviews +
      " reviews)</p></div>" +
      '<a href="' +
      escapeHtml(item.bookingUrl) +
      '" target="_blank" rel="noopener" class="button w-inline-block">' +
      "<span>Check availability</span></a>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="search-item_content-left">' +
      '<div class="search-item_content-gallery-wrap">' +
      '<img src="' +
      escapeHtml(item.image) +
      '" loading="lazy" alt="' +
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

  window.CedarHollowSearch = {
    listings: LISTINGS,
    parseParams: parseParams,
    filter: filterListings,
    cardHtml: cardHtml,
    escapeHtml: escapeHtml
  };
})();
