"use client";

/**
 * Minimal zod ↔ react-hook-form resolver.
 * (We intentionally don't pull in @hookform/resolvers — its optional peer
 * deps conflict; this is ~30 lines and works with zod v4.)
 */
import type { FieldValues, Resolver, UseFormReturn } from "react-hook-form";
import type { ZodType } from "zod";

type Issue = { path: PropertyKey[]; message: string };

function collectIssues(error: unknown): Issue[] {
  if (!error || typeof error !== "object") return [];
  const issues = (error as { issues?: Issue[] }).issues;
  return Array.isArray(issues) ? issues : [];
}

export function zodResolver<T extends FieldValues>(
  schema: ZodType<T>
): Resolver<T> {
  return async (values, _context, options) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return { values: result.data as T, errors: {} };
    }

    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of collectIssues(result.error)) {
      const key =
        (issue.path.join(".") as string) ||
        (options?.names?.[0] ? String(options.names[0]) : "");
      if (!key) continue;
      if (!errors[key]) {
        errors[key] = { type: "validation", message: issue.message };
      }
    }
    return { values: {} as T, errors: errors as never };
  };
}

/** Convenience typing helper so forms get full inference from their schema. */
export type TypedResolver<T extends FieldValues> = (
  form: UseFormReturn<T>
) => Resolver<T>;
