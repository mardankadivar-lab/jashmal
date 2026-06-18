"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error_duplicate" | "error_generic";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");

    try {
      const res = await fetch("/api/academia/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          locale:
            typeof document !== "undefined"
              ? document.documentElement.lang?.split("-")[0] || "es"
              : "es",
        }),
      });
      const data = await res.json();

      if (data.ok) {
        setStatus("success");
      } else if (data.error === "duplicate") {
        setStatus("error_duplicate");
      } else {
        setStatus("error_generic");
      }
    } catch {
      setStatus("error_generic");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold/25 bg-gold/[0.06] px-7 py-8 text-center">
        <p className="font-cinzel text-base text-gold">
          ✓ Estás en la lista. Te avisamos el 22 de septiembre.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
          required
          disabled={status === "loading"}
          className="w-full rounded-xl border border-gold/30 bg-transparent px-4 py-3 text-sm text-parchment placeholder:text-parchment/40 focus:border-gold/60 focus:outline-none disabled:opacity-60"
        />
      </div>

      {status === "error_duplicate" && (
        <p className="text-sm text-amber-300/80">Este correo ya está registrado.</p>
      )}
      {status === "error_generic" && (
        <p className="text-sm text-red-400/80">Algo falló. Intenta de nuevo.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !email.trim()}
        className="w-full rounded-full border-2 border-gold bg-gold/10 px-10 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.25)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {status === "loading" ? "Enviando…" : "Unirme a la lista de espera"}
      </button>
    </form>
  );
}
