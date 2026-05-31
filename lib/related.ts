// Recolección de fuentes conectadas desde Sefaria para el motor RAG.
// Replica el método de estudio de Mardan: traer los textos reales conectados
// a un pasaje (Targumim, comentarios, Talmud, Midrash, Cabalá, Jasidut) y
// curarlos antes de pasárselos a Claude, en vez de generar de memoria.

const BASE = "https://www.sefaria.org/api";

// Cuántas fuentes traemos por nivel (las más relevantes).
const PER_LEVEL = 5;

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&thinsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function refToApi(ref: string): string {
  // La API related da refs con espacios y comas; el endpoint de textos los acepta
  // codificados. Genesis 1:1 → "Genesis 1.1" no es necesario: encodeURIComponent basta.
  return encodeURIComponent(ref);
}

interface SefariaLink {
  ref: string;
  category?: string;
  index_title?: string;
  collectiveTitle?: { en?: string; he?: string };
  sourceHeRef?: string;
}

export interface CuratedSource {
  level: SourceLevel;
  ref: string;
  heRef: string;
  title: string; // nombre legible del autor/obra (ej. "Rashi", "Zohar")
  he: string; // texto hebreo (puede venir vacío si Sefaria no lo tiene)
  en: string; // traducción inglesa de Sefaria, si existe (ayuda a Claude)
}

export type SourceLevel =
  | "targum"
  | "commentary"
  | "talmud"
  | "midrash"
  | "kabbalah"
  | "chasidut";

// Prioridad de obras dentro de cada nivel. Las que aparezcan antes ganan.
// Decisión de Mardan (2026-05-30): para Cabalá NO imponemos un orden fijo —
// dejamos que cada pasaje hable con lo que tenga conectado. Solo damos una leve
// preferencia a los comentaristas clásicos y a los Targumim canónicos, porque
// ahí sí hay un orden de estudio tradicional esperado.
const PRIORITY: Partial<Record<SourceLevel, string[]>> = {
  commentary: [
    "Rashi",
    "Ramban",
    "Ibn Ezra",
    "Or HaChaim",
    "Sforno",
    "Kli Yakar",
    "Radak",
    "Rashbam",
  ],
  targum: ["Onkelos", "Targum Jonathan", "Targum Jerusalem", "Targum Neofiti"],
};

// Mapea la categoría de Sefaria a nuestro nivel de estudio.
function categoryToLevel(cat?: string): SourceLevel | null {
  switch (cat) {
    case "Targum":
      return "targum";
    case "Commentary":
      return "commentary";
    case "Talmud":
      return "talmud";
    case "Midrash":
      return "midrash";
    case "Kabbalah":
      return "kabbalah";
    case "Chasidut":
      return "chasidut";
    default:
      return null;
  }
}

function readableTitle(link: SefariaLink): string {
  const ct = link.collectiveTitle?.en;
  if (ct) return ct;
  const idx = link.index_title ?? link.ref;
  // "Rashbam on Genesis" → "Rashbam"
  return idx.replace(/ on .*/i, "").trim();
}

function priorityIndex(level: SourceLevel, title: string, indexTitle: string): number {
  const list = PRIORITY[level];
  if (!list) return 999;
  const hay = `${title} ${indexTitle}`.toLowerCase();
  for (let i = 0; i < list.length; i++) {
    if (hay.includes(list[i].toLowerCase())) return i;
  }
  return 999;
}

/** Selecciona las refs más relevantes por nivel (sin traer aún los textos). */
export function selectRefs(links: SefariaLink[]): Map<SourceLevel, SefariaLink[]> {
  const byLevel = new Map<SourceLevel, SefariaLink[]>();

  for (const link of links) {
    const level = categoryToLevel(link.category);
    if (!level || !link.ref) continue;
    if (!byLevel.has(level)) byLevel.set(level, []);
    byLevel.get(level)!.push(link);
  }

  // Ordenar cada nivel por prioridad y deduplicar por obra (un texto por autor).
  for (const [level, list] of byLevel) {
    list.sort(
      (a, b) =>
        priorityIndex(level, readableTitle(a), a.index_title ?? "") -
        priorityIndex(level, readableTitle(b), b.index_title ?? "")
    );
    const seen = new Set<string>();
    const deduped: SefariaLink[] = [];
    for (const l of list) {
      const key = l.index_title ?? l.ref;
      if (seen.has(key)) continue;
      seen.add(key);
      deduped.push(l);
      if (deduped.length >= PER_LEVEL) break;
    }
    byLevel.set(level, deduped);
  }

  return byLevel;
}

async function fetchSourceText(link: SefariaLink): Promise<CuratedSource | null> {
  const level = categoryToLevel(link.category);
  if (!level) return null;
  try {
    const res = await fetch(`${BASE}/texts/${refToApi(link.ref)}?context=0`, {
      // Cache en el edge: las fuentes no cambian.
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const he = Array.isArray(data.he) ? data.he.join(" ") : (data.he ?? "");
    const en = Array.isArray(data.text) ? data.text.join(" ") : (data.text ?? "");
    const heClean = stripHtml(String(he));
    const enClean = stripHtml(String(en));
    if (!heClean && !enClean) return null;
    return {
      level,
      ref: data.ref ?? link.ref,
      heRef: data.heRef ?? link.sourceHeRef ?? "",
      title: readableTitle(link),
      he: heClean.slice(0, 1500),
      en: enClean.slice(0, 1500),
    };
  } catch {
    return null;
  }
}

/** Trae /api/related y devuelve las fuentes curadas con su texto real. */
export async function gatherSources(ref: string): Promise<CuratedSource[]> {
  const apiRef = ref.replace(/ /g, ".").replace(/:/g, ".");
  let links: SefariaLink[] = [];
  try {
    const res = await fetch(`${BASE}/related/${encodeURIComponent(apiRef)}`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (res.ok) {
      const data = await res.json();
      links = Array.isArray(data.links) ? data.links : [];
    }
  } catch {
    return [];
  }
  if (links.length === 0) return [];

  const selected = selectRefs(links);
  const flat: SefariaLink[] = [];
  for (const list of selected.values()) flat.push(...list);

  // Traer los textos en paralelo (con un tope de seguridad).
  const limited = flat.slice(0, PER_LEVEL * 6);
  const results = await Promise.all(limited.map(fetchSourceText));
  return results.filter((s): s is CuratedSource => s !== null);
}

// Orden de presentación de los niveles en el prompt.
const LEVEL_ORDER: SourceLevel[] = [
  "targum",
  "commentary",
  "talmud",
  "midrash",
  "kabbalah",
  "chasidut",
];

const LEVEL_LABEL: Record<SourceLevel, string> = {
  targum: "TARGUMIM (traducciones arameas)",
  commentary: "COMENTARISTAS",
  talmud: "TALMUD",
  midrash: "MIDRASH",
  kabbalah: "CABALÁ (Sod)",
  chasidut: "JASIDUT",
};

/** Formatea las fuentes curadas como bloque de contexto para Claude. */
export function formatSourcesForPrompt(sources: CuratedSource[]): string {
  if (sources.length === 0) return "";
  const byLevel = new Map<SourceLevel, CuratedSource[]>();
  for (const s of sources) {
    if (!byLevel.has(s.level)) byLevel.set(s.level, []);
    byLevel.get(s.level)!.push(s);
  }

  const parts: string[] = [];
  for (const level of LEVEL_ORDER) {
    const list = byLevel.get(level);
    if (!list || list.length === 0) continue;
    parts.push(`\n### ${LEVEL_LABEL[level]}`);
    for (const s of list) {
      const en = s.en ? `\n  EN: ${s.en}` : "";
      parts.push(`- ${s.title} (${s.ref}):\n  HE: ${s.he}${en}`);
    }
  }
  return parts.join("\n");
}
