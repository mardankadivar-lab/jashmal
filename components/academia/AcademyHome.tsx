"use client";

// ═══════════════════════════════════════════════════════════════════════════
// AcademyHome — la cara de /academia: el CAMINO de formación de 6 niveles.
// Hero → estado del estudiante (demo) → escalera (TALMID abierto, resto
// bloqueado) → nota que separa Academia (formación) de Comunidad (aportes).
//
// COMMIT 3: usa progreso VACÍO (estudiante nuevo) — la escalera correcta para
// quien llega por primera vez. El progreso real desde localStorage se conecta
// en el COMMIT 5; por eso el estado vive en useState, listo para alimentarse.
// ═══════════════════════════════════════════════════════════════════════════
import type { Locale } from "@/i18n/routing";
import { ACADEMY_LEVELS, prevLevel } from "@/lib/academia/curriculum";
import { getLevelProgress, requirementStatuses } from "@/lib/academia/unlock";
import { useAcademyProgress } from "@/lib/academia/useAcademyProgress";
import LevelCard from "./LevelCard";

export default function AcademyHome({ locale }: { locale: string }) {
  const loc = locale as Locale;
  const t = (es: string, fa: string, en: string) => (loc === "fa" ? fa : loc === "en" ? en : es);

  // Progreso real del estudiante (localStorage; vacío hasta hidratar).
  const { progress, now } = useAcademyProgress();

  const talmid = getLevelProgress("talmid", progress, now);

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
      {/* ── Hero ── */}
      <header className="text-center">
        <p className="hebrew text-3xl text-gold/70">בֵּית מִדְרָשׁ</p>
        <h1 className="mt-3 font-cinzel text-3xl font-bold tracking-wide text-parchment sm:text-4xl">
          {t("Academia Jashmal", "آکادمی خَشمَل", "Jashmal Academy")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted/85">
          {t(
            "Un camino de estudio desde los fundamentos absolutos hasta la lectura profunda. No es contenido rápido: es una formación gradual, con tiempo, módulos, evaluaciones y un proyecto en cada nivel.",
            "راهی برای مطالعه از مبانی مطلق تا خوانش ژرف. این محتوای سریع نیست: آموزشی تدریجی است، با زمان، واحدها، ارزیابی‌ها و یک پروژه در هر سطح.",
            "A path of study from the absolute fundamentals to deep reading. This is not quick content: it is gradual formation, with time, modules, evaluations and a project at each level.",
          )}
        </p>
      </header>

      {/* ── Estado del estudiante (demo) ── */}
      <section className="mt-10 rounded-2xl border border-gold/25 bg-gold/[0.03] p-5">
        <p className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-muted/60">
          {t("Tu camino", "مسیر تو", "Your path")}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Stat label={t("Nivel actual", "سطح کنونی", "Current level")} value="TALMID" />
          <Stat label={t("Semana", "هفته", "Week")} value={`${Math.min(talmid.completed + 1, 12)} / 12`} />
          <Stat label={t("Progreso", "پیشرفت", "Progress")} value={`${talmid.pct}%`} />
          <Stat
            label={t("Tiempo mínimo", "حداقل زمان", "Min. time")}
            value={`${Math.ceil(talmid.daysRemaining / 7)} ${t("sem.", "هفته", "wks")}`}
          />
        </div>
      </section>

      {/* ── La escalera ── */}
      <section className="mt-10 space-y-4">
        {ACADEMY_LEVELS.map((level) => {
          const prev = prevLevel(level);
          return (
            <LevelCard
              key={level.id}
              level={level}
              locale={locale}
              progress={getLevelProgress(level.id, progress, now)}
              reqStatuses={requirementStatuses(level.id, progress, now)}
              prevName={prev?.name}
            />
          );
        })}
      </section>

      {/* ── Nota: Academia ≠ Comunidad ── */}
      <p className="mx-auto mt-10 max-w-xl text-center text-[12px] leading-relaxed text-muted/50">
        {t(
          "Los niveles académicos miden formación. Los rangos comunitarios miden participación y aportes. Son dos caminos distintos.",
          "سطوح آکادمیک، آموزش را می‌سنجند. رتبه‌های اجتماعی، مشارکت و سهم را. این‌ها دو مسیر جدا هستند.",
          "Academic levels measure formation. Community ranks measure participation and contributions. They are two separate paths.",
        )}
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-muted/55">{label}</p>
      <p className="mt-0.5 font-cinzel text-lg text-parchment">{value}</p>
    </div>
  );
}
