# Custom domain — DNS setup

> **Being superseded.** The site is migrating to Cloudflare Workers; see
> [`docs/CLOUDFLARE_MIGRATION.md`](docs/CLOUDFLARE_MIGRATION.md). The records
> below are still correct and are what a rollback restores. Delete this file
> once Railway is decommissioned.

**Status: live.** Both `https://cedarhollow.uk` and `https://www.cedarhollow.uk`
serve the site over HTTPS with valid Let's Encrypt certificates.

- **Railway project:** `cedar-hollow-uk`
- **Service:** `cedar-hollow-uk` (the static site)
- **Environment:** `production`
- **Fallback URL:** <https://cedar-hollow-uk-production.up.railway.app>

## Current records at Cloudflare

| # | Type  | Name / Host | Value                     | Proxy     |
| - | ----- | ----------- | ------------------------- | --------- |
| 1 | CNAME | `@` (root)  | `llvhd9wu.up.railway.app` | DNS only  |
| 2 | CNAME | `www`       | `kcdrw99h.up.railway.app` | DNS only  |

Each domain has its own CNAME target — the root and `www` targets are different
and are not interchangeable. Cloudflare flattens the apex CNAME to an A record
automatically; that is expected and works.

**No `_railway-verify` TXT records are required.** Railway verified both domains
at creation. Any leftover `_railway-verify` / `_railway-verify.www` TXT records
in Cloudflare are inert and can be deleted.

## Two things that will break this

### 1. Turning the Cloudflare proxy on (orange cloud)

Railway verifies a custom domain by checking that the CNAME resolves to *its*
target. With the proxy enabled the name resolves to Cloudflare's anycast IPs
instead, Railway can never verify it, no certificate is issued, and its edge
returns `{"code":404,"message":"Application not found"}` with an
`x-railway-fallback: true` header. Correct TXT records do not help.

Keep both records **DNS only**. If you want proxying later, enable it only after
the certificate is issued, and set SSL/TLS mode to **Full (strict)**.

### 2. A Railway domain record stuck in `ISSUING`

If a domain sat unverifiable for a while (e.g. behind the proxy), Railway's
record can stay `Verified: no` / `CERTIFICATE_STATUS_TYPE_ISSUING` permanently,
even after DNS is corrected. It does not self-heal, and the dashboard shows
"Waiting for DNS update" with a warning on a TXT record that is in fact correct.

The fix is to delete and re-add the domain, which verifies instantly:

```bash
railway domain delete <domain> --service cedar-hollow-uk --yes
railway domain <domain>        --service cedar-hollow-uk
```

**Re-adding issues a new CNAME target**, so update the Cloudflare record to the
value the command prints. This is how both domains above were fixed on
2026-08-21; the old targets (`gc56ud2u`, `dvie5num`) are dead.

## Checking status

```bash
railway domain status cedarhollow.uk     --service cedar-hollow-uk
railway domain status www.cedarhollow.uk --service cedar-hollow-uk
```

Healthy looks like `Sync status: ACTIVE`, `Verified: yes`,
`Certificate status: CERTIFICATE_STATUS_TYPE_VALID`.

Note that once a domain is verified, any Railway edge IP will serve it — so the
site can work before your DNS change has finished propagating.

## Still outstanding

1. **Allow the new origins on the form handler**, or the contact form will fail
   CORS from the live domain:
   ```bash
   railway variable set "ALLOWED_ORIGINS=https://cedar-hollow-uk-production.up.railway.app,https://cedarhollow.uk,https://www.cedarhollow.uk" --service form-handler
   ```
2. **Pick one canonical hostname** (root or `www`) and redirect the other. Both
   currently serve the site independently, which is bad for SEO.
3. **Check `hello@cedarhollow.uk` receives mail.** It is published in the footer
   and across the legal pages. This needs MX records, which are separate from
   the records above — none of the work here makes that address deliverable.

## Removing the scaffold

If the domain changes, drop these and add the new one:

```bash
railway domain delete cedarhollow.uk     --service cedar-hollow-uk --yes
railway domain delete www.cedarhollow.uk --service cedar-hollow-uk --yes
railway domain <new-domain>              --service cedar-hollow-uk
```
