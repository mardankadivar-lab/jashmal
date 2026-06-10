// ─────────────────────────────────────────────────────────────────────────
// graphData.ts — "El cerebro de Jashmal"
// Grafo 3D de ideas (temas) y sus conexiones. Datos puros + layout determinista.
// El refinamiento visual (densidad/tamaño/colores) se hace en app/[locale]/grafo/page.tsx.
// ─────────────────────────────────────────────────────────────────────────

export type GNode = {
  id: string;
  label: string;     // etiqueta en español
  labelFa: string;   // etiqueta en farsi (transliteración/traducción razonable)
  cat: string;       // categoría (clave de GRAPH_CATS)
  url?: string;      // atajo real del sitio (solo donde existe)
};

// ─── Paleta de categorías (Sefaria + Jashmal) ────────────────────────────
export const GRAPH_CATS: Record<string, { c: string; label: string }> = {
  jashmal:  { c: "#c9a43e", label: "Jashmal" },
  tanakh:   { c: "#2bb6c9", label: "Tanaj" },
  mishnah:  { c: "#5fb0d6", label: "Mishná" },
  talmud:   { c: "#e0c97f", label: "Talmud" },
  midrash:  { c: "#6fc98a", label: "Midrash" },
  halakhah: { c: "#d65a72", label: "Halajá" },
  kabbalah: { c: "#a98fd6", label: "Cabalá" },
  chasidut: { c: "#a9d68f", label: "Jasidut" },
  ciencia:  { c: "#ff8a6a", label: "Ciencia" },
};

// ─── Nodos del grafo ─────────────────────────────────────────────────────
export const GNODES: GNode[] = [
  // Jashmal (atajos reales del sitio)
  { id: "358",                 label: "358",                 labelFa: "۳۵۸",                 cat: "jashmal",  url: "/358" },
  { id: "26",                  label: "26",                  labelFa: "۲۶",                  cat: "jashmal",  url: "/26" },
  { id: "137",                 label: "137",                 labelFa: "۱۳۷",                 cat: "jashmal",  url: "/137" },
  { id: "Entrelazamiento",     label: "Entrelazamiento",     labelFa: "درهم‌تنیدگی",          cat: "jashmal",  url: "/entrelazamiento" },
  { id: "Serpiente de cobre",  label: "Serpiente de cobre",  labelFa: "مار مفرغی",            cat: "jashmal",  url: "/serpiente-de-cobre" },
  { id: "Sanador",             label: "Sanador",             labelFa: "شفادهنده",            cat: "jashmal",  url: "/sanador" },
  { id: "Refael",              label: "Refael",              labelFa: "رِفائل",               cat: "jashmal",  url: "/refael" },
  { id: "Refuá",               label: "Refuá",               labelFa: "رِفوآه (شفا)",         cat: "jashmal",  url: "/refua" },
  { id: "Linaje",              label: "Linaje",              labelFa: "تبار",                 cat: "jashmal",  url: "/linaje" },
  { id: "Bilaam",              label: "Bilaam",              labelFa: "بَلعام",               cat: "jashmal",  url: "/bilaam" },

  // Tanaj
  { id: "Torá",         label: "Torá",         labelFa: "تورات",          cat: "tanakh" },
  { id: "Génesis 22",   label: "Génesis 22",   labelFa: "پیدایش ۲۲",      cat: "tanakh" },
  { id: "Números 21",   label: "Números 21",   labelFa: "اعداد ۲۱",       cat: "tanakh" },
  { id: "Éxodo 15",     label: "Éxodo 15",     labelFa: "خروج ۱۵",        cat: "tanakh" },
  { id: "Salmos 145",   label: "Salmos 145",   labelFa: "مزامیر ۱۴۵",     cat: "tanakh" },

  // Talmud
  { id: "Talmud",      label: "Talmud",      labelFa: "تلمود",          cat: "talmud" },
  { id: "Berajot 4b",  label: "Berajot 4b",  labelFa: "بِراخوت ۴ب",     cat: "talmud" },

  // Mishná
  { id: "Mishná",            label: "Mishná",            labelFa: "میشنا",                cat: "mishnah" },
  { id: "Rosh Hashaná 3:8",  label: "Rosh Hashaná 3:8",  labelFa: "روش هَشانا ۳:۸",       cat: "mishnah" },

  // Midrash
  { id: "Midrash",        label: "Midrash",        labelFa: "میدراش",          cat: "midrash" },
  { id: "Bereshit Rabá",  label: "Bereshit Rabá",  labelFa: "بِرِشیت رَبا",     cat: "midrash" },

  // Halajá
  { id: "Rambam",  label: "Rambam",  labelFa: "رامبام",  cat: "halakhah" },

  // Cabalá
  { id: "Zohar",    label: "Zohar",    labelFa: "زوهَر",     cat: "kabbalah" },
  { id: "Tiféret",  label: "Tiféret",  labelFa: "تیفِرِت",    cat: "kabbalah" },
  { id: "Yesod",    label: "Yesod",    labelFa: "یِسود",     cat: "kabbalah" },
  { id: "Jésed",    label: "Jésed",    labelFa: "خِسِد",     cat: "kabbalah" },
  { id: "Guevurá",  label: "Guevurá",  labelFa: "گِووورا",    cat: "kabbalah" },
  { id: "Tzimtzum", label: "Tzimtzum", labelFa: "تزیمتزوم",  cat: "kabbalah" },
  { id: "Álef",     label: "Álef",     labelFa: "اَلِف",     cat: "kabbalah" },
  { id: "Nun",      label: "Nun",      labelFa: "نون",       cat: "kabbalah" },
  { id: "Sámej",    label: "Sámej",    labelFa: "سامِخ",     cat: "kabbalah" },
  { id: "Mashíaj",  label: "Mashíaj",  labelFa: "ماشیَخ",    cat: "kabbalah" },
  { id: "Najash",   label: "Najash",   labelFa: "ناخاش (مار)", cat: "kabbalah" },
  { id: "Nes",      label: "Nes",      labelFa: "نِس (معجزه/پرچم)", cat: "kabbalah" },
  { id: "Yosef",    label: "Yosef",    labelFa: "یوسف",      cat: "kabbalah" },

  // Jasidut
  { id: "Tania",  label: "Tania",  labelFa: "تانیا",  cat: "chasidut" },

  // Ciencia
  { id: "Torá y Ciencia",       label: "Torá y Ciencia",       labelFa: "تورات و علم",        cat: "ciencia" },
  { id: "Constante α (1/137)",  label: "Constante α (1/137)",  labelFa: "ثابت آلفا (۱/۱۳۷)",  cat: "ciencia" },
  { id: "Entanglement",         label: "Entanglement",         labelFa: "درهم‌تنیدگی کوانتومی", cat: "ciencia" },
];

// ─── Aristas (conexiones no dirigidas) ───────────────────────────────────
export const GEDGES: [string, string][] = [
  ["Serpiente de cobre", "Números 21"],
  ["Serpiente de cobre", "Najash"],
  ["Serpiente de cobre", "Nes"],
  ["Serpiente de cobre", "Tiféret"],
  ["Serpiente de cobre", "Refuá"],
  ["Serpiente de cobre", "Rosh Hashaná 3:8"],
  ["Serpiente de cobre", "358"],
  ["358", "Mashíaj"],
  ["358", "Najash"],
  ["358", "Zohar"],
  ["Mashíaj", "Najash"],
  ["Nes", "Nun"],
  ["Nes", "Sámej"],
  ["Nes", "Yosef"],
  ["Nes", "Berajot 4b"],
  ["Nes", "Salmos 145"],
  ["Yosef", "Yesod"],
  ["Nun", "Sámej"],
  ["Refuá", "Refael"],
  ["Refuá", "Sanador"],
  ["Refuá", "Salmos 145"],
  ["Sanador", "Éxodo 15"],
  ["Refael", "Bereshit Rabá"],
  ["Rambam", "Sanador"],
  ["137", "Torá y Ciencia"],
  ["137", "Constante α (1/137)"],
  ["137", "Zohar"],
  ["137", "Álef"],
  ["137", "Tiféret"],
  ["Torá y Ciencia", "Constante α (1/137)"],
  ["Torá y Ciencia", "Entanglement"],
  ["Entrelazamiento", "137"],
  ["Entrelazamiento", "Entanglement"],
  ["Entrelazamiento", "Jésed"],
  ["Entrelazamiento", "Guevurá"],
  ["Entrelazamiento", "Génesis 22"],
  ["26", "Mashíaj"],
  ["Jésed", "Tiféret"],
  ["Guevurá", "Tiféret"],
  ["Tiféret", "Yesod"],
  ["Tania", "Yesod"],
  ["Tania", "Zohar"],
  ["Tzimtzum", "137"],
  ["Génesis 22", "Torá"],
  ["Números 21", "Torá"],
  ["Éxodo 15", "Torá"],
  ["Salmos 145", "Torá"],
  ["Álef", "Torá"],
  ["Talmud", "Berajot 4b"],
  ["Bereshit Rabá", "Midrash"],
  ["Mishná", "Rosh Hashaná 3:8"],
  ["Linaje", "Mashíaj"],
  ["Bilaam", "Najash"],
];

// ─── PRNG determinista (mulberry32) ──────────────────────────────────────
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Hash de string → semilla entera estable
function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// ─── Forma "cerebro": elipsoide alargado + lóbulo temporal ───────────────
// Toma un punto candidato (en [-1,1]^3) y devuelve si cae dentro del volumen.
// Parámetros de la forma — fáciles de afinar.
export const BRAIN_SHAPE = {
  rx: 1.95,   // semieje X (largo, front↔back) — alargado como un cerebro real
  ry: 0.95,   // semieje Y (alto)
  rz: 1.0,    // semieje Z (ancho)
  scale: 2.4, // escala final (camera-friendly)
};

// ¿El punto normalizado (cada eje ya en unidades de semieje) está dentro del cerebro?
export function insideBrain(nx: number, ny: number, nz: number): boolean {
  // Elipsoide principal
  const main = nx * nx + ny * ny + nz * nz;
  if (main <= 1) {
    // Fisura longitudinal PROFUNDA entre los dos hemisferios (surco central,
    // de arriba hasta cerca del medio) — esto hace que se lean DOS lóbulos
    // separados, no una bola.
    if (ny > -0.28 && Math.abs(nz) < 0.13) return false;
    return true;
  }
  // Lóbulo temporal: un bulto inferior-frontal (X negativo, Y negativo)
  const lx = (nx + 0.6) / 0.55;
  const ly = (ny + 0.55) / 0.45;
  const lz = nz / 0.5;
  if (lx * lx + ly * ly + lz * lz <= 1) return true;
  return false;
}

// Genera un punto 3D (en coordenadas de mundo, ya escalado) dentro del cerebro,
// usando un PRNG sembrado. Determinista para una semilla dada.
function sampleBrainPoint(rng: () => number): [number, number, number] {
  for (let tries = 0; tries < 64; tries++) {
    const nx = rng() * 2 - 1;
    const ny = rng() * 2 - 1;
    const nz = rng() * 2 - 1;
    if (insideBrain(nx, ny, nz)) {
      return [
        nx * BRAIN_SHAPE.rx * BRAIN_SHAPE.scale,
        ny * BRAIN_SHAPE.ry * BRAIN_SHAPE.scale,
        nz * BRAIN_SHAPE.rz * BRAIN_SHAPE.scale,
      ];
    }
  }
  // Fallback (centro) — casi nunca ocurre
  return [0, 0, 0];
}

// ─── Layout de los NODOS del grafo dentro del volumen-cerebro ────────────
// Determinista por id. Se desplaza ligeramente con un offset por categoría
// para agrupar visualmente las familias, pero todo estable entre renders.
export function brainLayout(): Record<string, [number, number, number]> {
  const out: Record<string, [number, number, number]> = {};
  GNODES.forEach((n, i) => {
    // semilla combinada de id + índice → estable
    const seed = hashStr(n.id) ^ ((i + 1) * 0x9e3779b1);
    const rng = mulberry32(seed >>> 0);
    out[n.id] = sampleBrainPoint(rng);
  });
  return out;
}

// ─── Generación del "tejido" decorativo de fibras (segmentos de línea) ───
// Devuelve un Float32Array de posiciones (2 vértices por segmento), apto para
// THREE.BufferGeometry + THREE.LineSegments. Determinista.
// Cada fibra: un punto dentro del cerebro + un extremo cercano (corta).
export function brainFibers(count: number, fiberLen = 0.55, seed = 1337): Float32Array {
  const rng = mulberry32(seed >>> 0);
  const arr = new Float32Array(count * 6);
  const { rx, ry, rz, scale } = BRAIN_SHAPE;
  let n = 0;
  let guard = 0;
  while (n < count && guard < count * 20) {
    guard++;
    // dirección unitaria aleatoria → punto en la superficie del elipsoide
    let dx = rng() * 2 - 1, dy = rng() * 2 - 1, dz = rng() * 2 - 1;
    const dl = Math.hypot(dx, dy, dz) || 1; dx /= dl; dy /= dl; dz /= dl;
    // respetar la fisura central (dos hemisferios) y aplanar un poco la base
    if (dy > -0.05 && Math.abs(dz) < 0.10) continue;
    if (dy < -0.78) continue;
    // normal del elipsoide en ese punto (mundo)
    let nxw = dx / rx, nyw = dy / ry, nzw = dz / rz;
    const nl = Math.hypot(nxw, nyw, nzw) || 1; nxw /= nl; nyw /= nl; nzw /= nl;
    // tangente aleatoria perpendicular a la normal → la fibra "peina" la corteza
    let tx = rng() * 2 - 1, ty = rng() * 2 - 1, tz = rng() * 2 - 1;
    const dot = tx * nxw + ty * nyw + tz * nzw;
    tx -= dot * nxw; ty -= dot * nyw; tz -= dot * nzw;
    const tl = Math.hypot(tx, ty, tz) || 1; tx /= tl; ty /= tl; tz /= tl;
    // punto en superficie (mundo) y pelusa hacia afuera
    const px = dx * rx * scale, py = dy * ry * scale, pz = dz * rz * scale;
    const len = fiberLen * scale * (0.45 + rng() * 0.9);
    const out = (0.02 + rng() * 0.12) * scale;
    const o = n * 6;
    arr[o]     = px - tx * len * 0.5 + nxw * out * 0.25;
    arr[o + 1] = py - ty * len * 0.5 + nyw * out * 0.25;
    arr[o + 2] = pz - tz * len * 0.5 + nzw * out * 0.25;
    arr[o + 3] = px + tx * len * 0.5 + nxw * out;
    arr[o + 4] = py + ty * len * 0.5 + nyw * out;
    arr[o + 5] = pz + tz * len * 0.5 + nzw * out;
    n++;
  }
  return arr;
}

// ─── Fibras = aristas (haz de hebras curvas por conexión) ────────────────
// Cada arista del grafo se dibuja como un pequeño HAZ de hebras casi paralelas,
// y cada hebra es una curva (comba suave) en vez de un palo recto → look "fibroso".
// Todo determinista: PRNG sembrado por el par de ids de la arista.
//
// Devuelve, para una arista, un array de "hebras"; cada hebra es un Float32Array
// de posiciones de SEGMENTOS (pares de vértices), listo para LineSegments.
//
// Parámetros (offsets/comba/segmentos) se controlan desde aquí; el page.tsx
// decide cuántas hebras y el ruido, vía los argumentos.

// Construye los puntos de UNA curva (Bézier cuadrática) entre a y b, con un
// punto de control desplazado por `ctrl`. Devuelve `segs+1` puntos.
function quadCurvePoints(
  a: [number, number, number],
  b: [number, number, number],
  ctrl: [number, number, number],
  segs: number,
): [number, number, number][] {
  const pts: [number, number, number][] = [];
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const mt = 1 - t;
    // Bézier cuadrática: (1-t)^2 A + 2(1-t)t C + t^2 B
    const w0 = mt * mt;
    const w1 = 2 * mt * t;
    const w2 = t * t;
    pts.push([
      w0 * a[0] + w1 * ctrl[0] + w2 * b[0],
      w0 * a[1] + w1 * ctrl[1] + w2 * b[1],
      w0 * a[2] + w1 * ctrl[2] + w2 * b[2],
    ]);
  }
  return pts;
}

// Vector perpendicular (cualquiera) a `d`, normalizado.
function anyPerp(d: [number, number, number]): [number, number, number] {
  const ax = Math.abs(d[0]);
  const ay = Math.abs(d[1]);
  const az = Math.abs(d[2]);
  // elige el eje base menos alineado con d
  let bx = 0, by = 0, bz = 0;
  if (ax <= ay && ax <= az) bx = 1;
  else if (ay <= az) by = 1;
  else bz = 1;
  // cruz d × base
  let px = d[1] * bz - d[2] * by;
  let py = d[2] * bx - d[0] * bz;
  let pz = d[0] * by - d[1] * bx;
  const l = Math.hypot(px, py, pz) || 1;
  return [px / l, py / l, pz / l];
}

// Genera el haz de hebras de UNA arista.
//   pa, pb       posiciones de los dos nodos (mundo)
//   key          string estable para sembrar (p.ej. "idA|idB")
//   strands      nº de hebras por arista (2–3 recomendado)
//   sag          comba: cuánto se desplaza el punto medio (en unidades de mundo,
//                relativo a la longitud — ver abajo)
//   spread       separación entre hebras del haz (unidades de mundo)
//   segs         nº de segmentos por hebra (suavidad de la curva)
// Devuelve un array de hebras; cada hebra es Float32Array de SEGMENTOS
// (2 vértices por segmento → segs*6 floats).
export function edgeStrands(
  pa: [number, number, number],
  pb: [number, number, number],
  key: string,
  strands = 3,
  sag = 0.18,
  spread = 0.1,
  segs = 14,
): Float32Array[] {
  const rng = mulberry32(hashStr(key) >>> 0);
  const out: Float32Array[] = [];

  // dirección y longitud de la arista
  const dx = pb[0] - pa[0];
  const dy = pb[1] - pa[1];
  const dz = pb[2] - pa[2];
  const len = Math.hypot(dx, dy, dz) || 1;
  const dir: [number, number, number] = [dx / len, dy / len, dz / len];

  // dos perpendiculares ortonormales al eje de la arista → plano de offsets
  const u = anyPerp(dir);
  // v = dir × u
  const v: [number, number, number] = [
    dir[1] * u[2] - dir[2] * u[1],
    dir[2] * u[0] - dir[0] * u[2],
    dir[0] * u[1] - dir[1] * u[0],
  ];

  const mid: [number, number, number] = [
    (pa[0] + pb[0]) / 2,
    (pa[1] + pb[1]) / 2,
    (pa[2] + pb[2]) / 2,
  ];

  // Dirección RADIAL hacia afuera (desde el centro del cerebro) en el punto medio.
  // Arquear las fibras hacia afuera hace que tracen la "corteza" en vez de cruzar
  // el interior como cuerdas → look de tractografía (haces que abrazan el cerebro).
  const midLen = Math.hypot(mid[0], mid[1], mid[2]) || 1;
  let rad: [number, number, number] = [mid[0] / midLen, mid[1] / midLen, mid[2] / midLen];
  // Si la arista cruza hemisferios (punto medio casi en el centro), usa una
  // perpendicular para que igual arquee hacia afuera y no quede recta.
  if (midLen < 0.5 * BRAIN_SHAPE.scale) rad = u;

  for (let s = 0; s < strands; s++) {
    // offsets deterministas en el plano perpendicular (separa las hebras del haz)
    const ou = (rng() * 2 - 1) * spread;
    const ov = (rng() * 2 - 1) * spread;

    // comba proporcional a la longitud (arco hacia afuera)
    const sagAmt = sag * len * (0.7 + rng() * 0.6);
    // variación tangencial leve por hebra (que el haz no sea un arco perfecto)
    const jit = (rng() * 2 - 1) * 0.4;

    // punto de control = medio + arco radial hacia afuera + jitter + offset de hebra
    const ctrl: [number, number, number] = [
      mid[0] + rad[0] * sagAmt + u[0] * jit * sagAmt + (u[0] * ou + v[0] * ov),
      mid[1] + rad[1] * sagAmt + u[1] * jit * sagAmt + (u[1] * ou + v[1] * ov),
      mid[2] + rad[2] * sagAmt + u[2] * jit * sagAmt + (u[2] * ou + v[2] * ov),
    ];

    // extremos de la hebra: ligeramente desplazados del nodo (offset de haz)
    const sa: [number, number, number] = [
      pa[0] + (u[0] * ou + v[0] * ov),
      pa[1] + (u[1] * ou + v[1] * ov),
      pa[2] + (u[2] * ou + v[2] * ov),
    ];
    const sb: [number, number, number] = [
      pb[0] + (u[0] * ou + v[0] * ov),
      pb[1] + (u[1] * ou + v[1] * ov),
      pb[2] + (u[2] * ou + v[2] * ov),
    ];

    const pts = quadCurvePoints(sa, sb, ctrl, segs);

    // convertir a SEGMENTOS (LineSegments necesita pares de vértices)
    const arr = new Float32Array(segs * 6);
    for (let i = 0; i < segs; i++) {
      const p0 = pts[i];
      const p1 = pts[i + 1];
      const o = i * 6;
      arr[o] = p0[0]; arr[o + 1] = p0[1]; arr[o + 2] = p0[2];
      arr[o + 3] = p1[0]; arr[o + 4] = p1[1]; arr[o + 5] = p1[2];
    }
    out.push(arr);
  }
  return out;
}

// ─── Utilidades de grafo ─────────────────────────────────────────────────
// Grado (número de conexiones) por nodo.
export function nodeDegrees(): Record<string, number> {
  const deg: Record<string, number> = {};
  GNODES.forEach((n) => (deg[n.id] = 0));
  GEDGES.forEach(([a, b]) => {
    if (deg[a] !== undefined) deg[a]++;
    if (deg[b] !== undefined) deg[b]++;
  });
  return deg;
}

// Vecinos directos de un nodo.
export function neighborsOf(id: string): Set<string> {
  const s = new Set<string>();
  GEDGES.forEach(([a, b]) => {
    if (a === id) s.add(b);
    if (b === id) s.add(a);
  });
  return s;
}
