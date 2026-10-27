import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "white" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 focus-visible:outline-3 focus-visible:outline-crimson-500 disabled:cursor-not-allowed disabled:opacity-70 min-h-[44px]";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-crimson-700 to-crimson-500 text-white shadow-crimson hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-navy-950 text-white hover:bg-navy-800 hover:-translate-y-0.5 shadow-soft",
  white:
    "bg-white text-navy-950 shadow-soft hover:shadow-card hover:-translate-y-0.5",
  outline:
    "border-2 border-navy-200 text-navy-800 hover:border-crimson-600 hover:text-crimson-700 bg-white",
  ghost: "text-navy-700 hover:text-crimson-700 hover:bg-crimson-50",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}
