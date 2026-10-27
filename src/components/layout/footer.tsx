import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { CurrentYear } from "@/components/ui/current-year";
import { Container } from "@/components/ui/container";
import { ECGLine } from "@/components/ui/ecg-line";

const supportLinks = [
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const socialIcons = [
  {
    label: "Facebook",
    href: site.socials[0].href,
    path: "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5H16.7V4.4A22 22 0 0 0 14.3 4.3c-2.4 0-4 1.4-4 4.1v2.1H7.7v3h2.6V21h3.2Z",
  },
  {
    label: "Instagram",
    href: site.socials[1].href,
    path: "M12 7.4a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm5.9-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM16.5 4.5H7.5A3 3 0 0 0 4.5 7.5v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3Zm1.4 12a1.4 1.4 0 0 1-1.4 1.4H7.5A1.4 1.4 0 0 1 6.1 16.5v-9A1.4 1.4 0 0 1 7.5 6.1h9a1.4 1.4 0 0 1 1.4 1.4v9Z",
  },
  {
    label: "X (Twitter)",
    href: site.socials[2].href,
    path: "M17.7 4.5h2.6l-5.7 6.5 6.7 8.5h-5.2l-4.1-5.2-4.7 5.2H4.7l6.1-6.9L4.4 4.5h5.4l3.7 4.7 4.2-4.7Zm-.9 13.4h1.4L8.3 6H6.8l10 11.9Z",
  },
  {
    label: "LinkedIn",
    href: site.socials[3].href,
    path: "M8.3 18.5H5.4V9.7h2.9v8.8ZM6.8 8.5a1.7 1.7 0 1 1 0-3.4 1.7 1.7 0 0 1 0 3.4Zm11.7 10h-2.9v-4.3c0-1-.02-2.4-1.45-2.4-1.46 0-1.68 1.14-1.68 2.32v4.38H9.5V9.7h2.79v1.2h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.44v4.66Z",
  },
];

export function Footer() {
  return (
    <footer className="grain relative bg-navy-950 text-navy-200">
      {/* ECG pulse running across the top edge */}
      <div className="absolute inset-x-0 top-0 opacity-60">
        <ECGLine variant="divider" className="h-12" color="#E13A56" animate={false} />
      </div>

      <Container className="relative pb-10 pt-24 md:pt-28">
        {/* Large wordmark */}
        <div className="mb-12 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2 shadow-card">
              <Image
                src="/dexmedix-logo-badge.svg"
                alt={`${site.name} logo`}
                width={48}
                height={48}
              />
            </span>
            <div>
              <p className="font-heading text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl">
                {site.name}
              </p>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.3em] text-amber-500">
                Diagnostics
              </p>
            </div>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-navy-300">
            {site.tagline} Accurate testing, fast turnaround and genuinely human
            care — in the lab or at your home.
          </p>
        </div>

        {/* Columns */}
        <div className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Reach us */}
          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Reach Us
            </h2>
            <ul className="space-y-3.5 text-sm text-navy-300">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-crimson-400" aria-hidden="true" />
                <span>{site.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-crimson-400" aria-hidden="true" />
                <a href={`tel:${site.phoneHref}`} className="transition hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-crimson-400" aria-hidden="true" />
                <a href={`mailto:${site.email}`} className="transition hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-crimson-400" aria-hidden="true" />
                <span>
                  Mon–Fri 8:00 AM – 6:00 PM
                  <br />
                  Sat 9:00 AM – 3:00 PM · Sun closed
                </span>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-navy-300 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Support
            </h2>
            <ul className="space-y-2.5 text-sm">
              {supportLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-navy-300 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-500">
              Follow Us
            </h2>
            <ul className="flex gap-3">
              {socialIcons.map(({ label, href, path }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.name} on ${label}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/8 text-navy-200 transition hover:bg-crimson-700 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d={path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Book in 2 minutes
              </p>
              <Link
                href="/book"
                className="mt-2 inline-flex text-sm font-bold text-white underline decoration-crimson-500 decoration-2 underline-offset-4 transition hover:text-crimson-300"
              >
                Reserve your slot →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-navy-400 md:flex-row">
          <p>
            © <CurrentYear /> {site.name} Diagnostics. All rights reserved.
          </p>
          <p className="flex items-center gap-4">
            <Link href="/privacy" className="transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="transition hover:text-white">Terms &amp; Conditions</Link>
            <Link href="/faqs" className="transition hover:text-white">FAQs</Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
