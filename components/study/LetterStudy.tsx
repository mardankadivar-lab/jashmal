"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import StudyResult from "./StudyResult";
import { requestStudy, StudyError } from "@/lib/studyClient";
import { resolveHebrewLetter } from "@/lib/hebrewLetters";

export default function LetterStudy({ letter }: { letter: string }) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("letters");
  const ts = useTranslations("study");

  // `letter` puede llegar como slug ("alef") o como glifo hebreo (א).
  // Mostramos siempre el glifo hebreo grande.
  const glyph = resolveHebrewLetter(letter);

  const [study, setStudy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setStudy(null);
    setError(null);
    requestStudy({ mode: "letter", locale, letter })
      .then((res) => {
        if (!cancelled) setStudy(res.study);
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

      {/* Glifo principal de la letra — grande y luminoso */}
      <div className="mt-8 flex justify-center">
        <span
          className="hebrew block leading-none text-gold"
          style={{
            fontSize: "clamp(120px, 30vw, 220px)",
            textShadow: "0 0 40px rgba(201,164,62,0.45), 0 0 14px rgba(201,164,62,0.35)",
          }}
        >
          {glyph}
        </span>
      </div>

      {!study && !error && (
        <p className="mt-8 animate-pulse text-muted">{t("studying")}</p>
      )}
      {error && <p className="mt-8 text-sm text-red-400/80">{error}</p>}
      {study && (
        <div className="mt-6">
          <StudyResult
            text={study}
            onLetter={(key) => router.push(`/letras/${encodeURIComponent(key)}`)}
            onConcept={(term) => router.push(`/estudio?concept=${encodeURIComponent(term)}`)}
            onRef={(ref) => router.push(`/estudio?ref=${encodeURIComponent(ref)}`)}
          />
        </div>
      )}
    </div>
  );
}
