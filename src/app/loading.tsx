export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-white"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex h-14 w-14 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson-200 opacity-75" />
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-crimson-500 text-white">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12h4l2-7 4 14 2-7h6" />
            </svg>
          </span>
        </span>
        <p className="text-sm font-semibold text-navy-500">Loading…</p>
      </div>
    </div>
  );
}
