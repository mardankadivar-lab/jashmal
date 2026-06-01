import { getTranslations } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import TreeOfLife from "@/components/kabbalah/TreeOfLife";

export default async function TreePage() {
  const t = await getTranslations("tree");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <header className="mb-8 text-center">
          <p className="hebrew text-4xl text-gold">עֵץ חַיִּים</p>
          <h1 className="mt-2 font-cinzel text-3xl text-parchment">{t("title")}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted max-w-md mx-auto">
            {t("subtitle")}
          </p>
        </header>
        <TreeOfLife />
      </main>
    </>
  );
}
