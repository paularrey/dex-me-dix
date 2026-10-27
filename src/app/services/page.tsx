import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { getAllServices } from "@/lib/queries";
import { ServicesClient } from "./services-client";

export const metadata: Metadata = {
  title: "Laboratory Services",
  description:
    "Full list of DexMedix laboratory services — blood, urine, genetic, microbiology, hormone and specialized testing with example tests and turnaround times.",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <>
      <PageHeader
        eyebrow="Our tests"
        title="Every test,"
        accent="one place"
        description="Six specialist departments covering routine screening through to advanced molecular diagnostics — search any test and see its typical turnaround before you book."
        crumbs={[{ label: "Services" }]}
      />

      <ServicesClient services={services} />
    </>
  );
}
