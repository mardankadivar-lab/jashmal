// ─────────────────────────────────────────────────────────────────────────
// atlasStore.ts — memoria del "Atlas vivo" en Postgres (Neon).
// Hermano de brainStore.ts: el Atlas lee sus localidades de la BD para poder
// CRECER sin tocar código. atlasData.PLACES queda como semilla / respaldo.
//
// Estado de cada localidad:
//   'approved'  → encendida en el Atlas (semilla, o cosechada de un gazetteer
//                 ya verificado → se enciende al instante)
//   'pending'   → reservada para futuras fuentes sin verificar
//   'rejected'  → ocultada por el Sofer
// ─────────────────────────────────────────────────────────────────────────

import { getSql } from "./db";
import { PLACES, type Place } from "./atlasData";

// ── Crear la tabla (idempotente) ──────────────────────────────────────────
export async function ensureAtlasTables(): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  await sql`
    CREATE TABLE IF NOT EXISTS atlas_places (
      id           text PRIMARY KEY,
      es           text NOT NULL,
      he           text,
      fa           text,
      lat          real NOT NULL,
      lng          real NOT NULL,
      region       text NOT NULL,
      period       text,
      importance   int  NOT NULL DEFAULT 2,
      refs         jsonb NOT NULL DEFAULT '[]'::jsonb,
      figures      jsonb NOT NULL DEFAULT '[]'::jsonb,
      sefira       text,
      description  text,
      warn         text,
      status       text NOT NULL DEFAULT 'approved',
      source       text,
      hits         int  NOT NULL DEFAULT 0,
      last_subject text,
      created_at   timestamptz NOT NULL DEFAULT now(),
      updated_at   timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS atlas_places_status ON atlas_places (status)`;
  await sql`CREATE INDEX IF NOT EXISTS atlas_places_source ON atlas_places (source)`;
  return true;
}

// ── Sembrar las 24 localidades semilla (solo inserta lo que falte) ────────
export async function seedAtlasPlaces(): Promise<number> {
  const sql = getSql();
  if (!sql) return 0;
  for (const p of PLACES) {
    await sql`
      INSERT INTO atlas_places
        (id, es, he, fa, lat, lng, region, period, importance, refs, figures, sefira, description, warn, status, source)
      VALUES
        (${p.id}, ${p.es}, ${p.he}, ${p.fa ?? null}, ${p.lat}, ${p.lng}, ${p.region}, ${p.period},
         ${p.importance}, ${JSON.stringify(p.refs)}::jsonb, ${JSON.stringify(p.figures)}::jsonb,
         ${p.sefira}, ${p.desc}, ${p.warn ?? null}, 'approved', 'seed')
      ON CONFLICT (id) DO NOTHING
    `;
  }
  return PLACES.length;
}

// ── Leer las localidades encendidas (lo que el Atlas dibuja) ──────────────
// Devuelve null si la BD no está configurada → el front usa la semilla estática.
type Row = {
  id: string; es: string; he: string | null; fa: string | null;
  lat: number; lng: number; region: string; period: string | null; importance: number;
  refs: unknown; figures: unknown; sefira: string | null; description: string | null;
  warn: string | null; source: string | null; hits: number;
};

function rowToPlace(r: Row): Place {
  return {
    id: r.id,
    es: r.es,
    he: r.he ?? "",
    fa: r.fa ?? undefined,
    lat: r.lat,
    lng: r.lng,
    region: r.region,
    period: r.period ?? "",
    importance: r.importance ?? 2,
    refs: Array.isArray(r.refs) ? (r.refs as string[]) : [],
    figures: Array.isArray(r.figures) ? (r.figures as string[]) : [],
    sefira: r.sefira ?? null,
    desc: r.description ?? "",
    warn: r.warn ?? undefined,
    hits: r.hits ?? 0,
    source: r.source ?? undefined,
  };
}

export async function getAtlasPlaces(includePending = false): Promise<Place[] | null> {
  const sql = getSql();
  if (!sql) return null;
  try {
    const statuses = includePending ? ["approved", "pending"] : ["approved"];
    const rows = (await sql`
      SELECT id, es, he, fa, lat, lng, region, period, importance,
             refs, figures, sefira, description, warn, source, hits
      FROM atlas_places
      WHERE status = ANY(${statuses})
      ORDER BY importance DESC, created_at ASC
    `) as Row[];
    return rows.map(rowToPlace);
  } catch {
    return null; // ante cualquier fallo, el front cae a la semilla estática
  }
}

// ── Cosecha: insertar una localidad NUEVA (idempotente; no duplica) ───────
// Devuelve true SOLO si la fila no existía (recién encendida) → el front puede
// celebrar el crecimiento. Re-estudiar una localidad ya presente devuelve false.
export async function addPlace(
  p: Place,
  status: "approved" | "pending" = "approved",
  source = "harvest",
): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  const r = (await sql`
    INSERT INTO atlas_places
      (id, es, he, fa, lat, lng, region, period, importance, refs, figures, sefira, description, warn, status, source)
    VALUES
      (${p.id}, ${p.es}, ${p.he}, ${p.fa ?? null}, ${p.lat}, ${p.lng}, ${p.region}, ${p.period},
       ${p.importance}, ${JSON.stringify(p.refs)}::jsonb, ${JSON.stringify(p.figures)}::jsonb,
       ${p.sefira}, ${p.desc}, ${p.warn ?? null}, ${status}, ${source})
    ON CONFLICT (id) DO NOTHING
    RETURNING id
  `) as Array<{ id: string }>;
  return r.length > 0;
}

// Subir el brillo de una localidad (la estudiaron de nuevo) y anotar el último
// estudio que la encendió — su "conexión a lo estudiado".
export async function recordPlaceHit(id: string, subject: string): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`
    UPDATE atlas_places
       SET hits = hits + 1, last_subject = ${subject.slice(0, 200)}, updated_at = now()
     WHERE id = ${id}
  `;
}

// ── Revisión del Sofer (panel admin) ──────────────────────────────────────
export type AtlasHarvested = {
  id: string; es: string; he: string | null; region: string;
  hits: number; status: string; source: string | null; last_subject: string | null;
};

// Lista las localidades COSECHADAS (no-semilla) para que el Sofer las revise.
export async function listHarvestedPlaces(): Promise<AtlasHarvested[]> {
  const sql = getSql();
  if (!sql) return [];
  try {
    return (await sql`
      SELECT id, es, he, region, hits, status, source, last_subject
      FROM atlas_places
      WHERE source IS DISTINCT FROM 'seed'
      ORDER BY updated_at DESC
      LIMIT 300
    `) as AtlasHarvested[];
  } catch {
    return [];
  }
}

export async function setPlaceStatus(
  id: string,
  status: "approved" | "pending" | "rejected",
): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`UPDATE atlas_places SET status = ${status}, updated_at = now() WHERE id = ${id}`;
}

// Borra del todo una localidad COSECHADA (nunca una semilla). A diferencia de
// 'reject' (que la oculta), esto la elimina: si luego se estudia, se enciende
// de nuevo desde cero. Útil para limpiar falsos positivos o pruebas.
export async function deletePlace(id: string): Promise<number> {
  const sql = getSql();
  if (!sql) return 0;
  const r = (await sql`
    DELETE FROM atlas_places WHERE id = ${id} AND source IS DISTINCT FROM 'seed' RETURNING id
  `) as unknown[];
  return r.length;
}

export async function countHarvested(): Promise<number> {
  const sql = getSql();
  if (!sql) return 0;
  try {
    const r = (await sql`
      SELECT count(*)::int AS n FROM atlas_places WHERE source = 'harvest' AND status = 'approved'
    `) as Array<{ n: number }>;
    return Number(r?.[0]?.n ?? 0);
  } catch {
    return 0;
  }
}
