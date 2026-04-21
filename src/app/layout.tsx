import "./globals.css";
import HtmlLang from "./ui/html-lang";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function () {
            try {
              var key = "app:theme:v1";
              var stored = localStorage.getItem(key);
              var theme = (stored === "light" || stored === "dark")
                ? stored
                : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
              document.documentElement.dataset.theme = theme;
              document.documentElement.style.colorScheme = theme;
            } catch (e) {}
          })();
        `}</Script>
        <HtmlLang />
        {children}
      </body>
    </html>
  );
}
