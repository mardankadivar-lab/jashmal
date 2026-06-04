"use client";

// Brain v3 · Accesibilidad + Modo Estudio.
// - Tamaño de texto global (A− / A / A+ / A++): escala el font-size raíz, así
//   TODO el texto (estudios, fuentes, comentarios, artículos) crece o se achica.
// - Modo estudio: lectura grande, alto contraste, sin distracciones.
// El script anti-parpadeo del layout aplica lo guardado antes de pintar.

import { useEffect, useState } from "react";

const SIZES = ["sm", "md", "lg", "xl"] as const;
type Size = (typeof SIZES)[number];
const SIZE_CSS: Record<Size, string> = { sm: "100%", md: "112.5%", lg: "128%", xl: "145%" };

export default function ReadingControls() {
  const [idx, setIdx] = useState(1); // md por defecto
  const [study, setStudy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const s = localStorage.getItem("jashmal-textsize") as Size | null;
      const i = s ? SIZES.indexOf(s) : 1;
      setIdx(i >= 0 ? i : 1);
      setStudy(localStorage.getItem("jashmal-studymode") === "1");
    } catch {}
    setReady(true);
  }, []);

  const applySize = (i: number) => {
    const clamped = Math.max(0, Math.min(SIZES.length - 1, i));
    setIdx(clamped);
    const s = SIZES[clamped];
    document.documentElement.style.fontSize = SIZE_CSS[s];
    try { localStorage.setItem("jashmal-textsize", s); } catch {}
  };

  const toggleStudy = () => {
    const next = !study;
    setStudy(next);
    document.documentElement.classList.toggle("study-mode", next);
    try { localStorage.setItem("jashmal-studymode", next ? "1" : "0"); } catch {}
  };

  const btn =
    "rounded-md border border-gold/20 leading-none text-muted transition-colors hover:border-gold/50 hover:text-gold disabled:opacity-30";

  return (
    <div className="flex items-center gap-1" aria-label="Controles de lectura" suppressHydrationWarning>
      <button
        onClick={() => applySize(idx - 1)}
        disabled={ready && idx <= 0}
        className={`${btn} px-1.5 py-0.5 text-[11px]`}
        title="Texto más pequeño"
        aria-label="Texto más pequeño"
      >
        A−
      </button>
      <button
        onClick={() => applySize(idx + 1)}
        disabled={ready && idx >= SIZES.length - 1}
        className={`${btn} px-1.5 py-0.5 text-[15px]`}
        title="Texto más grande"
        aria-label="Texto más grande"
      >
        A+
      </button>
      <button
        onClick={toggleStudy}
        className={`rounded-md border px-1.5 py-1 text-[12px] leading-none transition-colors ${
          study ? "border-gold/60 bg-gold/10 text-gold" : "border-gold/20 text-muted hover:border-gold/50 hover:text-gold"
        }`}
        title="Modo estudio (lectura concentrada)"
        aria-label="Modo estudio"
        aria-pressed={study}
      >
        📖
      </button>
    </div>
  );
}
