"use client";

import { useEffect, useState } from "react";

// Cuenta regresiva hasta el 22 de septiembre 2026 00:00:00 hora de Israel (UTC+3).
const TARGET = new Date("2026-09-22T00:00:00+03:00").getTime();

function getTimeLeft() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function CohortCountdown() {
  const [time, setTime] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-gold/20 bg-gold/[0.04] px-6 py-8 text-center">
      {/* encabezado */}
      <p className="font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold/60">
        COHORTE 1 · ROSH HASHANÁ
      </p>
      <p className="mt-1 hebrew text-lg text-gold/80" dir="rtl">
        כ״ב אֱלוּל תשפ״ו
      </p>

      {/* dígitos */}
      <div className="mt-6 flex items-end justify-center gap-4 sm:gap-8">
        {[
          { value: time.days, label: "días" },
          { value: time.hours, label: "horas" },
          { value: time.minutes, label: "min" },
          { value: time.seconds, label: "seg" },
        ].map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="font-cinzel text-4xl tabular-nums text-gold sm:text-5xl">
              {pad(value)}
            </span>
            <span className="font-cinzel text-[10px] uppercase tracking-widest text-parchment/50">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* separadores decorativos entre bloques */}
      <p className="mt-6 text-sm text-parchment/55">
        El Año 1 de la Academia abre el 22 de septiembre.
      </p>
    </div>
  );
}
