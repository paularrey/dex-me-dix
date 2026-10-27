import type { Metadata } from "next";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
} from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — address, phone, email, opening hours and a direct contact form.`,
};

export default function ContactPage() {
  const cards = [
    {
      label: "Visit the lab",
      value: site.address,
      hint: null as string | null,
      Icon: MapPin,
      href: null as string | null,
      tint: "bg-crimson-100 text-crimson-700",
    },
    {
      label: "Call us",
      value: site.phone,
      hint: "Mon–Fri 8:00 AM – 6:00 PM",
      Icon: Phone,
      href: `tel:${site.phoneHref}`,
      tint: "bg-navy-100 text-navy-700",
    },
    {
      label: "Email us",
      value: site.email,
      hint: "Replies within one business day",
      Icon: Mail,
      href: `mailto:${site.email}`,
      tint: "bg-amber-500/15 text-amber-600",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        accent="health"
        description="Questions about a test, a package or your booking? Reach us any of these ways — or send a message and we'll reply by email."
        crumbs={[{ label: "Contact" }]}
      />

      {/* Quick contact cards */}
      <Section className="bg-white" ariaLabelledBy="contact-details-title">
        <Container>
          <Reveal className="mb-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <h2
              id="contact-details-title"
              className="font-heading text-2xl font-extrabold tracking-tight text-navy-950"
            >
              Three quick ways to reach the lab
            </h2>
            <Badge
              tone="amber"
              icon={<Clock className="h-3.5 w-3.5" aria-hidden="true" />}
            >
              Reply within one business day
            </Badge>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-3">
            {cards.map(({ label, value, hint, Icon, href, tint }, i) => {
              const inner = (
                <>
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl",
                      tint
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                    {label}
                  </p>
                  <p className="mt-2 text-base font-extrabold leading-snug text-navy-950">
                    {value}
                  </p>
                  {hint ? (
                    <p className="mt-1 text-sm text-navy-500">{hint}</p>
                  ) : null}
                </>
              );
              const className =
                "block h-full rounded-[1.75rem] border border-cloud-200 bg-cloud-100 p-7 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover";
              return (
                <Reveal key={label} delay={i * 70} className="h-full">
                  {href ? (
                    <a href={href} className={className}>
                      {inner}
                    </a>
                  ) : (
                    <div className={className}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Form + map + hours */}
      <Section className="bg-blush-100" ariaLabelledBy="contact-form-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <div className="lg:col-span-3">
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>

            <aside className="lg:col-span-2">
              <Reveal delay={80} className="space-y-6">
                {/* Map placeholder */}
                <div className="overflow-hidden rounded-[2rem] border border-cloud-200 bg-white shadow-card">
                  <div className="relative aspect-[16/9] bg-cloud-100">
                    {/* TODO: replace with an embedded Google/Apple map */}
                    <Image
                      src="/images/map-placeholder.jpg"
                      alt="Map placeholder showing the DexMedix location in Makurdi, Benue State"
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                    <span
                      className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-crimson-700 text-white shadow-crimson"
                      aria-hidden="true"
                    >
                      <MapPin className="h-6 w-6" />
                    </span>
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-navy-800 shadow">
                      Ankpa quarter, Makurdi, Benue state
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-6">
                    <div>
                      <h2 className="text-sm font-extrabold text-navy-950">
                        {site.name} Diagnostics
                      </h2>
                      <p className="mt-1 text-sm text-navy-500">
                        {site.address}
                      </p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Jerome+Hwande+Street+Makurdi+Benue"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full bg-navy-950 px-5 py-2.5 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:bg-navy-800"
                    >
                      <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                      Directions
                    </a>
                  </div>
                </div>

                {/* Opening hours */}
                <div className="rounded-[2rem] border border-cloud-200 bg-white p-7 shadow-card">
                  <h2 className="flex items-center gap-3 font-heading text-lg font-extrabold text-navy-950">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson-100 text-crimson-700">
                      <Clock className="h-5 w-5" aria-hidden="true" />
                    </span>
                    Opening Hours
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {site.openingHours.map((row) => (
                      <li
                        key={row.day}
                        className="flex items-center justify-between gap-4 border-b border-cloud-200 pb-3 text-sm last:border-0 last:pb-0"
                      >
                        <span className="font-semibold text-navy-700">
                          {row.day}
                        </span>
                        <span
                          className={
                            row.hours === "Closed"
                              ? "font-bold text-crimson-600"
                              : "font-bold text-navy-950"
                          }
                        >
                          {row.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-xs leading-relaxed text-navy-400">
                    Online booking is available 24/7 — appointments outside
                    these hours will be moved to the next open slot.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
