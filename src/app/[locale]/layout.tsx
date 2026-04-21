import type { Locale } from "@/lib/i18n/locales";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import AppShell from "./ui/app-shell";
import { psychologistBranding } from "@/lib/branding";

function buildMeta(locale: Locale) {
  if (locale === "ru") {
    return {
      title: "Тест на тип привязанности",
      description:
        "Короткий онлайн‑опросник, который помогает мягко оценить паттерны близости и дистанции. Не является диагнозом.",
    };
  }
  return {
    title: "Attachment style questionnaire",
    description:
      "A short online questionnaire that gently reflects patterns of closeness and distance. Not a diagnosis.",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ru";
  const dict = getDictionary(locale);
  const meta = buildMeta(locale);

  const canonical = `/${locale}`;
  const languages = {
    ru: "/ru",
    en: "/en",
  };

  return {
    title: meta.title,
    description: meta.description,
    applicationName: dict.common.appName,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      siteName: dict.common.appName,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: meta.title,
      description: meta.description,
    },
    other: {
      "author": psychologistBranding.displayName,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ru";
  const dict = getDictionary(locale);

  return (
    <AppShell locale={locale} dict={dict}>
      {children}
    </AppShell>
  );
}

export async function generateStaticParams() {
  return [{ locale: "ru" }, { locale: "en" }];
}

