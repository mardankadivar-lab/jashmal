"use client";

// ═══════════════════════════════════════════════════════════════════════════
// TalmidDetail — la vista interna del nivel TALMID: las 12 semanas.
// Hero del nivel → El Umbral (ingreso) → 12 módulos secuenciales → requisitos
// para completar TALMID y desbloquear SHOEL.
//
// COMMIT 4: progreso VACÍO (estudiante nuevo) → solo la Semana 1 disponible, el
// resto bloqueado en cascada. localStorage se conecta en COMMIT 5.
// ═══════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getLevel, resolveText, type LocalizedText, type ModuleStatus } from "@/lib/academia/curriculum";
import {
  emptyAcademyProgress,
  canAccessModule,
  getLevelProgress,
  requirementStatuses,
  progressForLevel,
  type AcademyProgress,
} from "@/lib/academia/unlock";
import ModuleCard from "./ModuleCard";

export default function TalmidDetail({ locale }: { locale: string }) {
  const loc = locale as Locale;
  const tr = (x: LocalizedText) => resolveText(loc, x);
  const t = (es: string, fa: string, en: string) => (loc === "fa" ? fa : loc === "en" ? en : es);

  const level = getLevel("talmid")!;
  const [progress] = useState<AcademyProgress>(() => emptyAcademyProgress());
  const [now] = useState(() => Date.now());

  const lp = progressForLevel(progress, "talmid");
  const view = getLevelProgress("talmid", progress, now);
  const shoelReqs = requirementStatuses("shoel", progress, now);

  function moduleStatus(moduleId: string, week: number): ModuleStatus {
    if (lp?.completedModules.includes(moduleId)) return "completed";
    if (canAccessModule("talmid", moduleId, progress, now)) return "available";
    return "locked";
  }

  const subtitle = tr(level.subtitle);

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <Link href="/academia" className="text-[12px] uppercase tracking-widest text-muted/60 transition-colors hover:text-gold">
        {loc === "fa" ? "→" : "←"} {t("El camino", "مسیر", "The path")}
      </Link>

      {/* ── Hero del nivel ── */}
      <header className="mt-6 text-center">
        <p className="hebrew text-4xl text-gold/80">{level.he}</p>
        <h1 className="mt-2 font-cinzel text-3xl font-bold tracking-wide text-parchment sm:text-4xl">{level.name}</h1>
        <p className="mt-2 text-[15px] text-muted/85">{subtitle.value}</p>
        <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-parchment/80">{tr(level.description).value}</p>

        <div className="mx-auto mt-6 max-w-md">
          <div className="flex items-center justify-between text-[12px] text-muted/70">
            <span>{t("Avance", "پیشرفت", "Progress")}: {view.completed}/{view.totalRequired} {t("módulos", "واحد", "modules")}</span>
            <span>{view.pct}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full rounded-full bg-gold/70" style={{ width: `${view.pct}%` }} />
          </div>
          <p className="mt-2 text-[12px] text-muted/55">
            {t("Duración mínima", "حداقل مدت", "Minimum duration")}: {level.durationWeeks} {t("semanas", "هفته", "weeks")} ·{" "}
            {t("Tiempo cumplido", "زمان طی‌شده", "Time elapsed")}: {view.daysElapsed} {t("días", "روز", "days")}
          </p>
        </div>
      </header>

      {/* ── El Umbral: el ingreso ── */}
      <Link
        href="/academia/umbral"
        className="mt-10 block rounded-2xl border border-gold/40 bg-gold/[0.06] p-5 transition-all hover:border-gold/70 hover:bg-gold/10"
      >
        <p className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/70">{t("Empieza aquí", "از اینجا آغاز کن", "Start here")}</p>
        <p className="mt-1 font-cinzel text-lg text-parchment">
          {t("El Umbral", "آستانه", "The Threshold")} <span className="hebrew text-gold/70">הַסַּף</span>
        </p>
        <p className="mt-1 text-[13px] text-muted/80">
          {t("La bienvenida para quien nunca ha estudiado: una primera lección que no exige nada previo.", "خوش‌آمد برای کسی که هرگز مطالعه نکرده: نخستین درسی که هیچ پیش‌نیازی نمی‌خواهد.", "The welcome for those who have never studied: a first lesson that asks for nothing beforehand.")}
        </p>
      </Link>

      {/* ── Las 12 semanas ── */}
      <section className="mt-8">
        <h2 className="mb-3 font-cinzel text-sm uppercase tracking-[0.2em] text-muted/60">
          {t("Las 12 semanas", "دوازده هفته", "The 12 weeks")}
        </h2>
        <div className="space-y-2.5">
          {level.modules.map((m) => (
            <ModuleCard key={m.id} module={m} locale={locale} status={moduleStatus(m.id, m.week)} />
          ))}
        </div>
      </section>

      {/* ── Requisitos para completar TALMID → desbloquear SHOEL ── */}
      <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <h2 className="font-cinzel text-sm uppercase tracking-[0.2em] text-muted/70">
          {t("Para completar TALMID y abrir SHOEL", "برای تکمیل تَلمید و گشودن شوئل", "To complete TALMID and open SHOEL")}
        </h2>
        <ul className="mt-3 space-y-2">
          {shoelReqs.map((s) => {
            const d = tr(s.req.description);
            return (
              <li key={s.req.id} className="flex items-start gap-2 text-[13px] leading-snug">
                <span className={`mt-0.5 shrink-0 ${s.met ? "text-emerald-400" : "text-muted/40"}`}>{s.met ? "✓" : "○"}</span>
                <span className={s.met ? "text-muted/60 line-through" : "text-parchment/80"}>{d.value}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
