export type AppDictionary = {
  common: {
    appName: string;
    nav: {
      label: string;
      home: string;
      test: string;
      result: string;
    };
    language: {
      label: string;
      ru: string;
      en: string;
    };
    theme: {
      toggleLabel: string;
      light: string;
      dark: string;
    };
    author: {
      preparedBy: string;
      instagram: string;
      consultHint: string;
    };
  };
  home: {
    title: string;
    subtitle: string;
    actions: {
      startTest: string;
      openResult: string;
    };
    authorCard: {
      title: string;
    };
  };
  test: {
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
  result: {
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
};

