"use client";

import { useLang } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-navy-950 text-white/60">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-sm">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed">{t.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            {t.footer.links.map((l) => (
              <a key={l} href="#" className="hover:text-white">
                {l}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs sm:flex-row">
          <span>{t.footer.rights}</span>
          <span className="rounded-full border border-gold-500/30 px-3 py-1 text-gold-300 self-start">{t.footer.demo}</span>
        </div>
      </div>
    </footer>
  );
}
