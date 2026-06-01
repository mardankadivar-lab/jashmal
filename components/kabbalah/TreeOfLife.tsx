"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { getSefira, sefiraLabel } from "@/lib/sefirot";
import { SEFIRA_STUDY, ROADMAP_LEVELS } from "@/lib/sefirotStudy";
import { LETTER_MEANINGS, LETTER_TO_PATH, type HebrewLetterMeaning } from "@/lib/hebrewLetters";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const TreeScene = dynamic(() => import("./TreeScene"), { ssr: false });

interface DepthEntry { sefiraId: string; }

// ─── Panel lateral de sefirá (overlay) ───────────────────────────
function SefiraOverlay({
  sefiraId, locale, t, onClose, onEnter, onStudyRef,
}: {
  sefiraId: string; locale: string;
  t: ReturnType<typeof useTranslations>;
  onClose: () => void; onEnter: () => void; onStudyRef: (ref: string) => void;
}) {
  const sefira = getSefira(sefiraId);
  const texts = SEFIRA_STUDY[sefiraId] ?? [];
  if (!sefira) return null;

  return (
    <div
      className="absolute inset-y-0 end-0 z-30 flex w-full max-w-xs flex-col overflow-hidden border-s border-gold/15 bg-ink/92 shadow-2xl backdrop-blur-md"
      style={{ animation: "slideInRight 0.3s ease-out" }}
    >
      {/* Cabecera */}
      <div className="flex items-center justify-between border-b border-gold/10 px-4 py-3">
        <div>
          <span className="hebrew text-2xl font-bold" style={{ color: sefira.glow, filter: `drop-shadow(0 0 8px ${sefira.glow}66)` }}>
            {sefira.he}
          </span>
          <p className="font-cinzel text-xs uppercase tracking-widest text-gold/50">{sefiraLabel(sefira, locale)}</p>
        </div>
        <button onClick={onClose} className="rounded-full border border-gold/20 p-1.5 text-muted transition-colors hover:text-gold">
          ✕
        </button>
      </div>

      {/* Contenido scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        <p className="text-sm leading-relaxed text-muted/85">{sefira.description}</p>
        <p className="text-xs text-muted/50">{sefira.world} · Pilar {sefira.pillar}</p>

        {/* Referencias textuales de Sefaria */}
        <div>
          <p className="mb-2 font-cinzel text-[10px] uppercase tracking-widest text-gold/40">{t("refTitle")}</p>
          <div className="space-y-1.5">
            {sefira.refs.map((ref, i) => (
              <button key={i} onClick={() => onStudyRef(ref)}
                className="flex w-full items-center gap-2 rounded-lg border border-gold/15 bg-gold/[0.04] px-3 py-2 text-start transition-all hover:border-gold/40 hover:bg-gold/10"
              >
                <span className="text-gold/50">📖</span>
                <span className="font-cinzel text-xs text-gold/80">{ref}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Roadmap de estudio */}
        <div>
          <p className="mb-2 font-cinzel text-[10px] uppercase tracking-widest text-gold/40">{t("studyRoadmap")}</p>
          <div className="space-y-3">
            {([1,2,3,4,5,6] as (1|2|3|4|5|6)[]).map((level) => {
              const lvTexts = texts.filter((tx) => tx.level === level);
              if (!lvTexts.length) return null;
              return (
                <div key={level}>
                  <p className="mb-1 font-cinzel text-[9px] uppercase tracking-wide text-gold/30">
                    {ROADMAP_LEVELS[level]}
                  </p>
                  {lvTexts.map((tx, j) => (
                    <div key={j} className="mb-1.5 rounded-lg border border-gold/10 bg-white/[0.02] p-2.5">
                      <p className="text-xs font-medium text-parchment/90">{tx.title}</p>
                      <p className="mt-0.5 text-[10px] text-gold/55">{tx.author}</p>
                      <p className="mt-1 text-[10px] leading-relaxed text-muted/65">{tx.note}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Botón entrar */}
      <div className="border-t border-gold/10 p-3">
        <button onClick={onEnter}
          className="w-full rounded-full border py-2.5 font-cinzel text-xs uppercase tracking-widest transition-all hover:brightness-125"
          style={{ borderColor: sefira.glow + "60", color: sefira.glow, background: sefira.glow + "10" }}
        >
          {t("enter")} — <span className="hebrew">{sefira.he}</span> →
        </button>
      </div>
    </div>
  );
}

// ─── Panel de Heijalot (overlay) ─────────────────────────────────
function HeijalotOverlay({ depth, heijalot, loading, t }: {
  depth: DepthEntry[]; heijalot: string | null; loading: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  if (depth.length < 2) return null;
  return (
    <div className="absolute bottom-6 start-6 z-20 max-w-xs rounded-xl border border-gold/20 bg-ink/90 p-4 shadow-xl backdrop-blur-md">
      <p className="hebrew mb-2 text-center text-base text-gold">הֵיכָלוֹת</p>
      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {depth.map((d, i) => {
          const s = getSefira(d.sefiraId);
          return (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-gold/30 text-xs">›</span>}
              <span className="hebrew text-sm" style={{ color: s?.glow }}>{s?.he}</span>
            </span>
          );
        })}
      </div>
      {loading && <p className="animate-pulse text-center text-xs text-muted">{t("loadingHeijalot")}</p>}
      {heijalot && !loading && (
        <div className="mt-2 max-h-48 overflow-y-auto space-y-1">
          {heijalot.split(/\n+/).map((line, i) => {
            const h = line.match(/^\*\*(.+?)\*\*/);
            if (h) return <p key={i} className="mt-2 font-cinzel text-gold" style={{ fontSize: "10px" }}>{h[1]}</p>;
            return line.trim() ? <p key={i} className="text-muted/75 leading-relaxed" style={{ fontSize: "9px" }}>{line.replace(/\*\*/g, "")}</p> : null;
          })}
        </div>
      )}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────
export default function TreeOfLife() {
  const locale = useLocale();
  const t = useTranslations("tree");
  const router = useRouter();

  const [selected, setSelected] = useState<string | null>(null);
  const [depth, setDepth] = useState<DepthEntry[]>([]);
  const [heijalot, setHeijalot] = useState<string | null>(null);
  const [heijalotLoading, setHeijalotLoading] = useState(false);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLetterClick = useCallback((letter: string) => {
    setActiveLetter((prev) => (prev === letter ? null : letter));
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      if (prev === id) {  return null; }
      
      return id;
    });
  }, []);

  const handleEnter = useCallback(() => {
    if (!selected) return;
    
    setTimeout(() => {
      setDepth((d) => [...d, { sefiraId: selected }]);
      setSelected(null);
      
      setHeijalot(null);
    }, 700);
  }, [selected]);

  const handleBack = useCallback(() => {
    setDepth((d) => d.slice(0, -1));
    setSelected(null);
    setHeijalot(null);
    
  }, []);

  // Navega al estudio en modo cabalístico, pasando la sefirá como contexto.
  const handleStudyRef = useCallback((ref: string) => {
    const sefiraId = selected;
    const params = new URLSearchParams({ ref });
    if (sefiraId) {
      params.set("context", "kabbalah");
      params.set("sefira", sefiraId);
    }
    router.push(`/estudio?${params.toString()}`);
  }, [router, selected]);

  // Cargar Heijalot en profundidad ≥ 2
  useEffect(() => {
    if (depth.length < 2) { setHeijalot(null); return; }
    const path = depth.map((d) => d.sefiraId);
    setHeijalotLoading(true);
    setHeijalot(null);
    fetch("/api/heijalot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, locale }),
    })
      .then((r) => r.json())
      .then((d) => setHeijalot(d.explanation || ""))
      .catch(() => setHeijalot(""))
      .finally(() => setHeijalotLoading(false));
  }, [depth, locale]);

  const currentRoot = depth.length > 0 ? getSefira(depth[depth.length - 1].sefiraId) : null;

  return (
    <>
      {/* Pantalla completa — fixed sobre todo */}
      <div
        ref={containerRef}
        className="always-dark fixed inset-0 z-50 overflow-hidden"
        style={{ background: "#02010a" }}
      >
        {/* Canvas Three.js */}
        <Suspense fallback={
          <div className="flex h-full items-center justify-center">
            <p className="animate-pulse font-cinzel text-gold/50">{t("loading3D")}</p>
          </div>
        }>
          <Canvas camera={{ position: [0, 0, 14], fov: 52 }} gl={{ antialias: true }}
            style={{ position: "absolute", inset: 0 }}
          >
            <TreeScene selected={selected} depth={depth} onSelect={handleSelect} onLetterClick={handleLetterClick} locale={locale} />
          </Canvas>
        </Suspense>

        {/* ── Overlays flotantes ───────────────────────── */}

        {/* Botón cerrar (volver a la web) */}
        <div className="absolute start-4 top-4 z-40 flex items-center gap-3">
          <button
            onClick={() => router.push("/estudio")}
            className="rounded-full border border-gold/20 bg-ink/80 px-3 py-1.5 font-cinzel text-xs text-muted backdrop-blur-md transition-colors hover:text-gold"
          >
            ← {t("exitTree")}
          </button>
          {depth.length > 0 && (
            <div className="flex items-center gap-2 rounded-full border border-gold/15 bg-ink/70 px-3 py-1.5 backdrop-blur-md">
              <button onClick={() => { setDepth([]);  }} className="font-cinzel text-xs text-gold/50 hover:text-gold">{t("root")}</button>
              {depth.map((d, i) => {
                const s = getSefira(d.sefiraId);
                return (
                  <span key={i} className="flex items-center gap-1">
                    <span className="text-gold/30 text-xs">›</span>
                    <button onClick={() => { setDepth(depth.slice(0, i + 1));  }}
                      className="hebrew text-sm" style={{ color: s?.glow }}>
                      {s?.he}
                    </button>
                  </span>
                );
              })}
              <button onClick={handleBack} className="ms-1 rounded-full border border-gold/20 px-2 text-xs text-muted hover:text-gold">←</button>
            </div>
          )}
        </div>

        {/* Título en el árbol */}
        {!selected && (
          <div className="pointer-events-none absolute left-1/2 top-5 z-10 -translate-x-1/2 text-center">
            {currentRoot ? (
              <>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/35">{t("insideLevel", { level: depth.length })}</p>
                <p className="hebrew text-3xl" style={{ color: currentRoot.glow, filter: `drop-shadow(0 0 14px ${currentRoot.glow}66)` }}>
                  {currentRoot.he}
                </p>
              </>
            ) : (
              <p className="hebrew text-2xl text-gold/50" style={{ filter: "drop-shadow(0 0 8px #c9a43e44)" }}>עֵץ חַיִּים</p>
            )}
          </div>
        )}

        {/* Hint scroll */}
        <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
          <p className="font-cinzel text-[9px] uppercase tracking-[0.3em] text-gold/20">{t("scrollHint")}</p>
        </div>

        {/* Popup del léxico de la letra — aparece al centro cuando se clica una letra */}
        {activeLetter && LETTER_MEANINGS[activeLetter] && (() => {
          const lm: HebrewLetterMeaning = LETTER_MEANINGS[activeLetter];
          const path = LETTER_TO_PATH[activeLetter];
          const fromS = path ? getSefira(path.from) : null;
          const toS = path ? getSefira(path.to) : null;
          return (
            <div
              className="absolute left-1/2 top-1/2 z-40 w-[min(340px,90vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-gold/30 bg-ink/96 shadow-2xl backdrop-blur-md"
              style={{ animation: "slideInRight 0.3s ease-out" }}
            >
              {/* Cabecera */}
              <div className="flex items-center justify-between border-b border-gold/15 bg-gold/[0.06] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="hebrew text-4xl" style={{ color: "#e0c873", filter: "drop-shadow(0 0 12px #c9a43e88)", lineHeight: 1 }}>
                    {lm.letter}
                  </span>
                  <div>
                    <p className="font-cinzel text-base text-gold">{lm.name}</p>
                    <p className="hebrew text-xs text-gold/50">{lm.nameHe} · גִּימַטְרִיָּה {lm.value}</p>
                  </div>
                </div>
                <button onClick={() => setActiveLetter(null)} className="rounded-full border border-gold/20 p-1.5 text-muted hover:text-gold">✕</button>
              </div>

              {/* Contenido */}
              <div className="max-h-[55vh] overflow-y-auto px-4 py-3 space-y-3">
                {/* Sendero que representa */}
                {fromS && toS && (
                  <div className="flex items-center gap-2 rounded-lg border border-gold/10 bg-gold/[0.03] px-3 py-2">
                    <span className="font-cinzel text-[10px] uppercase tracking-wide text-gold/40">{t("letterPath")}</span>
                    <span className="hebrew text-sm" style={{ color: fromS.glow }}>{fromS.he}</span>
                    <span className="text-gold/30 text-xs">→</span>
                    <span className="hebrew text-sm" style={{ color: toS.glow }}>{toS.he}</span>
                  </div>
                )}

                <div>
                  <p className="mb-1 font-cinzel text-[10px] uppercase tracking-widest text-gold/40">{t("letterForm")}</p>
                  <p className="text-sm leading-relaxed text-parchment/90">{lm.form}</p>
                </div>

                <div>
                  <p className="mb-1 font-cinzel text-[10px] uppercase tracking-widest text-gold/40">{t("letterInner")}</p>
                  <p className="text-sm leading-relaxed text-muted/85">{lm.innerMeaning}</p>
                </div>

                <div>
                  <p className="mb-1 font-cinzel text-[10px] uppercase tracking-widest text-gold/40">{t("letterConsciousness")}</p>
                  <p className="text-sm leading-relaxed text-muted/80 italic">{lm.consciousness}</p>
                </div>

                {lm.zerohar && (
                  <div className="rounded-lg border border-gold/15 bg-gold/[0.04] p-3">
                    <p className="mb-1 font-cinzel text-[10px] uppercase tracking-widest text-gold/40">Zohar / Talmud</p>
                    <p className="text-xs leading-relaxed text-parchment/80 italic">{lm.zerohar}</p>
                  </div>
                )}

                {lm.analogia && (
                  <div className="border-t border-gold/10 pt-2">
                    <p className="text-xs leading-relaxed text-muted/65 italic">💭 {lm.analogia}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* Panel de sefirá seleccionada (overlay derecho) */}
        {selected && (
          <SefiraOverlay
            sefiraId={selected}
            locale={locale}
            t={t}
            onClose={() => { setSelected(null);  }}
            onEnter={handleEnter}
            onStudyRef={handleStudyRef}
          />
        )}

        {/* Panel Heijalot (overlay inferior-izquierdo) */}
        <HeijalotOverlay depth={depth} heijalot={heijalot} loading={heijalotLoading} t={t} />
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
