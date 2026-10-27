import type { Metadata } from "next";
import { CalendarCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of use and service conditions for the ${site.name} website and laboratory services.`,
};

const sections = [
  {
    heading: "1. Acceptance",
    body: `By using this website you agree to these terms. If you do not agree, please do not use the site. Placeholder text — replace with terms reviewed by your legal adviser.`,
  },
  {
    heading: "2. Information only, no diagnosis",
    body: "Content on this site is general information about our services. It is not medical advice and does not replace consultation with a qualified clinician. Test results should always be interpreted by a healthcare professional.",
  },
  {
    heading: "3. Bookings",
    body: `Submitting a booking form requests an appointment; it is not a confirmed appointment until our team validates it (you receive confirmation by email or phone). Slots are limited and cannot be double-booked. No payment is taken online — all fees are settled at the laboratory.`,
  },
  {
    heading: "4. Fees & payment",
    body: "Any rate quoted is current at the time of publication and may change. The amount confirmed at the laboratory on the day of your test is the amount you pay — no payment is ever taken on this website.",
  },
  {
    heading: "5. Rescheduling & cancellation",
    body: `Contact us at least 24 hours before your preferred time to reschedule. Repeated no-shows may require advance payment for future bookings. Call ${site.phone} or email ${site.email}.`,
  },
  {
    heading: "6. Results & reports",
    body: "Reports are released only to you or your nominated representative. We may contact you about critical values. Turnaround times are typical, not guaranteed, and may be affected by sample quality or referral testing.",
  },
  {
    heading: "7. Home sample collection",
    body: "Home collection is available within our Lagos coverage area and is subject to phlebotomist availability. Our staff carry identification; please verify it before collection.",
  },
  {
    heading: "8. Limitation of liability",
    body: "To the maximum extent permitted by law, our liability for any claim related to the website or a service is limited to the amount you paid for that service. Nothing in these terms limits rights you have under applicable consumer law.",
  },
  {
    heading: "9. Intellectual property",
    body: `All content, branding and the ${site.name} logo on this site belong to us or our licensors and may not be reproduced without permission.`,
  },
  {
    heading: "10. Governing law",
    body: "These terms are governed by the laws of the Federal Republic of Nigeria. Disputes will be handled by the courts of competent jurisdiction in Lagos State.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title={"Terms &"}
        accent="Conditions"
        description="The ground rules for using this website and booking our services."
        crumbs={[{ label: "Terms & Conditions" }]}
      />

      <Section className="bg-cloud-100">
        <Container>
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <article className="rounded-[2rem] bg-white p-8 shadow-card sm:p-12">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Badge
                    tone="blush"
                    icon={<CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />}
                  >
                    Last updated: October 2026
                  </Badge>
                  <p className="text-xs leading-relaxed text-navy-400">
                    Placeholder content — review with your legal adviser before
                    launch.
                  </p>
                </div>

                <div className="mt-10 space-y-10">
                  {sections.map((section) => (
                    <div key={section.heading}>
                      <span
                        className="mb-4 block h-2 w-10 rounded-full bg-crimson-700"
                        aria-hidden="true"
                      />
                      <h2 className="font-heading text-xl font-extrabold tracking-tight text-navy-950">
                        {section.heading}
                      </h2>
                      <p className="mt-3 text-base leading-relaxed text-navy-600">
                        {section.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-navy-100 pt-8">
                  <p className="text-sm font-semibold text-navy-600">
                    Questions about these terms? Our team is happy to help.
                  </p>
                  <ButtonLink
                    href="/contact"
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                  >
                    Contact us
                  </ButtonLink>
                </div>
              </article>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
