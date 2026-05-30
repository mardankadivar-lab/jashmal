"use client";

import { useEffect, useRef } from "react";

// "Aliyat HaNitzotzot" — la elevación de las chispas.
// Animación de carga que dramatiza el tikún luriánico mientras el estudio se genera:
//   1. Las chispas emergen de la oscuridad de las kelipot (abajo, atrapadas).
//   2. Ascienden mundo por mundo: Asiyá → Yetzirá → Beriá → Atzilut.
//   3. Forman interconexiones (tikún / construcción de los partzufim).
//   4. Yijud: todas convergen al centro.
//   5. Estallido de luz en medio de la oscuridad. Y el ciclo se reanuda.
//
// El ciclo se repite (cada vuelta es un tikún) hasta que el estudio llega.

interface Spark {
  // posición base en el eje X (0..1) y fase vertical
  bx: number;
  // altura de ascenso 0 (kelipot, abajo) .. 1 (Atzilut, arriba)
  rise: number;
  riseSpeed: number;
  jitter: number;
  phase: number;
  r: number;
  // destino en el yijud
  born: number; // 0..1, momento del ciclo en que despierta
}

const WORLDS = [
  { he: "עֲשִׂיָּה", y: 0.86 }, // Asiyá (acción/material) — abajo
  { he: "יְצִירָה", y: 0.64 }, // Yetzirá
  { he: "בְּרִיאָה", y: 0.42 }, // Beriá
  { he: "אֲצִילוּת", y: 0.2 }, // Atzilut (emanación) — arriba
];

const GOLD = "201, 164, 62";
const CYCLE_MS = 9000; // duración de una vuelta completa del tikún

export default function AliyatNitzotzot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let sparks: Spark[] = [];
    let raf = 0;
    let start = 0;

    function rand(seed: number) {
      // pseudo-aleatorio estable por índice (sin Math.random para SSR-safety)
      const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
      return x - Math.floor(x);
    }

    function build() {
      const count = Math.min(80, Math.max(36, Math.floor(width / 14)));
      sparks = Array.from({ length: count }, (_, i) => ({
        bx: 0.08 + rand(i) * 0.84,
        rise: 0,
        riseSpeed: 0.6 + rand(i * 3.3) * 0.8,
        jitter: 6 + rand(i * 1.7) * 14,
        phase: rand(i * 5.1) * Math.PI * 2,
        r: 0.8 + rand(i * 2.9) * 1.8,
        born: rand(i * 9.4) * 0.35,
      }));
    }

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    // curva de aceleración suave
    const ease = (t: number) => t * t * (3 - 2 * t);

    function draw(now: number) {
      if (!start) start = now;
      const elapsed = (now - start) % CYCLE_MS;
      const t = elapsed / CYCLE_MS; // 0..1 dentro del ciclo

      // Fondo: oscuridad con un leve gradiente que insinúa los mundos
      ctx!.clearRect(0, 0, width, height);

      // niebla de kelipot abajo
      const fog = ctx!.createLinearGradient(0, 0, 0, height);
      fog.addColorStop(0, "rgba(5,5,10,0)");
      fog.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx!.fillStyle = fog;
      ctx!.fillRect(0, 0, width, height);

      // líneas tenues de los cuatro mundos + etiquetas hebreas
      ctx!.textAlign = "left";
      ctx!.font = "14px Georgia, serif";
      for (const w of WORLDS) {
        const y = w.y * height;
        ctx!.strokeStyle = `rgba(${GOLD}, 0.07)`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(width * 0.04, y);
        ctx!.lineTo(width * 0.96, y);
        ctx!.stroke();
        ctx!.fillStyle = `rgba(${GOLD}, 0.16)`;
        ctx!.fillText(w.he, width * 0.04, y - 6);
      }

      // momentos del ciclo
      const flashT = 0.9; // inicio del estallido
      const yichudT = 0.7; // inicio de la convergencia

      const cx = width * 0.5;
      const cy = WORLDS[3].y * height; // el yijud ocurre en Atzilut

      // posiciones (para dibujar el tikún necesitamos las coords actuales)
      const pts: { x: number; y: number; bright: number }[] = [];

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        // progreso de ascenso individual (despierta en s.born)
        const local = Math.max(0, Math.min(1, (t - s.born) / (yichudT - s.born)));
        const rise = ease(local);

        // X con jitter (vibración de la chispa atrapada que se libera)
        const baseX = s.bx * width;
        const jx = Math.sin(now / 600 + s.phase) * s.jitter * (1 - rise * 0.7);

        // Y: de Asiyá (abajo) a Atzilut (arriba)
        const yBottom = WORLDS[0].y * height + 18;
        const yTop = WORLDS[3].y * height;
        let x = baseX + jx;
        let y = yBottom + (yTop - yBottom) * rise;

        // brillo crece con el ascenso
        let bright = 0.15 + rise * 0.7;

        // YIJUD: convergencia al centro
        if (t > yichudT) {
          const k = ease(Math.min(1, (t - yichudT) / (flashT - yichudT)));
          x = x + (cx - x) * k;
          y = y + (cy - y) * k;
          bright = 0.85;
        }

        pts.push({ x, y, bright });
      }

      // TIKÚN: interconexiones entre chispas ya elevadas (líneas finas)
      if (t > 0.4 && t < flashT) {
        const linkStrength = Math.min(1, (t - 0.4) / 0.3) * (t > yichudT ? 1 : 0.6);
        ctx!.lineWidth = 0.6;
        for (let i = 0; i < pts.length; i++) {
          for (let j = i + 1; j < pts.length; j++) {
            const a = pts[i];
            const b = pts[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            const maxD = 95;
            if (d2 < maxD * maxD) {
              const alpha = (1 - Math.sqrt(d2) / maxD) * 0.18 * linkStrength;
              ctx!.strokeStyle = `rgba(${GOLD}, ${alpha})`;
              ctx!.beginPath();
              ctx!.moveTo(a.x, a.y);
              ctx!.lineTo(b.x, b.y);
              ctx!.stroke();
            }
          }
        }
      }

      // las chispas
      for (const p of pts) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${GOLD}, ${p.bright})`;
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = `rgba(${GOLD}, 0.8)`;
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      // ESTALLIDO DE LUZ en el yijud
      if (t > flashT) {
        const f = (t - flashT) / (1 - flashT); // 0..1
        const radius = ease(f) * Math.max(width, height) * 0.7;
        const opacity = (1 - f) * 0.9;
        const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0, `rgba(255, 244, 214, ${opacity})`);
        g.addColorStop(0.4, `rgba(${GOLD}, ${opacity * 0.6})`);
        g.addColorStop(1, "rgba(5,5,10,0)");
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, width, height);

        // núcleo brillante
        ctx!.beginPath();
        ctx!.arc(cx, cy, 4 + ease(f) * 6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 250, 235, ${opacity})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      const g = ctx!.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.min(width, height) / 2
      );
      g.addColorStop(0, `rgba(${GOLD}, 0.25)`);
      g.addColorStop(1, "rgba(5,5,10,0)");
      ctx!.fillStyle = g;
      ctx!.fillRect(0, 0, width, height);
    }

    resize();
    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-64 w-full rounded-lg"
      aria-hidden="true"
    />
  );
}
