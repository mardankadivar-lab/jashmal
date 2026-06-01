import { NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 60;

const VOICE_ID = "30Flj57Y61xChp5iKYNE";
const HAIKU = "claude-haiku-4-5-20251001";

const LANG: Record<string, string> = {
  es: "español",
  fa: "persa (فارسی) — NO árabe; usa vocabulario y gramática persas",
  en: "English",
};

// POST { study, locale } → MP3 audio stream
// Genera primero una síntesis limpia (sin hebreo ni markdown) con Claude Haiku,
// y luego la convierte a voz con ElevenLabs. El audio suena natural al oírlo.
export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY || !process.env.ELEVENLABS_API_KEY) {
    return NextResponse.json({ error: "missing_keys" }, { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`audio:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { study?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const study = (body.study ?? "").trim();
  const locale = ["es", "fa", "en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  const lang = LANG[locale] ?? LANG.es;

  if (!study || study.length < 50) {
    return NextResponse.json({ error: "study_too_short" }, { status: 400 });
  }

  // Paso 1: Claude Haiku genera una síntesis limpia para audio.
  // Sin hebreo, sin markdown, sin tecnicismos sueltos — texto fluido para escuchar.
  let synthesis = "";
  try {
    const msg = await anthropic.messages.create({
      model: HAIKU,
      max_tokens: 700,
      messages: [
        {
          role: "user",
          content: `Eres un narrador cálido de un podcast de espiritualidad y estudio judío.
Se te da un análisis de un texto sagrado. Tu tarea: reescríbelo como una narración hablada,
íntima y contemplativa, de 3-4 párrafos, en ${lang}.

Reglas:
- NO uses palabras en hebreo. Tradúcelas o escríbelas fonéticamente (ej: "tzimtzum" → "el tzimtzúm, la contracción divina").
- NO uses símbolos ni markdown (sin *, #, —, :). Solo puntos y comas.
- Usa frases cortas y variadas. Incluye pausas naturales con puntos.
- Habla en segunda persona cuando corresponda: "cuando lees este texto..." "imagina..."
- El tono es como un maestro hablando con calidez, no un robot leyendo.
- Empieza directamente con el contenido. Sin presentaciones.

Análisis original:
${study.slice(0, 3000)}`,
        },
      ],
    });

    synthesis = msg.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();
  } catch {
    return NextResponse.json({ error: "synthesis_failed" }, { status: 502 });
  }

  // Paso 2: ElevenLabs convierte la síntesis a audio MP3.
  try {
    const elRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: synthesis,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.35,          // menos robótico, más expresivo
            similarity_boost: 0.75,   // fiel a la voz pero con más libertad
            style: 0.50,              // más emoción y calidez
            use_speaker_boost: true,  // claridad y presencia mejoradas
          },
        }),
      }
    );

    if (!elRes.ok) {
      const err = await elRes.text();
      console.error("ElevenLabs error", err);
      return NextResponse.json({ error: "audio_failed" }, { status: 502 });
    }

    const audioBuffer = await elRes.arrayBuffer();
    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": 'inline; filename="jashmal-estudio.mp3"',
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "elevenlabs_error" }, { status: 502 });
  }
}
