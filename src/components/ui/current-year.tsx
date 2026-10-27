"use client";

import { useSyncExternalStore } from "react";

const SERVER_YEAR = "2026";

/**
 * Renders the current year without calling `new Date()` during the server
 * render — Next.js 16 blocks unstable `new Date()` while prerendering.
 * The server snapshot is a fixed fallback; the client corrects it on hydrate.
 */
function subscribe() {
  return () => {};
}

export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => SERVER_YEAR
  );
  return <>{year}</>;
}
