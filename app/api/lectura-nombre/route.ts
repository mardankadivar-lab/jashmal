import { anthropic, buildLecturaNombrePrompt, STUDY_MODEL } from "@/lib/engine/anthropic";
import { checkRateLimit, clientIp } from "@/lib/infra/rateLimit";
import { leerNombre, type LecturaNombreData } from "@/lib/sources/nameReading";
import { LETTER_MEANINGS, resolveHebrewLetter } from "@/lib/nodes/hebrewLetters";

export const runtime = "nodejs";
export const maxDuration = 300;

interface LecturaRequest {
  locale?: string;
  /** nombre YA en hebreo (lo produce /api/translit o lo escribe la persona) */
  nombre?: string;
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

// Construye el bloque de SENTIDOS DE LETRAS desde el corpus verificado
// (LETTER_MEANINGS de hebrewLetters.ts). La IA SOLO puede usar estos sentidos.
function letrasBlock(data: LecturaNombreData): string {
  const vistas = new Set<string>();
  const lineas: string[] = [];
  for (const l of data.letras) {
    const glifo = resolveHebrewLetter(l.base);
    if (vistas.has(glifo)) continue; // glosamos cada letra una vez
    vistas.add(glifo);
    const m = LETTER_MEANINGS[glifo];
    if (!m) continue;
    lineas.push(
      `  • ${m.letter} (${m.name}, valor ${m.value}) — forma: ${m.form}\n` +
        `    sentido interior: ${m.innerMeaning}\n` +
        `    canal de consciencia: ${m.consciousness}` +
        (m.zerohar ? `\n    enseñanza: ${m.zerohar}` : ""),
    );
  }
  return lineas.join("\n");
}

// Construye el bloque de DATOS MECÁNICOS ya calculados por el backend.
function mecanicaBlock(d: LecturaNombreData): string {
  const partes: string[] = [];

  partes.push(`GEMATRÍA DEL NOMBRE (calculada por el backend): ${d.normalizado} = ${d.gematria}.`);

  // Camino de las letras (orden + valor)
  partes.push(
    "ORDEN DE LAS LETRAS: " +
      d.letras.map((l) => `${l.glifo} (${l.nombre}, ${l.valor})`).join(" → "),
  );

  if (d.rosheiSofei) {
    const rs = d.rosheiSofei;
    partes.push(
      `ROSHEI + SOFEI TEVOT (primera + última letra): ${rs.combinacion} = ${rs.valor}` +
        (rs.glosa ? ` — el backend confirma que es palabra real: «${rs.glosa}»${rs.ref ? ` (${rs.ref})` : ""}.` : " — el backend NO la reconoce como palabra con sentido; no inventes uno."),
    );
  }

  if (d.particiones.length > 0) {
    const lineas = d.particiones.map((p) =>
      "  · " +
      p.sentidos
        .map((s) => `${s.fragmento} (${s.valor}, «${s.glosa}»${s.ref ? `, ${s.ref}` : ""})`)
        .join(" + "),
    );
    partes.push("PARTICIÓN / NOTARIKÓN (cortes válidos confirmados por el backend):\n" + lineas.join("\n"));
  } else {
    partes.push("PARTICIÓN / NOTARIKÓN: el backend no halló cortes con sentido. OMITE esta herramienta.");
  }

  if (d.tzerufim.length > 0) {
    partes.push(
      "TZERUF / ANAGRAMA (palabras reales confirmadas por el backend): " +
        d.tzerufim.map((t) => `${t.palabra} (${t.valor}, «${t.glosa}»${t.ref ? `, ${t.ref}` : ""})`).join("; ") +
        ".",
    );
  } else {
    partes.push("TZERUF / ANAGRAMA: el backend no halló anagrama que sea palabra real. OMITE esta herramienta (NO inventes que un anagrama existe).");
  }

  if (d.atbash.tieneSentido) {
    partes.push(`ATBASH (cifra א↔ת): ${d.atbash.palabra} — el backend lo reconoce como palabra: «${d.atbash.glosa}».`);
  } else {
    partes.push(`ATBASH (cifra א↔ת): ${d.atbash.palabra} — SIN LECTURA CLARA (no es palabra con sentido). NO inventes un derash; di que aquí el nombre "guarda silencio".`);
  }

  if (d.milui.letras.length > 0) {
    partes.push(
      "MILUI (deletreo de cada letra): " +
        d.milui.letras.map((l) => `${l.letra}→${l.deletreo}=${l.valor}`).join(", ") +
        ` · suma total del milui = ${d.milui.total}.`,
    );
  }

  if (d.equivalencias.length > 0) {
    const lineas = d.equivalencias.map(
      (e) =>
        `  · ${e.fuente} = ${e.valor} = ` +
        e.iguales.map((x) => `${x.palabra} («${x.glosa}»${x.ref ? `, ${x.ref}` : ""})`).join(", "),
    );
    partes.push("EQUIVALENCIAS DE GEMATRÍA (mismo valor, REALES, verificadas por el backend):\n" + lineas.join("\n"));
  } else {
    partes.push("EQUIVALENCIAS DE GEMATRÍA: el backend no halló equivalencias notables. OMITE esta herramienta.");
  }

  return partes.join("\n\n");
}

function buildUserPrompt(d: LecturaNombreData): string {
  return `La persona te entrega VOLUNTARIAMENTE su propio nombre en hebreo para que le ofrezcas un DERASH (lectura meditativa) de sus letras. Estos son los ÚNICOS sentidos de letras y los ÚNICOS números/herramientas que puedes usar — todos verificados o calculados por el backend de Jashmal. NO inventes ni añadas otros números, fuentes, equivalencias, anagramas ni gematrías.

NOMBRE EN HEBREO: ${d.nombre}

SENTIDOS DE LAS LETRAS (corpus verificado de Jashmal — usa SOLO estos):
${letrasBlock(d)}

DATOS MECÁNICOS YA CALCULADOS POR EL BACKEND (úsalos tal cual; NO recalcules ni inventes):
${mecanicaBlock(d)}

Compón la Lectura del Nombre siguiendo EXACTAMENTE la estructura y TODAS las reglas de tu marco. Es un derash, una puerta de meditación: NUNCA un destino. Donde el backend marcó "sin lectura clara" u "omite", respétalo: no inventes. Cierra con el libre albedrío por encima del nombre y la entrega a Dios.`;
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return new Response(JSON.stringify({ error: "origin_not_allowed" }), { status: 403 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: "missing_api_key" }), { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return new Response(JSON.stringify({ error: "rate_limited" }), { status: 429 });
  }

  let body: LecturaRequest;
  try {
    body = (await req.json()) as LecturaRequest;
  } catch {
    return new Response(JSON.stringify({ error: "invalid_body" }), { status: 400 });
  }

  const locale = ["es", "fa", "en"].includes(body.locale ?? "")
    ? (body.locale as string)
    : "es";

  // Validar y calcular la matemática EN EL BACKEND (regla dura). Solo letras hebreas.
  const data = leerNombre(body.nombre ?? "");
  if (data.normalizado.length < 2) {
    return new Response(JSON.stringify({ error: "name_too_short" }), { status: 400 });
  }
  // Tope defensivo: nombres absurdamente largos (no es un texto, es un nombre).
  if (data.letras.length > 16) {
    return new Response(JSON.stringify({ error: "name_too_long" }), { status: 400 });
  }

  const systemPrompt = buildLecturaNombrePrompt(locale);
  const userPrompt = buildUserPrompt(data);

  // STREAMING: igual patrón blindado que /api/espejo (evita timeouts; protege la
  // API key en backend; no expone la mecánica fuera del cálculo determinista).
  try {
    const stream = anthropic.messages.stream({
      model: STUDY_MODEL,
      max_tokens: 4000,
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
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          console.error("lectura-nombre stream error", err);
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
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("lectura-nombre setup error", err);
    return new Response(JSON.stringify({ error: "lectura_failed" }), { status: 502 });
  }
}

// Endpoint GET para mostrar los DATOS CALCULADOS sin llamar a la IA (la UI los
// muestra antes/junto al derash). Solo matemática determinista; sin API key.
export async function GET(req: Request) {
  if (!originAllowed(req)) {
    return new Response(JSON.stringify({ error: "origin_not_allowed" }), { status: 403 });
  }
  const { searchParams } = new URL(req.url);
  const nombre = searchParams.get("nombre") ?? "";
  const data = leerNombre(nombre);
  if (data.normalizado.length < 2) {
    return new Response(JSON.stringify({ error: "name_too_short" }), { status: 400 });
  }
  return new Response(JSON.stringify({ data }), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
