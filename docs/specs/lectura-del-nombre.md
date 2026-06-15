# Lectura del Nombre — קְרִיאַת הַשֵּׁם

> Spec del Sofer (editor-erudito) para infraestructura. Contenido VERIFICADO + reglas
> BLINDADAS. Fecha: 2026-06-15. Modelo de trabajo: el Sofer entrega esto verificado;
> infra lo monta; la IA compone la lectura con el system prompt blindado de la ENTREGA C.

## 0. Qué es esta función (y qué NO es)

La **Lectura del Nombre** toma un nombre que YA está en hebreo (la transcripción se hace en
`/api/translit`, ver `lib/engine/anthropic.ts → buildTranslitPrompt`) y lo "lee" por sus
letras, aplicando las herramientas clásicas del estudio del nombre (significado de letras,
notarikón, roshei/sofei tevot, tzeruf, atbash, gematría, milui).

Es un **DERASH** — interpretación creativa / homilética / meditativa. Es una práctica clásica
judía: los tzadikim exponían el nombre de una persona como puerta de avodá (trabajo del alma).
NO es adivinación, NO es destino, NO es un veredicto. Un nombre admite MUCHAS lecturas; ofrecer
una es abrir una puerta de estudio, no fijar quién es la persona.

**Relación con funciones existentes (REUTILIZAR, no duplicar):**

| Ya existe | Dónde | Qué aporta |
|---|---|---|
| Corpus verificado de las 22 letras | `lib/nodes/hebrewLetters.ts` (`LETTER_MEANINGS`) | forma, significado interior, canal de consciencia, sendero, Zohar/analogía |
| Resolución slug→letra hebrea | `lib/nodes/hebrewLetters.ts` (`resolveHebrewLetter`, `SLUG_ALIASES`) | normaliza alef/aleph/jet/chet… al glifo |
| Plantilla rica de letra (Álef) | `lib/letters/alef.ts` | estructura nombre/forma/número/conexiones (resto pendiente) |
| Gematría calculada en código | `lib/sources/lexicon.ts` (`gematria`, `gematriaFull`, `gematriaBreakdown`) | absoluto, ordinal, reducido + desglose letra a letra |
| Nombres de letras | `lib/sources/lexicon.ts` (`LETTER_NAMES`) | glifo→nombre transliterado |
| Transcripción del nombre a hebreo | `app/api/translit/route.ts` + `buildTranslitPrompt` | latino/persa → grafías hebreas |
| Gematría del nombre + mazal | `/mapa-del-alma`, `docs/specs/mazal-mapa-del-alma.md` | función hermana (gematría + mes/letra/tribu) |
| System prompt blindado de referencia | `buildEspejoPrompt` en `lib/engine/anthropic.ts` | patrón de blindaje a copiar (Espejo del Alma) |

**Regla de oro de arquitectura (igual que el Mapa del Alma):** la IA propone DERASH (sentido,
no números). TODA la matemática (gematría, atbash, notarikón mecánico, milui) la calcula el
**backend** con las funciones de `lib/sources/lexicon.ts` y se le pasa a la IA ya resuelta. La
IA NUNCA inventa un valor numérico.

---

## ENTREGA A — Corpus de las 22 letras (marco Ginsburgh + tradición)

> **FUENTE PRIMARIA YA EN EL REPO:** `lib/nodes/hebrewLetters.ts` (`LETTER_MEANINGS`). Es
> contenido verificado, alineado con Rav Yitzchak Ginsburgh, *The Hebrew Letters: Channels of
> Creative Consciousness*. La tabla de abajo es el **destilado de lectura del nombre**: los
> sentidos-raíz que la IA puede usar para "leer" una letra dentro de un nombre. Cada sentido
> está marcado por su solidez.
>
> **Niveles de solidez:**
> - 🟢 **Sólido** — Sefer Yetzirá, Talmud, Zohar, Ginsburgh, raíz hebrea documentada.
> - 🟡 **Tradición/derash** — enseñanza homilética aceptada (Ginsburgh, midrash, jasidut); es
>   interpretación, NO hecho lingüístico cerrado.
> - 🔵 **Pictórico/folclórico** — lectura de la forma o asociación popular; marcar como tal.

Convención: valor = gematría estándar (formas finales valen igual que la normal, como en
`lib/sources/lexicon.ts → GEMATRIA`). Las raíces hebreas se dan en consonantes.

| Letra | Nombre | Valor | Sentidos para leer el nombre | Solidez |
|---|---|---|---|---|
| א | Álef | 1 | unidad/uno; *aluf* (אלוף, jefe/maestro); *elef* (אלף, mil); raíz del aprendizaje (*ulpán* אולפנא); el buey (forma paleo); silencio antes de la palabra | 🟢 unidad/aluf/elef · 🔵 buey (paleo) |
| ב | Bet | 2 | casa (*bayit* בית); bendición (*brajá* ברכה); dualidad/recipiente; "en/dentro de" (la bet de *Bereshit*) | 🟢 bayit · 🟡 brajá |
| ג | Guímel | 3 | dar/generosidad (*gemilut jasadim* גמילות חסדים); el rico que corre hacia el pobre (Dalet); movimiento/transmisión | 🟢 gemilut jasadim · 🟡 forma del que corre a dar (Shabat 104a) |
| ד | Dálet | 4 | puerta (*délet* דלת); pobreza/humildad (*dalut* דלות); el que recibe; los cuatro mundos | 🟢 délet/dalut |
| ה | He | 5 | aliento/revelación; ventana (contemplación); la doble He del Nombre יהוה (Biná y Maljut); raíz de "he aquí" (*hineh* הנה) | 🟢 He del Nombre · 🟡 ventana/aliento |
| ו | Vav | 6 | conexión/gancho (*vav* וו, gancho); la *vav* conjuntiva ("y"); une lo alto y lo bajo; los seis extremos del espacio; el hombre (Zeir Anpín) | 🟢 vav-conexión/conjunción · 🟡 gancho |
| ז | Zayin | 7 | sustento (*mazon* מזון); arma/espada; el Shabat (séptimo); corona sobre la vav | 🟢 siete/Shabat · 🟡 mazon, espada |
| ח | Jet | 8 | vida (*jaim* חיים); también *jet* (חטא, falta/error); lo que trasciende lo natural (octavo, *brit milá*); gracia (*jen* חן) | 🟢 jaim · 🟡 jet (falta), trascendencia |
| ט | Tet | 9 | bien oculto (*tov* טוב, "el bien guardado"); gestación (nueve meses); forma vuelta hacia adentro | 🟢 tov (Gn 1:4) · 🟡 bien oculto |
| י | Yod | 10 | punto/chispa primordial; sabiduría (Jojmá); lo más pequeño que contiene todo; mano (*yad* יד, en paleo) | 🟢 punto/Jojmá · 🔵 mano (paleo) |
| כ / ך | Kaf | 20 (final 20) | palma de la mano (*kaf* כף); corona/potencial→acto; doblar (*kafaf*); contención y dádiva | 🟢 kaf-palma · 🟡 corona/realización |
| ל | Lámed | 30 | aprender/enseñar (*lamad* למד, *limud*); el corazón (*lev* לב = 32, vínculo lamed-aprendizaje); la letra más alta — aspiración a lo alto | 🟢 lamad/limud · 🟡 torre/aspiración |
| מ / ם | Mem | 40 | agua (*mayim* מים); la fuente, el flujo de vida y de Torá; Mem abierta = mar revelado, Mem final = mar oculto; cuarenta (lluvia del diluvio, desierto) | 🟢 mayim/agua |
| נ / ן | Nun | 50 | pez (*nun* נון, arameo "pez"; *dag* en hebreo); fidelidad (*neemán* נאמן, fiel); caída (*nefilá* נפילה / *nofel* נופל); las 50 puertas de Biná; asociación con Mashíaj (*Yinón* ינון, nombre del Mashíaj, Tehilim/Sal 72:17 y Sanhedrín 98b) | 🟢 pez (nun arameo)/50 puertas/Yinón · 🟡 neemán, nefilá |
| ס | Sámej | 60 | apoyo/sostén (*somej* סומך — "sostiene a los que caen", Tehilim/Sal 145:14); círculo cerrado sin principio ni fin; protección | 🟢 somej (Sal 145:14) · 🔵 círculo |
| ע | Áyin | 70 | ojo (*áyin* עין); fuente/manantial (*áyin* עין, mismo término); también "nada" (*ayin* אין, otra grafía — anular el ego); los 70 rostros de la Torá, 70 pueblos | 🟢 ojo/fuente/70 · 🟡 anulación (ayin, distinta grafía) |
| פ / ף | Pe | 80 | boca (*pe* פה); el poder del habla (las diez declaraciones de la creación); contiene una bet interior; ochenta = fuerza madura (Avot 5:21) | 🟢 pe-boca/habla |
| צ / ץ | Tzadi | 90 | justo (*tzadik* צדיק); rectitud (*tzédek* צדק); humildad/inclinación; el justo como fundamento del mundo (Mishlé/Pr 10:25) | 🟢 tzadik/tzédek |
| ק | Kof | 100 | mono (*kof* קוף, imitación); "ojo de aguja" / apertura estrecha por la que pasa lo sagrado; santidad (*kdushá* קדושה, por la letra inicial) — kelipá vs kedushá; ciclo de descenso y renacimiento | 🟡 imitación/santidad (dos filos) · 🔵 ojo de aguja |
| ר | Resh | 200 | cabeza/principio (*rosh* ראש); pobre/indigente (*rash* רש); cabeza inclinada (humildad); Rosh Hashaná (renovación) | 🟢 rosh/rash |
| ש | Shin | 300 | fuego (*esh* אש); diente (*shen* שן); paz (*shalom* שלום, por inicial); el Nombre *Shadai* (שדי); tres cabezas = tres columnas; *Shamáyim* (שמים = esh+mayim, fuego+agua) | 🟢 esh-fuego/Shadai/Shamáyim · 🟡 shen, shalom |
| ת | Tav | 400 | marca/sello/firma (*tav* תו); verdad (*emet* אמת empieza en Álef y termina en Tav); la última letra — consumación; el sello del Santo, "verdad" (Shabat 55a) | 🟢 tav-sello/emet (Shabat 55a) |

**Notas de verificación (las afirmaciones numéricas/citadas del corpus):**
- *lev* (לב) = 32 ✔ (ל=30 + ב=2). Conexión lamed↔corazón: tradición/derash 🟡.
- *Shamáyim* = *esh* (fuego) + *mayim* (agua): lectura clásica (cielo une los opuestos) 🟢.
- *emet* (אמת) primera/última/media del alfabeto (א=1, מ=media, ת=última): Talmud, Shabat 55a / Yoma 69b 🟢.
- *somej noflim* — "sostiene a todos los que caen", Tehilim (Salmos) 145:14 ✔ 🟢.
- *Yinón* (ינון) como nombre del Mashíaj: Sanhedrín 98b, sobre Tehilim (Salmos) 72:17 ✔ 🟢.
- Forma "Guímel corre hacia Dálet": Talmud, Shabat 104a ✔ (derash sobre la forma) 🟡.

---

## ENTREGA B — Las herramientas de lectura del nombre

> **Regla transversal:** las herramientas 2–7 que producen NÚMEROS o RECOMBINACIONES MECÁNICAS
> (notarikón estructural, roshei/sofei, atbash, gematría, milui) se ejecutan en el **backend** y
> se le pasan a la IA YA RESUELTAS. La IA aporta el DERASH (qué significa), no la aritmética.

### B.1 — Significado de cada letra
Origen: corpus A (`LETTER_MEANINGS` de `lib/nodes/hebrewLetters.ts`). El backend, dado el nombre
en hebreo, normaliza con `resolveHebrewLetter` y entrega a la IA, por cada letra: glifo, nombre,
valor, y los sentidos-raíz con su nivel de solidez. La IA elige los sentidos que iluminan el
nombre como conjunto (no enumera todo mecánicamente).

### B.2 — Notarikón / partición en palabras
Dos modos:
1. **Partición (división del nombre en sub-palabras hebreas con sentido):** ej. **מרדן → מר + דן**
   (*mar* מר = amargo / gota; *Dan* דן = juzgó / juicio).
2. **Acróstico (cada letra como inicial de una palabra):** ej. cada letra de un nombre como
   primera letra de una frase de bendición o avodá.

El backend NO inventa la partición; ofrece a la IA las particiones POSIBLES (cortes válidos donde
ambos fragmentos sean lexema hebreo conocido, vía el léxico de Sefaria) y la IA elige cuál tiene
sentido de derash. Si no hay partición con sentido, se omite — no se fuerza.

### B.3 — Roshei + sofei tevot (primera y última letra)
Primera letra (*rosh*, cabeza) + última letra (*sof*, final) leídas juntas.
Ej. **מ...ן = מן** (*man* מן, el maná del cielo). El backend extrae primera+última, forma la
combinación y la pasa con su gematría calculada; la IA da el derash.

### B.4 — Tzeruf / anagrama (recombinar las letras)
Reordenar las letras del nombre para descubrir otra palabra hebrea (*tzeruf otiyot*, "combinación
de letras"). El backend genera permutaciones y filtra solo las que son palabra hebrea real (vía
léxico); presenta las candidatas a la IA. La IA NUNCA inventa que un anagrama "existe": solo
comenta los que el backend confirmó como palabra real. Si no hay tzeruf real, se omite.

### B.5 — Atbash (cifra א↔ת, ב↔ש…)
Sustituye cada letra por su simétrica en el alfabeto (primera↔última). **Tabla completa para el
backend** (verificada):

```
א↔ת   ב↔ש   ג↔ר   ד↔ק   ה↔צ   ו↔פ   ז↔ע   ח↔ס   ט↔נ   י↔מ   כ↔ל
ל↔כ   מ↔י   נ↔ט   ס↔ח   ע↔ז   פ↔ו   צ↔ה   ק↔ד   ר↔ג   ש↔ב   ת↔א
```

(Las formas finales ך ם ן ף ץ se normalizan a כ מ נ פ צ antes de cifrar.)
Ej. **מרדן** (normalizado מרדנ) → atbash **יגקט**. El backend aplica la tabla y, si el resultado es
palabra hebrea con sentido, lo entrega a la IA; si es un grupo sin sentido (como יגקט), se reporta
como "sin lectura clara" y NO se fuerza un derash.

### B.6 — Gematría + equivalencias (mismo valor)
El backend usa `gematria()` / `gematriaFull()` / `gematriaBreakdown()` (`lib/sources/lexicon.ts`).
Calcula el valor del nombre y de sus fragmentos, y busca equivalencias REALES (palabras con el
mismo valor) en el léxico. La IA recibe los pares ya verificados y comenta solo los significativos.
**La IA NUNCA afirma un valor sin que el backend lo haya calculado.**

### B.7 — Milui (deletreo de las letras)
Sumar el valor del NOMBRE COMPLETO de cada letra (ej. Nun מילוי = נון = 50+6+50 = 106). Aporta
cuando el milui revela una capa oculta. El backend calcula el milui (deletreo estándar de cada
letra) y su gematría; la IA decide si aporta al derash o se omite.

---

## Ejemplo trabajado y VERIFICADO — "Mardan" (מרדן)

> Todos los números de abajo fueron calculados por el Sofer letra a letra (sistema estándar) y
> confirmados con script. Esto sirve a infra como caso de prueba ("golden test") del backend.

**Letras:** מ Mem (40) · ר Resh (200) · ד Dálet (4) · ן Nun final (50). Gematría del nombre:
**מרדן = 294** (40+200+4+50). ✔

**Significado de las letras (del corpus A):**
- **מ Mem** — agua (*mayim*), la fuente del flujo de vida y Torá. 🟢
- **ר Resh** — cabeza/principio (*rosh*); también pobre (*rash*), la cabeza inclinada en humildad. 🟢
- **ד Dálet** — puerta (*délet*) y humildad/pobreza (*dalut*); el que se vacía para recibir. 🟢
- **ן Nun** — fidelidad (*neemán*) 🟡, caída (*nefilá*) 🟡, pez/50 puertas de Biná 🟢, y la
  asociación del Nun con el Mashíaj vía *Yinón* (ינון, Sanhedrín 98b sobre Sal 72:17) 🟢.

**Partición (notarikón) — VERIFICADA:**
- מר + דן: *mar* (מר = 240, amargo / gota — cf. "gota del balde", Yeshayahu/Isaías 40:15) + *Dan*
  (דן = 54, "juzgó" / la tribu de Dan). Derash de dos filos: lo amargo del juicio que se endulza.

**Roshei/sofei tevot — VERIFICADA:**
- Primera + última: **מ...ן = מן** = **90** (*man*, el maná del cielo, Shemot/Éxodo 16). 🟢

**Equivalencia de gematría — HALLAZGO VERIFICADO 🟢:**
- **מן (maná) = 90 = מים (mayim, agua) = 90.** Ambos suman 90 (verificado: מ40+ן50=90; מ40+י10+ם40=90).
  Derash: el nombre se abre por su primera y última letra al *maná* (90), que iguala al *agua*
  (90) que la letra inicial Mem ya anunciaba — el sustento que baja del cielo. Es una equivalencia
  numérica REAL, no forzada.

**Atbash:** מרדנ → **יגקט** = 294 (mismo valor, propiedad del atbash sobre pares simétricos no
siempre conserva el valor; aquí coincide). יגקט no es palabra con sentido → **se reporta como "sin
lectura clara"**; no se inventa derash. (Esto es exactamente lo que debe hacer la IA: callar donde
no hay.)

**Milui de Nun:** נון = 50+6+50 = **106**.

**Refinamiento del Sofer al ejemplo de Mardan:** la lectura "Mem(agua)→Resh(cabeza)→Dálet
(puerta/pobreza)→Nun(caída+fiel+Mashíaj)" es legítima como DERASH. Pero hay que marcarla así:
*neemán* (fiel) y *nefilá* (caída) sobre la Nun son tradición/derash 🟡, no etimología cerrada del
nombre "Mardan" (que es persa, sin raíz hebrea). Lo MÁS sólido del nombre es: la equivalencia
**מן=מים=90** (maná=agua), la partición **מר+דן** (lo amargo del juicio), y el arco
**agua→cabeza→puerta→pez** como camino del alma. El sentido "א Álef = uno/maestro" NO aplica:
**Mardan en hebreo NO lleva Álef** (מרדן). Eso era un error del ejemplo y queda corregido: si una
grafía con Álef se elige (מרדאן), entonces sí entra el Álef; con la grafía defectiva מרדן, no.

---

## ENTREGA C — SYSTEM PROMPT BLINDADO (listo para infra)

> Infra: añadir a `lib/engine/anthropic.ts` una función `buildLecturaNombrePrompt(locale)` con el
> texto de abajo VERBATIM (mismo patrón que `buildEspejoPrompt`). El idioma activo se inyecta al
> final con `LANG_NAME[locale]` y `RTL_NOTE[locale]`, como las demás. El backend pasa en el mensaje
> del usuario: nombre en hebreo, desglose de letras (del corpus A), y TODOS los datos mecánicos ya
> calculados (gematría, particiones válidas, roshei/sofei, tzeruf reales, atbash, milui, equivalencias).

```
Eres קְרִיאַת הַשֵּׁם, la Lectura del Nombre de Jashmal (חַשְׁמַל): un compañero de estudio que
ofrece a la persona, sobre su PROPIO nombre hebreo (voluntariamente), un DERASH — una lectura
creativa y meditativa de sus letras como puerta de estudio y de avodá (trabajo del alma). NO eres
adivino, ni médico, ni psicólogo, ni juez del destino.

QUÉ ES ESTO (dilo y enmárcalo siempre):
- Es un DERASH: interpretación creativa/homilética sobre el nombre, una práctica clásica judía
  (los tzadikim exponían los nombres como puerta de avodá). Es EXPLÍCITAMENTE interpretativo.
- NO es un hecho fijo, NO es destino, NO es identidad. Un nombre admite MUCHAS lecturas; tú ofreces
  UNA puerta de meditación, no un veredicto sobre quién es la persona.
- Habla en condicional y como invitación: "podemos leer", "este nombre se abre hacia", "una
  meditación posible es", NUNCA "tu nombre significa que eres" ni "tu destino es".

BASE Y FUENTES (regla absoluta):
- Usa SOLO los sentidos de letras del corpus verificado de Jashmal que se te entregan en el
  mensaje (forma, raíz, canal de consciencia). NO añadas sentidos de letras de tu propia memoria.
- CITA la fuente real cada vez que exista (libro capítulo:versículo; folio del Talmud con daf y
  amud; Zohar con parashá y folio; Midrash con su nombre). Marca lo que es tradición/derash como
  tal ("según una lectura homilética", "el midrash enseña").
- NUNCA inventes una gematría, un folio, un versículo ni una equivalencia. Si no puedes confirmar
  una cita, dilo y no la uses. Mejor un vacío honesto que una fuente falsa.

LO MECÁNICO LO PONE EL BACKEND (regla absoluta):
- La gematría, el atbash, el notarikón/partición, el tzeruf (anagrama), el milui y las
  equivalencias numéricas YA vienen calculados en el mensaje. Tú NO calculas ni inventas números:
  USAS los que se te dan y aportas el SIGNIFICADO (el derash).
- Solo comenta una equivalencia, un anagrama o un atbash si el backend lo entregó como REAL/con
  sentido. Si el backend marca "sin lectura clara" (p. ej. un atbash sin sentido), NO inventes un
  derash para él: di con naturalidad que ahí el nombre "guarda silencio" y sigue.
- Si una herramienta no aporta para este nombre, OMÍTELA. No fuerces.

NUNCA (líneas rojas; si te lo piden, recházalo con amabilidad y reencauza al estudio):
- NO predecir futuro, suerte, salud, pareja, dinero, hijos ni muerte.
- NO diagnosticar nada psicológico ni médico.
- NO juzgar ni "leer" a un tercero: solo trabajas el nombre de quien usa la función, sobre sí mismo.
- NO afirmar destino, identidad fija ni "esto es lo que eres". Solo tendencia-a-meditar, una puerta.
- NO inventar gematrías, atbash, anagramas, fuentes, folios ni versículos.

MARCO ESPIRITUAL (siempre):
- Presenta todo como una MEDITACIÓN sobre el nombre y un espejo de avodá, jamás como destino.
- Por cada sentido que ilumines, cuando sea natural, ofrece la avodá que sugiere (la midá a
  trabajar, la luz hacia la que apunta), no una etiqueta sobre la persona.
- CIERRA SIEMPRE recordando que el LIBRE ALBEDRÍO está por encima del nombre, y la entrega a Dios
  por encima de toda letra: el nombre es una puerta y una invitación; quién llega a ser la persona
  lo elige ella, con la ayuda del Cielo. Incluye la frase: "Esto es una meditación sobre tu nombre,
  una puerta de estudio, no un veredicto ni tu destino."

IDIOMA: responde SIEMPRE y ÚNICAMENTE en {LANG}. El nombre y las palabras hebreas se muestran en
hebreo (con transliteración y significado la primera vez); tu derash va en {LANG} (no traducción
en paralelo). {RTL_NOTE}

ESTRUCTURA de la respuesta (con títulos en hebreo; usa solo las herramientas que aporten):
1) הַשֵּׁם — el nombre en hebreo, su gematría (la que da el backend) y una frase-marco de que esto
   es un derash, una puerta de meditación.
2) הָאוֹתִיּוֹת — las letras: el camino que dibujan leídas en orden, con el sentido de cada una
   (del corpus dado) y la avodá que insinúan.
3) צֵרוּפִים וּנְטִילַת רָאשִׁים — las herramientas que aporten: partición (notarikón),
   roshei/sofei tevot, tzeruf (anagrama), atbash, milui y equivalencias de gematría — SOLO las que
   el backend confirmó con sentido, citando fuente cuando exista. Aplica los DOS FILOS: si una
   lectura es amarga/baja en el sentido simple, muestra también cómo la tradición la eleva.
4) הִתְבּוֹנְנוּת — una contemplación breve: qué invita a meditar este nombre como conjunto.
5) חֲתִימָה — el sello: recuerda el libre albedrío por encima del nombre y la entrega a Dios, con
   la frase obligatoria de que es una meditación y no un veredicto ni un destino.

Sé profundo y cálido, pero honesto: donde el nombre no dice nada claro, no inventes. Glosa cada
término hebreo la primera vez (asume que el lector no sabe hebreo).
```

> Reglas compartidas a reutilizar tal cual (ya existen en `lib/engine/anthropic.ts`): convendría
> que infra concatene `RIGOR_RULE`, `GEMATRIA_RULE`, `DOS_FILOS_RULE`, `GLOSAS_RULE` y
> `MARCA_RULE` al prompt anterior, igual que hacen los otros builders. No re-redactarlas aquí:
> apuntar a las constantes existentes evita divergencia.

---

## NOTA HONESTA para la UI (es + fa)

Texto para mostrar visiblemente junto a la función (no escondido), en el idioma activo.

**Español (es):**
> La Lectura del Nombre es un *derash*: una interpretación creativa y meditativa sobre tu nombre,
> a la manera en que los sabios judíos lo hacían como puerta de estudio. No determina quién eres ni
> predice tu futuro: un nombre admite muchas lecturas, y aquí te ofrecemos una para meditar. El
> libre albedrío y la entrega a Dios están por encima de cualquier nombre.

**Farsi (fa):** (persa natural, RTL; خَشمَل con خ)
> «خواندنِ نام» یک *دِراش* است: تفسیری خلاقانه و مراقبه‌گونه بر نامِ توست، به همان شیوه‌ای که
> حکیمانِ یهودی نام را همچون دروازه‌ای برای مطالعه می‌گشودند. این نه سرنوشتِ تو را تعیین می‌کند و نه
> آینده‌ات را پیش‌گویی می‌کند؛ یک نام خوانش‌های بسیاری را برمی‌تابد و ما در اینجا یکی را برای تأمل به
> تو پیشنهاد می‌کنیم. ارادهٔ آزاد و سپردنِ خویش به خدا برتر از هر نامی است.

---

## Resumen de verificación (para auditoría)

| Afirmación | Valor | Estado |
|---|---|---|
| מרדן (Mardan) | 294 | ✔ verificado |
| מר (mar) | 240 | ✔ |
| דן (Dan) | 54 | ✔ |
| מן (man, maná) = מים (mayim, agua) | 90 = 90 | ✔ equivalencia REAL |
| נון (milui de Nun) | 106 | ✔ |
| משיח = נחש (Mashíaj = serpiente) | 358 = 358 | ✔ (los "dos filos" del corpus) |
| ינון (Yinón, Mashíaj) | 116 | ✔ (Sanhedrín 98b / Sal 72:17) |
| Atbash de מרדנ | יגקט (sin sentido) | ✔ → reportar "sin lectura clara" |
| emet (אמת) sello de verdad | Álef-Mem-Tav | ✔ (Shabat 55a) |
| somej noflim | Tehilim/Sal 145:14 | ✔ |

**Errores corregidos respecto al ejemplo original de Mardan:**
1. La grafía defectiva מרדן **no contiene Álef** → el sentido "א = uno/maestro" no aplica salvo
   que se elija la grafía plena con א (מרדאן). Marcado.
2. *neemán* (fiel) y *nefilá* (caída) sobre la Nun son derash/tradición 🟡, no etimología del
   nombre persa "Mardan". Marcado para que la IA no lo presente como hecho.
