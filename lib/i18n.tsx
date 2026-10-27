"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { dict, type Dict, type Lang } from "./dict";

export type Bi = { en: string; ar: string };

type LangContext = {
  lang: Lang;
  t: Dict;
  tr: (value: Bi) => string;
  toggle: () => void;
  locale: string;
};

const Ctx = createContext<LangContext | null>(null);
const KEY = "wathiqa_lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    if (fromUrl === "en" || fromUrl === "ar") return setLang(fromUrl);
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "en" || saved === "ar") setLang(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem(KEY, lang);
    } catch {}
  }, [lang]);

  const value: LangContext = {
    lang,
    t: dict[lang],
    tr: (v) => v[lang],
    toggle: () => setLang((l) => (l === "en" ? "ar" : "en")),
    locale: lang === "ar" ? "ar-SA-u-nu-latn" : "en-US",
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}

export function formatMoney(amount: number, locale: string) {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(amount);
}
