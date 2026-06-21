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
   Message-stream form · commerce inbox
   Default touchpoint: the AI operator lays out everything it ran overnight as
   an inbox. Grouped by status: Pending (needs your call) / Done.
   Every card carries "platform · category", across Amazon Seller / Vendor / Walmart.
   Approving moves the card to Done + toast; sensitive cards are masked by clearance.
   People ABC Home Goods / Maya / Devon. Numbers are illustrative, internally consistent.
   ────────────────────────────────────────────────────────────────────────── */

const ROLE_META = {
  cmo: { name: "CMO", short: "CMO", desc: "Oversight + approval", clearance: "Confidential" },
  maya: {
    name: "Maya Chen",
    short: "Maya",
    desc: "VP eCommerce · strategy / margin",
    clearance: "Sensitive",
  },
  devon: {
    name: "Devon Park",
    short: "Devon",
    desc: "Operator · paid media / daily ops",
    clearance: "Internal",
  },
};
const ROLE_ORDER = ["cmo", "maya", "devon"];

const GROUP = {
  name: "ABC Home Goods · AI Ops",
  subtitle: "Amazon Seller · Vendor · Walmart",
};

/* ── pulse metrics ──────────────────────────────────────────────────────────── */
const PULSE = [
  { n: "$647,180", l: "Sales this month · 3 channels" },
  { n: "93.8%", l: "Buy Box win rate · yesterday" },
  { n: "11 days", l: "Min days of cover · core SKU" },
  { n: "168", l: "SKUs managed · swept at 06:00" },
];

/* ── Pending ────────────────────────────────────────────────────────────────── */
const PENDING = [
  {
    id: "po",
    platform: "Amazon Vendor",
    cat: "Purchase order",
    icon: Package,
    accent: "slate",
    route: "devon",
    title: "PO 8-3107 · 1,200 units, ship window Jun 15–19",
    desc: "Bathtub tray · SKU-204. Capacity covers 1,140 units; the 60-unit short is filed as a capacity reason, confirmation letter drafted.",
    evidence:
      "Available 462 + in-transit 950 − committed 272 = 1,140 shippable in the window. Confirm submits straight to Vendor Central.",
    action: { label: "Confirm PO", done: "Confirmed · 1,140 units", toast: "PO 8-3107 confirmed in Vendor Central." },
  },
  {
    id: "bb",
    platform: "Amazon Seller",
    cat: "Buy Box",
    icon: Award,
    accent: "rose",
    route: "devon",
    sensitive: true,
    title: "Lost the Buy Box at 02:14 · Serving board set SKU-312",
    desc: "HomeGoodsPlus listed FBA at $23.59, $0.40 under us. Suggest matching to $23.49 — still above the margin floor; auto-reverts if they pull back.",
    evidence:
      "02:14 price snapshot: just undercut — listing untouched, not suppressed. $23.49 is still above the $21.80 margin floor (on your logged cost). The change and revert condition are both in the action log.",
    action: { label: "Approve match", done: "Matched $23.49", toast: "Price updated — watching the Buy Box recover." },
  },
  {
    id: "inv",
    platform: "Amazon Seller",
    cat: "Inventory",
    icon: Boxes,
    accent: "amber",
    route: "devon",
    title: "Core SKU has 11 days of cover · 21-day replenishment cycle",
    desc: "Bathtub tray · SKU-204 sells 42/day, 462 on hand. Replenish 1,008 units — cycle plus 14 days of safety stock.",
    evidence:
      "42/day ×(21 + 14) days − 462 on hand = 1,008. Daily rate is the trailing 14-day average. The PO still goes through your ERP.",
    action: { label: "Approve replenishment", done: "Plan confirmed", toast: "Confirmed — replenishment list sent to the ops inbox." },
  },
  {
    id: "sov",
    platform: "Amazon Seller",
    cat: "Market",
    icon: TrendingDown,
    accent: "rose",
    route: "devon",
    title: "“Bathtub tray” share of voice down 7 pts · 31% → 24%",
    desc: "Two competitors added SP on this term this week; organic rank held. Defense: +15% bid on this exact term in the defense campaign, $40/day moved from a low-ACoS campaign.",
    spark: [78, 81, 86, 81, 75, 67],
    evidence:
      "Rank data shows the loss is all paid top-of-page slot 1; organic is steady. The two campaigns we're pulling from are 9% under target ACoS this week, so there's room. Touching only this one exact term — expect share back in 3 days, reviewed daily.",
    action: { label: "Approve defense", done: "Live", toast: "Defense plan is live." },
  },
];

/* ── Done ───────────────────────────────────────────────────────────────────── */
const DONE = [
  {
    id: "recover",
    platform: "Amazon Seller",
    cat: "Recovery",
    icon: Receipt,
    accent: "emerald",
    sensitive: true,
    title: "Auto-filed 3 claims this week",
    ok: "Recovered $1,284",
    desc: "11 claims / $4,920 month-to-date. All filed inside the 60-day window, priced on your logged cost.",
    items: [
      { d: "#4471 · Removal order lost in transit · 12 × $38.00", v: "$456", st: "Paid" },
      { d: "#4472 · Refunded, not returned · 18 × $29.00", v: "$522", st: "Pending" },
      { d: "#4468 · FBA fee overcharge (wrong size tier)", v: "$306", st: "Paid" },
    ],
  },
  {
    id: "chargeback",
    platform: "Amazon Vendor",
    cat: "Deduction",
    icon: FileText,
    accent: "emerald",
    title: "Two deductions disputed",
    ok: "$1,086",
    desc: "Invoices reconciled against receiving records; dispute packets submitted via Vendor Central.",
    items: [
      { d: "PO 8-2241 shortage deduction · invoiced 480, paid 444 · 36 × $21.50", v: "$774", st: "Awaiting reply" },
      { d: "Chargeback · ASN submitted late", v: "$312", st: "Reversed" },
    ],
  },
  {
    id: "pricing",
    platform: "Amazon Seller",
    cat: "Pricing",
    icon: Tag,
    accent: "emerald",
    title: "Mispriced, reverted · Walnut coaster set SKU-330",
    ok: "$3.60 → $36.00",
    desc: "Listed 90% under the approved price, tripping auto-correction (any deviation over 50% rolls back). 4 minutes from error to revert, logged in the action log.",
  },
  {
    id: "shelfA",
    platform: "Amazon Seller",
    cat: "Digital shelf",
    icon: ImageIcon,
    accent: "emerald",
    title: "Main image was swapped · restored to the approved version",
    desc: "Bathtub tray · SKU-204. At 06:18 the main image was replaced by a third party; restore submitted 06:21 using your approved version.",
    shots: [
      { label: "06:18 detected" },
      { label: "06:21 restored", good: true },
    ],
  },
  {
    id: "shelfW",
    platform: "Walmart",
    cat: "Digital shelf",
    icon: ShieldCheck,
    accent: "emerald",
    title: "Suppressed listing restored · Teak shower bench SKU-118",
    desc: "Suppressed for a missing required attribute (assembled weight). Added and resubmitted 07:02, back in stock 08:40.",
  },
];

/* ── atoms ──────────────────────────────────────────────────────────────────── */

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

// Routing: who picks this up.
function RouteTag({ who }) {
  return (
    <span className="ml-auto text-10 text-slate-400">
      <span className="text-slate-600 font-medium">{ROLE_META[who].short}</span> to action
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
  const paid = st === "Paid" || st === "Reversed";
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
    <span className="flex items-end gap-1 h-8 flex-shrink-0" title="Last 6 weeks">
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
          Tagged Sensitive · hidden at your clearance · visible to {minRole}+
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

/* ── main ───────────────────────────────────────────────────────────────────── */

export default function MessageStreamEn() {
  const [viewer, setViewer] = useState("maya");
  const [approved, setApproved] = useState([]); // approved pending ids, in order
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

  // One inbox row. mode: 'pending' | 'done'.
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
                {reveal[c.id] ? "Hide" : "Why"}
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

      {/* top bar */}
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
                Demo data
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

      {/* identity switch: demo role routing + clearance mask */}
      <div className="flex items-center gap-2 px-4 py-1.5 bg-white border-b border-slate-100 flex-shrink-0">
        <span className="text-10 text-slate-400 flex-shrink-0">Viewing as</span>
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
          {ROLE_META[viewer].clearance} clearance · {ROLE_META[viewer].desc}
        </span>
      </div>

      {/* inbox */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-2xl mx-auto">
          {/* pulse metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-slate-200 rounded-xl overflow-hidden shadow-sm">
            {PULSE.map((p) => (
              <div key={p.l} className="bg-white px-3.5 py-2.5">
                <div className="text-base font-mono font-semibold text-slate-900">{p.n}</div>
                <div className="text-10 text-slate-400 mt-0.5 leading-tight">{p.l}</div>
              </div>
            ))}
          </div>
          <div className="text-10 text-slate-400 mt-1.5 px-1">
            Every number has a trigger line — cross it and it becomes a card in Pending below.
          </div>

          {/* Pending */}
          {pendingOpen.length > 0 && (
            <>
              <GroupHead count={pendingOpen.length}>Pending</GroupHead>
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden divide-y divide-slate-100">
                {pendingOpen.map((c) => renderRow(c, "pending"))}
              </div>
            </>
          )}

          {/* Done */}
          <GroupHead count={movedDone.length + DONE.length}>Done</GroupHead>
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden divide-y divide-slate-100">
            {movedDone.map((c) => renderRow(c, "done"))}
            {DONE.map((c) => renderRow(c, "done"))}
          </div>
        </div>
      </div>

      {/* locked composer (demo) */}
      <footer className="flex-shrink-0 bg-white border-t border-slate-200 px-4 py-2.5">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 text-slate-400 text-sm">
            <span className="flex-1">Say what you want, or drop a command in the group…</span>
            <Send size={15} />
          </div>
          <span className="text-10 text-slate-400 flex items-center gap-1">
            <Clock size={11} /> Demo · scripted
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
