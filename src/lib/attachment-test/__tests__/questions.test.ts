import { describe, expect, it } from "vitest";
import { attachmentTestQuestions } from "../questions";

describe("attachment-test/questions", () => {
  it("contains exactly 12 questions", () => {
    expect(attachmentTestQuestions).toHaveLength(12);
  });

  it("has 6 anxiety and 6 avoidance questions", () => {
    const anxiety = attachmentTestQuestions.filter((q) => q.scale === "anxiety");
    const avoidance = attachmentTestQuestions.filter(
      (q) => q.scale === "avoidance",
    );

    expect(anxiety).toHaveLength(6);
    expect(avoidance).toHaveLength(6);
  });

  it("has non-empty ru/en texts for every question", () => {
    for (const q of attachmentTestQuestions) {
      expect(q.text.ru.trim().length).toBeGreaterThan(0);
      expect(q.text.en.trim().length).toBeGreaterThan(0);
    }
  });
});

