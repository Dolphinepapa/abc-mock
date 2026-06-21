import { Sparkles, Scale, Target, Brain, ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   产品封面 · 给投资人/用户的第一屏
   讲清楚 henry 是什么、解决什么问题。飞轮主打 + 3 能力点。
   文案取材奇绩 BP,operator voice,无营销词,带"基于真实案例的 Demo"诚实声明。
   ────────────────────────────────────────────────────────────────────────── */

const COPY = {
  zh: {
    eyebrow: "品牌运营助手 · Brand Operations Agent",
    headlineA: "会运营,而且",
    headlineAccent: "越用越准",
    headlineB: "。",
    sub: "给年销百万美金以上的 Amazon 品牌的 AI 运营副总。每个判断都被真实结局验证、沉淀成你公司自己的运营大脑——换服务商也带不走。",
    problemLabel: "它解决什么",
    problem:
      "百万级品牌的运营,值钱的是判断:该冲排名还是收毛利、该不该加广告、哪个值得测。这种判断今天只能靠养一个强运营,或每月花数千美金请代运营——又慢又贵,经验还留不到你这。",
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
    cta: "进入 Demo",
    honest:
      "基于真实运营案例的交互式 Demo,用于演示产品逻辑,非实时运行系统。",
    enterAria: "进入 Demo",
  },
  en: {
    eyebrow: "Brand Operations Agent",
    headlineA: "Runs your ops — and gets ",
    headlineAccent: "sharper every time",
    headlineB: ".",
    sub: "An AI operations lead for Amazon brands doing $1M+ a year. Every call is checked against the real outcome and compounds into your company's own operating brain — one a new agency can't take with them.",
    problemLabel: "What it solves",
    problem:
      "For a million-dollar brand, the value is in the judgment: push for rank or harvest margin, add ad spend or not, what's worth testing. Today that only comes from a senior operator or an agency — slow, expensive, and the know-how never stays with you.",
    caps: [
      {
        icon: Scale,
        title: "Judgment, not just ad tuning",
        body: "First it judges the lifecycle stage (launch / scale / steady / clearance) and the goal worth chasing, then decides whether to move price, ads, or the listing. Competitors only turn knobs inside the ad account — they can't see the whole P&L.",
      },
      {
        icon: Target,
        title: "The hard part is written down, scored on a date",
        body: "Every recommendation ships with a decision line: what counts as right, when it scores, on what basis. Locked on send — no changing the basis after. Not confident enough? It runs a designed test instead of guessing.",
      },
      {
        icon: Brain,
        title: "Sharper with use, the record is yours",
        body: "Right calls go in the file; wrong ones get an open post-mortem and become new rules. Conclusions carry their premises into the Company Brain, locked in your own file.",
      },
    ],
    cta: "Enter demo",
    honest:
      "An interactive demo built on real operating cases — to show the product logic, not a live system.",
    enterAria: "Enter demo",
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

          {/* headline */}
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight max-w-3xl">
            {t.headlineA}
            <span className="text-emerald-600">{t.headlineAccent}</span>
            {t.headlineB}
          </h1>

          {/* sub */}
          <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            {t.sub}
          </p>

          {/* problem */}
          <div className="mt-7 max-w-2xl rounded-2xl bg-white ring-1 ring-slate-900/5 shadow-sm px-5 py-4">
            <div className="text-10 font-semibold tracking-wide text-slate-400 uppercase">
              {t.problemLabel}
            </div>
            <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{t.problem}</p>
          </div>

          {/* 3 capability points */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
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

          {/* CTA */}
          <div className="mt-9 flex items-center gap-4 flex-wrap">
            <button
              onClick={onEnter}
              aria-label={t.enterAria}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all duration-200 active:scale-95 shadow-sm"
            >
              {t.cta}
              <ArrowRight size={16} />
            </button>
            <span className="text-xs text-slate-400 max-w-md leading-relaxed">{t.honest}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
