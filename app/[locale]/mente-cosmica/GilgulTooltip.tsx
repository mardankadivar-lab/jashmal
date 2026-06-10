"use client";

// ─────────────────────────────────────────────────────────────────────────
// GilgulTooltip — tarjeta de hover de un SENDERO de gilgul (Tipo · origen→destino
// · Fuente · Certeza · gematría · glosa) que SIGUE AL CURSOR. Mismo patrón que
// EdgeTooltip: antes flotaba en el punto medio 3D del sendero (<Html>) y se
// perdía al acercar el zoom; ahora vive en el DOM (position: fixed) y se
// reposiciona junto al puntero en cada pointermove → la info aparece donde el
// ojo ya está mirando y nunca se va de cuadro.
//
// Para no re-renderizar React en cada movimiento, la posición se escribe directo
// en el nodo vía ref (cheap). React solo controla el contenido/visibilidad.
//
// El contenido y la estética son IDÉNTICOS al tooltip anterior; solo cambió
// DÓNDE se renderiza (DOM siguiendo el cursor, no <Html> en el midpoint 3D).
// ─────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import {
  GILGUL_CONFIDENCE_COLOR,
  confidenceLabel,
  type GilgulLink,
} from "@/lib/nodes/gilgul";

type Lang = "es" | "fa" | "en";

// El sendero bajo el cursor: el link + las etiquetas localizadas de sus extremos.
export type GilgulHint = {
  link: GilgulLink;
  fromLabel: string;
  toLabel: string;
};

export default function GilgulTooltip({
  hint,
  lang,
}: {
  hint: GilgulHint | null;
  lang: Lang;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const w = el.offsetWidth || 200;
      const h = el.offsetHeight || 96;
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

  const link = hint?.link;
  // color por certeza (misma fuente que el sendero 3D: direct/traditional/gematria)
  const color = link ? GILGUL_CONFIDENCE_COLOR[link.confidence] : "#ffd66b";
  const isFa = lang === "fa";

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
        userSelect: "none",
        minWidth: "168px",
        maxWidth: "230px",
        fontFamily: "var(--font-cinzel, serif)",
        fontSize: "10.5px",
        lineHeight: 1.45,
        padding: "8px 11px",
        borderRadius: "12px",
        border: `1px solid ${color}66`,
        background: "rgba(5,5,10,0.9)",
        color: "#f0e6cf",
        backdropFilter: "blur(5px)",
        boxShadow: `0 0 18px ${color}33, 0 0 14px rgba(0,0,0,0.7)`,
        textAlign: isFa ? "right" : "left",
        opacity: hint ? 1 : 0,
        transition: "opacity 120ms ease",
      }}
    >
      {hint && link && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "3px" }}>
            <span style={{ width: 7, height: 7, borderRadius: 99, background: color, boxShadow: `0 0 7px ${color}` }} />
            <span style={{ letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "8.5px", color }}>
              {isFa ? "گیلگول" : "Gilgul"}
            </span>
          </div>
          <div style={{ fontSize: "11.5px", color: "#fff7e6", marginBottom: "4px" }}>
            {isFa ? hint.toLabel : hint.fromLabel}
            <span style={{ color, margin: "0 5px" }}>{isFa ? "←" : "→"}</span>
            {isFa ? hint.fromLabel : hint.toLabel}
          </div>
          <div style={{ fontSize: "9px", color: "#c9c2ad", opacity: 0.85 }}>
            <span style={{ opacity: 0.6 }}>{isFa ? "منبع: " : lang === "en" ? "Source: " : "Fuente: "}</span>
            {link.source}
          </div>
          <div style={{ fontSize: "9px", color: "#c9c2ad", marginTop: "2px" }}>
            <span style={{ opacity: 0.6 }}>{isFa ? "قطعیت: " : lang === "en" ? "Confidence: " : "Certeza: "}</span>
            <span style={{ color }}>{confidenceLabel(link.confidence, lang)}</span>
          </div>
          {/* desglose de gematría cuando aplica */}
          {link.confidence === "gematria" && link.gematria && (
            <div className="hebrew" style={{ fontSize: "10px", color: "#9fd0ff", marginTop: "5px", paddingTop: "5px", borderTop: "1px solid rgba(159,208,255,0.25)" }}>
              {link.gematria.aName} = {link.gematria.aValue}
              <span style={{ opacity: 0.5, margin: "0 5px" }}>·</span>
              {link.gematria.bName} = {link.gematria.bValue}
              {/* regla de transformación (at-bash, etc.) cuando NO hay igualdad numérica */}
              {link.gematria.rule != null && (
                <span style={{ display: "block", opacity: 0.85, marginTop: "2px", color: "#bfe0ff" }}>
                  {isFa ? "قاعده: " : lang === "en" ? "rule: " : "regla: "}{link.gematria.rule}
                </span>
              )}
              {/* raíz común SOLO en igualdades (anagramas / mismo valor) */}
              {link.gematria.rule == null && link.gematria.shared != null && (
                <span style={{ display: "block", opacity: 0.7, marginTop: "1px" }}>
                  {isFa ? "ریشهٔ مشترک" : lang === "en" ? "shared root" : "raíz común"}: {link.gematria.shared}
                </span>
              )}
            </div>
          )}
          {/* glosa breve si existe */}
          {(isFa ? link.noteFa : link.note) && (
            <div style={{ fontSize: "9.5px", fontStyle: "italic", color: "#d8cfb6", marginTop: "5px", opacity: 0.9 }}>
              {isFa ? link.noteFa : link.note}
            </div>
          )}
        </>
      )}
    </div>
  );
}
