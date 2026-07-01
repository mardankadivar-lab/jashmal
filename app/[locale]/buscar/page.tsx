import { useTranslations } from "next-intl";
import SiteHeader from "@/components/SiteHeader";
import SearchResults from "@/components/study/SearchResults";

interface BuscarPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function BuscarPage({ searchParams }: BuscarPageProps) {
  const { q } = await searchParams;
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Header />
        <SearchResults initialQuery={q ?? ""} />
      </main>
    </>
  );
}

function Header() {
  const t = useTranslations("search");
  return (
    <header className="mb-8">
      <h1 className="font-cinzel text-3xl text-parchment">{t("title")}</h1>
      <p className="mt-2 max-w-2xl text-muted">{t("subtitle")}</p>
    </header>
  );
}
