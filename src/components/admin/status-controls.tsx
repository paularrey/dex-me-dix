"use client";

import { useActionState, useEffect, useRef } from "react";
import { RefreshCw } from "lucide-react";
import {
  updateBookingStatus,
  updateContactStatus,
} from "@/actions/admin";

const BOOKING_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "sample-collected", label: "Sample collected" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const MESSAGE_STATUSES = [
  { value: "new", label: "New" },
  { value: "replied", label: "Replied" },
  { value: "closed", label: "Closed" },
];

export const statusBadgeClass: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-crimson-100 text-crimson-700",
  "sample-collected": "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
  new: "bg-amber-100 text-amber-800",
  replied: "bg-crimson-100 text-crimson-700",
  closed: "bg-navy-100 text-navy-600",
};

type ActionResult = { ok: boolean; error?: string };

function StatusForm({
  action,
  id,
  value,
  options,
  label,
  testId,
}: {
  action: (prev: ActionResult | undefined, data: FormData) => Promise<ActionResult>;
  id: string;
  value: string;
  options: { value: string; label: string }[];
  label: string;
  testId: string;
}) {
  const [state, formAction, pending] = useActionState<ActionResult, FormData>(
    action,
    undefined as unknown as ActionResult
  );
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) ref.current?.scrollIntoView({ block: "nearest" });
  }, [state]);

  return (
    <form ref={ref} action={formAction} className="flex flex-col gap-1.5">
      <input type="hidden" name="id" value={id} />
      <label className="sr-only" htmlFor={testId}>
        {label}
      </label>
      <select
        id={testId}
        name="status"
        defaultValue={value}
        disabled={pending}
        className="rounded-lg border border-navy-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-navy-700 transition focus:border-crimson-500 focus:outline-none disabled:opacity-60"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-1 rounded-lg bg-navy-800 px-2.5 py-1.5 text-[11px] font-bold text-white transition hover:bg-navy-700 disabled:opacity-60"
      >
        <RefreshCw className={`h-3 w-3 ${pending ? "animate-spin" : ""}`} aria-hidden="true" />
        {pending ? "Saving…" : state?.ok ? "Saved" : "Update"}
      </button>
      {!state?.ok && state?.error ? (
        <span className="text-[11px] font-semibold text-red-600">{state.error}</span>
      ) : null}
    </form>
  );
}

export function BookingStatusControl(props: {
  id: string;
  value: string;
  testId: string;
}) {
  return (
    <StatusForm
      action={updateBookingStatus}
      options={BOOKING_STATUSES}
      label="Booking status"
      {...props}
    />
  );
}

export function MessageStatusControl(props: {
  id: string;
  value: string;
  testId: string;
}) {
  return (
    <StatusForm
      action={updateContactStatus}
      options={MESSAGE_STATUSES}
      label="Message status"
      {...props}
    />
  );
}
