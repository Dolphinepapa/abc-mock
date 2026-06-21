import { useState } from "react";
import {
  Sparkles,
  Search,
  MoreHorizontal,
  Lock,
  Send,
  Clock,
  ChevronUp,
  ArrowUpRight,
  Check,
  Package,
  Award,
  Boxes,
  TrendingDown,
  Receipt,
  FileText,
  Tag,
  Image as ImageIcon,
  ShieldCheck,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   消息流形态 · commerce 收件箱
   客户接触面的默认入口:AI 运营把夜里跑完的活摊成一个收件箱。
   按状态分组:待审批(等你拍板) / 已完成(已经做掉的)。
   每张卡带「平台 · 类别」,跨 Amazon Seller / Amazon Vendor / Walmart。
   批准后卡片移进已完成 + toast;敏感卡按权限遮罩。
   人物 ABC Home Goods / Maya / Devon。数字示意,内部自洽。
   ────────────────────────────────────────────────────────────────────────── */

const ROLE_META = {
  cmo: { name: "CMO", short: "CMO", desc: "监督 + 审批", clearance: "机密" },
  maya: {
    name: "Maya Chen",
    short: "Maya",
    desc: "产品线负责人 · 战略 / 毛利",
    clearance: "敏感",
  },
  devon: {
    name: "Devon Park",
    short: "Devon",
    desc: "执行 · 投放 / 日常",
    clearance: "内部",
  },
};
const ROLE_ORDER = ["cmo", "maya", "devon"];

const GROUP = {
  name: "ABC Home Goods · AI 运营",
  subtitle: "Amazon Seller · Vendor · Walmart",
};

/* ── pulse 指标 ─────────────────────────────────────────────────────────────── */
const PULSE = [
  { n: "$647,180", l: "本月销售额 · 3 渠道" },
  { n: "93.8%", l: "Buy Box 赢得率 · 昨日" },
  { n: "11 天", l: "最低可售天数 · 核心款" },
  { n: "168", l: "在管 SKU · 06:00 已巡检" },
];

/* ── 待审批 ─────────────────────────────────────────────────────────────────── */
const PENDING = [
  {
    id: "po",
    platform: "Amazon Vendor",
    cat: "采购订单",
    icon: Package,
    accent: "slate",
    route: "devon",
    title: "PO 8-3107 · 1,200 件,发货窗口 6 月 15–19 日",
    desc: "浴缸置物架 · SKU-204。当前产能接得下 1,140 件,缺的 60 件按产能原因报备,确认函已拟好。",
    evidence:
      "可售 462 + 在途 950 − 已占用 272 = 窗口内能发 1,140 件。点确认后直接提交 Vendor Central。",
    action: { label: "确认 PO", done: "已确认 · 1,140 件", toast: "PO 8-3107 已在 Vendor Central 确认。" },
  },
  {
    id: "bb",
    platform: "Amazon Seller",
    cat: "Buy Box",
    icon: Award,
    accent: "rose",
    route: "devon",
    sensitive: true,
    title: "凌晨 02:14 丢了 Buy Box · 餐板套装 SKU-312",
    desc: "HomeGoodsPlus 的 FBA 报价 $23.59,比我们低 $0.40。建议跟到 $23.49,没破利润底线;对方撤价就自动调回。",
    evidence:
      "02:14 的报价快照:只是被压价,listing 没动、也没被压制。$23.49 还在利润底线 $21.80 之上(按你录的采购成本算)。这次改价和回调条件都进了操作日志。",
    action: { label: "批准跟价", done: "已跟价 $23.49", toast: "价格已改,盯着 Buy Box 恢复。" },
  },
  {
    id: "inv",
    platform: "Amazon Seller",
    cat: "库存",
    icon: Boxes,
    accent: "amber",
    route: "devon",
    title: "核心款只够卖 11 天 · 补货周期要 21 天",
    desc: "浴缸置物架 · SKU-204 日销 42 件,在库 462。补货建议 1,008 件,按补货周期加 14 天安全库存算的。",
    evidence:
      "42 件/天 ×(21 + 14)天 − 在库 462 = 1,008 件。日销取近 14 天均值。下单仍在你们 ERP 里走。",
    action: { label: "批准补货计划", done: "计划已确认", toast: "已确认,补货清单发到运营邮箱了。" },
  },
  {
    id: "sov",
    platform: "Amazon Seller",
    cat: "市场",
    icon: TrendingDown,
    accent: "rose",
    route: "devon",
    title: "“浴缸置物架”声量份额掉了 7 个点 · 31% → 24%",
    desc: "这周两个竞品在这个词上加了 SP 投放,自然位没掉。防守方案:防守 campaign 里这个精准词竞价加 15%,预算从低 ACoS 的 campaign 挪 $40/天。",
    spark: [78, 81, 86, 81, 75, 67],
    evidence:
      "位次数据看,丢的全是付费首页首位,自然位是稳的。挪预算的两个 campaign 这周 ACoS 低于目标 9%,有富余。只动这一个精准词,预计 3 天份额回来,每天复核。",
    action: { label: "批准防守方案", done: "已生效", toast: "防守方案已生效。" },
  },
];

/* ── 已完成 ─────────────────────────────────────────────────────────────────── */
const DONE = [
  {
    id: "recover",
    platform: "Amazon Seller",
    cat: "回款",
    icon: Receipt,
    accent: "emerald",
    sensitive: true,
    title: "本周自动提了 3 笔索赔",
    ok: "追回 $1,284",
    desc: "本月累计 11 笔、$4,920。都赶在 60 天申诉窗口内提的,按你录的采购成本计价。",
    items: [
      { d: "#4471 · 移除订单运输丢失 · 12 × $38.00", v: "$456", st: "已到账" },
      { d: "#4472 · 已退款未退货 · 18 × $29.00", v: "$522", st: "待到账" },
      { d: "#4468 · FBA 费用多收(尺寸档位错了)", v: "$306", st: "已到账" },
    ],
  },
  {
    id: "chargeback",
    platform: "Amazon Vendor",
    cat: "扣款",
    icon: FileText,
    accent: "emerald",
    title: "两笔扣款已提争议",
    ok: "$1,086",
    desc: "发票和收货记录对过账,争议材料已从 Vendor Central 提交。",
    items: [
      { d: "PO 8-2241 短缺扣款 · 发票 480 件,实付 444 件 · 36 × $21.50", v: "$774", st: "待答复" },
      { d: "Chargeback · ASN 提交超时", v: "$312", st: "已返还" },
    ],
  },
  {
    id: "pricing",
    platform: "Amazon Seller",
    cat: "定价",
    icon: Tag,
    accent: "emerald",
    title: "标价手误,已改回 · 胡桃木杯垫套装 SKU-330",
    ok: "$3.60 → $36.00",
    desc: "挂价比核准价低了 90%,触发自动纠错(偏差超 50% 直接回滚),从出错到改回用了 4 分钟,记录在操作日志里。",
  },
  {
    id: "shelfA",
    platform: "Amazon Seller",
    cat: "数字货架",
    icon: ImageIcon,
    accent: "emerald",
    title: "主图被人改了 · 已恢复原版",
    desc: "浴缸置物架 · SKU-204。06:18 发现主图被第三方换掉,06:21 提交恢复,用的是你核准过的版本。",
    shots: [
      { label: "06:18 发现" },
      { label: "06:21 恢复", good: true },
    ],
  },
  {
    id: "shelfW",
    platform: "Walmart",
    cat: "数字货架",
    icon: ShieldCheck,
    accent: "emerald",
    title: "被压的 listing 已恢复 · 柚木淋浴凳 SKU-118",
    desc: "缺了必填属性“组装后重量”被平台压掉。07:02 补上提交,08:40 恢复在售。",
  },
];

/* ── 原子 ─────────────────────────────────────────────────────────────────── */

function StyleScope() {
  return (
    <style>{`
      .text-10 { font-size: 10px; line-height: 14px; }
      .text-11 { font-size: 11px; line-height: 16px; }
    `}</style>
  );
}

function Btn({ tone = "primary", onClick, icon: Icon, children }) {
  const tones = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    ghost: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50",
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 active:scale-95 ${tones[tone]}`}
    >
      {Icon && <Icon size={13} />}
      {children}
    </button>
  );
}

// 经办路由:这条该谁上手。
function RouteTag({ who }) {
  return (
    <span className="ml-auto text-10 text-slate-400">
      经 <span className="text-slate-600 font-medium">{ROLE_META[who].short}</span> 执行
    </span>
  );
}

const ACCENT_ICON = {
  emerald: "text-emerald-600",
  amber: "text-amber-600",
  rose: "text-rose-600",
  slate: "text-slate-400",
  blue: "text-blue-600",
};

function Kicker({ icon: Icon, platform, cat, accent, route }) {
  return (
    <div className="flex items-center gap-1.5 text-10 text-slate-400">
      {Icon && <Icon size={12} className={ACCENT_ICON[accent]} />}
      <span className="font-medium text-slate-500">{platform}</span>
      <span>·</span>
      <span>{cat}</span>
      {route && <RouteTag who={route} />}
    </div>
  );
}

function StatusBadge({ st }) {
  const paid = st === "已到账" || st === "已返还";
  return (
    <span className={`text-10 font-medium ${paid ? "text-emerald-700" : "text-slate-400"}`}>
      {st}
    </span>
  );
}

function LineItems({ items }) {
  return (
    <div className="mt-2.5 divide-y divide-slate-100 border-t border-slate-100">
      {items.map((it, i) => (
        <div key={i} className="flex items-start justify-between gap-3 py-2 text-xs">
          <span className="text-slate-500 leading-relaxed">{it.d}</span>
          <span className="flex items-center gap-2 flex-shrink-0">
            <span className="font-mono font-semibold text-slate-800">{it.v}</span>
            <StatusBadge st={it.st} />
          </span>
        </div>
      ))}
    </div>
  );
}

function Shots({ shots }) {
  return (
    <div className="mt-2.5 flex items-center gap-2.5">
      {shots.map((s, i) => (
        <span key={i} className="flex items-center gap-2.5">
          {i > 0 && <span className="text-slate-300">→</span>}
          <span className="flex-1 rounded-lg bg-slate-50 border border-slate-100 px-3 py-2 text-center">
            <span
              className={`block w-14 h-9 rounded mx-auto mb-1 ${
                s.good ? "bg-emerald-200/70" : "bg-slate-200"
              }`}
            />
            <span className="text-10 text-slate-400">{s.label}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

function Sparkline({ data }) {
  return (
    <span className="flex items-end gap-1 h-8 flex-shrink-0" title="近 6 周">
      {data.map((h, i) => (
        <span
          key={i}
          className={`w-3 rounded-sm ${
            i === data.length - 1 ? "bg-rose-400" : "bg-slate-200"
          }`}
          style={{ height: `${h}%` }}
        />
      ))}
    </span>
  );
}

function MaskedRow({ platform, cat, minRole }) {
  return (
    <div className="px-4 py-3.5 flex items-center gap-2.5">
      <Lock size={15} className="text-slate-400 flex-shrink-0" />
      <div className="min-w-0">
        <div className="text-xs font-medium text-slate-500">
          {platform} · {cat}
        </div>
        <div className="text-10 text-slate-400">
          标记:敏感 · 在你的权限下隐藏 · 可见:{minRole}及以上
        </div>
      </div>
    </div>
  );
}

function GroupHead({ children, count }) {
  return (
    <div className="flex items-center gap-2 mt-5 mb-2 px-1 first:mt-0">
      <span className="text-11 font-semibold tracking-wide text-slate-500">{children}</span>
      {count != null && (
        <span className="text-10 text-slate-400 font-mono">{count}</span>
      )}
    </div>
  );
}

/* ── 主组件 ───────────────────────────────────────────────────────────────── */

export default function MessageStreamZh() {
  const [viewer, setViewer] = useState("maya");
  const [approved, setApproved] = useState([]); // 已批准的 pending id,按批准顺序
  const [reveal, setReveal] = useState({});
  const [toast, setToast] = useState(null);

  const canSee = (visibleTo) => !visibleTo || visibleTo.includes(viewer);
  const toggle = (id) => setReveal((r) => ({ ...r, [id]: !r[id] }));

  const approve = (c) => {
    setApproved((a) => (a.includes(c.id) ? a : [...a, c.id]));
    setReveal((r) => ({ ...r, [c.id]: false }));
    setToast(c.action.toast);
    window.clearTimeout(approve._t);
    approve._t = window.setTimeout(() => setToast(null), 2600);
  };

  const pendingOpen = PENDING.filter((c) => !approved.includes(c.id));
  const movedDone = approved
    .map((id) => PENDING.find((c) => c.id === id))
    .filter(Boolean);

  // 一行收件箱卡。mode: 'pending' | 'done'。
  const renderRow = (c, mode) => {
    const masked = c.sensitive && !canSee(["cmo", "maya"]);
    if (masked) {
      return (
        <MaskedRow key={c.id} platform={c.platform} cat={c.cat} minRole="Maya" />
      );
    }
    const okText = mode === "done" ? (c.ok != null ? c.ok : c.action?.done) : null;
    return (
      <div key={c.id} className="px-4 py-3.5">
        <Kicker
          icon={c.icon}
          platform={c.platform}
          cat={c.cat}
          accent={c.accent}
          route={mode === "pending" ? c.route : null}
        />
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-slate-900 mt-1 leading-snug">
              {c.title}
              {okText && (
                <span className="text-emerald-700">
                  {" · "}
                  {mode === "done" && c.ok == null && (
                    <Check size={12} className="inline -mt-0.5 mr-0.5" />
                  )}
                  {okText}
                </span>
              )}
            </div>
            {c.desc && (
              <div className="text-xs text-slate-600 leading-relaxed mt-1">{c.desc}</div>
            )}
          </div>
          {c.spark && mode === "pending" && <Sparkline data={c.spark} />}
        </div>

        {c.items && <LineItems items={c.items} />}
        {c.shots && <Shots shots={c.shots} />}

        {mode === "pending" && (c.action || c.evidence) && (
          <div className="flex items-center gap-3 mt-2.5">
            {c.action && (
              <Btn icon={Check} onClick={() => approve(c)}>
                {c.action.label}
              </Btn>
            )}
            {c.evidence && (
              <button
                onClick={() => toggle(c.id)}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
              >
                {reveal[c.id] ? <ChevronUp size={13} /> : <ArrowUpRight size={13} />}
                {reveal[c.id] ? "收起" : "依据"}
              </button>
            )}
          </div>
        )}

        {mode === "pending" && c.evidence && reveal[c.id] && (
          <div className="mt-2 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 leading-relaxed">
            {c.evidence}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-slate-100 font-sans">
      <StyleScope />

      {/* 顶栏 */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
            <Sparkles size={17} className="text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-900 truncate">
                {GROUP.name}
              </span>
              <span className="text-10 px-1.5 py-px rounded-full bg-slate-100 text-slate-500 font-medium">
                演示数据
              </span>
            </div>
            <div className="text-10 text-slate-400 truncate">{GROUP.subtitle}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-slate-400 flex-shrink-0">
          <Search size={16} />
          <MoreHorizontal size={16} />
        </div>
      </header>

      {/* 身份切换:演示角色路由 + 权限遮罩 */}
      <div className="flex items-center gap-2 px-4 py-1.5 bg-white border-b border-slate-100 flex-shrink-0">
        <span className="text-10 text-slate-400 flex-shrink-0">以此身份查看</span>
        <div className="flex items-center gap-1">
          {ROLE_ORDER.map((r) => (
            <button
              key={r}
              onClick={() => setViewer(r)}
              className={`px-2 py-0.5 rounded-full text-10 font-medium transition-colors ${
                viewer === r
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {ROLE_META[r].short}
            </button>
          ))}
        </div>
        <span className="text-10 text-slate-400 ml-auto truncate">
          {ROLE_META[viewer].clearance}权限 · {ROLE_META[viewer].desc}
        </span>
      </div>

      {/* 收件箱 */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-2xl mx-auto">
          {/* pulse 指标 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 rounded-xl overflow-hidden shadow-sm">
            {PULSE.map((p) => (
              <div key={p.l} className="bg-white px-3.5 py-2.5">
                <div className="text-base font-mono font-semibold text-slate-900">{p.n}</div>
                <div className="text-10 text-slate-400 mt-0.5 leading-tight">{p.l}</div>
              </div>
            ))}
          </div>
          <div className="text-10 text-slate-400 mt-1.5 px-1">
            每个数字都连着触发线,越线就成下面待审批里的一张卡。
          </div>

          {/* 待审批 */}
          {pendingOpen.length > 0 && (
            <>
              <GroupHead count={pendingOpen.length}>待审批</GroupHead>
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden divide-y divide-slate-100">
                {pendingOpen.map((c) => renderRow(c, "pending"))}
              </div>
            </>
          )}

          {/* 已完成 */}
          <GroupHead count={movedDone.length + DONE.length}>已完成</GroupHead>
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden divide-y divide-slate-100">
            {movedDone.map((c) => renderRow(c, "done"))}
            {DONE.map((c) => renderRow(c, "done"))}
          </div>
        </div>
      </div>

      {/* 底部输入(锁定,演示用) */}
      <footer className="flex-shrink-0 bg-white border-t border-slate-200 px-4 py-2.5">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 text-slate-400 text-sm">
            <span className="flex-1">直接说你要的结果,或在群里发指令…</span>
            <Send size={15} />
          </div>
          <span className="text-10 text-slate-400 flex items-center gap-1">
            <Clock size={11} /> 演示版 · 对话预设
          </span>
        </div>
      </footer>

      {/* toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-slate-900/90 backdrop-blur text-white text-xs rounded-full px-4 py-2 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
