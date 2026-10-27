import { services, type StaticService, type StaticServiceTest } from "@/data/services";
import { packages, type StaticPackage, type StaticPackageTest } from "@/data/packages";
import { testimonials, type StaticTestimonial } from "@/data/testimonials";

// Public catalogue served from typed static data — NO database access.
// Content lives in src/data/* — edit there to change what the site shows.
// Prisma is only used for bookings/contact/admin (see src/lib/db.ts).

const byName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name);
const byCategoryThenName = (a: StaticService, b: StaticService) =>
  a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
const byPrice = (a: StaticPackage, b: StaticPackage) => a.price - b.price;

function withSortedTests<T extends { tests: { name: string }[] }>(item: T): T {
  return { ...item, tests: [...item.tests].sort(byName) };
}

export async function getFeaturedServices() {
  return services
    .filter((s) => s.featured)
    .sort(byName)
    .map((s) => ({
      ...withSortedTests(s),
      _count: { tests: s.tests.length },
    }));
}

export async function getAllServices(): Promise<StaticService[]> {
  return [...services].sort(byCategoryThenName).map(withSortedTests);
}

export async function getServiceBySlug(
  slug: string
): Promise<StaticService | null> {
  const service = services.find((s) => s.slug === slug);
  return service ? withSortedTests(service) : null;
}

export async function getFeaturedPackages() {
  return packages
    .filter((p) => p.featured)
    .sort(byPrice)
    .map((p) => ({ ...p, _count: { tests: p.tests.length } }));
}

export async function getPackagesWithTests(): Promise<StaticPackage[]> {
  return [...packages].sort(byPrice).map(withSortedTests);
}

export async function getFeaturedPackagesWithTests(): Promise<StaticPackage[]> {
  return packages.filter((p) => p.featured).sort(byPrice).map(withSortedTests);
}

export async function getPackageBySlug(
  slug: string
): Promise<StaticPackage | null> {
  const pkg = packages.find((p) => p.slug === slug);
  return pkg ? withSortedTests(pkg) : null;
}

export async function getTestimonials(): Promise<StaticTestimonial[]> {
  return testimonials.filter((t) => t.published).slice(0, 6);
}

export async function getBookableSelectData() {
  return {
    services: [...services]
      .sort(byName)
      .map(({ id, name, slug, category }) => ({ id, name, slug, category })),
    packages: [...packages]
      .sort(byPrice)
      .map(({ id, name, slug, price }) => ({ id, name, slug, price })),
  };
}

/** Resolve a booking form item (slug or id) against the static catalogue. */
export function resolveBookableItem(
  itemType: "service" | "package",
  itemId: string
): { id: string; label: string } | null {
  if (itemType === "package") {
    const pkg = packages.find((p) => p.slug === itemId || p.id === itemId);
    return pkg ? { id: pkg.id, label: pkg.name } : null;
  }
  const service = services.find((s) => s.slug === itemId || s.id === itemId);
  return service ? { id: service.id, label: service.name } : null;
}

export type { StaticService, StaticServiceTest, StaticPackage, StaticPackageTest, StaticTestimonial };
