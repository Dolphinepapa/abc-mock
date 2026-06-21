import { useEffect, useState } from "react";
import AppEn from "./BrandOperationsAgentEn.jsx";
import AppZh from "./BrandOperationsAgentZh.jsx";
import MessageStreamZh from "./MessageStreamZh.jsx";
import MessageStreamEn from "./MessageStreamEn.jsx";
import { ROLE_IDS, DEFAULT_ROLE } from "./roles.js";

const LOCALE_KEY = "henry-mock-locale";
const ROLE_KEY = "henry-mock-role";
const FORM_KEY = "henry-mock-form";

// 客户接触面切换器 · 消息流(默认入口) ⇄ 工作台,带语言开关。
// 浮在两个形态之上,不改 18k 行的工作台文件。
function FormSwitcher({ form, setForm, locale, setLocale }) {
  const en = locale === "en";
  const tabs = en
    ? [
        { id: "stream", label: "Stream" },
        { id: "workbench", label: "Workbench" },
      ]
    : [
        { id: "stream", label: "消息流" },
        { id: "workbench", label: "工作台" },
      ];
  return (
    <div
      className="flex items-center gap-1 rounded-full pl-2.5 pr-1 py-1 bg-white/70 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-slate-900/5"
      style={{ boxShadow: "0 6px 24px -8px rgba(15,23,42,0.22)" }}
    >
        <div className="flex items-center gap-0.5 p-0.5 rounded-full bg-slate-100/70">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setForm(t.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                form === t.id
                  ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-900/5"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setLocale(en ? "zh" : "en")}
          className="ml-0.5 px-2.5 py-1 rounded-full text-10 font-medium text-slate-500 hover:bg-slate-100 transition-colors"
          title={en ? "切换中文" : "Switch to English"}
        >
          {en ? "中" : "EN"}
        </button>
    </div>
  );
}

export default function App() {
  const [locale, setLocale] = useState(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem(LOCALE_KEY) || "en";
  });

  const [currentRole, setCurrentRole] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_ROLE;
    const stored = window.localStorage.getItem(ROLE_KEY);
    return stored && ROLE_IDS.includes(stored) ? stored : DEFAULT_ROLE;
  });

  // 客户接触面 · 默认进消息流(memo:消息流优先)。
  const [form, setForm] = useState(() => {
    if (typeof window === "undefined") return "stream";
    const stored = window.localStorage.getItem(FORM_KEY);
    return stored === "workbench" || stored === "stream" ? stored : "stream";
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

  // Phase E · pattern revision state for the 3 Company-Brain entries.
  // status: 'pending' | 'challenged' | 'adopted' | 'held' | 'parked'
  // Adopted/parked revisions propagate to the Company Brain inspector
  // panel and (Phase F) the reference-precedent cards inside canvases.
  const [patternRevisions, setPatternRevisions] = useState({
    "pattern-brand-cpc": { status: "pending" },
    "playbook-peak-defense": { status: "pending" },
    "pattern-razor-pricing": { status: "pending" },
  });

  useEffect(() => {
    window.localStorage.setItem(LOCALE_KEY, locale);
    document.title =
      locale === "en"
        ? "henry · Brand Operations Agent"
        : "henry · 品牌运营助手";
  }, [locale]);

  useEffect(() => {
    window.localStorage.setItem(ROLE_KEY, currentRole);
  }, [currentRole]);

  useEffect(() => {
    window.localStorage.setItem(FORM_KEY, form);
  }, [form]);

  // Role switch forces a full remount so conversation list, canvas, and
  // inspector panel all reset to that role's default landing state
  // (spec Phase A.2). Locale is part of the key so language flips also
  // get a clean remount.
  const appKey = `${locale}-${currentRole}`;

  const workbench =
    locale === "en" ? (
      <AppEn
        key={appKey}
        locale={locale}
        setLocale={setLocale}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        proposalStates={proposalStates}
        setProposalStates={setProposalStates}
        patternRevisions={patternRevisions}
        setPatternRevisions={setPatternRevisions}
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
        patternRevisions={patternRevisions}
        setPatternRevisions={setPatternRevisions}
      />
    );

  const stream = locale === "en" ? <MessageStreamEn /> : <MessageStreamZh />;

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100">
      <div className="fixed top-2.5 left-1/2 -translate-x-1/2 z-[60]">
        <FormSwitcher
          form={form}
          setForm={setForm}
          locale={locale}
          setLocale={setLocale}
        />
      </div>
      <div className="h-full min-h-0">
        {form === "stream" ? stream : workbench}
      </div>
    </div>
  );
}
