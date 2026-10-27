export function BookingSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <p className="sr-only">Loading booking form…</p>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-[1.5rem] border border-navy-100 bg-white p-6 sm:p-8"
        >
          <div className="h-5 w-48 rounded bg-navy-100" />
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="h-11 w-full rounded-xl bg-navy-100" />
            <div className="h-11 w-full rounded-xl bg-navy-100" />
            <div className="h-11 w-full rounded-xl bg-navy-100 sm:col-span-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Loading() {
  return <BookingSkeleton />;
}
