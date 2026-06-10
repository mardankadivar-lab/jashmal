"use client";

import { useLocale, useTranslations } from "next-intl";
import { LANG_LABEL } from "@/lib/i18nContent";
import type { Locale } from "@/i18n/routing";

// Aviso limpio "disponible en …" — política "honesto y crece". Aparece cuando el
// contenido aún no existe en el idioma activo (típicamente inglés): le dice al
// usuario, EN SU IDIOMA, en qué idiomas sí puede leerlo. No es mezcla: es honestidad.
export default function TranslationBadge({
  available,
  className = "",
}: {
  available: Locale[];
  className?: string;
}) {
  const t = useTranslations("misterios");
  const locale = useLocale() as Locale;
  // Solo mostramos los idiomas que SÍ existen y que NO son el activo.
  const langs = available.filter((l) => l !== locale);
  if (langs.length === 0) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-gold/25 bg-gold/[0.06] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gold/70 ${className}`}
      title={t("availableInFull")}
    >
      {t("availableIn")} {langs.map((l) => LANG_LABEL[l]).join(" · ")}
    </span>
  );
}
