"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  BadgeCheck,
  Bell,
  Check,
  CreditCard,
  FileText,
  FolderOpen,
  Info,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquare,
  Plus,
  Receipt,
  Send,
  Settings,
  Star,
  Upload,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { Avatar } from "@/components/Avatar";
import { ServiceIcon } from "@/components/ServiceIcon";
import { lawyers, services } from "@/lib/data";
import { formatMoney, useLang } from "@/lib/i18n";
import { formatSize, loadRequest, sampleRequest, saveRequest, type DemoRequest } from "@/lib/store";

type Msg = { from: "support" | "lawyer" | "me"; text: string; at: Date };

export default function Dashboard() {
  const { t, tr, locale, lang } = useLang();
  const [req, setReq] = useState<DemoRequest | null>(null);
  const [isSample, setIsSample] = useState(false);
  const [paying, setPaying] = useState(false);
  const [msgs, setMsgs] = useState<Msg[] | null>(null);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEnd = useRef<HTMLDivElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = loadRequest();
    setReq(stored ?? sampleRequest);
    setIsSample(!stored);
  }, []);

  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [msgs, typing]);

  if (!req) return <div className="min-h-screen bg-sand-50" />;

  const service = services.find((s) => s.id === req.serviceId) ?? services[0];
  const lawyer = lawyers.find((l) => l.id === req.lawyerId) ?? lawyers[0];
  const fee = service.fee;
  const statusIndex = req.paid ? 4 : 2;
  const firstName = isSample ? (lang === "ar" ? "عبد الحكيم" : "Abdul Hakim") : req.name.split(" ")[0];
  const title = isSample ? (lang === "ar" ? "مراجعة عقد إيجار تجاري" : req.title) : req.title;
  const created = new Date(req.createdAt);

  const baseMsgs: Msg[] = [
    { from: "support", text: t.dash.welcome, at: created },
    { from: "lawyer", text: t.dash.lawyerMsg, at: new Date(created.getTime() + 60_000) },
  ];
  const conversation = msgs ?? baseMsgs;

  const update = (patch: Partial<DemoRequest>) => {
    const nextReq = { ...req, ...patch };
    setReq(nextReq);
    if (!isSample) saveRequest(nextReq);
  };

  const pay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      update({ paid: true });
    }, 1600);
  };

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    setMsgs([...conversation, { from: "me", text, at: new Date() }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...(m ?? []), { from: "lawyer", text: t.dash.reply, at: new Date() }]);
    }, 1800);
  };

  const navItems = [
    { icon: LayoutDashboard, label: t.dash.nav.overview, active: true },
    { icon: FolderOpen, label: t.dash.nav.requests },
    { icon: FileText, label: t.dash.nav.documents },
    { icon: MessageSquare, label: t.dash.nav.messages, badge: 1 },
    { icon: CreditCard, label: t.dash.nav.payments },
    { icon: Settings, label: t.dash.nav.settings },
  ];

  const time = (d: Date) => d.toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" });

  return (
    <div className="flex min-h-screen bg-sand-50">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-navy-950 p-5 text-white lg:flex">
        <Logo light />
        <nav className="mt-10 space-y-1">
          {navItems.map((n) => (
            <a
              key={n.label}
              href="#"
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                n.active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <n.icon className="size-5" />
              <span className="flex-1">{n.label}</span>
              {n.badge && <span className="grid size-5 place-items-center rounded-full bg-gold-500 text-xs font-bold text-navy-950">{n.badge}</span>}
            </a>
          ))}
        </nav>
        <div className="mt-auto">
          <Link href="/request" className="mb-4 flex items-center justify-center gap-2 rounded-lg bg-gold-500 py-2.5 text-sm font-semibold text-navy-950 hover:bg-gold-400">
            <Plus className="size-4" />
            {t.dash.newRequest}
          </Link>
          <div className="flex items-center gap-3 border-t border-white/10 pt-4">
            <span className="grid size-9 place-items-center rounded-full bg-gold-500/20 font-semibold text-gold-300">{firstName[0]}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{isSample ? firstName : req.name}</p>
              <p className="truncate text-xs text-white/50" dir="ltr">
                {req.email}
              </p>
            </div>
            <Link href="/" title={t.dash.logout} className="text-white/50 hover:text-white">
              <LogOut className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-20 border-b border-navy-900/10 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between px-4 py-3 sm:px-8">
            <div className="lg:hidden">
              <Logo />
            </div>
            <p className="hidden items-center gap-2 text-xs text-navy-800/60 sm:flex">
              <Info className="size-3.5" />
              {t.dash.demoBanner}
            </p>
            <div className="flex items-center gap-3">
              <LangToggle />
              <button className="relative grid size-9 place-items-center rounded-full border border-navy-900/10 text-navy-800">
                <Bell className="size-4" />
                <span className="absolute end-2 top-2 size-2 rounded-full bg-gold-500" />
              </button>
            </div>
          </div>
          {/* Mobile nav */}
          <nav className="flex gap-1 overflow-x-auto px-4 pb-3 lg:hidden">
            {navItems.map((n) => (
              <a
                key={n.label}
                href="#"
                className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${
                  n.active ? "bg-navy-900 text-white" : "bg-sand-100 text-navy-800"
                }`}
              >
                <n.icon className="size-3.5" />
                {n.label}
              </a>
            ))}
          </nav>
        </header>

        <main className="space-y-6 px-4 py-8 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-display text-2xl font-semibold sm:text-3xl">
                {t.dash.hello}
                {lang === "ar" ? "، " : ", "}
                {firstName} 👋
              </h1>
              <p className="mt-1 text-navy-800/60">{t.dash.sub}</p>
            </div>
            <Link href="/request" className="inline-flex items-center gap-2 self-start rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-800">
              <Plus className="size-4" />
              {t.dash.newRequest}
            </Link>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {[
              { icon: FolderOpen, label: t.dash.cards.active, value: "1" },
              { icon: FileText, label: t.dash.cards.docs, value: String(req.files.length) },
              { icon: MessageSquare, label: t.dash.cards.unread, value: msgs ? "0" : "1" },
              { icon: CreditCard, label: t.dash.cards.paid, value: formatMoney(req.paid ? fee : 0, locale) },
            ].map((c) => (
              <div key={c.label} className="rounded-2xl border border-navy-900/10 bg-white p-5">
                <c.icon className="size-5 text-gold-600" />
                <p className="mt-3 text-2xl font-bold">{c.value}</p>
                <p className="text-sm text-navy-800/60">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
            <div className="space-y-6">
              {/* Request + status */}
              <section className="rounded-2xl border border-navy-900/10 bg-white p-6">
                <div className="flex flex-wrap items-start gap-4">
                  <span className="grid size-12 place-items-center rounded-xl bg-navy-900 text-gold-400">
                    <ServiceIcon name={service.icon} className="size-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-navy-800/50" dir="ltr">
                      #{req.id}
                    </p>
                    <h2 className="text-lg font-semibold">{title}</h2>
                    <p className="mt-0.5 text-sm text-navy-800/60">
                      {tr(service.title)} · {t.dash.submittedOn} {created.toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      req.paid ? "bg-emerald-50 text-emerald-700" : "bg-gold-500/15 text-gold-600"
                    }`}
                  >
                    {t.dash.statuses[statusIndex]}
                  </span>
                </div>

                <h3 className="mt-8 text-sm font-semibold text-navy-800/70">{t.dash.status}</h3>
                <ol className="mt-4 grid grid-cols-3 gap-y-6 sm:grid-cols-6">
                  {t.dash.statuses.map((s, i) => {
                    const done = i < statusIndex;
                    const current = i === statusIndex;
                    return (
                      <li key={s} className="relative flex flex-col items-center text-center">
                        {i < 5 && (
                          <span className={`absolute start-1/2 top-4 h-0.5 w-full ${done ? "bg-gold-500" : "bg-sand-200"} ${i === 2 ? "max-sm:hidden" : ""}`} />
                        )}
                        <span
                          className={`relative grid size-8 place-items-center rounded-full text-xs font-bold ${
                            done ? "bg-gold-500 text-navy-950" : current ? "bg-navy-900 text-white ring-4 ring-navy-900/10" : "bg-sand-200 text-navy-800/50"
                          }`}
                        >
                          {done ? <Check className="size-4" /> : i + 1}
                        </span>
                        <span className={`mt-2 text-xs font-medium ${current ? "text-navy-900" : "text-navy-800/60"}`}>{s}</span>
                      </li>
                    );
                  })}
                </ol>
              </section>

              {/* Quotation */}
              <section className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white">
                <div className="flex items-center justify-between border-b border-sand-200 px-6 py-4">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Receipt className="size-5 text-gold-600" />
                    {t.dash.quote}
                  </h3>
                  {req.paid && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      <Check className="size-3.5" />
                      {t.dash.paid}
                    </span>
                  )}
                </div>
                <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <p className="text-sm text-navy-800/60">
                      {t.dash.quoteFrom} <span className="font-semibold text-navy-900">{tr(lawyer.name)}</span>
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-navy-800/50">{t.dash.scope}</p>
                    <ul className="mt-2 space-y-1.5">
                      {t.dash.scopeItems.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm">
                          <Check className="size-4 text-gold-600" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-sand-50 p-5 md:min-w-56">
                    <p className="text-xs text-navy-800/60">{t.dash.total}</p>
                    <p className="text-3xl font-bold">{formatMoney(fee, locale)}</p>
                    {req.paid ? (
                      <p className="mt-3 text-xs text-emerald-700">{t.dash.paidNote}</p>
                    ) : (
                      <button
                        onClick={pay}
                        disabled={paying}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-400 disabled:opacity-70"
                      >
                        {paying ? <Loader2 className="size-4 animate-spin" /> : <CreditCard className="size-4" />}
                        {paying ? t.dash.processing : t.dash.accept}
                      </button>
                    )}
                  </div>
                </div>
              </section>

              {/* Documents */}
              <section className="rounded-2xl border border-navy-900/10 bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <FileText className="size-5 text-gold-600" />
                    {t.dash.docs}
                  </h3>
                  <button
                    onClick={() => fileInput.current?.click()}
                    className="inline-flex items-center gap-1.5 rounded-full border border-navy-900/15 px-3.5 py-1.5 text-sm font-medium hover:bg-sand-50"
                  >
                    <Upload className="size-4" />
                    {t.dash.upload}
                  </button>
                  <input
                    ref={fileInput}
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => {
                      const added = Array.from(e.target.files ?? []).map((f) => ({ name: f.name, size: f.size }));
                      update({ files: [...req.files, ...added] });
                      e.target.value = "";
                    }}
                  />
                </div>
                {req.files.length === 0 ? (
                  <p className="mt-4 text-sm text-navy-800/50">{t.dash.noDocs}</p>
                ) : (
                  <ul className="mt-4 divide-y divide-sand-200">
                    {req.files.map((f, i) => (
                      <li key={`${f.name}-${i}`} className="flex items-center gap-3 py-3">
                        <span className="grid size-9 place-items-center rounded-lg bg-red-50 text-[10px] font-bold uppercase text-red-600">
                          {f.name.split(".").pop()?.slice(0, 4)}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-medium" dir="ltr">
                          {f.name}
                        </span>
                        <span className="text-xs text-navy-800/50">{formatSize(f.size)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* Payments */}
              <section className="rounded-2xl border border-navy-900/10 bg-white p-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <CreditCard className="size-5 text-gold-600" />
                  {t.dash.payments}
                </h3>
                {req.paid ? (
                  <div className="mt-4 flex items-center gap-3 rounded-xl bg-sand-50 p-4 text-sm">
                    <span className="grid size-9 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="size-4" />
                    </span>
                    <div className="flex-1">
                      <p className="font-semibold">{tr(service.title)}</p>
                      <p className="text-xs text-navy-800/60" dir="ltr">
                        INV-{req.id.replace("WQ-", "")} · Visa •••• 4242
                      </p>
                    </div>
                    <span className="font-bold">{formatMoney(fee, locale)}</span>
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-navy-800/50">{t.dash.noPayments}</p>
                )}
              </section>
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <section className="rounded-2xl border border-navy-900/10 bg-white p-6">
                <h3 className="text-sm font-semibold text-navy-800/70">{t.dash.lawyer}</h3>
                <div className="mt-4 flex items-center gap-4">
                  <Avatar src={lawyer.photo} name={tr(lawyer.name)} className="size-16 rounded-2xl" />
                  <div>
                    <p className="flex items-center gap-1.5 font-semibold">
                      {tr(lawyer.name)}
                      <BadgeCheck className="size-4 text-gold-500" />
                    </p>
                    <p className="text-sm text-gold-600">{tr(lawyer.role)}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-navy-800/60">
                      <Star className="size-3.5 fill-gold-400 text-gold-400" />
                      {lawyer.rating.toFixed(1)} · {lawyer.years} {t.lawyers.years}
                    </p>
                  </div>
                </div>
              </section>

              {/* Messages */}
              <section className="flex h-[520px] flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-white">
                <div className="flex items-center gap-2 border-b border-sand-200 px-5 py-4">
                  <MessageSquare className="size-5 text-gold-600" />
                  <h3 className="font-semibold">{t.dash.messages}</h3>
                </div>
                <div className="flex-1 space-y-4 overflow-y-auto bg-sand-50/60 p-5">
                  {conversation.map((m, i) => {
                    const mine = m.from === "me";
                    const who = mine ? t.dash.you : m.from === "lawyer" ? tr(lawyer.name) : t.dash.support;
                    return (
                      <div key={i} className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
                        <span className="mb-1 text-[11px] text-navy-800/50">
                          {who} · {time(m.at)}
                        </span>
                        <p
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                            mine ? "rounded-ee-sm bg-navy-900 text-white" : "rounded-es-sm border border-navy-900/10 bg-white"
                          }`}
                        >
                          {m.text}
                        </p>
                      </div>
                    );
                  })}
                  {typing && (
                    <p className="text-xs italic text-navy-800/50">
                      {tr(lawyer.name)} {t.dash.typing}
                    </p>
                  )}
                  <div ref={chatEnd} />
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                  className="flex gap-2 border-t border-sand-200 p-3"
                >
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder={t.dash.typeMsg}
                    className="min-w-0 flex-1 rounded-full border border-navy-900/15 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
                  />
                  <button type="submit" className="grid size-10 place-items-center rounded-full bg-gold-500 text-navy-950 hover:bg-gold-400" aria-label={t.dash.send}>
                    <Send className="size-4 rtl:-scale-x-100" />
                  </button>
                </form>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
