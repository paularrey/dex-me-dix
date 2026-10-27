/**
 * Lightweight in-memory sliding-window rate limiter (per IP).
 * Good enough for a single-instance deployment; swap the Map for Redis/Upstash
 * if you run multiple server instances.
 */

type Bucket = { hits: number[] };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000;

function sweep(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    bucket.hits = bucket.hits.filter((t) => now - t < WINDOW_MS);
    if (bucket.hits.length === 0) buckets.delete(key);
  }
}

export function checkRateLimit(key: string, limit = 5, windowMs = WINDOW_MS) {
  const now = Date.now();
  sweep(now);

  const bucketKey = `${key}`;
  const bucket = buckets.get(bucketKey) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < windowMs);

  if (bucket.hits.length >= limit) {
    buckets.set(bucketKey, bucket);
    return { ok: false, retryAfterSeconds: Math.ceil((bucket.hits[0] + windowMs - now) / 1000) };
  }

  bucket.hits.push(now);
  buckets.set(bucketKey, bucket);
  return { ok: true, retryAfterSeconds: 0 };
}

/** Basic client fingerprint that never stores raw personal data. */
export function clientKey(ip: string | null | undefined, form: string) {
  return `${form}:${ip || "unknown"}`;
}
