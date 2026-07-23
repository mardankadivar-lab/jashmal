"use client";

// ─────────────────────────────────────────────────────────────────────────
//  EL GLIFO CENTRAL de la experiencia inmersiva (/letra/[slug]).
//
//  DECISIÓN (2026-07-23): NO se dibuja la letra con trazos a mano. El intento
//  de glifo dibujado (Álef con Yud·Vav·Yud, y luego Vav/Zayin) producía figuras
//  crudas —"garabatos"— e inconsistentes entre letras. Se revirtió Vav/Zayin y
//  ahora también Álef: TODAS las letras quedan igual, con solo el resplandor
//  dorado ambiental que ya pinta LetterExperience detrás de este componente.
//
//  Este componente se mantiene (LetterExperience lo invoca y le pasa activePart)
//  para no romper el motor ni la posible reintroducción futura de un glifo real.
//  Hoy no renderiza trazos: el centro es puro halo, uniforme en cada letra.
// ─────────────────────────────────────────────────────────────────────────

type GlyphProps = {
  slug: string;
  /** id de la parte activa (svgPathId) o null. Reservado para uso futuro. */
  activePart?: string | null;
};

export default function LetterGlyph(_props: GlyphProps) {
  // Sin trazos: solo el resplandor ambiental (lo pinta LetterExperience).
  // Se devuelve un SVG vacío para conservar el hueco/relación del layout.
  return (
    <svg
      viewBox="0 0 360 360"
      role="presentation"
      aria-hidden="true"
      className="h-full w-full select-none"
      style={{ overflow: "visible" }}
    />
  );
}
