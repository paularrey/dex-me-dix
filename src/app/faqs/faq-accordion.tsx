"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

/** Smooth height-animated accordion for the FAQs page (mirrors the home FAQ). */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="space-y-3">
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={faq.q} delay={Math.min(i * 40, 240)}>
            <div
              className={cn(
                "overflow-hidden rounded-[1.5rem] border transition",
                isOpen
                  ? "border-crimson-700/30 bg-cloud-100 shadow-card"
                  : "border-cloud-200 bg-white hover:border-navy-200"
              )}
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faqs-panel-${i}`}
                  className="flex min-h-[56px] w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-heading text-sm font-extrabold text-navy-950 sm:text-base">
                    {faq.q}
                  </span>
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition",
                      isOpen
                        ? "bg-crimson-700 text-white"
                        : "bg-cloud-100 text-navy-600"
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`faqs-panel-${i}`}
                    key="panel"
                    initial={
                      reduce
                        ? { height: "auto", opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-navy-500">
                      {faq.a}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
