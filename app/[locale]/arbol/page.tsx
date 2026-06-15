import { getTranslations } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";
import TreeOfLifeShell from "@/components/kabbalah/TreeOfLifeShell";

export default async function TreePage() {
  const t = await getTranslations("tree");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <header className="mb-6 text-center">
          <h1 className="font-cinzel text-3xl text-parchment">{t("title")}</h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            {t("subtitle")}
          </p>
        </header>
        <TreeOfLifeShell />
      </main>
    </>
  );
}
