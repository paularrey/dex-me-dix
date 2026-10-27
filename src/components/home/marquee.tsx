import { BadgeCheck, Timer, Home, Users, MonitorCog } from "lucide-react";

const items = [
  { label: "Accurate Results", Icon: BadgeCheck },
  { label: "Fast Turnaround", Icon: Timer },
  { label: "Home Collection", Icon: Home },
  { label: "Friendly Staff", Icon: Users },
  { label: "Modern Equipment", Icon: MonitorCog },
];

/** Infinite slow-scroll trust strip on navy. */
export function TrustMarquee() {
  // Doubled list for a seamless -50% loop.
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="grain relative overflow-hidden bg-navy-950 py-5" aria-label="Why patients choose DexMedix">
      <div className="marquee-track items-center gap-10">
        {loop.map(({ label, Icon }, i) => (
          <div key={`${label}-${i}`} className="flex shrink-0 items-center gap-10" aria-hidden={i >= items.length * 2}>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-crimson-500" />
              <Icon className="h-5 w-5 text-amber-500" aria-hidden="true" />
              <span className="whitespace-nowrap font-heading text-sm font-bold uppercase tracking-[0.18em] text-white">
                {label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
