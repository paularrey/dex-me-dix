"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";

const stats = [
  { value: 25000, suffix: "+", label: "Tests done" },
  { value: 2000, suffix: "+", label: "Happy patients" },
  { value: 8, suffix: "+", label: "Years of care" },
  { value: 24, suffix: "h", label: "Turnaround" },
];

function useCounter(target: number, active: boolean) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active || reduce) return;
    let frame = 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, reduce]);

  if (reduce) return target;
  if (!active) return 0;
  return value;
}

function Counter({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const n = useCounter(value, active);
  return (
    <div className="px-4 py-6 text-center md:px-8">
      <p className="font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
        {n.toLocaleString("en-NG")}
        <span className="text-crimson-500">{suffix}</span>
      </p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-navy-300 md:text-sm">
        {label}
      </p>
    </div>
  );
}

/** Dark midnight band with 4 huge animated counters separated by thin lines. */
export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="grain relative overflow-hidden bg-navy-950 py-16 md:py-20" ref={ref}>
      {/* faint ECG background */}
      <svg viewBox="0 0 1200 120" className="pointer-events-none absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2 opacity-[0.07]" fill="none" aria-hidden="true">
        <path d="M0 60h200l14-30 14 60 16-80 16 62 14-12h200l14-30 14 60 16-80 16 62 14-12h200l14-30 14 60 16-80 16 62 14-12h200" stroke="#E13A56" strokeWidth="3" />
      </svg>

      <Container className="relative">
        <div className="grid grid-cols-2 divide-x divide-y divide-white/10 md:grid-cols-4 md:divide-y-0">
          {stats.map((s) => (
            <Counter key={s.label} {...s} active={inView} />
          ))}
        </div>
      </Container>
    </div>
  );
}
