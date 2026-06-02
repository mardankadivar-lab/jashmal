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

      const driverObj = driver({
        popoverClass: "jashmal-tour",
        showProgress: true,
        animate: true,
        smoothScroll: true,
        overlayColor: "rgba(5,5,10,0.88)",
        nextBtnText: t("next"),
        prevBtnText: t("prev"),
        doneBtnText: t("done"),
        progressText: "{{current}} / {{total}}",
        onDestroyed: () => {
          localStorage.setItem(TOUR_KEY, "1");
        },
        steps: [
          {
            popover: {
              title: t("step1.title"),
              description: t("step1.desc"),
            },
          },
          {
            element: "#tour-search",
            popover: {
              title: t("step2.title"),
              description: t("step2.desc"),
              side: "bottom",
              align: "start",
            },
          },
          {
            element: "#tour-categories",
            popover: {
              title: t("step3.title"),
              description: t("step3.desc"),
              side: "bottom",
              align: "start",
            },
          },
          {
            element: "#tour-analysis",
            popover: {
              title: t("step4.title"),
              description: t("step4.desc"),
              side: "left",
              align: "start",
            },
          },
          {
            element: "#tour-tutor",
            popover: {
              title: t("step5.title"),
              description: t("step5.desc"),
              side: "left",
              align: "end",
            },
          },
          {
            element: "#tour-language",
            popover: {
              title: t("step6.title"),
              description: t("step6.desc"),
              side: "bottom",
              align: "end",
            },
          },
        ],
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
