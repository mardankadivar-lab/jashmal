import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  MISTERIO — Haazinú / Hester Panim · el ocultamiento del rostro
//  Serie «Parashá» (Haazinú, Devarim 32:20). Se lee el Shabat 19 de septiembre
//  de 2026 = 8 de Tishrei 5787 = SHABAT SHUVÁ, víspera de Yom Kipur.
//
//  Contenido verificado por el Sofer: scratchpad/estudio-hester-panim.md
//  (cabecera de verificación fechada 2026-09-18; 15 afirmaciones cotejadas
//  contra el texto original en Sefaria, letra por letra).
//
//  POR QUÉ SERIE «PARASHÁ» Y NO «TIEMPOS SAGRADOS»:
//  el ancla es un versículo de la parashá de la semana (Devarim 32:20), y esta
//  página continúa la cadena de lectura de Devarim que ya está en el catálogo:
//  eikev-talon (16.7) → reeh-ojo-doble (16.8) → buey-y-burro / Ki Tetzé (16.9)
//  → bendicion-invertida / Ki Tavó (16.95) → hester-panim / Haazinú (16.97).
//  La serie «moadim» es la columna del año litúrgico y Yom Kipur ya tiene sus
//  dos estudios ahí (yom-kipur 19.2 · kol-nidrei 19.25); meter un tercero
//  rompería esa columna. El ángulo de Shabat Shuvá y de la víspera de Yom
//  Kipur vive en la `fecha` del hero, en el serielabel y en el umbral הֶמְשֵׁךְ,
//  que enlaza a los dos estudios del día.
//
//  ROTULADO OBLIGATORIO DEL SOFER (no negociable, aplicado en todo el archivo)
//   · Julín 139b («¿De dónde está Ester en la Torá? — וְאָנֹכִי הַסְתֵּר אַסְתִּיר»)
//     está VERIFICADO palabra por palabra y va como cita.
//   · El doble ocultamiento NO es tradición oral: está ESCRITO, con texto
//     exacto, en Keter Shem Tov 1:55 (Baal Shem Tov) y en Likutei Moharan 56:3
//     (R. Najman). Se citan como tales, nunca como «se dice que».
//   · CORRECCIÓN: Haazinú NO se escribe «אריח על גבי לבינה» — esa es la regla
//     general de los cantos (Meguilá 16b) y describe sobre todo el Canto del
//     Mar. Haazinú se escribe según Shulján Aruj, Yoré Deá 275:5: setenta
//     líneas, cada una con un hueco EN EL MEDIO, de modo que cada línea queda
//     partida en dos. El «en el medio» es el detalle: la frase sigue del otro
//     lado. Circula mal; aquí no.
//   · DOS FILOS genuino sobre «אֶרְאֶה מָה אַחֲרִיתָם»: Sforno lo lee como
//     desesperanza («no hay en ellos esperanza de retorno»); Ibn Ezra lo lee
//     como PLAZO («hasta que vea qué harán en su angustia») y rechaza
//     explícitamente la lectura fatalista; Ramban lo compara con «descenderé y
//     veré» (Bereshit 18:21). Los tres deben aparecer: son el corazón.
//   · NO LOCALIZADO: ninguna fuente clásica liga hester panim con la Neilá. Se
//     declara así, en el aviso y en la nota de autor. En su lugar el Sofer usa
//     el eslabón real: Tzror HaMor a Bamidbar 6:23 (la Bendición Sacerdotal
//     como antítesis explícita del hester panim).
//   · GEMATRÍA: la ÚNICA cifra permitida es סתר 660 / אסתר 661 — una álef muda
//     de diferencia. Aritmética verificada (ס60+ת400+ר200 = 660; +א1 = 661).
//     La LECTURA es de Jashmal y por eso NO vive en el cuerpo del estudio:
//     vive en la nota de autor (jidush), como en /misterio/kol-nidrei con el
//     314. En סוֹד solo queda el puntero. PROHIBIDO forzar אסתר 661 con
//     הסתר 665: el vínculo es morfológico (raíz ס־ת־ר) y lo afirma el Talmud,
//     que es más fuerte que cualquier número.
//   · PROHIBIDO 358 / «serpiente = mashíaj»: no pertenece a este estudio.
//
//  BONUS VERIFICADOS QUE SÍ ENTRAN
//   · Yoma 29a (R. Asi) — «מָה שַׁחַר סוֹף כָּל הַלַּיְלָה — אַף אֶסְתֵּר סוֹף כָּל הַנִּסִּים».
//   · Hoshea 5:15 — «עַד אֲשֶׁר… וּבִקְשׁוּ פָנָי; בַּצַּר לָהֶם יְשַׁחֲרֻנְנִי»,
//     misma raíz שַׁחַר, y del mismo profeta sale la haftará de Shabat Shuvá
//     (Hoshea 14, «שׁוּבָה יִשְׂרָאֵל»).
//   · Sefat Emet, Purim 22:2 — el «Anojí» del ocultamiento es el «Anojí» de los
//     Diez Mandamientos; en Purim se reaceptó la Torá «en días de ocultamiento
//     de rostro», de abajo hacia arriba.
//   · Tehilim 27:8; Mishná Berurá 581:2 (se dice dos veces al día desde Rosh
//     Jodesh Elul hasta Yom Kipur); Vayikrá Rabá 21:4.
//
//  CUIDADO DE TONO (directriz de gerencia, acatada en toda la página):
//  el tema toca a mucha gente que ha rezado sin sentir respuesta. La página NO
//  dice que Dios castiga con el silencio, y NO ofrece consuelo barato ni
//  promete que «pronto vas a sentir Su presencia». La tesis es doble y sobria:
//  OCULTAMIENTO NO ES AUSENCIA, y el ocultamiento tiene plazo.
//
//  El bloque «PARA REDES» del markdown del Sofer NO va en esta página.
//
//  IDIOMA: el análisis está en español. Los campos *Fa replican el español a
//  propósito (fallback), como en /misterio/bendicion-invertida y
//  /misterio/reeh-ojo-doble: el Sofer aún no tradujo este estudio al farsi y
//  este departamento NO genera farsi por su cuenta. Cuando llegue la
//  traducción verificada se reemplaza aquí y en lib/content/misterios.ts.
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "hester-panim",
  hero: {
    serielabel: "Serie «Parashá» · Haazinú — Devarim 32:20 · Shabat Shuvá",
    serielabelFa: "Serie «Parashá» · Haazinú — Devarim 32:20 · Shabat Shuvá",
    he: "הַסְתֵּר אַסְתִּיר",
    titulo: "El ocultamiento del rostro",
    tituloFa: "El ocultamiento del rostro",
    ganchoEs:
      "Si has rezado y no sentiste que nadie contestara, este estudio es sobre eso. No va a decirte que no pasó: va a decirte qué nombre le puso la Torá. Y va a mostrarte dos cosas que casi nunca se cuentan — que el versículo del ocultamiento no termina en el ocultamiento, sino en «veré cuál será su fin», y que el canto donde está escrito se copia, por ley, con un hueco en el medio de cada renglón.",
    ganchoFa:
      "Si has rezado y no sentiste que nadie contestara, este estudio es sobre eso. No va a decirte que no pasó: va a decirte qué nombre le puso la Torá. Y va a mostrarte dos cosas que casi nunca se cuentan — que el versículo del ocultamiento no termina en el ocultamiento, sino en «veré cuál será su fin», y que el canto donde está escrito se copia, por ley, con un hueco en el medio de cada renglón.",
    dimensiones: [
      { es: "Ocultamiento no es ausencia", fa: "Ocultamiento no es ausencia" },
      { es: "El «veré» es un plazo: «hasta»", fa: "El «veré» es un plazo: «hasta»" },
      { es: "Setenta líneas, un hueco en medio de cada una", fa: "Setenta líneas, un hueco en medio de cada una" },
    ],
    fecha: "Shabat Shuvá · 8 Tishrei 5787 · 19 sep 2026 — víspera de Yom Kipur",
    backHref: "/misterios",
    backLabel: "← Misterios",
    backLabelFa: "→ اسرار",
  },

  // ── Advertencia de integridad (no es sección de estudio) ─────────────────────
  aviso: {
    titulo: "Nota del Sofer — cuatro cosas que este estudio NO afirma",
    rotulo:
      "Se dicen de entrada, antes de entrar en materia, para que nadie confunda una lectura nuestra con una fuente — y para que nadie salga de aquí con una idea cruel en la mano.",
    parrafos: [
      `Primero, y es lo más importante: este estudio NO dice que Dios te castiga con el silencio, ni que si no sientes nada es porque hiciste algo mal. Ningún comentarista lee así el versículo. Rashí habla de una crianza que no se nota; el Ramban, de un hijo sin quien lo críe. Es lenguaje de familia, no de tribunal. Y el texto habla de un pueblo entero y de una época, no del mérito de una persona: quien convierta esto en culpa individual no lo estará haciendo con nosotros.`,
      `Segundo, y por la misma razón: NO prometemos que «pronto vas a sentir Su presencia». No lo sabemos, y prometerlo es consuelo barato que se paga caro. Lo que sí está en las fuentes, y es lo que sostiene esta página, es otra cosa, más sobria y más fiable: el ocultamiento tiene un «hasta».`,
      `Tercero, sobre un puente que muchos dan por hecho. Se repite que el hester panim es el tema de la Neilá, la última oración de Yom Kipur. El Sofer buscó una fuente clásica que ligue las dos cosas —en los comentarios a Devarim 31:17-18 y 32:20, en la literatura de Yom Kipur (Sefat Emet, Peri Tzadik, Mareh Yejezkel) y por texto— y NO LA ENCONTRÓ. Así se declara. El eslabón que sí existe, y que sirve mejor, es la Bendición Sacerdotal: el Tzror HaMor (Bamidbar 6:23) pone los dos versículos en la misma frase, y ese pasaje se cita entero más abajo. El puente con la Neilá, si se usa, se usa como lectura nuestra — y vive abajo, en la nota de autor, no en el cuerpo del estudio.`,
      `Cuarto, una corrección de dato que circula mal incluso en sitios serios. Se dice que Haazinú se escribe «אָרִיחַ עַל גַּבֵּי לְבֵינָה», ladrillo sobre media viga. No es así: esa es la regla general de los cantos (Meguilá 16b) y describe sobre todo el Canto del Mar. Haazinú tiene su propia forma, y la fija el Shulján Aruj, Yoré Deá 275:5: setenta líneas, cada una con un hueco EN EL MEDIO. La realidad es mejor que el error, y está en el Remez.`,
    ],
  },

  // ── Mapa del argumento (no es sección de estudio) ────────────────────────────
  mapa: {
    titulo: "Mapa del argumento — seis textos, una sola pregunta",
    intro: [
      `La pregunta es una: ¿qué es exactamente lo que pasa cuando buscas y no encuentras? El estudio la recorre en seis pasos, y cada paso tiene su texto. Dos son de la Torá, uno es del Talmud, uno es halajá —la forma física del rollo—, uno es jasídico y el último es profético. Este es el esqueleto, para que sepas hacia dónde vamos antes de entrar.`,
    ],
    filas: [
      {
        ref: "Devarim 32:20",
        he: "אַסְתִּירָה פָנַי מֵהֶם אֶרְאֶה מָה אַחֲרִיתָם",
        es: "Esconderé Mi rostro de ellos, veré cuál será su fin",
        funcion: "El ancla. Y fíjate: la frase no termina en el ocultamiento.",
      },
      {
        ref: "Devarim 31:18",
        he: "וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי",
        es: "Y Yo esconder esconderé Mi rostro",
        funcion: "El verbo doblado. De aquí sale todo lo demás.",
      },
      {
        ref: "Julín 139b",
        he: "אֶסְתֵּר מִן הַתּוֹרָה מִנַּיִן? — וְאָנֹכִי הַסְתֵּר אַסְתִּיר",
        es: "¿De dónde está Ester en la Torá? — De «y Yo esconder esconderé»",
        funcion: "El nombre de Ester es la palabra «escondido». Misma raíz: ס־ת־ר.",
      },
      {
        ref: "Shulján Aruj, Yoré Deá 275:5",
        he: "כָּל שִׁיטָה יֵשׁ בָּאֶמְצַע רֶוַח אֶחָד… בְּשִׁבְעִים שִׁיטוֹת",
        es: "Cada línea tiene en el medio un espacio… en setenta líneas",
        funcion: "El canto del ocultamiento tiene la forma de su propio tema.",
      },
      {
        ref: "Keter Shem Tov 1:55",
        he: "שֶׁאִם יֵדַע הָאָדָם שֶׁהַקָּבָּ\"ה מִסְתַּתֵּר שָׁם — אֵין זֶה הַסְתָּרָה",
        es: "Si la persona sabe que el Santo Bendito está escondido allí, eso ya no es ocultamiento",
        funcion: "El giro. El que sufre el silencio no está en el fondo del exilio.",
      },
      {
        ref: "Hoshea 5:15",
        he: "עַד אֲשֶׁר יֶאְשְׁמוּ וּבִקְשׁוּ פָנָי; בַּצַּר לָהֶם יְשַׁחֲרֻנְנִי",
        es: "Hasta que reconozcan su culpa y busquen Mi rostro; en su angustia me buscarán al alba",
        funcion: "La cláusula de terminación, dicha por un profeta. Y la raíz del alba.",
      },
    ],
    cierre: [
      `Un aviso de orientación para que el mapa se lea bien: el Shabat en que se lee esta parashá es Shabat Shuvá, «el Shabat del Retorno», y su haftará es de este mismo profeta, Hoshea 14: «שׁוּבָה יִשְׂרָאֵל» — «Retorna, Israel». El mismo profeta, el mismo tema, el mismo día. Al atardecer siguiente entra Yom Kipur.`,
    ],
  },

  // ── 1. תַּרְגּוּם ────────────────────────────────────────────────────────────
  targum: {
    citas: [
      {
        label: "Versículo-ancla — Devarim (Deuteronomio) 32:20, la parashá Haazinú",
        he: "וַיֹּ֗אמֶר אַסְתִּ֤ירָה פָנַי֙ מֵהֶ֔ם אֶרְאֶ֖ה מָ֣ה אַחֲרִיתָ֑ם כִּ֣י ד֤וֹר תַּהְפֻּכֹת֙ הֵ֔מָּה בָּנִ֖ים לֹא־אֵמֻ֥ן בָּֽם׃",
        es: "Y dijo: Esconderé Mi rostro de ellos, veré cuál será su fin; porque son una generación de vuelcos, hijos en los que no hay fidelidad.",
        source: "Devarim 32:20",
      },
      {
        label: "El ocultamiento simple — Devarim 31:17 (parashá Vayélej)",
        he: "וַעֲזַבְתִּים וְהִסְתַּרְתִּי פָנַי מֵהֶם… וְאָמַר בַּיּוֹם הַהוּא: הֲלֹא עַל כִּי אֵין אֱלֹהַי בְּקִרְבִּי מְצָאוּנִי הָרָעוֹת הָאֵלֶּה",
        es: "…los abandonaré y esconderé Mi rostro de ellos… y dirá en aquel día: ¿no será porque mi Dios no está dentro de mí que me han hallado estos males?",
        source: "Devarim 31:17",
      },
      {
        label: "El ocultamiento doblado — Devarim 31:18",
        he: "וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי בַּיּוֹם הַהוּא",
        es: "Y Yo, esconder esconderé Mi rostro en aquel día.",
        source: "Devarim 31:18",
      },
    ],
    parrafos: [
      `Targum (se pronuncia tar-GUM) quiere decir «traducción». Es donde empezamos siempre: qué dice el texto, exactamente, antes de que nadie lo interprete.`,
      `Palabra por palabra en el versículo-ancla. אַסְתִּירָה (astirá) — «esconderé», de la raíz ס־ת־ר (s-t-r): ocultar, tapar, poner detrás de algo. Guárdate esa raíz: va a volver, y cuando vuelva vas a entender de qué trata todo esto. פָנַי (panái) — «Mi rostro»; en hebreo panim es la palabra de la presencia, de la atención, de estar de frente a alguien. Y אֶרְאֶה מָה אַחֲרִיתָם (eré má ajaritám) — «veré cuál será su fin»: cuatro palabras rarísimas, que casi nadie comenta, y que son la mitad de este estudio.`,
      `El otro pasaje está en Vayélej, la parashá anterior, leída apenas dos semanas antes. Ahí el ocultamiento aparece dos veces, y la segunda es distinta. Este es el detalle que hay que ver con los ojos: en 31:18 el verbo aparece dos veces seguidas — הַסְתֵּר אַסְתִּיר, hastér astír. El hebreo hace esto para intensificar («ciertamente esconderé»). Pero los maestros leyeron el doblez como algo más literal: un ocultamiento del ocultamiento.`,
      `Y fíjate en el orden, porque el orden es el argumento. En el versículo 17 la persona todavía sabe: dice «esto me pasa porque mi Dios no está dentro de mí». Duele, pero sabe. En el 18 el ocultamiento se duplica — y ahí ya no queda ni siquiera esa frase. Ya no se pregunta nada.`,
    ],
  },

  // ── 2. מְפָרְשִׁים ───────────────────────────────────────────────────────────
  mefarshim: {
    parrafos: [
      {
        etiqueta: "El campo de batalla.",
        texto: `Mefarshim (me-far-SHIM) son los comentaristas clásicos: los maestros que a lo largo de mil años fueron anotando el texto línea por línea. No opinan lo mismo, y eso es lo bueno. En este versículo la pelea es justamente por las cuatro palabras que nadie comenta en redes: «אֶרְאֶה מָה אַחֲרִיתָם», veré cuál será su fin. De cómo se lea ese «veré» depende todo lo demás.`,
      },
      {
        etiqueta: "Rashí (Francia, 1040-1105), a Devarim 32:20 — el más literal.",
        texto: `«מַה תַּעֲלֶה בָהֶם בְּסוֹפָם» — «qué les sobrevendrá al final». No adorna. Registra que la frase mira hacia adelante, no hacia atrás: es un futuro abierto, no un veredicto. Y sobre «בָּנִים לֹא אֵמֻן בָּם» («hijos sin fidelidad») trae dos lecturas, y la segunda es demoledora por lo suave: emún también significa crianza — «אֵין גִדּוּלַי נִכָּרִים בָּהֶם», «no se nota en ellos lo que Yo crié». No dice «son malos». Dice: no se me ve en ellos. Es la queja de un padre, no la sentencia de un juez.`,
      },
      {
        etiqueta: "Ibn Ezra (España, 1089-1167), a Devarim 32:20 — el que abre la puerta.",
        texto: `Aquí está el hallazgo. Ibn Ezra registra dos lecturas posibles y rechaza la primera: «יֵשׁ אוֹמְרִים כִּי אֲנִי אַסְתִּיר פָּנַי מֵהֶם בַּעֲבוּר שֶׁאֲנִי רוֹאֶה מָה יַעֲשׂוּ בָּאַחֲרוֹנָה. וְהַנָּכוֹן שֶׁהוּא כְּמַשְׁמָעוֹ: עַד שֶׁאֶרְאֶה מָה יַעֲשׂוּ בַּצַּר לָהֶם» — «Algunos dicen: escondo Mi rostro PORQUE ya veo lo que harán al final. Pero lo correcto es el sentido llano: HASTA QUE VEA qué harán en su angustia». La lectura que rechaza es la fatalista: me escondo porque ya sé cómo terminan — ocultamiento como sentencia firmada. La que acepta convierte el ocultamiento en una palabra de tiempo: עַד שֶׁאֶרְאֶה, «hasta que vea». Un «hasta» tiene final. En la lectura que Ibn Ezra llama la correcta, el ocultamiento no es un destino: es una espera. Y lo que se espera es esto — qué haces tú cuando no sientes nada.`,
      },
      {
        etiqueta: "Ibn Ezra, la aclaración que el lector moderno necesita.",
        texto: `Sobre «אַסְתִּירָה פָנַי» precisa: «כְּדֶרֶךְ לְשׁוֹן בְּנֵי אָדָם» — «al modo del habla humana». Dios no tiene cara; «esconder el rostro» es un modo de hablar. Y define qué significa en la práctica, sin anestesia: «כַּאֲשֶׁר יְבַקְשׁוּנִי לֹא יִמְצְאוּ עֵזֶר» — «cuando me busquen, no encontrarán ayuda». Esa es la definición honesta, y no la vamos a suavizar: hester panim es cuando buscas y no encuentras.`,
      },
      {
        etiqueta: "Ramban / Najmánides (Girona, 1194-1270), a Devarim 32:20 — el que baja a ver.",
        texto: `El Ramban copia a Ibn Ezra entero, dice «hasta aquí las palabras de Rabí Abraham», y entonces agrega lo suyo. Primero, qué es ocultar el rostro: «וְהִנֵּה אַסְתִּירָה פָנַי — שֶׁאֲסַלֵּק שְׁכִינָתִי», «esconderé Mi rostro significa que retiraré Mi Shejiná». La Shejiná es la Presencia divina que habita dentro del mundo. Ojo al verbo: retirar no es dejar de existir, es dejar de habitar ahí. El Ramban está midiendo la herida con precisión — no se fue Dios; se fue el habitar.`,
      },
      {
        etiqueta: "Ramban, el movimiento más fino del pasaje.",
        texto: `«וְטַעַם אֶרְאֶה מָה אַחֲרִיתָם, כְּטַעַם אֵרְדָה נָּא וְאֶרְאֶה» — «y el sentido de veré cuál será su fin es como el de "descenderé y veré"». «אֵרְדָה נָּא וְאֶרְאֶה» es Bereshit 18:21: lo que Dios dice antes de Sodoma. Un Dios que lo sabe todo anuncia que va a bajar a ver. Los maestros siempre entendieron esa frase como la firma de un juez que no condena por expediente: baja, mira de cerca, se deja convencer por lo que encuentre. El Ramban acaba de meter esa misma frase dentro del versículo del ocultamiento. Dios no dice «ya está, vi suficiente». Dice: me retiro, y desde ahí sigo mirando. El rostro se esconde; los ojos no se cierran.`,
      },
      {
        etiqueta: "Ramban, el susurro cabalístico.",
        texto: `Sobre «בָּנִים לֹא אֵמֻן בָּם» escribe: «כִּי אֵין לָהֶם אוֹמֵן וּמְגַדֵּל, וְהַמַּשְׂכִּיל יָבִין» — «porque no tienen nodriza ni quien los críe, y el entendido entenderá». Esa fórmula, «el entendido entenderá», es la señal con que el Ramban marca un secreto cabalístico que no va a explicar en voz alta. La «nodriza» que falta es la Shejiná misma. O sea: el dolor del versículo no es el castigo. Es la orfandad. Un hijo sin quien lo críe. Volveremos a eso en el Sod.`,
      },
      {
        etiqueta: "Sforno (Italia, 1475-1550), a Devarim 32:20 — el filo opuesto.",
        texto: `Para que veas que no estamos escogiendo solo lo bonito. El Sforno lee exactamente al revés: «רוֹאֶה אֲנִי שֶׁאֵין בָּהֶם תִּקְוַת תְּשׁוּבָה בָּאַחֲרִית» — «veo que no hay en ellos esperanza de retorno al final». Esta es la lectura dura, la que Ibn Ezra había rechazado, sostenida por un grande. Hay que decirlo: el pshat tiene un filo negro. No lo escondemos.`,
      },
      {
        etiqueta: "Dos Filos — el filo oscuro y el filo de luz, con nombre y apellido.",
        texto: `Del lado oscuro, Sforno: «veo que NO HAY esperanza de retorno» — el «veré» es un diagnóstico cerrado, y el ocultamiento es la conclusión. Del lado de la luz, Ibn Ezra: «HASTA que vea qué harán en su angustia» — el «veré» es un plazo abierto, y el ocultamiento es el compás de espera. Y del mismo lado, Ramban: «veré» = «descenderé y veré», el juez que baja a mirar de cerca antes de decidir. Dos de los tres pesos pesados leen el versículo como una espera con fecha de vencimiento. Y ninguno de los tres se limita a «Dios se enojó». Esa versión —la que se ve en redes— no es de ningún comentarista. Es de nadie.`,
      },
      {
        etiqueta: "El doble ocultamiento — quién lo dijo, exactamente.",
        texto: `Esta lectura circula atribuida a todo el mundo, y por eso hay que decir dónde está escrita: en dos de las obras centrales del jasidismo, con texto. Baal Shem Tov (Ucrania, 1698-1760), citado en Keter Shem Tov 1:55: «שֶׁאִם יֵדַע הָאָדָם שֶׁהַקָּבָּ"ה מִסְתַּתֵּר שָׁם — אֵין זֶה הַסְתָּרָה… וְזֶהוּ שֶׁכָּתוּב "וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי": פֵּרוּשׁ, שֶׁיַּסְתִּיר שֶׁלֹּא יֵדְעוּ שֶׁהַקָּבָּ"ה שָׁם בְּהַסְתָּרָה» — «si la persona sabe que el Santo Bendito está escondido allí, eso ya no es ocultamiento… y esto es lo que dice "y Yo esconder esconderé Mi rostro": que esconderá de modo que no sepan que el Santo Bendito está allí, en el ocultamiento».`,
      },
      {
        etiqueta: "Rabí Najman de Breslev (Ucrania, 1772-1810), Likutei Moharan 56:3.",
        texto: `«"הַסְתֵּר אַסְתִּיר" — הַיְנוּ שֶׁיַּסְתִּיר אֶת הַהַסְתָּרָה… וְלֹא יֵדַע כְּלָל שֶׁהַשֵּׁם יִתְבָּרַךְ נִסְתָּר מִמֶּנּוּ» — «"esconder esconderé" — es decir, que esconderá el ocultamiento mismo… y no sabrá en absoluto que Dios está escondido de él». La lectura, entonces, está localizada: no es «se dice que». Y entiende lo que están diciendo, porque es lo contrario de lo que parece. Ocultamiento simple: lo buscas y no lo encuentras — duele, y por eso mismo lo estás buscando. Ocultamiento doble: ya ni se te ocurre buscar; no duele. Y eso es peor. El que sufre el silencio de Dios no está en el exilio profundo: está en la superficie. La frase del Baal Shem Tov es una puerta — si sabes que está escondido, ya no está escondido. El que sabe que falta algo ya tiene el hilo en la mano.`,
      },
      {
        etiqueta: "Tzror HaMor (Rabí Avraham Sabá, expulsado de España en 1492), a Bamidbar 6:23 — la fuente que ata el nudo.",
        texto: `Comentando la Bendición Sacerdotal escribe: «"יִשָּׂא ה' פָּנָיו אֵלֶיךָ" — שֶׁיָּרִים אֵלֶיךָ פָּנָיו וְיַבִּיט בְּךָ בְּעַיִן יָפָה, פָּנִים בְּפָנִים… וְלֹא יִכְבֹּשׁ פָּנָיו לְמַטָּה… וְכֵן אָמַר "וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי"» — «"Alce Hashem Su rostro hacia ti" — que levante hacia ti Su rostro y te mire con buen ojo, cara a cara… y no baje Su rostro… como dijo: "y Yo esconder esconderé Mi rostro"». Un comentarista del siglo XV pone los dos versículos en la misma frase. La Bendición Sacerdotal —la bendición más repetida del judaísmo— es palabra por palabra la antítesis del hester panim: una pide que el rostro se ALCE, la otra advierte que el rostro se BAJA. Es la misma imagen con el signo invertido. Y esa bendición se dice todos los días.`,
      },
    ],
    glosa: `Glosa para el lector: hester panim (הֶסְתֵּר פָּנִים) = «ocultamiento del rostro», el término técnico para el estado en que se busca y no se encuentra. Raíz ס־ת־ר = esconder, tapar. panim = rostro, presencia, atención. Shejiná (שְׁכִינָה) = la Presencia divina que habita dentro del mundo; su raíz significa «morar». Mefarshim = los comentaristas clásicos. Pshat = el sentido llano. Haftará = la lectura profética que acompaña a la parashá. Shabat Shuvá = el Shabat entre Rosh Hashaná y Yom Kipur, «el Shabat del Retorno». Keter Shem Tov = antología de enseñanzas del Baal Shem Tov. Likutei Moharan = la obra mayor de Rabí Najman de Breslev. Tzror HaMor = comentario a la Torá de Rabí Avraham Sabá (s. XV-XVI). Sefat Emet = Rabí Yehudá Arié Leib de Gur (1847-1905).`,
  },

  // ── 3. פרד״ס ─────────────────────────────────────────────────────────────────
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat (el sentido llano)",
        parrafos: [
          `No lo vamos a endulzar. El pshat de Haazinú es duro: un pueblo traiciona un pacto y la consecuencia es que Dios se retira. La expresión no es «Dios castiga»; es más fría y más exacta: Dios deja de estar de frente. Ibn Ezra lo define sin anestesia — «cuando me busquen, no encontrarán ayuda».`,
          `Si has rezado sin sentir respuesta, el pshat no te contradice. Te da un nombre para lo que viviste, y esa es la primera cosa que hace este texto por ti, y no es poca: la Torá tiene una palabra técnica para «recé y no sentí nada». No estás fuera del mapa. Estás en una casilla que tiene nombre.`,
        ],
      },
      {
        head: "רֶמֶז — Remez (la insinuación), y las dos son visuales",
        parrafos: [
          `Primera: la forma del canto en el rollo. Haazinú no se escribe como el resto de la Torá. El Shulján Aruj —el código legal del siglo XVI— lo ordena así, Yoré Deá 275:5: «צוּרַת שִׁירַת הַאֲזִינוּ: כָּל שִׁיטָה יֵשׁ בָּאֶמְצַע רֶוַח אֶחָד, וְנִמְצֵאת כָּל שִׁיטָה חֲלוּקָה לִשְׁתַּיִם, וְכוֹתְבִים אוֹתָהּ בְּשִׁבְעִים שִׁיטוֹת» — «la forma del Canto de Haazinú: cada línea tiene en el medio un espacio, de modo que cada línea queda partida en dos, y se escribe en setenta líneas». Dos columnas, y un vacío en el centro de cada renglón. Setenta renglones, setenta huecos.`,
          `El canto que anuncia el ocultamiento del rostro está escrito, por ley, con un hueco en el medio. No es una metáfora que inventamos: es lo que el escriba tiene que hacer con su pluma, y si no lo hace, el rollo no sirve. El texto tiene la forma de su propio tema.`,
          `Y todavía algo más, que es el detalle que lo cambia todo: el hueco no está al final de la línea. Está en el medio. Un hueco al final sería el fin de la frase. Un hueco en el medio significa que la frase continúa del otro lado. Cada renglón de Haazinú te obliga a cruzar un vacío para llegar a la segunda mitad. Eso es una instrucción de lectura, y es una instrucción de vida. (Nota de exactitud: la regla que suele citarse, «ladrillo sobre media viga» —Meguilá 16b—, describe los cantos en general y sobre todo el Canto del Mar. Haazinú tiene su propia forma, la de arriba. Lo verificamos porque circula mal.)`,
          `Segunda: la palabra con la que empieza el versículo. Devarim 31:18 abre con «וְאָנֹכִי הַסְתֵּר אַסְתִּיר פָּנַי» — «Y YO esconder esconderé Mi rostro». אָנֹכִי (Anojí) es «Yo». Y es también la primera palabra de los Diez Mandamientos: «אָנֹכִי ה' אֱלֹהֶיךָ», «Yo soy Hashem tu Dios» (Shemot 20:2) — la palabra con la que Dios se presenta en el Sinaí, delante de todo un pueblo, a plena luz.`,
          `El Sefat Emet lo señala explícitamente en su enseñanza de Purim: «וְאָנֹכִי הוּא אָנֹכִי דַּעֲשֶׂרֶת הַדִּבְּרוֹת» — «y ese Anojí es el Anojí de los Diez Mandamientos» (Sefat Emet, Purim 22:2). El «Yo» que se esconde es el mismo «Yo» que se reveló. Es exactamente el mismo sujeto. El versículo no dice «Yo me voy». Dice «Yo me escondo» — y para esconderse hay que seguir estando.`,
        ],
      },
      {
        head: "דְּרָשׁ — Drash (la búsqueda)",
        parrafos: [
          `En el Talmud, tratado Julín, folio 139b, hay un pasaje encantador: los habitantes de Papunia le hacen adivinanzas a Rav Matná. ¿Dónde está insinuado Moshé en la Torá, antes de nacer? ¿Dónde está insinuado Hamán? Y entonces: «אֶסְתֵּר מִן הַתּוֹרָה מִנַּיִן? — "וְאָנֹכִי הַסְתֵּר אַסְתִּיר"» — «¿De dónde está Ester en la Torá? — De "y Yo esconder esconderé"». Verificado palabra por palabra; está ahí, en el original.`,
          `Entiende lo que acaba de pasar, porque es de las cosas más finas de toda la tradición. אֶסְתֵּר (Ester) y הַסְתֵּר (hastér, «esconder») son la misma raíz: ס־ת־ר. El nombre de la heroína del libro es, literalmente, la palabra «escondido». Y ahora el remate: el Libro de Ester es el único libro del Tanaj en el que el Nombre de Dios no aparece de forma explícita, ni una sola vez. Todo el libro es una cadena de casualidades —un rey que no puede dormir, una reina destituida a tiempo, un registro que se lee la noche exacta— donde Dios nunca aparece y sin embargo todo encaja.`,
          `El único libro del Tanaj donde Dios está escondido lleva por nombre la palabra «escondido». Eso no es un juego de palabras: es una tesis teológica entera comprimida en un nombre. Y la Torá la plantó siglos antes de que Ester naciera, dentro del versículo del ocultamiento. El versículo que anuncia la desaparición del rostro es también el versículo donde está escondido el nombre de la mujer que salva a su pueblo sin que Dios se muestre nunca. Ocultamiento no es ausencia: ocultamiento es el modo de operar del Libro de Ester.`,
          `El Sefat Emet (Purim 22:2) lleva esto a su conclusión, y es la enseñanza que salva este estudio de terminar en tristeza: «"הָדָר קַבְּלוּהָ בִּימֵי אֲחַשְׁוֵרוֹשׁ" — בִּימֵי הַסְתָּרוֹת פָּנִים… וּבָזֶה אֵין עַיִן רָע שׁוֹלֶטֶת… בְּקַבָּלַת הַתּוֹרָה הָיָה מִלְמַעְלָה לְמַטָּה, וּבְפוּרִים הָיָה מִלְּמַטָּה לְמַעְלָה» — «"volvieron a aceptarla en los días de Ajashverosh" — en los días de ocultamientos de rostro… y sobre eso no domina el mal de ojo… en la entrega de la Torá fue de arriba hacia abajo; en Purim fue de abajo hacia arriba».`,
          `Lo que está diciendo es esto: en el Sinaí, Dios se reveló y el pueblo aceptó la Torá — y a las pocas semanas hicieron el becerro de oro y las tablas se rompieron. En Purim, Dios no se mostró en absoluto, y la aceptación aguantó. Lo que se construye en el ocultamiento es más resistente que lo que se construye en la revelación: lo que se construye viéndolo todo depende de seguir viendo; lo que se construye a oscuras no depende de nada. Y por eso el Sefat Emet dice que sobre eso «no domina el mal de ojo» — lo que está escondido no se puede romper desde afuera.`,
          `Y el «hasta» de Ibn Ezra tiene una fecha, dicha por un profeta. Recuerda sus palabras: «hasta que vea qué harán EN SU ANGUSTIA» — בַּצַּר לָהֶם. Hoshea usa exactamente esas palabras: «אֵלֵךְ אָשׁוּבָה אֶל מְקוֹמִי עַד אֲשֶׁר יֶאְשְׁמוּ וּבִקְשׁוּ פָנָי; בַּצַּר לָהֶם יְשַׁחֲרֻנְנִי» (Hoshea 5:15) — «iré y volveré a Mi lugar HASTA QUE reconozcan su culpa y busquen Mi rostro; en su angustia me buscarán al alba». Ahí está el «hasta» completo. El ocultamiento tiene una cláusula de terminación, y la cláusula es: «hasta que busquen Mi rostro».`,
          `Y la última palabra, יְשַׁחֲרֻנְנִי (yeshajarúnni), viene de שַׁחַר (shájar): el alba. «Me buscarán al amanecer», y también «me buscarán con el amanecer». Guárdala treinta segundos — vuelve en el Sod. (Dato del calendario que no es casualidad menor: la haftará de este mismísimo Shabat, Shabat Shuvá, es de Hoshea, capítulo 14: «שׁוּבָה יִשְׂרָאֵל», «Retorna, Israel». El mismo profeta, el mismo tema, el mismo día.)`,
        ],
      },
      {
        head: "סוֹד — Sod (el secreto)",
        parrafos: [
          `Primero, el retiro que hace sitio. El Ramban definió hester panim como «retirar la Shejiná». En la Cabalá hay una palabra para el primer acto de la creación: צִמְצוּם (tzimtzum), «contracción». Antes de crear nada, la Luz Infinita se retira de un espacio, porque mientras lo llena todo no hay lugar para que exista nadie más. El primer gesto del amor divino, en el lenguaje de la Cabalá, es retirarse. No para abandonar: para dejar sitio a alguien que pueda ser alguien. Esto no convierte el dolor en algo bonito. Sí lo pone en su categoría: el retiro no es lo contrario de la relación — es la condición de que haya dos.`,
          `Segundo, la orfandad. El Ramban dijo: «no tienen quien los críe, y el entendido entenderá». El dolor del versículo no es el de un reo: es el de un hijo sin regazo. Y eso también es una medida — nadie sufre la ausencia de alguien que nunca fue suyo. El vacío tiene la forma exacta de lo que falta.`,
          `(Hay una tercera lectura, sobre la álef escondida dentro del nombre de Ester. Es nuestra, no de una fuente, y por eso no vive aquí: vive abajo, en la nota de autor, donde el lector la puede tomar o dejar.)`,
          `Y entonces, el amanecer — que sí es del Talmud. En Yoma 29a se pregunta por qué Ester es comparada con el alba, y responde Rabí Asi: «לָמָּה נִמְשְׁלָה אֶסְתֵּר לְשַׁחַר? לוֹמַר לָךְ: מָה שַׁחַר סוֹף כָּל הַלַּיְלָה — אַף אֶסְתֵּר סוֹף כָּל הַנִּסִּים» — «¿por qué se compara a Ester con el amanecer? Para decirte: así como el amanecer es el final de toda la noche, así Ester es el final de todos los milagros».`,
          `Cierra el círculo, y cierra con fuentes, no con frases: הַסְתֵּר (el ocultamiento) → אֶסְתֵּר (Ester) → שַׁחַר (el amanecer, el final de la noche). Y Hoshea, hablando del final del ocultamiento, había usado esa misma raíz: yeshajarúnni, «me buscarán al alba». El texto no promete que la noche sea corta. Dice algo más sobrio y más fiable: el amanecer es, por definición, el final de la noche. No es un premio por portarse bien. Es lo que la noche es — una cosa que se acaba.`,
        ],
      },
    ],
    caja: {
      titulo: "הַסְתֵּר → אֶסְתֵּר → שַׁחַר",
      cuerpo:
        "Del ocultamiento al nombre que lo lleva por nombre, y del nombre al alba. La cadena no la armamos nosotros: la raíz ס־ת־ר la afirma el Talmud (Julín 139b), la comparación con el amanecer la hace Rabí Asi (Yoma 29a), y el profeta que anuncia el final del ocultamiento usa esa misma raíz del alba (Hoshea 5:15). Ocultamiento no es ausencia — es un modo de estar presente que no se deja ver. Y tiene un «hasta».",
    },
  },

  // ── 4. הִתְבּוֹנְנוּת ─────────────────────────────────────────────────────────
  hitbonenut: {
    intro:
      "Hitbonenut (hit-bo-ne-NUT) es la contemplación: dejar de estudiar el texto y dejar que el texto te estudie a ti. Aquí no entra material nuevo ni fuentes nuevas; aquí se internaliza. Siéntate un momento con esto, sin apurarlo.",
    parrafos: [
      {
        texto: `El rostro escondido no es un rostro ausente. Es un rostro que sigue ahí, mirando desde un lugar donde tú no puedes verlo. El Ramban lo dijo con una sola frase prestada de Sodoma: «descenderé y veré». Retirado, y sin embargo mirando de cerca.`,
      },
      {
        etiqueta: "¿Qué me enseña de mí?",
        texto: `Que lo que sentiste cuando rezaste y no pasó nada tiene nombre. No fuiste descalificado. No hiciste algo mal que los demás hicieron bien. Estuviste en una casilla que la Torá nombra con una palabra técnica, que le pasó a un pueblo entero, y que tiene —según Ibn Ezra— una palabra de tiempo pegada: «hasta».`,
      },
      {
        etiqueta: "¿Y lo más difícil de creer?",
        texto: `Que según el Baal Shem Tov, la noche en la que sabes que está oscuro ya no es la noche más oscura. El que pregunta «¿dónde estás?» ya está en relación. El silencio que te duele es un silencio que estás escuchando — y solo se escucha a alguien.`,
      },
      {
        etiqueta: "¿Qué patrón veo?",
        texto: `Mira la forma del rollo. Setenta renglones, cada uno partido por un hueco en el medio. Nadie considera que ese hueco sea un error del escriba: es parte del canto. El espacio en blanco está dentro de la línea, no después. Y todo el que lee ese rollo cruza esos setenta huecos sin pensarlo, porque sabe que la frase sigue del otro lado. Quizá lo que llamas tu vacío no es el lugar donde el canto se rompió. Quizá es el lugar donde la línea respira antes de su segunda mitad.`,
      },
      {
        etiqueta: "¿Y el calendario?",
        texto: `Hoy es Shabat Shuvá, «el Shabat del Retorno», y mañana al atardecer entra Yom Kipur. El Shabat que lleva el nombre del regreso lee el pasaje que dice «esconderé Mi rostro». Y esa misma mañana, y esa misma tarde, y todas las mañanas y tardes desde el mes de Elul, se ha estado diciendo el Salmo 27: «לְךָ אָמַר לִבִּי בַּקְּשׁוּ פָנָי; אֶת פָּנֶיךָ ה' אֲבַקֵּשׁ» (Tehilim 27:8) — «a Ti dijo mi corazón: "busquen Mi rostro"; Tu rostro, Hashem, buscaré». (Que este salmo se diga dos veces al día en esta temporada es ley: Mishná Berurá 581:2. Y el midrash Vayikrá Rabá 21:4 lo reparte así: «"mi luz" en Rosh Hashaná, "y mi salvación" en Yom Kipur».)`,
      },
      {
        etiqueta: "¿Cómo se relaciona con mi alma?",
        texto: `Míralo de frente, porque es todo el estudio en dos renglones: la Torá dice «esconderé Mi rostro»; la liturgia de esos mismos días responde «Tu rostro, Hashem, buscaré». No es una contradicción: es un diálogo. Y fíjate en la rareza del versículo del salmo — la orden llega en plural («busquen Mi rostro») y el que responde contesta en singular («yo buscaré»). El corazón oye una convocatoria dirigida a todos y la contesta en primera persona. Esa es la estructura exacta de la oración: Él llama al mundo, tú contestas por ti.`,
      },
      {
        etiqueta: "¿Y con la creación?",
        texto: `El día del ocultamiento y el día de la búsqueda del rostro caen pegados en el calendario. No es ironía: es el orden correcto. Primero se nombra lo que duele. Después se busca.`,
      },
    ],
  },

  // ── 5. מַעֲשֶׂה ───────────────────────────────────────────────────────────────
  maase: {
    intro:
      "Maasé (ma-a-SÉ) es «acción». El estudio que no baja a los pies no terminó. Cuatro cosas concretas, para hoy y para mañana.",
    etiqueta: "Ponle nombre a tu noche, y después busca un rostro que sí puedes ver.",
    texto: `Primero, cinco minutos hoy: escribe en un papel, a mano, la vez que rezaste o pediste y no sentiste nada. Una línea. Con fecha si la recuerdas. No para quejarte — para saber que lo sabes. El Baal Shem Tov dijo que si sabes que está escondido ya no está del todo escondido; escribirlo es la manera más barata de saberlo. Segundo, dos minutos: di el Salmo 27, especialmente el versículo 8, aunque no sepas hebreo y aunque no creas que sirve — y dilo en voz alta, no en la cabeza, porque hay una diferencia física entre pensar «Tu rostro buscaré» y oírte decirlo. Tercero, una llamada, hoy o mañana, antes de Yom Kipur: aquí está la midá —la cualidad de carácter— que este estudio trabaja, y es dejar de esconder tu propia cara. Hay alguien de quien te escondiste: no contestaste, no llamaste, dejaste que el silencio hiciera el trabajo. Llámalo. No es un premio de consolación por el rostro que no ves; es lo contrario: el único ocultamiento sobre el que tienes control es el tuyo, y quitar uno es quitar uno. Y cuarto, treinta segundos, cuando venga: la próxima vez que te topes con un silencio —una oración sin respuesta, una espera sin señal, un día sin sentido— recuerda la forma del rollo. El hueco está en el medio de la línea, no al final. Di para ti: «esto es el medio del renglón». Y sigue leyendo hacia la segunda mitad.`,
  },

  // ── 6. חֲתִימָה ───────────────────────────────────────────────────────────────
  jatima: {
    items: [
      {
        etiqueta: "Idea principal:",
        texto: `El Shabat anterior a Yom Kipur se lee el pasaje en el que Dios dice «esconderé Mi rostro» (Devarim 32:20). Y desde el mes de Elul hasta Yom Kipur, dos veces cada día, se responde con el Salmo 27: «Tu rostro, Hashem, buscaré». El calendario puso la pregunta y la respuesta una al lado de la otra. Lo que parecía una contradicción es la estructura misma de estos días.`,
      },
      {
        etiqueta: "Insight clave:",
        texto: `El versículo del ocultamiento no termina en el ocultamiento. Termina en «VERÉ cuál será su fin». Ibn Ezra lo traduce como una palabra de tiempo: «hasta que vea qué harán en su angustia». El Ramban compara ese «veré» con «descenderé y veré» — el Dios que baja a mirar de cerca antes de decidir. El rostro se esconde; los ojos no se cierran.`,
      },
      {
        etiqueta: "Insight espiritual:",
        texto: `Julín 139b: «¿De dónde está Ester en la Torá? De "y Yo esconder esconderé"». El nombre de Ester es la palabra «escondido», y el Libro de Ester es el único del Tanaj donde el Nombre de Dios no aparece explícitamente ni una vez — y es el libro donde todo, casualidad tras casualidad, sale bien. El libro donde Dios está escondido se llama con la palabra «escondido». Y el Talmud (Yoma 29a) dice de Ester: «como el amanecer es el final de toda la noche». Ocultamiento no es ausencia: es un modo de estar presente que no se deja ver.`,
      },
      {
        etiqueta: "Aplicación práctica:",
        texto: `Ponle nombre a tu noche por escrito. Di el Salmo 27 en voz alta antes de Yom Kipur. Y llama a la persona de la que TÚ escondiste la cara — porque el único rostro oculto que está en tus manos descubrir es el tuyo.`,
      },
      {
        etiqueta: "Y guarda la imagen que la ley misma dibuja:",
        texto: `el canto que anuncia el ocultamiento se escribe, por halajá, en setenta líneas con un hueco en el medio de cada una (Shulján Aruj, Yoré Deá 275:5). Nadie llama error a esos huecos: son parte del canto. Y están en el medio del renglón —nunca al final— porque del otro lado la frase sigue.`,
      },
    ],
  },

  // ── Nota de autor — fuera del cuerpo sellado ────────────────────────────────
  jidush: {
    titulo: "Lectura propia — dos notas de Jashmal",
    rotulo:
      "No son citas ni fuentes clásicas: son lecturas de Jashmal sobre datos verificados, marcadas como tales. La aritmética está comprobada; la interpretación es nuestra, y nadie está obligado a leerlo así.",
    parrafos: [
      `La primera es la álef escondida en el nombre. סֵתֶר (séter, «ocultamiento») suma 660 — ס60 + ת400 + ר200. אֶסְתֵּר (Ester) suma 661. La diferencia es exactamente una álef: א, valor 1. Y la álef es la única letra del alfabeto hebreo que no tiene sonido propio: es una letra muda, no se oye, sostiene a las demás. La derivación del nombre no es invento nuestro —Julín 139b la establece—; lo nuestro es mirar el sobrante. Y no lo hacemos en el aire: el Baal Shem Tov, en el mismo pasaje de Keter Shem Tov 1:55, enseña que en las cinco álef del versículo del enemigo —«אָמַר אוֹיֵב אֶרְדֹּף אַשִּׂיג אֲחַלֵּק» (Shemot 15:9)— está escondido «אַלּוּפוֹ שֶׁל עוֹלָם», el Maestro del mundo: dentro de las palabras del enemigo, en las letras mudas, está Él. Siguiendo ese mismo patrón: dentro del ocultamiento (660) hay una álef muda, y el resultado se llama Ester (661) — la letra que no suena, escondida dentro de la palabra que significa «escondido». El método es del Baal Shem Tov; la aplicación es de Jashmal. Y una cosa que NO hacemos: no forzamos ninguna cuenta entre אֶסְתֵּר (661) y הַסְתֵּר (665). No la hay. El vínculo entre esas dos palabras es morfológico —misma raíz ס־ת־ר— y es más fuerte que cualquier número, porque lo afirma el Talmud y no nosotros.`,
      `La segunda es el puente con la Neilá, la última oración de Yom Kipur — y se declara como lo que es: una lectura nuestra que no encontró fuente. El Sofer buscó una fuente clásica que ligue el hester panim con la Neilá y no la halló; lo dejamos dicho arriba, en la nota que abre el estudio. Lo que sí es fuente, y sostiene mejor la idea, es el Tzror HaMor a Bamidbar 6:23: la Bendición Sacerdotal, que pide que el rostro se ALCE, es la antítesis exacta del versículo que advierte que el rostro se BAJA. Sobre esa base, y solo como lectura, ofrecemos el ángulo del calendario —que es de Mardan, y el dato es duro aunque la lectura sea nuestra—: el pasaje donde Dios dice «esconderé Mi rostro» se lee el día antes del día en que todo un pueblo pasa veinticinco horas buscándolo. Nos parece el orden correcto y no una ironía. Pero es nuestro, y va sin disfraz.`,
    ],
  },

  // ── Umbral הֶמְשֵׁךְ — Sigue el hilo ──────────────────────────────────────────
  hemshej: [
    "{{study:kol-nidrei|¿Y si el perdón empieza por anular las promesas que uno mismo se hizo? Kol Nidrei: deshacer los votos.}}",
    "{{study:yom-kipur|¿Qué pasa el único día del año en que se entra detrás del velo? El día en que se cruza la cortina.}}",
    "{{study:bendicion-invertida|Cuando una bendición sale al revés, ¿quién la está diciendo? La bendición invertida — la misma luz, otra vasija.}}",
    "{{study:cinco-luces-mashiaj|¿Y si la luz que falta es la que todavía no se ha encendido? Las cinco luces del Mashíaj.}}",
  ],

  ctaRef: "Deuteronomy 32:20",
};
