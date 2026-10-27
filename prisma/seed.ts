import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedService = {
  name: string;
  slug: string;
  category: string;
  icon: string;
  featured?: boolean;
  description: string;
  tests: { name: string; turnaround?: string }[];
};

const services: SeedService[] = [
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

const packages: SeedPackage[] = [
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

const testimonials = [
  {
    name: "Sarah A.",
    initials: "SA",
    role: "Lagos, Nigeria",
    content:
      "I booked online in the evening and was seen the next morning. The results came through before noon and the nurse explained everything patiently. It genuinely felt easy.",
    rating: 5,
  },
  {
    name: "Tunde B.",
    initials: "TB",
    role: "Victoria Island, Lagos",
    content:
      "Home sample collection was the decider for me — my mother can't queue at a lab anymore. Clean, on time, and the doctor's summary made the numbers make sense.",
    rating: 5,
  },
];

async function main() {
  console.log("Seeding DexMedix database...");

  for (const service of services) {
    const { tests, ...data } = service;
    await prisma.service.upsert({
      where: { slug: data.slug },
      update: { ...data, tests: { deleteMany: {} } },
      create: data,
    });
    const dbService = await prisma.service.findUniqueOrThrow({
      where: { slug: data.slug },
    });
    await prisma.serviceTest.createMany({
      data: tests.map((t) => ({ ...t, serviceId: dbService.id })),
    });
    console.log(`  service: ${data.name} (${tests.length} tests)`);
  }

  for (const pkg of packages) {
    const { tests, ...data } = pkg;
    await prisma.testPackage.upsert({
      where: { slug: data.slug },
      update: { ...data, tests: { deleteMany: {} } },
      create: data,
    });
    const dbPkg = await prisma.testPackage.findUniqueOrThrow({
      where: { slug: data.slug },
    });
    await prisma.packageTest.createMany({
      data: tests.map((name) => ({ name, packageId: dbPkg.id })),
    });
    console.log(`  package: ${data.name} (${tests.length} tests, ₦${data.price})`);
  }

  const existing = await prisma.testimonial.count();
  if (existing === 0) {
    await prisma.testimonial.createMany({ data: testimonials });
    console.log(`  testimonials: ${testimonials.length}`);
  } else {
    console.log("  testimonials: already present, skipped");
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
