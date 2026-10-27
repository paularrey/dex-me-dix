"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log without personal data — error objects here are framework-level only.
    console.error("[app-error]", error.message);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cloud-50 px-4 py-20">
      <div className="w-full max-w-md rounded-[1.5rem] border border-navy-100 bg-white p-10 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <AlertTriangle className="h-7 w-7" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-navy-800">
          Something went wrong
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-navy-500">
          An unexpected error occurred while loading this page. Your data is
          safe — please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-crimson-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-crimson-600"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try again
        </button>
      </div>
    </section>
  );
}
