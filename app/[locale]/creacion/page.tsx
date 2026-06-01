"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { COSMOLOGY_STAGES } from "@/lib/cosmologyStages";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const CosmologyScene = dynamic(() => import("@/components/cosmologia/CosmologyJourney"), { ssr: false });

const TOTAL = COSMOLOGY_STAGES.length; // 14

export default function CreacionPage() {
  const locale = useLocale();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollTop = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setScrollProgress(progress);
      setActiveStage(Math.min(Math.floor(progress * TOTAL), TOTAL - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const stage = COSMOLOGY_STAGES[activeStage];

  // Color de fondo interpolado
  const bgColor = stage.bgColor;

  return (
    <div className="always-dark fixed inset-0 z-50 overflow-hidden" style={{ background: bgColor, transition: "background 1.2s ease" }}>
      {/* Canvas Three.js — fijo, ocupa toda la pantalla */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 14], fov: 52 }} gl={{ antialias: true }} style={{ width: "100%", height: "100%" }}>
            <CosmologyScene scrollProgress={scrollProgress} />
          </Canvas>
        </Suspense>
      </div>

      {/* Capa scrolleable — el scroll mueve la animación */}
      <div
        ref={scrollRef}
        className="absolute inset-0 z-10 overflow-y-scroll"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Espacio total: 14 pantallas */}
        <div style={{ height: `${TOTAL * 100}vh` }} />
      </div>

      {/* ── Overlay de texto — sticky, centrado ──────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6">

        {/* Nombre de la etapa */}
        <div className="text-center" style={{ animation: "fadeIn 0.8s ease" }} key={stage.id}>
          <p className="mb-1 font-cinzel text-[11px] uppercase tracking-[0.35em] text-gold/40">
            {activeStage + 1} / {TOTAL}
          </p>

          <h1
            className="hebrew mb-2 leading-none"
            style={{
              fontSize: "clamp(52px, 10vw, 88px)",
              color: stage.id === "ein-sof" ? "#08060f" : stage.id === "tikun" ? "#c9a43e" : "#c9a43e",
              textShadow: stage.id === "ein-sof" ? "none" : `0 0 30px ${stage.particleColor}88, 0 0 60px ${stage.particleColor}44`,
              filter: stage.id === "ein-sof" ? "none" : `drop-shadow(0 0 12px ${stage.particleColor}66)`,
            }}
          >
            {stage.nameHe}
          </h1>

          <h2
            className="font-cinzel text-base uppercase tracking-widest"
            style={{
              color: stage.id === "ein-sof" ? "#1a140a" : "#c9a43e",
              opacity: 0.8,
              fontSize: "clamp(11px, 2vw, 14px)",
            }}
          >
            {locale === "fa" ? stage.nameFa : stage.nameEs}
          </h2>
        </div>

        {/* Cita */}
        <p
          className="mt-6 max-w-xl text-center text-sm leading-relaxed"
          key={stage.id + "-quote"}
          style={{
            color: stage.id === "ein-sof" ? "#3a2e1a" : "#c9a43e",
            opacity: 0.75,
            animation: "fadeIn 1.2s ease",
            direction: locale === "fa" ? "rtl" : "ltr",
            fontSize: "clamp(12px, 1.8vw, 15px)",
          }}
          dir={locale === "fa" ? "rtl" : "ltr"}
        >
          {locale === "fa" ? stage.quoteFa : stage.quoteEs}
        </p>

        {/* Fuente / cita hebrea */}
        {stage.sourceHe && (
          <p
            className="hebrew mt-4 text-center text-sm italic"
            style={{ color: stage.id === "ein-sof" ? "#5a4a2a" : "#c9a43e88", fontSize: "13px" }}
          >
            {stage.sourceHe}
          </p>
        )}
        {stage.sourceEs && (
          <p className="mt-1 font-cinzel text-[10px] uppercase tracking-widest text-gold/35">
            {stage.sourceEs}
          </p>
        )}

        {/* Botón estudio profundo (etapas clave) */}
        {stage.studyRef && (activeStage === 0 || activeStage === 7 || activeStage === 10 || activeStage === 13) && (
          <button
            onClick={() => {
              const params = new URLSearchParams({ ref: stage.studyRef!, context: "kabbalah" });
              router.push(`/estudio?${params.toString()}`);
            }}
            className="pointer-events-auto mt-8 rounded-full border border-gold/40 bg-gold/[0.08] px-6 py-2.5 font-cinzel text-xs uppercase tracking-widest text-gold/80 transition-all hover:border-gold hover:bg-gold/15 hover:text-gold backdrop-blur-sm"
          >
            {locale === "fa" ? "مطالعهٔ عمیق‌تر" : "Estudiar en profundidad"} →
          </button>
        )}
      </div>

      {/* ── Indicadores de etapa (puntos laterales) ──────────────── */}
      <div className="pointer-events-none absolute right-4 top-1/2 z-30 -translate-y-1/2 flex flex-col gap-1.5">
        {COSMOLOGY_STAGES.map((s, i) => (
          <div
            key={s.id}
            title={s.nameEs}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === activeStage ? 8 : 4,
              height: i === activeStage ? 8 : 4,
              background: i === activeStage ? s.particleColor : "#c9a43e44",
              boxShadow: i === activeStage ? `0 0 8px ${s.particleColor}` : "none",
            }}
          />
        ))}
      </div>

      {/* ── Barra de progreso inferior ────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-0.5 w-full" style={{ background: "#c9a43e22" }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%`, background: `linear-gradient(90deg, ${stage.particleColor}88, ${stage.particleColor})` }}
        />
      </div>

      {/* ── Controles superiores ──────────────────────────────────── */}
      <div className="pointer-events-auto absolute start-4 top-4 z-40 flex items-center gap-3">
        <button
          onClick={() => router.push("/estudio")}
          className="rounded-full border border-gold/20 bg-black/40 px-3 py-1.5 font-cinzel text-xs text-gold/60 backdrop-blur-md transition-colors hover:text-gold"
        >
          ← {locale === "fa" ? "بازگشت" : "Volver"}
        </button>

        {/* Botón al Árbol de la Vida (visible desde Atzilut en adelante) */}
        {activeStage >= 10 && (
          <button
            onClick={() => router.push("/arbol")}
            className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-cinzel text-xs text-gold backdrop-blur-md transition-all hover:border-gold hover:bg-gold/20"
            style={{ animation: "fadeIn 0.6s ease" }}
          >
            {locale === "fa" ? "درخت حیات ←" : "Árbol de la Vida →"}
          </button>
        )}
      </div>

      {/* ── Hint de scroll (visible solo al inicio) ──────────────── */}
      {activeStage === 0 && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: "fadeIn 2s ease" }}>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em]" style={{ color: "#3a2e1a" }}>
            {locale === "fa" ? "اسکرول کنید" : "Desliza para comenzar el viaje"}
          </p>
          <div style={{ width: 1, height: 24, background: "linear-gradient(to bottom, #3a2e1a, transparent)" }} />
        </div>
      )}

      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
