// ─────────────────────────────────────────────────────────────────────────
// myStudies.ts — "Mis Estudios" del lado del CLIENTE.
// Guarda cada estudio generado en localStorage (historial por dispositivo) y,
// si el usuario tiene sesión, también lo envía al servidor (Neon) para que
// quede ligado a su cuenta y lo recupere en otros dispositivos.
//
// El cliente NO conoce el user_id, así que usa una clave estable e
// independiente del usuario: `${mode}::${ref}::${lang}` (cid). El servidor usa
// su propia clave con el user_id; al fusionar (página Mis Estudios) se deduplica
// por este cid recalculado desde mode/ref/lang.
// ─────────────────────────────────────────────────────────────────────────

export type LocalStudy = {
  cid: string;          // clave estable mode::ref::lang
  mode: string;         // 'text' | 'concept' | 'letter'
  ref: string;          // referencia, concepto o letra
  title: string;
  content: string;
  lang: string;
  createdAt: string;    // ISO
};

const KEY = "jashmal_studies";
const MAX = 200;

export function cidFor(mode: string, ref: string, lang: string): string {
  return `${mode}::${ref}::${lang}`;
}

export function listLocal(): LocalStudy[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as LocalStudy[];
    if (!Array.isArray(arr)) return [];
    return arr;
  } catch {
    return [];
  }
}

function writeLocal(list: LocalStudy[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
  } catch {
    /* cuota llena u otro fallo: el historial local nunca debe romper la app */
  }
}

// Guarda un estudio: localStorage SIEMPRE; servidor si hay sesión (fire-and-forget).
export function saveStudyHistory(input: {
  mode: string;
  ref: string;
  title: string;
  content: string;
  lang: string;
}): void {
  const { mode, ref, title, content, lang } = input;
  if (!ref || !content || content.trim().length < 20) return;
  const cid = cidFor(mode, ref, lang);
  const entry: LocalStudy = {
    cid, mode, ref,
    title: title || ref,
    content,
    lang,
    createdAt: new Date().toISOString(),
  };
  // localStorage: upsert por cid, más reciente primero.
  const rest = listLocal().filter((s) => s.cid !== cid);
  writeLocal([entry, ...rest]);

  // servidor: solo persiste si hay sesión; si es anónimo, el endpoint responde
  // { anon:true } y no hace nada (ya quedó en localStorage).
  try {
    void fetch("/api/my-studies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, ref, title: entry.title, content, lang }),
    }).catch(() => {});
  } catch {
    /* noop */
  }
}

export function deleteLocal(cid: string): void {
  writeLocal(listLocal().filter((s) => s.cid !== cid));
}

// Búsqueda en el historial local (título / referencia / contenido).
export function searchLocal(q: string, limit = 5): LocalStudy[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  const hits: LocalStudy[] = [];
  for (const s of listLocal()) {
    if (
      s.title.toLowerCase().includes(needle) ||
      s.ref.toLowerCase().includes(needle) ||
      s.content.toLowerCase().includes(needle)
    ) {
      hits.push(s);
      if (hits.length >= limit) break;
    }
  }
  return hits;
}
