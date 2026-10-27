"use server";

import { cookies, headers } from "next/headers";
import { bookingSchema, type BookingInput } from "@/lib/validation/booking";
import { isValidSlot, isDateOpen, formatDateLong } from "@/lib/hours";
import { generateReference } from "@/lib/utils";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";
import { resolveBookableItem } from "@/lib/queries";
import {
  sendBookingNotification,
  sendBookingConfirmation,
} from "@/lib/email/send";

export type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

const EMAIL_COOLDOWN_KEY = "booking:last-email";

export async function submitBooking(
  _prev: ActionResult<{ reference: string }> | undefined,
  formData: FormData
): Promise<ActionResult<{ reference: string }>> {
  const raw = Object.fromEntries(formData.entries());

  // Honeypot: pretend success so bots don't learn anything.
  if (typeof raw.website === "string" && raw.website.trim() !== "") {
    return { ok: true, data: { reference: generateReference() } };
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = checkRateLimit(clientKey(ip, "booking"), 4, 60_000);
  if (!limit.ok) {
    return {
      ok: false,
      error: `Too many booking attempts. Please wait ${limit.retryAfterSeconds} seconds and try again.`,
    };
  }

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "_");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return {
      ok: false,
      error: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  const input: BookingInput = parsed.data;

  // Booking-window rules (opening hours, closed days, valid slot)
  if (!isDateOpen(input.preferredDate)) {
    return { ok: false, error: "We're closed on that date. Please pick a working day." };
  }
  if (!isValidSlot(input.preferredDate, input.preferredTime)) {
    return { ok: false, error: "That time slot is outside our opening hours." };
  }

  const item = resolveBookableItem(input.itemType, input.itemId);
  if (!item) {
    return { ok: false, error: "The selected test type is no longer available." };
  }

  const reference = generateReference();

  const mailPayload = {
    reference,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    dateOfBirth: input.dateOfBirth,
    gender: input.gender,
    address: input.address,
    itemType: input.itemType,
    testTypeLabel: item.label,
    collectionType: input.collectionType,
    preferredDate: formatDateLong(input.preferredDate),
    preferredTime: input.preferredTime,
    doctorName: input.doctorName,
    notes: input.notes,
    conditions: input.conditions,
    emergencyName: input.emergencyName,
    emergencyPhone: input.emergencyPhone,
    consent: "Accepted",
  };

  // Submission = email to the lab + confirmation to the patient.
  // SMTP missing/failing is logged and never breaks the booking.
  const [notify, confirmation] = await Promise.all([
    sendBookingNotification(mailPayload),
    sendBookingConfirmation(mailPayload),
  ]);
  console.info(
    `[booking] ${reference} — notify: ${notify.ok ? "sent" : notify.skipped ? "skipped" : "failed"}, confirmation: ${confirmation.ok ? "sent" : confirmation.skipped ? "skipped" : "failed"}`
  );

  // Cookies carry the reference to the success page (no PII in the URL).
  const jar = await cookies();
  jar.set(EMAIL_COOLDOWN_KEY, String(Date.now()), {
    httpOnly: true,
    maxAge: 60,
    path: "/",
  });

  return { ok: true, data: { reference } };
}
