import { NextResponse } from "next/server";
import type Anthropic from "@anthropic-ai/sdk";
import { anthropic, LIGHT_MODEL } from "@/lib/anthropic";
import { getBookInfo } from "@/lib/bookInfo";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = LIGHT_MODEL;

const LANG: Record<string, string> = {
  es: "español",
  fa: "persa (فارسی) — NO árabe; usa vocabulario y gramática persas",
  en: "inglés (English)",
};

// POST { id, locale } → { heTitle, summary } resumen breve del libro en ES/FA.
export async function POST(req: Request) {
  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`booksum:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { id?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const id = (body.id ?? "").trim();
  const locale = ["es","fa","en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  if (!id) return NextResponse.json({ error: "missing_id" }, { status: 400 });

  const info = await getBookInfo(id, locale);
  if (!info) {
    return NextResponse.json({ summary: "", heTitle: "" });
  }

  // Sin clave: devolvemos la descripción de Sefaria tal cual (inglés), sin traducir.
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ heTitle: info.heTitle, summary: info.desc || info.shortDesc });
  }

  const lang = LANG[locale] ?? LANG.es;
  const source = [info.desc, info.shortDesc].filter(Boolean).join("\n");

  const prompt = `Eres el guía de estudio de Jashmal. Presenta brevemente el libro
"${info.title}" (${info.heTitle}) para un estudiante que va a empezar a estudiarlo.

Descripción de referencia (de Sefaria, en inglés): ${source || "(no disponible)"}

Escribe en ${lang}, en 3-5 frases cálidas y claras: qué es el libro, de qué trata,
su lugar en la tradición y por qué vale la pena estudiarlo. Sin títulos, sin listas
— un párrafo de presentación COMPLETO que siempre termine con punto final.
Si la descripción de referencia está vacía, usa tu conocimiento del libro pero no
inventes datos dudosos.`;

  try {
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 600,
      messages: [{ role: "user", content: prompt }],
    });
    const summary = msg.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();
    return NextResponse.json({ heTitle: info.heTitle, summary });
  } catch (err) {
    console.error("book-summary error", err);
    return NextResponse.json({ heTitle: info.heTitle, summary: info.desc || info.shortDesc });
  }
}
