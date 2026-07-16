import { getTranslations } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import LetterStudy from "@/components/study/LetterStudy";
import { Link } from "@/i18n/navigation";
import { getLetter } from "@/lib/letters";

export default async function LetterPage({
  params,
}: {
  params: Promise<{ locale: string; letra: string }>;
}) {
  const { letra } = await params;
  const letter = decodeURIComponent(letra);
  const t = await getTranslations("letters");
  // Si el Sofer ya verificó la data completa de esta letra, se ofrece la
  // experiencia inmersiva del motor de letras (/letra/<slug>).
  const inmersiva = getLetter(letter);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-5 py-10">
        <header className="mb-6">
          <h1 className="font-cinzel text-3xl text-parchment">
            {t("title")}
          </h1>
          <p className="mt-2 text-muted">{t("subtitle")}</p>
        </header>
        {inmersiva && (
          <Link
            href={`/letra/${inmersiva.slug}`}
            className="group mb-6 flex items-center justify-between rounded-2xl border border-gold/40 bg-gold/5 px-5 py-4 transition-all hover:border-gold/70 hover:bg-gold/10"
          >
            <span className="flex items-center gap-3">
              <span className="hebrew text-2xl text-gold" style={{ filter: "drop-shadow(0 0 8px rgba(201,164,62,0.45))" }}>
                {inmersiva.letter}
              </span>
              <span className="font-cinzel text-sm tracking-wide text-parchment">
                Entra a la experiencia inmersiva — Nombre · Forma · Número
              </span>
            </span>
            <span className="text-gold/70 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        )}
        <LetterStudy letter={letter} />
      </main>
    </>
  );
}
