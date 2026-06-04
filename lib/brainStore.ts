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
import { BNODES, BEDGES, type BNode } from "./brainData";

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
  const labelFas = BNODES.map((n) => n.labelFa);
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

// ── Leer el grafo aprobado (lo que el cerebro enciende) ───────────────────
// Devuelve null si la BD no está configurada → el front usa la semilla estática.
export async function getBrainGraph(includePending = false): Promise<BrainGraph | null> {
  const sql = getSql();
  if (!sql) return null;
  try {
    const statuses = includePending ? ["approved", "pending"] : ["approved"];
    const nodeRows = (await sql`
      SELECT id, label, label_fa, cat, level, url, region
      FROM brain_nodes
      WHERE status = ANY(${statuses})
    `) as Array<{
      id: string; label: string; label_fa: string | null; cat: string;
      level: number; url: string | null; region: string | null;
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
};
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
