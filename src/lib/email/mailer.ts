import nodemailer, { type Transporter } from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const EMAIL_FROM =
  process.env.EMAIL_FROM || process.env.NOTIFY_EMAIL || "DexMedix <no-reply@dexmedix.com>";

let transporter: Transporter | null = null;

export function isSmtpConfigured() {
  return Boolean(SMTP_USER && SMTP_PASS && SMTP_HOST);
}

export function getTransporter(): Transporter {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    // Never throw on connection issues — send() is wrapped in try/catch by callers.
    tls: SMTP_PORT === 465 ? { rejectUnauthorized: false } : undefined,
  });
  return transporter;
}

export function getFromAddress() {
  return EMAIL_FROM;
}
