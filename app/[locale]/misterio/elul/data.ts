
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — אֱלוּל · אֲנִי לְדוֹדִי וְדוֹדִי לִי
//  Serie «Tiempos Sagrados» (moadim) · Estudio 1 — el mes de Elul.
//
//  Hero en modo "par": אֱלוּל = בִּינָה = 67 (verificado letra por letra).
//
//  FUENTES VERIFICADAS CONTRA SEFARIA (2026-08-27, 14 de Elul 5786):
//   · Shir HaShirim 6:3 · 2:16 · 7:11 — texto hebreo cotejado.
//   · Devarim 30:6 · Ester 9:22 · Shemot 21:13 — los otros tres acrósticos.
//   · Bamidbar 13:2 + Targum Onkelos ("וְיָתֻרוּ" → "וִיאַלְּלוּן") — raíz א־ל־ל.
//   · Nechemiá 6:15 — única aparición de "Elul" en todo el Tanaj.
//   · Tur, Oraj Jaim 581 (citando Pirkei deRabí Eliezer) — Rosh Jodesh Elul,
//     tercer ascenso de Moshé, shofar todo el mes, bajada con las segundas
//     tablas en Yom Kipur.
//   · Pirkei deRabí Eliezer 46 — los 40 días, la bajada en Yom Kipur, שעת רצון.
//   · LA CUENTA DE LOS 40 DÍAS (corregida 2026-08-27): del 1 de Elul al 10 de
//     Tishrei hay 39 días, no 40. Cierra en 40 contando desde el PRIMER día de
//     Rosh Jodesh Elul, que es el 30 de Av (Av siempre 30 días, Elul siempre 29
//     en el calendario fijo): 1 + 29 + 10 = 40. Confirmado con el conversor de
//     hebcal: 30 de Av 5786 = 13 ago 2026, y su evento es "Rosh Chodesh Elul".
//   · Rosh Hashaná 18a (Rabá bar Avuh) — "Dirshu" = los diez días.
//   · Rambam, Hiljot Teshuvá 7:6-7 y 2:6 — cotejado.
//   · Rashi a Shir HaShirim 2:16 — cotejado (a 6:3 Rashi solo glosa "haro'é").
//   · Malbim a Shir HaShirim 6:3 — cotejado: "היא אשר מתחלת עתה בדבוק".
//   · Tania, Igueret HaTeshuvá 4 — "תשובה = תָּשׁוּב ה׳" (cita del Zohar).
//   · Sefer Yetzirá (Gra) 5 — "המליך אות י׳ במעשה... ואלול בשנה" — Elul = Yud.
//   · Likutei Torá, Re'eh 32b (maamar "Aní leDodí") — "el Rey está en el campo".
//     NOTA: Sefaria no aloja ese maamar; se cita de la edición impresa. Lo que
//     Sefaria SÍ confirma (Likutei Torá, Re'eh, sobre "ומל ה' את לבבך") es la
//     remisión del propio Admur HaZakén: "ר״ת אלול כי הם ימי רצון, עמ״ש בד״ה
//     אני לדודי" — el maamar existe y trata exactamente de esto.
//
//  Gematrías calculadas letra por letra:
//    אֱלוּל = א1+ל30+ו6+ל30 = 67 · בִּינָה = ב2+י10+נ50+ה5 = 67
//    letras finales de אני לדודי ודודי לי = י·י·י·י = 10×4 = 40
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "elul",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 1 — Elul · el mes escondido en un verso de amor",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۱ — الول · ماهی که در آیه‌ای عاشقانه پنهان است",
    he: "אֲנִי לְדוֹדִי וְדוֹדִי לִי",
    titulo: "Elul — Yo soy de mi Amado",
    tituloFa: "الول — من از آنِ محبوبم",
    ganchoEs:
      "El nombre del mes no es una palabra: es una firma. אֱלוּל son las iniciales de cuatro palabras del Cantar de los Cantares — y el orden de esas cuatro palabras decide quién da el primer paso. En Elul, lo damos nosotros.",
    ganchoFa:
      "نامِ این ماه واژه نیست: امضاست. אלול سرحرفِ چهار واژه از غزلِ غزل‌هاست — و ترتیبِ آن چهار واژه تعیین می‌کند چه کسی گامِ نخست را برمی‌دارد. در الول، ما برمی‌داریم.",
    par: {
      a: { he: "אֱלוּל", rom: "Elul" },
      b: { he: "בִּינָה", rom: "Biná (entendimiento)" },
      valor: "67",
    },
    fecha: "Elul 5786 · 14 ago – 11 sep 2026",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — qué es un acróstico y qué no es",
    rotulo:
      "Se dice de entrada, para que nadie confunda una lectura tradicional con una etimología.",
    parrafos: [
      `Que אֱלוּל sean las iniciales de אֲנִי לְדוֹדִי וְדוֹדִי לִי es un נוֹטָרִיקוֹן (notarikón): una lectura tradicional que descubre un sentido en las letras iniciales de una frase. Es una llave de interpretación, no la etimología histórica del nombre. Los nombres de los meses que usamos hoy entraron al hebreo en el período del segundo Templo: la palabra "Elul" aparece UNA sola vez en todo el Tanaj, y es en un libro tardío — Nechemiá 6:15, donde se registra que "se terminó el muro a los veinticinco de Elul".`,
      `Lo mismo vale para la raíz aramea א־ל־ל ("escudriñar, explorar"), que el Targum de Onkelos usa para traducir "וְיָתֻרוּ" ("y exploren", Bamidbar 13:2) como "וִיאַלְּלוּן". Es una resonancia real y verificable del arameo, y la tradición la usa como llave — pero como llave, no como prueba filológica de que el mes se llame así por eso.`,
      `Este estudio no afirma que el mes se llame Elul PORQUE el verso lo diga. Afirma algo distinto y más interesante: que la tradición eligió leer ese nombre a través de ese verso, y que esa elección enseña con precisión qué trabajo se hace en estos cuarenta días.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — seis textos y una sola dirección",
    intro: [
      `Antes de recorrerlo, el esqueleto. El estudio se sostiene sobre seis textos verificados; cada uno aporta una pieza, y todas apuntan al mismo lugar: en Elul el primer movimiento es del hombre.`,
    ],
    filas: [
      {
        ref: "Shir HaShirim 6:3",
        he: "אֲנִי לְדוֹדִי וְדוֹדִי לִי",
        es: "Yo soy de mi Amado y mi Amado es mío",
        funcion: "El acróstico אלול. Yo primero: el despertar viene de abajo.",
      },
      {
        ref: "Shir HaShirim 2:16",
        he: "דּוֹדִי לִי וַאֲנִי לוֹ",
        es: "Mi Amado es mío y yo soy suyo",
        funcion: "Las mismas palabras, orden invertido: ahí Él empieza.",
      },
      {
        ref: "Shir HaShirim 7:11",
        he: "אֲנִי לְדוֹדִי וְעָלַי תְּשׁוּקָתוֹ",
        es: "Yo soy de mi Amado y hacia mí es su deseo",
        funcion: "El tercer grado: doy sin pedir nada a cambio.",
      },
      {
        ref: "Bamidbar 13:2 (Targum Onkelos)",
        he: "וְיָתֻרוּ → וִיאַלְּלוּן",
        es: "«y exploren» → raíz aramea א־ל־ל",
        funcion: "Elul como mes de escudriñar: revisar el propio territorio.",
      },
      {
        ref: "Tur, Oraj Jaim 581",
        he: "בְּרֹאשׁ חֹדֶשׁ אֱלוּל… עֲלֵה אֵלַי הָהָרָה",
        es: "En Rosh Jodesh Elul: «sube a Mí, al monte»",
        funcion: "Los 40 días del tercer ascenso de Moshé y el shofar del mes.",
      },
      {
        ref: "Nechemiá 6:15",
        he: "וַתִּשְׁלַם הַחוֹמָה בְּעֶשְׂרִים וַחֲמִשָּׁה לֶאֱלוּל",
        es: "Se terminó el muro a los veinticinco de Elul",
        funcion: "Única aparición del mes en el Tanaj — y es un muro que se cierra.",
      },
    ],
    cierre: [
      `Cuatro palabras de amor, una raíz que significa buscar, cuarenta días de subida y un muro que se termina. Ese es Elul.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "Versículo-ancla — Shir HaShirim (Cantar de los Cantares) 6:3",
        he: "אֲנִ֤י לְדוֹדִי֙ וְדוֹדִ֣י לִ֔י הָרֹעֶ֖ה בַּשּׁוֹשַׁנִּֽים׃",
        es: "Yo soy de mi Amado y mi Amado es mío, el que apacienta entre los lirios.",
        source: "Shir HaShirim 6:3",
      },
      {
        label: "El espejo — Shir HaShirim 2:16 (las mismas palabras, al revés)",
        he: "דּוֹדִ֥י לִי֙ וַאֲנִ֣י ל֔וֹ הָרֹעֶ֖ה בַּשּׁוֹשַׁנִּֽים׃",
        es: "Mi Amado es mío y yo soy suyo, el que apacienta entre los lirios.",
        source: "Shir HaShirim 2:16",
      },
      {
        label: "El tercer grado — Shir HaShirim 7:11",
        he: "אֲנִ֣י לְדוֹדִ֔י וְעָלַ֖י תְּשׁוּקָתֽוֹ׃",
        es: "Yo soy de mi Amado, y hacia mí es su deseo.",
        source: "Shir HaShirim 7:11",
      },
      {
        label: "Segundo acróstico de אלול — Devarim (Deuteronomio) 30:6",
        he: "וּמָ֨ל יְהֹוָ֧ה אֱלֹהֶ֛יךָ אֶת־לְבָבְךָ֖ וְאֶת־לְבַ֣ב זַרְעֶ֑ךָ לְאַהֲבָ֞ה אֶת־יְהֹוָ֧ה אֱלֹהֶ֛יךָ",
        es: "Y circuncidará YHVH tu Dios TU CORAZÓN y EL CORAZÓN de tu descendencia, para amar a YHVH tu Dios.",
        source: "Devarim 30:6 — אֶת לְבָבְךָ וְאֶת לְבַב = א·ל·ו·ל",
      },
      {
        label: "La raíz que significa «escudriñar» — Bamidbar 13:2 y su Targum",
        he: "שְׁלַח־לְךָ֣ אֲנָשִׁ֗ים וְיָתֻ֙רוּ֙ אֶת־אֶ֣רֶץ כְּנַ֔עַן … (תרגום אונקלוס: וִיאַלְּלוּן יָת אַרְעָא דִכְנַעַן)",
        es: "«Envía hombres para que exploren la tierra de Canaán» — que el Targum traduce con el verbo arameo vi'al'lun, de la raíz א־ל־ל: escudriñar, inspeccionar.",
        source: "Bamidbar 13:2 · Targum Onkelos ad loc.",
      },
    ],
    parrafos: [
      `Empieza por lo más simple, porque lo simple aquí es lo asombroso. Toma el versículo del Cantar de los Cantares 6:3 —אֲנִי לְדוֹדִי וְדוֹדִי לִי, «Aní leDodí veDodí lí»— y quédate solo con la primera letra de cada una de sus cuatro palabras. Aní empieza con álef (א). LeDodí, con lámed (ל). VeDodí, con vav (ו). Lí, con lámed (ל). Álef, lámed, vav, lámed: א-ל-ו-ל. אֱלוּל. El nombre del mes en el que estás parado ahora mismo está escrito, letra por letra, en el comienzo de un verso de amor.`,
      `Y no es el único. La tradición cuenta cuatro acrósticos de אלול en el Tanaj, y cada uno señala una puerta distinta del mismo mes. El del amor y la oración es el nuestro: Aní · LeDodí · VeDodí · Lí (Shir HaShirim 6:3). El del corazón y la teshuvá: «y circuncidará YHVH tu Dios TU CORAZÓN y EL CORAZÓN de tu descendencia» — Et levavjá · Ve'et levav (Devarim 30:6). El de la tzedaká: «y envío de porciones, cada uno a su prójimo, y regalos a los pobres» — Ish lere'ehu · Umatanot la'evyonim (Ester 9:22). Y el más incómodo, el de la culpa involuntaria y el refugio: «y Dios lo puso a su mano, y Yo te asignaré un lugar adonde huir» — Iná leyadó · Vesamtí lejá (Shemot 21:13). En los cuatro, las iniciales dan א-ל-ו-ל. Amor, corazón, generosidad, refugio: las cuatro caras del trabajo de estos días.`,
      `Ahora el detalle que convierte el acróstico en enseñanza. Esas cuatro palabras vuelven a aparecer en el Cantar, pero con el orden dado vuelta. En 2:16: דּוֹדִי לִי וַאֲנִי לוֹ — "mi Amado es mío, y yo soy suyo": Él primero. En 6:3: אֲנִי לְדוֹדִי וְדוֹדִי לִי — "yo soy de mi Amado, y mi Amado es mío": yo primero. Es la misma pareja, el mismo pastor, los mismos lirios — y una diferencia de orden que lo cambia todo. La tradición eligió, para nombrar a Elul, precisamente la versión en la que el movimiento arranca abajo. Elul no es el mes en que Dios viene a buscarte. Es el mes en que tú sales a buscarlo — y descubres, al segundo paso, que Él ya venía.`,
      `El Cantar guarda todavía un tercer orden, y es el más alto de los tres: אֲנִי לְדוֹדִי וְעָלַי תְּשׁוּקָתוֹ — "yo soy de mi Amado, y hacia mí es su deseo" (7:11). Ahí ya ni siquiera se dice "y mi Amado es mío": el alma se entrega sin reclamar la contrapartida, y justamente entonces el deseo del Amado se vuelca sobre ella. Tres versos, tres gramáticas del amor: Él empieza (2:16), yo empiezo y Él responde (6:3), yo me doy sin condición y Su deseo me busca (7:11). Elul vive en el del medio, que es el del trabajo.`,
      `¿Y por qué cuarenta días? Porque el calendario no es decorativo. El Tur (Oraj Jaim 581), citando a Pirkei deRabí Eliezer, fija la escena: "en Rosh Jodesh Elul le dijo el Santo, bendito sea, a Moshé: 'sube a Mí, al monte' — pues entonces subió a recibir las últimas tablas; y pasaron el shofar por el campamento". Ese fue el tercer ascenso de Moshé tras el pecado del becerro: cuarenta días exactos que terminan el 10 de Tishrei, cuando baja con las segundas tablas. Ese día se llama Yom Kipur. Y la cuenta hay que hacerla con cuidado, porque es más fina de lo que parece: Rosh Jodesh Elul dura DOS días —el 30 de Av y el 1 de Elul—, porque en el calendario fijo Av siempre tiene treinta días y Elul siempre veintinueve. Si contaras desde el 1 de Elul te darían treinta y nueve. Contando desde el primer día de Rosh Jodesh, el 30 de Av, la cuenta cierra clavada: 1 + 29 + 10 = 40. Por eso —sigue el Tur— los Sabios instituyeron tocar el shofar todo el mes de Elul: "para advertir a Israel que hagan teshuvá". El mes entero es la subida al monte de un pueblo que ya se equivocó una vez y va a buscar de nuevo la palabra escrita.`,
      `Y una última nota, casi un guiño. En todo el Tanaj la palabra "Elul" aparece una sola vez, en Nechemiá 6:15: "וַתִּשְׁלַם הַחוֹמָה בְּעֶשְׂרִים וַחֲמִשָּׁה לֶאֱלוּל" — "y se terminó el muro a los veinticinco de Elul". La única vez que la Escritura pronuncia el nombre de este mes, lo que se está terminando es un muro: una defensa reconstruida sobre ruinas, con las brechas por fin cerradas. No hace falta forzar nada para oír ahí el trabajo de estos días.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Honestidad primero: sobre nuestro verso (6:3) Rashi comenta únicamente "el que apacienta entre los lirios — apacienta su rebaño en un pastizal apacible y bueno". Pero sobre el verso espejo (2:16) sí se extiende, y ahí está la clave. "דּוֹדִי לִי — Él me pidió a mí todas Sus necesidades, y solo a mí me ordenó: 'hagan el Pésaj, santifiquen los primogénitos, hagan el Mishkán, ofrezcan holocaustos' — y no se lo pidió a ninguna otra nación. וַאֲנִי לוֹ — todas mis necesidades se las pedí a Él, y no a otros dioses". Para Rashi, todo el Cantar es la historia de amor entre Dios e Israel, y estas palabras describen una relación de pedidos mutuos: cada uno le pide al otro lo que necesita. Ese es el suelo sobre el que se levanta el resto. El acróstico de Elul no adorna un poema erótico: nombra un vínculo de exclusividad.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם).",
        texto: `Y aquí llega la voz que dice exactamente lo que este estudio necesita, y lo dice sobre nuestro verso. Malbim, comentando 6:3 en su registro alegórico (מליצה), escribe: "Ahora ella se une a su Amado supremo… y dice 'yo soy de mi Amado', כי היא אשר מתחלת עתה בדבוק בזה ברוב תשוקתה אל האלהים — porque es ELLA la que ahora INICIA esta unión, por su gran anhelo hacia Dios; y el Pastor supremo le trae lirios: los brotes de su justicia y sus buenas obras, como aroma agradable". La palabra que lo decide es מתחלת, «la que empieza». No hace falta que Jashmal lo interprete: Malbim ya lo dijo. En 6:3 la iniciativa es del alma.`,
      },
      {
        etiqueta: "El Rambam / Maimónides (הָרַמְבַּ\"ם).",
        texto: `Sobrio como siempre, el Rambam traduce el romance a jurisprudencia del alma, y el resultado es más ardiente que el poema. "Grande es la teshuvá, que acerca al hombre a la Shejiná… La teshuvá acerca a los lejanos: אֶמֶשׁ הָיָה זֶה שָׂנוּי לִפְנֵי הַמָּקוֹם… וְהַיּוֹם הוּא אָהוּב וְנֶחְמָד קָרוֹב וְיָדִיד — ayer esta persona era odiada delante del Omnipresente, repugnante, alejada y abominable; y hoy es amada, deseada, cercana y amiga" (Hiljot Teshuvá 7:6). En 7:7 remata: ayer clamaba y no era respondido; hoy "clama y es respondido de inmediato". Nótese el vocabulario: אָהוּב, יָדִיד — amado, amigo. Hasta el más legalista de los codificadores, al describir la teshuvá, termina hablando en el idioma del Cantar de los Cantares. Y en Hiljot Teshuvá 2:6 fija el calendario: la teshuvá siempre es buena, "pero en los diez días entre Rosh Hashaná y Yom Kipur es la más bella de todas y es aceptada de inmediato, como está dicho: 'busquen a YHVH cuando se deja hallar' (Yeshayá 55:6)".`,
      },
      {
        etiqueta: "El Talmud (רֹאשׁ הַשָּׁנָה י\"ח ע\"א).",
        texto: `El Rambam no inventó ese calendario: lo tomó de una discusión del Talmud que vale la pena oír entera. La Guemará pregunta por el versículo "דִּרְשׁוּ ה' בְּהִמָּצְאוֹ" — "busquen a YHVH cuando se deja hallar" (Yeshayá 55:6) — que implica que hay momentos en que NO se deja hallar. Y responde distinguiendo: "allí, respecto del individuo; aquí, respecto de la comunidad". Entonces pregunta: para el individuo, ¿cuándo? Y responde Rabá bar Avuh: "אֵלּוּ עֲשָׂרָה יָמִים שֶׁבֵּין רֹאשׁ הַשָּׁנָה לְיוֹם הַכִּפּוּרִים — son los diez días entre Rosh Hashaná y Yom Kipur" (Rosh Hashaná 18a). Hay, pues, una ventana. Elul es el mes en que esa ventana se abre.`,
      },
      {
        etiqueta: "El Tur (טוּר, אוֹרַח חַיִּים תקפ\"א) — la halajá del mes.",
        texto: `El Tur convierte todo lo anterior en práctica, y su texto es el que fija el carácter de Elul hasta hoy: "en Rosh Jodesh Elul le dijo el Santo, bendito sea, a Moshé 'sube a Mí al monte' —que entonces subió a recibir las últimas tablas— y pasaron el shofar por el campamento… Por eso instituyeron los Sabios que se toque el shofar en Rosh Jodesh Elul cada año, y todo el mes, לְהַזְהִיר יִשְׂרָאֵל שֶׁיַּעֲשׂוּ תְּשׁוּבָה, para advertir a Israel que hagan teshuvá, como está dicho: 'si se toca el shofar en la ciudad…' (Amós 3:6), y para confundir al Satán". Y añade la costumbre de decir selijot desde Rosh Jodesh Elul, "porque en él subió Moshé al monte por tercera vez y bajó con las segundas tablas en Yom Kipur". El shofar de Elul no anuncia una fiesta: es una alarma amorosa, sonada cada mañana durante treinta días.`,
      },
      {
        etiqueta: "El Admur HaZakén — Likutei Torá (הַמֶּלֶךְ בַּשָּׂדֶה).",
        texto: `La imagen más famosa de Elul viene de Rabí Shneur Zalman de Liadi, en el maamar sobre nuestro mismo verso — "Aní leDodí veDodí lí" (Likutei Torá, Re'eh 32b). Su parábola: durante el año el rey está en su palacio, y quien quiera verlo debe pedir audiencia, atravesar guardias, antesalas y protocolos; y aun así solo los pocos autorizados entran. Pero hay un tiempo en que el rey sale al campo, y allí, en el campo, cualquiera puede acercarse — el labrador con las manos sucias, el que nunca supo de protocolos — y el rey los recibe a todos con rostro sonriente, sin distinguir entre quién venía preparado y quién no. Ese tiempo es Elul. Nadie tiene que "llegar" a ningún lado: el Rey ya salió, ya está en tu terreno. Pero —y aquí está el filo de la parábola— el rey en el campo no toca a la puerta de nadie. Hay que salir del surco, levantar la cabeza y caminar hacia Él. Por eso el mes se llama con el verso en el que yo empiezo. (El propio Admur HaZakén remite a este maamar cuando, comentando "ומל ה' אלהיך את לבבך" en esa misma parashá, anota: "las iniciales son אלול, porque son días de ratzón —días de favor—; véase lo escrito en el maamar 'Aní leDodí'".)`,
      },
      {
        etiqueta: "El Arizal — Cabalá luriana (הָאֲרִ\"י).",
        texto: `La Cabalá luriana da la razón estructural de por qué estos días son "días de favor" (יְמֵי רָצוֹן). Durante Elul, enseña la tradición del Arizal, están reveladas las Trece Midot de Misericordia — los trece atributos que Dios le enseñó a Moshé precisamente en este ascenso ("YHVH, YHVH, Dios compasivo y clemente…", Shemot 34:6-7), y que en el lenguaje luriano brotan de la דִּיקְנָא de אֲרִיךְ אַנְפִּין, el nivel de la voluntad divina que está por encima de todo cálculo de mérito y demérito. Traducido: en Elul se abre un canal que no pasa por el juzgado. No es que el juicio se suspenda —Rosh Hashaná viene en camino—; es que antes del juicio se abre un mes entero en el que la relación pesa más que el expediente. Y la palabra técnica para esa apertura es רָצוֹן, deseo/favor: no un veredicto, sino unas ganas.`,
      },
    ],
    glosa: `Glosa para el lector: Notarikón = lectura por las letras iniciales (o finales) de una frase. Teshuvá = literalmente "retorno", no "penitencia". Selijot = plegarias de perdón que se dicen de madrugada. Yemei ratzón = "días de favor/deseo", el nombre técnico de estos cuarenta días. Trece Midot de Misericordia = los trece atributos de Shemot 34:6-7. Dikná de Arij Anpin = en el lenguaje del Arizal, el nivel más alto de la voluntad divina, anterior a todo cálculo. Biná = la sefirá del entendimiento, la "Madre superior", a la que la Cabalá llama el mundo de la teshuvá.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra, los hechos son cuatro y no necesitan interpretación. Primero: las iniciales de אֲנִי לְדוֹדִי וְדוֹדִי לִי (Shir HaShirim 6:3) forman אֱלוּל. Segundo: el mismo libro contiene las mismas palabras en orden inverso (2:16) y en un tercer orden (7:11), de modo que la elección de una de las tres versiones para nombrar el mes es deliberada. Tercero: el mes ocupa exactamente los cuarenta días que van del tercer ascenso de Moshé al monte (Rosh Jodesh Elul) hasta su bajada con las segundas tablas (Yom Kipur), y por eso se toca el shofar todo el mes y se dicen selijot (Tur, Oraj Jaim 581). Cuarto: la halajá reconoce en esta franja del calendario un tiempo en que la teshuvá "es aceptada de inmediato" (Rambam, Hiljot Teshuvá 2:6, sobre Yeshayá 55:6 y Rosh Hashaná 18a).`,
          `De esos cuatro hechos se sigue el pshat del mes: Elul es un tiempo acotado, con una fecha de vencimiento y una tarea. No es un estado de ánimo. Es un plazo.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: los números y las letras)",
        parrafos: [
          `Primera alusión, y es la del hero. אֱלוּל = א1 + ל30 + ו6 + ל30 = 67. וּבִינָה = ב2 + י10 + נ50 + ה5 = 67. El nombre del mes vale exactamente lo mismo que בִּינָה, el "entendimiento" — la sefirá que la Cabalá llama la Madre superior y el mundo de la teshuvá. Y la razón por la que Biná es el mundo de la teshuvá está en el Zohar, citado literalmente por el Admur HaZakén: "en la explicación de la palabra תְּשׁוּבָה por vía del secreto: תָּשׁוּב ה' — devuelve la hei" (Tania, Igueret HaTeshuvá 4). Volver es devolver la letra hei a su lugar; la hei superior del Nombre es Biná. Elul = 67 = Biná: el mes en que se hace el trabajo de volver a la Madre. Y nótese qué clase de trabajo es: no un arrepentimiento sentimental, sino uno de ENTENDIMIENTO — sentarse a comprender qué pasó realmente en el año que termina.`,
          `Segunda alusión, y es asombrosa. Si las iniciales de אֲנִי לְדוֹדִי וְדוֹדִי לִי dan el nombre del mes, mira ahora las FINALES. Aní termina en yud. LeDodí termina en yud. VeDodí termina en yud. Lí termina en yud. Cuatro yudim, y la yud vale 10. Cuatro veces diez: 40. Los cuarenta días exactos que separan Rosh Jodesh Elul del Yom Kipur. El verso guarda el mes en su cabeza y el plazo en su cola. (Verificado: י = 10; 10 × 4 = 40.)`,
          `Tercera alusión, que cierra el círculo. Sefer Yetzirá, en la versión del Gaón de Vilna (cap. 5), asigna a cada mes una letra: "הִמְלִיךְ אוֹת י' בְּמַעֲשֶׂה… וְצָר בָּהֶם בְּתוּלָה בָּעוֹלָם וֶאֱלוּל בַּשָּׁנָה וְיָד שְׂמֹאל בַּנֶּפֶשׁ" — "hizo reinar la letra {{letter:yod|Yud}} sobre la ACCIÓN… y formó con ella Virgo en el mundo, ELUL en el año y la mano izquierda en el alma". La letra del mes de Elul es la yud. La misma letra que aparece cuatro veces al final del verso. Y su sentido asignado es מַעֲשֶׂה: acción. No contemplación, no emoción: acción. La letra más pequeña del alfabeto —un punto suspendido, casi nada— rige el mes en que hay que hacer algo. La escala del gesto no importa; que se haga, sí.`,
          `Cuarta alusión, del arameo. La raíz א־ל־ל significa "escudriñar, inspeccionar": es la que usa el Targum de Onkelos para traducir "וְיָתֻרוּ", "y exploren la tierra" (Bamidbar 13:2 → וִיאַלְּלוּן). Los espías fueron a escudriñar una tierra ajena y fracasaron por lo que dijeron de ella. En Elul, la tierra que se escudriña es la propia. Es el mismo verbo, girado hacia adentro — y esta vez el informe se le entrega a uno mismo.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz del Baal Shem Tov",
        parrafos: [
          `Vuelve a la parábola del Admur HaZakén, porque el drash está entero ahí. El Rey sale al campo. No al palacio: al campo, que es el lugar donde la gente trabaja sucia, donde nadie se viste para la ocasión, donde no hay protocolo porque no hay sala. Y recibe a todos con rostro sonriente. Ahora hazte la pregunta que la parábola quiere que te hagas: si el Rey ya está en el campo, ¿por qué haría falta un mes entero de shofar y selijot? Porque estar cerca no es lo mismo que encontrarse. El campesino puede pasarse los treinta días con la cabeza gacha sobre el surco, trabajando bien, sin levantar la vista ni una vez. El Rey estuvo ahí todo el tiempo. Y no pasó nada.`,
          `Por eso el mes lleva el nombre del verso donde YO empiezo. En 2:16 —"mi Amado es mío y yo soy suyo"— la iniciativa es de Él, y hay tiempos del año que funcionan así: fiestas en que la luz baja sola, regalada. Elul no es de esos. Elul es el mes en que la luz está disponible pero no se impone; espera un movimiento. Malbim lo dijo con una palabra: מתחלת, «ella es la que empieza». Y el Rambam describió el resultado con otra: אֶמֶשׁ… וְהַיּוֹם — "ayer odiado; hoy amado, deseado, cercano y amigo". Entre el "ayer" y el "hoy" del Rambam no hay un rito mágico: hay un giro de la voluntad. Eso es todo lo que Elul pide, y es lo único que no puede hacer nadie por ti.`,
          `Aquí entra la voz del Baal Shem Tov, y suaviza sin rebajar. El Besht enseñó que Dios está en todos los lugares y en todas las cosas, y que no hay sitio vacío de Él — de modo que la distancia entre el alma y su Amado nunca es geográfica: es de atención. El "campo" del Admur HaZakén, leído con el Besht, no es un lugar al que el Rey viaja: es el nombre de la vida ordinaria de uno, el trabajo, la casa, el oficio — y el descubrimiento de Elul es que Él ya estaba ahí, en medio de eso, todo el tiempo. Por eso el jasid no busca a Dios saliendo de su vida sino levantando la vista dentro de ella. Y por eso, en la lectura jasídica, el shofar de Elul no es un reproche: es la voz sin palabras de un hijo que no sabe qué decir y grita — y el grito, precisamente porque no tiene palabras, llega más lejos que cualquier discurso.`,
          `Y aún queda el escalón que el propio Cantar guarda para después. Después de Elul viene Tishrei; después del trabajo, la fiesta. El tercer orden del verso —"yo soy de mi Amado, y hacia mí es su deseo" (7:11)— describe un amor que ya ni siquiera negocia: el alma se da, y el deseo del Amado se vuelca sobre ella sin que ella lo haya pedido. Ese es el destino del camino que empieza en Elul. Pero no se puede saltar al tercero desde el primero. El único puente es el del medio: אֲנִי לְדוֹדִי וְדוֹדִי לִי. Yo, primero.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto de Elul es una regla de la estructura de la realidad, no una costumbre piadosa: la luz no entra donde no hay un vacío que la reclame. Rav Yehuda Ashlag (Baal HaSulam) leyó toda la Cabalá como ciencia del deseo: la criatura es רָצוֹן לְקַבֵּל, voluntad de recibir, y su único órgano de recepción es la carencia. No hay recepción sin vaso, y no hay vaso sin falta. Por eso el orden de las palabras en 6:3 no es retórico: es físico. Primero אֲנִי לְדוֹדִי —el alma se vuelve hacia el Amado, y en ese giro se abre el hueco— y solo entonces וְדוֹדִי לִי, el Amado llena. Invertir el orden no es un error de estilo; es pedirle a la luz que entre en un vaso cerrado.`,
          `Aquí se ve por qué la tradición eligió este verso y no el de 2:16 para nombrar al mes. Existe la אִתְעֲרוּתָא דִּלְעֵילָא, el {{study:despertar-de-lo-alto|despertar desde arriba}} — la luz que desciende como don, sin que nadie la haya ganado; y existe la אִתְעֲרוּתָא דִּלְתַתָּא, el despertar desde abajo — el movimiento que arranca en la criatura. Los dos son verdaderos y el año entero los alterna. Elul es, declaradamente, el mes del segundo. No porque Dios esté lejos —el Rey está en el campo, más cerca que nunca— sino porque hay una clase de cercanía que solo existe si la eliges. El don que se recibe sin haberlo deseado se disfruta; el que se recibe después de haberlo buscado, se posee.`,
          `Y el secreto último, el que cierra el número. Elul = 67 = Biná, y תְּשׁוּבָה = תָּשׁוּב ה', "devuelve la hei" (Zohar, citado en Tania, Igueret HaTeshuvá 4). ¿Adónde vuelve la hei? A Biná, la Madre superior. La imagen que la Cabalá guarda debajo de toda la teología de este mes es maternal, no forense: el retorno no es un reo que se presenta ante el tribunal —eso es Rosh Hashaná, y llega después— sino un hijo que vuelve a la casa de la madre. Elul precede al juicio a propósito. Primero la casa; después la corte. Y quien llega al juicio habiendo vuelto ya a casa, llega de otra manera.`,
        ],
      },
    ],
    caja: {
      titulo: "אֱלוּל = 67 = בִּינָה — y las cuatro yudim finales del verso = 40.",
      cuerpo:
        "El nombre del mes está en las iniciales; los cuarenta días, en las finales. אֲנִי לְדוֹדִי וְדוֹדִי לִי guarda a Elul por delante y su plazo por detrás — y vale lo mismo que Biná, el entendimiento, porque la teshuvá (תָּשׁוּב ה׳) es devolver la hei a la Madre. La letra que el Sefer Yetzirá le asigna al mes es la yud, la más pequeña, y su sentido es מַעֲשֶׂה: acción.",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que la cercanía disponible y la cercanía real no son lo mismo. El Rey está en el campo — eso no depende de mí y no tengo que ganarlo. Pero levantar la cabeza sí depende de mí, y nadie puede hacerlo en mi lugar. La tradición nombró a este mes con el verso en que el alma habla primero, y con eso me dijo algo que no se puede suavizar: hay un movimiento que me toca a mí. Elul no me pide ser bueno; me pide empezar.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón del orden. Las mismas palabras, en distinto orden, describen relaciones distintas: si Él empieza, recibo; si yo empiezo, me encuentro. Veo el patrón del plazo: cuarenta días entre una subida y una bajada, con un principio y un final marcados, escritos hasta en las letras finales del verso. Y veo el patrón del vaso: la luz llena huecos, no bloques. Todo lo que en mí ya está lleno de sí mismo — de razones, de defensas, de justificaciones del año — es exactamente lo que no puede recibir nada este mes.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Elul me da una palabra distinta para lo que suelo llamar culpa. תְּשׁוּבָה no es penitencia: es retorno, תָּשׁוּב ה' — devolver la hei a la Madre. La imagen no es un tribunal sino una casa. Y me da una medida a mi tamaño: la letra del mes es la {{letter:yod|yud}}, la más pequeña de todas, un punto casi invisible, y su sentido es acción. Mi alma no necesita un gesto heroico para volver; necesita un gesto real. Un punto basta — pero tiene que existir.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `El año tiene una estructura, no es una línea plana. Hay tiempos en que la luz baja regalada y tiempos en que espera un movimiento; Elul es de los segundos, y ese ritmo —dar y recibir, iniciativa y respuesta— es el mismo latido con el que la Cabalá describe toda la creación. Que el mes valga 67, como Biná, dice que la puerta de vuelta del mundo entero no es la fuerza sino el entendimiento: comprender lo que pasó es ya la mitad del regreso.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, sal al campo: escoge UNA relación, di la primera palabra tú, y no esperes a que el otro la diga.",
    texto: `El mes se llama con el verso en el que yo empiezo, así que la práctica tiene que empezar en ti. Hazlo en dos capas, en este orden. Primero, la capa horizontal, hoy mismo: piensa en UNA sola relación donde hay algo pendiente —una llamada que le toca al otro, una disculpa que estás esperando, un silencio que ya lleva demasiado— y da tú el primer paso sin condicionarlo a la respuesta. No hace falta un discurso: un mensaje, una llamada de dos minutos, «estuve pensando en ti». La medida del mes es la yud, el punto más pequeño que existe, y su sentido es מַעֲשֶׂה, acción: lo que cuenta es que exista, no que sea grande. Y no es casual que el segundo acróstico de Elul sea el de la tzedaká —«cada uno a su prójimo, y regalos a los pobres» (Ester 9:22)—: si de verdad no se te ocurre a quién, dale hoy algo a alguien que lo necesite, sin que te lo pida.

Segunda capa, la vertical, esta noche antes de dormir: quince minutos de escudriñar, que es lo que significa la raíz א־ל־ל del Targum. No revises el año entero —eso no se puede y solo produce culpa difusa—: elige UN solo terreno (cómo hablo en casa, cómo manejo el dinero, cómo trato mi cuerpo, cómo cumplo lo que prometo) y míralo como los espías miraron la tierra, con honestidad de informe: qué hay aquí de bueno, dónde está la brecha, qué se puede reparar antes de Rosh Hashaná. Escríbelo en tres líneas. Y repítelo con otro terreno cada día que quede del mes: el plazo es de cuarenta días y ya empezó a correr. El muro de Nechemiá se terminó el 25 de Elul, y se terminó porque alguien empezó.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `אֱלוּל son las iniciales de אֲנִי לְדוֹדִי וְדוֹדִי לִי, "yo soy de mi Amado y mi Amado es mío" (Shir HaShirim 6:3). El mismo libro trae esas palabras en orden inverso (2:16, "mi Amado es mío y yo soy suyo") y en un tercer orden (7:11). Que la tradición eligiera precisamente la versión donde el alma habla PRIMERO define el trabajo del mes: en Elul el movimiento arranca abajo. Malbim lo dice sobre el verso mismo: מתחלת — es ella la que empieza.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `El mes es un plazo, no un ánimo: los cuarenta días del tercer ascenso de Moshé, de Rosh Jodesh Elul a Yom Kipur, con shofar cada mañana "para advertir a Israel que hagan teshuvá" (Tur, Oraj Jaim 581, citando Pirkei deRabí Eliezer). Y el verso guarda ambas cosas: el nombre del mes en sus letras iniciales, y el plazo en las finales — cuatro yudim, 10 × 4 = 40.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `El Rey está en el campo (Likutei Torá, Re'eh 32b): la cercanía ya fue concedida, cualquiera puede acercarse, no hacen falta protocolos. Pero el Rey en el campo no toca a la puerta de nadie. Por eso אֱלוּל = 67 = בִּינָה: volver es תָּשׁוּב ה', devolver la hei a la Madre superior (Tania, Igueret HaTeshuvá 4) — y eso se hace entendiendo, no flagelándose. Primero la casa; el tribunal viene después, en Rosh Hashaná.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Dar hoy el primer paso en una relación pendiente, sin condicionarlo a la respuesta del otro — y dedicar quince minutos a escudriñar (la raíz א־ל־ל del Targum) un solo terreno del año propio. La letra del mes es la yud, la más pequeña, y su sentido es מַעֲשֶׂה: acción. El tamaño del gesto no importa; su existencia sí.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "No es una cita ni una fuente clásica: es una lectura de Jashmal, marcada como tal.",
    parrafos: [
      `Hay un detalle del que la tradición no hace doctrina y que aquí se ofrece solo como lectura. En todo el Tanaj, "Elul" se escribe una única vez: "וַתִּשְׁלַם הַחוֹמָה בְּעֶשְׂרִים וַחֲמִשָּׁה לֶאֱלוּל" — "y se terminó el muro a los veinticinco de Elul" (Nechemiá 6:15). La única vez que la Escritura pronuncia el nombre de este mes, lo que ocurre es que se cierran las brechas de una ciudad arruinada, después de cincuenta y dos días de trabajo, con enemigos alrededor y con la mitad del pueblo trabajando mientras la otra mitad sostenía lanzas, escudos, arcos y corazas (Nechemiá 4:10).`,
      `Léelo como imagen del mes y encaja entero: en Elul no se construye una ciudad nueva, se reparan los boquetes de la que ya existe; el trabajo tiene fecha de entrega; se hace con oposición, incluida la de adentro; y termina antes de Rosh Hashaná — el 25 de Elul, a cinco días del juicio. Nadie está obligado a leerlo así. Pero que el único "Elul" del Tanaj sea un muro que se termina justo a tiempo es, por lo menos, una coincidencia bien colocada.`,
    ],
  },

  hemshej: [
    "{{study:despertar-de-lo-alto|Si en Elul el primer paso es mío, ¿qué pasa con la luz que nadie se gana? La otra mitad del asunto: el despertar desde Arriba.}}",
    "{{letter:yod|La letra del mes es la yud: la más pequeña del alfabeto, un punto suspendido — y su sentido es «acción». ¿Por qué la letra más chica rige el mes más exigente?}}",
    "{{study:26|«Yo soy de mi Amado»: אַהֲבָה (amor) y אֶחָד (uno) valen 13 cada uno, y sumados dan 26 — el Nombre. Donde hay unión de verdad, aparece Su Nombre.}}",
    "{{study:exilio-redencion|Entre גּוֹלָה (exilio, 44) y גְּאוּלָּה (redención, 45) hay una sola letra: el Álef. La misma lógica del retorno, en clave de historia.}}",
  ],

  ctaRef: "Song of Songs 6:3",
};
