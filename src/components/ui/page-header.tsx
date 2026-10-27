import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

/**
 * Compact inner-page hero: navy→crimson gradient, faint ECG pattern,
 * amber eyebrow, big title with optional serif accent word, subtitle,
 * breadcrumb trail, generous clearance below.
 */
export function PageHeader({
  eyebrow,
  title,
  accent,
  description,
  crumbs,
  className,
}: {
  eyebrow: string;
  title: string;
  /** Italic serif accent word appended to the title. */
  accent?: string;
  description?: string;
  crumbs?: Crumb[];
  className?: string;
}) {
  return (
    <section
      className={cn(
        "grain relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-crimson-900 pb-16 pt-32 text-white md:pb-20 md:pt-40",
        className
      )}
    >
      {/* Faint ECG pattern */}
      <svg
        viewBox="0 0 1200 120"
        className="pointer-events-none absolute inset-x-0 top-1/2 h-28 w-full -translate-y-1/2 opacity-[0.10]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 60h200l14-30 14 60 16-80 16 62 14-12h200l14-30 14 60 16-80 16 62 14-12h200l14-30 14 60 16-80 16 62 14-12h200"
          stroke="#E13A56"
          strokeWidth="3"
        />
      </svg>
      {/* soft blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-crimson-600/30 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-amber-500/15 blur-[90px]"
      />

      <Container className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
          {accent ? (
            <>
              {" "}
              <span className="accent-word">{accent}</span>
            </>
          ) : null}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {description}
          </p>
        ) : null}

        {crumbs && crumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mt-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/60">
              <li>
                <Link href="/" className="transition hover:text-amber-400">
                  Home
                </Link>
              </li>
              {crumbs.map((crumb) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition hover:text-amber-400">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
      </Container>
    </section>
  );
}
