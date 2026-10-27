"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validation/booking";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";
import { sendContactNotification } from "@/lib/email/send";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitContact(
  _prev: ContactResult | undefined,
  formData: FormData
): Promise<ContactResult> {
  const raw = Object.fromEntries(formData.entries());

  // Honeypot — silently accept and drop.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return { ok: true };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = checkRateLimit(clientKey(ip, "contact"), 4, 60_000);
  if (!limit.ok) {
    return {
      ok: false,
      error: `Too many messages. Please wait ${limit.retryAfterSeconds} seconds and try again.`,
    };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "_");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return { ok: false, error: "Please correct the highlighted fields.", fieldErrors };
  }

  const data = {
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
  };

  // Submission = email to the lab. SMTP missing/failing is logged and
  // never breaks the message.
  const notify = await sendContactNotification(data);
  console.info(
    `[contact] message from ${data.email} — notify: ${notify.ok ? "sent" : notify.skipped ? "skipped" : "failed"}`
  );

  return { ok: true };
}
