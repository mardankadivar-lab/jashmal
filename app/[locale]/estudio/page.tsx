import { useTranslations } from "next-intl";
import SiteHeader from "@/components/SiteHeader";
import StudyEngine from "@/components/study/StudyEngine";
import StudyTour from "@/components/StudyTour";

export default function StudyPage() {
  const t = useTranslations("study");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <header className="mb-8">
          <h1 className="font-cinzel text-3xl text-parchment">{t("title")}</h1>
          <p className="mt-2 max-w-2xl text-muted">{t("subtitle")}</p>
        </header>
        <StudyEngine />
      </main>
      <StudyTour />
    </>
  );
}
