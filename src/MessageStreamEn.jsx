import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  AlertTriangle,
  Target,
  Calendar,
  Database,
  Check,
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
  ChevronUp,
  ClipboardCheck,
  Layers,
  Lock,
  Eye,
  Pause,
} from "lucide-react";

/* ──────────────────────────────────────────────────────────────────────────
   Message-stream form · Feishu skin (English mirror of MessageStreamZh)
   The default client touchpoint: the AI ops lead lives in the client's group
   chat, push + ask, zero new UI. Spine is the closed loop on a timeline:
   one decision runs from alert to scoring, attribution, experience writeback.
   "Advance time" jumps to the score date so the reader sees the decision line
   lock and settle. Identity switch shows role routing + clearance masking;
   "Edit params" is a real interaction; all three states (execute / wait /
   test) appear. Content from the abc-mock five scenarios.
   ────────────────────────────────────────────────────────────────────────── */

const ROLE_META = {
  cmo: { name: "CMO", short: "CMO", desc: "oversight + approval", clearance: "Confidential" },
  maya: {
    name: "Maya Chen",
    short: "Maya",
    desc: "portfolio lead · strategy / margin",
    clearance: "Sensitive",
  },
  devon: {
    name: "Devon Park",
    short: "Devon",
    desc: "execution · paid media / daily ops",
    clearance: "Internal",
  },
};
const ROLE_ORDER = ["cmo", "maya", "devon"];

const GROUP = {
  name: "ABC Home Goods · AI Ops",
  subtitle: "AI decides · experts gate · a decision line locks to every call",
};

/* ── atoms ────────────────────────────────────────────────────────────────── */

function Avatar({ kind }) {
  if (kind === "agent") {
    return (
      <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">
        <Sparkles size={16} className="text-white" />
      </div>
    );
  }
  const map = { maya: "MC", devon: "DP", cmo: "CMO" };
  return (
    <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
      <span className="text-10 font-semibold text-slate-600">{map[kind]}</span>
    </div>
  );
}

// One message. viewer decides side: the current viewer's own messages go right.
function Row({ from, name, tag, time, viewer, children }) {
  const right = from === viewer;
  return (
    <div className={`flex gap-2.5 ${right ? "flex-row-reverse" : "flex-row"} mb-5`}>
      <Avatar kind={from} />
      <div
        className={`flex flex-col ${right ? "items-end" : "items-start"} max-w-[78%] min-w-0`}
      >
        <div className="flex items-center gap-2 mb-1">
          {right && <span className="text-10 text-slate-400 font-mono">{time}</span>}
          <span className="text-xs font-semibold text-slate-700">{name}</span>
          {tag && (
            <span className="text-10 px-1 py-px rounded bg-emerald-50 text-emerald-700 font-medium">
              {tag}
            </span>
          )}
          {!right && <span className="text-10 text-slate-400 font-mono">{time}</span>}
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}

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

function Btn({ tone = "primary", onClick, icon: Icon, children }) {
  const tones = {
    primary: "bg-emerald-600 text-white hover:bg-emerald-700",
    ghost: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50",
    amber: "bg-amber-500 text-white hover:bg-amber-600",
    slate: "bg-slate-900 text-white hover:bg-slate-800",
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

function Confidence({ value }) {
  return (
    <span className="text-10 text-slate-500">
      Confidence{" "}
      <span className="font-mono font-semibold text-slate-700">{value}%</span>
    </span>
  );
}

// Role routing: who this is sent to, who is cc'd. Highlights "you" on match.
function RouteStrip({ to, cc, viewer }) {
  const t = ROLE_META[to];
  return (
    <div className="px-3.5 pt-2 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-10">
      <span className="flex items-center gap-1 text-slate-400">
        <CornerUpRight size={11} />
        To <span className="text-slate-600 font-medium">{t.short}</span>
        <span>· {t.desc}</span>
        {viewer === to && <span className="text-emerald-600 font-semibold">· you</span>}
      </span>
      {cc && (
        <span className="text-slate-400">
          cc <span className="text-slate-600 font-medium">{ROLE_META[cc].short}</span>
          {viewer === cc && <span className="text-emerald-600 font-semibold"> · you</span>}
        </span>
      )}
    </div>
  );
}

// Decision line · load-bearing. Three things fixed: what counts as right /
// the score date / the data basis.
function JudgeLine({ correct, scoreDate, basis }) {
  const rows = [
    { icon: Target, k: "What counts as right", v: correct },
    { icon: Calendar, k: "Score date", v: scoreDate },
    { icon: Database, k: "Data basis", v: basis },
  ];
  return (
    <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50/60 overflow-hidden">
      <div className="px-3 py-1.5 bg-emerald-100/60 border-b border-emerald-200 flex items-center gap-1.5">
        <ClipboardCheck size={12} className="text-emerald-700" />
        <span className="text-10 font-semibold text-emerald-800 tracking-wide">
          Decision line · locked on send, auto-scored on the due date, no manual override
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

// Watch line · for the wait state. What we watch / recheck date / action trigger.
function WatchLine({ watch, recheck, trigger }) {
  const rows = [
    { icon: Eye, k: "What we watch", v: watch },
    { icon: Calendar, k: "Recheck date", v: recheck },
    { icon: Target, k: "Acts when", v: trigger },
  ];
  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
      <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5">
        <Pause size={12} className="text-slate-500" />
        <span className="text-10 font-semibold text-slate-600 tracking-wide">
          Watch line · below the action bar, observe only; re-judge if a premise shifts or the recheck date hits
        </span>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map((r) => (
          <div key={r.k} className="flex gap-2 px-3 py-2">
            <r.icon size={13} className="text-slate-500 mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-10 text-slate-500 font-medium">{r.k}</div>
              <div className="text-xs text-slate-700 leading-relaxed">{r.v}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    <div className="px-3.5 pt-2.5 pb-2">
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

// Click-to-reveal link page: heavy content folded away, surfaced on demand.
function Reveal({ label, open, onToggle, children }) {
  return (
    <div className="mt-2">
      <button
        onClick={onToggle}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700"
      >
        {open ? <ChevronUp size={13} /> : <ArrowUpRight size={13} />}
        {open ? "Collapse" : label}
      </button>
      {open && (
        <div className="mt-2 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 leading-relaxed space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

// Clearance mask · informative mask, not a silent hide.
function MaskedMsg({ title, tag, minRole }) {
  return (
    <CardShell accent="slate">
      <div className="px-3.5 py-3 flex items-center gap-2.5">
        <Lock size={16} className="text-slate-400 flex-shrink-0" />
        <div className="min-w-0">
          <div className="text-xs font-medium text-slate-500">{title}</div>
          <div className="text-10 text-slate-400">
            Tagged: {tag} · hidden at your clearance · visible to {minRole} and up
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function Stat({ label, value, note, tone = "slate" }) {
  const vc = { slate: "text-slate-900", emerald: "text-emerald-700", rose: "text-rose-700" };
  return (
    <div>
      <div className="text-10 text-slate-500">{label}</div>
      <div className={`text-sm font-mono font-semibold ${vc[tone]}`}>{value}</div>
      {note && <div className="text-10 text-slate-400 mt-px">{note}</div>}
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

// Inputs for the "Edit params" inline editor.
function ParamField({ label, value, onChange, prefix, suffix, type = "number" }) {
  return (
    <label className="flex items-center gap-2 text-xs">
      <span className="text-slate-500 w-20 flex-shrink-0">{label}</span>
      <div className="flex items-center gap-1 px-2 py-1 rounded border border-slate-300 bg-white focus-within:border-emerald-500">
        {prefix && <span className="text-slate-400">{prefix}</span>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`outline-none font-mono text-slate-800 bg-transparent ${type === "number" ? "w-16" : "w-28"}`}
        />
        {suffix && <span className="text-slate-400">{suffix}</span>}
      </div>
    </label>
  );
}

/* ── main ─────────────────────────────────────────────────────────────────── */

export default function MessageStreamEn() {
  const [viewer, setViewer] = useState("maya");
  const [approved, setApproved] = useState(false);
  const [transferred, setTransferred] = useState(false);
  const [testOpen, setTestOpen] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [reveal, setReveal] = useState({});

  const [params, setParams] = useState({
    priceFloor: "329",
    coupon: "15",
    scoreDate: "Jun 15",
  });
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(params);

  const bottomRef = useRef(null);
  const toggle = (id) => setReveal((r) => ({ ...r, [id]: !r[id] }));
  const canSee = (visibleTo) => !visibleTo || visibleTo.includes(viewer);

  useEffect(() => {
    if (approved || transferred || advanced || testOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [approved, transferred, advanced, testOpen]);

  const openEditor = () => {
    setDraft(params);
    setEditing(true);
  };
  const saveEditor = () => {
    setParams(draft);
    setEditing(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-100 font-sans">
      <StyleScope />

      {/* Feishu group header */}
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
                Group · 4
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

      {/* Identity switch: role routing + clearance masking */}
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

      {/* stream */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="max-w-2xl mx-auto">
          <DayDivider label="Jun 1 · Sun" />

          {/* 1 · alert push */}
          <Row from="agent" name="AI Ops Lead" tag="bot" time="09:12" viewer={viewer}>
            <CardShell accent="rose">
              <RouteStrip to="devon" cc="maya" viewer={viewer} />
              <CardHead
                accent="rose"
                icon={AlertTriangle}
                kicker="Alert · time-sensitive · decide today / tomorrow"
                title="Bed frame SKU-117 · organic position under attack"
              />
              <div className="px-3.5 pb-3 text-sm text-slate-700 leading-relaxed">
                Yesterday NightFox Bedding started bidding up our bed-frame's 7 core keywords hard. I watched it all day today, no pullback, so this isn't a temporary traffic play. They also dropped an 18% coupon, so I read it as a grab for the pre-peak organic position. A counter today gets us 5 days head-to-head; wait till Wednesday and it's down to 2, and lost share takes 4 to 6 months to win back.
              </div>
            </CardShell>
          </Row>

          {/* 2 · decision card, execute state (approve + decision line + inline editor) */}
          <Row from="agent" name="AI Ops Lead" tag="bot" time="09:13" viewer={viewer}>
            <CardShell accent="emerald">
              <RouteStrip to="devon" cc="maya" viewer={viewer} />
              <CardHead
                accent="emerald"
                icon={Target}
                kicker="Decision card · executable · state: execute"
                title={`Counter-bid · match price to $${params.priceFloor} on 7 core keywords, stack a ${params.coupon}% coupon, hold 5 days`}
              />
              <div className="px-3.5 text-sm text-slate-700 leading-relaxed">
                Hold the ${params.priceFloor} floor, match NightFox bids on the core keywords, stack a {params.coupon}% coupon against their 18% one. Alternatives were "outbid for volume" and "pull back and yield"; I ranked counter-bid first, losing the organic position before peak costs more than 5 days of giveback.
                <Reveal
                  label="See full analysis (three postures + traffic math)"
                  open={reveal.defense}
                  onToggle={() => toggle("defense")}
                >
                  <p>Counter-bid: hold the organic position, ~1.8 margin points given back over 5 days (illustrative), share risk minimized.</p>
                  <p>Outbid for volume: +30% bids for impressions, ACoS spikes to 41% short-term, burns budget before peak, dropped.</p>
                  <p>Pull back and yield: saves ad spend, but the #2 organic position likely drops out of Top 3, 4 to 6 months to recover, dropped.</p>
                </Reveal>
              </div>
              <div className="px-3.5">
                <JudgeLine
                  correct={`Within 14 days, hold organic Top 3, category SOV ≥ 18%, price not below the $${params.priceFloor} floor`}
                  scoreDate={`${params.scoreDate} · system auto-judges, no manual override`}
                  basis="Brand Analytics SOV weekly snapshot + organic rank daily snapshot; ad attribution on a 7-day click window"
                />
              </div>

              {editing && !approved && (
                <div className="px-3.5 mt-3 pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-10 text-slate-500 font-medium">Edit params · re-locks the decision line on save</div>
                  <ParamField
                    label="Price floor"
                    prefix="$"
                    value={draft.priceFloor}
                    onChange={(v) => setDraft((d) => ({ ...d, priceFloor: v }))}
                  />
                  <ParamField
                    label="Coupon"
                    suffix="%"
                    value={draft.coupon}
                    onChange={(v) => setDraft((d) => ({ ...d, coupon: v }))}
                  />
                  <ParamField
                    label="Score date"
                    type="text"
                    value={draft.scoreDate}
                    onChange={(v) => setDraft((d) => ({ ...d, scoreDate: v }))}
                  />
                  <div className="flex items-center gap-2 pt-1">
                    <Btn tone="ghost" onClick={() => setEditing(false)}>Cancel</Btn>
                    <Btn tone="primary" icon={Check} onClick={saveEditor}>Save params</Btn>
                  </div>
                </div>
              )}

              <div className="px-3.5 py-3 flex items-center justify-between gap-2 border-t border-slate-100 mt-3">
                <Confidence value={73} />
                {approved ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                    <Check size={14} /> Approved · decision line locked
                  </span>
                ) : editing ? (
                  <span className="text-10 text-slate-400">Editing, approve after saving</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <Btn tone="ghost" onClick={openEditor}>Edit params</Btn>
                    <Btn tone="primary" icon={Check} onClick={() => setApproved(true)}>
                      Approve &amp; run
                    </Btn>
                  </div>
                )}
              </div>
            </CardShell>
          </Row>

          {/* approval receipt (attributed to current viewer) */}
          {approved && (
            <>
              <Row from={viewer} name={ROLE_META[viewer].name} time="09:15" viewer={viewer}>
                <Bubble right={true}>Approved, run it, hold the organic position first.</Bubble>
              </Row>
              <Row from="agent" name="AI Ops Lead" tag="bot" time="09:15" viewer={viewer}>
                <Bubble>
                  Running and the decision line is locked, auto-scores on {params.scoreDate}, no override midway. I'll watch organic rank and SOV daily until then and alert early if it breaks the line.
                </Bubble>
              </Row>
            </>
          )}

          {/* 3 · info card, needs the team (transfer, no approve) */}
          <Row from="agent" name="AI Ops Lead" tag="bot" time="10:40" viewer={viewer}>
            <CardShell accent="amber">
              <RouteStrip to="devon" cc="maya" viewer={viewer} />
              <CardHead
                accent="amber"
                icon={FileText}
                kicker="Info card · needs the team · I can't run this"
                title="Bed-frame hero images: all 6 are daytime living-room, no night bedroom"
              />
              <div className="px-3.5 pb-3 text-sm text-slate-700 leading-relaxed">
                I checked, NightFox swapped their hero to a night bedroom scene and their CTR is higher than ours. Changing hero images needs the brand team to shoot, I can't do it, so I'm handing it over. This doesn't block the counter above.
                <Reveal
                  label="See comparison (ours vs competitor hero)"
                  open={reveal.creative}
                  onToggle={() => toggle("creative")}
                >
                  <p>Ours: all 6 hero images are flat daytime living-room, no scene or people.</p>
                  <p>NightFox: first image night bedroom with lighting mood, second a bedding detail close-up.</p>
                  <p>Suggest adding one night-bedroom hero and testing CTR; basis: 14-day CTR comparison.</p>
                </Reveal>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-end gap-2 border-t border-slate-100">
                {transferred ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
                    <CornerUpRight size={14} /> Handed to brand team · cc Devon
                  </span>
                ) : (
                  <>
                    <Btn tone="ghost">Later</Btn>
                    <Btn tone="amber" icon={CornerUpRight} onClick={() => setTransferred(true)}>
                      Hand to team
                    </Btn>
                  </>
                )}
              </div>
            </CardShell>
          </Row>

          {/* 4 · wait state (signal too thin, observe first) */}
          <Row from="agent" name="AI Ops Lead" tag="bot" time="11:55" viewer={viewer}>
            <CardShell accent="slate">
              <RouteStrip to="devon" cc="maya" viewer={viewer} />
              <CardHead
                accent="slate"
                icon={Pause}
                kicker="Decision card · state: wait · signal too thin, observe"
                title="NightFox also raising prices in mattresses, 1 day of data, holding"
              />
              <div className="px-3.5 pb-1 text-sm text-slate-700 leading-relaxed">
                NightFox started raising prices in our other category (mattresses) too, but it's only 1 day of data. Could be inventory clearance, could be a second front. Confidence isn't at the action bar yet (54%), so forcing a move is risky. Holding, on watch; I'll re-judge execute or test once there's enough data at the recheck date.
              </div>
              <div className="px-3.5 py-2">
                <WatchLine
                  watch="NightFox bid + coupon on mattress core keywords, our organic rank and SOV daily snapshots"
                  recheck="Jun 8 · 7 full days of data triggers re-judge"
                  trigger="Organic rank out of Top 5 two days running, or SOV down ≥ 3pt week-over-week"
                />
              </div>
              <div className="px-3.5 py-3 flex items-center justify-between gap-2 border-t border-slate-100">
                <span className="text-10 text-slate-500">
                  Confidence <span className="font-mono font-semibold text-slate-600">54%</span> · below the 65% action bar
                </span>
                <Btn tone="ghost" icon={Eye}>Adjust watch line</Btn>
              </div>
            </CardShell>
          </Row>

          {/* 5 · test state (low confidence, test not force; margin-sensitive, Devon can't see) */}
          <Row from="agent" name="AI Ops Lead" tag="bot" time="14:02" viewer={viewer}>
            {canSee(["cmo", "maya"]) ? (
              <CardShell accent="blue">
                <RouteStrip to="maya" cc="cmo" viewer={viewer} />
                <CardHead
                  accent="blue"
                  icon={FlaskConical}
                  kicker="Decision card · state: test · confidence too low, buy the answer"
                  title="Razor blade pricing phase 2 · three price points A/B"
                />
                <div className="px-3.5 pb-1 text-sm text-slate-700 leading-relaxed">
                  The handle's 7-day promo lifted blade attach rate by +2.4 to +3.1pt, 72% confidence. The range is wide, so I won't force a price; run three price points to ≥ 200 buyers each first. Phase 1's margin floor already went through your sign-off.
                </div>
                <div className="px-3.5 py-2">
                  <JudgeLine
                    correct="≥ 200 buyers at each of the three price points; pick the one with the highest attach rate × contribution margin"
                    scoreDate="Scores at volume · expected before Jun 28"
                    basis="Blade repurchase on a 30-day window; razor blended margin = razor 24% + blade 64% weighted"
                  />
                </div>
                <div className="px-3.5 py-3 flex items-center justify-between gap-2 border-t border-slate-100">
                  <Confidence value={72} />
                  <div className="flex items-center gap-2">
                    <Btn tone="ghost" onClick={() => setTestOpen(true)}>See test design</Btn>
                    <Btn tone="primary" icon={Check} onClick={() => setTestOpen(true)}>Approve test</Btn>
                  </div>
                </div>
                {testOpen && (
                  <div className="px-3.5 pb-3 -mt-1">
                    <div className="rounded-lg bg-blue-50 border border-blue-200 p-2.5 text-xs text-slate-600">
                      Test live · three price points split out, auto-scores at volume. This buys the answer, no verdict up front.
                    </div>
                  </div>
                )}
              </CardShell>
            ) : (
              <MaskedMsg title="Razor blade pricing phase 2 · decision card" tag="Sensitive" minRole="VP eCommerce" />
            )}
          </Row>

          {/* 6 · ask + reply (ask mode · ranked by marginal return) */}
          <Row from="maya" name="Maya Chen" time="16:20" viewer={viewer}>
            <Bubble right={viewer === "maya"}>How do we split this week's omnichannel budget?</Bubble>
          </Row>
          <Row from="agent" name="AI Ops Lead" tag="bot" time="16:20" viewer={viewer}>
            <CardShell accent="slate">
              <RouteStrip to="maya" viewer={viewer} />
              <CardHead
                accent="slate"
                icon={TrendingUp}
                kicker="Ask · instant analysis"
                title="Ranked by marginal return, no even split, no default reserve"
              />
              <div className="px-3.5 pb-3 text-sm text-slate-700 leading-relaxed">
                Next dollar goes where it produces the most:
                <ul className="mt-1.5 space-y-1 text-xs">
                  <li>· Amazon SP organic defense: high marginal ROAS, add $6K first.</li>
                  <li>· Walmart new listings: marginal is low, hold flat this week, no top-up.</li>
                  <li>· TikTok cost cap test: hold at $4K, wait for the incrementality test to score.</li>
                </ul>
                <Reveal
                  label="See full allocation"
                  open={reveal.budget}
                  onToggle={() => toggle("budget")}
                >
                  <p>$10K adjustable this week (illustrative), allocated by descending marginal ROAS, no reserve bucket.</p>
                  <p>Amazon SP marginal ROAS ~4.1 (illustrative) &gt; Walmart ~2.3 &gt; TikTok pending test.</p>
                  <p>TikTok incrementality measured by geographic holdout test, no top-up before it scores.</p>
                </Reveal>
              </div>
            </CardShell>
          </Row>

          {/* ── advance time: jump to score date ── */}
          {!advanced ? (
            <div className="my-2 flex justify-center">
              <button
                onClick={() => setAdvanced(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 shadow-sm"
              >
                <ChevronsRight size={15} />
                Advance to {params.scoreDate} score date · watch the decision line settle
              </button>
            </div>
          ) : (
            <>
              <DayDivider label={`${params.scoreDate} · Mon · score date`} />

              {/* 7 · auto-scoring (closed loop: score → attribution → experience writeback) */}
              <Row from="agent" name="AI Ops Lead" tag="bot" time="08:00" viewer={viewer}>
                <CardShell accent="emerald">
                  <RouteStrip to="devon" cc="maya" viewer={viewer} />
                  <CardHead
                    accent="emerald"
                    icon={ClipboardCheck}
                    kicker="Decision line due · system auto-settled · bed frame SKU-117"
                    title="Right · organic position held, no share lost"
                  />
                  <div className="px-3.5 py-2 grid grid-cols-3 gap-3">
                    <Stat label="Organic rank" value="#2" note="held Top 3" tone="emerald" />
                    <Stat label="Category SOV" value="19.4%" note="target ≥ 18%" tone="emerald" />
                    <Stat label="Price" value={`$${params.priceFloor}`} note="floor held" tone="emerald" />
                  </div>
                  <div className="px-3.5 pb-2 text-sm text-slate-700 leading-relaxed">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 mb-1">
                      <Check size={13} /> Confidence 73% delivered
                    </span>
                    <div>
                      Attribution: 5 days of counter-bid + a {params.coupon}% coupon offset NightFox's 18% one, their price hike didn't buy the organic position. Written to the experience library: pre-peak counter-bid (1 success so far).
                    </div>
                  </div>
                </CardShell>
              </Row>

              {/* 8 · weekly push */}
              <Row from="agent" name="AI Ops Lead" tag="bot" time="08:30" viewer={viewer}>
                <CardShell accent="slate">
                  <RouteStrip to="maya" cc="devon" viewer={viewer} />
                  <CardHead
                    accent="slate"
                    icon={Layers}
                    kicker="Ops weekly · pushed Monday · low noise"
                    title="This week W24 ops stats"
                  />
                  <div className="px-3.5 py-2 grid grid-cols-3 gap-3">
                    <Stat label="Auto bid changes" value="142" />
                    <Stat label="Paused weak keywords" value="17" />
                    <Stat label="Decision lines scored" value="3" note="2 right 1 wrong" />
                  </div>
                  <div className="px-3.5 pb-3">
                    <Reveal
                      label="Expand ops detail"
                      open={reveal.weekly}
                      onToggle={() => toggle("weekly")}
                    >
                      <p>This demo only shows daily / weekly ops stats.</p>
                      <p>Next version opens per-action detail, filterable by SKU / ad group / action type.</p>
                    </Reveal>
                  </div>
                </CardShell>
              </Row>

              {/* 9 · monthly reconciliation (Tatum's game changer; Confidential, Devon can't see) */}
              <Row from="agent" name="AI Ops Lead" tag="bot" time="09:00" viewer={viewer}>
                {canSee(["cmo", "maya"]) ? (
                  <div className="rounded-xl bg-slate-900 text-slate-100 shadow-sm overflow-hidden w-full">
                    <div className="px-3.5 pt-2 text-10 text-slate-400 flex items-center gap-1">
                      <CornerUpRight size={11} /> To Maya · cc CMO
                      {viewer === "cmo" && <span className="text-emerald-400 font-semibold"> · you</span>}
                      {viewer === "maya" && <span className="text-emerald-400 font-semibold"> · you</span>}
                    </div>
                    <div className="px-3.5 pt-2 pb-2 border-b border-slate-700">
                      <div className="flex items-center gap-1.5 text-10 font-medium text-slate-400">
                        <ClipboardCheck size={12} /> Monthly reconciliation · May
                      </div>
                      <div className="text-sm font-semibold mt-0.5">Your company goals in the system, reconciled for you</div>
                    </div>
                    <div className="px-3.5 py-3 grid grid-cols-2 gap-y-3 gap-x-4">
                      <DarkStat label="Decisions sent → due" value="18 → 12" />
                      <DarkStat label="Right / wrong" value="9 / 3" note="75% right" tone="emerald" />
                      <DarkStat label="Measured incremental contribution margin" value="+$14,200" note="geo-holdout basis · illustrative / draft" tone="emerald" />
                      <DarkStat label="Line TACoS" value="21.4%" note="target ≤ 22% · met" tone="emerald" />
                    </div>
                    <div className="px-3.5 pb-3 text-xs text-slate-300 leading-relaxed border-t border-slate-700 pt-2.5">
                      The 3 wrong calls are in the attribution queue; 2 traced to a premise shift (TikTok pulling category traffic shape, different from the launch assumption), the matching experience was downgraded. The floor lamp SKU-A holding $189 scored right on its due date, counted this month.
                    </div>
                  </div>
                ) : (
                  <MaskedMsg title="Monthly reconciliation · May" tag="Confidential" minRole="VP eCommerce" />
                )}
              </Row>
            </>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* footer input (locked, demo) */}
      <footer className="flex-shrink-0 bg-white border-t border-slate-200 px-4 py-2.5">
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 text-slate-400 text-sm">
            <span className="flex-1">Ask the AI ops lead, or drop a command in the group…</span>
            <Send size={15} />
          </div>
          <span className="text-10 text-slate-400 flex items-center gap-1">
            <Clock size={11} /> Demo · scripted
          </span>
        </div>
      </footer>
    </div>
  );
}

// text-10 / text-11 utilities, for when this form renders on its own.
function StyleScope() {
  return (
    <style>{`
      .text-10 { font-size: 10px; line-height: 14px; }
      .text-11 { font-size: 11px; line-height: 16px; }
    `}</style>
  );
}
