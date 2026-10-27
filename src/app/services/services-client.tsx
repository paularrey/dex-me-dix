"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Search, X } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import { cn } from "@/lib/utils";
import type { getAllServices } from "@/lib/queries";

type Service = Awaited<ReturnType<typeof getAllServices>>[number];

/* Distinct soft tint per category (index matches derived category order). */
const tints = [
  { bg: "bg-crimson-50", text: "text-crimson-700" },
  { bg: "bg-navy-50", text: "text-navy-800" },
  { bg: "bg-amber-300/30", text: "text-amber-600" },
  { bg: "bg-blush-100", text: "text-crimson-800" },
  { bg: "bg-cloud-100", text: "text-navy-700" },
  { bg: "bg-crimson-100", text: "text-crimson-800" },
];

/** Same-day or ≤24h turnarounds get the amber chip. */
function isFastTurnaround(turnaround: string) {
  if (/same day/i.test(turnaround)) return true;
  const hours = turnaround.match(/(\d+)\s*hour/);
  return hours !== null && Number(hours[1]) <= 24;
}

export function ServicesClient({ services }: { services: Service[] }) {
  const categories = useMemo(
    () => Array.from(new Set(services.map((s) => s.category))),
    [services]
  );
  const tabs = useMemo(() => ["All", ...categories], [categories]);

  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const scrollerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  /* Sliding crimson indicator — measured before paint, re-measured on resize. */
  useLayoutEffect(() => {
    const measure = () => {
      const index = tabs.indexOf(active);
      const btn = tabRefs.current[index];
      if (btn) setIndicator({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active, tabs]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services
      .filter((s) => active === "All" || s.category === active)
      .map((s) => {
        if (!q) return { service: s, tests: s.tests };
        const nameHit = s.name.toLowerCase().includes(q);
        const tests = nameHit
          ? s.tests
          : s.tests.filter((t) => t.name.toLowerCase().includes(q));
        return { service: s, tests };
      })
      .filter((entry) => entry.tests.length > 0);
  }, [services, active, query]);

  const testCount = visible.reduce((n, entry) => n + entry.tests.length, 0);

  const selectTab = (tab: string, index: number) => {
    setActive(tab);
    const scroller = scrollerRef.current;
    const btn = tabRefs.current[index];
    if (scroller && btn) {
      scroller.scrollTo({
        left: Math.max(0, btn.offsetLeft - 16),
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Sticky category tabs + instant search */}
      <div className="sticky top-[4.25rem] z-30 border-b border-navy-100 bg-white/90 backdrop-blur-xl sm:top-[4.5rem]">
        <Container>
          <div className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div
              ref={scrollerRef}
              className="-mx-1 flex overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <div
                role="tablist"
                aria-label="Filter tests by department"
                className="relative flex gap-1.5"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-crimson-700 to-crimson-500 shadow-crimson transition-all duration-300 ease-out"
                  style={{
                    transform: `translateX(${indicator.left}px)`,
                    width: indicator.width,
                  }}
                />
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    aria-selected={active === tab}
                    onClick={() => selectTab(tab, i)}
                    className={cn(
                      "relative z-10 min-h-[44px] shrink-0 whitespace-nowrap rounded-full px-4 text-sm font-bold transition-colors duration-200",
                      active === tab
                        ? "text-white"
                        : "text-navy-600 hover:text-crimson-700"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative w-full shrink-0 lg:w-72">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by test name…"
                aria-label="Search tests by name"
                className="h-11 w-full rounded-full border-[1.5px] border-navy-200 bg-cloud-50 pl-11 pr-10 text-sm font-semibold text-navy-950 transition placeholder:font-normal placeholder:text-navy-400 focus:border-crimson-500 focus:outline-none focus:ring-4 focus:ring-crimson-500/10"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-navy-400 transition hover:bg-navy-100 hover:text-navy-700"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
        </Container>
      </div>

      {/* Test cards */}
      <Section className="bg-white">
        <Container>
          <p className="text-sm font-semibold text-navy-400" aria-live="polite">
            Showing {testCount} {testCount === 1 ? "test" : "tests"} across{" "}
            {visible.length}{" "}
            {visible.length === 1 ? "department" : "departments"}
          </p>

          {visible.length === 0 ? (
            <div className="mt-8 rounded-[2rem] border border-dashed border-navy-200 bg-cloud-50 p-12 text-center">
              <p className="font-heading text-xl font-extrabold text-navy-950">
                No tests match your search
              </p>
              <p className="mt-2 text-sm text-navy-500">
                Try a different test name, or clear the filters to see
                everything.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActive("All");
                }}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-gradient-to-r from-crimson-700 to-crimson-500 px-6 py-3 text-sm font-bold text-white shadow-crimson transition hover:-translate-y-0.5"
              >
                Reset filters
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visible.map(({ service, tests }, i) => {
                const tint =
                  tints[
                    Math.max(
                      0,
                      categories.indexOf(service.category)
                    ) % tints.length
                  ];
                return (
                  <Reveal key={service.slug} delay={i * 50} className="h-full">
                    <Link
                      href={`/services/${service.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                    >
                      <div
                        className={cn(
                          "border-b border-navy-100 p-6 sm:p-7",
                          tint.bg
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <span
                            className={cn(
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/85 shadow-soft",
                              tint.text
                            )}
                          >
                            <ServiceIcon
                              name={service.icon}
                              className="h-6 w-6"
                            />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p
                              className={cn(
                                "text-xs font-bold uppercase tracking-[0.18em]",
                                tint.text
                              )}
                            >
                              {service.category}
                            </p>
                            <h2 className="mt-1 font-heading text-xl font-extrabold tracking-tight text-navy-950">
                              {service.name}
                            </h2>
                          </div>
                          <ArrowRight
                            className="h-5 w-5 shrink-0 text-navy-300 transition duration-300 group-hover:translate-x-1 group-hover:text-crimson-700"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-navy-500">
                          {service.description}
                        </p>
                      </div>

                      <ul className="flex-1 divide-y divide-navy-100 px-6 pb-2 pt-1 sm:px-7">
                        {tests.map((test) => (
                          <li
                            key={test.id}
                            className="flex items-center justify-between gap-3 py-3"
                          >
                            <span className="flex min-w-0 items-center gap-2.5 text-sm font-semibold text-navy-700">
                              <Check
                                className="h-4 w-4 shrink-0 text-crimson-600"
                                aria-hidden="true"
                              />
                              {test.name}
                            </span>
                            {test.turnaround ? (
                              <Badge
                                tone={
                                  isFastTurnaround(test.turnaround)
                                    ? "amber"
                                    : "cloud"
                                }
                                className="shrink-0"
                              >
                                {test.turnaround}
                              </Badge>
                            ) : null}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto flex items-center justify-between border-t border-navy-100 px-6 py-4 sm:px-7">
                        <span className="text-xs font-bold uppercase tracking-[0.14em] text-navy-400">
                          {service.tests.length}{" "}
                          {service.tests.length === 1 ? "test" : "tests"}{" "}
                          available
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-crimson-700 transition group-hover:gap-2.5">
                          View department
                          <ArrowRight
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
