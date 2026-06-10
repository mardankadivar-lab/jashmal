"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { COSMOLOGY_STAGES } from "@/lib/study/cosmologyStages";
import { COSMOLOGY_STUDY } from "@/lib/study/cosmologyStudy";

const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const CosmologyScene = dynamic(() => import("@/components/cosmologia/CosmologyJourney"), { ssr: false });

const TOTAL = COSMOLOGY_STAGES.length; // 14

export default function CreacionPage() {
  const locale = useLocale();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  // Loader ceremonial: cubre el pop-in del canvas 3D al refrescar (anti-glitch).
  const [ready, setReady] = useState(false);
  // Panel "Estudiar en profundidad": guarda la etapa capturada al abrir (null = cerrado).
  const [studyStage, setStudyStage] = useState<(typeof COSMOLOGY_STAGES)[number] | null>(null);

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

    // Lenis: scroll suave premium (estilo Apple) sobre el contenedor del viaje.
    // El descenso por la Creación se siente continuo, con inercia, no a saltos.
    const lenis = new Lenis({
      wrapper: el,
      content: el.firstElementChild as HTMLElement,
      lerp: 0.055,
      wheelMultiplier: 0.85,
      smoothWheel: true,
      syncTouch: true,
    });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Fallback: si el canvas 3D no avisa (onCreated) en 2.5s, retira el loader igual.
    const readyFallback = setTimeout(() => setReady(true), 2500);

    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(readyFallback);
      lenis.destroy();
    };
  }, []);

  const stage = COSMOLOGY_STAGES[activeStage];

  // Color de fondo interpolado
  const bgColor = stage.bgColor;

  // ── Modelo de legibilidad por etapa ───────────────────────────────
  // DOS etapas tienen fondo CLARO/blanco (Ein Sof y Tikún). Ahí el
  // dorado puro NO se lee. En esas etapas usamos texto OSCURO + halo
  // claro; en las etapas oscuras usamos crema/dorado + halo oscuro
  // fuerte. Así el texto se lee SIEMPRE, sin importar qué pase detrás
  // en la animación 3D (partículas brillantes, destellos, etc.).
  const isLight = stage.id === "ein-sof" || stage.id === "tikun";
  const titleColor = isLight ? "#0b0712" : "#f6e8b6"; // título grande
  const subColor = isLight ? "#1c1408" : "#f1e3b2"; // nombre es/fa
  const bodyColor = isLight ? "#241a09" : "#f0e7d0"; // cita (cuerpo)
  const dimColor = isLight ? "#5a451f" : "#d9c896"; // fuentes / nº
  // Halo del color CONTRARIO: despega la letra de cualquier fondo.
  const lightHalo =
    "0 1px 2px rgba(255,255,255,0.95), 0 0 16px rgba(255,251,240,0.8), 0 2px 14px rgba(255,255,255,0.55)";
  const darkHalo =
    "0 2px 10px rgba(0,0,0,0.95), 0 0 26px rgba(0,0,0,0.75), 0 1px 3px rgba(0,0,0,0.98)";
  const textHalo = isLight ? lightHalo : darkHalo;

  // Transición CONTINUA entre escenas: el texto se desvanece cerca de los
  // bordes de cada etapa (su contenido cambia mientras está invisible), así
  // las escenas se funden como un solo descenso, sin "pop" abrupto.
  const stageProgress = Math.max(0, Math.min(1, scrollProgress * TOTAL - activeStage));
  const textOpacity =
    Math.min(1, stageProgress / 0.16) * Math.min(1, (1 - stageProgress) / 0.16);

  return (
    <div className="always-dark fixed inset-0 z-50 overflow-hidden" style={{ background: bgColor, transition: "background 1.2s ease" }}>
      {/* ── Loader ceremonial: cubre el pop-in del canvas 3D al refrescar; se desvanece
            lento (como un respiro del Ein Sof) cuando el 3D ya está listo. ── */}
      <div
        className={`pointer-events-none absolute inset-0 z-[60] flex items-center justify-center bg-[#05050a] transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
        aria-hidden="true"
      >
        <div
          className="h-28 w-28 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,164,62,0.45), transparent 70%)", animation: "creacionBreath 2.4s ease-in-out infinite" }}
        />
      </div>

      {/* Canvas Three.js — fijo, ocupa toda la pantalla */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 14], fov: 52 }} gl={{ antialias: true }} style={{ width: "100%", height: "100%" }} onCreated={() => setReady(true)}>
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

      {/* ── Velo legibilidad ─────────────────────────────────────────
          Un degradado radial entre el 3D y el texto: las esferas,
          chispas y destellos del fondo nunca tapan la letra hebrea ni la
          cita. No bloquea el scroll (pointer-events-none). En las etapas
          de fondo CLARO (Ein Sof y Tikún) el texto es oscuro, así que ahí
          usamos un velo CLARO; en las oscuras, un velo OSCURO. */}
      <div
        className="pointer-events-none absolute inset-0 z-[15] transition-[background] duration-1000"
        style={{
          background: isLight
            ? "radial-gradient(ellipse 80% 74% at 50% 50%, rgba(255,253,245,0.8) 0%, rgba(255,253,245,0.52) 50%, transparent 82%)"
            : "radial-gradient(ellipse 76% 70% at 50% 50%, rgba(4,4,9,0.82) 0%, rgba(4,4,9,0.54) 48%, transparent 82%)",
        }}
      />

      {/* ── Overlay de texto — sticky, centrado ──────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 py-24 sm:py-16"
        style={{ opacity: textOpacity, transition: "opacity 0.1s linear" }}
      >

        {/* Nombre de la etapa */}
        <div className="text-center">
          <p
            className="mb-2 font-cinzel text-[12px] uppercase tracking-[0.35em] sm:text-[13px]"
            style={{ color: dimColor, textShadow: textHalo }}
          >
            {activeStage + 1} / {TOTAL}
          </p>

          <h1
            className="hebrew mb-3 leading-none"
            style={{
              fontSize: "clamp(50px, 11vw, 92px)",
              color: titleColor,
              textShadow: isLight
                ? textHalo
                : `${textHalo}, 0 0 32px ${stage.particleColor}66, 0 0 60px ${stage.particleColor}33`,
            }}
          >
            {stage.nameHe}
          </h1>

          <h2
            className="font-cinzel uppercase tracking-[0.18em]"
            style={{
              color: subColor,
              fontSize: "clamp(15px, 2.8vw, 21px)",
              textShadow: textHalo,
            }}
          >
            {locale === "fa" ? stage.nameFa : stage.nameEs}
          </h2>
        </div>

        {/* Cita */}
        <p
          className="mt-6 max-w-[34rem] text-center leading-relaxed sm:max-w-2xl"
          style={{
            color: bodyColor,
            direction: locale === "fa" ? "rtl" : "ltr",
            fontSize: "clamp(16px, 2.3vw, 20px)",
            textShadow: textHalo,
          }}
          dir={locale === "fa" ? "rtl" : "ltr"}
        >
          {locale === "fa" ? stage.quoteFa : stage.quoteEs}
        </p>

        {/* Fuente / cita hebrea */}
        {stage.sourceHe && (
          <p
            className="hebrew mt-4 text-center italic"
            style={{ color: dimColor, fontSize: "clamp(14px, 1.9vw, 17px)", textShadow: textHalo }}
          >
            {stage.sourceHe}
          </p>
        )}
        {stage.sourceEs && (
          <p
            className="mt-1.5 font-cinzel text-[12px] uppercase tracking-widest"
            style={{ color: dimColor, textShadow: textHalo }}
          >
            {stage.sourceEs}
          </p>
        )}

        {/* Botón estudio profundo: abre el panel PaRDeS de la etapa activa (todas tienen contenido) */}
        {COSMOLOGY_STUDY[stage.id] && (
          <button
            onClick={() => setStudyStage(stage)}
            className={`pointer-events-auto mt-8 rounded-full border px-6 py-2.5 font-cinzel text-sm uppercase tracking-widest backdrop-blur-sm transition-all ${
              isLight
                ? "border-[#0b0712]/45 bg-[#0b0712]/[0.06] text-[#0b0712] hover:border-[#0b0712] hover:bg-[#0b0712]/10"
                : "border-gold/50 bg-gold/[0.1] text-gold hover:border-gold hover:bg-gold/20"
            }`}
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
        {/* Volver a la página principal (inicio), igual que en /misterios */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 rounded-full border border-gold/20 bg-black/40 px-3 py-1.5 font-cinzel text-xs text-gold/70 backdrop-blur-md transition-colors hover:text-gold"
        >
          <span>{locale === "fa" ? "→" : "←"}</span>
          <span className="hebrew">חַשְׁמַל</span>
          <span>· Jashmal</span>
        </button>
        {/* Acceso directo al motor de estudio */}
        <button
          onClick={() => router.push("/estudio")}
          className="rounded-full border border-gold/20 bg-black/40 px-3 py-1.5 font-cinzel text-xs text-gold/60 backdrop-blur-md transition-colors hover:text-gold"
        >
          {locale === "fa" ? "مطالعه" : "Estudio"}
        </button>

        {/* Botón al Árbol de la Vida (visible desde Atzilut en adelante) */}
        {activeStage >= 10 && (
          <button
            onClick={() => router.push("/arbol")}
            className="rounded-full border border-gold/40 bg-black/45 px-3 py-1.5 font-cinzel text-xs text-gold backdrop-blur-md transition-all hover:border-gold hover:bg-gold/20"
            style={{ animation: "fadeIn 0.6s ease" }}
          >
            {locale === "fa" ? "درخت حیات ←" : "Árbol de la Vida →"}
          </button>
        )}
      </div>

      {/* ── Hint de scroll (visible solo al inicio) ──────────────── */}
      {activeStage === 0 && (
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-30 -translate-x-1/2 flex flex-col items-center gap-2" style={{ animation: "fadeIn 2s ease" }}>
          <p className="font-cinzel text-[12px] uppercase tracking-[0.3em]" style={{ color: "#2a2008" }}>
            {locale === "fa" ? "اسکرول کنید" : "Desliza para comenzar el viaje"}
          </p>
          <div style={{ width: 1, height: 24, background: "linear-gradient(to bottom, #2a2008, transparent)" }} />
        </div>
      )}

      {/* ── Panel "Estudiar en profundidad": PaRDeS de la etapa, sin salir del viaje.
            Bottom-sheet en mobile, modal centrado en desktop. ── */}
      {studyStage && (() => {
        const sd = COSMOLOGY_STUDY[studyStage.id];
        if (!sd) return null;
        const rows = [
          { he: "פְּשָׁט", name: "Pshat", txt: sd.pshat },
          { he: "סוֹד", name: "Sod", txt: sd.sod },
          { he: "חֲסִידוּת", name: "Jasidut", txt: sd.jasidut },
          { he: "מַעֲשֶׂה", name: locale === "fa" ? "کاربرد" : "Aplicación", txt: sd.aplicacion },
        ];
        return (
          <div className="pointer-events-auto fixed inset-0 z-[80] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setStudyStage(null)} />
            <div className="relative z-10 max-h-[86vh] w-full overflow-y-auto rounded-t-3xl border border-gold/25 bg-[#0a0712]/[0.97] p-6 backdrop-blur-xl sm:max-w-lg sm:rounded-3xl" style={{ boxShadow: "0 -10px 60px rgba(0,0,0,0.6)" }}>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="hebrew text-4xl leading-none text-gold" style={{ textShadow: "0 0 18px #c9a43e66" }}>{studyStage.nameHe}</p>
                  <p className="mt-1.5 font-cinzel text-sm uppercase tracking-[0.18em] text-parchment/85">{locale === "fa" ? studyStage.nameFa : studyStage.nameEs}</p>
                </div>
                <button onClick={() => setStudyStage(null)} aria-label="Cerrar" className="shrink-0 rounded-full border border-gold/30 px-3 py-1 font-cinzel text-sm text-gold/70 transition-colors hover:border-gold hover:text-gold">✕</button>
              </div>
              <p className="mb-4 font-cinzel text-[10px] uppercase tracking-widest text-gold/45">{sd.fuente}</p>
              <div className="space-y-3">
                {rows.map((r) => (
                  <div key={r.name} className="rounded-2xl border border-gold/15 bg-white/[0.02] p-4">
                    <p className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold/70">
                      <span className="hebrew me-2 text-base text-gold/80">{r.he}</span>{r.name}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-parchment/85" dir={locale === "fa" ? "rtl" : "ltr"}>{r.txt}</p>
                  </div>
                ))}
              </div>
              {studyStage.studyRef && (
                <button
                  onClick={() => router.push(`/estudio?ref=${encodeURIComponent(studyStage.studyRef!)}&context=kabbalah`)}
                  className="mt-5 w-full rounded-full border border-gold/40 bg-gold/10 px-6 py-3 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
                >
                  {locale === "fa" ? "مطالعهٔ کامل در موتور" : "Estudio completo en el motor"} →
                </button>
              )}
            </div>
          </div>
        );
      })()}

      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes creacionBreath { 0%, 100% { opacity: 0.35; transform: scale(0.9); } 50% { opacity: 0.85; transform: scale(1.1); } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
