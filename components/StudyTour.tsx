"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import "driver.js/dist/driver.css";

const TOUR_KEY = "jashmal_tour_done";

export default function StudyTour() {
  const t = useTranslations("tour");
  const locale = useLocale();

  async function startTour() {
    try {
      const { driver } = await import("driver.js");

      // Definimos todos los pasos. Los que apuntan a un elemento solo se incluyen
      // si ese elemento existe en la página en este momento — así el tour NUNCA se
      // corta ni queda en blanco por un objetivo que aún no se ha renderizado.
      const allSteps = [
        {
          // Paso de bienvenida: sin elemento, centrado en pantalla.
          popover: { title: t("step1.title"), description: t.raw("step1.desc") },
        },
        {
          element: "#tour-search",
          popover: {
            title: t("step2.title"),
            description: t.raw("step2.desc"),
            side: "bottom" as const,
            align: "start" as const,
          },
        },
        {
          element: "#tour-categories",
          popover: {
            title: t("step3.title"),
            description: t.raw("step3.desc"),
            side: "bottom" as const,
            align: "start" as const,
          },
        },
        {
          element: "#tour-analysis",
          popover: {
            title: t("step4.title"),
            description: t.raw("step4.desc"),
            side: "left" as const,
            align: "start" as const,
          },
        },
        {
          element: "#tour-tutor",
          popover: {
            title: t("step5.title"),
            description: t.raw("step5.desc"),
            side: "left" as const,
            align: "end" as const,
          },
        },
        {
          element: "#tour-language",
          popover: {
            title: t("step6.title"),
            description: t.raw("step6.desc"),
            side: "bottom" as const,
            align: "end" as const,
          },
        },
        {
          // Paso de cierre: sin elemento, centrado. Invita a empezar a estudiar.
          popover: { title: t("step7.title"), description: t.raw("step7.desc") },
        },
      ];

      // Filtramos los pasos cuyo elemento aún no está en el DOM, para que el
      // recorrido sea siempre completo y coherente (sin huecos ni cortes).
      const steps = allSteps.filter(
        (s) => !("element" in s) || document.querySelector(s.element as string)
      );

      const driverObj = driver({
        popoverClass: "jashmal-tour",
        showProgress: true,
        animate: true,
        smoothScroll: true,
        allowClose: true,
        overlayColor: "rgba(5,5,10,0.88)",
        nextBtnText: t("next"),
        prevBtnText: t("prev"),
        doneBtnText: t("done"),
        progressText: "{{current}} / {{total}}",
        onDestroyed: () => {
          localStorage.setItem(TOUR_KEY, "1");
        },
        steps,
      });

      driverObj.drive();
    } catch (err) {
      console.error("[StudyTour] Error al iniciar el tour:", err);
    }
  }

  useEffect(() => {
    const done = localStorage.getItem(TOUR_KEY);
    if (done) return;

    // cancelled previene que el tour inicie si el componente se desmonta antes
    // (React StrictMode desmonta/remonta en desarrollo — el cleanup borra el timer)
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) startTour();
    }, 1000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function relaunch() {
    localStorage.removeItem(TOUR_KEY);
    startTour();
  }

  return (
    <button
      onClick={relaunch}
      title={t("relaunch")}
      aria-label={t("relaunch")}
      className={`fixed bottom-6 z-[9999] flex h-9 w-9 items-center justify-center rounded-full border border-gold/50 bg-ink font-cinzel text-sm text-gold shadow-[0_0_12px_rgba(201,164,62,0.15)] backdrop-blur-sm transition-all hover:border-gold hover:bg-gold/10 ${locale === "fa" ? "right-6" : "left-6"}`}
    >
      ?
    </button>
  );
}
