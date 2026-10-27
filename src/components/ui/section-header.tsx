import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Consistent section heading with amber eyebrow, big Sora title (with an
 * optional serif-accent word) and a soft subtitle.
 */
export function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
  align = "center",
  className,
  id,
  action,
}: {
  eyebrow: string;
  title: string;
  /** Italic serif accent word appended to the title. */
  accent?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  id?: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      <Badge tone="amber" className={align === "center" ? "mx-auto" : undefined}>
        {eyebrow}
      </Badge>
      <h2
        id={id}
        className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-navy-950 sm:text-4xl md:text-5xl"
      >
        {title}
        {accent ? (
          <>
            {" "}
            <span className="accent-word squiggle">{accent}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-relaxed text-navy-500 sm:text-lg">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-7">{action}</div> : null}
    </Reveal>
  );
}
