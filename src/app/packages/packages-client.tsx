"use client";

import { useMemo } from "react";
import { ArrowRight, Check, ChevronDown, Minus } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { getPackagesWithTests } from "@/lib/queries";

type Package = Awaited<ReturnType<typeof getPackagesWithTests>>[number];

/** Cap the comparison matrix so the table stays scannable. */
const MAX_COMPARISON_TESTS = 16;

export function PackagesClient({
  packages,
  popularSlug,
}: {
  packages: Package[];
  popularSlug: string | null;
}) {
  /* Union of each package's first 8 tests (order-preserving), capped. */
  const comparisonTests = useMemo(() => {
    const names: string[] = [];
    const seen = new Set<string>();
    for (const pkg of packages) {
      for (const test of pkg.tests.slice(0, 8)) {
        if (!seen.has(test.name)) {
          seen.add(test.name);
          names.push(test.name);
        }
      }
    }
    return names.slice(0, MAX_COMPARISON_TESTS);
  }, [packages]);

  return (
    <>
      {/* Pricing cards */}
      <Section className="bg-blush-100">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Best value"
            title="One visit,"
            accent="everything included"
            description="Every bundle covers every test on its list — one clear report, no hidden charges. Book in two minutes and settle at the lab when you arrive."
          />

          <div className="mx-auto mt-14 grid max-w-5xl gap-8 sm:grid-cols-2">
            {packages.map((pkg, i) => {
              const popular = pkg.slug === popularSlug;
              const extra = pkg.tests.length - 6;

              return (
                <Reveal key={pkg.slug} delay={i * 60} className="h-full">
                  <article
                    className={cn(
                      "relative flex h-full flex-col rounded-[2rem] bg-white p-7 transition duration-300 hover:-translate-y-1 sm:p-8",
                      popular
                        ? "shadow-glow-crimson ring-1 ring-crimson-700/40"
                        : "shadow-card hover:shadow-card-hover"
                    )}
                  >
                    {popular ? (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 -rotate-3 rounded-full bg-amber-500 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-navy-950 shadow-soft">
                        Most popular
                      </span>
                    ) : null}

                    <Badge
                      tone={popular ? "crimson" : "cloud"}
                      className="self-start"
                    >
                      {pkg.testCount} tests
                    </Badge>

                    <h3 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-navy-950">
                      {pkg.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-navy-500">
                      {pkg.summary}
                    </p>

                    <div className="mt-6 rounded-2xl bg-cloud-100 px-5 py-4">
                      <p className="font-heading text-4xl font-extrabold tracking-tight text-crimson-700">
                        {pkg.testCount}
                      </p>
                      <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.14em] text-navy-500">
                        tests · one visit · one report
                      </p>
                      <p className="mt-1.5 text-xs font-semibold text-navy-400">
                        Pay at the lab · no online payment
                      </p>
                    </div>

                    <ul className="mt-7 flex-1 space-y-2.5 border-t border-navy-100 pt-7">
                      {pkg.tests.slice(0, 6).map((test) => (
                        <li key={test.id} className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-crimson-100 text-crimson-700">
                            <Check
                              className="h-3 w-3"
                              strokeWidth={3}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="text-sm font-semibold leading-snug text-navy-700">
                            {test.name}
                          </span>
                        </li>
                      ))}
                      {extra > 0 ? (
                        <li className="pl-8 text-xs font-bold uppercase tracking-[0.14em] text-navy-400">
                          +{extra} more
                        </li>
                      ) : null}
                    </ul>

                    <ButtonLink
                      href={`/book?package=${pkg.slug}`}
                      variant="primary"
                      size="lg"
                      className="mt-8 w-full"
                    >
                      Book Now
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </ButtonLink>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Comparison — desktop table + mobile accordions */}
      <Section className="bg-white">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Compare"
            title="Which bundle fits,"
            accent="side by side"
            description="The first tests from every package, lined up so you can see exactly what changes as you move up."
          />

          <div className="mt-14 hidden overflow-x-auto rounded-[2rem] border border-navy-100 bg-white shadow-card md:block">
            <table className="w-full min-w-[820px] border-collapse text-left">
              <caption className="sr-only">
                Test package comparison — test counts and included tests
              </caption>
              <thead>
                <tr className="border-b border-navy-200 bg-cloud-50">
                  <th
                    scope="col"
                    className="py-5 pl-7 pr-4 text-xs font-bold uppercase tracking-[0.14em] text-navy-400"
                  >
                    Package
                  </th>
                  {packages.map((pkg) => (
                    <th
                      key={pkg.id}
                      scope="col"
                      className={cn(
                        "px-4 py-5 text-center",
                        pkg.slug === popularSlug && "bg-crimson-50"
                      )}
                    >
                      <span className="block font-heading text-sm font-extrabold tracking-tight text-navy-950">
                        {pkg.name}
                      </span>
                      <span className="mt-1 block text-xs font-bold text-crimson-700">
                        {pkg.testCount} tests
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-navy-100">
                  <th
                    scope="row"
                    className="py-4 pl-7 pr-4 text-sm font-bold text-navy-800"
                  >
                    Tests included
                  </th>
                  {packages.map((pkg) => (
                    <td
                      key={pkg.id}
                      className={cn(
                        "px-4 py-4 text-center text-sm font-extrabold text-navy-950",
                        pkg.slug === popularSlug && "bg-crimson-50/60"
                      )}
                    >
                      {pkg.testCount}
                    </td>
                  ))}
                </tr>
                {comparisonTests.map((name) => (
                  <tr
                    key={name}
                    className="border-b border-navy-100 transition-colors last:border-b-0 hover:bg-cloud-50"
                  >
                    <th
                      scope="row"
                      className="py-3 pl-7 pr-4 text-sm font-semibold text-navy-700"
                    >
                      {name}
                    </th>
                    {packages.map((pkg) => {
                      const included = pkg.tests.some((t) => t.name === name);
                      return (
                        <td
                          key={pkg.id}
                          className={cn(
                            "px-4 py-3 text-center",
                            pkg.slug === popularSlug && "bg-crimson-50/60"
                          )}
                        >
                          {included ? (
                            <span
                              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-crimson-100 text-crimson-700"
                              title="Included"
                            >
                              <Check
                                className="h-3.5 w-3.5"
                                strokeWidth={3}
                                aria-hidden="true"
                              />
                              <span className="sr-only">Included</span>
                            </span>
                          ) : (
                            <span
                              className="inline-flex h-6 w-6 items-center justify-center text-navy-300"
                              title="Not included"
                            >
                              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                              <span className="sr-only">Not included</span>
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-navy-200 bg-cloud-50">
                  <th scope="row" className="py-5 pl-7 pr-4">
                    <span className="sr-only">Book</span>
                  </th>
                  {packages.map((pkg) => (
                    <td key={pkg.id} className="px-4 py-5 text-center">
                      <ButtonLink
                        href={`/book?package=${pkg.slug}`}
                        variant={
                          pkg.slug === popularSlug ? "primary" : "outline"
                        }
                        size="sm"
                      >
                        Book
                      </ButtonLink>
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Mobile accordions */}
          <div className="mt-12 space-y-4 md:hidden">
            {packages.map((pkg) => (
              <details
                key={pkg.id}
                className="group overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white shadow-soft open:shadow-card"
              >
                <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="min-w-0">
                    <span className="block font-heading text-base font-extrabold tracking-tight text-navy-950">
                      {pkg.name}
                      {pkg.slug === popularSlug ? (
                        <span className="ml-2 inline-block -rotate-3 rounded-full bg-amber-500 px-2 py-0.5 align-middle text-[10px] font-extrabold uppercase tracking-wider text-navy-950">
                          Popular
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-0.5 block text-xs font-bold text-crimson-700">
                      {pkg.testCount} tests · one visit
                    </span>
                  </span>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-navy-400 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <ul className="space-y-2.5 border-t border-navy-100 px-6 py-5">
                  {pkg.tests.map((test) => (
                    <li key={test.id} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-crimson-100 text-crimson-700">
                        <Check
                          className="h-3 w-3"
                          strokeWidth={3}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-sm font-semibold text-navy-700">
                        {test.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="px-6 pb-6">
                  <ButtonLink
                    href={`/book?package=${pkg.slug}`}
                    variant="primary"
                    className="w-full"
                  >
                    Book {pkg.name}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </ButtonLink>
                </div>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
