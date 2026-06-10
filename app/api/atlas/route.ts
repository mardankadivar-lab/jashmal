import { NextResponse } from "next/server";
import { dbConfigured, getSql } from "@/lib/infra/db";
import { ensureAtlasTables, seedAtlasPlaces, getAtlasPlaces } from "@/lib/atlas/atlasStore";
import { PLACES } from "@/lib/atlas/atlasData";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Inicialización perezosa: crea la tabla y siembra (idempotente) la PRIMERA vez
// que se llama en producción, donde DATABASE_URL está inyectada. Promesa a nivel
// de módulo para no repetir el trabajo por instancia. (Mismo patrón que /api/brain.)
let initPromise: Promise<void> | null = null;
function ensureInit(): Promise<void> {
  if (!initPromise) {
    initPromise = (async () => {
      await ensureAtlasTables();
      const sql = getSql();
      if (sql) {
        const rows = (await sql`SELECT count(*)::int AS n FROM atlas_places`) as Array<{ n: number }>;
        if ((rows?.[0]?.n ?? 0) === 0) await seedAtlasPlaces();
      }
    })().catch((e) => {
      initPromise = null; // permite reintentar en la próxima llamada
      throw e;
    });
  }
  return initPromise;
}

// GET /api/atlas → todas las localidades encendidas (semilla + cosechadas).
export async function GET() {
  // Respaldo estático (semilla) — si la BD no está, el Atlas igual funciona.
  const fallback = { places: PLACES, source: "seed" as const };

  if (!dbConfigured()) {
    return NextResponse.json(fallback);
  }

  try {
    await ensureInit();
    const places = await getAtlasPlaces();
    if (places && places.length > 0) {
      return NextResponse.json(
        { places, source: "db" as const },
        { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } },
      );
    }
  } catch {
    // cae al respaldo
  }
  return NextResponse.json(fallback);
}
