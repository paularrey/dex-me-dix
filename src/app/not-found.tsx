import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ECGLine } from "@/components/ui/ecg-line";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center bg-cloud-100 pb-20 pt-32 md:pb-24 md:pt-40">
      <Container>
        <div className="mx-auto w-full max-w-2xl text-center">
          <p
            className="animate-fade-up font-heading text-8xl font-extrabold leading-none tracking-tight text-transparent"
            style={{ WebkitTextStroke: "2px rgba(181,18,43,0.35)" }}
          >
            404
          </p>

          <h1
            className="animate-fade-up mt-5 font-heading text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl"
            style={{ animationDelay: "90ms" }}
          >
            This page lost its{" "}
            <span className="accent-word squiggle">pulse</span>
          </h1>

          <ECGLine
            variant="flatline"
            animate
            className="mx-auto mt-6 h-12 max-w-md"
          />

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-navy-600">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
            Let&apos;s get you back to a useful sample.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" variant="primary">
              Back Home
            </ButtonLink>
            <ButtonLink href="/book" variant="outline">
              Book a Test
            </ButtonLink>
          </div>

          <nav aria-label="Helpful links" className="mt-10">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-navy-500">
              <li>
                <Link href="/services" className="transition hover:text-crimson-700">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/packages" className="transition hover:text-crimson-700">
                  Test Packages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-crimson-700">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="transition hover:text-crimson-700">
                  FAQs
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </section>
  );
}
