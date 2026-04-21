import type { Locale } from "@/lib/i18n/locales";
import type { AttachmentStyle, AttachmentTestResult } from "./types";

export type ScaleLevel = "low" | "medium" | "high";

export type ScaleInterpretation = {
  title: string;
  level: ScaleLevel;
  levelLabel: string;
  averageLabel: string;
  averageValueText: string;
  description: string;
};

export type AttachmentInterpretation = {
  style: AttachmentStyle;
  styleLabel: string;
  headline: string;
  lead: string;
  meaning: string;
  anxiety: ScaleInterpretation;
  avoidance: ScaleInterpretation;
  closing: string;
};

const THRESHOLDS = {
  lowMax: 2.5,
  highMin: 3.5,
} as const;

export function getScaleLevel(avg: number): ScaleLevel {
  if (avg < THRESHOLDS.lowMax) return "low";
  if (avg >= THRESHOLDS.highMin) return "high";
  return "medium";
}

function formatAvg(locale: Locale, value: number) {
  return value.toLocaleString(locale, { maximumFractionDigits: 2 });
}

function styleLabel(locale: Locale, style: AttachmentStyle) {
  const ru: Record<AttachmentStyle, string> = {
    secure: "Ближе к безопасному типу",
    anxious: "Ближе к тревожному типу",
    avoidant: "Ближе к избегающему типу",
    "fearful-avoidant": "Ближе к тревожно-избегающему типу",
  };
  const en: Record<AttachmentStyle, string> = {
    secure: "Closest to secure",
    anxious: "Closest to anxious",
    avoidant: "Closest to avoidant",
    "fearful-avoidant": "Closest to fearful-avoidant",
  };
  return locale === "ru" ? ru[style] : en[style];
}

function levelLabel(locale: Locale, level: ScaleLevel) {
  const ru: Record<ScaleLevel, string> = {
    low: "низкий уровень",
    medium: "средний уровень",
    high: "высокий уровень",
  };
  const en: Record<ScaleLevel, string> = {
    low: "low",
    medium: "medium",
    high: "high",
  };
  return locale === "ru" ? ru[level] : en[level];
}

function buildStyleTexts(locale: Locale, style: AttachmentStyle) {
  const ru: Record<
    AttachmentStyle,
    { headline: string; lead: string; meaning: string; closing: string }
  > = {
    secure: {
      headline: "Похоже, сейчас вам ближе безопасный паттерн привязанности.",
      lead:
        "Это обычно означает, что близость воспринимается как естественная и в целом безопасная: вы можете быть рядом, сохраняя себя.",
      meaning:
        "В отношениях вам, вероятно, проще сочетать близость и автономию, говорить о потребностях и выдерживать небольшую неопределённость без сильного внутреннего напряжения.",
      closing:
        "Помните, что это не «ярлык». Паттерны могут меняться в зависимости от контекста, опыта и конкретных отношений.",
    },
    anxious: {
      headline: "По вашим ответам сейчас заметна склонность к тревожной привязанности.",
      lead:
        "Такой результат часто связан с чувствительностью к дистанции и потребностью в подтверждении близости — особенно в моменты неопределённости.",
      meaning:
        "Вы можете быстрее замечать признаки отдаления и сильнее переживать, когда связь кажется нестабильной. Это не про «слабость», а про способ системы привязанности искать безопасность.",
      closing:
        "Мягкая поддержка, ясные договорённости и навыки саморегуляции обычно помогают снижать напряжение и усиливать чувство устойчивости.",
    },
    avoidant: {
      headline: "По вашим ответам сейчас ближе паттерн избегающей привязанности.",
      lead:
        "Этот результат часто отражает стремление сохранять дистанцию, автономию и внутреннюю опору — особенно когда близость становится очень интенсивной.",
      meaning:
        "Вам может быть комфортнее полагаться на себя и дозировать эмоциональную открытость. Это может работать как способ защищать границы и снижать перегрузку от близости.",
      closing:
        "Нередко помогает постепенное расширение безопасной открытости: маленькими шагами, без давления и с уважением к собственному темпу.",
    },
    "fearful-avoidant": {
      headline:
        "По вашим ответам сейчас ближе тревожно-избегающий паттерн (амбивалентность близости).",
      lead:
        "Он может проявляться как одновременная потребность в близости и желание дистанцироваться, когда близость становится эмоционально «слишком».",
      meaning:
        "Внутренне может быть конфликт: хочется тепла и поддержки, но одновременно включается осторожность и защита. Такое сочетание часто усиливает эмоциональные «качели» в отношениях.",
      closing:
        "Полезно искать баланс через устойчивые, предсказуемые формы контакта и мягкую работу с безопасностью в отношениях (в том числе с поддержкой специалиста).",
    },
  };

  const en: Record<
    AttachmentStyle,
    { headline: string; lead: string; meaning: string; closing: string }
  > = {
    secure: {
      headline: "Based on your answers, you seem closest to a secure pattern.",
      lead:
        "This often means closeness feels generally safe: you can stay connected while still feeling like yourself.",
      meaning:
        "You may find it easier to balance intimacy and independence, talk about needs, and handle small uncertainty without strong inner tension.",
      closing:
        "This isn’t a label. Attachment patterns can shift depending on context, life experience, and the relationship itself.",
    },
    anxious: {
      headline: "Based on your answers, you seem closer to an anxious pattern.",
      lead:
        "This result often reflects sensitivity to distance and a stronger need for reassurance — especially when things feel unclear.",
      meaning:
        "You may pick up on signs of withdrawal quickly and feel more distressed when the connection seems unstable. It’s not a diagnosis — it’s a way your attachment system tries to find safety.",
      closing:
        "Clear agreements, supportive communication, and self-regulation skills often help reduce tension and build steadiness.",
    },
    avoidant: {
      headline: "Based on your answers, you seem closer to an avoidant pattern.",
      lead:
        "This often reflects a preference for autonomy and emotional space — especially when closeness feels intense or demanding.",
      meaning:
        "You may feel more comfortable relying on yourself and sharing vulnerability in a measured way. This can be a protective strategy that helps you keep your boundaries and avoid overload.",
      closing:
        "Many people benefit from gradually practicing safe openness — in small steps, without pressure, and at a pace that feels respectful.",
    },
    "fearful-avoidant": {
      headline:
        "Based on your answers, you seem closest to a fearful-avoidant pattern.",
      lead:
        "It can show up as wanting closeness while also pulling back when intimacy starts to feel emotionally “too much.”",
      meaning:
        "There may be an inner push–pull: seeking warmth and support, while a protective part becomes cautious or distant. This mix can intensify emotional ups and downs in relationships.",
      closing:
        "A helpful direction is building safety through predictable, gentle connection and (when useful) working with a professional to support steadier closeness.",
    },
  };

  return locale === "ru" ? ru[style] : en[style];
}

function anxietyDescription(locale: Locale, level: ScaleLevel) {
  const ru: Record<ScaleLevel, string> = {
    low: "Обычно вы достаточно спокойно переносите неопределённость и реже нуждаетесь в частом подтверждении чувств.",
    medium:
      "Вы можете чувствовать тревогу в некоторых ситуациях — например, когда партнёр становится менее доступным — но чаще всего сохраняете опору.",
    high: "Система привязанности, вероятно, активируется довольно быстро: дистанция или неопределённость могут заметно усиливать внутреннее напряжение.",
  };
  const en: Record<ScaleLevel, string> = {
    low: "You tend to tolerate uncertainty relatively well and usually need less frequent reassurance.",
    medium:
      "You may feel anxious in some situations (for example, when a partner becomes less available), but you often keep a sense of stability.",
    high: "Your attachment system may activate quickly: distance or uncertainty can noticeably increase inner tension.",
  };
  return locale === "ru" ? ru[level] : en[level];
}

function avoidanceDescription(locale: Locale, level: ScaleLevel) {
  const ru: Record<ScaleLevel, string> = {
    low: "Вам, вероятно, комфортнее с эмоциональной близостью и проще делиться важными чувствами.",
    medium:
      "Иногда вам важно пространство и самостоятельность, особенно в период стресса, но вы можете оставаться в контакте.",
    high: "Сильная близость может восприниматься как перегрузка: может появляться желание дистанцироваться и полагаться на себя.",
  };
  const en: Record<ScaleLevel, string> = {
    low: "Emotional closeness likely feels more comfortable, and sharing important feelings may come easier.",
    medium:
      "At times you may need space and independence (especially under stress), while still staying connected.",
    high: "Intense closeness may feel overwhelming: you may want more distance and prefer relying on yourself.",
  };
  return locale === "ru" ? ru[level] : en[level];
}

export function getAttachmentInterpretation(
  locale: Locale,
  result: AttachmentTestResult,
): AttachmentInterpretation {
  const anxietyLevel = getScaleLevel(result.anxietyAvg);
  const avoidanceLevel = getScaleLevel(result.avoidanceAvg);

  const styleTexts = buildStyleTexts(locale, result.style);

  const anxiety: ScaleInterpretation = {
    title: locale === "ru" ? "Тревожность (anxiety)" : "Anxiety",
    level: anxietyLevel,
    levelLabel: levelLabel(locale, anxietyLevel),
    averageLabel: locale === "ru" ? "Среднее" : "Average",
    averageValueText: formatAvg(locale, result.anxietyAvg),
    description: anxietyDescription(locale, anxietyLevel),
  };

  const avoidance: ScaleInterpretation = {
    title: locale === "ru" ? "Избегание (avoidance)" : "Avoidance",
    level: avoidanceLevel,
    levelLabel: levelLabel(locale, avoidanceLevel),
    averageLabel: locale === "ru" ? "Среднее" : "Average",
    averageValueText: formatAvg(locale, result.avoidanceAvg),
    description: avoidanceDescription(locale, avoidanceLevel),
  };

  return {
    style: result.style,
    styleLabel: styleLabel(locale, result.style),
    headline: styleTexts.headline,
    lead: styleTexts.lead,
    meaning: styleTexts.meaning,
    anxiety,
    avoidance,
    closing: styleTexts.closing,
  };
}

