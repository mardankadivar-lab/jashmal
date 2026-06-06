"use client";

import { useState } from "react";

// Guarda el camino con el LOGIN POR ENLACE MÁGICO que ya existe
// (mismo endpoint que LoginForm: POST /api/community/magic). La diferencia es
// solo el COPY: razón emocional ("guarda tu camino"), no administrativa.
export default function SaveYourPath({
  reason,
  cta = "Sí, sigo →",
}: {
  reason: string;
  cta?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setErr("");
    try {
      const r = await fetch("/api/community/magic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const d = await r.json();
      if (d.ok) setState("sent");
      else {
        setState("error");
        setErr(d.error || "No se pudo enviar el enlace.");
      }
    } catch {
      setState("error");
      setErr("Error de red. Intenta de nuevo.");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-gold/20 bg-gold/[0.05] p-7 text-center">
        <p className="text-lg text-gold">Tu camino está guardado 🕯️</p>
        <p className="mt-2 text-sm leading-relaxed text-parchment/75">
          Te enviamos un enlace a <b className="text-parchment">{email}</b>. Ábrelo cuando quieras
          y vuelves justo aquí, en tu primer peldaño. (El enlace caduca en 30 minutos.)
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-gold/20 bg-gold/[0.04] p-7 text-center">
      <p className="mb-5 text-sm leading-relaxed text-parchment/80">{reason}</p>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        className="w-full rounded-full border border-gold/25 bg-ink/60 px-5 py-3 text-center text-base text-parchment outline-none backdrop-blur-md placeholder:text-muted/40 focus:border-gold/60"
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-4 w-full rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 disabled:opacity-50"
      >
        {state === "sending" ? "Guardando…" : cta}
      </button>
      <p className="mt-3 text-[11px] leading-relaxed text-muted/60">
        Un solo enlace, sin contraseñas. Solo para guardar tu camino.
      </p>
      {state === "error" && <p className="mt-3 text-xs leading-relaxed text-rose-300">{err}</p>}
    </form>
  );
}
