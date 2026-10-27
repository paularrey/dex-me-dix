import type { Metadata } from "next";
import { CalendarCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container, Section } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects your personal and health information.`,
};

const sections = [
  {
    heading: "1. Who we are",
    body: `${site.name} Diagnostics ("we", "our") operates a medical laboratory at ${site.address}. This policy explains what personal data we collect through this website and our laboratory services, and how we use it.`,
  },
  {
    heading: "2. What we collect",
    body: "Through booking and contact forms we collect: your name, email address, phone number, date of birth, gender, address, the test or package you selected, your preferred collection date and time, and any clinical notes, conditions or emergency contact details you choose to provide. We also record a timestamp and submission reference.",
  },
  {
    heading: "3. Why we process it",
    body: "To schedule and deliver your test, contact you about your appointment, produce your laboratory report, meet professional and legal record-keeping duties, and reply to enquiries you send us. Health data is processed only for your care and with your consent.",
  },
  {
    heading: "4. Who we share it with",
    body: "We do not sell, rent or publish your data. Access is limited to laboratory staff and clinicians who need it to perform or interpret your test. We never display submissions publicly; the admin area is password-protected.",
  },
  {
    heading: "5. Email",
    body: "Booking and contact submissions are emailed to our notification inbox and, for bookings, a confirmation copy is sent to you. Emails are sent over TLS via our SMTP provider. We set reply-to your address so our team can respond directly.",
  },
  {
    heading: "6. Retention",
    body: "Booking and laboratory records are retained for the period required by applicable Nigerian health-record regulations, then securely deleted or anonymised. Contact enquiries are kept only as long as needed to respond.",
  },
  {
    heading: "7. Your rights",
    body: `You may request access to, correction of, or deletion of your personal data, subject to legal retention duties. Write to ${site.email} or call ${site.phone}. You may also withdraw consent for non-essential processing at any time.`,
  },
  {
    heading: "8. Security",
    body: "We use access controls, encrypted transport and minimal-data principles. No system is perfectly secure, but we review our practices regularly and only collect what we genuinely need.",
  },
  {
    heading: "9. Cookies",
    body: "This site uses only essential cookies required for session and security functions (for example the admin session). We do not use advertising or cross-site tracking cookies.",
  },
  {
    heading: "10. Changes & contact",
    body: `We may update this policy from time to time; the latest version always appears on this page. Questions: ${site.email} or ${site.address}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        accent="Policy"
        description="Your health information is sensitive — here is exactly how we handle it."
        crumbs={[{ label: "Privacy Policy" }]}
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
                    Placeholder content — have your legal adviser review before
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
                    Questions about this policy? Our team is happy to help.
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
