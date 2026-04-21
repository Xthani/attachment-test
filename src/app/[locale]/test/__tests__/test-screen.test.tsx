import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestScreen from "../test-screen";
import type { AttachmentQuestion } from "@/lib/attachment-test/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

function makeT() {
  return {
    title: "Test",
    subtitle: "Subtitle",
    progress: { label: "Progress" },
    microcopy: {
      time: "2–4 minutes",
      privacyShort: "Stored locally",
    },
    introModal: {
      title: "Before you start",
      bullets: {
        time: "time",
        privacy: "privacy",
        result: "result",
        disclaimer: "disclaimer",
      },
      ctaStart: "Start",
      ctaClose: "Close",
      openInfo: "Info",
    },
    card: {
      title: "Question",
      questionLabel: "Statement",
      questionNumber: "Question",
    },
    scale: {
      labels: ["1", "2", "3", "4", "5"] as [string, string, string, string, string],
      leftLabel: "Left",
      rightLabel: "Right",
    },
    actions: {
      back: "Back",
      next: "Next",
      finish: "Finish",
      toResult: "To result",
    },
    disclaimers: { privacy: "privacy" },
  };
}

describe("TestScreen (component)", () => {
  it("disables Next until an answer is selected", async () => {
    const user = userEvent.setup();
    const questions: AttachmentQuestion[] = [
      { id: "anxiety-1", scale: "anxiety", text: "Q1" },
      { id: "anxiety-2", scale: "anxiety", text: "Q2" },
    ];

    render(<TestScreen locale="en" t={makeT()} questions={questions} />);

    const next = screen.getByRole("button", { name: /next/i });
    expect(next).toBeDisabled();

    await user.click(screen.getByRole("radio", { name: /3 —/i }));
    expect(next).toBeEnabled();
  });

  it("keeps answer when navigating back", async () => {
    const user = userEvent.setup();
    const questions: AttachmentQuestion[] = [
      { id: "anxiety-1", scale: "anxiety", text: "Q1" },
      { id: "anxiety-2", scale: "anxiety", text: "Q2" },
    ];

    render(<TestScreen locale="en" t={makeT()} questions={questions} />);

    await user.click(screen.getByRole("radio", { name: /4 —/i }));
    await user.click(screen.getByRole("button", { name: /next/i }));

    await user.click(screen.getByRole("button", { name: /back/i }));
    expect(screen.getByRole("radio", { name: /4 —/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });
});

