import nodemailer, { type Transporter } from "nodemailer";

// Env vars are read lazily inside functions — never at import time, so the
// build and any page render must never crash when SMTP_* is not configured.

function smtpConfig() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  return { host, port, user, pass };
}

let transporter: Transporter | null = null;

export function isSmtpConfigured() {
  const { host, user, pass } = smtpConfig();
  return Boolean(user && pass && host);
}

export function getTransporter(): Transporter {
  if (transporter) return transporter;
  const { host, port, user, pass } = smtpConfig();
  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
    // Never throw on connection issues — send() is wrapped in try/catch by callers.
    tls: port === 465 ? { rejectUnauthorized: false } : undefined,
  });
  return transporter;
}

export function getFromAddress() {
  return (
    process.env.EMAIL_FROM ||
    process.env.NOTIFY_EMAIL ||
    "DexMedix <no-reply@dexmedix.com>"
  );
}
