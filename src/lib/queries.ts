import { prisma } from "@/lib/prisma";

// Seeded catalogue data — cached so every page prerenders instantly.
// Re-run `npm run db:seed` after changing content (cache clears on rebuild).

export async function getFeaturedServices() {
  "use cache";
  return prisma.service.findMany({
    where: { featured: true },
    orderBy: { name: "asc" },
    include: { _count: { select: { tests: true } } },
  });
}

export async function getAllServices() {
  "use cache";
  return prisma.service.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
    include: { tests: { orderBy: { name: "asc" } } },
  });
}

export async function getServiceBySlug(slug: string) {
  "use cache";
  return prisma.service.findUnique({
    where: { slug },
    include: { tests: { orderBy: { name: "asc" } } },
  });
}

export async function getFeaturedPackages() {
  "use cache";
  return prisma.testPackage.findMany({
    where: { featured: true },
    orderBy: { price: "asc" },
    include: { _count: { select: { tests: true } } },
  });
}

export async function getPackagesWithTests() {
  "use cache";
  return prisma.testPackage.findMany({
    orderBy: { price: "asc" },
    include: { tests: { orderBy: { name: "asc" } } },
  });
}

export async function getFeaturedPackagesWithTests() {
  "use cache";
  return prisma.testPackage.findMany({
    where: { featured: true },
    orderBy: { price: "asc" },
    include: { tests: { orderBy: { name: "asc" } } },
  });
}

export async function getPackageBySlug(slug: string) {
  "use cache";
  return prisma.testPackage.findUnique({
    where: { slug },
    include: { tests: { orderBy: { name: "asc" } } },
  });
}

export async function getTestimonials() {
  "use cache";
  return prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}

export async function getBookableSelectData() {
  "use cache";
  const [services, packages] = await Promise.all([
    prisma.service.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, category: true },
    }),
    prisma.testPackage.findMany({
      orderBy: { price: "asc" },
      select: { id: true, name: true, slug: true, price: true },
    }),
  ]);
  return { services, packages };
}
