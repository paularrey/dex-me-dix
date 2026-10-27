import { site } from "@/lib/site";

export type Slot = { value: string; label: string };

/** Opening hours used by the booking form and server validation. */
const WEEKDAY = { open: 8 * 60, close: 18 * 60 }; // Mon–Fri 08:00–18:00
const SATURDAY = { open: 9 * 60, close: 15 * 60 }; // Sat 09:00–15:00
const SLOT_MINUTES = 30;
const LAST_SLOT_LEAD_MINUTES = 30; // last appointment starts 30 min before close

export function minutesForDate(date: Date) {
  const day = date.getDay(); // 0 = Sunday
  if (day === 0) return null;
  if (day === 6) return SATURDAY;
  return WEEKDAY;
}

export function isDateOpen(isoDate: string) {
  const date = parseISODate(isoDate);
  if (!date) return false;
  return minutesForDate(date) !== null;
}

export function parseISODate(isoDate: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return null;
  const [y, m, d] = isoDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
    return null;
  }
  return date;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${pad(m)} ${period}`;
}

/** All bookable slots for a given ISO date (empty array when closed). */
export function slotsForDate(isoDate: string): Slot[] {
  const date = parseISODate(isoDate);
  if (!date) return [];
  const window = minutesForDate(date);
  if (!window) return [];
  const slots: Slot[] = [];
  for (
    let t = window.open;
    t <= window.close - LAST_SLOT_LEAD_MINUTES;
    t += SLOT_MINUTES
  ) {
    const value = `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
    slots.push({ value, label: formatTime(t) });
  }
  return slots;
}

export function isValidSlot(isoDate: string, time: string) {
  return slotsForDate(isoDate).some((s) => s.value === time);
}

/** Bookable dates = today (if open) through the next 60 days, Sundays excluded. */
export function bookableDates(from = new Date(), days = 60): string[] {
  const dates: string[] = [];
  const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  for (let i = 0; i <= days; i++) {
    const d = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + i);
    const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    if (minutesForDate(d)) dates.push(iso);
  }
  return dates;
}

export function todayISO(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function formatDateLong(isoDate: string) {
  const date = parseISODate(isoDate);
  if (!date) return isoDate;
  return date.toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export { site };
