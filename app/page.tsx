"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Briefcase,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  FileUp,
  Lock,
  MessageSquare,
  Receipt,
  ShieldCheck,
  Star,
  UserCog,
  UserRound,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Avatar } from "@/components/Avatar";
import { ServiceIcon } from "@/components/ServiceIcon";
import { lawyers, services } from "@/lib/data";
import { formatMoney, useLang } from "@/lib/i18n";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <HowItWorks />
        <Lawyers />
        <Portal />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
        light ? "text-gold-300" : "text-gold-600"
      }`}
    >
      <span className="h-px w-6 bg-current" />
      {children}
    </span>
  );
}

function Hero() {
  const { t, tr, locale } = useLang();
  const lawyer = lawyers[0];
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-24 pt-32 text-white sm:pt-40 lg:pb-32">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -top-40 end-0 size-[600px] rounded-full bg-gold-500/15 blur-[120px]" />
      <div className="absolute -bottom-40 start-0 size-[500px] rounded-full bg-navy-600/40 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-3.5 py-1.5 text-xs font-medium text-gold-300">
            <ShieldCheck className="size-3.5" />
            {t.hero.badge}
          </span>
          <h1 className="font-display mt-6 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
            {t.hero.title1}
            <br />
            <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">{t.hero.title2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{t.hero.sub}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/request"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-semibold text-navy-950 shadow-lg shadow-gold-500/20 transition hover:bg-gold-400"
            >
              {t.hero.primary}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
            <a
              href="#lawyers"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              {t.hero.secondary}
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
            {t.hero.trust.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-gold-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Product preview */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="animate-float rounded-2xl border border-white/10 bg-white p-6 text-navy-900 shadow-2xl shadow-black/40">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-navy-800/60">{t.heroCard.req}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {t.heroCard.status}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold">{t.heroCard.service}</h3>
            <div className="mt-4 flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className={`h-1.5 flex-1 rounded-full ${i < 3 ? "bg-gold-500" : "bg-sand-200"}`} />
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 rounded-xl bg-sand-50 p-3">
              <Avatar src={lawyer.photo} name={tr(lawyer.name)} className="size-11 rounded-full" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-navy-800/60">{t.heroCard.lawyer}</p>
                <p className="truncate font-semibold">{tr(lawyer.name)}</p>
              </div>
              <BadgeCheck className="size-5 text-gold-500" />
            </div>
            <div className="mt-4 flex items-end justify-between border-t border-sand-200 pt-4">
              <div>
                <p className="text-xs text-navy-800/60">{t.heroCard.amount}</p>
                <p className="text-2xl font-bold">{formatMoney(1500, locale)}</p>
              </div>
              <span className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white">{t.heroCard.accept}</span>
            </div>
          </div>

          <div className="animate-float-slow absolute -start-4 -top-6 hidden items-center gap-2.5 rounded-xl bg-white px-4 py-3 text-sm font-medium text-navy-900 shadow-xl sm:flex">
            <span className="grid size-8 place-items-center rounded-lg bg-gold-300/30 text-gold-600">
              <MessageSquare className="size-4" />
            </span>
            {t.heroCard.msg}
          </div>
          <div className="animate-float-slow absolute -bottom-10 start-8 hidden items-center gap-2.5 rounded-xl bg-white px-4 py-3 text-sm font-medium text-navy-900 shadow-xl sm:flex">
            <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
              <FileUp className="size-4" />
            </span>
            {t.heroCard.docs}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { t } = useLang();
  return (
    <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 sm:px-6">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 shadow-xl shadow-navy-900/5 lg:grid-cols-4">
        {t.stats.map((s) => (
          <div key={s.l} className="bg-white px-6 py-7 text-center">
            <p className="font-display text-3xl font-semibold text-navy-900">{s.v}</p>
            <p className="mt-1 text-sm text-navy-800/60">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const { t, tr, locale } = useLang();
  return (
    <section id="services" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="max-w-2xl">
        <Eyebrow>{t.services.eyebrow}</Eyebrow>
        <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">{t.services.title}</h2>
        <p className="mt-4 text-lg text-navy-800/70">{t.services.sub}</p>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Link
            key={s.id}
            href={`/request?service=${s.id}`}
            className="group flex flex-col rounded-2xl border border-navy-900/10 bg-white p-6 transition hover:-translate-y-1 hover:border-gold-400 hover:shadow-xl hover:shadow-navy-900/5"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-navy-900 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-navy-950">
              <ServiceIcon name={s.icon} className="size-6" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{tr(s.title)}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-800/65">{tr(s.desc)}</p>
            <div className="mt-5 flex items-center justify-between border-t border-sand-200 pt-4 text-sm">
              <span className="text-navy-800/60">
                {t.services.from} <span className="font-semibold text-navy-900">{formatMoney(s.fee, locale)}</span>
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-gold-600">
                {t.services.cta}
                <ArrowRight className="size-4 transition group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const { t } = useLang();
  const icons = [FileText, Receipt, CreditCard, MessageSquare];
  return (
    <section id="how" className="scroll-mt-20 bg-sand-100 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t.how.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">{t.how.title}</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div key={step.t} className="relative rounded-2xl bg-white p-7 shadow-sm">
                <span className="font-display absolute end-6 top-5 text-5xl font-semibold text-sand-200">0{i + 1}</span>
                <span className="grid size-12 place-items-center rounded-xl bg-gold-500/15 text-gold-600">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-800/65">{step.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Lawyers() {
  const { t, tr } = useLang();
  return (
    <section id="lawyers" className="mx-auto max-w-7xl scroll-mt-20 px-4 py-24 sm:px-6">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <Eyebrow>{t.lawyers.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">{t.lawyers.title}</h2>
          <p className="mt-4 text-lg text-navy-800/70">{t.lawyers.sub}</p>
        </div>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {lawyers.map((l) => (
          <div key={l.id} className="group overflow-hidden rounded-2xl border border-navy-900/10 bg-white transition hover:shadow-xl hover:shadow-navy-900/5">
            <div className="relative aspect-[4/3.6] overflow-hidden bg-navy-900">
              <Avatar src={l.photo} name={tr(l.name)} className="size-full text-4xl transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent" />
              <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-navy-900">
                <BadgeCheck className="size-3.5 text-gold-500" />
                {t.lawyers.verified}
              </span>
              <span className="absolute bottom-3 end-3 inline-flex items-center gap-1 rounded-full bg-navy-950/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                <Star className="size-3.5 fill-gold-400 text-gold-400" />
                {l.rating.toFixed(1)}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold">{tr(l.name)}</h3>
              <p className="text-sm font-medium text-gold-600">{tr(l.role)}</p>
              <p className="mt-3 text-sm leading-relaxed text-navy-800/65">{tr(l.bio)}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                <div className="rounded-lg bg-sand-50 py-2">
                  <p className="font-semibold">{l.years}</p>
                  <p className="text-xs text-navy-800/60">{t.lawyers.years}</p>
                </div>
                <div className="rounded-lg bg-sand-50 py-2">
                  <p className="font-semibold">{l.cases}+</p>
                  <p className="text-xs text-navy-800/60">{t.lawyers.cases}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-navy-800/60">
                {t.lawyers.langs}: <span className="text-navy-800">{tr(l.langs)}</span>
              </p>
              <Link
                href={`/request?service=${l.areas[0]}&lawyer=${l.id}`}
                className="mt-4 block rounded-full border border-navy-900/15 py-2.5 text-center text-sm font-semibold transition hover:border-navy-900 hover:bg-navy-900 hover:text-white"
              >
                {t.lawyers.book}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Portal() {
  const { t } = useLang();
  const featureIcons = [FileUp, Clock, MessageSquare, Receipt, CreditCard];
  const roleIcons = [UserRound, Briefcase, UserCog];
  return (
    <section id="portal" className="scroll-mt-20 bg-navy-950 py-24 text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <Eyebrow light>{t.platform.eyebrow}</Eyebrow>
          <h2 className="font-display mt-4 text-3xl font-semibold sm:text-4xl">{t.platform.title}</h2>
          <p className="mt-4 text-lg text-white/65">{t.platform.sub}</p>
          <ul className="mt-8 space-y-5">
            {t.platform.features.map((f, i) => {
              const Icon = featureIcons[i];
              return (
                <li key={f.t} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/5 text-gold-400 ring-1 ring-white/10">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{f.t}</p>
                    <p className="text-sm text-white/60">{f.d}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link
            href="/dashboard"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 font-semibold text-navy-950 transition hover:bg-gold-400"
          >
            {t.platform.open}
            <ArrowRight className="size-4 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid gap-4">
          {t.platform.roles.map((r, i) => {
            const Icon = roleIcons[i];
            return (
              <div
                key={r.t}
                className={`flex items-center gap-5 rounded-2xl border p-6 ${
                  i === 0 ? "border-gold-500/40 bg-gold-500/10" : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span className={`grid size-14 shrink-0 place-items-center rounded-xl ${i === 0 ? "bg-gold-500 text-navy-950" : "bg-white/10 text-gold-300"}`}>
                  <Icon className="size-7" />
                </span>
                <div>
                  <p className="text-lg font-semibold">{r.t}</p>
                  <p className="text-sm text-white/60">{r.d}</p>
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/70">
            <Lock className="size-5 text-gold-400" />
            <Bell className="size-5 text-gold-400" />
            <span>{t.form.secure}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  const { t } = useLang();
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold-400 to-gold-600 px-8 py-14 text-center sm:px-16">
        <div className="absolute -end-20 -top-20 size-72 rounded-full bg-white/20 blur-3xl" />
        <h2 className="font-display relative text-3xl font-semibold text-navy-950 sm:text-4xl">{t.ctaBand.title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-navy-950/75">{t.ctaBand.sub}</p>
        <Link
          href="/request"
          className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-navy-950 px-8 py-4 font-semibold text-white transition hover:bg-navy-800"
        >
          {t.ctaBand.btn}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
    </section>
  );
}
