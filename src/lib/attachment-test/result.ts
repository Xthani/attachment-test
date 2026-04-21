import type {
  AnswerValue,
  AttachmentQuestionId,
  AttachmentResultInterpretation,
  AttachmentStyle,
  AttachmentTestResult,
} from "./types";
import { attachmentTestQuestions } from "./questions";

export type AttachmentAnswersById = Partial<
  Record<AttachmentQuestionId, AnswerValue>
>;

export function calculateAttachmentResult(
  answersById: AttachmentAnswersById,
): AttachmentTestResult {
  let anxietySum = 0;
  let avoidanceSum = 0;
  let anxietyCount = 0;
  let avoidanceCount = 0;

  for (const q of attachmentTestQuestions) {
    const value = answersById[q.id];
    if (!value) continue;

    if (q.scale === "anxiety") {
      anxietySum += value;
      anxietyCount += 1;
    } else {
      avoidanceSum += value;
      avoidanceCount += 1;
    }
  }

  if (anxietyCount !== 6 || avoidanceCount !== 6) {
    throw new Error("Cannot calculate result: not all questions are answered.");
  }

  const anxietyAvg = anxietySum / 6;
  const avoidanceAvg = avoidanceSum / 6;

  return {
    anxietyAvg,
    avoidanceAvg,
    style: getAttachmentStyle(anxietyAvg, avoidanceAvg),
  };
}

export function getAttachmentStyle(
  anxietyAvg: number,
  avoidanceAvg: number,
): AttachmentStyle {
  const anxietyHigh = anxietyAvg >= 3;
  const avoidanceHigh = avoidanceAvg >= 3;

  if (!anxietyHigh && !avoidanceHigh) return "secure";
  if (anxietyHigh && !avoidanceHigh) return "anxious";
  if (!anxietyHigh && avoidanceHigh) return "avoidant";
  return "fearful-avoidant";
}

export function getResultInterpretationStub(
  result: AttachmentTestResult,
): AttachmentResultInterpretation {
  return {
    style: result.style,
    summary: "Здесь будет интерпретация результата.",
  };
}

