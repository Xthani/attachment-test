import type { AttachmentAnswersById } from "./result";
import type { AttachmentTestResult } from "./types";

const RESULT_KEY = "attachment-test:result:v1";
const DRAFT_KEY = "attachment-test:draft:v1";

function isBrowser() {
  return typeof window !== "undefined";
}

export function saveAttachmentDraft(draft: AttachmentAnswersById) {
  if (!isBrowser()) return;
  window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function loadAttachmentDraft(): AttachmentAnswersById | null {
  if (!isBrowser()) return null;
  const raw = window.sessionStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AttachmentAnswersById;
  } catch {
    return null;
  }
}

export function clearAttachmentDraft() {
  if (!isBrowser()) return;
  window.sessionStorage.removeItem(DRAFT_KEY);
}

export function saveAttachmentResult(result: AttachmentTestResult) {
  if (!isBrowser()) return;
  window.sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
}

export function loadAttachmentResultRaw(): string | null {
  if (!isBrowser()) return null;
  return window.sessionStorage.getItem(RESULT_KEY);
}

export function loadAttachmentResult(): AttachmentTestResult | null {
  if (!isBrowser()) return null;
  const raw = window.sessionStorage.getItem(RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AttachmentTestResult;
  } catch {
    return null;
  }
}

export function clearAttachmentResult() {
  if (!isBrowser()) return;
  window.sessionStorage.removeItem(RESULT_KEY);
}

