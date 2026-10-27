import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Clock,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { getPackageBySlug, getPackagesWithTests } from "@/lib/queries";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const packages = await getPackagesWithTests();
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug).catch(() => null);
  if (!pkg) return { title: "Package not found" };
  return {
    title: `${pkg.name} — ${pkg.testCount}-test package`,
    description: pkg.description.slice(0, 160),
    openGraph: {
      title: `${pkg.name} | ${site.name}`,
      description: pkg.description.slice(0, 160),
      images: ["/logo.jpeg"],
    },
  };
}

const features = [
  { icon: Clock, title: "Fast results", copy: "Most panels ready within 24 hours" },
  {
    icon: ShieldCheck,
    title: "Quality checked",
    copy: "Dual verification before release",
  },
  {
    icon: CalendarCheck,
    title: "Flexible booking",
    copy: "Walk-in or home collection",
  },
] as const;

export default async function PackageDetailPage({ params }: Props) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug).catch(() => null);
  if (!pkg) notFound();

  const others = (await getPackagesWithTests().catch(() => [])).filter(
    (p) => p.slug !== pkg.slug
  );

  return (
    <>
      <PageHeader
        eyebrow={`${pkg.testCount}-test bundle`}
        title={pkg.name}
        description={pkg.summary}
        crumbs={[
          { label: "Packages", href: "/packages" },
          { label: pkg.name },
        ]}
      />

      <Section className="bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Intro + full test list + prep notes */}
            <div className="lg:col-span-2">
              <Reveal>
                <p className="text-base leading-relaxed text-navy-600 sm:text-lg">
                  {pkg.description}
                </p>

                <div className="mt-10">
                  <h2 className="font-heading text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">
                    Every test,{" "}
                    <span className="accent-word squiggle">included</span>
                  </h2>
                  <p className="mt-2 text-sm font-semibold text-navy-400">
                    {pkg.tests.length} tests, one visit, one clear report
                  </p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {pkg.tests.map((test) => (
                      <li
                        key={test.id}
                        className="flex items-start gap-3 rounded-2xl border border-navy-100 bg-white px-5 py-4 shadow-soft transition duration-300 hover:-translate-y-0.5 hover:shadow-card"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crimson-100 text-crimson-700">
                          <Check
                            className="h-3.5 w-3.5"
                            strokeWidth={3}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-sm font-bold text-navy-800">
                          {test.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                  {features.map((feature) => (
                    <li
                      key={feature.title}
                      className="flex items-start gap-3 rounded-2xl bg-cloud-100 p-5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-crimson-700 shadow-soft">
                        <feature.icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-relaxed text-navy-600">
                        <strong className="block font-heading font-extrabold text-navy-950">
                          {feature.title}
                        </strong>
                        {feature.copy}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Hero price card */}
            <aside className="lg:col-span-1">
              <Reveal delay={80}>
                <div className="sticky top-28 overflow-hidden rounded-[2rem] bg-cloud-100 p-7 shadow-card sm:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-crimson-600/15 blur-3xl"
                  />
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-crimson-700">
                      One visit covers
                    </p>
                    <p className="mt-2 font-heading text-5xl font-extrabold tracking-tight text-crimson-700">
                      {pkg.testCount}
                    </p>
                    <p className="-mt-1 text-sm font-bold text-navy-600">
                      tests in this package
                    </p>
                    <div className="mt-3">
                      <Badge tone="crimson">All included</Badge>
                    </div>
                    <p className="mt-4 text-xs font-semibold text-navy-400">
                      Pay at the lab · no online payment
                    </p>

                    <ButtonLink
                      href={`/book?package=${pkg.slug}`}
                      variant="primary"
                      size="lg"
                      className="mt-6 w-full"
                    >
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      Book Now
                    </ButtonLink>
                    <a
                      href={`tel:${site.phoneHref}`}
                      className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border-2 border-navy-200 px-6 py-3 text-sm font-bold text-navy-800 transition hover:border-crimson-600 hover:text-crimson-700"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {site.phone}
                    </a>

                    <div className="mt-6 border-t border-navy-200 pt-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                        Other packages
                      </p>
                      <ul className="mt-3 space-y-1">
                        {others.map((other) => (
                          <li key={other.slug}>
                            <Link
                              href={`/packages/${other.slug}`}
                              className="-mx-3 flex min-h-[44px] items-center justify-between gap-2 rounded-xl px-3 text-sm font-semibold text-navy-600 transition hover:bg-white hover:text-navy-950"
                            >
                              {other.name}
                              <span className="flex items-center gap-2 text-xs font-bold text-crimson-700">
                                {other.testCount} tests
                                <ArrowRight
                                  className="h-3.5 w-3.5 shrink-0"
                                  aria-hidden="true"
                                />
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>

      {/* CTA strip */}
      <Section className="bg-blush-100">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-950 to-crimson-900 px-7 py-12 text-center text-white shadow-card sm:px-14 sm:py-16">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-crimson-500/30 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-amber-500/15 blur-3xl"
              />
              <div className="relative mx-auto max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                  Ready when you are
                </p>
                <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
                  One visit. All tests.{" "}
                  <span className="accent-word">Clear answers.</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                  Choose walk-in at our Victoria Island lab or home sample
                  collection across Lagos for {pkg.name}. You&apos;ll get a
                  booking reference and confirmation email immediately.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <ButtonLink
                    href={`/book?package=${pkg.slug}`}
                    variant="white"
                    size="lg"
                  >
                    <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                    Book this package
                  </ButtonLink>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
