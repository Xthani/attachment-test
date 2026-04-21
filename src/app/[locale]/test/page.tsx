import type { Locale } from "@/lib/i18n/locales";
import { isLocale } from "@/lib/i18n/locales";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import TestScreen from "./test-screen";
import { getAttachmentQuestions } from "@/lib/attachment-test/questions";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : "ru";
  const dict = getDictionary(locale);

  const questions = getAttachmentQuestions(locale);

  return <TestScreen locale={locale} t={dict.test} questions={questions} />;
}

