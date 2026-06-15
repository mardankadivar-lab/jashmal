"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { BEN_PORAT_GROUPS, type BenPoratNode } from "@/lib/sources/catalogOverrides";
import type { RichBook } from "@/lib/sources/catalogOverrides";

interface BenPoratNavigatorProps {
  onSelectNode: (book: RichBook) => void;
}

// Navegador de Ben Porat Yosef, calcado de ZoharNavigator: TOC agrupado (acordeón)
// de los 21 nodos. Cada nodo es una hoja que se carga ENTERA (no por capítulos):
// al hacer clic se reporta un RichBook cuyo refTemplate es el ref COMPLETO del nodo
// SIN placeholder {n}. Así bookRef(book, unit) devuelve el ref del nodo tal cual
// (ej. "Ben Porat Yosef, Vayechi"), getText lo trae entero y el flatten existente
// lo aplana — sin necesidad de selector de capítulos.
//
// ★ = nodo destacado (Introducción). ★★ = texto estrella (la Carta del Baal Shem Tov).
export default function BenPoratNavigator({ onSelectNode }: BenPoratNavigatorProps) {
  const locale = useLocale();
  // Por defecto abierto el grupo de Bereshit (el corazón del libro).
  const [openGroup, setOpenGroup] = useState<string | null>("bereshit");

  function label(n: { label: string; labelFa: string }): string {
    return locale === "fa" ? n.labelFa : n.label;
  }

  function handleNode(n: BenPoratNode) {
    onSelectNode({
      id: n.id,
      label: n.label,
      he: n.he,
      type: "chapters",
      // 1 sola "unidad" que apunta al nodo completo.
      units: 1,
      // refTemplate sin {n}: bookRef lo devuelve tal cual → carga el nodo ENTERO
      // ("Ben Porat Yosef, Vayechi") sin importar el número de unidad seleccionado.
      refTemplate: n.id,
    });
  }

  return (
    <div className="mt-3 space-y-1.5">
      {BEN_PORAT_GROUPS.map((g) => (
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

          {/* Nodos dentro del grupo */}
          {openGroup === g.id && (
            <div className="flex flex-wrap gap-2 border-t border-gold/10 p-2.5">
              {g.nodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleNode(n)}
                  className={
                    "flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition-all " +
                    (n.star
                      ? // ★★ La Carta del Baal Shem Tov: texto estrella, resaltado fuerte.
                        "border-gold bg-gold/20 text-gold shadow-[0_0_12px_rgba(201,164,62,0.25)] hover:bg-gold/30"
                      : n.special
                      ? "border-gold/50 bg-gold/10 text-gold hover:border-gold hover:bg-gold/20"
                      : "border-gold/20 text-parchment/80 hover:border-gold/50 hover:bg-gold/5 hover:text-parchment")
                  }
                >
                  {n.star && <span className="text-[10px]">★</span>}
                  <span>{label(n)}</span>
                  <span className="hebrew text-[10px] text-gold/50">{n.he}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
