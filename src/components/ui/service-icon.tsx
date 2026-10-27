import {
  Droplet,
  TestTube,
  Dna,
  Microscope,
  Activity,
  Stethoscope,
  FlaskConical,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  droplet: Droplet,
  "test-tube": TestTube,
  dna: Dna,
  microscope: Microscope,
  activity: Activity,
  stethoscope: Stethoscope,
  flask: FlaskConical,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? FlaskConical;
  return <Icon className={className} aria-hidden="true" />;
}
