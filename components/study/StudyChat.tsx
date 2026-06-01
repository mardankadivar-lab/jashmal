"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

interface Message {
  role: "user" | "assistant";
  text: string;
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

  // Scroll automático al último mensaje.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="fixed bottom-6 end-6 z-40">
      {/* Panel de chat */}
      {open && (
        <div className="mb-3 flex h-[420px] w-80 flex-col rounded-xl border border-gold/25 bg-ink shadow-2xl">
          {/* Cabecera */}
          <div className="flex items-center justify-between rounded-t-xl border-b border-gold/15 bg-gold/[0.04] px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-sm text-gold">{t("title")}</span>
              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
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
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-tr-sm bg-gold/15 px-3 py-2 text-parchment/90"
                      : "max-w-[90%] rounded-2xl rounded-tl-sm bg-white/[0.04] px-3 py-2 text-parchment/85 leading-relaxed"
                  }
                >
                  {m.text}
                </div>
              </div>
            ))}
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
