import { useState, useEffect } from "react";
import {
  Activity,
  Lock,
  Brain,
  ChevronDown,
  ChevronRight,
  Check,
  X,
  Edit3,
  TrendingUp,
  Target,
  Layers,
  Clock,
  Sparkles,
  AlertCircle,
  CircleDot,
  ArrowRight,
  FileText,
  BarChart3,
  Settings,
  Send,
  CornerDownRight,
  Plus,
  Minus,
  GitBranch,
  Workflow,
  ShieldCheck,
  ListTree,
  Calendar,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area,
  ReferenceLine,
} from "recharts";

/* ────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                 */
/* ────────────────────────────────────────────────────────────────────────── */

const CHAT_MESSAGES = [
  {
    id: "strategy",
    user: "Maya Chen",
    role: "VP, eCommerce",
    initials: "MC",
    timestamp: "May 4, 09:14",
    question:
      "SKU-A is ranked #2 in Floor Lamps. How do we capture best seller? What's the approach?",
    agentSummary:
      "Drafted ad architecture redesign and 12-week roadmap. 6 changes proposed.",
  },
  {
    id: "growth",
    user: "Devon Park",
    role: "Sr. Growth Manager",
    initials: "DP",
    timestamp: "May 11, 16:42",
    question:
      "SKU-B did $1.04M this month. How do we grow to $1.20M next month? Where does the growth come from?",
    agentSummary:
      "Diagnosed funnel bottleneck on CTR for urban-renters segment. Bid + creative plan ready.",
  },
  {
    id: "peak",
    user: "Sara Lin",
    role: "Portfolio Lead",
    initials: "SL",
    timestamp: "May 13, 10:08",
    question:
      "Peak season is 6 weeks out. 3 competitors raised bids. How should the portfolio respond?",
    agentSummary:
      "Built portfolio response matrix: 4 defend / 3 lean-in / 2 step-back.",
  },
  {
    id: "execution",
    user: "Jamal Hassan",
    role: "Ops Manager",
    initials: "JH",
    timestamp: "May 15, 08:31",
    question:
      "What ad optimizations have you done for SKU-A in the past 7 days?",
    agentSummary:
      "23 actions taken · 18 team-approved · 5 autonomous · 0 reverted.",
  },
  {
    id: "launch",
    user: "Maya Chen",
    role: "VP, eCommerce",
    initials: "MC",
    timestamp: "May 15, 11:47",
    question:
      "We're launching SKU-C in Floor Lamps in 4 weeks. I need a complete go-to-market plan.",
    agentSummary:
      "Drafted launch plan from 7 prior comparable launches. 5-phase playbook ready.",
  },
];

/* Strategy canvas */
const STRATEGY = {
  goal: "Best seller rank in Floor Lamps · within 90 days",
  goalConfirmedBy: "Maya Chen",
  goalConfirmedOn: "May 4",

  /* Current listing performance — gap to #1 best seller by search-term segment */
  performance: {
    rank: "#2",
    rankCategory: "Floor Lamps",
    rankHeldDays: 27,
    salesLast30d: 138400,
    tacos: 18.1,
    bestSellerSku: "SKU-204 · competitor",

    segments: [
      { id: "all",      label: "All",            count: 64, kicker: "All category keywords (excl. brand)" },
      { id: "core",     label: "Generic keywords",   count:  8, kicker: "floor lamp · arc · tripod · tall · reading" },
      { id: "scenario", label: "Use-case keywords",  count: 32, kicker: "bedroom · living · kid room · study" },
      { id: "style",    label: "Attribute keywords", count: 24, kicker: "modern · vintage · mid-century · industrial" },
    ],

    gapsBySegment: {
      all: [
        { kicker: "Traffic",    label: "Monthly impressions", currentValue: "1.84M", currentNumeric: 1.84, benchmarkValue: "2.92M", benchmarkNumeric: 2.92, gap: "−37%",   gapDetail: "−1.08M / month" },
        { kicker: "Click",      label: "Click-through rate",  currentValue: "2.1%",  currentNumeric: 2.1,  benchmarkValue: "2.6%",  benchmarkNumeric: 2.6,  gap: "−0.5pp", gapDetail: "−19% relative" },
        { kicker: "Conversion", label: "Conversion rate",     currentValue: "8.9%",  currentNumeric: 8.9,  benchmarkValue: "9.2%",  benchmarkNumeric: 9.2,  gap: "−0.3pp", gapDetail: "−3% relative" },
      ],
      core: [
        { kicker: "Traffic",    label: "Monthly impressions", currentValue: "920K",  currentNumeric: 0.92, benchmarkValue: "1.42M", benchmarkNumeric: 1.42, gap: "−35%",   gapDetail: "−500K / month" },
        { kicker: "Click",      label: "Click-through rate",  currentValue: "2.4%",  currentNumeric: 2.4,  benchmarkValue: "2.8%",  benchmarkNumeric: 2.8,  gap: "−0.4pp", gapDetail: "−14% relative" },
        { kicker: "Conversion", label: "Conversion rate",     currentValue: "9.4%",  currentNumeric: 9.4,  benchmarkValue: "9.5%",  benchmarkNumeric: 9.5,  gap: "−0.1pp", gapDetail: "near parity · strength area" },
      ],
      scenario: [
        { kicker: "Traffic",    label: "Monthly impressions", currentValue: "480K",  currentNumeric: 0.48, benchmarkValue: "680K",  benchmarkNumeric: 0.68, gap: "−29%",   gapDetail: "−200K / month" },
        { kicker: "Click",      label: "Click-through rate",  currentValue: "1.4%",  currentNumeric: 1.4,  benchmarkValue: "2.5%",  benchmarkNumeric: 2.5,  gap: "−1.1pp", gapDetail: "−44% relative · widest gap",     widest: true },
        { kicker: "Conversion", label: "Conversion rate",     currentValue: "8.2%",  currentNumeric: 8.2,  benchmarkValue: "9.1%",  benchmarkNumeric: 9.1,  gap: "−0.9pp", gapDetail: "−10% relative" },
      ],
      style: [
        { kicker: "Traffic",    label: "Monthly impressions", currentValue: "440K",  currentNumeric: 0.44, benchmarkValue: "820K",  benchmarkNumeric: 0.82, gap: "−46%",   gapDetail: "−380K / month · widest gap",     widest: true },
        { kicker: "Click",      label: "Click-through rate",  currentValue: "2.2%",  currentNumeric: 2.2,  benchmarkValue: "2.4%",  benchmarkNumeric: 2.4,  gap: "−0.2pp", gapDetail: "−8% relative" },
        { kicker: "Conversion", label: "Conversion rate",     currentValue: "8.8%",  currentNumeric: 8.8,  benchmarkValue: "9.0%",  benchmarkNumeric: 9.0,  gap: "−0.2pp", gapDetail: "−2% relative" },
      ],
    },

    /* Sub-segment breakdown — explains the impression gap via organic rank + ad position */
    segmentBreakdown: {
      scenario: [
        {
          name: "Bedroom",
          exampleTerms: "floor lamp for bedroom · bedside floor lamp · bedroom reading lamp",
          terms: 14, impressionsK: 142,
          organicRank: 18, organicRankBenchmark: 4,
          adPosition: 4,  adPositionBenchmark: 2,
          ctr: 1.1, cr: 6.4,
          alert: true, alertNote: "Largest gap — Insight #1",
        },
        {
          name: "Living room",
          exampleTerms: "modern floor lamp for living room · tall floor lamp living room · arc lamp living room",
          terms: 9, impressionsK: 218,
          organicRank:  6, organicRankBenchmark: 3,
          adPosition: 2,  adPositionBenchmark: 1,
          ctr: 1.8, cr: 9.1,
        },
        {
          name: "Kid room",
          exampleTerms: "kids room floor lamp · nursery floor lamp · child-safe floor lamp",
          terms: 5, impressionsK: 68,
          organicRank: 11, organicRankBenchmark: 5,
          adPosition: 3,  adPositionBenchmark: 2,
          ctr: 1.4, cr: 7.8,
        },
        {
          name: "Study",
          exampleTerms: "study floor lamp · office floor lamp · desk reading floor lamp",
          terms: 4, impressionsK: 52,
          organicRank:  9, organicRankBenchmark: 4,
          adPosition: 3,  adPositionBenchmark: 2,
          ctr: 1.6, cr: 8.4,
        },
      ],
      style: [
        {
          name: "Modern",
          exampleTerms: "modern floor lamp · contemporary floor lamp · sleek floor lamp",
          terms: 9, impressionsK: 196,
          organicRank:  5, organicRankBenchmark: 3,
          adPosition: 2,  adPositionBenchmark: 1,
          ctr: 2.4, cr: 9.2,
        },
        {
          name: "Mid-century",
          exampleTerms: "mid-century floor lamp · mid-century modern lamp · retro 60s floor lamp",
          terms: 6, impressionsK: 112,
          organicRank:  8, organicRankBenchmark: 5,
          adPosition: 3,  adPositionBenchmark: 2,
          ctr: 2.2, cr: 8.6,
        },
        {
          name: "Industrial",
          exampleTerms: "industrial floor lamp · loft floor lamp · pipe floor lamp",
          terms: 5, impressionsK: 84,
          organicRank: 11, organicRankBenchmark: 6,
          adPosition: 3,  adPositionBenchmark: 2,
          ctr: 1.9, cr: 8.1,
        },
        {
          name: "Vintage",
          exampleTerms: "vintage floor lamp · antique brass floor lamp · old fashioned floor lamp",
          terms: 4, impressionsK: 48,
          organicRank: 15, organicRankBenchmark: 7,
          adPosition: 4,  adPositionBenchmark: 3,
          ctr: 1.6, cr: 7.4,
          alert: true, alertNote: "Traffic + CTR both lagging",
        },
      ],
    },
  },

  /* Current ad architecture — ad-group level (shown in side drawer from top bar) */
  adArchitecture: {
    summary: {
      campaignCount: 5,
      adGroupCount: 9,
      keywordCount: 94,
      dailyBudget: 848,
      spend30d: 24960,
      sales30d: 138400,
      tacos: 18.1,
      acos: 13.4,
    },
    adGroups: [
      {
        id: "ag-brand-exact",
        name: "Brand · Exact match",
        campaignName: "SP — Branded Defense",
        campaignType: "SP",
        keywordCount: 12,
        dailyBudget: 84,
        spend30d: 2840,
        sales30d: 21420,
        tacos: 13.3,
        acos: 9.4,
        ctr: 3.8,
        cr: 12.4,
        topKeywords: [
          { kw: "abc home goods floor lamp", impressions: 28400, clicks: 1193, ctr: 4.2, cr: 12.8 },
          { kw: "abc floor lamp",            impressions: 18200, clicks:  655, ctr: 3.6, cr: 11.4 },
          { kw: "abc lamp",                  impressions:  9180, clicks:  321, ctr: 3.5, cr: 10.8 },
        ],
      },
      {
        id: "ag-brand-phrase",
        name: "Brand · Phrase match",
        campaignName: "SP — Branded Defense",
        campaignType: "SP",
        keywordCount: 18,
        dailyBudget: 84,
        spend30d: 1980,
        sales30d: 12740,
        tacos: 15.5,
        acos: 10.4,
        ctr: 2.9,
        cr: 9.6,
        topKeywords: [
          { kw: "abc modern floor lamp", impressions: 16200, clicks: 470, ctr: 2.9, cr: 9.8 },
          { kw: "abc arc lamp",          impressions: 14800, clicks: 415, ctr: 2.8, cr: 9.4 },
          { kw: "abc tall lamp",         impressions:  8400, clicks: 252, ctr: 3.0, cr: 10.2 },
        ],
      },
      {
        id: "ag-cat-broad",
        name: "Category · Broad match",
        campaignName: "SP — Category Broad",
        campaignType: "SP",
        keywordCount: 22,
        dailyBudget: 312,
        spend30d: 9140,
        sales30d: 42180,
        tacos: 21.8,
        acos: 14.3,
        ctr: 1.6,
        cr: 7.4,
        topKeywords: [
          { kw: "modern floor lamp",      impressions: 142000, clicks: 2556, ctr: 1.8, cr: 8.4 },
          { kw: "minimalist floor lamp",  impressions:  96400, clicks: 2024, ctr: 2.1, cr: 9.1 },
          { kw: "floor lamp for bedroom", impressions:  38200, clicks:  420, ctr: 1.1, cr: 6.2, flagged: "Bedroom · Insight #1" },
          { kw: "bedside floor lamp",     impressions:  22400, clicks:  224, ctr: 1.0, cr: 5.8, flagged: "Bedroom · Insight #1" },
          { kw: "bedroom reading lamp",   impressions:  14200, clicks:  170, ctr: 1.2, cr: 7.4, flagged: "Bedroom · Insight #1" },
          { kw: "tall arc floor lamp",    impressions:  18600, clicks:  372, ctr: 2.0, cr: 8.9 },
        ],
      },
      {
        id: "ag-cat-hero-exact",
        name: "Category Hero · Exact",
        campaignName: "SP — Category Exact",
        campaignType: "SP",
        keywordCount: 6,
        dailyBudget: 97,
        spend30d: 3680,
        sales30d: 26420,
        tacos: 13.9,
        acos: 11.5,
        ctr: 2.4,
        cr: 10.1,
        topKeywords: [
          { kw: "modern floor lamp (exact)",     impressions: 84200, clicks: 2021, ctr: 2.4, cr: 10.1 },
          { kw: "minimalist floor lamp (exact)", impressions: 62400, clicks: 1622, ctr: 2.6, cr:  9.8 },
        ],
      },
      {
        id: "ag-cat-secondary-exact",
        name: "Category Secondary · Exact",
        campaignName: "SP — Category Exact",
        campaignType: "SP",
        keywordCount: 12,
        dailyBudget: 97,
        spend30d: 2140,
        sales30d: 11520,
        tacos: 18.6,
        acos: 12.4,
        ctr: 1.8,
        cr: 7.8,
        topKeywords: [
          { kw: "arc floor lamp",            impressions: 36100, clicks: 938, ctr: 2.6, cr: 9.4 },
          { kw: "tall floor lamp",           impressions: 24200, clicks: 556, ctr: 2.3, cr: 9.1 },
          { kw: "reading floor lamp",        impressions: 14200, clicks: 282, ctr: 2.0, cr: 8.2 },
        ],
      },
      {
        id: "ag-longtail-phrase",
        name: "Long-tail · Phrase",
        campaignName: "SP — Long-tail Phrase",
        campaignType: "SP",
        keywordCount: 24,
        dailyBudget: 49,
        spend30d: 1820,
        sales30d:  9240,
        tacos: 19.7,
        acos: 16.8,
        ctr: 1.5,
        cr: 8.4,
        topKeywords: [
          { kw: "modern floor lamp for living room", impressions: 18200, clicks: 382, ctr: 2.1, cr: 8.6 },
          { kw: "tall floor lamp for bedroom",       impressions: 12100, clicks: 145, ctr: 1.2, cr: 6.4, flagged: "Bedroom · Insight #1" },
          { kw: "floor lamp for small bedroom",      impressions:  8400, clicks:  92, ctr: 1.1, cr: 5.8, flagged: "Bedroom · Insight #1" },
          { kw: "industrial floor lamp",             impressions: 11200, clicks: 224, ctr: 2.0, cr: 8.0 },
        ],
      },
      {
        id: "ag-longtail-auto",
        name: "Long-tail · Discovery (auto)",
        campaignName: "SP — Long-tail Phrase",
        campaignType: "SP",
        keywordCount: "auto",
        dailyBudget: 49,
        spend30d: 1120,
        sales30d:  4780,
        tacos: 23.4,
        acos: 19.3,
        ctr: 1.2,
        cr: 7.6,
        topKeywords: [
          { kw: "Auto-targeting discovery terms (~28 in 30d)", impressions: 38400, clicks: 461, ctr: 1.2, cr: 7.6 },
        ],
      },
      {
        id: "ag-sd-adjacent",
        name: "SD · Adjacent SKU audience",
        campaignName: "SD — Detail Page",
        campaignType: "SD",
        keywordCount: "audience",
        dailyBudget: 38,
        spend30d: 1480,
        sales30d:  6420,
        tacos: 23.1,
        acos: 18.9,
        ctr: 1.2,
        cr: 7.1,
        topKeywords: [
          { kw: "Adjacent-SKU shoppers (audience)", impressions: 64200, clicks: 770, ctr: 1.2, cr: 7.1 },
        ],
      },
      {
        id: "ag-sd-remarketing",
        name: "SD · Detail-page remarketing",
        campaignName: "SD — Detail Page",
        campaignType: "SD",
        keywordCount: "audience",
        dailyBudget: 38,
        spend30d:  800,
        sales30d: 3360,
        tacos: 23.8,
        acos: 19.3,
        ctr: 1.0,
        cr: 6.2,
        topKeywords: [
          { kw: "Detail-page remarketing (14d window)", impressions: 32400, clicks: 324, ctr: 1.0, cr: 6.2 },
        ],
      },
    ],
  },

  /* Listing operation log — past milestones on this SKU */
  operationLog: [
    { date: "Apr 4, 2025",  milestone: "Listing launched",                                detail: "Initial price $189 · 4 listing photos · 3 bullet points" },
    { date: "May 18, 2025", milestone: "Hero image refreshed to lifestyle context",       detail: "CTR lifted 1.2% → 1.8% within 14 days" },
    { date: "Jul 22, 2025", milestone: "Crossed 100 reviews · avg 4.6 stars",             detail: "CR rose to 7.4% (category benchmark at the time: 6.2%)" },
    { date: "Sep 8, 2025",  milestone: "A+ Content launched · feature comparison module", detail: "CR sustained ≥ 8.2% for 8 consecutive weeks" },
    { date: "Nov 16, 2025", milestone: "Hero-term CR broke category benchmark",            detail: "'modern floor lamp' CR 8.9% vs category 6.4%" },
    { date: "Jan 11, 2026", milestone: "Captured Top-5 category rank",                     detail: "First time in top-5 organic position" },
    { date: "Feb 22, 2026", milestone: "CTR on 'minimalist floor lamp' +52% vs category",  detail: "Held for 21 consecutive days — confirms creative fit on this term" },
    { date: "Apr 18, 2026", milestone: "Captured #2 category rank",                        detail: "Current position · held for 27 days" },
  ],

  /* Agent insights — two distinct types */
  insights: [
    {
      id: "bedroom-ctr",
      type: "informational",
      title: "Bedroom-intent keywords underperforming on CTR",
      summary:
        "14 search terms with bedroom intent generate $3.2K/month traffic at 1.1% CTR, well below the 2.8% category benchmark for the same intent cluster.",
      observations: [
        "5 of these 14 bedroom-intent keywords are live in current campaigns — flagged with rose tint in the Ad architecture panel (top bar → Ad architecture)",
        "Current CTR on those terms: 1.1% (28-day avg). Category benchmark for same intent cluster: 2.8%.",
        "Root-cause hypothesis: hero image and first 3 detail-page photos emphasize living-room / lobby context. No bedroom-context image in the current carousel.",
      ],
      projectedImpact: {
        primary: "+$18K/month sales",
        condition: "if bedroom-CTR closes to category benchmark and CR holds at current 8.4%",
      },
      ownership: "Brand team",
      ownershipReason:
        "Listing content changes (hero image, photo carousel, bullet positioning) fall outside platform-level execution scope. Agent flags and quantifies impact; team executes.",
      actions: ["Brief listing team", "Snooze 7d", "Mark resolved"],
    },
    {
      id: "best-seller-playbook",
      type: "executable",
      title: "Apply prior #2 → #1 capture playbook to SKU-A",
      summary:
        "ABC Home Goods · Bed frame SKU-117 went #2 → #1 in 7 weeks (Q4 2025) using a concentrated ad-lift + promo playbook. Floor Lamps SKU-A matches on lifecycle stage, competitive intensity, and price band.",
      reference: {
        sku: "Bed frame · SKU-117",
        period: "Q4 2025",
        outcome: "#2 → #1 in 7 weeks",
        method:
          "4 weeks of concentrated ad lift (TACoS 19% → 31% temporary) + 14-day 15%-off promo. Captured #1 in week 6. Through the 6-week taper that followed, sales held +18% above pre-campaign baseline — best-seller halo carried organic clicks +34% and offset the ad-spend reduction.",
      },
      plan: {
        phases: [
          {
            label: "Weeks 1–4 · Aggressive lift",
            actions: [
              "Daily ad budget $848 → $1,420 (+67%)",
              "Add SB headline ad layer on top 12 hero category keywords",
              "Add 14-day promo coupon: 12% off",
            ],
            tacos: 32.4,
            sales: 172,
          },
          {
            label: "Weeks 5–8 · Capture + halo activates",
            actions: [
              "Maintain week-4 architecture through capture window",
              "Best-seller halo expected to lift organic clicks +28% to +42%",
            ],
            tacos: 28.6,
            sales: 196,
          },
          {
            label: "Weeks 9–12 · Ad taper · halo sustains sales",
            actions: [
              "Daily ad budget $1,420 → $920 (−35%)",
              "Organic + halo expected to outpace ad reduction · sales hold or modestly grow",
            ],
            tacos: 17.8,
            sales: 204,
          },
        ],
        summary: {
          cumulativeSalesLift: 158,
          finalTacos: 17.8,
          captureWindow: "Week 6–8",
        },
      },
      confidence: 81,
      confidenceLabel: "9 prior comparable #2 → #1 captures · 7 of 9 used this playbook shape",
    },
  ],

  /* Milestone path — aligned to this specific best-seller goal */
  milestonePath: [
    {
      idx: 1,
      label: "Listing optimization",
      target: "Bedroom-intent CTR closes to category benchmark (1.1% → 2.0%+)",
      window: "Weeks 1–2",
      dependsOn: "Brand team · from Insight #1",
      status: "blocked-on-team",
    },
    {
      idx: 2,
      label: "Ad architecture lift",
      target: "Hero keywords reach Top-3 organic · SOV 14% → 26%",
      window: "Weeks 1–4",
      dependsOn: "Agent · from Insight #2 plan",
      status: "awaiting-approval",
    },
    {
      idx: 3,
      label: "Best seller capture",
      target: "Category rank #1",
      window: "Weeks 6–8",
      dependsOn: "Outcome of #1 + #2",
      status: "goal",
    },
    {
      idx: 4,
      label: "Return to target TACoS",
      target: "TACoS back to 17–19% · sales hold within −5% of peak",
      window: "Weeks 9–12",
      dependsOn: "Activated after #3 captured",
      status: "preview",
    },
  ],

  reasoning: {
    chain: [
      "Starting from stated goal: best seller capture within 90 days.",
      "Analyzed current listing health: rank #2, sales $138K/mo, TACoS 18.1% — well within target band. Listing is mature and operating efficiently. Pure ad-architecture changes alone are unlikely to close to #1.",
      "Audited current ad architecture (5 campaigns, $848/d combined). No structural inefficiency detected at the campaign level.",
      "Scanned listing for pockets of weakness. Identified bedroom-context search terms as the highest-impact CTR gap — but resolution requires listing-content edits, which fall outside agent execution scope (surfaced as Insight #1).",
      "Pulled 9 prior #2 → #1 captures from Company Brain. 7 of 9 used a concentrated ad-lift + promo playbook. Best similarity match: bed frame SKU-117 in Q4 2025 (same lifecycle stage, comparable competitive intensity, adjacent price band).",
      "Drafted 3-phase plan from that playbook (Insight #2). Best-seller halo and taper outcomes modeled from observed prior outcome.",
      "Composed sequential milestone path: listing fix (team) + ad lift (agent) → capture → efficiency restore.",
      "Confidence on 90-day timeline: 81%.",
    ],
    accuracy: 81,
    accuracyLabel: "similar #2 → #1 captures",
  },
};

/* Growth canvas */
const GROWTH = {
  current: "$1.04M",
  target: "$1.20M",
  gap: "$148K incremental",
  funnel: [
    { stage: "Impression Share", current: 31.2, benchmark: 38.0, unit: "%", headroom: 6.8, bottleneck: false },
    { stage: "CTR", current: 1.8, benchmark: 3.2, unit: "%", headroom: 1.4, bottleneck: true },
    { stage: "Conversion Rate", current: 8.4, benchmark: 8.9, unit: "%", headroom: 0.5, bottleneck: false },
    { stage: "AOV", current: 142, benchmark: 148, unit: "$", headroom: 6, bottleneck: false },
  ],
  bottleneckSegment: {
    name: "Urban renters · 25–34 · modern aesthetic",
    currentCtr: 1.8,
    benchmarkCtr: 3.2,
    incrementalRevenue: 148,
  },
  searchTerms: [
    { term: "modern floor lamp urban", ctr: 1.4, bid: 1.40, proposedBid: 1.85, expectedCtr: 2.6, revenue: 28.4 },
    { term: "minimalist floor lamp", ctr: 1.6, bid: 1.55, proposedBid: 1.95, expectedCtr: 2.8, revenue: 24.1 },
    { term: "floor lamp small apartment", ctr: 2.1, bid: 1.20, proposedBid: 1.60, expectedCtr: 3.1, revenue: 21.8 },
    { term: "tall arc floor lamp", ctr: 1.8, bid: 1.65, proposedBid: 2.05, expectedCtr: 2.9, revenue: 19.6 },
    { term: "reading floor lamp modern", ctr: 1.9, bid: 1.40, proposedBid: 1.80, expectedCtr: 3.0, revenue: 17.2 },
    { term: "mid century floor lamp", ctr: 2.0, bid: 1.35, proposedBid: 1.75, expectedCtr: 3.0, revenue: 14.9 },
    { term: "corner floor lamp small space", ctr: 1.7, bid: 1.25, proposedBid: 1.65, expectedCtr: 2.7, revenue: 12.3 },
    { term: "tripod floor lamp modern", ctr: 1.5, bid: 1.45, proposedBid: 1.90, expectedCtr: 2.8, revenue: 9.8 },
  ],
  creatives: [
    {
      name: "Lifestyle-first hero",
      detail: "Apartment context, lamp as anchor object in lived-in space",
      estLift: "+0.6pp CTR",
      reference: "4 of 5 prior lifestyle tests succeeded in adjacent categories",
    },
    {
      name: "Feature-first hero",
      detail: "Adjustable head + dimmer hardware close-up",
      estLift: "+0.4pp CTR",
      reference: "Strongest on feature-driven SKUs (4 of 7 lift)",
    },
    {
      name: "Price-anchor hero",
      detail: "$149 banner crop with comparison strike",
      estLift: "+0.9pp CTR",
      reference: "Highest variance — succeeded in 3 of 6 tests",
    },
  ],
  reasoning: {
    chain: [
      "TACoS at 37.4% and ACoS at 24.1% are healthy and within target band — efficiency is not the blocker.",
      "Funnel decomposition isolates impression-to-click on a specific audience segment (urban renters, 25–34) as the bottleneck.",
      "Pulled 9 prior funnel-bottleneck-on-CTR cases from Company Brain. 7 resolved within 30 days through bid + creative combination.",
      "Drafted plan: targeted bid uplift on 8 search terms used by that segment + 3 creative tests on detail-page main image.",
      "Confidence on $1.20M target: 78%.",
    ],
    accuracy: 78,
    accuracyLabel: "similar funnel-bottleneck resolutions",
  },
};

/* Peak season canvas */
const PEAK = {
  trafficForecast: [
    { week: "Now", traffic: 100, pressure: 58 },
    { week: "W+1", traffic: 118, pressure: 72 },
    { week: "W+2", traffic: 144, pressure: 81 },
    { week: "W+3", traffic: 172, pressure: 89 },
    { week: "W+4", traffic: 195, pressure: 94 },
    { week: "W+5", traffic: 218, pressure: 96 },
    { week: "W+6", traffic: 234, pressure: 98 },
  ],
  competitiveSignals: [
    {
      label: "Competitor bid spend lift",
      value: "+40 to 60%",
      detail: "3 competitor SKUs increased over past 14 days",
    },
    {
      label: "New entrant",
      value: "9 days in market",
      detail: "1 new SKU in launch-phase aggressive bidding",
    },
    {
      label: "Competitor SOV gain on hero keywords",
      value: "+27pp",
      detail: "Composite competitive SOV move on top 12 category terms",
    },
  ],
  portfolio: [
    { sku: "SKU-A Arc Floor Lamp",     lifecycle: "Scaling",  sov: 18.4, posture: "defend",    tacosCap: 32, bidAdj: "+18%" },
    { sku: "SKU-B Tripod 64\"",       lifecycle: "Scaling",  sov: 14.2, posture: "defend",    tacosCap: 32, bidAdj: "+14%" },
    { sku: "SKU-D Reading Lamp",       lifecycle: "Mature",   sov:  9.6, posture: "defend",    tacosCap: 32, bidAdj: "+12%" },
    { sku: "SKU-E Mid-Century",        lifecycle: "Mature",   sov: 11.8, posture: "defend",    tacosCap: 32, bidAdj: "+9%"  },
    { sku: "SKU-F Minimal LED",        lifecycle: "Scaling",  sov:  6.4, posture: "lean-in",   tacosCap: 38, bidAdj: "+28%" },
    { sku: "SKU-G Corner Arc",         lifecycle: "Scaling",  sov:  5.1, posture: "lean-in",   tacosCap: 38, bidAdj: "+24%" },
    { sku: "SKU-H Industrial",         lifecycle: "Launch",   sov:  3.2, posture: "lean-in",   tacosCap: 42, bidAdj: "+32%" },
    { sku: "SKU-I Vintage Brass",      lifecycle: "Decline",  sov:  2.1, posture: "step-back", tacosCap: 18, bidAdj: "−22%" },
    { sku: "SKU-J Glass Globe",        lifecycle: "Decline",  sov:  1.8, posture: "step-back", tacosCap: 18, bidAdj: "−18%" },
  ],
  decision: {
    additionalWeeklyBudget: 42,
    defendCount: 4,
    leanInCount: 3,
    stepBackCount: 2,
  },
  reasoning: {
    chain: [
      "Holding TACoS flat through a peak traffic shift would surrender SOV at the most valuable window.",
      "Pulled prior 3 peak seasons from Company Brain. Brands that held flat TACoS lost an average of 14pp category SOV — took 4–6 months to recover.",
      "Lifecycle-stage segmentation: defend on Scaling/Mature high-SOV SKUs; lean-in on under-saturated Scaling/Launch SKUs where competitive bid pressure hasn't peaked; step-back on Decline SKUs to preserve margin.",
      "Confidence on SOV defense outcome: 71%.",
    ],
    accuracy: 71,
    accuracyLabel: "peak-season SOV defense outcomes",
  },
};

/* Execution canvas */
const EXECUTION = {
  summary: {
    total: 23,
    teamApproved: 18,
    autonomous: 5,
    reverted: 0,
  },
  actions: [
    { ts: "May 15 · 08:24", type: "Bid edit",       kind: "autonomous", delta: 'Bid on "modern floor lamp" raised $1.40 → $1.85', reason: "CTR above target for 48hr; bid raise within delegated class.",                approver: "Autonomous · class: bid_raise_under_15pct",  status: "Live" },
    { ts: "May 14 · 22:11", type: "Budget",         kind: "approved",   delta: "Daily budget on SP-Category-Exact raised $480 → $640",        reason: "Hit cap on 7 of last 9 days; impression share suppressed by ~6pp.",        approver: "Approved by Maya Chen",                       status: "Live" },
    { ts: "May 14 · 14:08", type: "Keyword",        kind: "approved",   delta: "Added 6 long-tail keywords harvested from search-term report", reason: "CR > 9% in past 14 days; currently auto-targeting only.",                  approver: "Approved by Devon Park",                      status: "Live" },
    { ts: "May 13 · 16:42", type: "Bid edit",       kind: "autonomous", delta: 'Bid on "tripod floor lamp" lowered $1.95 → $1.70',           reason: "ACoS exceeded target by 12pp for 72hr; within delegated class.",           approver: "Autonomous · class: bid_lower_under_15pct",   status: "Live" },
    { ts: "May 13 · 09:22", type: "Restructure",    kind: "approved",   delta: "Split SP-Category-Broad into Broad + Phrase tiers",          reason: "Phrase-only subset projected +14% efficiency on mid-funnel terms.",        approver: "Approved by Sara Lin",                        status: "Live" },
    { ts: "May 12 · 18:34", type: "Budget",         kind: "approved",   delta: "Reallocated $320/day from SP-Branded → SP-Category-Exact",   reason: "Branded impression share saturated at 98%; marginal $ better deployed.",   approver: "Approved by Maya Chen",                       status: "Live" },
    { ts: "May 11 · 11:15", type: "Keyword",        kind: "approved",   delta: 'Negatives added: "lava lamp", "salt lamp", "lamp shade"',    reason: "High-impression, zero-conversion terms identified in search-term report.", approver: "Approved by Jamal Hassan",                    status: "Live" },
    { ts: "May 10 · 14:52", type: "Bid edit",       kind: "autonomous", delta: 'Bid on "reading floor lamp modern" raised $1.40 → $1.62',   reason: "CR > target for 48hr; bid raise within delegated class.",                  approver: "Autonomous · class: bid_raise_under_15pct",   status: "Live" },
    { ts: "May 09 · 10:08", type: "Bid edit",       kind: "autonomous", delta: 'Bid on "corner floor lamp" lowered $1.25 → $1.10',          reason: "ACoS spike of +14pp sustained 72hr; auto-throttle engaged.",               approver: "Autonomous · class: bid_lower_under_15pct",   status: "Live" },
  ],
  pending: [
    { ts: "May 15 · 11:42", summary: "Pause underperforming AG: Category-Phrase-Long-Tail (47 terms)",      reason: "Net contribution −$184/day for past 11 days." },
    { ts: "May 15 · 09:18", summary: "Increase daily cap on SP-Branded-Defense by $180",                    reason: "Competitor SKU-X started bidding on our brand terms 4 days ago." },
    { ts: "May 14 · 17:55", summary: "Migrate 8 keywords from SP-broad to SP-exact",                       reason: "CR consistently > 7% — match-type consolidation expected to lift efficiency." },
  ],
  autonomousClasses: [
    { name: "Bid raise / lower (≤15% delta)",                 count: 38, lastUsed: "May 15 · 08:24" },
    { name: "Negative keyword harvest (zero-conv > 14d)",     count: 22, lastUsed: "May 13 · 06:00" },
    { name: "Budget reallocation within campaign (≤20%)",     count:  9, lastUsed: "May 14 · 03:12" },
    { name: "Dayparting on saturated impression share",       count:  4, lastUsed: "May 11 · 18:30" },
  ],
  reasoning: {
    chain: [
      "Past 7 days, the agent took 23 ad-platform actions on SKU-A.",
      "18 followed the standing review-and-approve flow; team approved each within an average of 47 minutes.",
      "5 ran under previously delegated decision classes — all bid edits within ±15% delta. Team retains revocation authority at any time.",
      "0 actions were reverted; net efficiency improvement on SKU-A over the period: ACoS −3.2pp, impression share +4pp.",
    ],
    accuracy: 94,
    accuracyLabel: "actions retained after team review",
  },
};

/* Launch canvas */
const LAUNCH = {
  sku: "SKU-C Tripod Floor Lamp",
  category: "Floor Lamps",
  targetLaunch: "June 12",
  priorLaunches: [
    { sku: "SKU-prior-3 Brass Arc",  date: "2025 Q4", outcome: "Top-12 in 11 weeks", similarity: "High",   note: "Same price band, same category" },
    { sku: "SKU-prior-5 Industrial", date: "2025 Q4", outcome: "Top-20 in 9 weeks",  similarity: "High",   note: "Same lifecycle entry point" },
    { sku: "SKU-prior-2 Mid-century",date: "2025 Q3", outcome: "Top-8 in 14 weeks",  similarity: "Medium", note: "Adjacent style cluster" },
  ],
  campaignArchitecture: [
    { type: "SP", name: "SP — Launch Hero",        adgroups: ["Head exact (6 kw)", "Head phrase (6 kw)"],            budget: 920 },
    { type: "SP", name: "SP — Launch Mid",         adgroups: ["Mid phrase (24 kw)", "Mid exact (after wk 2)"],      budget: 1480 },
    { type: "SP", name: "SP — Launch Long-tail",   adgroups: ["Long-tail phrase (64 kw)"],                          budget: 740 },
    { type: "SB", name: "SB — Category Headline",  adgroups: ["Hero-keyword video (6 kw)"],                         budget: 680 },
    { type: "SD", name: "SD — Detail-page Audience", adgroups: ["Adjacent-SKU shoppers"],                           budget: 240 },
  ],
  keywords: [
    { tier: "Head",      count:  6, dailyBudget: 920,  examples: "modern floor lamp · minimalist floor lamp" },
    { tier: "Mid",       count: 24, dailyBudget: 1480, examples: "arc floor lamp · tripod floor lamp · reading lamp tall" },
    { tier: "Long-tail", count: 64, dailyBudget: 740,  examples: "modern floor lamp for small apartment · tripod 64 inch" },
  ],
  bidStrategy: [
    { phase: "Week 1 · Aggressive", head: "$2.40 – $2.85", mid: "$1.60 – $1.95", long: "$0.80 – $1.10", logic: "Establish auction presence; bid floor on hero keywords for early ranking signal." },
    { phase: "Week 2–3 · Stabilize", head: "$2.10 – $2.45", mid: "$1.40 – $1.70", long: "$0.65 – $0.90", logic: "Tune from observed CTR / CR. Defend SOV gained in week 1." },
    { phase: "Week 4 · Efficiency", head: "$1.80 – $2.10", mid: "$1.20 – $1.45", long: "$0.55 – $0.75", logic: "Shift to TACoS optimization. Long-tail tier prioritized for incremental efficient revenue." },
  ],
  pacing: [
    { week: "W1", daily: 449, total: 3143 },
    { week: "W2", daily: 383, total: 2681 },
    { week: "W3", daily: 346, total: 2422 },
    { week: "W4", daily: 311, total: 2177 },
  ],
  milestones: [
    { week: 1, gate: "Impression threshold", target: "≥ 50K impressions on hero keywords",   rationale: "Confirms auction presence before scaling spend." },
    { week: 2, gate: "CTR threshold",        target: "CTR ≥ 1.4% on Mid tier",                 rationale: "Confirms creative + listing relevance before mid-tier scale-up." },
    { week: 3, gate: "SOV threshold",        target: "Category SOV ≥ 4%",                       rationale: "Confirms category-level visibility before final efficiency phase." },
    { week: 4, gate: "TACoS gate",           target: "TACoS ≤ 42% blended",                     rationale: "Confirms efficiency envelope before steady-state scaling." },
  ],
  reasoning: {
    chain: [
      "Drew methodology from 7 prior launches in Company Brain; 3 high-similarity launches weighted most.",
      "Common pattern across successful launches: aggressive week-1 bid floor on 4–6 hero keywords; lifecycle transition at impression threshold 50K; SP-broad → SP-exact switch at CR threshold 5%.",
      "Drafted 5-phase playbook with milestone gates approved phase-by-phase, not whole-plan-upfront.",
      "Confidence on hitting Top-12 within 12 weeks: 81%.",
    ],
    accuracy: 81,
    accuracyLabel: "similar new-SKU launches",
  },
};

const COMPANY_BRAIN = {
  decisionClasses: 47,
  playbooks: 19,
  capturedPatterns: 142,
  recentEntries: [
    { name: "Best-seller capture · SB-layer pattern", added: "May 2 · from SKU-prior-1 outcome" },
    { name: "Peak-season SOV defense · scaling SKUs", added: "Apr 28 · from 2025 Q4 retrospective" },
    { name: "Funnel bottleneck · CTR resolution playbook", added: "Apr 21 · from SKU-B outcome" },
    { name: "Launch ramp curve · price band $120–180", added: "Apr 14 · from SKU-prior-5 outcome" },
  ],
};

/* ────────────────────────────────────────────────────────────────────────── */
/*  Helpers / shared primitives                                              */
/* ────────────────────────────────────────────────────────────────────────── */

const SLATE = {
  bg: "bg-slate-50",
  card: "bg-white",
  border: "border-slate-200",
  borderStrong: "border-slate-300",
  text: "text-slate-900",
  textMuted: "text-slate-600",
  textSubtle: "text-slate-500",
  textFaint: "text-slate-400",
};

function Pill({ children, tone = "slate", className = "" }) {
  const tones = {
    slate:   "bg-slate-100 text-slate-700 border-slate-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber:   "bg-amber-50 text-amber-700 border-amber-200",
    rose:    "bg-rose-50 text-rose-700 border-rose-200",
    blue:    "bg-blue-50 text-blue-700 border-blue-200",
    dark:    "bg-slate-900 text-white border-slate-900",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md border ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children, kicker }) {
  return (
    <div className="mb-3 flex items-baseline justify-between">
      <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
        {children}
      </div>
      {kicker && (
        <div className="text-xs text-slate-400 font-mono">{kicker}</div>
      )}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-lg ${className}`}
    >
      {children}
    </div>
  );
}

function ActionBar({ approveLabel = "Approve" }) {
  const [modifying, setModifying] = useState(false);
  return (
    <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-4">
      {modifying ? (
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
            Modify in plain language
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. hold the SB layer launch until SKU-A inventory clears"
              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
            <button
              type="button"
              onClick={() => setModifying(false)}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-md"
            >
              <Send className="w-3.5 h-3.5" />
              Send modification
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Recommendation generated 14 minutes ago · awaiting team decision
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
              Decline
            </button>
            <button
              type="button"
              onClick={() => setModifying(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-100 rounded-md bg-white"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Modify
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md"
            >
              <Check className="w-3.5 h-3.5" />
              {approveLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ReasoningSection({ reasoning }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-slate-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-3 hover:bg-slate-50"
      >
        <div className="flex items-center gap-2">
          {open ? (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-500" />
          )}
          <span className="text-xs uppercase tracking-wider font-medium text-slate-700">
            Agent reasoning
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500">
            Historical accuracy:{" "}
            <span className="font-mono text-slate-700">{reasoning.accuracy}%</span>{" "}
            on {reasoning.accuracyLabel}
          </span>
        </div>
        <div className="text-xs text-slate-400">
          {reasoning.chain.length} steps
        </div>
      </button>
      {open && (
        <div className="px-6 pb-5 pt-1">
          <div className="space-y-2.5 border-l border-slate-200 pl-4 ml-1.5">
            {reasoning.chain.map((step, i) => (
              <div key={i} className="flex items-start gap-3" style={{ marginLeft: "-19px" }}>
                <div className="mt-1 w-3 h-3 rounded-full bg-white border-2 border-slate-300 flex-shrink-0" />
                <div className="text-sm text-slate-600 leading-relaxed pt-0.5">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CanvasHeader({ kicker, title, meta }) {
  return (
    <div className="px-6 py-5 border-b border-slate-200">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-emerald-700 font-medium mb-1.5">
            {kicker}
          </div>
          <h2 className="text-xl font-semibold text-slate-900 tracking-tight">
            {title}
          </h2>
        </div>
        {meta && (
          <div className="flex flex-wrap items-center gap-2 pt-1">{meta}</div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Stage 1 — Strategy canvas                                                 */
/* ────────────────────────────────────────────────────────────────────────── */

function GapCard({ gap }) {
  const maxNumeric = Math.max(gap.currentNumeric, gap.benchmarkNumeric);
  const currentPct = (gap.currentNumeric / maxNumeric) * 100;
  return (
    <Card className={`p-4 ${gap.widest ? "border-rose-300" : ""}`}>
      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-11 uppercase tracking-wider text-emerald-700 font-semibold">
            {gap.kicker}
          </div>
          <div className="text-sm font-medium text-slate-900 mt-0.5">
            {gap.label}
          </div>
        </div>
        {gap.widest && (
          <Pill tone="rose">Widest gap</Pill>
        )}
      </div>

      <div className="mt-4 space-y-2.5">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-11 text-slate-500">SKU-A</span>
            <span className="text-sm font-mono font-semibold text-slate-900">
              {gap.currentValue}
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-400"
              style={{ width: `${currentPct}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-11 text-slate-500">#1 best seller</span>
            <span className="text-sm font-mono text-slate-700">
              {gap.benchmarkValue}
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-slate-700 w-full" />
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-11 uppercase tracking-wider text-slate-500 font-medium">
          Gap to #1
        </span>
        <div className="text-right">
          <div
            className={`text-sm font-mono font-semibold ${
              gap.widest ? "text-rose-700" : "text-rose-700"
            }`}
          >
            {gap.gap}
          </div>
          <div className="text-10 text-slate-500">{gap.gapDetail}</div>
        </div>
      </div>
    </Card>
  );
}

function SegmentBreakdownTable({ rows }) {
  const maxImpressions = Math.max(...rows.map((r) => r.impressionsK));
  return (
    <Card>
      <div className="px-4 py-2.5 border-b border-slate-100 bg-slate-50/40 text-11 text-slate-600 leading-relaxed">
        Impressions are decomposed into{" "}
        <span className="text-slate-900 font-medium">avg organic rank</span>{" "}
        and{" "}
        <span className="text-slate-900 font-medium">avg ad position</span>{" "}
        — the two levers that drive impression volume.
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              Sub-segment
            </th>
            <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              Terms
            </th>
            <th className="text-left text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              Monthly impressions
            </th>
            <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              Avg organic rank
            </th>
            <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              Avg ad position
            </th>
            <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              CTR
            </th>
            <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              CR
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const barPct = (r.impressionsK / maxImpressions) * 100;
            const organicGap = r.organicRank - r.organicRankBenchmark;
            const adPosGap = r.adPosition - r.adPositionBenchmark;
            const organicLagging = organicGap >= 5;
            const adLagging = adPosGap >= 2;
            return (
              <tr
                key={i}
                className={`border-b border-slate-100 last:border-0 ${
                  r.alert ? "bg-rose-50/40" : ""
                }`}
              >
                <td className="py-2.5 px-3 align-top">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={
                        r.alert
                          ? "text-rose-900 font-medium"
                          : "text-slate-900 font-medium"
                      }
                    >
                      {r.name}
                    </span>
                    {r.alert && <Pill tone="rose">{r.alertNote}</Pill>}
                  </div>
                  {r.exampleTerms && (
                    <div className="text-10 text-slate-500 mt-1 leading-relaxed">
                      e.g. {r.exampleTerms}
                    </div>
                  )}
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-slate-700 align-top">
                  {r.terms}
                </td>
                <td className="py-2.5 px-3 align-top">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden"
                      style={{ maxWidth: "6rem" }}
                    >
                      <div
                        className={`h-full ${
                          r.alert ? "bg-rose-400" : "bg-slate-400"
                        }`}
                        style={{ width: `${barPct}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-slate-700 w-12 text-right">
                      {r.impressionsK}K
                    </span>
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right align-top">
                  <div
                    className={`font-mono text-sm ${
                      organicLagging
                        ? "text-rose-700 font-semibold"
                        : "text-slate-700"
                    }`}
                  >
                    #{r.organicRank}
                  </div>
                  <div className="text-10 text-slate-400 font-mono mt-0.5">
                    best #{r.organicRankBenchmark}
                  </div>
                </td>
                <td className="py-2.5 px-3 text-right align-top">
                  <div
                    className={`font-mono text-sm ${
                      adLagging
                        ? "text-rose-700 font-semibold"
                        : "text-slate-700"
                    }`}
                  >
                    slot {r.adPosition}
                  </div>
                  <div className="text-10 text-slate-400 font-mono mt-0.5">
                    best slot {r.adPositionBenchmark}
                  </div>
                </td>
                <td
                  className={`py-2.5 px-3 text-right font-mono align-top ${
                    r.alert ? "text-rose-700 font-semibold" : "text-slate-700"
                  }`}
                >
                  {r.ctr}%
                </td>
                <td
                  className={`py-2.5 px-3 text-right font-mono align-top ${
                    r.alert ? "text-rose-700 font-semibold" : "text-slate-700"
                  }`}
                >
                  {r.cr}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

function PerformanceStrip() {
  const p = STRATEGY.performance;
  const [activeSegment, setActiveSegment] = useState("all");
  const gaps = p.gapsBySegment[activeSegment] || p.gapsBySegment.all;
  const breakdown = p.segmentBreakdown[activeSegment];
  const activeChip = p.segments.find((s) => s.id === activeSegment);

  return (
    <>
      {/* Status meta line */}
      <div className="mb-3 flex items-center gap-2 text-11 text-slate-500">
        <Pill tone="slate">Currently {p.rank}</Pill>
        <span>·</span>
        <span>
          {p.rankCategory} · held {p.rankHeldDays}d · sales{" "}
          <span className="font-mono text-slate-700">
            ${(p.salesLast30d / 1000).toFixed(0)}K/mo
          </span>{" "}
          · blended TACoS{" "}
          <span className="font-mono text-slate-700">{p.tacos}%</span>
        </span>
      </div>

      {/* Segment chips */}
      <div className="mb-3 flex items-center gap-2 flex-wrap">
        {p.segments.map((seg) => {
          const active = activeSegment === seg.id;
          return (
            <button
              type="button"
              key={seg.id}
              onClick={() => setActiveSegment(seg.id)}
              className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md border transition-colors ${
                active
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{seg.label}</span>
              <span
                className={`font-mono ${
                  active ? "text-slate-300" : "text-slate-400"
                }`}
              >
                {seg.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active chip's kicker */}
      {activeChip && activeChip.kicker && (
        <div className="mb-3 text-11 text-slate-500 italic">
          {activeChip.kicker}
        </div>
      )}

      {/* 3 gap cards */}
      <div className="grid grid-cols-3 gap-3">
        {gaps.map((g, i) => (
          <GapCard key={`${activeSegment}-${i}`} gap={g} />
        ))}
      </div>

      {/* Sub-segment breakdown (only for scenario / style) */}
      {breakdown && (
        <div className="mt-4">
          <div className="mb-2 text-11 uppercase tracking-wider text-slate-500 font-medium">
            Sub-segment breakdown
          </div>
          <SegmentBreakdownTable rows={breakdown} />
        </div>
      )}
    </>
  );
}

function AdGroupRow({ adGroup, expanded, onToggle }) {
  const flaggedCount = adGroup.topKeywords.filter((k) => k.flagged).length;
  return (
    <>
      <tr
        className="border-b border-slate-100 hover:bg-slate-50/60 cursor-pointer"
        onClick={onToggle}
      >
        <td className="py-2.5 px-3">
          <div className="flex items-center gap-2">
            {expanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            )}
            <div className="min-w-0">
              <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                {adGroup.name}
                {flaggedCount > 0 && (
                  <Pill tone="rose">{flaggedCount} flagged</Pill>
                )}
              </div>
              <div className="text-11 text-slate-500 mt-0.5 flex items-center gap-1.5">
                <Pill tone="slate">{adGroup.campaignType}</Pill>
                <span>{adGroup.campaignName}</span>
              </div>
            </div>
          </div>
        </td>
        <td className="py-2.5 px-3 text-right font-mono text-11 text-slate-500">
          {adGroup.keywordCount}
        </td>
        <td className="py-2.5 px-3 text-right font-mono text-slate-700">
          ${adGroup.dailyBudget}
        </td>
        <td className="py-2.5 px-3 text-right font-mono text-slate-700">
          ${adGroup.spend30d.toLocaleString()}
        </td>
        <td className="py-2.5 px-3 text-right font-mono text-slate-900 font-medium">
          ${adGroup.sales30d.toLocaleString()}
        </td>
        <td className="py-2.5 px-3 text-right font-mono text-slate-700">
          {adGroup.tacos}%
        </td>
        <td className="py-2.5 px-3 text-right font-mono text-slate-700">
          {adGroup.ctr}%
        </td>
        <td className="py-2.5 px-3 text-right font-mono text-slate-700">
          {adGroup.cr}%
        </td>
      </tr>
      {expanded && (
        <tr className="bg-slate-50/60">
          <td colSpan={8} className="p-0">
            <div className="px-9 py-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="text-11 uppercase tracking-wider text-slate-500 font-medium">
                  Top keywords / audiences
                </div>
                <div className="text-11 text-slate-400">
                  {adGroup.topKeywords.length} shown · ranked by impressions
                </div>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-10 uppercase tracking-wider text-slate-500 font-medium py-1.5 pr-3">
                      Keyword / audience
                    </th>
                    <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-1.5 px-3">
                      Impressions
                    </th>
                    <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-1.5 px-3">
                      Clicks
                    </th>
                    <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-1.5 px-3">
                      CTR
                    </th>
                    <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-1.5 pl-3">
                      CR
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {adGroup.topKeywords.map((kw, j) => (
                    <tr
                      key={j}
                      className={`border-b border-slate-100 last:border-0 ${
                        kw.flagged ? "bg-rose-50/60" : ""
                      }`}
                    >
                      <td className="py-1.5 pr-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CornerDownRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
                          <span
                            className={
                              kw.flagged
                                ? "text-rose-900 font-medium"
                                : "text-slate-700"
                            }
                          >
                            {kw.kw}
                          </span>
                          {kw.flagged && (
                            <Pill tone="rose">{kw.flagged}</Pill>
                          )}
                        </div>
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono text-slate-600">
                        {kw.impressions.toLocaleString()}
                      </td>
                      <td className="py-1.5 px-3 text-right font-mono text-slate-600">
                        {kw.clicks.toLocaleString()}
                      </td>
                      <td
                        className={`py-1.5 px-3 text-right font-mono ${
                          kw.flagged
                            ? "text-rose-700 font-semibold"
                            : "text-slate-700"
                        }`}
                      >
                        {kw.ctr}%
                      </td>
                      <td
                        className={`py-1.5 pl-3 text-right font-mono ${
                          kw.flagged
                            ? "text-rose-700 font-semibold"
                            : "text-slate-700"
                        }`}
                      >
                        {kw.cr}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function AdArchitectureTable() {
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const toggle = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const s = STRATEGY.adArchitecture.summary;
  const colHeaders = [
    { label: "Ad group · parent campaign", align: "left" },
    { label: "Targets", align: "right" },
    { label: "Daily $", align: "right" },
    { label: "Spend 30d", align: "right" },
    { label: "Sales 30d", align: "right" },
    { label: "TACoS", align: "right" },
    { label: "CTR", align: "right" },
    { label: "CR", align: "right" },
  ];
  return (
    <Card>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/40">
            {colHeaders.map((h, i) => (
              <th
                key={i}
                className={`${
                  h.align === "left" ? "text-left" : "text-right"
                } text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3`}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {STRATEGY.adArchitecture.adGroups.map((ag) => (
            <AdGroupRow
              key={ag.id}
              adGroup={ag}
              expanded={expandedIds.has(ag.id)}
              onToggle={() => toggle(ag.id)}
            />
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-slate-200 bg-slate-50/60">
            <td className="py-2.5 px-3 text-11 uppercase tracking-wider text-slate-500 font-medium">
              Blended · {s.adGroupCount} ad groups · {s.campaignCount} campaigns
            </td>
            <td className="py-2.5 px-3 text-right font-mono text-slate-700">
              {s.keywordCount}
            </td>
            <td className="py-2.5 px-3 text-right font-mono text-slate-900 font-semibold">
              ${s.dailyBudget}
            </td>
            <td className="py-2.5 px-3 text-right font-mono text-slate-700">
              ${s.spend30d.toLocaleString()}
            </td>
            <td className="py-2.5 px-3 text-right font-mono text-slate-900 font-semibold">
              ${s.sales30d.toLocaleString()}
            </td>
            <td className="py-2.5 px-3 text-right font-mono text-slate-700">
              {s.tacos}%
            </td>
            <td colSpan={2} />
          </tr>
        </tfoot>
      </table>
    </Card>
  );
}

function OperationLog() {
  return (
    <Card className="p-5">
      <div className="relative pl-5">
        <div className="absolute top-2 bottom-2 w-px bg-slate-200" style={{ left: "6px" }} />
        <div className="space-y-3">
          {STRATEGY.operationLog.map((entry, i) => {
            const isLatest = i === STRATEGY.operationLog.length - 1;
            return (
              <div key={i} className="relative">
                <div
                  className={`absolute top-1.5 w-2 h-2 rounded-full ${
                    isLatest ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                  style={{ left: "-14px" }}
                />
                <div className="flex items-baseline gap-3">
                  <div className="w-28 flex-shrink-0 text-11 text-slate-500 font-mono">
                    {entry.date}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className={`text-sm ${
                        isLatest
                          ? "text-slate-900 font-medium"
                          : "text-slate-700"
                      }`}
                    >
                      {entry.milestone}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                      {entry.detail}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

function InformationalInsightCard({ insight }) {
  return (
    <Card className="border-amber-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-amber-100 bg-amber-50/40 flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0">
          <AlertCircle className="w-4 h-4 text-amber-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Pill tone="amber">Brand team action</Pill>
            <span className="text-11 text-slate-500">Insight #1 of 2</span>
          </div>
          <div className="text-sm font-medium text-slate-900">
            {insight.title}
          </div>
          <div className="text-xs text-slate-600 mt-1 leading-relaxed">
            {insight.summary}
          </div>
        </div>
      </div>

      {/* Observations */}
      <div className="px-5 py-4">
        <SectionLabel>Observations</SectionLabel>
        <ul className="space-y-1.5">
          {insight.observations.map((obs, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed"
            >
              <span className="w-1 h-1 mt-1.5 rounded-full bg-slate-400 flex-shrink-0" />
              <span>{obs}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Impact + ownership */}
      <div className="px-5 py-3 border-t border-amber-100 bg-amber-50/20 grid grid-cols-2 gap-6">
        <div>
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            Projected impact
          </div>
          <div className="text-sm font-mono font-semibold text-emerald-700 mt-0.5">
            {insight.projectedImpact.primary}
          </div>
          <div className="text-11 text-slate-500 mt-0.5 leading-relaxed">
            {insight.projectedImpact.condition}
          </div>
        </div>
        <div>
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            Why agent isn't executing
          </div>
          <div className="text-xs text-slate-700 mt-0.5 leading-relaxed">
            {insight.ownershipReason}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="px-5 py-3 border-t border-amber-100 flex items-center justify-between">
        <div className="text-11 text-slate-500">
          Owned by{" "}
          <span className="text-slate-900 font-medium">
            {insight.ownership}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {insight.actions.map((a, i) => (
            <button
              key={i}
              type="button"
              className={`text-xs px-2.5 py-1.5 rounded-md font-medium ${
                i === 0
                  ? "text-white bg-slate-900 hover:bg-slate-800"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}

function ExecutableInsightCard({ insight }) {
  const [modifying, setModifying] = useState(false);
  return (
    <Card className="border-emerald-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-emerald-100 bg-emerald-50/40 flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Pill tone="emerald">Agent-executable</Pill>
            <span className="text-11 text-slate-500">
              Insight #2 of 2 · approve or modify
            </span>
          </div>
          <div className="text-sm font-medium text-slate-900">
            {insight.title}
          </div>
          <div className="text-xs text-slate-600 mt-1 leading-relaxed">
            {insight.summary}
          </div>
        </div>
      </div>

      {/* Reference precedent */}
      <div className="px-5 py-4 border-b border-slate-100">
        <SectionLabel>Reference precedent · Company Brain</SectionLabel>
        <div className="bg-slate-900 text-white rounded-md px-4 py-3">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
            <Brain className="w-3.5 h-3.5 text-emerald-400" />
            <div className="text-xs font-medium">{insight.reference.sku}</div>
            <span className="text-11 text-slate-500">·</span>
            <span className="text-11 text-slate-400 font-mono">
              {insight.reference.period}
            </span>
            <span className="text-11 text-slate-500">·</span>
            <span className="text-11 text-emerald-400 font-medium">
              {insight.reference.outcome}
            </span>
          </div>
          <div className="text-xs text-slate-300 leading-relaxed">
            {insight.reference.method}
          </div>
        </div>
      </div>

      {/* Plan phases */}
      <div className="px-5 py-4 border-b border-slate-100">
        <SectionLabel kicker="3-phase plan">Proposed plan</SectionLabel>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left text-11 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">
                Phase
              </th>
              <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">
                Exp. TACoS
              </th>
              <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">
                Exp. sales/mo
              </th>
            </tr>
          </thead>
          <tbody>
            {insight.plan.phases.map((p, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                <td className="py-3 px-2 align-top">
                  <div className="text-sm text-slate-900 font-medium">
                    {p.label}
                  </div>
                  <ul className="mt-1.5 space-y-1">
                    {p.actions.map((a, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-1.5 text-xs text-slate-600"
                      >
                        <CornerDownRight className="w-3 h-3 text-slate-300 mt-0.5 flex-shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-3 px-2 text-right font-mono text-slate-700 align-top">
                  {p.tacos}%
                </td>
                <td className="py-3 px-2 text-right font-mono text-slate-900 font-medium align-top">
                  ${p.sales}K
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary metrics */}
      <div className="px-5 py-3 border-b border-slate-100 grid grid-cols-3 gap-6">
        <div>
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            Cumulative sales lift
          </div>
          <div className="text-base font-mono font-semibold text-emerald-700 mt-0.5">
            +${insight.plan.summary.cumulativeSalesLift}K
          </div>
        </div>
        <div>
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            Final TACoS
          </div>
          <div className="text-base font-mono font-semibold text-slate-900 mt-0.5">
            {insight.plan.summary.finalTacos}%
          </div>
        </div>
        <div>
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            Capture window
          </div>
          <div className="text-base font-mono font-semibold text-slate-900 mt-0.5">
            {insight.plan.summary.captureWindow}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div className="px-5 py-3 bg-slate-50/40">
        {modifying ? (
          <div className="flex items-center gap-2">
            <div className="text-11 uppercase tracking-wider text-slate-500 font-medium flex-shrink-0">
              Modify:
            </div>
            <input
              type="text"
              placeholder="e.g. delay promo by 2 weeks until inventory clears"
              className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
            <button
              type="button"
              onClick={() => setModifying(false)}
              className="text-xs text-slate-600 hover:text-slate-900 px-2"
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 rounded-md"
            >
              <Send className="w-3 h-3" />
              Send
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-11 text-slate-500">
              Confidence{" "}
              <span className="font-mono text-slate-900 font-medium">
                {insight.confidence}%
              </span>{" "}
              · {insight.confidenceLabel}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md font-medium"
              >
                <X className="w-3.5 h-3.5" />
                Decline
              </button>
              <button
                type="button"
                onClick={() => setModifying(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 px-2.5 py-1.5 rounded-md bg-white"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Modify
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1.5 rounded-md"
              >
                <Check className="w-3.5 h-3.5" />
                Approve plan
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function MilestonePath() {
  const statusConfig = {
    "blocked-on-team": {
      tone: "amber",
      icon: Clock,
      label: "Waiting on team",
    },
    "awaiting-approval": {
      tone: "slate",
      icon: AlertCircle,
      label: "Awaiting approval",
    },
    "goal": { tone: "emerald", icon: Target, label: "Goal" },
    "preview": { tone: "slate", icon: CircleDot, label: "Next phase preview" },
  };
  return (
    <div className="grid grid-cols-4 gap-3">
      {STRATEGY.milestonePath.map((m, i) => {
        const cfg = statusConfig[m.status];
        const Icon = cfg.icon;
        const isPreview = m.status === "preview";
        const isGoal = m.status === "goal";
        return (
          <Card
            key={i}
            className={`p-4 ${
              isPreview ? "border-dashed bg-slate-50/40" : ""
            } ${isGoal ? "border-emerald-300" : ""}`}
          >
            <div className="flex items-center gap-2 mb-2.5">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-11 font-mono font-semibold flex-shrink-0 ${
                  isGoal
                    ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                    : isPreview
                    ? "border-slate-300 text-slate-400 bg-white"
                    : "border-slate-300 text-slate-700 bg-white"
                }`}
              >
                {m.idx}
              </div>
              <Pill tone={cfg.tone}>
                <Icon className="w-3 h-3" />
                {cfg.label}
              </Pill>
            </div>
            <div
              className={`text-sm font-medium ${
                isPreview ? "text-slate-700" : "text-slate-900"
              }`}
            >
              {m.label}
            </div>
            <div
              className={`text-xs ${
                isPreview ? "text-slate-500" : "text-slate-600"
              } mt-1 leading-relaxed`}
            >
              {m.target}
            </div>
            <div className="mt-2.5 pt-2.5 border-t border-slate-100">
              <div className="text-11 text-slate-400 font-mono">
                {m.window}
              </div>
              <div className="text-11 text-slate-500 mt-0.5">
                {m.dependsOn}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function StrategyCanvas() {
  return (
    <>
      <CanvasHeader
        kicker="Strategy · best-seller path"
        title="SKU-A path to best seller in Floor Lamps"
        meta={
          <>
            <Pill tone="slate">
              <Target className="w-3 h-3" />
              90-day window
            </Pill>
            <Pill tone="emerald">
              <ShieldCheck className="w-3 h-3" />
              Goal confirmed
            </Pill>
          </>
        }
      />

      {/* Goal strip */}
      <div className="px-6 pt-5">
        <div className="flex items-center justify-between bg-slate-900 text-white rounded-lg px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <Target className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-11 uppercase tracking-wider text-slate-400 font-medium">
                Stated goal
              </div>
              <div className="text-sm font-medium truncate">
                {STRATEGY.goal}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300 flex-shrink-0">
            <span>
              Confirmed by{" "}
              <span className="text-white font-medium">
                {STRATEGY.goalConfirmedBy}
              </span>{" "}
              on {STRATEGY.goalConfirmedOn}
            </span>
            <button
              type="button"
              className="text-slate-300 hover:text-white underline underline-offset-2"
            >
              Change goal
            </button>
          </div>
        </div>
      </div>

      {/* Gap to best seller — three core path metrics */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="Traffic · Click · Conversion · vs #1 best seller">
          Gap to best seller
        </SectionLabel>
        <PerformanceStrip />
      </div>

      {/* Current ad architecture lives in the right-side panel — see top bar */}

      {/* Listing operation log */}
      <div className="px-6 pt-6">
        <SectionLabel
          kicker={`${STRATEGY.operationLog.length} milestones · launch → today`}
        >
          Listing operation log
        </SectionLabel>
        <OperationLog />
      </div>

      {/* Agent insights */}
      <div className="px-6 pt-6">
        <SectionLabel
          kicker={`${STRATEGY.insights.length} surfaced this run · ordered by impact`}
        >
          Agent insights
        </SectionLabel>
        <div className="space-y-3">
          {STRATEGY.insights.map((insight) =>
            insight.type === "informational" ? (
              <InformationalInsightCard key={insight.id} insight={insight} />
            ) : (
              <ExecutableInsightCard key={insight.id} insight={insight} />
            )
          )}
        </div>
      </div>

      {/* Milestone path */}
      <div className="px-6 pt-6 pb-6">
        <SectionLabel kicker="Sequenced gates · this specific goal">
          Milestone path to best seller
        </SectionLabel>
        <MilestonePath />
      </div>

      <ReasoningSection reasoning={STRATEGY.reasoning} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Stage 2a — Growth canvas                                                  */
/* ────────────────────────────────────────────────────────────────────────── */

function FunnelStage({ stage, idx, total }) {
  const width = 100 - idx * 14; // visual taper
  const fillPct = (stage.current / stage.benchmark) * 100;
  return (
    <div className="flex items-center gap-4">
      <div className="w-32 flex-shrink-0">
        <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
          {stage.stage}
        </div>
        {stage.bottleneck && (
          <div className="text-10 uppercase tracking-wider text-rose-700 font-semibold mt-0.5">
            Bottleneck
          </div>
        )}
      </div>
      <div className="flex-1">
        <div
          className="relative rounded-md overflow-hidden h-9 border border-slate-200"
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-slate-50" />
          <div
            className={`absolute inset-y-0 left-0 ${
              stage.bottleneck ? "bg-rose-100" : "bg-emerald-100"
            }`}
            style={{ width: `${Math.min(fillPct, 100)}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-between px-3">
            <span className="text-xs font-mono font-medium text-slate-900">
              {stage.unit === "$" && "$"}
              {stage.current}
              {stage.unit !== "$" && stage.unit}
            </span>
            <span className="text-10 text-slate-500 font-mono">
              benchmark {stage.unit === "$" && "$"}
              {stage.benchmark}
              {stage.unit !== "$" && stage.unit}
            </span>
          </div>
        </div>
      </div>
      <div className="w-28 flex-shrink-0 text-right">
        <div className="text-10 uppercase tracking-wider text-slate-400 font-medium">
          Headroom
        </div>
        <div
          className={`text-sm font-mono font-medium ${
            stage.bottleneck ? "text-rose-700" : "text-slate-700"
          }`}
        >
          {stage.unit === "$" && "$"}
          {stage.headroom}
          {stage.unit !== "$" && stage.unit}
        </div>
      </div>
    </div>
  );
}

function GrowthCanvas() {
  return (
    <>
      <CanvasHeader
        kicker="Optimization · growth source"
        title="Path from $1.04M to $1.20M · SKU-B funnel decomposition"
        meta={
          <>
            <Pill tone="slate">May baseline</Pill>
            <Pill tone="emerald">
              <TrendingUp className="w-3 h-3" />
              +$148K target
            </Pill>
          </>
        }
      />

      {/* Top stat strip */}
      <div className="px-6 pt-5">
        <div className="grid grid-cols-3 gap-3">
          <Card className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              This month
            </div>
            <div className="text-2xl font-mono font-semibold text-slate-900 mt-1 tracking-tight">
              $1.04M
            </div>
          </Card>
          <Card className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              Target next month
            </div>
            <div className="text-2xl font-mono font-semibold text-slate-900 mt-1 tracking-tight">
              $1.20M
            </div>
          </Card>
          <Card className="px-4 py-3 border-emerald-200 bg-emerald-50/40">
            <div className="text-xs uppercase tracking-wider text-emerald-700 font-medium">
              Incremental gap
            </div>
            <div className="text-2xl font-mono font-semibold text-emerald-700 mt-1 tracking-tight">
              +$148K
            </div>
          </Card>
        </div>
      </div>

      {/* Funnel */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="Impression → CTR → CR → AOV">
          Funnel decomposition
        </SectionLabel>
        <Card className="p-5">
          <div className="space-y-3">
            {GROWTH.funnel.map((stage, i) => (
              <FunnelStage
                key={stage.stage}
                stage={stage}
                idx={i}
                total={GROWTH.funnel.length}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Bottleneck callout */}
      <div className="px-6 pt-6">
        <Card className="border-rose-200 bg-rose-50/30">
          <div className="px-5 py-4 flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-rose-100 border border-rose-200 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-rose-700" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-rose-700 font-semibold">
                Active bottleneck
              </div>
              <div className="text-sm text-slate-900 mt-1 leading-relaxed">
                CTR on audience segment{" "}
                <span className="font-medium">
                  {GROWTH.bottleneckSegment.name}
                </span>
                . Current CTR{" "}
                <span className="font-mono font-medium">
                  {GROWTH.bottleneckSegment.currentCtr}%
                </span>{" "}
                vs benchmark{" "}
                <span className="font-mono font-medium">
                  {GROWTH.bottleneckSegment.benchmarkCtr}%
                </span>{" "}
                for similar audience. Closing this gap captures an estimated{" "}
                <span className="font-mono font-medium text-emerald-700">
                  $148K
                </span>{" "}
                incremental revenue at current downstream CR and AOV.
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search-term breakdown */}
      <div className="px-6 pt-6">
        <SectionLabel
          kicker={`${GROWTH.searchTerms.length} terms · bottleneck segment`}
        >
          Search-term bid adjustments
        </SectionLabel>
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  Search term
                </th>
                <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  Current CTR
                </th>
                <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  Bid →
                </th>
                <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  Exp. CTR
                </th>
                <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  Proj. rev.
                </th>
              </tr>
            </thead>
            <tbody>
              {GROWTH.searchTerms.map((t, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="py-2.5 px-4 text-slate-900">{t.term}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                    {t.ctr.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono">
                    <span className="text-slate-400">${t.bid.toFixed(2)}</span>
                    <ArrowRight className="inline w-3 h-3 mx-1 text-slate-300" />
                    <span className="text-slate-900">
                      ${t.proposedBid.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-emerald-700">
                    {t.expectedCtr.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                    +${t.revenue.toFixed(1)}K
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Creative tests */}
      <div className="px-6 pt-6 pb-6">
        <SectionLabel kicker="3 tests · detail-page main image">
          Creative recommendations
        </SectionLabel>
        <div className="grid grid-cols-3 gap-3">
          {GROWTH.creatives.map((c, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="text-sm font-medium text-slate-900">
                  {c.name}
                </div>
                <Pill tone="emerald">{c.estLift}</Pill>
              </div>
              <div className="text-xs text-slate-600 leading-relaxed">
                {c.detail}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 text-11 text-slate-500 leading-relaxed">
                Reference · {c.reference}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ActionBar approveLabel="Approve plan" />
      <ReasoningSection reasoning={GROWTH.reasoning} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Stage 2b — Peak season canvas                                             */
/* ────────────────────────────────────────────────────────────────────────── */

function PostureBadge({ posture }) {
  if (posture === "defend") {
    return <Pill tone="blue">Defend</Pill>;
  }
  if (posture === "lean-in") {
    return <Pill tone="emerald">Lean-in</Pill>;
  }
  return <Pill tone="slate">Step-back</Pill>;
}

function PeakSeasonCanvas() {
  return (
    <>
      <CanvasHeader
        kicker="Optimization · market-condition forecast"
        title="Peak season response · 6 weeks out"
        meta={
          <>
            <Pill tone="amber">
              <AlertCircle className="w-3 h-3" />
              Competitive pressure rising
            </Pill>
            <Pill tone="slate">9 SKU portfolio</Pill>
          </>
        }
      />

      {/* Traffic + pressure chart */}
      <div className="px-6 pt-5">
        <SectionLabel kicker="Predicted category traffic + competitive bid pressure">
          6-week forecast
        </SectionLabel>
        <Card className="p-5">
          <div className="flex items-center gap-6 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-px bg-slate-900" />
              <span className="text-slate-600">Category traffic (indexed)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-px bg-emerald-600 border-t border-dashed" />
              <span className="text-slate-600">Competitive bid pressure</span>
            </div>
          </div>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={PEAK.trafficForecast}
                margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
              >
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="week"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 12,
                    color: "white",
                  }}
                  labelStyle={{ color: "#94a3b8" }}
                />
                <Line
                  type="monotone"
                  dataKey="traffic"
                  stroke="#0f172a"
                  strokeWidth={2}
                  dot={{ fill: "#0f172a", r: 3 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="pressure"
                  stroke="#059669"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ fill: "#059669", r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Competitive intel */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="Past 14 days">
          Competitive signals
        </SectionLabel>
        <div className="grid grid-cols-3 gap-3">
          {PEAK.competitiveSignals.map((sig, i) => (
            <Card key={i} className="p-4">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                {sig.label}
              </div>
              <div className="text-xl font-mono font-semibold text-slate-900 mt-1.5 tracking-tight">
                {sig.value}
              </div>
              <div className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                {sig.detail}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Portfolio matrix */}
      <div className="px-6 pt-6">
        <SectionLabel kicker={`${PEAK.portfolio.length} SKUs · differentiated posture`}>
          Portfolio response matrix
        </SectionLabel>
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  SKU
                </th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  Lifecycle
                </th>
                <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  Current SOV
                </th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  Posture
                </th>
                <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  TACoS cap
                </th>
                <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  Bid Δ
                </th>
              </tr>
            </thead>
            <tbody>
              {PEAK.portfolio.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="py-2.5 px-4 text-slate-900">{row.sku}</td>
                  <td className="py-2.5 px-4 text-slate-600">{row.lifecycle}</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                    {row.sov.toFixed(1)}%
                  </td>
                  <td className="py-2.5 px-4">
                    <PostureBadge posture={row.posture} />
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                    {row.tacosCap}%
                  </td>
                  <td
                    className={`py-2.5 px-4 text-right font-mono ${
                      row.bidAdj.startsWith("−")
                        ? "text-slate-500"
                        : "text-emerald-700"
                    }`}
                  >
                    {row.bidAdj}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      {/* Decision card */}
      <div className="px-6 pt-6 pb-6">
        <Card className="bg-slate-900 text-white border-slate-900">
          <div className="px-5 py-4">
            <div className="text-xs uppercase tracking-wider text-emerald-400 font-medium mb-2">
              Recommended framework
            </div>
            <div className="text-sm leading-relaxed text-slate-100">
              Accept TACoS ceiling of{" "}
              <span className="font-mono font-medium text-white">32%</span> on{" "}
              {PEAK.decision.defendCount} defend-mode SKUs during peak window.
              Reduce ceiling to{" "}
              <span className="font-mono font-medium text-white">18%</span> on{" "}
              {PEAK.decision.stepBackCount} step-back SKUs to preserve margin.
              Commit additional{" "}
              <span className="font-mono font-medium text-emerald-400">
                ${PEAK.decision.additionalWeeklyBudget}K weekly budget
              </span>{" "}
              on {PEAK.decision.leanInCount} lean-in SKUs where competitive bid
              pressure has not yet reached saturation.
            </div>
          </div>
        </Card>
      </div>

      <ActionBar approveLabel="Approve framework" />
      <ReasoningSection reasoning={PEAK.reasoning} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Stage 3 — Execution canvas                                                */
/* ────────────────────────────────────────────────────────────────────────── */

function ExecutionCanvas() {
  const [filter, setFilter] = useState("all");
  const filters = [
    { id: "all", label: "All actions" },
    { id: "Bid edit", label: "Bid edits" },
    { id: "Budget", label: "Budget" },
    { id: "Keyword", label: "Keyword" },
    { id: "Restructure", label: "Restructure" },
  ];
  const visible = EXECUTION.actions.filter(
    (a) => filter === "all" || a.type === filter
  );

  return (
    <>
      <CanvasHeader
        kicker="Execution · log"
        title="SKU-A actions · past 7 days"
        meta={
          <>
            <Pill tone="emerald">
              <Activity className="w-3 h-3" />
              All live
            </Pill>
            <Pill tone="slate">0 reverted</Pill>
          </>
        }
      />

      {/* Summary stat strip */}
      <div className="px-6 pt-5">
        <div className="grid grid-cols-4 gap-3">
          <Card className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              Total actions
            </div>
            <div className="text-2xl font-mono font-semibold text-slate-900 mt-1">
              {EXECUTION.summary.total}
            </div>
          </Card>
          <Card className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              Team-approved
            </div>
            <div className="text-2xl font-mono font-semibold text-slate-900 mt-1">
              {EXECUTION.summary.teamApproved}
            </div>
          </Card>
          <Card className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              Autonomous
            </div>
            <div className="text-2xl font-mono font-semibold text-emerald-700 mt-1">
              {EXECUTION.summary.autonomous}
            </div>
          </Card>
          <Card className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              Reverted
            </div>
            <div className="text-2xl font-mono font-semibold text-slate-900 mt-1">
              {EXECUTION.summary.reverted}
            </div>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 pt-5 flex items-center gap-2">
        {filters.map((f) => (
          <button
            type="button"
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-xs font-medium px-3 py-1.5 rounded-md border transition-colors ${
              filter === f.id
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="px-6 pt-5">
        <SectionLabel kicker={`${visible.length} entries`}>
          Action timeline
        </SectionLabel>
        <div className="relative pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-slate-200" />
          <div className="space-y-2.5">
            {visible.map((a, i) => (
              <div key={i} className="relative">
                <div
                  className={`absolute top-3 w-2.5 h-2.5 rounded-full border-2 bg-white ${
                    a.kind === "autonomous"
                      ? "border-emerald-600"
                      : "border-slate-400"
                  }`}
                  style={{ left: "-18px" }}
                />
                <Card className="px-4 py-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-11 font-mono text-slate-500">
                          {a.ts}
                        </span>
                        <Pill
                          tone={a.kind === "autonomous" ? "emerald" : "slate"}
                        >
                          {a.type}
                        </Pill>
                        {a.kind === "autonomous" && (
                          <span className="text-10 uppercase tracking-wider text-emerald-700 font-semibold">
                            Autonomous
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-slate-900 font-medium">
                        {a.delta}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {a.reason}
                      </div>
                      <div className="text-11 text-slate-400 mt-1.5">
                        {a.approver}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <Pill tone="emerald">{a.status}</Pill>
                      {a.kind === "autonomous" && (
                        <button
                          type="button"
                          className="text-11 text-slate-500 hover:text-rose-700 underline underline-offset-2"
                        >
                          Revoke autonomy
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending approval */}
      <div className="px-6 pt-6">
        <SectionLabel kicker={`${EXECUTION.pending.length} awaiting team`}>
          Pending team approval
        </SectionLabel>
        <Card>
          <div className="divide-y divide-slate-100">
            {EXECUTION.pending.map((p, i) => (
              <div
                key={i}
                className="px-4 py-3 flex items-start justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span className="text-11 font-mono text-slate-500">
                      {p.ts}
                    </span>
                  </div>
                  <div className="text-sm text-slate-900 font-medium">
                    {p.summary}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    {p.reason}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    className="text-xs px-2.5 py-1 text-slate-600 hover:text-slate-900"
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    className="text-xs px-2.5 py-1 text-white bg-emerald-600 hover:bg-emerald-700 rounded-md font-medium"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Autonomous classes */}
      <div className="px-6 pt-6 pb-6">
        <SectionLabel kicker="Decision classes delegated to agent">
          Running autonomously
        </SectionLabel>
        <Card>
          <div className="divide-y divide-slate-100">
            {EXECUTION.autonomousClasses.map((c, i) => (
              <div
                key={i}
                className="px-4 py-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <CircleDot className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm text-slate-900 font-medium">
                      {c.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Last used {c.lastUsed}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-10 uppercase tracking-wider text-slate-400 font-medium">
                      Actions
                    </div>
                    <div className="text-sm font-mono font-medium text-slate-700">
                      {c.count}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-xs px-2.5 py-1 text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-md bg-white"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <ReasoningSection reasoning={EXECUTION.reasoning} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Stage 4 — Launch canvas                                                   */
/* ────────────────────────────────────────────────────────────────────────── */

function LaunchCanvas() {
  const [tab, setTab] = useState("architecture");
  const tabs = [
    { id: "architecture", label: "Campaign architecture", icon: Workflow },
    { id: "keywords",     label: "Keyword allocation",    icon: ListTree },
    { id: "bids",         label: "Bid strategy",          icon: TrendingUp },
    { id: "pacing",       label: "Budget pacing",         icon: DollarSign },
    { id: "milestones",   label: "Milestone gates",       icon: Target },
  ];

  return (
    <>
      <CanvasHeader
        kicker="Learning · new product launch"
        title={`Launch plan · ${LAUNCH.sku}`}
        meta={
          <>
            <Pill tone="slate">
              <Calendar className="w-3 h-3" />
              {LAUNCH.targetLaunch} launch
            </Pill>
            <Pill tone="emerald">
              <Brain className="w-3 h-3" />
              7 prior launches referenced
            </Pill>
          </>
        }
      />

      {/* Methodology trace */}
      <div className="px-6 pt-5">
        <Card className="bg-slate-900 text-white border-slate-900">
          <div className="px-5 py-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-emerald-400" />
              <div className="text-xs uppercase tracking-wider text-emerald-400 font-medium">
                Methodology trace · Company Brain
              </div>
            </div>
            <div className="text-sm text-slate-200 leading-relaxed mb-3">
              Drawing on 7 prior launches in this category and price band.
              Patterns extracted: keyword taxonomies, campaign structures, bid
              ramp curves, launch-phase playbooks.
            </div>
            <div className="grid grid-cols-3 gap-2">
              {LAUNCH.priorLaunches.map((p, i) => (
                <div
                  key={i}
                  className="bg-slate-800/60 rounded-md px-3 py-2 border border-slate-700"
                >
                  <div className="text-xs font-medium text-white">{p.sku}</div>
                  <div className="text-11 text-slate-400 mt-0.5">
                    {p.date} · {p.outcome}
                  </div>
                  <div className="text-11 text-emerald-400 mt-1">
                    {p.similarity} similarity · {p.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="px-6 pt-5">
        <div className="flex items-center gap-1 border-b border-slate-200">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                type="button"
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 -mb-px transition-colors ${
                  tab === t.id
                    ? "border-emerald-600 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-6 pt-5">
        {tab === "architecture" && (
          <Card>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Type
                  </th>
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Campaign
                  </th>
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Ad groups
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Daily budget
                  </th>
                </tr>
              </thead>
              <tbody>
                {LAUNCH.campaignArchitecture.map((c, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-2.5 px-4">
                      <Pill tone={c.type === "SP" ? "slate" : "emerald"}>
                        {c.type}
                      </Pill>
                    </td>
                    <td className="py-2.5 px-4 text-slate-900 font-medium">
                      {c.name}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 text-xs">
                      {c.adgroups.join(" · ")}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                      ${c.budget}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-slate-200 bg-slate-50/60">
                  <td colSpan={3} className="py-2.5 px-4 text-xs uppercase tracking-wider text-slate-500 font-medium">
                    Total daily budget
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-semibold text-slate-900">
                    $4,060
                  </td>
                </tr>
              </tfoot>
            </table>
          </Card>
        )}

        {tab === "keywords" && (
          <Card>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Tier
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Count
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Daily budget
                  </th>
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Examples
                  </th>
                </tr>
              </thead>
              <tbody>
                {LAUNCH.keywords.map((k, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-2.5 px-4">
                      <Pill tone="slate">{k.tier}</Pill>
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-900 font-medium">
                      {k.count}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                      ${k.dailyBudget}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 text-xs">
                      {k.examples}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {tab === "bids" && (
          <Card>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Phase
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Head
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Mid
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    Long-tail
                  </th>
                </tr>
              </thead>
              <tbody>
                {LAUNCH.bidStrategy.map((p, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="py-2.5 px-4">
                      <div className="text-slate-900 font-medium">
                        {p.phase}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {p.logic}
                      </div>
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-700 align-top pt-3">
                      {p.head}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-700 align-top pt-3">
                      {p.mid}
                    </td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-700 align-top pt-3">
                      {p.long}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {tab === "pacing" && (
          <Card className="p-5">
            <div style={{ width: "100%", height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={LAUNCH.pacing}
                  margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
                >
                  <CartesianGrid stroke="#e2e8f0" vertical={false} />
                  <XAxis
                    dataKey="week"
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={{ stroke: "#cbd5e1" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 12,
                      color: "white",
                    }}
                    labelStyle={{ color: "#94a3b8" }}
                    formatter={(v, name) => [
                      `$${v.toLocaleString()}`,
                      name === "total" ? "Weekly" : "Daily",
                    ]}
                  />
                  <Bar dataKey="total" fill="#0f172a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-slate-500 mt-3 leading-relaxed">
              Front-loaded ramp: 26% of 4-week budget concentrated in week 1 to
              establish auction presence. Daily cap deescalates as efficiency
              data accrues.
            </div>
          </Card>
        )}

        {tab === "milestones" && (
          <Card>
            <div className="divide-y divide-slate-100">
              {LAUNCH.milestones.map((m, i) => (
                <div
                  key={i}
                  className="px-4 py-3 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-mono font-semibold text-slate-700 flex-shrink-0">
                      W{m.week}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-slate-900">
                        {m.gate}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Target: {m.target}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {m.rationale}
                      </div>
                    </div>
                  </div>
                  <Pill tone="slate">Gate</Pill>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Action bar — special multi-option for launch */}
      <div className="px-6 pt-6 pb-2">
        <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-2">
          Approval options
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md"
          >
            <Check className="w-3.5 h-3.5" />
            Approve full plan
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-md bg-white"
          >
            Approve phase-by-phase
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-md bg-white"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Modify any phase
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md"
          >
            <X className="w-3.5 h-3.5" />
            Decline
          </button>
        </div>
      </div>

      <div className="h-4" />
      <ReasoningSection reasoning={LAUNCH.reasoning} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Chat panel + top bar + company brain drawer                               */
/* ────────────────────────────────────────────────────────────────────────── */

function PulseDot() {
  return (
    <span className="relative inline-flex w-2 h-2">
      <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-60 animate-ping" />
      <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-500" />
    </span>
  );
}

function TopBar({ onOpenBrain, onOpenAdArch }) {
  return (
    <header className="h-14 border-b border-slate-200 bg-white flex items-center px-4 gap-4 flex-shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md bg-slate-900 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-sm font-semibold text-slate-900 tracking-tight">
          XNURTA
        </div>
        <span className="text-slate-300">/</span>
        <div className="text-sm text-slate-600">ABC Home Goods</div>
        <Pill tone="slate" className="ml-1">
          Floor Lamps
        </Pill>
      </div>

      <div className="flex-1 flex items-center justify-center gap-2 text-xs text-slate-600">
        <PulseDot />
        <span>
          Agent ingested{" "}
          <span className="font-mono text-slate-900 font-medium">4,182</span>{" "}
          data points since 06:00 AM
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-md">
          <Lock className="w-3 h-3 text-emerald-700" />
          <span className="text-11 font-medium text-emerald-800">
            Team retains override · all classes
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenAdArch}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 hover:bg-slate-50 rounded-md"
        >
          <ListTree className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-11 font-medium text-slate-700">
            Ad architecture
          </span>
        </button>
        <button
          type="button"
          onClick={onOpenBrain}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 hover:bg-slate-50 rounded-md"
        >
          <Brain className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-11 font-medium text-slate-700">
            Company Brain
          </span>
        </button>
        <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-11 font-medium text-slate-700">
          MC
        </div>
      </div>
    </header>
  );
}

function ChatPanel({ activeId, onSelect }) {
  return (
    <aside className="w-80 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
          Conversation
        </div>
        <div className="text-11 text-slate-400 font-mono">5 messages</div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5">
        {CHAT_MESSAGES.map((msg) => {
          const active = activeId === msg.id;
          return (
            <button
              type="button"
              key={msg.id}
              onClick={() => onSelect(msg.id)}
              className={`w-full text-left rounded-lg border transition-colors p-3 ${
                active
                  ? "bg-slate-50 border-slate-300"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* User question */}
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-10 font-semibold text-slate-700 flex-shrink-0">
                  {msg.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="text-xs font-medium text-slate-900 truncate">
                      {msg.user}
                    </div>
                    <div className="text-10 text-slate-400 font-mono flex-shrink-0">
                      {msg.timestamp}
                    </div>
                  </div>
                  <div className="text-11 text-slate-500">{msg.role}</div>
                  <div className="text-xs text-slate-800 mt-1.5 leading-relaxed">
                    {msg.question}
                  </div>
                </div>
              </div>

              {/* Agent reply */}
              <div className="flex items-start gap-2 mt-2.5 pt-2.5 border-t border-slate-100">
                <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-slate-900">
                    Brand Ops Agent
                  </div>
                  <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {msg.agentSummary}
                  </div>
                  <div
                    className={`mt-1.5 inline-flex items-center gap-1 text-11 font-medium ${
                      active ? "text-emerald-700" : "text-slate-500"
                    }`}
                  >
                    {active ? (
                      <>
                        <CircleDot className="w-3 h-3" />
                        Viewing canvas
                      </>
                    ) : (
                      <>
                        <FileText className="w-3 h-3" />
                        Open canvas
                      </>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Locked input */}
      <div className="border-t border-slate-200 p-3 bg-slate-50/50">
        <div className="relative">
          <input
            type="text"
            disabled
            placeholder="Ask the agent anything about Floor Lamps…"
            className="w-full pl-3 pr-20 py-2.5 text-xs bg-white border border-slate-200 rounded-md text-slate-400 placeholder-slate-400 cursor-not-allowed"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-slate-400" />
            <span className="text-10 uppercase tracking-wider text-slate-400 font-medium">
              Demo locked
            </span>
          </div>
        </div>
        <div className="text-10 text-slate-400 mt-2 leading-relaxed">
          Input disabled in this stakeholder mock. Click any message above to
          view its canvas.
        </div>
      </div>
    </aside>
  );
}

function AdArchitectureDrawer({ open, onClose }) {
  if (!open) return null;
  const s = STRATEGY.adArchitecture.summary;
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40"
      onClick={onClose}
    >
      <div
        className="h-full bg-white border-l border-slate-200 shadow-xl flex flex-col"
        style={{ width: "min(1040px, 78vw)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <ListTree className="w-4 h-4 text-slate-700" />
            <div className="text-sm font-semibold text-slate-900 tracking-tight">
              Ad architecture
            </div>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-600">SKU-A</span>
            <Pill tone="slate">Live</Pill>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Summary stat strip */}
        <div className="px-5 py-3 border-b border-slate-200 grid grid-cols-6 gap-4 flex-shrink-0">
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              Ad groups
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              {s.adGroupCount}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              Campaigns
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              {s.campaignCount}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              Keywords
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              {s.keywordCount}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              Daily budget
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              ${s.dailyBudget}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              Sales 30d
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              ${(s.sales30d / 1000).toFixed(0)}K
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              TACoS
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              {s.tacos}%
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/40 flex-shrink-0">
          <div className="text-11 text-slate-600 leading-relaxed">
            <span className="text-slate-900 font-medium">
              Click any ad group
            </span>{" "}
            to see its top keywords / audiences with click and conversion data.
            Rose-tinted rows are keywords flagged by{" "}
            <span className="text-rose-700 font-medium">Insight #1</span>{" "}
            (bedroom-context CTR gap).
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <AdArchitectureTable />
        </div>
      </div>
    </div>
  );
}

function CompanyBrainDrawer({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40"
      onClick={onClose}
    >
      <div
        className="h-full bg-white border-l border-slate-200 shadow-xl flex flex-col"
        style={{ width: "420px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-emerald-700" />
            <div className="text-sm font-semibold text-slate-900 tracking-tight">
              Company Brain
            </div>
            <Pill tone="slate">Read-only</Pill>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-4 border-b border-slate-200">
          <div className="text-xs text-slate-600 leading-relaxed">
            ABC Home Goods's accumulated operations methodology. Every
            approved decision, captured pattern, and prior playbook is owned by
            the brand and portable.
          </div>
        </div>

        <div className="px-5 py-4 border-b border-slate-200 grid grid-cols-3 gap-3">
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              Decision classes
            </div>
            <div className="text-xl font-mono font-semibold text-slate-900 mt-1">
              {COMPANY_BRAIN.decisionClasses}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              Playbooks
            </div>
            <div className="text-xl font-mono font-semibold text-slate-900 mt-1">
              {COMPANY_BRAIN.playbooks}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              Captured patterns
            </div>
            <div className="text-xl font-mono font-semibold text-slate-900 mt-1">
              {COMPANY_BRAIN.capturedPatterns}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <SectionLabel>Recent entries</SectionLabel>
          <div className="space-y-2">
            {COMPANY_BRAIN.recentEntries.map((e, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-md px-3 py-2.5 hover:bg-slate-50 cursor-pointer"
              >
                <div className="text-sm font-medium text-slate-900">
                  {e.name}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{e.added}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  App                                                                       */
/* ────────────────────────────────────────────────────────────────────────── */

export default function App() {
  const [activeId, setActiveId] = useState("strategy");
  const [brainOpen, setBrainOpen] = useState(false);
  const [adArchOpen, setAdArchOpen] = useState(false);

  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      !document.getElementById("xnurta-fonts")
    ) {
      const link = document.createElement("link");
      link.id = "xnurta-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const canvas = (() => {
    switch (activeId) {
      case "strategy":  return <StrategyCanvas />;
      case "growth":    return <GrowthCanvas />;
      case "peak":      return <PeakSeasonCanvas />;
      case "execution": return <ExecutionCanvas />;
      case "launch":    return <LaunchCanvas />;
      default:          return null;
    }
  })();

  return (
    <div
      className="h-screen w-screen flex flex-col bg-slate-50 text-slate-900 overflow-hidden"
      style={{
        fontFamily:
          "'Geist', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontFeatureSettings: "'ss01', 'cv11'",
      }}
    >
      <style>{`
        .font-mono, code, pre, kbd, samp, [class*="font-mono"] {
          font-family: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace !important;
          font-variant-numeric: tabular-nums;
        }
        .tabular-nums { font-variant-numeric: tabular-nums; }
        .text-10 { font-size: 10px; line-height: 14px; }
        .text-11 { font-size: 11px; line-height: 16px; }
      `}</style>

      <TopBar
        onOpenBrain={() => setBrainOpen(true)}
        onOpenAdArch={() => setAdArchOpen(true)}
      />

      <div className="flex-1 flex min-h-0">
        <ChatPanel activeId={activeId} onSelect={setActiveId} />
        <main className="flex-1 overflow-y-auto">
          <div
            className="mx-auto bg-white border-x border-slate-200 min-h-full"
            style={{ maxWidth: "1200px" }}
          >
            {canvas}
          </div>
        </main>
      </div>

      <CompanyBrainDrawer
        open={brainOpen}
        onClose={() => setBrainOpen(false)}
      />
      <AdArchitectureDrawer
        open={adArchOpen}
        onClose={() => setAdArchOpen(false)}
      />
    </div>
  );
}
