"use client";

// ═══════════════════════════════════════════════════════════════════════════
// LevelCard — una tarjeta de la escalera de la Academia.
//   · available  → abierta, con acceso (TALMID al inicio).
//   · locked     → apagada, con candado, requisitos visibles, sin botón "Entrar".
//   · completed  → con sello.
// Solo presentación: recibe estado/progreso ya calculados por la lógica pura.
// ═══════════════════════════════════════════════════════════════════════════
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { resolveText, type AcademyLevel, type LocalizedText } from "@/lib/academia/curriculum";
import type { LevelProgressView, ReqStatus } from "@/lib/academia/unlock";
import TranslationBadge from "@/components/TranslationBadge";

function Lock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" className={className} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function LevelCard({
  level,
  locale,
  progress,
  reqStatuses,
  prevName,
}: {
  level: AcademyLevel;
  locale: string;
  progress: LevelProgressView;
  reqStatuses: ReqStatus[];
  prevName?: string;
}) {
  const [showReqs, setShowReqs] = useState(false);
  const loc = locale as Locale;
  const tr = (t: LocalizedText) => resolveText(loc, t);

  const status = progress.status;
  const locked = status === "locked";
  const completed = status === "completed";

  const subtitle = tr(level.subtitle);
  const description = tr(level.description);
  const gloss = level.glossNote ? tr(level.glossNote) : null;

  const t = (es: string, fa: string, en: string) =>
    loc === "fa" ? fa : loc === "en" ? en : es;

  const months = Math.round(level.durationWeeks / 4);

  return (
    <div
      className={`rounded-2xl border p-5 transition-all sm:p-6 ${
        locked
          ? "border-white/10 bg-white/[0.02] opacity-60"
          : completed
            ? "border-emerald-400/30 bg-emerald-400/[0.04]"
            : "border-gold/35 bg-gold/[0.04]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-muted/60">
            {t("Nivel", "سطح", "Level")} {level.rank}
          </p>
          <h3
            className={`mt-1 font-cinzel text-xl font-bold tracking-wide sm:text-2xl ${
              locked ? "text-parchment/70" : "text-parchment"
            }`}
          >
            {level.name}
          </h3>
          <p className="mt-0.5 text-sm text-muted/85">
            {subtitle.value}
            {subtitle.missing && <TranslationBadge available={subtitle.available} className="ms-2 align-middle" />}
          </p>
        </div>
        <div className="shrink-0 text-end">
          <p className="hebrew text-2xl text-gold/80 sm:text-3xl">{level.he}</p>
          <p className="mt-0.5 text-[11px] italic text-muted/55">{level.translit}</p>
          <span
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
              locked
                ? "border border-white/10 text-muted/70"
                : completed
                  ? "border border-emerald-400/40 text-emerald-300/90"
                  : "border border-gold/50 text-gold"
            }`}
          >
            {locked && <Lock />}
            {locked
              ? t("Bloqueado", "قفل‌شده", "Locked")
              : completed
                ? t("Completado", "تکمیل‌شده", "Completed")
                : t("Abierto", "باز", "Open")}
          </span>
        </div>
      </div>

      <p className={`mt-4 text-[15px] leading-relaxed ${locked ? "text-muted/70" : "text-parchment/85"}`}>
        {description.value}
        {description.missing && <TranslationBadge available={description.available} className="ms-2 align-middle" />}
      </p>

      {gloss && (
        <p className="mt-2 border-s-2 border-gold/25 ps-3 text-[13px] italic leading-snug text-muted/65">
          {gloss.value}
        </p>
      )}

      <p className="mt-3 text-[12px] uppercase tracking-wide text-muted/55">
        {t("Duración mínima", "حداقل مدت", "Minimum duration")}: {level.durationWeeks}{" "}
        {t("semanas", "هفته", "weeks")} · {months} {t("meses", "ماه", "months")}
      </p>

      {/* ── ABIERTO: barra de progreso + entrar ── */}
      {!locked && !completed && (
        <div className="mt-5">
          <div className="flex items-center justify-between text-[12px] text-muted/70">
            <span>
              {t("Semana", "هفته", "Week")} {Math.min(progress.completed + 1, level.durationWeeks)} {t("de", "از", "of")} {level.durationWeeks}
            </span>
            <span>{progress.pct}%</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div className="h-full rounded-full bg-gold/70" style={{ width: `${progress.pct}%` }} />
          </div>
          <Link
            href={`/academia/${level.slug}`}
            className="mt-4 inline-block rounded-full border border-gold/60 bg-gold/15 px-5 py-2 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/25"
          >
            {progress.started
              ? t("Continuar", "ادامه", "Continue")
              : t(`Comenzar ${level.name}`, `آغاز ${level.name}`, `Begin ${level.name}`)}{" "}
            {loc === "fa" ? "←" : "→"}
          </Link>
        </div>
      )}

      {/* ── BLOQUEADO: requisitos visibles, sin "Entrar" ── */}
      {locked && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowReqs((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-1.5 text-[11px] uppercase tracking-widest text-muted/80 transition-colors hover:border-white/25 hover:text-parchment"
          >
            <Lock />
            {showReqs
              ? t("Ocultar requisitos", "پنهان‌کردن شرایط", "Hide requirements")
              : prevName
                ? t(`Completa ${prevName} para desbloquear`, `برای باز شدن ${prevName} را کامل کن`, `Complete ${prevName} to unlock`)
                : t("Ver requisitos", "مشاهدهٔ شرایط", "View requirements")}
          </button>

          {showReqs && reqStatuses.length > 0 && (
            <ul className="mt-3 space-y-2">
              {reqStatuses.map((s) => {
                const d = tr(s.req.description);
                const remaining = s.req.type === "time" && !s.met ? Math.max(0, s.required - s.current) : 0;
                return (
                  <li key={s.req.id} className="flex items-start gap-2 text-[13px] leading-snug">
                    <span className={`mt-0.5 shrink-0 ${s.met ? "text-emerald-400" : "text-muted/40"}`}>
                      {s.met ? "✓" : "○"}
                    </span>
                    <span className={s.met ? "text-muted/60 line-through" : "text-parchment/80"}>
                      {d.value}
                      {remaining > 0 && (
                        <span className="text-gold/70">
                          {" "}
                          — {t("faltan", "باقی‌مانده", "remaining")} {remaining} {t("días", "روز", "days")}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
