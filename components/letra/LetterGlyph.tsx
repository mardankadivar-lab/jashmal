"use client";

// ─────────────────────────────────────────────────────────────────────────
//  EL GLIFO — SVG nítido del trazo hebreo real (NO imagen IA, NO glifo borroso).
//  Cada parte es un <path> SEPARADO con `data-part`, para iluminarse sola en la
//  sección FORMA. La letra NUNCA se transforma: solo cambia su iluminación.
//
//  Reutilizable: el motor pide el glifo por `slug`. Hoy: Álef, Vav, Zayin.
//
//  Los `data-part` de cada trazo deben coincidir con los `svgPathId` que
//  declara la letra en lib/letters/<slug>.ts, o la parte no se ilumina.
// ─────────────────────────────────────────────────────────────────────────

const GOLD = "#c9a43e";

const STROKE = {
  fill: "none",
  stroke: GOLD,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

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
  return (
    <>
      {/* Vav diagonal — el puente */}
      <path
        id="vav"
        data-part="vav"
        d="M272 64 L108 296"
        strokeWidth={32}
        style={partStyle("vav", activePart)}
        {...STROKE}
      />
      {/* Yud superior — la bandera de arriba-derecha */}
      <path
        id="yud-top"
        data-part="yud-top"
        d="M204 140 L298 90"
        strokeWidth={30}
        style={partStyle("yud-top", activePart)}
        {...STROKE}
      />
      {/* Yud inferior — el pie de abajo-izquierda */}
      <path
        id="yud-bottom"
        data-part="yud-bottom"
        d="M168 214 L74 262"
        strokeWidth={30}
        style={partStyle("yud-bottom", activePart)}
        {...STROKE}
      />
    </>
  );
}

/**
 * Vav: un solo descenso con su cabecita arriba. La cabeza se extiende hacia UN
 * lado y el cuerpo baja desde su extremo — de ahí que la Vav sea puro descenso.
 */
function VavPaths({ activePart }: { activePart?: string | null }) {
  return (
    <>
      {/* Cabeza (la corona) — el remate tipo Yud del que nace la letra */}
      <path
        id="vav-head"
        data-part="vav-head"
        d="M144 100 L216 100"
        strokeWidth={32}
        style={partStyle("vav-head", activePart)}
        {...STROKE}
      />
      {/* Cuerpo (el descenso) — el canal recto */}
      <path
        id="vav-body"
        data-part="vav-body"
        d="M204 100 L204 284"
        strokeWidth={32}
        style={partStyle("vav-body", activePart)}
        {...STROKE}
      />
    </>
  );
}

/**
 * Zayin: la misma Vav, pero su cabeza se extiende hacia AMBOS lados y el cuerpo
 * baja desde el centro. Por eso la cabeza deja de ser remate y parece corona
 * (Ginsburgh) — y el conjunto, una espada. Esa diferencia ES la enseñanza.
 */
function ZayinPaths({ activePart }: { activePart?: string | null }) {
  return (
    <>
      {/* La corona — se abre a los dos lados */}
      <path
        id="zayin-crown"
        data-part="zayin-crown"
        d="M120 100 L240 100"
        strokeWidth={32}
        style={partStyle("zayin-crown", activePart)}
        {...STROKE}
      />
      {/* La hoja — desciende desde el centro de la corona */}
      <path
        id="zayin-blade"
        data-part="zayin-blade"
        d="M180 100 L180 284"
        strokeWidth={32}
        style={partStyle("zayin-blade", activePart)}
        {...STROKE}
      />
    </>
  );
}

const GLYPHS: Record<
  string,
  { label: string; Paths: (p: { activePart?: string | null }) => React.ReactElement }
> = {
  alef: { label: "Álef", Paths: AlefPaths },
  vav: { label: "Vav", Paths: VavPaths },
  zayin: { label: "Zayin", Paths: ZayinPaths },
};

export default function LetterGlyph({ slug, activePart }: GlyphProps) {
  const glyph = GLYPHS[slug];
  if (!glyph) return null;
  const { label, Paths } = glyph;

  return (
    <svg
      viewBox="0 0 360 360"
      role="img"
      aria-label={label}
      className="h-full w-full select-none"
      style={{ overflow: "visible" }}
    >
      <Paths activePart={activePart} />
    </svg>
  );
}
