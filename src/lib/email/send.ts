import { site } from "@/lib/site";
import { isSmtpConfigured, getFromAddress, getTransporter } from "@/lib/email/mailer";
import { baseTemplate, type FieldRow } from "@/lib/email/templates";

/** Hard fallback so a submission is always routed somewhere, even if .env is missing. */
export const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "paulmichaelomega@gmail.com";

export type SendResult = { ok: boolean; skipped?: boolean; error?: string };

/**
 * Sends one message. Never throws: callers must treat a failure as non-fatal
 * (the submission is already saved before we call this).
 */
async function deliver(options: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<SendResult> {
  if (!isSmtpConfigured()) {
    console.warn(
      `[email] SMTP not configured (SMTP_USER/SMTP_PASS missing) — message to ${Array.isArray(options.to) ? options.to.length : options.to} recipient(s) was NOT sent: "${options.subject}"`
    );
    return { ok: false, skipped: true, error: "SMTP not configured" };
  }

  try {
    await getTransporter().sendMail({
      from: getFromAddress(),
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo || undefined,
      text: options.html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 4000),
    });
    return { ok: true };
  } catch (error) {
    // Log the reason only — never the personal payload.
    const reason = error instanceof Error ? error.message : "unknown error";
    console.error(`[email] send failed for "${options.subject}": ${reason}`);
    return { ok: false, error: reason };
  }
}

function timestamp(date = new Date()) {
  return date.toLocaleString("en-NG", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  }) + " (WAT)";
}

export type BookingMailInput = {
  reference: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  testTypeLabel: string;
  itemType: string;
  collectionType: string;
  preferredDate: string;
  preferredTime: string;
  doctorName?: string;
  notes?: string;
  conditions?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  consent: string;
};

const labelGender: Record<string, string> = {
  female: "Female",
  male: "Male",
  other: "Prefer not to say",
};

const labelCollection: Record<string, string> = {
  "walk-in": "Walk-in at the lab",
  home: "Home sample collection",
};

export function bookingRows(b: BookingMailInput, submittedAt: string): FieldRow[] {
  return [
    { label: "Form type", value: "Booking" },
    { label: "Booking reference", value: b.reference },
    { label: "Submitted at", value: submittedAt },
    { label: "Full name", value: b.fullName },
    { label: "Email", value: b.email },
    { label: "Phone", value: b.phone },
    { label: "Date of birth", value: b.dateOfBirth },
    { label: "Gender", value: labelGender[b.gender] ?? b.gender },
    { label: "Address", value: b.address },
    { label: "Test type", value: `${b.itemType === "package" ? "Package" : "Service"} — ${b.testTypeLabel}` },
    { label: "Collection type", value: labelCollection[b.collectionType] ?? b.collectionType },
    { label: "Preferred date", value: b.preferredDate },
    { label: "Preferred time", value: b.preferredTime },
    { label: "Doctor / referral", value: b.doctorName ?? "" },
    { label: "Notes / symptoms", value: b.notes ?? "" },
    { label: "Existing conditions / allergies", value: b.conditions ?? "" },
    { label: "Emergency contact", value: [b.emergencyName, b.emergencyPhone].filter(Boolean).join(" — ") },
    { label: "Consent to data processing", value: b.consent },
  ];
}

/** 1) Notify the lab — always to NOTIFY_EMAIL, replyTo the patient. */
export async function sendBookingNotification(b: BookingMailInput): Promise<SendResult> {
  const submittedAt = timestamp();
  return deliver({
    to: NOTIFY_EMAIL,
    replyTo: `"${b.fullName}" <${b.email}>`,
    subject: `[Booking ${b.reference}] ${b.fullName} — ${b.testTypeLabel}`,
    html: baseTemplate({
      eyebrow: "New booking submission",
      title: `${b.fullName} booked ${b.testTypeLabel}`,
      intro: `A new booking was submitted on ${site.name}. Reply to this email to contact the patient directly.`,
      rows: bookingRows(b, submittedAt),
      footerNote: `Booking reference ${b.reference}. Handle patient data in line with ${site.name}'s privacy policy.`,
    }),
  });
}

/** 2) Confirmation copy to the patient (bookings only). */
export async function sendBookingConfirmation(b: BookingMailInput): Promise<SendResult> {
  const submittedAt = timestamp();
  return deliver({
    to: b.email,
    subject: `Booking received — ${b.reference} | ${site.name}`,
    html: baseTemplate({
      eyebrow: "Booking confirmed",
      title: `Thank you, ${b.fullName.split(" ")[0]}!`,
      intro: `We've received your booking. Please arrive 10 minutes early with a valid ID; for home collection our phlebotomist will call you on ${b.phone} to confirm the address window.`,
      rows: bookingRows(b, submittedAt),
      footerNote: `Need to change or cancel? Call ${site.phone} or reply to this email with your reference ${b.reference}.`,
    }),
  });
}

export type ContactMailInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

/** Contact form → NOTIFY_EMAIL (every form on the site emails this address). */
export async function sendContactNotification(c: ContactMailInput): Promise<SendResult> {
  const submittedAt = timestamp();
  return deliver({
    to: NOTIFY_EMAIL,
    replyTo: `"${c.name}" <${c.email}>`,
    subject: `[Contact] ${c.subject} — ${c.name}`,
    html: baseTemplate({
      eyebrow: "New contact message",
      title: c.subject,
      intro: `A new message was submitted through the ${site.name} contact form. Reply to this email to respond to ${c.name} directly.`,
      rows: [
        { label: "Form type", value: "Contact" },
        { label: "Submitted at", value: submittedAt },
        { label: "Name", value: c.name },
        { label: "Email", value: c.email },
        { label: "Phone", value: c.phone },
        { label: "Subject", value: c.subject },
        { label: "Message", value: c.message },
      ],
    }),
  });
}
