import { useEffect, useState } from "react";
import AppEn from "./BrandOperationsAgentEn.jsx";
import AppZh from "./BrandOperationsAgentZh.jsx";
import { ROLE_IDS, DEFAULT_ROLE } from "./roles.js";

const LOCALE_KEY = "xnurta-mock-locale";
const ROLE_KEY = "xnurta-mock-role";

export default function App() {
  const [locale, setLocale] = useState(() => {
    if (typeof window === "undefined") return "zh";
    return window.localStorage.getItem(LOCALE_KEY) || "zh";
  });

  const [currentRole, setCurrentRole] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_ROLE;
    const stored = window.localStorage.getItem(ROLE_KEY);
    return stored && ROLE_IDS.includes(stored) ? stored : DEFAULT_ROLE;
  });

  // Phase D · CMO approval / challenge / rejection state.
  // Lifted here so it survives the locale+role remount (key includes both).
  // status: 'pending' | 'approved' | 'rejected' | 'challenged'
  // challenge: { text, submittedAt } when status === 'challenged'
  const [proposalStates, setProposalStates] = useState({
    strategy: { status: "pending", challenge: null, rejection: null },
    "razor-blade": {
      status: "pending",
      challenge: null,
      rejection: null,
    },
  });

  useEffect(() => {
    window.localStorage.setItem(LOCALE_KEY, locale);
    document.title =
      locale === "en"
        ? "XNURTA · Brand Operations Agent"
        : "XNURTA · 品牌运营助手";
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(ROLE_KEY, currentRole);
  }, [currentRole]);

  // Role switch forces a full remount so conversation list, canvas, and
  // inspector panel all reset to that role's default landing state
  // (spec Phase A.2). Locale is part of the key so language flips also
  // get a clean remount.
  const appKey = `${locale}-${currentRole}`;

  return locale === "en" ? (
    <AppEn
      key={appKey}
      locale={locale}
      setLocale={setLocale}
      currentRole={currentRole}
      setCurrentRole={setCurrentRole}
      proposalStates={proposalStates}
      setProposalStates={setProposalStates}
    />
  ) : (
    <AppZh
      key={appKey}
      locale={locale}
      setLocale={setLocale}
      currentRole={currentRole}
      setCurrentRole={setCurrentRole}
      proposalStates={proposalStates}
      setProposalStates={setProposalStates}
    />
  );
}
