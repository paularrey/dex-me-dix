"use client";

import { useId } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Animated ECG heartbeat line.
 * `variant`: "hero" (thick, draws under headline), "divider" (full-width),
 * "flatline" (stopped pulse for the 404 page).
 */
export function ECGLine({
  className,
  variant = "hero",
  color = "#B5122B",
  animate = true,
}: {
  className?: string;
  variant?: "hero" | "divider" | "flatline";
  color?: string;
  animate?: boolean;
}) {
  const id = useId();

  // One full heartbeat cycle, mirrored twice so the line fills wide containers.
  const path =
    "M0 30 H80 l12 -22 10 44 12 -58 12 46 10 -10 H260 l12 -22 10 44 12 -58 12 46 10 -10 H520 l12 -22 10 44 12 -58 12 46 10 -10 H800";

  const flat = "M0 30 H120 l6 -6 6 12 6 -6 H800";

  const strokeWidth = variant === "hero" ? 3 : 2;

  return (
    <div className={cn("w-full overflow-hidden", className)} aria-hidden="true">
      <svg
        viewBox="0 0 800 60"
        preserveAspectRatio="none"
        className="h-full w-full"
        fill="none"
        role="presentation"
      >
        <defs>
          <linearGradient id={`ecg-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.15" />
            <stop offset="20%" stopColor={color} stopOpacity="1" />
            <stop offset="80%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d={variant === "flatline" ? flat : path}
          stroke={`url(#ecg-${id})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={animate ? "ecg-path" : undefined}
          style={{ ["--ecg-length" as string]: "2400" }}
        />
      </svg>
    </div>
  );
}

/** Thin ECG divider between sections. */
export function ECGDivider({ className }: { className?: string }) {
  return (
    <Reveal className={cn("w-full", className)}>
      <ECGLine variant="divider" className="h-10 md:h-14" />
    </Reveal>
  );
}
