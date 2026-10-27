import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import {
  Inbox,
  CalendarCheck,
  LogOut,
  Mail,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated, logoutAdmin } from "@/actions/admin";
import { AdminLogin } from "@/components/admin/admin-login";
import {
  BookingStatusControl,
  MessageStatusControl,
  statusBadgeClass,
} from "@/components/admin/status-controls";
import { formatDateLong } from "@/lib/hours";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Reads cookies() per request — exempt this segment from instant navigation.
export const instant = false;

const statusLabel: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  "sample-collected": "Sample collected",
  completed: "Completed",
  cancelled: "Cancelled",
  new: "New",
  replied: "Replied",
  closed: "Closed",
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-[70vh] bg-cloud-50 py-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

function DashboardSkeleton() {
  return (
    <Shell>
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-64 rounded bg-navy-100" />
        <div className="h-64 w-full rounded-2xl bg-white" />
        <div className="h-64 w-full rounded-2xl bg-white" />
      </div>
    </Shell>
  );
}

async function AdminDashboard() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <Shell>
        <AdminLogin />
        <p className="mx-auto mt-6 max-w-sm text-center text-xs text-navy-400">
          Access is restricted. Failed attempts are rate limited.
        </p>
      </Shell>
    );
  }

  const [bookings, messages] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
  ]);

  const counts = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    unread: messages.filter((m) => m.status === "new").length,
  };

  return (
    <Shell>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-500">
            DexMedix Admin
          </p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy-800">
            Bookings &amp; Messages
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 bg-white px-4 py-2 text-xs font-bold text-navy-700 transition hover:border-crimson-500"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            View site
          </Link>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-navy-700"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
              Sign out
            </button>
          </form>
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total bookings", value: counts.total, Icon: CalendarCheck },
          { label: "Awaiting confirmation", value: counts.pending, Icon: ShieldCheck },
          { label: "Unread messages", value: counts.unread, Icon: Inbox },
        ].map(({ label, value, Icon }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-navy-100 bg-white p-5 shadow-card"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-crimson-50 text-crimson-600">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-2xl font-extrabold text-navy-800">{value}</span>
              <span className="block text-xs font-semibold text-navy-400">{label}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Bookings */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        <div className="flex items-center justify-between gap-4 border-b border-navy-100 px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-navy-800">
            <CalendarCheck className="h-4 w-4 text-crimson-500" aria-hidden="true" />
            Bookings ({bookings.length})
          </h2>
        </div>

        {bookings.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-navy-400">
            No bookings yet — submit a test booking to see it here.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
              <caption className="sr-only">Recent bookings with status controls</caption>
              <thead>
                <tr className="bg-cloud-50 text-[11px] uppercase tracking-wider text-navy-400">
                  <th scope="col" className="px-4 py-3 font-bold">Reference</th>
                  <th scope="col" className="px-4 py-3 font-bold">Patient</th>
                  <th scope="col" className="px-4 py-3 font-bold">Test</th>
                  <th scope="col" className="px-4 py-3 font-bold">Slot</th>
                  <th scope="col" className="px-4 py-3 font-bold">Collection</th>
                  <th scope="col" className="px-4 py-3 font-bold">Status</th>
                  <th scope="col" className="px-4 py-3 font-bold">Change</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t border-navy-100 align-top">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-navy-700">
                      {b.reference}
                      <span className="mt-1 block text-[11px] font-sans font-normal text-navy-400">
                        {b.createdAt.toLocaleString("en-NG", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="block font-semibold text-navy-800">{b.fullName}</span>
                      <span className="block text-xs text-navy-400">{b.email}</span>
                      <span className="block text-xs text-navy-400">{b.phone}</span>
                      <span className="block text-xs text-navy-400">
                        {b.gender} · born {b.dateOfBirth}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="block font-semibold text-navy-700">{b.itemName}</span>
                      <span className="text-xs capitalize text-navy-400">{b.itemType}</span>
                      {b.doctorName ? (
                        <span className="block text-xs text-navy-400">Ref: {b.doctorName}</span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-xs text-navy-600">
                      <span className="block font-semibold">{b.preferredDate}</span>
                      <span className="block text-navy-400">{b.preferredTime}</span>
                      <span className="mt-1 block text-navy-400">
                        {formatDateLong(b.preferredDate)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-navy-600">
                      <span className="capitalize">
                        {b.collectionType === "home" ? "Home collection" : "Walk-in"}
                      </span>
                      <span className="mt-1 block text-navy-400">{b.address}</span>
                      {b.conditions ? (
                        <span className="mt-1 block text-navy-400">⚠ {b.conditions}</span>
                      ) : null}
                      {b.emergencyName ? (
                        <span className="mt-1 block text-navy-400">
                          EC: {b.emergencyName} ({b.emergencyPhone})
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold",
                          statusBadgeClass[b.status] ?? "bg-navy-100 text-navy-600"
                        )}
                      >
                        {statusLabel[b.status] ?? b.status}
                      </span>
                      <span className="mt-1.5 block text-[11px] text-navy-400">
                        Email: {b.emailSent ? "sent" : "not sent"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <BookingStatusControl
                        id={b.id}
                        value={b.status}
                        testId={`status-${b.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        <div className="flex items-center justify-between gap-4 border-b border-navy-100 px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-navy-800">
            <Mail className="h-4 w-4 text-crimson-500" aria-hidden="true" />
            Contact messages ({messages.length})
          </h2>
        </div>

        {messages.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-navy-400">
            No messages yet — use the contact form to test.
          </p>
        ) : (
          <ul className="divide-y divide-navy-100">
            {messages.map((m) => (
              <li key={m.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-extrabold text-navy-800">{m.subject}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px] font-bold",
                        statusBadgeClass[m.status] ?? "bg-navy-100 text-navy-600"
                      )}
                    >
                      {statusLabel[m.status] ?? m.status}
                    </span>
                    {!m.emailSent ? (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-bold text-red-700">
                        notify email failed
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-xs font-semibold text-navy-400">
                    {m.name} · {m.email} · {m.phone} ·{" "}
                    {m.createdAt.toLocaleString("en-NG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap rounded-xl bg-cloud-50 px-4 py-3 text-sm leading-relaxed text-navy-600">
                    {m.message}
                  </p>
                  <a
                    href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`}
                    className="mt-2 inline-block text-xs font-bold text-crimson-600 hover:underline"
                  >
                    Reply to {m.name.split(" ")[0]}
                  </a>
                </div>
                <MessageStatusControl
                  id={m.id}
                  value={m.status}
                  testId={`msg-status-${m.id}`}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-6 text-center text-xs text-navy-400">
        Data shown here is confidential. Site: {site.name} · signed-in session
        expires after 8 hours.
      </p>
    </Shell>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AdminDashboard />
    </Suspense>
  );
}
