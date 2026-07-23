
import type { EstudioData } from "@/components/misterio/EstudioMisterio";

// ════════════════════════════════════════════════════════════════════════════
//  MISTERIO — וַיְחַל מֹשֶׁה · El juramento que Dios necesitaba que alguien anulara
//  Standalone (no forma parte de una serie). Fuente: Talmud Bavli, Berajot 32a
//  (dicho de Rava) + Parashat Matot (Bamidbar 30:2-3) + Shemot 32:10-11.
//  Contenido verificado por el Sofer (editor-erudito). No agregar fuentes nuevas.
//
//  Montado con el componente compartido EstudioMisterio (panel lateral).
//  Sin gematría en el hero (hero modo "frase", sin par/numero/dimensiones).
//  Sin caja de cierre en PaRDeS (no hay gematría verificada para este misterio)
//  y sin "Ventana a la ciencia".
// ════════════════════════════════════════════════════════════════════════════

export const data: EstudioData = {
  slug: "vaiejal-moshe",
  hero: {
    serielabel: "",
    serielabelFa: "",
    he: "וַיְחַל מֹשֶׁה",
    titulo: "El juramento que Dios necesitaba que alguien anulara",
    tituloFa: "سوگندی که خدا نیاز داشت کسی باطلش کند",
    ganchoEs:
      "Dios jura destruir a Israel. Una palabra rara en el texto —vaiéjal— dice que Moisés hizo algo mucho más audaz que rogar: anuló el juramento de Dios. Y el Talmud dice que Dios se lo permitió a propósito.",
    ganchoFa:
      "خدا سوگند می‌خورد اسرائیل را نابود کند. واژه‌ای کمیاب در متن — وَیِّخَل — می‌گوید موسی کاری بسی جسورانه‌تر از التماس کرد: سوگندِ خدا را باطل کرد. و تلمود می‌گوید خدا عمداً چنین اجازه‌ای به او داد.",
  },
  targum: {
    citas: [
      {
        label: "Bamidbar 30:2-3 — la ley que abre Parashat Matot",
        he: "אִישׁ כִּי יִדֹּר נֶדֶר לַה' אוֹ הִשָּׁבַע שְׁבֻעָה לֶאְסֹר אִסָּר עַל נַפְשׁוֹ לֹא יַחֵל דְּבָרוֹ כְּכָל הַיֹּצֵא מִפִּיו יַעֲשֶׂה",
        es: "Un hombre, cuando haga un voto a Hashem o jure un juramento imponiéndose una obligación, no profanará su palabra (lo iajel devaró); conforme a todo lo que salga de su boca hará.",
        source: "Bamidbar (Números) 30:2-3",
      },
      {
        label: "Shemot 32:10 — el juramento de Dios, tras el Becerro de Oro",
        he: "וְעַתָּה הַנִּיחָה לִּי וְיִחַר אַפִּי בָהֶם וַאֲכַלֵּם וְאֶעֱשֶׂה אוֹתְךָ לְגוֹי גָּדוֹל",
        es: "Y ahora, déjame, que se encienda Mi furor contra ellos y los consuma; y haré de ti una nación grande.",
        source: "Shemot (Éxodo) 32:10",
      },
      {
        label: "Shemot 32:11 — la palabra que abre la lectura de Rava",
        he: "וַיְחַל מֹשֶׁה אֶת פְּנֵי ה' אֱלֹקָיו",
        es: "Y Moisés imploró (vaiéjal) el rostro de Hashem, su Dios...",
        source: "Shemot (Éxodo) 32:11",
      },
      {
        label: "Talmud Bavli, Berajot 32a — dicho de Rava",
        he: "וְאָמַר רָבָא... עַד שֶׁהֵפֵר לוֹ נִדְרוֹ, שֶׁנֶּאֱמַר 'וַיְחַל מֹשֶׁה', וּכְתִיב הָתָם 'לֹא יַחֵל דְּבָרוֹ' — הוּא אֵינוֹ מֵיחֵל אֲבָל אֲחֵרִים מְפִירִים לוֹ",
        es: "Y dijo Rava: [Moisés se mantuvo de pie en oración] hasta que le anuló su juramento [a Dios], como está dicho 'vaiéjal Moshé' — y allá está escrito 'lo iajel devaró' [no profanará su palabra]: él mismo no puede anular [su propio voto], pero otros sí pueden anulárselo.",
        source: "Talmud Bavli, Berajot 32a",
      },
    ],
    parrafos: [
      `Parashat Matot abre con una de las leyes más severas de la Torá: un voto o un juramento hecho a Dios no se puede romper por cuenta propia. "Lo iajel devaró" — no profanará su palabra. La única salida que la halajá reconoce es que un tercero, un beit din, libere a la persona de su propio juramento. Uno mismo, atado por su propia boca, no tiene ese poder.`,
      `Ahora vayamos treinta y ocho capítulos atrás en el mismo Jumash. Israel acaba de fabricar el Becerro de Oro. Dios le dice a Moisés: "Déjame, que se encienda Mi furor contra ellos y los consuma, y haré de ti una nación grande" (Shemot 32:10). No es un enojo pasajero — según Rava, es un juramento. Dios se ha atado a Su propia palabra de destruir al pueblo.`,
      `El versículo siguiente dice algo extraño: "Vaiéjal Moshé et penei Hashem Elokav" — Moisés imploró, literalmente "enfermó" o "debilitó" (la raíz jet-lamed-lamed tiene ese doble sentido: enfermedad y también anulación), el rostro de Hashem su Dios. Rava lee esa palabra rara, "vaiéjal", a la luz de la ley que Israel recibiría después en Matot: "lo iajel devaró". Es una guezerá shavá — una analogía verbal entre dos versículos que comparten la misma raíz — y a partir de ella Rava enseña que Moisés no solo rogó: actuó como el tercero, el que tiene el poder de anular un juramento que quien lo hizo no puede anular por sí mismo. Dios había jurado destruir; Moisés, parado en oración, deshizo ese juramento — usando exactamente el mecanismo legal que la Torá misma establecería después para todo Israel.`,
    ],
  },
  mefarshim: {
    parrafos: [
      {
        etiqueta: "Rava (Talmud Bavli, Berajot 32a)",
        texto: `Rava es quien construye la lectura completa: toma la rareza lingüística de "vaiéjal" en Shemot 32:11 y la conecta, por guezerá shavá, con "lo iajel devaró" de Bamidbar 30:3. Su punto no es solo literario. Es legal-teológico: la Torá enseña que quien hace un voto no puede anularlo él mismo, pero otro sí puede — y aquí Dios mismo aparece dentro de esa estructura, como Aquel cuyo "voto" de destrucción necesitó un tercero para anularse. Ese tercero fue Moisés.`,
      },
      {
        etiqueta: "Contexto del daf — la audacia reconocida por el propio Talmud",
        texto: `En esa misma sugiá de Berajot 32a, el Talmud junta varias lecturas atrevidas sobre cómo Moisés logró revertir el decreto: Rabí Eleazar dice que Moisés "agarró a Dios" con el argumento del mérito de los patriarcas; en otro pasaje relacionado se le atribuye a Rabí Abahu la imagen de tomar a Dios "por la ropa", como quien no suelta a alguien hasta que cede. Sobre este tipo de lecturas el propio Talmud advierte: "Si el verso no estuviera escrito así, sería imposible decirlo así" — es decir: los sabios saben que están al límite de lo que el lenguaje permite decir sobre Dios, y solo se atreven a decirlo porque el texto mismo los obliga con su elección de palabras. Esa frase es la licencia y, a la vez, la advertencia: esto es agadá audaz, construida sobre una palabra, no una descripción literal de un tribunal celestial. Nota importante para no mezclar fuentes: el argumento de "agarrar la ropa" y el argumento del mérito de los patriarcas son otros dichos, de otros sabios, sobre otros aspectos del relato — no forman parte de la lectura de Rava sobre "vaiéjal", y no deben combinarse con ella en este estudio.`,
      },
    ],
  },
  pardes: {
    subbloques: [
      {
        head: "פְּשָׁט — Pshat",
        parrafos: [
          `En el sentido simple, "vaiéjal Moshé" es una expresión física-emocional de súplica intensa — Moisés se "debilitó" o se postró implorando ante Dios, tras el pecado del Becerro de Oro, para que no exterminara al pueblo. Así lo entienden la mayoría de las traducciones: "imploró", "suplicó".`,
        ],
      },
      {
        head: "רֶמֶז — Remez",
        parrafos: [
          `La alusión está en la raíz compartida: la misma raíz jet-lamed-lamed que describe la súplica de Moisés en Shemot 32:11 reaparece, treinta y ocho capítulos después, en la ley de los votos de Bamidbar 30. La Torá no repite raíces por accidente en el sistema de lectura rabínico: cuando dos versículos distantes comparten una palabra poco común, eso es una puerta (guezerá shavá) que invita a leer uno a la luz del otro.`,
        ],
      },
      {
        head: "דְּרַשׁ — Drash",
        parrafos: [
          `Rava cruza esa puerta y construye el drash central de este misterio: Dios, al declarar Su intención de destruir a Israel, se comportó —en el lenguaje de la Torá— como quien hace un juramento. Y la misma Torá que exige que ese juramento solo pueda anularlo un tercero, le dio a Moisés, en ese momento, precisamente ese rol. No es que Moisés discuta con Dios de igual a igual; es que la propia estructura legal que la Torá enseñaría después ya estaba operando, de manera oculta, en el momento de la súplica. La ley de Matot no solo regula los votos humanos: revela, en retrospectiva, la mecánica que ya había funcionado entre Moisés y Dios.`,
        ],
      },
      {
        head: "סוֹד — Sod",
        parrafos: [
          `Aquí conviene separar con cuidado lo que es lectura clásica de lo que es extensión contemplativa. Lo verificado (Rava, Berajot 32a) es el drash legal que ya se explicó. Lo que se puede añadir, como reflexión legítima pero NO como halajá ni como enseñanza atribuida a un sabio específico, es esto: llama la atención que la ley capaz de anular el juramento de Dios sea entregada por la propia Torá después del episodio en que se necesitó. Se puede leer ahí una idea profunda y honesta —no una gematría, no un cálculo numérico verificado en esta investigación— sobre cómo el sistema de la Torá no es una jaula externa a Dios, sino una expresión de Su propia voluntad de ser "alcanzado" por la intercesión humana. Baal HaSulam enseña, como principio general de su método (no citado aquí en un pasaje específico verificado sobre este daf), que la Torá revela la conducta interna del sistema de gobierno divino (hanhagá) precisamente para que el ser humano pueda operar dentro de él con conocimiento, no a ciegas. Aplicado a este caso: Dios "se ató" con un lenguaje de juramento sabiendo —según esta lectura— que ese mismo lenguaje abría la puerta a que Moisés lo desatara. No es que Dios necesite ser corregido por el hombre; es que Dios diseñó un sistema donde la oración sincera y la intercesión genuina tienen poder real, no simbólico. Esta última idea es una síntesis contemplativa razonable a partir del drash de Rava, y se presenta como tal —no como un dicho adicional verificado en Sefaria.`,
        ],
      },
    ],
  },
  hitbonenut: {
    intro: `Detente en esto, sin buscar ninguna fuente nueva: una sola palabra rara del texto, "vaiéjal", bastó para que los sabios vieran una escena de una audacia enorme — Moisés anulando lo que Dios mismo había jurado.`,
    parrafos: [
      {
        etiqueta: `¿Qué me enseña esto sobre lo que llamo "ira de Dios"?`,
        texto: `Si el "juramento" de Dios podía ser anulado por la intercesión de un tercero, ¿qué dice eso sobre cómo debo entender los momentos en que siento que el juicio ya está sellado —en mi vida, en la de alguien que amo? ¿Estoy tratando ese juicio como algo fijo e irrevocable, cuando la Torá misma enseña que ciertos juramentos requieren, por diseño, ser desatados desde afuera?`,
      },
      {
        etiqueta: "¿Qué patrón veo en que la ley llegue después del hecho?",
        texto: `Moisés usó un mecanismo que la Torá formalizaría casi cuatro décadas de relato después. ¿Cuántas veces en mi propia vida actué por instinto espiritual correcto antes de tener el marco o la palabra para explicarlo? ¿Qué confianza me da saber que el sistema completo —aunque yo todavía no lo vea entero— ya estaba sosteniendo lo que hice bien?`,
      },
      {
        etiqueta: "¿Cómo se relaciona esto con mi propia capacidad de interceder?",
        texto: `La ley de Matot dice que uno mismo no puede anular su propio voto, pero otro sí puede anular el ajeno. ¿Hay una atadura, una palabra dicha o un juicio que cargo sobre mí mismo que no puedo desatar solo —y que necesito que otro (una comunidad, un maestro, una oración compartida) me ayude a soltar? ¿Y a la inversa: hay alguien atado a su propia palabra que yo tengo el poder —y quizás la responsabilidad— de ayudar a liberar?`,
      },
    ],
  },
  maase: {
    intro: "Este misterio no es una curiosidad filológica: es una enseñanza sobre el poder real de la intercesión.",
    etiqueta: "Acción concreta de hoy",
    texto: `Elige a una persona por la que sientes que "ya está todo dicho" —un conflicto que consideras cerrado, un juicio tuyo sobre alguien que sientes irreversible, o incluso un juicio que sientes que pesa sobre ti mismo. Hoy, en lugar de tratarlo como sentencia firme, tómate cinco minutos de oración genuina —no una fórmula, una súplica real, como la de Moisés— pidiendo específicamente por esa persona o por esa situación. No se trata de negar el juicio ni de fingir que el problema no existe: se trata de actuar, aunque sea una vez, como si la intercesión sincera tuviera peso real dentro del sistema —porque según esta lectura del Talmud, lo tiene.`,
  },
  jatima: {
    items: [
      {
        etiqueta: "Idea principal",
        texto: `Una palabra rara del texto —"vaiéjal"— llevó a Rava a leer la súplica de Moisés tras el Becerro de Oro como la anulación literal de un juramento que Dios había hecho, usando el mismo mecanismo legal que la Torá establecería después en Parashat Matot.`,
      },
      {
        etiqueta: "Insight clave",
        texto: `La ley dice que quien hace un voto no puede anularlo por sí mismo, pero un tercero sí puede. En el relato del Becerro de Oro, ese tercero fue Moisés —y el propio Talmud reconoce la audacia de esta lectura sin retractarse de ella.`,
      },
      {
        etiqueta: "Insight espiritual",
        texto: `El sistema que la Torá enseña no es ajeno a Dios: es, según esta lectura, el modo en que Dios mismo eligió ser alcanzado por la intercesión humana. La oración sincera no es un gesto simbólico frente a un decreto ya sellado —puede ser, dentro de esta hanhagá, el mecanismo real de desatarlo.`,
      },
      {
        etiqueta: "Aplicación práctica",
        texto: `Trata al menos una situación que sientes "cerrada" —tuya o de otro— como si todavía estuviera abierta a una intercesión genuina, y actúa en consecuencia hoy mismo.`,
      },
    ],
  },
  hemshej: [
    "{{study:likutei-moharan-i-1|¿Qué hace que una oración sea realmente escuchada?}}",
  ],
  ctaRef: "Exodus 32.11",
};
