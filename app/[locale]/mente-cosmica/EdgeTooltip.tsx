"use client";

// ─────────────────────────────────────────────────────────────────────────
// EdgeTooltip — etiqueta "viajar a → {destino} · clásica/interp" que SIGUE AL
// CURSOR (punto 3 del rediseño). Antes flotaba en el punto medio de la arista
// dentro de la escena 3D y se perdía al acercar el zoom; ahora vive en el DOM
// (position: fixed) y se reposiciona junto al puntero en cada pointermove → la
// info aparece donde el ojo ya está mirando y nunca se va de cuadro.
//
// Para no re-renderizar React en cada movimiento, la posición se escribe
// directo en el nodo vía ref (cheap). React solo controla el contenido/visibilidad.
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";

export type EdgeHint = { toLabel: string; kind: "solid" | "interp" };

export default function EdgeTooltip({
  hint,
  isFa,
  locale,
}: {
  hint: EdgeHint | null;
  isFa: boolean;
  locale: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const w = el.offsetWidth || 160;
      const h = el.offsetHeight || 32;
      const pad = 14;
      // por defecto, abajo-derecha del cursor; voltea si se sale de la pantalla
      let x = e.clientX + 18;
      let y = e.clientY + 20;
      if (x + w + pad > window.innerWidth) x = e.clientX - w - 18;
      if (y + h + pad > window.innerHeight) y = e.clientY - h - 20;
      if (x < pad) x = pad;
      if (y < pad) y = pad;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const travelTo = isFa ? "سفر به" : locale === "en" ? "travel to" : "viajar a";
  const kindLabel = hint
    ? hint.kind === "solid"
      ? isFa
        ? "کلاسیک"
        : locale === "en"
          ? "classic"
          : "clásica"
      : isFa
        ? "تفسیری"
        : locale === "en"
          ? "interp."
          : "interp."
    : "";

  return (
    <div
      ref={ref}
      aria-hidden
      dir={isFa ? "rtl" : "ltr"}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 60,
        pointerEvents: "none",
        whiteSpace: "nowrap",
        userSelect: "none",
        fontFamily: "var(--font-cinzel, serif)",
        fontSize: "11px",
        letterSpacing: "0.04em",
        padding: "4px 11px",
        borderRadius: "9999px",
        border: "1px solid rgba(201,164,62,0.45)",
        background: "rgba(5,5,10,0.88)",
        color: "#f0e6cf",
        backdropFilter: "blur(4px)",
        boxShadow: "0 0 16px rgba(201,164,62,0.25)",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        opacity: hint ? 1 : 0,
        transition: "opacity 120ms ease",
      }}
    >
      {hint && (
        <>
          <span style={{ fontSize: "8px", textTransform: "uppercase", letterSpacing: "0.14em", opacity: 0.55 }}>
            {travelTo}
          </span>
          <span style={{ color: "#c9a43e", fontWeight: 700 }}>{isFa ? "←" : "→"}</span>
          <span style={{ color: "#ffe9a8", fontWeight: 700 }}>{hint.toLabel}</span>
          <span
            style={{
              marginInlineStart: "4px",
              fontSize: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              opacity: 0.6,
              color: hint.kind === "solid" ? "#c9a43e" : "#9aa6c4",
            }}
          >
            {kindLabel}
          </span>
        </>
      )}
    </div>
  );
}
