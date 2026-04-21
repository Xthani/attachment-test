import type {
  AttachmentQuestion,
  AttachmentQuestionSource,
} from "./types";
import type { Locale } from "@/lib/i18n/locales";

export const attachmentTestQuestions: AttachmentQuestionSource[] = [
  {
    id: "anxiety-1",
    scale: "anxiety",
    text: {
      ru: "Когда партнёр становится менее тёплым, я быстро начинаю переживать о его чувствах ко мне.",
      en: "When my partner becomes less warm, I quickly start worrying about how they feel about me.",
    },
  },
  {
    id: "anxiety-2",
    scale: "anxiety",
    text: {
      ru: "Мне важно часто чувствовать подтверждение, что я нужен(нужна) и любим(а).",
      en: "I often need reassurance that I’m wanted and loved.",
    },
  },
  {
    id: "anxiety-3",
    scale: "anxiety",
    text: {
      ru: "Я легко начинаю накручивать себя, если замечаю дистанцию в отношениях.",
      en: "I can easily spiral if I notice distance in a relationship.",
    },
  },
  {
    id: "anxiety-4",
    scale: "anxiety",
    text: {
      ru: "Мне трудно оставаться спокойным(ой), когда я не уверен(а) в стабильности чувств партнёра.",
      en: "It’s hard for me to stay calm when I’m not sure my partner’s feelings are steady.",
    },
  },
  {
    id: "anxiety-5",
    scale: "anxiety",
    text: {
      ru: "Иногда я боюсь, что человек, к которому я сильно привязался(лась), отдалится от меня.",
      en: "Sometimes I’m afraid the person I’m attached to will pull away from me.",
    },
  },
  {
    id: "anxiety-6",
    scale: "anxiety",
    text: {
      ru: "Даже небольшая неопределённость в отношениях может вызывать у меня сильное внутреннее напряжение.",
      en: "Even a little uncertainty in a relationship can make me feel very tense inside.",
    },
  },
  {
    id: "avoidance-1",
    scale: "avoidance",
    text: {
      ru: "Когда человек подходит слишком близко эмоционально, мне хочется вернуть себе больше дистанции.",
      en: "When someone gets too emotionally close, I feel the urge to create more distance.",
    },
  },
  {
    id: "avoidance-2",
    scale: "avoidance",
    text: {
      ru: "Мне проще быть самостоятельным(ой), чем по-настоящему опираться на партнёра.",
      en: "It feels easier to be self-reliant than to truly lean on a partner.",
    },
  },
  {
    id: "avoidance-3",
    scale: "avoidance",
    text: {
      ru: "Мне не всегда комфортно делиться самыми уязвимыми чувствами.",
      en: "I’m not always comfortable sharing my most vulnerable feelings.",
    },
  },
  {
    id: "avoidance-4",
    scale: "avoidance",
    text: {
      ru: "Слишком большая эмоциональная зависимость в отношениях меня напрягает.",
      en: "Too much emotional dependence in a relationship makes me uneasy.",
    },
  },
  {
    id: "avoidance-5",
    scale: "avoidance",
    text: {
      ru: "Я предпочитаю сохранять часть переживаний при себе, даже если отношения важны.",
      en: "Even in an important relationship, I prefer to keep some things to myself.",
    },
  },
  {
    id: "avoidance-6",
    scale: "avoidance",
    text: {
      ru: "Мне важно чувствовать, что я не слишком связан(а) обязательствами близости.",
      en: "It’s important to me to feel I’m not too tied down by closeness and expectations.",
    },
  },
] as const;

export function getAttachmentQuestions(locale: Locale): AttachmentQuestion[] {
  return attachmentTestQuestions.map((q) => ({
    id: q.id,
    scale: q.scale,
    text: q.text[locale],
  }));
}

