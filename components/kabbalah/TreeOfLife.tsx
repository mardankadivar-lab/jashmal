"use client";

import dynamic from "next/dynamic";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { getSefira, sefiraLabel, SEFIROT } from "@/lib/sefirot";
import { SEFIRA_STUDY, ROADMAP_LEVELS } from "@/lib/sefirotStudy";

// Canvas se carga solo en cliente (Three.js no funciona en SSR)
const Canvas = dynamic(
  () => import("@react-three/fiber").then((m) => m.Canvas),
  { ssr: false }
);
const TreeScene = dynamic(() => import("./TreeScene"), { ssr: false });

interface DepthEntry { sefiraId: string; }

// ─── Panel de textos de estudio ──────────────────────────────────
function StudyPanel({ sefiraId, locale, t }: { sefiraId: string; locale: string; t: ReturnType<typeof useTranslations> }) {
  const sefira = getSefira(sefiraId);
  const texts = SEFIRA_STUDY[sefiraId] ?? [];
  if (!sefira) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2">
        <span className="hebrew text-xl" style={{ color: sefira.glow, filter: `drop-shadow(0 0 6px ${sefira.glow}66)` }}>
          {sefira.he}
        </span>
        <span className="font-cinzel text-xs uppercase tracking-widest text-gold/60">
          {sefiraLabel(sefira, locale)}
        </span>
      </div>
      <p className="text-xs leading-relaxed text-muted/80">{sefira.description}</p>

      <div className="mt-3 border-t border-gold/10 pt-3">
        <p className="mb-2 font-cinzel text-[10px] uppercase tracking-widest text-gold/50">
          {t("studyRoadmap")}
        </p>
        <div className="space-y-2">
          {([1, 2, 3, 4, 5, 6] as (1|2|3|4|5|6)[]).map((level) => {
            const levelTexts = texts.filter((tx) => tx.level === level);
            if (levelTexts.length === 0) return null;
            return (
              <div key={level}>
                <p className="mb-1 text-[9px] uppercase tracking-wide text-gold/40 font-cinzel">
                  {ROADMAP_LEVELS[level]}
                </p>
                {levelTexts.map((tx, i) => (
                  <div key={i} className="mb-1.5 rounded border border-gold/10 bg-gold/[0.03] p-2">
                    <p className="text-[11px] font-medium text-parchment/90">{tx.title}</p>
                    <p className="text-[9px] text-gold/60">{tx.author}</p>
                    <p className="mt-0.5 text-[10px] leading-relaxed text-muted/70">{tx.note}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
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
  const [cameraZ, setCameraZ] = useState(14);
  const [heijalot, setHeijalot] = useState<string | null>(null);
  const [heijalotLoading, setHeijalotLoading] = useState(false);
  const [showStudy, setShowStudy] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll del ratón → acerca / aleja la cámara
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setCameraZ((z) => Math.max(4, Math.min(18, z + e.deltaY * 0.015)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      if (prev === id) { setCameraZ(14); return null; }
      setCameraZ(10);
      return id;
    });
    setShowStudy(true);
  }, []);

  const handleEnter = useCallback(() => {
    if (!selected) return;
    setCameraZ(3);
    setTimeout(() => {
      setDepth((d) => [...d, { sefiraId: selected }]);
      setSelected(null);
      setCameraZ(14);
      setHeijalot(null);
    }, 800);
  }, [selected]);

  const handleBack = useCallback(() => {
    setDepth((d) => d.slice(0, -1));
    setSelected(null);
    setHeijalot(null);
    setCameraZ(14);
  }, []);

  const handleRefClick = useCallback((ref: string) => {
    router.push(`/estudio?ref=${encodeURIComponent(ref)}`);
  }, [router]);

  // Cargar Heijalot cuando profundidad ≥ 2
  useEffect(() => {
    if (depth.length < 2) { setHeijalot(null); return; }
    const path = depth.map((d) => d.sefiraId);
    setHeijalotLoading(true);
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

  const selectedSefira = selected ? getSefira(selected) : null;
  const currentRoot = depth.length > 0 ? getSefira(depth[depth.length - 1].sefiraId) : null;

  return (
    <div className="always-dark flex h-screen w-full overflow-hidden">
      {/* ─── Canvas 3D ─── */}
      <div ref={containerRef} className="relative flex-1 cursor-grab active:cursor-grabbing">
        <Suspense fallback={
          <div className="flex h-full items-center justify-center">
            <p className="animate-pulse font-cinzel text-gold/60">{t("loading3D")}</p>
          </div>
        }>
          <Canvas
            camera={{ position: [0, 0, 14], fov: 55 }}
            gl={{ antialias: true, alpha: false }}
            style={{ background: "#02010a" }}
          >
            <TreeScene
              selected={selected}
              depth={depth}
              onSelect={handleSelect}
              onRefClick={handleRefClick}
              locale={locale}
              cameraZ={cameraZ}
            />
          </Canvas>
        </Suspense>

        {/* Overlay de navegación (breadcrumb) */}
        <div className="pointer-events-none absolute left-0 right-0 top-4 flex flex-col items-center gap-2">
          {depth.length > 0 && (
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-gold/20 bg-ink/80 px-4 py-1.5 backdrop-blur-md">
              <button onClick={() => { setDepth([]); setCameraZ(14); }} className="font-cinzel text-xs text-gold/60 hover:text-gold">
                {t("root")}
              </button>
              {depth.map((d, i) => {
                const s = getSefira(d.sefiraId);
                return (
                  <span key={i} className="flex items-center gap-2">
                    <span className="text-gold/30">›</span>
                    <span className="hebrew text-sm" style={{ color: s?.glow }}>
                      {s?.he}
                    </span>
                  </span>
                );
              })}
              <button onClick={handleBack} className="ms-1 rounded-full border border-gold/25 px-2 py-0.5 text-xs text-muted hover:text-gold">
                ←
              </button>
            </div>
          )}

          {currentRoot && (
            <div className="text-center">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/40">{t("insideLevel", { level: depth.length })}</p>
              <p className="hebrew text-2xl" style={{ color: currentRoot.glow, filter: `drop-shadow(0 0 10px ${currentRoot.glow})` }}>
                {currentRoot.he}
              </p>
            </div>
          )}
        </div>

        {/* Hint de scroll */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
          <p className="text-center text-[10px] font-cinzel uppercase tracking-widest text-gold/25">
            {t("scrollHint")}
          </p>
        </div>
      </div>

      {/* ─── Panel lateral ─── */}
      <div className="flex w-80 flex-col overflow-hidden border-s border-gold/10 bg-ink/90">
        {/* Cabecera del panel */}
        <div className="border-b border-gold/10 p-4">
          <p className="hebrew text-center text-3xl text-gold" style={{ filter: "drop-shadow(0 0 12px #c9a43e66)" }}>
            עֵץ חַיִּים
          </p>
          <p className="mt-1 text-center font-cinzel text-xs uppercase tracking-widest text-gold/50">{t("title")}</p>
        </div>

        {/* Contenido del panel */}
        <div className="flex-1 overflow-y-auto p-4">
          {!selected && !heijalot && (
            <div className="space-y-3 text-sm text-muted/80">
              <p className="font-cinzel text-xs uppercase tracking-widest text-gold/50 mb-3">{t("roadmapTitle")}</p>
              {Object.entries(ROADMAP_LEVELS).map(([lvl, title]) => (
                <div key={lvl} className="flex gap-2">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-gold/30 font-cinzel text-[9px] text-gold/60">
                    {lvl}
                  </span>
                  <span className="text-xs leading-relaxed">{title}</span>
                </div>
              ))}
              <p className="mt-4 text-[11px] leading-relaxed text-muted/60 italic">
                {t("fractalNote")}
              </p>
            </div>
          )}

          {selected && showStudy && (
            <StudyPanel sefiraId={selected} locale={locale} t={t} />
          )}

          {depth.length >= 2 && (
            <div className="mt-4 border-t border-gold/10 pt-4">
              <p className="hebrew mb-2 text-center text-base text-gold">הֵיכָלוֹת</p>
              {heijalotLoading && <p className="animate-pulse text-xs text-muted text-center">{t("loadingHeijalot")}</p>}
              {heijalot && (
                <div className="study-prose text-xs">
                  {heijalot.split(/\n+/).map((line, i) => {
                    const h = line.match(/^\*\*(.+?)\*\*/);
                    if (h) return <h4 key={i} className="mt-3 font-cinzel text-gold" style={{ fontSize: "11px" }}>{h[1]}</h4>;
                    return line.trim() ? <p key={i} className="mt-1 leading-relaxed text-muted/80" style={{ fontSize: "10px" }}>{line.replace(/\*\*/g, "")}</p> : null;
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botón Entrar */}
        {selectedSefira && (
          <div className="border-t border-gold/10 p-3">
            <button
              onClick={handleEnter}
              className="w-full rounded-full border border-gold/50 py-2 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold/10"
              style={{ borderColor: selectedSefira.glow + "80", color: selectedSefira.glow }}
            >
              {t("enter")} — {selectedSefira.he} →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
