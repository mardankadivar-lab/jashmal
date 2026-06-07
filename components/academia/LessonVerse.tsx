"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import ClickableHebrew, { type WordAnchor } from "@/components/sefaria/ClickableHebrew";
import LexiconPanel from "@/components/study/LexiconPanel";

// Tarjeta de un versículo/fuente: hebreo grande + traducción + referencia.
// Reutiliza la integración de Sefaria del motor de estudio:
//   · cada palabra hebrea es pulsable → abre el léxico (guematría + diccionarios).
//   · enlace opcional para abrir la fuente VIVA en el motor (`/estudio?ref=`).
export default function LessonVerse({
  he,
  es,
  refLabel,
  sefaria,
}: {
  he: string;
  es: string;
  refLabel: string;
  sefaria?: string;
}) {
  const [anchor, setAnchor] = useState<WordAnchor | null>(null);

  return (
    <figure className="my-7 rounded-2xl border border-gold/20 bg-ink/40 px-5 py-6 text-center">
      <ClickableHebrew
        text={he}
        onWord={setAnchor}
        className="hebrew text-2xl leading-loose text-parchment sm:text-3xl"
      />
      <figcaption className="mt-4">
        <p className="text-base italic leading-relaxed text-parchment/75">«{es}»</p>
        <p className="mt-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/60">{refLabel}</p>
        {sefaria && (
          <Link
            href={`/estudio?ref=${encodeURIComponent(sefaria)}`}
            className="mt-3 inline-block font-cinzel text-[11px] uppercase tracking-wider text-gold/70 underline-offset-4 transition hover:text-gold hover:underline"
          >
            Ábrelo en el motor de estudio →
          </Link>
        )}
        <p className="mt-3 text-[11px] leading-relaxed text-muted/60">
          Toca una palabra hebrea para ver su léxico y su guematría.
        </p>
      </figcaption>

      {/* El léxico (popup anclado a la palabra), el mismo del motor de estudio. */}
      <LexiconPanel anchor={anchor} onClose={() => setAnchor(null)} />
    </figure>
  );
}
