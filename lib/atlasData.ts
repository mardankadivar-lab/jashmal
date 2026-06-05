// ─────────────────────────────────────────────────────────────────────────
// Atlas Bíblico Interactivo — datos verificados por el Sofer (editor-erudito).
// Cada lugar es un nodo de conocimiento sobre una Tierra cósmica 3D, hermana
// del Cerebro. Nombres hebreos con nikud confirmados en Sefaria; coordenadas
// reales; referencias bíblicas verificadas versículo por versículo.
// ─────────────────────────────────────────────────────────────────────────

export type Place = {
  id: string;
  es: string;
  he: string;
  lat: number;
  lng: number;
  region: string;
  period: string;
  importance: number; // 1..3
  refs: string[];
  figures: string[]; // ligan con el Cerebro / motor de estudio
  sefira: string | null;
  desc: string;
  warn?: string; // ubicación disputada o nota del Sofer
};

export type AtlasRoute = {
  id: string;
  name: string;
  stops: string[];
  ref: string;
  color: string;
};

// Radio del globo en unidades de escena.
export const GLOBE_R = 5;

// Color por región (paleta dorada/mística, coherente con el Cerebro).
export const REGION_COLORS: Record<string, string> = {
  israel: "#c9a43e", // dorado — la Tierra
  egipto: "#d98c3f", // cobre/arena
  mesopotamia: "#6fb0db", // azul río
  persia: "#b274d8", // púrpura
  fenicia: "#4ec9a8", // verde mar
  transjordania: "#cf8f6a",
  aram: "#9aa8c7",
  sinai: "#e0b25e",
  arabia: "#caa46a",
};

export const REGION_LABELS: Record<string, { es: string; fa: string }> = {
  israel: { es: "Tierra de Israel", fa: "سرزمین اسرائیل" },
  egipto: { es: "Egipto", fa: "مصر" },
  mesopotamia: { es: "Mesopotamia", fa: "بین‌النهرین" },
  persia: { es: "Persia", fa: "ایران" },
  fenicia: { es: "Fenicia / costa", fa: "فنیقیه" },
  transjordania: { es: "Transjordania", fa: "ماورای اردن" },
  aram: { es: "Aram", fa: "آرام" },
  sinai: { es: "Sinaí", fa: "سینا" },
  arabia: { es: "Arabia", fa: "عربستان" },
};

export const PLACES: Place[] = [
  { id: "jerusalen", es: "Jerusalén", he: "יְרוּשָׁלַיִם", lat: 31.78, lng: 35.21, region: "israel", period: "Monarquía", importance: 3, refs: ["Génesis 14:18", "2 Samuel 5:6-7", "Esdras 1:3"], figures: ["Avraham", "David", "Shlomó", "Yeshayahu"], sefira: "Maljut", desc: "Ciudad de David y del Templo; corazón de la Tierra. El monte Moriah de la Akedá es su monte del Templo." },
  { id: "hebron", es: "Hebrón", he: "חֶבְרוֹן", lat: 31.53, lng: 35.10, region: "israel", period: "Patriarcas", importance: 3, refs: ["Génesis 23:2", "Génesis 23:19", "2 Samuel 5:3"], figures: ["Avraham", "Sará", "Yitzjak", "Rivká", "Yaakov", "Leá", "David"], sefira: "Jésed", desc: "Ciudad de los Patriarcas y la Cueva de Majpelá; primera capital de David.", warn: "Sefirá: Jésed por Avraham, que vivió aquí. La corriente luriánica liga la Cueva de Majpelá a Maljut (puerta al Gan Edén). Lectura doble legítima." },
  { id: "belen", es: "Belén", he: "בֵּית לֶחֶם", lat: 31.70, lng: 35.20, region: "israel", period: "Patriarcas · Monarquía", importance: 2, refs: ["Génesis 35:19", "Rut 1:1", "1 Samuel 16:1"], figures: ["Rajel", "David"], sefira: null, desc: "Tumba de Rajel en el camino; cuna de David y casa de Rut." },
  { id: "jerico", es: "Jericó", he: "יְרִיחוֹ", lat: 31.87, lng: 35.44, region: "israel", period: "Conquista", importance: 2, refs: ["Josué 6:20", "Números 22:1", "2 Reyes 2:5"], figures: ["Yehoshúa", "Eliyahu"], sefira: null, desc: "La ciudad cuyos muros cayeron al sonido del shofar; primera conquista de Yehoshúa." },
  { id: "betel", es: "Betel", he: "בֵּית אֵל", lat: 31.93, lng: 35.22, region: "israel", period: "Patriarcas", importance: 2, refs: ["Génesis 28:19", "Génesis 12:8", "Génesis 35:1"], figures: ["Avraham", "Yaakov"], sefira: null, desc: "La «Casa de Dios» y «puerta del cielo» del sueño de la escalera de Yaakov.", warn: "Sin atribución de sefirá con fuente clásica firme; la conexión verificable es «puerta del cielo» (Gn 28:17)." },
  { id: "siquem", es: "Siquem", he: "שְׁכֶם", lat: 32.21, lng: 35.28, region: "israel", period: "Patriarcas", importance: 2, refs: ["Génesis 12:6", "Génesis 33:18", "Josué 24:1"], figures: ["Avraham", "Yaakov", "Yosef", "Yehoshúa"], sefira: null, desc: "Primer alto de Avraham en Canaán, junto al terebinto de Moré; allí descansa Yosef." },
  { id: "beerseba", es: "Beerseba", he: "בְּאֵר שֶׁבַע", lat: 31.25, lng: 34.79, region: "israel", period: "Patriarcas", importance: 2, refs: ["Génesis 21:31", "Génesis 26:23", "Génesis 46:1"], figures: ["Avraham", "Yitzjak", "Yaakov"], sefira: null, desc: "El «pozo del juramento»; frontera sur de la Tierra y morada de los Patriarcas." },
  { id: "dan", es: "Dan", he: "דָּן", lat: 33.25, lng: 35.65, region: "israel", period: "Conquista · Monarquía", importance: 2, refs: ["Jueces 18:29", "Génesis 14:14", "1 Reyes 12:29"], figures: ["Avraham", "Yaakov"], sefira: null, desc: "Antaño Lais; extremo norte de la Tierra («de Dan a Beerseba»)." },
  { id: "monte-sinai", es: "Monte Sinaí", he: "הַר סִינַי", lat: 28.54, lng: 33.98, region: "sinai", period: "Éxodo", importance: 3, refs: ["Éxodo 19:20", "Éxodo 19:11", "Éxodo 24:16"], figures: ["Moshé", "Aharón"], sefira: null, desc: "El monte de la Revelación y la entrega de la Torá.", warn: "Ubicación DISPUTADA: tradición de Jebel Musa (Santa Catalina), la más aceptada, sin certeza arqueológica." },
  { id: "monte-nebo", es: "Monte Nebo", he: "הַר נְבוֹ", lat: 31.77, lng: 35.73, region: "transjordania", period: "Éxodo", importance: 2, refs: ["Deuteronomio 34:1", "Deuteronomio 32:49", "Números 33:47"], figures: ["Moshé"], sefira: null, desc: "Cumbre del Pisgá frente a Jericó desde donde Moshé vio la Tierra y murió." },
  { id: "monte-carmelo", es: "Monte Carmelo", he: "הַר הַכַּרְמֶל", lat: 32.73, lng: 35.04, region: "israel", period: "Monarquía", importance: 2, refs: ["1 Reyes 18:19", "1 Reyes 18:20", "1 Reyes 18:42"], figures: ["Eliyahu"], sefira: null, desc: "Donde Eliyahu desafió a los profetas de Baal y cayó fuego del cielo.", warn: "Coordenada del Muhraqa, sitio tradicional del episodio de Eliyahu; el Carmelo es una cadena, no un punto." },
  { id: "ur", es: "Ur de los Caldeos", he: "אוּר כַּשְׂדִּים", lat: 30.96, lng: 46.10, region: "mesopotamia", period: "Patriarcas", importance: 3, refs: ["Génesis 11:31", "Génesis 11:28", "Génesis 15:7"], figures: ["Avraham", "Sará"], sefira: null, desc: "Cuna de Avraham; punto de partida de su viaje hacia Canaán.", warn: "Ubicación DISPUTADA: Ur del sur (Tell el-Muqayyar), la identificación tradicional dominante." },
  { id: "haran", es: "Harán", he: "חָרָן", lat: 36.87, lng: 39.03, region: "aram", period: "Patriarcas", importance: 2, refs: ["Génesis 11:31", "Génesis 12:4", "Génesis 28:10"], figures: ["Avraham", "Sará", "Yaakov", "Rivká", "Rajel", "Leá"], sefira: null, desc: "Donde Téraj se detuvo y Avraham oyó el «Lej Lejá»; tierra de Labán y las matriarcas." },
  { id: "babilonia", es: "Babilonia", he: "בָּבֶל", lat: 32.54, lng: 44.42, region: "mesopotamia", period: "Exilio", importance: 3, refs: ["Génesis 11:9", "2 Reyes 25:1", "Salmos 137:1"], figures: ["Noaj"], sefira: null, desc: "De la Torre de Bavel al Exilio; «junto a los ríos de Babel nos sentamos a llorar»." },
  { id: "ninive", es: "Nínive", he: "נִינְוֵה", lat: 36.37, lng: 43.15, region: "mesopotamia", period: "Profetas", importance: 2, refs: ["Jonás 3:3", "Génesis 10:11", "Nahúm 1:1"], figures: ["Yoná"], sefira: null, desc: "La «gran ciudad» asiria que se arrepintió ante la voz de Yoná." },
  { id: "susa", es: "Susa (Shushán)", he: "שׁוּשַׁן", lat: 32.19, lng: 48.26, region: "persia", period: "Exilio · Persa", importance: 2, refs: ["Ester 1:2", "Daniel 8:2", "Nehemías 1:1"], figures: ["Ester"], sefira: null, desc: "Capital persa, «Shushán la fortaleza»; escenario del milagro de Purim." },
  { id: "damasco", es: "Damasco", he: "דַּמֶּשֶׂק", lat: 33.51, lng: 36.29, region: "aram", period: "Patriarcas · Monarquía", importance: 2, refs: ["Génesis 14:15", "Génesis 15:2", "2 Reyes 5:12"], figures: ["Avraham", "Eliyahu"], sefira: null, desc: "Capital de Aram; hasta aquí persiguió Avraham a los reyes para rescatar a Lot." },
  { id: "tiro", es: "Tiro", he: "צוֹר", lat: 33.27, lng: 35.19, region: "fenicia", period: "Monarquía", importance: 2, refs: ["2 Samuel 5:11", "1 Reyes 5:15", "Ezequiel 26:3"], figures: ["David", "Shlomó"], sefira: null, desc: "Puerto fenicio; el rey Jiram envió cedros para el palacio y el Templo." },
  { id: "sidon", es: "Sidón", he: "צִידוֹן", lat: 33.56, lng: 35.37, region: "fenicia", period: "Patriarcas · Monarquía", importance: 2, refs: ["Génesis 10:19", "Génesis 49:13", "1 Reyes 17:9"], figures: ["Yaakov", "Eliyahu"], sefira: null, desc: "Frontera norte de Canaán; ciudad madre de Fenicia y refugio de Eliyahu en Tzarfat." },
  { id: "gaza", es: "Gaza", he: "עַזָּה", lat: 31.50, lng: 34.47, region: "fenicia", period: "Conquista · Jueces", importance: 2, refs: ["Génesis 10:19", "Jueces 16:21", "Josué 10:41"], figures: ["Shimshon"], sefira: null, desc: "Ciudad filistea; aquí cayó preso Shimshón y derribó el templo de Dagón.", warn: "Gaza es filistea (costa). El esquema aún no tiene región «filistea»." },
  { id: "samaria", es: "Samaria", he: "שֹׁמְרוֹן", lat: 32.28, lng: 35.19, region: "israel", period: "Monarquía", importance: 2, refs: ["1 Reyes 16:24", "1 Reyes 16:29", "2 Reyes 17:6"], figures: ["Eliyahu"], sefira: null, desc: "Capital del reino del norte que edificó Omrí; centro de la dinastía de Ajav." },
  { id: "ramses-gosen", es: "Ramsés (Gosén)", he: "רַעְמְסֵס", lat: 30.80, lng: 31.84, region: "egipto", period: "Esclavitud · Éxodo", importance: 3, refs: ["Éxodo 12:37", "Génesis 47:11", "Génesis 47:27"], figures: ["Yaakov", "Yosef", "Moshé"], sefira: null, desc: "Tierra de Gosén donde habitó Israel; de Ramsés partió el Éxodo.", warn: "Coordenada del Delta oriental (Qantir/Pi-Ramsés). Gosén es una región." },
  { id: "yam-suf", es: "Mar Rojo (Yam Suf)", he: "יַם סוּף", lat: 29.50, lng: 32.55, region: "sinai", period: "Éxodo", importance: 3, refs: ["Éxodo 13:18", "Éxodo 14:21", "Éxodo 15:4"], figures: ["Moshé", "Miriam", "Aharón"], sefira: null, desc: "El mar que se abrió; aquí cantó Israel la Shirá y Miriam tomó el pandero.", warn: "Ubicación MUY DISPUTADA (golfo de Suez, Lagos Amargos o golfo de Aqaba). Punto simbólico." },
  { id: "moab", es: "Moab", he: "מוֹאָב", lat: 31.50, lng: 35.75, region: "transjordania", period: "Éxodo", importance: 2, refs: ["Números 22:1", "Deuteronomio 34:1", "Rut 1:1"], figures: ["Moshé", "David"], sefira: null, desc: "Las estepas de Moab, último campamento de Israel; de aquí vino Rut, bisabuela de David.", warn: "Moab es una región (meseta al este del Mar Muerto). Coordenada de las estepas frente a Jericó." },
];

export const ROUTES: AtlasRoute[] = [
  { id: "abraham", name: "El viaje de Abraham", stops: ["ur", "haran", "siquem", "betel", "hebron", "ramses-gosen"], ref: "Génesis 11–12", color: "#c9a43e" },
  { id: "exodo", name: "El Éxodo", stops: ["ramses-gosen", "yam-suf", "monte-sinai", "moab", "jerico"], ref: "Éxodo–Números", color: "#4ea1d3" },
  { id: "exilio-retorno", name: "El Exilio y el Retorno", stops: ["jerusalen", "babilonia", "jerusalen"], ref: "2 Reyes 25 · Esdras 1", color: "#c0662a" },
];

export const placeById = (id: string): Place | undefined => PLACES.find((p) => p.id === id);

// lat/lng (grados) → posición 3D sobre la esfera de radio r.
export function latLngToVec3(lat: number, lng: number, r = GLOBE_R): [number, number, number] {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return [
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  ];
}
