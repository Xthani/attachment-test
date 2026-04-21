"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import type { AttachmentTestResult } from "@/lib/attachment-test/types";
import {
  clearAttachmentDraft,
  clearAttachmentResult,
  loadAttachmentResultRaw,
} from "@/lib/attachment-test/storage";
import type { Locale } from "@/lib/i18n/locales";
import { getAttachmentInterpretation } from "@/lib/attachment-test/interpretation";
import { psychologistBranding } from "@/lib/branding";
import InstagramIcon from "../ui/instagram-icon";

export default function ResultScreen({
  locale,
  t,
}: {
  locale: Locale;
  t: {
    title: string;
    subtitle: string;
    emptyState: {
      title: string;
      subtitle: string;
      cta: string;
    };
    actions: {
      retake: string;
      toHome: string;
    };
    share: {
      copy: string;
      copied: string;
      copyAriaLabel: string;
    };
    sections: {
      overviewTitle: string;
      scalesTitle: string;
      disclaimerTitle: string;
      privacyTitle: string;
    };
    privacy: {
      note: string;
    };
    disclaimers: {
      text: string;
    };
    author: {
      title: string;
      body: string;
      instagramCta: string;
    };
  };
}) {
  const resultRaw: string | null = useSyncExternalStore(
    () => () => {},
    () => loadAttachmentResultRaw(),
    () => null,
  );

  const result: AttachmentTestResult | null = useMemo(() => {
    if (!resultRaw) return null;
    try {
      return JSON.parse(resultRaw) as AttachmentTestResult;
    } catch {
      return null;
    }
  }, [resultRaw]);

  function retake() {
    clearAttachmentDraft();
    clearAttachmentResult();
    window.location.assign(`/${locale}/test`);
  }

  const interpretation = result
    ? getAttachmentInterpretation(locale, result)
    : null;

  const shareText = useMemo(() => {
    if (!result || !interpretation) return "";
    const parts = [
      t.title,
      `${interpretation.styleLabel}`,
      "",
      interpretation.headline,
      interpretation.lead,
      "",
      interpretation.meaning,
    ];
    return parts.filter(Boolean).join("\n");
  }, [interpretation, result, t.title]);

  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");

  async function copyResultText() {
    if (!shareText) return;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1200);
    } catch {
      // Fallback: do nothing (clipboard may be blocked).
    }
  }

  return (
    <>
      <h1 className="title">{t.title}</h1>
      <p className="subtitle">{t.subtitle}</p>

      {!result ? (
        <section className="card" aria-label={t.emptyState.title}>
          <div className="cardHeader">{t.emptyState.title}</div>
          <p className="subtitle">{t.emptyState.subtitle}</p>
          <div className="actions">
            <Link className="buttonPrimary" href={`/${locale}/test`}>
              {t.emptyState.cta}
            </Link>
            <Link className="buttonSecondary" href={`/${locale}`}>
              {t.actions.toHome}
            </Link>
          </div>
        </section>
      ) : (
        <>
          <section className="card heroCard" aria-label={t.sections.overviewTitle}>
            <div className="heroTop">
              <div className="pill">{interpretation!.styleLabel}</div>
              <button
                type="button"
                className="iconButton copyButton"
                onClick={copyResultText}
                aria-label={t.share.copyAriaLabel}
                title={copyState === "copied" ? t.share.copied : t.share.copy}
              >
                <span aria-hidden="true">
                  {copyState === "copied" ? "✓" : "⧉"}
                </span>
                <span className="srOnly" role="status" aria-live="polite">
                  {copyState === "copied" ? t.share.copied : ""}
                </span>
              </button>
            </div>

            <h2 className="heroTitle">{interpretation!.headline}</h2>
            <p className="heroLead">{interpretation!.lead}</p>
            <p className="heroText">{interpretation!.meaning}</p>
          </section>

          <section className="card" aria-label={t.sections.scalesTitle}>
            <div className="cardHeader">{t.sections.scalesTitle}</div>

            <div className="scaleGrid">
              <div className="scaleCard" aria-label={interpretation!.anxiety.title}>
                <div className="scaleCardTitle">{interpretation!.anxiety.title}</div>
                <div className="scaleMetaRow">
                  <div className="scaleMeta">
                    {interpretation!.anxiety.averageLabel}:{" "}
                    <strong>{interpretation!.anxiety.averageValueText}</strong>
                  </div>
                  <div className="scaleMeta">{interpretation!.anxiety.levelLabel}</div>
                </div>
                <div className="meter" aria-hidden="true">
                  <div
                    className="meterFill"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, ((result.anxietyAvg - 1) / 4) * 100),
                      )}%`,
                    }}
                  />
                </div>
                <p className="note">{interpretation!.anxiety.description}</p>
              </div>

              <div
                className="scaleCard"
                aria-label={interpretation!.avoidance.title}
              >
                <div className="scaleCardTitle">{interpretation!.avoidance.title}</div>
                <div className="scaleMetaRow">
                  <div className="scaleMeta">
                    {interpretation!.avoidance.averageLabel}:{" "}
                    <strong>{interpretation!.avoidance.averageValueText}</strong>
                  </div>
                  <div className="scaleMeta">{interpretation!.avoidance.levelLabel}</div>
                </div>
                <div className="meter" aria-hidden="true">
                  <div
                    className="meterFill"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, ((result.avoidanceAvg - 1) / 4) * 100),
                      )}%`,
                    }}
                  />
                </div>
                <p className="note">{interpretation!.avoidance.description}</p>
              </div>
            </div>

            <p className="note">{interpretation!.closing}</p>
          </section>

          <section className="card" aria-label={t.sections.disclaimerTitle}>
            <div className="cardHeader">{t.sections.disclaimerTitle}</div>
            <p className="subtitle">{t.disclaimers.text}</p>
          </section>

          <section className="card" aria-label={t.author.title}>
            <div className="cardHeader">{t.author.title}</div>
            <p className="subtitle">{t.author.body}</p>
            <div className="actions">
              <Link
                className="buttonSecondary instagramButton"
                href={psychologistBranding.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon title="Instagram" />
                {t.author.instagramCta} {psychologistBranding.instagramHandle}
              </Link>
            </div>
          </section>

          <section className="card" aria-label={t.sections.privacyTitle}>
            <div className="cardHeader">{t.sections.privacyTitle}</div>
            <p className="subtitle">{t.privacy.note}</p>
            <div className="actions">
              <Link className="buttonSecondary" href={`/${locale}`}>
                {t.actions.toHome}
              </Link>
              <button className="buttonPrimary" type="button" onClick={retake}>
                {t.actions.retake}
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
}

