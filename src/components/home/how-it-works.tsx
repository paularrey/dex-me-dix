import { MousePointerClick, CalendarDays, TestTubeDiagonal } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    num: "01",
    title: "Choose your test",
    body: "Pick a single test or one of our value packages — browse by department or let us help you decide.",
    Icon: MousePointerClick,
  },
  {
    num: "02",
    title: "Book a slot",
    body: "Select walk-in or home collection, then choose a date and 30-minute time slot that suits you.",
    Icon: CalendarDays,
  },
  {
    num: "03",
    title: "Get your results",
    body: "We collect your sample, run it on validated platforms and deliver most results within 24 hours.",
    Icon: TestTubeDiagonal,
  },
];

/** Horizontal 3-step timeline with oversized outlined numbers. */
export function HowItWorks() {
  return (
    <Section id="how-it-works" ariaLabelledBy="how-title" className="bg-cloud-100">
      <Container>
        <SectionHeader
          id="how-title"
          eyebrow="How it works"
          title="Three steps to"
          accent="clarity"
          description="Booking a test with DexMedix takes about two minutes — no queues, no guesswork."
        />

        <div className="relative mt-16">
          {/* Dotted connecting path (desktop) */}
          <svg
            viewBox="0 0 1000 60"
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-14 w-full lg:block"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M120 30 C 300 -10, 400 70, 500 30 S 700 -10, 880 30"
              stroke="#B5122B"
              strokeWidth="2.5"
              strokeDasharray="2 12"
              strokeLinecap="round"
              opacity="0.45"
            />
          </svg>

          <ol className="relative grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map(({ num, title, body, Icon }, i) => (
              <Reveal key={num} delay={i * 100}>
                <li className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  {/* Oversized outlined number */}
                  <span
                    className="select-none font-heading text-7xl font-extrabold leading-none tracking-tight text-transparent lg:text-8xl"
                    style={{ WebkitTextStroke: "2px rgba(181,18,43,0.35)" }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>

                  <span className="-mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-crimson-700 to-crimson-500 text-white shadow-crimson">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <h3 className="mt-6 font-heading text-xl font-extrabold text-navy-950">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-navy-500">
                    {body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
