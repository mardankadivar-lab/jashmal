// Calendario judío de estudio: parashá de la semana + sus aliyot (lecturas
// diarias 1-7). Se obtiene desde nuestro endpoint /api/parasha (cacheado).

export interface Aliyah {
  day: number;
  ref: string;
}

export interface ParashaInfo {
  name: string; // ej. "Beha'alotcha"
  he: string; // ej. "בהעלותך"
  ref: string; // rango completo, ej. "Numbers 8:1-12:16"
  aliyot: Aliyah[]; // 7 lecturas diarias (puede venir vacío)
}

export async function getParashaHashavua(): Promise<ParashaInfo | null> {
  try {
    const res = await fetch("/api/parasha");
    if (!res.ok) return null;
    const data = await res.json();
    return data.parasha ?? null;
  } catch {
    return null;
  }
}
