import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarCheck, Phone, Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDateLong } from "@/lib/hours";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Confetti, SuccessCheck, CopyReferenceButton } from "./success-effects";

export const metadata: Metadata = {
  title: "Booking Confirmed",
  robots: { index: false, follow: false },
};

const labelCollection: Record<string, string> = {
  "walk-in": "Walk-in at the lab",
  home: "Home sample collection",
};

const labelGender: Record<string, string> = {
  female: "Female",
  male: "Male",
  other: "Prefer not to say",
};

function SummarySkeleton() {
  return (
    <div className="w-full animate-pulse rounded-[2rem] bg-white p-8 shadow-card sm:p-10">
      <div className="mx-auto h-24 w-24 rounded-full bg-crimson-100" />
      <div className="mx-auto mt-6 h-6 w-2/3 rounded bg-navy-100" />
      <div className="mx-auto mt-3 h-4 w-1/2 rounded bg-navy-100" />
      <div className="mt-8 h-14 w-full rounded-2xl bg-navy-950" />
      <div className="mt-6 h-40 w-full rounded-2xl bg-navy-100" />
      <p className="sr-only">Loading your booking details…</p>
    </div>
  );
}

async function BookingSummary({ bookingRef }: { bookingRef: string }) {
  if (!bookingRef || bookingRef.length > 60) {
    return (
      <div className="rounded-[2rem] bg-white p-8 text-center shadow-card sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-crimson-50 text-crimson-700">
          <CalendarCheck className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-navy-950">
          We couldn&apos;t find that booking
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-600">
          Check the reference in your confirmation email, or contact us and
          we&apos;ll look it up.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/book" variant="primary">
            Book again
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </div>
    );
  }

  const booking = await prisma.booking
    .findUnique({ where: { reference: bookingRef } })
    .catch(() => null);

  if (!booking) {
    return (
      <div className="rounded-[2rem] bg-white p-8 text-center shadow-card sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-crimson-50 text-crimson-700">
          <CalendarCheck className="h-8 w-8" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-extrabold tracking-tight text-navy-950">
          Booking not found
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-600">
          The reference <span className="font-mono font-bold">{bookingRef}</span>{" "}
          doesn&apos;t match any booking. Please call us at {site.phone}.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/book" variant="primary">
            Back to booking
          </ButtonLink>
        </div>
      </div>
    );
  }

  const rows: Array<[string, string]> = [
    ["Full name", booking.fullName],
    ["Email", booking.email],
    ["Phone", booking.phone],
    ["Date of birth", booking.dateOfBirth],
    ["Gender", labelGender[booking.gender] ?? booking.gender],
    ["Address", booking.address],
    ["Test", booking.itemName],
    [
      "Collection",
      labelCollection[booking.collectionType] ?? booking.collectionType,
    ],
    ["Preferred date", formatDateLong(booking.preferredDate)],
    ["Preferred time", booking.preferredTime],
    ["Doctor / referral", booking.doctorName || "—"],
    ["Conditions / allergies", booking.conditions || "—"],
    [
      "Emergency contact",
      [booking.emergencyName, booking.emergencyPhone].filter(Boolean).join(" — ") || "—",
    ],
    ["Status", booking.status],
  ];

  const steps = [
    {
      title: "We confirm your slot",
      body: "Our team reviews your slot and confirms it by phone or email within opening hours.",
    },
    {
      title:
        booking.collectionType === "home"
          ? "Home collection arranged"
          : "Sample collection at the lab",
      body:
        booking.collectionType === "home"
          ? "A phlebotomist calls you to agree the exact address window."
          : "Arrive 10 minutes early at 123 Healthline Road with a valid ID.",
    },
    {
      title: "Results within 24 hours",
      body: "Results are emailed to you once verified — usually within 24 hours.",
    },
  ];

  return (
    <div className="relative isolate w-full overflow-hidden rounded-[2rem] bg-white p-6 text-center shadow-card sm:p-10">
      <Confetti />

      <SuccessCheck />

      <p className="mt-6">
        <Badge tone="amber">Booking confirmed</Badge>
      </p>
      <h1 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
        Thank you, {booking.fullName.split(" ")[0]}!
      </h1>
      <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-navy-600">
        Your booking is in. A confirmation email with this summary is on its way
        to <strong className="font-semibold text-navy-800">{booking.email}</strong>.
      </p>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[1.75rem] bg-navy-950 px-6 py-5 sm:flex-row">
        <div className="sm:text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-500">
            Booking reference
          </p>
          <p className="mt-1.5 font-heading text-2xl font-extrabold tracking-[0.14em] text-white">
            {booking.reference}
          </p>
        </div>
        <CopyReferenceButton value={booking.reference} />
      </div>

      <dl className="mt-8 overflow-hidden rounded-2xl border border-navy-100 text-left">
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className={`flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${
              i % 2 === 0 ? "bg-cloud-100" : "bg-white"
            }`}
          >
            <dt className="w-44 shrink-0 text-xs font-bold uppercase tracking-wider text-navy-400">
              {label}
            </dt>
            <dd className="text-sm font-semibold text-navy-800">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 rounded-[1.75rem] bg-blush-100 p-6 text-left sm:p-7">
        <p className="font-heading text-base font-extrabold text-navy-950">
          What happens next
        </p>
        <ol className="mt-5 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4 md:flex-col md:gap-3">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-crimson-700 text-sm font-extrabold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <p className="font-heading text-sm font-extrabold text-navy-950">
                  {step.title}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-navy-600">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <ButtonLink href="/book" variant="primary">
          Book another test
        </ButtonLink>
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
        <a
          href={`tel:${site.phoneHref}`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-bold text-navy-600 transition hover:bg-crimson-50 hover:text-crimson-700"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Reschedule
        </a>
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(`Booking ${booking.reference}`)}`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-bold text-navy-600 transition hover:bg-crimson-50 hover:text-crimson-700"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          Email us
        </a>
      </div>

      <p className="mt-6 flex items-center justify-center gap-2 text-xs text-navy-400">
        <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
        Reference saved · keep it handy for your visit
      </p>
    </div>
  );
}

export default function BookSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  return (
    <section
      className="relative bg-cloud-100 pb-24 pt-32 md:pb-28 md:pt-40"
      aria-label="Booking confirmation"
    >
      <Container>
        <div className="mx-auto w-full max-w-2xl">
          <Suspense fallback={<SummarySkeleton />}>
            <SuccessContent searchParams={searchParams} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}

async function SuccessContent({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref = "" } = await searchParams;
  return <BookingSummary bookingRef={ref} />;
}
