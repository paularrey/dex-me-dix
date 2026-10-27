/**
 * Public testimonials — static, typed, no database access.
 * Content shown in the home testimonial slider.
 */

export type StaticTestimonial = {
  id: string;
  name: string;
  initials: string;
  role: string;
  content: string;
  rating: number;
  published: boolean;
};

const seed: Omit<StaticTestimonial, "id">[] = [
  {
    name: "Sarah A.",
    initials: "SA",
    role: "Makurdi, Nigeria",
    content:
      "I booked online in the evening and was seen the next morning. The results came through before noon and the nurse explained everything patiently. It genuinely felt easy.",
    rating: 5,
    published: true,
  },
  {
    name: "Tunde B.",
    initials: "TB",
    role: "Makurdi, Benue",
    content:
      "Home sample collection was the decider for me — my mother can't queue at a lab anymore. Clean, on time, and the doctor's summary made the numbers make sense.",
    rating: 5,
    published: true,
  },
];

export const testimonials: StaticTestimonial[] = seed.map((t, i) => ({
  id: `tst_${i + 1}`,
  ...t,
}));
