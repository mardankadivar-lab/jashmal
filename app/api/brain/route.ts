import { NextResponse } from "next/server";
import { dbConfigured, getSql } from "@/lib/infra/db";
import { ensureBrainTables, seedBrain, getBrainGraph, unifyTanakh, reclassifyHarvestedDisciplines, resyncCuratedDisciplines, moveCommentatorsOutOfTanakh, addMaseiStudy, addV4Content, addTreePaths, addStudies2, addStudies3, addBrit21, addMadres, addTohu, addAvrahamKab, addAvrahamKabLote2, addGilgulCainHevel, addGilgulVessels, addTikunSilencio, addEnoch, addCommentary } from "@/lib/nodes/brainStore";
import { BNODES, BEDGES } from "@/lib/nodes/brainData";

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
      // migración: re-clasificar nodos cosechados mal categorizados (Etz Jaim,
      // Zohar, etc. que el bug del default "tanakh" metió en la galaxia de Tanaj)
      await reclassifyHarvestedDisciplines();
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
      // Lote 2 Sofer: 5 aristas nuevas de Abraham (Bereshit, Sará, Yitzjak, Brit, Tres oraciones)
      await addAvrahamKabLote2();
      // Estudio verificado: Gilgulim de Caín y Abel (Sha'ar HaGilgulim)
      await addGilgulCainHevel();
      // Capa Gilgul: vasijas de las 5 cadenas-ancla del Sha'ar HaGilgulim
      await addGilgulVessels();
      // Jidush de Mardan: El Tikún del Silencio (נחש 358 = משיח) — galaxia Jashmal
      await addTikunSilencio();
      // Jidush de Mardan: Janóoj — la gracia que asciende (Janoj a Metatron) — Jashmal
      await addEnoch();
      // Galaxia Comentarios (Parshanut): obras de comentaristas del Tanaj + autores
      await addCommentary();
      // CORRECCIÓN DE RAÍZ (galaxias mezcladas): re-sincroniza la `cat`
      // AUTORITATIVA de la semilla curada (brainData.ts) sobre la BD, para
      // descongelar nodos del núcleo cuya galaxia quedó vieja/errada (seedBrain
      // y addMaseiStudy insertan con DO NOTHING). Va al FINAL, tras sembrar todo,
      // y solo toca nodos 'seed'/'sofer' — nunca cosechados ni de comunidad.
      await resyncCuratedDisciplines();
      // Tanaj SOLO libros base: saca a comentaristas/Targumim de Tanaj/Midrash/
      // Mishná → Personajes (la persona) / Comentarios (el Targum). Va al final,
      // tras resync, para que ni la semilla ni la cosecha dejen comentaristas en Tanaj.
      await moveCommentatorsOutOfTanakh();
    })().catch((e) => {
      initPromise = null; // permite reintentar en la próxima llamada
      throw e;
    });
  }
  return initPromise;
}

export async function GET(req: Request) {
  // Respaldo estático (semilla) — si la BD no está, el cerebro igual funciona.
  const fallback = { nodes: BNODES, edges: BEDGES, source: "seed" as const };

  if (!dbConfigured()) {
    return NextResponse.json(fallback);
  }

  // ── Puerta de curaduría ──
  // Por DEFECTO la vista pública muestra SOLO lo APROBADO (semilla + cosecha
  // vetada por el Sofer). Los nodos 'pending' (cosecha nueva sin revisar) NO se
  // exponen al público. El toggle ?pending=1 solo funciona con el ADMIN_TOKEN
  // (header x-admin-token o ?token=) → así el Sofer/Mardan puede previsualizar lo
  // pendiente atenuado sin filtrarlo a cualquiera.
  const url = new URL(req.url);
  const wantsPending = url.searchParams.get("pending") === "1";
  const adminToken = process.env.ADMIN_TOKEN;
  const provided = req.headers.get("x-admin-token") || url.searchParams.get("token");
  const includePending = wantsPending && !!adminToken && provided === adminToken;

  try {
    await ensureInit();
    const g = await getBrainGraph(includePending);
    if (g && g.nodes.length > 0) {
      // Si se incluyen pendientes (vista admin), NO cachear (es contenido vivo y
      // depende del token). La vista pública aprobada sí se cachea en el borde.
      const headers = includePending
        ? { "Cache-Control": "no-store" }
        : { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" };
      return NextResponse.json({ ...g, source: "db" as const, includePending }, { headers });
    }
  } catch {
    // cae al respaldo
  }
  return NextResponse.json(fallback);
}
