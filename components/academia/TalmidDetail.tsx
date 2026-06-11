"use client";

// ═══════════════════════════════════════════════════════════════════════════
// TalmidDetail — la vista interna del nivel TALMID: las 12 semanas.
// Hero → El Umbral → 12 módulos secuenciales → requisitos para abrir SHOEL.
//
// COMMIT 5: progreso REAL desde localStorage (useAcademyProgress). El estudiante
// inicia el nivel (arranca el reloj), marca semanas, y ve el avance persistir.
// El muro de tiempo se respeta: con todo marcado, SHOEL sigue bloqueado hasta
// cumplir 84 días reales. El "panel de simulación" permite probar diario/examen/
// proyecto mientras esas piezas no son interactivas de verdad.
// ═══════════════════════════════════════════════════════════════════════════
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getLevel, resolveText, type LocalizedText, type ModuleStatus } from "@/lib/academia/curriculum";
import {
  canAccessModule,
  getLevelProgress,
  requirementStatuses,
  progressForLevel,
} from "@/lib/academia/unlock";
import { useAcademyProgress } from "@/lib/academia/useAcademyProgress";
import ModuleCard from "./ModuleCard";

export default function TalmidDetail({ locale }: { locale: string }) {
  const loc = locale as Locale;
  const tr = (x: LocalizedText) => resolveText(loc, x);
  const t = (es: string, fa: string, en: string) => (loc === "fa" ? fa : loc === "en" ? en : es);

  const level = getLevel("talmid")!;
  const { progress, now, hydrated, actions } = useAcademyProgress();

  const lp = progressForLevel(progress, "talmid");
  const started = !!lp;
  const view = getLevelProgress("talmid", progress, now);
  const shoelReqs = requirementStatuses("shoel", progress, now);

  function moduleStatus(moduleId: string): ModuleStatus {
    if (lp?.completedModules.includes(moduleId)) return "completed";
    if (canAccessModule("talmid", moduleId, progress, now)) return "available";
    return "locked";
  }

  const journalCount = lp?.journalEntries.length ?? 0;
  const quizDone = (lp?.quizScores["talmid-final"] ?? 0) >= 80;
  const projectApproved = lp?.finalProjectStatus === "approved";

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <Link href="/academia" className="text-[12px] uppercase tracking-widest text-muted/60 transition-colors hover:text-gold">
        {loc === "fa" ? "→" : "←"} {t("El camino", "مسیر", "The path")}
      </Link>

      {/* ── Hero del nivel ── */}
      <header className="mt-6 text-center">
        <p className="hebrew text-4xl text-gold/80">{level.he}</p>
        <h1 className="mt-2 font-cinzel text-3xl font-bold tracking-wide text-parchment sm:text-4xl">{level.name}</h1>
        <p className="mt-2 text-[15px] text-muted/85">{tr(level.subtitle).value}</p>
        <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-parchment/80">{tr(level.description).value}</p>

        {hydrated && !started ? (
          <button
            type="button"
            onClick={() => actions.start("talmid")}
            className="mx-auto mt-6 inline-block rounded-full border border-gold/60 bg-gold/15 px-6 py-2.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/25"
          >
            {t("Comenzar TALMID", "آغاز تَلمید", "Begin TALMID")} {loc === "fa" ? "←" : "→"}
          </button>
        ) : (
          <div className="mx-auto mt-6 max-w-md">
            <div className="flex items-center justify-between text-[12px] text-muted/70">
              <span>{t("Avance", "پیشرفت", "Progress")}: {view.completed}/{view.totalRequired} {t("módulos", "واحد", "modules")}</span>
              <span>{view.pct}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full bg-gold/70 transition-all" style={{ width: `${view.pct}%` }} />
            </div>
            <p className="mt-2 text-[12px] text-muted/55">
              {t("Duración mínima", "حداقل مدت", "Min. duration")}: {level.durationWeeks} {t("semanas", "هفته", "weeks")} ·{" "}
              {t("Tiempo cumplido", "زمان طی‌شده", "Time elapsed")}: {view.daysElapsed} {t("días", "روز", "days")}
            </p>
          </div>
        )}
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
          {level.modules.map((m) => {
            const st = moduleStatus(m.id);
            return (
              <ModuleCard
                key={m.id}
                module={m}
                locale={locale}
                status={st}
                onToggle={hydrated && st !== "locked" ? () => actions.toggleModule("talmid", m.id) : undefined}
              />
            );
          })}
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
            const remaining = s.req.type === "time" && !s.met ? Math.max(0, s.required - s.current) : 0;
            return (
              <li key={s.req.id} className="flex items-start gap-2 text-[13px] leading-snug">
                <span className={`mt-0.5 shrink-0 ${s.met ? "text-emerald-400" : "text-muted/40"}`}>{s.met ? "✓" : "○"}</span>
                <span className={s.met ? "text-muted/60 line-through" : "text-parchment/80"}>
                  {d.value}
                  {remaining > 0 && <span className="text-gold/70"> — {t("faltan", "باقی‌مانده", "remaining")} {remaining} {t("días", "روز", "days")}</span>}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── Panel de simulación (mientras diario/examen/proyecto no son interactivos) ── */}
      {hydrated && started && (
        <section className="mt-6 rounded-2xl border border-dashed border-white/12 p-5">
          <p className="font-cinzel text-[11px] uppercase tracking-[0.2em] text-muted/55">
            {t("Simulación · solo para probar", "شبیه‌سازی · فقط برای آزمایش", "Simulation · for testing only")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <SimBtn onClick={() => actions.addJournal("talmid", journalCount + 1)} label={`${t("Diario", "دفتر", "Journal")}: +1 (${journalCount}/12)`} />
            <SimBtn onClick={() => actions.setQuiz("talmid", "talmid-final", 100)} label={quizDone ? `✓ ${t("Examen aprobado", "آزمون قبول", "Exam passed")}` : t("Aprobar examen final", "قبولی آزمون پایانی", "Pass final exam")} active={quizDone} />
            <SimBtn onClick={() => actions.setProject("talmid", "approved")} label={projectApproved ? `✓ ${t("Proyecto aprobado", "پروژه تأییدشده", "Project approved")}` : t("Aprobar proyecto", "تأیید پروژه", "Approve project")} active={projectApproved} />
            <SimBtn onClick={() => actions.reset()} label={t("Reiniciar mi progreso", "بازنشانی پیشرفت", "Reset my progress")} danger />
          </div>
          <p className="mt-3 text-[12px] leading-snug text-muted/45">
            {t(
              "Aunque marques todo aquí, SHOEL no se abre hasta cumplir las 12 semanas reales desde que empezaste. El tiempo no se puede saltar.",
              "حتی اگر همه را اینجا علامت بزنی، شوئل تا تکمیل ۱۲ هفتهٔ واقعی باز نمی‌شود. زمان را نمی‌توان پراند.",
              "Even if you mark everything here, SHOEL won't open until the real 12 weeks pass from when you started. Time cannot be skipped.",
            )}
          </p>
        </section>
      )}
    </div>
  );
}

function SimBtn({ onClick, label, active = false, danger = false }: { onClick: () => void; label: string; active?: boolean; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-wide transition-all ${
        danger
          ? "border-rose-400/30 text-rose-300/80 hover:border-rose-400/60"
          : active
            ? "border-emerald-400/40 text-emerald-300/90"
            : "border-white/15 text-muted/80 hover:border-white/30 hover:text-parchment"
      }`}
    >
      {label}
    </button>
  );
}
