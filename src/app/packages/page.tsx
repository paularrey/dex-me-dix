import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { getPackagesWithTests } from "@/lib/queries";
import { PackagesClient } from "./packages-client";

export const metadata: Metadata = {
  title: "Test Packages",
  description:
    "Bundled health screening packages from DexMedix — Basic Health Check, Executive Check, Women's Health and Men's Health with full test lists and naira pricing.",
};

export default async function PackagesPage() {
  const packages = await getPackagesWithTests();

  const popularSlug = packages.some((p) => p.slug === "executive-check")
    ? "executive-check"
    : (packages.reduce(
        (best, p) => (p.price > best.price ? p : best),
        packages[0]
      )?.slug ?? null);

  return (
    <>
      <PageHeader
        eyebrow="Bundles"
        title="Test packages,"
        accent="better value"
        description="Curated screening bundles — one visit, one clear report. No hidden charges and no online payment: book in two minutes and settle at the lab."
        crumbs={[{ label: "Packages" }]}
      />

      <PackagesClient packages={packages} popularSlug={popularSlug} />
    </>
  );
}
