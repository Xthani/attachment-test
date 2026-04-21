"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isLocale } from "@/lib/i18n/locales";

export default function HtmlLang() {
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    const parts = pathname.split("/").filter(Boolean);
    const locale = parts[0] && isLocale(parts[0]) ? parts[0] : "ru";
    document.documentElement.lang = locale;
  }, [pathname]);

  return null;
}

