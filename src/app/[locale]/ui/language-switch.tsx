"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/locales";
import { locales } from "@/lib/i18n/locales";
import type { AppDictionary } from "@/lib/i18n/types";

function getLabel(dict: AppDictionary, locale: Locale) {
  return locale === "ru" ? dict.common.language.ru : dict.common.language.en;
}

function getShortLabel(locale: Locale) {
  return locale.toUpperCase();
}

function replaceLocaleInPathname(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/").filter(Boolean);

  // Expected: /{locale}/...
  if (parts.length === 0) return `/${nextLocale}`;
  parts[0] = nextLocale;

  return `/${parts.join("/")}`;
}

export default function LanguageSwitch({
  locale,
  dict,
}: {
  locale: Locale;
  dict: AppDictionary;
}) {
  const pathname = usePathname() ?? `/${locale}`;

  return (
    <div className="langSwitch" aria-label={dict.common.language.label}>
      {locales.map((l) => {
        const href = replaceLocaleInPathname(pathname, l);
        const active = l === locale;

        return (
          <Link
            key={l}
            href={href}
            className={active ? "langPill langPillActive" : "langPill"}
            aria-current={active ? "page" : undefined}
            aria-label={getLabel(dict, l)}
            title={getLabel(dict, l)}
          >
            {getShortLabel(l)}
          </Link>
        );
      })}
    </div>
  );
}

