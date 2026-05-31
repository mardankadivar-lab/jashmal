"use client";

import { useCallback, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

interface Reflection {
  id: number;
  body: string;
  created_at: string;
}

interface BeitMidrashProps {
  /** Identificador del estudio bajo el cual viven las reflexiones. */
  studyRef: string;
}

export default function BeitMidrash({ studyRef }: BeitMidrashProps) {
  const locale = useLocale();
  const t = useTranslations("beitMidrash");

  const [configured, setConfigured] = useState(true);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reported, setReported] = useState<Set<number>>(new Set());

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/reflections?ref=${encodeURIComponent(studyRef)}`);
      const data = await res.json();
      setConfigured(data.configured !== false);
      setReflections(data.reflections ?? []);
    } catch {
      /* silencioso: el estudio principal no debe romperse por esto */
    }
  }, [studyRef]);

  useEffect(() => {
    setReflections([]);
    setError(null);
    load();
  }, [load]);

  async function share() {
    const body = text.trim();
    if (body.length < 2) {
      setError(t("tooShort"));
      return;
    }
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: studyRef, locale, body }),
      });
      if (res.ok) {
        setText("");
        await load();
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.error === "rejected") setError(t("rejected"));
        else if (data.error === "rate_limited") setError(t("rateLimited"));
        else if (data.error === "too_short") setError(t("tooShort"));
        else setError(t("error"));
      }
    } catch {
      setError(t("error"));
    } finally {
      setSending(false);
    }
  }

  async function report(id: number) {
    setReported((prev) => new Set(prev).add(id));
    try {
      await fetch("/api/reflections/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      /* el optimismo de UI ya marcó como reportado */
    }
  }

  if (!configured) {
    return (
      <div className="mt-10 border-t border-gold/15 pt-6">
        <h3 className="font-cinzel text-sm uppercase tracking-widest text-gold/70">
          {t("title")}
        </h3>
        <p className="mt-3 text-sm text-muted">{t("soon")}</p>
      </div>
    );
  }

  const fmt = (iso: string) => {
    try {
      return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "es-ES", {
        dateStyle: "medium",
      }).format(new Date(iso));
    } catch {
      return "";
    }
  };

  return (
    <div className="mt-10 border-t border-gold/15 pt-6">
      <h3 className="font-cinzel text-base text-gold">{t("title")}</h3>
      <p className="mt-2 text-sm text-muted">{t("subtitle")}</p>

      <a
        href="/estudio?ref=Ecclesiastes%2011%3A1"
        className="mt-3 block rounded-md border border-gold/15 bg-gold/[0.03] px-3 py-2 font-cinzel text-sm italic leading-relaxed text-gold-soft transition-colors hover:border-gold/40 hover:bg-gold/[0.06]"
      >
        “{t("kohelet")}”
        <span className="mt-1 block text-xs not-italic text-muted">
          Kohelet 11:1 · {t("koheletCta")}
        </span>
      </a>

      <div className="mt-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("placeholder")}
          rows={3}
          maxLength={2000}
          className="w-full resize-y rounded-md border border-gold/25 bg-white/[0.03] px-3 py-2 text-sm text-parchment placeholder:text-muted/70 focus:border-gold/60 focus:outline-none"
        />
        <div className="mt-2 flex items-center justify-between gap-3">
          <span className="text-xs text-muted/70">{t("anonNote")}</span>
          <button
            onClick={share}
            disabled={sending}
            className="shrink-0 rounded-full border border-gold/60 px-5 py-1.5 text-sm text-gold transition-all hover:bg-gold/10 disabled:opacity-40"
          >
            {sending ? t("sharing") : t("share")}
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-red-400/80">{error}</p>}
      </div>

      <ul className="mt-6 space-y-4">
        {reflections.length === 0 && (
          <li className="text-sm text-muted">{t("empty")}</li>
        )}
        {reflections.map((r) => (
          <li
            key={r.id}
            className="rounded-md border border-gold/10 bg-white/[0.02] p-4"
          >
            <p className="whitespace-pre-wrap text-parchment/90">{r.body}</p>
            <div className="mt-2 flex items-center justify-between text-xs text-muted/70">
              <span>
                {t("you")} · {fmt(r.created_at)}
              </span>
              <button
                onClick={() => report(r.id)}
                disabled={reported.has(r.id)}
                className="transition-colors hover:text-gold disabled:opacity-50"
              >
                {reported.has(r.id) ? t("reported") : t("report")}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
