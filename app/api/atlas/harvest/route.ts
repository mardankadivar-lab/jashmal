import { NextResponse } from "next/server";
import { dbConfigured, getSql } from "@/lib/infra/db";
import { ensureAtlasTables, seedAtlasPlaces, addPlace, recordPlaceHit } from "@/lib/atlas/atlasStore";
import { harvestPlacesFromStudy } from "@/lib/atlas/atlasHarvest";
import { gazetteerById } from "@/lib/atlas/atlasGazetteer";

export const runtime = "nodejs";

function originAllowed(req: Request): boolean {
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) return true;
  const origin = req.headers.get("origin");
  if (!origin) return true;
  return allowed.includes(origin);
}

// Asegura que la tabla exista y esté sembrada (la cosecha puede llegar antes de
// que alguien abra /atlas, así que no podemos confiar en el init de aquel GET).
let ready: Promise<void> | null = null;
function ensureReady(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      await ensureAtlasTables();
      const sql = getSql();
      if (sql) {
        const rows = (await sql`SELECT count(*)::int AS n FROM atlas_places`) as Array<{ n: number }>;
        if ((rows?.[0]?.n ?? 0) === 0) await seedAtlasPlaces();
      }
    })().catch((e) => {
      ready = null;
      throw e;
    });
  }
  return ready;
}

// POST /api/atlas/harvest
//   { subject, text }   → cosecha automática: detecta localidades en el estudio.
//   { placeId }         → cosecha MANUAL: enciende una localidad concreta del gazetteer.
// Disparada en segundo plano por el cliente al terminar un estudio (no bloquea).
export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: false, reason: "origin" }, { status: 403 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, reason: "no_db" });
  }

  let body: { subject?: string; text?: string; placeId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  try {
    await ensureReady();

    // ── Cosecha manual de UNA localidad ──
    const placeId = (body.placeId ?? "").toString().trim();
    if (placeId) {
      const place = gazetteerById(placeId);
      if (!place) return NextResponse.json({ ok: false, reason: "unknown_place" });
      const isNew = await addPlace(place, "approved", place.source === "seed" ? "seed" : "harvest");
      await recordPlaceHit(placeId, "manual");
      return NextResponse.json({ ok: true, added: isNew ? [placeId] : [], lit: isNew ? [] : [placeId] });
    }

    // ── Cosecha automática desde el estudio ──
    const subject = (body.subject ?? "").toString().trim();
    const text = (body.text ?? "").toString();
    if (!subject && text.length < 80) {
      return NextResponse.json({ ok: false, reason: "insufficient" });
    }
    const res = await harvestPlacesFromStudy({ subject, text });
    return NextResponse.json({ ok: true, ...res });
  } catch {
    return NextResponse.json({ ok: false, reason: "error" });
  }
}
