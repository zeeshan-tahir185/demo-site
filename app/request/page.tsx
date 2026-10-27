"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, FileText, Loader2, Lock, Mail, UploadCloud, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { LangToggle } from "@/components/LangToggle";
import { Avatar } from "@/components/Avatar";
import { ServiceIcon } from "@/components/ServiceIcon";
import { lawyerFor, lawyers, services } from "@/lib/data";
import { formatMoney, useLang } from "@/lib/i18n";
import { formatSize, saveRequest, type DemoFile, type DemoRequest } from "@/lib/store";

type Form = {
  serviceId: string;
  title: string;
  description: string;
  urgency: DemoRequest["urgency"];
  city: string;
  lawyerId: string;
  files: DemoFile[];
  name: string;
  email: string;
  phone: string;
  agree: boolean;
};

const empty: Form = {
  serviceId: "",
  title: "",
  description: "",
  urgency: "normal",
  city: "",
  lawyerId: "",
  files: [],
  name: "",
  email: "",
  phone: "",
  agree: false,
};

export default function RequestPage() {
  const { t, tr, locale } = useLang();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<DemoRequest | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const lawyer = params.get("lawyer");
    setForm((f) => ({
      ...f,
      serviceId: services.some((s) => s.id === service) ? service! : f.serviceId,
      lawyerId: lawyers.some((l) => l.id === lawyer) ? lawyer! : f.lawyerId,
    }));
  }, []);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !form.serviceId) e.serviceId = t.form.pickService;
    if (step === 1) {
      if (!form.title.trim()) e.title = t.form.required;
      if (!form.description.trim()) e.description = t.form.required;
    }
    if (step === 3) {
      if (!form.name.trim()) e.name = t.form.required;
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = t.form.invalidEmail;
      if (!form.phone.trim()) e.phone = t.form.required;
      if (!form.agree) e.agree = t.form.required;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSubmitting(true);
    const request: DemoRequest = {
      id: `WQ-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: form.serviceId,
      title: form.title,
      description: form.description,
      urgency: form.urgency,
      city: form.city,
      lawyerId: lawyerFor(form.serviceId, form.lawyerId).id,
      files: form.files,
      name: form.name,
      email: form.email,
      phone: form.phone,
      createdAt: new Date().toISOString(),
    };
    setTimeout(() => {
      saveRequest(request);
      setSubmitting(false);
      setDone(request);
    }, 1400);
  };

  const service = services.find((s) => s.id === form.serviceId);

  return (
    <div className="min-h-screen bg-sand-50">
      <header className="border-b border-navy-900/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Logo />
          <LangToggle />
        </div>
      </header>

      {done ? (
        <Success request={done} onDashboard={() => router.push("/dashboard")} />
      ) : (
        <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="font-display text-3xl font-semibold sm:text-4xl">{t.form.title}</h1>
            <p className="mt-2 text-navy-800/65">{t.form.sub}</p>

            {/* Stepper */}
            <ol className="mt-8 flex items-center gap-2">
              {t.form.steps.map((label, i) => (
                <li key={label} className="flex flex-1 items-center gap-2">
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-semibold transition ${
                      i < step ? "bg-gold-500 text-navy-950" : i === step ? "bg-navy-900 text-white" : "bg-sand-200 text-navy-800/50"
                    }`}
                  >
                    {i < step ? <Check className="size-4" /> : i + 1}
                  </span>
                  <span className={`hidden text-sm font-medium sm:block ${i <= step ? "text-navy-900" : "text-navy-800/50"}`}>{label}</span>
                  {i < 3 && <span className={`h-px flex-1 ${i < step ? "bg-gold-500" : "bg-sand-200"}`} />}
                </li>
              ))}
            </ol>

            <div key={step} className="animate-fade-up mt-8 rounded-2xl border border-navy-900/10 bg-white p-6 sm:p-8">
              {step === 0 && (
                <>
                  <h2 className="text-xl font-semibold">{t.form.chooseService}</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {services.map((s) => {
                      const active = form.serviceId === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => set("serviceId", s.id)}
                          className={`flex items-start gap-3 rounded-xl border-2 p-4 text-start transition ${
                            active ? "border-gold-500 bg-gold-500/5" : "border-navy-900/10 hover:border-navy-900/25"
                          }`}
                        >
                          <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${active ? "bg-gold-500 text-navy-950" : "bg-navy-900 text-gold-400"}`}>
                            <ServiceIcon name={s.icon} className="size-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-semibold">{tr(s.title)}</span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-navy-800/60">{tr(s.desc)}</span>
                          </span>
                          {active && <CheckCircle2 className="size-5 shrink-0 text-gold-500" />}
                        </button>
                      );
                    })}
                  </div>
                  <ErrorText msg={errors.serviceId} />
                </>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <Field label={t.form.reqTitle} error={errors.title}>
                    <input className={inputCls(errors.title)} value={form.title} placeholder={t.form.reqTitlePh} onChange={(e) => set("title", e.target.value)} />
                  </Field>
                  <Field label={t.form.desc} error={errors.description}>
                    <textarea
                      rows={5}
                      className={inputCls(errors.description)}
                      value={form.description}
                      placeholder={t.form.descPh}
                      onChange={(e) => set("description", e.target.value)}
                    />
                  </Field>
                  <div>
                    <span className="mb-2 block text-sm font-semibold">{t.form.urgency}</span>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {(["low", "normal", "high"] as const).map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => set("urgency", u)}
                          className={`rounded-xl border-2 px-4 py-3 text-sm font-medium transition ${
                            form.urgency === u ? "border-gold-500 bg-gold-500/5" : "border-navy-900/10 hover:border-navy-900/25"
                          }`}
                        >
                          {t.form.urg[u]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.form.city}>
                      <input className={inputCls()} value={form.city} placeholder={t.form.cityPh} onChange={(e) => set("city", e.target.value)} />
                    </Field>
                    <Field label={t.form.lawyerPref}>
                      <select className={inputCls()} value={form.lawyerId} onChange={(e) => set("lawyerId", e.target.value)}>
                        <option value="">{t.form.anyLawyer}</option>
                        {lawyers.map((l) => (
                          <option key={l.id} value={l.id}>
                            {tr(l.name)} — {tr(l.role)}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </div>
              )}

              {step === 2 && <Uploader files={form.files} onChange={(files) => set("files", files)} />}

              {step === 3 && (
                <div className="space-y-5">
                  <Field label={t.form.name} error={errors.name}>
                    <input className={inputCls(errors.name)} value={form.name} onChange={(e) => set("name", e.target.value)} />
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t.form.email} error={errors.email}>
                      <input type="email" dir="ltr" className={inputCls(errors.email)} value={form.email} onChange={(e) => set("email", e.target.value)} />
                    </Field>
                    <Field label={t.form.phone} error={errors.phone}>
                      <input type="tel" dir="ltr" className={inputCls(errors.phone)} value={form.phone} placeholder="+966" onChange={(e) => set("phone", e.target.value)} />
                    </Field>
                  </div>
                  <div className="flex gap-3 rounded-xl bg-navy-900/[0.04] p-4 text-sm text-navy-800/80">
                    <Mail className="mt-0.5 size-5 shrink-0 text-gold-600" />
                    {t.form.accountNote}
                  </div>
                  <label className="flex cursor-pointer items-center gap-3 text-sm">
                    <input type="checkbox" checked={form.agree} onChange={(e) => set("agree", e.target.checked)} className="size-4 accent-gold-600" />
                    {t.form.agree}
                  </label>
                  <ErrorText msg={errors.agree} />
                </div>
              )}

              <div className="mt-8 flex items-center justify-between border-t border-sand-200 pt-6">
                {step > 0 ? (
                  <button type="button" onClick={() => setStep(step - 1)} className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800/70 hover:text-navy-900">
                    <ArrowLeft className="size-4 rtl:rotate-180" />
                    {t.form.back}
                  </button>
                ) : (
                  <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800/70 hover:text-navy-900">
                    <ArrowLeft className="size-4 rtl:rotate-180" />
                    {t.form.home}
                  </Link>
                )}
                <button
                  type="button"
                  onClick={next}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:opacity-70"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {t.form.submitting}
                    </>
                  ) : (
                    <>
                      {step === 3 ? t.form.submit : t.form.next}
                      <ArrowRight className="size-4 rtl:rotate-180" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="h-fit space-y-4 lg:sticky lg:top-6">
            <div className="rounded-2xl border border-navy-900/10 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">{t.form.summary}</p>
              {service ? (
                <div className="mt-4 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-navy-900 text-gold-400">
                    <ServiceIcon name={service.icon} className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">{tr(service.title)}</p>
                    <p className="text-sm text-navy-800/60">
                      {t.services.from} {formatMoney(service.fee, locale)}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-navy-800/50">—</p>
              )}
              {form.title && <p className="mt-4 border-t border-sand-200 pt-4 text-sm font-medium">{form.title}</p>}
              {form.serviceId && (
                <div className="mt-4 flex items-center gap-3 border-t border-sand-200 pt-4">
                  {(() => {
                    const l = lawyerFor(form.serviceId, form.lawyerId);
                    return (
                      <>
                        <Avatar src={l.photo} name={tr(l.name)} className="size-10 rounded-full" />
                        <div>
                          <p className="text-xs text-navy-800/60">{t.dash.lawyer}</p>
                          <p className="text-sm font-semibold">{tr(l.name)}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
              {form.files.length > 0 && (
                <p className="mt-4 flex items-center gap-2 border-t border-sand-200 pt-4 text-sm text-navy-800/70">
                  <FileText className="size-4" />
                  {form.files.length} × {t.dash.docs}
                </p>
              )}
            </div>
            <div className="flex gap-3 rounded-2xl bg-navy-900 p-5 text-sm text-white/75">
              <Lock className="mt-0.5 size-5 shrink-0 text-gold-400" />
              {t.form.secure}
            </div>
          </aside>
        </main>
      )}
    </div>
  );
}

function Uploader({ files, onChange }: { files: DemoFile[]; onChange: (f: DemoFile[]) => void }) {
  const { t } = useLang();
  const input = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const add = (list: FileList | null) => {
    if (!list) return;
    onChange([...files, ...Array.from(list).map((f) => ({ name: f.name, size: f.size }))]);
  };

  return (
    <>
      <h2 className="text-xl font-semibold">{t.form.docsTitle}</h2>
      <p className="mt-1 text-sm text-navy-800/60">{t.form.docsSub}</p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          add(e.dataTransfer.files);
        }}
        onClick={() => input.current?.click()}
        className={`mt-6 cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
          drag ? "border-gold-500 bg-gold-500/5" : "border-navy-900/15 hover:border-gold-400 hover:bg-sand-50"
        }`}
      >
        <UploadCloud className="mx-auto size-10 text-gold-500" />
        <p className="mt-3 text-sm text-navy-800/70">
          {t.form.drop} <span className="font-semibold text-gold-600 underline">{t.form.browse}</span>
        </p>
        <input ref={input} type="file" multiple hidden onChange={(e) => add(e.target.files)} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
      </div>
      {files.length === 0 ? (
        <p className="mt-4 text-sm text-navy-800/50">{t.form.noDocs}</p>
      ) : (
        <ul className="mt-5 space-y-2">
          {files.map((f, i) => (
            <li key={`${f.name}-${i}`} className="flex items-center gap-3 rounded-xl border border-navy-900/10 px-4 py-3">
              <FileText className="size-5 text-gold-600" />
              <span className="min-w-0 flex-1 truncate text-sm font-medium" dir="ltr">
                {f.name}
              </span>
              <span className="text-xs text-navy-800/50">{formatSize(f.size)}</span>
              <button type="button" onClick={() => onChange(files.filter((_, j) => j !== i))} className="text-navy-800/40 hover:text-red-600">
                <X className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function Success({ request, onDashboard }: { request: DemoRequest; onDashboard: () => void }) {
  const { t } = useLang();
  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center sm:px-6">
      <div className="animate-fade-up rounded-3xl border border-navy-900/10 bg-white p-8 shadow-xl shadow-navy-900/5 sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="size-9" />
        </span>
        <h1 className="font-display mt-6 text-3xl font-semibold">{t.form.successTitle}</h1>
        <p className="mt-3 text-navy-800/65">{t.form.successSub}</p>
        <dl className="mt-8 grid grid-cols-2 gap-3 text-start">
          <div className="rounded-xl bg-sand-50 p-4">
            <dt className="text-xs text-navy-800/60">{t.form.reqNo}</dt>
            <dd className="mt-1 font-semibold" dir="ltr">
              {request.id}
            </dd>
          </div>
          <div className="rounded-xl bg-sand-50 p-4">
            <dt className="text-xs text-navy-800/60">{t.form.account}</dt>
            <dd className="mt-1 truncate font-semibold" dir="ltr">
              {request.email}
            </dd>
          </div>
        </dl>
        <button
          onClick={onDashboard}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3.5 font-semibold text-navy-950 transition hover:bg-gold-400"
        >
          {t.form.goDash}
          <ArrowRight className="size-4 rtl:rotate-180" />
        </button>
        <Link href="/" className="mt-4 inline-block text-sm font-medium text-navy-800/60 hover:text-navy-900">
          {t.form.home}
        </Link>
      </div>
    </main>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      {children}
      <ErrorText msg={error} />
    </label>
  );
}

function ErrorText({ msg }: { msg?: string }) {
  return msg ? <span className="mt-1.5 block text-xs font-medium text-red-600">{msg}</span> : null;
}

function inputCls(error?: string) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none transition placeholder:text-navy-800/35 focus:border-gold-500 focus:ring-4 focus:ring-gold-500/15 ${
    error ? "border-red-400" : "border-navy-900/15"
  }`;
}
