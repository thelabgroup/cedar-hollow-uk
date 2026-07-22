# Cedar Hollow — Form Handler

Tiny Node/Express service that receives website form submissions and emails them.
Runs as its own Railway service (root directory: `form-handler`).

## Endpoints

- `GET /health` → `{ ok: true, mailConfigured: boolean }`
- `POST /api/contact` → accepts JSON or form-encoded fields, emails them to `CONTACT_TO`.
  - Fields whose name starts with `_` are treated as metadata (not emailed), except:
    - `_form` — a label used in the email subject
    - `_gotcha` — honeypot; if present the request is silently accepted (bot)
  - An `email` field, if present, is used as the reply-to address.

Every submission is also written to the service logs, so nothing is lost even
before SMTP is configured.

## Environment variables

| Variable          | Required        | Example                                             |
| ----------------- | --------------- | --------------------------------------------------- |
| `CONTACT_TO`      | yes             | `hello@thelabgroup.com`                             |
| `ALLOWED_ORIGINS` | recommended     | `https://cedar-hollow-uk-production.up.railway.app` |
| `SMTP_HOST`       | to send email   | `smtp.gmail.com`                                    |
| `SMTP_PORT`       | to send email   | `587`                                               |
| `SMTP_SECURE`     | optional        | `false` (use `true` for port 465)                   |
| `SMTP_USER`       | to send email   | `hello@thelabgroup.com`                             |
| `SMTP_PASS`       | to send email   | app password / SMTP key                             |
| `CONTACT_FROM`    | optional        | `Cedar Hollow Website <hello@thelabgroup.com>`      |
| `PORT`            | set by Railway  | —                                                   |

If any of `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` is missing, the service still
runs and logs submissions, but `POST /api/contact` returns `503` instead of
sending mail.

`ALLOWED_ORIGINS` is a comma-separated allowlist. Leave it empty to allow all
origins (not recommended). Add any custom domains here once they're live.
