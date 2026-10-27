"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, CalendarCheck, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-crimson-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between gap-3 rounded-full px-4 transition-all duration-300 sm:px-5",
            scrolled
              ? "h-14 bg-white/80 shadow-card backdrop-blur-xl ring-1 ring-navy-100/60"
              : "h-16 bg-white/60 shadow-soft backdrop-blur-md ring-1 ring-white/50 sm:h-[4.25rem]"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5"
            aria-label={`${site.name} home`}
          >
            <Image
              src="/dexmedix-logo-badge.svg"
              alt=""
              width={scrolled ? 34 : 40}
              height={scrolled ? 34 : 40}
              className="transition-all duration-300"
              priority
            />
            <span className="leading-none">
              <span className="block font-heading text-[1.05rem] font-extrabold tracking-tight text-navy-950">
                {site.name}
              </span>
              <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.22em] text-crimson-700">
                Diagnostics
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors",
                  isActive(item.href)
                    ? "bg-crimson-100 text-crimson-800"
                    : "text-navy-600 hover:bg-cloud-100 hover:text-navy-950"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phoneHref}`}
              aria-label={`Call ${site.name}`}
              className="hidden h-10 w-10 items-center justify-center rounded-full text-navy-700 transition hover:bg-cloud-100 hover:text-crimson-700 sm:inline-flex"
            >
              <Phone className="h-4.5 w-4.5" aria-hidden="true" />
            </a>

            <Link
              href="/book"
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-crimson-700 to-crimson-500 px-5 py-2.5 text-[13px] font-bold text-white shadow-crimson transition hover:-translate-y-0.5 hover:shadow-card-hover sm:inline-flex"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book a Test
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-950 transition hover:bg-cloud-100 lg:hidden"
            >
              {open ? (
                <X className="h-5.5 w-5.5" aria-hidden="true" />
              ) : (
                <Menu className="h-5.5 w-5.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen animated mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-navy-950/97 backdrop-blur-xl lg:hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 pb-10 pt-28">
              <nav aria-label="Mobile" className="mx-auto max-w-md">
                <ul className="space-y-1">
                  {site.nav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i, duration: 0.35 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "block rounded-2xl px-5 py-4 font-heading text-2xl font-bold transition",
                          isActive(item.href)
                            ? "bg-crimson-700/20 text-white"
                            : "text-white/80 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span className="mr-3 font-sans text-xs font-bold text-amber-500">
                          0{i + 1}
                        </span>
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                  className="mt-8 space-y-3"
                >
                  <Link
                    href="/book"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-crimson-700 to-crimson-500 px-6 py-4 text-sm font-bold text-white shadow-crimson"
                  >
                    <CalendarCheck className="h-4.5 w-4.5" aria-hidden="true" />
                    Book a Test
                  </Link>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-4 text-sm font-bold text-white/85"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {site.phone}
                  </a>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
