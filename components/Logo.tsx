"use client";

import Link from "next/link";
import { Scale } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Logo({ light = false }: { light?: boolean }) {
  const { t } = useLang();
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-sm">
        <Scale className="size-5" strokeWidth={2.2} />
      </span>
      <span className={`text-xl font-semibold ${light ? "text-white" : "text-navy-900"}`}>
        {t.brand}
        <span className="text-gold-500">.ai</span>
      </span>
    </Link>
  );
}
