import { cn } from "@/lib/utils";

/** Small pill badge used for eyebrows, chips and stickers. */
export function Badge({
  children,
  className,
  tone = "crimson",
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "crimson" | "blush" | "navy" | "amber" | "cloud" | "glass";
  icon?: React.ReactNode;
}) {
  const tones = {
    crimson: "bg-crimson-100 text-crimson-800",
    blush: "bg-blush-100 text-crimson-800",
    navy: "bg-navy-950 text-white",
    amber: "bg-amber-500 text-navy-950",
    cloud: "bg-cloud-100 text-navy-700",
    glass: "glass text-navy-800",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]",
        tones[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}
