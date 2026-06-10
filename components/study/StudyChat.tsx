"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

interface Message {
  role: "user" | "assistant";
  text: string;
}

// Detecta el bloque de opciones al final de la respuesta del tutor.
// Formatos: "**Opción 1:** X / **Opción 2:** Y"  (en línea o separados por salto)
// Devuelve { body: texto sin opciones, options: ["X", "Y"] }
// Divide por los marcadores **Opción N:** mismos — robusto a cualquier
// separador entre ellos (salto de línea, " / ", nada). Antes dependía de un
// " / " antes de "**Opción 2**" y, si Claude usaba un salto de línea, las dos
// preguntas terminaban juntas en un solo botón.
function parseOptions(text: string): { body: string; options: string[] } {
  // Marcador: **Opción 1:**, **Option 2**, **گزینه ۱:** (dígitos latinos o persas)
  const markerRe = /\*\*\s*(?:Opción|Opcion|Option|گزینه)\s*[\d۰-۹]+\s*[:：]?\s*\*\*/gi;
  const markers = [...text.matchAll(markerRe)];
  if (markers.length === 0) return { body: text, options: [] };

  const body = text.slice(0, markers[0].index).trimEnd();
  const options: string[] = [];
  for (let i = 0; i < markers.length; i++) {
    const start = (markers[i].index ?? 0) + markers[i][0].length;
    const end = i + 1 < markers.length ? markers[i + 1].index : text.length;
    const opt = text
      .slice(start, end)
      .replace(/^[\s:：/.-]+/, "")  // limpiar separadores iniciales
      .replace(/[\s/]+$/, "")        // y finales
      .trim();
    if (opt) options.push(opt);
  }
  return { body, options };
}

interface StudyChatProps {
  studyRef?: string | null;
  prefill?: string | null;          // mensaje pre-rellenado (desde menú contextual)
  onPrefillConsumed?: () => void;   // callback para limpiar el prefill
}

// Widget de chat flotante: el estudiante pregunta dudas sobre palabras o
// conceptos directamente desde el estudio, sin perder su lugar.
export default function StudyChat({ studyRef, prefill, onPrefillConsumed }: StudyChatProps) {
  const locale = useLocale();
  const t = useTranslations("chat");

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Clave de sessionStorage: específica por texto estudiado.
  const sessionKey = `jashmal-chat:${studyRef ?? "global"}`;

  // Restaurar historial al montar (sobrevive al cierre/apertura del widget).
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(sessionKey);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (parsed.length > 0) setMessages(parsed);
      }
    } catch { /* sessionStorage no disponible */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  // Guardar historial en sessionStorage cada vez que cambia.
  useEffect(() => {
    if (messages.length === 0) return;
    try {
      sessionStorage.setItem(sessionKey, JSON.stringify(messages));
    } catch { /* cuota llena */ }
  }, [messages, sessionKey]);

  // Scroll automático al último mensaje.
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Cuando llega un prefill desde el menú contextual, abre el chat y envía.
  const prevPrefill = useRef<string | null>(null);
  useEffect(() => {
    if (prefill && prefill !== prevPrefill.current) {
      prevPrefill.current = prefill;
      setOpen(true);
      setInput(prefill);
      // Pequeño delay para que el chat se abra antes de enviar.
      setTimeout(() => {
        setInput("");
        sendMessage(prefill);
        onPrefillConsumed?.();
      }, 150);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill]);

  async function sendMessage(question?: string) {
    const q = question ?? input.trim();
    if (!q || loading) return;
    if (!question) setInput("");

    // Añadir el mensaje del usuario al historial antes de enviar.
    const userMsg: Message = { role: "user", text: q };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Pasar el historial completo para que el tutor mantenga el hilo.
      const currentHistory = messages.map((m) => ({
        role: m.role,
        content: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          locale,
          studyRef,
          history: currentHistory, // historial PREVIO al mensaje actual
        }),
      });
      const data = await res.json();
      const answer = data.answer || t("error");
      setMessages((m) => [...m, { role: "assistant", text: answer }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: t("error") }]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="fixed bottom-6 end-6 z-[60]">
      {/* Panel de chat */}
      {open && (
        <div className="mb-3 flex h-[420px] w-80 flex-col rounded-xl border border-gold/25 bg-ink shadow-2xl">
          {/* Cabecera */}
          <div className="flex items-center justify-between rounded-t-xl border-b border-gold/15 bg-gold/[0.04] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-sm text-gold">{t("title")}</span>
              {messages.length > 0 && (
                <button
                  onClick={() => {
                    setMessages([]);
                    try { sessionStorage.removeItem(sessionKey); } catch { /* noop */ }
                  }}
                  className="text-[10px] text-muted/60 transition-colors hover:text-gold/70"
                  title={t("clear")}
                >
                  {t("clear")}
                </button>
              )}
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted transition-colors hover:text-gold"
              aria-label={t("close")}
            >
              ✕
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 space-y-3 overflow-y-auto p-3 text-sm">
            {messages.length === 0 && (
              <p className="text-center text-xs text-muted/70 mt-4">{t("hint")}</p>
            )}
            {messages.map((m, i) => {
              const isLastAssistant =
                m.role === "assistant" && i === messages.length - 1;
              const { body, options } = isLastAssistant
                ? parseOptions(m.text)
                : { body: m.text, options: [] };

              return (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start flex-col gap-1.5"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-gold/15 px-3 py-2 text-parchment/90"
                        : "max-w-[90%] rounded-2xl rounded-tl-sm bg-white/[0.04] px-3 py-2 text-parchment/85 leading-relaxed"
                    }
                  >
                    {body}
                  </div>
                  {options.length > 0 && (
                    <div className="flex flex-col gap-1.5 ps-1">
                      {options.map((opt, j) => (
                        <button
                          key={j}
                          onClick={() => sendMessage(opt)}
                          disabled={loading}
                          className="rounded-xl border border-gold/30 bg-gold/[0.06] px-3 py-1.5 text-start text-xs text-gold/80 transition-all hover:border-gold/60 hover:bg-gold/[0.12] hover:text-gold disabled:opacity-40"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-white/[0.04] px-3 py-2">
                  <span className="animate-pulse text-muted text-xs">{t("thinking")}</span>
                </div>
              </div>
            )}
            {/* Ancla para el scroll automático al último mensaje */}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gold/15 p-2.5">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={t("placeholder")}
                maxLength={500}
                disabled={loading}
                className="flex-1 rounded-full border border-gold/20 bg-white/[0.03] px-3 py-1.5 text-sm text-parchment placeholder:text-muted/60 focus:border-gold/50 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/50 text-gold transition-all hover:bg-gold/10 disabled:opacity-40"
                aria-label={t("send")}
              >
                ↑
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button
        id="tour-tutor"
        onClick={() => {
          setOpen((o) => !o);
          if (!open) setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-ink text-xl text-gold shadow-lg transition-all hover:bg-gold/10"
        aria-label={t("toggle")}
        title={t("toggle")}
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
