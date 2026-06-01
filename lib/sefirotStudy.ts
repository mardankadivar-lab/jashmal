// Textos de estudio asociados a cada sefirá, ordenados por el roadmap de Mardan.
// Basado en: Séfer Yetzirá → Zohar → Pardés Rimonim → Etz Jaim → Hishtalshelut.

export interface StudyText {
  title: string;       // nombre del texto
  author: string;      // maestro/tradición
  ref?: string;        // ref de Sefaria si existe
  level: 1 | 2 | 3 | 4 | 5 | 6; // nivel del roadmap
  note: string;        // por qué estudiar este texto para esta sefirá
}

const ROADMAP_LEVELS = {
  1: "Séfer Yetzirá — fundamentos",
  2: "Zohar — visión mística",
  3: "Pardés Rimonim — sistematización",
  4: "Etz Jaim — Cabalá luriánica",
  5: "Hishtalshelut — concatenación",
  6: "Introducción accesible",
};

// Textos por sefirá
export const SEFIRA_STUDY: Record<string, StudyText[]> = {
  keter: [
    { title: "Séfer Yetzirá, cap. 1", author: "Tradición antigua", ref: "Sefer Yetzirah", level: 1,
      note: "Las diez sefirot belimah — 'sin nada' — Kéter como el primero sin precedente." },
    { title: "Idra Zuta — La gran asamblea menor", author: "Zohar", ref: "Zohar", level: 2,
      note: "Arij Anpín (el 'Rostro Largo') — el Partzuf de Kéter, expresión de la voluntad infinita." },
    { title: "Etz Jaim — Héijal Adam Kadmón", author: "Arí / Jaim Vital", level: 4,
      note: "Adam Kadmón como primer vaso de la emanación. El kav (rayo) que penetra desde Ein Sof." },
    { title: "Pardés Rimonim, Sha'ar 1", author: "Ramak (R. Moshé Cordovero)", level: 3,
      note: "Kéter como voluntad pura, unidad indivisa, punto de conexión con Ein Sof." },
  ],
  chochmah: [
    { title: "Séfer Yetzirá, cap. 1-2", author: "Tradición antigua", ref: "Sefer Yetzirah", level: 1,
      note: "Las diez sefirot y las 22 letras — Jojmá como el punto primordial de la sabiduría." },
    { title: "Sifra de-Tzeniuta", author: "Zohar", ref: "Zohar", level: 2,
      note: "El Libro de la Ocultación — las primeras configuraciones de Jojmá y Biná (Aba e Ima)." },
    { title: "Etz Jaim — Sha'ar HaAkudim", author: "Arí / Jaim Vital", level: 5,
      note: "Las luces 'atadas' — primer estado de Jojmá antes de la shevirá (rotura de los vasos)." },
    { title: "Pardés Rimonim, Sha'ar 2", author: "Ramak", level: 3,
      note: "Jojmá como el primer punto: la intuición pura, el destello antes del pensamiento." },
    { title: "Inner Space, cap. 2", author: "Aryeh Kaplan", level: 6,
      note: "Explicación accesible de la Sabiduría divina y su relación con la Torah." },
  ],
  binah: [
    { title: "Idra Rabba — La gran asamblea", author: "Zohar", ref: "Zohar", level: 2,
      note: "Ima (la Madre superior) — Biná como el palacio que da forma al pensamiento emanado de Jojmá." },
    { title: "Etz Jaim — Sha'ar HaNekudim", author: "Arí / Jaim Vital", level: 5,
      note: "Las 'luces-puntos' — Biná organiza las luces de Jojmá en una estructura coherente." },
    { title: "Pardés Rimonim, Sha'ar 3", author: "Ramak", level: 3,
      note: "Biná como entendimiento: la capacidad de separar, analizar y comprender." },
    { title: "13 Petalled Rose, cap. 1", author: "Rab Adin Steinsaltz", level: 6,
      note: "La Madre superior y los mundos superiores, en lenguaje contemporáneo." },
  ],
  chesed: [
    { title: "Zohar — Vaiejí", author: "Zohar", ref: "Zohar", level: 2,
      note: "Jésed como el pilar derecho, la misericordia ilimitada del patriarca Abraham." },
    { title: "Pardés Rimonim, Sha'ar 8", author: "Ramak", level: 3,
      note: "Las tres columnas del árbol: Jésed (derecha), Guevurá (izquierda), Tiferet (centro)." },
    { title: "Etz Jaim — Sha'ar HaPartzufim", author: "Arí / Jaim Vital", level: 5,
      note: "Zeir Anpín y su brazo derecho — Jésed como la hesura (fuerza expansiva) del amor." },
  ],
  gevurah: [
    { title: "Zohar — Mishpatim", author: "Zohar", ref: "Zohar", level: 2,
      note: "Guevurá como el rigor divino — el secreto del Juicio y el patriarca Isaac." },
    { title: "Pardés Rimonim, Sha'ar 8", author: "Ramak", level: 3,
      note: "El pilar izquierdo: el límite necesario que da forma a la misericordia." },
    { title: "Etz Jaim — Tikún", author: "Arí / Jaim Vital", level: 4,
      note: "Después de la shevirá: cómo Guevurá participa en el proceso de rectificación." },
  ],
  tiferet: [
    { title: "Idra Rabba", author: "Zohar", ref: "Zohar", level: 2,
      note: "Zeir Anpín — el Partzuf de Tiferet. El 'Hijo' que integra las energías superiores." },
    { title: "Pardés Rimonim, Sha'ar 9", author: "Ramak", level: 3,
      note: "Tiferet como corazón del árbol: la armonía entre Jésed y Guevurá. El nombre YHVH." },
    { title: "Etz Jaim — Adam Kadmón", author: "Arí / Jaim Vital", level: 4,
      note: "Tiferet como el punto de equilibrio cósmico: el canal entre lo alto y lo bajo." },
    { title: "Inner Space, cap. 4", author: "Aryeh Kaplan", level: 6,
      note: "La Belleza divina y el nombre de cuatro letras (YHVH) asociado a Tiferet." },
  ],
  netzach: [
    { title: "Zohar — Bejalotejá", author: "Zohar", ref: "Zohar", level: 2,
      note: "Netzaj como la eternidad y el deseo divino — el instinto creativo de Dios." },
    { title: "Pardés Rimonim, Sha'ar 10", author: "Ramak", level: 3,
      note: "Netzaj y Hod: los dos pilares inferiores que transmiten la energía a Yesod." },
    { title: "Etz Jaim — Partzufim", author: "Arí / Jaim Vital", level: 4,
      note: "Netzaj como la pierna derecha de Zeir Anpín — el movimiento hacia la manifestación." },
  ],
  hod: [
    { title: "Zohar — Bejalotejá", author: "Zohar", ref: "Zohar", level: 2,
      note: "Hod como el esplendor divino — la resonancia del eco de las sefirot superiores." },
    { title: "Pardés Rimonim, Sha'ar 10", author: "Ramak", level: 3,
      note: "La pierna izquierda del árbol: Hod transmite el rigor hacia Yesod en forma ordenada." },
    { title: "Etz Jaim — Orot ve-Kelim", author: "Arí / Jaim Vital", level: 4,
      note: "Luces y vasos — Hod como el vaso que da forma al esplendor de Netzaj." },
  ],
  yesod: [
    { title: "Pardés Rimonim, Sha'ar 11", author: "Ramak", level: 3,
      note: "Yesod como el canal del pacto — todo fluye hacia Maljut a través de Yesod." },
    { title: "Zohar — Lej Lejá", author: "Zohar", ref: "Zohar", level: 2,
      note: "El pacto de Abraham — Yesod como el brit (pacto) que une los mundos superiores e inferiores." },
    { title: "Etz Jaim — Tikún", author: "Arí / Jaim Vital", level: 4,
      note: "Yesod rectificado: el canal purificado que transmite la abundancia divina a Maljut." },
    { title: "13 Petalled Rose, cap. 3", author: "Rab Adin Steinsaltz", level: 6,
      note: "El fundamento del mundo: Yesod como eje de la transmisión espiritual." },
  ],
  malchut: [
    { title: "Séfer Yetzirá, cap. 6", author: "Tradición antigua", ref: "Sefer Yetzirah", level: 1,
      note: "El sellado de los seis extremos — Maljut como la realización de la creación." },
    { title: "Idra Rabba — Nukva", author: "Zohar", ref: "Zohar", level: 2,
      note: "Nukva de Zeir Anpín (la Shejiná) — Maljut como la Presencia divina en el mundo." },
    { title: "Pardés Rimonim, Sha'ar 12", author: "Ramak", level: 3,
      note: "Maljut como el espejo oscuro que recibe la luz de las nueve sefirot superiores." },
    { title: "Etz Jaim — Shevirat ha-Kelim", author: "Arí / Jaim Vital", level: 4,
      note: "La rotura de los vasos ocurre principalmente en Maljut — y el tikún comienza aquí." },
    { title: "Inner Space, cap. 5", author: "Aryeh Kaplan", level: 6,
      note: "El Reino: cómo la Presencia divina habita en el mundo material, en cada acción." },
  ],
};

export { ROADMAP_LEVELS };
