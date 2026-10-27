import Link from "next/link";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { getPackagesWithTests } from "@/lib/queries";

type Pkg = Awaited<ReturnType<typeof getPackagesWithTests>>[number];

const POPULAR_SLUG = "executive-check";
const MAX_INCLUSIONS = 6;

export function TestPackages({ packages }: { packages: Pkg[] }) {
  if (packages.length === 0) return null;

  return (
    <Section id="packages" ariaLabelledBy="packages-title" className="overflow-hidden bg-blush-100">
      {/* soft mesh accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-crimson-200/50 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-amber-200/40 blur-[100px]"
      />

      <Container className="relative">
        <SectionHeader
          id="packages-title"
          eyebrow="Test packages"
          title="Bundles that do"
          accent="more"
          description="One visit, one clear report — the panels people book most, bundled together."
          action={
            <Link
              href="/packages"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-navy-200 bg-white px-6 py-3 text-sm font-bold text-navy-800 transition hover:border-crimson-600 hover:text-crimson-700"
            >
              Compare all packages
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          }
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg, i) => {
            const popular = pkg.slug === POPULAR_SLUG;
            return (
              <Reveal key={pkg.slug} delay={i * 70} className={popular ? "xl:-mt-6" : undefined}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col rounded-[2rem] p-7 transition duration-300",
                    popular
                      ? "bg-white shadow-glow-crimson ring-1 ring-crimson-700/40 xl:p-8"
                      : "bg-white shadow-card hover:-translate-y-1.5 hover:shadow-card-hover"
                  )}
                >
                  {popular ? (
                    <span className="absolute -top-3.5 right-6 inline-flex -rotate-3 items-center gap-1.5 rounded-full bg-amber-500 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-navy-950 shadow-soft">
                      <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                      Most popular
                    </span>
                  ) : null}

                  <span className="inline-flex w-fit rounded-full bg-cloud-100 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy-600">
                    Health package
                  </span>

                  <h3 className="mt-4 font-heading text-xl font-extrabold text-navy-950">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">{pkg.summary}</p>

                  <div className="mt-6 rounded-2xl bg-cloud-100 px-5 py-4">
                    <p className={cn("font-heading font-extrabold tracking-tight", popular ? "text-5xl text-crimson-700" : "text-4xl text-navy-950")}>
                      {pkg.testCount}
                    </p>
                    <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.14em] text-navy-500">
                      tests · one visit · one report
                    </p>
                    <p className="mt-1.5 text-xs font-semibold text-navy-400">
                      Pay at the lab · no online payment
                    </p>
                  </div>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {pkg.tests.slice(0, MAX_INCLUSIONS).map((t) => (
                      <li key={t.name} className="flex items-start gap-2.5 text-sm text-navy-600">
                        <span
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            popular ? "bg-crimson-100 text-crimson-700" : "bg-cloud-100 text-navy-700"
                          )}
                        >
                          <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        {t.name}
                      </li>
                    ))}
                    {pkg.tests.length > MAX_INCLUSIONS ? (
                      <li className="pl-7.5 text-xs font-bold text-navy-400">
                        + {pkg.tests.length - MAX_INCLUSIONS} more included
                      </li>
                    ) : null}
                  </ul>

                  <Link
                    href={`/book?package=${pkg.slug}`}
                    className={cn(
                      "mt-7 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full text-sm font-bold transition-all duration-200",
                      popular
                        ? "bg-gradient-to-r from-crimson-700 to-crimson-500 text-white shadow-crimson hover:-translate-y-0.5 hover:shadow-card-hover"
                        : "border-2 border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white"
                    )}
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
