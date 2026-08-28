// Enseñanzas de Parashat Korach — una sola fuente de verdad.
// La usan el índice (page.tsx) y los layouts de cada sub-ruta (metadata SEO /
// vista previa al compartir), para que el título no se escriba en dos sitios.
// No hay versión en farsi: `tri()` cae al español y lo marca, como en todo el
// contenido curado (política honesta de idiomas).
export interface EnsenanzaKorach {
  slug: string;
  he: string;
  titulo: string;
  tituloEn: string;
  gancho: string;
  ganchoEn: string;
  numero: string;
  rom: string;
  fuente: string;
}

export const ENSENANZAS: EnsenanzaKorach[] = [
  {
    slug: "ego-espiritual",
    he: "הָאֲנִי הָרוּחָנִי",
    titulo: "El ego espiritual",
    tituloEn: "The Spiritual Ego",
    gancho: "Korach tenía razón en el diagnóstico. Se equivocó en la prescripción.",
    ganchoEn: "Korach was right about the diagnosis. He was wrong about the prescription.",
    numero: "308",
    rom: "קֹרַח · Gematría",
    fuente: "Bamidbar 16:1–18:32",
  },
  {
    slug: "luz-sin-vasija",
    he: "הַנֵּר שֶׁנִּשְׁבַּר",
    titulo: "La Luz sin Vasija",
    tituloEn: "The Light Without a Vessel",
    gancho: "Tenía la llama. No tenía la mecha. Por eso ardió.",
    ganchoEn: "He had the flame. He had no wick. That is why he burned.",
    numero: "250",
    rom: "נֵר · Ner",
    fuente: "Bamidbar 16:2 · Shmuel I 12:3",
  },
];

export function getEnsenanzaKorach(slug: string): EnsenanzaKorach | undefined {
  return ENSENANZAS.find((e) => e.slug === slug);
}
