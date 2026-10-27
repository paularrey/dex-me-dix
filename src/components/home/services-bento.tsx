"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { getFeaturedServices } from "@/lib/queries";
import { cn } from "@/lib/utils";

type Service = Awaited<ReturnType<typeof getFeaturedServices>>[number];

/* Distinct soft tint per department. */
const tints = [
  "from-crimson-100 to-blush-50 text-crimson-700",
  "from-navy-100 to-cloud-50 text-navy-800",
  "from-amber-300/40 to-amber-100/40 text-amber-600",
  "from-crimson-200/60 to-crimson-50 text-crimson-800",
  "from-navy-200/60 to-navy-50 text-navy-700",
  "from-amber-400/30 to-blush-50 text-amber-600",
];

/** Bento grid — one large featured card + mixed medium/small cards. */
export function ServicesBento({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  const [featured, ...rest] = services;

  return (
    <Section id="services" ariaLabelledBy="services-title" className="bg-white">
      <Container>
        <SectionHeader
          id="services-title"
          eyebrow="Our Services"
          title="Six departments,"
          accent="one standard"
          description="Every test is run on validated platforms and double-checked before release — whether it's a routine panel or advanced genetics."
          action={
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-navy-200 px-6 py-3 text-sm font-bold text-navy-800 transition hover:border-crimson-600 hover:text-crimson-700"
            >
              View All Services
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-14 grid gap-5 auto-rows-[minmax(180px,auto)] md:grid-cols-3">
          {/* Large featured card */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <Link
              href={`/services/${featured.slug}`}
              className="group relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-950 via-navy-900 to-crimson-900 p-8 text-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover md:p-10"
            >
              {/* Mini ECG illustration */}
              <svg viewBox="0 0 400 80" className="pointer-events-none absolute inset-x-0 bottom-16 h-20 w-full opacity-30" fill="none" aria-hidden="true">
                <path
                  d="M0 40h60l10-22 10 44 12-58 12 46 10-10h60l10-22 10 44 12-58 12 46 10-10h60l10-22 10 44 12-58 12 46 10-10h60"
                  stroke="#E13A56"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="relative z-10">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-amber-500 ring-1 ring-white/15">
                  <ServiceIcon name={featured.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-6 font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
                  {featured.name}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75 md:text-base">
                  {featured.description}
                </p>
              </div>

              <div className="relative mt-8 flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider ring-1 ring-white/15">
                  {featured._count.tests} tests available
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crimson-600 text-white shadow-crimson transition group-hover:scale-110">
                  <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Smaller cards */}
          {rest.map((service, i) => (
            <Reveal key={service.slug} delay={i * 60}>
              <Link
                href={`/services/${service.slug}`}
                className={cn(
                  "group relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card",
                  tints[i % tints.length]
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 shadow-soft">
                    <ServiceIcon name={service.icon} className="h-5.5 w-5.5" />
                  </span>
                  <ArrowUpRight className="h-5 w-5 opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
                </div>
                <div className="mt-6">
                  <h3 className="font-heading text-lg font-extrabold text-navy-950">
                    {service.name}
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider opacity-70">
                    {service._count.tests} tests
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
