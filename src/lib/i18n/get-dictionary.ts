import type { Locale } from "./locales";
import type { AppDictionary } from "./types";

import { en } from "./dictionaries/en";
import { ru } from "./dictionaries/ru";

const dictionaries: Record<Locale, AppDictionary> = {
  ru,
  en,
};

export function getDictionary(locale: Locale): AppDictionary {
  return dictionaries[locale];
}

