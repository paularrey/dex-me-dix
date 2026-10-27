import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Users,
  Microscope,
  Award,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DexMedix Diagnostics — our story, mission, vision, values, laboratory team and quality accreditations in Victoria Island, Lagos.",
};

const values = [
  {
    title: "Accuracy",
    body: "Every result passes internal quality controls and, for critical values, a second scientist's verification before release.",
    Icon: BadgeCheck,
  },
  {
    title: "Integrity",
    body: "Transparent pricing, honest turnaround times and confidential handling of every patient record.",
    Icon: Award,
  },
  {
    title: "Patient-Centered Care",
    body: "Comfortable collection, plain-language reports and a team that answers the questions you actually have.",
    Icon: Users,
  },
  {
    title: "Innovation",
    body: "Automated analyzers, digital reporting and continuous investment in better methods.",
    Icon: Microscope,
  },
];

const team = [
  { name: "Dr. Amaka Obi", role: "Medical Director", initials: "AO" },
  { name: "Ibrahim Yusuf", role: "Chief Laboratory Scientist", initials: "IY" },
  { name: "Chidinma Eze", role: "Head of Phlebotomy", initials: "CE" },
  { name: "Samuel Adeyemi", role: "Quality Assurance Lead", initials: "SA" },
];

const accreditations = [
  {
    title: "LABORATORY ACCREDITATION",
    body: "ISO 15189-aligned quality management (accreditation in progress) — placeholder badge, replace with your certificate.",
  },
  {
    title: "STATE REGISTRATION",
    body: "Registered with the Lagos State Ministry of Health — placeholder, replace with your registration number.",
  },
  {
    title: "STANDARD ORGANISATION",
    body: "SON / professional body memberships — placeholder badge for your actual certificates.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A lab built on precision"
        accent="and people"
        description="We are a team of scientists, phlebotomists and care coordinators who believe accurate testing should also feel effortless for the patient."
        crumbs={[{ label: "About" }]}
      />

      {/* Story */}
      <Section className="bg-white" ariaLabelledBy="story-title">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
            <Reveal className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-blush-200"
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-cloud-100 shadow-card">
                {/* TODO: replace with a real DexMedix facility photo */}
                <Image
                  src="/images/about-story.jpg"
                  alt="Inside the DexMedix diagnostics laboratory"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-10 right-2 aspect-square w-36 overflow-hidden rounded-[1.5rem] border-4 border-white bg-cloud-100 shadow-card sm:w-48">
                {/* TODO: replace with a real DexMedix team photo */}
                <Image
                  src="/images/who-we-are.jpg"
                  alt="The DexMedix care team at work"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <Badge tone="amber" className="absolute -left-3 bottom-14 rotate-[-4deg] shadow-card">
                Since day one
              </Badge>
              <GlassCard className="absolute right-4 top-4 max-w-[11rem]">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy-500">
                  Turnaround
                </p>
                <p className="mt-1 font-heading text-sm font-extrabold leading-snug text-navy-950">
                  Same day for most routine tests
                </p>
              </GlassCard>
            </Reveal>

            <Reveal delay={100}>
              <SectionHeader
                align="left"
                id="story-title"
                eyebrow="Our Story"
                title="Built by people who've waited for results too"
              />
              <p className="mt-5 text-base leading-relaxed text-navy-500">
                DexMedix Diagnostics started with a simple frustration: waiting
                days for a routine test, then struggling to understand the
                report. We built the laboratory we wanted for our own families —
                modern equipment, disciplined processes and staff who explain
                things.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-navy-500">
                Today we serve individuals, families, HMOs and referring
                physicians across Lagos, with the same founding promise:{" "}
                <strong className="text-navy-800">{site.tagline}</strong>
              </p>
              <ButtonLink href="/book" className="mt-8">
                Book a Test
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Mission / Vision */}
      <Section className="bg-cloud-100" ariaLabelledBy="mv-title">
        <Container>
          <SectionHeader
            id="mv-title"
            eyebrow="Mission & Vision"
            title="What we're here to do"
            accent="do"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-[2rem] bg-white p-8 shadow-card sm:p-10">
                <Badge tone="crimson">Our Mission</Badge>
                <p className="mt-6 text-lg leading-relaxed text-navy-600">
                  To deliver accurate, timely and affordable diagnostics that
                  help people and their doctors make confident health decisions —
                  without unnecessary delays or hidden costs.
                </p>
              </div>
            </Reveal>
            <Reveal delay={90} className="h-full">
              <div className="grain flex h-full flex-col rounded-[2rem] bg-navy-950 p-8 text-white shadow-card sm:p-10">
                <Badge tone="amber">Our Vision</Badge>
                <p className="mt-6 text-lg leading-relaxed text-white/80">
                  To be West Africa&apos;s most trusted diagnostic partner —
                  where quality testing is never far from the people who need
                  it, whether in the lab or at home.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-blush-100" ariaLabelledBy="values-title">
        <Container>
          <SectionHeader
            id="values-title"
            eyebrow="Our Values"
            title="Accuracy · Integrity · Patient-Centered Care · Innovation"
            description="Four principles that decide how we hire, how we test and how we report."
          />
          <Reveal delay={60}>
            <ul className="mt-10 flex flex-wrap justify-center gap-3">
              {values.map(({ title, Icon }, i) => (
                <li key={title}>
                  <span
                    className={cn(
                      "inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold shadow-soft",
                      i % 2 === 0 ? "bg-cloud-100" : "bg-white",
                      "text-navy-800"
                    )}
                  >
                    <Icon className="h-4 w-4 text-crimson-700" aria-hidden="true" />
                    {title}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <dl className="mx-auto mt-12 grid max-w-4xl gap-x-10 gap-y-6 sm:grid-cols-2">
              {values.map(({ title, body }) => (
                <div key={title} className="border-t-2 border-crimson-700/15 pt-4">
                  <dt className="text-sm font-extrabold text-navy-950">{title}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-navy-500">
                    {body}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* Team */}
      <Section className="bg-white" ariaLabelledBy="team-title">
        <Container>
          <SectionHeader
            id="team-title"
            eyebrow="Our Team"
            title="The people behind your results"
            accent="results"
            description="Placeholder profiles — replace names, roles and photos with your real team."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 70} className="h-full">
                <article className="h-full overflow-hidden rounded-[1.75rem] bg-white shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                  <div className="relative aspect-[4/5] bg-cloud-100">
                    {/* TODO: replace with real staff photos (/images/team-1.jpg …) */}
                    <Image
                      src="/images/team-placeholder.jpg"
                      alt={`${member.name}, ${member.role} (placeholder photo)`}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-crimson-700 text-sm font-bold text-white shadow-crimson">
                      {member.initials}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading text-base font-extrabold text-navy-950">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-crimson-700">
                      {member.role}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Accreditations */}
      <Section className="bg-cloud-100" ariaLabelledBy="accred-title">
        <Container>
          <SectionHeader
            id="accred-title"
            eyebrow="Accreditations"
            title="Quality you can verify"
            accent="verify"
            description="Placeholder badges — swap in your scanned certificates and registration numbers."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {accreditations.map((item, i) => (
              <Reveal key={item.title} delay={i * 70} className="h-full">
                <div className="flex h-full flex-col items-center rounded-2xl border-2 border-dashed border-navy-200 bg-white p-8 text-center">
                  {/* TODO: replace with the real accreditation badge image */}
                  <div className="flex h-24 w-full max-w-[14rem] items-center justify-center rounded-xl bg-cloud-100 text-xs font-bold uppercase tracking-[0.16em] text-navy-400">
                    Accreditation logo
                  </div>
                  <span className="mt-6 flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-amber-500">
                    <GraduationCap className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-3 text-sm font-extrabold uppercase tracking-wider text-navy-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-500">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA strip */}
      <Section className="grain bg-navy-950 text-white">
        <Container className="text-center">
          <Reveal>
            <Badge tone="amber" className="mx-auto">
              Book online 24/7
            </Badge>
            <h2 className="mx-auto mt-5 max-w-2xl font-heading text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl md:text-5xl">
              Ready when you are
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Book a test in under two minutes, visit the lab — or let our
              phlebotomist come to you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/book" size="lg">
                Book a Test
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="white" size="lg">
                Contact us
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
