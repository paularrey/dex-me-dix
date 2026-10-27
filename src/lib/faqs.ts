import { site } from "@/lib/site";

/** Canonical FAQ list — used by the home page accordion and /faqs. */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Do I need an appointment before coming to the lab?",
    a: `Booking online is recommended so we can prepare your forms and reserve a slot, but walk-ins are welcome during opening hours. Use the Book a Test page or call ${site.phone}.`,
  },
  {
    q: "How do I prepare for my test?",
    a: "Some tests (like fasting blood glucose or a lipid profile) need 8–12 hours of fasting — water is allowed. We'll confirm any preparation by email after you book, and our team will call if anything specific applies to you.",
  },
  {
    q: "How long until I get my results?",
    a: "Most routine tests (FBC, glucose, urinalysis, malaria) are ready the same day, often within a few hours. Specialized tests such as histopathology or genetic panels take 5–14 days. Your booking confirmation lists the expected turnaround.",
  },
  {
    q: "Do you offer home sample collection?",
    a: `Yes. Select "Home sample collection" when booking — available across our Lagos coverage area, subject to phlebotomist availability. There may be a small convenience fee confirmed before dispatch.`,
  },
  {
    q: "Can I book for someone else?",
    a: "Absolutely. Enter their details in the booking form and your own contact information for the confirmation. Please bring a valid ID for the person being tested.",
  },
  {
    q: "How do I pay? Is there online payment?",
    a: "No payment is taken on this website. You settle any applicable fees at the laboratory on the day of your test — cash, transfer or card. Everything a package includes is listed on its page, so there are no surprises.",
  },
  {
    q: "How will I receive my report?",
    a: "Reports are sent to your email as a PDF and can also be collected at the lab. Critical findings are always followed up by a phone call from our team.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Your results and personal details are accessible only to authorised staff, are never published, and are handled according to our Privacy Policy. Admin access to this site is password-protected.",
  },
  {
    q: "Which test package should I choose?",
    a: "The Basic Health Check covers core markers; the Executive Check adds hormonal, cardiac and tumour markers; the Women's and Men's Health packages focus on gender-specific concerns. Unsure? Contact us and we'll guide you to the right one.",
  },
  {
    q: "Do you work with HMOs and insurance?",
    a: "Yes, we process approvals for major HMO providers. Bring your scheme card and ID; contact us before your visit so we can confirm coverage.",
  },
];
