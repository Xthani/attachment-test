import { beforeEach, describe, expect, it } from "vitest";
import {
  clearAttachmentDraft,
  clearAttachmentResult,
  loadAttachmentDraft,
  loadAttachmentResult,
  saveAttachmentDraft,
  saveAttachmentResult,
} from "../storage";
import type { AttachmentTestResult } from "../types";

describe("attachment-test/storage (sessionStorage)", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("writes/reads/clears draft answers", () => {
    expect(loadAttachmentDraft()).toBeNull();

    saveAttachmentDraft({ "anxiety-1": 3 });
    expect(loadAttachmentDraft()).toEqual({ "anxiety-1": 3 });

    clearAttachmentDraft();
    expect(loadAttachmentDraft()).toBeNull();
  });

  it("writes/reads/clears result", () => {
    expect(loadAttachmentResult()).toBeNull();

    const result: AttachmentTestResult = {
      style: "secure",
      anxietyAvg: 2.1,
      avoidanceAvg: 2.2,
    };
    saveAttachmentResult(result);
    expect(loadAttachmentResult()).toEqual(result);

    clearAttachmentResult();
    expect(loadAttachmentResult()).toBeNull();
  });
});

