"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

const Canvas = dynamic(() => import("@react-three/fiber").then(m => m.Canvas), { ssr: false });
const Scene = dynamic(() => import("@/components/animacion/Scene358"), { ssr: false });

// ── Timeline: 22 segundos ─────────────────────────────────────────────────────
// 0-2:   Desierto + estrellas
// 2-5:   Piedra aparece y pulsa
// 5-7:   Se quiebra → flash → explosión
// 7-9:   Mitades se separan → dos hazes emergen
// 9-13:  Letras vuelan → 358 aparece
// 13-16: Silueta serpiente (izq) y humano (der)
// 16-19: Escena en plenitud
// 19-22: Pregunta final

function ss(a: number, b: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// Letras individuales volando dentro del haz
function FloatingLetters({ side, letters, t }: {
  side: "left" | "right"; letters: string[]; t: number;
}) {
  const startT = 9.0;
  const op = ss(startT, startT + 2, t) * (1 - ss(19, 20, t));
  const x = side === "left" ? "calc(50% - 180px)" : "calc(50% + 105px)";
  const color = side === "left" ? "#e08020" : "#f0e050";

  if (op < 0.01) return null;

  return (
    <div style={{ position: "absolute", left: x, bottom: "18%", opacity: op,
      display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
      transition: "opacity 0.5s" }}>
      {letters.map((l, i) => (
        <span key={i} style={{
          fontFamily: "var(--font-hebrew, serif)",
          fontSize: "clamp(28px, 5vw, 42px)",
          color,
          filter: `drop-shadow(0 0 8px ${color})`,
          opacity: ss(startT + i * 0.3, startT + i * 0.3 + 1, t),
          transform: `translateY(${(1 - ss(startT + i * 0.3, startT + i * 0.3 + 1.5, t)) * 20}px)`,
          transition: "transform 0.4s, opacity 0.4s",
          display: "block",
          lineHeight: 1.1,
        }}>{l}</span>
      ))}
    </div>
  );
}

export default function Animacion358() {
  const locale = useLocale();
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const DURATION = 22;

  const startAnimation = () => {
    setPlaying(true);
    setDone(false);
    setTime(0);
    startRef.current = performance.now();

    const tick = () => {
      const elapsed = (performance.now() - startRef.current) / 1000;
      setTime(elapsed);
      if (elapsed < DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTime(DURATION);
        setDone(true);
        setPlaying(false);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const t = time;

  // Mashíaj: מָשִׁיחַ → letras individuales RTL
  const mashiajLetters = ["מ", "ָ", "ש", "ִׁ", "י", "ַח"].filter(l => l.trim());
  const najashLetters  = ["נ", "ָ", "ח", "ָ", "ש"].filter(l => l.trim());

  // Mostrar 358
  const show358 = ss(11, 12.5, t) * (1 - ss(19, 20, t));

  // Labels de palabras
  const showLabels = ss(9.5, 11, t) * (1 - ss(18.5, 19.5, t));

  // Pregunta final
  const showQuestion = ss(19, 20.5, t);

  return (
    <div style={{
      width: "100vw", height: "100vh",
      background: "#040306",
      position: "relative", overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "sans-serif",
    }}>

      {/* Canvas Three.js */}
      <div style={{ position: "absolute", inset: 0 }}>
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 1.5, 10], fov: 55 }}
            gl={{ antialias: true }}
            style={{ width: "100%", height: "100%" }}>
            <Scene time={t} />
          </Canvas>
        </Suspense>
      </div>

      {/* ── Overlays HTML ─────────────────────────────────────────────────── */}

      {/* Etiquetas de las palabras */}
      {showLabels > 0.01 && (
        <>
          <div style={{
            position: "absolute", left: "calc(50% - 200px)", bottom: "28%",
            opacity: showLabels, transition: "opacity 0.8s",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "var(--font-hebrew, serif)", fontSize: "clamp(36px, 6vw, 52px)",
              color: "#e08020", filter: "drop-shadow(0 0 12px #e08020)",
              fontWeight: 700, lineHeight: 1, margin: 0,
            }}>נָחָשׁ</p>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px",
              letterSpacing: "4px", color: "rgba(224,128,32,0.6)",
              marginTop: "6px", textTransform: "uppercase" }}>NAJASH</p>
          </div>

          <div style={{
            position: "absolute", right: "calc(50% - 200px)", bottom: "28%",
            opacity: showLabels, transition: "opacity 0.8s",
            textAlign: "center",
          }}>
            <p style={{
              fontFamily: "var(--font-hebrew, serif)", fontSize: "clamp(36px, 6vw, 52px)",
              color: "#f0e050", filter: "drop-shadow(0 0 12px #f0e050)",
              fontWeight: 700, lineHeight: 1, margin: 0,
            }}>מָשִׁיחַ</p>
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "11px",
              letterSpacing: "4px", color: "rgba(240,224,80,0.6)",
              marginTop: "6px", textTransform: "uppercase" }}>MASHÍAJ</p>
          </div>
        </>
      )}

      {/* Número 358 */}
      {show358 > 0.01 && (
        <div style={{
          position: "absolute", top: "12%", left: "50%",
          transform: `translateX(-50%) scale(${0.7 + show358 * 0.3})`,
          opacity: show358, transition: "opacity 0.6s",
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(64px, 14vw, 110px)",
            fontWeight: 900,
            background: "linear-gradient(180deg, #fff8d0 0%, #f0d060 40%, #c9a43e 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(201,164,62,0.7))",
            lineHeight: 1, margin: 0,
          }}>358</p>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            justifyContent: "center", marginTop: "6px",
            opacity: ss(12, 13.5, t),
          }}>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,164,62,0.5))" }} />
            <p style={{ fontFamily: "'Cinzel', serif", fontSize: "10px",
              letterSpacing: "3px", color: "rgba(201,164,62,0.55)",
              textTransform: "uppercase", margin: 0 }}>גִּימַטְרִיָּה</p>
            <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(201,164,62,0.5), transparent)" }} />
          </div>
        </div>
      )}

      {/* Pregunta final */}
      {showQuestion > 0.01 && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: `rgba(4,3,6,${showQuestion * 0.88})`,
          opacity: showQuestion, transition: "opacity 0.5s",
          textAlign: "center", padding: "0 40px",
        }}>
          <p style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 700,
            color: "#f0d060",
            filter: "drop-shadow(0 0 12px rgba(201,164,62,0.5))",
            lineHeight: 1.5, margin: 0, maxWidth: "600px",
          }}>
            {locale === "fa"
              ? "چگونه می‌توان تشخیص داد کدام کدام است؟"
              : "¿Cómo podemos discernir cuál es cuál?"}
          </p>
          <p style={{
            marginTop: "20px",
            fontFamily: "var(--font-hebrew, serif)",
            fontSize: "clamp(14px, 2.5vw, 18px)",
            color: "rgba(201,164,62,0.5)",
            letterSpacing: "2px",
          }}>גִּימַטְרִיָּה — 358</p>
          <p style={{
            marginTop: "28px",
            fontFamily: "'Cinzel', serif",
            fontSize: "11px",
            letterSpacing: "4px",
            color: "rgba(201,164,62,0.35)",
            textTransform: "uppercase",
          }}>jashmal.org/misterio/358</p>
        </div>
      )}

      {/* ── Pantalla de inicio ────────────────────────────────────────────── */}
      {!playing && !done && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "rgba(4,3,6,0.92)",
          textAlign: "center", padding: "0 40px",
        }}>
          <p style={{
            fontFamily: "var(--font-hebrew, serif)", fontSize: "42px",
            color: "#c9a43e", filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))",
            marginBottom: "12px",
          }}>חַשְׁמַל</p>
          <p style={{ fontFamily: "'Cinzel', serif", fontSize: "13px",
            letterSpacing: "4px", color: "rgba(201,164,62,0.5)",
            textTransform: "uppercase", marginBottom: "40px" }}>
            {locale === "fa" ? "انیمیشن ۲۲ ثانیه‌ای" : "Animación 22 segundos"}
          </p>
          <button
            onClick={startAnimation}
            style={{
              fontFamily: "'Cinzel', serif", fontSize: "13px",
              letterSpacing: "5px", textTransform: "uppercase",
              color: "#c9a43e", background: "rgba(201,164,62,0.08)",
              border: "1px solid rgba(201,164,62,0.4)",
              borderRadius: "40px", padding: "14px 40px",
              cursor: "pointer", transition: "all 0.3s",
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.background = "rgba(201,164,62,0.18)"; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.background = "rgba(201,164,62,0.08)"; }}
          >
            {locale === "fa" ? "▶ شروع" : "▶ Iniciar"}
          </button>
          <p style={{ marginTop: "20px", fontFamily: "'Cinzel', serif",
            fontSize: "10px", letterSpacing: "2px",
            color: "rgba(201,164,62,0.3)", textTransform: "uppercase" }}>
            {locale === "fa"
              ? "برای ضبط: Cmd+Shift+5 در مک"
              : "Para grabar: Cmd+Shift+5 en Mac"}
          </p>
        </div>
      )}

      {/* Reiniciar */}
      {done && !playing && showQuestion < 0.1 && (
        <button
          onClick={startAnimation}
          style={{
            position: "absolute", bottom: "30px", left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Cinzel', serif", fontSize: "11px",
            letterSpacing: "4px", textTransform: "uppercase",
            color: "rgba(201,164,62,0.6)",
            background: "none", border: "1px solid rgba(201,164,62,0.3)",
            borderRadius: "30px", padding: "10px 28px", cursor: "pointer",
          }}
        >
          {locale === "fa" ? "↺ دوباره" : "↺ Repetir"}
        </button>
      )}

      {/* Barra de progreso */}
      {playing && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px",
          background: "rgba(201,164,62,0.15)" }}>
          <div style={{ height: "100%", width: `${(t / DURATION) * 100}%`,
            background: "linear-gradient(90deg, #c9a43e88, #c9a43e)",
            transition: "width 0.1s linear" }} />
        </div>
      )}
    </div>
  );
}
