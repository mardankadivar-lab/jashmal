"use client";

import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import MisterioLangToggle from "./MisterioLangToggle";

// ─────────────────────────────────────────────────────────────────────────
//  AVISO HONESTO DE TRADUCCIÓN — páginas de misterio (política "honesto y crece")
// ─────────────────────────────────────────────────────────────────────────
//  Los estudios de misterio están escritos en español y farsi (es/fa). Cuando el
//  idioma activo es inglés, NO existe versión: en vez de mostrar español disfrazado
//  de inglés (mezcla silenciosa), avisamos claramente y ofrecemos los idiomas que
//  SÍ existen. Se monta una sola vez en app/[locale]/misterio/layout.tsx para
//  cubrir las 19 páginas sin tocarlas una por una.
// ─────────────────────────────────────────────────────────────────────────
const SUPPORTED: Locale[] = ["es", "fa"];

export default function MisterioTranslationNotice() {
  const locale = useLocale() as Locale;
  const t = useTranslations("misterios");

  if (SUPPORTED.includes(locale)) return null;

  return (
    <div
      dir="ltr"
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-b border-gold/20 bg-gold/[0.06] px-4 py-2 text-center text-xs text-gold/85"
    >
      <span>{t("notAvailable")}</span>
      <MisterioLangToggle />
    </div>
  );
}
