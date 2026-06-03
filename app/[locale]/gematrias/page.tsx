"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { GEMATRIAS } from "@/lib/gematrias";
import MisterioTutor from "@/components/MisterioTutor";

export default function GematriasPage() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";
  const [abierto, setAbierto] = useState<number | null>(null);

  // Tema claro/oscuro (sincronizado con el global).
  const [dark, setDark] = useState(true);
  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("jashmal-theme", next ? "dark" : "light"); } catch { /* noop */ }
  }

  return (
    <main className="mx-auto max-w-4xl px-5 pb-24 pt-12" dir={fa ? "rtl" : "ltr"}>
      {/* Barra superior: volver al inicio + botón claro/oscuro */}
      <div className="mb-2 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-1.5 font-cinzel text-sm text-gold/70 transition-colors hover:text-gold"
        >
          <span>{fa ? "→" : "←"}</span>
          <span className="hebrew">חַשְׁמַל</span>
          <span>· Jashmal</span>
        </Link>
        <button
          onClick={toggleTheme}
          aria-label={dark ? "Modo claro" : "Modo oscuro"}
          title={dark ? "Modo claro" : "Modo oscuro"}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors hover:bg-gold/10"
        >
          {dark ? "☀" : "☾"}
        </button>
      </div>

      {/* Encabezado */}
      <div className="mb-12 text-center">
        <p className="hebrew mb-2 text-3xl text-gold/80" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.4))" }}>
          גִּימַטְרִיָּה
        </p>
        <h1 className="font-cinzel text-2xl font-bold tracking-wide text-parchment sm:text-3xl">
          {fa ? "گیماتریا" : "Gematría"}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          {fa
            ? "هر حرفِ عبری یک عدد است. این اعداد بارها بازمی‌گردند — نام‌های الهی، سِفیروت، ساختارهای آفرینش. روی هر عدد بزن تا رازش را بگشایی."
            : "Cada letra hebrea es un número. Estos números regresan una y otra vez — Nombres divinos, sefirot, estructuras de la creación. Toca cada número para abrir su secreto."}
        </p>
      </div>

      {/* Rejilla de números enormes */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {GEMATRIAS.map((g) => {
          const open = abierto === g.num;
          return (
            <button
              key={g.num}
              onClick={() => setAbierto(open ? null : g.num)}
              className={
                "group relative flex flex-col items-center overflow-hidden rounded-2xl border p-5 text-center transition-all " +
                (open ? "border-gold/60" : "border-gold/25 hover:border-gold/50")
              }
              style={{
                // Fondo oscuro propio: la letra crema se lee en modo claro y oscuro.
                background: open ? "rgba(18,15,28,0.97)" : "rgba(14,12,22,0.94)",
                ...(open ? { gridColumn: "1 / -1" } : {}),
              }}
            >
              {/* Glow */}
              <div className="pointer-events-none absolute -top-8 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle, ${g.color}44 0%, transparent 70%)` }} />

              {/* El número enorme */}
              <span
                className="font-cinzel font-black leading-none"
                style={{
                  fontSize: open ? "clamp(64px, 16vw, 96px)" : "clamp(48px, 13vw, 72px)",
                  color: g.color,
                  textShadow: `0 0 22px ${g.color}66, 0 0 6px ${g.color}44`,
                  transition: "font-size 0.4s",
                }}
              >
                {g.num}
              </span>

              {/* Palabra hebrea */}
              <span className="hebrew mt-2 text-xl font-bold" style={{ color: "#fdf4dd", textShadow: `0 0 12px ${g.color}88` }}>
                {g.he}
              </span>

              {/* Título */}
              <span className="mt-1 font-cinzel text-[11px] uppercase tracking-widest" style={{ color: g.color }}>
                {fa ? g.tituloFa : g.titulo}
              </span>

              {/* Detalle expandido — texto claro fijo (el azulejo siempre es oscuro) */}
              {open && (
                <div className="mt-4 w-full max-w-md" style={{ animation: "fadeIn 0.4s ease" }}>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(232,228,216,0.9)" }} dir={fa ? "rtl" : "ltr"}>
                    {fa ? g.sigFa : g.sig}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-start">
                    {(fa ? g.asociacionesFa : g.asociaciones).map((a, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: "rgba(200,196,184,0.85)" }} dir={fa ? "rtl" : "ltr"}>
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ background: g.color }} />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (g.mystery) {
                        // Número con misterio dedicado (ej. 137) → su landing.
                        router.push(`/misterio/${g.mystery}`);
                      } else {
                        // Resto → estudio de concepto en el motor.
                        const concept = `${(fa ? g.tituloFa : g.titulo)} — la gematría ${g.num}: ${g.he}`;
                        router.push(`/estudio?concept=${encodeURIComponent(concept)}`);
                      }
                    }}
                    className="mt-4 inline-block cursor-pointer rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-[11px] uppercase tracking-widest text-gold/80 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
                  >
                    {g.mystery
                      ? (fa ? "گشودنِ راز ↗" : "Abrir el misterio ↗")
                      : (fa ? "مطالعهٔ عمیق این عدد ↗" : "Estudiar este número a fondo ↗")}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-12 text-center font-cinzel text-xs uppercase tracking-widest text-muted/40">
        {fa ? "هر عدد دری است" : "Cada número es una puerta"}
      </p>

      <MisterioTutor />

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </main>
  );
}
