"use client";

import { useRef, useState, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SiteHeader from "@/components/SiteHeader";
import StudyResult from "@/components/study/StudyResult";
import LamedLoader from "@/components/LamedLoader";
import type { Locale } from "@/i18n/routing";

// ─── Estado de la sesión Q&A ──────────────────────────────────────────────────
type QAState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "streaming"; text: string }
  | { phase: "done"; text: string }
  | { phase: "error"; code: string };

export default function PreguntarPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("qa");
  const fa = locale === "fa";
  const dir = fa ? "rtl" : "ltr";

  const [question, setQuestion] = useState("");
  const [state, setState] = useState<QAState>({ phase: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  // ─── Enviar pregunta ──────────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    const q = question.trim();
    if (!q || state.phase === "loading" || state.phase === "streaming") return;

    // Cancelar cualquier stream anterior
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState({ phase: "loading" });

    try {
      const res = await fetch("/api/qa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, locale }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const code = (data as { error?: string }).error ?? "unknown";
        setState({ phase: "error", code });
        return;
      }

      if (!res.body) {
        setState({ phase: "error", code: "no_body" });
        return;
      }

      // Streaming: leer chunks y acumular el texto
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      setState({ phase: "streaming", text: "" });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Detectar error del servidor (señal \x01error)
        if (chunk.includes("\x01error")) {
          setState({ phase: "error", code: "stream_error" });
          return;
        }

        accumulated += chunk;
        setState({ phase: "streaming", text: accumulated });
      }

      setState({ phase: "done", text: accumulated });
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setState({ phase: "error", code: "network_error" });
    }
  }, [question, state.phase, locale]);

  // ─── Manejar Ctrl/Cmd+Enter en el textarea ────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  // ─── Nueva pregunta ──────────────────────────────────────────────────────
  const handleReset = useCallback(() => {
    abortRef.current?.abort();
    setState({ phase: "idle" });
    setQuestion("");
  }, []);

  const isWorking = state.phase === "loading" || state.phase === "streaming";
  const hasResult = state.phase === "streaming" || state.phase === "done";
  const hasError = state.phase === "error";

  return (
    <>
      <SiteHeader />
      <main
        className="mx-auto max-w-4xl px-5 pb-24 pt-10"
        dir={dir}
      >
        {/* ── Encabezado ─────────────────────────────────────────────── */}
        <header className="mb-10">
          {/* Volver al inicio */}
          <div className="mb-6">
            <Link
              href="/"
              className="flex w-fit items-center gap-1.5 font-cinzel text-sm text-gold/70 transition-colors hover:text-gold"
            >
              <span>{fa ? "→" : "←"}</span>
              <span className="hebrew">חַשְׁמַל</span>
              <span>· Jashmal</span>
            </Link>
          </div>

          {/* Título hebreo y español */}
          <p
            className="hebrew mb-2 text-3xl text-gold/80"
            style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.4))" }}
          >
            שְׁאֵלָה
          </p>
          <h1 className="font-cinzel text-2xl font-bold tracking-wide text-parchment sm:text-3xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {t("subtitle")}
          </p>
        </header>

        {/* ── Formulario de pregunta ─────────────────────────────────── */}
        {(!hasResult || state.phase === "done") && (
          <section className="mb-8">
            {/* Cita de apertura */}
            {state.phase === "idle" && (
              <blockquote
                className="mb-6 border-gold/30 text-muted/80 text-sm italic leading-relaxed"
                style={{ borderInlineStartWidth: "2px", borderInlineStartStyle: "solid", paddingInlineStart: "1rem" }}
              >
                <span className="hebrew not-italic text-gold/60">דֹּם</span>
                {" — "}
                {t("meditation")}
              </blockquote>
            )}

            <div className="rounded-2xl border border-gold/15 bg-ink/60 p-6 shadow-lg backdrop-blur-sm">
              <label
                htmlFor="qa-input"
                className="mb-3 block font-cinzel text-sm font-semibold text-parchment/80"
              >
                {t("inputLabel")}
              </label>
              <textarea
                id="qa-input"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("placeholder")}
                rows={5}
                maxLength={2000}
                disabled={isWorking}
                dir={dir}
                className={[
                  "w-full resize-none rounded-xl border bg-ink/40 px-4 py-3",
                  "font-body text-sm leading-relaxed text-parchment/90",
                  "placeholder:text-muted/50",
                  "focus:outline-none focus:ring-1 focus:ring-gold/40",
                  "transition-colors duration-200",
                  isWorking
                    ? "cursor-not-allowed border-gold/10 opacity-60"
                    : "border-gold/20 hover:border-gold/30",
                ].join(" ")}
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted/50">
                  {question.length > 0 && `${question.length}/2000`}
                </span>
                <span className="text-xs text-muted/40">
                  {t("shortcutHint")}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={isWorking || !question.trim()}
                  className={[
                    "flex items-center gap-2 rounded-xl px-6 py-2.5",
                    "font-cinzel text-sm font-semibold tracking-wide",
                    "border transition-all duration-200",
                    isWorking || !question.trim()
                      ? "cursor-not-allowed border-gold/10 text-gold/40"
                      : "border-gold/40 text-gold hover:border-gold/70 hover:bg-gold/10 active:scale-[0.98]",
                  ].join(" ")}
                >
                  {t("submitButton")}
                </button>

                {state.phase === "done" && (
                  <button
                    onClick={handleReset}
                    className="rounded-xl border border-gold/20 px-4 py-2.5 font-cinzel text-sm text-parchment/60 transition-colors hover:border-gold/40 hover:text-parchment/90"
                  >
                    {t("newQuestion")}
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ── Estado: cargando ──────────────────────────────────────────── */}
        {state.phase === "loading" && (
          <div className="flex flex-col items-center justify-center gap-4 py-16">
            <LamedLoader size={64} label={t("generating")} />
            <p className="font-cinzel text-sm text-gold/60">{t("generating")}</p>
          </div>
        )}

        {/* ── Estado: error ─────────────────────────────────────────────── */}
        {hasError && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-950/20 px-6 py-4">
            <p className="font-cinzel text-sm text-red-400">
              {state.code === "rate_limited"
                ? t("rateLimited")
                : t("errorStudy")}
            </p>
            <button
              onClick={handleReset}
              className="mt-3 font-cinzel text-sm text-gold/60 hover:text-gold"
            >
              {t("tryAgain")}
            </button>
          </div>
        )}

        {/* ── Resultado: streaming o completo ──────────────────────────── */}
        {hasResult && (
          <section className="mt-2">
            {/* Banner de la pregunta mientras responde */}
            {state.phase === "streaming" && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-gold/10 bg-ink/40 px-4 py-3">
                <LamedLoader size={24} className="mt-0.5 shrink-0" label="" />
                <p className="text-sm text-muted/80 italic">
                  &ldquo;{question}&rdquo;
                </p>
              </div>
            )}

            {/* La respuesta completa con el mismo renderizador de estudios */}
            <StudyResult
              text={state.text}
              // En el Q&A no hay motor de estudio lateral, así que los puentes
              // navegan a la URL de la Mente Cósmica o al motor de estudio.
              onConcept={(term) => {
                window.location.href = `/${locale}/estudio?q=${encodeURIComponent(term)}`;
              }}
              onLetter={(key) => {
                window.location.href = `/${locale}/letras/${key}`;
              }}
            />

            {/* Botón "nueva pregunta" al final cuando el estudio está completo */}
            {state.phase === "done" && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleReset}
                  className="rounded-xl border border-gold/30 px-6 py-2.5 font-cinzel text-sm text-gold/70 transition-colors hover:border-gold/60 hover:text-gold"
                >
                  {t("newQuestion")}
                </button>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}
