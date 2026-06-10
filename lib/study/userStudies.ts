// ─────────────────────────────────────────────────────────────────────────
// userStudies.ts — "Mis Estudios": historial de estudios por usuario en Neon.
// Cada estudio generado (texto, concepto o letra) se guarda para que el
// estudiante pueda VOLVER a una enseñanza sin regenerarla (ahorra créditos de
// la API de Claude). El historial es PRIVADO: siempre se consulta por user_id.
//
// Idempotente: la clave (user_id, mode, ref, lang) identifica un estudio único;
// re-estudiar el mismo pasaje en el mismo idioma ACTUALIZA el contenido y la
// fecha en vez de duplicar la fila.
// ─────────────────────────────────────────────────────────────────────────
import { createHash } from "crypto";
import { getSql } from "./db";

export type StoredStudy = {
  key: string;          // id determinista (hash de user|mode|ref|lang)
  mode: string;         // 'text' | 'concept' | 'letter'
  ref: string;          // referencia de Sefaria, concepto o letra
  title: string;        // título legible
  content: string;      // el análisis generado
  lang: string;         // 'es' | 'fa' | 'en'
  createdAt: string;    // ISO
};

// Clave canónica de un estudio (misma fórmula en cliente y servidor).
export function studyKey(userId: string, mode: string, ref: string, lang: string): string {
  return createHash("sha256").update(`${userId}|${mode}|${ref}|${lang}`).digest("hex").slice(0, 32);
}

let ensured = false;
export async function ensureUserStudiesTable(): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  if (ensured) return true;
  await sql`
    CREATE TABLE IF NOT EXISTS user_studies (
      id          text PRIMARY KEY,
      user_id     text NOT NULL,
      mode        text NOT NULL DEFAULT 'text',
      ref         text NOT NULL,
      title       text NOT NULL,
      content     text NOT NULL,
      lang        text NOT NULL DEFAULT 'es',
      created_at  timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS user_studies_user ON user_studies (user_id, created_at DESC)`;
  ensured = true;
  return true;
}

export async function saveUserStudy(input: {
  userId: string;
  mode: string;
  ref: string;
  title: string;
  content: string;
  lang: string;
}): Promise<string | null> {
  const sql = getSql();
  if (!sql) return null;
  const { userId, mode, ref, title, content, lang } = input;
  if (!userId || !ref || !content) return null;
  await ensureUserStudiesTable();
  const id = studyKey(userId, mode, ref, lang);
  // UPSERT: re-estudiar el mismo pasaje actualiza contenido + fecha (no duplica).
  await sql`
    INSERT INTO user_studies (id, user_id, mode, ref, title, content, lang)
    VALUES (${id}, ${userId}, ${mode}, ${ref}, ${title}, ${content}, ${lang})
    ON CONFLICT (id) DO UPDATE SET
      title = EXCLUDED.title,
      content = EXCLUDED.content,
      created_at = now()
  `;
  return id;
}

export async function listUserStudies(userId: string, limit = 100): Promise<StoredStudy[]> {
  const sql = getSql();
  if (!sql || !userId) return [];
  await ensureUserStudiesTable();
  const rows = (await sql`
    SELECT id, mode, ref, title, content, lang, created_at
    FROM user_studies
    WHERE user_id = ${userId}
    ORDER BY created_at DESC
    LIMIT ${limit}
  `) as Array<{
    id: string; mode: string; ref: string; title: string;
    content: string; lang: string; created_at: string | Date;
  }>;
  return rows.map((r) => ({
    key: r.id,
    mode: r.mode,
    ref: r.ref,
    title: r.title,
    content: r.content,
    lang: r.lang,
    createdAt: new Date(r.created_at).toISOString(),
  }));
}

export async function deleteUserStudy(userId: string, key: string): Promise<boolean> {
  const sql = getSql();
  if (!sql || !userId || !key) return false;
  await sql`DELETE FROM user_studies WHERE user_id = ${userId} AND id = ${key}`;
  return true;
}
