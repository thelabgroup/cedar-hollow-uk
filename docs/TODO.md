# TODO — Cedar Hollow UK

Outstanding gaps in the current site, from an exhaustive page-by-page audit
(links & nav, assets, interactivity, content, structure, SEO, accessibility,
production-readiness). Grouped by priority. Line references are approximate and
may shift as files change.

> **Root cause for most High/Blocker items:** this is a Webflow *template clone*
> (originally "The Oaks" / Mallinson) that was rebranded visually to "Cedar
> Hollow" but never rewired. Real links still point at the source businesses,
> and the interactive pieces (booking widget, search, detail pages) were never
> connected to a backend — which does not exist in a static export.

**Tally at audit time:** 6 blocker · 22 high · 44 medium · 23 low (before consolidation).

---

## Blockers — the site is broken for a real visitor

- [ ] **Booking / conversion path is fake.** Each listing's booking area is the
  literal text `<div>Checked.in widget</div>` (`search-results.html:183,248,313`).
  No widget, iframe, or script exists anywhere. Embed the real booking/availability
  engine or a working "Book" CTA. *(Original TODO item — search page not wired.)*
- [ ] **`detail_properties.html` is an empty shell.** The entire `<body>`
  (`detail_properties.html:40-43`) is two `<script>` tags — no nav, content,
  gallery, price, or `<h1>`; nothing links to it. Build out the property-detail
  template (gallery, description, amenities, pricing, booking CTA) or remove it.
  *(Original TODO item — property detail page not built.)*
- [ ] **Dead CTAs everywhere.** `index.html` has 19 `href="#"` links. The hero
  "Explore Retreats" button (`index.html:109`) is dead; half the "View Treehouse"
  buttons (`index.html:415,467`) are dead. Point every CTA at a real destination.
- [ ] **No real navigation menu on any page.** The header (`index.html:100-102`)
  is logo-only; `search-results.html` has no header/nav at all, stranding visitors.
  Add a functional primary nav (Treehouses, Our Story, Experiences, Contact, Book).

## High — broken rebrand, orphaned pages, placeholder catalogue

- [ ] **Half-rebranded template.** "Cedar Hollow" content links out to two
  unrelated businesses — `theoaks.uk` (x11) and `mallinson.co.uk` (x8). "Explore
  Oxford"/"Explore Dorset" (`index.html:320,338`), all booking CTAs →
  `theoaks.uk/availability`, listing copy still says "the magic of The Oaks"
  (`search-results.html:177,242,307`). Repoint every outbound link to Cedar Hollow.
- [ ] **Contact email mismatch.** Footer says `hello@cedarhollow.uk`
  (`index.html:779`) vs README's `hello@theoaks.uk`. Reconcile the correct address.
- [ ] **Four of five pages are orphaned.** The only internal `.html` link is the
  logo → `index.html`. Nothing links to `search-results.html`,
  `detail_properties.html`, `home-copy.html`, or `style-guide.html`. Wire the
  homepage cards/CTAs into the funnel.
- [ ] **Search page can't search.** `search-results.html` has zero `<form>` /
  `<input>` — no dates, guests, or location fields; it's a hard-coded list of
  three items. Add real search inputs wired to listing data.
- [ ] **Placeholder / duplicate catalogue content:**
  - [ ] A cabin is named "The Fox Den 2" (`index.html:427`).
  - [ ] All three search results share identical description and price
    (`From £120`, "Sleeps 2") — one cabin cloned three times
    (`search-results.html:178,243,308`).
  - [ ] "The Bear Lodge" reuses "The Fox Den 2"'s exact features/price; two cards
    share the rating "★★★★☆ 4.7 (58 reviews)".
  - [ ] Property names don't overlap between homepage (Fox Den, Owl's Nest, Bear
    Lodge) and search page (The Treehouse, Faun's Hideaway, Beaver's Den).
  - [ ] Reconcile to one canonical, per-property catalogue with real copy/prices.
- [ ] **Property cards never link to an internal detail page** — all go off-site,
  and the one local detail template is the empty stub above.
- [ ] **Legally-required pages missing.** Footer "Privacy Policy", "Terms of
  Service", "Cookies Settings" (`index.html:843,846,849`) are all `href="#"`
  with no pages behind them (UK GDPR / PECR). Author and link real pages.
- [ ] **No way to contact the business.** Phone and email are shown but not
  clickable — no `tel:` / `mailto:` anywhere — and every "Contact" link is dead.
  No contact form. Add clickable contact links and/or a form (via a form service).
- [ ] **All five footer social links are dead** (`index.html:785,790,795,800,805`,
  all `href="#"`). Set real profile URLs or remove.

## Medium — SEO, compliance, dependencies

- [ ] **SEO largely absent site-wide:** no `<meta name="description">` on any page;
  titles generic/duplicated ("Cedar Hollow UK" ×3) or a raw slug ("Search-results",
  `search-results.html:5`); no Open Graph / Twitter / canonical tags on content
  pages; no JSON-LD for a lodging business; no `sitemap.xml` or `robots.txt`; the
  internal `style-guide.html` is indexable.
- [ ] **Fragile third-party dependencies.** All JS libraries load from CDNs with no
  local fallback; `split-type` and `choosebumps` are loaded unpinned ("latest");
  no Subresource Integrity (SRI) on any remote script; dead commented-out
  CodeSandbox references (`mmmj7h.csb.app`). Vendor locally and/or pin + add SRI.
- [ ] **No cookie-consent banner** despite loading several third-party CDNs
  unconditionally (GDPR / PECR).
- [ ] **No web analytics / conversion tracking** on a marketing & booking site.
- [ ] **No physical address, map, or directions** for a location-based retreat.
- [ ] **`home-copy.html` is a duplicate homepage** — orphaned, and a duplicate-
  content risk with no canonical. Remove or consolidate.

## Low — polish, accessibility, artifacts

- [ ] **Accessibility:** content images carry empty `alt=""`; icon-only social/
  search controls and image-only links lack accessible names; no skip-to-content
  link; weak landmarks (footer is a plain `<section>`, `<nav>` sits inside
  `<main>`); auto-scrolling carousels ignore `prefers-reduced-motion`.
- [ ] **`style-guide.html` shipped to production** with lorem ipsum, a Placeholder
  image, and dead demo forms (a Webflow dev artifact). Remove or de-index.
- [ ] **README is still boilerplate** — wrong contact, empty sections, no
  setup/deploy docs.
- [ ] **No 404 page.**
- [ ] **Fonts shipped as raw TTF only** (no WOFF2), and every `@font-face` is
  declared twice.
- [ ] **Dead code:** `search-results.html` loads two Splide scripts that
  initialise nothing (no `.splide` elements).
- [ ] **No newsletter / email lead-capture** on any live page.
- [ ] **`lang="en"`** rather than `en-GB` for a UK business.
- [ ] **No social-share image asset** present.
