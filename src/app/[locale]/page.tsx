import type { Locale } from "@/lib/i18n/locales";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import Link from "next/link";
import AuthorAttribution from "./ui/author-attribution";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ru";
  const dict = getDictionary(locale);

  return (
    <>
      <section className="card heroCard" aria-label={dict.home.title}>
        <div className="pill">{dict.common.appName}</div>
        <h1 className="heroTitle">{dict.home.title}</h1>
        <p className="heroLead">{dict.home.subtitle}</p>

        <div className="actions">
          <Link className="buttonPrimary" href={`/${locale}/test`}>
            {dict.home.actions.startTest}
          </Link>
        </div>
      </section>

      <AuthorAttribution locale={locale} dict={dict} variant="home" />
    </>
  );
}

