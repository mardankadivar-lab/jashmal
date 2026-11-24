import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — קָטֹנְתִּי · Me he vuelto pequeño
//  La pequeñez como MEDICIÓN: cuánto mide una conciencia puesta frente a lo
//  que no tiene medida. Encargo de Mardan del 24-nov-2026.
//
//  CONTENIDO ESCRITO Y VERIFICADO POR EL SOFER (editor-erudito).
//  Fuente de montaje: ~/jashmal-produccion/katonti/KATONTI.md (líneas 1-670).
//  Todo lo que en ese archivo va DESPUÉS de la línea 672 —la «SECCIÓN DE
//  TRABAJO — NO PUBLICAR»— no se montó y no aparece aquí.
//
//  COMPROBADO POR SEPARADO antes de montar, sin mirar los scripts del Sofer:
//   · el verbo ק־ט־נ se conjuga 4 veces en todo el Tanaj sobre el corpus
//     congelado de Open Scriptures (Códice de Leningrado), por lema 6994 y por
//     morfología: Gen 32:11 (Vqp1cs, única primera persona), 2Sam 7:19 y
//     1Chr 17:17 (Vqw3fs, sujeto זֹאת), Amós 8:5 (Vhc, hifil). Control por
//     grafía sin puntos vocálicos: la secuencia קטנתי aparece 1 vez, Gen 32:11.
//     Las dos cuentas coinciden.
//   · las citas nuevas, cotejadas contra Sefaria letra por letra:
//     Jullín 89a (אתם ממעטין עצמכם לפני · גדול שנאמר במשה ואהרן ·
//     מי שמשים עצמו כמי שאינו), Jullín 88b (אפר פרה), Sotá 5b
//     (אין תפלתו נמאסת), Shabat 32a (לעולם אל יעמוד אדם + קטנתי).
//   · el versículo que Jullín 89a pone en boca de David es Salmos 22:7
//     («gusano y no hombre»), NO Shmuel II 7:18. Comprobado sobre el daf.
//
//  NO SE TOCA AL EDITAR:
//   1. Yaakov NO deja de temer por decir katonti. La carta del Tania dice que
//      con esa palabra JUSTIFICÓ su temor, y Gn 32:12 lo escribe.
//   2. El hueco se publica sin cerrar: el Talmud nombra a Avraham, Moshé,
//      Aharón y David, y NO nombra a Yaakov. No hay fuente que lo añada.
//   3. La derashá del Zohar sobre los años de Sará va CON su matiz: la
//      concordancia singular/plural es la normal del hebreo bíblico. La ley de
//      proporción inversa no necesita ese apoyo y se sostiene sin él.
//   4. Shabat 32a y Sotá 5b van JUNTOS. El estudio dice que recibir consume
//      mérito; quitar el contrapeso («el saldo vacío es la ofrenda») deja una
//      enseñanza que un lector en mal momento puede leer al revés.
//   5. Juntar las cuatro conjugaciones en una sola enseñanza es lectura de
//      Jashmal, y va firmada como tal. El dato de las cuatro es comprobado.
//
//  VOZ (regla de Mardan del 24-nov-2026, ver CLAUDE.md): sin su nombre, sin
//  rótulos de grado, todo el hebreo con su traducción pegada, prosa corrida.
//
//  Farsi e inglés: omitidos a propósito, como en los demás estudios recientes.
//  Los campos …Fa del hero llevan el español de respaldo; en el catálogo van
//  vacíos para que tri() marque la traducción como pendiente.
// ════════════════════════════════════════════════════════════════════════════

const TITULO = "Me he vuelto pequeño";
const SERIE = "Misterios · la pequeñez como medición";
const GANCHO =
  "En toda la Biblia hebrea, el verbo «hacerse pequeño» se conjuga cuatro veces. Una sola vez lo dice un hombre de sí mismo, y es Yaakov en la orilla del río. Las otras tres no hablan de ningún hombre: dos dicen que lo que Dios regaló era poca cosa a los ojos de Dios, y la cuarta describe a un comerciante que achica la medida para robar. Entre esas cuatro conjugaciones cabe toda la pregunta de cuánto mide un hombre cuando se pone frente a lo que no tiene medida.";

export const data: EstudioData = {
  slug: "katonti",

  hero: {
    serielabel: SERIE,
    serielabelFa: SERIE,
    he: "קָטֹנְתִּי",
    titulo: TITULO,
    tituloFa: TITULO,
    ganchoEs: GANCHO,
    ganchoFa: GANCHO,
    numero: {
      valor: "4",
      rom: "las veces que el Tanaj conjuga «hacerse pequeño» · una sola en primera persona",
    },
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── Preludio — la pregunta que abre ──────────────────────────────────────
  preludio: [
    { head: "La pregunta que abre el estudio" },
    {
      p: `Hay una pregunta que todo el mundo se hace tarde o temprano y casi nadie formula en voz alta, porque suena a falsa modestia o a crisis: ¿cuánto mido yo, de verdad? No frente a mi vecino, ni frente a mi hermano, ni frente al que tiene más que yo. Frente a lo que no tiene medida.`,
    },
    {
      p: `La respuesta cómoda es que la pregunta no se puede contestar, que lo infinito no se mide y que por tanto cualquier cifra es arbitraria. La respuesta de la tradición judía es otra, y es más incómoda: sí se puede, y se ha hecho. Hay un puñado de hombres en la Biblia hebrea que se pusieron frente a lo Infinito y dijeron en voz alta el resultado de la medición. Y lo extraordinario es que el Talmud no trata esas frases como arrebatos de piedad: las pone una al lado de la otra, las compara, y dictamina cuál es la más grande.`,
    },
    {
      p: `Lo que sigue no trata de la humildad como virtud. Trata de la pequeñez como medición: qué instrumento se usa, en qué dirección se lee, cuánto cuesta acercarse al punto donde se mide, y por qué la escala sale al revés de lo que cualquiera esperaría.`,
    },
    {
      p: `Todo arranca de una palabra, קָטֹנְתִּי (katonti), «me he vuelto pequeño», que Yaakov pronuncia una sola vez en su vida. En {{study:porcion-de-esav|El hermano que tomó ocho veces}} esa palabra se leyó dentro de su biografía: «el pequeño» había sido durante tres capítulos la etiqueta que otros le ponían mientras él tomaba lo de su hermano, y al llegar al río, por primera vez, la dice él. Aquí la palabra se saca de su parashá y se pone a medir contra todo el resto de la Biblia hebrea.`,
    },
  ],

  // ── 1. תַּרְגּוּם — Traducción ────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "La oración de la noche anterior — Génesis 32:11",
        he: "קָטֹ֜נְתִּי מִכֹּ֤ל הַחֲסָדִים֙ וּמִכׇּל־הָ֣אֱמֶ֔ת אֲשֶׁ֥ר עָשִׂ֖יתָ אֶת־עַבְדֶּ֑ךָ כִּ֣י בְמַקְלִ֗י עָבַ֙רְתִּי֙ אֶת־הַיַּרְדֵּ֣ן הַזֶּ֔ה וְעַתָּ֥ה הָיִ֖יתִי לִשְׁנֵ֥י מַחֲנֽוֹת׃",
        es: "Me he vuelto pequeño ante todas las bondades y toda la verdad que has hecho con tu siervo, porque con mi bastón crucé este Jordán y ahora he llegado a ser dos campamentos.",
        source: "Génesis 32:11",
      },
    ],
    parrafos: [],
    bloques: [
      {
        p: `El versículo está en la oración que Yaakov reza la noche antes de cruzar el vado del Yaboc, cuando sabe que su hermano viene al encuentro con cuatrocientos hombres.`,
      },
      {
        p: `Conviene detenerse en la forma de la frase antes que en su contenido, porque la forma es el hallazgo. Yaakov no dice «soy pequeño». No dice «yo, que soy poca cosa». No usa un pronombre y un adjetivo, que es como se dice eso en hebreo y en español. Usa un verbo, y lo conjuga en primera persona. קָטֹנְתִּי es una sola palabra que contiene el sujeto, la acción y el tiempo: me he vuelto pequeño, en perfecto, como quien informa de algo que ya ocurrió y está consumado.`,
      },
      {
        p: `Y hay una segunda cosa en el versículo que casi nadie lee despacio. Yaakov explica su medición con una cuenta, y la cuenta va hacia arriba: salí con un bastón, hoy tengo dos campamentos. Es decir: enumera todo lo que le ha ido bien, y de esa lista de éxitos concluye que se ha vuelto pequeño. La medición no se dispara por una desgracia. Se dispara por la abundancia.`,
      },
      {
        nota: `En la numeración masorética este versículo es 32:11; las biblias cristianas lo numeran 32:10.`,
      },
    ],
  },

  // ── 2 y 3 — tras la traducción ───────────────────────────────────────────
  trasTargum: [
    {
      he: "אַרְבַּע פְּעָמִים",
      title: "Las cuatro veces",
      bloques: [
        {
          p: `Aquí es donde el estudio deja de ser una lectura y se convierte en un dato.`,
        },
        {
          p: `La raíz hebrea ק־ט־נ, que es la raíz de «pequeño», aparece ciento siete veces en la Biblia hebrea. Pero casi siempre aparece como adjetivo: el hijo pequeño, el dedo pequeño, el más pequeño de los pueblos. Como verbo —es decir, como algo que a alguien le pasa, y no como una etiqueta que alguien lleva— aparece exactamente cuatro veces en toda la Biblia hebrea. Ni una más.`,
        },
        {
          p: `La cifra no es una impresión: está contada sobre el texto del Códice de Leningrado, palabra por palabra, buscando el verbo por su raíz y por su forma gramatical y no por cómo se escribe. Las cuatro veces son estas, y leídas juntas dicen algo que ninguna dice por separado.`,
        },
        {
          p: `La primera es la de Yaakov, y es la única en toda la Biblia hebrea en que un ser humano pone el verbo en primera persona. קָטֹנְתִּי, «me he vuelto pequeño». Un hombre se mide y dice la cifra.`,
        },
        {
          p: `La segunda y la tercera están en boca de David, y son el mismo momento contado dos veces, en el libro de Samuel y en el de Crónicas. David acaba de recibir la promesa de que su casa reinará para siempre, entra, se sienta delante de Dios, y dice:`,
        },
        {
          cita: {
            label: "La misma palabra, con otro sujeto — Samuel II 7:19",
            he: "וַתִּקְטַן֩ ע֨וֹד זֹ֤את בְּעֵינֶ֙יךָ֙ אֲדֹנָ֣י יֱהֹוִ֔ה וַתְּדַבֵּ֛ר גַּ֥ם אֶל־בֵּֽית־עַבְדְּךָ֖ לְמֵֽרָח֑וֹק",
            es: "Y aun esto fue poca cosa a tus ojos, mi Señor, Eterno, y has hablado también de la casa de tu siervo para un futuro lejano.",
            source: "Samuel II 7:19",
          },
        },
        {
          p: `Hay que ver bien lo que acaba de pasar aquí, porque es el giro del estudio. David conjuga el mismo verbo que Yaakov. Pero el sujeto no es David: el sujeto es זֹאת (zot), «esto» —el reino entero que acaba de recibir—. Y el lugar de la medición tampoco es el suyo: es בְּעֵינֶיךָ (be-eineija), «a tus ojos». David no dice «yo me he vuelto pequeño». Dice: lo que me diste, que a mí me desborda, es poca cosa en la escala en que Tú mides. Es la misma medición que la de Yaakov, tomada desde el otro extremo del instrumento.`,
        },
        {
          p: `Y no es casual que un versículo antes David haya dicho מִי אָנֹכִי (mi anoji), «¿quién soy yo?». El Radak, comentando esta misma frase, une las dos: explica que cuando David dice que lo prometido corresponde a «la medida del hombre grande, y no de un hombre bajo y despreciable como yo», está repitiendo lo que ya había dicho con «¿quién soy yo y quién es mi casa?». Las dos mitades de la medición —lo pequeño que soy yo, lo pequeño que es tu regalo a tus propios ojos— son, para el Radak, una sola frase partida en dos versículos.`,
        },
        {
          p: `La cuarta vez está en Amós, y es la que nadie espera. El profeta describe a los comerciantes que esperan impacientes que termine la fiesta para volver a vender:`,
        },
        {
          cita: {
            label: "El mismo verbo, puesto a robar — Amós 8:5",
            he: "לְהַקְטִ֤ין אֵיפָה֙ וּלְהַגְדִּ֣יל שֶׁ֔קֶל וּלְעַוֵּ֖ת מֹאזְנֵ֥י מִרְמָֽה׃",
            es: "Para achicar la medida y agrandar el peso, y torcer las balanzas con engaño.",
            source: "Amós 8:5",
          },
        },
        {
          p: `Es el mismo verbo. Aquí está en la forma causativa —no «hacerse pequeño» sino «hacer pequeño a otro»— y lo que se achica es la efá, el recipiente con el que se mide el grano que se vende. El comerciante encoge la medida y agranda el peso para que el cliente reciba menos y pague más.`,
        },
        {
          p: `Así que la Biblia hebrea conjuga «hacerse pequeño» cuatro veces, y las cuatro caen en tres lugares distintos de un solo asunto: un hombre que se achica a sí mismo, un rey que descubre que el regalo era poca cosa en la escala del que lo dio, y un estafador que achica el instrumento de medir.`,
        },
        {
          nota: `Juntar esas cuatro apariciones en una sola enseñanza es lectura de Jashmal y no de ninguna fuente clásica: las fuentes nunca las leen una contra otra, y los pasajes de Amós pertenecen a dos profecías distintas. Pero las cuatro apariciones son un dato comprobado, y de ese dato sale una frase que vale la pena guardar: la pequeñez es una virtud cuando uno se la aplica a sí mismo, y es un robo cuando se la aplica a la medida. Lo que no se puede encoger es el instrumento.`,
        },
        {
          p: `Y queda todavía una pieza fina, que tampoco es una impresión. Amós es, de los profetas, el que más habla de la pequeñez de Yaakov: dos veces intercede por él con las mismas palabras, מִי יָקוּם יַעֲקֹב כִּי קָטֹן הוּא (mi yakum Yaakov ki katón hu), «¿quién levantará a Yaakov, pues es pequeño?». Pero fíjese bien: ahí Amós usa el adjetivo, y en tercera persona. Dice de Yaakov que es pequeño. Yaakov había dicho de sí mismo que se volvió pequeño. Ni el profeta que lo defiende consigue decirlo como lo dijo él.`,
        },
      ],
    },

    {
      he: "הַסֻּלָּם",
      title: "La escala, y quién la ordenó",
      bloques: [
        {
          p: `Si la pequeñez es una medición, lo lógico sería preguntar si hay varias mediciones y si se pueden comparar. La respuesta es que sí, y que la comparación no la hace la divulgación moderna: la hace el Talmud, en un solo pasaje, y además la puntúa.`,
        },
        {
          p: `Está en el tratado de Jullín, folio 89a. Arranca de un versículo del Deuteronomio que siempre ha incomodado a los lectores, porque parece quitarle importancia a la elección de Israel:`,
        },
        {
          cita: {
            label: "El versículo incómodo — Deuteronomio 7:7",
            he: "לֹ֣א מֵֽרֻבְּכֶ֞ם מִכׇּל־הָֽעַמִּ֗ים חָשַׁ֧ק יְהֹוָ֛ה בָּכֶ֖ם וַיִּבְחַ֣ר בָּכֶ֑ם כִּֽי־אַתֶּ֥ם הַמְעַ֖ט מִכׇּל־הָעַמִּֽים׃",
            es: "No porque fueran ustedes más numerosos que todos los pueblos los deseó el Eterno y los eligió, pues ustedes son los menos de todos los pueblos.",
            source: "Deuteronomio 7:7",
          },
        },
        {
          p: `El Talmud no lee eso como una rebaja. Lo lee como una explicación, y le da la vuelta entera:`,
        },
        {
          cita: {
            label: "La razón, dicha en boca del Cielo — Jullín 89a",
            he: "אָמַר לָהֶם הַקָּדוֹשׁ בָּרוּךְ הוּא לְיִשְׂרָאֵל: חוֹשְׁקַנִי בָּכֶם, שֶׁאֲפִילּוּ בְּשָׁעָה שֶׁאֲנִי מַשְׁפִּיעַ לָכֶם גְּדוּלָּה — אַתֶּם מְמַעֲטִין עַצְמְכֶם לְפָנַי.",
            es: "Dijo el Santo, bendito sea, a Israel: los deseo a ustedes porque incluso en el momento en que les derramo grandeza, ustedes se hacen pequeños delante de Mí.",
            source: "Talmud Bavlí, Jullín 89a",
          },
        },
        {
          p: `Léalo dos veces, porque lo que dice no es lo que se suele predicar. No dice que la humildad sea la consecuencia de haber sido amado. Dice que es la razón por la que se es amado. Y precisa el momento exacto en que esa pequeñez cuenta: no cuando a uno le va mal, que es cuando cualquiera se siente pequeño, sino בְּשָׁעָה שֶׁאֲנִי מַשְׁפִּיעַ לָכֶם גְּדוּלָּה, «en el momento en que les derramo grandeza». La pequeñez que vale es la que se dice con las manos llenas. Que es exactamente lo que hace Yaakov: él se mide pequeño mientras cuenta sus dos campamentos.`,
        },
        {
          p: `Y entonces el Talmud hace lo que ninguna divulgación hace: nombra a los que lo dijeron y cita sus palabras.`,
        },
        {
          cita: {
            label: "Los tres que se midieron — Jullín 89a",
            he: "נָתַתִּי גְּדוּלָּה לְאַבְרָהָם — אָמַר לְפָנַי: ״וְאָנֹכִי עָפָר וָאֵפֶר״, לְמֹשֶׁה וְאַהֲרֹן — אָמַר: ״וְנַחְנוּ מָה״, לְדָוִד — אָמַר: ״וְאָנֹכִי תוֹלַעַת וְלֹא אִישׁ״.",
            es: "Le di grandeza a Avraham, y dijo ante Mí: «y yo soy polvo y ceniza». A Moshé y a Aharón, y dijeron: «y nosotros, ¿qué?». A David, y dijo: «y yo soy gusano y no hombre».",
            source: "Talmud Bavlí, Jullín 89a",
          },
        },
        {
          p: `Tres mediciones, tres instrumentos distintos, y vale la pena oírlas en su propio hebreo, porque cada una elige una herramienta diferente para decir lo mismo.`,
        },
        {
          p: `Avraham dice וְאָנֹכִי עָפָר וָאֵפֶר (ve-anoji afar va-éfer), «y yo soy polvo y ceniza». Se nombra con dos sustancias. Sigue habiendo un anoji, un «yo» que se sostiene y que tiene algo que decir de sí; lo que hace es cambiarse el material.`,
        },
        {
          p: `David dice וְאָנֹכִי תוֹלַעַת וְלֹא אִישׁ (ve-anoji tolaat ve-lo ish), «y yo soy gusano y no hombre». Se nombra con un ser vivo, el más bajo, y añade una negación: y no hombre. Sigue habiendo un «yo», pero ya se ha salido de su propia especie.`,
        },
        {
          p: `Moshé y Aharón dicen וְנַחְנוּ מָה (ve-najnu ma), dos palabras, «y nosotros, ¿qué?». Y aquí no hay sustancia, no hay animal, no hay negación. No hay predicado en absoluto. Donde debería estar lo que uno es, hay una pregunta. No dicen que son poca cosa: dicen que no saben qué decir en ese lugar de la frase.`,
        },
        {
          p: `Y el Talmud, que es la única tradición religiosa del mundo capaz de poner nota a la humildad de sus propios santos, dictamina:`,
        },
        {
          cita: {
            label: "El dictamen, en nombre de Ravá — Jullín 89a",
            he: "גָּדוֹל שֶׁנֶּאֱמַר בְּמֹשֶׁה וְאַהֲרֹן יוֹתֵר מִמַּה שֶּׁנֶּאֱמַר בְּאַבְרָהָם, דְּאִילּוּ בְּאַבְרָהָם כְּתִיב: ״וְאָנֹכִי עָפָר וָאֵפֶר״, וְאִילּוּ בְּמֹשֶׁה וְאַהֲרֹן כְּתִיב: ״וְנַחְנוּ מָה״.",
            es: "Más grande es lo que se dijo de Moshé y Aharón que lo que se dijo de Avraham: pues de Avraham está escrito «y yo soy polvo y ceniza», mientras que de Moshé y Aharón está escrito «y nosotros, ¿qué?».",
            source: "Talmud Bavlí, Jullín 89a",
          },
        },
        {
          p: `Esa es la escala, y está graduada por el Talmud mismo. Decirse polvo es alto. Decirse gusano es alto. Pero más alto que las dos es no encontrar la palabra. Mientras uno pueda nombrar lo pequeño que es, todavía está usando una regla, y la regla la sostiene él. Cuando ya no hay con qué nombrarse, es que la escala se volvió infinita y el instrumento se quedó corto.`,
        },
        {
          p: `Y el pasaje remata en un lugar donde uno no espera llegar. Si Moshé y Aharón dijeron «y nosotros, ¿qué?» —ma, en hebreo—, el Talmud va a buscar esa misma palabra en el libro de Job, donde está dicho de la tierra entera:`,
        },
        {
          cita: {
            label: "De qué está colgado el mundo — Jullín 89a",
            he: "אֵין הָעוֹלָם מִתְקַיֵּים אֶלָּא בִּשְׁבִיל מֹשֶׁה וְאַהֲרֹן, כְּתִיב הָכָא: ״וְנַחְנוּ מָה״, וּכְתִיב הָתָם: ״תּוֹלֶה אֶרֶץ עַל־בְּלִימָה״.",
            es: "El mundo no se sostiene sino por Moshé y Aharón: está escrito aquí «y nosotros, ¿qué?», y está escrito allí «[Él] suspende la tierra sobre la nada».",
            source: "Talmud Bavlí, Jullín 89a",
          },
        },
        {
          p: `El versículo de Job dice תֹּלֶה אֶרֶץ עַל־בְּלִי־מָה (tole éretz al bli-má), «suspende la tierra sobre el no-qué» —y esa última palabra, מָה (ma), «qué», es literalmente la misma que dijeron Moshé y Aharón—. De modo que el Talmud cierra el círculo así: la tierra está colgada de la nada, y los hombres que llegaron a decir «nosotros, ¿qué?» son aquello de lo que está colgada. El que se mide y da cero es lo que sostiene el mundo. No es una metáfora de consuelo; es una tesis cosmológica dicha con dos versículos.`,
        },
        {
          p: `En el mismo folio, un poco más abajo, el Talmud da la versión breve de todo esto en boca de Rabí Abahu, y es la fórmula más limpia que la tradición ha producido sobre este asunto: el mundo se sostiene por מִי שֶׁמֵּשִׂים עַצְמוֹ כְּמִי שֶׁאֵינוֹ (mi she-mesim atzmó ke-mi she-enó), «el que se hace a sí mismo como quien no es».`,
        },
        {
          p: `Y antes de seguir conviene mirar el contrapeso, porque el Talmud lo pone a propósito en el mismo lugar. Inmediatamente después de la lista de los que se midieron pequeños viene la lista de los que se midieron grandes: a Nimrod le fue dada grandeza y dijo «vengan, construyamos una ciudad»; al faraón, y dijo «¿quién es el Eterno?»; a Nevujadnetzar, y dijo «subiré sobre las alturas de las nubes». Las dos listas tienen la misma estructura —se da grandeza, el hombre habla— y se diferencian solo en la dirección de la frase. Recibir mucho no produce humildad ni soberbia: revela cuál de las dos había.`,
        },
        {
          p: `Hay un detalle más, de esos que se pasan por alto y que valen el estudio entero. El versículo del que todo esto cuelga termina diciendo כִּי אַתֶּם הַמְעַט (ki atem ha-meat), «pues ustedes son los menos»; y la respuesta que el Talmud pone en boca del Cielo dice אַתֶּם מְמַעֲטִין עַצְמְכֶם (atem memaatín atzmejem), «ustedes se hacen menos a ustedes mismos». Es la misma raíz hebrea en las dos puntas. El versículo parecía decir que Israel fue elegido aunque era el más pequeño; leído con el oído del Talmud, dice que fue elegido porque es el que se hace pequeño.`,
        },
        {
          nota: `Esa lectura del juego de palabras es una meditación de Jashmal y no está dicha expresamente en el folio. Pero las dos palabras están ahí, y es la clase de cosa que el Talmud oye sin necesidad de explicarla.`,
        },

        { head: "Y el premio tiene una forma muy concreta" },
        {
          p: `Un folio antes, el mismo tratado cuenta qué recibió Avraham por haberse llamado polvo y ceniza. No es una recompensa espiritual ni una promesa vaga:`,
        },
        {
          cita: {
            label: "Lo que se le devolvió a Avraham — Jullín 88b",
            he: "אָמַר רָבָא: בִּשְׂכַר שֶׁאָמַר אַבְרָהָם אָבִינוּ ״וְאָנֹכִי עָפָר וָאֵפֶר״, זָכוּ בָּנָיו לִשְׁתֵּי מִצְוֹת: אֵפֶר פָּרָה, וַעֲפַר סוֹטָה.",
            es: "Dijo Ravá: como recompensa por haber dicho Avraham nuestro padre «y yo soy polvo y ceniza», merecieron sus hijos dos mandamientos: la ceniza de la vaca [roja] y el polvo de la sotá.",
            source: "Talmud Bavlí, Jullín 88b",
          },
        },
        {
          p: `Avraham se nombró con dos materiales despreciables, y la Torá convirtió esos dos materiales exactos en los ingredientes de dos ritos de purificación. La ceniza con la que se purifica al que tocó un muerto, y el polvo que se echa en el agua con la que se resuelve la sospecha entre un marido y su mujer.`,
        },
        {
          p: `Eso es lo que la tradición entiende por medición. Las palabras con las que un hombre se mide no se quedan en el aire: vuelven convertidas en materia de culto. Lo que Avraham ofreció como confesión de su nada, el Cielo se lo devolvió como instrumento para limpiar. Y es un dato que conviene tener a mano cuando uno sospeche que medirse pequeño es solo una postura interior sin consecuencias.`,
        },

        { head: "Y aquí está el hueco" },
        {
          p: `Falta uno en la lista. El Talmud nombra a Avraham, a Moshé, a Aharón y a David. No nombra a Yaakov. Y Yaakov es el único de todos ellos que puso el verbo en primera persona.`,
        },
        {
          p: `El folio no lo excluye ni lo discute: simplemente no lo trae. Y tampoco hay después ninguna fuente que lo añada a esa lista. De modo que el nombre del único que conjugó el verbo falta en la relación de los que se midieron pequeños, y ese hueco se queda abierto: no hay manera honesta de cerrarlo.`,
        },
      ],
    },
  ],

  // ── 4. מְפָרְשִׁים — Los comentaristas ──────────────────────────────────────
  mefarshim: {
    parrafos: [],
    bloques: [
      { head: "Lo que cuesta acercarse" },
      {
        p: `Hasta aquí la pequeñez parece pura ganancia: el que se mide en cero sostiene el mundo, y el que se llama polvo recibe de vuelta la ceniza que purifica. Pero la tradición pone un precio, y lo pone con una frialdad que sorprende.`,
      },
      {
        p: `El versículo de Yaakov no vive solo en el comentario a Génesis. Vive, sobre todo, en el tratado de Shabat, y allí no lo trae nadie para hablar de humildad. Lo trae Rabí Yanai, que tenía la costumbre de inspeccionar el puente antes de cruzarlo, y lo trae como fundamento de una regla general de conducta:`,
      },
      {
        cita: {
          label: "La ley del descuento — Shabat 32a",
          he: "לְעוֹלָם אַל יַעֲמוֹד אָדָם בִּמְקוֹם סַכָּנָה לוֹמַר שֶׁעוֹשִׂין לוֹ נֵס, שֶׁמָּא אֵין עוֹשִׂין לוֹ נֵס. וְאִם תִּמְצֵי לוֹמַר עוֹשִׂין לוֹ נֵס — מְנַכִּין לוֹ מִזְּכִיּוֹתָיו. אָמַר רַבִּי חָנִין: מַאי קְרָאָה? ״קָטֹנְתִּי מִכֹּל הַחֲסָדִים וּמִכׇּל הָאֱמֶת״.",
          es: "Nunca se ponga una persona en lugar de peligro diciendo que le harán un milagro, porque tal vez no le hagan un milagro. Y si le hacen un milagro, le descuentan de sus méritos. Dijo Rabí Janín: ¿de qué versículo? — «Me he vuelto pequeño ante todas las bondades y toda la verdad».",
          source: "Talmud Bavlí, Shabat 32a",
        },
      },
      {
        p: `Hay que ver bien el orden de las piezas, porque invierte lo que uno supondría. La ley no se deduce del caso de Yaakov: la ley se enuncia primero, como regla universal —לְעוֹלָם (leolam), «nunca», «jamás», que es la palabra con la que el Talmud encabeza sus reglas sin excepciones— y después se busca un versículo que la pruebe. Y el versículo que la prueba es katonti. Yaakov no es la excepción piadosa; es la evidencia de una regla que gobierna a todo el mundo.`,
      },
      {
        p: `Y la regla dice algo que vale la pena decir en castellano llano, sin suavizarlo: cada vez que a usted le va bien por encima de lo que le correspondía, la cuenta baja. No es un castigo; es contabilidad. מְנַכִּין (menakín) es el verbo de descontar de una suma. El que recibe, paga lo recibido con lo que tenía ahorrado.`,
      },
      {
        p: `Y ahora júntelo con lo anterior, que es donde esto se vuelve una sola enseñanza. Cuanto más cerca está uno, más recibe; cuanto más recibe, más se le descuenta; y cuanto más se le descuenta, más pequeño es el saldo con el que se presenta. La cercanía no se cobra: se paga. Por eso Yaakov llega al río con la lista de sus éxitos en la mano y la lee como una factura, y por eso en el versículo siguiente dice con todas sus letras כִּי־יָרֵא אָנֹכִי אֹתוֹ (ki yaré anoji otó), «porque tengo miedo de él».`,
      },
      {
        p: `Sobre lo que exactamente significa katonti, los comentaristas clásicos no están de acuerdo, y su desacuerdo es viejo y está por escrito. Rashi lo lee como la cuenta que bajó: se me menguaron los méritos por las bondades que hiciste conmigo, y por eso tengo miedo. El Ramban le responde que eso no se sostiene en el lenguaje del versículo, porque קָטָן (katán) habla de tamaño y no de cantidad, y propone que Yaakov está diciendo que es demasiado pequeño para merecer lo que ha recibido; y para sostenerlo se apoya precisamente en Amós, el profeta que dice de Yaakov que es pequeño. La discusión completa entre los dos, con el midrash que la origina y la respuesta del Sforno, está en {{study:porcion-de-esav|El hermano que tomó ocho veces}}. Para lo que aquí se mide, basta ver que las dos lecturas son mediciones: una mide un saldo y la otra mide un tamaño, y las dos dan un resultado menguante.`,
      },

      { head: "Entonces, ¿cómo se reza sin saldo?" },
      {
        p: `Si cada bondad consume mérito y acercarse cuesta, la pregunta práctica es brutal: ¿con qué se presenta delante de Dios el que ya no tiene con qué? Y la tradición tiene una respuesta, también en el Talmud, también sin devoción.`,
      },
      {
        cita: {
          label: "Lo que se le cuenta al que llega vacío — Sotá 5b",
          he: "בֹּא וּרְאֵה כַּמָּה גְּדוֹלִים נְמוּכֵי הָרוּחַ לִפְנֵי הַקָּדוֹשׁ בָּרוּךְ הוּא, שֶׁבְּשָׁעָה שֶׁבֵּית הַמִּקְדָּשׁ קַיָּים אָדָם מַקְרִיב עוֹלָה — שְׂכַר עוֹלָה בְּיָדוֹ... אֲבָל מִי שֶׁדַּעְתּוֹ שְׁפָלָה, מַעֲלֶה עָלָיו הַכָּתוּב כְּאִילּוּ הִקְרִיב כׇּל הַקׇּרְבָּנוֹת כּוּלָּן... וְלֹא עוֹד, אֶלָּא שֶׁאֵין תְּפִלָּתוֹ נִמְאֶסֶת.",
          es: "Ven y mira cuán grandes son los de espíritu bajo delante del Santo, bendito sea: en la época en que el Templo estaba en pie, el que ofrecía un holocausto tenía en su mano la recompensa de un holocausto... pero aquel cuyo ánimo está abatido, la Escritura se lo cuenta como si hubiera ofrecido todos los sacrificios... y no solo eso, sino que su oración no es rechazada.",
          source: "Talmud Bavlí, Sotá 5b · en nombre de Rabí Yehoshúa ben Leví",
        },
      },
      {
        p: `Ahí está la salida, y no es sentimental: es un tipo de cambio. El que llega con el saldo vacío no llega con las manos vacías, porque el saldo vacío es la ofrenda. Y el Talmud añade la cláusula que de verdad hacía falta: אֵין תְּפִלָּתוֹ נִמְאֶסֶת, «su oración no es rechazada». No dice que se cumpla. Dice que no se desprecia. Que es precisamente lo que un hombre necesita saber la noche antes de cruzar un río.`,
      },
      {
        p: `En el mismo tratado, un folio antes, Jizkiyá lo dice en forma de condición: אֵין תְּפִלָּתוֹ שֶׁל אָדָם נִשְׁמַעַת אֶלָּא אִם כֵּן מֵשִׂים לִבּוֹ כְּבָשָׂר, «la oración de una persona no es escuchada a menos que haga su corazón como carne». No como piedra ni como hierro. Como carne: lo blando, lo que se corta, lo que se estropea.`,
      },
    ],
  },

  // ── 5. פרד״ס ────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat · el sentido llano",
        parrafos: [
          `En su sentido llano, el versículo es el informe de un hombre antes de una noche peligrosa. Ha salido de su casa con un bastón, vuelve con dos campamentos, y en vez de sentirse respaldado por el expediente, lee el expediente al revés.`,
          `El sentido simple de קָטֹנְתִּי es «he quedado disminuido», y el versículo mismo explica respecto de qué: מִכֹּל הַחֲסָדִים (mi-kol ha-jasadim), «ante todas las bondades». La preposición hebrea מִן (min), que aquí se traduce «ante», sirve también para comparar. Es decir: el versículo trae su propio instrumento de medición dentro. Yaakov no dice que sea pequeño en abstracto. Dice que es pequeño medido contra lo que recibió.`,
        ],
      },
      {
        head: "רֶמֶז — Remez · la alusión",
        parrafos: [
          `La alusión está en la gramática, y ya quedó contada: en toda la Biblia hebrea nadie más conjuga este verbo sobre sí mismo. Los demás llevan la pequeñez como adjetivo —Shlomó dice נַעַר קָטֹן (náar katón), «muchacho pequeño»; Amós dice de Yaakov קָטֹן הוּא, «pequeño es él»— y un adjetivo es una etiqueta: describe un estado y lo deja quieto.`,
          `Un verbo en perfecto describe un proceso terminado. La diferencia entre «soy pequeño» y «me he vuelto pequeño» es la diferencia entre una condición y una biografía.`,
        ],
      },
      {
        head: "דְּרָשׁ — Drash · lo que se indaga",
        parrafos: [
          `El Talmud ya hizo el drash y lo hizo mejor de lo que nadie podría hacerlo después: puso las declaraciones de pequeñez en fila, las comparó, y coronó la que no tiene predicado. Vale la pena quedarse con la consecuencia práctica de esa jerarquía, porque es contraintuitiva y es útil.`,
          `Cuando una persona empieza a trabajar la humildad, lo primero que consigue es nombrarse pequeña. Encuentra sus palabras: soy polvo, soy nada, no valgo. Y eso es un logro real —es el nivel de Avraham, nada menos—. Pero según la escala del Talmud, ese no es el final. El final es el lugar donde uno se queda sin fórmula. Donde la frase «yo soy...» no se puede terminar, porque cualquier cosa que se ponga ahí sería demasiado grande o demasiado literaria.`,
          `Y hay algo de consuelo escondido en esa escala, que conviene decir. Si el grado más alto de la pequeñez es una pregunta sin respuesta —וְנַחְנוּ מָה, «y nosotros, ¿qué?»—, entonces la confusión sobre lo que uno es no es un fracaso del camino: puede ser su tramo más alto. El que no sabe qué decir de sí mismo delante de lo Infinito no se quedó atrás. Está donde estaban Moshé y Aharón.`,
        ],
      },
      {
        head: "סוֹד — Sod · el secreto",
        parrafos: [
          `En el nivel oculto, la medición tiene una ley, y el Zohar la enuncia como ley. El pasaje aparece dos veces, en la sección de Jayei Sará y otra vez en la de Shelaj, y se presenta como una de las enseñanzas que le fueron dichas a Rabí Shimón bar Yojai desde la academia de arriba: תָּא חֲזֵי, דְּלָא רַבֵּי קוּדְשָׁא בְּרִיךְ הוּא, אֶלָּא לִדְאַזְעִיר — «ven y mira: el Santo, bendito sea, no engrandece sino a aquel que se hace pequeño, y no hace pequeño sino a aquel que se engrandece. Dichoso aquel que se hace pequeño a sí mismo en este mundo: cuán grande es en elevación en aquel mundo».`,
          `Y una línea antes, la formulación corta, que es de las frases más densas del Zohar: מַאן דְּאִיהוּ זְעֵיר, אִיהוּ רַב. וּמַאן דְּאִיהוּ רַב, אִיהוּ זְעֵיר — «el que es pequeño, es grande; y el que es grande, es pequeño».`,
          `Esto es lo que contesta la pregunta con la que el estudio empezó, y la contesta de una manera que ninguna lógica humana habría propuesto. ¿Cómo se mide una conciencia contra lo que no tiene medida? Al revés. La escala es inversa. No es que la humildad sea recompensada después, como premio por buena conducta; es que en esa escala ser pequeño es la manera de ser grande, porque el tamaño no se mide por lo que uno ocupa sino por lo que uno deja libre.`,
          `El Zohar saca esa ley de un lugar inesperado: del versículo que cuenta los años de Sará. Allí la Torá escribe «cien año y veinte año y siete años» —el ciento, que es el número grande, lleva la palabra «año» en singular, y el siete, que es el número pequeño, la lleva en plural—. De esa asimetría concluye que el grande se escribe pequeño y el pequeño se escribe grande.`,
          `Y hay que decir con qué clase de apoyo cuenta esa deducción. El dato del versículo es exacto. Pero en toda la Biblia hebrea los números altos rigen el singular de «año» casi sin excepción —cincuenta y ocho veces el ciento, cuarenta y ocho veces el veinte— y los números bajos rigen el plural de manera predominante. Lo que el Zohar lee como mensaje es, por tanto, la concordancia normal del hebreo bíblico. Eso no desmiente la enseñanza: la sitúa. Es una lectura simbólica apoyada en una regularidad de la lengua, y no un hallazgo escondido en el texto. La ley que el Zohar enuncia no necesitaba ese apoyo y se sostiene sin él.`,
          `Esta misma ley recorre después toda la literatura. El Reshit Jojmá, el gran manual de Safed, la copia entera en su capítulo sobre la humildad y la encabeza con el rótulo בְּמַעֲלַת הַמַּקְטִין עַצְמוֹ, «sobre la virtud del que se hace pequeño a sí mismo». El Mesilat Yesharim recoge el pasaje de Jullín con sus tres nombres y sus tres versículos y lo pone en el centro de su propia puerta de la humildad, y añade la razón más desarmante de todas: que cualquier grandeza que una persona alcance no es suya, sino un favor que se le hizo, y por lo tanto la única respuesta posible a recibir es agradecer y bajar más. Y el Sefat Emet lee con esta misma ley el versículo del Deuteronomio, uniendo «ustedes son los menos» con el dicho arameo del Zohar.`,
          `Y la escuela jasídica le dio la forma más precisa que ha tenido. En una carta dedicada entera a este versículo, el autor del Tania explica que con cada bondad recibida hay que volverse שְׁפַל רוּחַ (shefal rúaj), «humilde de espíritu», y que cuanto más cerca está uno del Eterno, más abajo debe situarse; hasta la frase que cierra el razonamiento: el que está más «ante Él» es más כְּלָא וְאַיִן וָאֶפֶס, «como nada, inexistencia y cero». Y esa misma carta, unos renglones más abajo, dice algo que conviene no perder: que con katonti Yaakov justificó su temor ante su hermano. Es decir que la pequeñez no le quitó el miedo; le explicó por qué lo tenía. La carta entera está leída despacio en {{study:porcion-de-esav|El hermano que tomó ocho veces}}.`,
        ],
      },
    ],
    caja: {
      titulo:
        "El Talmud la cuenta como una escala con grados, el Zohar la enuncia como una ley de proporción inversa, y el Tania la explica como una cuestión de distancia.",
      cuerpo:
        "Y las tres coinciden en el punto que a nadie le gusta: el que se acerca se encoge, y se encoge porque se acerca.",
    },
  },

  // ── 6. הִתְבּוֹנְנוּת ──────────────────────────────────────────────────────────
  hitbonenut: {
    intro: `Ahora deje de leer fuentes y quédese un rato con esto, porque el resto del estudio no sirve de nada si no se mide usted.`,
    parrafos: [],
    bloques: [
      {
        p: `Lo primero que hay que notar es que la pregunta «cuánto mido yo» casi nunca se hace de verdad. Se hace una versión falsificada: cuánto mido comparado con el otro. Y esa versión tiene una ventaja enorme, que es que siempre se puede ganar. Basta elegir bien con quién compararse. Uno puede pasar la vida entera midiéndose y no averiguar nada, porque estuvo usando una regla que él mismo movía de sitio.`,
      },
      {
        p: `La medición verdadera no tiene esa salida. Cuando uno se pone de verdad frente a lo que no tiene medida, no hay forma de quedar bien, y tampoco hay forma de quedar mal, porque no hay con quién competir. Simplemente se queda sin cifra. Y el primer impulso, cuando eso pasa, es sentirlo como una humillación o como un vacío.`,
      },
      {
        p: `Mire bien ese impulso, porque ahí está casi todo. Se nos ha enseñado que sentirse pequeño es un síntoma: de depresión, de baja autoestima, de algo que hay que corregir. Y a veces lo es. Pero existe otra pequeñez que no tiene nada que ver con eso, y se distingue por una sola señal: la pequeñez enferma aparece cuando a uno le va mal, y esta aparece cuando a uno le va bien. Una llega con las manos vacías y la otra llega con las manos llenas.`,
      },
      {
        p: `Hágase entonces la pregunta en la forma que sí sirve: ¿cuándo fue la última vez que se sintió pequeño estando en lo alto? No cuando fracasó. Cuando le salió bien. Cuando le dieron el puesto, cuando nació el hijo sano, cuando se arregló lo que parecía imposible de arreglar. ¿Qué dijo usted ahí? Porque ese es el momento que la tradición mide, y no otro.`,
      },
      {
        p: `Y mire la cuenta por el otro lado, que es la parte difícil. Haga la lista de lo que le ha salido bien en la vida. Hágala de verdad, no mentalmente: el trabajo que consiguió, la gente que lo quiso, las veces que se salvó de algo, los años que lleva respirando. Yaakov hizo exactamente eso —salí con un bastón, hoy tengo dos campamentos— y de esa lista no concluyó que se lo merecía. Concluyó que había quedado pequeño. Pregúntese qué concluye usted de la suya. Porque de la misma lista salen dos hombres distintos: uno que se siente respaldado y otro que se siente en deuda, y no es la lista lo que los diferencia.`,
      },
      {
        p: `Y hay algo más, que es lo que de verdad se juega aquí. La medición no es gratis. Acercarse cuesta, y lo que cuesta es exactamente el saldo con el que uno se sentía seguro. Eso significa que el camino hacia arriba se parece bastante a ir perdiendo cobertura. Cada paso adelante gasta algo que uno había ahorrado. Y llega un punto en que hay que seguir sin reservas, que es el punto donde está Yaakov esa noche: con el río delante, el hermano enfrente, la cuenta en cero y miedo encima.`,
      },
      { p: `Y reza igual. Y cruza igual.` },
      {
        p: `Quédese un momento con eso, porque es la única forma en que esta enseñanza sirve para algo. No se trata de alcanzar un estado sereno en el que la pequeñez ya no duela. Se trata de descubrir que se puede avanzar sin estar cubierto, y que la oración de quien avanza así es precisamente la que no se desprecia. El que no tiene nada que poner en la balanza está poniendo lo único que no se puede fingir.`,
      },
      {
        p: `Y entonces aparece la última vuelta, que es la que da la vuelta a todo. Si la escala es inversa —si el pequeño es el grande—, entonces no hay nada que conquistar. No hay que llegar a ser más para contar más. Hay que dejar de ocupar tanto. Y eso no se consigue esforzándose: se consigue al revés, dejando de defender el lugar. Es la diferencia entre crecer y hacer espacio, y casi todo el trabajo espiritual de una persona se va en confundir las dos cosas.`,
      },
      {
        p: `Mídase, entonces, por lo que deja libre. Y si al hacerlo no encuentra palabras para decir lo que es, no corra a buscarlas. Puede que por fin esté en el lugar donde dos hombres dijeron «y nosotros, ¿qué?» y el mundo quedó colgado de ahí.`,
      },
    ],
  },

  // ── 7. מַעֲשֶׂה ────────────────────────────────────────────────────────────────
  maase: {
    intro: `Una acción concreta, hoy, y sale directamente del texto.`,
    etiqueta: "Haga la cuenta de Yaakov en voz alta:",
    texto:
      "nombre tres cosas que le salieron bien, y después diga lo que se debe por ellas.",
    bloques: [
      {
        p: `Esto parece un ejercicio de gratitud y no lo es, y la diferencia importa. La gratitud mira el regalo y dice gracias. Lo que hizo Yaakov fue mirar el regalo y decir cuánto le había costado. Salí con un bastón y hoy tengo dos campamentos: por lo tanto, he quedado pequeño. No es la misma frase y no produce el mismo hombre.`,
      },
      {
        p: `Concretamente, hoy: tome tres cosas buenas que tenga —no tres cosas que quiera, tres que ya tenga— y por cada una pregúntese quién la pagó. Alguien le enseñó a leer. Alguien lo cuidó cuando no podía cuidarse. Alguien le abrió una puerta que no le correspondía. Diga el nombre si lo sabe. Y donde no haya nombre, deje el hueco sin rellenar con una frase bonita; el hueco también es parte de la cuenta.`,
      },
      {
        p: `Después, hoy mismo, vaya al lugar más alto que tenga a mano —aquello en lo que usted es el bueno, el que sabe, el que manda— y hágase pequeño ahí, que es el único sitio donde hacerse pequeño cuesta algo. En lo que usted no domina, la humildad es gratis y no vale nada. En lo que domina, es caro. Pregunte en vez de explicar. Deje hablar al que sabe menos y no lo corrija. Reconozca en voz alta, delante de alguien, una cosa que el otro hace mejor que usted.`,
      },
      {
        etiqueta: "Y la midá para trabajar esta semana:",
        p: `medirse hacia abajo justo cuando las cosas van hacia arriba. No cuando se cae, que es cuando cualquiera se achica. Cuando sube. Porque el momento que la tradición mide es ese y no otro: בְּשָׁעָה שֶׁאֲנִי מַשְׁפִּיעַ לָכֶם גְּדוּלָּה, «en el momento en que les derramo grandeza».`,
      },
    ],
  },

  // ── 8. חֲתִימָה ────────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "La idea principal.",
        texto: `En toda la Biblia hebrea el verbo «hacerse pequeño» se conjuga cuatro veces, y solo una vez lo dice un hombre de sí mismo: Yaakov, la noche antes de cruzar el río, con la lista de sus éxitos en la mano. Las otras tres no describen a ningún hombre humilde: dos ponen el verbo en boca de David para decir que el reino que acababa de recibir era poca cosa a los ojos de Dios, y la cuarta describe al comerciante que achica la medida para robar. Entre esas cuatro queda dicho todo: la pequeñez es virtud cuando uno se la aplica a sí mismo y es fraude cuando se la aplica al instrumento.`,
      },
      {
        etiqueta: "El insight clave.",
        texto: `La pequeñez no es la consecuencia de haber sido amado: es su razón. El Talmud lo pone en boca del Cielo —«los deseo porque incluso cuando les derramo grandeza, ustedes se hacen pequeños delante de Mí»— y precisa el momento en que la medición cuenta: no cuando falta, sino cuando sobra. Y entonces hace algo que nadie más hace: pone en fila las declaraciones de pequeñez de la Biblia y las compara. Avraham se nombra con dos sustancias, polvo y ceniza. David se nombra con un animal, gusano y no hombre. Moshé y Aharón no se nombran: dicen «y nosotros, ¿qué?», dos palabras sin predicado. Y el Talmud dictamina que esa es la más grande de las tres, porque mientras uno todavía encuentra la palabra para decir lo pequeño que es, sigue sosteniendo él la regla.`,
      },
      {
        etiqueta: "El insight espiritual.",
        texto: `Acercarse cuesta, y la tradición lo dice como contabilidad, no como poesía: al que se le hace un milagro, le descuentan de sus méritos, y el versículo que prueba esa regla general es el de Yaakov. De modo que el camino hacia lo alto se parece a ir perdiendo cobertura: cada bondad recibida gasta el saldo con el que uno se sentía seguro. Y el Zohar explica por qué eso no es una pérdida, con una ley de proporción invertida: el Santo, bendito sea, no engrandece sino al que se hace pequeño. El tamaño de un hombre no se mide por lo que ocupa, sino por lo que deja libre.`,
      },
      {
        etiqueta: "La aplicación práctica.",
        texto: `El que llega con el saldo en cero no llega con las manos vacías, porque el saldo en cero es la ofrenda: al de ánimo abatido se le cuenta como si hubiera traído todos los sacrificios, y su oración no es rechazada. No dice que se cumpla. Dice que no se desprecia. Y eso es exactamente lo que un hombre necesita saber la noche en que tiene que cruzar un río con miedo y sin reservas. Yaakov no dejó de temer: rezó con miedo y cruzó sin saldo, y es en ese orden en que la cosa se puede imitar.`,
      },
      {
        etiqueta: "El hueco que queda.",
        texto: `El Talmud nombra a Avraham, a Moshé, a Aharón y a David en su lista de los que se midieron pequeños. No nombra a Yaakov. Y Yaakov es el único de todos ellos que puso el verbo en primera persona.`,
      },
    ],
  },

  // ── הֶמְשֵׁךְ — el umbral de navegación ────────────────────────────────────────
  hemshej: [
    "¿Y si la palabra «pequeño» había sido antes una etiqueta que otros le ponían? → {{study:porcion-de-esav|El hermano que tomó ocho veces}}",
    "Si el mundo está colgado de la nada, ¿qué es exactamente la nada? → {{study:411|El cero y el uno de la creación}}",
    "¿Puede una conciencia cambiar lo que mira al mirarlo? → {{study:observador|El observador, la conciencia que enciende la realidad}}",
    "Si su oración no es rechazada, ¿por qué a veces no se siente respuesta? → {{study:hester-panim|El ocultamiento del rostro}}",
  ],

  ctaRef: "Genesis 32:11",
};
