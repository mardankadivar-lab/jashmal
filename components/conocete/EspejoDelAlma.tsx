"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { tri } from "@/lib/i18n/i18nContent";
import TranslationBadge from "@/components/TranslationBadge";
import {
  PREGUNTAS,
  RASGOS,
  rasgoById,
  ESPEJO_DISCLAIMER,
  ESPEJO_NOTA_ARIZAL,
  ESPEJO_CIERRE,
  type RasgoTema,
} from "@/lib/content/autoconocimiento";

const UI = {
  he: "מַרְאָה",
  title: { es: "El Espejo del Alma", fa: "آینهٔ روح", en: null as string | null },
  enter: { es: "Entrar al espejo", fa: "ورود به آینه", en: null as string | null },
  step: { es: "Pregunta", fa: "پرسش", en: null as string | null },
  of: { es: "de", fa: "از", en: null as string | null },
  back: { es: "Atrás", fa: "بازگشت", en: null as string | null },
  resultLabel: { es: "Tu rasgo-tema dominante", fa: "گرایشِ غالبِ تو", en: null as string | null },
  sourceLabel: { es: "Fuente", fa: "منبع", en: null as string | null },
  midaLabel: { es: "Midá · avodá", fa: "میدا · عَبودا", en: null as string | null },
  espejoLabel: { es: "Pregunta-espejo", fa: "پرسشِ آینه", en: null as string | null },
  opuestoLabel: { es: "Tu meta · el opuesto-luminoso", fa: "هدفِ تو · ضدِّ نورانی", en: null as string | null },
  arizalLabel: { es: "Sobre las fuentes", fa: "دربارهٔ منابع", en: null as string | null },
  again: { es: "Mirar de nuevo", fa: "نگاهی دوباره", en: null as string | null },
  noPhoto: {
    es: "Sin foto. Sin juicio sobre nadie. Solo cuatro preguntas a ti mismo.",
    fa: "بدونِ عکس. بدونِ قضاوت دربارهٔ کسی. تنها چهار پرسش از خودت.",
    en: null as string | null,
  },
};

function L(locale: Locale, field: { es: string; fa: string | null; en: string | null }) {
  return tri(locale, field.es, field.fa, field.en);
}

type Fase = "umbral" | "preguntas" | "resultado";

export default function EspejoDelAlma() {
  const locale = useLocale() as Locale;
  const fa = locale === "fa";
  const [fase, setFase] = useState<Fase>("umbral");
  const [paso, setPaso] = useState(0);
  // respuestas[i] = ids de rasgo de la opción elegida en la pregunta i
  const [respuestas, setRespuestas] = useState<(RasgoTema["id"][] | null)[]>(
    PREGUNTAS.map(() => null),
  );

  const disclaimer = tri(locale, ESPEJO_DISCLAIMER.es, ESPEJO_DISCLAIMER.fa, ESPEJO_DISCLAIMER.en);
  const notaArizal = tri(locale, ESPEJO_NOTA_ARIZAL.es, ESPEJO_NOTA_ARIZAL.fa, ESPEJO_NOTA_ARIZAL.en);
  const cierre = tri(locale, ESPEJO_CIERRE.es, ESPEJO_CIERRE.fa, ESPEJO_CIERRE.en);

  // Suma de respuestas → rasgo-tema dominante.
  const dominante: RasgoTema | null = useMemo(() => {
    if (fase !== "resultado") return null;
    const conteo: Record<string, number> = {};
    for (const r of respuestas) {
      if (!r) continue;
      for (const id of r) conteo[id] = (conteo[id] ?? 0) + 1;
    }
    // Orden estable: por conteo desc, y a empate por el orden de RASGOS.
    let mejor: RasgoTema["id"] | null = null;
    let mejorN = -1;
    for (const rasgo of RASGOS) {
      const n = conteo[rasgo.id] ?? 0;
      if (n > mejorN) {
        mejorN = n;
        mejor = rasgo.id;
      }
    }
    return mejor ? rasgoById(mejor) : null;
  }, [fase, respuestas]);

  function elegir(opcionRasgos: RasgoTema["id"][]) {
    setRespuestas((prev) => {
      const next = [...prev];
      next[paso] = opcionRasgos;
      return next;
    });
    if (paso + 1 < PREGUNTAS.length) {
      setPaso((p) => p + 1);
    } else {
      setFase("resultado");
    }
  }

  function reiniciar() {
    setRespuestas(PREGUNTAS.map(() => null));
    setPaso(0);
    setFase("umbral");
  }

  const acento = dominante?.color ?? "#c9a43e";

  return (
    <main className="mx-auto max-w-2xl px-5 pb-28 pt-10" dir={fa ? "rtl" : "ltr"}>
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-cinzel text-sm text-gold/70 transition-colors hover:text-gold"
        >
          <span>{fa ? "→" : "←"}</span>
          <span className="hebrew">חַשְׁמַל</span>
          <span>· Jashmal</span>
        </Link>
      </div>

      <header className="mb-8 text-center">
        <p
          className="hebrew mb-2 text-4xl text-gold/85"
          style={{ filter: "drop-shadow(0 0 14px rgba(201,164,62,0.45))" }}
        >
          {UI.he}
        </p>
        <h1 className="font-cinzel text-2xl font-bold tracking-wide text-parchment sm:text-3xl">
          {L(locale, UI.title).value}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          {L(locale, UI.noPhoto).value}
        </p>
      </header>

      {/* ── UMBRAL DE ENTRADA: el disclaimer se muestra ANTES de entrar ── */}
      {fase === "umbral" && (
        <section
          className="overflow-hidden rounded-2xl border border-gold/30 bg-gold/[0.06] p-6"
        >
          {disclaimer.missing && (
            <div className="mb-3 flex justify-center">
              <TranslationBadge available={disclaimer.available} />
            </div>
          )}
          <p
            className="text-sm leading-relaxed text-parchment/90"
            dir={disclaimer.shownIn === "fa" ? "rtl" : "ltr"}
          >
            {disclaimer.value}
          </p>

          {/* Nota de honestidad sobre las fuentes / Arizal */}
          <div className="mt-5 border-t border-gold/15 pt-4">
            <p className="mb-1.5 font-cinzel text-[10px] uppercase tracking-[0.25em] text-gold/50">
              {L(locale, UI.arizalLabel).value}
            </p>
            <p
              className="text-xs italic leading-relaxed text-muted/85"
              dir={notaArizal.shownIn === "fa" ? "rtl" : "ltr"}
            >
              {notaArizal.value}
              {notaArizal.missing && <TranslationBadge className="ms-2" available={notaArizal.available} />}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setFase("preguntas")}
            className="mt-6 w-full rounded-full border border-gold/50 bg-gold/10 px-5 py-3 font-cinzel text-sm uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/20"
          >
            {L(locale, UI.enter).value}
          </button>
        </section>
      )}

      {/* ── PREGUNTAS (4) ── */}
      {fase === "preguntas" && (
        <section className="rounded-2xl border border-gold/20 bg-ink/50 p-6">
          {/* Progreso */}
          <div className="mb-5 flex items-center justify-between">
            <span className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/60">
              {L(locale, UI.step).value} {paso + 1} {L(locale, UI.of).value} {PREGUNTAS.length}
            </span>
            <div className="flex gap-1.5">
              {PREGUNTAS.map((p, i) => (
                <span
                  key={p.id}
                  className="h-1.5 w-6 rounded-full transition-colors"
                  style={{ background: i <= paso ? "#c9a43e" : "rgba(201,164,62,0.2)" }}
                />
              ))}
            </div>
          </div>

          <p className="mb-5 text-lg leading-relaxed text-parchment">
            {PREGUNTAS[paso].texto}
          </p>

          <div className="space-y-3">
            {PREGUNTAS[paso].opciones.map((op, i) => (
              <button
                key={i}
                type="button"
                onClick={() => elegir(op.rasgos)}
                className="flex w-full items-center gap-3 rounded-xl border border-gold/20 bg-ink/40 px-4 py-3.5 text-start transition-all hover:border-gold/60 hover:bg-gold/[0.07]"
              >
                <span className="hebrew text-base text-gold/50">{["א", "ב", "ג", "ד"][i]}</span>
                <span className="text-sm leading-relaxed text-parchment/90">{op.texto}</span>
              </button>
            ))}
          </div>

          {paso > 0 && (
            <button
              type="button"
              onClick={() => setPaso((p) => p - 1)}
              className="mt-5 inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-gold"
            >
              <span>{fa ? "→" : "←"}</span>
              {L(locale, UI.back).value}
            </button>
          )}
        </section>
      )}

      {/* ── RESULTADO: rasgo-tema + fuente + midá + espejo + opuesto-luminoso ── */}
      {fase === "resultado" && dominante && (
        <section
          className="overflow-hidden rounded-2xl border bg-ink/70"
          style={{ borderColor: `${acento}66` }}
        >
          <div className="relative px-6 pt-7 pb-5 text-center">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-32"
              style={{ background: `radial-gradient(ellipse at top, ${acento}33 0%, transparent 70%)` }}
            />
            <p className="relative font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/60">
              {L(locale, UI.resultLabel).value}
            </p>
            <h2
              className="relative mt-2 font-cinzel text-2xl font-bold text-parchment"
              style={{ textShadow: `0 0 18px ${acento}66` }}
            >
              {dominante.titulo}
            </h2>
          </div>

          <div className="space-y-5 border-t border-gold/10 px-6 py-6">
            {/* Fuente verificada */}
            <Bloque label={L(locale, UI.sourceLabel).value} acento={acento}>
              <p className="text-sm font-medium text-parchment/90">{dominante.fuente}</p>
              <p className="hebrew mt-2 text-lg leading-relaxed text-parchment/80" dir="rtl">
                {dominante.citaHe}
              </p>
            </Bloque>

            {/* Midá / avodá */}
            <Bloque label={L(locale, UI.midaLabel).value} acento={acento}>
              <p className="text-sm leading-relaxed text-parchment/90">{dominante.mida}</p>
            </Bloque>

            {/* Pregunta-espejo */}
            <Bloque label={L(locale, UI.espejoLabel).value} acento={acento}>
              <p className="text-sm italic leading-relaxed text-parchment/90">{dominante.espejo}</p>
            </Bloque>

            {/* Opuesto-luminoso = meta */}
            <Bloque label={L(locale, UI.opuestoLabel).value} acento={acento} destacado>
              <p className="text-sm leading-relaxed" style={{ color: acento }}>
                {dominante.opuesto}
              </p>
            </Bloque>
          </div>

          {/* Cierre: tendencia, no destino */}
          <div className="border-t border-gold/10 bg-black/25 px-6 py-5">
            <p
              className="text-sm leading-relaxed text-parchment/85"
              dir={cierre.shownIn === "fa" ? "rtl" : "ltr"}
            >
              {cierre.value}
            </p>
            {cierre.missing && (
              <div className="mt-2">
                <TranslationBadge available={cierre.available} />
              </div>
            )}
            <button
              type="button"
              onClick={reiniciar}
              className="mt-5 rounded-full border border-gold/40 px-5 py-2.5 font-cinzel text-xs uppercase tracking-[0.2em] text-gold/80 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold"
            >
              {L(locale, UI.again).value}
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

function Bloque({
  label,
  children,
  acento,
  destacado = false,
}: {
  label: string;
  children: React.ReactNode;
  acento: string;
  destacado?: boolean;
}) {
  return (
    <div
      className={"rounded-xl border px-4 py-3.5 " + (destacado ? "" : "border-gold/10")}
      style={destacado ? { borderColor: `${acento}44`, background: `${acento}10` } : { background: "rgba(0,0,0,0.2)" }}
    >
      <p className="mb-2 font-cinzel text-[10px] uppercase tracking-[0.25em] text-gold/55">{label}</p>
      {children}
    </div>
  );
}
