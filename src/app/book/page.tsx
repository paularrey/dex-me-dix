import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { BookingForm } from "@/components/forms/booking-form";
import { getBookableSelectData } from "@/lib/queries";
import { BookingSkeleton } from "./loading";

export const metadata: Metadata = {
  title: "Book a Test",
  description:
    "Book a lab test or health package with DexMedix — choose walk-in or home sample collection, pick a date and time within opening hours, and get an instant booking reference.",
  alternates: { canonical: "/book" },
};

type Props = {
  searchParams: Promise<{ service?: string; package?: string }>;
};

async function BookingPanel({ searchParams }: Props) {
  const params = await searchParams;
  const { services, packages } = await getBookableSelectData();

  const preselectedId = params.service || params.package || null;
  const preselectedType: "service" | "package" | null = params.service
    ? "service"
    : params.package
      ? "package"
      : null;

  return (
    <BookingForm
      services={services}
      packages={packages}
      preselectedType={preselectedType}
      preselectedId={preselectedId}
    />
  );
}

export default function BookPage({ searchParams }: Props) {
  return (
    <>
      <PageHeader
        eyebrow="Book a Test"
        title="Schedule your test in under two minutes"
        description="Pick your test, choose walk-in or home collection, and select a slot within our opening hours. You'll receive a booking reference and confirmation email immediately — no payment online."
        crumbs={[{ label: "Book a Test" }]}
      />

      <section className="bg-cloud-50 py-14 sm:py-16" aria-label="Booking form">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <Suspense fallback={<BookingSkeleton />}>
            <BookingPanel searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
