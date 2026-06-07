// ─────────────────────────────────────────────────────────────────────────
// brainStore.ts — memoria del "cerebro vivo" en Postgres (Neon).
// El cerebro lee sus sinapsis (nodos) y conexiones (aristas) de la BD para
// poder CRECER sin tocar código. brainData.ts queda como semilla / respaldo.
//
// Estado de cada nodo/arista:
//   'approved'  → encendido en el cerebro (verificado por el Sofer / semilla)
//   'pending'   → cosechado automáticamente, espera revisión del Sofer
// ─────────────────────────────────────────────────────────────────────────

import { getSql } from "./db";
import { BNODES, BEDGES, MASEI_NODES, MASEI_EDGES, V4_NODES, V4_EDGES, TREE_NODES, TREE_PATHS, STUDY2_NODES, STUDY2_EDGES, STUDY3_NODES, STUDY3_EDGES, BRIT21_NODES, BRIT21_EDGES, MADRES_NODES, MADRES_EDGES, TOHU_NODES, TOHU_EDGES, AVRAHAM_KAB_NODES, AVRAHAM_KAB_EDGES, GILGUL_CAIN_HEVEL_NODES, GILGUL_CAIN_HEVEL_EDGES, GILGUL_VESSEL_NODES, TIKUN_SILENCIO_NODES, TIKUN_SILENCIO_EDGES, ENOCH_NODES, ENOCH_EDGES, type BNode } from "./brainData";

export type BrainGraph = { nodes: BNode[]; edges: [string, string][] };

// clave canónica de arista (no dirigida): a<b ? "a|b" : "b|a"
export function edgeKey(a: string, b: string): string {
  return a < b ? `${a}|${b}` : `${b}|${a}`;
}

// ── Crear tablas (idempotente) ────────────────────────────────────────────
export async function ensureBrainTables(): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  await sql`
    CREATE TABLE IF NOT EXISTS brain_nodes (
      id          text PRIMARY KEY,
      label       text NOT NULL,
      label_fa    text,
      cat         text NOT NULL,
      level       int  NOT NULL DEFAULT 3,
      url         text,
      region      text,
      status      text NOT NULL DEFAULT 'approved',
      source      text,
      created_at  timestamptz NOT NULL DEFAULT now()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS brain_edges (
      id          text PRIMARY KEY,
      source_id   text NOT NULL,
      target_id   text NOT NULL,
      kind        text NOT NULL DEFAULT 'rel',
      weight      real NOT NULL DEFAULT 1,
      status      text NOT NULL DEFAULT 'approved',
      origin      text,
      created_at  timestamptz NOT NULL DEFAULT now()
    )
  `;
  // columna 'author': el estudiante autor de una estrella de la galaxia Comunidad
  await sql`ALTER TABLE brain_nodes ADD COLUMN IF NOT EXISTS author text`;
  await sql`CREATE INDEX IF NOT EXISTS brain_edges_src ON brain_edges (source_id)`;
  await sql`CREATE INDEX IF NOT EXISTS brain_edges_tgt ON brain_edges (target_id)`;
  await sql`CREATE INDEX IF NOT EXISTS brain_nodes_status ON brain_nodes (status)`;
  await sql`CREATE INDEX IF NOT EXISTS brain_edges_status ON brain_edges (status)`;
  return true;
}

// ── Sembrar desde brainData (solo inserta lo que falte) ───────────────────
export async function seedBrain(): Promise<{ nodes: number; edges: number }> {
  const sql = getSql();
  if (!sql) return { nodes: 0, edges: 0 };

  // ── Nodos: una sola consulta con unnest (rápido, sin riesgo de timeout) ──
  const ids = BNODES.map((n) => n.id);
  const labels = BNODES.map((n) => n.label);
  const labelFas = BNODES.map((n) => n.labelFa ?? n.label); // labelFa es opcional → cae al español
  const cats = BNODES.map((n) => n.cat);
  const levels = BNODES.map((n) => n.level);
  const urls = BNODES.map((n) => n.url ?? null);
  const regions = BNODES.map((n) => n.region ?? null);
  await sql`
    INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
    SELECT id, label, label_fa, cat, level, url, region, 'approved', 'seed'
    FROM unnest(
      ${ids}::text[], ${labels}::text[], ${labelFas}::text[], ${cats}::text[],
      ${levels}::int[], ${urls}::text[], ${regions}::text[]
    ) AS t(id, label, label_fa, cat, level, url, region)
    ON CONFLICT (id) DO NOTHING
  `;

  // ── Aristas: una sola consulta (clave canónica deduplicada) ──
  const eids = BEDGES.map(([a, b]) => edgeKey(a, b));
  const esrc = BEDGES.map(([a]) => a);
  const etgt = BEDGES.map(([, b]) => b);
  await sql`
    INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
    SELECT id, src, tgt, 'rel', 1, 'approved', 'seed'
    FROM unnest(${eids}::text[], ${esrc}::text[], ${etgt}::text[]) AS t(id, src, tgt)
    ON CONFLICT (id) DO NOTHING
  `;

  return { nodes: BNODES.length, edges: BEDGES.length };
}

// ── Migración: unificar Torá y Tanaj en un solo núcleo (Brain v2) ─────────
// Idempotente. Fusiona el nodo duplicado 'Tanaj' dentro de 'Torá' (re-apunta
// sus conexiones como aristas canónicas Torá↔vecino), lo elimina, renombra el
// núcleo y añade Neviim/Ketuvim como las otras divisiones del Tanaj.
export async function unifyTanakh(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    // núcleo unificado + divisiones (idempotente)
    await sql`UPDATE brain_nodes SET label = 'Torá · Tanaj', label_fa = 'تورات · تنخ' WHERE id = 'Torá'`;
    await sql`INSERT INTO brain_nodes (id,label,label_fa,cat,level,status,source)
      VALUES ('Neviim','Neviim','نِویئیم (انبیا)','tanakh',1,'approved','seed') ON CONFLICT (id) DO NOTHING`;
    await sql`INSERT INTO brain_nodes (id,label,label_fa,cat,level,status,source)
      VALUES ('Ketuvim','Ketuvim','کتوویم (مکتوبات)','tanakh',1,'approved','seed') ON CONFLICT (id) DO NOTHING`;

    // ¿existe el nodo duplicado 'Tanaj'? → fusionarlo en 'Torá'
    const dup = (await sql`SELECT 1 FROM brain_nodes WHERE id = 'Tanaj' LIMIT 1`) as unknown[];
    if (dup.length > 0) {
      const nbrs = (await sql`
        SELECT DISTINCT CASE WHEN source_id = 'Tanaj' THEN target_id ELSE source_id END AS x
        FROM brain_edges WHERE source_id = 'Tanaj' OR target_id = 'Tanaj'
      `) as Array<{ x: string }>;
      for (const { x } of nbrs) {
        if (!x || x === "Tanaj" || x === "Torá") continue;
        await sql`
          INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
          VALUES (${edgeKey("Torá", x)}, 'Torá', ${x}, 'rel', 1, 'approved', 'seed')
          ON CONFLICT (id) DO NOTHING
        `;
      }
      await sql`DELETE FROM brain_edges WHERE source_id = 'Tanaj' OR target_id = 'Tanaj'`;
      await sql`DELETE FROM brain_nodes WHERE id = 'Tanaj'`;
    }

    // conectar el núcleo con Neviim/Ketuvim y Ketuvim↔Tehilim (idempotente)
    const links: [string, string][] = [["Torá", "Neviim"], ["Torá", "Ketuvim"], ["Ketuvim", "Tehilim"]];
    for (const [a, b] of links) {
      await sql`
        INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
        VALUES (${edgeKey(a, b)}, ${a}, ${b}, 'rel', 1, 'approved', 'seed')
        ON CONFLICT (id) DO NOTHING
      `;
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Estudio verificado: 42 estaciones / Nombre de 42 / Ana BeKoaj ─────────
// Inserta el estudio del Sofer como APROBADO (ya verificado). Idempotente.
// Guarda en cada arista su 'kind': 'solid' (fuente clásica) | 'interp' (meditativo).
export async function addMaseiStudy(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of MASEI_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO NOTHING
      `;
    }
    for (const e of MASEI_EDGES) {
      await sql`
        INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
        VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
      `;
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Brain v4: personajes bíblicos + dominios temáticos (verificado por el Sofer) ──
export async function addV4Content(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of V4_NODES) {
      // UPSERT: la versión verificada del Sofer gana sobre cualquier nodo
      // 'pending' previo (p.ej. creado por una expansión) con el mismo id.
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          url = COALESCE(EXCLUDED.url, brain_nodes.url),
          status = 'approved', source = 'sofer'
      `;
    }
    for (const e of V4_EDGES) {
      await sql`
        INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
        VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
      `;
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Brain v4.1: Netzaj/Hod + los 22 senderos del Árbol (con las letras) ──
export async function addTreePaths(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of TREE_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level}, 'approved', 'seed')
        ON CONFLICT (id) DO UPDATE SET status = 'approved', cat = EXCLUDED.cat, level = EXCLUDED.level
      `;
    }
    for (const p of TREE_PATHS) {
      await sql`
        INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
        VALUES (${edgeKey(p.from, p.to)}, ${p.from}, ${p.to}, 'tree', 1, 'approved', 'seed')
        ON CONFLICT (id) DO UPDATE SET status = 'approved'
      `;
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Estudios: Birurim + Cuerdas de vanidad (verificado por el Sofer) ──
export async function addStudies2(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of STUDY2_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          url = COALESCE(EXCLUDED.url, brain_nodes.url),
          status = 'approved', source = 'sofer'
      `;
    }
    for (const e of STUDY2_EDGES) {
      await sql`
        INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
        VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
      `;
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Estudios: 3 oraciones + Sansón + Descensos de la Shejiná (Sofer) ──
export async function addStudies3(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of STUDY3_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          url = COALESCE(EXCLUDED.url, brain_nodes.url),
          status = 'approved', source = 'sofer'
      `;
    }
    for (const e of STUDY3_EDGES) {
      await sql`
        INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
        VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
      `;
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Estudio: 21 Pactos (Britot) + Ehyé (21) → Biná (verificado por el Sofer) ──
export async function addBrit21(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of BRIT21_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          url = COALESCE(EXCLUDED.url, brain_nodes.url),
          status = 'approved', source = 'sofer'
      `;
    }
    for (const e of BRIT21_EDGES) {
      await sql`
        INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
        VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
      `;
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Estudio: Las Madres del Mashíaj (Tamar + Rut) (verificado por el Sofer) ──
export async function addMadres(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    // Renombrar el hub EXISTENTE "Linaje" → "Linaje · Madres del Mashíaj".
    // El nodo ya fue sembrado antes con el label viejo; sólo se actualizan los
    // dos campos de texto (su url /linaje y demás campos quedan intactos).
    await sql`
      UPDATE brain_nodes
         SET label = 'Linaje · Madres del Mashíaj', label_fa = 'تبار · مادران ماشیح'
       WHERE id = 'Linaje'
    `;
    for (const n of MADRES_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          url = COALESCE(EXCLUDED.url, brain_nodes.url),
          status = 'approved', source = 'sofer'
      `;
    }
    for (const e of MADRES_EDGES) {
      await sql`
        INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
        VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
      `;
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Estudio: Tamar, Tohu y Tikún (las tres prendas → תֹהוּ) (Sofer) ──
// Las tres prendas que Tamar pide (Bereshit 38:18) deletrean תֹהוּ (Tohu).
// Lectura de derash/sod (jidush simbólico). UPSERT: la versión verificada gana
// sobre cualquier nodo 'pending' previo con el mismo id; corrige la url.
export async function addTohu(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of TOHU_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          url = COALESCE(EXCLUDED.url, brain_nodes.url),
          status = 'approved', source = 'sofer'
      `;
    }
    for (const e of TOHU_EDGES) {
      await sql`
        INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
        VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
      `;
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Estudio: Abraham en la Cabalá (Sofer, verificado en Sefaria) ──────────
// Ancla a Abraham en la dimensión cabalística con AUTORIDAD clásica (Zohar,
// Sefer Yetzirá, midrash). UPSERT idempotente; corrige el label Avraham→Abraham.
export async function addAvrahamKab(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of AVRAHAM_KAB_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          url = COALESCE(EXCLUDED.url, brain_nodes.url),
          status = 'approved', source = 'sofer'
      `;
    }
    for (const e of AVRAHAM_KAB_EDGES) {
      await sql`
        INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
        VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
      `;
    }
    // corrige el nombre del patriarca en la BD: Avraham → Abraham (id intacto)
    await sql`UPDATE brain_nodes SET label = 'Abraham', label_fa = 'ابراهیم' WHERE id = 'Avraham'`;
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Estudio: Gilgulim de Caín y Abel (Sofer · Sha'ar HaGilgulim del Arí) ───
export async function addGilgulCainHevel(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of GILGUL_CAIN_HEVEL_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          url = COALESCE(EXCLUDED.url, brain_nodes.url),
          status = 'approved', source = 'sofer'
      `;
    }
    for (const e of GILGUL_CAIN_HEVEL_EDGES) {
      try {
        await sql`
          INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
          VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
          ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
        `;
      } catch { /* arista a nodo inexistente → se ignora, no rompe el resto */ }
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Capa Gilgul: vasijas del Sha'ar HaGilgulim (verificadas por el Sofer) ──
// Inserta SOLO los nodos-vasija de las 5 cadenas-ancla (Caín→Akiva, Pinjás→
// Eliyahu, Hevel→Moshé, Zihará Ilá'a→R. Yishmael, Harán→Zejariá, + raíz oscura
// Laván→Bilaam→Naval) que no existían. Las "aristas" de gilgul NO van al grafo
// del cerebro: viven en lib/gilgul.ts (SOFER_GILGUL_LINKS) y las dibuja la capa
// GilgulLayer aparte. Aquí solo garantizamos que cada from/to exista en la BD.
// UPSERT idempotente: la versión verificada del Sofer gana sobre cualquier
// 'pending' previo con el mismo id.
export async function addGilgulVessels(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    // Limpieza de auditoría (Sofer): borra la arista FALSA Abel↔Naval del cerebro.
    // Naval es de la raíz de Laván, no de Hevel. Las migraciones solo AGREGAN, así
    // que la arista ya seedeada en la BD hay que eliminarla explícitamente.
    await sql`DELETE FROM brain_edges WHERE id = ${edgeKey("Abel", "Naval")}`;
    for (const n of GILGUL_VESSEL_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          status = 'approved', source = 'sofer'
      `;
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Jidush de Mardan: "El Tikún del Silencio" (נחש 358 = משיח) — vetado Sofer ──
export async function addTikunSilencio(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of TIKUN_SILENCIO_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          url = COALESCE(EXCLUDED.url, brain_nodes.url),
          status = 'approved', source = 'sofer'
      `;
    }
    for (const e of TIKUN_SILENCIO_EDGES) {
      try {
        await sql`
          INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
          VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
          ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
        `;
      } catch { /* arista a nodo inexistente → se ignora */ }
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Jidush de Mardan: "Janóoj — la gracia que asciende" (חנוך → Metatrón) ──
// Vetado por el Sofer; guardarraíl teológico (Metatrón = ángel/siervo, jamás un
// segundo poder). Reusa el nodo "Janoj" (capa Gilgul) y "Tikún del Silencio".
export async function addEnoch(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  try {
    for (const n of ENOCH_NODES) {
      await sql`
        INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
        VALUES (${n.id}, ${n.label}, ${n.labelFa}, ${n.cat}, ${n.level},
                ${n.url ?? null}, ${n.region ?? null}, 'approved', 'sofer')
        ON CONFLICT (id) DO UPDATE SET
          label = EXCLUDED.label, label_fa = EXCLUDED.label_fa,
          cat = EXCLUDED.cat, level = EXCLUDED.level,
          url = COALESCE(EXCLUDED.url, brain_nodes.url),
          status = 'approved', source = 'sofer'
      `;
    }
    for (const e of ENOCH_EDGES) {
      try {
        await sql`
          INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
          VALUES (${edgeKey(e.a, e.b)}, ${e.a}, ${e.b}, ${e.kind}, 1, 'approved', 'sofer')
          ON CONFLICT (id) DO UPDATE SET kind = EXCLUDED.kind, status = 'approved'
        `;
      } catch { /* arista a nodo inexistente → se ignora */ }
    }
  } catch {
    /* nunca romper la lectura del cerebro */
  }
}

// ── Leer el grafo aprobado (lo que el cerebro enciende) ───────────────────
// Devuelve null si la BD no está configurada → el front usa la semilla estática.
export async function getBrainGraph(includePending = false): Promise<BrainGraph | null> {
  const sql = getSql();
  if (!sql) return null;
  try {
    const statuses = includePending ? ["approved", "pending"] : ["approved"];
    const nodeRows = (await sql`
      SELECT id, label, label_fa, cat, level, url, region, author
      FROM brain_nodes
      WHERE status = ANY(${statuses})
    `) as Array<{
      id: string; label: string; label_fa: string | null; cat: string;
      level: number; url: string | null; region: string | null; author: string | null;
    }>;
    const edgeRows = (await sql`
      SELECT source_id, target_id
      FROM brain_edges
      WHERE status = ANY(${statuses})
    `) as Array<{ source_id: string; target_id: string }>;

    const ids = new Set(nodeRows.map((r) => r.id));
    const nodes: BNode[] = nodeRows.map((r) => ({
      id: r.id,
      label: r.label,
      labelFa: r.label_fa ?? r.label,
      cat: r.cat,
      level: (r.level as BNode["level"]) ?? 3,
      url: r.url ?? undefined,
      region: r.region ?? undefined,
      author: r.author ?? undefined,
    }));
    // solo aristas cuyos dos extremos existen
    const edges: [string, string][] = edgeRows
      .filter((r) => ids.has(r.source_id) && ids.has(r.target_id))
      .map((r) => [r.source_id, r.target_id] as [string, string]);
    return { nodes, edges };
  } catch {
    return null; // ante cualquier fallo, el front cae a la semilla estática
  }
}

// ── Alimentación: insertar nodos/aristas nuevos (B2 — cosecha de estudios) ──
// status por defecto 'pending' → el Sofer aprueba antes de encender.
export async function addNode(
  node: BNode,
  status: "approved" | "pending" = "pending",
  source = "study",
): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  await sql`
    INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, region, status, source)
    VALUES (${node.id}, ${node.label}, ${node.labelFa}, ${node.cat}, ${node.level},
            ${node.url ?? null}, ${node.region ?? null}, ${status}, ${source})
    ON CONFLICT (id) DO NOTHING
  `;
  return true;
}

export async function addEdge(
  a: string,
  b: string,
  status: "approved" | "pending" = "pending",
  origin = "study",
): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  if (a === b) return false;
  const key = edgeKey(a, b);
  await sql`
    INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
    VALUES (${key}, ${a}, ${b}, 'rel', 1, ${status}, ${origin})
    ON CONFLICT (id) DO UPDATE SET weight = brain_edges.weight + 0.5
  `;
  return true;
}

// ── Comunidad · Puerta 2: encender la estrella de un estudiante ────────────
// Crea el nodo del jidush en la galaxia 'comunidad' (con el NOMBRE del autor) y
// lo conecta al concepto elegido con una arista 'interp' — un jidush SIEMPRE es
// interpretación, nunca fuente clásica. El target debe existir y estar aprobado.
// Idempotente (re-aprobar actualiza título/autor sin duplicar).
export async function addCommunityStar(input: {
  id: string;
  label: string;
  labelFa?: string | null;
  author: string;
  url?: string | null;
  targetId: string;
}): Promise<{ ok: boolean; error?: string }> {
  const sql = getSql();
  if (!sql) return { ok: false, error: "no_db" };
  try {
    const t = (await sql`
      SELECT id FROM brain_nodes WHERE id = ${input.targetId} AND status = 'approved' LIMIT 1
    `) as Array<{ id: string }>;
    if (t.length === 0) return { ok: false, error: "target_not_found" };
    await sql`
      INSERT INTO brain_nodes (id, label, label_fa, cat, level, url, status, source, author)
      VALUES (${input.id}, ${input.label}, ${input.labelFa ?? input.label}, 'comunidad', 4,
              ${input.url ?? null}, 'approved', 'community', ${input.author})
      ON CONFLICT (id) DO UPDATE
        SET label = EXCLUDED.label, label_fa = EXCLUDED.label_fa, author = EXCLUDED.author
    `;
    await sql`
      INSERT INTO brain_edges (id, source_id, target_id, kind, weight, status, origin)
      VALUES (${edgeKey(input.id, input.targetId)}, ${input.id}, ${input.targetId}, 'interp', 1, 'approved', 'community')
      ON CONFLICT (id) DO NOTHING
    `;
    return { ok: true };
  } catch {
    return { ok: false, error: "db_error" };
  }
}

// Lista las estrellas ENCENDIDAS de la galaxia Comunidad (para moderarlas).
export type CommunityStar = { id: string; label: string; author: string | null; connectsTo: string };
export async function listCommunityStars(): Promise<CommunityStar[]> {
  const sql = getSql();
  if (!sql) return [];
  try {
    return (await sql`
      SELECT n.id, n.label, n.author,
        COALESCE((
          SELECT CASE WHEN e.source_id = n.id THEN e.target_id ELSE e.source_id END
          FROM brain_edges e
          WHERE (e.source_id = n.id OR e.target_id = n.id) AND e.origin = 'community' AND e.status = 'approved'
          LIMIT 1
        ), '') AS "connectsTo"
      FROM brain_nodes n
      WHERE n.cat = 'comunidad' AND n.status = 'approved'
      ORDER BY n.created_at DESC
    `) as CommunityStar[];
  } catch {
    return [];
  }
}

// ── Revisión del Sofer (panel) ────────────────────────────────────────────
// ids de nodos YA existentes (cualquier estado) → para que la cosecha reutilice
// el nodo canónico en vez de crear duplicados con otra grafía.
export async function existingNodeIds(): Promise<Map<string, string>> {
  const sql = getSql();
  const map = new Map<string, string>(); // lowercase → id real
  if (!sql) return map;
  try {
    const rows = (await sql`SELECT id FROM brain_nodes`) as Array<{ id: string }>;
    for (const r of rows) map.set(r.id.toLowerCase(), r.id);
  } catch {
    /* ignore */
  }
  return map;
}

export type PendingNode = {
  id: string; label: string; cat: string; level: number; url: string | null; source: string | null;
  dup?: boolean; // true si su etiqueta ya existe (aprobada) o se repite en la cosecha
};

// normaliza una etiqueta para detectar duplicados (minúsculas, sin acentos/puntuación)
function normLabel(s: string): string {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-֑ͯ-ׇ]/g, "")
    .replace(/[^\p{L}\p{N} ]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}
export type PendingEdge = {
  id: string; source_id: string; target_id: string; source_label: string | null; target_label: string | null; origin: string | null;
};

export async function listPending(): Promise<{ nodes: PendingNode[]; edges: PendingEdge[] }> {
  const sql = getSql();
  if (!sql) return { nodes: [], edges: [] };
  const nodes = (await sql`
    SELECT id, label, cat, level, url, source
    FROM brain_nodes WHERE status = 'pending'
    ORDER BY created_at DESC LIMIT 300
  `) as PendingNode[];
  const edges = (await sql`
    SELECT e.id, e.source_id, e.target_id, e.origin,
           ns.label AS source_label, nt.label AS target_label
    FROM brain_edges e
    LEFT JOIN brain_nodes ns ON ns.id = e.source_id
    LEFT JOIN brain_nodes nt ON nt.id = e.target_id
    WHERE e.status = 'pending'
    ORDER BY e.created_at DESC LIMIT 300
  `) as PendingEdge[];
  // marca duplicados: etiqueta que ya existe (aprobada) o repetida en la cosecha
  const approved = (await sql`SELECT label FROM brain_nodes WHERE status = 'approved'`) as { label: string }[];
  const approvedSet = new Set(approved.map((a) => normLabel(a.label)));
  const seen = new Set<string>();
  for (const n of nodes) {
    const key = normLabel(n.label);
    n.dup = approvedSet.has(key) || seen.has(key);
    seen.add(key);
  }
  return { nodes, edges };
}

export async function countPending(): Promise<number> {
  const sql = getSql();
  if (!sql) return 0;
  try {
    const r = (await sql`
      SELECT (SELECT count(*) FROM brain_nodes WHERE status='pending')
           + (SELECT count(*) FROM brain_edges WHERE status='pending') AS n
    `) as Array<{ n: number }>;
    return Number(r?.[0]?.n ?? 0);
  } catch {
    return 0;
  }
}

export async function setNodeStatus(id: string, status: "approved" | "rejected"): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`UPDATE brain_nodes SET status = ${status} WHERE id = ${id}`;
  // al aprobar un nodo, aprueba también sus aristas pendientes entre nodos aprobados
  if (status === "approved") {
    await sql`
      UPDATE brain_edges SET status = 'approved'
      WHERE status = 'pending'
        AND (source_id = ${id} OR target_id = ${id})
        AND source_id IN (SELECT id FROM brain_nodes WHERE status='approved')
        AND target_id IN (SELECT id FROM brain_nodes WHERE status='approved')
    `;
  }
}

export async function setEdgeStatus(id: string, status: "approved" | "rejected"): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`UPDATE brain_edges SET status = ${status} WHERE id = ${id}`;
}

// Aprobar / rechazar TODO lo pendiente de una vez (botón "aprobar todo").
export async function setAllPending(status: "approved" | "rejected"): Promise<{ nodes: number; edges: number }> {
  const sql = getSql();
  if (!sql) return { nodes: 0, edges: 0 };
  if (status === "approved") {
    const n = (await sql`UPDATE brain_nodes SET status = 'approved' WHERE status = 'pending' RETURNING id`) as unknown[];
    // aprobar las aristas pendientes cuyos DOS extremos ya están aprobados
    const e = (await sql`
      UPDATE brain_edges SET status = 'approved'
      WHERE status = 'pending'
        AND source_id IN (SELECT id FROM brain_nodes WHERE status = 'approved')
        AND target_id IN (SELECT id FROM brain_nodes WHERE status = 'approved')
      RETURNING id
    `) as unknown[];
    return { nodes: n.length, edges: e.length };
  }
  const n = (await sql`UPDATE brain_nodes SET status = 'rejected' WHERE status = 'pending' RETURNING id`) as unknown[];
  const e = (await sql`UPDATE brain_edges SET status = 'rejected' WHERE status = 'pending' RETURNING id`) as unknown[];
  return { nodes: n.length, edges: e.length };
}

// Rechazar (quitar del cerebro) una lista de nodos por id — para limpiar lo feo
// o duplicado que se haya aprobado por error. Funciona aunque ya estén 'approved'.
export async function rejectNodeIds(ids: string[]): Promise<number> {
  const sql = getSql();
  if (!sql || !ids.length) return 0;
  const r = (await sql`UPDATE brain_nodes SET status = 'rejected' WHERE id = ANY(${ids}) RETURNING id`) as unknown[];
  return r.length;
}

// Aprobar una lista de nodos por id (selección múltiple del panel). Al aprobarlos,
// también aprueba las aristas pendientes cuyos dos extremos ya están aprobados.
export async function approveNodeIds(ids: string[]): Promise<{ nodes: number; edges: number }> {
  const sql = getSql();
  if (!sql || !ids.length) return { nodes: 0, edges: 0 };
  const n = (await sql`UPDATE brain_nodes SET status = 'approved' WHERE id = ANY(${ids}) RETURNING id`) as unknown[];
  const e = (await sql`
    UPDATE brain_edges SET status = 'approved'
    WHERE status = 'pending'
      AND source_id IN (SELECT id FROM brain_nodes WHERE status = 'approved')
      AND target_id IN (SELECT id FROM brain_nodes WHERE status = 'approved')
    RETURNING id
  `) as unknown[];
  return { nodes: n.length, edges: e.length };
}
