import type { AppDictionary } from "../types";

export const en: AppDictionary = {
  common: {
    appName: "Attachment test",
    nav: {
      label: "Navigation",
      home: "Home",
      test: "Test",
      result: "Result",
    },
    language: {
      label: "Language",
      ru: "Русский",
      en: "English",
    },
    theme: {
      toggleLabel: "Theme",
      light: "Light",
      dark: "Dark",
    },
    author: {
      preparedBy: "Questionnaire prepared by",
      instagram: "Instagram",
      consultHint:
        "If you'd like to explore the result more deeply, a personal consultation is usually the best format.",
    },
  },
  home: {
    title: "Attachment style check-in",
    subtitle:
      "A short questionnaire that gently reflects patterns of closeness and distance that feel most familiar in relationships right now.",
    actions: {
      startTest: "Start",
      openResult: "Open result",
    },
    authorCard: {
      title: "Author",
    },
  },
  test: {
    title: "Test",
    subtitle: "Answer 12 statements using the 1–5 scale.",
    progress: {
      label: "Progress",
    },
    microcopy: {
      time: "Usually takes about 2–4 minutes.",
      privacyShort: "Your answers stay in this browser while you take the test.",
    },
    introModal: {
      title: "Before you start",
      bullets: {
        time: "Usually takes about 2–4 minutes.",
        privacy: "Your answers stay in this browser and are not automatically sent to a server.",
        result: "At the end, you’ll get a gentle result across two scales.",
        disclaimer: "This isn’t a diagnosis and doesn’t replace professional support.",
      },
      ctaStart: "Start",
      ctaClose: "Close",
      openInfo: "About this test & privacy",
    },
    card: {
      title: "Question",
      questionLabel: "Statement",
      questionNumber: "Question",
    },
    scale: {
      labels: [
        "Not like me at all",
        "Mostly not like me",
        "Partly like me",
        "Mostly like me",
        "Very much like me",
      ],
      leftLabel: "Not like me at all",
      rightLabel: "Very much like me",
      ariaLabel: "1–5 scale",
    },
    actions: {
      back: "Back",
      next: "Next",
      finish: "Finish",
      toResult: "View result",
    },
    disclaimers: {
      privacy:
        "Your answers stay in this browser while you complete the test.",
    },
  },
  result: {
    title: "Result",
    subtitle:
      "This result reflects likely patterns of closeness and distance at this point in time.",
    emptyState: {
      title: "No result yet",
      subtitle: "It looks like you haven't finished the test in this browser.",
      cta: "Start the test",
    },
    actions: {
      retake: "Retake",
      toHome: "Home",
    },
    share: {
      copy: "Copy",
      copied: "Copied",
      copyAriaLabel: "Copy result text",
    },
    sections: {
      overviewTitle: "Summary",
      scalesTitle: "Scales",
      disclaimerTitle: "Important",
      privacyTitle: "Privacy",
    },
    privacy: {
      note:
        "Your answers and result stay in this browser and are not automatically sent to a server.",
    },
    disclaimers: {
      text:
        "This test is not a diagnosis and doesn’t replace professional support. It highlights general tendencies and can be a gentle starting point for reflection or a conversation with a psychologist.",
    },
    author: {
      title: "Author & support",
      body:
        "If you’d like to talk through your result calmly and in more depth, you can do that in a personal session with a psychologist.",
      instagramCta: "Open Instagram profile",
    },
  },
};

