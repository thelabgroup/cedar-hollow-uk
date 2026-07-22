import express from "express";
import nodemailer from "nodemailer";

const {
  PORT = 3000,
  SMTP_HOST,
  SMTP_PORT = "587",
  SMTP_SECURE = "false",
  SMTP_USER,
  SMTP_PASS,
  CONTACT_TO = "hello@thelabgroup.com",
  CONTACT_FROM,
  ALLOWED_ORIGINS = "",
} = process.env;

const app = express();
app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: true, limit: "64kb" }));

// --- CORS -------------------------------------------------------------------
// Comma-separated allowlist. If empty, every origin is allowed (open).
const allowlist = ALLOWED_ORIGINS.split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  const permitted =
    allowlist.length === 0 || (origin && allowlist.includes(origin));
  if (permitted) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// --- Mailer -----------------------------------------------------------------
const mailReady = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);
const transporter = mailReady
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

// --- Routes -----------------------------------------------------------------
app.get("/health", (_req, res) => {
  res.json({ ok: true, mailConfigured: mailReady });
});

app.post("/api/contact", async (req, res) => {
  const data = req.body || {};

  // Honeypot: silently accept obvious bots without emailing.
  if (data._gotcha) return res.json({ ok: true });

  const label = String(data._form || "form").slice(0, 80);
  const lines = Object.entries(data)
    .filter(([k]) => !k.startsWith("_"))
    .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`);

  if (lines.length === 0) {
    return res.status(400).json({ ok: false, error: "Empty submission" });
  }

  const body = lines.join("\n");

  // Always log so a submission is never lost, even before SMTP is configured.
  console.log(`[contact] "${label}" submission:\n${body}`);

  if (!mailReady) {
    return res
      .status(503)
      .json({ ok: false, error: "Mail not configured" });
  }

  try {
    await transporter.sendMail({
      from: CONTACT_FROM || SMTP_USER,
      to: CONTACT_TO,
      replyTo: typeof data.email === "string" ? data.email : undefined,
      subject: `Cedar Hollow website — new "${label}" submission`,
      text: body,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return res.status(502).json({ ok: false, error: "Send failed" });
  }
});

app.listen(Number(PORT), () => {
  console.log(
    `form-handler listening on ${PORT} (mail ${mailReady ? "configured" : "NOT configured"})`
  );
});
