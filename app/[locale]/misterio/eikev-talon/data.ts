
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  MISTERIO — Eikev / El talón · עֵקֶב
//  Serie «Parashá». Contenido verificado por el Sofer:
//  scratchpad/eikev-talon-verificacion.md
//
//  GUARDARRAÍLES OBLIGATORIOS (sección 5 del informe del Sofer). Si alguien
//  edita esta página, tiene que seguir respetándolos:
//   1. El Zohar dice אָבָק (avak, polvo), NUNCA אֵפֶר (ceniza) en la lucha de
//      Yaakov. Quien lo llama éfer es el Beit Yaakov (Izhbitz) — se atribuye ahí.
//   2. NUNCA "del talón de Yaakov" en la lucha: las fuentes dicen "sus pies"
//      (Julín 91a: מַרְגְּלוֹתָם · Zohar: רַגְלֵיהוֹן). עקב no aparece ahí.
//   3. NUNCA "el fuego del talón refinó el polvo". Es lo contrario de Rabí
//      Shimón. Fórmula correcta: Yaakov ELEVÓ el polvo estéril, no lo produjo.
//   4. NO mezclar la ceniza de Yitzjak (Taanit 16a) con la lucha de Yaakov.
//   4b. NO citar Likutei Torá (Ki Tetzé) ni Sod Yesharim (Purim 32:4) — sin
//      verificar.
//   5. NO afirmar gematría entre עפר (350) y אפר (281). No coinciden.
//   6. NO decir que 172 "significa" algo. Lo sólido es 182 − 172 = 10 = yud.
//   7. NO decir "el talón es Maljut" citando Zohar o Arizal (cero coincidencias).
//   8. NO liderar con נחש = משיח = 358 (decisión vigente del proyecto): omitido.
//   9. Bereshit 3:15 tiene lectura cristiana muy cargada. Se presenta SOLO desde
//      fuentes judías (Rashi, Ramban, Radak, Ibn Ezra, Mishná Berajot). NO se
//      usa "la simiente de la mujer" como si señalara a una persona concreta.
//      → Para eso está la sección הַבְחָנָה de esta página.
//  10. La lectura polvo→fuego del alma va marcada como jidush (bloque `jidush`),
//      NUNCA en boca del Zohar.
//
//  Hero (modo "numero"): la diferencia entre יַעֲקֹב (182) y עֵקֶב (172) = 10 = yud.
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "eikev-talon",
  hero: {
    serielabel: "Serie «Parashá» · Eikev — el eje de la cabeza y el talón",
    serielabelFa: "سری «پاراشا» · عِقِو — محورِ سر و پاشنه",
    he: "עֵקֶב",
    titulo: "El talón: lo que pisamos sin mirar",
    tituloFa: "پاشنه: آنچه بی‌آنکه بنگریم لگد می‌کنیم",
    ganchoEs:
      "Toda la parashá se juega en un solo eje: la cabeza y el talón. El Ramban lo dice sin rodeos —la cabeza es el comienzo, el talón es el final—, y Rashi señala exactamente dónde muerde: las mitzvot livianas son las que el hombre pisotea con sus talones. Justo el único blanco que le quedó a la serpiente. Y ahí, agarrado del talón de su hermano, nace Yaakov: עֵקֶב más una letra pequeñísima, una yud.",
    ganchoFa:
      "تمامِ این پاراشا بر یک محور می‌چرخد: سر و پاشنه. رامبان بی‌پرده می‌گوید — سر آغاز است و پاشنه پایان — و راشی دقیقاً نشان می‌دهد کجا گزیده می‌شود: میتزوت‌های سبک همان‌هایند که آدمی با پاشنه‌اش لگد می‌کند. همان تنها هدفی که برای مار باقی ماند. و آنجا، در حالی که پاشنهٔ برادرش را گرفته، یعقوب زاده می‌شود: עֵקֶב به‌علاوهٔ یک حرفِ بسیار کوچک، یک یود.",
    numero: { valor: "10", rom: "Yaakov 182 − Ekev 172 = una yud" },
    // Estudio de la serie «Parashá»: el "volver" apunta al índice de misterios,
    // no a la puerta de la serie del Mashíaj (default de la plantilla).
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── 1. תַּרְגּוּם ────────────────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "Versículo-ancla — Devarim (Deuteronomio) 7:12, la parashá",
        he: "וְהָיָ֣ה ׀ עֵ֣קֶב תִּשְׁמְע֗וּן אֵ֤ת הַמִּשְׁפָּטִים֙ הָאֵ֔לֶּה וּשְׁמַרְתֶּ֥ם וַעֲשִׂיתֶ֖ם אֹתָ֑ם",
        es: "Y sucederá que a cambio de (עֵקֶב) que escuchen estas leyes, y las guarden y las cumplan…",
        source: "Devarim 7:12",
      },
      {
        label: "El límite de la serpiente — Bereshit (Génesis) 3:15",
        he: "וְאֵיבָ֣ה ׀ אָשִׁ֗ית בֵּֽינְךָ֙ וּבֵ֣ין הָֽאִשָּׁ֔ה וּבֵ֥ין זַרְעֲךָ֖ וּבֵ֣ין זַרְעָ֑הּ ה֚וּא יְשׁוּפְךָ֣ רֹ֔אשׁ וְאַתָּ֖ה תְּשׁוּפֶ֥נּוּ עָקֵֽב׃",
        es: "Y pondré enemistad entre ti y la mujer, y entre tu simiente y su simiente; él te herirá la cabeza, y tú le herirás el talón.",
        source: "Bereshit 3:15",
      },
      {
        label: "El nombre que nace de un talón — Bereshit 25:26",
        he: "וְיָדוֹ אֹחֶזֶת בַּעֲקֵב עֵשָׂו וַיִּקְרָא שְׁמוֹ יַעֲקֹב",
        es: "…y su mano agarrada al talón de Esav, y llamó su nombre Yaakov.",
        source: "Bereshit 25:26",
      },
      {
        label: "La orden que suena imposible — Mishná, Berajot 5:1",
        he: "וַאֲפִלּוּ נָחָשׁ כָּרוּךְ עַל עֲקֵבוֹ, לֹא יַפְסִיק׃",
        es: "Y aunque una serpiente esté enroscada en su talón, no interrumpe [la oración].",
        source: "Mishná, Berajot 5:1",
      },
      {
        label: "La noche del vado — Bereshit 32:25 y Talmud Bavlí, Julín 91a",
        he: "וַיִּוָּתֵ֥ר יַעֲקֹ֖ב לְבַדּ֑וֹ וַיֵּאָבֵ֥ק אִישׁ֙ עִמּ֔וֹ עַ֖ד עֲל֥וֹת הַשָּֽׁחַר׃ — מְלַמֵּד שֶׁהֶעֱלוּ אֲבַק מַרְגְּלוֹתָם עַד כִּסֵּא הַכָּבוֹד",
        es: "Y quedó Yaakov solo, y un hombre luchó (vayé'avek, de avak, polvo) con él hasta que subió el alba. — Enseña que elevaron el polvo de sus pies hasta el Trono de Gloria.",
        source: "Bereshit 32:25 · Julín 91a",
      },
    ],
    parrafos: [
      `Un solo eje sostiene toda la parashá: la cabeza y el talón. La palabra que le da nombre —עֵקֶב, ekev— es literalmente «talón», y aquí funciona como conjunción: «a cambio de», «como consecuencia de». El Ramban explica por qué una misma palabra puede decir las dos cosas: porque el talón es la parte de atrás, lo último del cuerpo, y por eso el hebreo llama עקב al desenlace de cualquier asunto (Ramban a Devarim 7:12).`,
      `Y en el otro extremo de la Torá, en el jardín, esa misma palabra marca un límite: a la serpiente no le queda la cabeza; le queda el talón (Bereshit 3:15). Entre los dos versículos nace un hombre agarrado precisamente de un talón, y su nombre —יַעֲקֹב, Yaakov— es esa palabra más una sola letra (Bereshit 25:26).`,
      `Léalo con los ojos y las cuentas: עֵקֶב = ע70 + ק100 + ב2 = 172. יַעֲקֹב = י10 + ע70 + ק100 + ב2 = 182. La diferencia es exactamente 10: una yud, la letra más pequeña del alefato. Aritmética y gráficamente, Yaakov es «talón más una chispa».`,
    ],
  },

  // ── 2. מְפָרְשִׁים ───────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Ramban / Najmánides (רַמְבַּ\"ן), a Devarim 7:12 — la pieza clave.",
        texto: `El Ramban dice la frase que abre todo el estudio: וְהָרֹאשׁ תְּחִלָּה וְהֶעָקֵב בּוֹ אַחֲרִית וָסוֹף — «la cabeza es el comienzo, y el talón en él es el final y el fin». Por eso, añade, «llaman עֵקֶב al desenlace de cualquier cosa». Y sobre el sentido de la palabra en este versículo: טַעַם עֵקֶב, כְּמוֹ בַּעֲבוּר — «el sentido de ekev es como “a causa de”», apoyándose en Bereshit 26:5. El cuerpo humano queda convertido en un mapa del tiempo: arriba el principio, abajo el final.`,
      },
      {
        etiqueta: "Ibn Ezra, a Devarim 7:12.",
        texto: `Ibn Ezra apunta al otro filo de la misma palabra: עקב שכר באחרונה — ekev es «la recompensa que llega al final». Lo confirma Tehilim 19:12: בְּשָׁמְרָם עֵקֶב רָב, «en guardarlos hay עֵקֶב abundante». El talón no es solo lo que pisa: es lo que se cobra al final del camino.`,
      },
      {
        etiqueta: "Rashi (רַשִׁ\"י), a Devarim 7:12 — dónde muerde de verdad.",
        texto: `Rashi lee la palabra en su sentido físico y le da su golpe: אִם הַמִּצְווֹת קַלּוֹת שֶׁאָדָם דָּשׁ בַּעֲקֵבָיו תִּשְׁמְעוּן — «si escuchan las mitzvot livianas, esas que el hombre pisotea con sus talones…». No habla de los grandes pecados: habla de lo que ni siquiera miramos al pisarlo.`,
      },
      {
        etiqueta: "Midrash Tanjuma, Eikev 1 — de dónde lo toma Rashi.",
        texto: `El Midrash es la fuente de la lectura de Rashi y es todavía más duro: son las mitzvot livianas שֶׁמַּשְׁלִיכִין אוֹתָן תַּחַת עִקְבֵיהֶן, «que [las personas] arrojan bajo sus talones». Y lo ancla en un verso de David: עֲוֺן עֲקֵבַי יְסוּבֵּנִי — «la iniquidad de mis talones me rodea» (Tehilim 49:6). El Tanjuma lo explica sin rodeos: David no teme las transgresiones graves —de esas se cuida—; teme las livianas, las que pisó sin darse cuenta. Por eso el mismo Midrash cita Pirkei Avot 2:1: וֶהֱוֵי זָהִיר בְּמִצְוָה קַלָּה כְבַחֲמוּרָה, «sé cuidadoso con la mitzvá liviana como con la grave».`,
      },
      {
        etiqueta: "Rashi, Ramban y Radak a Bereshit 3:15 — el límite de la serpiente.",
        texto: `En el jardín, los tres comentaristas leen el versículo como un reparto desigual de poder, no como el anuncio de un personaje. Rashi glosa el verbo raro שוף con יְכַתֶּתְךָ, «te triturará / te machacará» (compárese con Devarim 9:21), y recuerda que el Targum traduce וְשָׁפִית. El Ramban lo dice con toda claridad: שֶׁיִּהְיֶה לָאָדָם יִתְרוֹן עָלֶיךָ בָּאֵיבָה — «que el hombre lleve ventaja sobre ti en esta enemistad», porque él te hiere en la cabeza וִירַצֵּץ מוֹחֲךָ שָׁם, «y aplasta tu cerebro allí». Y el Radak precisa el alcance de la serpiente: לֹא תוּכַל לוֹ אֶלָּא בַּעֲקֵבוֹ שֶׁתַּכֶּנּוּ בּוֹ בִּנְשִׁיכָה — «no podrás con él sino en su talón, que lo golpearás allí con una mordida». Una mordida, abajo, en lo último. Nada más.`,
      },
      {
        etiqueta: "Mishná, Berajot 5:1 — la orden imposible.",
        texto: `Y entonces la Mishná ordena algo que parece contra natura: וַאֲפִלּוּ נָחָשׁ כָּרוּךְ עַל עֲקֵבוֹ, לֹא יַפְסִיק — «aunque una serpiente esté enroscada en su talón, no interrumpe [la oración]». El punto exacto donde la serpiente sí alcanza al hombre es el punto donde la Mishná manda no moverse.`,
      },
      {
        etiqueta: "Zohar, Bereshit 18:202 — el corazón del misterio.",
        texto: `El Zohar toma esa línea de la Mishná, la pone junto al versículo del jardín y responde qué sostiene al orante: אֲפִילוּ נָחָשׁ כָּרוּךְ עַל עֲקֵבוֹ לֹא יַפְסִיק. אַף עַל גַּב דְּאִתְּמָר בֵּיהּ וְאַתָּה תְּשׁוּפֶנּוּ עָקֵב. הַהִיא אֶבֶן דְּאִיהִי י' דְּיַעֲקֹב… לֹא יַפְסִיק — «“aunque una serpiente esté enroscada en su talón, no interrumpe”. Aun cuando de él se dijo “y tú le herirás el talón”. Esa piedra, que es la yud de Yaakov… no interrumpe». El Zohar cita ahí Bereshit 49:24 («la piedra de Israel»). Tres textos que parecían distintos —el jardín, la Mishná de la oración y el nombre de Yaakov— quedan cosidos en una sola frase: lo que hay en el talón de Yaakov, y no hay en el talón de Adam, es una yud.`,
      },
      {
        etiqueta: "Zohar, Vayishláj 5:87–89 (= Zohar I:170a) — el polvo del acusador.",
        texto: `En la noche del vado, el verbo de la lucha viene de la raíz אבק, «polvo»: וַיֵּאָבֵק אִישׁ עִמּוֹ (Bereshit 32:25). Rabí Shimón distingue dos polvos y hay que leerlo con cuidado, porque casi todo el mundo lo invierte: אָבָק טָפֵל לֶעָפָר… דָּא אָבָק דְּאִשְׁתָּאַר מִן נוּרָא וְלָא עֲבַד אִיבִּין לְעָלְמִין. עָפָר דְּכָל אִיבִּין נָפְקֵי מִנֵּיהּ — «el avak es subordinado al afar… Este avak es lo que quedó del fuego, y jamás da fruto. El afar, en cambio, es aquel del que salen todos los frutos». Para el Zohar, el residuo del fuego es lo estéril, no lo refinado. Y el párrafo siguiente lo remacha: אָבָק לָא עָבִיד פֵּירִין… דְּאַתְיָא בְּהַהוּא אָבָק וּרְכִיב עֲלֵיהּ, בְּגִין לְקַטְרְגָא לֵיהּ לְיַעֲקֹב — «el avak jamás da frutos; y por eso “luchó un hombre”: que vino con ese avak y cabalgaba sobre él, para acusar a Yaakov». El polvo quemado no es un producto del combate: es la montura del acusador. Y ese polvo tiene horario: גָּלוּתָא הַשְׁתָּא כְּלֵילְיָא דַמְיָא… וְשָׁלְטָא הַהוּא אָבָק עַל יִשְׂרָאֵל… עַד דְּיִסְתַּלַּק נְהוֹרָא וְיִתְנְהַר יְמָמָא — «el exilio de ahora se parece a la noche… y ese avak domina sobre Israel… hasta que se eleve la luz y amanezca el día». Por eso la lucha dura עַד עֲלוֹת הַשָּׁחַר, «hasta que subió el alba».`,
      },
      {
        etiqueta: "Bereshit Rabá 77:2–3 — el fuego real de esa noche, y quién quedó sucio.",
        texto: `El Midrash pone fuego en la escena, pero no donde uno lo esperaría. El ángel נָתַן אֶצְבָּעוֹ בָּאָרֶץ, הִתְחִילָה הָאָרֶץ תּוֹסֶסֶת אֵשׁ — «puso su dedo en la tierra, y la tierra empezó a hervir fuego». Yaakov le contesta: מִן דָּא אַתְּ מַדְחִיל לִי? אֲנָא כֻּלֵּיהּ מִנָּהּ — «¿con eso me asustas? yo soy todo de eso», citando Ovadiá 1:18: וְהָיָה בֵית יַעֲקֹב אֵשׁ, «y la casa de Yaakov será fuego». El fuego lo saca el ángel; Yaakov responde que él ya es de esa materia. Y el mismo Midrash pregunta quién ganó: אֵין אָנוּ יוֹדְעִים מִי נָצַח… הֱוֵי מִי נִתְמַלֵּא אָבָק — הָאִישׁ שֶׁעִמּוֹ — «no sabíamos quién venció… pues bien: ¿quién quedó cubierto de polvo? El hombre que estaba con él». El que salió cubierto de polvo fue el ángel. (El ángel es identificado por Bereshit Rabá 77:3 y por Rashi a Bereshit 32:25 como שָׂרוֹ שֶׁל עֵשָׂו, el príncipe de Esav.)`,
      },
      {
        etiqueta: "Julín 91a — a dónde fue a parar ese polvo.",
        texto: `Y el Talmud remata con la frase más grande de todo el episodio: מְלַמֵּד שֶׁהֶעֱלוּ אֲבַק מַרְגְּלוֹתָם עַד כִּסֵּא הַכָּבוֹד — «enseña que elevaron el polvo de sus pies hasta el Trono de Gloria» (R. Yehoshúa ben Leví, mediante una gezerá shavá con Najum 1:3, וְעָנָן אֲבַק רַגְלָיו). Hay que decirlo con precisión, porque en la exactitud está la enseñanza: la fuente dice מַרְגְּלוֹתָם, «el lugar de sus pies» —no עקב, no «talón»—; y dice הֶעֱלוּ, «elevaron». Yaakov no fabricó ese polvo: el polvo era el del acusador, lo estéril, lo que jamás da fruto. Lo que Yaakov hizo fue hacerlo subir.`,
      },
      {
        etiqueta: "Nota de precisión — la palabra «ceniza».",
        texto: `Muchas versiones populares de esta enseñanza dicen que el Zohar habla de «ceniza». No es así: en todo el Zohar de Vayishláj la palabra אֵפֶר (éfer, ceniza) no aparece ni una vez; el Zohar dice אָבָק (avak, polvo fino). Quien sí llama «ceniza» a ese avak es la jasidut de Izhbitz: el Beit Yaakov al HaTorá, Vayerá 32:1, escribe que el afar puede germinar y el éfer no, «y como está en el Zohar sagrado (Vayishláj 170a): el avak que quedó del fuego». Es decir: el término «ceniza» tiene dueño, y no es Rabí Shimón. Y conserva la misma valencia: lo que no germina.`,
      },
    ],
    glosa: `Glosa para el lector: ekev (עֵקֶב) = talón; también «a causa de / al final». Yaakov (יַעֲקֹב) = ekev más una yud. yud (י) = la letra más pequeña del alefato, valor 10. avak (אָבָק) = polvo fino, polvillo. afar (עָפָר) = tierra, la que germina. éfer (אֵפֶר) = ceniza. mitzvá kalá = mitzvá «liviana», de las que parecen de poco peso. gezerá shavá = regla talmúdica que une dos versículos por una palabra compartida. sar shel Esav = el ángel-príncipe de Esav. Kisé HaKavod = el Trono de Gloria. galut = exilio.`,
  },

  // ── 2b. הַבְחָנָה — Desambiguación de Bereshit 3:15 ──────────────────────────
  //  Guardarraíl nº 9 del Sofer: este versículo tiene una lectura cristiana muy
  //  cargada. Se presenta SOLO desde las fuentes judías nombradas.
  habchana: {
    intro:
      "Bereshit 3:15 es uno de los versículos más disputados de la Biblia y arrastra una lectura ajena muy cargada. Aquí se lee únicamente desde las fuentes judías clásicas — Rashi, Ramban, Radak, Ibn Ezra y la Mishná —, y conviene decir con claridad qué dicen y qué no dicen.",
    parrafos: [
      `En la lectura judía clásica, «su simiente» no señala a un individuo concreto: designa a la descendencia humana en su conjunto, enfrentada a la descendencia de la serpiente. Ibn Ezra glosa זרעה יככה בראש, «su simiente te golpeará en la cabeza», y compara el verbo raro שוף con Iyov 9:17. El Radak añade que en lo oculto todo esto se interpreta (וּבַנִּסְתָּר נִדְרָשׁ כָּל זֶה) y sitúa el cese de la enemistad en los días del Mashíaj, pero en clave de Yeshayahu 11:8 —el niño que juega junto al agujero de la víbora— y no de un individuo que aplasta a la serpiente.`,
      `El contenido del versículo, leído así, es un reparto de alcance: el hombre llega a la cabeza; la serpiente solo llega al talón, y solo con una mordida. Eso es exactamente lo que abre este estudio.`,
    ],
    tituloNo: "Lo que este estudio NO dice",
    listaNo: [
      "Que «la simiente de la mujer» sea una persona concreta anunciada aquí. Ninguna de las fuentes citadas lo lee así.",
      "Que el versículo describa una victoria futura de un individuo sobre la serpiente. El Radak lee el cese de la enemistad en clave de Yeshayahu 11:8.",
      "Que el talón sea «Maljut» según el Zohar o el Arizal. No hay tal cita: en el Zohar y en el Tikunei Zohar no aparece עקב junto a מלכות.",
      "Que la ceniza del Zohar salga del talón de Yaakov, ni que el fuego del talón «refinara» el polvo. Ninguna fuente lo dice.",
    ],
    tituloSi: "Lo que SÍ dicen las fuentes",
    listaSi: [
      "Rashi: el verbo שוף significa «triturar, machacar» (יְכַתֶּתְךָ), como en Devarim 9:21.",
      "Ramban: el hombre lleva ventaja — él hiere la cabeza y «aplasta tu cerebro allí»; a ti te queda el talón.",
      "Radak: «no podrás con él sino en su talón, que lo golpearás allí con una mordida» (בִּנְשִׁיכָה).",
      "Mishná Berajot 5:1: aunque la serpiente esté enroscada en el talón, la oración no se interrumpe.",
      "Zohar, Bereshit 18:202: lo que sostiene en ese punto es «la yud de Yaakov».",
    ],
  },

  // ── 3. פרד״ס ─────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `En su capa más simple, Devarim 7:12 es una promesa condicional: si escuchan, guardan y cumplen estas leyes, Dios cumplirá el pacto y la bondad que juró a los padres. La palabra עֵקֶב funciona ahí como «a cambio de», «como consecuencia de» — así la leen el Ramban («como “a causa de”») e Ibn Ezra («la recompensa al final»). El sentido llano ya trae la idea del desenlace: lo que se cobra al final del camino.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión), con la gematría",
        parrafos: [
          `La alusión está en las letras. עֵקֶב suma 172 (ע70 + ק100 + ב2). יַעֲקֹב suma 182 (י10 + ע70 + ק100 + ב2). La diferencia es 10 — el valor de la yud, la letra más pequeña del alefato, un punto que casi no ocupa espacio. Yaakov, escrito y contado, es un talón más una chispa. Es la única aritmética sólida de este estudio: no le atribuimos ningún significado clásico al número 172 por sí solo, porque no lo encontramos, y no lo inventamos.`,
          `(Una observación aritmética, sin fuente clásica que la respalde: 182 = 7 × 26, siete veces el valor del Nombre. La dejamos como curiosidad de cálculo, no como enseñanza recibida.)`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética)",
        parrafos: [
          `Aquí entra el golpe de Rashi y del Tanjuma. Las mitzvot que nos condenan no son las difíciles: son las livianas, las que «el hombre pisotea con sus talones» y «arroja bajo sus talones». Uno se cuida del robo y del asesinato; nadie se cuida del tono con que contesta, del saludo que no devuelve, de la cáscara que deja tirada. Por eso David dice עֲוֺן עֲקֵבַי יְסוּבֵּנִי, «la iniquidad de mis talones me rodea» (Tehilim 49:6): lo que lo cerca no es lo que hizo mirando, es lo que hizo pisando. Y de ahí la regla de Avot 2:1 — cuidar la mitzvá liviana como la grave, porque no sabemos la recompensa de cada una.`,
          `En espíritu jasídico: donde el hombre no mira es donde se decide su vida. La avodá no está en el gesto solemne que uno se prepara, sino en los cientos de gestos automáticos que uno hace sin decidir. El talón es la parte del cuerpo que actúa sin que la mente la acompañe — y por eso es, exactamente, el terreno del trabajo espiritual.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto)",
        parrafos: [
          `El secreto está en la costura que hace el Zohar (Bereshit 18:202). La Mishná manda no interrumpir la oración aunque la serpiente esté en el talón; el Zohar pregunta cómo puede ser, «si de él se dijo: y tú le herirás el talón», y responde nombrando lo que ahí sostiene: הַהִיא אֶבֶן דְּאִיהִי י' דְּיַעֲקֹב, «esa piedra, que es la yud de Yaakov». La diferencia entre un talón que la serpiente domina y un talón que la serpiente no puede detener es esa letra mínima: una chispa que no se ve.`,
          `Y en la noche del vado, esa pelea se vuelve concreta. El acusador no viene por el aire: viene cabalgando sobre el polvo estéril, el que quedó del fuego y jamás da fruto (Zohar, Vayishláj 5:87–88). Es el polvo del enemigo, no el de Yaakov. Y el Talmud dice qué pasó con él: הֶעֱלוּ — «lo elevaron», hasta el Trono de Gloria (Julín 91a). Ese es el giro exacto, y hay que decirlo con las palabras justas: Yaakov no produjo ese polvo, ni lo refinó con su fuego. Lo tomó —lo único que jamás da fruto, aquello sobre lo que cabalgaba su acusador— y lo hizo subir. Mientras dura la noche del exilio, ese polvo manda; cuando amanece, la lucha termina (Zohar, Vayishláj 5:89).`,
        ],
      },
    ],
    caja: {
      titulo: "Levantar lo que pisamos: esa es la pelea.",
      cuerpo:
        "El talón es lo último del cuerpo (Ramban), el único blanco de la serpiente (Radak), lo que pisa las mitzvot livianas sin mirar (Rashi) y el lugar donde la Mishná manda no interrumpir la oración. Yaakov es esa misma palabra más una yud. Y en la noche del vado no fabricó nada: elevó el polvo estéril del acusador hasta el Trono de Gloria (Julín 91a).",
    },
  },

  // ── 4. הִתְבּוֹנְנוּת ─────────────────────────────────────────────────────────
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        texto: `Detente en la palabra «talón». Es la parte de ti que toca el suelo todo el día y que nunca miras. Tu vida tiene una cabeza —lo que decides, lo que planeas, lo que le cuentas a los demás— y tiene un talón: lo que haces en automático, sin pensar, cuando nadie te observa y tú tampoco te observas. La Torá dice que el desenlace está abajo, no arriba.`,
      },
      {
        etiqueta: "¿Qué mitzvot livianas estás pisando sin darte cuenta?",
        texto: `No las que te cuesta cumplir: las que ni siquiera registras como algo que se cumple. El saludo, la paciencia, la basura que recoges, la palabra que te tragas. Rashi no habla de tus grandes caídas; habla de tu andar cotidiano.`,
      },
      {
        etiqueta: "¿Dónde está tu yud?",
        texto: `La diferencia entre un talón vulnerable y un talón que sostiene la oración es una letra que casi no ocupa lugar. Piensa cuál es, en tu vida, esa chispa mínima que no se ve y que sin embargo cambia todo lo demás — y si hoy la estás encendiendo o la estás dejando apagada.`,
      },
      {
        etiqueta: "¿Qué polvo estás cargando que no da fruto?",
        texto: `Hay materia muerta en toda vida: rencores que no germinan, discusiones que no producen nada, horas quemadas. La imagen de la noche del vado no es que ese polvo desaparezca; es que alguien lo hizo subir. La pregunta no es «¿cómo me libro de esto?», sino «¿esto puede subir?».`,
      },
      {
        texto: `Y una última: la lucha duró hasta que subió el alba. No terminó porque Yaakov ganara rápido, sino porque amaneció. Hay peleas que no se ganan antes de tiempo — se sostienen hasta la luz.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה ───────────────────────────────────────────────────────────────
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Recoge hoy una sola mitzvá liviana.",
    texto: `Elige una acción pequeña de esas que pisas sin mirar —devolver un saludo mirando a los ojos, no interrumpir a quien te habla, recoger algo que no ensuciaste tú, contestar sin el tono de siempre— y hazla hoy con la misma seriedad con que harías algo grave. Una sola, elegida a propósito, es más que veinte propósitos vagos: וֶהֱוֵי זָהִיר בְּמִצְוָה קַלָּה כְבַחֲמוּרָה (Avot 2:1). La midá que se trabaja es זְהִירוּת, zehirut: la atención puesta justo donde el pie pisa sin pensar. Y una segunda acción, para la noche: cuando aparezca eso que te muerde el talón —la ansiedad, la ofensa vieja, el pensamiento que te enrosca— no interrumpas lo que estabas haciendo de bueno. Termina la frase, termina la oración, termina el gesto. Esa es la práctica exacta de la Mishná: no soltar por lo que muerde abajo.`,
  },

  // ── 6. חֲתִימָה ───────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `Toda la parashá se juega en un eje: la cabeza y el talón. «La cabeza es el comienzo, y el talón en él es el final y el fin» (Ramban a Devarim 7:12). Y Rashi señala dónde se decide todo: las mitzvot livianas son las que el hombre pisotea con sus talones.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `Ese es justamente el único blanco que le quedó a la serpiente: la cabeza no la alcanza, solo el talón, y solo con una mordida (Ramban y Radak a Bereshit 3:15). Y ahí nace Yaakov, agarrado del talón de Esav (Bereshit 25:26): עֵקֶב 172 más una yud = יַעֲקֹב 182.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `Por eso la Mishná ordena no interrumpir la oración aunque la serpiente esté enroscada en el talón (Berajot 5:1), y el Zohar nombra lo que ahí sostiene: «la yud de Yaakov» (Zohar, Bereshit 18:202). En la noche del vado, el acusador llega cabalgando sobre el polvo que jamás da fruto (Zohar, Vayishláj 5:88) — y Yaakov no lo produjo: lo elevó hasta el Trono de Gloria (Julín 91a).`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Levantar lo que pisamos: esa es la pelea. Elige hoy una mitzvá liviana y trátala como grave; y cuando algo te muerda el talón, no sueltes lo bueno que estabas haciendo.`,
      },
    ],
  },

  // ── NOTA DE AUTOR — lectura propia (NO es fuente) ────────────────────────────
  //  Guardarraíl nº 10 del Sofer: esta lectura NO se pone en boca del Zohar.
  jidush: {
    titulo: "Lectura propia — un jidush de Jashmal",
    rotulo:
      "Esto NO es una cita ni una fuente clásica. El estudio quedó sellado arriba, en la חֲתִימָה. Lo que sigue es una lectura personal, ofrecida como tal — y marcada así justamente porque el Zohar dice otra cosa: para Rabí Shimón el residuo del fuego es lo estéril, lo que jamás da fruto.",
    parrafos: [
      `Aquí propongo una lectura mía. Las fuentes dicen que Yaakov elevó el polvo del acusador; no dicen nada sobre qué le pasa a la tierra de la que estamos hechos cuando atraviesa ese combate. Yo me atrevo a mirarlo así: la tierra de la que estamos hechos, al pasar por el fuego del alma, ya no es la misma.`,
      `El Midrash dice que el ángel hizo brotar fuego de la tierra y que Yaakov contestó «yo soy todo de eso» (Bereshit Rabá 77:2). Esa frase me deja pensando: si el hombre es tierra y a la vez es fuego, entonces la pelea de la noche no ocurre entre dos criaturas, sino entre dos materias dentro de una misma persona. Y algo se transforma en el que sostiene la pelea hasta que amanece.`,
      `Insisto en el rótulo: esto es mío, no del Zohar. Es la lectura la que se ofrece; la fuente queda intacta.`,
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  hemshej: [
    "{{letter:yod|La yud: la letra más pequeña, la chispa que cambia un nombre entero}}",
    "{{study:serpiente-de-cobre|La serpiente que muerde y la serpiente que sana}}",
    "{{study:exilio-redencion|La noche del exilio: por qué la lucha dura «hasta que subió el alba»}}",
    "{{study:ajarit-hayamim|¿Qué amanece cuando termina la noche?}}",
  ],
  ctaRef: "Deuteronomy 7:12",
};
