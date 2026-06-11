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
// Información, no decoración: Torá/Sefirot/Letras/Zohar… conservan identidad,
// pero SUBORDINADA al sistema violeta (COMMIT 3): mismos matices, menos
// saturación. La leyenda y las nebulosas siguen usando BRAIN_CATS pleno.
function hexToHsl(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  const r = ((n >> 16) & 255) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
}
function hslToHex(h: number, s: number, l: number): string {
  const f = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const to255 = (x: number) => Math.round(x * 255).toString(16).padStart(2, "0");
  return `#${to255(f(p, q, h + 1 / 3))}${to255(f(p, q, h))}${to255(f(p, q, h - 1 / 3))}`;
}
/** Versión sobria de un color: mismo matiz, menos saturación. */
function sober(hex: string, satKeep = 0.72): string {
  const [h, s, l] = hexToHsl(hex);
  return hslToHex(h, s * satKeep, l);
}
export const CATEGORY_ACCENTS: Record<string, string> = Object.fromEntries(
  Object.entries(BRAIN_CATS).map(([k, v]) => [k, sober(v.c)]),
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

// ── NODOS / PULSO (COMMIT 3) ────────────────────────────────────────────────
// El violeta es la autoridad: el nodo se tiñe de #8052ff a medida que su
// intensidad sube hacia el estado activo (selección/foco = 1.4, hover = 1.1).
// Los nodos normales quedan más silenciosos; su categoría se conserva sobria.
export const NODE = {
  pulseSpeed: 0.9,        // respiración LENTA (antes 1.4)
  pulseAmpIdle: 0.06,     // latido casi imperceptible en reposo (antes 0.1)
  pulseAmpActive: 0.12,   // el activo respira hondo
  haloOpacityBase: 0.09,  // reposo más silencioso (antes 0.12)
  haloOpacityGain: 0.48,
  coreOpacityBase: 0.2,   // antes 0.25
  coreOpacityGain: 0.72,
  violetMixStart: 1.0,    // desde esta intensidad empieza el tinte violeta
  violetMixFull: 1.35,    // aquí el violeta domina (el activo llega a 1.4)
  coreWhiten: 0.35,       // núcleo activo: violeta aclarado (luminoso, no neón)
} as const;

// ── FIBRAS / CONEXIONES (COMMIT 4) ──────────────────────────────────────────
// Regla: inactivas casi invisibles · relacionadas finas · ruta activa VIOLETA ·
// pulsos de viaje violeta · ámbar SOLO donde aporta significado (el hilo a la
// Torá, lo compartido al comparar). Sin saturar la escena de líneas.
export const FIBERS = {
  idleColor: "#76719f",          // red de reposo: gris-violeta neutro (antes azul #6a7fae)
  activeColor: PALETTE.violet,   // fibras del nodo en foco + electrones
  layerOpacity: [0.55, 0.2, 0.07] as const, // primaria/secundaria/terciaria (antes 0.6/0.26/0.1)
  interpFade: "#8b87a0",         // interpretativas: desvaídas a gris neutro (antes azul #9aa6c4)
  interpFadeAmount: 0.55,
  interpOpacityFactor: 0.4,      // las interpretativas pesan menos que las clásicas
  electronOpacity: 0.7,
  travelA: PALETTE.violet,       // pulso de viaje: violeta…
  travelB: "#ac8fff",            // …hacia violeta luminoso (no neón)
  pathToTorah: "#ffe9a8",        // ámbar CON significado: el hilo dorado a la Torá
  pathToTorahOpacity: 0.95,
  compareColor: "#ffe9a8",       // ámbar CON significado: lo que comparten al comparar
  highlightOpacity: 0.95,
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
