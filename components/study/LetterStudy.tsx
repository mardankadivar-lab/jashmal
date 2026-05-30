"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import StudyResult from "./StudyResult";
import { requestStudy, StudyError } from "@/lib/studyClient";

export default function LetterStudy({ letter }: { letter: string }) {
  const locale = useLocale();
  const t = useTranslations("letters");
  const ts = useTranslations("study");

  const [study, setStudy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStudy(null);
    setError(null);
    requestStudy({ mode: "letter", locale, letter })
      .then((text) => {
        if (!cancelled) setStudy(text);
      })
      .catch((err) => {
        if (cancelled) return;
        const code = err instanceof StudyError ? err.code : "study_failed";
        setError(code === "rate_limited" ? ts("rateLimited") : ts("errorStudy"));
      });
    return () => {
      cancelled = true;
    };
  }, [letter, locale, ts]);

  return (
    <div>
      <Link href="/estudio" className="text-sm text-muted transition-colors hover:text-gold">
        ← {t("back")}
      </Link>

      {!study && !error && (
        <p className="mt-8 animate-pulse text-muted">{t("studying")}</p>
      )}
      {error && <p className="mt-8 text-sm text-red-400/80">{error}</p>}
      {study && (
        <div className="mt-6">
          <StudyResult text={study} />
        </div>
      )}
    </div>
  );
}
