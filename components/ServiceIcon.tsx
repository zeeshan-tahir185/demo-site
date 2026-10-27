import { Banknote, Briefcase, Building2, FileText, Gavel, Landmark, Lightbulb, Users, type LucideProps } from "lucide-react";

const icons = { Banknote, Briefcase, Building2, FileText, Gavel, Landmark, Lightbulb, Users };

export function ServiceIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as keyof typeof icons] ?? FileText;
  return <Icon {...props} />;
}
