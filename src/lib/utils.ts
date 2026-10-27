export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatNaira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Human booking reference, e.g. DXM-20261026-8F3K2Q */
export function generateReference(date = new Date()) {
  const ymd = date.toISOString().slice(0, 10).replace(/-/g, "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `DXM-${ymd}-${suffix}`;
}

/** Strip angle brackets and newlines so user input cannot inject into HTML mail. */
export function sanitizeSingleLine(value: unknown) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .replace(/[\r\n]+/g, " ")
    .trim();
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}
