import { getTranslations } from "next-intl/server";
import SiteHeader from "@/components/SiteHeader";

export default async function AboutPage() {
  const t = await getTranslations("about");

  const sections = [
    { he: t("s1He"), title: t("s1Title"), body: t("s1Body") },
    { he: t("s2He"), title: t("s2Title"), body: t("s2Body") },
    { he: t("s3He"), title: t("s3Title"), body: t("s3Body") },
    { he: t("s4He"), title: t("s4Title"), body: t("s4Body") },
  ];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-5 py-12">
        <header className="text-center">
          <p className="hebrew electrum-he text-4xl font-bold">חַשְׁמַל</p>
          <h1 className="electrum mt-3 font-cinzel text-4xl">{t("title")}</h1>
          <p className="mt-3 font-cinzel text-base italic text-gold-soft">
            {t("tagline")}
          </p>
        </header>

        <article className="study-prose mt-10">
          {sections.map((s, i) => (
            <section key={i} className="mt-8">
              <h2 className="font-cinzel text-xl text-gold">
                <span className="hebrew me-2">{s.he}</span>— {s.title}
              </h2>
              <p className="mt-2 whitespace-pre-line">{s.body}</p>
            </section>
          ))}
        </article>

        <p className="mt-12 border-t border-gold/15 pt-6 text-center text-sm text-muted">
          {t("principle")}
        </p>
      </main>
    </>
  );
}
