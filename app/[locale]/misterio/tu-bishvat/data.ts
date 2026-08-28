import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — ט״ו בִּשְׁבָט · רֹאשׁ הַשָּׁנָה לָאִילָן
//  Serie «Tiempos Sagrados» (moadim) · Estudio 7 — Tu BiShvat.
//
//  Hero en modo "par": אִילָן (ilán, árbol) = 91 = יאהדונה״י, el entretejido de
//  יְהֹוָה (26) + אֲדֹנָי (65). NO es una lectura de Jashmal: la traen dos
//  fuentes clásicas verificadas (Peri Etz Hadar 1:17 y Bnei Yissaschar,
//  Shevat 2:3).
//
//  FUENTES VERIFICADAS CONTRA SEFARIA (2026-08-27):
//   · Mishná Rosh Hashaná 1:1 — los cuatro «años nuevos» y la disputa
//     Bet Shamai (1 de Shvat) / Bet Hilel (15 de Shvat). Texto hebreo cotejado.
//   · Rosh Hashaná 14a — "הוֹאִיל וְיָצְאוּ רוֹב גִּשְׁמֵי שָׁנָה, וַעֲדַיִין רוֹב
//     תְּקוּפָה מִבַּחוּץ", en nombre de Rabí Elazar en nombre de Rabí Oshaya.
//     COTEJADO LITERAL. ATENCIÓN: la Guemará habla SOLO de las lluvias. La
//     savia NO está en el Talmud: la agrega RASHI (Rosh Hashaná 14a:9) —
//     "שכבר עבר רוב ימות הגשמים שהוא זמן רביעה ועלה השרף באילנות ונמצאו
//     הפירות חונטין מעתה". Se dice en el cuerpo del estudio.
//   · Rashi a Rosh Hashaná 14a:6 — "שכל גדילת פירותיו ע"י שהעלאת שרף האילן
//     לפני חנטה הוא". Cotejado.
//   · Talmud Yerushalmi, Rosh Hashaná 1:2 — segunda razón: "עד כאן הן חיין
//     ממי השנה שעברה, מיכן והילך הן חיין ממי השנה הבאה". Y R. Janiná:
//     "שמות חדשים עלו בידם מבבל" (los nombres de los meses subieron de
//     Babilonia). Cotejado. También: "פירות נטיעה זו אסורין עד חמשה עשר בשבט".
//   · Devarim 20:19 — texto masorético cotejado. Rashi ad loc.: "הרי כי משמש
//     בלשון דלמא, שמא האדם עץ השדה…" (pregunta retórica). Ibn Ezra ad loc.:
//     "כי חיי בן אדם הוא עץ השדה". Ramban ad loc.: "יפה פירש רבי אברהם".
//     Rashbam ad loc.: "כל כי שאחרי לא מתפרש אלא". Sforno ad loc. Malbim ad
//     loc. (cita a Ibn Ezra). TODOS cotejados.
//   · Sifrei Devarim 203 — "כי האדם עץ השדה, מלמד שחייו של אדם אינם אלא מן
//     האילן". Cotejado.
//   · Ta'anit 7a — R. Yojanán: "כי האדם עץ השדה, וְכִי אָדָם עֵץ שָׂדֶה הוּא?"
//     y la resolución del talmid jajam. Cotejado literal.
//   · Devarim 8:8 (las siete especies) — cotejado. Abarbanel a Devarim 8
//     cotejado (menciona a Galeno y explica por qué solo esas siete).
//   · Vaikrá 19:23-25 (orlá) y Devarim 14:22-23 (diezmo) — cotejados.
//   · Bereshit 2:9 · Mishlé 3:18 — cotejados. Bereshit Rabá 15:6 — el Árbol de
//     la Vida "מהלך חמש מאות שנה". Cotejado.
//   · Rambam, Hiljot Ma'aser Shení 1:2 — "וּבְט״ו בִּשְׁבָט הוּא רֹאשׁ הַשָּׁנָה
//     לְמַעֲשַׂר הָאִילָנוֹת". Cotejado. Hiljot Melajim 6:8 y 6:10 (bal tashjit) —
//     cotejados.
//   · Shulján Aruj, Oraj Jaim 131:6 — no se dice tajanún en Tu BiShvat.
//     Cotejado. Es la ÚNICA huella del día en el Shulján Aruj.
//   · Peri Etz Hadar (סֵדֶר ט״ו בִּשְׁבָט) 1 y 4 — cotejado entero. Sefaria lo
//     ficha así: autor DESCONOCIDO de la escuela del Arizal, impreso en Venecia
//     en 1728. Y el propio autor escribe en 1:3: "ועם כי בדברי כתבי הרב זל״הה
//     לא נמצא מנהג זה" — «aunque este uso NO se encuentra en los escritos del
//     Rav (el Arizal)». Se dice en el aviso.
//     · 1:10-15 — las TREINTA especies de fruto en TRES grupos de diez, según
//       Rabí Jaim Vital: Beriá (se comen enteras), Yetzirá (hueso adentro),
//       Asiá (cáscara afuera). SON TRES MUNDOS, NO CUATRO. Atzilut no tiene
//       fruto. Corrige el lugar común de «cuatro categorías / cuatro mundos».
//     · 4:5, 4:9, 4:13, 4:22 — las CUATRO copas (blanca / casi blanca / mitad
//       y mitad / roja) con los cuatro milui del Nombre: ע״ב(72), ס״ג(63),
//       מ״ה(45), ב״ן(52). Ahí sí hay cuatro, y son los Nombres, no los frutos.
//     · 1:17 — "שכן אילן בגי׳ יאהדונה״י". · 1:18 — cita a Rashi palabra por
//       palabra ("ועלה השרף באילנות") y lo aplica al árbol de arriba.
//   · Bnei Yissasjar (R. Tzvi Elimélej de Dinov), Shevat 2:2, 2:3, 2:4 —
//     cotejados: "אילן בגימ׳ הוי״ה אדנ״י יחודא שלים"; "זה היום אשר עולה השרף
//     באילנות"; Bet Shamai = guevurá / Bet Hilel = jésed, punto y luna llena.
//   · Likutei Moharán II:11 — "כשהאדם מתפלל בשדה, אזי כל העשבים כולם באין
//     בתוך התפלה". Cotejado.
//   · Sefer Yetzirá (versión del Gra) 5 — las doce letras simples en orden
//     ה ו ז ח ט י ל נ ס ע צ ק frente a los doce meses Nisán…Adar: la letra del
//     mes de Shvat es la צ (tzadi) y su signo, Dlí (Acuario). Cotejado.
//   · Fecha: 15 de Shvat 5787 = 23 de enero de 2027 (conversor hebcal;
//     además cae en Shabat Shirá, parashat Beshalaj).
//
//  GEMATRÍAS CALCULADAS LETRA POR LETRA (Python) Y VERIFICADAS:
//    אִילָן = א1+י10+ל30+ן50 = 91
//    יְהֹוָה = 10+5+6+5 = 26 · אֲדֹנָי = 1+4+50+10 = 65 → 26+65 = 91
//    יאהדונהי = 10+1+5+4+6+50+5+10 = 91 (el entretejido de ambos Nombres)
//    ט״ו = 9+6 = 15 · יָ־הּ = 10+5 = 15 (por eso se escribe ט״ו y no י״ה)
//    שְׁבָט = 300+2+9 = 311 · עֵץ = 160 · פְּרִי = 290 · חֲנָטָה = 72
//  DESCARTADAS (se dice en el cuerpo):
//    · Peri Etz Hadar 1:17 afirma también "אילן במלואו גי׳ י״ב צירופי הוי״ה".
//      El milui אלף יוד למד נון = 111+20+74+106 = 311, y 12×26 = 312. Solo
//      cierra con el kolel (+1). No se presenta como hallazgo: se dice que
//      necesita el kolel.
//    · שְׁבָט (311) = אִישׁ (311) y = el milui de אִילָן (311). Aritmética
//      correcta, pero sin fuente ni contenido: se descarta y no se usa.
//    · עֵץ (160) no equivale a nada relevante; no se usa.
//
//  Idioma del análisis: español (el chrome —nav/CTA— es es/fa/en).
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "tu-bishvat",
  hero: {
    serielabel:
      "Serie «Tiempos Sagrados» · Estudio 7 — Tu BiShvat · la fiesta que nació de una fecha de impuestos",
    serielabelFa:
      "سری «زمان‌های مقدس» · مطالعهٔ ۷ — تو بیشواط · جشنی که از یک تاریخِ مالیاتی زاده شد",
    he: "רֹאשׁ הַשָּׁנָה לָאִילָן",
    titulo: "Tu BiShvat — la savia que sube antes de que se vea nada",
    tituloFa: "تو بیشواط — شیره‌ای که پیش از دیده‌شدن بالا می‌آید",
    ganchoEs:
      "Es la fiesta más humilde del calendario: no es bíblica, no tiene liturgia propia y empezó siendo un tecnicismo tributario — la fecha de corte para calcular el diezmo de los frutos del árbol. En pleno invierno, cuando el árbol parece muerto, los Sabios pusieron ahí un año nuevo. Y la razón que dan es que ya llovió lo suficiente. Rashi agrega la frase que lo cambia todo: y la savia ya subió.",
    ganchoFa:
      "فروتن‌ترین عیدِ گاه‌شمار است: در تورات نیامده، آیینِ نمازِ ویژه ندارد، و در آغاز تنها یک نکتهٔ فنیِ مالیاتی بود — تاریخِ بستنِ حساب برای دهیکِ میوهٔ درخت. در میانهٔ زمستان، آن‌گاه که درخت مرده می‌نماید، حکیمان آنجا سالِ نو نهادند. و دلیلی که می‌آورند این است که باران‌های سال آمده‌اند. راشی جمله‌ای می‌افزاید که همه‌چیز را دگرگون می‌کند: و شیره بالا آمده است.",
    par: {
      a: { he: "אִילָן", rom: "Ilán · el árbol (Mishná RH 1:1)" },
      b: { he: "יאהדונה״י", rom: "YHVH (26) + Adonai (65), entretejidos" },
      valor: "91",
    },
    fecha: "Tu BiShvat 5787 · 23 ene 2027",
    backHref: "/misterios",
    backLabel: "Misterios",
    backLabelFa: "رازها",
  },

  aviso: {
    titulo: "Nota del Sofer — cuatro cosas que este estudio NO afirma",
    rotulo:
      "Se dicen de entrada, porque en Tu BiShvat es muy fácil vender una costumbre bonita como si fuera ley de la Torá.",
    parrafos: [
      `Primero: Tu BiShvat no es una fiesta bíblica. No hay un solo versículo que la ordene. No aparece entre los moadim de Vaikrá 23, no tiene ofrenda, no tiene prohibición de trabajo, no tiene liturgia propia. Nace como una línea en una Mishná sobre contabilidad agrícola (Rosh Hashaná 1:1). Su única huella en el Shulján Aruj es una omisión: "se acostumbra no caer sobre el rostro —no decir tajanún— en el quince de Av, ni en el quince de Shvat…" (Oraj Jaim 131:6). Eso es todo lo que la halajá clásica dice del día. Ni árboles plantados, ni frutos, ni seder.`,
      `Segundo, y es el punto donde más se resbala: la frase כִּי הָאָדָם עֵץ הַשָּׂדֶה (ki ha'adam etz hasadé) NO significa "porque el hombre es un árbol del campo" en el sentido llano. Rashi la lee como pregunta retórica —"¿acaso el árbol del campo es un hombre, para entrar contigo en el asedio?"— y el Talmud, en Taanit 7a, la interroga literalmente: וְכִי אָדָם עֵץ שָׂדֶה הוּא — "¿y acaso el hombre es un árbol del campo?". Este estudio muestra las dos lecturas, la de Rashi y la de Ibn Ezra, y no vende la homilética como pshat.`,
      `Tercero, el "seder de Tu BiShvat" con sus cuatro copas y sus treinta frutos. Existe, está verificado y es hermoso — pero es tardío: el Peri Etz Hadar (también llamado Séder Tu BiShvat) se imprimió como folleto en Venecia en 1728, y Sefaria lo ficha con autor DESCONOCIDO, de la escuela del Arizal. Más honesto todavía: el propio autor escribe, en la primera página, que "aunque este uso NO se encuentra en los escritos del Rav (el Arizal) de bendita memoria, aun así, a mi entender, es un tikún maravilloso". Lo dice él, no nosotros.`,
      `Y cuarto, la corrección más útil de todo el estudio: se repite mucho que los frutos de Tu BiShvat se dividen en CUATRO categorías por los CUATRO mundos. No. La fuente —el Peri Etz Hadar, citando a Rabí Jaim Vital— habla de TREINTA frutos en TRES grupos de diez: Beriá, Yetzirá y Asiá. Atzilut no tiene fruto, porque allí no hay nada que pelar. Los cuatro que sí aparecen en el texto son las cuatro copas de vino, y corresponden a los cuatro deletreos del Nombre. Tres de frutos, cuatro de copas: son cosas distintas.`,
    ],
  },

  mapa: {
    titulo: "Mapa del argumento — de una fecha contable a un árbol de vida",
    intro: [
      `El esqueleto antes del recorrido. Seis textos verificados sostienen este estudio, y cada uno da un paso: primero el corte fiscal, después la razón física del corte, después la razón oculta, y al final el árbol que el hombre resulta ser — o no ser.`,
    ],
    filas: [
      {
        ref: "Mishná Rosh Hashaná 1:1",
        he: "בְּאֶחָד בִּשְׁבָט רֹאשׁ הַשָּׁנָה לָאִילָן",
        es: "El primero de Shvat es año nuevo del árbol",
        funcion:
          "El origen: una fecha de corte contable. Y la disputa: Bet Shamai el 1, Bet Hilel el 15.",
      },
      {
        ref: "Rosh Hashaná 14a",
        he: "הוֹאִיל וְיָצְאוּ רוֹב גִּשְׁמֵי שָׁנָה",
        es: "Porque ya salió la mayor parte de las lluvias del año",
        funcion: "La razón que da el Talmud. Habla de agua, no de savia.",
      },
      {
        ref: "Rashi a Rosh Hashaná 14a",
        he: "וְעָלָה הַשְּׂרָף בָּאִילָנוֹת",
        es: "Y la savia subió en los árboles",
        funcion:
          "La frase que Rashi agrega y que convierte una fecha fiscal en una meditación.",
      },
      {
        ref: "Vaikrá 19:23-25",
        he: "שָׁלֹשׁ שָׁנִים יִהְיֶה לָכֶם עֲרֵלִים",
        es: "Tres años os será prohibido (orlá)",
        funcion:
          "Por qué hacía falta un corte: sin fecha, no se puede contar la edad de un árbol.",
      },
      {
        ref: "Devarim 20:19",
        he: "כִּי הָאָדָם עֵץ הַשָּׂדֶה",
        es: "Pues el hombre / ¿acaso el hombre? es árbol del campo",
        funcion:
          "El verso más citado del día — y el más discutido. Rashi e Ibn Ezra lo leen al revés uno del otro.",
      },
      {
        ref: "Mishlé 3:18",
        he: "עֵץ־חַיִּים הִיא לַמַּחֲזִיקִים בָּהּ",
        es: "Árbol de vida es para los que se aferran a ella",
        funcion:
          "El destino de la imagen: del árbol del huerto al Árbol de la Vida, que es la Torá.",
      },
    ],
    cierre: [
      `Una fecha de impuestos, una lluvia, una savia, una prohibición de tres años, una pregunta gramatical y un árbol que no está en ningún huerto. Ese es Tu BiShvat.`,
    ],
  },

  targum: {
    citas: [
      {
        label: "Texto-ancla — Mishná Rosh Hashaná 1:1 (los cuatro años nuevos)",
        he: "אַרְבָּעָה רָאשֵׁי שָׁנִים הֵם… בְּאֶחָד בִּשְׁבָט, רֹאשׁ הַשָּׁנָה לָאִילָן, כְּדִבְרֵי בֵית שַׁמַּאי. בֵּית הִלֵּל אוֹמְרִים, בַּחֲמִשָּׁה עָשָׂר בּוֹ׃",
        es: "Cuatro son los años nuevos… El primero de Shvat es año nuevo del árbol, según las palabras de la Casa de Shamai. La Casa de Hilel dice: el quince de ese mes.",
        source: "Mishná Rosh Hashaná 1:1",
      },
      {
        label: "La razón — Talmud Bavlí, Rosh Hashaná 14a",
        he: "בְּאֶחָד בִּשְׁבָט רֹאשׁ הַשָּׁנָה לָאִילָן. מַאי טַעְמָא? אָמַר רַבִּי אֶלְעָזָר אָמַר רַבִּי אוֹשַׁעְיָא׃ הוֹאִיל וְיָצְאוּ רוֹב גִּשְׁמֵי שָׁנָה, וַעֲדַיִין רוֹב תְּקוּפָה מִבַּחוּץ׃",
        es: "«El primero de Shvat es año nuevo del árbol». ¿Cuál es la razón? Dijo Rabí Elazar en nombre de Rabí Oshaya: porque ya salió la mayor parte de las lluvias del año, y todavía la mayor parte de la estación está afuera.",
        source: "Rosh Hashaná 14a",
      },
      {
        label:
          "La frase que Rashi agrega — Rashi a Rosh Hashaná 14a (texto sin puntuar en la fuente)",
        he: "הואיל ויצאו רוב גשמי שנה — שכבר עבר רוב ימות הגשמים שהוא זמן רביעה, וְעָלָה הַשְּׂרָף בָּאִילָנוֹת, ונמצאו הפירות חונטין מעתה׃",
        es: "«Porque ya salió la mayor parte de las lluvias del año» — pues ya pasó la mayoría de los días de lluvia, que es el tiempo de la revi'á, y la savia subió en los árboles, y resulta que los frutos brotan desde ahora.",
        source: "Rashi a Rosh Hashaná 14a, s.v. הואיל ויצאו",
      },
      {
        label: "Por qué hacía falta una fecha de corte — Vaikrá (Levítico) 19:23-25",
        he: "וְכִי־תָבֹאוּ אֶל־הָאָרֶץ וּנְטַעְתֶּם כׇּל־עֵץ מַאֲכָל וַעֲרַלְתֶּם עׇרְלָתוֹ אֶת־פִּרְיוֹ׃ שָׁלֹשׁ שָׁנִים יִהְיֶה לָכֶם עֲרֵלִים לֹא יֵאָכֵל׃ וּבַשָּׁנָה הָרְבִיעִת יִהְיֶה כׇּל־פִּרְיוֹ קֹדֶשׁ הִלּוּלִים לַיהֹוָה׃",
        es: "Y cuando entréis a la tierra y plantéis todo árbol comestible, tendréis su fruto por incircunciso. Tres años os será prohibido, no se comerá. Y en el cuarto año todo su fruto será santo, de alabanza para YHVH.",
        source: "Vaikrá 19:23-25",
      },
      {
        label: "El verso discutido — Devarim (Deuteronomio) 20:19",
        he: "כִּי־תָצוּר אֶל־עִיר יָמִים רַבִּים… לֹא־תַשְׁחִית אֶת־עֵצָהּ לִנְדֹּחַ עָלָיו גַּרְזֶן, כִּי מִמֶּנּוּ תֹאכֵל וְאֹתוֹ לֹא תִכְרֹת, כִּי הָאָדָם עֵץ הַשָּׂדֶה לָבֹא מִפָּנֶיךָ בַּמָּצוֹר׃",
        es: "Cuando sities una ciudad muchos días… no destruirás sus árboles blandiendo contra ellos el hacha, porque de ellos comerás y no los talarás; pues el hombre es árbol del campo (o bien: ¿acaso es el árbol del campo un hombre?) para entrar delante de ti en el asedio.",
        source: "Devarim 20:19",
      },
    ],
    parrafos: [
      `Empieza por donde de verdad empieza, que no es romántico. La primera vez que la tradición pronuncia esta fecha, no está hablando de árboles: está haciendo cuentas. La Mishná abre el tratado de Rosh Hashaná con una frase de administrador: "Cuatro son los años nuevos". Uno para los reyes y las peregrinaciones (1 de Nisán). Uno para el diezmo del ganado (1 de Elul). Uno para los años, los años sabáticos, los jubileos, las plantaciones y las hortalizas (1 de Tishrei). Y uno para el árbol. La Casa de Shamai dice que ese cuarto cae el primero de Shvat; la Casa de Hilel dice que el quince. La halajá siguió a Hilel, y por eso el día se llama con el número: ט״ו, tet-vav, quince — "Tu" BiShvat.`,
      `¿Por qué a alguien le importaría fijar un año nuevo para el árbol? Porque la Torá cuenta el tiempo de los frutos, y sin un corte no se puede contar. Vaikrá 19:23-25 prohíbe comer el fruto de un árbol recién plantado durante tres años —eso es la orlá— y santifica el del cuarto. Devarim 14:22 ordena apartar la décima parte "año tras año", שָׁנָה שָׁנָה. Ahora bien: un manzano no entrega su cosecha en un solo día, y el diezmo del año tercero (que va a Jerusalén) no es el mismo que el del año cuarto (que va al pobre). Así que hay que decidir, con una línea, a qué año contable pertenece cada fruto. Esa línea es Tu BiShvat. En palabras del Rambam, sin poesía: "y en el quince de Shvat es el año nuevo para el diezmo de los árboles" (Hiljot Ma'aser Shení 1:2). Un contador entendería el día entero sin necesitar ninguna mística.`,
      `Y aquí llega la pregunta que abre el estudio. ¿Por qué en pleno invierno? Nadie planta en Shvat, nadie cosecha en Shvat, el árbol está pelado. La Guemará responde con una frase seca: הוֹאִיל וְיָצְאוּ רוֹב גִּשְׁמֵי שָׁנָה — "porque ya salió la mayor parte de las lluvias del año" — y agrega algo que suena a objeción, וַעֲדַיִין רוֹב תְּקוּפָה מִבַּחוּץ, "y todavía la mayor parte de la estación está afuera". Es decir: aunque el frío no ha terminado, el agua del año ya cayó. El criterio no es la temperatura ni la apariencia: es cuánta agua entró a la tierra. Presta atención a esto, porque es exacto: el Talmud fija el año nuevo del árbol en el momento en que el trabajo invisible ya se hizo, no en el momento en que se ve el resultado.`,
      `Rashi, comentando esa misma línea, agrega cinco palabras que no están en el Talmud y que convirtieron una fecha fiscal en una meditación: וְעָלָה הַשְּׂרָף בָּאִילָנוֹת — "y la savia subió en los árboles". Y unas líneas antes ya lo había dicho más completo: "por eso fueron en el árbol según la janatá (el cuajado del fruto), porque todo el crecimiento de sus frutos es por la subida de la savia del árbol, que ocurre antes de la janatá". El dato importa, y hay que decirlo con precisión: el Talmud habla de lluvia; la savia es de Rashi. No es una invención, es una explicación fisiológica de la razón talmúdica — el agua entró, la savia se movió, el fruto ya empezó. Pero por fuera no se ve nada. En Shvat el árbol sigue desnudo. Lo que ocurrió, ocurrió adentro y hacia arriba, en silencio, semanas antes de que aparezca la primera flor.`,
      `El Talmud de Jerusalén conserva además una segunda razón, y es de una belleza casi quirúrgica. Rabí Zeirá enseña que hasta esta fecha los frutos "viven del agua del año que pasó; de aquí en adelante viven del agua del año que viene" (Yerushalmí, Rosh Hashaná 1:2). Dicho de otro modo: en algún punto invisible del interior del árbol hay una línea que separa un año del siguiente, y esa línea no la marca el calendario, la marca de dónde está bebiendo. El mismo tronco, la misma corteza, el mismo silencio — y sin embargo, de un día para otro, el árbol pasó a alimentarse de un futuro distinto.`,
      `Y una honestidad más antes de entrar a los comentaristas, porque es la que da la medida del día. El nombre mismo del mes no es hebreo antiguo. El Yerushalmí, en ese mismo pasaje, trae a Rabí Janiná diciendo sin dramatismo: שְׁמוֹת חֳדָשִׁים עָלוּ בְיָדָם מִבָּבֶל — "los nombres de los meses subieron con ellos desde Babilonia". El Tanaj llamaba a los meses por número o por nombres antiguos (Etanim, Bul, Ziv). "Shvat" entra al hebreo en el retorno del exilio. Así que la fiesta más humilde del calendario tiene un nombre importado, una fecha administrativa, ninguna liturgia propia — y aun así la tradición la convirtió en el día en que se bendice a los frutos y se piensa en el árbol de la vida. Ese trayecto, de la contabilidad a la contemplación, es el estudio.`,
    ],
  },

  mefarshim: {
    parrafos: [
      {
        etiqueta: 'Rashi (רַשִׁ"י) — la lectura incómoda.',
        texto: `Sobre "כִּי הָאָדָם עֵץ הַשָּׂדֶה", Rashi hace exactamente lo contrario de lo que espera el lector moderno. Escribe: "הרי כי משמש בלשון דלמא — aquí la palabra ki funciona en el sentido de '¿acaso?': ¿acaso el árbol del campo es un hombre, para entrar en el asedio delante de ti y sufrir hambre y sed como la gente de la ciudad? ¿Por qué habrías de destruirlo?" (Rashi a Devarim 20:19). Para Rashi el versículo NO dice que el hombre sea un árbol: dice que el árbol NO es un hombre. El árbol no te declaró la guerra, no se refugió tras la muralla, no puede huir. Es un no combatiente. La prohibición de talarlo no nace de una equivalencia mística entre persona y planta, sino de una regla de guerra: no se descarga la violencia sobre lo que no puede defenderse. Y Sforno lee igual: "כי האמנם עץ השדה האדם — ¿acaso, en verdad, es el árbol del campo un hombre?".`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא) — la lectura contraria.",
        texto: `Ibn Ezra rechaza esa solución con nombre y apellido. Explica que hay quien quiso arreglar el versículo agregándole una hei interrogativa —leer הֲכִי, "¿acaso?"— y responde: "וזה הטעם איננו נכון בעיני — y ese sentido no me parece correcto". Su propuesta es que no hace falta arreglar nada, porque la frase se entiende de corrido: "לא תשחית עץ פרי… כי חיי בן אדם הוא עץ השדה — no destruyas el árbol frutal, porque la vida del ser humano ES el árbol del campo". Es decir: el árbol es el sustento del hombre, su vida depende de él, y por eso es criminal talarlo. Y da un paralelo gramatical exacto: "כִּי נֶפֶשׁ הוּא חֹבֵל" (Devarim 24:6) — "porque es un alma lo que está empeñando", donde tampoco significa que la piedra de molino sea un alma, sino que de ella depende una vida. Dos gigantes, el mismo versículo, lecturas opuestas: y el estudio honesto muestra las dos.`,
      },
      {
        etiqueta: 'Ramban / Najmánides (רַמְבַּ"ן) — el árbitro.',
        texto: `El Ramban se pone del lado de Ibn Ezra y lo dice con elegancia: "יָפֶה פֵּרֵשׁ רַבִּי אַבְרָהָם — bien lo explicó Rabí Abraham (Ibn Ezra)", y reconstruye el orden de la frase: "porque de él comerás — pues el hombre es el árbol del campo — y no lo talarás para que entre delante de ti en el asedio". Pero enseguida hace lo que hace siempre: distingue el pshat de la halajá. "Según la opinión de nuestros Maestros (Bavá Kamá 91b), está permitido talar un árbol frutal para construir el asedio", y lo que la Torá enseña con este versículo es una prioridad: primero se corta el árbol estéril, y solo si no alcanza, el frutal. La prohibición real, dice el Ramban, es contra la tala "דֶּרֶךְ הַשְׁחָתָה", por vía de destrucción, sin necesidad — como hacen los ejércitos cuando arrasan la tierra alrededor de una ciudad. Ese es el marco: no un tabú vegetal, sino una ley contra la devastación gratuita.`,
      },
      {
        etiqueta: 'Rashbam (רַשְׁבַּ"ם) — la tercera lectura, la más dura.',
        texto: `El nieto de Rashi, que es el pshatista más radical de todos, propone una tercera gramática: "כל כי שאחרי לא מתפרש אלא — toda partícula ki que viene después de un 'no' se traduce 'sino'". Y entonces el versículo diría: "a ese no lo talarás, SINO al árbol del campo que hace que el hombre venga delante de ti en el asedio — a ese sí". Es decir: los árboles cercanos a la muralla, detrás de los cuales se esconden los defensores, sí se cortan. Rashbam, con esto, deja la frase completamente vacía de metáfora. Se dice porque es la lectura más incómoda para la homilética de Tu BiShvat, y precisamente por eso hay que ponerla sobre la mesa.`,
      },
      {
        etiqueta: "El Sifrí y el Talmud — el midrash que sabe que es midrash.",
        texto: `Ahora bien: la tradición no ignora esta dificultad, la administra. El Sifrí Devarim 203 comenta: "כי האדם עץ השדה, מלמד שחייו של אדם אינם אלא מן האילן — enseña que la vida del hombre no viene sino del árbol", y de ahí Rabí Yishmael saca un kal vajómer: si la Torá te advirtió sobre el árbol que produce frutos, cuánto más sobre los frutos mismos. Y el Talmud, en Taanit 7a, hace algo todavía más limpio: Rabí Yojanán pregunta en voz alta "מַאי דִּכְתִיב כִּי הָאָדָם עֵץ הַשָּׂדֶה — ¿qué significa lo escrito, «pues el hombre es árbol del campo»? וְכִי אָדָם עֵץ שָׂדֶה הוּא? — ¿y acaso el hombre es un árbol del campo?", y solo DESPUÉS de reconocer que literalmente no lo es, construye la enseñanza: como de un árbol se dice "de él comerás y no lo talarás" y de otro "lo destruirás y talarás", así con el maestro: si es un talmid jajam digno, come de él y no lo cortes; si no, apártate. La homilética judía no disimula: primero desactiva el sentido llano, y encima de ese reconocimiento construye la lectura. Eso es lo que hace este día honesto.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבַּנְאֵל) — por qué solo siete frutos.",
        texto: `Sobre las siete especies con que se alaba la tierra —"tierra de trigo y cebada, de vid, higuera y granado; tierra de olivo de aceite y de miel (dátil)", Devarim 8:8—, Abarbanel se hace la pregunta obvia y la responde con una racionalidad casi médica. "Es sabido que en la tierra de Israel hay también otros frutos, como las manzanas y los demás", escribe, "pero Moshé nuestro maestro no mencionó aquí sino las cosas apropiadas y útiles para el sustento del hombre: el pan, el vino, las uvas y los higos —que Galeno, cabeza de los médicos, escribió que con ellos le basta al hombre para conservar su salud— y asimismo el aceite y la miel, que hacen mucha falta para el manejo de la salud y la curación de las enfermedades; y no los demás frutos, cuya materia está dispuesta a corromperse". Nótese: cita a Galeno. La lista de las siete especies no es un ranking de sabor ni un catálogo poético; es la despensa mínima de un pueblo que va a vivir de esa tierra.`,
      },
      {
        etiqueta: 'Malbim (מַלְבִּ"ם) — el registro del silencio.',
        texto: `El Malbim, comentando esa misma parashá, se detiene largamente en las reglas de la guerra y, al llegar al versículo del árbol, hace algo que dice mucho: reproduce a Ibn Ezra casi palabra por palabra y adopta su lectura — "ולפי דעתי פירושו כי חיי בן אדם הוא עץ השדה, וכמוהו כי נפש הוא חובל". Y antes había fijado el filo halájico: "que no destruyas su árbol secando su manantial y dejando que el árbol se seque, pues eso es destrucción sin ninguna necesidad". Es decir: la prohibición no cubre solo el hacha. Cubre también cortarle el agua y esperar. El Malbim entendió que la forma más común de destruir un árbol no es golpearlo: es dejar de regarlo.`,
      },
      {
        etiqueta: 'El Rambam (הָרַמְבַּ"ם) — la ley, y su extensión.',
        texto: `El Rambam saca la prohibición del campo de batalla y la vuelve universal: "No se talan árboles frutales fuera de la ciudad, ni se les impide el canal de agua para que se sequen, pues está dicho 'no destruirás sus árboles'; y todo el que tale, recibe azotes. Y no solo en el asedio, sino en cualquier lugar: todo el que tale un árbol frutal por vía de destrucción, recibe azotes. Pero sí se puede talar si daña a otros árboles, o si perjudica el campo de otros, o si su madera vale mucho: la Torá no prohibió sino la vía de destrucción" (Hiljot Melajim 6:8). Y dos líneas después extiende el principio a todo: "Y no solo los árboles. También el que rompe utensilios, rasga ropas, derriba un edificio, tapa un manantial o echa a perder alimentos por vía de destrucción, transgrede el 'no destruirás'" (6:10). Ahí está el bal tashjit entero. Tu BiShvat, si tiene una ética, es esta — y no es sentimental: es una ley con azotes.`,
      },
      {
        etiqueta: 'El Arizal — pero con el pie de página completo (הָאֲרִ"י).',
        texto: `Ahora la capa cabalística, y hay que entrar con cuidado. El seder de Tu BiShvat —comer treinta frutos, beber cuatro copas de vino que van del blanco al rojo, leer pasajes del Zohar antes de cada especie— está en un libro llamado Peri Etz Hadar ("Fruto del árbol hermoso"), impreso en Venecia en 1728. Sefaria lo cataloga con autor desconocido, de la escuela del Arizal. Y el autor mismo, en su primera página, hace una confesión que vale más que cien atribuciones: "ועם כי בדברי כתבי הרב זל״הה לא נמצא מנהג זה, מ״מ לדעתי תקון נפלא הוא — y aunque este uso no se encuentra en los escritos del Rav (el Arizal) de bendita memoria, aun así, a mi entender, es un tikún maravilloso, en lo revelado y en lo oculto". No hay fraude: hay un maestro anónimo diciendo con todas las letras que está proponiendo algo nuevo.`,
      },
      {
        etiqueta: "El Peri Etz Hadar — la estructura real (y la corrección).",
        texto: `¿Y qué enseña? Que los frutos del árbol se reparten en TREINTA especies distribuidas en TRES grupos de diez, uno por cada uno de los mundos inferiores, y lo atribuye a Rabí Jaim Vital: diez frutos de Beriá, que "por estar lejos de la impureza y cerca de Atzilut no tienen cáscara ni por dentro ni por fuera, y se comen tal como son" (uvas, higos, manzanas, etrogim, peras, membrillos, moras…); diez de Yetzirá, que tienen el hueso adentro y la carne afuera (aceitunas, dátiles, cerezas, duraznos, ciruelas, damascos…); y diez de Asiá, que tienen la cáscara afuera y se come lo de adentro (granadas, nueces, almendras, castañas, avellanas…). Fíjate en la lógica, porque es preciosa: mientras más abajo el mundo, más cáscara hay que atravesar. Y ATENCIÓN a la corrección: son tres, no cuatro. Atzilut no aparece en la lista de frutos, porque en Atzilut no hay nada que pelar. Lo que sí viene en cuatro son las copas de vino —toda blanca, casi blanca, mitad y mitad, casi roja—, y cada una corresponde a uno de los cuatro deletreos del Nombre: ע״ב (72), ס״ג (63), מ״ה (45), ב״ן (52). Frutos, tres. Copas, cuatro. Quien mezcla las dos listas no está citando la fuente: la está recordando mal.`,
      },
      {
        etiqueta: "El Peri Etz Hadar — y la gematría del hero.",
        texto: `Y en la misma introducción está la clave del hero de este estudio. El autor se detiene en un detalle de la Mishná: dice "רֹאשׁ הַשָּׁנָה לָאִילָן", año nuevo DEL ÁRBOL, en singular, y no "de los árboles". ¿Por qué? "רמזו בחכמה לאילנא קדישא, אילנא דחיי — aludieron con sabiduría al Árbol Sagrado, el Árbol de la Vida; y como explicaron los discípulos del Arí, אילן en gematría es יאהדונה״י". El árbol, אִילָן, vale 91: álef 1, yud 10, lámed 30, nun final 50. Y יאהדונה״י es el entretejido de los dos Nombres —YHVH (26) y Adonai (65)— letra por letra, y también vale 91. Es el Nombre trascendente y el Nombre inmanente trenzados en una sola palabra. Y unas líneas después, el mismo autor cita a Rashi textualmente —"דהואיל וירדו רוב גשמי שנה ועלה השרף באילנות ונמצאו פירות חונטים מעתה"— y lo aplica hacia arriba: así como hoy es año nuevo para los frutos del árbol de abajo, "כן דוגמתו למעלה ראש השנה לפירות האילן העליון להשפיע את שפעו הקדוש לפירותיו — así, en su semejanza arriba, es año nuevo para los frutos del Árbol supremo, para derramar su influjo santo sobre sus frutos, que son los mundos".`,
      },
      {
        etiqueta: "El Bnei Yissasjar — el mismo número, otra boca.",
        texto: `Que no se apoye todo en un libro anónimo: la misma gematría la trae, un siglo después y con nombre, Rabí Tzvi Elimélej de Dinov en el Bnei Yissasjar. Comentando por qué la Mishná dice "el árbol" en singular, escribe: "תבין ג״כ טעם למה אמר התנא בלשון יחיד, איל״ן בגימ׳ הוי״ה אדנ״י, יחודא שלים — entenderás también la razón de que el Tanaíta lo dijera en singular: ilán en gematría es Havayá-Adonai, una unificación completa" (Bnei Yissasjar, Shevat 2:3). Y agrega dos cosas más. Primera: "זה היום אשר עולה השרף באילנות — este es el día en que sube la savia en los árboles", y por eso hay costumbre de pedir en Tu BiShvat un etrog hermoso para el Sucot que viene — se reza al principio del crecimiento por el fruto que se necesitará dentro de ocho meses. Segunda, y es fina: Bet Shamai viene del lado de la guevurá, del rigor, y por eso fija el día uno, cuando la luna es apenas un punto; Bet Hilel viene del lado del jésed, del amor, y fija el quince, cuando la luna está llena. La disputa sobre la fecha del árbol es, en el fondo, una disputa sobre si el año nuevo se marca cuando algo empieza o cuando algo está completo.`,
      },
    ],
    glosa: `Glosa para el lector: Ilán (אִילָן) = árbol, en el hebreo de la Mishná. Orlá = literalmente "prepucio"; los tres primeros años en que el fruto de un árbol nuevo está prohibido. Janatá = el momento en que el fruto cuaja, el punto exacto que decide a qué año fiscal pertenece. Revi'á = la temporada de lluvias. Sraf (שְׂרָף) = la savia. Bal tashjit = "no destruirás", la prohibición de arruinar cosas sin necesidad. Pshat = el sentido llano de un texto. Kal vajómer = argumento de menor a mayor. Talmid jajam = estudioso de Torá. Beriá, Yetzirá, Asiá = tres de los cuatro mundos de la Cabalá (Creación, Formación, Acción); el cuarto y más alto es Atzilut, Emanación. Milui = el "relleno" de un nombre, deletrear cada letra por su nombre completo. Tikún = reparación. Kolel = la unidad que a veces se suma a una gematría contando la palabra entera como uno más.`,
  },

  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `A ras de letra, los hechos son cinco y ninguno es místico. Primero: Tu BiShvat no es un moed bíblico, sino la cuarta de las cuatro "cabezas de año" que la Mishná enumera con fines de cálculo (Rosh Hashaná 1:1). Segundo: la Casa de Shamai la ubica el 1 de Shvat y la Casa de Hilel el 15; la halajá sigue a Hilel, y por eso el nombre del día es el número quince — ט״ו, tet-vav. Tercero: la función es contable, y el Rambam la formula sin adornos: "en el quince de Shvat es el año nuevo para el diezmo de los árboles" (Hiljot Ma'aser Shení 1:2). Cuarto: la razón del calendario es hidrológica, "porque ya salió la mayor parte de las lluvias del año" (Rosh Hashaná 14a). Y quinto: la única marca del día en el Shulján Aruj es que no se dice tajanún, la plegaria penitencial (Oraj Jaim 131:6).`,
          `De esos cinco hechos se sigue el pshat del día, y es más raro de lo que parece: Tu BiShvat es la única fecha del calendario judío que se volvió sagrada por un procedimiento administrativo. No conmemora una salida de Egipto, ni una entrega de Torá, ni una salvación. Conmemora un corte de ejercicio fiscal. Lo que la tradición hizo con eso —convertirlo en el día del árbol, en un seder, en una meditación sobre el crecimiento oculto— es exactamente el trabajo del que trata este estudio. Pero el suelo es ese, y conviene no perderlo de vista: la santidad, en el judaísmo, también se construye sobre papeleo.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión: los números y las letras)",
        parrafos: [
          `Primera alusión, y es la del hero. אִילָן = א1 + י10 + ל30 + ן50 = 91. Y el Nombre entretejido יאהדונה״י —que se forma alternando las letras de יְהֹוָה y de אֲדֹנָי: yud, álef, hei, dálet, vav, nun, hei, yud— vale י10 + א1 + ה5 + ד4 + ו6 + נ50 + ה5 + י10 = 91. Los dos Nombres por separado dan lo mismo: YHVH 26 más Adonai 65, igual a 91. No es un hallazgo nuestro: lo dicen el Peri Etz Hadar (1:17) y el Bnei Yissasjar (Shevat 2:3), y el segundo agrega el porqué — יִחוּדָא שְׁלִים, "una unificación completa". YHVH es el Nombre de lo que trasciende; Adonai es el Nombre de lo que gobierna aquí abajo. Un árbol, que tiene la raíz enterrada y la copa en el aire y una sola savia atravesándolo entero, es la figura exacta de esos dos Nombres trenzados. Por eso la Mishná dice "el árbol" en singular: no está contando huertos, está señalando UN árbol.`,
          `Segunda alusión, y es una lección sobre cómo se escribe un número. El día se llama ט״ו בִּשְׁבָט, y ט״ו vale ט9 + ו6 = 15. Pero el modo natural de escribir quince en hebreo sería י״ה — yud 10 más hei 5 — y esas dos letras forman יָ־הּ, Yah, un Nombre divino. Por eso la tradición escribe el quince con tet-vav, para no escribir el Nombre en una fecha de mercado. Fíjate en lo que eso implica y no lo conviertas en gematría, porque no lo es: no estamos diciendo que quince "sea" el Nombre. Estamos diciendo que la tradición prefirió desfigurar un número antes que arriesgarse a escribir el Nombre a la ligera. Y ese cuidado, en el día más administrativo del año, dice mucho de qué clase de administración es esta.`,
          `Tercera alusión, la de la letra del mes. El Sefer Yetzirá, en la versión del Gaón de Vilna (cap. 5), enfila las doce letras simples —ה ו ז ח ט י ל נ ס ע צ ק— frente a los doce meses en orden, Nisán, Iyar, Siván, Tamuz, Av, Elul, Tishrei, Jeshván, Kislev, Tevet, Shvat, Adar. Contando la correspondencia, la letra que rige el mes de Shvat es la {{letter:tzadi|tzadi}} (צ), y su signo es דְּלִי, Acuario, el que carga el cubo de agua. Dos cosas encajan solas. La primera es el agua: el mes cuyo criterio es "ya cayó la mayor parte de la lluvia" tiene por signo a un aguador. La segunda es más profunda: tzadi es la letra de צַדִּיק, el justo — y el pasaje del Zohar con el que se abre el Peri Etz Hadar identifica precisamente "עוֹשֶׂה פְּרִי", "el que hace fruto" de Bereshit 1:11, con "דָּא צַדִּיק יְסוֹד דְּעָלְמָא", el Tzadik, fundamento del mundo. La letra del mes del árbol es la letra del que da fruto.`,
          `Cuarta alusión, y es la que hay que descartar en voz alta, porque enseña más descartándose. El mismo Peri Etz Hadar afirma que "אילן במלואו גי׳ י״ב צירופי הוי״ה" — que el nombre אילן en milui (deletreando cada letra: álef-lámed-fei, yud-vav-dálet, lámed-mem-dálet, nun-vav-nun) equivale a las doce permutaciones del Nombre, es decir a 12 × 26 = 312. Lo calculamos: 111 + 20 + 74 + 106 = 311. Falta uno. Solo cierra sumando el kolel, la unidad que se agrega contando la palabra entera. ¿Es ilegítimo? No: el kolel es una herramienta antigua y reconocida. Pero no es lo mismo un número que cae clavado que un número que necesita muleta, y este estudio no va a presentar el segundo como si fuera el primero. Se dice, se muestra la cuenta, y se deja al lector decidir. (Y por el mismo criterio se descarta otra que salió al paso: שְׁבָט = 311 = אִישׁ. Aritmética correcta, contenido nulo, ninguna fuente. Fuera.)`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza), con la voz jasídica",
        parrafos: [
          `Vuelve al árbol de enero y quédate mirándolo, porque ahí está todo el drash. No tiene hojas. No tiene flores. No tiene fruto. Si lo fotografías en Shvat y en Kislev, las dos fotos son la misma. Un observador razonable diría que no ha pasado nada, y estaría equivocado: lo que pasó fue lo único que de verdad importa. El agua entró en la tierra, la raíz la tomó, la savia empezó a subir por un conducto que nadie ve, y el fruto de julio ya está decidido. Rashi lo pone en cinco palabras —וְעָלָה הַשְּׂרָף בָּאִילָנוֹת— y esas cinco palabras son la definición judía de cómo funciona el cambio: primero por dentro, después hacia arriba, y solo mucho después hacia afuera. La tradición eligió celebrar el año nuevo del árbol en el punto exacto en que el trabajo ya está hecho y todavía no se nota. Nadie pone un año nuevo ahí por casualidad.`,
          `Y de ahí sale la enseñanza que más duele, porque desmonta la impaciencia. Casi todo lo que abandonamos, lo abandonamos en Shvat. No en el otoño, cuando todo se cae y uno sabe que está en pérdida; en Shvat, cuando ya no se cae nada pero tampoco brota nada y parece que el esfuerzo no está produciendo. La persona que dejó de estudiar, de rezar, de tratar mejor a alguien, de reconstruir un vínculo, casi nunca lo dejó por dolor: lo dejó por falta de señales. Tu BiShvat es la fiesta que le pone fecha a ese momento y le pone un nombre: no es esterilidad, es janatá — el fruto cuajando donde no se ve. El Yerushalmí lo dice con una precisión que estremece: "hasta aquí viven del agua del año que pasó; de aquí en adelante viven del agua del año que viene". Un día antes te estabas alimentando de lo viejo. Un día después, de lo que todavía no llega. Y por fuera, el mismo tronco pelado.`,
          `Aquí entra la voz jasídica, y no como decoración. Rabí Najmán de Breslov enseña: "Debes saber que cuando una persona reza en el campo, entonces todas las hierbas, todas ellas, entran dentro de su plegaria y la ayudan, y le dan fuerza en su oración" (Likutei Moharán II:11). Por eso, dice, la plegaria se llama שִׂיחָה, sijá — la misma palabra que שִׂיחַ הַשָּׂדֶה, la vegetación del campo — y por eso está escrito de Yitzjak "וַיֵּצֵא יִצְחָק לָשׂוּחַ בַּשָּׂדֶה" (Bereshit 24:63). Mira lo que hace esa enseñanza con Tu BiShvat: no te pide que veas al árbol como un símbolo tuyo, sino que dejes de estar solo. En enero, cuando tu propio crecimiento no da señales, hay un campo entero alrededor haciendo exactamente lo mismo que tú en el mismo silencio. La hierba no está esperando resultados. Está subiendo savia.`,
          `Y hay una última torsión, la del Bnei Yissasjar, y es la que le da al día su carácter definitivo. Bet Shamai fija el año nuevo del árbol el día uno, cuando la luna es apenas un filo — el rigor mide desde el instante en que algo empieza. Bet Hilel lo fija el quince, con la luna llena — el amor mide cuando algo está completo. La halajá siguió a Hilel, y no es un detalle técnico: significa que el calendario judío decidió celebrar al árbol no en el arranque invisible sino en la plenitud, aun cuando el árbol de afuera sigue igual de desnudo. Es decir: se celebra la plenitud de lo que todavía no se ve. Eso es lo que hace este día. Y por eso el Bnei Yissasjar recomienda que hoy, cuando la savia empieza a moverse, se rece por un etrog hermoso para el Sucot que llegará dentro de ocho meses. Rezar en enero por el fruto de septiembre es la definición práctica de la fe.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `El secreto de Tu BiShvat es que el orden no es negociable: primero se llena el vaso, después se ve la luz. Rav Yehuda Ashlag, el Baal HaSulam, leyó toda la Cabalá como una física del deseo: la criatura es רָצוֹן לְקַבֵּל, voluntad de recibir, y la única cosa capaz de recibir es un espacio que todavía está vacío. La luz nunca precede al vaso. Aplicado al árbol, deja de ser metáfora y se vuelve descripción: la lluvia entra en la tierra —eso es el llenado del vaso, invisible, subterráneo, sin ninguna belleza— y solo después de eso puede haber savia, y solo después de la savia puede haber flor, y solo después de la flor puede haber fruto. El Talmud eligió como criterio del año nuevo el llenado, no la floración. Fijó la fecha en el vaso, no en la luz.`,
          `Por eso el nombre del día tiene sentido siendo tan poco espectacular. Toda la tradición sabe que el fruto es lo llamativo; nadie hace fiestas a la humedad del subsuelo. Y sin embargo la única fecha del calendario dedicada al árbol se puso justo ahí: no cuando el árbol da, sino cuando el árbol recibió. Que el árbol se llame אִילָן y valga 91, la unión de יְהֹוָה con אֲדֹנָי, dice exactamente esto: lo que baja de arriba (la lluvia, el shefa, el Nombre trascendente) y lo que sostiene abajo (la raíz, el reino, el Nombre de la presencia) no son dos historias. Son una sola savia recorriendo una sola columna. Y ese recorrido —eso es un árbol— es lo que la Cabalá llama יִחוּד, unificación.`,
          `Y el secreto último es el que el Peri Etz Hadar dice sin rodeos: "צֵא וּלְמַד כִּי אֵין דָּבָר גַּשְׁמִי פֹּה לְמַטָּה שֶׁאֵין דֻּגְמָתוֹ לְמַעְלָה — sal y aprende que no hay cosa material aquí abajo que no tenga su semejanza arriba… porque los seres de los mundos inferiores son la SOMBRA de los superiores; pues si no hubiera quien proyecta, no habría sombra". Es la frase más exacta que se ha escrito sobre este día. Un árbol de invierno es una sombra: no la de un objeto ausente, sino la de algo que está ocurriendo en este preciso momento y que la sombra no puede mostrar. Y por eso la escala de los frutos que ese mismo libro enseña —cáscara afuera en Asiá, hueso adentro en Yetzirá, comestible entero en Beriá— es una escala de transparencia. Mientras más alto el mundo, menos hay que pelar. Y en Atzilut no hay fruto en la lista, porque allí ya no queda cáscara ninguna: solo la luz, sin envoltura y sin sombra.`,
        ],
      },
    ],
    caja: {
      titulo: "אִילָן = 91 = יאהדונה״י — el Nombre de arriba y el Nombre de abajo, trenzados.",
      cuerpo:
        "El Talmud fija el año nuevo del árbol cuando ya llovió (Rosh Hashaná 14a); Rashi agrega la frase que lo explica todo: וְעָלָה הַשְּׂרָף בָּאִילָנוֹת, y la savia subió en los árboles. Nada se ve todavía. Y sin embargo el año ya cambió: «hasta aquí viven del agua del año que pasó; de aquí en adelante, del agua del año que viene» (Yerushalmí, Rosh Hashaná 1:2).",
    },
  },

  hitbonenut: {
    intro:
      "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar lo que ya se dijo.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que el momento decisivo de un crecimiento no es el momento en que se nota. El Talmud puso el año nuevo del árbol en pleno invierno, cuando no hay una sola señal visible, porque el criterio no era la apariencia sino el agua que ya entró. Eso me obliga a revisar cómo mido mi propia vida. Yo mido por resultados visibles, y por eso abandono justo en Shvat: no cuando duele, sino cuando parece que no pasa nada. El día me enseña que "no pasa nada" y "no se ve nada" son dos frases completamente distintas, y que casi siempre confundo la segunda con la primera.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo el patrón del corte invisible: en algún punto del interior del árbol hay una línea que separa un año del siguiente, y esa línea no la marca ninguna hoja. Veo el patrón del orden — primero el agua, después la savia, después la flor, después el fruto — y que ningún paso se puede saltar ni acelerar. Y veo un patrón sobre las lecturas mismas: Rashi y el Ramban leen "el hombre es un árbol" de maneras opuestas, y la tradición no eligió una y borró la otra. Guardó las dos. El texto se sostiene sobre la tensión, no sobre el acuerdo.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Me da una palabra técnica para algo que yo llamo desánimo: janatá, el instante en que el fruto cuaja sin que se vea. Y me da una medida honesta: el árbol no está fingiendo. No está haciendo esfuerzos por parecer vivo. Está desnudo, y adentro está trabajando. Eso desarma la exigencia de mostrar avances. Y me deja una imagen precisa del día en que caí en la cuenta de que ya no me alimentaba de lo mismo que antes — el día en que dejé de vivir del agua del año viejo. Casi nunca supe qué día fue. Pero hubo uno.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `Que el nombre del árbol valga lo mismo que los dos Nombres entretejidos dice algo sobre cómo está armado el mundo: lo alto y lo bajo no son dos reinos separados con un puente, son una misma savia recorriendo una misma columna. Y la escala de los frutos —cáscara afuera, hueso adentro, comestible entero— dice que la diferencia entre los mundos no es de distancia sino de cuánto hay que pelar para llegar a lo que alimenta. Aquí abajo hay que pelar mucho. Eso no es un castigo: es la descripción del lugar donde estoy.`,
      },
    ],
  },

  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta:
      "Hoy, elige UNA cosa tuya que lleva meses sin dar señales — y en lugar de evaluarla, riégala.",
    texto: `El día se trata de un árbol al que nadie le pide resultados en enero, así que la práctica tiene que ir en esa dirección exacta. Hazla en dos capas, en este orden.

Primero, la capa interior, hoy mismo: identifica UNA sola cosa que empezaste y que hoy no muestra nada — un estudio que no rinde, una relación que se está reparando sin que se note, un hábito nuevo que todavía no cambió tu vida, una oración que sientes vacía. Escríbela en una línea. Y después, en vez de preguntarte "¿está funcionando?", hazte la pregunta de Tu BiShvat: "¿le entró agua?". Es decir: ¿le di tiempo, atención y constancia esta semana? Si la respuesta es sí, no toca evaluarla: toca regarla otra vez. Comprométete a un plazo —treinta días, noventa, lo que sea razonable— antes de volver a juzgarla. La janatá no se apura mirándola.

Segunda capa, la exterior, y es concreta y física: come hoy un fruto de árbol que no comas normalmente, mira de qué mundo es antes de comerlo —si se come entero, si tiene hueso adentro, si hay que pelarlo por fuera— y bendícelo despacio. El Peri Etz Hadar funda todo el seder en esa acción minúscula: quien disfruta de este mundo sin bendecir es como quien roba, y el que ve un fruto y no lo come pierde una reparación que solo él podía hacer. No hace falta un seder de treinta especies. Hace falta un fruto y treinta segundos de atención. Y si quieres cerrar el día como lo cierra la tradición sin decirlo, haz una sola cosa más: no destruyas nada innecesariamente hoy. Ni una planta, ni un objeto útil, ni comida, ni una reputación. Eso es bal tashjit (Rambam, Hiljot Melajim 6:10), y es la única ética que este día tiene con fuerza de ley.`,
  },

  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Tu BiShvat es la fiesta más humilde del calendario: no es bíblica, no tiene liturgia propia, y nació como una fecha de corte contable para el diezmo de los frutos del árbol (Mishná Rosh Hashaná 1:1; Rambam, Hiljot Ma'aser Shení 1:2). La Casa de Shamai la ponía el 1 de Shvat y la Casa de Hilel el 15; la halajá siguió a Hilel, y por eso el día se llama simplemente por su número, ט״ו.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `La razón que da el Talmud es que "ya salió la mayor parte de las lluvias del año" (Rosh Hashaná 14a) — es decir, el criterio es el agua que ya entró, no lo que se ve afuera. Rashi agrega las cinco palabras que convierten el tecnicismo en enseñanza: וְעָלָה הַשְּׂרָף בָּאִילָנוֹת, "y la savia subió en los árboles". El año nuevo del árbol se celebra en el punto exacto en que el trabajo ya está hecho y todavía no se nota.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `אִילָן, "árbol", vale 91 — lo mismo que יאהדונה״י, el entretejido de יְהֹוָה (26) y אֲדֹנָי (65), y por eso la Mishná dice "el árbol" en singular: alude al Árbol de la Vida (Peri Etz Hadar 1:17; Bnei Yissasjar, Shevat 2:3, que lo llama "unificación completa"). Un árbol —raíz enterrada, copa en el aire, una sola savia atravesándolo— es la figura de lo alto y lo bajo unidos. Y el Yerushalmí pone la línea invisible: "hasta aquí viven del agua del año que pasó; de aquí en adelante, del agua del año que viene".`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Elegir hoy una cosa propia que lleva meses sin dar señales y, en vez de evaluarla, regarla otra vez con un plazo antes de volver a juzgarla. Comer un fruto de árbol con atención y bendecirlo. Y no destruir hoy nada innecesariamente: esa es la única ética del día con fuerza de ley, el bal tashjit del Rambam (Hiljot Melajim 6:8 y 6:10), que cubre árboles, utensilios, ropa, edificios, manantiales y alimentos.`,
      },
    ],
  },

  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "No es una cita ni una fuente clásica: es una lectura de Jashmal, marcada como tal.",
    parrafos: [
      `Hay un detalle que ninguna fuente convierte en doctrina y que aquí se ofrece solo como lectura. La única huella que Tu BiShvat dejó en el Shulján Aruj —el código legal que rige la práctica judía hasta hoy— no es una obligación, es una omisión: "se acostumbra no caer sobre el rostro… en el quince de Shvat" (Oraj Jaim 131:6). Es decir, la única ley del día es que ese día NO se dice una plegaria. No hay nada que hacer. Hay algo que dejar de hacer, y lo que se deja de hacer es pedir perdón postrado.`,
      `Léelo junto con el resto y encaja entero. El día en que el árbol no muestra nada, la halajá te prohíbe justamente la postura de la culpa. No te manda celebrar, no te manda plantar, no te manda comer treinta frutos: te manda no arrodillarte a acusarte. Como si la tradición supiera que la tentación exacta de ese momento —cuando llevas meses trabajando y no se ve un solo resultado— es concluir que el problema eres tú. Nadie está obligado a leerlo así. Pero que la única ley del día del árbol invisible sea "hoy no te postres a confesar" es, por lo menos, una coincidencia bien colocada.`,
    ],
  },

  hemshej: [
    "{{study:sucot|La sucá también vale 91, como el árbol: la misma unión de los dos Nombres, esta vez en un techo agujereado que deja ver las estrellas.}}",
    "{{letter:tzadi|La letra del mes de Shvat es la tzadi, la letra del tzadik — «el que hace fruto». ¿Por qué la letra del justo rige el mes en que nada se ve?}}",
    "{{study:elul|Si Tu BiShvat mide el agua que ya entró, Elul mide el primer paso que todavía no diste. Los dos meses del trabajo invisible, en clave opuesta.}}",
    "{{study:rosh-hashana|Cuatro años nuevos hay en la Mishná, y solo uno se volvió el juicio del mundo. ¿Qué hace distinto al de Tishrei?}}",
  ],

  ctaRef: "Deuteronomy 20:19",
};
