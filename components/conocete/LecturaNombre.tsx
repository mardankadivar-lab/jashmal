"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { tri } from "@/lib/i18n/i18nContent";
import TranslationBadge from "@/components/TranslationBadge";
import { leerNombre } from "@/lib/sources/nameReading";
import { LECTURA_NOMBRE_NOTA, LECTURA_NOMBRE_UI as UI } from "@/lib/content/autoconocimiento";

function L(locale: Locale, field: { es: string; fa: string | null; en: string | null }) {
  return tri(locale, field.es, field.fa, field.en);
}

// La MATEMÁTICA la calcula leerNombre() (determinista, mismo módulo que el
// backend). La IA solo compone el derash, vía /api/lectura-nombre (streaming,
// patrón blindado de /api/espejo).
export default function LecturaNombre({ nombreHebreo }: { nombreHebreo: string }) {
  const locale = useLocale() as Locale;
  const fa = locale === "fa";

  const [abierto, setAbierto] = useState(false);
  const [derash, setDerash] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  // Datos calculados en el cliente con el MISMO módulo determinista del backend.
  const data = useMemo(() => leerNombre(nombreHebreo), [nombreHebreo]);

  const nota = tri(locale, LECTURA_NOMBRE_NOTA.es, LECTURA_NOMBRE_NOTA.fa, LECTURA_NOMBRE_NOTA.en);
  const silencio = L(locale, UI.silencio).value;

  async function pedirDerash() {
    if (cargando) return;
    setCargando(true);
    setError(false);
    setDerash("");
    try {
      const res = await fetch("/api/lectura-nombre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, nombre: nombreHebreo }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acumulado = "";
      let huboError = false;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (chunk.includes("\x01error")) {
          huboError = true;
          break;
        }
        acumulado += chunk;
        setDerash(acumulado);
      }
      if (huboError || !acumulado.trim()) throw new Error("stream");
    } catch {
      setError(true);
    } finally {
      setCargando(false);
    }
  }

  // Nombre demasiado corto para leer: no mostramos la función.
  if (data.normalizado.length < 2) return null;

  const acento = "#c9a43e";

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-gold/25 bg-ink/50">
      <div className="px-5 pt-5 pb-4 text-center">
        <p
          className="hebrew mb-1 text-2xl text-gold/85"
          style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.4))" }}
        >
          {UI.he}
        </p>
        <h3 className="font-cinzel text-lg font-bold tracking-wide text-parchment">
          {L(locale, UI.title).value}
        </h3>
        <p className="mx-auto mt-1.5 max-w-md text-xs leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
          {L(locale, UI.intro).value}
        </p>
      </div>

      {!abierto && (
        <div className="px-5 pb-5">
          <button
            type="button"
            onClick={() => setAbierto(true)}
            className="w-full rounded-full border border-gold/50 bg-gold/10 px-5 py-3 font-cinzel text-sm uppercase tracking-[0.18em] text-gold transition-all hover:bg-gold/20"
          >
            {L(locale, UI.cta).value}
          </button>
        </div>
      )}

      {abierto && (
        <div className="border-t border-gold/10 px-5 py-5">
          {/* ── DATOS CALCULADOS POR EL BACKEND (no la IA) ── */}
          <p className="mb-3 font-cinzel text-[10px] uppercase tracking-[0.25em] text-gold/55">
            {L(locale, UI.calcLabel).value}
          </p>

          <div className="space-y-3">
            {/* Gematría del nombre */}
            <Fila label={L(locale, UI.gematriaLabel).value}>
              <span className="hebrew text-lg text-parchment" dir="rtl">{data.normalizado}</span>
              <span className="ms-2 font-cinzel text-xl font-bold text-gold">{data.gematria}</span>
            </Fila>

            {/* Las letras en orden */}
            <Fila label={L(locale, UI.lettersLabel).value}>
              <span className="flex flex-wrap gap-1.5" dir="rtl">
                {data.letras.map((l, i) => (
                  <span
                    key={i}
                    className="inline-flex items-baseline gap-1 rounded-md border border-gold/20 bg-gold/[0.05] px-2 py-0.5"
                  >
                    <span className="hebrew text-base text-parchment">{l.glifo}</span>
                    <span className="text-[10px] text-gold/70">{l.valor}</span>
                  </span>
                ))}
              </span>
            </Fila>

            {/* Primera + última letra */}
            {data.rosheiSofei && (
              <Fila label={L(locale, UI.rosheiLabel).value}>
                <span className="hebrew text-lg text-parchment" dir="rtl">{data.rosheiSofei.combinacion}</span>
                <span className="ms-2 text-sm text-gold/80">= {data.rosheiSofei.valor}</span>
                {data.rosheiSofei.glosa && (
                  <span className="ms-2 text-xs italic text-muted/80">«{data.rosheiSofei.glosa}»</span>
                )}
              </Fila>
            )}

            {/* Partición */}
            {data.particiones.length > 0 && (
              <Fila label={L(locale, UI.particionLabel).value}>
                <span className="flex flex-col gap-1">
                  {data.particiones.map((p, i) => (
                    <span key={i} dir="rtl" className="text-sm">
                      {p.sentidos.map((s, j) => (
                        <span key={j}>
                          {j > 0 && <span className="mx-1 text-gold/50">+</span>}
                          <span className="hebrew text-parchment">{s.fragmento}</span>
                          <span className="ms-1 text-[11px] text-gold/70">{s.valor}</span>
                          <span className="ms-1 text-[11px] italic text-muted/75">«{s.glosa}»</span>
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              </Fila>
            )}

            {/* Tzeruf / anagrama */}
            {data.tzerufim.length > 0 && (
              <Fila label={L(locale, UI.tzerufLabel).value}>
                <span className="flex flex-wrap gap-2" dir="rtl">
                  {data.tzerufim.map((t, i) => (
                    <span key={i} className="text-sm">
                      <span className="hebrew text-parchment">{t.palabra}</span>
                      <span className="ms-1 text-[11px] italic text-muted/75">«{t.glosa}»</span>
                    </span>
                  ))}
                </span>
              </Fila>
            )}

            {/* Atbash */}
            <Fila label={L(locale, UI.atbashLabel).value}>
              <span className="hebrew text-lg text-parchment" dir="rtl">{data.atbash.palabra}</span>
              {data.atbash.tieneSentido ? (
                <span className="ms-2 text-xs italic text-muted/80">«{data.atbash.glosa}»</span>
              ) : (
                <span className="ms-2 text-xs italic text-muted/60">— {silencio}</span>
              )}
            </Fila>

            {/* Equivalencias */}
            {data.equivalencias.length > 0 && (
              <Fila label={L(locale, UI.equivLabel).value}>
                <span className="flex flex-col gap-1">
                  {data.equivalencias.map((e, i) => (
                    <span key={i} className="text-sm" dir="rtl">
                      <span className="hebrew text-parchment">{e.fuente}</span>
                      <span className="mx-1 text-gold/70">= {e.valor} =</span>
                      {e.iguales.map((x, j) => (
                        <span key={j}>
                          {j > 0 && <span className="text-muted/50">، </span>}
                          <span className="hebrew text-parchment">{x.palabra}</span>
                          <span className="ms-1 text-[11px] italic text-muted/75">«{x.glosa}»</span>
                        </span>
                      ))}
                    </span>
                  ))}
                </span>
              </Fila>
            )}

            {/* Milui */}
            {data.milui.letras.length > 0 && (
              <Fila label={L(locale, UI.miluiLabel).value}>
                <span className="flex flex-wrap items-baseline gap-1.5" dir="rtl">
                  {data.milui.letras.map((l, i) => (
                    <span key={i} className="text-sm">
                      <span className="hebrew text-parchment">{l.deletreo}</span>
                      <span className="ms-1 text-[11px] text-gold/70">{l.valor}</span>
                    </span>
                  ))}
                  <span className="ms-1 text-xs text-gold/80">· Σ {data.milui.total}</span>
                </span>
              </Fila>
            )}
          </div>

          {/* ── DERASH DE LA IA ── */}
          <div className="mt-5 border-t border-gold/10 pt-5">
            {!derash && !cargando && (
              <button
                type="button"
                onClick={pedirDerash}
                className="w-full rounded-full border border-gold/50 bg-gold/10 px-5 py-3 font-cinzel text-sm uppercase tracking-[0.18em] text-gold transition-all hover:bg-gold/20"
              >
                {L(locale, UI.derashLabel).value}
              </button>
            )}

            {cargando && !derash && (
              <p className="text-center text-sm italic text-muted animate-pulse" dir={fa ? "rtl" : "ltr"}>
                {L(locale, UI.loading).value}
              </p>
            )}

            {derash && (
              <div>
                <p className="mb-3 font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/60">
                  {L(locale, UI.derashLabel).value}
                </p>
                <div
                  className="whitespace-pre-wrap text-sm leading-relaxed text-parchment/90"
                  dir={fa ? "rtl" : "ltr"}
                >
                  {derash}
                  {cargando && <span className="ms-0.5 animate-pulse text-gold">▋</span>}
                </div>
              </div>
            )}

            {error && (
              <p className="mt-3 text-center text-xs text-red-300/80" dir={fa ? "rtl" : "ltr"}>
                {L(locale, UI.error).value}
              </p>
            )}
          </div>

          {/* ── NOTA HONESTA — SIEMPRE visible ── */}
          <p
            className="mt-5 rounded-lg border border-gold/15 bg-black/20 px-3 py-2.5 text-xs leading-relaxed text-muted"
            dir={nota.shownIn === "fa" ? "rtl" : "ltr"}
            style={{ borderColor: `${acento}22` }}
          >
            {nota.value}
            {nota.missing && <TranslationBadge className="ms-2" available={nota.available} />}
          </p>
        </div>
      )}
    </section>
  );
}

function Fila({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gold/10 bg-black/20 px-3.5 py-2.5">
      <p className="mb-1 font-cinzel text-[9px] uppercase tracking-[0.22em] text-gold/50">{label}</p>
      <div className="text-parchment/90">{children}</div>
    </div>
  );
}
