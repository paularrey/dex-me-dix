"use server";
 
import { cookies, headers } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { redirect } from "next/navigation";
import { checkRateLimit } from "@/lib/rate-limit";

const COOKIE_NAME = "dexmedix_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours

function secret() {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "dexmedix-insecure-dev-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export async function createAdminSession() {
  const token = `${Date.now()}.${sign(String(Date.now()))}`;
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
    path: "/",
  });
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [ts, signature] = token.split(".");
  if (!ts || !signature) return false;
  const expected = sign(ts);
  if (expected.length !== signature.length) return false;
  try {
    const valid = timingSafeEqual(Buffer.from(expected, "hex"), Buffer.from(signature, "hex"));
    if (!valid) return false;
  } catch {
    return false;
  }
  const age = Date.now() - Number(ts);
  return Number.isFinite(age) && age < MAX_AGE * 1000;
}

export type LoginResult = { ok: false; error: string } | { ok: true };

export async function loginAdmin(
  _prev: LoginResult | undefined,
  formData: FormData
): Promise<LoginResult> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const limit = checkRateLimit(`admin:${ip}`, 8, 60_000);
  if (!limit.ok) {
    return { ok: false, error: "Too many attempts. Please wait a minute." };
  }

  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected) {
    console.error("[admin] ADMIN_PASSWORD is not set — login disabled");
    return { ok: false, error: "Admin login is not configured on this server." };
  }
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  const matches = a.length === b.length && timingSafeEqual(a, b);
  if (!matches) {
    return { ok: false, error: "Incorrect password." };
  }

  await createAdminSession();
  return { ok: true };
}

export async function logoutAdmin() {
  await destroyAdminSession();
  redirect("/admin");
}

const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "sample-collected",
  "completed",
  "cancelled",
] as const;

export async function updateBookingStatus(
  _prev: { ok: boolean; error?: string } | undefined,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: "Not authorised." };
  }
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !(BOOKING_STATUSES as readonly string[]).includes(status)) {
    return { ok: false, error: "Invalid request." };
  }
  return { ok: false, error: "No data store is connected yet — bookings arrive by email." };
}

export async function updateContactStatus(
  _prev: { ok: boolean; error?: string } | undefined,
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) {
    return { ok: false, error: "Not authorised." };
  }
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !["new", "replied", "closed"].includes(status)) {
    return { ok: false, error: "Invalid request." };
  }
  return { ok: false, error: "No data store is connected yet — messages arrive by email." };
}
