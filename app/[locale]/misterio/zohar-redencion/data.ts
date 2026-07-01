
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO 7 — הַזֹּהַר וְהַגְּאוּלָּה · El Zóhar y la Redención
//  Bloque II (La Estructura Oculta). Contenido del Sofer:
//  Desktop/Contenido/Mashiaj-AjaritHaYamim/study-07-zohar-redencion.md
//  Hero: גּוֹלָה=44 → גְּאוּלָּה=45 (una sola letra: el Alef).
//  Voseo del Maasé del .md normalizado a español neutro.
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "zohar-redencion",
  hero: {
    serielabel: "Serie «Del Enigma del Mashíaj al Ajarít HaYamim» · Estudio 7 — La Estructura Oculta",
    serielabelFa: "سری «از معمای ماشیح تا آخریتِ روزها» · مطالعهٔ ۷ — ساختارِ پنهان",
    he: "הַזֹּהַר וְהַגְּאוּלָּה",
    titulo: "El Zóhar y la Redención",
    tituloFa: "زوهر و رستگاری",
    ganchoEs:
      "El Zóhar dice algo escandaloso: cuando Israel está en el exilio, Dios también lo está. La redención no es solo nuestra. Es Suya.",
    ganchoFa:
      "زوهر چیزی شگفت می‌گوید: وقتی اسرائیل در تبعید است، خدا نیز هست. رستگاری تنها از آنِ ما نیست. از آنِ اوست.",
    par: {
      a: { he: "גּוֹלָה", rom: "Golá · exilio · 44", color: "red" },
      b: { he: "גְּאוּלָּה", rom: "Gueulá · redención · 45", color: "gold" },
      valor: "+ א",
    },
  },
  targum: {
    citas: [
      {
        label: "Versículo-ancla — la base talmúdica (Meguilá 29a, baraita de Rabí Shimón bar Yojai)",
        he: "תַּנְיָא, רַבִּי שִׁמְעוֹן בֶּן יוֹחַי אוֹמֵר: בּוֹא וּרְאֵה כַּמָּה חֲבִיבִין יִשְׂרָאֵל לִפְנֵי הַקָּדוֹשׁ בָּרוּךְ הוּא, שֶׁבְּכָל מָקוֹם שֶׁגָּלוּ — שְׁכִינָה עִמָּהֶן …",
        es: "Se enseñó: Rabí Shimón ben Yojai dice: «Ven y mira cuán amados son Israel ante el Santo, bendito sea: pues en todo lugar adonde fueron exiliados, la Shejiná fue con ellos…»",
        source: "Talmud Bavlí, Meguilá 29a",
      },
      {
        label: "Texto-ancla cabalístico — la Shejiná desciende al exilio (Zóhar, Shemot 1:5)",
        he: "מֵאִילָנָא דָּא נַפְקֵי תְּרֵיסַר שְׁבָטִין … וְאִינּוּן נַחְתּוּ בְּהַאי זֹהַר דְּלָא נַהֲרָא, לְגוֹ גָּלוּתָא דְּמִצְרַיִם …",
        es: "De este Árbol salen las doce tribus … y ellas descendieron en este resplandor que no ilumina (zóhar de'la nahara), hacia el interior del exilio de Egipto…",
        source: "Zóhar, Shemot 1:5",
      },
    ],
    parrafos: [
      `El "resplandor que no ilumina por sí mismo" (zóhar de'la nahara) es, en el lenguaje del Zóhar, la Maljut / Shejiná: la última sefirá, la que no tiene luz propia y solo refleja la que recibe de arriba. Y esa es la que baja al exilio con el pueblo. El nombre del proyecto —Jashmal— y el nombre del libro —Zóhar, "resplandor"— se tocan aquí: la redención es que ese resplandor vuelva a iluminar.`,
    ],
  },
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Nota del Sofer.",
        texto: `El Zóhar es, él mismo, el gran "comentarista místico". Por eso esta sección recoge tanto a los exégetas clásicos del verso del exilio como a los maestros de la Cabalá que lo desarrollaron. Cada voz conserva su acento.`,
      },
      {
        etiqueta: "Rashi (רַשִׁ\"י).",
        texto: `Sobre los versos del retorno (Devarim 30:3, veshav … et shevutejá), Rashi observa una sutileza gramatical célebre: el texto no dice vehéshiv ("Él hará volver" tu cautiverio), sino veshav ("Él volverá"). Rashi: "kivyajol" —"por así decirlo"— el Santo, bendito sea, regresa Él mismo junto con los exiliados, como si la Shejiná estuviera cautiva con ellos y volviera con ellos. Lección de Rashi: ya en el Pshat rabínico, la redención no es solo de Israel; es el regreso de Dios.`,
      },
      {
        etiqueta: "Ramban / Najmánides (רַמְבַּ\"ן).",
        texto: `Ramban —cabalista además de exégeta— enseña que la galut tiene una dimensión que rebasa lo político: hay un descenso de lo divino mismo hacia la dispersión, un "ocultamiento del Rostro" (hester panim). Para Ramban el destino de Israel y el estado de la Shejiná están entrelazados: la dispersión del pueblo es el signo visible de un exilio más alto. Su voz funda la teología que el Zóhar despliega: lo de abajo y lo de arriba sufren juntos y se reparan juntos.`,
      },
      {
        etiqueta: "Ibn Ezra (אִבְּן עֶזְרָא).",
        texto: `Sobrio y filológico, Ibn Ezra mantiene el Pshat: el exilio es histórico, real, geográfico; el retorno es concreto. Su voz nos guarda de un error que la mística puede inducir: convertir el sufrimiento real del destierro en pura metáfora. El Sod no anula el Pshat. La Shejiná "exiliada" no borra que hubo cuerpos reales caminando hacia Babilonia. El símbolo se apoya en una herida verdadera.`,
      },
      {
        etiqueta: "Abarbanel (אַבַּרְבְּנְאֵל).",
        texto: `Don Yitzjak Abarbanel —él mismo expulsado de Sefarad en 1492— lee el exilio como prueba con sentido: la dispersión no es abandono sino el largo camino por el cual Israel y, con él, la presencia divina en el mundo, llegan a la Gueulá. Su voz, escrita desde el destierro, encarna el tema del módulo: quien escribe sobre la Shejiná en el exilio, muchas veces escribe desde el suyo propio.`,
      },
      {
        etiqueta: "Malbim (מַלְבִּ\"ם).",
        texto: `Atento al matiz del lenguaje, Malbim distingue entre el exilio como castigo y el exilio como gestación. La precisión del profeta —que habla de "reunir" (kibutz) y no solo de "perdonar"— le dice que el destierro no es un paréntesis a borrar, sino un proceso que produce algo: junta lo disperso para devolverlo elevado. El exilio trabaja; no solo espera.`,
      },
      {
        etiqueta: "El Arizal — Cabalá luriana (הָאֲרִ\"י).",
        texto: `Aquí desciende la dimensión cósmica, y es la bisagra hacia los Módulos 8–10. El Arizal (cuyo sistema veremos en el Estudio 9) da la razón estructural de por qué la Shejiná está en el exilio: tras la Shevirat HaKelim —la ruptura de los vasos— las chispas de luz (nitzotzot) cayeron y quedaron atrapadas entre las cáscaras (kelipot). La Shejiná, la última sefirá, es la que "recoge" desde abajo esas chispas: por eso ella es la que está, literalmente, metida en el mundo roto, en el exilio del que tiene que extraerlas. La redención de la Shejiná = el Birur HaNitzotzot, la recolección de las chispas. Y nótese la gematría que abre el módulo: גּוֹלָה (Golá, exilio) = 44 y גְּאוּלָּה (Gueulá, redención) = 45 (verificado letra por letra: ג3+ו6+ל30+ה5 = 44; ג3+א1+ו6+ל30+ה5 = 45). Entre el exilio y la redención hay una sola letra de diferencia: la {{letter:alef|א, el Alef}} — el Uno, Dios mismo entrando en la palabra. El exilio es la redención a la que todavía le falta el Alef.`,
      },
    ],
    glosa: `Glosa para el lector: Shejiná (שְׁכִינָה, de shajén, "morar") = la Presencia divina que habita en el mundo; en la Cabalá es la sefirá Maljut, la décima, la que no tiene luz propia. Sefirá (pl. sefirot) = uno de los diez "rostros" o atributos por los que lo Infinito se relaciona con lo finito. Kelipot = "cáscaras", las envolturas que ocultan la luz. Nitzotzot = chispas de luz divina dispersas en la creación.`,
  },
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `En su sentido más simple, la enseñanza de Rabí Shimón bar Yojai (Meguilá 29a) es un consuelo: Israel nunca fue abandonado. Dondequiera que el pueblo fue arrastrado —Egipto, Babilonia, las naciones— la Presencia divina fue con él. El destierro no es el lugar donde Dios no está; es el lugar donde Dios decidió estar con el desterrado. En el plano llano: no hay exilio sin compañía divina.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la alusión)",
        parrafos: [
          `El Zóhar llama a la Shejiná "zóhar de'la nahara", el resplandor que no ilumina por sí mismo. Es una pista enorme. La luz que no tiene luz propia es la luna respecto del sol, el espejo respecto del rostro, la criatura respecto del Creador. El exilio es el estado en que ese espejo está vuelto hacia la oscuridad y solo refleja sombras. La redención no es crear una luz nueva: es girar el espejo hacia su fuente para que vuelva a resplandecer. La Shejiná en el exilio alude, así, a cada alma que ha perdido contacto con su origen y solo necesita volver a mirarlo.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash (la enseñanza homilética)",
        parrafos: [
          `Aquí entra la pareja de conceptos que es el corazón operativo de este módulo, y la voz jasídica del Baal Shem Tov integrada en el Drash. Itarutá diletata (אִתְעֲרוּתָא דִּלְתַתָּא), "el despertar de abajo": el esfuerzo humano — cuando el ser humano se mueve hacia Dios (una oración, un acto de bondad, una teshuvá) despierta una fuerza desde abajo. Itarutá dile'eila (אִתְעֲרוּתָא דִּלְעֵילָּא), "el despertar de arriba": la respuesta divina, la gracia que desciende.`,
          `El principio clásico del Zóhar (desarrollado a lo largo del Idra y de Ra'aya Mehemna) es que el despertar de arriba normalmente responde al despertar de abajo: "el estímulo de lo Alto depende del estímulo de lo bajo". Como el agua: cuando el vapor sube, la lluvia baja. El Besht hizo de esto una espiritualidad de la vida entera: cada acto humano, por pequeño que sea, "toca" lo de arriba. No hay gesto neutro. Tu teshuvá de hoy es un itarutá diletata que jala, literalmente, una respuesta del Cielo. La redención del mundo no espera pasivamente al Mashíaj: se la convoca desde abajo.`,
          `Pero el Zóhar guarda también el otro filo —y aquí Jashmal aplica su lógica de los Dos Filos (שְׁנֵי פִּיּוֹת)—: hay momentos en que el despertar viene primero de arriba, por pura misericordia, sin que abajo lo merezca. Es la diferencia entre la redención "en su tiempo" (be'itá, que llega aunque no la apresuremos) y la redención "apresurada" (ajishéna, que nuestro mérito acelera) de Sanedrín 98a, vista en el Módulo 4. El exilio se cierra de las dos maneras: lo que podamos despertar desde abajo, y lo que Dios, al fin, despierta desde arriba cuando el tiempo madura. La redención es una danza a dos voces.`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto), con la voz de Baal HaSulam",
        parrafos: [
          `Rav Yehuda Ashlag, el Baal HaSulam —cuyo comentario HaSulam ("la escalera") al Zóhar es la lectura sistemática moderna de esta obra— traduce todo esto a su lenguaje del deseo. Para él, "arriba" es la voluntad de dar (la naturaleza del Creador) y "abajo" es la voluntad de recibir (la naturaleza de la criatura). El exilio es el estado en que el recibir está vuelto sobre sí mismo —recibir para sí— y por eso está separado de su fuente, a oscuras. El itarutá diletata es el instante en que la criatura invierte su deseo: empieza a recibir para dar, a parecerse al Dador. Y entonces —itarutá dile'eila— la luz desciende, porque ya no hay disparidad de forma que la frene. La redención de la Shejiná, en clave de Baal HaSulam, es la equivalencia de forma entre la criatura y el Creador: cuando el de abajo quiere lo que quiere el de Arriba, los dos ya son uno, y el resplandor que no iluminaba vuelve a brillar.`,
          `El secreto último del módulo es escandaloso y exacto: cuando Israel está en el exilio, Dios también lo está. No porque a Dios le falte algo, sino porque Él se ató voluntariamente al destino de Su pueblo y de Su creación. La Shejiná —Su Presencia— está metida en el mundo roto, recogiendo chispas, esperando volver. Redimirla no es un favor que recibimos: es una obra que compartimos con Él. Su redención y la nuestra son una sola.`,
        ],
      },
    ],
    caja: {
      titulo: "El exilio es la Shejiná separada de su fuente; la redención es su reunión.",
      cuerpo:
        "Y esa reunión se teje a dos manos: el despertar de abajo (nuestro esfuerzo) y el despertar de arriba (la gracia divina) que se buscan hasta encontrarse.",
    },
  },
  hitbonenut: {
    intro: "Aquí no hay comentario nuevo ni fuentes nuevas; solo nos detenemos a interiorizar.",
    parrafos: [
      {
        etiqueta: "¿Qué me enseña este estudio?",
        texto: `Que nunca estuve solo en mi exilio. Lo que aprendí como abandono —"Dios me dejó en la oscuridad"— el Zóhar lo da vuelta: la Presencia divina bajó conmigo a la oscuridad. No estoy esperando que Dios venga a sacarme; Él ya está aquí adentro, conmigo, recogiendo chispas en el mismo lugar donde yo creía estar perdido.`,
      },
      {
        etiqueta: "¿Qué patrones veo?",
        texto: `Veo que el exilio y la redención están separados por una sola letra —el Alef, el Uno. Y veo el patrón de la danza a dos voces: abajo me muevo, arriba responde; o arriba se mueve, y abajo apenas tiene que abrir la puerta. La realidad no es un monólogo del Cielo ni una proeza solitaria del hombre. Es un diálogo. Mi parte importa y no lo es todo.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Si la Shejiná es "el resplandor que no ilumina por sí mismo", entonces hay en mí un espejo que solo brilla cuando mira a su fuente. Mi exilio personal es ese espejo vuelto hacia la sombra. Mi redención personal no pide que yo fabrique una luz que no tengo: pide que gire el espejo. Un itarutá diletata —un solo movimiento hacia la Luz— y el resplandor regresa.`,
      },
      {
        etiqueta: "¿Cómo se relaciona con la creación?",
        texto: `El mundo entero es una Shejiná en el exilio: la luz divina metida entre las cáscaras de lo cotidiano, esperando ser reconocida. Cada vez que alguien actúa con bondad despierta una respuesta de arriba; cada gesto santo es agua que sube para que baje la lluvia. La creación no está abandonada a su suerte: está en diálogo, verso y respuesta, hasta que el resplandor que no ilumina vuelva a iluminar el todo.`,
      },
    ],
  },
  maase: {
    intro: "Una acción concreta, realizable hoy, que nace de este estudio.",
    etiqueta: "Hoy, haz un solo itarutá diletata deliberado — un «despertar desde abajo».",
    texto: `Elige un gesto pequeño y concreto que normalmente dejarías para "cuando tenga ganas" o "cuando las condiciones estén dadas": una palabra de bondad a alguien que no te la pidió, una oración breve cuando no sientes nada, un acto de dar cuando preferirías recibir. Hazlo sin esperar sentir la respuesta primero. Esa es la enseñanza exacta del Zóhar: el de abajo se mueve antes, y el de arriba responde después. Al hacerlo, di en tu interior: "esto es agua que sube; confío en que bajará la lluvia." No esperes a sentir a Dios para moverte hacia Él. Muévete primero. La respuesta viene de arriba.`,
  },
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El Zóhar enseña que cuando Israel está en el exilio, la Shejiná —la Presencia divina— está exiliada con él. El exilio no es ausencia de Dios sino Dios metido en la oscuridad recogiendo chispas; la redención es la reunión de la Shejiná con su fuente, que es, a la vez, nuestra y Suya.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `La redención se teje a dos voces: itarutá diletata (el despertar desde abajo, nuestro esfuerzo) e itarutá dile'eila (el despertar desde arriba, la gracia). Normalmente lo de abajo convoca lo de arriba —agua que sube, lluvia que baja—, pero hay una redención be'itá que desciende por pura misericordia cuando el tiempo madura. Las dos caras son verdaderas (los Dos Filos).`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `גּוֹלָה (Golá, exilio) = 44 · גְּאוּלָּה (Gueulá, redención) = 45. Una sola letra los separa: la א (Alef), el Uno, Dios mismo. El exilio es la redención a la que todavía le falta entrar el Alef. La Shejiná es "zóhar de'la nahara", el resplandor que no ilumina por sí mismo: redimirla no es crear una luz nueva sino girar el espejo hacia su fuente.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Hacer hoy un gesto deliberado de "despertar desde abajo" —dar, orar, bendecir antes de sentir— confiando en que el movimiento humano convoca la respuesta divina. Mover el agua para que baje la lluvia.`,
      },
    ],
  },
  hemshej: [
    "{{study:exilio-redencion|Si la Shejiná está exiliada con nosotros, ¿qué es ese “corazón nuevo y espíritu nuevo” que los profetas prometen al regreso?}}",
    "{{study:tikunei-zohar|¿Cómo se repara concretamente el exilio de la Shejiná? El Tikunei HaZóhar lo convierte en método: el tikún de las letras divinas.}}",
    "{{study:jasidut-redencion|Si el despertar empieza abajo, en mí, ¿cómo es la redención interior del jasidut, chispa por chispa, en lo más ordinario del día?}}",
    "{{study:el-ari|¿Por qué cayeron las chispas en primer lugar? La “física” del exilio está en el sistema del Arí: Tzimtzum, Shevirá y Tikún.}}",
  ],
  ctaRef: "Ezekiel 1:4",
};

