/**
 * Public service catalogue — static, typed, no database access.
 * Content is the single source of truth for the services page, home bento and booking form.
 */

export type StaticServiceTest = {
  id: string;
  name: string;
  turnaround: string | null;
  serviceId: string;
};

export type StaticService = {
  id: string;
  name: string;
  slug: string;
  category: string;
  icon: string;
  featured: boolean;
  description: string;
  tests: StaticServiceTest[];
};

type SeedService = {
  name: string;
  slug: string;
  category: string;
  icon: string;
  featured?: boolean;
  description: string;
  tests: { name: string; turnaround?: string }[];
};

const seed: SeedService[] = [
  {
    name: "Blood Tests",
    slug: "blood-tests",
    category: "Blood",
    icon: "droplet",
    featured: true,
    description:
      "Full blood profiling from routine blood counts to advanced panels — the foundation of most diagnoses, processed on automated analyzers within hours of collection.",
    tests: [
      { name: "Full Blood Count (FBC/CBC)", turnaround: "Same day" },
      { name: "Blood Glucose (Fasting & Random)", turnaround: "2 hours" },
      { name: "Lipid Profile (Cholesterol Panel)", turnaround: "Same day" },
      { name: "Liver Function Test (LFT)", turnaround: "Same day" },
      { name: "Renal Function Test (RFT)", turnaround: "Same day" },
      { name: "Electrolytes (U&E)", turnaround: "Same day" },
      { name: "Haemoglobin Electrophoresis", turnaround: "48 hours" },
      { name: "Blood Grouping & Cross Matching", turnaround: "2 hours" },
    ],
  },
  {
    name: "Urine Tests",
    slug: "urine-tests",
    category: "Urine",
    icon: "test-tube",
    featured: true,
    description:
      "Urinalysis and culture to detect infections, kidney disease, diabetes and metabolic disorders — with microscopy and sensitivity where required.",
    tests: [
      { name: "Urine Routine & Microscopy (R&M)", turnaround: "3 hours" },
      { name: "Urine Culture & Sensitivity", turnaround: "48–72 hours" },
      { name: "Urine Pregnancy Test (hCG)", turnaround: "1 hour" },
      { name: "Urine Ketones & Protein", turnaround: "2 hours" },
      { name: "24-Hour Urine Protein", turnaround: "24 hours" },
    ],
  },
  {
    name: "Genetic Testing",
    slug: "genetic-testing",
    category: "Genetic",
    icon: "dna",
    featured: true,
    description:
      "Molecular and genetic screening for inherited conditions, carrier status and pharmacogenomic insight, reported by our specialist molecular team.",
    tests: [
      { name: "Sickle Cell Genotyping (HbS/HbC)", turnaround: "5 days" },
      { name: "Carrier Screening Panel", turnaround: "7 days" },
      { name: "Pharmacogenomic Panel", turnaround: "7 days" },
      { name: "Karyotyping", turnaround: "10–14 days" },
    ],
  },
  {
    name: "Microbiology",
    slug: "microbiology",
    category: "Microbiology",
    icon: "microscope",
    featured: true,
    description:
      "Culture, sensitivity and serology for bacteria, fungi and parasites — identifying the exact cause of infection so treatment can be targeted.",
    tests: [
      { name: "Throat & Stool Culture", turnaround: "48 hours" },
      { name: "Wound Swab Culture", turnaround: "48 hours" },
      { name: "Malaria Parasite Test (mRDT/MSF)", turnaround: "1 hour" },
      { name: "Typhoid (Widal / IgM)", turnaround: "3 hours" },
      { name: "HIV Screening & Confirmation", turnaround: "Same day" },
      { name: "Hepatitis B & C Screening", turnaround: "Same day" },
    ],
  },
  {
    name: "Hormone Tests",
    slug: "hormone-tests",
    category: "Hormone",
    icon: "activity",
    featured: true,
    description:
      "Hormonal assessments for thyroid, fertility, reproductive health and metabolic balance, run on fully automated immunoassay platforms.",
    tests: [
      { name: "Thyroid Profile (T3, T4, TSH)", turnaround: "24 hours" },
      { name: "Follicle Stimulating Hormone (FSH)", turnaround: "24 hours" },
      { name: "Luteinising Hormone (LH) & Prolactin", turnaround: "24 hours" },
      { name: "Testosterone (Total/Free)", turnaround: "24 hours" },
      { name: "Progesterone & Estradiol", turnaround: "24 hours" },
      { name: "Cortisol & Insulin (Fasting)", turnaround: "24 hours" },
    ],
  },
  {
    name: "Specialized Tests",
    slug: "specialized-tests",
    category: "Specialized",
    icon: "stethoscope",
    featured: true,
    description:
      "Advanced and specialist diagnostics — histopathology, autoimmune markers and tumour screening — supported by consultant review.",
    tests: [
      { name: "Histopathology / Biopsy Report", turnaround: "5–7 days" },
      { name: "Autoimmune Markers (ANA, RF)", turnaround: "72 hours" },
      { name: "Tumour Markers (PSA, CEA, CA-125)", turnaround: "72 hours" },
      { name: "D-Dimer & Coagulation Profile", turnaround: "6 hours" },
      { name: "Vitamin D, B12 & Ferritin", turnaround: "24 hours" },
    ],
  },
];

export const services: StaticService[] = seed.map((s) => ({
  id: `svc_${s.slug}`,
  name: s.name,
  slug: s.slug,
  category: s.category,
  icon: s.icon,
  featured: s.featured ?? false,
  description: s.description,
  tests: s.tests.map((t, i) => ({
    id: `svc_${s.slug}_t${i}`,
    name: t.name,
    turnaround: t.turnaround ?? null,
    serviceId: `svc_${s.slug}`,
  })),
}));
