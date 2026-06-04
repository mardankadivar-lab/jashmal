"use client";

import { useEffect, useRef } from "react";

// "Nitzotzot" — chispas/partículas doradas en el hero (Canvas API).
// Respeta prefers-reduced-motion.

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  da: number;
}

export default function Nitzotzot() {
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

    function resize() {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(120, Math.floor((width * height) / 9000));
      sparks = Array.from({ length: count }, () => spawn());
    }

    function spawn(): Spark {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.1 - Math.random() * 0.25,
        r: 0.5 + Math.random() * 1.6,
        a: Math.random() * 0.6,
        da: (Math.random() - 0.5) * 0.012,
      };
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      for (const s of sparks) {
        s.x += s.vx;
        s.y += s.vy;
        s.a += s.da;
        if (s.a <= 0 || s.a > 0.7) s.da = -s.da;
        if (s.y < -5) {
          s.y = height + 5;
          s.x = Math.random() * width;
        }
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(201, 164, 62, ${Math.max(0, s.a)})`;
        ctx!.shadowBlur = 8;
        ctx!.shadowColor = "rgba(201, 164, 62, 0.7)";
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height);
      for (const s of sparks) {
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(201, 164, 62, ${s.a})`;
        ctx!.fill();
      }
    }

    resize();
    if (reduced) {
      drawStatic();
    } else {
      draw();
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
      className="nitzotzot pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
