"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LESSONS11, MODULO11, EX5 } from "@/lib/academia/modulo11";
import { MODULO8 } from "@/lib/academia/modulo8";
import { MODULO9 } from "@/lib/academia/modulo9";
import { MODULO10 } from "@/lib/academia/modulo10";
import { isModuleComplete } from "@/lib/academia/progress";

const M11_SLUGS = LESSONS11.map((l) => l.slug);

// El texto del closeModule de L52 (cierre de JAVER / Año 1).
const L52 = LESSONS11.find((l) => l.slug === "arbol-de-la-vida");
const CLOSE_TEXT = L52?.closeModule ?? "";

export default function JaverCompletoPagina() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [m11Done, setM11Done] = useState(false);

  useEffect(() => {
    const done = isModuleComplete(M11_SLUGS);
    setM11Done(done);
    setReady(true);
    if (!done) {
      router.replace("/academia/modulo-11");
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="always-dark flex min-h-screen items-center justify-center" style={{ background: "#05050a" }}>
        <div className="h-8 w-8 animate-pulse rounded-full bg-gold/20" />
      </div>
    );
  }

  if (!m11Done) return null;

  return <JaverCompletoView />;
}

function JaverCompletoView() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);

  const palabras = texto.trim().split(/\s+/).filter(Boolean).length;
  const withinRange = palabras >= EX5.palabrasMin && palabras <= EX5.palabrasMax;

  async function handleSubmit() {
    setError(null);
    if (!titulo.trim()) {
      setError("Escribe un título para tu expositivo.");
      return;
    }
    if (palabras < 500) {
      setError("El expositivo requiere al menos 500 palabras para ser enviado.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/academia/expositivo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numero: EX5.numero,
          nivel: EX5.nivel,
          titulo: titulo.trim(),
          texto,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(
          data.error === "too_short"
            ? "El texto es muy corto. El EX-5 requiere al menos 2.500 palabras."
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
          <Link href="/academia/modulo-11" className="font-cinzel text-[11px] uppercase tracking-[0.2em] transition hover:text-gold">
            ← Módulo 11
          </Link>
        </div>

        {/* título hebreo */}
        <div className="text-center">
          <p
            className="hebrew text-6xl text-gold sm:text-7xl"
            dir="rtl"
            style={{ filter: "drop-shadow(0 0 20px #c9a43e66)" }}
          >
            חָבֵר
          </p>
          <p className="mt-3 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/55">
            Completaste el Año 1 de la Academia
          </p>
        </div>

        {/* mensaje de transición — texto del closeModule de L52 */}
        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/[0.04] px-7 py-8">
          <p className="text-base leading-relaxed text-parchment/90 sm:text-lg">
            {CLOSE_TEXT}
          </p>
        </div>

        {/* separador */}
        <div className="my-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-gold/20" />
          <span className="hebrew text-sm text-gold/50" dir="rtl">{MODULO11.auroraHe}</span>
          <span className="h-px flex-1 bg-gold/20" />
        </div>

        {/* Los 4 módulos de JAVER completados */}
        <div>
          <p className="mb-5 font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold/50">
            Tu recorrido en JAVER
          </p>
          <div className="flex flex-col gap-3">
            {[
              {
                mod: MODULO8,
                titulo: "El trabajo del alma: Mesilat Yesharim",
                desc: "Mussar, midot, cheshbon ha-nefesh, Ramjal",
                num: "Módulo 8 · J1 · semanas 35–40",
              },
              {
                mod: MODULO9,
                titulo: "Leer en profundidad",
                desc: "Pshat y Drash avanzado, Ramban, Ibn Ezra, Midrash",
                num: "Módulo 9 · J2 · semanas 41–45",
              },
              {
                mod: MODULO10,
                titulo: "El Nombre y la unidad",
                desc: "Los Nombres divinos, YHVH/Elohim, la Shemá, el Alenu",
                num: "Módulo 10 · J3 · semanas 46–49",
              },
              {
                mod: MODULO11,
                titulo: "Diez dichos, diez sefirot",
                desc: "Sefer Yetzirah, las diez sefirot, el árbol de la vida",
                num: "Módulo 11 · J4 · semanas 50–52",
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

        {/* EX-5 — Proyecto Final de JAVER */}
        {!submitted ? (
          <div>
            <p className="font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold/50">
              El Proyecto Final del Año 1
            </p>
            <h2 className="mt-2 font-cinzel text-xl text-parchment sm:text-2xl">
              Entrega tu quinto expositivo
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              El EX-5 es el sello académico de JAVER — el Proyecto Final del Año 1. Es el expositivo más exigente del currículo.
            </p>

            {/* enunciado */}
            <div className="mt-6 rounded-xl border border-gold/15 bg-gold/[0.04] px-5 py-5">
              <p className="mb-2 font-cinzel text-[10px] uppercase tracking-widest text-gold/50">
                {EX5.titulo}
              </p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-parchment/85">
                {EX5.enunciado}
              </p>
              <p className="mt-3 text-[11px] text-muted/60">
                {EX5.palabrasMin.toLocaleString()}–{EX5.palabrasMax.toLocaleString()} palabras
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
                  placeholder="Ej: Maljut — el reino: PaRDeS de la última sefirot"
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
                  rows={20}
                  className="w-full resize-none rounded-xl border border-gold/25 bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-parchment placeholder:text-muted/40 focus:border-gold/50 focus:outline-none"
                />
              </div>

              {/* contador */}
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`font-cinzel text-[11px] uppercase tracking-widest ${
                    withinRange
                      ? "text-emerald-300/80"
                      : palabras > EX5.palabrasMax
                      ? "text-amber-300/80"
                      : "text-muted/60"
                  }`}
                >
                  {palabras.toLocaleString()} / {EX5.palabrasMin.toLocaleString()}–{EX5.palabrasMax.toLocaleString()} palabras
                </span>
              </div>

              {error && <p className="text-sm text-red-400/80">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={submitting || palabras < 500}
                className="w-full rounded-full border-2 border-gold bg-gold/10 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.25)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? "Enviando…" : "Estoy listo para el Expositivo 5 →"}
              </button>
            </div>
          </div>
        ) : (
          /* confirmación de entrega */
          <div className="text-center">
            {flash && (
              <div className="mb-8 rounded-2xl border border-gold/25 bg-gold/[0.07] px-6 py-6">
                <p className="hebrew text-2xl text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 10px #c9a43e44)" }}>
                  {MODULO11.auroraHe}
                </p>
                <p className="mt-3 text-base text-parchment/90">{flash}</p>
              </div>
            )}
            <p className="text-sm leading-relaxed text-muted">
              El Sofer revisará tu EX-5 con cuidado. Recibirás retroalimentación.
            </p>
          </div>
        )}

        {/* nota final */}
        <div className="mt-12 rounded-2xl border border-gold/10 bg-ink/30 px-6 py-5 text-center">
          <p className="text-sm leading-relaxed text-parchment/70">
            Una vez aprobado el EX-5 y el Proyecto Final de Javer, estarás listo para{" "}
            <span className="hebrew text-gold/80">מַגִּיד</span>{" "}
            <span className="text-gold/70">MAGUID — el Año 2</span>.
          </p>
        </div>

        {/* botón de transición al Año 2 */}
        <div className="mt-10 text-center">
          <Link
            href="/academia/maguid-inicio"
            className="inline-block rounded-full border-2 border-gold bg-gold/10 px-10 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.30)]"
          >
            Empezar MAGUID →
          </Link>
        </div>

        {/* puente de vuelta */}
        <div className="mt-10 text-center">
          <Link
            href="/academia/modulo-11"
            className="font-cinzel text-[11px] uppercase tracking-widest text-parchment/45 underline-offset-4 transition hover:text-gold hover:underline"
          >
            ← Volver al Módulo 11
          </Link>
        </div>
      </div>
    </div>
  );
}
