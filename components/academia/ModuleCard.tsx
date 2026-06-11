"use client";

// ═══════════════════════════════════════════════════════════════════════════
// ModuleCard — una semana/módulo de un nivel.
//   · available  → desplegable (objetivo, conceptos, lecturas, práctica) + enlace
//                  a la lección guiada rica si existe (lessonSlug).
//   · locked     → apagado, candado, "completa la semana anterior".
//   · completed  → con sello.
// Avance SECUENCIAL: el estado lo decide la lógica pura (canAccessModule).
// ═══════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { resolveText, type AcademyModule, type LocalizedText } from "@/lib/academia/curriculum";
import type { ModuleStatus } from "@/lib/academia/curriculum";

export default function ModuleCard({
  module,
  locale,
  status,
  onToggle,
}: {
  module: AcademyModule;
  locale: string;
  status: ModuleStatus;
  onToggle?: () => void;
}) {
  const loc = locale as Locale;
  const tr = (x: LocalizedText) => resolveText(loc, x);
  const t = (es: string, fa: string, en: string) => (loc === "fa" ? fa : loc === "en" ? en : es);

  const locked = status === "locked";
  const completed = status === "completed";
  const [open, setOpen] = useState(false);

  const title = tr(module.title);
  const description = tr(module.description);

  return (
    <div
      className={`rounded-xl border transition-all ${
        locked
          ? "border-white/8 bg-white/[0.015] opacity-55"
          : completed
            ? "border-emerald-400/25 bg-emerald-400/[0.03]"
            : "border-gold/25 bg-gold/[0.03]"
      }`}
    >
      <button
        type="button"
        disabled={locked}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center gap-3 px-4 py-3 text-start ${locked ? "cursor-not-allowed" : ""}`}
      >
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-medium ${
            locked
              ? "bg-white/5 text-muted/50"
              : completed
                ? "bg-emerald-400/15 text-emerald-300"
                : "bg-gold/15 text-gold"
          }`}
        >
          {completed ? "✓" : module.week}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] uppercase tracking-wide text-muted/55">
            {t("Semana", "هفته", "Week")} {module.week}
          </span>
          <span className={`block truncate text-[15px] ${locked ? "text-parchment/60" : "text-parchment"}`}>
            {title.value}
          </span>
        </span>
        {locked ? (
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" className="shrink-0 text-muted/50" aria-hidden="true">
            <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        ) : (
          <span className={`shrink-0 text-muted/50 transition-transform ${open ? "rotate-90" : ""}`}>›</span>
        )}
      </button>

      {locked && (
        <p className="px-4 pb-3 ps-14 text-[12px] text-muted/50">
          {t("Completa la semana anterior para abrir esta.", "برای باز شدن، هفتهٔ پیش را کامل کن.", "Complete the previous week to open this one.")}
        </p>
      )}

      {open && !locked && (
        <div className="space-y-4 border-t border-white/8 px-4 py-4 ps-14">
          <p className="text-[14px] leading-relaxed text-parchment/85">{description.value}</p>

          {module.learningObjectives.length > 0 && (
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wide text-muted/55">{t("Objetivos", "اهداف", "Objectives")}</p>
              <ul className="space-y-1">
                {module.learningObjectives.map((o, i) => {
                  const r = tr(o);
                  return (
                    <li key={i} className="flex gap-2 text-[13px] text-parchment/75">
                      <span className="text-gold/60">·</span>
                      {r.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {module.keyConcepts.length > 0 && (
            <div>
              <p className="mb-1.5 text-[11px] uppercase tracking-wide text-muted/55">{t("Conceptos clave", "مفاهیم کلیدی", "Key concepts")}</p>
              <div className="flex flex-wrap gap-1.5">
                {module.keyConcepts.map((c) => (
                  <span key={c} className="rounded-full border border-gold/20 bg-gold/[0.05] px-2.5 py-0.5 text-[12px] text-gold/85">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {module.readings.length > 0 && (
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wide text-muted/55">{t("Lectura", "خواندن", "Reading")}</p>
              <ul className="space-y-1">
                {module.readings.map((rd) => {
                  const lbl = tr(rd.label);
                  return (
                    <li key={rd.id} className="text-[13px] text-parchment/75">
                      <span className="text-gold/70">{rd.ref}</span> — {lbl.value}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {module.practices.length > 0 && (
            <div>
              <p className="mb-1 text-[11px] uppercase tracking-wide text-muted/55">{t("Práctica", "تمرین", "Practice")}</p>
              {module.practices.map((pr) => {
                const r = tr(pr.prompt);
                return (
                  <p key={pr.id} className="text-[13px] italic text-parchment/70">
                    {r.value}
                  </p>
                );
              })}
            </div>
          )}

          {module.quiz && (
            <p className="text-[12px] uppercase tracking-wide text-gold/60">
              {t("Incluye evaluación", "شامل ارزیابی", "Includes evaluation")} · {t("nota mínima", "حداقل نمره", "min. score")} {module.quiz.passingScore}%
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {module.lessonSlug && (
              <Link
                href={`/academia/modulo-1/${module.lessonSlug}`}
                className="inline-block rounded-full border border-gold/55 bg-gold/15 px-4 py-1.5 font-cinzel text-[11px] uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/25"
              >
                {t("Abrir lección guiada", "گشودن درس راهنما", "Open guided lesson")} {loc === "fa" ? "←" : "→"}
              </Link>
            )}
            {onToggle && (
              <button
                type="button"
                onClick={onToggle}
                className={`rounded-full border px-4 py-1.5 text-[11px] uppercase tracking-widest transition-all ${
                  completed
                    ? "border-emerald-400/40 text-emerald-300/90 hover:border-emerald-400/70"
                    : "border-white/15 text-muted/80 hover:border-white/30 hover:text-parchment"
                }`}
              >
                {completed ? `✓ ${t("Completada", "تکمیل‌شده", "Completed")}` : t("Marcar completada", "علامت‌گذاری", "Mark complete")}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
