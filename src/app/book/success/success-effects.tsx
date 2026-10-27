"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONFETTI_DOTS = [
  { left: "8%", size: 9, color: "#FFB547", delay: 0, duration: 2.4 },
  { left: "20%", size: 7, color: "#B5122B", delay: 0.35, duration: 2.8 },
  { left: "33%", size: 8, color: "#1B2F6B", delay: 0.15, duration: 2.2 },
  { left: "47%", size: 10, color: "#E13A56", delay: 0.5, duration: 2.6 },
  { left: "61%", size: 7, color: "#FFB547", delay: 0.25, duration: 2.4 },
  { left: "74%", size: 9, color: "#1B2F6B", delay: 0.6, duration: 2.8 },
  { left: "88%", size: 8, color: "#B5122B", delay: 0.4, duration: 2.3 },
];

/** Subtle falling confetti behind the confirmation card content. Decorative only. */
export function Confetti() {
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {CONFETTI_DOTS.map((dot, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: dot.left,
            top: 0,
            width: dot.size,
            height: dot.size,
            backgroundColor: dot.color,
          }}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 340, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

/** Crimson gradient check that scales into place. */
export function SuccessCheck() {
  const reduce = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-crimson-700 to-crimson-500 shadow-crimson"
      initial={reduce ? false : { scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.05 }}
    >
      <Check className="h-11 w-11 text-white" strokeWidth={2.5} aria-hidden="true" />
    </motion.span>
  );
}

async function writeToClipboard(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    /* clipboard blocked — fall through to legacy copy */
  }

  try {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(field);
    return copied;
  } catch {
    /* copy unsupported */
    return false;
  }
}

/** Copies the booking reference to the clipboard with a "Copied!" state. */
export function CopyReferenceButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    const ok = await writeToClipboard(value);
    if (!ok) return;

    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  }

  return (
    <Button
      variant="white"
      size="sm"
      onClick={handleCopy}
      className="shrink-0"
    >
      {copied ? (
        <Check className="h-4 w-4 text-crimson-700" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      {copied ? "Copied!" : "Copy"}
      <span className="sr-only"> booking reference</span>
    </Button>
  );
}
