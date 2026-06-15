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

  function label(n: { label: string; labelFa: string }): string {
    return locale === "fa" ? n.labelFa : n.label;
  }

  function handleSection(s: ParshaWorkSection) {
    const ref = `${bookId}, ${s.refTitle}`;
    onSelectSection({
      id: ref,
      label: s.label,
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
                  key={s.refTitle}
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
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
