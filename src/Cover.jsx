import { Sparkles, Scale, Target, Brain, ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   产品封面 · 给投资人/用户的第一屏
   PMM 原则:先 clarity(品类+对象+job),再 differentiation(飞轮/判定线)。
   H1 陈述品类,过 5 秒 grunt test;子标题用 operator 自己的语言把 job 说具体;
   飞轮和判定线降为"为什么不是又一个广告工具"的支撑点。
   文案取材奇绩 BP,operator voice,无营销词,带"基于真实案例的 Demo"诚实声明。
   ────────────────────────────────────────────────────────────────────────── */

const COPY = {
  zh: {
    eyebrow: "AI 运营副总 · Amazon 品牌",
    h1pre: "替你的 Amazon 品牌做",
    h1accent: "运营决策",
    h1post: "的 AI。",
    levers:
      "该降价、加广告、改页面,还是补货?henry 先判断,用小实验验证,方案你一句话拍板它执行。",
    who: "给年销百万美金以上 Amazon 品牌的 AI 运营副总。每个判断都被真实结局验证、沉淀成你公司自己的运营大脑——越用越准,换服务商也带不走。",
    cta: "进入 Demo",
    honest: "基于真实运营案例的交互式 Demo,用于演示产品逻辑,非实时运行系统。",
    diffLabel: "为什么不是又一个广告工具",
    caps: [
      {
        icon: Scale,
        title: "做判断,不只是投广告",
        body: "先判断产品在哪个生命周期(新品 / 拉升 / 稳定 / 清仓)、该追什么目标,再决定动价格、广告还是 listing。对手只在广告账户里拧旋钮,看不到整盘账。",
      },
      {
        icon: Target,
        title: "先把丑话写死,到期自动出分",
        body: "每条建议都带判定线:什么算对、哪天出分、按什么口径。发出即锁、事后不许改口径。把握不够就先跑一个设计好的小实验,不硬答。",
      },
      {
        icon: Brain,
        title: "越用越准,记录归你",
        body: "对了进档案,错了公开复盘、长成新规则。结论带着前提沉进 Company Brain,锁在你自己的档案里,越用越厚。",
      },
    ],
  },
  en: {
    eyebrow: "AI Operations Lead · for Amazon brands",
    h1pre: "The AI that makes ",
    h1accent: "operating decisions",
    h1post: " for your Amazon brand.",
    levers:
      "Cut price, add ads, fix the listing, or restock? henry makes the call first, proves it with a small test, and you approve it in one word.",
    who: "An AI operations lead for Amazon brands doing $1M+ a year. Every call is checked against the real outcome and compounds into your company's own operating brain — sharper every time, and a new agency can't take it with them.",
    cta: "Enter demo",
    honest:
      "An interactive demo built on real operating cases — to show the product logic, not a live system.",
    diffLabel: "Why it's not just another ad tool",
    caps: [
      {
        icon: Scale,
        title: "Judgment, not just ad tuning",
        body: "First it judges the lifecycle stage (launch / scale / steady / clearance) and the goal worth chasing, then decides whether to move price, ads, or the listing. Competitors only turn knobs inside the ad account — they can't see the whole P&L.",
      },
      {
        icon: Target,
        title: "The call is written down first, scored on a date",
        body: "Every recommendation ships with a decision line: what counts as right, when it scores, on what basis. Locked on send — no changing the basis after. Not confident enough? It runs a designed test instead of guessing.",
      },
      {
        icon: Brain,
        title: "Sharper with use — the record is yours",
        body: "Right calls go in the file; wrong ones get an open post-mortem and become new rules. Conclusions carry their premises into the Company Brain, locked in your own file.",
      },
    ],
  },
};

export default function Cover({ locale, setLocale, onEnter }) {
  const en = locale === "en";
  const t = en ? COPY.en : COPY.zh;

  return (
    <div className="h-screen w-screen overflow-y-auto bg-slate-50 text-slate-900 font-sans">
      <style>{`
        .text-10 { font-size: 10px; line-height: 14px; }
        .text-11 { font-size: 11px; line-height: 16px; }
      `}</style>

      {/* 语言切换 */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setLocale(en ? "zh" : "en")}
          className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-500 bg-white/70 backdrop-blur-xl ring-1 ring-slate-900/5 hover:text-slate-700 transition-colors"
          title={en ? "切换中文" : "Switch to English"}
        >
          {en ? "中" : "EN"}
        </button>
      </div>

      <div className="min-h-full flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-4xl">
          {/* wordmark */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight leading-none">henry</div>
              <div className="text-10 text-slate-400 mt-1">{t.eyebrow}</div>
            </div>
          </div>

          {/* H1 · 陈述品类 */}
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
            {t.h1pre}
            <span className="text-emerald-600">{t.h1accent}</span>
            {t.h1post}
          </h1>

          {/* job 说具体 · operator 自己的语言 */}
          <p className="mt-5 text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl">
            {t.levers}
          </p>

          {/* who + 飞轮(支撑) */}
          <p className="mt-3.5 text-base text-slate-500 leading-relaxed max-w-2xl">
            {t.who}
          </p>

          {/* CTA */}
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <button
              onClick={onEnter}
              aria-label={t.cta}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all duration-200 active:scale-95 shadow-sm"
            >
              {t.cta}
              <ArrowRight size={16} />
            </button>
            <span className="text-xs text-slate-400 max-w-md leading-relaxed">{t.honest}</span>
          </div>

          {/* 为什么不是又一个广告工具 · 3 支撑点 */}
          <div className="mt-12">
            <div className="text-11 font-semibold tracking-wide text-slate-400 uppercase px-1">
              {t.diffLabel}
            </div>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {t.caps.map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl bg-white ring-1 ring-slate-900/5 shadow-sm p-5"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                    <c.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="mt-3 text-sm font-semibold text-slate-900 leading-snug">
                    {c.title}
                  </div>
                  <div className="mt-1.5 text-xs text-slate-600 leading-relaxed">{c.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
