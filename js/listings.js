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
      featured: 3,
      highlight: "Underfloor heating",
      image: {
        src: "images/Image-4.webp",
        sizes: "(max-width: 614px) 100vw, 614px",
        srcset:
          "images/bab72d306a7bfab5e8b38d99e1e859dff62b9558-p-500.webp 500w, images/bab72d306a7bfab5e8b38d99e1e859dff62b9558-p-800.webp 800w, images/Image-4.webp 900w"
      },
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
      image: {
        src: "images/Image-3.png",
        sizes: "(max-width: 590px) 100vw, 590px",
        srcset:
          "images/3803373a936f7e44b4509bbd340a982c3b29f610-p-500.png 500w, images/Image-3.png 590w"
      },
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
      featured: 2,
      highlight: "Wood burner",
      image: { src: "images/Image-2.webp" },
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
      image: {
        src: "images/Treehouse-.png",
        sizes: "(max-width: 614px) 100vw, 614px",
        srcset:
          "images/1bf71a064f2a62cdb8735a3409b77c0f46d5cb6c-p-500.png 500w, images/1bf71a064f2a62cdb8735a3409b77c0f46d5cb6c-p-800.png 800w, images/1bf71a064f2a62cdb8735a3409b77c0f46d5cb6c-p-1080.png 1080w, images/Treehouse-.png 1536w"
      },
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
      featured: 1,
      highlight: "Copper bath",
      image: {
        src: "images/Image-1.webp",
        sizes: "(max-width: 614px) 100vw, 614px",
        srcset:
          "images/d989f17afffcc80d0d27455927c2fa709440f29b-p-500.webp 500w, images/Image-1.webp 612w"
      },
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
      featured: 4,
      highlight: "Hot tub",
      image: {
        src: "images/Image-3.webp",
        sizes: "(max-width: 614px) 100vw, 614px",
        srcset:
          "images/ef5d775c3ea1e9ca8042fd468e3b60e106fd0ab9-p-500.webp 500w, images/ef5d775c3ea1e9ca8042fd468e3b60e106fd0ab9-p-800.webp 800w, images/Image-3.webp 900w"
      },
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

  function starsFor(rating) {
    var filled = Math.max(0, Math.min(5, Math.round(rating)));
    var out = "";
    for (var i = 0; i < 5; i++) out += i < filled ? "★" : "☆";
    return out;
  }

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
      "<p>" +
      starsFor(item.rating) +
      " " +
      item.rating.toFixed(1) +
      " (" +
      item.reviews +
      " reviews)</p>" +
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
