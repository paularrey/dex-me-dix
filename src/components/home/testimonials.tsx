"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import type { getTestimonials } from "@/lib/queries";

type Testimonial = Awaited<ReturnType<typeof getTestimonials>>[number];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={cn("h-5 w-5", i < rating ? "fill-amber-500" : "fill-navy-200")}
          aria-hidden="true"
        >
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

/** Large single-quote slider with avatar switcher — swipeable on touch devices. */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduce = useReducedMotion();

  if (testimonials.length === 0) return null;

  const active = testimonials[index];

  const go = (next: number) => {
    const target = (next + testimonials.length) % testimonials.length;
    setDirection(target > index || (index === testimonials.length - 1 && target === 0) ? 1 : -1);
    setIndex(target);
  };

  return (
    <Section id="stories" ariaLabelledBy="stories-title" className="bg-cloud-100">
      <Container>
        <SectionHeader
          id="stories-title"
          eyebrow="Patient stories"
          title="Real people,"
          accent="real relief"
          description="A few words from the patients and families we test every week."
        />

        <Reveal className="mx-auto mt-14 max-w-4xl">
          <div
            className="relative rounded-[2.5rem] border border-cloud-200 bg-white p-8 shadow-card sm:p-12"
            onTouchStart={(e) => {
              (e.currentTarget as HTMLElement & { _x?: number })._x = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const startX = (e.currentTarget as HTMLElement & { _x?: number })._x ?? 0;
              const delta = e.changedTouches[0].clientX - startX;
              if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
            }}
          >
            {/* Giant crimson quotation mark */}
            <Quote
              className="absolute -top-6 left-8 h-16 w-16 rotate-180 fill-crimson-100 text-crimson-100 sm:left-12"
              aria-hidden="true"
            />

            <div className="relative min-h-[15rem] sm:min-h-[13rem]">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.figure
                  key={active.id}
                  custom={direction}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <Stars rating={active.rating} />
                  <blockquote className="mt-5 font-heading text-xl font-semibold leading-relaxed tracking-tight text-navy-950 sm:text-2xl">
                    “{active.content}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-crimson-700 to-crimson-500 font-heading text-sm font-extrabold text-white shadow-crimson">
                      {active.initials}
                    </span>
                    <span>
                      <span className="block font-heading text-sm font-extrabold text-navy-950">
                        {active.name}
                      </span>
                      <span className="block text-xs font-medium text-navy-400">{active.role}</span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-cloud-200 pt-6">
              <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose a testimonial">
                {testimonials.map((t, i) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial from ${t.name}`}
                    onClick={() => go(i)}
                    className={cn(
                      "relative h-10 w-10 overflow-hidden rounded-full font-heading text-[11px] font-extrabold transition",
                      i === index
                        ? "bg-navy-950 text-white ring-2 ring-crimson-600 ring-offset-2"
                        : "bg-cloud-200 text-navy-500 hover:bg-navy-100"
                    )}
                  >
                    {t.initials}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => go(index - 1)}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy-200 text-navy-700 transition hover:border-crimson-600 hover:text-crimson-700"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  onClick={() => go(index + 1)}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-950 text-white transition hover:bg-crimson-700"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
