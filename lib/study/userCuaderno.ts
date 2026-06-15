// ─────────────────────────────────────────────────────────────────────────
// userCuaderno.ts — "Cuaderno de estudio" por usuario en Neon (FASE 1 sync).
//
// Espejo del modelo local de `lib/study/cuaderno.ts`, pero ligado a la cuenta:
//   · user_cuaderno_notes      — una nota por (user_id, ref, verse).
//   · user_cuaderno_highlights — un resaltado por (user_id, ref, verse, side,
//                                 start_off, end_off, color).
//
// Mismas reglas que `userStudies.ts`: PRIVADO (siempre se filtra por user_id),
// idempotente (UPSERT por la clave natural, no duplica) y con DEGRADACIÓN
// ELEGANTE: sin DATABASE_URL todo devuelve vacío/null sin lanzar, para que el
// modo anónimo (solo localStorage) nunca se rompa.
//
// La clave (`id`) de cada fila es un hash determinista de la clave natural +
// user_id; misma fórmula en cliente y servidor para poder deduplicar al fusionar.
// ─────────────────────────────────────────────────────────────────────────
import { createHash } from "crypto";
import { getSql } from "@/lib/infra/db";

export type StoredNote = {
  ref: string;
  verse: number;
  text: string;
  lang: string | null;
  updatedAt: string; // ISO
};

export type StoredHighlight = {
  ref: string;
  verse: number;
  side: string; // 'he' | 'tr'
  start: number;
  end: number;
  color: string; // 'gold' | 'sky' | 'sage'
  updatedAt: string; // ISO
};

// ── Claves canónicas (misma fórmula en cliente y servidor) ─────────────────
export function noteKey(userId: string, ref: string, verse: number): string {
  return createHash("sha256").update(`${userId}|note|${ref}|${verse}`).digest("hex").slice(0, 32);
}

export function highlightKey(
  userId: string,
  ref: string,
  verse: number,
  side: string,
  start: number,
  end: number,
  color: string,
): string {
  return createHash("sha256")
    .update(`${userId}|hl|${ref}|${verse}|${side}|${start}|${end}|${color}`)
    .digest("hex")
    .slice(0, 32);
}

let ensured = false;
export async function ensureCuadernoTables(): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  if (ensured) return true;
  await sql`
    CREATE TABLE IF NOT EXISTS user_cuaderno_notes (
      id          text PRIMARY KEY,
      user_id     text NOT NULL,
      ref         text NOT NULL,
      verse       integer NOT NULL,
      text        text NOT NULL,
      lang        text,
      updated_at  timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS user_cuaderno_notes_user ON user_cuaderno_notes (user_id, updated_at DESC)`;
  await sql`
    CREATE TABLE IF NOT EXISTS user_cuaderno_highlights (
      id          text PRIMARY KEY,
      user_id     text NOT NULL,
      ref         text NOT NULL,
      verse       integer NOT NULL,
      face        text NOT NULL,
      start_off   integer NOT NULL,
      end_off     integer NOT NULL,
      color       text NOT NULL,
      updated_at  timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS user_cuaderno_highlights_user ON user_cuaderno_highlights (user_id, updated_at DESC)`;
  ensured = true;
  return true;
}

// ── NOTAS ──────────────────────────────────────────────────────────────────

export async function listUserNotes(userId: string, limit = 2000): Promise<StoredNote[]> {
  const sql = getSql();
  if (!sql || !userId) return [];
  await ensureCuadernoTables();
  const rows = (await sql`
    SELECT ref, verse, text, lang, updated_at
    FROM user_cuaderno_notes
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
    LIMIT ${limit}
  `) as Array<{ ref: string; verse: number; text: string; lang: string | null; updated_at: string | Date }>;
  return rows.map((r) => ({
    ref: r.ref,
    verse: r.verse,
    text: r.text,
    lang: r.lang,
    updatedAt: new Date(r.updated_at).toISOString(),
  }));
}

export async function upsertUserNote(input: {
  userId: string;
  ref: string;
  verse: number;
  text: string;
  lang?: string | null;
  updatedAt?: string;
}): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  const { userId, ref } = input;
  const verse = Number(input.verse);
  const text = String(input.text ?? "").trim();
  if (!userId || !ref || !Number.isFinite(verse) || !text) return false;
  await ensureCuadernoTables();
  const id = noteKey(userId, ref, verse);
  const lang = input.lang ?? null;
  // updated_at: respeta el del cliente si llega (para que "gane el más nuevo"
  // al subir notas locales); si no, ahora.
  const updatedAt = input.updatedAt ? new Date(input.updatedAt) : new Date();
  await sql`
    INSERT INTO user_cuaderno_notes (id, user_id, ref, verse, text, lang, updated_at)
    VALUES (${id}, ${userId}, ${ref}, ${verse}, ${text}, ${lang}, ${updatedAt.toISOString()})
    ON CONFLICT (id) DO UPDATE SET
      text = EXCLUDED.text,
      lang = EXCLUDED.lang,
      updated_at = GREATEST(user_cuaderno_notes.updated_at, EXCLUDED.updated_at)
  `;
  return true;
}

export async function deleteUserNote(userId: string, ref: string, verse: number): Promise<boolean> {
  const sql = getSql();
  if (!sql || !userId || !ref) return false;
  await ensureCuadernoTables();
  await sql`DELETE FROM user_cuaderno_notes WHERE id = ${noteKey(userId, ref, verse)}`;
  return true;
}

// ── RESALTADOS ───────────────────────────────────────────────────────────

export async function listUserHighlights(userId: string, limit = 5000): Promise<StoredHighlight[]> {
  const sql = getSql();
  if (!sql || !userId) return [];
  await ensureCuadernoTables();
  const rows = (await sql`
    SELECT ref, verse, face, start_off, end_off, color, updated_at
    FROM user_cuaderno_highlights
    WHERE user_id = ${userId}
    ORDER BY updated_at DESC
    LIMIT ${limit}
  `) as Array<{
    ref: string; verse: number; face: string; start_off: number;
    end_off: number; color: string; updated_at: string | Date;
  }>;
  return rows.map((r) => ({
    ref: r.ref,
    verse: r.verse,
    side: r.face,
    start: r.start_off,
    end: r.end_off,
    color: r.color,
    updatedAt: new Date(r.updated_at).toISOString(),
  }));
}

export async function upsertUserHighlight(input: {
  userId: string;
  ref: string;
  verse: number;
  side: string;
  start: number;
  end: number;
  color: string;
  updatedAt?: string;
}): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  const { userId, ref, side, color } = input;
  const verse = Number(input.verse);
  const start = Number(input.start);
  const end = Number(input.end);
  if (!userId || !ref || !side || !color) return false;
  if (!Number.isFinite(verse) || !Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return false;
  }
  await ensureCuadernoTables();
  const id = highlightKey(userId, ref, verse, side, start, end, color);
  const updatedAt = input.updatedAt ? new Date(input.updatedAt) : new Date();
  await sql`
    INSERT INTO user_cuaderno_highlights (id, user_id, ref, verse, face, start_off, end_off, color, updated_at)
    VALUES (${id}, ${userId}, ${ref}, ${verse}, ${side}, ${start}, ${end}, ${color}, ${updatedAt.toISOString()})
    ON CONFLICT (id) DO UPDATE SET
      updated_at = GREATEST(user_cuaderno_highlights.updated_at, EXCLUDED.updated_at)
  `;
  return true;
}

// Borra resaltados de una cara que SOLAPEN un rango (espejo de
// clearHighlightsInRange del cliente). Si start/end no llegan, borra toda la cara.
export async function deleteUserHighlights(input: {
  userId: string;
  ref: string;
  verse: number;
  side: string;
  start?: number;
  end?: number;
}): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  const { userId, ref, side } = input;
  const verse = Number(input.verse);
  if (!userId || !ref || !side || !Number.isFinite(verse)) return false;
  await ensureCuadernoTables();
  if (input.start != null && input.end != null) {
    const lo = Math.min(Number(input.start), Number(input.end));
    const hi = Math.max(Number(input.start), Number(input.end));
    await sql`
      DELETE FROM user_cuaderno_highlights
      WHERE user_id = ${userId} AND ref = ${ref} AND verse = ${verse} AND face = ${side}
        AND start_off < ${hi} AND end_off > ${lo}
    `;
  } else {
    await sql`
      DELETE FROM user_cuaderno_highlights
      WHERE user_id = ${userId} AND ref = ${ref} AND verse = ${verse} AND face = ${side}
    `;
  }
  return true;
}
