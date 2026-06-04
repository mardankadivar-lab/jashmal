import { NextResponse } from "next/server";
import { dbConfigured, getSql } from "@/lib/db";
import { ensureBrainTables, seedBrain, getBrainGraph, unifyTanakh, addMaseiStudy, addV4Content, addTreePaths } from "@/lib/brainStore";
import { BNODES, BEDGES } from "@/lib/brainData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Inicialización perezosa: crea las tablas y siembra (idempotente) la PRIMERA
// vez que se llama en producción, donde DATABASE_URL está inyectada. Se guarda
// una promesa a nivel de módulo para no repetir el trabajo por instancia.
let initPromise: Promise<void> | null = null;
function ensureInit(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      await ensureBrainTables();
      const sql = getSql();
      if (sql) {
        const rows = (await sql`SELECT count(*)::int AS n FROM brain_nodes`) as Array<{ n: number }>;
        if ((rows?.[0]?.n ?? 0) === 0) await seedBrain();
      }
      // migración Brain v2: unificar Torá/Tanaj (idempotente)
      await unifyTanakh();
      // estudio verificado del Sofer: 42 estaciones / Nombre de 42 / Ana BeKoaj
      await addMaseiStudy();
      // Brain v4: personajes bíblicos + dominios temáticos (verificado por el Sofer)
      await addV4Content();
      // Brain v4.1: Netzaj/Hod + los 22 senderos del Árbol (las letras)
      await addTreePaths();
    })().catch((e) => {
      initPromise = null; // permite reintentar en la próxima llamada
      throw e;
    });
  }
  return initPromise;
}

export async function GET() {
  // Respaldo estático (semilla) — si la BD no está, el cerebro igual funciona.
  const fallback = { nodes: BNODES, edges: BEDGES, source: "seed" as const };

  if (!dbConfigured()) {
    return NextResponse.json(fallback);
  }

  try {
    await ensureInit();
    const g = await getBrainGraph();
    if (g && g.nodes.length > 0) {
      return NextResponse.json(
        { ...g, source: "db" as const },
        { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
      );
    }
  } catch {
    // cae al respaldo
  }
  return NextResponse.json(fallback);
}
