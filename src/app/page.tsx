import { Hero } from "@/components/home/hero";
import { TrustMarquee } from "@/components/home/marquee";
import { ServicesBento } from "@/components/home/services-bento";
import { StatsBand } from "@/components/home/stats";
import { HowItWorks } from "@/components/home/how-it-works";
import { TestPackages } from "@/components/home/packages";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import {
  getFeaturedServices,
  getFeaturedPackagesWithTests,
  getTestimonials,
} from "@/lib/queries";

export default async function HomePage() {
  // Seeded content — failures fall back to empty lists instead of crashing.
  const [services, packages, testimonials] = await Promise.all([
    getFeaturedServices().catch(() => []),
    getFeaturedPackagesWithTests().catch(() => []),
    getTestimonials().catch(() => []),
  ]);

  return (
    <>
      <Hero />
      <TrustMarquee />
      <ServicesBento services={services} />
      <StatsBand />
      <HowItWorks />
      <TestPackages packages={packages} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <FaqSection />
      <FinalCta />
    </>
  );
}
