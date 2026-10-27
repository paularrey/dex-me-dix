import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllServices, getPackagesWithTests } from "@/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = site.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/packages",
    "/book",
    "/contact",
    "/faqs",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  let serviceRoutes: MetadataRoute.Sitemap = [];
  let packageRoutes: MetadataRoute.Sitemap = [];

  try {
    const [services, packages] = await Promise.all([
      getAllServices(),
      getPackagesWithTests(),
    ]);
    serviceRoutes = services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
    packageRoutes = packages.map((p) => ({
      url: `${base}/packages/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
  } catch {
    // Database unavailable — still emit the static routes.
  }

  return [...staticRoutes, ...serviceRoutes, ...packageRoutes];
}
