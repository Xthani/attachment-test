import { describe, expect, it } from "vitest";
import { getAttachmentInterpretation, getScaleLevel } from "../interpretation";
import type { AttachmentTestResult } from "../types";

describe("attachment-test/interpretation", () => {
  it("maps averages to low/medium/high levels", () => {
    expect(getScaleLevel(2.49)).toBe("low");
    expect(getScaleLevel(2.5)).toBe("medium");
    expect(getScaleLevel(3.49)).toBe("medium");
    expect(getScaleLevel(3.5)).toBe("high");
  });

  it("builds interpretation structure (ru) for a representative case", () => {
    const result: AttachmentTestResult = {
      style: "anxious",
      anxietyAvg: 3.2,
      avoidanceAvg: 2.1,
    };

    const i = getAttachmentInterpretation("ru", result);
    expect(i.style).toBe("anxious");
    expect(i.styleLabel).toMatch(/ближе/i);
    expect(i.anxiety.level).toBe("medium");
    expect(i.avoidance.level).toBe("low");
    expect(i.headline.length).toBeGreaterThan(10);
  });

  it("builds interpretation structure (en) for a representative case", () => {
    const result: AttachmentTestResult = {
      style: "fearful-avoidant",
      anxietyAvg: 3.8,
      avoidanceAvg: 3.9,
    };

    const i = getAttachmentInterpretation("en", result);
    expect(i.style).toBe("fearful-avoidant");
    expect(i.styleLabel).toMatch(/closest/i);
    expect(i.anxiety.level).toBe("high");
    expect(i.avoidance.level).toBe("high");
    expect(i.lead.length).toBeGreaterThan(10);
  });
});

