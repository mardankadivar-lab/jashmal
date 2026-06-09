// Contenido "Estudiar en profundidad" del Viaje de Creación (/creacion).
// Mini-estudio PaRDeS condensado por etapa cósmica, verificado por el Sofer
// (editor-erudito). Se muestra en un panel sobre la escena activa.
// Las claves son los `id` exactos de lib/cosmologyStages.ts (mapeo 1:1).
// Fuentes confirmadas en Sefaria; lo homilético va marcado "(Drash)" en el texto.

export interface CosmologyStudy {
  fuente: string;
  pshat: string;
  sod: string;
  jasidut: string;
  aplicacion: string;
}

export const COSMOLOGY_STUDY: Record<string, CosmologyStudy> = {
  "ein-sof": {
    fuente: "Arizal, Etz Chaim, Sha'ar HaHakdamot (concepto general); cf. Zohar I, Idra Rabba",
    pshat: "Antes de toda emanación: solo Lo Infinito. Sin mundos, sin sefirot, sin tiempo, sin un «tú» que pregunte.",
    sod: "Ein Sof no es «mucha» luz: es la ausencia total de distinción. No tiene nombre porque todo nombre es ya un límite. La creación no le añade nada — Él es igual de pleno antes y después.",
    jasidut: "Tu alma tiene una raíz en ese Sin-Fin. Por eso ningún logro finito te sacia del todo: lo infinito en ti recuerda de dónde vino.",
    aplicacion: "Antes de pedir algo concreto, hazte una vez en silencio ante Aquel que no tiene límite. Nombra menos; recibe más.",
  },
  "tzimtzum": {
    fuente: "Arizal, Etz Chaim, Sha'ar HaHakdamot; el verso raíz: «¿No lleno Yo los cielos y la tierra?» (Yirmiyahu 23:24)",
    pshat: "Para que existiera un «otro», el Infinito ocultó Su luz y dejó un espacio. No se fue de un lugar — dejó de manifestarse plenamente allí.",
    sod: "El primer acto divino no es dar, sino retener. El amor que quiere un receptor verdadero se hace pequeño para que el otro quepa. El vacío es un gesto de amor, no de ausencia.",
    jasidut: "Cada espacio que dejas para que el otro exista —tu silencio, tu paso atrás— es un tzimtzum tuyo. Así imitas el primer movimiento de Dios.",
    aplicacion: "Hoy contráete una vez a propósito: calla para que otro hable, cede el lugar. En ese hueco entra vida.",
  },
  "reshimo": {
    fuente: "Arizal, Etz Chaim, Sha'ar HaAkudim (concepto general); el Reshimu como impresión residual tras el Tzimtzum",
    pshat: "El vacío nunca quedó del todo vacío: permaneció una huella tenue de la luz retirada, el Reshimu.",
    sod: "Ningún encuentro con lo Divino se borra sin dejar marca. Esa huella es la memoria del Infinito dentro del vacío — el ADN secreto desde el cual se construirá todo mundo futuro.",
    jasidut: "El recuerdo de un instante de cercanía, aunque la luz ya se haya ido, sostiene el alma en la oscuridad. La nostalgia de Dios es ella misma una forma de Su presencia.",
    aplicacion: "Guarda la huella de tus momentos altos. En el día gris, vuelve a esa marca: te recuerda que la luz fue real y volverá.",
  },
  "kav": {
    fuente: "Arizal, Etz Chaim, Sha'ar HaHakdamot (el Kav que penetra el jalal); «sefirá» de la raíz s-p-r, medida",
    pshat: "Un solo rayo finito de luz entra en el vacío. El Kav trae la primera medida y la primera dirección: de él se hilan todos los mundos.",
    sod: "Lo Infinito no puede tocar lo finito de golpe sin aniquilarlo. El Kav es luz «dosificada» como una línea: el primer puente entre lo ilimitado y lo que puede contenerse. Toda revelación posterior es luz que aprende a medirse.",
    jasidut: "La inspiración que no toma forma de línea —de un paso concreto— se evapora. El Kav enseña que la luz que sirve es la que acepta ser canalizada.",
    aplicacion: "Toma tu inspiración más grande de hoy y redúcela a UNA línea de acción medible. La luz sin cauce no riega nada.",
  },
  "adam-kadmon": {
    fuente: "Arizal, Etz Chaim, Sha'ar Adam Kadmon (concepto general); «hagamos al hombre a Nuestra imagen» (Bereshit 1:26)",
    pshat: "La primera configuración tras el Kav: Adam Kadmón. No es un humano, sino la arquitectura arquetípica que contiene en potencia toda la creación.",
    sod: "El plano del universo tiene forma de Adam: todo lo creado es el despliegue de un Hombre primordial de luz. Por eso el hombre de carne es «imagen»: abajo se dibuja el mismo diseño que organiza arriba todos los mundos.",
    jasidut: "Eres un mundo entero en miniatura; lo que rectificas en ti reorganiza algo en el plano de todo. Tu cuerpo es un mapa de fuerzas divinas, no un accidente.",
    aplicacion: "Mira tu cuerpo y tus facultades hoy como un templo con diseño. Lo que ordenas en ti ordena más allá de ti.",
  },
  "akudim": {
    fuente: "Arizal, Etz Chaim, Sha'ar HaAkudim (las diez luces «atadas» en un solo kli); עֲקוּדִים evoca Bereshit 30:35",
    pshat: "Las diez luces de las sefirot surgen ya, pero dentro de un único recipiente. Todo integrado, todo unido: la armonía primera, antes de individualizarse.",
    sod: "La unidad de Akudim es real pero inmadura: nadie es todavía «él mismo». Es la unión por indistinción —diez fuerzas en un solo vaso— que tendrá que romperse para que cada una nazca y luego se reúna por elección. (Drash)",
    jasidut: "Hay una paz fácil del comienzo, cuando nada se ha puesto a prueba. Es hermosa, pero no es la meta: el alma debe salir de la fusión para aprender a unirse de verdad.",
    aplicacion: "Disfruta la armonía sin idolatrarla. Si todo está «demasiado junto» y nadie crece, quizá toca diferenciarse antes de reunirse mejor.",
  },
  "nekudim": {
    fuente: "Arizal, Etz Chaim, Sha'ar HaNekudim (concepto general); raíz del rigor sin equilibrio: «y crea el mal» (Yeshayahu 45:7)",
    pshat: "Las luces se separan en puntos aislados. Cada sefirá actúa sola; el Din —el rigor— predomina sin el contrapeso del jésed. El problema de fondo está por estallar.",
    sod: "Separación sin relación = juicio puro. Cuando una fuerza buena actúa sin coordinarse con las demás, su misma fuerza se vuelve quiebre. El mal no es «otra» sustancia: es bien desconectado, luz sin vaso que la comparta. (Drash sobre Yeshayahu 45:7)",
    jasidut: "Tus virtudes aisladas pueden herir: rigor sin amor, verdad sin compasión. La cualidad que no dialoga con las otras se endurece hasta romper.",
    aplicacion: "Revisa hoy tu virtud más fuerte: ¿está sola? Conéctala con su contrario (firmeza con ternura) antes de que su exceso quiebre algo.",
  },
  "shevirat": {
    fuente: "Arizal, Etz Chaim, Sha'ar Shevirat HaKelim (concepto general); כֵּלִים (vasos) = 100 = 10² (las diez sefirot al cuadrado)",
    pshat: "Los recipientes no pudieron contener la intensidad de la luz y se rompieron. Aquí nace la raíz metafísica de todo desorden, fragmentación y exilio.",
    sod: "La luz era demasiada para vasos no rectificados: se quebraron y cayeron en chispas. Pero la ruptura no fue un fracaso, fue gestación — solo de los fragmentos puede surgir un mundo donde el hombre repare y por eso merezca su luz.",
    jasidut: "Tus quiebres no son el final de la historia: son el material del tikún. Lo que se rompió en ti dejó caer chispas que solo tú puedes recoger.",
    aplicacion: "No maldigas la cosa que se te rompió hoy. Pregunta: ¿qué chispa cayó aquí que estoy llamado a levantar?",
  },
  "nitzotzot": {
    fuente: "Arizal, Etz Chaim, Sha'ar Shevirat HaKelim; tradición: 288 chispas (רפ\"ח)",
    pshat: "Las chispas de santidad cayeron al exilio, atrapadas entre los fragmentos. Toda la historia cósmica posterior consiste en liberarlas y elevarlas.",
    sod: "La santidad no quedó arriba intacta: se dispersó dentro de lo caído. Por eso cada cosa del mundo —cada comida, encuentro, oficio— esconde una chispa esperando ser reconocida. El exilio no es castigo, es siembra. (Drash; base del Baal Shem Tov)",
    jasidut: "El Baal Shem Tov: sirves a Dios CON lo material, no a pesar de ello. Comer, trabajar y amar con intención eleva la chispa cautiva en cada cosa.",
    aplicacion: "Elige hoy un acto «común» —una comida, una tarea— y hazlo con intención sagrada. Acabas de liberar una chispa.",
  },
  "kelipot": {
    fuente: "Arizal / Zohar, doctrina de las kelipot (concepto general); קְלִיפָּה = cáscara que envuelve y oculta el fruto",
    pshat: "Las chispas quedaron envueltas en estructuras oscuras, las Kelipot («cáscaras»). El mundo aparece mezclado: bien y mal, verdad y ocultamiento.",
    sod: "La kelipá es cáscara, no veneno: existe para ocultar el fruto hasta que esté listo. El ocultamiento da margen al libre albedrío — sin un velo que dé lugar a la duda, no habría elección ni mérito. El mal toma prestada su vida de la chispa que aprisiona. (Drash)",
    jasidut: "Lo que te resiste y te oculta la verdad también te obliga a elegirla. La cáscara más dura suele guardar la chispa más alta — por eso cuesta tanto.",
    aplicacion: "Frente a una «cáscara» hoy (un obstáculo, una tentación), no solo la rechaces: pregunta qué chispa retiene y libérala eligiendo el bien.",
  },
  "atzilut": {
    fuente: "Zohar, Idra Rabba (los Partzufim); la conciliación de las fuerzas: «Hace paz en Sus alturas» (Iyov 25:2)",
    pshat: "Comienza la rectificación. Las sefirot se reorganizan en Partzufim —rostros que cooperan— y la relación reemplaza la separación.",
    sod: "Lo que en Nekudim eran puntos solitarios, ahora son rostros que se miran y se dan: dador y receptora. La unión madura no borra las diferencias —las hace fecundas. «Osé shalom bimromav»: la paz de lo alto no es ausencia de fuerzas opuestas, sino su matrimonio.",
    jasidut: "La rectificación de tu alma no es aplanar tus rasgos, sino casarlos: que tu rigor sirva a tu amor y tu amor dé forma a tu rigor.",
    aplicacion: "Toma dos fuerzas tuyas que pelean (ambición y bondad) y ponlas a colaborar en una sola acción de hoy. Eso es hacer paz en tus alturas.",
  },
  "abya": {
    fuente: "Arizal, los Cuatro Mundos Atzilut-Beriá-Yetzirá-Asiá; «lo creé, lo formé, lo hice» (Yeshayahu 43:7)",
    pshat: "La energía divina desciende por grados: Atzilut → Beriá → Yetzirá → Asiá. Nuestro mundo físico es el más bajo, Asiá, pero guarda chispas de los mundos altos.",
    sod: "Yeshayahu 43:7 nombra tres verbos —creó, formó, hizo— y sobre todos, la Emanación. La luz no salta del Infinito a la piedra: baja por escalones para que lo más bajo la reciba sin romperse. Tu mundo material es el último peldaño y, por eso mismo, donde la obra se completa.",
    jasidut: "Pensar, sentir, decir y hacer son tus cuatro mundos. Una intención solo está «hecha» del todo cuando desciende hasta la acción en Asiá.",
    aplicacion: "Haz bajar hoy una idea elevada por los cuatro escalones: piénsala, siéntela, dila, hazla. La luz que no llega a la acción no terminó de nacer.",
  },
  "avodah": {
    fuente: "Doctrina luriana del berur (elevación de chispas); «lo puso en el jardín para trabajarlo y cuidarlo» (Bereshit 2:15)",
    pshat: "El ser humano fue creado para participar en la reparación. Por mitzvot, Torá, tefilá, teshuvá y bondad, se elevan las chispas dispersas.",
    sod: "El Infinito pudo repararlo todo solo, pero dejó la obra inconclusa a propósito: para que el hombre fuera socio y no mendigo. «Leovdá uleshomrá» —trabajar y cuidar— es la tarea del jardín cósmico. Cada mitzvá recoge una chispa del exilio y la devuelve a su raíz. (Drash)",
    jasidut: "No eres espectador de la creación: eres el obrero que la termina. Tu acto pequeño y constante mueve mundos que no ves.",
    aplicacion: "Elige hoy UNA avodá concreta —una mitzvá, un acto de bondad, un minuto de tefilá real— sabiendo que con ella levantas una chispa. Hazla.",
  },
  "tikun": {
    fuente: "Ramjal, Da'at Tevunot (el propósito del mal en función del bien final); la meta: «Hace paz en Sus alturas» (Iyov 25:2)",
    pshat: "Luces y vasos alcanzan equilibrio; las chispas se reúnen. El Tikún no es volver atrás: es subir a un nivel más alto, una unidad que integra la diversidad.",
    sod: "El final supera al comienzo. La unidad de Akudim era ingenua; la del Tikún es ganada — incluye dentro de sí todo lo que se rompió y se reparó. Por eso el Ramjal enseña que el quiebre existió en función de un bien final mayor que la perfección inicial. La diversidad reconciliada vale más que la unidad sin historia.",
    jasidut: "Tus caídas reparadas te hacen más entero que si nunca hubieras caído. El alma rectificada no borra su pasado: lo transfigura en luz.",
    aplicacion: "Toma una falla tuya ya trabajada y úsala hoy para servir (consolar a quien cae igual, enseñar lo que te costó). Así sellas tu tikún: la herida vuelta luz.",
  },
};
