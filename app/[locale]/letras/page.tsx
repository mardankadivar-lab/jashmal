"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LETTER_MEANINGS } from "@/lib/nodes/hebrewLetters";

// Slug de ruta a partir del nombre transliterado: "Álef" -> "alef".
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z]/g, "");
}

const LETTERS = Object.values(LETTER_MEANINGS);

export default function LetrasIndexPage() {
  const locale = useLocale();
  const fa = locale === "fa";
  const t = useTranslations("letters");

  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-12" dir={fa ? "rtl" : "ltr"}>
      {/* Barra superior: volver al inicio */}
      <div className="mb-2">
        <Link
          href="/"
          className="flex w-fit items-center gap-1.5 font-cinzel text-sm text-gold/70 transition-colors hover:text-gold"
        >
          <span>{fa ? "→" : "←"}</span>
          <span className="hebrew">חַשְׁמַל</span>
          <span>· Jashmal</span>
        </Link>
      </div>

      {/* Encabezado */}
      <div className="mb-12 text-center">
        <p className="hebrew mb-2 text-3xl text-gold/80" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.4))" }}>
          אוֹתִיּוֹת
        </p>
        <h1 className="font-cinzel text-2xl font-bold tracking-wide text-parchment sm:text-3xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          {t("subtitle")}
        </p>
      </div>

      {/* Rejilla de las 22 letras */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {LETTERS.map((l) => (
          <Link
            key={l.letter}
            href={`/letras/${toSlug(l.name)}`}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-gold/25 p-5 text-center transition-all hover:border-gold/60"
            style={{ background: "rgba(14,12,22,0.94)" }}
          >
            {/* Glow al pasar el cursor */}
            <div className="pointer-events-none absolute -top-8 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(circle, rgba(201,164,62,0.35) 0%, transparent 70%)" }} />

            {/* La letra hebrea, grande y luminosa */}
            <span
              className="hebrew leading-none text-gold"
              style={{
                fontSize: "clamp(64px, 18vw, 92px)",
                textShadow: "0 0 26px rgba(201,164,62,0.45), 0 0 8px rgba(201,164,62,0.35)",
              }}
            >
              {l.letter}
            </span>

            {/* Nombre hebreo */}
            <span className="hebrew mt-3 text-lg" style={{ color: "#fdf4dd" }}>
              {l.nameHe}
            </span>

            {/* Transliteración + valor de gematría */}
            <span className="mt-1 font-cinzel text-[11px] uppercase tracking-widest text-gold/80">
              {l.name} · {l.value}
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-center font-cinzel text-xs uppercase tracking-widest text-muted/40">
        {fa ? "هر حرف یک کانالِ آگاهی است" : "Cada letra es un canal de consciencia"}
      </p>
    </main>
  );
}
