"use client";

import { useLocale } from "next-intl";
import { ETZ_CHAIM_SECTIONS, type EtzChaimSection } from "@/lib/sources/catalogOverrides";
import type { RichBook } from "@/lib/sources/catalogOverrides";

interface EtzChaimNavigatorProps {
  onSelectSection: (book: RichBook) => void;
}

// Navegador de Sefer Etz Chaim, calcado de ZoharNavigator pero de UN nivel:
// las 51 secciones (Shaar HaKlalim + 50 Portales) son hojas que llevan directo
// a la elección de capítulo. Al elegir una sección, se reporta como un RichBook
// con su refTemplate; BookBrowser muestra entonces sus capítulos y StudyEngine
// arma el ref final ("Sefer Etz Chaim 13:5", etc.) vía bookRef.
export default function EtzChaimNavigator({ onSelectSection }: EtzChaimNavigatorProps) {
  const locale = useLocale();

  function label(s: { label: string; labelFa: string }): string {
    return locale === "fa" ? s.labelFa : s.label;
  }

  function handleSection(s: EtzChaimSection) {
    onSelectSection({
      id: s.id,
      label: s.label,
      he: s.he,
      type: "chapters",
      units: s.units,
      refTemplate: s.refTemplate,
    });
  }

  return (
    <div className="mt-3 flex max-h-72 flex-wrap gap-2 overflow-y-auto pe-1">
      {ETZ_CHAIM_SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => handleSection(s)}
          className={
            "flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition-all " +
            (s.special
              ? "border-gold/50 bg-gold/10 text-gold hover:border-gold hover:bg-gold/20"
              : "border-gold/20 text-parchment/80 hover:border-gold/50 hover:bg-gold/5 hover:text-parchment")
          }
        >
          <span>{label(s)}</span>
          <span className="hebrew text-[10px] text-gold/50">{s.he}</span>
          <span className="text-gold/30 text-[9px]">{s.units}</span>
        </button>
      ))}
    </div>
  );
}
