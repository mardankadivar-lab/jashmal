// ═══════════════════════════════════════════════════════════════════════════
// theme.ts — Sistema visual de Mente Cósmica
// "Particle cosmos on a void — violet pulse against infinite black"
// ═══════════════════════════════════════════════════════════════════════════
// Regla visual aprobada (Cosmic Mind Redesign):
//   · Base            = void negro.
//   · Autoridad       = violeta #8052ff (vida, foco, selección, ruta activa).
//   · Información     = colores semánticos por categoría (sobrios, subordinados).
//   · Estado activo   = violeta dominante.
//   · Estado inactivo = blanco/gris muy tenue.
//   · Relacionado     = ámbar / lichen / color de categoría a baja opacidad.
//
// COMMIT 1 (este): EXTRACCIÓN sin cambio visual. Las constantes que ya estaban
// en page.tsx se mueven aquí con sus VALORES ACTUALES idénticos. Los tokens del
// rediseño (PALETTE, NODE_STATES, FIBERS, PANEL) quedan DECLARADOS y se aplican
// en los commits siguientes: void → pulse → fibers → perf → consola.
// ═══════════════════════════════════════════════════════════════════════════
import { BRAIN_CATS } from "@/lib/nodes/brainData";

// ── PALETA BASE DEL REDISEÑO (se aplica por fases) ──────────────────────────
export const PALETTE = {
  void: "#000000",   // fondo absoluto / infinite black     (COMMIT 2)
  violet: "#8052ff", // el pulso: vida, foco, ruta activa   (COMMIT 3-4)
  bone: "#e8e4d8",   // texto principal sobre void
  ash: "#a39fae",    // texto secundario
  smoke: "#5c5965",  // texto terciario / hints
  plum: "#2a1d4a",   // violeta profundo: superficies, halos sutiles
  amber: "#c9a43e",  // acento de significado (el oro de Jashmal)
  lichen: "#7da27a", // acento de significado (verde liquen)
} as const;

// ── PALETA SEMÁNTICA POR CATEGORÍA ──────────────────────────────────────────
// Información, no decoración: Torá/Sefirot/Letras/Zohar… conservan identidad.
// Hoy se deriva 1:1 de BRAIN_CATS (cero cambio); el COMMIT 3 la subordina al
// sistema violeta (menos saturación) SIN eliminarla.
export const CATEGORY_ACCENTS: Record<string, string> = Object.fromEntries(
  Object.entries(BRAIN_CATS).map(([k, v]) => [k, v.c]),
);

// ── ESCENA ──────────────────────────────────────────────────────────────────
// COMMIT 2 (void): negro absoluto. La profundidad viene del contraste y las
// partículas, no de un fondo azulado.
export const SCENE = {
  background: PALETTE.void,
  fogColor: PALETTE.void,
  fogDensity: 0.005,
} as const;

export const BLOOM = {
  intensity: 0.72,
  luminanceThreshold: 0.2,
  luminanceSmoothing: 0.7,
  radius: 0.5,
} as const;

// ── CFG VISUAL (movido íntegro de page.tsx, valores idénticos) ──────────────
export const CFG = {
  fiberSegments: 24,
  fiberSag: 0.32,           // arco MÁS curvado de las fibras (menos rectas)
  fiberOpacityIdle: 0.022,  // red cósmica: hilos casi invisibles en reposo
  fiberOpacityDimmed: 0.02, // cuando hay selección, la base se apaga más
  fiberOpacityActive: 0.9,  // fibras encendidas
  ambientCount: 13000,      // polvo estelar que dibuja los brazos de las galaxias
  ambientSize: 0.058,
  ambientOpacity: 0.74,
  potentialCount: 1100,     // nodos POTENCIALES (chispas por recoger, Tikún incompleto)
  potentialSize: 0.07,      // un poco más grandes que el tejido, para leerse como "nodos"
  potentialOpacity: 0.22,   // muy tenues: insinúan, no compiten con los reales
  haloBase: 0.30,           // halo más chico: no lava las letras alrededor
  coreBase: 0.16,           // tamaño del núcleo brillante
  driftSpeed: 0.045,        // deriva lenta de cámara
  radiusIdle: 56,           // cámara: el universo de galaxias llena la pantalla
  radiusFocus: 7,           // al elegir/buscar, la cámara se ACERCA al concepto
} as const;

// ── PARTÍCULAS DE FONDO ─────────────────────────────────────────────────────
// COMMIT 2 (void): campo negro con estrellas blancas y acento violeta mínimo.
// El tinte frío azulado pasa a ser un violeta suave (eco del pulso #8052ff).
export const STARFIELD = {
  count: 5200,
  radiusMin: 70,
  radiusMax: 260,     // muy detrás de las galaxias
  size: 0.85,
  opacity: 0.7,
  blueShare: 0.26,    // fracción de estrellas con tinte violeta
  blueTint: [0.66, 0.52, 1] as const, // violeta suave (antes azul frío)
} as const;

// COMMIT 2 (void): halos de galaxia un punto más sobrios (sin gradientes
// pesados) y núcleo blanco-violeta frío en lugar del crema cálido.
export const NEBULAE = {
  haloScale: 2.4,        // × GALAXY_DISK
  haloOpacity: 0.15,
  coreScale: 0.5,        // × GALAXY_DISK
  coreColor: "#f3efff",
  coreOpacity: 0.22,
} as const;

// ── ESTADOS DE NODO (declarados; se aplican en COMMIT 3 — pulse) ────────────
export const NODE_STATES = {
  // activo: núcleo violeta + halo sutil + respiración lenta (sin glow vulgar)
  active: { core: PALETTE.violet, halo: PALETTE.plum },
  // inactivo: silencioso — blanco/gris muy tenue
  idle: { tint: "#ffffff", opacity: 0.1 },
  // relacionado: el color de su categoría (o ámbar/lichen) a baja opacidad
  related: { opacity: 0.35, amber: PALETTE.amber, lichen: PALETTE.lichen },
} as const;

// ── FIBRAS / CONEXIONES (declarados; se aplican en COMMIT 4 — fibers) ───────
export const FIBERS = {
  activeColor: PALETTE.violet,  // ruta activa y pulsos de viaje
  accentWarm: PALETTE.amber,    // acento solo cuando aporta significado
  accentLife: PALETTE.lichen,
} as const;

// ── PANEL / CONSOLA (declarados; se aplican en COMMIT 6 — consola) ──────────
// "Instrumento de navegación dentro del cosmos, no una tarjeta web."
export const PANEL = {
  bg: "rgba(0,0,0,0.92)",
  hairline: "rgba(255,255,255,0.12)", // borde hairline blanco, baja opacidad
  radius: 24,
  text: PALETTE.bone,
  textSecondary: PALETTE.ash,
  textTertiary: PALETTE.smoke,
  cta: PALETTE.violet,
} as const;
