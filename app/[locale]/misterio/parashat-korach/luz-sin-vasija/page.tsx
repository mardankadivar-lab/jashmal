"use client";

import EstudioMisterio, { type EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — פָּרָשַׁת קֹרַח · Parashat Korach — Koraj y Shmuel
//  La Luz sin Vasija — Bamidbar 16:2 · 17:12-13 · Shmuel I 12:3
//
//  Jidush de Mardan Kadivar: síntesis a partir de Mishlei 20:27,
//  Tikkunei Zohar 41a y Sha'ar HaGilgulim.
//
//  Sub-ruta: /misterio/parashat-korach/luz-sin-vasija
// ════════════════════════════════════════════════════════════════════════════

const data: EstudioData = {
  slug: "luz-sin-vasija",
  hero: {
    serielabel: "Serie «Parashá» · Parashat Korach — Koraj y Shmuel",
    serielabelFa: "سری «پاراشا» · پاراشات قورَح — قورَح و شموئل",
    he: "הַנֵּר שֶׁנִּשְׁבַּר",
    titulo: "La Luz sin Vasija",
    tituloFa: "نور بدون ظرف",
    numero: { valor: "250", rom: "נֵר · Ner" },
    ganchoEs: "Tenía la llama. No tenía la mecha. Por eso ardió.",
    ganchoFa: "شعله داشت. فتیله نداشت. به همین دلیل سوخت.",
  },
  targum: {
    citas: [
      {
        label: "Bamidbar 16:2",
        he: "וַיָּקֻמוּ לִפְנֵי מֹשֶׁה וַאֲנָשִׁים מִבְּנֵי־יִשְׂרָאֵל חֲמִשִּׁים וּמָאתָיִם נְשִׂיאֵי עֵדָה",
        es: "Y se levantaron ante Moshé doscientos cincuenta hombres, príncipes de la congregación.",
        source: "Bamidbar 16:2",
      },
      {
        label: "Bamidbar 17:12-13",
        he: "וַיִּקַּח אַהֲרֹן כַּאֲשֶׁר דִּבֶּר מֹשֶׁה וַיָּרָץ אֶל־תּוֹךְ הַקָּהָל... וַיַּעֲמֹד בֵּין הַמֵּתִים וּבֵין הַחַיִּים וַתֵּעָצַר הַמַּגֵּפָה",
        es: "Tomó Aharón como Moshé dijo y corrió al centro de la congregación... y se paró entre los muertos y los vivos, y la plaga se detuvo.",
        source: "Bamidbar 17:12-13",
      },
      {
        label: "Shmuel I 12:3",
        he: "הִנְנִי עֲנוּ בִי נֶגֶד יְהֹוָה... אֶת־שׁוֹר מִי לָקַחְתִּי וַחֲמוֹר מִי לָקַחְתִּי",
        es: "Aquí estoy. Testifiquen contra mí ante el Eterno. ¿El buey de quién tomé? ¿El burro de quién tomé?",
        source: "Shmuel I 12:3",
      },
      {
        label: "Shmuel I 12:23",
        he: "גַּם אָנֹכִי חָלִילָה לִּי מֵחֲטֹא לַיהֹוָה מֵחֲדֹל לְהִתְפַּלֵּל בַּעַדְכֶם",
        es: "También yo, lejos de mí pecar contra el Eterno cesando de orar por vosotros.",
        source: "Shmuel I 12:23",
      },
      {
        label: "Mishlei 20:27",
        he: "נֵר יְהֹוָה נִשְׁמַת אָדָם חֹפֵשׂ כָּל־חַדְרֵי־בָטֶן",
        es: "La vela del Eterno es la Neshama del hombre, que escudriña todas las cámaras del vientre.",
        source: "Mishlei 20:27",
      },
    ],
    parrafos: [
      "El número 250 aparece dos veces en el relato: los 250 príncipes que mueren con Koraj (16:2) y las 14,700 víctimas de la plaga posterior (17:14). La gematría del primero es la clave del misterio: חֲמִשִּׁים וּמָאתָיִם — cincuenta y doscientos — Nun (50) y Resh (200) = נֵר, vela.",
      "La Haftará yuxtapone el discurso de despedida de Shmuel HaNavi (1 Sm 11:14–12:22) al relato de Koraj. El mismo Shabat. El mismo tema desde el polo opuesto: el líder que pide que lo acusen versus el rebelde que acusa para liderar.",
    ],
  },
  mefarshim: {
    parrafos: [
      {
        etiqueta: "רַשִׁ\"י — Rashi. Verificado en Sefaria.",
        texto: "Koraj usó palabras verdaderas de la Torá como arma — 'toda la congregación es santa' (Vayikrá 19:2) — para desmantelar la estructura que esa misma Torá construye. El argumento es formalmente correcto; el propósito lo corrompe.",
      },
      {
        etiqueta: "רַמְבַּ\"ן — Ramban. Verificado en Sefaria.",
        texto: "Koraj confundió la santidad colectiva con la igualdad de función. Todos son santos; no todos son Kohanim. La santidad no elimina la jerarquía — la perfecciona. El sol y la luna son ambos lumbreras, pero tienen órbitas diferentes.",
      },
      {
        etiqueta: "מַלְבִּ\"ים — Malbim sobre Shmuel.",
        texto: "El discurso de Shmuel es la respuesta definitiva a toda acusación de liderazgo corrupto. El líder verdadero no teme el juicio — lo invita. 'Testifiquen contra mí' no es retórica; es la prueba que distingue al que sirve del que controla.",
      },
      {
        etiqueta: "תַּלְמוּד בַּבְלִי — Talmud Bavli, Kritot 6a-b. Verificado.",
        texto: "El Ketoret tiene 11 ingredientes. Uno es la חֶלְבְּנָה (Chelbená/galbanum) — que huele mal. Y la Halajá establece: 'Todo ayuno comunal que no incluya a los pecadores de Israel no es un ayuno — pues la Chelbená huele mal y aun así la Torá la incluyó entre los ingredientes del Ketoret.' Sin la Chelbená, el Ketoret es inválido.",
      },
      {
        etiqueta: "אריז\"ל — El Arizal, Sha'ar HaGilgulim Hakdamá 36. Alta confianza.",
        texto: "Koraj es gilgul de Kayin. Moshé lleva chispas de Hevel. La rebelión del desierto es la guerra primordial reescrita: el celo por la elección divina. Kayin mató a Hevel porque su ofrenda no fue aceptada. Koraj rebeló a Israel porque el sacerdocio no fue suyo.",
      },
      {
        etiqueta: "תִּקּוּנֵי זוֹהַר — Tikkunei Zohar 41a. Texto arameo verificado.",
        texto: "La vela (נֵר) tiene tres estratos: la llama blanca superior = Neshama; la llama exterior azul = Ruaj; la mecha en el aceite = Nefesh. El Ner completo requiere los tres niveles. Una llama sin mecha no alumbra — consume.",
      },
    ],
  },
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat",
        parrafos: [
          "Koraj y 250 príncipes se rebelan. La tierra los traga. El fuego consume a los 250. Sus cazos son laminados en el altar. Aharón detiene la plaga con el mismo ketoret. La Torá reestablece las funciones de Kohanim y Leviim. Generaciones después, Shmuel somete su liderazgo al juicio colectivo y es absuelto. La Torá y los Profetas ponen los dos polos en el mismo Shabat: el que toma sin recipiente y el que se ofrece al juicio.",
        ],
      },
      {
        head: "רֶמֶז — Remez",
        parrafos: [
          "La Torá elige 250 — no 100, no 300. Y Shmuel dice 'testifiquen contra mí.' El número y el gesto son el espejo exacto. 250 = נֵר: el que intenta tomar el fuego sin recipiente; el 'testifiquen' que ofrece su vida a examen. Los dos forman una balanza: lo que se toma versus lo que se ofrece.",
        ],
      },
      {
        head: "דְּרָשׁ — Drash",
        parrafos: [
          "El Baal Shem Tov enseñó que todo lo que el hombre ve afuera es espejo de adentro. Koraj vio en Moshé lo que él quería ser — y en vez de aprender, atacó. Shmuel vio lo que el pueblo necesitaba — y sirvió, incluso después de ser rechazado. La diferencia entre el líder falso y el verdadero no es la capacidad. Es a quién sirven.",
        ],
      },
      {
        head: "סוֹד — Sod: La gematría escondida",
        parrafos: [
          "250 = נֵר (Nun 50 + Resh 200). Los 250 hombres son un Ner — una vela. Mishlei 20:27 da la clave: 'La vela del Eterno es la Neshama del hombre.' Las dos letras del Ner son las dos capas del alma: Nun (נ) = Neshama — la llama blanca, Biná, las 50 puertas del entendimiento. Resh (ר) = Ruaj — la llama azul, Ze'ir Anpin, los 6 sefirot emocionales. Los 250 tenían el NR real. Pero les faltaba la מָחַט — la mecha. El Nefesh: el recipiente físico, la autorización, la función del Kohen que ata la llama al suelo. Intentaron encender el Ner sin mecha. La llama los consumió. (Jidush de Mardan Kadivar — síntesis a partir de Mishlei 20:27, Tikkunei Zohar 41a y Sha'ar HaGilgulim.)",
          "Igulim sin Yosher: El argumento de Koraj — 'toda la congregación es santa' — es verdad de Igulim. En las luces circulares, todo punto es equidistante del centro. Pero el Arizal enseña que tras el Tzimtzum entró el Kav — la línea recta, el Yosher — creando arriba y abajo, Keter sobre Maljut. No para jerarquizar el valor de las almas sino para que la luz descienda sin destruir. Koraj toma la verdad de Igulim y la lanza contra la estructura de Yosher. Eso es la Shevirat: demasiada luz, sin el Árbol que la baje ordenadamente.",
          "El Ketoret: 10 + 1. El Ketoret tiene 11 ingredientes. Los 10 aromáticos = los 10 sefirot. El undécimo, la Chelbená que huele mal = Klipat Nogah. El Zohar enseña la Hamtakat HaDinim — el endulzamiento de los juicios. La Chelbená sola es Din crudo, amargo. La Chelbená dentro de los 10, mezclada, calentada: el amargo desaparece y el conjunto asciende como una sola fragancia. El error de los 250: querían que la Chelbená reemplazara los 10. El Tikún de Aharón: el mismo Ketoret con los 11 en proporción exacta. La misma Chelbená dentro de la estructura. El fuego que destruyó a 250 → detuvo la plaga de 14,700.",
          "El Tikún en cuatro movimientos: (1) Los cazos de los 250 laminados en el altar — el metal de la Shevirat absorbido en el Mishkán. (2) Aharón corre con el Ketoret completo — la misma sustancia, el recipiente correcto. (3) Las leyes de Kohanim y Leviim (Bamidbar 18) — el Yosher reconstruido explícitamente. (4) Los hijos de Koraj hacen teshuvá y se convierten en los autores de los Salmos más sublimes de Israel — la Chelbená más amarga transforma en la fragancia más exquisita.",
        ],
      },
    ],
  },
  hitbonenut: {
    intro: "Siéntate con esto antes de continuar.",
    parrafos: [
      {
        etiqueta: "La llama que no se sostiene.",
        texto: "Los 250 tenían llama real. Neshama y Ruaj genuinos. El problema no fue la altura — fue confundir la altura con la autorización. Cuántas veces ardemos sin mecha: no por ser malos sino por ser altos. Porque tenemos visión, tenemos fuego, tenemos el sentido de que algo debería ser diferente. Y en vez de construir el recipiente — la base, el Yosher, la estructura — vamos directo a encender.",
      },
      {
        etiqueta: "¿Eres la Chelbená adentro o afuera?",
        texto: "¿Cuántas veces somos la Chelbená — el elemento diferente, el que incomoda, el que tiene el olor que nadie quiere? La Torá dice: sin ti, el Ketoret es inválido. Pero dentro de los 10 — no en lugar de ellos. Esa es la diferencia entre el rebelde que destruye y el hijo de Koraj que crea los Salmos.",
      },
    ],
  },
  maase: {
    intro: "Una acción concreta para esta semana.",
    etiqueta: "El ejercicio:",
    texto: "Identifica si en algún área de tu vida estás siendo Chelbená afuera de los 10 — exigiendo lugar sin incorporarte — o Chelbená dentro de los 10 — aportando tu diferencia desde dentro de la estructura. El primero es Koraj. El segundo es la fragancia que falta.",
  },
  jatima: {
    items: [
      {
        etiqueta: "Idea central:",
        texto: "250 = Ner. Los más grandes ardieron no por ser malos sino por tener llama sin mecha — Neshama y Ruaj sin el recipiente del Nefesh y la estructura del Yosher.",
      },
      {
        etiqueta: "Insight clave:",
        texto: "La verdad de Igulim (todos son iguales en raíz divina) no cancela el Yosher (la estructura que baja la luz sin romper). Koraj usó la primera para destruir el segundo. Shmuel usó la primera dentro del segundo. Esa es la diferencia entre Shevirat y Tikún.",
      },
      {
        etiqueta: "Insight espiritual:",
        texto: "El Ketoret exige el ingrediente amargo. El Tikún del mundo requiere que Klipat Nogah sea incorporada — no eliminada. La Chelbená dentro de los 10 = Din endulzado por Chassadim = la fragancia completa. Sin el elemento difícil, la ofrenda es inválida.",
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: "El liderazgo verdadero no teme el juicio — lo invita. El rebelde genuino no pide el lugar de los 10 — se funde dentro de ellos y aporta lo que solo él tiene: el olor diferente que completa la fragancia.",
      },
    ],
  },
  hemshej: [
    "{{study:shevirat-hakelim|La Ruptura de los Recipientes — cuando la luz es demasiado grande para la vasija}}",
    "{{study:kayin-hevel|Kayin y Hevel — la guerra primordial que se repite en cada generación}}",
    "{{letter:nun|La Nun — el alma sumergida que espera emerger}}",
    "{{study:ketoret|El Ketoret — la fragancia que sube más alto que todos los sacrificios}}",
  ],
  ctaRef: "Bamidbar 16:2 · Shmuel I 12:3",
};

export default function Page() {
  return <EstudioMisterio data={data} />;
}
