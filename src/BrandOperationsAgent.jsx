import { useEffect, useState } from "react";
import AppEn from "./BrandOperationsAgentEn.jsx";
import AppZh from "./BrandOperationsAgentZh.jsx";

const STORAGE_KEY = "xnurta-mock-locale";

export default function App() {
  const [locale, setLocale] = useState(() => {
    if (typeof window === "undefined") return "zh";
    return window.localStorage.getItem(STORAGE_KEY) || "zh";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.title =
      locale === "en"
        ? "XNURTA · Brand Operations Agent"
        : "XNURTA · 品牌运营助手";
  }, [locale]);

  return locale === "en" ? (
    <AppEn locale={locale} setLocale={setLocale} />
  ) : (
    <AppZh locale={locale} setLocale={setLocale} />
  );
}
