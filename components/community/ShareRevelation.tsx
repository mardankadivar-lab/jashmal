"use client";

import { useState } from "react";

type Result = { verdict: string; message: string; score?: number };

export default function ShareRevelation() {
  const [text, setText] = useState("");
  const [connectsTo, setConnectsTo] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [result, setResult] = useState<Result | null>(null);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setErr("");
    try {
      const r = await fetch("/api/community/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, connectsTo }),
      });
      const d = await r.json();
      if (d.ok) {
        setResult({ verdict: d.verdict, message: d.message, score: d.score });
        setState("done");
      } else {
        setState("error");
        setErr(d.error || "No se pudo enviar.");
      }
    } catch {
      setState("error");
      setErr("Error de red. Intenta de nuevo.");
    }
  }

  function reset() {
    setText("");
    setConnectsTo("");
    setResult(null);
    setState("idle");
  }

  if (state === "done" && result) {
    const accepted = result.verdict === "aceptar";
    const pending = result.verdict === "pending";
    return (
      <div className={`rounded-2xl border p-6 text-center ${accepted ? "border-gold/40 bg-gold/[0.07]" : "border-gold/15 bg-gold/[0.03]"}`}>
        <p className={`text-lg ${accepted ? "text-gold" : "text-parchment/90"}`}>
          {accepted
            ? `🌟 Pasó la primera puerta${result.score ? ` · ${result.score} ${result.score === 1 ? "conexión" : "conexiones"}` : ""}`
            : pending
              ? "Recibida 🕯️"
              : "El Sofer te responde 📜"}
        </p>
        <p className="mt-3 whitespace-pre-line text-start text-sm leading-relaxed text-parchment/80">{result.message}</p>
        {accepted && (
          <p className="mt-3 text-xs italic leading-relaxed text-gold/60">
            Mardan dará el visto final; si firma, tu estrella se encenderá con tu nombre.
          </p>
        )}
        <button onClick={reset} className="mt-5 text-xs font-cinzel uppercase tracking-widest text-gold/60 hover:text-gold">
          {accepted ? "Compartir otra →" : "Volver a intentar →"}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="text-start">
      <label className="mb-2 block font-cinzel text-xs uppercase tracking-widest text-gold/60">Tu revelación</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        required
        disabled={state === "sending"}
        placeholder="¿Qué viste en el estudio que nadie más ha visto? Apóyalo en una fuente o una gematría."
        className="w-full resize-none rounded-2xl border border-gold/25 bg-ink/60 px-4 py-3 text-sm leading-relaxed text-parchment outline-none backdrop-blur-md placeholder:text-muted/40 focus:border-gold/60 disabled:opacity-60"
      />
      <label className="mb-2 mt-4 block font-cinzel text-xs uppercase tracking-widest text-gold/60">
        ¿A qué concepto lo conectas? <span className="lowercase tracking-normal text-muted/50">(opcional)</span>
      </label>
      <input
        value={connectsTo}
        onChange={(e) => setConnectsTo(e.target.value)}
        disabled={state === "sending"}
        placeholder="ej. Biná, Mashíaj, Tzimtzum…"
        className="w-full rounded-full border border-gold/25 bg-ink/60 px-4 py-2 text-sm text-parchment outline-none backdrop-blur-md placeholder:text-muted/40 focus:border-gold/60 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-5 w-full rounded-full border-2 border-gold bg-gold/10 px-6 py-3 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 disabled:opacity-50"
      >
        {state === "sending" ? "El Sofer está leyendo y verificando…" : "Compartir mi revelación →"}
      </button>
      {state === "error" && <p className="mt-3 text-xs leading-relaxed text-rose-300">{err}</p>}
    </form>
  );
}
