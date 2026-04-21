"use client";

import { useEffect, useState } from "react";
import type { AppDictionary } from "@/lib/i18n/types";

type Theme = "light" | "dark";

const THEME_KEY = "app:theme:v1";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return getSystemTheme();
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle({ dict }: { dict: AppDictionary }) {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="themeToggle"
      onClick={() => setTheme(nextTheme)}
      aria-label={dict.common.theme.toggleLabel}
      title={dict.common.theme.toggleLabel}
    >
      <span
        className="themeIcon"
        aria-hidden="true"
        suppressHydrationWarning
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}

