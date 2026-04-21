import Link from "next/link";
import type { Locale } from "@/lib/i18n/locales";
import type { AppDictionary } from "@/lib/i18n/types";
import LanguageSwitch from "./language-switch";
import ThemeToggle from "./theme-toggle";

export default function AppShell({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: AppDictionary;
  children: React.ReactNode;
}) {
  return (
    <div className="app" data-locale={locale}>
      <header className="header">
        <div className="headerInner">
          <Link className="brand" href={`/${locale}`}>
            {dict.common.appName}
          </Link>

          <nav className="nav" aria-label={dict.common.nav.label}>
            <Link className="navLink" href={`/${locale}`}>
              {dict.common.nav.home}
            </Link>
            <Link className="navLink" href={`/${locale}/test`}>
              {dict.common.nav.test}
            </Link>
            <Link className="navLink" href={`/${locale}/result`}>
              {dict.common.nav.result}
            </Link>
          </nav>

          <div className="headerControls">
            <ThemeToggle dict={dict} />
            <LanguageSwitch locale={locale} dict={dict} />
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}

