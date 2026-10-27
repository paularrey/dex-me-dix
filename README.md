<<<<<<< HEAD
# DexMedix — Medical Laboratory Website

**Accurate Results. Healthier Tomorrow.**

An information + test-booking website for the DexMedix medical laboratory.
Built with Next.js (App Router) + TypeScript + Tailwind CSS v4, Prisma/SQLite,
Zod + react-hook-form, and Nodemailer.

> **Scope:** This is an info/booking site only. There is **no e-commerce** — no
> cart, no checkout, no payments, no file uploads. Every form (booking,
> contact, admin login) is wired end-to-end and emails
> `paulmichaelomega@gmail.com`.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16.4.3 (App Router, `cacheComponents`, Turbopack) |
| Language | TypeScript (`@/*` path alias, src dir) |
| Styling | Tailwind CSS v4 with custom theme tokens (`globals.css` → `@theme`) |
| Database | Prisma 6.19.3 + SQLite (`prisma/dev.db`) |
| Forms | react-hook-form + Zod v4 + a small custom resolver (`src/lib/zod-resolver.ts`) |
| Email | Nodemailer (SMTP) with graceful no-SMTP fallback |
| Icons | lucide-react (brand icons in the footer are inline SVG — lucide has no brand set) |
| Fonts | Plus Jakarta Sans via `next/font` (variable `--font-jakarta`) |

---

## Getting started

```bash
npm install
npm run db:push        # create/update the SQLite schema
npm run db:seed        # seed services, packages, testimonials
npm run dev            # http://localhost:3000
```

Other scripts:

```bash
npm run build          # production build (also runs type checking)
npm run start          # serve the production build
npm run typecheck      # tsc --noEmit
npm run lint           # eslint
npm run db:migrate     # create a Prisma migration (if you switch off db push)
```

`postinstall` already runs `prisma generate`, so a fresh `npm install` is enough
to produce the client.

---

## Environment variables

Copy `.env.example` → `.env` and fill it in:

```env
DATABASE_URL="file:./dev.db"

# SMTP (Gmail: use an App Password, not your normal password)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-gmail@gmail.com"
SMTP_PASS="your-16-char-app-password"
EMAIL_FROM="DexMedix <your-gmail@gmail.com>"

# Where every form submission is delivered (hard fallback in code too)
NOTIFY_EMAIL="paulmichaelomega@gmail.com"

# Admin dashboard password (/admin)
ADMIN_PASSWORD="dexmedix-admin"

NEXT_PUBLIC_SITE_NAME="DexMedix"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
SESSION_SECRET="change-me-to-a-long-random-string"
```

### Gmail App Password

1. Enable 2-Step Verification on the Google account.
2. Google Account → Security → 2-Step Verification → **App passwords**.
3. Create one (e.g. "dexmedix-smtp") and paste the 16-character value into
   `SMTP_PASS`.

**If SMTP is unset the site still works.** Bookings/messages are saved to the
database first; the notification email is then skipped (not crashed) and the
user still sees the success screen. Check the server logs — PII is never
logged, only `emailSent: true/false`.

---

## What each form does

Every form → honeypot check → Zod validation → (bookings) rate limit +
opening-hours/slot/clash validation → **save to DB first** → send email →
show success. Email failures never surface to the visitor.

| Form | Route | Emails sent |
| --- | --- | --- |
| Booking | `/book` | Notification to `NOTIFY_EMAIL` + confirmation to the patient |
| Contact | `/contact` | Notification to `NOTIFY_EMAIL` |
| Admin login | `/admin` | — (HMAC-signed cookie session, 8 h) |

Notification emails are HTML with the brand header and a table of **all**
submitted fields, plus form type, reference, and timestamp. Reply-To is set to
the visitor's email so you can answer straight from your inbox.

---

## Admin dashboard

Visit `/admin` and sign in with `ADMIN_PASSWORD`.

- Stat cards: total bookings, awaiting confirmation, unread messages.
- Bookings table: patient, test, slot, collection type, health notes,
  emergency contact, `emailSent` flag, and a status dropdown
  (pending → confirmed → sample-collected → completed / cancelled).
- Contact messages: full message, `mailto:` reply link, status dropdown
  (new → replied → closed).
- `/admin` is excluded from sitemap/robots and `noindex`ed.

---

## Content: what's real vs. placeholder

### Real (in the database — edit `prisma/seed.ts` and re-run `npm run db:seed`)

- **Services (6):** Blood, Urine, Genetic, Microbiology, Hormone, Specialized —
  each with tests, turnaround times, and descriptions.
- **Packages (4):** Basic, Executive, Women's Health, Men's Health (featured).
- **Testimonials (2):** Sarah A., Tunde B.

### Placeholder — swap these before launch (marked with `TODO` in code)

- **Photos** in `public/images/` (`hero-lab-scientist.jpg`,
  `who-we-are.jpg`, `about-story.jpg`, `service-blood.jpg`,
  `map-placeholder.jpg`, `cta-lab.jpg`, `team-placeholder.jpg`) — generated
  stand-ins with labels. Replace with real photography of the same filenames.
- **Team bios** on `/about` (names/roles are examples).
- **Accreditation badges** on `/about` (NABH/NABL-style placeholders).
- **Map** on `/contact` — currently a styled placeholder graphic.
- **Phone / email / address** — centralised in `src/lib/site.ts`. Change once,
  it propagates to navbar, footer, contact page, schemas, and emails.
- **Opening hours** — `src/lib/hours.ts` (drives the `/book` slot picker and
  the contact-page hours table). Currently Mon–Fri 08:00–18:00, Sat
  09:00–15:00, Sun closed, 30-minute slots, no double-booking per slot +
  collection type.

> **Note about the design screenshot:** the provided
> `Screenshot 2026-10-26 153149.png` turned out to be the logo image itself,
> not a page mockup. The layout therefore follows the written design spec
> (navy/teal palette, `rounded-2xl` cards, soft shadows, script-text accents,
> Plus Jakarta Sans). If you have an actual mockup, share it and the sections
> can be adjusted.

### The logo

`public/logo.jpeg` is the original asset, used via `next/image` in the navbar,
footer, favicon, and Open Graph tags. It is never redrawn or replaced.

---

## Project structure

```
prisma/
  schema.prisma        Service, ServiceTest, TestPackage, PackageTest,
                       Testimonial, Booking, ContactMessage
  seed.ts              demo services / packages / testimonials
  dev.db               SQLite database (gitignore-friendly)
src/
  actions/             server actions: booking.ts, contact.ts, admin.ts
  app/                 App Router pages (about, services, packages, book,
                       contact, faqs, privacy, terms, admin, sitemap, robots)
  components/
    admin/             admin login + status controls
    forms/             booking-form.tsx, contact-form.tsx (RHF + Zod)
    home/              hero.tsx, sections.tsx
    layout/            navbar.tsx, footer.tsx
    ui/                page-header, reveal, current-year, …
  lib/
    email/             mailer.ts, templates.ts, send.ts (NOTIFY_EMAIL fallback)
    hours.ts           opening hours + slot generation
    queries.ts         cached ("use cache") DB fetchers
    validation/        bookingSchema, contactSchema
    site.ts            site name, url, phone, email, address
    zod-resolver.ts    minimal zod ↔ RHF resolver
```

---

## Deployment checklist

1. `npm run build` (type checking included) — must pass.
2. Set real SMTP credentials + `ADMIN_PASSWORD` + `SESSION_SECRET`.
3. Point `DATABASE_URL` at your production database (swap SQLite for
   Postgres/MySQL by changing the Prisma provider and URL).
4. Replace every placeholder image/section listed above.
5. Update `NEXT_PUBLIC_SITE_URL` (used by sitemap/OG tags).
6. Change `SESSION_SECRET` and never commit `.env`.
=======
# dex-me-dix
DexMedix Diagnostics is a modern medical laboratory that provides accurate, timely and reliable diagnostic testing. From routine blood and urine tests to genetic, hormone and specialized screenings, our skilled team and advanced technology help individuals, families and healthcare providers make informed health decisions with confidence.
>>>>>>> e5205c1466d3ca719073106c87ca6018714476d0
