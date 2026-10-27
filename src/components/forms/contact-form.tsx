"use client";

import { useForm } from "react-hook-form";
import { useActionState, useEffect, useRef } from "react";
import { Send, Loader2, CircleCheck, AlertCircle } from "lucide-react";
import { zodResolver } from "@/lib/zod-resolver";
import { contactSchema, type ContactInput } from "@/lib/validation/booking";
import { submitContact, type ContactResult } from "@/actions/contact";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="flex items-center gap-1.5 text-xs font-semibold text-crimson-600"
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<ContactResult, FormData>(
    submitContact,
    undefined as unknown as ContactResult
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const succeeded = state?.ok === true;

  useEffect(() => {
    if (succeeded) {
      reset();
      formRef.current?.reset();
    }
  }, [succeeded, reset]);

  const onValid = (data: ContactInput) => {
    const fd = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "string") fd.append(key, value);
    });
    formAction(fd);
  };

  if (succeeded) {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-[2rem] border border-crimson-200 bg-blush-50 px-6 py-16 text-center"
      >
        <CircleCheck className="h-12 w-12 text-crimson-600" aria-hidden="true" />
        <h2 className="mt-4 font-heading text-2xl font-extrabold tracking-tight text-navy-950">
          Message sent — thank you!
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-navy-600">
          Our team has received your message and will reply to your email during
          opening hours, usually within a few hours.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-crimson-700 px-7 py-3 text-sm font-bold text-white transition hover:bg-crimson-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="rounded-[2rem] border border-cloud-200 bg-white p-6 shadow-card sm:p-8"
      aria-labelledby="contact-form-title"
    >
      <h2
        id="contact-form-title"
        className="font-heading text-2xl font-extrabold tracking-tight text-navy-950"
      >
        Send us a message
      </h2>
      <p className="mt-1.5 text-sm text-navy-500">
        Fill in the form and we&apos;ll get back to you by email or phone.
      </p>

      {!state?.ok && state?.error ? (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-2xl border border-crimson-200 bg-crimson-50 px-4 py-3 text-sm font-semibold text-crimson-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      ) : null}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            className="text-xs font-bold uppercase tracking-wider text-navy-500"
            htmlFor="contact-name"
          >
            Name <span className="text-crimson-600">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className="input-base"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-bold uppercase tracking-wider text-navy-500"
            htmlFor="contact-email"
          >
            Email <span className="text-crimson-600">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input-base"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-bold uppercase tracking-wider text-navy-500"
            htmlFor="contact-phone"
          >
            Phone <span className="text-crimson-600">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234 801 234 5678"
            className="input-base"
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            className="text-xs font-bold uppercase tracking-wider text-navy-500"
            htmlFor="contact-subject"
          >
            Subject <span className="text-crimson-600">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="e.g. Question about the Executive Check"
            className="input-base"
            aria-invalid={Boolean(errors.subject)}
            {...register("subject")}
          />
          <FieldError message={errors.subject?.message} />
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label
            className="text-xs font-bold uppercase tracking-wider text-navy-500"
            htmlFor="contact-message"
          >
            Message <span className="text-crimson-600">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={6}
            placeholder="How can we help?"
            className="input-base resize-y"
            aria-invalid={Boolean(errors.message)}
            {...register("message")}
          />
          <FieldError message={errors.message?.message} />
        </div>

        {/* Honeypot — hidden from humans */}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-8 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-crimson-700 to-crimson-500 px-8 py-4 text-sm font-bold text-white shadow-crimson transition hover:-translate-y-0.5 hover:shadow-card-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-navy-400">
        By submitting you agree that we may process your details to respond to
        your enquiry. See our{" "}
        <a href="/privacy" className="font-semibold text-crimson-700 underline">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
