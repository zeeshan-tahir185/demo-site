"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Logo } from "./Logo";
import { LangToggle } from "./LangToggle";

export function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !scrolled && !open;
  const links = [
    { href: "/#services", label: t.nav.services },
    { href: "/#how", label: t.nav.how },
    { href: "/#lawyers", label: t.nav.lawyers },
    { href: "/#portal", label: t.nav.portal },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        light ? "bg-transparent" : "border-b border-navy-900/10 bg-sand-50/90 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo light={light} />
        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition ${light ? "text-white/80 hover:text-white" : "text-navy-800/80 hover:text-navy-900"}`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <LangToggle light={light} />
          <Link
            href="/dashboard"
            className={`text-sm font-medium ${light ? "text-white/80 hover:text-white" : "text-navy-800 hover:text-navy-900"}`}
          >
            {t.nav.login}
          </Link>
          <Link
            href="/request"
            className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition hover:bg-gold-400"
          >
            {t.nav.cta}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>
        <button
          className={`lg:hidden ${light ? "text-white" : "text-navy-900"}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-navy-900/10 bg-sand-50 px-4 pb-6 pt-2 lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 font-medium text-navy-800">
              {l.label}
            </a>
          ))}
          <Link href="/dashboard" className="block py-3 font-medium text-navy-800">
            {t.nav.login}
          </Link>
          <div className="mt-3 flex items-center gap-3">
            <LangToggle />
            <Link href="/request" className="flex-1 rounded-full bg-gold-500 px-5 py-2.5 text-center text-sm font-semibold text-navy-950">
              {t.nav.cta}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
