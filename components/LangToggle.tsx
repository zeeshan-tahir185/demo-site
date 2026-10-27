"use client";

import { Languages } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function LangToggle({ light = false }: { light?: boolean }) {
  const { t, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        light
          ? "border-white/20 text-white hover:bg-white/10"
          : "border-navy-900/15 text-navy-800 hover:bg-navy-900/5"
      }`}
    >
      <Languages className="size-4" />
      {t.nav.switchTo}
    </button>
  );
}
