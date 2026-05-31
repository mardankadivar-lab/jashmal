// Calendario judío de estudio (Sefaria): parashá de la semana.

const BASE = "https://www.sefaria.org/api";

export interface ParashaInfo {
  name: string; // ej. "Beha'alotcha"
  he: string; // ej. "בהעלותך"
  ref: string; // ej. "Numbers 8:1-12:16"
}

/** Devuelve la parashá de la semana actual, o null si falla. */
export async function getParashaHashavua(): Promise<ParashaInfo | null> {
  try {
    const res = await fetch(`${BASE}/calendars`);
    if (!res.ok) return null;
    const data = await res.json();
    const items: unknown[] = data.calendar_items ?? [];
    for (const raw of items) {
      const it = raw as {
        title?: { en?: string };
        displayValue?: { en?: string; he?: string };
        ref?: string;
      };
      if (it.title?.en === "Parashat Hashavua") {
        return {
          name: it.displayValue?.en ?? "",
          he: it.displayValue?.he ?? "",
          ref: it.ref ?? "",
        };
      }
    }
    return null;
  } catch {
    return null;
  }
}
