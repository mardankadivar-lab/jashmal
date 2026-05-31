import { NextResponse } from "next/server";

export const runtime = "nodejs";

const BASE = "https://www.sefaria.org/api";

// Extrae el título del libro de un ref ("Numbers 8:1-12:16" → "Numbers").
function bookOf(ref: string): string {
  const m = ref.match(/^(.*?)\s+\d/);
  return m ? m[1] : ref;
}

interface Aliyah {
  day: number;
  ref: string;
}

// GET /api/parasha → { name, he, ref, aliyot:[{day,ref}] } de la semana actual.
export async function GET() {
  try {
    const calRes = await fetch(`${BASE}/calendars`, {
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!calRes.ok) return NextResponse.json({ parasha: null });
    const cal = await calRes.json();
    const items: unknown[] = cal.calendar_items ?? [];

    let name = "";
    let he = "";
    let ref = "";
    for (const raw of items) {
      const it = raw as {
        title?: { en?: string };
        displayValue?: { en?: string; he?: string };
        ref?: string;
      };
      if (it.title?.en === "Parashat Hashavua") {
        name = it.displayValue?.en ?? "";
        he = it.displayValue?.he ?? "";
        ref = it.ref ?? "";
        break;
      }
    }
    if (!ref) return NextResponse.json({ parasha: null });

    // Aliyot (lecturas diarias 1-7) desde el índice del libro: alts.Parasha.
    const aliyot: Aliyah[] = [];
    try {
      const book = bookOf(ref);
      const idxRes = await fetch(`${BASE}/v2/index/${encodeURIComponent(book)}`, {
        next: { revalidate: 60 * 60 * 24 * 30 },
      });
      if (idxRes.ok) {
        const idx = await idxRes.json();
        const nodes: unknown[] = idx?.alts?.Parasha?.nodes ?? [];
        for (const raw of nodes) {
          const n = raw as { title?: string; refs?: string[] };
          // Coincidencia flexible del nombre de la parashá.
          const t = (n.title ?? "").replace(/['']/g, "");
          const target = name.replace(/['']/g, "");
          if (t && (t === target || t.startsWith(target) || target.startsWith(t))) {
            (n.refs ?? []).forEach((r, i) => aliyot.push({ day: i + 1, ref: r }));
            break;
          }
        }
      }
    } catch {
      /* sin aliyot: el botón de parashá completa sigue funcionando */
    }

    return NextResponse.json({ parasha: { name, he, ref, aliyot } });
  } catch {
    return NextResponse.json({ parasha: null });
  }
}
