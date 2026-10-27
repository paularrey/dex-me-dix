export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "DexMedix",
  tagline: "Accurate Results. Healthier Tomorrow.",
  description:
    "DexMedix is a modern medical laboratory in Victoria Island, Lagos offering accurate testing, fast turnaround times and convenient booking — in-lab or home sample collection.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  logo: "/logo.jpeg",
  address: "123 Healthline Road, Victoria Island, Lagos, Nigeria",
  phone: "+234 801 234 5678",
  phoneHref: "+2348012345678",
  email: "info@dexmedix.com",
  notifyEmail: process.env.NOTIFY_EMAIL || "paulmichaelomega@gmail.com",
  openingHours: [
    { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM", short: "Mon-Fri" },
    { day: "Saturday", hours: "9:00 AM – 3:00 PM", short: "Sat" },
    { day: "Sunday", hours: "Closed", short: "Sun" },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Test Packages", href: "/packages" },
    { label: "Book a Test", href: "/book" },
    { label: "Contact", href: "/contact" },
  ],
  socials: [
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
    { label: "X (Twitter)", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
