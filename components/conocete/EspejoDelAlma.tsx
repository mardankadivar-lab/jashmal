"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { tri } from "@/lib/i18n/i18nContent";
import TranslationBadge from "@/components/TranslationBadge";
import {
  PREGUNTAS,
  calcularEspejo,
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
  secondaryLabel: { es: "Rasgo secundario", fa: "گرایشِ ثانوی", en: null as string | null },
  sourceLabel: { es: "Fuente", fa: "منبع", en: null as string | null },
  midaLabel: { es: "Midá · avodá", fa: "میدا · عَبودا", en: null as string | null },
  espejoLabel: { es: "Pregunta-espejo", fa: "پرسشِ آینه", en: null as string | null },
  opuestoLabel: { es: "Tu meta · el opuesto-luminoso", fa: "هدفِ تو · ضدِّ نورانی", en: null as string | null },
  arizalLabel: { es: "Sobre las fuentes", fa: "دربارهٔ منابع", en: null as string | null },
  again: { es: "Mirar de nuevo", fa: "نگاهی دوباره", en: null as string | null },
  noPhoto: {
    es: "Sin foto. Sin juicio sobre nadie. Solo doce preguntas a ti mismo.",
    fa: "بدونِ عکس. بدونِ قضاوت دربارهٔ کسی. تنها دوازده پرسش از خودت.",
    en: null as string | null,
  },
  askAi: {
    es: "Pedir mi espejo a la mente de Jashmal",
    fa: "درخواست آینه از ذهنِ خَشمَل",
    en: null as string | null,
  },
  aiLoading: { es: "La mente de Jashmal está mirando…", fa: "ذهنِ خَشمَل در حالِ نگریستن است…", en: null as string | null },
  aiLabel: { es: "La lectura de la mente de Jashmal", fa: "خوانشِ ذهنِ خَشمَل", en: null as string | null },
  aiError: {
    es: "No se pudo componer la lectura ahora. Intenta de nuevo en un momento.",
    fa: "اکنون امکانِ نوشتنِ خوانش نبود. لحظه‌ای دیگر دوباره تلاش کن.",
    en: null as string | null,
  },
  aiDisclaimer: {
    es: "Lectura aproximada — un espejo, no un veredicto. Por encima de todo rasgo, tu libre albedrío y tu entrega a Dios.",
    fa: "خوانشی تقریبی — آینه‌ای، نه حُکم. فراتر از هر ویژگی، ارادهٔ آزاد و تسلیمِ تو به خداوند.",
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

  // Suma de respuestas (pesos: conducta/midá = 2, físico = 1) → dominante + secundario.
  const { dominante, secundario } = useMemo(() => {
    if (fase !== "resultado") return { dominante: null as RasgoTema | null, secundario: null as RasgoTema | null };
    return calcularEspejo(respuestas);
  }, [fase, respuestas]);

  // ── Lectura de la IA (la "mente de Jashmal"), vía /api/espejo (streaming) ──
  const [lectura, setLectura] = useState("");
  const [aiCargando, setAiCargando] = useState(false);
  const [aiError, setAiError] = useState(false);
  const aiDisc = tri(locale, UI.aiDisclaimer.es, UI.aiDisclaimer.fa, UI.aiDisclaimer.en);

  async function pedirEspejoIA() {
    if (!dominante || aiCargando) return;
    setAiCargando(true);
    setAiError(false);
    setLectura("");
    try {
      const res = await fetch("/api/espejo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          dominanteId: dominante.id,
          secundarioId: secundario?.id ?? null,
        }),
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
        setLectura(acumulado);
      }
      if (huboError || !acumulado.trim()) throw new Error("stream");
    } catch {
      setAiError(true);
    } finally {
      setAiCargando(false);
    }
  }

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
    setLectura("");
    setAiError(false);
    setAiCargando(false);
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

      {/* ── PREGUNTAS (12) ── */}
      {fase === "preguntas" && (() => {
        const preg = PREGUNTAS[paso];
        const pregT = tri(locale, preg.texto, preg.textoFa, null);
        return (
        <section className="rounded-2xl border border-gold/20 bg-ink/50 p-6">
          {/* Progreso */}
          <div className="mb-3 flex items-center justify-between">
            <span className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/60">
              {L(locale, UI.step).value} {paso + 1} {L(locale, UI.of).value} {PREGUNTAS.length}
            </span>
            {pregT.missing && <TranslationBadge available={pregT.available} />}
          </div>
          {/* Barra de progreso (12 preguntas no caben como puntos) */}
          <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-gold/15">
            <span
              className="block h-full rounded-full bg-gold transition-all"
              style={{ width: `${((paso + 1) / PREGUNTAS.length) * 100}%` }}
            />
          </div>

          <p
            className="mb-5 text-lg leading-relaxed text-parchment"
            dir={pregT.shownIn === "fa" ? "rtl" : "ltr"}
          >
            {pregT.value}
          </p>

          <div className="space-y-3">
            {preg.opciones.map((op, i) => {
              const opT = tri(locale, op.texto, op.textoFa, null);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => elegir(op.rasgos)}
                  className="flex w-full items-center gap-3 rounded-xl border border-gold/20 bg-ink/40 px-4 py-3.5 text-start transition-all hover:border-gold/60 hover:bg-gold/[0.07]"
                >
                  <span className="hebrew text-base text-gold/50">{["א", "ב", "ג", "ד"][i]}</span>
                  <span
                    className="text-sm leading-relaxed text-parchment/90"
                    dir={opT.shownIn === "fa" ? "rtl" : "ltr"}
                  >
                    {opT.value}
                  </span>
                </button>
              );
            })}
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
        );
      })()}

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
            {secundario && (
              <p className="relative mt-3 text-xs text-muted">
                <span className="uppercase tracking-[0.2em] text-gold/50">
                  {L(locale, UI.secondaryLabel).value}:
                </span>{" "}
                <span className="text-parchment/80">{secundario.titulo}</span>
              </p>
            )}
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

            {/* Rasgo secundario: fuente verificada */}
            {secundario && (
              <Bloque label={`${L(locale, UI.secondaryLabel).value} · ${L(locale, UI.sourceLabel).value}`} acento={secundario.color}>
                <p className="text-sm font-medium text-parchment/90">{secundario.titulo}</p>
                <p className="mt-0.5 text-xs text-muted">{secundario.fuente}</p>
                <p className="hebrew mt-2 text-base leading-relaxed text-parchment/75" dir="rtl">
                  {secundario.citaHe}
                </p>
                <p className="mt-2 text-xs italic leading-relaxed text-parchment/80">{secundario.espejo}</p>
              </Bloque>
            )}
          </div>

          {/* ── LECTURA DE LA MENTE DE JASHMAL (IA) ── */}
          <div className="border-t border-gold/10 px-6 py-6">
            {!lectura && !aiCargando && (
              <button
                type="button"
                onClick={pedirEspejoIA}
                className="w-full rounded-full border border-gold/50 bg-gold/10 px-5 py-3 font-cinzel text-sm uppercase tracking-[0.18em] text-gold transition-all hover:bg-gold/20"
              >
                {L(locale, UI.askAi).value}
              </button>
            )}

            {aiCargando && !lectura && (
              <p className="text-center text-sm italic text-muted animate-pulse" dir={fa ? "rtl" : "ltr"}>
                {L(locale, UI.aiLoading).value}
              </p>
            )}

            {(lectura || (aiCargando && lectura)) && (
              <div>
                <p className="mb-3 font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/60">
                  {L(locale, UI.aiLabel).value}
                </p>
                <div
                  className="whitespace-pre-wrap text-sm leading-relaxed text-parchment/90"
                  dir={fa ? "rtl" : "ltr"}
                >
                  {lectura}
                  {aiCargando && <span className="ms-0.5 animate-pulse text-gold">▋</span>}
                </div>
                {/* Disclaimer SIEMPRE visible bajo la lectura de IA */}
                <p
                  className="mt-4 rounded-lg border border-gold/15 bg-black/20 px-3 py-2.5 text-xs leading-relaxed text-muted"
                  dir={aiDisc.shownIn === "fa" ? "rtl" : "ltr"}
                >
                  {aiDisc.value}
                  {aiDisc.missing && <TranslationBadge className="ms-2" available={aiDisc.available} />}
                </p>
              </div>
            )}

            {aiError && (
              <p className="mt-3 text-center text-xs text-red-300/80" dir={fa ? "rtl" : "ltr"}>
                {L(locale, UI.aiError).value}
              </p>
            )}
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
