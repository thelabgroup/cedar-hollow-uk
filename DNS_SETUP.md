# Custom domain — DNS setup

The domain is already **scaffolded on Railway**. Nothing will change on the live
site until the DNS records below are added at the registrar, so this can sit here
safely until you have DNS access.

Until then the site stays reachable at
<https://cedar-hollow-uk-production.up.railway.app>.

- **Railway project:** `cedar-hollow-uk`
- **Service:** `cedar-hollow-uk` (the static site)
- **Environment:** `production`

## Records to add

Add all four records at whoever hosts DNS for `cedarhollow.uk`. The two
`_railway-verify` TXT records prove you own the domain; without them Railway will
not issue an HTTPS certificate.

| # | Type  | Name / Host           | Value                                                                     | TTL  |
| - | ----- | --------------------- | ------------------------------------------------------------------------- | ---- |
| 1 | CNAME | `@` (root)            | `gc56ud2u.up.railway.app`                                                  | Auto |
| 2 | TXT   | `_railway-verify`     | `railway-verify=f0407f1bcbeeefad4b658a0bc25f55a953d14f6813cb4f969d4a57489d894ccd` | Auto |
| 3 | CNAME | `www`                 | `dvie5num.up.railway.app`                                                  | Auto |
| 4 | TXT   | `_railway-verify.www` | `railway-verify=9b941a742ab20857f33391dad01202fdb70e1f0594613046c916bb3ce90ab548` | Auto |

> **Copy the values exactly.** Each domain has its own CNAME target — the root and
> `www` targets are different and are not interchangeable.

### If your DNS provider will not accept a CNAME on the root

Many providers refuse a CNAME at the apex (`@`). Two options:

1. **Use a provider with CNAME flattening** — Cloudflare, and most modern
   registrars, support this and will accept record 1 as written. On Cloudflare,
   set the record to **DNS only** (grey cloud) initially so Railway can validate
   ownership; you can enable proxying afterwards.
2. **Use `www` as the primary address** — add records 3 and 4 only, then set a
   redirect from the root to `https://www.cedarhollow.uk` at the registrar.

## After the records are live

1. Propagation is usually minutes, but allow up to 72 hours.
2. Check status:
   ```bash
   railway domain status cedarhollow.uk     --service cedar-hollow-uk
   railway domain status www.cedarhollow.uk --service cedar-hollow-uk
   ```
   Look for `Verified: yes` and a certificate status of issued/active.
3. A `404` on the custom domain before verification completes is expected — it
   resolves itself once the TXT record is seen.

## Once the domain is live — do these three things

1. **Allow the new origin on the form handler**, or the contact form will fail
   CORS from the new domain:
   ```bash
   railway variable set "ALLOWED_ORIGINS=https://cedar-hollow-uk-production.up.railway.app,https://cedarhollow.uk,https://www.cedarhollow.uk" --service form-handler
   ```
2. **Pick one canonical hostname** (root or `www`) and redirect the other, so the
   site is not served on two addresses.
3. **Check `hello@cedarhollow.uk` actually receives mail.** It is published in the
   footer and used as the contact address across the legal pages. Adding MX
   records for the domain is separate from the records above.

## Removing the scaffold

If the domain changes, drop these and add the new one:

```bash
railway domain delete cedarhollow.uk     --service cedar-hollow-uk --yes
railway domain delete www.cedarhollow.uk --service cedar-hollow-uk --yes
railway domain <new-domain>              --service cedar-hollow-uk
```
