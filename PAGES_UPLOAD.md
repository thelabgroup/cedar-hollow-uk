# Making changes to the site

How to edit and publish `cedarhollow.uk`. The site runs on a **Cloudflare
Worker** that serves every static file plus the contact-form endpoint. See
[`docs/CLOUDFLARE_MIGRATION.md`](docs/CLOUDFLARE_MIGRATION.md) for how it got
there and what to do if it needs rolling back.

## The loop

```bash
# 1. edit files, then preview locally
npx wrangler dev            # the real site at localhost:8787, Worker and all

# 2. publish
npx wrangler deploy         # ← this is what changes the live site

# 3. record it
git add -A && git commit -m "..." && git push
```

> **Steps 2 and 3 are independent, and this is the thing people get wrong.**
> Railway used to deploy automatically when you pushed. Cloudflare does not.
>
> - **Push without deploy** → the live site is unchanged.
> - **Deploy without push** → the live site is built from edits that exist
>   nowhere but your laptop.
>
> Do both, every time, until push-to-deploy is set up (see the end of this file).

Deploys take about 15 seconds. Only changed files upload.

## If something goes wrong

```bash
npx wrangler rollback       # back to the previous version, in seconds
npx wrangler deployments list
```

Rolling back is almost always better than fixing forward under pressure. You
can also pick a specific version from **Workers & Pages → cedar-hollow-uk →
Deployments**.

To see what the live Worker is doing, including every form submission:

```bash
npx wrangler tail
```

## Three things that will bite you

| Situation | What happens | What to do |
| - | - | - |
| A file over **25 MiB** | The entire deploy fails, not just that file | Put it in R2, as `map/southern-england.pmtiles` is. Ask before adding large media |
| A file that should stay private | **It gets published.** `docs/TODO.md` was publicly readable on Railway for months | Add it to [`.assetsignore`](.assetsignore) |
| A new page | Nothing links to it and nothing indexes it | Link it from the nav/footer, and add it to [`sitemap.xml`](sitemap.xml) using the extensionless URL |

Everything at the repo root is published unless `.assetsignore` says otherwise.
That includes any notes file you drop in — this one is excluded, deliberately.

## Common tasks

**Change text or images on a page.** Edit the `.html` file, `wrangler dev` to
check it, deploy, commit.

**Add a page.** Copy an existing one for the header/footer shell, add it to
`sitemap.xml`, and link it from somewhere real.

**Add an image.** Drop it in `images/`, reference it with a relative path.
Prefer `.webp` and keep it well under 25 MiB.

**Change where enquiries go.** Edit `CONTACT_TO` in [`wrangler.toml`](wrangler.toml)
and deploy. The address does not need verifying anywhere — Resend sends to
whatever you set.

**Rotate the Resend API key.** Create a new key at
[resend.com](https://resend.com) → API Keys (Sending access,
`send.cedarhollow.uk`), then:

```bash
npx wrangler secret put RESEND_API_KEY
```

Delete the old key afterwards. The key is never in the repo — it lives
encrypted at Cloudflare and is only readable by the Worker at runtime.

**Check whether mail is working.** `https://cedarhollow.uk/health` returns
`{"ok":true,"mailConfigured":true}`. Resend → **Logs** shows delivery status
for every send.

## URLs drop the .html

Workers redirects `/about.html` to `/about` with a 307. Old links keep working;
query strings survive. Use the extensionless form in `sitemap.xml` and in any
new links. Don't change `html_handling` in `wrangler.toml` to "fix" this — it
also governs how `/` finds `index.html`.

## ⚠️ This is a Webflow export with hand-written code in it

`index.html` carries code Webflow does not know about:

- the Protomaps/Leaflet map and its two property insets
- `js/form-submit.js`, which intercepts the contact form
- `js/analytics.js`
- `js/listings.js` and the client-side search

**Re-exporting from Webflow and overwriting `index.html` destroys all of it,
silently.** If a design change has to come from Webflow, merge it deliberately
rather than replacing the file, and check the map and the contact form
afterwards.

## Where things live

| | |
| - | - |
| Site pages, `css/`, `js/`, `images/`, `fonts/`, `map/` | this repo, published as static assets |
| Contact endpoint | [`worker/index.js`](worker/index.js) → `POST /api/contact` |
| Worker config, contact addresses | [`wrangler.toml`](wrangler.toml) |
| What must never be published | [`.assetsignore`](.assetsignore) |
| Security headers (CSP etc.) | [`_headers`](_headers) — not in the HTML |
| Map overview tileset, 26.5 MiB | R2 bucket `cedar-hollow-map`, served at `tiles.cedarhollow.uk` |
| Outbound mail | Resend, from `website@send.cedarhollow.uk` |
| Inbound mail for `@cedarhollow.uk` | **Google Workspace — do not touch the apex MX records** |

## Deploy failures

| Symptom | Cause |
| - | - |
| Upload fails on file size | Something over 25 MiB is not in `.assetsignore` |
| `.wrangler` appears in the upload list | The `.wrangler` line was removed from `.assetsignore`; it publishes your account ID and the Worker source map |
| Deploy succeeds, site unchanged | Browser cache, or you edited a file that is excluded |
| Form returns 503 | `RESEND_API_KEY` is not set on the Worker |
| Form returns 502 | Resend rejected it — `npx wrangler tail` shows the reason |

## Getting push-to-deploy back

Railway published on every push; Cloudflare does not, and that gap is the main
way this setup goes wrong. Two ways to close it:

1. **Workers Builds** *(recommended)* — **Workers & Pages → cedar-hollow-uk →
   Settings → Build**, connect the GitHub repo. Pushing to `main` then builds
   and deploys. No tokens to manage.
2. **GitHub Actions** — a workflow using `cloudflare/wrangler-action` and a
   `CLOUDFLARE_API_TOKEN` repo secret. More moving parts, but the config is
   visible in the repo.

Until one of those is in place, `npx wrangler deploy` is the only thing that
changes the live site.
