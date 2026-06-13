"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

// ─────────────────────────────────────────────────────────────────────────
//  SELLO DEL SOFER — "Verificado por el Sofer"
// ─────────────────────────────────────────────────────────────────────────
//  La mayor ventaja de Jashmal (cada gematría y cada fuente se verifican antes
//  de publicar) era INVISIBLE. Este sello discreto la hace visible: un badge
//  dorado sobre oscuro, estilo de la casa, con un sello/lacre sobrio (✓) que
//  enlaza a /como-verificamos para explicar el proceso real, sin exagerar.
//
//  Trilingüe: el rótulo cambia con el idioma activo (es/fa/en). En farsi el
//  texto va RTL y con la fuente Vazirmatn que ya hereda el layout.
//
//  Dos tamaños:
//   · variant="badge"  (por defecto) — píldora con borde, para el pie/encabezado
//     de cada misterio.
//   · variant="inline" — micro-rótulo más sobrio, para el índice /misterios.
// ─────────────────────────────────────────────────────────────────────────

const LABEL: Record<Locale, string> = {
  es: "Verificado por el Sofer",
  fa: "تأیید‌شده توسط سوفر",
  en: "Verified by the Sofer",
};

// Texto de "ayuda" al pasar el cursor: qué significa el sello.
const HINT: Record<Locale, string> = {
  es: "Cómo verificamos: gematrías y fuentes comprobadas una a una.",
  fa: "چگونه تأیید می‌کنیم: گیماتریاها و منابع، یک‌به‌یک بررسی می‌شوند.",
  en: "How we verify: gematrias and sources checked one by one.",
};

// Sello de lacre sobrio: círculo con un check. Sin texto, hereda currentColor.
function SealMark({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="12" cy="12" r="9" opacity="0.55" />
      <path d="M8.5 12.2l2.4 2.4 4.6-5" />
    </svg>
  );
}

export default function SelloSofer({
  variant = "badge",
  className = "",
}: {
  variant?: "badge" | "inline";
  className?: string;
}) {
  const locale = useLocale() as Locale;
  const label = LABEL[locale] ?? LABEL.es;
  const hint = HINT[locale] ?? HINT.es;
  const dir = locale === "fa" ? "rtl" : "ltr";

  if (variant === "inline") {
    return (
      <Link
        href="/como-verificamos"
        dir={dir}
        title={hint}
        className={`inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-gold/55 transition-colors hover:text-gold ${className}`}
      >
        <SealMark size={13} />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href="/como-verificamos"
      dir={dir}
      title={hint}
      className={`inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-3.5 py-1.5 font-cinzel text-[11px] uppercase tracking-widest text-gold/80 transition-all hover:border-gold/60 hover:bg-gold/10 hover:text-gold ${className}`}
      style={{ boxShadow: "0 0 14px rgba(201,164,62,0.10)" }}
    >
      <SealMark size={14} />
      <span>{label}</span>
    </Link>
  );
}
