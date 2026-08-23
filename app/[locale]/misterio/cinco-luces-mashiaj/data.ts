
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  MISTERIO — Las Cinco Luces y su revelación en el Mashíaj · אוֹר
//  Serie «El Mashíaj» (puerta de las luces). Contenido verificado por el Sofer:
//  scratchpad/estudio-cinco-luces.md (cabecera de verificación incluida).
//
//  GUARDARRAÍLES OBLIGATORIOS (cabecera del Sofer). Si alguien edita esta
//  página, tiene que seguir respetándolos:
//   1. Las cinco luces NO aparecen como quinteto en ninguna fuente única.
//      El mapa de cinco es LECTURA DE JASHMAL y así se dice siempre (aviso
//      inicial + nota de honestidad en מפרשים + rótulos dentro del Sod).
//      Cada pieza, por separado, sí está donde se dice que está.
//   2. La correspondencia cinco luces ↔ cinco niveles del alma ↔ proceso
//      mesiánico es lectura de Jashmal, construida sobre fuentes verificadas
//      pieza por pieza. Makif→Pnimí como clave mesiánica retoma el jidush de
//      la casa sobre Kóraj.
//   3. "La Yejidá general es el alma del Mashíaj" (Ramaz/Jabad) NO está
//      cotejada en Sefaria: se presenta SOLO como tradición transmitida,
//      nunca como cita textual.
//   4. "¿Dónde guardó la luz? En la Torá" — dicho NO localizado: NO se usa
//      en esta página, ni en redes.
//   5. Bereshit Rabbah 14:9 lista el alma como néfesh, rúaj, neshamá, yejidá,
//      jayá (ese orden); la Cabalá ordena néfesh, rúaj, neshamá, jayá,
//      yejidá. No alisar las fuentes: se señala la diferencia.
//   6. Gematrías permitidas SOLO: אור = 207 = רז = אין סוף (calculadas letra
//      por letra por el Sofer). NO liderar con נחש = משיח = 358 (directriz
//      del proyecto; aquí ni aparece).
//   7. Las citas del Arizal van con su doble vía: Etz Jaim + "citado
//      textualmente en TES" (Baal HaSulam) donde el Sofer lo marcó así.
//   8. El Besht se cita vía Meor Einayim, Pinjás (adam = Adam, David,
//      Mashíaj) — no de "cartas" ni formulaciones sueltas.
//
//  Hero (modo "numero"): אוֹר = 207 = רָז = אֵין סוֹף — la gematría verificada
//  del estudio.
//
//  IDIOMA: el análisis está en español. Los campos *Fa replican el español a
//  propósito (fallback), porque el Sofer aún no tradujo este estudio al farsi
//  y este departamento no genera farsi por su cuenta. Cuando llegue la
//  traducción verificada, se reemplazan aquí y en lib/content/misterios.ts.
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "cinco-luces-mashiaj",
  hero: {
    serielabel:
      "Serie «Del Enigma del Mashíaj al Ajarít HaYamim» · Las Cinco Luces — la puerta de las luces",
    serielabelFa:
      "Serie «Del Enigma del Mashíaj al Ajarít HaYamim» · Las Cinco Luces — la puerta de las luces",
    he: "אוֹר",
    titulo: "Las Cinco Luces y su revelación en el Mashíaj",
    tituloFa: "Las Cinco Luces y su revelación en el Mashíaj",
    ganchoEs:
      "Un mapa de la luz: de la primera palabra de la creación al final de la historia. La luz del primer día no es la del sol — el sol recién aparece en el cuarto día. La palabra «luz» suena cinco veces en ese día primero, y la tradición la nombra de cinco maneras: directa, retornante, interior, circundante, guardada. Un midrash dice para quién quedó guardada.",
    ganchoFa:
      "Un mapa de la luz: de la primera palabra de la creación al final de la historia. La luz del primer día no es la del sol — el sol recién aparece en el cuarto día. La palabra «luz» suena cinco veces en ese día primero, y la tradición la nombra de cinco maneras: directa, retornante, interior, circundante, guardada. Un midrash dice para quién quedó guardada.",
    numero: { valor: "207", rom: "Or = Raz = Ein Sof" },
  },

  // ── Prólogo — aviso de integridad (guardarraíl nº 1–3 del Sofer) ────────────
  aviso: {
    titulo: "Aviso de integridad del Sofer — el mapa y las fuentes",
    rotulo:
      "Cada fuente de este estudio fue cotejada texto por texto contra Sefaria. Pero el mapa que las une es nuestro, y hay que decirlo antes de empezar.",
    parrafos: [
      `Las cinco luces no aparecen como quinteto en ninguna fuente única. Or yashar y or jozer son una dinámica — bajada y retorno. Or pnimí y or makif son una relación con la vasija — lo que cupo y lo que rodea. Or haganuz es un destino histórico — lo guardado para el final. Son tres registros distintos. El mapa de cinco es lectura de Jashmal: cinco nombres que el Arizal y Jazal nos dan por separado, tejidos aquí en un solo hilo. Cada pieza, en cambio, está donde decimos que está.`,
      `Y una tradición que citamos sin poder cotejarla: la formulación «la Yejidá general es el alma del Mashíaj» se atribuye al Ramaz (Rabí Moshé Zacuto) y fue desarrollada en Jabad. No la localizamos textualmente en Sefaria; la presentamos como tradición transmitida, apoyada estructuralmente en Etz Jaim, Sháar 42 — y así va rotulada donde aparece.`,
    ],
  },

  // ── 1. תַּרְגּוּם ────────────────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "Versículo-ancla — Bereshit (Génesis) 1:3–4, el primer día",
        he: "וַיֹּ֥אמֶר אֱלֹהִ֖ים יְהִ֣י א֑וֹר וַֽיְהִי־אֽוֹר׃ וַיַּ֧רְא אֱלֹהִ֛ים אֶת־הָא֖וֹר כִּי־ט֑וֹב וַיַּבְדֵּ֣ל אֱלֹהִ֔ים בֵּ֥ין הָא֖וֹר וּבֵ֥ין הַחֹֽשֶׁךְ׃",
        es: "Y dijo Elokim: sea la luz — y fue la luz. Y vio Elokim la luz, que era buena, y separó Elokim entre la luz y la oscuridad.",
        source: "Bereshit 1:3–4",
      },
      {
        label: "La medida del reencuentro — Yeshayahu (Isaías) 30:26",
        he: "וְהָיָ֤ה אוֹר־הַלְּבָנָה֙ כְּא֣וֹר הַחַמָּ֔ה וְא֤וֹר הַֽחַמָּה֙ יִֽהְיֶ֣ה שִׁבְעָתַ֔יִם כְּא֖וֹר שִׁבְעַ֣ת הַיָּמִ֑ים בְּי֗וֹם חֲבֹ֤שׁ יְהֹוָה֙ אֶת־שֶׁ֣בֶר עַמּ֔וֹ וּמַ֥חַץ מַכָּת֖וֹ יִרְפָּֽא׃",
        es: "Y será la luz de la luna como la luz del sol, y la luz del sol será siete veces mayor — como la luz de los siete días — el día en que HaShem vende la fractura de Su pueblo y cure la herida de Su golpe.",
        source: "Yeshayahu 30:26",
      },
      {
        label: "El llamado — Yeshayahu 60:1",
        he: "ק֥וּמִי א֖וֹרִי כִּ֣י בָ֣א אוֹרֵ֑ךְ וּכְב֥וֹד יְהֹוָ֖ה עָלַ֥יִךְ זָרָֽח׃",
        es: "Levántate, resplandece, porque ha llegado tu luz, y la gloria de HaShem ha amanecido sobre ti.",
        source: "Yeshayahu 60:1",
      },
    ],
    parrafos: [
      `Tres versículos, tres tiempos. En el principio, una luz que no es el sol — el sol recién aparece en el cuarto día. En el futuro, una luz «como la luz de los siete días»: el profeta mide la luz del final con la vara de la luz del principio. Y entre ambas, un llamado: levántate, porque tu luz ya vino. La pregunta de este misterio es: ¿qué pasó con esa primera luz — y por qué las fuentes insisten en que volveremos a verla?`,
      `Una palabra antes de entrar: «or» (אוֹר) es luz; «haganuz» (הַגָּנוּז), de la raíz ganaz — guardar en tesoro, archivar. No «perdida»: depositada.`,
    ],
  },

  // ── 2. מְפָרְשִׁים ───────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rashi (רַשִׁ\"י), a Bereshit 1:4 — las dos voces del versículo.",
        texto: `Rashi lee la separación de la luz con dos voces, y él mismo lo dice: «también aquí necesitamos las palabras de la agadá: vio que no era digno que la usaran los malvados, y la separó para los tzadikim en el porvenir (le'atid lavó). Y según su sentido llano: vio que era buena, y que no convenía que luz y oscuridad funcionaran revueltas; fijó a una su dominio en el día y a la otra su dominio en la noche». Rashi, el maestro del pshat, abre aquí la puerta él mismo: el versículo llano habla de día y noche; la agadá habla de una luz retirada de la historia y reservada para su final.`,
      },
      {
        etiqueta: "Bereshit Rabbah 3:5 — las cinco luces son de Jazal.",
        texto: `Rabí Simón cuenta: «cinco veces está escrita aquí “luz”, correspondiendo a los cinco libros de la Torá». Y las recorre una por una: «sea la luz» es Bereshit, donde el Santo se ocupó y creó Su mundo; «y fue la luz» es Shemot, donde Israel salió de la tiniebla a la luz; «vio Elokim la luz, que era buena» es Vayikrá, lleno de leyes; «separó entre la luz y la oscuridad» es Bamidbar, que separa a los que salieron de Egipto de los que entraron a la tierra; «llamó Elokim a la luz día» es Devarim. El conteo de cinco luces en el primer día no es un invento moderno: es de Jazal. Cinco menciones, cinco libros — la luz del primer día ya viene quintuplicada desde el midrash.`,
      },
      {
        etiqueta: "Talmud Bavlí, Jaguigá 12a — la luz archivada.",
        texto: `Rabí Elazar enseña: «la luz que creó el Santo, bendito sea, el primer día — el hombre miraba con ella de un extremo del mundo al otro. Cuando el Santo observó la generación del Diluvio y la generación de la Dispersión y vio que sus obras estaban corrompidas, se levantó y la guardó de ellos (guenazó), como está dicho: “y es negada a los malvados su luz” (Iyov 38:15). ¿Y para quién la guardó? Para los tzadikim en el porvenir, como está dicho: “y vio Elokim la luz, que era buena” — y no hay “bueno” sino el tzadik, como está dicho: “decid del tzadik que es bueno” (Yeshayahu 3:10)». La luz no fue destruida. Fue archivada — y el archivo tiene destinatario y fecha: los justos, el porvenir.`,
      },
      {
        etiqueta: "Pesikta Rabbati 36 — el midrash nombra al depositario.",
        texto: `Aquí el midrash da el paso que este estudio necesita, y lo da él solo, sin ayuda nuestra: «“En Tu luz veremos luz” (Salmos 36:10) — ¿qué luz es la que la congregación de Israel espera? Es la luz del Mashíaj (oró shel Mashíaj), como está dicho: “y vio Elokim la luz, que era buena” — enseña que el Santo contempló al Mashíaj y sus obras antes de que fuera creado el mundo, y guardó la luz para Su Mashíaj y su generación bajo Su Trono de Gloria». El mismo versículo de Jaguigá — Bereshit 1:4 — y el midrash nombra al depositario: el or haganuz es, con nombre y apellido, la luz del Mashíaj. Y el pasaje se abre citando Yeshayahu 60:1: «Levántate, resplandece, porque ha llegado tu luz».`,
      },
      {
        etiqueta: "Zohar, Introducción 6 (= Zohar I:3a) — el diagrama de la Tet.",
        texto: `Cuando la letra Tet (ט) se presenta ante el Creador para pedir que el mundo sea creado con ella, porque con ella comienza «tov» (bueno), la respuesta es: «tu bien está oculto dentro de ti y atesorado dentro de ti (tuvaj satim begavaj, utzafún begavaj), como está escrito: “cuán grande es Tu bien, que atesoraste para los que Te temen” (Salmos 31:20); y puesto que está guardado dentro de ti (hoíl ugníz begavaj), no tiene parte en este mundo que Yo quiero crear, sino en el mundo venidero». La forma misma de la Tet — cerrada, replegada hacia adentro — es el diagrama de una luz que existe pero no se exhibe. Este pasaje ya lo estudiamos a fondo en la {{letter:tet|letra Tet}}; aquí se reencuentra con su serie.`,
      },
      {
        etiqueta: "El Arizal — el kav, «como un conducto delgado».",
        texto: `Todo el edificio luriánico de las luces, tal como lo transmite Rabí Jaim Vital en el Etz Jaim y tal como lo ordena y coteja Baal HaSulam en el Talmud Eser HaSefirot (TES), empieza en el kav: «como un conducto delgado» (Etz Jaim, Heijal 1, Sháar 1 — Igulim veYosher — Anaf 2; citado textualmente en TES, Parte II). Tras el tzimtzum, la luz infinita no regresa como océano sino como línea: medida, dirigida, capaz de construir mundos.`,
      },
      {
        etiqueta: "Or Yashar (אוֹר יָשָׁר) — la luz directa.",
        texto: `Baal HaSulam la define así: «la luz superior que se extiende desde el Ein Sof, bendito sea, y fluye en los partzufim… solo en las sefirot de yosher» (TES, Parte II, Histaklut Pnimit §94). Es el flujo original de la dádiva: de Arriba hacia abajo, del que da hacia el que recibe.`,
      },
      {
        etiqueta: "Or Jozer (אוֹר חוֹזֵר) — la luz que retorna.",
        texto: `«La luz que no es recibida en la cuarta fase… porque el masaj la detiene y la devuelve hacia atrás; y esa operación se llama zivug de-hakaá» — acoplamiento por golpe (TES, Parte II, Histaklut Pnimit §79). La vasija dice «no la tomaré solo para mí», y de ese rechazo amoroso nace una luz nueva que sube de abajo hacia arriba y viste a la luz superior. Baal HaSulam le dedica una parte entera del TES: la Parte III se titula, literalmente, «Or Yashar y Or Jozer». En el Etz Jaim, la dinámica de rostro y espalda de estas dos luces está en el Sháar 6, capítulo 8 (citado textualmente en TES, Parte III).`,
      },
      {
        etiqueta: "Or Pnimí (אוֹר פְּנִימִי) — la luz interior.",
        texto: `La definición más corta de todo el TES: «es la luz vestida en la vasija» (TES, Parte II, cap. 1, Or Pnimí §40). Lo que ya cupo. Lo que ya es tuyo por dentro.`,
      },
      {
        etiqueta: "Or Makif (אוֹר מַקִּיף) — la luz circundante.",
        texto: `Y aquí Baal HaSulam escribe algo extraordinario: «es la luz destinada a vestirse en el nivel, pero que se demora por algún límite que hay en él. Y este nombre tiene dos sentidos: uno, que es una iluminación lejana; dos, que es una iluminación asegurada (hearah betujá) — es decir, que al fin de los fines está destinada a vestirse allí, porque la luz la “rodea” por todas partes y no le deja lugar alguno por donde escapar» (TES, Parte II, cap. 1, Or Pnimí §40). Y el Arizal mismo establece la jerarquía: «el or makif es mayor y más excelso que el or pnimí» (Etz Jaim, Heijal Adam Kadmon, Sháar 6 — Akudim — cap. 2; citado textualmente en TES, Parte IV). Lo que no te cabe todavía no es lo que perdiste: es lo más grande que tienes.`,
      },
      {
        etiqueta: "La escala del alma — NaRaNJa\"Y.",
        texto: `El Arizal enseña que hay cinco vasijas para cinco luces del alma — NaRaNJa"Y: néfesh, rúaj, neshamá, jayá, yejidá (Etz Jaim, Sháar 40, drush 12; Sháar HaGuilgulim, Introducción 1). Y corona: «todas las luces de Adam Kadmon se llaman yejidá» (Etz Jaim, Sháar 42, cap. 2, final). La yejidá — «la única» — es el punto del alma que nunca entró en vasija alguna.`,
      },
      {
        etiqueta: "Nota de honestidad del Sofer — quién dice qué.",
        texto: `En ninguna de estas fuentes las cinco luces aparecen como una serie de cinco. Or yashar y or jozer describen una dinámica — bajada y retorno. Or pnimí y or makif describen una relación con la vasija — lo que cupo y lo que rodea. Or haganuz describe un destino histórico — lo guardado para el final. Son tres registros distintos. El quinteto, como mapa único, es lectura de Jashmal; cada pieza, en cambio, está donde decimos que está.`,
      },
    ],
    glosa: `Glosa para el lector: or (אוֹר) = luz. ganaz / haganuz = guardar en tesoro; «lo guardado». guenizá = el acto (o el depósito) de guardar. le'atid lavó = «para el porvenir». tzadik = justo. tzimtzum = la contracción inicial de la luz infinita. kav = la «línea» de luz que entra tras el tzimtzum. masaj = la «pantalla» que rechaza recibir solo para sí. zivug de-hakaá = «acoplamiento por golpe», el encuentro entre la luz y el masaj. partzuf (pl. partzufim) = configuración de sefirot. NaRaNJa"Y = néfesh, rúaj, neshamá, jayá, yejidá — los cinco niveles del alma. Adam Kadmon = el primer mundo, anterior a todos. TES = Talmud Eser HaSefirot, la ordenación del Etz Jaim por Baal HaSulam (Rav Yehuda Ashlag). Ein Sof = el Infinito. raz (רָז) = secreto.`,
  },

  // ── 3. פרד״ס ─────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `En el sentido llano, Bereshit 1 habla de una luz creada el primer día y de su ordenamiento: día y noche, cada uno en su dominio — así lo lee el propio Rashi en su registro de pshat. Y Yeshayahu 30:26 habla, en su contexto, de la curación futura de Israel: el día en que HaShem «vende la fractura de Su pueblo», la luz será multiplicada — «como la luz de los siete días», una expresión que el profeta usa para decir: como al principio. El pshat ya contiene el arco completo: una luz al principio, una herida en el medio, y la promesa de que la luz del final será la del principio, aumentada.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión), con la gematría",
        parrafos: [
          `Los números y patrones, todos verificados. Cinco menciones de «or» en Bereshit 1:3–5 — contadas en el texto masorético: יְהִי אוֹר · וַיְהִי־אוֹר · אֶת־הָאוֹר · בֵּין הָאוֹר · לָאוֹר. Y Rabí Simón (Bereshit Rabbah 3:5) las cuenta antes que nosotros: cinco luces, cinco libros de la Torá. Cinco nombres del alma (Bereshit Rabbah 14:9): néfesh, rúaj, neshamá, yejidá, jayá. (El midrash las lista en ese orden; la Cabalá las ordena néfesh, rúaj, neshamá, jayá, yejidá — lo señalamos para no alisar las fuentes.)`,
          `Gematría, calculada letra por letra: אוֹר (or) = א 1 + ו 6 + ר 200 = 207. רָז (raz, secreto) = ר 200 + ז 7 = 207. אֵין סוֹף (Ein Sof) = אין 61 + סוף 146 = 207. La luz, el secreto y el Infinito comparten un solo número: en el marco de Rav Ginsburgh, la luz es el secreto del Infinito dentro de lo finito. Una luz guardada (ganuz) no es una luz apagada — es una luz vuelta raz.`,
          `El remez del quinteto: cinco luces en el primer día, cinco libros, cinco niveles del alma. La tradición pone estas tres series de cinco una al lado de la otra; el hilo que las une en un solo mapa es nuestra lectura — y lo decimos.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética)",
        parrafos: [
          `El drash lo pone el Baal Shem Tov, transmitido en el Meor Einayim (Pinjás): «como dijo el Baal Shem Tov: cada uno de Israel debe reparar y preparar la parte de la estatura del Mashíaj (jélek komat Mashíaj) que pertenece a su alma». Y el mismo pasaje sella con las iniciales: אָדָם — Adam, David, Mashíaj. La estatura del Mashíaj no baja armada del cielo: se construye, parte por parte, con cada alma que enciende la suya. El Mashíaj, en esta enseñanza, es una obra colectiva de iluminación — cada tefilá con unificación de pensamiento y palabra, dice el Meor Einayim, edifica un miembro de esa estatura.`,
          `La liturgia diaria lo pide sin rodeos cada mañana, en la bendición del Yotzer: אוֹר חָדָשׁ עַל צִיּוֹן תָּאִיר — «haz brillar una luz nueva sobre Sión, y que todos nosotros merezcamos pronto su luz». Tres veces al día generaciones enteras piden la luz — no una luz: esa luz.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto)",
        parrafos: [
          `En el Sod, con Baal HaSulam como guía, el mapa de Jashmal se despliega — y cada estación pisa una fuente verificada. Primera: Or Yashar, el regalo inicial. La luz directa desciende del Ein Sof por el kav, «como un conducto delgado». Todo comienza con una dádiva no ganada: la creación misma, el «sea la luz». En el lenguaje de nuestra serie: el {{study:despertar-de-lo-alto|despertar desde Arriba}}.`,
          `Segunda: Or Jozer, la respuesta de abajo. El masaj rechaza recibir solo para sí, y de ese acto nace una luz que sube. Baal HaSulam enseña que sin or jozer no hay vasija capaz de retener nada: toda recepción verdadera pasa por una devolución. La redención tiene la misma estructura: no es solo un regalo que baja — es una luz que el receptor devuelve, y al devolverla, viste. Por eso el proceso mesiánico exige la obra humana; un mundo que solo recibe no puede sostener esa luz.`,
          `Tercera: Or Pnimí, lo ya conquistado. Cada mitzvá, cada estudio, cada reparación viste un poco de luz en la vasija. La enseñanza del Besht es exactamente esto en lenguaje jasídico: tu parte de la estatura del Mashíaj es la luz que tú lograste hacer pnimí.`,
          `Cuarta: Or Makif, la garantía. Aquí el Sod se vuelve casi consuelo jurídico: la luz que no cabe no se va. Es «hearah betujá» — iluminación asegurada, dice Baal HaSulam: rodea la vasija por todas partes y no le deja escapatoria; terminará vistiéndose. Y el Arizal: el makif es mayor que el pnimí. Los días del Mashíaj, en esta lectura de Jashmal, son el nombre del proceso por el cual el makif se hace pnimí — lo que hoy solo nos rodea, mañana nos habita. (Es la misma clave del jidush de la casa sobre Kóraj: Makif→Pnimí.)`,
          `Quinta: Or HaGanuz, el tesoro con destinatario. Y aquí ya no hace falta lectura nuestra, porque el midrash lo dijo solo: la luz del primer día fue guardada bajo el Trono de Gloria para el Mashíaj y su generación (Pesikta Rabbati 36). Jaguigá 12a da la fecha: le'atid lavó. El Zohar da el diagrama: la Tet, el bien guardado dentro, reservado al mundo venidero. Y Yeshayahu 30:26 da la medida del reencuentro: «como la luz de los siete días» — la luz del final es la del principio, devuelta con intereses, el día en que la fractura sea vendada.`,
          `La escalera del alma sube igual: néfesh, rúaj, neshamá son las luces que un alma va vistiendo (pnimí); jayá y yejidá permanecen como luces circundantes (makif) — y «todas las luces de Adam Kadmon se llaman yejidá» (Etz Jaim, Sháar 42). La tradición transmitida en nombre del Ramaz — que no pudimos cotejar textualmente y así lo decimos — llama al Mashíaj la yejidá general: el punto del alma que nunca entró en vasija, revelándose por fin en la historia. Si el exilio es la era del or makif — la luz que rodea sin entrar — la redención es la era en que la que rodea encuentra vasija. Dos filos de un mismo versículo: «vio Elokim la luz, que era buena» — el pshat dice que la luz fue separada; el Sod dice que fue prometida.`,
        ],
      },
    ],
    caja: {
      titulo: "Lo que te excede no te excluye.",
      cuerpo:
        "Cinco nombres para una sola luz: cómo baja (yashar), cómo responde (jozer), cuánto cabe (pnimí), cuánto rodea (makif) y para cuándo está guardada (ganuz). El midrash nombra al depositario: la luz del primer día fue guardada bajo el Trono de Gloria para el Mashíaj y su generación (Pesikta Rabbati 36). El exilio es luz esperando vasija; la redención, la vasija llegando a su luz.",
    },
  },

  // ── 4. הִתְבּוֹנְנוּת ─────────────────────────────────────────────────────────
  hitbonenut: {
    intro: "Detente aquí. No agregues nada nuevo; solo mira lo que ya está sobre la mesa.",
    parrafos: [
      {
        texto: `Hay luz en tu vida que ya está adentro — lo aprendido, lo reparado, lo que ya eres. Esa es tu luz interior: no necesitas pelearla, necesitas cuidarla. Y hay luz que te rodea y no cabe — lo que entiendes a medias, lo que anhelas y no alcanzas, la persona que todavía no logras ser. La contemplación de este estudio es un cambio de mirada sobre esa segunda luz: no es tu fracaso; es tu porción guardada. Te rodea. No tiene por dónde escaparse.`,
      },
      {
        etiqueta: "¿Cuánta de tu luz has hecho retornar?",
        texto: `Mira también tu propio ritmo de dar y devolver. ¿Cuánta de tu luz es recibida sin respuesta — y cuánta has hecho retornar? ¿Dónde en tu día hay un masaj — un «no lo tomaré solo para mí» — del que nazca luz que suba?`,
      },
      {
        etiqueta: "¿Y si la historia fuera una guenizá?",
        texto: `Y mira la historia como la miran estas fuentes: no como una caída interminable, sino como una guenizá — un depósito con fecha de apertura. La misma mirada que Elokim posó sobre la luz («y vio que era buena») estaba, dice el midrash, posada sobre el Mashíaj antes del mundo. El mundo no espera una luz nueva: espera el permiso de la primera.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה ───────────────────────────────────────────────────────────────
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Convierte un makif en pnimí — uno solo.",
    texto: `Elige una enseñanza que conoces «por fuera» — una idea que citas pero no vives, una mitzvá que respetas pero no practicas, una reconciliación que sabes pendiente. Hoy, dale vasija: estúdiala hasta poder explicarla con tus palabras, o hazla una vez, hoy, en pequeño. Esa es tu parte de la estatura — el Besht enseñó que nadie más puede vestir esa luz por ti. Y esta noche, antes de dormir, una línea de or jozer: nombra una cosa que recibiste hoy y devuélvela hacia arriba — en agradecimiento dicho en voz alta, o en una ayuda concreta a alguien mañana. Luz que no retorna, no viste.`,
  },

  // ── 6. חֲתִימָה ───────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `La Torá abre con una luz que no es el sol, mencionada cinco veces; la tradición la sigue con cinco nombres — directa, retornante, interior, circundante, guardada — y el midrash declara que la guardada es la luz del Mashíaj, depositada bajo el Trono para el final de la historia (Pesikta Rabbati 36).`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Las cinco luces no son cinco objetos sino cinco relaciones con una sola luz: cómo baja, cómo responde, cuánto cabe, cuánto rodea, y para cuándo está guardada. El quinteto como mapa es lectura de Jashmal; cada pieza es fuente verificada.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `Lo que te excede no te excluye. El or makif — la luz que no cabe en ti — es, en palabras de Baal HaSulam, luz asegurada: te rodea sin escapatoria hasta el día en que quepa. El exilio es luz esperando vasija; la redención, la vasija llegando a su luz.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Construye tu parte de la estatura — cada día, una luz de afuera hacia adentro, y una luz devuelta hacia arriba.`,
      },
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  hemshej: [
    "{{letter:tet|¿Por qué la letra del bien esconde su bien? — La Tet: el bien guardado}}",
    "{{study:enigma-mashiaj|¿Quién — o qué — es el Mashíaj en las fuentes? — El Enigma del Mashíaj, la Tesis}}",
    "{{study:despertar-de-lo-alto|¿La redención baja sola o hay que subir a buscarla? — El Despertar desde Arriba}}",
    "{{study:ropas-de-luz|¿Qué perdimos cuando la luz se hizo piel? — De Ropas de Luz a Piel de Serpiente}}",
  ],
  ctaRef: "Genesis 1:4",
};
