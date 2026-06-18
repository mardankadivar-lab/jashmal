"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LESSONS7, MODULO7, EX3 } from "@/lib/academia/modulo7";
import { MODULO4 } from "@/lib/academia/modulo4";
import { MODULO5 } from "@/lib/academia/modulo5";
import { MODULO6 } from "@/lib/academia/modulo6";
import { readProgress, isModuleComplete } from "@/lib/academia/progress";

const M7_SLUGS = LESSONS7.map((l) => l.slug);

// El texto del closeModule de L34 (cierre de SHOEL).
const L34 = LESSONS7.find((l) => l.slug === "amos-profeta-social");
const CLOSE_TEXT = L34?.closeModule ?? "";

export default function ShoelCompletoPagina() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [m7Done, setM7Done] = useState(false);

  useEffect(() => {
    const done = isModuleComplete(M7_SLUGS);
    setM7Done(done);
    setReady(true);
    if (!done) {
      router.replace("/academia/modulo-7");
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="always-dark flex min-h-screen items-center justify-center" style={{ background: "#05050a" }}>
        <div className="h-8 w-8 animate-pulse rounded-full bg-gold/20" />
      </div>
    );
  }

  if (!m7Done) return null; // router.replace se ejecuta; evitamos parpadeo

  return <ShoelCompletoView />;
}

function ShoelCompletoView() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const palabras = texto.trim().split(/\s+/).filter(Boolean).length;
  const withinRange = palabras >= EX3.palabrasMin && palabras <= EX3.palabrasMax;

  async function handleSubmit() {
    setError(null);
    if (!titulo.trim()) {
      setError("Escribe un título para tu expositivo.");
      return;
    }
    if (palabras < 200) {
      setError("El expositivo requiere al menos 200 palabras para ser enviado.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/academia/expositivo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero: EX3.numero,
          nivel: EX3.nivel,
          titulo: titulo.trim(),
          texto,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error === "too_short"
            ? "El texto es muy corto. El EX-3 requiere al menos 2.000 palabras."
            : data.error === "no_session"
            ? "Necesitas iniciar sesión para entregar el expositivo."
            : "No se pudo entregar. Intenta de nuevo.",
        );
        return;
      }
      setSubmitted(true);
      setFlash("Expositivo entregado. El Sofer y Mardan lo revisarán pronto.");
    } catch {
      setError("Error de red. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="always-dark relative min-h-screen overflow-hidden" style={{ background: "#05050a" }}>
      {/* gradiente de fondo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 18%, rgba(201,164,62,0.10) 0%, rgba(5,5,10,0) 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
        {/* nav mínima */}
        <div className="mb-12 flex items-center justify-between text-gold/60">
          <Link href="/" className="hebrew text-xl transition hover:text-gold" style={{ filter: "drop-shadow(0 0 8px #c9a43e33)" }}>
            חַשְׁמַל
          </Link>
          <Link href="/academia/modulo-7" className="font-cinzel text-[11px] uppercase tracking-[0.2em] transition hover:text-gold">
            ← Módulo 7
          </Link>
        </div>

        {/* título hebreo */}
        <div className="text-center">
          <p
            className="hebrew text-6xl text-gold sm:text-7xl"
            dir="rtl"
            style={{ filter: "drop-shadow(0 0 20px #c9a43e66)" }}
          >
            שׁוֹאֵל
          </p>
          <p className="mt-3 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/55">
            El que pregunta · Completo
          </p>
        </div>

        {/* texto del closeModule de L34 */}
        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/[0.04] px-7 py-8">
          <p className="text-base leading-relaxed text-parchment/90 sm:text-lg">
            {CLOSE_TEXT}
          </p>
        </div>

        {/* separador */}
        <div className="my-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-gold/20" />
          <span className="hebrew text-sm text-gold/50" dir="rtl">{MODULO7.auroraHe}</span>
          <span className="h-px flex-1 bg-gold/20" />
        </div>

        {/* Los 4 módulos de SHOEL completados */}
        <div>
          <p className="mb-5 font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold/50">
            Tu recorrido en SHOEL
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                mod: MODULO4,
                titulo: "Rashi — aprender a preguntar",
                desc: "La Queshtiá, el método de Rashi, Pshat y Drash, las Middot de Hilel",
                num: "Módulo 4 · S1 · semanas 17–21",
              },
              {
                mod: MODULO5,
                titulo: "Pirké Avot — la ética de los padres",
                desc: "Los tres pilares, la cadena de los Zugot, Hilel, los cuatro que entraron al Pardes",
                num: "Módulo 5 · S2 · semanas 22–27",
              },
              {
                mod: MODULO6,
                titulo: "La Torá oral",
                desc: "La Mishná, la página del Talmud, Berakhot 1:1, el horno de Ajnai",
                num: "Módulo 6 · S3 · semanas 28–32",
              },
              {
                mod: MODULO7,
                titulo: "Los profetas",
                desc: "¿Qué es un profeta? — Amós y la justicia social",
                num: "Módulo 7 · S4 · semanas 33–34",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-gold/15 bg-gold/[0.03] px-5 py-4"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 font-cinzel text-sm text-gold">
                  ✓
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/45">
                    {item.num}
                  </p>
                  <p className="mt-0.5 text-base text-parchment">{item.titulo}</p>
                  <p className="mt-0.5 text-xs text-muted/70">{item.desc}</p>
                </div>
                <span className="hebrew shrink-0 text-lg text-gold/50" dir="rtl">
                  {item.mod.he}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* separador */}
        <div className="my-12 h-px w-full bg-gold/15" />

        {/* EX-3 */}
        {!submitted ? (
          <div>
            <p className="font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold/50">
              Antes de cruzar a Javer
            </p>
            <h2 className="mt-2 font-cinzel text-xl text-parchment sm:text-2xl">
              Entrega tu tercer expositivo
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              El EX-3 es el sello académico de SHOEL. Sin él, el nivel no queda sellado — solo completado.
            </p>

            {/* enunciado */}
            <div className="mt-6 rounded-xl border border-gold/15 bg-gold/[0.04] px-5 py-5">
              <p className="mb-2 font-cinzel text-[10px] uppercase tracking-widest text-gold/50">
                {EX3.titulo}
              </p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-parchment/85">
                {EX3.enunciado}
              </p>
              <p className="mt-3 text-[11px] text-muted/60">
                {EX3.palabrasMin.toLocaleString()}–{EX3.palabrasMax.toLocaleString()} palabras
              </p>
            </div>

            {/* formulario */}
            <div className="mt-7 space-y-4">
              <div>
                <label className="mb-1.5 block font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
                  Título de tu expositivo
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej: La voz de Amós: Pshat profético y justicia social"
                  className="w-full rounded-xl border border-gold/25 bg-white/[0.03] px-4 py-3 text-sm text-parchment placeholder:text-muted/40 focus:border-gold/50 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
                  Tu expositivo
                </label>
                <textarea
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  placeholder="Escribe tu análisis aquí…"
                  rows={16}
                  className="w-full resize-none rounded-xl border border-gold/25 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-parchment placeholder:text-muted/40 focus:border-gold/50 focus:outline-none"
                />
              </div>

              {/* contador */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`font-cinzel text-[11px] uppercase tracking-widest ${
                    withinRange
                      ? "text-emerald-300/80"
                      : palabras > EX3.palabrasMax
                      ? "text-amber-300/80"
                      : "text-muted/60"
                  }`}
                >
                  {palabras.toLocaleString()} / {EX3.palabrasMin.toLocaleString()}–{EX3.palabrasMax.toLocaleString()} palabras
                </span>
              </div>

              {error && <p className="text-sm text-red-400/80">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={submitting || palabras < 200}
                className="w-full rounded-full border-2 border-gold bg-gold/10 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.25)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? "Enviando…" : "Estoy listo para el Expositivo 3 →"}
              </button>
            </div>
          </div>
        ) : (
          /* confirmación de entrega */
          <div className="text-center">
            {flash && (
              <div className="mb-8 rounded-2xl border border-gold/25 bg-gold/[0.07] px-6 py-6">
                <p className="hebrew text-2xl text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 10px #c9a43e44)" }}>
                  {MODULO7.auroraHe}
                </p>
                <p className="mt-3 text-base text-parchment/90">{flash}</p>
              </div>
            )}
            <p className="text-sm leading-relaxed text-muted">
              El Sofer revisará tu EX-3 con cuidado. Recibirás retroalimentación.
            </p>
          </div>
        )}

        {/* nota final */}
        <div className="mt-12 rounded-2xl border border-gold/10 bg-ink/30 px-6 py-5 text-center">
          <p className="text-sm leading-relaxed text-parchment/70">
            Una vez aprobado el EX-3 y el Proyecto Final de Shoel, Mardan te recibirá como{" "}
            <span className="hebrew text-gold/80">חָבֵר</span>{" "}
            <span className="text-gold/70">Javer</span>.
          </p>
        </div>

        {/* banner Cohorte 1 */}
        <div className="mb-4 rounded-xl border border-gold/25 bg-gold/[0.04] px-6 py-4 text-center">
          <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-gold/70">
            Cohorte 1 · Rosh Hashaná 5787
          </p>
          <p className="mt-1 text-sm text-parchment/70">
            El Año 1 de JAVER abre el 22 de septiembre.{" "}
            <Link href="/academia/lista-de-espera" className="text-gold underline-offset-4 hover:underline">
              Únete a la lista →
            </Link>
          </p>
        </div>

        {/* puente de vuelta */}
        <div className="mt-10 text-center">
          <Link
            href="/academia/modulo-7"
            className="font-cinzel text-[11px] uppercase tracking-widest text-parchment/45 underline-offset-4 transition hover:text-gold hover:underline"
          >
            ← Volver al Módulo 7
          </Link>
        </div>
      </div>
    </div>
  );
}
