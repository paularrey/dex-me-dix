import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  CalendarCheck,
  Phone,
  Timer,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getServiceBySlug, getAllServices } from "@/lib/queries";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug).catch(() => null);
  if (!service) return { title: "Service not found" };
  return {
    title: service.name,
    description: service.description.slice(0, 160),
    openGraph: {
      title: `${service.name} | ${site.name}`,
      description: service.description.slice(0, 160),
      images: ["/logo.jpeg"],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug).catch(() => null);
  if (!service) notFound();

  const others = (await getAllServices().catch(() => [])).filter(
    (s) => s.slug !== service.slug
  );

  return (
    <>
      <PageHeader
        eyebrow={`${service.category} Department`}
        title={service.name}
        description={service.description}
        crumbs={[
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <Section className="bg-white">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            {/* Intro card + full test list */}
            <div className="lg:col-span-2">
              <Reveal>
                <div className="flex flex-col gap-6 rounded-[2rem] bg-cloud-100 p-7 sm:flex-row sm:items-center sm:p-9">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-crimson-700 to-crimson-500 text-white shadow-crimson">
                    <ServiceIcon name={service.icon} className="h-8 w-8" />
                  </span>
                  <div>
                    <Badge tone="crimson">{service.category}</Badge>
                    <p className="mt-3 text-sm leading-relaxed text-navy-600 sm:text-base">
                      {service.description}
                    </p>
                    <p className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                      <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                      {service.tests.length} tests with typical turnaround
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="font-heading text-2xl font-extrabold tracking-tight text-navy-950 sm:text-3xl">
                    Tests in this{" "}
                    <span className="accent-word squiggle">department</span>
                  </h2>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {service.tests.map((test) => (
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
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-navy-800">
                            {test.name}
                          </span>
                          {test.turnaround ? (
                            <span className="mt-2 inline-flex">
                              <Badge tone="cloud">
                                <Timer className="h-3 w-3" aria-hidden="true" />
                                {test.turnaround}
                              </Badge>
                            </span>
                          ) : null}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Side CTA card */}
            <aside className="lg:col-span-1">
              <Reveal delay={80}>
                <div className="sticky top-28 overflow-hidden rounded-[2rem] bg-gradient-to-b from-navy-950 to-navy-900 p-7 text-white shadow-card sm:p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-crimson-600/30 blur-3xl"
                  />
                  <div className="relative">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-500">
                      Ready to book?
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-extrabold tracking-tight">
                      Book {service.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-white/70">
                      Choose walk-in at our Makurdi lab or home sample
                      collection across Makurdi. You&apos;ll get a reference
                      number and confirmation email immediately.
                    </p>
                    <ButtonLink
                      href={`/book?service=${service.slug}`}
                      variant="primary"
                      size="lg"
                      className="mt-6 w-full"
                    >
                      <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                      Book a Test
                    </ButtonLink>
                    <a
                      href={`tel:${site.phoneHref}`}
                      className="mt-3 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {site.phone}
                    </a>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-500">
                        Other departments
                      </p>
                      <ul className="mt-3 space-y-1">
                        {others.map((other) => (
                          <li key={other.slug}>
                            <Link
                              href={`/services/${other.slug}`}
                              className="flex min-h-[44px] items-center justify-between gap-2 rounded-xl px-3 -mx-3 text-sm font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
                            >
                              {other.name}
                              <ArrowRight
                                className="h-3.5 w-3.5 shrink-0"
                                aria-hidden="true"
                              />
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

      {/* Bottom CTA strip */}
      <Section className="bg-blush-100">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Next step"
            title="Not sure which tests"
            accent="you need"
            description="Book a walk-in or home collection and our team will help you pick the right panels — with clear turnaround times before you pay."
            action={
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/book" variant="primary" size="lg">
                  Book a Test
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/packages" variant="outline" size="lg">
                  See test packages
                </ButtonLink>
              </div>
            }
          />
        </Container>
      </Section>
    </>
  );
}
