"use server";

import { cookies, headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { bookingSchema, type BookingInput } from "@/lib/validation/booking";
import { isValidSlot, isDateOpen, formatDateLong } from "@/lib/hours";
import { generateReference } from "@/lib/utils";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";
import {
  sendBookingNotification,
  sendBookingConfirmation,
} from "@/lib/email/send";

export type ActionResult<T = undefined> =
  | { ok: true; data?: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

const EMAIL_COOLDOWN_KEY = "booking:last-email";

async function resolveTestLabel(itemType: "service" | "package", itemId: string) {
  if (itemType === "package") {
    const pkg = await prisma.testPackage.findFirst({
      where: { OR: [{ slug: itemId }, { id: itemId }] },
    });
    if (pkg) return { id: pkg.id, label: pkg.name };
    return null;
  }
  const service = await prisma.service.findFirst({
    where: { OR: [{ slug: itemId }, { id: itemId }] },
  });
  if (service) return { id: service.id, label: service.name };
  return null;
}

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

  const item = await resolveTestLabel(input.itemType, input.itemId);
  if (!item) {
    return { ok: false, error: "The selected test type is no longer available." };
  }

  // No double-booking of the same slot (cancelled bookings don't block it)
  const clash = await prisma.booking.findFirst({
    where: {
      preferredDate: input.preferredDate,
      preferredTime: input.preferredTime,
      collectionType: input.collectionType,
      status: { not: "cancelled" },
    },
    select: { reference: true },
  });
  if (clash) {
    return {
      ok: false,
      error: `That ${input.collectionType === "home" ? "home collection" : "lab"} slot is already taken. Please choose another time.`,
    };
  }

  const reference = generateReference();

  // Save first — a failed email must never lose the submission.
  let saved;
  try {
    saved = await prisma.booking.create({
      data: {
        reference,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        dateOfBirth: input.dateOfBirth,
        gender: input.gender,
        address: input.address,
        itemType: input.itemType,
        itemId: item.id,
        itemName: item.label,
        collectionType: input.collectionType,
        preferredDate: input.preferredDate,
        preferredTime: input.preferredTime,
        doctorName: input.doctorName,
        notes: input.notes,
        conditions: input.conditions,
        emergencyName: input.emergencyName,
        emergencyPhone: input.emergencyPhone,
        consent: input.consent,
      },
    });
  } catch {
    console.error("[booking] database save failed");
    return {
      ok: false,
      error: "We couldn't save your booking just now. Please try again in a moment.",
    };
  }

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

  const [notify, confirmation] = await Promise.all([
    sendBookingNotification(mailPayload),
    sendBookingConfirmation(mailPayload),
  ]);

  try {
    await prisma.booking.update({
      where: { id: saved.id },
      data: { emailSent: notify.ok && confirmation.ok },
    });
  } catch {
    console.error("[booking] could not update emailSent flag");
  }

  // Cookies carry the reference to the success page (no PII in the URL).
  const jar = await cookies();
  jar.set(EMAIL_COOLDOWN_KEY, String(Date.now()), {
    httpOnly: true,
    maxAge: 60,
    path: "/",
  });

  return { ok: true, data: { reference } };
}
