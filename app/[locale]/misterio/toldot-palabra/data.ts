import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO — תּוֹלְדֹת · La vav que se perdió
//  Serie «Parashá» · Toldot — Shabat 14 nov 2026 (Génesis 25:19–28:9).
//  ESTUDIO DE LA PALABRA, no de la parashá como narración.
//
//  CONTENIDO ESCRITO Y VERIFICADO POR EL SOFER (editor-erudito).
//  Fuente de montaje: ~/jashmal-produccion/toldot-palabra/toldot-palabra.md
//  (líneas 1–645). Todo lo que en ese archivo va DESPUÉS de la línea 645
//  —la «SECCIÓN DE TRABAJO — NO PUBLICAR»: veredictos, lagunas, riesgos y un
//  hallazgo reservado— NO se montó y NO aparece en esta página.
//
//  Infraestructura solo montó: no se añadió ni una gematría, ni una cita, ni un
//  folio, ni una fuente que no estuviera ya en el markdown verificado.
//
//  Hero en modo "numero": 840 (תולדת defectivo). El pleno es 846. La diferencia
//  es 6 = vav. Las cuatro sumas están en el cuerpo, letra por letra, tal como
//  las trae el Sofer.
//
//  Farsi: PENDIENTE por regla de Mardan (no se produce farsi salvo que lo pida).
//  Los campos …Fa del hero llevan el español como respaldo —mismo precedente que
//  /misterio/sefer-yetzira—; en el catálogo (lib/content/misterios.ts) van
//  VACÍOS para que tri() marque la traducción pendiente con TranslationBadge.
//  Inglés: omitido a propósito.
// ════════════════════════════════════════════════════════════════════════════

const TITULO = "La vav que se perdió";
const SERIE =
  "Serie «Parashá» · Toldot — estudio de la palabra, no de la parashá";
const GANCHO =
  "Una palabra aparece 39 veces en el Tanaj. En dos de ellas está escrita completa. En una está escrita vacía. En las otras treinta y seis le falta una letra. La tradición no trató eso como un detalle de escribas. Lo trató como una herida.";

export const data: EstudioData = {
  slug: "toldot-palabra",

  hero: {
    serielabel: SERIE,
    serielabelFa: SERIE,
    he: "תּוֹלְדֹת",
    titulo: TITULO,
    tituloFa: TITULO,
    ganchoEs: GANCHO,
    ganchoFa: GANCHO,
    numero: { valor: "840", rom: "Toldot defectivo · pleno 846 · faltan 6 = vav" },
    fecha:
      "Shabat · 14 de noviembre de 2026 — parashat Toldot (Génesis 25:19–28:9)",
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── 1. תַּרְגּוּם — Traducción ────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "La palabra que abre nuestra parashá — Bereshit (Génesis) 25:19",
        he: "וְאֵ֛לֶּה תּוֹלְדֹ֥ת יִצְחָ֖ק בֶּן־אַבְרָהָ֑ם אַבְרָהָ֖ם הוֹלִ֥יד אֶת־יִצְחָֽק׃",
        es: "Ve-éle toldot Itzjak ben Avraham, Avraham holid et Itzjak. · Y estas son las toldot de Itzjak hijo de Avraham: Avraham engendró a Itzjak.",
        source: "Bereshit (Génesis) 25:19",
      },
      {
        label:
          "Y la primera vez que la Torá usa la palabra, mucho antes de que haya un ser humano con hijos — Bereshit 2:4",
        he: "אֵ֣לֶּה תוֹלְד֧וֹת הַשָּׁמַ֛יִם וְהָאָ֖רֶץ בְּהִבָּֽרְאָ֑ם",
        es: "Éle toldot ha-shamáim ve-ha-áretz be-hibaram. · Estas son las toldot del cielo y la tierra cuando fueron creados.",
        source: "Bereshit 2:4",
      },
      {
        label:
          "Y la última vez que aparece en la Torá y el Tanaj con la escritura completa, al final del libro de Rut, en la genealogía que desemboca en David — Rut 4:18",
        he: "וְאֵ֙לֶּה֙ תּוֹלְד֣וֹת פָּ֔רֶץ פֶּ֖רֶץ הוֹלִ֥יד אֶת־חֶצְרֽוֹן׃",
        es: "Y estas son las toldot de Péretz: Péretz engendró a Jetzrón.",
        source: "Rut 4:18",
      },
    ],
    parrafos: [
      `Cómo traducirla. No hay una sola palabra española que la cubra. Toldot se ha traducido como «generaciones», «descendencia», «linaje», «historia», «crónica», «lo engendrado». Los diccionarios lo confirman: el BDB (Brown–Driver–Briggs, el diccionario hebreo-inglés clásico, entrada תּוֹלֵדוֹת) la define como «generaciones, especialmente en genealogías = relato de un hombre y sus descendientes», y para Génesis 2:4 agrega, literalmente, «los engendramientos del cielo y la tierra». Klein (diccionario etimológico) da seis acepciones para el singular תּוֹלָדָה: nacimiento, hijo, genealogía, secuela, resultado, naturaleza. El Strong la numera H8435 y gloza: descendants, results, proceedings, generations, genealogies.`,
      `Yo la traduzco, para este estudio, como «lo que de algo sale». Porque eso es lo único que sirve a la vez para un hombre, para un pueblo y para el cielo.`,
      `La raíz y la forma. La raíz es י־ל־ד (yud-lamed-dalet, Strong H3205): parir, dar a luz, engendrar. De ella salen יֶלֶד (yéled), niño; יוֹלֶדֶת (yoledet), parturienta; וַיּוֹלֶד (vayóled), engendró.`,
      `Toldot es un sustantivo femenino plural con tav preformativa — la ת inicial no pertenece a la raíz, es un prefijo que forma nombres de acción. Y el yud inicial de la raíz, como ocurre regularmente en hebreo, se transforma en vav: י → ו. De ahí תּוֹ־לְדֹת.`,
      `El punto gramatical decisivo: ese patrón corresponde al hifil, la conjugación causativa. No es «los que nacieron» sino «lo que se hizo nacer». Y la Torá lo demuestra sin que haya que argumentarlo, porque en los dos versículos clave el sustantivo viene pegado al verbo hifil de la misma raíz: en Gn 25:19, «estas son las toldot de Itzjak… Avraham holid (הוֹלִיד) a Itzjak»; y en Rut 4:18, «estas son las toldot de Péretz… Péretz holid (הוֹלִיד) a Jetzrón».`,
      `Holid es hifil: «hizo nacer». El sustantivo y el verbo son la misma idea dos veces. Una toldá no es algo que brotó solo. Es algo que alguien hizo salir de sí.`,
      `Glosas. Hifil — una de las siete conjugaciones del verbo hebreo; la causativa. Lamad = aprendió; hilmid = enseñó (hizo aprender). Pleno / defectivo (מָלֵא / חָסֵר, malé / jaser) — en hebreo las vocales largas pueden escribirse con una letra de apoyo (vav, yud) o no. «Pleno» = con la letra. «Defectivo» = sin ella. La pronunciación no cambia; la escritura sí. Y en la Torá la escritura es texto fijado, no decisión del copista.`,
    ],
  },

  // ── 2. מְפָרְשִׁים — Comentaristas ────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "El dato duro, antes de los comentaristas.",
        texto: `Antes de citar a nadie conviene poner sobre la mesa lo que dice el texto mismo. Recorrí los 39 libros del Tanaj palabra por palabra buscando toda forma de la raíz con el prefijo tav (texto masorético, edición Miqrá al pi ha-Masorá, basada en el Códice de Alepo, contrastada después contra otras dos ediciones hebreas independientes, que coinciden exactamente). El resultado: la palabra aparece 39 veces en todo el Tanaj. De esas, 13 son encabezados del tipo «estas son las toldot de X».`,
      },
      {
        etiqueta: "Los trece encabezados, uno por uno.",
        texto: `1 · Gn 2:4, cielo y tierra — תוֹלְדוֹת, dos vavs, 846. 2 · Gn 5:1, Adam — תּוֹלְדֹת, una, 840. 3 · Gn 6:9, Nóaj — תּוֹלְדֹת, una, 840. 4 · Gn 10:1, hijos de Nóaj — תּוֹלְדֹת, una, 840. 5 · Gn 11:10, Shem — תּוֹלְדֹת, una, 840. 6 · Gn 11:27, Téraj — תּוֹלְדֹת, una, 840. 7 · Gn 25:12, Ishmael — תֹּלְדֹת, ninguna, 834. 8 · Gn 25:19, Itzjak — תּוֹלְדֹת, una, 840. 9 · Gn 36:1, Esav — תֹּלְדוֹת, una, 840. 10 · Gn 36:9, Esav — תֹּלְדוֹת, una, 840. 11 · Gn 37:2, Yaakov — תֹּלְדוֹת, una, 840. 12 · Nm 3:1, Aharón y Moshé — תּוֹלְדֹת, una, 840. 13 · Rut 4:18, Péretz — תּוֹלְדוֹת, dos, 846.`,
      },
      {
        etiqueta: "Lo que coincide con el BDB.",
        texto: `Esto coincide, letra por letra, con la lista de formas del BDB (que cataloga: constructo תּוֹלְדוֹת en Gn 2:4 y Rut 4:18; תּוֹלְדֹת en Gn 5:1 y 6 veces más; תֹּלְדוֹת en 36:1 y 2 veces más; תֹּלְדֹת en 25:12). El diccionario del siglo XIX y mi concordancia hecha hoy dicen exactamente lo mismo.`,
      },
      {
        etiqueta: "Tres hechos saltan a la vista, y ninguno requiere interpretación todavía.",
        texto: `Primero: solo dos encabezados están escritos completos, con las dos vavs: el del cielo y la tierra (Gn 2:4) y el de Péretz (Rut 4:18). El principio absoluto de la creación y el final del libro de Rut. Segundo: diez están escritos con una sola vav. Incluido el de nuestra parashá, Itzjak. Tercero: uno solo está escrito sin ninguna vav —Ishmael, Gn 25:12— y está siete versículos antes del de Itzjak. Es el único encabezado completamente vacío de vav en todo el Tanaj.`,
      },
      {
        etiqueta: "La aritmética de los valores, calculada letra por letra, sin atajos.",
        texto: `תולדות = 400+6+30+4+6+400 = 846. תולדת = 400+6+30+4+400 = 840. תלדות = 400+30+4+6+400 = 840. תלדת = 400+30+4+400 = 834. La diferencia entre lo pleno y lo defectivo es exactamente 6. Y 6 es el valor de la vav. La letra que falta y el número que falta son la misma cosa. Guarden ese dato: la tradición lo vio antes que nosotros y construyó sobre él.`,
      },
      {
        etiqueta: "Rashí (Francia, 1040–1105).",
        texto: `Sobre Gn 6:9, «estas son las toldot de Nóaj — Nóaj fue un hombre justo»: «Puesto que el texto lo menciona, canta su alabanza… Otra explicación: como después de decir estas son las toldot de Nóaj no menciona enseguida los nombres de sus hijos sino que declara que era un hombre justo, la Escritura te enseña con eso que las verdaderas toldot de los justos son sus buenas obras» (Rashí sobre Bereshit 6:9, citando Bereshit Rabá 30:6).`,
      },
      {
        etiqueta: "Pero Rashí no la repite en nuestra parashá.",
        texto: `Esa frase se repite en todas partes, y es auténtica, con su fuente. Pero hay que leerla con cuidado. Sobre Gn 25:19 Rashí escribe algo mucho más seco: «Y estas son las toldot de Itzjak — Yaakov y Esav, que son nombrados en esta sección» (Rashí sobre Bereshit 25:19). Nada de buenas obras. Nada de alabanza. Las toldot de Itzjak son dos hijos, y uno de ellos es Esav. Rashí no edulcora: donde el texto da obras, dice obras; donde el texto da hijos, dice hijos. La asimetría es del versículo, no del comentarista.`,
      },
      {
        etiqueta: "Ramban — Najmánides (Gerona–Acre, 1194–1270).",
        texto: `Sobre Gn 2:4 lee las toldot del cielo y la tierra como algo físico y continuo, no como una lista: «La Escritura relata ahora el recuento del cielo y la tierra en cuanto a la lluvia y el crecimiento, después de que fueron creados y puestos en su orden propio: que los cielos den su rocío y su lluvia, y la tierra dé su producto; y estos hacen posible la existencia de todo ser vivo» (Ramban sobre Bereshit 2:4). Las toldot del cielo son la lluvia. Las de la tierra, la cosecha. «Lo que de algo sale», literalmente. Y Ramban añade que בְּהִבָּרְאָם (be-hibaram, «cuando fueron creados») alude a lo que dijeron los Sabios: בְּהֵ״א בְּרָאָם (be-hei beraam), «con la letra hei los creó».`,
      },
      {
        etiqueta: "Ramban sobre nuestro versículo.",
        texto: `Sobre Gn 25:19, Ramban aprieta la definición: «Y estas son las toldot de Itzjak hijo de Avraham — La Escritura dice esto de Esav y Yaakov, los hijos de Itzjak que se mencionan más adelante» (Ramban sobre Bereshit 25:19). El traductor Chavel anota con precisión la intención: aquí toldot no debe entenderse en el sentido amplio de «generaciones», sino en el estrecho de hijos.`,
      },
      {
        etiqueta: "Ibn Ezra (España–Italia, 1089–1164).",
        texto: `Sobre Gn 2:4, con su brevedad característica: «Estas son las toldot — significa: estas son las cosas que ellos dieron a luz» (Ibn Ezra sobre Bereshit 2:4). Es decir: lo que el cielo y la tierra parieron — árboles, criaturas vivientes, el hombre. Ibn Ezra observa además que en otros lugares toldot significa más bien «los relatos de», «los sucesos de» (así lo lee en Gn 6:9 y 37:1). Es decir: una misma palabra significa a veces hijos y a veces acontecimientos. Esa ambigüedad no es defecto del hebreo; es la tesis de la palabra. Sobre Gn 25:19 registra dos lecturas de «Avraham engendró a Itzjak»: una, que Itzjak se parecía a su padre y todo el que lo veía podía atestiguar que era hijo de Avraham; otra, que holid aquí significa «crió, educó», como en «nacieron sobre las rodillas de Yosef» (Gn 50:23).`,
      },
      {
        etiqueta: "Radak — Rabí David Kimji (Provenza, c. 1160–1235).",
        texto: `Sobre Gn 2:4 plantea la pregunta teológica que el versículo esconde: si Dios creó todo directamente, ¿de dónde salen «toldot»? «En verdad Dios había creado todas estas cosas, pero empleó intermediarios, es decir, el cielo y la tierra, a los que había dado órdenes» (Radak sobre Bereshit 2:4). Y cita a Bereshit Rabá: todo tiene toldot. El cielo y la tierra tienen toldot. La lluvia tiene toldot. El rocío tiene toldot.`,
      },
      {
        etiqueta: "Y entonces llega la frase más profunda que se haya dicho sobre esta palabra.",
        texto: `Está en el Midrash y Radak la trae: «Todo lo que tiene toldot muere y se descompone, es creado y no crea. Y todo lo que no tiene toldot no muere ni se descompone, y crea sin ser creado. Rabí Azaryá dijo: esto último se dijo únicamente respecto del de Arriba» (Bereshit Rabá 12:7). Tener toldot es el certificado de que uno es criatura. Lo único que no tiene toldot es Dios. Engendrar es la marca de la mortalidad, no de la eternidad. Vuelvan sobre esto cuando lleguemos a la vav.`,
      },
      {
        etiqueta: "Rashbam (Francia, c. 1085–1158).",
        texto: `Nieto de Rashí, defensor del pshat radical. Su comentario a «estas son las toldot de Yaakov» (Gn 37:2) es un manifiesto: ein mikrá yotzé midei pshutó — «ningún versículo se sale de su sentido llano». Y sobre nuestra palabra en concreto dice algo que vale como advertencia metodológica para todo este estudio: que de todos los «estas son las toldot» de la Escritura, en unos el texto explica hijos y en otros explica nietos y sucesos, y que no se puede forzar una sola traducción sobre todos. (Citado en el diccionario Ben Yehudá, s.v. תולדה, donde también se recoge que Ibn Janaj —en su Libro de las Raíces, raíz ילד— y el propio Ibn Ezra glosan toldot en Gn 37:2 como «sus sucesos y acontecimientos».)`,
      },
      {
        etiqueta: "Abarbanel (Portugal–Italia, 1437–1508).",
        texto: `Abre su comentario a Gn 25:19 declarando que la sección entera levanta preguntas («וכבר יפלו בספור הפרשה הזאת שאלות»), su método habitual: acumular dificultades antes de responder. Lo registro para ser honesto: consulté su comentario pero no pude cotejar en esta sesión el desarrollo completo de sus respuestas sobre la palabra toldot en particular. No le atribuyo nada más.`,
      },
      {
        etiqueta: "Malbim (Ucrania–Rumania, 1809–1879).",
        texto: `Plantea su pregunta característica sobre la redundancia del versículo: «Lo que dice Itzjak hijo de Avraham, Avraham engendró a Itzjak es una duplicación evidente. ¿Por qué se extiende en el linaje de Rivká, que ya conocíamos de la sección anterior? ¿De dónde supo Itzjak que ella era estéril y no él?» (Malbim sobre Bereshit 25:19). Es decir: el Malbim ve que el versículo gasta palabras. Dice «hijo de Avraham» y luego repite «Avraham engendró a Itzjak». Para un lector del pshat es redundante. Para la tradición, una redundancia en la Torá es una puerta.`,
      },
      {
        etiqueta: "Or HaJaim (Marruecos–Jerusalén, 1696–1743).",
        texto: `La misma incomodidad, formulada más agudamente: «¿Por qué menciona la Torá el nacimiento de Itzjak en lugar del nacimiento de sus hijos en este punto? ¿Por qué necesitaba la Torá decirnos aquí que Avraham engendró a Itzjak?» (Or HaJaim sobre Bereshit 25:19). Nótese lo que está pasando: el versículo anuncia «las toldot de Itzjak» y acto seguido, en vez de nombrar a los hijos, mira hacia atrás, hacia el padre. El encabezado de las generaciones de Itzjak empieza hablando de Avraham. (Este es el terreno del estudio ya publicado sobre {{study:rostro-isaac|el parecido de los rostros}}; aquí solo lo señalo y sigo.)`,
      },
      {
        etiqueta: "El Zohar — toldot como flujo, no como lista.",
        texto: `Sobre «estas son las toldot de Yaakov: Yosef» (Gn 37:2): «Cuando Yaakov fue asentado en Yosef, y así el sol se unió con la luna, entonces comenzó una producción de toldot, siendo Yosef el engendrador. Porque es aquel río que fluye perpetuamente el que hace toldot, pues sus aguas no se interrumpen jamás; y él hace toldot en esta Tierra, y de él salen toldot al mundo» (Zohar, Vayeshev 2:21).`,
      },
      {
        etiqueta: "El Baal HaSulam (R. Yehudá Ashlag, 1885–1954).",
        texto: `En su comentario Sulam desarma la metáfora y nombra las estructuras: «Después de que Yosef se asentó en Yaakov, y el sol —que es Zeir Anpin— se unió con la luna —que es la Nukvá—, entonces comenzó a engendrar toldot. ¿Y quién es el que hace toldot? El versículo vuelve y dice: Yosef. Porque aquel río que se extiende y sale de Edén, que es Yesod, llamado Yosef, es el que hace toldot, porque sus aguas no se interrumpen jamás» (Sulam sobre Zohar, Vayeshev 21:1). Aquí la palabra ha cambiado de registro por completo. Toldot ya no es una genealogía humana: es el nombre del mecanismo por el cual lo de arriba se derrama en lo de abajo — hishtalshelut, el encadenamiento de los mundos. Engendrar es el verbo de la emanación. Por eso la Torá puede usar la misma palabra para el cielo y la tierra que para un hombre y sus hijos: en ambos casos describe algo que fluye de una fuente hacia un recipiente y no se detiene.`,
      },
      {
        etiqueta: "Y el Zohar cierra el círculo hacia atrás, hasta Bereshit.",
        texto: `«Las toldot del cielo y la tierra no pueden ser sino Adam y Javá, pues ellos fueron el producto directo del cielo y la tierra y no de padres humanos» (Zohar, Jayei Sará 15:110). Es decir: el único «hijo» literal del cielo y la tierra es el ser humano. La palabra que abre la historia de Itzjak es la misma con que la Torá llamó a Adam.`,
      },
      {
        etiqueta: "El Arizal.",
        texto: `En Shaar HaPesukim, parashat Toldot, Rabí Itzjak Luria comenta no la palabra toldot sino el versículo que viene dos después, «y oró Itzjak al Eterno frente a su esposa» (Gn 25:21). Enseña que el Nombre אדנ״י en su miluy (deletreo expandido: אלף דלת נון יוד) suma 671 —cálculo que verifiqué: 111+434+106+20 = 671— y que las letras ע־ת־ר del verbo vayetar («oró») aluden a ello; que en la letra álef hay un yud superior y un yud inferior con una vav entre ambos; y que del yud superior, que es el secreto del mazal supremo, «se extienden y vienen los hijos», conforme a la sentencia talmúdica de que hijos, vida y sustento no dependen del mérito sino del mazal. Y añade que a quien carece de hijos le conviene orar con esa intención. Lo conceptual sirve y lo cito: los hijos no vienen del mérito, vienen de una raíz más alta que el mérito. Pero hay en ese mismo pasaje una equivalencia numérica (לנוכח = מזלא) que no logré cuadrar aritméticamente y por lo tanto no la reproduzco.`,
      },
      {
        etiqueta: "Sefat Emet (Gur, 1847–1905).",
        texto: `La voz jasídica sobre la frase de Rashí, y es el eslabón que hace práctica toda la cadena: «En Rashí: las verdaderas toldot de los justos son las mitzvot y las buenas obras. Todas las criaturas necesitan hacer toldot. El significado es que el Santo, bendito sea, puso un punto sagrado dentro de la creación en general, y las criaturas —en particular los seres humanos— deben ensanchar ese punto para que su fuerza se extienda por toda la tierra. Pero esas toldot vienen solo por medio del bitul, el anularse que el hombre hace ante el Creador, y por saber y entender que no está en su poder hacer toldot por sí mismo… Y por eso dice el versículo estas son las toldot de Nóaj — aspecto de menujá, reposo y asentamiento de la mente, para que cada uno vuelva a su raíz y entienda que no tiene vitalidad propia en absoluto; y por medio de eso hace toldot. Aunque este aspecto es lo opuesto de las toldot y de la expansión, aun así las toldot principales dependen de él» (Sefat Emet, Bereshit, Nóaj 5:3).`,
      },
      {
        etiqueta: "Léanlo despacio, porque es contraintuitivo.",
        texto: `Lo que engendra no es la expansión, es la contracción. Nóaj entró en un arca, se encogió, y por eso la Torá lo llama engendrador.`,
      },
    ],
  },

  // ── 3. פרד״ס ─────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat",
        parrafos: [
          `En el nivel llano, toldot es una palabra administrativa. Es el encabezado con que el libro de Bereshit organiza la humanidad: once veces en Génesis el relato se detiene, levanta la cabeza y dice «y estas son las toldot de…», y empieza una sección nueva. Es la columna vertebral del libro.`,
          `Y en el nivel llano, la variación de escritura tiene una explicación sobria que hay que decir en voz alta: en el hebreo bíblico la escritura plena y la defectiva alternan con cierta libertad, y filólogos y copistas han discutido estos casos durante siglos. Un lector moderno puede atribuirlo a la historia de la ortografía hebrea. Eso es legítimo y no destruye nada de lo que sigue, por una razón simple: el texto masorético que recibimos fijó esas grafías, las contó, las anotó y las transmitió sin tocarlas. La tradición no inventó la variación; la encontró y se negó a corregirla.`,
          `Lo que sí es llano y verificable es la estructura: la palabra abre y cierra con tav, la última letra del alefbet. Entre las dos tav hay vav, lámed, dálet. Y dentro de nuestra parashá, el contraste de escritura entre Ishmael (v. 12, sin vav) e Itzjak (v. 19, con vav) está separado por siete versículos.`,
        ],
      },
      {
        head: "רֶמֶז — Remez",
        parrafos: [
          `Dos insinuaciones que se sostienen sin forzar nada.`,
          `La primera: una palabra que empieza y termina en la misma letra. La tav es el final del alefbet, y en el Talmud es la marca. Cuando Dios manda sellar a los justos antes de la destrucción de Jerusalén, la señal es una tav: «Ve e inscribe sobre la frente de los justos una tav de tinta, para que los ángeles destructores no tengan dominio sobre ellos; y sobre la frente de los malvados, una tav de sangre, para que los ángeles destructores sí tengan dominio sobre ellos» (Talmud Bavlí, Shabat 55a, sobre Yejezkel 9:4).`,
          `Y unas líneas después, la explicación del porqué de esa letra y no otra: «¿Y qué tiene de diferente la tav? Dijo Rav: tav es de tijyé, vivirás; tav es de tamut, morirás» (Talmud Bavlí, Shabat 55a).`,
          `La misma letra abre las dos palabras opuestas. No es una letra neutra: es una letra que corta por los dos filos. Y la palabra toldot está encerrada entre dos de ellas. Lo que empieza en marca termina en marca, y la marca puede ser de tinta o de sangre según quién la lleve. En el mismo pasaje se dice de los santificados que «cumplieron toda la Torá de álef hasta tav» — la tav es también el cierre de todo lo que hay.`,
          `La segunda: la letra que falta es la que une. La vav es, en su forma, un gancho; el nombre mismo de la letra, וָו, significa gancho o clavija, como los ganchos de las columnas del Mishkán (Shemot 27:10). Y es la letra que en hebreo funciona como conjunción: la vav de «y», la que enlaza una cosa con la siguiente. En una palabra cuyo oficio es enlazar generaciones, la letra que se ausenta es precisamente la letra-gancho.`,
          `Y la aritmética lo confirma sin metáfora: la palabra plena vale 846, la defectiva 840. La diferencia es 6, que es la vav. Lo que falta en la escritura falta en el número, y falta en la cantidad exacta del eslabón.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash",
        parrafos: [
          `Aquí está el nudo de este estudio, y tiene fuente exacta.`,
          `Fuente primera — Bereshit Rabá 12:6: «Toldot — Dijo Rabí Shmuel bar Najmán: todas las toldot que se dicen en la Torá están escritas defectivas, salvo dos: “y estas son las toldot de Péretz” (Rut 4:18), y esta [Gn 2:4]. ¿Y por qué están defectivas? Rabí Yudán dijo en nombre de Rabí Avín: corresponden a las seis cosas que le fueron quitadas a Adam después de que pecó. Y estas son: su resplandor, su vida, su estatura, el fruto de la tierra, el fruto del árbol, y las luminarias».`,
          `Seis cosas. Vav vale seis. La letra que falta es el número de lo que se perdió. El midrash no dice «la vav simboliza seis»; dice directamente kenégued shishá devarim, «correspondiendo a seis cosas». La ortografía del texto sagrado es, para los Sabios, la contabilidad de una pérdida.`,
          `Y el mismo pasaje cierra: «Dijo Rabí Berejiá en nombre de Rabí Shmuel: aunque las cosas fueron creadas en su plenitud, cuando pecó Adam el primero se estropearon, y ya no vuelven a su reparación (tikún) hasta que venga el hijo de Péretz, como está dicho: “y estas son las toldot de Péretz” (Rut 4:18)» (Bereshit Rabá 12:6). Y enumera lo que volverá, versículo por versículo: la estatura erguida (Vaykrá 26:13), el fruto de la vid y de la tierra (Zejariá 8:12), y las luminarias — «y será la luz de la luna como la luz del sol» (Yeshayahu 30:26).`,
          `Fuente segunda, y más explícita — Shemot Rabá 30:3. Este midrash es el que realmente cierra el argumento, y es el que casi nadie cita completo: «Encuentras que todas las toldot de la Escritura están defectivas excepto dos: “estas son las toldot del cielo y la tierra” y “y estas son las toldot de Péretz”. Y hay una gran razón para ello. ¿Por qué dijo “estas son las toldot del cielo y la tierra” pleno? Porque el Santo, bendito sea, creó su mundo y no había ángel de la muerte en el mundo; por eso está pleno. Y cuando pecaron Adam y Javá, el Santo, bendito sea, disminuyó todas las toldot de la Escritura. Y cuando se levantó Péretz, sus toldot se hicieron plenas, porque de él se levanta el Mashíaj, y en sus días el Santo, bendito sea, hará desaparecer la muerte, como está dicho: “destruirá a la muerte para siempre” (Yeshayahu 25:8). Por eso las toldot del cielo y la tierra y las toldot de Péretz están plenas».`,
          `Esto es de una coherencia estremecedora. La vav que falta es la muerte. No «simboliza» la muerte: marca el momento en que la muerte entró. Antes del pecado, la palabra que nombra la fertilidad estaba entera. Después, a toda generación engendrada en el mundo le falta un eslabón, y le seguirá faltando hasta que nazca de Péretz aquel en cuyos días «destruirá a la muerte para siempre».`,
          `Y recuerden lo que trajo Radak de Bereshit Rabá 12:7: todo lo que tiene toldot muere. Las dos piezas encajan. Engendrar es la respuesta de las criaturas a la muerte: como no podemos permanecer, nos continuamos. La vav defectiva es la cicatriz de ese arreglo. La vav plena es la promesa de que el arreglo terminará.`,
          `Y ahora el filo que da vuelta todo. Porque el mismo Shemot Rabá 30:3, unas líneas antes, aplica la regla a nuestro versículo — y la respuesta es exactamente la contraria de lo que uno esperaría: «Igualmente, “y estas son las toldot de Itzjak hijo de Avraham” (Gn 25:19) añade a lo anterior, a lo que se escribió antes: “los hijos de Ishmael” (Gn 25:16). ¿Y quién era este? Era Esav y sus hijos, que era hijo de Itzjak. Y si es así, podría decirse que, puesto que solo está escrito “y estas son las toldot”, también Yaakov, que es toldot de Itzjak, está incluido junto con Esav… Y por eso las toldot de Itzjak están defectivas: para sacar a Yaakov de la categoría de los malvados».`,
          `Hay que detenerse aquí. El midrash está operando con una regla que atribuye a Rabí Abahu y que expone al principio del mismo pasaje: donde está escrito וְאֵלֶּה (ve-éle, «y estas») se añade a lo anterior; donde está escrito אֵלֶּה (éle, «estas») se descarta lo anterior. Nuestro versículo empieza con וְאֵלֶּה. Añade. Se encadena con la lista de Ishmael que acaba de terminar. Y eso es peligroso: significa que las toldot de Itzjak quedan enganchadas a esa genealogía, y que Yaakov podría quedar contado en el mismo saco que Esav.`,
          `La vav ausente es lo que lo salva. La escritura defectiva, que en Gn 2:4 era la herida del mundo, aquí es un corte deliberado: separa, excluye, protege. La misma ausencia que en un lugar significa pérdida en otro significa rescate. Esto es el filo doble en estado puro, y no lo inventamos nosotros: está en el midrash, en el mismo párrafo, con quince líneas de distancia.`,
          `Y hay un detalle más, que mi propia concordancia puso sobre la mesa y que encaja con esta lógica: el único encabezado del Tanaj escrito sin ninguna vav es el de Ishmael (Gn 25:12), siete versículos antes del de Itzjak. Si una vav ausente separa, dos vavs ausentes separan más. La escritura más vacía del Tanaj está sobre la línea que el relato va a dejar atrás; la escritura plena, al final de Rut, está sobre la línea que llega hasta David. Entre los dos extremos, Itzjak: una vav puesta, una vav quitada. Ni descartado ni completo. En camino.`,
          `La voz jasídica. El Baal Shem Tov enseñó que no hay descenso que no sea para un ascenso (yeridá letzórej aliyá), y sus discípulos leyeron la ausencia como una forma del ocultamiento divino que invita al trabajo del hombre. Aquí la Torá lo escribe con tinta: deja un hueco del tamaño de una letra en la palabra que significa «lo que sale de ti». El Sefat Emet, heredero de esa escuela, dio el paso siguiente y lo dijo sin rodeos: las toldot vienen por bitul, por el anularse. El hueco en la palabra no es un error que haya que tapar. Es el espacio donde cabe el que engendra. Un recipiente lleno no recibe.`,
        ],
      },
      {
        head: "סוֹד — Sod",
        parrafos: [
          `En el registro místico la palabra deja de hablar de familias y empieza a hablar de la estructura misma de la realidad.`,
          `El Zohar lo dijo en la cita que ya trajimos: quien «hace toldot» es el río que fluye y no se interrumpe jamás, y el Baal HaSulam lo nombró: Yesod, el canal, que vierte en la Nukvá, el recipiente. Toldot, en Sod, es el nombre del derrame — del shefá que baja por los mundos. Engendrar es la palabra con que la Cabalá describe la emanación.`,
          `De ahí que Gn 2:4 no sea una metáfora decorativa cuando dice «las toldot del cielo y la tierra». Es el enunciado más literal del sistema: la Creación entera es un parto. No una fabricación, no un montaje. Algo que salió de una fuente y sigue saliendo. Por eso Ramban leyó esas toldot como lluvia y cosecha: lo que baja y lo que sube, sin parar, desde el principio.`,
          `Y por eso la vav. En la estructura del Nombre de cuatro letras, יהו״ה, la vav es la tercera letra, la que conecta lo alto con lo bajo — el canal entre la hei superior y la hei final. La {{letter:vav|vav}} es el eslabón vertical del Nombre. Que la palabra toldot pierda su vav al entrar la muerte en el mundo significa, en el lenguaje del Sod, que el canal quedó dañado. No se rompió la fuente ni se rompió el recipiente: se dañó la conexión. La efusión sigue, pero llega disminuida. Las generaciones siguen, pero cada una muere.`,
          `Y el tikún no consiste en crear algo nuevo. Consiste en devolver una letra a su sitio. La redención, en la gramática de esta palabra, es una vav que vuelve.`,
          `El Zohar ya había enlazado esa reparación con Avraham al leer בְּהִבָּרְאָם (be-hibaram) como בְּאַבְרָהָם (be-Avraham) —las mismas letras reordenadas—, lectura que trae Bereshit Rabá 12:9 en nombre de Rabí Yehoshúa ben Korjá: el mundo fue creado por el mérito de Avraham, y las toldot del cielo y la tierra, que son Adam y Javá, «se establecieron por causa de Avraham» (Zohar, Jayei Sará 15:110). La palabra plena del segundo capítulo de la Torá ya contenía, escondido en sus letras, el nombre del hombre cuyo nieto abre nuestra parashá. Y la reparación que empieza en Avraham termina, según el midrash, en el hijo de Péretz.`,
        ],
      },
    ],
  },

  // ── 4. הִתְבּוֹנְנוּת ─────────────────────────────────────────────────────────
  hitbonenut: {
    intro: "Dejemos ahora los libros cerrados y quedémonos con lo que ya está dicho.",
    parrafos: [
      {
        texto: `Una palabra que significa lo que sale de ti está escrita, en casi todos los lugares donde aparece, con una letra de menos. Y la letra que le falta es la que sirve para unir.`,
      },
      {
        texto: `Piénsalo sobre tu propia vida. Lo que sale de ti —tus hijos, tu trabajo, lo que enseñas, lo que dejas— nunca sale completo. Siempre le falta algo. Siempre hay un eslabón que no llegaste a poner, una conexión que no alcanzaste a hacer, un pedazo que se perdió entre lo que quisiste dar y lo que realmente pasó. Esa sensación de que nada de lo que uno produce queda entero no es tu fracaso personal. Está escrita en la palabra. Es la condición de todo lo que engendra desde que el mundo es mundo.`,
      },
      {
        texto: `Y sin embargo la palabra no se escribió vacía. Conservó una vav. En casi todos los casos, una. Falta un eslabón, no faltan todos. Lo que sale de ti llega incompleto, pero llega.`,
      },
      {
        texto: `Hay algo más, y es lo más duro de mirar. Tener toldot es la señal de que uno va a morir. Lo que no engendra no muere; lo que engendra, muere. Engendramos porque no podemos quedarnos. Cada hijo, cada obra, cada enseñanza que uno pasa adelante es una confesión de que uno mismo no va a durar. La fertilidad y la mortalidad son la misma noticia dicha de dos maneras.`,
      },
      {
        texto: `Y aun así la Torá escribió la palabra entera dos veces. Una al principio, cuando todavía no había muerte. Y otra al final de un libro pequeño, sobre un hombre cuyo nombre significa «brecha», en una genealogía que nadie hubiera llamado gloriosa. No la escribió entera sobre Adam, ni sobre Nóaj, ni sobre Avraham, ni sobre Itzjak, ni sobre Yaakov. La escribió entera sobre el cielo y la tierra — y sobre Péretz. Es decir: la plenitud no está en el medio de la historia. Está en los dos extremos. Y en el medio, donde vivimos todos, se trabaja con una letra de menos.`,
      },
      {
        texto: `Y por último, el filo que da vuelta: a Itzjak le falta la vav para salvar a Yaakov. A veces lo que a uno le falta no es un castigo. Es un corte que lo separa de algo que no le corresponde. Hay ausencias en tu vida que son heridas y hay ausencias que son protecciones, y desde adentro se parecen muchísimo. La misma letra ausente, en el mismo libro, significa las dos cosas. Nadie puede decirte, mientras estás en medio, cuál de las dos es la tuya. Eso es exactamente lo que significa vivir entre los dos extremos de la palabra.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה ───────────────────────────────────────────────────────────────
  maase: {
    intro: "Una acción concreta para hoy, derivada de lo anterior.",
    etiqueta: "Rashí enseñó que las verdaderas toldot de un justo son sus buenas obras.",
    texto: `El Sefat Emet añadió que esas toldot solo salen por bitul: por reconocer que la fuerza de engendrar no es tuya. De ahí sale un trabajo preciso, no un sentimiento. 1. Identifica tu toldá de hoy. Antes de que termine el día, nombra una sola cosa que salió de ti: algo que hiciste, enseñaste, reparaste, escribiste, perdonaste. No la lista entera. Una. Esa es tu toldá del día. Si no encuentras ninguna, ese es el dato, y es información valiosa, no motivo de culpa. 2. Haz el gesto de Nóaj antes del gesto de la expansión. Sefat Emet dice que lo que engendra es el encogerse. Antes de empezar lo que vas a producir hoy —el trabajo, la conversación difícil, la clase, el video— detente treinta segundos y di, en tus palabras, que la fuerza de hacerlo no sale de ti. No es humildad decorativa: es la operación que, según la enseñanza, abre el canal. Un recipiente lleno no recibe. 3. La midá a trabajar esta semana: la vav. Ser el eslabón. Busca deliberadamente una conexión que esté rota o floja y pon la letra que falta: una llamada a alguien de la familia con quien se perdió el hilo, una deuda de gratitud sin pagar, un conocimiento que alguien te dio y que no has transmitido a nadie. Una. Esta semana. La vav no crea nada nuevo; solo une lo que ya existe y está separado. Eso es lo que estamos trabajando. 4. La conducta a cambiar: dejar de exigir el 846. La palabra está escrita con 840 en casi todas partes. Durante esta semana, cuando algo que produzcas salga incompleto —y va a salir incompleto— no lo descartes ni lo rehagas desde cero. Entrégalo con la letra de menos y sigue. La plenitud es de los extremos; en el medio se trabaja defectivo. Eso no es mediocridad: es la ortografía de la Torá. 5. Para quien lo necesite. El Arizal enseñó que los hijos no dependen del mérito sino de una raíz más alta que el mérito, y recomendó a quien espera hijos orar con esa intención. Si eso te toca, esta semana es la semana: la parashá entera empieza con un hombre orando frente a su esposa.`,
  },

  // ── 6. חֲתִימָה ───────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "La idea principal.",
        texto: `Toldot significa «lo que se hace salir de uno». Es la palabra con que la Torá nombra a la vez a los hijos de un hombre y al parto del universo entero. Y es una palabra a la que, en casi todo el Tanaj, le falta una letra.`,
      },
      {
        etiqueta: "El insight clave.",
        texto: `Esa letra es la vav, que vale seis y que sirve para unir. El midrash lo leyó como contabilidad exacta de una pérdida: las seis cosas que se le quitaron a Adam (Bereshit Rabá 12:6), o —más directamente— el momento en que entró la muerte al mundo (Shemot Rabá 30:3). Solo dos veces está escrita completa: sobre el cielo y la tierra, cuando aún no había muerte, y sobre Péretz, de quien viene aquel en cuyos días «destruirá a la muerte para siempre».`,
      },
      {
        etiqueta: "El insight espiritual.",
        texto: `El filo doble no es nuestro, es del midrash: a Itzjak le falta la vav para sacar a Yaakov de la cuenta de los malvados. La misma ausencia que en Bereshit es la herida del mundo, en nuestra parashá es el corte que salva. Lo que a uno le falta puede ser una herida o puede ser una protección, y desde adentro no se distinguen.`,
      },
      {
        etiqueta: "La aplicación práctica.",
        texto: `Vivimos en el 840, no en el 846. Lo que sale de nosotros sale con un eslabón de menos y así hay que entregarlo. Lo único que se nos pide es ser nosotros, donde podamos, la vav: el gancho que vuelve a unir lo que quedó suelto. La redención, en la gramática de esta palabra, no es un mundo nuevo. Es una letra que vuelve a su sitio.`,
      },
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  hemshej: [
    "¿Por qué el versículo de las toldot de Itzjak empieza mirando al padre? → {{study:rostro-isaac|El rostro que la burla no pudo borrar}}",
    "¿Quién es Péretz, y por qué la línea del Mashíaj pasa por el mayor escándalo de la Torá? → {{study:tamar|El velo que escondía al Mesías}}",
    "La letra que falta: ¿qué es exactamente una vav? → {{letter:vav|La vav — el gancho que une los mundos}}",
    "La letra que abre y cierra la palabra: la marca de tinta y la marca de sangre. → {{letter:tav|La tav — el sello}}",
  ],

  ctaRef: "Genesis 25:19",
};
