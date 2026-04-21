export type AnswerValue = 1 | 2 | 3 | 4 | 5;

export type AttachmentScale = "anxiety" | "avoidance";

export type AttachmentQuestionId =
  | `anxiety-${1 | 2 | 3 | 4 | 5 | 6}`
  | `avoidance-${1 | 2 | 3 | 4 | 5 | 6}`;

export type LocalizedText = {
  ru: string;
  en: string;
};

export type AttachmentQuestion = {
  id: AttachmentQuestionId;
  scale: AttachmentScale;
  text: string;
};

export type AttachmentQuestionSource = {
  id: AttachmentQuestionId;
  scale: AttachmentScale;
  text: LocalizedText;
};

export type AttachmentAnswer = {
  questionId: AttachmentQuestionId;
  value: AnswerValue;
};

export type AttachmentTestState = {
  currentQuestionIndex: number;
  answers: AttachmentAnswer[];
};

export type AttachmentStyle =
  | "secure"
  | "anxious"
  | "avoidant"
  | "fearful-avoidant";

export type AttachmentTestResult = {
  style: AttachmentStyle;
  anxietyAvg: number;
  avoidanceAvg: number;
};

export type AttachmentResultInterpretation = {
  style: AttachmentStyle;
  summary: string;
};

