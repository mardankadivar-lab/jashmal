"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import SaveYourPath from "./SaveYourPath";
import {
  type UmbralContent,
  type Screen3Block,
  MAALOT,
  bereshitGloss,
  GENESIS_REF,
} from "@/lib/academia/umbral";

// El versículo de apertura y la letra protagonista (no cambian entre idiomas).
const BERESHIT = "בְּרֵאשִׁית בָּרָא אֱלֹהִים";
const BET = "ב";

export default function UmbralWizard({
  content,
  locale,
  rtl,
  alreadySaved,
}: {
  content: UmbralContent;
  locale: string;
  rtl: boolean;
  alreadySaved: boolean;
}) {
  const [screen, setScreen] = useState(1);
  const [choice, setChoice] = useState<string | null>(null); // label elegido en el espejo
  // clave de animación: cambia en cada paso para re-disparar el fade-in
  const [animKey, setAnimKey] = useState(0);

  function go(to: number) {
    setScreen(to);
    setAnimKey((k) => k + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function pick(label: string) {
    setChoice(label);
    go(2);
  }

  const progress = (screen / 4) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden" dir={rtl ? "rtl" : "ltr"}>
      {/* halo dorado de fondo, sutil */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(201,164,62,0.08) 0%, rgba(5,5,10,0) 65%)",
        }}
      />

      {/* barra de progreso del umbral */}
      <div className="fixed inset-x-0 top-0 z-20 h-[3px] bg-gold/10">
        <div
          className="h-full bg-gold transition-all duration-700 ease-out"
          style={{ width: `${progress}%`, boxShadow: "0 0 10px #c9a43e" }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-16">
        {/* sello de Jashmal arriba */}
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="hebrew text-2xl text-gold/90 transition hover:text-gold"
            style={{ filter: "drop-shadow(0 0 10px #c9a43e44)" }}
          >
            חַשְׁמַל
          </Link>
          <p className="mt-2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/40">
            La Academia · El Umbral
          </p>
        </div>

        <div key={animKey} className="animate-fade-up flex-1">
          {screen === 1 && <ScreenMirror c={content} onPick={pick} />}
          {screen === 2 && <ScreenPromise c={content} onNext={() => go(3)} />}
          {screen === 3 && (
            <ScreenVictory c={content} locale={locale} rtl={rtl} choice={choice} onNext={() => go(4)} />
          )}
          {screen === 4 && <ScreenStep c={content} alreadySaved={alreadySaved} />}
        </div>

        {/* pasos (puntos) */}
        <div className="mt-12 flex items-center justify-center gap-2.5">
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                n === screen ? "w-7 bg-gold" : n < screen ? "w-1.5 bg-gold/60" : "w-1.5 bg-gold/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── pieza reutilizable: rótulo hebreo + glosa ──────────────────────────────
function Rubric({ he, label }: { he: string; label: string }) {
  // label viene como "הָרְאִי · El espejo"; mostramos solo la parte tras "·"
  const gloss = label.includes("·") ? label.split("·").slice(1).join("·").trim() : label;
  return (
    <div className="mb-9 text-center">
      <p
        className="hebrew text-2xl text-gold"
        dir="rtl"
        style={{ filter: "drop-shadow(0 0 8px #c9a43e44)" }}
      >
        {he}
      </p>
      <p className="mt-1.5 font-cinzel text-xs uppercase tracking-[0.28em] text-gold/55">{gloss}</p>
    </div>
  );
}

function GoldButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-2 border-gold bg-gold/10 px-9 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.25)]"
    >
      {children}
    </button>
  );
}

// ── PANTALLA 1 — EL ESPEJO ─────────────────────────────────────────────────
function ScreenMirror({ c, onPick }: { c: UmbralContent; onPick: (label: string) => void }) {
  return (
    <div className="text-center">
      <Rubric he={c.s1.rubricHe} label={c.s1.rubric} />
      <h1 className="font-cinzel text-3xl leading-snug text-parchment sm:text-4xl">
        {c.s1.question}
      </h1>
      <div className="mx-auto mt-10 flex max-w-lg flex-col gap-3">
        {c.s1.choices.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onPick(opt.label)}
            className="group rounded-2xl border border-gold/25 bg-gold/[0.03] px-6 py-5 text-start text-lg leading-relaxed text-parchment/90 transition-all hover:border-gold/60 hover:bg-gold/[0.08]"
          >
            <span className="me-2 text-gold/50 transition group-hover:text-gold">—</span>
            {opt.label}
          </button>
        ))}
      </div>
      <p className="mx-auto mt-9 max-w-md text-sm italic leading-relaxed text-muted">{c.s1.micro}</p>
    </div>
  );
}

// ── PANTALLA 2 — LA PROMESA HONESTA ────────────────────────────────────────
function ScreenPromise({ c, onNext }: { c: UmbralContent; onNext: () => void }) {
  return (
    <div>
      <Rubric he={c.s2.rubricHe} label={c.s2.rubric} />
      <div className="space-y-5 text-lg leading-relaxed text-parchment/85">
        {c.s2.body.map((p, i) => (
          <p key={i} className={i === 0 ? "text-parchment" : undefined}>
            {p}
          </p>
        ))}
      </div>
      <div className="mt-11 text-center">
        <GoldButton onClick={onNext}>{c.s2.cta}</GoldButton>
      </div>
    </div>
  );
}

// ── PANTALLA 3 — LA PRIMERA VICTORIA (el corazón) ──────────────────────────
function ScreenVictory({
  c,
  locale,
  rtl,
  choice,
  onNext,
}: {
  c: UmbralContent;
  locale: string;
  rtl: boolean;
  choice: string | null;
  onNext: () => void;
}) {
  return (
    <div>
      <Rubric he={c.s3.rubricHe} label={c.s3.rubric} />
      <div className="space-y-7">
        {c.s3.blocks.map((b, i) => (
          <Block key={i} b={b} locale={locale} rtl={rtl} choice={choice} mirrorback={c.s3.mirrorback} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <GoldButton onClick={onNext}>{c.s3.cta}</GoldButton>
      </div>
    </div>
  );
}

function Quote({ text, source }: { text: string; source: string }) {
  return (
    <blockquote className="my-5 border-s-2 border-gold/50 bg-gold/[0.04] py-4 pe-5 ps-6">
      <p className="text-lg italic leading-relaxed text-parchment/90">{text}</p>
      <footer className="mt-3 font-cinzel text-[11px] uppercase tracking-widest text-gold/60">
        — {source}
      </footer>
    </blockquote>
  );
}

function Block({
  b,
  locale,
  rtl,
  choice,
  mirrorback,
}: {
  b: Screen3Block;
  locale: string;
  rtl: boolean;
  choice: string | null;
  mirrorback?: string;
}) {
  const lead = b.lead ?? [];
  const tail = b.tail ?? [];

  return (
    <section className="text-lg leading-relaxed text-parchment/85">
      {lead.map((p, i) => (
        <p key={`l${i}`} className="mt-3 first:mt-0">
          {p}
        </p>
      ))}

      {/* El enigma muestra el versículo grande + la letra GIGANTE */}
      {b.kind === "enigma" && (
        <>
          <div className="my-6 rounded-2xl border border-gold/20 bg-ink/40 py-7 text-center">
            <p
              className="hebrew text-3xl leading-relaxed text-parchment sm:text-4xl"
              dir="rtl"
              style={{ filter: "drop-shadow(0 0 6px #c9a43e22)" }}
            >
              {BERESHIT}
            </p>
            <p className="mt-3 text-base italic text-parchment/65">
              «{bereshitGloss(locale)}» <span className="text-gold/55">({GENESIS_REF})</span>
            </p>
          </div>
        </>
      )}

      {/* tras el primer párrafo del tail del enigma, la ב GIGANTE */}
      {b.kind === "enigma" && tail.length > 0 && (
        <>
          <p className="mt-3">{tail[0]}</p>
          <div className="my-8 text-center" dir="rtl">
            <span
              className="hebrew block font-bold leading-none text-gold"
              style={{
                fontSize: "clamp(7rem, 26vw, 11rem)",
                filter: "drop-shadow(0 0 30px rgba(201,164,62,0.45))",
              }}
            >
              {BET}
            </span>
          </div>
          {tail.slice(1).map((p, i) => (
            <p key={`t${i}`} className="mt-3">
              {p}
            </p>
          ))}
        </>
      )}

      {/* la forma (classic): una ב mediana al lado del texto, marca de fuente */}
      {b.kind === "classic" && (
        <div className="my-6 flex items-center justify-center" dir="rtl">
          <span
            className="hebrew font-bold leading-none text-gold/90"
            style={{ fontSize: "clamp(5rem, 16vw, 7rem)", filter: "drop-shadow(0 0 18px rgba(201,164,62,0.35))" }}
          >
            {BET}
          </span>
        </div>
      )}

      {b.quote && <Quote text={b.quote.text} source={b.quote.source} />}

      {/* el resto del tail (para classic / etym) */}
      {b.kind !== "enigma" &&
        tail.map((p, i) => (
          <p key={`t${i}`} className="mt-3">
            {p}
          </p>
        ))}

      {/* en el cierre, si hubo elección en el espejo, la reinyectamos con énfasis */}
      {b.kind === "closing" && choice && mirrorback && (
        <p className="mt-5 rounded-xl border border-gold/15 bg-gold/[0.04] px-5 py-4 leading-relaxed text-parchment/90">
          {renderMirrorback(mirrorback, choice)}
        </p>
      )}
    </section>
  );
}

// Sustituye {{choice}} por la frase elegida (en minúscula, sin el punto final).
function renderMirrorback(tpl: string, choice: string) {
  const clean = choice.replace(/\.$/, "").trim();
  const lower = clean.charAt(0).toLowerCase() + clean.slice(1);
  const parts = tpl.split("{{choice}}");
  return (
    <>
      {parts[0]}
      <span className="text-gold">{lower}</span>
      {parts[1] ?? ""}
    </>
  );
}

// ── PANTALLA 4 — EL PRIMER PELDAÑO ─────────────────────────────────────────
function ScreenStep({ c, alreadySaved }: { c: UmbralContent; alreadySaved: boolean }) {
  const [showLadder, setShowLadder] = useState(false);

  return (
    <div>
      <Rubric he={c.s4.rubricHe} label={c.s4.rubric} />

      {/* título: eres un Talmid */}
      <div className="mb-8 text-center">
        <p className="hebrew text-5xl text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 14px #c9a43e55)" }}>
          תַּלְמִיד
        </p>
        <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/70">
          Talmid · estudiante
        </p>
      </div>

      <div className="space-y-5 text-lg leading-relaxed text-parchment/85">
        {c.s4.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* La escalera de seis grados */}
      <div className="mt-8">
        {!showLadder ? (
          <button
            onClick={() => setShowLadder(true)}
            className="mx-auto block font-cinzel text-xs uppercase tracking-widest text-gold/70 underline-offset-4 transition hover:text-gold hover:underline"
          >
            {c.s4.secondary}
          </button>
        ) : (
          <Ladder label={c.s4.ladderLabel} />
        )}
      </div>

      {/* Guardar el camino (login mágico) */}
      <div className="mt-12">
        {alreadySaved ? (
          <div className="rounded-2xl border border-gold/20 bg-gold/[0.05] p-7 text-center">
            <p className="text-lg text-gold">Tu camino ya está guardado 🕯️</p>
            <p className="mt-2 text-sm leading-relaxed text-parchment/75">
              Cuando vuelvas, retomas justo aquí. Sigue adelante — la puerta está abierta.
            </p>
            <Link
              href="/estudio"
              className="mt-6 inline-block rounded-full border-2 border-gold bg-gold/10 px-9 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
            >
              {c.s4.cta}
            </Link>
          </div>
        ) : (
          <>
            <p className="mb-4 text-center font-cinzel text-xs uppercase tracking-[0.25em] text-gold/50">
              {c.s4.saveTitle}
            </p>
            <SaveYourPath reason={c.s4.saveReason} cta={c.s4.cta} />
          </>
        )}
      </div>

      {/* puente final hacia el estudio */}
      <div className="mt-10 text-center">
        <Link
          href="/estudio"
          className="font-cinzel text-xs uppercase tracking-widest text-parchment/60 underline-offset-4 transition hover:text-gold hover:underline"
        >
          Entrar a la sala de estudio →
        </Link>
      </div>
    </div>
  );
}

function Ladder({ label }: { label: string }) {
  const gloss = label.includes("·") ? label.split("·").slice(1).join("·").trim() : label;
  const he = label.includes("·") ? label.split("·")[0].trim() : "";
  return (
    <div className="animate-fade-up rounded-2xl border border-gold/15 bg-gold/[0.03] p-6">
      <div className="mb-5 text-center">
        {he && (
          <p className="hebrew text-xl text-gold" dir="rtl">
            {he}
          </p>
        )}
        <p className="mt-1 font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/50">{gloss}</p>
      </div>
      <ol className="flex flex-col gap-2">
        {MAALOT.map((m, i) => {
          const current = i === 0; // el estudiante está en el primer escalón
          return (
            <li
              key={m.he}
              className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                current ? "border border-gold/40 bg-gold/[0.08]" : "bg-ink/30"
              }`}
            >
              <span className="flex items-center gap-3">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full font-cinzel text-xs ${
                    current ? "bg-gold text-ink" : "bg-gold/15 text-gold/70"
                  }`}
                >
                  {i + 1}
                </span>
                <span className={current ? "text-parchment" : "text-parchment/60"}>{m.es}</span>
              </span>
              <span className={`hebrew text-lg ${current ? "text-gold" : "text-gold/50"}`} dir="rtl">
                {m.he}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="mt-5 text-center text-xs leading-relaxed text-muted/70">
        Estás en el primer escalón, donde empiezan los grandes. La puerta está abierta hacia adelante.
      </p>
    </div>
  );
}
