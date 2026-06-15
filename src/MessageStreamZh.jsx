import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  AlertTriangle,
  Target,
  Calendar,
  Database,
  Check,
  X,
  ArrowUpRight,
  Send,
  Search,
  MoreHorizontal,
  Clock,
  ChevronsRight,
  FlaskConical,
  FileText,
  CornerUpRight,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  DollarSign,
  ClipboardCheck,
  Layers,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   消息流形态 · 飞书皮肤
   客户接触面的默认入口:AI 运营副总进客户群,推 + 问双模式,零新界面。
   主轴是闭环时间轴 — 同一条决策从告警走到出分、归因、写入经验库。
   「时间推进」把决策日(6/1)跳到出分日(6/15),让读者看懂判定线锁定即不可改判。
   内容取材 abc-mock 五场景,人物 ABC Home Goods / Maya / Devon / CMO。
   ────────────────────────────────────────────────────────────────────────── */

const GROUP = {
  name: "ABC Home Goods · AI 运营",
  subtitle: "AI 拿主意 · 专家把关 · 判定线随每条建议锁定",
  members: [
    { id: "agent", label: "AI", tone: "emerald" },
    { id: "cmo", label: "CMO", tone: "slate" },
    { id: "maya", label: "MC", tone: "slate" },
    { id: "devon", label: "DP", tone: "slate" },
  ],
};

const VIEWER = "maya"; // 当前以 Maya Chen(电商副总)身份查看

/* ── 原子 ─────────────────────────────────────────────────────────────────── */

function Avatar({ kind }) {
  if (kind === "agent") {
    return (
      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
        <Sparkles size={16} className="text-white" />
      </div>
    );
  }
  const map = {
    maya: "MC",
    devon: "DP",
    cmo: "CMO",
  };
  return (
    <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
      <span className="text-11 font-semibold text-slate-600">{map[kind]}</span>
    </div>
  );
}

function MetaRow({ name, tag, time }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xs font-semibold text-slate-700">{name}</span>
      {tag && (
        <span className="text-10 px-1 py-px rounded bg-emerald-50 text-emerald-700 font-medium">
          {tag}
        </span>
      )}
      <span className="text-10 text-slate-400 font-mono">{time}</span>
    </div>
  );
}

// 一条消息。side 决定左右(当前查看者在右)。
function Row({ from, name, tag, time, children }) {
  const right = from === VIEWER;
  return (
    <div
      className={`flex gap-2.5 ${right ? "flex-row-reverse" : "flex-row"} mb-5`}
    >
      <Avatar kind={from} />
      <div
        className={`flex flex-col ${right ? "items-end" : "items-start"} max-w-[78%] min-w-0`}
      >
        {!right && <MetaRow name={name} tag={tag} time={time} />}
        {right && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-10 text-slate-400 font-mono">{time}</span>
            <span className="text-xs font-semibold text-slate-700">{name}</span>
          </div>
        )}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

// 普通气泡(纯文本)。
function Bubble({ right, children }) {
  return (
    <div
      className={`inline-block rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
        right
          ? "bg-emerald-600 text-white rounded-tr-sm"
          : "bg-white border border-slate-200 text-slate-700 rounded-tl-sm"
      }`}
    >
      {children}
    </div>
  );
}

function Btn({ tone = "primary", onClick, disabled, icon: Icon, children }) {
  const tones = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700 disabled:bg-emerald-600/60",
    ghost:
      "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50",
    amber:
      "bg-amber-500 text-white hover:bg-amber-600",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:cursor-default ${tones[tone]}`}
    >
      {Icon && <Icon size={13} />}
      {children}
    </button>
  );
}

function Confidence({ value }) {
  return (
    <span className="text-10 text-slate-500">
      把握度{" "}
      <span className="font-mono font-semibold text-slate-700">{value}%</span>
    </span>
  );
}

// 判定线 — load-bearing。三样写死:什么算对 / 哪天出分 / 数据口径。
function JudgeLine({ correct, scoreDate, basis }) {
  const rows = [
    { icon: Target, k: "什么算对", v: correct },
    { icon: Calendar, k: "出分日", v: scoreDate },
    { icon: Database, k: "数据口径", v: basis },
  ];
  return (
    <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/60 overflow-hidden">
      <div className="px-3 py-1.5 bg-emerald-100/60 border-b border-emerald-200 flex items-center gap-1.5">
        <ClipboardCheck size={12} className="text-emerald-700" />
        <span className="text-10 font-semibold text-emerald-800 tracking-wide">
          判定线 · 发出即锁定,到期系统自动判,人工不可改判
        </span>
      </div>
      <div className="divide-y divide-emerald-100">
        {rows.map((r) => (
          <div key={r.k} className="flex gap-2 px-3 py-2">
            <r.icon size={13} className="text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-10 text-emerald-700 font-medium">{r.k}</div>
              <div className="text-xs text-slate-700 leading-relaxed">{r.v}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 卡片外壳。accent 给左边色条。
function CardShell({ accent = "slate", children }) {
  const bar = {
    emerald: "border-l-emerald-500",
    amber: "border-l-amber-500",
    rose: "border-l-rose-500",
    slate: "border-l-slate-300",
    blue: "border-l-blue-500",
  };
  return (
    <div
      className={`rounded-xl border border-slate-200 border-l-4 ${bar[accent]} bg-white shadow-sm overflow-hidden`}
    >
      {children}
    </div>
  );
}

function CardHead({ kicker, title, accent = "slate", icon: Icon }) {
  const kc = {
    emerald: "text-emerald-700",
    amber: "text-amber-700",
    rose: "text-rose-700",
    slate: "text-slate-500",
    blue: "text-blue-700",
  };
  return (
    <div className="px-3.5 pt-3 pb-2">
      <div className={`flex items-center gap-1.5 text-10 font-medium ${kc[accent]}`}>
        {Icon && <Icon size={12} />}
        {kicker}
      </div>
      <div className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">
        {title}
      </div>
    </div>
  );
}

// 点开才出现的链接页:重内容收在展开里,即问即抛。
function Reveal({ label, open, onToggle, children }) {
  return (
    <div className="mt-2">
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
      >
        {open ? <ChevronUp size={13} /> : <ArrowUpRight size={13} />}
        {open ? "收起" : label}
      </button>
      {open && (
        <div className="mt-2 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 leading-relaxed space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, note, tone = "slate" }) {
  const vc = {
    slate: "text-slate-900",
    emerald: "text-emerald-700",
    rose: "text-rose-700",
  };
  return (
    <div>
      <div className="text-10 text-slate-500">{label}</div>
      <div className={`text-sm font-mono font-semibold ${vc[tone]}`}>{value}</div>
      {note && <div className="text-10 text-slate-400 mt-px">{note}</div>}
    </div>
  );
}

/* ── 主组件 ───────────────────────────────────────────────────────────────── */

export default function MessageStreamZh() {
  const [approved, setApproved] = useState(false);
  const [transferred, setTransferred] = useState(false);
  const [testOpen, setTestOpen] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [reveal, setReveal] = useState({});
  const bottomRef = useRef(null);

  const toggle = (id) => setReveal((r) => ({ ...r, [id]: !r[id] }));

  // 初次进入停在顶部(从告警读起);任一操作发生后才滚到底。
  // 用状态本身判定,避免 StrictMode 双调用在挂载时误滚。
  useEffect(() => {
    if (approved || transferred || advanced || testOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [approved, transferred, advanced, testOpen]);

  return (
    <div className="h-full flex flex-col bg-slate-100 font-sans">
      <StyleScope />

      {/* 飞书群顶栏 */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <Sparkles size={17} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900 truncate">
                {GROUP.name}
              </span>
              <span className="text-10 px-1 py-px rounded bg-slate-100 text-slate-500">
                群 · 4
              </span>
            </div>
            <div className="text-10 text-slate-400 truncate">{GROUP.subtitle}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400 flex-shrink-0">
          <div className="flex -space-x-1.5">
            {GROUP.members.map((m) => (
              <div
                key={m.id}
                className={`w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                  m.tone === "emerald" ? "bg-emerald-600" : "bg-slate-300"
                }`}
                title={m.id}
              >
                <span
                  className={`text-10 font-semibold ${
                    m.tone === "emerald" ? "text-white" : "text-slate-600"
                  }`}
                >
                  {m.label}
                </span>
              </div>
            ))}
          </div>
          <Search size={16} />
          <MoreHorizontal size={16} />
        </div>
      </header>

      {/* 消息流 */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <DayDivider label="6 月 1 日 周日" />

          {/* 1 · 告警 推 */}
          <Row from="agent" name="AI 运营副总" tag="机器人" time="09:12">
            <CardShell accent="rose">
              <CardHead
                accent="rose"
                icon={AlertTriangle}
                kicker="告警 · 时间敏感 · 建议今天 / 明天决策"
                title="床架 SKU-117 · 自然位被对位抢占"
              />
              <div className="px-3.5 pb-3 text-sm text-slate-700 leading-relaxed">
                昨天 NightFox Bedding 开始在我们床架的 7 个核心词上集中抬 bid,今天盯了一天没回落,这不是临时引流。他们还挂了 18% 折扣券,我判断是冲着旺季前的自然位来的。今天上反击能正面对位 5 天,拖到周三只剩 2 天,份额丢了要 4 到 6 个月才补得回来。
              </div>
            </CardShell>
          </Row>

          {/* 2 · 决策卡 执行态(带审批键 + 判定线) */}
          <Row from="agent" name="AI 运营副总" tag="机器人" time="09:13">
            <CardShell accent="emerald">
              <CardHead
                accent="emerald"
                icon={Target}
                kicker="决策卡 · 可执行 · 三态:执行"
                title="对位反击 · 7 个核心词跟价到 $329,叠加 15% 券对位 5 天"
              />
              <div className="px-3.5 text-sm text-slate-700 leading-relaxed">
                跟价守住 $329 下限,核心词 bid 对位 NightFox,叠 15% 券对冲他们的 18% 券。备选有"加注抢量"和"收缩让位",我排了对位反击,旺季前丢自然位的代价高过这 5 天的让利。
                <Reveal
                  label="查看完整分析(三姿态对比 + 流量测算)"
                  open={reveal.defense}
                  onToggle={() => toggle("defense")}
                >
                  <p>
                    对位反击:守自然位,让利 5 天约 1.8 个点毛利(示意),把份额风险压到最低。
                  </p>
                  <p>
                    加注抢量:bid 加 30% 抢曝光,短期 ACoS 冲到 41%,旺季前烧预算,放弃。
                  </p>
                  <p>
                    收缩让位:省广告费,但自然位 #2 大概率掉出 Top 3,恢复期 4 到 6 个月,放弃。
                  </p>
                </Reveal>
              </div>
              <div className="px-3.5">
                <JudgeLine
                  correct="14 天内自然位守住 Top 3,品类 SOV ≥ 18%,价格不破 $329 下限"
                  scoreDate="6 月 15 日 · 系统自动判,人工不可改判"
                  basis="Brand Analytics SOV 周快照 + 自然排名日快照;广告归因按 7 天点击窗口"
                />
              </div>
              <div className="px-3.5 py-3 flex items-center justify-between gap-2 border-t border-slate-100 mt-3">
                <Confidence value={73} />
                {approved ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <Check size={14} /> 已批准 · 判定线已锁定
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <Btn tone="ghost">改参数</Btn>
                    <Btn tone="primary" icon={Check} onClick={() => setApproved(true)}>
                      批准执行
                    </Btn>
                  </div>
                )}
              </div>
            </CardShell>
          </Row>

          {/* 用户批准后的回执 */}
          {approved && (
            <>
              <Row from="maya" name="Maya Chen" time="09:15">
                <Bubble right>按这个上,守住自然位优先。</Bubble>
              </Row>
              <Row from="agent" name="AI 运营副总" tag="机器人" time="09:15">
                <Bubble>
                  已执行并锁定判定线,6 月 15 日自动出分,中途不改判。出分前每天盯自然位和 SOV,破线会提前告警。
                </Bubble>
              </Row>
            </>
          )}

          {/* 3 · 信息卡 团队上手(带转交键,无审批) */}
          <Row from="agent" name="AI 运营副总" tag="机器人" time="10:40">
            <CardShell accent="amber">
              <CardHead
                accent="amber"
                icon={FileText}
                kicker="信息卡 · 需团队上手 · 我执行不了"
                title="床架主图 6 张全是日间客厅,缺夜间卧室场景"
              />
              <div className="px-3.5 pb-3 text-sm text-slate-700 leading-relaxed">
                我看了下,NightFox 新主图换成了夜间卧室场景,点击率比我们高。改主图要品牌团队拍图上手,我做不了,先转给团队。这条不阻塞上面的反击。
                <Reveal
                  label="查看对比(我们 vs 竞品主图)"
                  open={reveal.creative}
                  onToggle={() => toggle("creative")}
                >
                  <p>我们:6 张主图均为日间客厅平铺,无场景人物。</p>
                  <p>NightFox:首图夜间卧室带灯光氛围,第 2 张床品细节特写。</p>
                  <p>建议补一张夜间卧室主图测点击率,口径:测 14 天 CTR 对比。</p>
                </Reveal>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-end gap-2 border-t border-slate-100">
                {transferred ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
                    <CornerUpRight size={14} /> 已转交品牌团队 · 抄送 Devon
                  </span>
                ) : (
                  <>
                    <Btn tone="ghost">稍后</Btn>
                    <Btn tone="amber" icon={CornerUpRight} onClick={() => setTransferred(true)}>
                      转交团队
                    </Btn>
                  </>
                )}
              </div>
            </CardShell>
          </Row>

          {/* 4 · 测试态卡(把握度不够,先测不硬上) */}
          <Row from="agent" name="AI 运营副总" tag="机器人" time="14:02">
            <CardShell accent="blue">
              <CardHead
                accent="blue"
                icon={FlaskConical}
                kicker="决策卡 · 三态:测试 · 把握度不够,先买答案"
                title="刮胡刀片定价阶段 2 · 三价格点 A/B"
              />
              <div className="px-3.5 pb-1 text-sm text-slate-700 leading-relaxed">
                手柄 7 天促销带动刀片绑定购买率 +2.4 到 +3.1pt,置信 72%。区间偏宽,定价我不硬给,先在三个价格点各跑到 ≥ 200 买家出分。阶段 1 的毛利下限已走你签字。
              </div>
              <div className="px-3.5 py-2">
                <JudgeLine
                  correct="三价格点各 ≥ 200 买家;选绑定购买率 × 贡献毛利最高的一档"
                  scoreDate="到量即判 · 预计 6 月 28 日前"
                  basis="刀片复购按 30 天窗口;刮胡刀 blended 毛利 = 刮胡刀 24% + 刀片 64% 加权"
                />
              </div>
              <div className="px-3.5 py-3 flex items-center justify-between gap-2 border-t border-slate-100">
                <Confidence value={72} />
                <div className="flex items-center gap-2">
                  <Btn tone="ghost" onClick={() => setTestOpen(true)}>
                    看测试设计
                  </Btn>
                  <Btn tone="primary" icon={Check} onClick={() => setTestOpen(true)}>
                    批准开测
                  </Btn>
                </div>
              </div>
              {testOpen && (
                <div className="px-3.5 pb-3 -mt-1">
                  <div className="rounded-lg bg-blue-50 border border-blue-200 p-2.5 text-xs text-slate-600">
                    已开测 · 三价格点分流上线,到量自动出分。这是买答案,不是先给结论。
                  </div>
                </div>
              )}
            </CardShell>
          </Row>

          {/* 5 · 用户提问 + 回复(问模式 · 边际回报排序) */}
          <Row from="maya" name="Maya Chen" time="16:20">
            <Bubble right>这周全渠道预算怎么分?</Bubble>
          </Row>
          <Row from="agent" name="AI 运营副总" tag="机器人" time="16:20">
            <CardShell accent="slate">
              <CardHead
                accent="slate"
                icon={TrendingUp}
                kicker="问 · 即时分析"
                title="按边际回报排,不平均分,不留默认 reserve"
              />
              <div className="px-3.5 pb-3 text-sm text-slate-700 leading-relaxed">
                下一块钱投在哪产出多就先投哪:
                <ul className="mt-1.5 space-y-1 text-xs">
                  <li>· Amazon SP 自然位防守:边际 ROAS 高,先加 $6K。</li>
                  <li>· Walmart 新铺货:边际偏低,本周持平,不追投。</li>
                  <li>· TikTok cost cap 测试:维持 $4K 不动,等增量测试出分再说。</li>
                </ul>
                <Reveal
                  label="查看完整分配表"
                  open={reveal.budget}
                  onToggle={() => toggle("budget")}
                >
                  <p>本周可调增量 $10K(示意),按边际 ROAS 降序分配,不设 reserve 桶。</p>
                  <p>Amazon SP 边际 ROAS 约 4.1(示意)&gt; Walmart 约 2.3 &gt; TikTok 待测。</p>
                  <p>TikTok 增量按地区对照测试衡量,出分前不追投。</p>
                </Reveal>
              </div>
            </CardShell>
          </Row>

          {/* ── 时间推进:跳到出分日 ── */}
          {!advanced ? (
            <div className="my-2 flex justify-center">
              <button
                onClick={() => setAdvanced(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 shadow-sm"
              >
                <ChevronsRight size={15} />
                时间推进到 6 / 15 出分日 · 看判定线自动结算
              </button>
            </div>
          ) : (
            <>
              <DayDivider label="6 月 15 日 周一 · 出分日" />

              {/* 6 · 自动出分(闭环:出分 → 归因 → 写入经验库) */}
              <Row from="agent" name="AI 运营副总" tag="机器人" time="08:00">
                <CardShell accent="emerald">
                  <CardHead
                    accent="emerald"
                    icon={ClipboardCheck}
                    kicker="判定线到期 · 系统自动结算 · 床架 SKU-117"
                    title="判对 · 自然位守住,份额没丢"
                  />
                  <div className="px-3.5 py-2 grid grid-cols-3 gap-3">
                    <Stat label="自然位" value="#2" note="守住 Top 3" tone="emerald" />
                    <Stat
                      label="品类 SOV"
                      value="19.4%"
                      note="目标 ≥ 18%"
                      tone="emerald"
                    />
                    <Stat label="价格" value="$329" note="未破下限" tone="emerald" />
                  </div>
                  <div className="px-3.5 pb-2 text-sm text-slate-700 leading-relaxed">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 mb-1">
                      <Check size={13} /> 把握度 73% 兑现
                    </span>
                    <div>
                      归因:对位反击 5 天 + 15% 券对冲了 NightFox 的 18% 券,他们抬价没换到自然位。这条已写入经验库:旺季前对位反击(累计成功 1 例)。
                    </div>
                  </div>
                </CardShell>
              </Row>

              {/* 7 · 周报 推 */}
              <Row from="agent" name="AI 运营副总" tag="机器人" time="08:30">
                <CardShell accent="slate">
                  <CardHead
                    accent="slate"
                    icon={Layers}
                    kicker="代运营周报 · 周一推送 · 不打扰"
                    title="本周 W24 操作统计"
                  />
                  <div className="px-3.5 py-2 grid grid-cols-3 gap-3">
                    <Stat label="自动出价调整" value="142 次" />
                    <Stat label="暂停低效词" value="17 个" />
                    <Stat label="判定线出分" value="3 条" note="2 对 1 错" />
                  </div>
                  <div className="px-3.5 pb-3">
                    <Reveal
                      label="展开看操作明细"
                      open={reveal.weekly}
                      onToggle={() => toggle("weekly")}
                    >
                      <p>当前演示版仅展示日报 / 周报的操作统计。</p>
                      <p>下一版开放逐次操作明细,可按 SKU / 广告组 / 操作类型过滤。</p>
                    </Reveal>
                  </div>
                </CardShell>
              </Row>

              {/* 8 · 月度对账(Tatum 点名的 game changer) */}
              <Row from="agent" name="AI 运营副总" tag="机器人" time="09:00">
                <div className="rounded-xl bg-slate-900 text-slate-100 shadow-sm overflow-hidden w-full">
                  <div className="px-3.5 pt-3 pb-2 border-b border-slate-700">
                    <div className="flex items-center gap-1.5 text-10 font-medium text-slate-400">
                      <ClipboardCheck size={12} />
                      月度对账 · 5 月 · 抄送 CMO
                    </div>
                    <div className="text-sm font-semibold mt-0.5">
                      把公司目标装进系统,替你对账
                    </div>
                  </div>
                  <div className="px-3.5 py-3 grid grid-cols-2 gap-y-3 gap-x-4">
                    <DarkStat label="发出判定 → 到期" value="18 → 12 条" />
                    <DarkStat
                      label="判对 / 判错"
                      value="9 / 3"
                      note="判对率 75%"
                      tone="emerald"
                    />
                    <DarkStat
                      label="实测增量贡献毛利"
                      value="+$14,200"
                      note="地区对照口径 · 示意 / 草案"
                      tone="emerald"
                    />
                    <DarkStat
                      label="产品线 TACoS"
                      value="21.4%"
                      note="目标 ≤ 22% · 达成"
                      tone="emerald"
                    />
                  </div>
                  <div className="px-3.5 pb-3 text-xs text-slate-300 leading-relaxed border-t border-slate-700 pt-2.5">
                    3 条判错已进归因队列,2 条定位到前提变化(TikTok 拉动品类流量形态,跟上线初期假设不一样了),对应经验已降级。落地灯 SKU-A 守 $189 那条到期判对,计入本月。
                  </div>
                </div>
              </Row>
            </>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* 底部输入(锁定,演示用) */}
      <footer className="flex-shrink-0 bg-white border-t border-slate-200 px-4 py-2.5">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 text-slate-400 text-sm">
            <span className="flex-1">随手问 AI 运营副总,或在群里发指令…</span>
            <Send size={15} />
          </div>
          <span className="text-10 text-slate-400 flex items-center gap-1">
            <Clock size={11} />
            演示版 · 对话预设
          </span>
        </div>
      </footer>
    </div>
  );
}

function DarkStat({ label, value, note, tone = "slate" }) {
  const vc = { slate: "text-white", emerald: "text-emerald-400" };
  return (
    <div>
      <div className="text-10 text-slate-400">{label}</div>
      <div className={`text-base font-mono font-semibold ${vc[tone]}`}>{value}</div>
      {note && <div className="text-10 text-slate-500 mt-px">{note}</div>}
    </div>
  );
}

function DayDivider({ label }) {
  return (
    <div className="flex items-center justify-center my-4">
      <span className="text-10 text-slate-400 bg-slate-200/70 px-2.5 py-1 rounded-full">
        {label}
      </span>
    </div>
  );
}

// 本组件独立渲染(工作台不挂载时),自带 text-10 / text-11 工具类。
function StyleScope() {
  return (
    <style>{`
      .text-10 { font-size: 10px; line-height: 14px; }
      .text-11 { font-size: 11px; line-height: 16px; }
    `}</style>
  );
}
