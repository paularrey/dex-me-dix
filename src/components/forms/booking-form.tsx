"use client";

import { useForm, useWatch, Controller } from "react-hook-form";
import { useActionState, useEffect, useMemo, useRef } from "react";
import {
  Loader2,
  CalendarCheck,
  CircleCheck,
  AlertCircle,
  User,
  FlaskConical,
  Home,
  Building2,
} from "lucide-react";
import { zodResolver } from "@/lib/zod-resolver";
import { bookingSchema, type BookingInput } from "@/lib/validation/booking";
import { submitBooking, type ActionResult } from "@/actions/booking";
import { bookableDates, slotsForDate, formatDateLong } from "@/lib/hours";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-navy-300 transition focus:border-crimson-500 focus:outline-none focus:ring-2 focus:ring-crimson-500/20";
const labelClass = "mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-500";
const legendClass = "mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-500";

type Option = { id: string; name: string; slug: string; price?: number };

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-red-600">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function BookingForm({
  services,
  packages,
  preselectedType,
  preselectedId,
}: {
  services: Option[];
  packages: Option[];
  preselectedType: "service" | "package" | null;
  preselectedId: string | null;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<
    ActionResult<{ reference: string }>,
    FormData
  >(submitBooking, undefined as unknown as ActionResult<{ reference: string }>);

  const initial = useMemo(() => {
    if (preselectedType && preselectedId) {
      const list = preselectedType === "service" ? services : packages;
      const match = list.find(
        (o) => o.slug === preselectedId || o.id === preselectedId
      );
      if (match) return `${preselectedType}:${match.id}`;
    }
    return "";
  }, [preselectedType, preselectedId, services, packages]);

  const dates = useMemo(() => bookableDates(new Date(), 60), []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      website: "",
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: undefined,
      address: "",
      itemType: undefined,
      itemId: initial || "",
      collectionType: undefined,
      preferredDate: dates[0] ?? "",
      preferredTime: "",
      doctorName: "",
      notes: "",
      conditions: "",
      emergencyName: "",
      emergencyPhone: "",
      consent: false as unknown as true,
    },
  });

  // Apply ?service= / ?package= preselection once options are known.
  useEffect(() => {
    if (initial) {
      const [type, id] = initial.split(":");
      setValue("itemType", type as "service" | "package", { shouldValidate: true });
      setValue("itemId", id, { shouldValidate: true });
    }
  }, [initial, setValue]);

  const itemType = useWatch({ control, name: "itemType" });
  const preferredDate = useWatch({ control, name: "preferredDate" });

  const slots = useMemo(
    () => (preferredDate ? slotsForDate(preferredDate) : []),
    [preferredDate]
  );

  // If the chosen day's slots change, drop an invalid selection.
  useEffect(() => {
    const current = control._formValues.preferredTime;
    if (current && slots.length > 0 && !slots.some((s) => s.value === current)) {
      setValue("preferredTime", "", { shouldValidate: true });
    }
  }, [slots, control, setValue]);

  const selected = state?.ok ? state.data : null;

  const onValid = (data: BookingInput) => {
    const fd = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "string") fd.append(key, value);
      if (typeof value === "boolean") fd.append(key, value ? "true" : "");
    });
    formAction(fd);
  };

  useEffect(() => {
    if (selected) {
      reset();
      formRef.current?.reset();
    }
  }, [selected, reset]);

  /* ------------------------------- Success view ------------------------------ */
  if (selected) {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-[1.5rem] border border-crimson-200 bg-white px-6 py-14 text-center shadow-card"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-crimson-50 text-crimson-600">
          <CircleCheck className="h-9 w-9" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-extrabold text-navy-800">
          Booking received!
        </h2>
        <p className="mt-2 text-sm text-navy-500">
          Your booking reference is
        </p>
        <p className="mt-1 rounded-xl bg-cloud-100 px-5 py-2.5 font-mono text-lg font-extrabold tracking-widest text-navy-800">
          {selected.reference}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-600">
          A confirmation email is on its way with your full booking summary.
          Please arrive 10 minutes early with a valid ID.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a
            href={`/book/success?ref=${encodeURIComponent(selected.reference)}`}
            className="rounded-full bg-crimson-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-crimson-600"
          >
            View booking details
          </a>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full border-2 border-navy-200 px-6 py-3 text-sm font-bold text-navy-700 transition hover:border-navy-800"
          >
            Book another test
          </button>
        </div>
      </div>
    );
  }

  /* -------------------------------- Form view -------------------------------- */
  const serviceOptions = services;
  const packageOptions = packages;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onValid)}
      noValidate
      aria-labelledby="booking-form-title"
      className="space-y-8"
    >
      {/* 1. Personal details */}
      <fieldset className="rounded-[1.5rem] border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <legend className="flex items-center gap-2 px-1 text-base font-extrabold text-navy-800">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">
            1
          </span>
          Your details
        </legend>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="fullName">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              autoComplete="name"
              placeholder="e.g. Adaeze Nwankwo"
              className={inputClass}
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
            />
            <FieldError message={errors.fullName?.message} />
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={inputClass}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
            <FieldError message={errors.email?.message} />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+234 801 234 5678"
              className={inputClass}
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />
            <FieldError message={errors.phone?.message} />
          </div>

          <div>
            <label className={labelClass} htmlFor="dateOfBirth">
              Date of birth <span className="text-red-500">*</span>
            </label>
            <input
              id="dateOfBirth"
              type="date"
              autoComplete="bday"
              className={inputClass}
              aria-invalid={Boolean(errors.dateOfBirth)}
              {...register("dateOfBirth")}
            />
            <FieldError message={errors.dateOfBirth?.message} />
          </div>

          <div>
            <label className={labelClass} htmlFor="gender">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              className={inputClass}
              aria-invalid={Boolean(errors.gender)}
              {...register("gender")}
            >
              <option value="">Select…</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Prefer not to say</option>
            </select>
            <FieldError message={errors.gender?.message} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="address">
              Residential address <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              type="text"
              autoComplete="street-address"
              placeholder="Street, area, city"
              className={inputClass}
              aria-invalid={Boolean(errors.address)}
              {...register("address")}
            />
            <FieldError message={errors.address?.message} />
          </div>
        </div>
      </fieldset>

      {/* 2. Test selection */}
      <fieldset className="rounded-[1.5rem] border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <legend className="flex items-center gap-2 px-1 text-base font-extrabold text-navy-800">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">
            2
          </span>
          Test type &amp; collection
        </legend>

        <div className="mt-5 space-y-6">
          <div>
            <span className={legendClass}>
              <FlaskConical className="h-4 w-4 text-crimson-500" aria-hidden="true" />
              What would you like to test? <span className="text-red-500">*</span>
            </span>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-navy-400" htmlFor="service-select">
                  Single service
                </label>
                <select
                  id="service-select"
                  className={inputClass}
                  value={itemType === "service" ? (control._formValues.itemId as string) : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      setValue("itemType", "service", { shouldValidate: true });
                      setValue("itemId", e.target.value, { shouldValidate: true });
                    }
                  }}
                >
                  <option value="">Choose a service…</option>
                  {serviceOptions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-navy-400" htmlFor="package-select">
                  Package (best value)
                </label>
                <select
                  id="package-select"
                  className={inputClass}
                  value={itemType === "package" ? (control._formValues.itemId as string) : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      setValue("itemType", "package", { shouldValidate: true });
                      setValue("itemId", e.target.value, { shouldValidate: true });
                    }
                  }}
                >
                  <option value="">Choose a package…</option>
                  {packageOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <FieldError message={errors.itemId?.message || errors.itemType?.message} />
          </div>

          <div>
            <span className={legendClass}>
              <User className="h-4 w-4 text-crimson-500" aria-hidden="true" />
              How should we collect your sample? <span className="text-red-500">*</span>
            </span>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  value: "walk-in",
                  title: "Walk-in at the lab",
                  body: "Visit us at Victoria Island during opening hours.",
                  Icon: Building2,
                },
                {
                  value: "home",
                  title: "Home sample collection",
                  body: "A phlebotomist comes to your address in Lagos.",
                  Icon: Home,
                },
              ].map(({ value, title, body, Icon }) => (
                <label
                  key={value}
                  className={cn(
                    "flex cursor-pointer gap-3 rounded-2xl border-2 p-4 transition",
                    control._formValues.collectionType === value
                      ? "border-crimson-500 bg-crimson-50"
                      : "border-navy-100 bg-white hover:border-navy-200"
                  )}
                >
                  <input
                    type="radio"
                    value={value}
                    className="mt-1 h-4 w-4 shrink-0 accent-crimson-500"
                    {...register("collectionType")}
                  />
                  <span>
                    <span className="flex items-center gap-2 text-sm font-extrabold text-navy-800">
                      <Icon className="h-4 w-4 text-crimson-600" aria-hidden="true" />
                      {title}
                    </span>
                    <span className="mt-1 block text-xs text-navy-500">{body}</span>
                  </span>
                </label>
              ))}
            </div>
            <FieldError message={errors.collectionType?.message} />
          </div>
        </div>
      </fieldset>

      {/* 3. Preferred slot */}
      <fieldset className="rounded-[1.5rem] border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <legend className="flex items-center gap-2 px-1 text-base font-extrabold text-navy-800">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">
            3
          </span>
          Preferred date &amp; time
        </legend>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="preferredDate">
              Preferred date <span className="text-red-500">*</span>
            </label>
            <select
              id="preferredDate"
              className={inputClass}
              aria-invalid={Boolean(errors.preferredDate)}
              {...register("preferredDate")}
            >
              {dates.map((d) => (
                <option key={d} value={d}>
                  {formatDateLong(d)}
                </option>
              ))}
            </select>
            <FieldError message={errors.preferredDate?.message} />
          </div>

          <div>
            <label className={labelClass} htmlFor="preferredTime">
              Preferred time <span className="text-red-500">*</span>
            </label>
            <select
              id="preferredTime"
              className={inputClass}
              aria-invalid={Boolean(errors.preferredTime)}
              {...register("preferredTime")}
            >
              <option value="">Choose a time…</option>
              {slots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </select>
            <FieldError message={errors.preferredTime?.message} />
            <p className="mt-1.5 text-xs text-navy-400">
              Mon–Fri 8:00 AM – 6:00 PM · Sat 9:00 AM – 3:00 PM · Closed Sundays
            </p>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="doctorName">
              Doctor&apos;s name or referral (optional)
            </label>
            <input
              id="doctorName"
              type="text"
              placeholder="e.g. Dr. Okonkwo, or self-referred"
              className={inputClass}
              {...register("doctorName")}
            />
            <FieldError message={errors.doctorName?.message} />
          </div>
        </div>
      </fieldset>

      {/* 4. Medical notes */}
      <fieldset className="rounded-[1.5rem] border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <legend className="flex items-center gap-2 px-1 text-base font-extrabold text-navy-800">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">
            4
          </span>
          Medical notes <span className="text-xs font-semibold text-navy-400">(optional)</span>
        </legend>

        <div className="mt-5 grid gap-5">
          <div>
            <label className={labelClass} htmlFor="notes">
              Notes or symptoms
            </label>
            <textarea
              id="notes"
              rows={3}
              placeholder="Anything you'd like the team to know before your visit"
              className={`${inputClass} resize-y`}
              {...register("notes")}
            />
            <FieldError message={errors.notes?.message} />
          </div>

          <div>
            <label className={labelClass} htmlFor="conditions">
              Existing conditions or allergies
            </label>
            <textarea
              id="conditions"
              rows={3}
              placeholder="e.g. diabetes, penicillin allergy, on medication…"
              className={`${inputClass} resize-y`}
              {...register("conditions")}
            />
            <FieldError message={errors.conditions?.message} />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="emergencyName">
                Emergency contact name
              </label>
              <input
                id="emergencyName"
                type="text"
                placeholder="Full name"
                className={inputClass}
                {...register("emergencyName")}
              />
              <FieldError message={errors.emergencyName?.message} />
            </div>
            <div>
              <label className={labelClass} htmlFor="emergencyPhone">
                Emergency contact phone
              </label>
              <input
                id="emergencyPhone"
                type="tel"
                placeholder="+234 …"
                className={inputClass}
                {...register("emergencyPhone")}
              />
              <FieldError message={errors.emergencyPhone?.message} />
            </div>
          </div>
        </div>
      </fieldset>

      {/* 5. Consent + submit */}
      <fieldset className="rounded-[1.5rem] border border-navy-100 bg-white p-6 shadow-card sm:p-8">
        <legend className="flex items-center gap-2 px-1 text-base font-extrabold text-navy-800">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">
            5
          </span>
          Consent &amp; submit
        </legend>

        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl bg-cloud-50 p-4">
              <input
                type="checkbox"
                checked={field.value === true}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                className="mt-0.5 h-4 w-4 shrink-0 rounded accent-crimson-500"
                aria-invalid={Boolean(errors.consent)}
              />
              <span className="text-sm leading-relaxed text-navy-600">
                I consent to DexMedix collecting and processing my personal
                and health data for this booking, in line with the{" "}
                <a href="/privacy" className="font-semibold text-crimson-600 underline">
                  Privacy Policy
                </a>
                . <span className="text-red-500">*</span>
              </span>
            </label>
          )}
        />
        <FieldError message={errors.consent?.message} />

        {/* Honeypot */}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="booking-website">Website</label>
          <input
            id="booking-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>

        {!state?.ok && state?.error ? (
          <p
            role="alert"
            className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {state.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-crimson-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-crimson-500/20 transition hover:bg-crimson-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            <>
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Confirm Booking
            </>
          )}
        </button>

        <p className="mt-4 text-xs leading-relaxed text-navy-400">
          No payment is taken online — you settle any fees at the lab. We&apos;ll
          email your booking summary straight away.
        </p>
      </fieldset>
    </form>
  );
}
