import { ArrowRight, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ECGLine } from "@/components/ui/ecg-line";

/** Full-bleed navy→crimson gradient card with a floating heart and white pill CTA. */
export function FinalCta() {
  return (
    <section className="bg-white pb-16 md:pb-24" aria-labelledby="cta-title">
      <Container>
        <Reveal>
          <div className="grain relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-navy-950 via-navy-900 to-crimson-800 px-6 py-16 text-center shadow-card sm:px-12 md:py-20">
            {/* faint ECG across the card */}
            <ECGLine
              className="pointer-events-none absolute inset-x-0 top-6 h-14 opacity-25"
              color="#FFB547"
              animate
            />

            {/* Floating heart */}
            <span className="absolute left-6 top-8 flex h-14 w-14 animate-float items-center justify-center rounded-2xl bg-white/10 text-amber-500 ring-1 ring-white/15 sm:left-12">
              <svg
                viewBox="0 0 24 24"
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                <path d="M3.22 13H9.5l.5-1 2 4 .5-2 1 1h5.78" />
              </svg>
            </span>

            {/* amber sticker */}
            <span className="absolute right-6 top-10 hidden -rotate-6 rounded-full bg-amber-500 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-navy-950 shadow-soft sm:inline-flex sm:right-12">
              No payment online
            </span>

            <div className="relative mx-auto max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
                Ready when you are
              </p>
              <h2
                id="cta-title"
                className="mt-5 font-heading text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
              >
                Your health can&apos;t wait.{" "}
                <span className="accent-word text-amber-400">Book</span> in 2 minutes.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75">
                Walk in to our Makurdi lab or let our phlebotomist come to
                you — either way, results within 24 hours.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/book"
                  className="group inline-flex min-h-[56px] items-center gap-2 rounded-full bg-white px-9 text-base font-bold text-navy-950 shadow-card transition hover:-translate-y-0.5 hover:shadow-card-hover"
                >
                  <CalendarCheck className="h-5 w-5 text-crimson-700" aria-hidden="true" />
                  Book a Test
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[56px] items-center rounded-full border-2 border-white/25 px-9 text-base font-bold text-white transition hover:border-white/60 hover:bg-white/5"
                >
                  Browse services
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
