"use client";

import { useActionState, useEffect, useRef } from "react";
import { LogIn, Loader2, AlertCircle, Lock } from "lucide-react";
import { loginAdmin, type LoginResult } from "@/actions/admin";

export function AdminLogin() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, pending] = useActionState<LoginResult, FormData>(
    loginAdmin,
    undefined as unknown as LoginResult
  );

  useEffect(() => {
    if (state?.ok) formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mx-auto w-full max-w-sm rounded-[1.5rem] border border-navy-100 bg-white p-8 shadow-card"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800 text-crimson-300">
        <Lock className="h-6 w-6" aria-hidden="true" />
      </span>
      <h1 className="mt-5 text-xl font-extrabold text-navy-800">Admin sign in</h1>
      <p className="mt-1 text-sm text-navy-500">
        Enter the admin password to view bookings and messages.
      </p>

      {!state?.ok && state?.error ? (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.error}
        </p>
      ) : null}

      <label
        className="mb-1.5 mt-6 block text-xs font-bold uppercase tracking-wider text-navy-500"
        htmlFor="admin-password"
      >
        Password
      </label>
      <input
        id="admin-password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        className="w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-sm text-navy-800 transition focus:border-crimson-500 focus:outline-none focus:ring-2 focus:ring-crimson-500/20"
        placeholder="••••••••"
      />

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-crimson-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-crimson-600 disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          <>
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in
          </>
        )}
      </button>
    </form>
  );
}
