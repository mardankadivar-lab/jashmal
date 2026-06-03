import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-30 border-b border-gold/15 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-cinzel text-lg tracking-wide text-gold">
            {t("site.name")}
          </span>
          <span className="hebrew text-sm text-muted">{t("site.hebrew")}</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/estudio" className="text-muted transition-colors hover:text-parchment">
            {t("nav.study")}
          </Link>
          <Link href="/misterios" className="text-muted transition-colors hover:text-parchment">
            {t("nav.mysteries")}
          </Link>
          <Link href="/gematrias" className="text-muted transition-colors hover:text-parchment">
            {t("nav.gematria")}
          </Link>
          <Link href="/creacion" className="text-muted transition-colors hover:text-parchment">
            {t("nav.creation")}
          </Link>
          <Link href="/arbol" className="text-muted transition-colors hover:text-parchment">
            {t("nav.tree")}
          </Link>
          <Link href="/acerca" className="text-muted transition-colors hover:text-parchment">
            {t("nav.about")}
          </Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
