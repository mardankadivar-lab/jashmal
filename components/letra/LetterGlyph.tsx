"use client";

// ─────────────────────────────────────────────────────────────────────────
//  EL GLIFO — SVG nítido del trazo hebreo real (NO imagen IA, NO glifo borroso).
//  Cada parte es un <path> SEPARADO con `data-part`, para iluminarse sola en la
//  sección FORMA. La letra NUNCA se transforma: solo cambia su iluminación.
//
//  Reutilizable: el motor pide el glifo por `slug`. Hoy: Álef (Yud·Vav·Yud).
// ─────────────────────────────────────────────────────────────────────────

const GOLD = "#c9a43e";

type GlyphProps = {
  slug: string;
  /** id de la parte activa (svgPathId) o null = todas encendidas por igual. */
  activePart?: string | null;
};

function partStyle(id: string, activePart: string | null | undefined): React.CSSProperties {
  const anyActive = !!activePart;
  const isActive = activePart === id;
  // Sin parte activa → todas en reposo luminoso. Con parte activa → esa brilla,
  // las demás se atenúan. Transición suave (la letra no se mueve, solo su luz).
  return {
    transition: "opacity 0.7s ease, filter 0.7s ease",
    opacity: anyActive ? (isActive ? 1 : 0.18) : 1,
    filter: isActive
      ? "drop-shadow(0 0 22px rgba(201,164,62,0.95)) drop-shadow(0 0 6px rgba(255,240,200,0.8))"
      : "drop-shadow(0 0 9px rgba(201,164,62,0.4))",
  };
}

/** Álef: tres trazos gruesos con remates redondos — Yud superior, Vav, Yud inferior. */
function AlefPaths({ activePart }: { activePart?: string | null }) {
  const common = {
    fill: "none",
    stroke: GOLD,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <>
      {/* Vav diagonal — el puente */}
      <path
        id="vav"
        data-part="vav"
        d="M272 64 L108 296"
        strokeWidth={32}
        style={partStyle("vav", activePart)}
        {...common}
      />
      {/* Yud superior — la bandera de arriba-derecha */}
      <path
        id="yud-top"
        data-part="yud-top"
        d="M204 140 L298 90"
        strokeWidth={30}
        style={partStyle("yud-top", activePart)}
        {...common}
      />
      {/* Yud inferior — el pie de abajo-izquierda */}
      <path
        id="yud-bottom"
        data-part="yud-bottom"
        d="M168 214 L74 262"
        strokeWidth={30}
        style={partStyle("yud-bottom", activePart)}
        {...common}
      />
    </>
  );
}

export default function LetterGlyph({ slug, activePart }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 360 360"
      role="img"
      aria-label="Álef"
      className="h-full w-full select-none"
      style={{ overflow: "visible" }}
    >
      {slug === "alef" ? <AlefPaths activePart={activePart} /> : null}
    </svg>
  );
}
