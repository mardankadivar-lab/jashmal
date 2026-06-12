import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
// Tiempo suficiente para que Telegram procese la imagen si es grande
export const maxDuration = 30;

const TELEGRAM_API = "https://api.telegram.org";
const MAX_CAPTION_LENGTH = 1024;

interface TelegramPostRequest {
  imageUrl?: string;
  captionFa?: string;
  linkUrl?: string;
}

interface TelegramResponse {
  ok: boolean;
  result?: {
    message_id: number;
    [key: string]: unknown;
  };
  description?: string;
}

function buildCaption(captionFa: string | undefined, linkUrl: string | undefined): string {
  let text = captionFa ?? "";

  if (linkUrl) {
    const suffix = `\n\n🌐 ${linkUrl}`;
    // Truncar el caption para que con el suffix no supere el límite
    const maxBase = MAX_CAPTION_LENGTH - suffix.length;
    if (text.length > maxBase) {
      text = text.slice(0, maxBase - 1) + "…";
    }
    text = text + suffix;
  } else {
    if (text.length > MAX_CAPTION_LENGTH) {
      text = text.slice(0, MAX_CAPTION_LENGTH - 1) + "…";
    }
  }

  return text;
}

function validateAdminToken(req: NextRequest): boolean {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return false;

  // Acepta "Bearer <token>" o directamente "<token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : authHeader.trim();

  return token === process.env.ADMIN_TOKEN;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // 1. Autenticación
  if (!validateAdminToken(req)) {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  // 2. Leer y validar el body
  let body: TelegramPostRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Body JSON inválido" },
      { status: 400 }
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;

  if (!botToken || !channelId) {
    console.error("[telegram] Variables de entorno TELEGRAM_BOT_TOKEN o TELEGRAM_CHANNEL_ID no configuradas");
    return NextResponse.json(
      { ok: false, error: "Configuración de servidor incompleta" },
      { status: 500 }
    );
  }

  const caption = buildCaption(body.captionFa, body.linkUrl);

  let telegramResponse: Response;

  try {
    if (body.imageUrl) {
      // 3a. sendPhoto — imagen + caption
      telegramResponse = await fetch(
        `${TELEGRAM_API}/bot${botToken}/sendPhoto`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: channelId,
            photo: body.imageUrl,
            caption: caption || undefined,
            parse_mode: "HTML",
          }),
        }
      );
    } else {
      // 3b. sendMessage — solo texto
      const text = caption || "(sin contenido)";
      telegramResponse = await fetch(
        `${TELEGRAM_API}/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: channelId,
            text,
            parse_mode: "HTML",
            disable_web_page_preview: false,
          }),
        }
      );
    }
  } catch (err) {
    console.error("[telegram] Error al llamar a la API de Telegram:", err);
    return NextResponse.json(
      { ok: false, error: "Error de red al contactar Telegram" },
      { status: 502 }
    );
  }

  // 4. Procesar respuesta de Telegram
  const data: TelegramResponse = await telegramResponse.json();

  if (!data.ok) {
    console.error("[telegram] Telegram devolvió error:", data.description);
    return NextResponse.json(
      { ok: false, error: data.description ?? "Error desconocido de Telegram" },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message_id: data.result?.message_id,
  });
}
