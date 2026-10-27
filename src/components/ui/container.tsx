import { cn } from "@/lib/utils";

/** Max-width container with comfortable side padding at every breakpoint. */
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

/** Vertical rhythm wrapper — every section sits inside one of these. */
export function Section({
  children,
  className,
  id,
  as: Tag = "section",
  ariaLabelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "article";
  ariaLabelledBy?: string;
}) {
  return (
    <Tag
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("relative py-16 md:py-28", className)}
    >
      {children}
    </Tag>
  );
}
