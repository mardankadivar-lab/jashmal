"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import type { ParshaWorkGroup, ParshaWorkSection } from "@/lib/sources/catalogOverrides";
import type { RichBook } from "@/lib/sources/catalogOverrides";

interface ParshaWorkNavigatorProps {
  /** Id del libro en Sefaria (ej. "Me'or Einayim", "Ben Porat Yosef"). */
  bookId: string;
  /** Estructura de grupos → secciones (cada sección = un nodo del TOC). */
  groups: ParshaWorkGroup[];
  /** Id del grupo abierto por defecto (acordeón). */
  defaultOpenGroup?: string;
  /** Devuelve el nodo elegido como RichBook (se reporta a BookBrowser). */
  onSelectSection: (book: RichBook) => void;
}

// Navegador GENÉRICO de obras jasídicas/cabalísticas ordenadas por parashá
// (o por sección de nombre): TOC agrupado (acordeón) cuyas hojas se cargan
// ENTERAS, no por capítulos. Generaliza el patrón de Ben Porat Yosef.
//
// El ref de cada sección es "{bookId}, {refTitle}" (título inglés del nodo en
// Sefaria). Al hacer clic se reporta un RichBook cuyo id Y refTemplate son ese
// ref COMPLETO (sin placeholder {n}); así bookRef() lo devuelve tal cual,
// getText lo trae entero y el flatten existente lo aplana — sin selector de
// capítulos. BookBrowser intercepta el id (que empieza por "{bookId}, ") y
// muestra un botón "Estudiar esta sección completa".
//
// ★ = sección destacada (star): se resalta fuerte (texto estrella).
export default function ParshaWorkNavigator({
  bookId,
  groups,
  defaultOpenGroup,
  onSelectSection,
}: ParshaWorkNavigatorProps) {
  const locale = useLocale();
  const [openGroup, setOpenGroup] = useState<string | null>(
    defaultOpenGroup ?? groups[0]?.id ?? null
  );

  // Tres idiomas. Fallback SIEMPRE al español: sin traducción se muestra el
  // español, nunca el inglés de Sefaria (misma regla que `nodeLabel` en el
  // cerebro). En la estantería de filosofía judía no hace falta el fallback:
  // las 132 secciones llevan los cuatro idiomas.
  function label(n: { label: string; labelFa?: string; labelEn?: string }): string {
    if (locale === "fa") return n.labelFa || n.label;
    if (locale === "en") return n.labelEn || n.label;
    return n.label;
  }

  function handleSection(s: ParshaWorkSection) {
    // Con refBase los capítulos cuelgan del libro mismo, no de un nodo con
    // nombre (Shemoná Perakim: «Eight Chapters 3», no «Eight Chapters, X 3»).
    const ref = s.refBase ?? `${bookId}, ${s.refTitle}`;
    // Sección con capítulos (profundidad 2: un portal, un tratado, un netiv):
    // se reporta con sus `units` y una plantilla "{ref} {n}", y BookBrowser
    // muestra la rejilla de capítulos de siempre.
    // El rótulo viaja YA TRADUCIDO. Si se reportara el español, más abajo
    // `localizedBookLabel` no tendría dónde buscar —estos ids de sección no
    // están en BOOK_NAMES— y la cabecera del capítulo saldría en español
    // dentro de la interfaz en farsi.
    const rotulo = label(s);
    if (s.units && s.units > 1) {
      onSelectSection({
        id: ref,
        label: rotulo,
        he: s.he,
        type: "chapters",
        units: s.units,
        refTemplate: `${ref} {n}`,
      });
      return;
    }
    onSelectSection({
      id: ref,
      label: rotulo,
      he: s.he,
      type: "chapters",
      // 1 sola "unidad" que apunta al nodo completo.
      units: 1,
      // refTemplate sin {n}: bookRef lo devuelve tal cual → carga el nodo ENTERO
      // ("Me'or Einayim, Bereshit") sin importar la unidad seleccionada.
      refTemplate: ref,
    });
  }

  return (
    <div className="mt-3 space-y-1.5">
      {groups.map((g) => (
        <div key={g.id} className="rounded-md border border-gold/15">
          {/* Cabecera del grupo — acordeón */}
          <button
            onClick={() => setOpenGroup(openGroup === g.id ? null : g.id)}
            className="flex w-full items-center justify-between px-3 py-2 text-start text-sm transition-colors hover:bg-gold/5"
          >
            <span className="font-cinzel tracking-wide text-gold/90">
              {label(g)}
            </span>
            <span className="flex items-center gap-2">
              <span className="hebrew text-xs text-gold/50">{g.he}</span>
              <span className="text-gold/40 text-xs">{openGroup === g.id ? "▲" : "▼"}</span>
            </span>
          </button>

          {/* Secciones dentro del grupo */}
          {openGroup === g.id && (
            <div className="flex flex-wrap gap-2 border-t border-gold/10 p-2.5">
              {g.sections.map((s) => (
                <button
                  key={s.refBase ?? s.refTitle}
                  onClick={() => handleSection(s)}
                  className={
                    "flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition-all " +
                    (s.star
                      ? // ★★ texto estrella: resaltado fuerte.
                        "border-gold bg-gold/20 text-gold shadow-[0_0_12px_rgba(201,164,62,0.25)] hover:bg-gold/30"
                      : "border-gold/20 text-parchment/80 hover:border-gold/50 hover:bg-gold/5 hover:text-parchment")
                  }
                >
                  {s.star && <span className="text-[10px]">★</span>}
                  <span>{label(s)}</span>
                  <span className="hebrew text-[10px] text-gold/50">{s.he}</span>
                  {s.units && s.units > 1 && (
                    <span className="text-[10px] text-gold/40">· {s.units}</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
