"use client";

// ═══════════════════════════════════════════════════════════════════════════
// LangNotice — aviso HONESTO de idioma (política "honesto y crece", sin mezcla
// silenciosa). El plan de estudios de la Academia se escribió en español; el
// inglés y el farsi llegan por fases. Mientras tanto, cuando el idioma activo
// NO es español, este aviso le dice al estudiante —EN SU IDIOMA— que el
// contenido que verá abajo está en español todavía. No es mezcla: es honestidad.
// ═══════════════════════════════════════════════════════════════════════════
import type { Locale } from "@/i18n/routing";

export default function LangNotice({ locale }: { locale: string }) {
  const loc = locale as Locale;
  if (loc === "es") return null;

  const label = loc === "fa" ? "در حال ترجمه" : "Being translated";
  const text =
    loc === "fa"
      ? "این برنامهٔ آموزشی نخست به اسپانیایی نوشته شده؛ ترجمهٔ فارسی به‌تدریج می‌رسد. متن زیر فعلاً به اسپانیایی است."
      : "This curriculum was written first in Spanish; the English translation is arriving in phases. The content below is in Spanish for now.";

  return (
    <div className="mt-6 flex items-start gap-2 rounded-xl border border-gold/25 bg-gold/[0.05] px-4 py-3">
      <span className="mt-0.5 shrink-0 rounded-full border border-gold/40 bg-gold/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold/80">
        {label}
      </span>
      <p className="text-[13px] leading-snug text-muted/80">{text}</p>
    </div>
  );
}
