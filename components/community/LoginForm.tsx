"use client";

import { useState } from "react";

export default function LoginForm() {
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
      <div className="rounded-2xl border border-gold/20 bg-gold/[0.04] p-8">
        <p className="text-lg text-gold">Revisa tu correo 📩</p>
        <p className="mt-2 text-sm leading-relaxed text-parchment/70">
          Te enviamos un enlace a <b className="text-parchment">{email}</b>. Haz clic en él para entrar
          (caduca en 30 minutos).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <p className="mb-6 text-sm leading-relaxed text-parchment/75">
        Entra con tu correo — sin contraseñas. Te enviamos un <b className="text-gold/90">enlace mágico</b>.
      </p>
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
        className="mt-4 w-full rounded-full border-2 border-gold bg-gold/10 px-8 py-3 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 disabled:opacity-50"
      >
        {state === "sending" ? "Enviando…" : "Enviar enlace mágico →"}
      </button>
      {state === "error" && <p className="mt-3 text-xs leading-relaxed text-rose-300">{err}</p>}
    </form>
  );
}
