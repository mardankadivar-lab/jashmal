"use client";

import { useState } from "react";

export default function ShareRevelation() {
  const [text, setText] = useState("");
  const [connectsTo, setConnectsTo] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
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
        setState("sent");
        setText("");
        setConnectsTo("");
      } else {
        setState("error");
        setErr(d.error || "No se pudo enviar.");
      }
    } catch {
      setState("error");
      setErr("Error de red. Intenta de nuevo.");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-gold/20 bg-gold/[0.04] p-6 text-center">
        <p className="text-lg text-gold">Tu revelación fue enviada 🌟</p>
        <p className="mt-2 text-sm leading-relaxed text-parchment/70">
          El Sofer la revisará. Si tiene mérito, encenderá una estrella con tu nombre en la galaxia Comunidad.
        </p>
        <button onClick={() => setState("idle")} className="mt-4 text-xs font-cinzel uppercase tracking-widest text-gold/60 hover:text-gold">
          Compartir otra →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="text-left">
      <label className="mb-2 block font-cinzel text-xs uppercase tracking-widest text-gold/60">Tu revelación</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={5}
        required
        placeholder="¿Qué viste en el estudio que nadie más ha visto? Apóyalo en una fuente o una gematría."
        className="w-full resize-none rounded-2xl border border-gold/25 bg-ink/60 px-4 py-3 text-sm leading-relaxed text-parchment outline-none backdrop-blur-md placeholder:text-muted/40 focus:border-gold/60"
      />
      <label className="mb-2 mt-4 block font-cinzel text-xs uppercase tracking-widest text-gold/60">
        ¿A qué concepto lo conectas? <span className="lowercase tracking-normal text-muted/50">(opcional)</span>
      </label>
      <input
        value={connectsTo}
        onChange={(e) => setConnectsTo(e.target.value)}
        placeholder="ej. Biná, Mashíaj, Tzimtzum…"
        className="w-full rounded-full border border-gold/25 bg-ink/60 px-4 py-2 text-sm text-parchment outline-none backdrop-blur-md placeholder:text-muted/40 focus:border-gold/60"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-5 w-full rounded-full border-2 border-gold bg-gold/10 px-6 py-3 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 disabled:opacity-50"
      >
        {state === "sending" ? "Enviando…" : "Compartir mi revelación →"}
      </button>
      {state === "error" && <p className="mt-3 text-xs leading-relaxed text-rose-300">{err}</p>}
    </form>
  );
}
