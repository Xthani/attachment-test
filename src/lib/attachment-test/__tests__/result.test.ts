import { describe, expect, it } from "vitest";
import { calculateAttachmentResult, getAttachmentStyle } from "../result";
import type { AttachmentAnswersById } from "../result";
import type { AnswerValue } from "../types";

function fullAnswers(value: AnswerValue): AttachmentAnswersById {
  return {
    "anxiety-1": value,
    "anxiety-2": value,
    "anxiety-3": value,
    "anxiety-4": value,
    "anxiety-5": value,
    "anxiety-6": value,
    "avoidance-1": value,
    "avoidance-2": value,
    "avoidance-3": value,
    "avoidance-4": value,
    "avoidance-5": value,
    "avoidance-6": value,
  };
}

describe("attachment-test/result", () => {
  it("throws on incomplete answers", () => {
    const partial: AttachmentAnswersById = { "anxiety-1": 3 };
    expect(() => calculateAttachmentResult(partial)).toThrow(
      /not all questions are answered/i,
    );
  });

  it("calculates averages for uniform answers", () => {
    const result = calculateAttachmentResult(fullAnswers(4));
    expect(result.anxietyAvg).toBe(4);
    expect(result.avoidanceAvg).toBe(4);
  });

  it("determines attachment style by thresholds", () => {
    expect(getAttachmentStyle(2.99, 2.99)).toBe("secure");
    expect(getAttachmentStyle(3, 2.99)).toBe("anxious");
    expect(getAttachmentStyle(2.99, 3)).toBe("avoidant");
    expect(getAttachmentStyle(3, 3)).toBe("fearful-avoidant");
  });
});

