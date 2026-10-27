import Image from "next/image";
import { cn } from "@/lib/utils";

/** Brand logo badge — crisp SVG, works at any size. */
export function LogoBadge({ className }: { className?: string }) {
  return (
    <Image
      src="/dexmedix-logo-badge.svg"
      alt="DexMedix logo"
      width={44}
      height={44}
      className={cn("shrink-0", className)}
      priority
    />
  );
}
