import type { LetterData } from "./types";

// ─────────────────────────────────────────────────────────────────────────
//  TZADI / TZADIK (צ) — Data de la decimoctava letra. Contenido erudito
//  VERIFICADO por el Sofer (editor-erudito) contra Sefaria e inner.org.
//  Sin placeholders.
//
//  Fuentes verificadas (ver campo `fuentes`):
//   · Shabat 104a — 'צָדִ״י כְּפוּפָה וְצָדִ״י פְּשׁוּטָה — צַדִּיק כָּפוּף, צַדִּיק פָּשׁוּט';
//     'הַיְינוּ נֶאֱמָן כָּפוּף נֶאֱמָן פָּשׁוּט!... מִכָּאן שֶׁנִּתְּנָה הַתּוֹרָה בִּמְנוֹד רֹאשׁ' (con humildad).
//     La serie מנצפ״ך — 'מַנְצְפַךְ צוֹפִים אֲמָרוּם' (los videntes las dijeron) — está en el mismo daf.
//   · Proverbios 10:25 — 'וְצַדִּיק יְסוֹד עוֹלָם' (el justo, fundamento del mundo).
//   · Yoma 38b — R. Yojanán (por R. Jiya bar Aba): 'אֲפִילּוּ בִּשְׁבִיל צַדִּיק אֶחָד הָעוֹלָם
//     מִתְקַיֵּים, שֶׁנֶּאֱמַר וְצַדִּיק יְסוֹד עוֹלָם'.
//   · Chaguigá 12b — R. Elazar ben Shamúa: 'עַל עַמּוּד אֶחָד, וְצַדִּיק שְׁמוֹ' (el mundo sobre un
//     solo pilar, y su nombre es Tzadik), de Proverbios 10:25.
//   · Habacuc 2:4 — 'וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה' (el justo por su fe vivirá).
//   · Makot 24a — 'בָּא חֲבַקּוּק וְהֶעֱמִידָן עַל אַחַת, שֶׁנֶּאֱמַר וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה'
//     (Habacuc redujo las 613 mitzvot a una: la fe del justo).
//   · Génesis 17:17 — Sará 'הֲבַת־תִּשְׁעִים שָׁנָה תֵּלֵד' (a los 90 dará a luz); 18:12 — 'וַתִּצְחַק שָׂרָה'.
//   · Salmos 92:13 — 'צַדִּיק כַּתָּמָר יִפְרָח' (el justo florece como la palmera).
//   · Bereshit Rabá 41:1 — sobre Sal 92:13: la palmera y el cedro 'אֵין בָּהֶם לֹא עִקּוּמִים וְלֹא
//     סִיקוּסִים' (ni torceduras ni nudos); 'מַתַּן שְׂכָרָן שֶׁל צַדִּיקִים רָחוֹק' (su recompensa está lejos).
//   · Sefer Yetzirá 5 — Tzadi es letra SIMPLE (פשוטה); signo דְּלִי (Acuario), mes שְׁבָט (Shevat).
//     Órgano: impresa קֵיבָה (estómago) / Gra קוּרְקְבָן (molleja); facultad: impresa הִרְהוּר / Gra לְעִיטָה.
//   · R. Yitzchak Ginsburgh, inner.org/alefbeit/sigtzadi — Concepto: 'la fe del justo'; Forma:
//     'una yud (vitalidad de la jojmá) encajada en la espalda superior de una nun doblada (el
//     siervo humilde)'; Alma: estómago superior; Sentido: gusto; Arquetipo: Asher; Canal: de
//     guevurá a tiféret.
//
//  Gematrías (calculadas letra por letra, valor estándar):
//    צ = 90 · nombre צַדִּי = 90+4+10 = 104 · nombre pleno צַדִּיק = 90+4+10+100 = 204 = צַדִּיק (la
//    propia palabra 'justo') · מַיִם (agua) = 40+10+40 = 90 · מֶלֶךְ (rey) = 40+30+20 = 90 ·
//    יִצְחָק (Itzjak) = 208 (contiene la צ = 90). Tzadi final (ץ) = 900 en mispar gadol (el más alto).
//
//  NOTA DEL SOFER — precisiones y descartes:
//   1) NOMBRE: la letra se llama a la vez 'tzadi' y 'tzadik'. Ginsburgh titula su tabla "Tzadik
//      (or Tzadi)". La lectura de que se acorta a 'tzadi' por HUMILDAD del justo (que oculta su
//      rectitud) es DRASH — no etimología; la anclo a la propia conclusión de Shabat 104a
//      (la Torá se dio בִּמְנוֹד רֹאשׁ, con la cabeza inclinada = humildad).
//   2) La lectura 'kfufá = este mundo / peshutá (final) = mundo venidero' es interpretación
//      tradicional. Shabat 104a solo IGUALA ambas formas al tzadik/n, no menciona olam hazé/olam
//      habá. Se marca como drash.
//   3) TZADIK = YESOD: es Cabalá estándar (Zóhar/Arizal). No cito folio del Zóhar; lo fundamento
//      en Proverbios 10:25 + Yoma 38b + Chaguigá 12b, que son exactos.
//   4) El canal 'guevurá→tiféret' es del sistema de Ginsburgh para la LETRA; es un lente distinto
//      del arquetipo tzadik=Yesod. Se presentan como dos marcos, sin fundirlos.
//   5) מַיִם=90 y el signo Acuario (el aguador, דלי) es una resonancia hermosa: la gematría es mía
//      (verificada), el vínculo es drash sobre la asignación de Sefer Yetzirá.
// ─────────────────────────────────────────────────────────────────────────

export const tzadi: LetterData = {
  slug: "tzadi",
  letter: "צ",
  nameTranslit: { es: "Tzadi", en: "Tzadi", fa: "صادی" },
  nameHe: "צַדִּי",
  value: 90,

  level1: {
    es: "Esta es la letra del justo — del צַדִּיק, el tzadik. Y lo primero que hay que saber de ella es que se esconde. Mírala: es una nun doblada, encorvada como quien inclina la cabeza, y encima —clavada en su espalda, mirando hacia atrás— una pequeña yud, la chispa de la sabiduría. Un sabio agachado que no deja ver su rostro. Hasta su nombre se oculta: debería llamarse 'tzadik' (justo), pero decimos 'tzadi', como si la letra misma se guardara la última sílaba por pudor. Y sin embargo, cuando esta letra llega al final de una palabra, se yergue del todo: la ץ final se endereza y desciende recta hasta el fondo. La misma letra, doblada aquí y erguida allá. Antes de seguir, quédate con la pregunta que sostiene toda su forma: ¿por qué el justo, en este mundo, anda con la cabeza inclinada?",
    en: "This is the letter of the righteous one — the צַדִּיק, the tzadik. And the first thing to know about it is that it hides. Look: it is a bent nun, stooped like one who bows the head, and above it — wedged into its back, facing backward — a small yud, the spark of wisdom. A sage crouched low who will not show his face. Even its name conceals itself: it ought to be called 'tzadik' (righteous one), but we say 'tzadi', as though the letter withheld its last syllable out of modesty. And yet, when this letter comes at the end of a word, it stands fully upright: the final ץ straightens and drops straight down to the depths. The same letter — bent here, upright there. Before going on, hold the question its whole form rests on: why does the righteous one, in this world, walk with a lowered head?",
  },

  // ── Sección A — NOMBRE ──────────────────────────────────────────────
  name: {
    raicesYsignificado: {
      es: "צַדִּי (tzadi) es la letra del צַדִּיק (tzadik), 'el justo, el recto'. La raíz es צ-ד-ק, la de צֶדֶק (tzédek, justicia) y צְדָקָה (tzedaká, la caridad que es un acto de justicia, no de lástima). Rav Ginsburgh resume el concepto de la letra en tres palabras: 'la fe del justo' (inner.org). No es casual: el versículo que define al tzadik en todo el Tanaj —'וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה', el justo por su fe vivirá (Habacuc 2:4)— es el mismo que, según Makot 24a, Habacuc usó para 'sostener sobre una sola' las 613 mitzvot. Todo el peso de la Torá descansa, al final, sobre la fe del hombre recto.\n\nHay aquí una honestidad que hay que cuidar. El nombre de la letra vacila entre 'tzadi' y 'tzadik' —Ginsburgh mismo la titula 'Tzadik (o Tzadi)'—. Y la enseñanza tradicional lee esa vacilación como la firma de la letra: decimos 'tzadi', tragándonos la kuf final, porque el justo esconde su propia rectitud. No es etimología; es drash. Pero es un drash con raíz firme, porque el Talmud mismo, al hablar de esta forma, concluye que la Torá se dio בִּמְנוֹד רֹאשׁ, 'con la cabeza inclinada' (Shabat 104a): la humildad no es un adorno del justo, es su postura. El nombre completo, además, guarda un secreto de número: צַדִּיק = 204, exactamente la palabra צַדִּיק. La letra, dicha entera, ES lo que nombra.",
    },
    mundos: {
      es: "En los mundos (עוֹלָמוֹת), el tzadik es la columna que sostiene lo creado. Enseña R. Elazar ben Shamúa que el mundo entero descansa 'sobre un solo pilar, y su nombre es Tzadik', citando 'וְצַדִּיק יְסוֹד עוֹלָם' (Chaguigá 12b, de Proverbios 10:25). Y R. Yojanán: 'aunque sea por un solo justo, el mundo se mantiene' (Yoma 38b). Piénsalo literalmente: la existencia no se sostiene por su masa ni por su fuerza, sino por la presencia oculta de unos pocos rectos. El justo es yesod olam — cimiento, y por eso enterrado, invisible, bajo todo el peso que carga.",
    },
    almas: {
      es: "En el alma (נְשָׁמוֹת), la tzadi es tu capacidad de hacer lo correcto sin que nadie te vea hacerlo. El tzadik no es el que nunca cae —eso sería la nun erguida, el fiel sin fisura—; es el que se dobla y sigue de pie. Su virtud es la fe: 'el justo por su fe vivirá' (Habacuc 2:4). Fe no es certeza; es seguir sembrando cuando la cosecha está lejos —'la recompensa de los justos está lejos', dice el Midrash de la palmera (Bereshit Rabá 41:1)—. La pregunta del alma-tzadi no es '¿soy bueno?', sino '¿sigo siendo recto cuando ser recto no rinde todavía?'.",
    },
    divinidad: {
      es: "En lo divino (אֱלֹהוּת), el tzadik es la sefirá יְסוֹד (Yesod): el canal por el que toda la abundancia de las sefirot superiores se recoge y se entrega al mundo (Maljut). Por eso 'צַדִּיק יְסוֹד עוֹלָם' se lee en la Cabalá no solo como 'el justo es cimiento del mundo', sino como 'el Justo ES Yesod-Olam' —el nombre de la sefirá—. El justo humano refleja abajo lo que Yesod hace arriba: no genera la luz, la canaliza; no la retiene, la transmite entera. Su humildad —la cabeza inclinada de la letra— es exactamente eso: un conducto no guarda para sí lo que pasa por él.",
    },
  },

  // ── Sección B — FORMA ───────────────────────────────────────────────
  form: {
    descripcion: {
      es: "Rav Ginsburgh describe la forma con precisión quirúrgica: la tzadi es 'una yud —la vitalidad de la jojmá (sabiduría)— encajada en la espalda superior de una nun doblada —el siervo humilde—' (inner.org). Dos figuras en una: abajo, el cuerpo encorvado de la nun, el nefesh que se inclina; arriba y atrás, la yud, la chispa de conciencia. Y aquí está el detalle que lo dice todo: la yud mira hacia atrás. El destello de sabiduría no va por delante, exhibiéndose; va montado en la espalda, escondido, mirando en dirección contraria. Así anda el justo en este mundo.\n\nLa forma tiene además dos estados. La tzadi ordinaria (צ) va doblada; la tzadi FINAL (ץ), la que cierra las palabras, se yergue y su pie desciende recto hasta abajo. El Talmud junta las dos: 'la tzadi doblada y la tzadi recta — el tzadik doblado, el tzadik recto' (Shabat 104a). La lectura clásica (drash) las reparte entre dos tiempos: doblado en este mundo, donde el justo se oculta; erguido en el mundo venidero, donde por fin se revela de pie.",
    },
    partes: [
      {
        label: { es: "La nun doblada (el siervo humilde)", en: "The bent nun (the humble servant)", fa: "نون خمیده" },
        significado: {
          es: "El cuerpo encorvado de la letra: una nun (la נֶאֱמָן, el alma fiel) inclinada bajo un peso. Es la postura del tzadik en este mundo — la cabeza baja, בִּמְנוֹד רֹאשׁ (Shabat 104a). No está vencido: está sirviendo. La nun doblada carga; no exhibe. Ginsburgh la llama 'el siervo humilde'.",
        },
        svgPathId: "tzadi-nun",
      },
      {
        label: { es: "La yud en la espalda (la sabiduría oculta)", en: "The yud on the back (hidden wisdom)", fa: "یود پنهان" },
        significado: {
          es: "La pequeña yud clavada en el hombro de la nun, mirando hacia atrás. Es la vitalidad de la jojmá —la chispa de sabiduría— pero montada de espaldas: el justo lleva su luz escondida, no de frente. Que la yud (10, el punto de la sabiduría) vaya detrás y no delante es la forma misma de la humildad: sabe, y no lo enseña.",
        },
        svgPathId: "tzadi-yud",
      },
      {
        label: { es: "El pie: doblado ahora, recto después", en: "The foot: bent now, straight later", fa: "پای حرف" },
        significado: {
          es: "La base de la letra. En la tzadi ordinaria (צ) el pie se recoge doblado; en la tzadi final (ץ) se endereza y baja recto hasta el fondo. Es el mismo justo en dos tiempos: encorvado en este mundo (צ), erguido y revelado en el venidero (ץ). 'Tzadik kafuf, tzadik pashut' — el justo doblado y el justo recto (Shabat 104a).",
        },
        svgPathId: "tzadi-base",
      },
    ],
    mundos: {
      es: "En los mundos, la forma enseña que lo que sostiene la creación va agachado. El pilar del mundo se llama Tzadik (Chaguigá 12b) y sin embargo es cimiento — la parte de la casa que nadie ve porque está debajo cargando todo. La nun doblada de la letra es esa espalda del mundo: la fuerza que sostiene tiene forma de inclinación, no de trono.",
    },
    almas: {
      es: "En el alma, tú eres las dos tzadis. Seis días de la semana, en el trabajo del mundo, andas doblado como la צ: haces lo recto sin cobrar por ello, con la yud de tu entendimiento montada en la espalda, sin exhibirla. Y hay un endereza­miento que te espera —la ץ final— cuando lo que hiciste en secreto se ponga de pie. El Midrash lo dice de la palmera: 'su recompensa está lejos' (Bereshit Rabá 41:1). Recto, pero paciente.",
    },
    divinidad: {
      es: "En lo divino, la yud oculta en la espalda de la nun es la sabiduría de arriba (jojmá) que desciende hasta el siervo (Yesod) para entregarse al mundo. Ginsburgh asigna a la letra el canal que va de גְּבוּרָה (guevurá, el rigor) a תִּפְאֶרֶת (tiféret, la armonía): el justo toma el juicio severo y lo transforma en belleza equilibrada. La cabeza inclinada no es debilidad divina: es la contracción exacta que permite que la luz infinita quepa en un mundo finito.",
    },
  },

  // ── Sección C — NÚMERO ──────────────────────────────────────────────
  number: {
    valor: 90,
    guematriaForma: {
      es: "צ = 90 · nombre צַדִּי = 90+4+10 = 104 · nombre pleno צַדִּיק = 90+4+10+100 = 204 = צַדִּיק (la propia palabra 'justo') · מַיִם (agua) = 90 · מֶלֶךְ (rey) = 90 · tzadi final ץ = 900 (el más alto de los valores finales)",
    },
    mundos: {
      es: "90 es מַיִם (agua): 40+10+40 = 90. Y no por azar la letra 90 gobierna, según Sefer Yetzirá, el signo de דְּלִי (Acuario), el aguador — el que vierte el agua desde lo alto. El mes que le toca es שְׁבָט (Shevat), corazón del invierno, cuando el árbol está pelado y sin embargo la savia ya sube en secreto (por eso Tu BiShvat, el año nuevo de los árboles). El justo es agua: desciende, riega, y hace fructificar lo que parecía muerto. (La gematría מים=90 es cálculo verificado; el enlace con Acuario es drash sobre Sefer Yetzirá.)",
    },
    almas: {
      es: "90 es también la edad del milagro. Sará concibe a Itzjak 'הֲבַת־תִּשְׁעִים שָׁנָה', 'a los noventa años' (Génesis 17:17) — y de esa risa imposible nace יִצְחָק (Itzjak, 'reirá'), cuyo nombre lleva dentro la צ (=90). El número del justo es el número de lo que da fruto cuando ya no debería: la fe que sigue sembrando pasada toda razón. Contémplalo en ti: lo recto que haces hoy sin ver recompensa es una Sará de noventa años — tardío y fértil.",
    },
    divinidad: {
      es: "El nombre pleno de la letra, צַדִּיק, suma 204 — exactamente la palabra צַדִּיק. La letra, pronunciada entera, es idéntica a aquello que nombra: no hay distancia entre el justo y su justicia. Y cuando la tzadi cierra una palabra, su forma final ץ vale 900 en el mispar gadol — el más alto de los cinco valores finales. Es el secreto de las dos formas: el justo doblado (צ, 90) que se oculta ahora, y el justo erguido (ץ, 900) que en el fin de los tiempos se revela en su plenitud. El mismo número, elevado diez veces cuando por fin se pone de pie.",
    },
  },

  // ── Conexiones (senderos al Universo) ───────────────────────────────
  conexiones: {
    tanaj: [
      {
        titulo: { es: "El justo, cimiento del mundo" },
        fuente: {
          es: "Proverbios 10:25 — 'כַּעֲבוֹר סוּפָה וְאֵין רָשָׁע, וְצַדִּיק יְסוֹד עוֹלָם': pasa la tormenta y el malvado ya no está, pero el justo es cimiento eterno. EL versículo del tzadik en todo el Tanaj — y la raíz de la identificación cabalística tzadik = Yesod.",
        },
        href: "/arbol",
      },
      {
        titulo: { es: "El justo por su fe vivirá" },
        fuente: {
          es: "Habacuc 2:4 — 'וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה'. El concepto que Ginsburgh da a la letra ('la fe del justo') sale de aquí. Cf. Makot 24a: Habacuc 'sostuvo las 613 sobre una sola' con este verso.",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Sará a los noventa: el fruto imposible" },
        fuente: {
          es: "Génesis 17:17 — '…וְאִם־שָׂרָה הֲבַת־תִּשְׁעִים שָׁנָה תֵּלֵד': Sará da a luz a los 90 (= צ). De su risa nace יִצְחָק (Génesis 18:12: 'וַתִּצְחַק שָׂרָה'), cuyo nombre lleva la צ. (El puente 90↔tzadi es lectura nuestra; los versículos son exactos.)",
        },
        href: "/mente-cosmica",
      },
    ],
    talmud: [
      {
        titulo: { es: "La tzadi doblada y la tzadi recta: el justo de los dos mundos" },
        fuente: {
          es: "Shabat 104a — 'צָדִ״י כְּפוּפָה וְצָדִ״י פְּשׁוּטָה — צַדִּיק כָּפוּף, צַדִּיק פָּשׁוּט'; y '…מִכָּאן שֶׁנִּתְּנָה הַתּוֹרָה בִּמְנוֹד רֹאשׁ' (la Torá se dio con la cabeza inclinada = humildad). En el mismo daf: 'מַנְצְפַךְ צוֹפִים אֲמָרוּם' — las letras finales las transmitieron los videntes. (La partición 'doblado=este mundo / recto=mundo venidero' es drash clásico, no literal en la guemará.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "Por un solo justo se sostiene el mundo" },
        fuente: {
          es: "Yoma 38b — R. Jiya bar Aba en nombre de R. Yojanán: 'אֲפִילּוּ בִּשְׁבִיל צַדִּיק אֶחָד הָעוֹלָם מִתְקַיֵּים, שֶׁנֶּאֱמַר וְצַדִּיק יְסוֹד עוֹלָם' (Proverbios 10:25).",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El mundo sobre un pilar, y su nombre es Tzadik" },
        fuente: {
          es: "Chaguigá 12b — R. Elazar ben Shamúa: 'עַל עַמּוּד אֶחָד, וְצַדִּיק שְׁמוֹ, שֶׁנֶּאֱמַר וְצַדִּיק יְסוֹד עוֹלָם'. El único pilar que sostiene la creación tiene nombre propio: Tzadik.",
        },
        href: "/arbol",
      },
    ],
    midrash: [
      {
        titulo: { es: "El justo como la palmera: sin torceduras, la recompensa lejos" },
        fuente: {
          es: "Bereshit Rabá 41:1 (sobre Salmos 92:13, 'צַדִּיק כַּתָּמָר יִפְרָח') — como la palmera y el cedro 'no tienen torceduras ni nudos' (אֵין בָּהֶם לֹא עִקּוּמִים וְלֹא סִיקוּסִים), así los justos son rectos; y como su sombra está lejos, 'מַתַּן שְׂכָרָן שֶׁל צַדִּיקִים רָחוֹק' — la recompensa del justo está lejos. La rectitud (la tzadi peshutá) que espera.",
        },
        href: "/mente-cosmica",
      },
    ],
    cabala: [
      {
        titulo: { es: "Tzadi: letra simple — Acuario, Shevat, el estómago" },
        fuente: {
          es: "Sefer Yetzirá 5:2 — 'הִמְלִיךְ אוֹת צ׳… וְצָר בּוֹ דְּלִי בָּעוֹלָם וּשְׁבָט בַּשָּׁנָה וְקֵיבָה בַּנֶּפֶשׁ': Tzadi es una de las doce letras SIMPLES; le corresponden Acuario (דלי), el mes de Shevat y el estómago. (Divergencia de recensiones: la impresa da órgano קֵיבָה / facultad הרהור; la versión del Gra da קורקבן / לעיטה. Ginsburgh armoniza: 'estómago superior', sentido del gusto.)",
        },
        href: "/mente-cosmica",
      },
      {
        titulo: { es: "El justo es Yesod: el nombre pleno vale 204 = צַדִּיק" },
        fuente: {
          es: "Cabalá clásica (Zóhar/Arizal), fundada en Proverbios 10:25: el tzadik es la sefirá יְסוֹד, el canal que entrega la abundancia a Maljut. Gematría calculada: nombre pleno צַדִּיק = 90+4+10+100 = 204 = la palabra צַדִּיק misma; y la letra 90 = מַיִם (agua), que Yesod hace fluir.",
        },
        href: "/arbol",
      },
    ],
    jasidut: [
      {
        titulo: { es: "La fe del justo: la yud oculta en la espalda" },
        fuente: {
          es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/alefbeit/sigtzadi) — Concepto: 'la fe del justo'. Forma: 'una yud (la vitalidad de la jojmá) encajada en la espalda superior de una nun doblada (el siervo humilde)'. Canal de conciencia: de guevurá a tiféret; arquetipo: la tribu de Asher.",
        },
        href: "/mente-cosmica",
      },
    ],
  },

  fuentes: [
    { es: "Proverbios 10:25 — 'וְצַדִּיק יְסוֹד עוֹלָם': el justo, cimiento del mundo (raíz de tzadik = Yesod)." },
    { es: "Habacuc 2:4 — 'וְצַדִּיק בֶּאֱמוּנָתוֹ יִחְיֶה'; cf. Makot 24a (Habacuc redujo las 613 mitzvot a esta)." },
    { es: "Salmos 92:13 — 'צַדִּיק כַּתָּמָר יִפְרָח': el justo florece como la palmera." },
    { es: "Génesis 17:17 (Sará a los 90 dará a luz) y 18:12 ('וַתִּצְחַק שָׂרָה'); de su risa nace יִצְחָק." },
    { es: "Shabat 104a — 'צָדִ״י כְּפוּפָה וְצָדִ״י פְּשׁוּטָה — צַדִּיק כָּפוּף, צַדִּיק פָּשׁוּט'; 'בִּמְנוֹד רֹאשׁ' (humildad); 'מַנְצְפַךְ צוֹפִים אֲמָרוּם'." },
    { es: "Yoma 38b — R. Yojanán: 'אֲפִילּוּ בִּשְׁבִיל צַדִּיק אֶחָד הָעוֹלָם מִתְקַיֵּים' (de Proverbios 10:25)." },
    { es: "Chaguigá 12b — R. Elazar ben Shamúa: 'עַל עַמּוּד אֶחָד, וְצַדִּיק שְׁמוֹ' (el mundo sobre un pilar llamado Tzadik)." },
    { es: "Bereshit Rabá 41:1 — sobre Sal 92:13: 'אֵין בָּהֶם לֹא עִקּוּמִים וְלֹא סִיקוּסִים'; 'מַתַּן שְׂכָרָן שֶׁל צַדִּיקִים רָחוֹק'." },
    { es: "Sefer Yetzirá 5 — Tzadi, letra simple: Acuario (דלי) · Shevat · estómago (impresa קֵיבָה / Gra קורקבן; facultad הרהור / לעיטה)." },
    { es: "R. Yitzchak Ginsburgh, 'The Hebrew Letters' (inner.org/alefbeit/sigtzadi) — 'la fe del justo'; yud en la espalda de la nun doblada; canal guevurá→tiféret; arquetipo Asher; sentido del gusto." },
    { es: "Gematrías calculadas: צ = 90 · צַדִּי = 104 · צַדִּיק = 204 (= la palabra 'justo') · מַיִם = 90 · מֶלֶךְ = 90 · ץ final = 900 (mispar gadol)." },
    { es: "Nota de precisión: el nombre 'tzadi' (vs. 'tzadik'), la lectura por humildad, y la partición doblado/erguido = este mundo/mundo venidero son DRASH — no cita literal. El tzadik = Yesod es Cabalá estándar, aquí anclada en versículos y guemarás exactos, sin folio del Zóhar." },
  ],
};
