import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { LogOut, ShieldCheck, ExternalLink } from "lucide-react";
import { isAdminAuthenticated, logoutAdmin } from "@/actions/admin";
import { AdminLogin } from "@/components/admin/admin-login";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Reads cookies() per request — exempt this segment from instant navigation.
export const instant = false;

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

function AdminHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-crimson-500">
          DexMedix Admin
        </p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-navy-800">
          {title}
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
  );
}

/**
 * There is no database on this deployment: bookings and contact messages are
 * delivered to NOTIFY_EMAIL. The admin panel stays available (login works)
 * and explains where the data lives.
 */
function NoDataNotice() {
  return (
    <Shell>
      <AdminHeader title="Bookings & Messages" />
      <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-crimson-50 text-crimson-700">
          <ShieldCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-heading text-xl font-extrabold tracking-tight text-navy-950">
          Submissions arrive by email
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-navy-600">
          This deployment runs without a database. Every booking and contact
          message is emailed to{" "}
          <strong className="font-semibold text-navy-800">{site.notifyEmail}</strong>{" "}
          the moment it is submitted — including the booking reference, patient
          details and preferred slot.
        </p>
        <p className="mt-3 text-xs font-semibold text-navy-400">
          A data store can be connected later to list them right here.
        </p>
      </div>
      <p className="mt-6 text-center text-xs text-navy-400">
        Site: {site.name} · signed-in session expires after 8 hours.
      </p>
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

  return <NoDataNotice />;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AdminDashboard />
    </Suspense>
  );
}
