import { getTranslations } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import LetterStudy from "@/components/study/LetterStudy";

export default async function LetterPage({
  params,
}: {
  params: Promise<{ locale: string; letra: string }>;
}) {
  const { letra } = await params;
  const letter = decodeURIComponent(letra);
  const t = await getTranslations("letters");

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
        <LetterStudy letter={letter} />
      </main>
    </>
  );
}
