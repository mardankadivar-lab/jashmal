
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  MISTERIO — Re'eh / El ojo que ve doble · רְאֵה
//  Serie «Parashá». Contenido escrito y VERIFICADO por el Sofer el 2026-08-08
//  contra la API de Sefaria. Fuente:
//    ~/jashmal-produccion/reeh-ojo-doble/ENSENANZA-REEH-OJO-DOBLE.md
//  (frontmatter: estado: verificado · verificado_contra_sefaria: true)
//
//  GUARDARRAÍLES OBLIGATORIOS (anexo del Sofer). Quien edite esta página tiene
//  que seguir respetándolos:
//   1. PROHIBIDO decir «ilusión», «mentira», «no existe», «todo es uno». La
//      formulación correcta es OCULTAMIENTO (hester) y «no es aparte».
//      Ein od milvadó = «no hay nada APARTE de Él».
//   2. NO usar Devarim Rabá 4:3 como prueba de que el mal no existe.
//   3. NO atribuir nada al Baal Shem Tov sobre Re'eh: no hay fuente. La voz
//      jasídica aquí son el Alter Rebbe y el Sefat Emet, con ref exacta.
//   4. NO citar el Tania (Sha'ar HaYijud VehaEmuná) como si comentara Re'eh:
//      se ancla en Devarim 4:39, que es Va'etjanán.
//   5. NO citar el Códice de Alepo para Re'eh (su Torá se perdió en 1947; solo
//      conserva desde Devarim 28:17). El testigo es Rambam, Hiljot Séfer Torá
//      8:4 · tradición de Ben Asher.
//   6. NO decir que el profeta falso «es la dualidad». El argumento es la
//      SECUENCIA literal: 12:8 → 12:25/12:28 → 13:1 → 13:2 → 13:5 → 13:19.
//   7. תִדְבָּקוּן se traduce en PLURAL: «y a Él se apegarán», nunca «te apegarás».
//   8. La numeración desfasa todo el capítulo 13 (nuestro 13:1 = 12:32 de las
//      biblias cristianas). El aviso va UNA SOLA VEZ, en la primera referencia.
//   9. Jaguigá 2a («dos ojos») es OPINIÓN MINORITARIA, marcada por la propia
//      Guemará con «וּדְלָא כִּי הַאי תַּנָּא». Se presenta como imagen, NUNCA como halajá.
//  10. El Rambam dice «desmentir» (לְהַכְחִישׁ), no «añadir». «El engaño no niega:
//      añade» es remate NUESTRO, no cita: no ponerlo entre comillas atribuidas.
//  11. El Arizal NO comentó estos versículos (Sha'ar HaPesukim, Re'eh trata solo
//      el signo de las aves puras, Devarim 14:11). Lo luriano de aquí es MARCO
//      cosmológico (Etz Jaim, los ojos de Adam Kadmón) y va dicho como tal.
//  12. Las cuatro gematrías (216, 130, 515, 186) están calculadas y son
//      correctas. Lo que NO está verificado es que signifiquen lo que se
//      sugiere: eso va marcado en el cuerpo como lectura interpretativa.
//  13. «55 mitzvot en Re'eh» NO fue cotejada contra fuente primaria. El dato
//      verificado por conteo propio es 126 versículos. No usarla sin decir
//      «según la cuenta tradicional».
//
//  Hero (modo "numero"): עַיִן, «ojo», vale 130 — el doble exacto de אֲדֹנָי (65).
//
//  IDIOMA: el análisis está en español. Los campos *Fa del hero replican el
//  español a propósito (fallback), porque el Sofer aún no tradujo este estudio
//  al farsi y este departamento no genera farsi por su cuenta. Cuando llegue la
//  traducción verificada, se reemplazan aquí y en lib/content/misterios.ts.
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "reeh-ojo-doble",
  hero: {
    serielabel: "Serie «Parashá» · Re'eh — la parashá que se llama «Mira»",
    serielabelFa: "Serie «Parashá» · Re'eh — la parashá que se llama «Mira»",
    he: "רְאֵה",
    titulo: "El ojo que ve doble",
    tituloFa: "El ojo que ve doble",
    ganchoEs:
      "Re'eh — la parashá que se llama «Mira» y enseña cómo mirar. La Torá prohíbe una manera de ver —«cada uno lo recto a sus propios ojos» (12:8)— y la reemplaza, dos veces seguidas, por otra: «lo recto a los ojos de HaShem» (12:25 y 12:28). Es la misma palabra, hayashar. Lo único que cambia es de quién son los ojos.",
    ganchoFa:
      "Re'eh — la parashá que se llama «Mira» y enseña cómo mirar. La Torá prohíbe una manera de ver —«cada uno lo recto a sus propios ojos» (12:8)— y la reemplaza, dos veces seguidas, por otra: «lo recto a los ojos de HaShem» (12:25 y 12:28). Es la misma palabra, hayashar. Lo único que cambia es de quién son los ojos.",
    numero: { valor: "130", rom: "Ayin (ojo) = 2 × Adnut (65)" },
    // Estudio de la serie «Parashá»: el "volver" apunta al índice de misterios,
    // no a la puerta de la serie del Mashíaj (default de la plantilla).
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── ADVERTENCIA DEL SOFER — abre el estudio ─────────────────────────────────
  aviso: {
    titulo: "Advertencia del Sofer — lo que este estudio NO afirma",
    rotulo:
      "Este estudio se mueve cerca de un borde teológico peligroso, y por eso conviene decir de entrada lo que no afirma.",
    parrafos: [
      `No decimos que la dualidad sea una ilusión. No decimos que el mal no exista. No decimos «todo es uno» en el sentido en que lo dicen las escuelas no-duales de Oriente. La palabra que usan nuestras fuentes —el Sefat Emet la usa una y otra vez— es הֶסְתֵּר (hester): ocultamiento. Y la formulación exacta de la Cabalá no es «nada existe», sino אֵין עוֹד מִלְבַדּוֹ — «no hay nada aparte de Él». La diferencia entre «no existe» y «no es aparte» es toda la diferencia entre una parashá de la elección y una filosofía que disuelve la elección. Re'eh es la parashá de la elección: bendición y maldición, dos montañas, elige. Nada de lo que sigue puede apagar eso.`,
      `Además marcamos en todo momento qué es fuente citada y qué es lectura interpretativa nuestra. Ninguna gematría aparece sin haber sido calculada. Ningún versículo se cita sin haber sido cotejado.`,
    ],
  },

  // ── MAPA DEL ARGUMENTO — prólogo de orientación ─────────────────────────────
  mapa: {
    titulo: "Antes de empezar: el mapa del argumento",
    intro: [
      `La parashá se llama רְאֵה (Re'eh) — «Mira». Empieza con un imperativo de visión y termina, ciento veintiséis versículos después, con un verbo de la misma raíz en voz pasiva: יֵרָאֶה — «será visto». La parashá que abre mandando ver, cierra mandando ser visto.`,
      `Entre esos dos extremos, el texto hace una cosa que se puede señalar con el dedo, sin interpretar nada. Prohíbe una forma de mirar, la reemplaza por otra, y repite la de reemplazo hasta el final:`,
    ],
    filas: [
      {
        ref: "Devarim 12:8",
        he: "אִישׁ כָּל־הַיָּשָׁר בְּעֵינָיו",
        es: "cada uno, todo lo recto a sus propios ojos",
        funcion: "Lo que se manda dejar atrás.",
      },
      {
        ref: "Devarim 12:25",
        he: "הַיָּשָׁר בְּעֵינֵי יְהֹוָה",
        es: "lo recto a los ojos de HaShem",
        funcion: "El reemplazo.",
      },
      {
        ref: "Devarim 12:28",
        he: "הַטּוֹב וְהַיָּשָׁר בְּעֵינֵי יְהֹוָה אֱלֹהֶיךָ",
        es: "lo bueno y lo recto a los ojos de HaShem, tu Dios",
        funcion: "El reemplazo, dicho otra vez.",
      },
      {
        ref: "Devarim 13:1",
        he: "לֹא־תֹסֵף עָלָיו וְלֹא תִגְרַע מִמֶּנּוּ",
        es: "no añadirás ni quitarás",
        funcion: "Última frase del bloque cerrado.",
      },
      {
        ref: "Devarim 13:2",
        he: "כִּי־יָקוּם בְּקִרְבְּךָ נָבִיא",
        es: "si se levanta en medio de ti un profeta",
        funcion: "La única sección abierta de la primera mitad.",
      },
      {
        ref: "Devarim 13:3",
        he: "וּבָא הָאוֹת וְהַמּוֹפֵת",
        es: "y viene la señal y el prodigio",
        funcion: "El milagro sí ocurre.",
      },
      {
        ref: "Devarim 13:5",
        he: "וּבוֹ תִדְבָּקוּן",
        es: "y a Él se apegarán",
        funcion: "La cura.",
      },
      {
        ref: "Devarim 13:19",
        he: "לַעֲשׂוֹת הַיָּשָׁר בְּעֵינֵי יְהֹוָה אֱלֹהֶיךָ",
        es: "para hacer lo recto a los ojos de HaShem, tu Dios",
        funcion: "El cierre — y el versículo del maamar del Alter Rebbe.",
      },
    ],
    cierre: [
      `Y de fondo, dieciséis veces, la misma fórmula: «el lugar que Él elegirá» — sin decir nunca cuál.`,
      `Ese es el estudio. La misma palabra hayashar («lo recto») en 12:8 y en 12:25. Lo único que cambia entre un versículo y el otro es de quién son los ojos.`,
    ],
  },

  // ── 1. תַּרְגּוּם ────────────────────────────────────────────────────────────
  //  Hebreo verificado contra Sefaria el 2026-08-08. Traducción del Sofer.
  targum: {
    citas: [
      {
        label: "El marco: dos montañas — Devarim 11:26 y 11:29",
        he: "רְאֵ֗ה אָנֹכִ֛י נֹתֵ֥ן לִפְנֵיכֶ֖ם הַיּ֑וֹם בְּרָכָ֖ה וּקְלָלָֽה׃",
        es: "Mira: yo pongo hoy delante de ustedes bendición y maldición.",
        source: "Devarim 11:26",
      },
      {
        he: "וְנָתַתָּ֤ה אֶת־הַבְּרָכָה֙ עַל־הַ֣ר גְּרִזִ֔ים וְאֶת־הַקְּלָלָ֖ה עַל־הַ֥ר עֵיבָֽל׃",
        es: "Y pondrás la bendición sobre el monte Guerizim, y la maldición sobre el monte Eval.",
        source: "Devarim 11:29",
      },
      {
        label: "El eje: los ojos de quién — Devarim 12:8 · 12:25 · 12:28",
        he: "לֹ֣א תַעֲשׂ֔וּן כְּ֠כֹ֠ל אֲשֶׁ֨ר אֲנַ֧חְנוּ עֹשִׂ֛ים פֹּ֖ה הַיּ֑וֹם אִ֖ישׁ כׇּל־הַיָּשָׁ֥ר בְּעֵינָֽיו׃",
        es: "No harán como todo lo que nosotros hacemos aquí hoy: cada uno, todo lo recto a sus propios ojos.",
        source: "Devarim 12:8",
      },
      {
        he: "לֹ֖א תֹּאכְלֶ֑נּוּ … כִּֽי־תַעֲשֶׂ֥ה הַיָּשָׁ֖ר בְּעֵינֵ֥י יְהֹוָֽה׃",
        es: "No lo comerás… porque harás lo recto a los ojos de HaShem.",
        source: "Devarim 12:25",
      },
      {
        he: "… כִּ֤י תַעֲשֶׂה֙ הַטּ֣וֹב וְהַיָּשָׁ֔ר בְּעֵינֵ֖י יְהֹוָ֥ה אֱלֹהֶֽיךָ׃",
        es: "… porque harás lo bueno y lo recto a los ojos de HaShem, tu Dios.",
        source: "Devarim 12:28",
      },
      {
        label: "El cerrojo y la grieta — Devarim 13:1–13:5",
        he: "אֵ֣ת כׇּל־הַדָּבָ֗ר אֲשֶׁ֤ר אָנֹכִי֙ מְצַוֶּ֣ה אֶתְכֶ֔ם אֹת֥וֹ תִשְׁמְר֖וּ לַעֲשׂ֑וֹת לֹא־תֹסֵ֣ף עָלָ֔יו וְלֹ֥א תִגְרַ֖ע מִמֶּֽנּוּ׃",
        es: "Toda la palabra que yo les ordeno, a ella cuidarán de hacer: no añadirás sobre ella ni quitarás de ella.",
        source: "Devarim 13:1",
      },
      {
        he: "כִּֽי־יָק֤וּם בְּקִרְבְּךָ֙ נָבִ֔יא א֖וֹ חֹלֵ֣ם חֲל֑וֹם וְנָתַ֥ן אֵלֶ֛יךָ א֖וֹת א֥וֹ מוֹפֵֽת׃",
        es: "Si se levanta en medio de ti un profeta o un soñador de sueños, y te da una señal o un prodigio…",
        source: "Devarim 13:2",
      },
      {
        he: "וּבָ֤א הָאוֹת֙ וְהַמּוֹפֵ֔ת אֲשֶׁר־דִּבֶּ֥ר אֵלֶ֖יךָ לֵאמֹ֑ר נֵֽלְכָ֞ה אַחֲרֵ֨י אֱלֹהִ֧ים אֲחֵרִ֛ים…",
        es: "…y viene la señal y el prodigio de que te habló, diciendo: «vayamos tras otros dioses»…",
        source: "Devarim 13:3",
      },
      {
        he: "לֹ֣א תִשְׁמַ֗ע אֶל־דִּבְרֵי֙ הַנָּבִ֣יא הַה֔וּא … כִּ֣י מְנַסֶּ֞ה יְהֹוָ֤ה אֱלֹֽהֵיכֶם֙ אֶתְכֶ֔ם…",
        es: "No escucharás las palabras de ese profeta… porque HaShem, su Dios, los está probando…",
        source: "Devarim 13:4",
      },
      {
        he: "אַחֲרֵ֨י יְהֹוָ֧ה אֱלֹהֵיכֶ֛ם תֵּלֵ֖כוּ … וּב֥וֹ תִדְבָּקֽוּן׃",
        es: "Tras HaShem, su Dios, irán… y a Él se apegarán.",
        source: "Devarim 13:5",
      },
      {
        label: "El cierre del bloque — Devarim 13:19",
        he: "כִּ֣י תִשְׁמַ֗ע בְּקוֹל֙ יְהֹוָ֣ה אֱלֹהֶ֔יךָ … לַעֲשׂוֹת֙ הַיָּשָׁ֔ר בְּעֵינֵ֖י יְהֹוָ֥ה אֱלֹהֶֽיךָ׃",
        es: "Porque escucharás la voz de HaShem, tu Dios… para hacer lo recto a los ojos de HaShem, tu Dios.",
        source: "Devarim 13:19",
      },
      {
        label: "El remate de la parashá — Devarim 16:16",
        he: "שָׁל֣וֹשׁ פְּעָמִ֣ים בַּשָּׁנָ֡ה יֵרָאֶ֨ה כׇל־זְכוּרְךָ֜ אֶת־פְּנֵ֣י יְהֹוָ֣ה אֱלֹהֶ֗יךָ בַּמָּקוֹם֙ אֲשֶׁ֣ר יִבְחָ֔ר…",
        es: "Tres veces al año será visto todo varón tuyo ante el rostro de HaShem, tu Dios, en el lugar que Él elegirá…",
        source: "Devarim 16:16",
      },
    ],
    parrafos: [
      `Sobre 11:26 — nótese el detalle gramatical, que no es adorno: רְאֵה es singular («mira tú»), y לִפְנֵיכֶם es plural («delante de ustedes»). Un solo ojo mirando; muchos delante de quienes se pone. Ya en la primera palabra la parashá pone lo uno frente a lo múltiple.`,
      `Aviso de numeración, se dice una sola vez: en las biblias cristianas Devarim 13:1 es 12:32, y todo el capítulo 13 corre desplazado un número. Nuestro 13:2 es su 13:1; nuestro 13:5 es su 13:4. Los versículos 12:8 y 12:25 no cambian.`,
      `Sobre 13:3 — aquí está lo que casi nadie subraya: el texto no dice que la señal falle. Dice וּבָא — «y vino», «y se cumplió». El milagro ocurre.`,
      `Nota del Sofer sobre la traducción de 13:5: תִדְבָּקוּן es plural —segunda persona plural con nun paragógica—. Traducir «y a Él te apegarás» sería singular y contradiría el hebreo. Se dice «se apegarán».`,
      `Y el arco: de רְאֵה («mira») a יֵרָאֶה («será visto»). Misma raíz, ר-א-ה. La parashá se cierra sobre sí misma.`,
    ],
  },

  // ── 2. מְפָרְשִׁים ───────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Antes que nada, honestidad.",
        texto: `Los comentaristas clásicos no leen Devarim 12:8 como un reproche moral. Si el estudio quiere sostenerse, tiene que decirlo.`,
      },
      {
        etiqueta: "רַשִׁ״י · Rashi, a Devarim 12:8 (pshat halájico).",
        texto: `Rashi lee el versículo dentro de la historia técnica de los altares. «No harán como todo lo que nosotros hacemos aquí hoy» remite hacia atrás, a 11:31: al cruzar el Yardén quedan permitidos los bamot (altares privados) durante los catorce años de conquista y reparto. Y en un bamá no se ofrece todo lo que se ofrece en el Mishkán: solo lo votado y lo donado voluntariamente (nidar ve-nidav). Y eso es —dice Rashi— «cada uno todo lo recto a sus propios ojos»: votos y donaciones, que ustedes ofrecen porque les parece recto traerlos, no por obligación. (Rashi remite a Sifrei y a Zevajim 117.) Es decir: en Rashi, «lo recto a sus propios ojos» no es pecado. Es el nombre técnico de un régimen de voluntariedad.`,
      },
      {
        etiqueta: "רַשִׁ״י sobre 12:28 — la aclaración que lo cambia todo.",
        texto: `Y sin embargo, es el mismo Rashi quien pone la pieza más fina del rompecabezas. Sobre «lo bueno y lo recto a los ojos de HaShem, tu Dios» comenta, en cuatro palabras: הַטּוֹב — בְּעֵינֵי הַשָּׁמַיִם. וְהַיָּשָׁר — בְּעֵינֵי אָדָם — «lo bueno: a los ojos del Cielo; y lo recto: a los ojos del hombre» (Rashi sobre Devarim 12:28, verificado). Léase despacio. El versículo dice «a los ojos de HaShem», y Rashi desdobla esa mirada única en dos: lo bueno se mide con el ojo del Cielo, lo recto con el ojo del hombre. La cura, entonces, no es amputar el ojo humano. Es que el ojo humano deje de funcionar aparte y quede incluido dentro de la mirada de HaShem. El ojo del hombre no se elimina: se anida. (Esto es Rashi, no lectura nuestra. Lo que sigue —que a eso se le llame «el ojo que ve doble»— sí es formulación nuestra.)`,
      },
      {
        etiqueta: "אִבְּן עֶזְרָא · Ibn Ezra, a Devarim 12:8 (pshat histórico).",
        texto: `Ibn Ezra recoge la explicación de que, al ir de campamento en campamento, después de la muerte de Aharón cada quien ofrecía —o no— según quisiera: uno traía el primogénito de su rebaño, otro no, porque el precepto dependía de la Tierra. Pero añade su propio parecer: «y esta no es mi opinión; su sentido es que no todos eran temerosos de HaShem». Ibn Ezra sí abre, tímidamente, la puerta moral.`,
      },
      {
        etiqueta: "רַמְבַּ״ן · Ramban, a Devarim 12:8 — el pshat, y la objeción.",
        texto: `El Ramban cita a Ibn Ezra y lo rechaza con un argumento de decencia textual: no puede ser que Moshé Rabenu diga «nosotros hacemos» refiriéndose a transgresiones —jalilá, Dios libre—; debió haber dicho «no harán como ustedes hicieron hasta hoy». Su lectura propia es la que más nos sirve, y es pshat puro: en el desierto no había obligación en materia de ofrendas. Si uno no quería comer res ni oveja, no debía traer sacrificio alguno; tampoco primogénitos, ni diezmo de animales, ni segundo diezmo; ni siquiera estaba obligado a presentarse en las fiestas. Todo el asunto de los korbanot era voluntario — «cada uno lo recto a sus propios ojos hará». Por eso ordena aquí que, después del reposo y la heredad, no hagan así, sino que vengan por obligación a un lugar conocido, señalado y elegido por HaShem. (Paráfrasis del Sofer sobre Ramban a Devarim 12:8.) Esto es decisivo: el propio Ramban une, en una sola frase, «los propios ojos» con «el lugar que Él elegirá». El movimiento de la parashá —del ojo disperso al Lugar único— no se lo estamos imponiendo al texto. Ya está ahí, en el pshat clásico.`,
      },
      {
        etiqueta: "רַמְבַּ״ם · Rambam — el ojo colectivo contra la señal.",
        texto: `Sobre el profeta falso, el Rambam (Mishné Torá, Hiljot Yesodei HaTorá 8:1 y 8:3, verificado) da el marco que la Torá deja implícito, y lo da en lenguaje de ojos: «A Moshé Rabenu no le creyó Israel por las señales que hizo — porque quien cree a causa de señales, tiene defecto en el corazón: es posible que la señal se haya hecho con magia y hechicería… ¿Y con qué le creyeron? Con la estación del monte Sinaí, que nuestros ojos vieron y no los de un extraño, y nuestros oídos oyeron y no otro» (8:1). Y: «Por eso dijo la Torá que si viene la señal y el prodigio, “no escucharás las palabras de ese profeta” (Devarim 13:4) — porque este viene a ti con señal y prodigio para desmentir lo que viste con tus propios ojos» (8:3). El Rambam plantea la escena exactamente como un duelo de miradas: la señal espectacular de un individuo contra el ojo colectivo de Sinaí. No gana el milagro; gana el testimonio de los ojos. (Precisión de honestidad: el Rambam dice que la señal viene a desmentir —לְהַכְחִישׁ— lo que el ojo vio. Nuestro remate «el engaño no niega: añade» es lectura nuestra, apoyada en la vecindad de 13:1 con 13:2, y no debe atribuirse al Rambam.)`,
      },
      {
        etiqueta: "אוֹר הַחַיִּים · Or HaJaim, a Devarim 13:4 — por qué el milagro no se apaga.",
        texto: `El Or HaJaim hace la pregunta filosa: si HaShem envió a este profeta para probarnos, ¿por qué se lo ejecuta? Y responde, esencialmente, que «porque HaShem los prueba» no significa que HaShem le haya dicho al profeta que dijera eso; es la explicación de por qué el prodigio no fue anulado. Y agrega la frase que nos importa: «…dejó el mundo según su costumbre» (הִנִּיחַ הָעוֹלָם כְּמִנְהָגוֹ). Ese es el vocabulario correcto. No dice que el prodigio sea una ilusión. Dice que HaShem no interviene para desactivarlo: deja el mundo corriendo por su cauce, y ese dejar-correr es la prueba. Ocultamiento, no ilusión.`,
      },
      {
        etiqueta: "רַמְבַּ״ן sobre 13:2 — el don profético que sí funciona.",
        texto: `El Ramban va aún más lejos y concede lo incómodo: hay almas con una facultad profética real que conocen cosas futuras sin saber de dónde les viene; se aíslan, y les llega un espíritu que dice «así será». «Los filósofos lo llaman kehin (adivino), y no conocen la causa del asunto, pero el hecho se verifica ante los ojos de quienes miran.» De nuevo: ante los ojos. El texto y sus comentaristas insisten en la misma metáfora.`,
      },
      {
        etiqueta: "הָאֲרִיזַ״ל · El Arizal — dónde está, y dónde no está.",
        texto: `Nota de honestidad, primero. Busqué al Arizal sobre nuestros versículos y no lo hay. La sección de Sha'ar HaPesukim, Parashat Re'eh trata un único tema —el signo de las aves puras, kol tzipor tehorá (Devarim 14:11)— y no dice nada sobre 12:8, 12:25 ni el capítulo 13. Quien afirme «el Arizal sobre Re'eh dice que el ojo…» está inventando. Yo no. Lo que sí puedo aportar es el marco luriano, y lo declaro como marco, no como comentario a la parashá. En la cosmología del Arizal, el ojo es el órgano de la separación. El mundo de Nekudim —el mundo donde ocurrió la Ruptura de los Recipientes— nace precisamente de la luz que sale por los ojos: «Explicaremos ahora el mundo de Nekudim, que son las luces que salen por los orificios de los ojos de Adam Kadmón» (Sefer Etz Jaim 8:1, verificado); «El mundo de Atzilut… se hizo de aquellas diez “puntos” que salen de los orificios de los ojos de Adam Kadmón… y al principio salieron sin rectificación, y después fueron rectificados» (Sefer Etz Jaim 11:5, verificado). Y el mecanismo que forma los recipientes es, literalmente, una mirada: «se hizo por medio de la contemplación de los ojos» (Sefer Etz Jaim 8:4, verificado). De modo que, en el lenguaje del Arizal, la multiplicidad del mundo no es una mentira proyectada: es luz que salió por unos ojos y todavía no está rectificada. La palabra clave no es «falso». Es tikún — «aún no arreglado». Que un estudio sobre el ojo encuentre al ojo en la raíz misma del quiebre cósmico es, cuando menos, una coincidencia que vale la pena mirar. (Que esa coincidencia signifique algo es lectura nuestra.)`,
      },
    ],
  },

  // ── 3. פרד״ס ─────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat: el texto hace un movimiento, y se puede señalar",
        parrafos: [
          `En el nivel llano, la parashá ejecuta una transición jurídica: del régimen del desierto —voluntario, disperso, «cada uno según sus ojos»— al régimen de la Tierra —obligatorio, centralizado, «el lugar que Él elegirá». Eso es Ramban, y es sencillamente lo que dice el texto. Tres datos de pshat, verificados uno por uno, sostienen todo lo demás.`,
          `1. La fórmula del Lugar aparece exactamente dieciséis veces. Conté, versículo por versículo, todas las apariciones de «el lugar que Él elegirá» en los 126 versículos de la parashá. Son 16, en: 12:5 · 12:11 · 12:14 · 12:18 · 12:21 · 12:26 · 14:23 · 14:24 · 14:25 · 15:20 · 16:2 · 16:6 · 16:7 · 16:11 · 16:15 · 16:16. Dieciséis veces se nombra el Lugar y ni una sola vez se dice cuál es. La parashá que manda «mira» esconde precisamente aquello hacia lo que hay que mirar. (La ocurrencia número dieciséis cae en el versículo 16:16. Curiosidad aritmética, no argumento.)`,
          `2. Los veinte bloques del rollo. El texto de la Torá está dividido en párrafos —petujot (abiertas) y setumot (cerradas)—. En Re'eh hay 20 bloques: 15 cerrados y 5 abiertos. Lo verifiqué de dos maneras: contra Rambam, Mishné Torá, Hiljot Séfer Torá 8:4 · tradición de Ben Asher, y contando de forma independiente los marcadores פ/ס del texto masorético. Los dos caminos coinciden 20/20, sin variantes. Las cinco abiertas son los bloques 5, 12, 17, 18 y 20, y empiezan en 13:2 · 14:22 · 15:19 · 16:1 · 16:13. Advertencia: no se puede citar el Códice de Alepo para Re'eh. La sección de la Torá de ese manuscrito se perdió en 1947; lo que se conserva empieza en Devarim 28:17. El testigo correcto es el Rambam, quien en esa misma halajá declara que su fuente es el códice de Ben Asher.`,
          `3. La única grieta de la primera mitad. El punto medio del texto cae en 14:6; la primera mitad son los bloques 1 al 9. En esos nueve bloques hay una sola sección abierta: el bloque 5, que empieza en Devarim 13:2 — el profeta falso. Un rollo de Torá lleno de párrafos cerrados, y la primera respiración cae justo ahí.`,
          `(Qué significa eso es interpretación. Que sea así es un hecho del rollo. Y una aclaración necesaria: no decimos que «el profeta falso es la dualidad». Eso sería forzar el texto. Decimos algo mucho más modesto y mucho más sólido: que la secuencia literal —prohibir un modo de mirar, reemplazarlo dos veces, cerrar con «no añadas ni quites», y abrir inmediatamente la única grieta del bloque con un engaño cuya señal funciona— es una secuencia, y las secuencias se leen.)`,
        ],
      },
      {
        head: "רֶמֶז — Remez: lo que insinúan las letras",
        parrafos: [
          `Cuatro observaciones. Todas calculadas por el Sofer; ninguna copiada.`,
          `a) רְאִיָּה (ver) y יִרְאָה (temor reverente) son las mismas cuatro letras. Re'iyá = ר־א־י־ה. Yirá = י־ר־א־ה. El mismo conjunto de letras, reordenado; ambas suman 216. En hebreo, ver y temer son anagramas el uno del otro. Y esto no es un juego aislado: como se verá abajo, el maamar del Alter Rebbe sobre el versículo de cierre de nuestro bloque está construido exactamente sobre el par ver / temer. (Cálculo del Sofer. 216 es además el valor de גְּבוּרָה, «severidad/contención» — la midá que limita para que algo pueda ser visto por separado.)`,
          `b) עַיִן, «ojo», vale 130 — el doble exacto de אֲדֹנָי (65). Ayin = ע70 + י10 + ן50 = 130. Adnut, el Nombre de la Presencia inmanente, la que se viste en el mundo, vale 65. El ojo es, aritméticamente, el doble de ese Nombre. (Cálculo del Sofer; la lectura de que eso «signifique» el ojo que ve doble es nuestra, ofrecida como insinuación, no como prueba.)`,
          `c) הַיָּשָׁר, «lo recto», vale 515 — igual que תְּפִלָּה, «oración». Hayashar = ה5 + י10 + ש300 + ר200 = 515. Tefilá = 515. Y Va'etjanán —la súplica de Moshé— también 515. Lo recto a los ojos de HaShem tiene el peso de una oración. (Cálculo del Sofer. Lectura interpretativa nuestra.)`,
          `d) מָקוֹם, «Lugar», vale 186 — la suma de los cuadrados del Nombre. Makom = מ40 + ק100 + ו6 + ם40 = 186. Y 10² + 5² + 6² + 5² = 100 + 25 + 36 + 25 = 186: los cuadrados de las cuatro letras del Nombre. Por eso HaMakom —«el Lugar»— es uno de los nombres de Dios. La parashá dice dieciséis veces «el Lugar que Él elegirá», y la palabra misma ya lo está diciendo. (Cálculo del Sofer. La equivalencia es ampliamente conocida; no se atribuye a una fuente concreta porque no se verificó.)`,
        ],
      },
      {
        head: "דְּרָשׁ — Drash: el eco de los Jueces, y la advertencia jasídica",
        parrafos: [
          `El eco. La frase de 12:8 vuelve a aparecer, palabra por palabra, en el último versículo del libro de los Jueces: בַּיָּמִים הָהֵם אֵין מֶלֶךְ בְּיִשְׂרָאֵל אִישׁ הַיָּשָׁר בְּעֵינָיו יַעֲשֶׂה — «en aquellos días no había rey en Israel; cada uno hacía lo recto a sus propios ojos» (Shoftim 21:25, verificado). La misma expresión exacta, hayashar be'einav. En Devarim es una etapa técnica que se manda dejar atrás. En Jueces es el diagnóstico final de un libro de catástrofes: la frase con la que se cierra la peor época de Israel. El Tanaj mismo se encargó de mostrar en qué se convierte esa manera de mirar cuando se queda sin Lugar y sin rey. (La conexión entre ambos versículos es evidente y clásica; el uso que le damos aquí —que Jueces es el comentario histórico a Devarim 12:8— es lectura nuestra.)`,
          `La advertencia del ojo. Y hay un tercer versículo que cierra el triángulo, la tercera parashá del Shemá que todo judío recita dos veces al día: וְלֹא־תָתוּרוּ אַחֲרֵי לְבַבְכֶם וְאַחֲרֵי עֵינֵיכֶם — «…y no explorarán tras su corazón y tras sus ojos…» (Bamidbar 15:39, verificado). No dice «no vean». Dice no vayan detrás. El problema nunca fue el ojo; fue el ojo como guía.`,
          `La voz jasídica. Y aquí, integrada donde corresponde, entra la palabra que rige todo este estudio. El Sefat Emet, sobre Re'eh, escribe: «En toda cosa hay un punto de vida del Viviente de las vidas — solo que en este mundo lo interior está oculto (נִסְתָּר הַפְּנִימִיּוּת). Y esto es lo que se pide del hombre de Israel: despertar y revelar lo interior que hay en toda cosa, por medio de las mitzvot» (Sefat Emet, Devarim, Re'eh 1:4, verificado). Y: «Porque toda estrechez se hace solo por el ocultamiento de la exterioridad (מֵהַסְתָּרַת הַחִיצוֹנִיּוּת), y solo para prueba. Y cuando el hombre vence su voluntad y la deja a favor de la voluntad de HaShem, eso mismo abre lo interior y anula el ocultamiento (וּמְבַטֵּל הַהֶסְתֵּר)» (Sefat Emet, Re'eh 1:5, verificado).`,
          `Léase con cuidado lo que no dice. No dice que la estrechez sea irreal. No dice que el mundo exterior sea mentira. Dice que hay un ocultamiento —hester— y que se anula por un acto. El mundo no se desvanece: se destapa. Esa es exactamente la distinción que este estudio se comprometió a no cruzar.`,
        ],
      },
      {
        head: "סוֹד — Sod: dos unificaciones, y un solo versículo que las contiene",
        parrafos: [
          `El versículo que cierra nuestro bloque —Devarim 13:19, «para hacer lo recto a los ojos de HaShem, tu Dios»— es el versículo sobre el que el Alter Rebbe (Rabí Shneur Zalman de Liadi) construye un maamar entero. Precisión bibliográfica, porque importa: el maamar es Likutei Torá, Re'eh 4 (el que abre «Ki tishmá bekol HaShem Elokeja…»), y su Biur —la explicación donde aparece la doctrina de las dos unificaciones— es Likutei Torá, Re'eh 5. Ambos verificados. Citar solo «Re'eh 5» es correcto para el contenido, pero incompleto para la fuente.`,
          `Lo primero que hace el maamar es poner dos versículos frente a frente: «Está escrito: “עֵין ה' אֶל יְרֵאָיו” — “el ojo de HaShem hacia los que le temen” (Tehilim 33:18); y está escrito: “עֵינֵי ה' אֶל צַדִּיקִים” — “los ojos de HaShem hacia los justos” (Tehilim 34:16)» (Likutei Torá, Re'eh 4:1, verificado). Un ojo en singular, y dos ojos en plural. El maamar sobre «lo recto a los ojos de HaShem» arranca preguntando por el número de ojos. No hay manera más limpia de decir que este es, de verdad, el tema.`,
          `Y su respuesta es la doctrina de los dos apegamientos, que el Biur formula así: «Es sabido el asunto de yijudá ilaá (la unificación superior) y yijudá tataá (la unificación inferior): que la unificación inferior está en el Nombre Elokim, que es el que separa (הַמַּפְרִיד) — para que haya precisamente un “yesh” (un algo que existe), y que ese yesh se anule» (Likutei Torá, Re'eh 5:1, verificado).`,
          `Detente aquí. Esta es la frase que gobierna todo el estudio. El Nombre Elokim —el Nombre de la naturaleza, el de la contracción y el juicio— es llamado «el que separa». ¿Y para qué separa? Para que exista un yesh, un «algo», precisamente (davká) — y para que ese algo, existiendo, se anule. O sea: la dualidad no es un error del sistema. Es una función del sistema. No es una ilusión que haya que desenmascarar; es un instrumento que hay que usar. Si el mundo no fuera un «algo» aparte, no habría nada que ofrecer. La anulación requiere un ser que se anule. Un espejismo no puede entregarse.`,
          `El Alter Rebbe apoya las dos unificaciones en un solo versículo, y esto también está verificado: אַתָּה־הוּא יְהֹוָה לְבַדֶּךָ … אַתָּה עָשִׂיתָ אֶת־הַשָּׁמַיִם … וּצְבָא הַשָּׁמַיִם לְךָ מִשְׁתַּחֲוִים — «Tú eres HaShem, Tú solo … Tú hiciste los cielos … y el ejército de los cielos ante Ti se postra» (Nejemiá 9:6, verificado). Primera mitad del versículo: «Tú solo» — desde arriba, no hay nada más; yijudá ilaá. Segunda mitad: «Tú hiciste los cielos… y se postran» — desde abajo, hay cielos, hay ejército, hay alguien que se inclina; yijudá tataá. Un versículo, dos ojos. Y el gesto que los une, dice el maamar, es el «Modim» —la inclinación de la Amidá—: el que existe, doblándose ante Quien lo hizo existir.`,
          `Y entonces el Alter Rebbe explica por qué el versículo de los justos dice ojos en plural: «Y sobre esto se dijo “los ojos de HaShem hacia los justos” — ojos, para que haya conexión y unificación entre los dos modos de providencia… “עַיִן בְּעַיִן יִרְאוּ” — “ojo con ojo verán”» (Likutei Torá, Re'eh 5:1, verificado). Los dos ojos no se reducen a uno. Se unen. Y el versículo que trae para nombrar esa unión es כִּי עַיִן בְּעַיִן יִרְאוּ בְּשׁוּב יְהֹוָה צִיּוֹן — «porque ojo con ojo verán, cuando HaShem retorne a Tzión» (Yeshayahu 52:8, verificado).`,
          `El testigo independiente. Y aquí ocurre algo que no se buscó y que obligó a detenerse. Quinientos años antes del Alter Rebbe, Rabí Yosef Gikatilla —en Sha'arei Orá, la puerta clásica de los Nombres divinos— llega al mismo versículo, por otro camino, comentando un versículo de nuestra propia parashá: «Cuando HaShem, bendito sea, se muestra ante las naciones, es como un rey que está de pie ante sus ministros: vestido con vestiduras de realeza o de guerra, y no es visto por ellos sino en sus ropajes… Y cuando HaShem está con la congregación de Israel, está con ellos como un rey con los de su casa, y se quita parte del vestido… Y este es el secreto de “tres veces al año será visto todo varón tuyo ante el rostro de HaShem, tu Dios” (Devarim 16:16). Y dijeron nuestros sabios: “así como Él viene a ver, así viene a ser visto”» (Sha'arei Orá, Quinta Puerta §98, verificado, citando Jaguigá 2a).`,
          `Y añade: «Pero en el futuro por venir, cuando la Shejiná regrese a su lugar, HaShem se quitará todas aquellas vestiduras y apelativos y alas, y entonces verá Israel a HaShem con el ojo… Y este es el secreto de “ojo con ojo verán, cuando HaShem retorne a Tzión” (Yeshayahu 52:8)» (Sha'arei Orá, Quinta Puerta §103, verificado). Dos autoridades separadas por cinco siglos y por escuelas distintas, comentando la misma parashá, aterrizan en el mismo versículo: ayin be'ayin yir'ú. Y obsérvese el vocabulario de Gikatilla, porque es el vocabulario que este estudio adoptó desde la primera línea: vestiduras, cubrirse, ocultarse (מִתְכַּסֶּה וּמִסְתַּתֵּר), quitarse el vestido. Nunca ilusión. Nunca mentira. Un rey vestido sigue siendo el rey. Lo que hay que quitar no es el mundo: es la ropa.`,
          `Y el Talmud, en Jaguigá 2a — el dato que corona la parashá. La cita de Gikatilla («así como Él viene a ver, así viene a ser visto») está en Jaguigá 2a, y el contexto exacto es asombroso. La Mishná exime de la mitzvá de re'iyá (comparecer en el Templo) a varios, entre ellos al ciego. Y la Guemará trae: «Yojanán ben Dahavai dice en nombre de Rabí Yehudá: el ciego de uno de sus ojos está exento de la comparecencia, como está dicho “יִרְאֶה / יֵרָאֶה” — así como viene a ver, así viene a ser visto: igual que viene a ver con sus dos ojos, así viene a ser visto con sus dos ojos» (Jaguigá 2a, verificado, cita literal). Dos ojos. La parashá que prohíbe la mirada dispersa culmina en una peregrinación que —según esta opinión— exige los dos ojos. La cura del ojo que ve doble no es tuertizarlo. Es que los dos ojos vean una sola cosa.`,
          `Honestidad obligatoria: la Guemará introduce esta enseñanza con «וּדְלָא כִּי הַאי תַּנָּא» — «y [la Mishná] no está de acuerdo con este tanaíta». Es decir: es una opinión minoritaria que la Guemará señala como no normativa. No se puede presentar como halajá. Se puede —y se debe— presentar como lo que es: una voz tanaítica que leyó yir'é/yeraé como un asunto de dos ojos. La imagen es legítima; la etiqueta «así es la halajá» no lo sería.`,
        ],
      },
    ],
    caja: {
      titulo:
        "«Elokim… el que separa — para que haya precisamente un “yesh”, y que ese yesh se anule.»",
      cuerpo:
        "Likutei Torá, Re'eh 5:1. La dualidad no es un error del sistema: es una función del sistema. No es una ilusión que haya que desenmascarar; es un instrumento que hay que usar. La anulación requiere un ser que se anule — un espejismo no puede entregarse.",
    },
  },

  // ── 4. הִתְבּוֹנְנוּת ─────────────────────────────────────────────────────────
  hitbonenut: {
    intro:
      "Aquí no entra ninguna fuente nueva, ningún comentarista nuevo, ninguna gematría nueva. Solo se internaliza lo que ya quedó revelado.",
    parrafos: [
      {
        etiqueta: "Quédate con una sola imagen: un rey vestido.",
        texto: `Nadie está diciendo que el rey no esté. Nadie está diciendo que las ropas sean un truco. Las ropas son ropas, y son reales, y hasta son necesarias: hay salones donde un rey no puede entrar desnudo. Lo único que se dice es esto: lo que estás viendo no es todo lo que hay, y lo que estás viendo no está aparte de Quien lo lleva puesto.`,
      },
      {
        etiqueta: "¿Con qué ojos estás mirando tu día?",
        texto: `Es la pregunta que la parashá te hace directamente, porque su primera palabra es un imperativo dirigido a ti en singular.`,
      },
      {
        texto: `Hay decisiones que tomo diciéndome que son «lo recto». ¿Recto a los ojos de quién? El texto conoce esa frase y le pone un dueño. Si soy honesto: ¿cuántas de mis «rectitudes» son hayashar be'einav —lo que a mí me parece bien— con un vocabulario prestado de lo sagrado?`,
      },
      {
        texto: `El texto no me manda dejar de ver. Me manda no ir detrás de lo que veo. ¿Dónde, en mi semana, mi ojo dejó de ser una ventana y se volvió un guía?`,
      },
      {
        texto: `La señal se cumple. El milagro ocurre. Y aun así hay que no escucharlo. ¿Qué tan dispuesto estoy a sostener algo que sé que es verdad cuando los resultados le dan la razón a lo otro? Porque esa —y no otra— es la prueba que el texto describe.`,
      },
      {
        texto: `Dieciséis veces se nombra el Lugar y ni una sola vez se dice cuál. Hay cosas que solo se pueden buscar sin que te den la dirección. ¿Qué estoy buscando así, y he tenido la paciencia de seguir buscando sin el mapa?`,
      },
      {
        texto: `Y la más incómoda: el ocultamiento no es un accidente. «El Nombre Elokim es el que separa, para que haya precisamente un yesh — y para que ese yesh se anule.» Yo soy ese yesh. La separación que a veces siento como abandono es, en esta lectura, la condición misma de que yo pueda dar algo. ¿Qué cambia en mi manera de estar de pie si la distancia no es castigo sino espacio de trabajo?`,
      },
      {
        texto: `El patrón se repite en todas las escalas. En el cosmos: una luz sale por los ojos y hace falta tikún. En la nación: cada uno según sus ojos, hasta que hay un Lugar. En el individuo: dos ojos, un rostro, y la tarea de que ambos miren lo mismo.`,
      },
      {
        texto: `Y el final, cuando llega, no se describe como un desvanecimiento. Se describe como un encuentro: ayin be'ayin — ojo con ojo.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה ───────────────────────────────────────────────────────────────
  maase: {
    intro: "La contemplación pide un acto concreto, realizable hoy.",
    etiqueta: "1. La pregunta de los tres segundos.",
    texto: `Hoy, antes de una decisión —una sola, elegida a propósito, y de preferencia una donde ya tengas la respuesta lista— detente tres segundos y pregúntate literalmente: «¿esto es recto a mis ojos, o es recto a los ojos de HaShem?». No se trata de paralizarse ni de dudar de todo. Se trata de meter la pregunta una vez donde no estaba, para descubrir si la respuesta cambia. La mayoría de las veces no cambiará. El día que cambie, habrás encontrado exactamente lo que la parashá te mandó mirar. — 2. Una mitzvá hecha por obligación, no por gusto. El movimiento de la parashá es del régimen voluntario al obligatorio. Elige hoy una sola cosa que sabes que debes hacer y que normalmente haces solo cuando te nace: una oración a su hora, una llamada a alguien que te cuesta, una tzedaká que ya habías decidido y postergaste. Hazla hoy, y hazla precisamente en el momento en que no te apetece. Ese pequeño acto es, en miniatura, todo el paso de bamot a Mikdash. — 3. La midá de la semana: אֱמוּנָה בְּלִי מוֹפֵת, fe sin prodigio. Esta semana, cuando aparezca la «señal» —el resultado que parece darle la razón a lo que sabes que está mal, la coincidencia que empuja hacia donde no debes ir— practica sostenerte sin necesitar que el universo te confirme. El texto ya te avisó: «y viene la señal y el prodigio… no escucharás». Estás autorizado a que la evidencia superficial esté en tu contra y aun así no moverte. — 4. Y el remedio que da el propio texto, cuatro versículos después: וּבוֹ תִדְבָּקוּן. La Torá no responde al profeta falso con un argumento mejor. Responde con apego. Así que el acto final es el más simple: un minuto de devekut, hoy. Un minuto entero, sin pedir nada, sin quejarte de nada, sin resolver nada. Solo estar. Es la única defensa que el versículo ofrece, y la ofrece en plural: se apegarán. Si puedes, hazlo con alguien más.`,
  },

  // ── 6. חֲתִימָה ───────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `La parashá se llama «Mira» y su eje es cómo se mira. La Torá prohíbe una manera de ver —«cada uno lo recto a sus propios ojos» (Devarim 12:8)— y la reemplaza, dos veces seguidas, por otra: «lo recto a los ojos de HaShem» (12:25 y 12:28). Es la misma palabra, hayashar. Lo único que cambia es de quién son los ojos.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `El texto sabe perfectamente que la señal del engañador funciona: «y viene la señal y el prodigio» (13:3), y aun así, «no escucharás» (13:4). El Rambam explica por qué: contra el milagro de un individuo está el ojo colectivo de Sinaí, «que nuestros ojos vieron y no los de un extraño» (Yesodei HaTorá 8:1). No ganamos la discusión con un prodigio mayor. La ganamos con lo que vimos.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `La dualidad no es una ilusión: es un instrumento. El Alter Rebbe lo dice sin ambigüedad: el Nombre Elokim es «el que separa, para que haya precisamente un “yesh” — y para que ese yesh se anule» (Likutei Torá, Re'eh 5:1). Y el Sefat Emet le pone el nombre exacto al estado del mundo: הֶסְתֵּר, ocultamiento, no falsedad — «en toda cosa hay un punto de vida… solo que en este mundo lo interior está oculto» (Re'eh 1:4). Por eso la regla del estudio es innegociable: nunca decimos que algo no existe; decimos que no está aparte. Ein od milvadó significa «no hay nada aparte de Él».`,
      },
      {
        etiqueta: "La imagen que lo sella:",
        texto: `Un rey vestido sigue siendo el rey. Sha'arei Orá (Quinta Puerta §98 y §103) describe la redención no como un desengaño sino como un desvestirse: «se quitará todas aquellas vestiduras… y entonces verá Israel a HaShem con el ojo». Y el versículo al que llegan, por caminos separados, tanto Gikatilla en el siglo XIII como el Alter Rebbe en el XIX, es el mismo: עַיִן בְּעַיִן יִרְאוּ — «ojo con ojo verán, cuando HaShem retorne a Tzión» (Yeshayahu 52:8).`,
      },
      {
        etiqueta: "Y el arco de la parashá:",
        texto: `Empieza en רְאֵה —«mira»— y termina en יֵרָאֶה —«será visto» (16:16)—: la misma raíz, ר־א־ה, dada vuelta. Entremedio, dieciséis veces «el lugar que Él elegirá», sin decir nunca cuál. Y sobre ese versículo de cierre, los Sabios dijeron, en Jaguigá 2a: «así como Él viene a ver, así viene a ser visto». Mirar y ser mirado son el mismo acto. Ese es el fin del ojo que ve doble: no que uno de los dos ojos se cierre, sino que los dos miren lo mismo.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Hoy: una decisión, tres segundos, la pregunta «¿a los ojos de quién?». Una mitzvá hecha justo cuando no te nace. Y un minuto de devekut, porque la Torá no contesta al engaño con un argumento, sino con «y a Él se apegarán» (13:5).`,
      },
      {
        etiqueta: "La honestidad del sello:",
        texto: `No decimos que el mundo sea mentira, ni que el mal no exista, ni que la elección sea aparente. Re'eh es, de principio a fin, la parashá de la elección: bendición y maldición, dos montañas, mira y elige. Lo que decimos es que hay un ocultamiento —real, funcional, con propósito— y que el trabajo del hombre no es despertar de un sueño, sino destapar lo que está tapado, empezando por sus propios ojos.`,
      },
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo (NO es una séptima sección) ──────────────
  hemshej: [
    "¿Y qué pasó en la parashá anterior, la del talón? → {{study:eikev-talon|Ekev — el talón, el eje de la cabeza y el final}}",
    "Si dieciséis veces se dice «el Lugar» sin decir cuál, ¿dónde está? → {{study:tercer-templo|El Tercer Templo}} · {{study:arca-no-ocupa-lugar|El Arca que no ocupaba lugar}}",
    "¿Puede el que mira cambiar lo que mira? → {{study:observador|El observador}}",
    "¿Quién es el que finalmente hace «lo recto a los ojos de HaShem»? → {{study:enigma-mashiaj|El enigma del Mashíaj}}",
    "La letra que es un ojo, y la letra con la que empieza «Mira» → {{letter:ayin|La letra Ayin — el ojo}} · {{letter:resh|La letra Resh — la cabeza}}",
  ],
  ctaRef: "Deuteronomy 12:8",
};
