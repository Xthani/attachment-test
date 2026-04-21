"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  AnswerValue,
  AttachmentQuestion,
  AttachmentQuestionId,
} from "@/lib/attachment-test/types";
import { calculateAttachmentResult, type AttachmentAnswersById } from "@/lib/attachment-test/result";
import {
  clearAttachmentDraft,
  saveAttachmentDraft,
  saveAttachmentResult,
  loadAttachmentDraft,
} from "@/lib/attachment-test/storage";
import type { Locale } from "@/lib/i18n/locales";

export default function TestScreen({
  locale,
  t,
  questions,
}: {
  locale: Locale;
  t: {
    title: string;
    subtitle: string;
    progress: {
      label: string;
    };
    microcopy: {
      time: string;
      privacyShort: string;
    };
    introModal: {
      title: string;
      bullets: {
        time: string;
        privacy: string;
        result: string;
        disclaimer: string;
      };
      ctaStart: string;
      ctaClose: string;
      openInfo: string;
    };
    card: {
      title: string;
      questionLabel: string;
      questionNumber: string;
    };
    scale: {
      labels: [string, string, string, string, string];
      leftLabel: string;
      rightLabel: string;
      ariaLabel: string;
    };
    actions: {
      back: string;
      next: string;
      finish: string;
      toResult: string;
    };
    disclaimers: {
      privacy: string;
    };
  };
  questions: AttachmentQuestion[];
}) {
  const router = useRouter();
  const total = questions.length;
  const scaleRef = useRef<HTMLDivElement | null>(null);
  const introKey = `attachment-test:intro-shown:${locale}:v1`;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answersById, setAnswersById] = useState<AttachmentAnswersById>(
    () => loadAttachmentDraft() ?? {},
  );
  const [isIntroOpen, setIsIntroOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(introKey) !== "1";
  });

  useEffect(() => {
    saveAttachmentDraft(answersById);
  }, [answersById]);

  const question = questions[currentQuestionIndex] ?? null;
  const currentAnswer = question ? answersById[question.id] ?? null : null;

  const answeredCount = useMemo(() => {
    let count = 0;
    for (const q of questions) {
      if (answersById[q.id]) count += 1;
    }
    return count;
  }, [answersById, questions]);

  const progressPct = total > 0 ? Math.round((answeredCount / total) * 100) : 0;
  const canGoBack = currentQuestionIndex > 0;
  const canGoNext =
    question && currentAnswer !== null && currentQuestionIndex < total - 1;
  const isLast = currentQuestionIndex === total - 1;
  const canFinish = total > 0 && answeredCount === total;

  const questionNumberText =
    total > 0
      ? `${t.card.questionNumber} ${currentQuestionIndex + 1} / ${total}`
      : t.card.questionNumber;

  function setAnswer(value: AnswerValue) {
    if (!question) return;
    const id: AttachmentQuestionId = question.id;
    setAnswersById((prev) => ({ ...prev, [id]: value }));
  }

  function goBack() {
    if (!canGoBack) return;
    setCurrentQuestionIndex((i) => Math.max(0, i - 1));
  }

  function goNext() {
    if (!canGoNext) return;
    setCurrentQuestionIndex((i) => Math.min(total - 1, i + 1));
  }

  function finish() {
    if (!canFinish) return;
    const result = calculateAttachmentResult(answersById);
    saveAttachmentResult(result);
    clearAttachmentDraft();
    router.push(`/${locale}/result`);
  }

  function handleScaleKeyDown(e: React.KeyboardEvent) {
    if (!question) return;

    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"] as const;
    if (!keys.includes(e.key as (typeof keys)[number])) return;

    e.preventDefault();
    const current = (currentAnswer ?? 3) as AnswerValue;

    let next: AnswerValue = current;
    if (e.key === "ArrowLeft") next = Math.max(1, current - 1) as AnswerValue;
    if (e.key === "ArrowRight") next = Math.min(5, current + 1) as AnswerValue;
    if (e.key === "Home") next = 1;
    if (e.key === "End") next = 5;

    setAnswer(next);
    const root = scaleRef.current;
    const btn = root?.querySelector<HTMLButtonElement>(
      `button[data-scale-value="${next}"]`,
    );
    btn?.focus();
  }

  function closeIntro() {
    setIsIntroOpen(false);
    window.sessionStorage.setItem(introKey, "1");
  }

  return (
    <>
      {isIntroOpen ? (
        <div className="modalOverlay" role="presentation">
          <div
            className="modalCard"
            role="dialog"
            aria-modal="true"
            aria-label={t.introModal.title}
          >
            <div className="modalHeader">
              <div className="modalTitle">{t.introModal.title}</div>
              <button
                type="button"
                className="iconButton"
                onClick={closeIntro}
                aria-label={t.introModal.ctaClose}
              >
                ✕
              </button>
            </div>

            <ul className="modalList">
              <li>{t.introModal.bullets.time}</li>
              <li>{t.introModal.bullets.privacy}</li>
              <li>{t.introModal.bullets.result}</li>
              <li>{t.introModal.bullets.disclaimer}</li>
            </ul>

            <div className="actions">
              <button type="button" className="buttonPrimary" onClick={closeIntro}>
                {t.introModal.ctaStart}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <section className="card" aria-label={t.progress.label}>
        <div className="progressTop">
          <div className="progressLabel">
            {t.progress.label}: {answeredCount}/{total}
          </div>
          <div className="progressMeta">
            {total > 0 ? `${progressPct}%` : "—"}
          </div>
        </div>
        <div className="progressBar" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
          <div className="progressFill" style={{ width: `${progressPct}%` }} />
        </div>
        <div className="progressActions">
          <button
            type="button"
            className="linkButton"
            onClick={() => setIsIntroOpen(true)}
          >
            {t.introModal.openInfo}
          </button>
        </div>
      </section>

      <section className="card testQuestionCard" aria-label={t.card.title}>
        <div className="cardHeader">
          <div className="cardHeaderRow">
            <div>{t.card.title}</div>
            <div className="cardHeaderMeta">{questionNumberText}</div>
          </div>
        </div>

        <div className="questionBlock" aria-live="polite">
          <div className="questionLabel">{t.card.questionLabel}</div>
          <div key={question?.id ?? "empty"} className="questionText questionSwap">
            {question ? question.text : "—"}
          </div>
        </div>

        <div
          ref={scaleRef}
          className="scale scaleSegmented"
          role="radiogroup"
          aria-label={t.scale.ariaLabel}
          onKeyDown={handleScaleKeyDown}
        >
          {([1, 2, 3, 4, 5] as const).map((value, idx) => {
            const selected = currentAnswer === value;
            const label = t.scale.labels[idx];
            return (
              <button
                key={value}
                type="button"
                className={
                  selected
                    ? "scaleOption scaleOptionActive"
                    : "scaleOption"
                }
                role="radio"
                aria-checked={selected}
                aria-label={`${value} — ${label}`}
                onClick={() => setAnswer(value)}
                disabled={!question}
                data-scale-value={value}
              >
                <div className="scaleValue">{value}</div>
                <div className="scaleLabel">{label}</div>
              </button>
            );
          })}
        </div>
        <div className="scaleGuide" aria-hidden="true" />
        <div className="scaleEnds" aria-hidden="true">
          <div className="scaleEnd">{t.scale.leftLabel}</div>
          <div className="scaleEnd">{t.scale.rightLabel}</div>
        </div>

        <div className="actions actionsSpread">
          <button
            className="buttonSecondary"
            type="button"
            onClick={goBack}
            disabled={!canGoBack}
          >
            {t.actions.back}
          </button>

          {!isLast ? (
            <button
              className="buttonPrimary"
              type="button"
              onClick={goNext}
              disabled={!canGoNext}
            >
              {t.actions.next}
            </button>
          ) : (
            <button
              className="buttonPrimary"
              type="button"
              onClick={finish}
              disabled={!canFinish}
            >
              {t.actions.finish}
            </button>
          )}
        </div>
      </section>
    </>
  );
}

