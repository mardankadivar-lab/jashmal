import { NextResponse } from "next/server";
import {
  anthropic,
  buildSystemPrompt,
  buildKabbalahStudyPrompt,
  buildConnectionStudyPrompt,
  STUDY_MODEL,
  type StudyMode,
  type ConnectionInfo,
} from "@/lib/engine/anthropic";
import { getEdgeData } from "@/lib/relations/edgeData";
import { checkCitations } from "@/lib/sources/citationCheck";
import { checkMidrashBlock } from "@/lib/study/midrashBlock";
import { filtroSobres } from "@/lib/study/sinSobres";
import { esRefDeMidrash } from "@/lib/sources/midrashRef";
import { esRefDeFilosofia, obraDeFilosofia } from "@/lib/sources/filosofiaRef";
import {
  revisaFilosofia,
  COMPUERTAS_QUE_MARCAN,
  ROTULO_COMPUERTA,
} from "@/lib/study/compuertasFilosofia";
import { tramoDeConteo } from "@/lib/sources/tanajRef";
import { palabrasRepetidas, formateaRepetidas } from "@/lib/study/palabrasRepetidas";
import { rastrosDelPasaje, formateaRastros } from "@/lib/study/rastroPalabra";
import { getText } from "@/lib/sources/sefaria";
import type { Mark } from "@/lib/sources/proseMarks";
import { checkRateLimit, clientIp } from "@/lib/infra/rateLimit";
import { gatherSources, formatSourcesForPrompt } from "@/lib/relations/related";

export const runtime = "nodejs";
// 300s (máximo de Vercel Pro): un estudio profundo con 8000 tokens puede tardar
// más de 120s en Opus; si la función muere antes, el estudio se corta a la mitad.
export const maxDuration = 300;

type StudyDepth = "quick" | "deep";

// Texto de la marca que se inserta en la prosa cuando una cita NO pasa la
// verificación. El detalle concreto ("Bereshit Rabbah tiene 100 capítulos") se
// escribe en español; en fa/en se deja la etiqueta sola para no mezclar idiomas.
const REF_MARK: Record<string, string> = {
  es: "referencia sin confirmar",
  fa: "ارجاع تأییدنشده",
  en: "unconfirmed reference",
};

interface StudyRequest {
  mode: StudyMode;
  locale: string;
  depth?: StudyDepth;
  ref?: string;
  hebrewText?: string;
  term?: string;
  letter?: string;
  context?: string;   // "kabbalah" = Árbol de la Vida · "connection" = relación de la Mente Cósmica
  sefiraId?: string;  // id de la sefirá que originó el estudio
  // Estudio contextual de una CONEXIÓN (Mente Cósmica relacional V3):
  // ids de los nodos (para buscar la curaduría del edge en el servidor) +
  // labels localizados (para el prompt) + camino recorrido.
  connection?: {
    fromId: string;
    toId: string;
    fromLabel: string;
    toLabel: string;
    pathLabels?: string[];
  };
}

function originAllowed(req: Request): boolean {
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) return true;
  const origin = req.headers.get("origin");
  if (!origin) return true;
  return allowed.includes(origin);
}

function buildUserPrompt(
  body: StudyRequest,
  sourcesBlock: string,
  repetidasBlock: string,
  rastroBlock: string
): string {
  if (body.mode === "letter") {
    return `Estudia la letra hebrea: ${body.letter ?? body.term ?? ""}.`;
  }
  // Estudio contextual de una conexión: la relación manda, no el nodo suelto.
  if (body.mode === "concept" && body.context === "connection" && body.connection) {
    const c = body.connection;
    const path =
      c.pathLabels && c.pathLabels.length >= 2
        ? `\nRuta recorrida por el estudiante: ${c.pathLabels.join(" → ")}`
        : "";
    return `Estudia la RELACIÓN entre «${c.fromLabel}» y «${c.toLabel}».
El estudiante llegó a «${c.toLabel}» viajando desde «${c.fromLabel}» en la Mente Cósmica.${path}`;
  }
  if (body.mode === "concept") {
    return `Estudia en profundidad el concepto: ${body.term ?? ""}.`;
  }
  const sources = sourcesBlock ? `\n\n<fuentes>${sourcesBlock}\n</fuentes>` : "";
  // La cuenta de palabras repetidas va aparte y marcada: son DATOS, ya contados
  // por el código, y el motor los copia sin recalcularlos.
  const repetidas = repetidasBlock
    ? `\n\n<palabras_repetidas>\n${repetidasBlock}\n</palabras_repetidas>`
    : "";
  // Y el rastro de una palabra por el Tanaj, también en su sobre: son
  // direcciones ya buscadas por el código, y el motor no puede añadir ninguna.
  const rastro = rastroBlock ? `\n\n<rastro_palabras>\n${rastroBlock}\n</rastro_palabras>` : "";
  return `Referencia: ${body.ref ?? "(sin referencia)"}

Texto fuente (hebreo):
${body.hebrewText ?? ""}

Analiza este pasaje según la estructura indicada.${repetidas}${rastro}${sources}`;
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: "origin_not_allowed" }, { status: 403 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: StudyRequest;
  try {
    body = (await req.json()) as StudyRequest;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const mode: StudyMode = body.mode ?? "text";
  const locale = ["es", "fa", "en"].includes(body.locale ?? "")
    ? (body.locale as string)
    : "es";
  const depth: StudyDepth = body.depth === "deep" ? "deep" : "quick";

  // Modo profundo: recolectar fuentes reales de Sefaria.
  let sourcesBlock = "";
  let sourcesUsed = 0;
  if (depth === "deep" && mode === "text" && body.ref) {
    try {
      const sources = await gatherSources(body.ref);
      sourcesUsed = sources.length;
      sourcesBlock = formatSourcesForPrompt(sources);
    } catch (err) {
      console.error("gatherSources error", err);
    }
  }

  // Las palabras que repite el capítulo, contadas por el código antes de que
  // el motor escriba una línea. Solo en el Tanaj: en el Talmud la unidad no es
  // el capítulo, y un midrash abierto por su puerta ya lleva su propio método.
  //
  // Se cuenta sobre el TRAMO, no sobre el versículo que el lector pulsó: un
  // versículo no repite nada y lo que enseña el énfasis es el capítulo entero.
  // Por eso se trae el texto del capítulo aparte, aunque el estudio sea de un
  // solo verso. Si Sefaria no responde, el estudio sale sin esta sección: es
  // un extra, nunca un motivo para que no haya estudio.
  let repetidasBlock = "";
  // Y nunca en filosofía judía: un epígrafe que cita a Yeshayahu NO convierte
  // el Moré Nevujim en un capítulo del Tanaj. La lista blanca de los 39 libros
  // ya lo impide, pero el cerrojo se escribe igual, porque el fallo que
  // arreglamos fue exactamente ese: tratar la obra por el versículo que cita.
  const tramo =
    mode === "text" && !esRefDeMidrash(body.ref) && !esRefDeFilosofia(body.ref)
      ? tramoDeConteo(body.ref)
      : null;
  if (tramo) {
    try {
      const capítulo = await getText(tramo);
      const hebreo = capítulo.segments.join(" ");
      const conteo = palabrasRepetidas(hebreo);
      repetidasBlock = formateaRepetidas(conteo, tramo);
      console.log(
        `[study] palabras repetidas en ${tramo}: ${conteo.palabras.length} ` +
          `(de ${conteo.total} palabras, umbral ${conteo.desde})`
      );
    } catch (err) {
      console.error("palabras repetidas error", err);
    }
  }

  // El rastro de una palabra por el Tanaj: «en todo lugar donde se dice».
  //
  // Se busca sobre el PASAJE ABIERTO —no sobre el capítulo entero como las
  // palabras repetidas— porque lo que el lector quiere ver iluminado son las
  // palabras que tiene delante. La puerta es la misma que la del conteo: solo
  // Tanaj, y nunca cuando el lector abrió un midrash por su propia puerta,
  // que lleva su propio método.
  //
  // Y es un extra: si la tabla de concordancia está vacía —lo está hasta que
  // se corra scripts/gen-concordancia.mjs— esto devuelve una lista vacía y el
  // estudio sale sin rastro, sin un solo error.
  let rastroBlock = "";
  if (tramo && body.ref) {
    try {
      const rastros = rastrosDelPasaje(body.hebrewText ?? "", body.ref, 2);
      rastroBlock = formateaRastros(rastros, body.ref);
      if (rastros.length > 0) {
        console.log(
          `[study] rastro de palabras en ${body.ref}: ` +
            rastros.map((r) => `${r.consonantes} (${r.total})`).join(", ")
        );
      }
    } catch (err) {
      console.error("rastro de palabras error", err);
    }
  }

  const withSources = sourcesBlock.length > 0;
  // Margen amplio para que la sección final "Sigue el hilo" no se trunque. El
  // estudio DE un midrash lleva también el margen ancho aunque esa vez no
  // traiga fuentes: el método ampliado tiene más secciones que desplegar.
  const maxTokens =
    withSources || esRefDeMidrash(body.ref) || esRefDeFilosofia(body.ref) ? 8000 : 7500;

  // Modo cabalístico (viene del Árbol de la Vida) o modo estándar PaRDeS
  const isKabbalah = body.context === "kabbalah" && !!body.sefiraId && mode === "text";
  const { SEFIROT } = await import("@/lib/nodes/sefirot");
  const sefira = isKabbalah ? SEFIROT.find((s) => s.id === body.sefiraId) : null;

  // Modo CONEXIÓN (Mente Cósmica relacional V3): estudiar la relación entre
  // dos nodos. La curaduría del edge se resuelve AQUÍ (servidor = única fuente
  // de verdad); si no existe, el prompt exige un estudio exploratorio honesto.
  const isConnection =
    body.context === "connection" &&
    mode === "concept" &&
    !!body.connection?.fromId &&
    !!body.connection?.toId &&
    !!body.connection?.fromLabel &&
    !!body.connection?.toLabel;
  const connInfo: ConnectionInfo | null = isConnection
    ? {
        fromLabel: String(body.connection!.fromLabel).slice(0, 120),
        toLabel: String(body.connection!.toLabel).slice(0, 120),
        pathLabels: Array.isArray(body.connection!.pathLabels)
          ? body.connection!.pathLabels.slice(0, 8).map((s) => String(s).slice(0, 120))
          : undefined,
      }
    : null;
  const curatedEdge = isConnection
    ? getEdgeData(body.connection!.fromId, body.connection!.toId)
    : null;

  const systemPrompt = isKabbalah && sefira
    ? buildKabbalahStudyPrompt(locale, sefira.he, sefira.es)
    : isConnection && connInfo
      ? buildConnectionStudyPrompt(locale, connInfo, curatedEdge)
      : buildSystemPrompt(
          mode,
          locale,
          withSources,
          body.ref,
          repetidasBlock.length > 0,
          rastroBlock.length > 0
        );
  const userPrompt = buildUserPrompt(body, sourcesBlock, repetidasBlock, rastroBlock);

  // --- STREAMING: el texto aparece progresivamente mientras Claude genera. ---
  // Esto evita el timeout en Farsi/textos largos (el modelo puede tardar 90-120s).
  try {
    const stream = anthropic.messages.stream({
      model: STUDY_MODEL,
      max_tokens: maxTokens,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: userPrompt }],
    });

    const encoder = new TextEncoder();
    // El primer chunk lleva metadatos (depth, sourcesUsed) codificados en JSON
    // separado del texto con el separador \x00 (null byte).
    const meta = JSON.stringify({ depth, sourcesUsed });

    const readable = new ReadableStream({
      async start(controller) {
        // Primer chunk: metadatos
        controller.enqueue(encoder.encode(meta + "\x00"));
        // Se guarda EXACTAMENTE lo que se envía: así las posiciones que calcula
        // el verificador siguen valiendo en el texto que tiene el cliente.
        let full = "";
        // El sobre de los datos no se publica: si el modelo imita las etiquetas
        // <palabras_repetidas> o <fuentes>, se quedan aquí y no llegan al
        // lector. Se filtra en el servidor para que `full` —sobre el que se
        // calculan las posiciones de las marcas— sea EXACTAMENTE lo enviado.
        const sobres = filtroSobres();
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              const limpio = sobres.trozo(event.delta.text);
              if (limpio) {
                full += limpio;
                controller.enqueue(encoder.encode(limpio));
              }
            }
          }
          const cola = sobres.cierra();
          if (cola) {
            full += cola;
            controller.enqueue(encoder.encode(cola));
          }
          // ── El juicio ────────────────────────────────────────────────────
          // El motor propone, el código juzga. Las citas del estudio (Zóhar,
          // Talmud, Tanaj y Midrash) se cotejan contra las tablas locales del
          // repo; el estudio ya se envió entero, así que las marcas viajan en
          // un TRÁILER y el cliente las inserta al cerrar. Solo se marca lo
          // que se COMPRUEBA que falla: ante la duda no se marca nada.
          // Nada de esto puede tumbar el estudio: si falla, no hay tráiler.
          try {
            const t0 = Date.now();
            const cites = checkCitations(full);
            const label = REF_MARK[locale] ?? REF_MARK.es;
            const marks: Mark[] = cites.findings
              .filter((f) => f.verdict === "false")
              .map((f) => ({
                end: f.end,
                note: locale === "es" ? `${label}: ${f.detail}` : label,
              }));
            console.log(
              `[study] ${mode}/${locale} citas detectadas=${cites.findings.length} ` +
                `existen=${cites.existing} falsas=${cites.falsified} ` +
                `no-concluyentes=${cites.inconclusive} | ${Date.now() - t0}ms`
            );
            for (const f of cites.findings) {
              if (f.verdict === "false") {
                console.log(`[study] cita falsa (${f.kind}): «${f.raw}» → ${f.detail}`);
              }
            }
            // ¿Abrió el midrash o solo lo citó? Esto NO marca nada en la prosa:
            // solo mide, para saber cuántas veces el motor cumple de verdad el
            // método antes de decidir si hay que apretarle la mano. En el
            // estudio DE un midrash no se mide: ahí no hay bloque compacto que
            // medir porque el estudio entero es el análisis, y registrar un
            // "diseccionado=no" haría pasar por fallo lo que es el diseño.
            if (esRefDeMidrash(body.ref)) {
              console.log(`[study] método=midrash ampliado · ${locale} · sin bloque compacto (por diseño)`);
            } else if (esRefDeFilosofia(body.ref)) {
              // ── LAS CUATRO COMPUERTAS DE LA SÉPTIMA ESTANTERÍA ──────────
              // Corren SOBRE LA SALIDA REAL, que es donde tienen que correr:
              // C-1 (pertenencia de la palabra), C-2 (gematría cerrada),
              // C-3 (nadie fuera de la lista) y C-4 (títulos fuera de lugar).
              // Lo que detectan se marca en la prosa como una cita que no pasa
              // la verificación; P-3 solo se mide y se escribe aquí.
              //
              // El corpus contra el que se comprueba es EL QUE SE LE DIO AL
              // MOTOR: el hebreo del pasaje y el hebreo de las fuentes
              // adjuntas. Si no hubo pasaje, C-1 no juzga nada — un corpus
              // vacío que marcara todo sería la peor versión de la compuerta.
              const obra = obraDeFilosofia(body.ref) ?? "(obra no identificada)";
              const comp = revisaFilosofia({
                estudio: full,
                obra,
                pasaje: body.hebrewText ?? "",
                fuentes: sourcesBlock,
              });
              const rotulo = ROTULO_COMPUERTA[locale] ?? ROTULO_COMPUERTA.es;
              for (const h of comp.hallazgos) {
                if (!COMPUERTAS_QUE_MARCAN.includes(h.compuerta)) continue;
                marks.push({
                  end: h.end,
                  note: locale === "es" ? `${h.compuerta} · ${h.detalle}` : rotulo,
                });
              }
              console.log(
                `[study] método=filosofía · ${locale} · obra=${obra} · ` +
                  `compuertas C-1=${comp.resumen["C-1"]} C-2=${comp.resumen["C-2"]} ` +
                  `C-3=${comp.resumen["C-3"]} C-4=${comp.resumen["C-4"]} ` +
                  `P-3=${comp.resumen["P-3"]} (solo medida) · ` +
                  `palabras hebreas confirmadas=${comp.palabrasConfirmadas}`
              );
              for (const h of comp.hallazgos) {
                console.log(`[study] ${h.compuerta}: «${h.raw}» → ${h.detalle}`);
              }
            } else {
              const bloque = checkMidrashBlock(full);
              console.log(
                `[study] método=normal midrash diseccionado=${bloque.found ? "sí" : "no"}` +
                  (bloque.found
                    ? ` líneas=${bloque.lineas}/7 palabras=${bloque.palabras}` +
                      (bloque.problemas.length > 0 ? ` · ${bloque.problemas.join(" · ")}` : " · completo")
                    : "")
              );
            }
            if (marks.length > 0) {
              controller.enqueue(encoder.encode("\x02" + JSON.stringify({ marks })));
            }
          } catch (err) {
            console.error("study verify error", err);
          }
        } catch (err) {
          console.error("study stream error", err);
          // Enviar error al cliente
          controller.enqueue(encoder.encode("\x01error"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Accel-Buffering": "no", // desactiva buffering en nginx/Vercel
      },
    });
  } catch (err) {
    console.error("study setup error", err);
    return NextResponse.json({ error: "study_failed" }, { status: 502 });
  }
}
