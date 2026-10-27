"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Timer, Home, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ECGLine } from "@/components/ui/ecg-line";
import { GlassCard, RotatingBadge } from "@/components/ui/glass-card";

const glassStats = [
  { label: "Results in 24h", Icon: Timer },
  { label: "Home collection", Icon: Home },
  { label: "Certified lab", Icon: BadgeCheck },
];

/* TODO: replace avatars with real patient photos (or keep initials). */
const avatars = [
  { initials: "AO", bg: "bg-crimson-600" },
  { initials: "TB", bg: "bg-navy-800" },
  { initials: "SA", bg: "bg-amber-500 text-navy-950" },
  { initials: "KM", bg: "bg-crimson-800" },
];

function Stars({ className }: { className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className ?? ""}`} aria-label="4.9 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-4 w-4 fill-amber-500" aria-hidden="true">
          <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Blurred crimson + navy blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-crimson-200/50 blur-[120px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-navy-200/40 blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-200/30 blur-[100px]" />

      <Container>
        <motion.div
          variants={reduce ? undefined : container}
          initial={reduce ? undefined : "hidden"}
          animate={reduce ? undefined : "show"}
          className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
        >
          {/* ------------------------------ Copy ------------------------------ */}
          <div className="relative z-10">
            <motion.div variants={reduce ? undefined : item}>
              <Badge tone="crimson">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson-700" />
                Trusted lab in Lagos
              </Badge>
            </motion.div>

            <motion.h1
              variants={reduce ? undefined : item}
              className="mt-6 font-heading text-5xl font-extrabold leading-[1.04] tracking-tight text-navy-950 sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            >
              Accurate tests.
              <br />
              <span className="accent-word">Better</span> decisions.
            </motion.h1>

            {/* Animated ECG underline */}
            <motion.div variants={reduce ? undefined : item} className="mt-2 max-w-md">
              <ECGLine className="h-12" animate />
            </motion.div>

            <motion.p
              variants={reduce ? undefined : item}
              className="mt-5 max-w-xl text-lg leading-relaxed text-navy-500"
            >
              From routine blood work to advanced molecular diagnostics, DexMedix
              delivers dependable results with 24-hour turnaround — in our
              Victoria Island lab or at your home.
            </motion.p>

            <motion.div variants={reduce ? undefined : item} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/book"
                className="group inline-flex min-h-[52px] items-center gap-2 rounded-full bg-gradient-to-r from-crimson-700 to-crimson-500 px-8 text-base font-bold text-white shadow-crimson transition hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                Book a Test
                <ArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex min-h-[52px] items-center rounded-full border-2 border-navy-200 bg-white px-8 text-base font-bold text-navy-800 transition hover:border-navy-950"
              >
                Explore Services
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={reduce ? undefined : item} className="mt-10 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-3">
                {avatars.map(({ initials, bg }) => (
                  <span
                    key={initials}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ring-1 ring-navy-100 ${bg}`}
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                ))}
              </div>
              <div>
                <Stars />
                <p className="mt-0.5 text-sm font-semibold text-navy-600">
                  <span className="font-extrabold text-navy-950">4.9</span> from 2,000+ patients
                </p>
              </div>
            </motion.div>
          </div>

          {/* ------------------------------ Image ----------------------------- */}
          <motion.div
            variants={reduce ? undefined : item}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden blob-mask bg-navy-100 shadow-[0_40px_90px_-30px_rgba(181,18,43,0.35)]">
              {/* TODO: replace with a real photo of a DexMedix lab scientist */}
              <Image
                src="/images/hero-lab-scientist.jpg"
                alt="DexMedix laboratory scientist examining a sample under the microscope"
                fill
                priority
                sizes="(min-width: 1024px) 44vw, (min-width: 640px) 70vw, 90vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
            </div>

            {/* Floating glass stat cards */}
            <div className="absolute inset-0">
              {glassStats.map(({ label, Icon }, i) => (
                <GlassCard
                  key={label}
                  className={`absolute animate-float ${
                    i === 0 ? "left-0 top-8" : i === 1 ? "right-0 top-1/3" : "bottom-10 left-4"
                }`}
              >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-crimson-100 text-crimson-700">
                      <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span className="whitespace-nowrap text-sm font-bold text-navy-950">{label}</span>
                  </div>
                </GlassCard>
              ))}
            </div>

            {/* Rotating text badge */}
            <RotatingBadge className="absolute -right-2 -top-4 hidden md:flex" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
