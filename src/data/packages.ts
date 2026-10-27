/**
 * Public test packages — static, typed, no database access.
 * Content is the single source of truth for the packages pages and booking form.
 */

export type StaticPackageTest = {
  id: string;
  name: string;
  packageId: string;
};

export type StaticPackage = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  testCount: number;
  price: number;
  featured: boolean;
  tests: StaticPackageTest[];
};

type SeedPackage = {
  name: string;
  slug: string;
  featured?: boolean;
  summary: string;
  description: string;
  testCount: number;
  price: number;
  tests: string[];
};

const seed: SeedPackage[] = [
  {
    name: "Basic Health Check",
    featured: true,
    slug: "basic-health-check",
    summary: "10 essential tests covering your core health markers.",
    description:
      "A complete starting point for annual screening. The Basic Health Check measures blood count, blood sugar, kidney and liver function plus key minerals — everything a doctor usually asks for in a routine check-up.",
    testCount: 10,
    price: 25000,
    tests: [
      "Full Blood Count (FBC)",
      "Fasting Blood Glucose",
      "Blood Grouping",
      "Urine Routine & Microscopy",
      "Liver Function Test (LFT)",
      "Renal Function Test (RFT)",
      "Electrolytes (U&E)",
      "Lipid Profile — Total Cholesterol",
      "Malaria Parasite Test",
      "Physician Consultation Summary",
    ],
  },
  {
    name: "Executive Check",
    featured: true,
    slug: "executive-check",
    summary: "20+ tests — the complete annual executive screen.",
    description:
      "Our most comprehensive screen for executives and busy professionals. Beyond the basic panel it adds hormonal, cardiac and tumour markers with a written results summary you can share with your physician.",
    testCount: 20,
    price: 60000,
    tests: [
      "Full Blood Count (FBC)",
      "Fasting Blood Glucose & HbA1c",
      "Full Lipid Profile (Total, LDL, HDL, Triglycerides)",
      "Liver Function Test (LFT)",
      "Renal Function Test (RFT)",
      "Electrolytes (U&E)",
      "Urine Routine & Microscopy",
      "Thyroid Profile (T3, T4, TSH)",
      "Vitamin D, B12 & Ferritin",
      "Uric Acid",
      "Cardiac Risk Markers (hs-CRP)",
      "Tumour Markers (PSA / CEA)",
      "Hepatitis B & C Screening",
      "HIV Screening",
      "Malaria Parasite Test",
      "Electrocardiogram (ECG) Review",
      "Blood Grouping",
      "Haemoglobin Electrophoresis",
      "Physician Consultation",
      "Written Results Summary",
      "Follow-up Interpretation Call",
    ],
  },
  {
    name: "Women's Health",
    featured: true,
    slug: "womens-health",
    summary: "15+ tests tailored to female health and fertility.",
    description:
      "Designed around the health concerns women raise most often — anaemia, thyroid, fertility hormones and bone health — with an optional antenatal extension on request.",
    testCount: 15,
    price: 45000,
    tests: [
      "Full Blood Count (FBC)",
      "Fasting Blood Glucose",
      "Iron Studies (Ferritin, TIBC)",
      "Thyroid Profile (T3, T4, TSH)",
      "Follicle Stimulating Hormone (FSH)",
      "Luteinising Hormone (LH)",
      "Prolactin",
      "Progesterone & Estradiol",
      "Vitamin D & B12",
      "Liver Function Test (LFT)",
      "Renal Function Test (RFT)",
      "Lipid Profile",
      "Urine Routine & Microscopy",
      "Blood Grouping",
      "Physician Consultation Summary",
    ],
  },
  {
    name: "Men's Health",
    featured: true,
    slug: "mens-health",
    summary: "15+ tests focused on male vitality and long-term risk.",
    description:
      "A focused panel for men: cardiovascular risk, blood sugar, prostate and testosterone markers, plus kidney and liver function — ideal from age 35 onward.",
    testCount: 15,
    price: 45000,
    tests: [
      "Full Blood Count (FBC)",
      "Fasting Blood Glucose & HbA1c",
      "Full Lipid Profile",
      "Testosterone (Total/Free)",
      "Prostate Specific Antigen (PSA)",
      "Thyroid Profile (T3, T4, TSH)",
      "Liver Function Test (LFT)",
      "Renal Function Test (RFT)",
      "Uric Acid",
      "Electrolytes (U&E)",
      "Vitamin D & B12",
      "Urine Routine & Microscopy",
      "Blood Grouping",
      "Malaria Parasite Test",
      "Physician Consultation Summary",
    ],
  },
];

export const packages: StaticPackage[] = seed.map((p) => ({
  id: `pkg_${p.slug}`,
  name: p.name,
  slug: p.slug,
  summary: p.summary,
  description: p.description,
  testCount: p.testCount,
  price: p.price,
  featured: p.featured ?? false,
  tests: p.tests.map((name, i) => ({
    id: `pkg_${p.slug}_t${i}`,
    name,
    packageId: `pkg_${p.slug}`,
  })),
}));
