import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquare, Phone } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { faqs } from "@/lib/faqs";
import { site } from "@/lib/site";
import { FaqAccordion } from "./faq-accordion";

export const metadata: Metadata = {
  title: "FAQs",
  description: `Answers to frequently asked questions about booking, sample collection, results and pricing at ${site.name}.`,
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support"
        title="Frequently asked"
        accent="questions"
        description="Everything patients usually ask before, during and after a test."
        crumbs={[{ label: "FAQs" }]}
      />

      <Section className="bg-white" ariaLabelledBy="faqs-title">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* Left: sticky heading + contact card */}
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <Badge tone="amber">Quick answers</Badge>
              <h2
                id="faqs-title"
                className="mt-5 font-heading text-3xl font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-4xl"
              >
                Questions,{" "}
                <span className="accent-word squiggle">answered</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-navy-500">
                Can&apos;t find what you&apos;re looking for? Our team replies
                during opening hours — usually within a few hours.
              </p>

              <div className="grain mt-8 rounded-[1.75rem] bg-navy-950 p-7 text-white shadow-card">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-crimson-600">
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-4 font-heading text-lg font-extrabold">
                  Still have a question?
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  Message us or call the lab directly — we&apos;re happy to help
                  you choose the right test.
                </p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy-950 transition hover:-translate-y-0.5 hover:shadow-card-hover"
                  >
                    Contact us
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {site.phone}
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Right: accordion */}
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </Section>
    </>
  );
}
