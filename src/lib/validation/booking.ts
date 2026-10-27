import { z } from "zod";

const phone = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(25)
  .regex(/^[+0-9()\-\s]+$/, "Phone number may only contain digits, spaces and + - ( )");

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Maximum ${max} characters`)
    .optional()
    .transform((v) => (v ? v : undefined));

export const bookingSchema = z
  .object({
    // Honeypot — must stay empty; bots fill it and get silently dropped.
    website: z.string().max(0, "Invalid submission").optional().default(""),

    fullName: z.string().trim().min(2, "Enter your full name").max(120),
    email: z.email("Enter a valid email address").max(160),
    phone,
    dateOfBirth: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter your date of birth")
      .refine((v) => new Date(v).getTime() < Date.now(), {
        message: "Date of birth must be in the past",
      }),
    gender: z.enum(["female", "male", "other"], "Select your gender"),
    address: z.string().trim().min(5, "Enter your address").max(300),

    itemType: z.enum(["service", "package"], "Select a test type"),
    itemId: z.string().trim().min(1, "Select a test type").max(120),

    collectionType: z.enum(["walk-in", "home"], "Select a collection type"),

    preferredDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a preferred date")
      .refine((v) => new Date(`${v}T23:59:59`).getTime() >= Date.now(), {
        message: "Preferred date cannot be in the past",
      }),
    preferredTime: z.string().regex(/^\d{2}:\d{2}$/, "Choose a preferred time"),

    doctorName: optionalText(120),
    notes: optionalText(1000),
    conditions: optionalText(1000),
    emergencyName: optionalText(120),
    emergencyPhone: optionalText(25),

    consent: z.literal(true, "Consent is required to process your booking"),
  })
  .superRefine((data, ctx) => {
    if (data.emergencyPhone && !data.emergencyName) {
      ctx.addIssue({
        code: "custom",
        path: ["emergencyName"],
        message: "Add the name for this emergency contact",
      });
    }
    if (data.emergencyName && !data.emergencyPhone) {
      ctx.addIssue({
        code: "custom",
        path: ["emergencyPhone"],
        message: "Add a phone number for this emergency contact",
      });
    }
  })
  .superRefine((data, ctx) => {
    if (data.preferredTime && data.preferredDate) {
      const today = new Date();
      const todayIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      if (data.preferredDate === todayIso && data.preferredTime < `${String(today.getHours()).padStart(2, "0")}:${String(today.getMinutes()).padStart(2, "0")}`) {
        ctx.addIssue({
          code: "custom",
          path: ["preferredTime"],
          message: "That time has already passed today — pick a later slot",
        });
      }
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  website: z.string().max(0, "Invalid submission").optional().default(""),
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.email("Enter a valid email address").max(160),
  phone,
  subject: z.string().trim().min(3, "Enter a subject").max(160),
  message: z.string().trim().min(10, "Tell us a little more (10+ characters)").max(3000),
});

export type ContactInput = z.infer<typeof contactSchema>;
