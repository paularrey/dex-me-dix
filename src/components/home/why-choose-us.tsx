import Image from "next/image";
import { BadgeCheck, Timer, Users, MapPin } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

const features = [
  {
    title: "Accurate & reliable",
    body: "Dual verification on every critical result and strict internal quality controls.",
    Icon: BadgeCheck,
    tint: "bg-crimson-100 text-crimson-700",
  },
  {
    title: "Fast turnaround",
    body: "Most routine results are ready the same day; urgent panels jump the queue.",
    Icon: Timer,
    tint: "bg-navy-100 text-navy-800",
  },
  {
    title: "Friendly specialists",
    body: "Phlebotomists who explain the process and handle every sample with care.",
    Icon: Users,
    tint: "bg-amber-300/50 text-amber-600",
  },
  {
    title: "Easy to reach",
    body: "Right in Makurdi, plus online booking and home collection across Benue.",
    Icon: MapPin,
    tint: "bg-blush-200 text-crimson-800",
  },
];

/** Asymmetric two-column: image + overlapping navy card on the left, 2×2 features right. */
export function WhyChooseUs() {
  return (
    <Section id="why-us" ariaLabelledBy="why-title" className="bg-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Image with overlapping navy card */}
          <Reveal className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[3rem] bg-navy-100 shadow-card">
              {/* TODO: replace with a real photo of the DexMedix lab/team */}
              <Image
                src="/images/about-story.jpg"
                alt="DexMedix scientists reviewing test results together in the laboratory"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent"
              />
            </div>

            <div className="absolute -bottom-7 -right-2 max-w-[19rem] rounded-[1.5rem] bg-navy-950 p-6 text-white shadow-card sm:right-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-crimson-600 text-white">
                <HeartPulseIcon />
              </span>
              <p className="mt-4 font-heading text-base font-extrabold leading-snug">
                Trusted by individuals, families and healthcare providers
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                <p className="text-xs font-semibold text-white/70">Serving Benue since 2018</p>
              </div>
            </div>
          </Reveal>

          {/* Copy + 2×2 features */}
          <Reveal delay={120}>
            <Badge tone="amber">Why choose us</Badge>
            <h2
              id="why-title"
              className="mt-5 font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-4xl md:text-5xl"
            >
              Care you can <span className="accent-word squiggle">measure</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-500 sm:text-lg">
              Four promises we hold ourselves to on every single sample — from the
              moment you book to the moment your results reach your inbox.
            </p>

            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {features.map(({ title, body, Icon, tint }, i) => (
                <Reveal key={title} delay={i * 70}>
                  <div className="h-full rounded-[1.75rem] border border-cloud-200 bg-cloud-100/60 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-card">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tint}`}>
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 font-heading text-base font-extrabold text-navy-950">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-navy-500">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function HeartPulseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5.5 w-5.5"
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
  );
}
