import { NextResponse } from "next/server";
import { dbConfigured, getSql } from "@/lib/db";
import { ensureBrainTables, seedBrain, getBrainGraph, unifyTanakh, addMaseiStudy, addV4Content, addTreePaths, addStudies2, addStudies3, addBrit21, addMadres, addTohu, addAvrahamKab, addGilgulCainHevel, addGilgulVessels, addTikunSilencio } from "@/lib/brainStore";
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
      // Estudios verificados: Birurim + Cuerdas de vanidad
      await addStudies2();
      // Estudios verificados: 3 oraciones + Sansón + Descensos de la Shejiná
      await addStudies3();
      // Estudio verificado: 21 Pactos + Ehyé (21) → Biná
      await addBrit21();
      // Estudio verificado: Las Madres del Mashíaj (Tamar + Rut)
      await addMadres();
      // Estudio verificado: Tamar, Tohu y Tikún (las tres prendas → תֹהוּ)
      await addTohu();
      // Estudio verificado: Abraham en la Cabalá (+ Avraham→Abraham)
      await addAvrahamKab();
      // Estudio verificado: Gilgulim de Caín y Abel (Sha'ar HaGilgulim)
      await addGilgulCainHevel();
      // Capa Gilgul: vasijas de las 5 cadenas-ancla del Sha'ar HaGilgulim
      await addGilgulVessels();
      // Jidush de Mardan: El Tikún del Silencio (נחש 358 = משיח) — galaxia Jashmal
      await addTikunSilencio();
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
