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
  ArrowUpRight,
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
import MetricTerm from "./MetricTerm.jsx";
import InspectionDrawer from "./InspectionDrawer.jsx";

/* ────────────────────────────────────────────────────────────────────────── */
/*  Mock data                                                                 */
/* ────────────────────────────────────────────────────────────────────────── */

const METRIC_DEFINITIONS = {
  attachRate:
    "主产品购买者中,在指定窗口期内购买配套产品的比例(基于 Amazon Brand Analytics 重复购买行为计算)。",
  ltv: "Lifetime Value · 单个客户在与品牌的生命周期内预期产生的总贡献毛利。",
  blendedMargin: "整个产品线各产品毛利的加权平均值。",
  tacos:
    "Total Advertising Cost of Sales · 广告花费 ÷ 总销售额(自然 + 广告归因)。",
  acos: "Advertising Cost of Sales · 广告花费 ÷ 仅广告归因销售额。",
  contributionMargin:
    "销售价减去所有变动成本(COGS、履约、可归因单位广告花费)。",
  sov: "Share of Voice · 品牌在指定关键词簇上的曝光份额。",
  cohortRevenue:
    "指定客户群体(例如 5 月获取的客户)在指定时间窗口内产生的收入。",
  costCapBidding:
    "TikTok 竞价策略 · 设定目标单次转化成本,平台尽量靠近此目标(不保证达成;未达成不退费)。",
  incrementality:
    "渠道对收入的因果贡献 — 即不投放该渠道时无法实现的收入。通过地区对照测试衡量。",
  geographicHoldoutTest:
    "在一组地区投放广告、在匹配的对照地区不投放,通过对比销售差异分离真实因果影响。",
  ctr: "Click-through Rate · 点击率 · 点击 ÷ 曝光。",
  cr: "Conversion Rate · 转化率 · 订单 ÷ 点击。",
  impressions:
    "曝光 · 广告被展示的次数(不论用户是否注意)。月曝光 = 过去 30 天累计曝光。",
};

const THREADS = [
  {
    id: "defense",
    canvasId: "defense",
    initiator: "agent",
    initiatorName: "品牌运营助手",
    initiatorRole: "监控警报",
    initialTimestamp: "2 分钟前",
    lastActivityTimestamp: "2 分钟前",
    unread: true,
    title: "防御警报 · SKU-A",
    turns: [
      {
        speaker: "agent",
        timestamp: "2 分钟前",
        body:
          "SKU-A 的 BSR #2 位置正在受到主动攻击。竞品 SKU-X 过去 96 小时内在 7 个核心关键词上加大出价,平均广告位由 #5 升至 #2;SKU-X 自然排名也由 #14 升至 #8。若当前趋势延续,SKU-A 预计 14 天内跌至 BSR #4-5。",
        canvasLink: false,
      },
      {
        speaker: "user",
        timestamp: "刚刚",
        body: "推荐怎么应对?",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "刚刚",
        body:
          "已起草防御方案,提供 3 种应对姿态供选择。打开画布查看 — 推荐姿态已高亮。",
        canvasLink: true,
      },
    ],
  },
  {
    id: "strategy",
    canvasId: "strategy",
    initiator: "user",
    initiatorName: "Maya Chen",
    initiatorRole: "电商副总裁",
    initials: "MC",
    initialTimestamp: "May 4, 09:14",
    lastActivityTimestamp: "May 4, 09:16",
    unread: false,
    title: "策略 · SKU-A 落地灯 BS 路径",
    turns: [
      {
        speaker: "user",
        timestamp: "May 4, 09:14",
        body: "SKU-A 在落地灯品类排名第 2,我们如何争取 BS?具体打法是什么?",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "May 4, 09:16",
        body:
          "已起草广告架构重构方案与 12 周路线图,提出 6 项变更。打开画布查看。",
        canvasLink: true,
      },
    ],
  },
  {
    id: "omnichannel",
    canvasId: "omnichannel",
    initiator: "user",
    initiatorName: "Devon Park",
    initiatorRole: "高级增长经理",
    initials: "DP",
    initialTimestamp: "May 11, 16:42",
    lastActivityTimestamp: "May 11, 16:48",
    unread: false,
    title: "全渠道 · 移动充电宝 $100K 分配",
    turns: [
      {
        speaker: "user",
        timestamp: "May 11, 16:42",
        body:
          "我们 SKU-PB-A 移动充电宝目前在 Amazon + Walmart + TikTok 三个平台。本月总预算 $100K,该怎么分配?",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "May 11, 16:48",
        body:
          "已分析三平台数据并起草分配方案:Amazon $42K · Walmart $28K · TikTok $12K(增量性测试)· 储备 $18K。打开画布查看各平台细节。",
        canvasLink: true,
      },
    ],
  },
  {
    id: "razor-blade",
    canvasId: "razor-blade",
    initiator: "user",
    initiatorName: "Sara Lin",
    initiatorRole: "投资组合负责人",
    initials: "SL",
    initialTimestamp: "May 13, 10:08",
    lastActivityTimestamp: "May 13, 10:14",
    unread: false,
    title: "刮胡刀 + 刀头 · Henry's",
    turns: [
      {
        speaker: "user",
        timestamp: "May 13, 10:08",
        body:
          "Henry's 刮胡刀产品线 — 刀头 3 个月换一次。需要保持产品线 blended margin ≥ 15% 的同时把整体销售额最大化。该如何测试和制定定价 + 营销策略?",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "May 13, 10:14",
        body:
          "已起草 3 阶段方案:Phase 1 基线诊断 · Phase 2 三组并行定价实验 · Phase 3 待 Phase 2 结果激活的决策树。打开画布查看。",
        canvasLink: true,
      },
    ],
  },
  {
    id: "launch-cr",
    canvasId: "launch-cr",
    initiator: "user",
    initiatorName: "Jamal Hassan",
    initiatorRole: "运营经理",
    initials: "JH",
    initialTimestamp: "May 15, 08:31",
    lastActivityTimestamp: "May 15, 08:38",
    unread: false,
    title: "新品 CR 诊断 · 轮胎充气泵",
    turns: [
      {
        speaker: "user",
        timestamp: "May 15, 08:31",
        body:
          "我们新上的轮胎充气泵针对皮卡市场,但 pickup-related 搜索词的转化率特别差。该如何定位问题、优化产品?",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "May 15, 08:38",
        body:
          "已完成受众聚类与竞品 listing 对比拆解,识别 4 个假设(2 个 P0:主图重做 + 标题重写;2 个 P1:A+ 模块 + bullet 重排)。打开画布查看测试计划。",
        canvasLink: true,
      },
    ],
  },
];

/* Strategy canvas */
const STRATEGY = {
  goal: "在落地灯品类拿下 BS 排名 · 90 天内",
  goalConfirmedBy: "Maya Chen",
  goalConfirmedOn: "May 4",

  /* Current listing performance — gap to #1 best seller by search-term segment */
  performance: {
    rank: "#2",
    rankCategory: "落地灯",
    rankHeldDays: 27,
    salesLast30d: 138400,
    tacos: 18.1,
    bestSellerSku: "SKU-204 · 竞品",

    segments: [
      { id: "all",      label: "全部",            count: 64, kicker: "所有品类关键词(不含品牌)" },
      { id: "core",     label: "核搜词",   count:  8, kicker: "floor lamp · arc · tripod · tall · reading" },
      { id: "scenario", label: "场景关键词",  count: 32, kicker: "bedroom · living · kid room · study" },
      { id: "style",    label: "属性关键词", count: 24, kicker: "modern · vintage · mid-century · industrial" },
    ],

    gapsBySegment: {
      all: [
        { kicker: "流量",    label: "月曝光", currentValue: "1.84M", currentNumeric: 1.84, benchmarkValue: "2.92M", benchmarkNumeric: 2.92, gap: "−37%",   gapDetail: "−1.08M / 月" },
        { kicker: "点击",      label: "CTR",  currentValue: "2.1%",  currentNumeric: 2.1,  benchmarkValue: "2.6%",  benchmarkNumeric: 2.6,  gap: "−0.5pp", gapDetail: "相对 −19%" },
        { kicker: "转化", label: "转化率",     currentValue: "8.9%",  currentNumeric: 8.9,  benchmarkValue: "9.2%",  benchmarkNumeric: 9.2,  gap: "−0.3pp", gapDetail: "相对 −3%" },
      ],
      core: [
        { kicker: "流量",    label: "月曝光", currentValue: "920K",  currentNumeric: 0.92, benchmarkValue: "1.42M", benchmarkNumeric: 1.42, gap: "−35%",   gapDetail: "−500K / 月" },
        { kicker: "点击",      label: "CTR",  currentValue: "2.4%",  currentNumeric: 2.4,  benchmarkValue: "2.8%",  benchmarkNumeric: 2.8,  gap: "−0.4pp", gapDetail: "相对 −14%" },
        { kicker: "转化", label: "转化率",     currentValue: "9.4%",  currentNumeric: 9.4,  benchmarkValue: "9.5%",  benchmarkNumeric: 9.5,  gap: "−0.1pp", gapDetail: "接近持平 · 优势项" },
      ],
      scenario: [
        { kicker: "流量",    label: "月曝光", currentValue: "480K",  currentNumeric: 0.48, benchmarkValue: "680K",  benchmarkNumeric: 0.68, gap: "−29%",   gapDetail: "−200K / 月" },
        { kicker: "点击",      label: "CTR",  currentValue: "1.4%",  currentNumeric: 1.4,  benchmarkValue: "2.5%",  benchmarkNumeric: 2.5,  gap: "−1.1pp", gapDetail: "相对 −44% · 差距最大",     widest: true },
        { kicker: "转化", label: "转化率",     currentValue: "8.2%",  currentNumeric: 8.2,  benchmarkValue: "9.1%",  benchmarkNumeric: 9.1,  gap: "−0.9pp", gapDetail: "相对 −10%" },
      ],
      style: [
        { kicker: "流量",    label: "月曝光", currentValue: "440K",  currentNumeric: 0.44, benchmarkValue: "820K",  benchmarkNumeric: 0.82, gap: "−46%",   gapDetail: "−380K / 月 · 差距最大",     widest: true },
        { kicker: "点击",      label: "CTR",  currentValue: "2.2%",  currentNumeric: 2.2,  benchmarkValue: "2.4%",  benchmarkNumeric: 2.4,  gap: "−0.2pp", gapDetail: "相对 −8%" },
        { kicker: "转化", label: "转化率",     currentValue: "8.8%",  currentNumeric: 8.8,  benchmarkValue: "9.0%",  benchmarkNumeric: 9.0,  gap: "−0.2pp", gapDetail: "相对 −2%" },
      ],
    },

    /* Sub-segment breakdown — explains the impression gap via organic rank + ad position */
    segmentBreakdown: {
      scenario: [
        {
          name: "卧室",
          exampleTerms: "floor lamp for bedroom · bedside floor lamp · bedroom reading lamp",
          terms: 14, impressionsK: 142,
          organicRank: 18, organicRankBenchmark: 4,
          adPosition: 4,  adPositionBenchmark: 2,
          ctr: 1.1, cr: 6.4,
          alert: true, alertNote: "差距最大 — 洞察 #1",
        },
        {
          name: "客厅",
          exampleTerms: "modern floor lamp for living room · tall floor lamp living room · arc lamp living room",
          terms: 9, impressionsK: 218,
          organicRank:  6, organicRankBenchmark: 3,
          adPosition: 2,  adPositionBenchmark: 1,
          ctr: 1.8, cr: 9.1,
        },
        {
          name: "儿童房",
          exampleTerms: "kids room floor lamp · nursery floor lamp · child-safe floor lamp",
          terms: 5, impressionsK: 68,
          organicRank: 11, organicRankBenchmark: 5,
          adPosition: 3,  adPositionBenchmark: 2,
          ctr: 1.4, cr: 7.8,
        },
        {
          name: "书房",
          exampleTerms: "study floor lamp · office floor lamp · desk reading floor lamp",
          terms: 4, impressionsK: 52,
          organicRank:  9, organicRankBenchmark: 4,
          adPosition: 3,  adPositionBenchmark: 2,
          ctr: 1.6, cr: 8.4,
        },
      ],
      style: [
        {
          name: "现代",
          exampleTerms: "modern floor lamp · contemporary floor lamp · sleek floor lamp",
          terms: 9, impressionsK: 196,
          organicRank:  5, organicRankBenchmark: 3,
          adPosition: 2,  adPositionBenchmark: 1,
          ctr: 2.4, cr: 9.2,
        },
        {
          name: "中世纪",
          exampleTerms: "mid-century floor lamp · mid-century modern lamp · retro 60s floor lamp",
          terms: 6, impressionsK: 112,
          organicRank:  8, organicRankBenchmark: 5,
          adPosition: 3,  adPositionBenchmark: 2,
          ctr: 2.2, cr: 8.6,
        },
        {
          name: "工业风",
          exampleTerms: "industrial floor lamp · loft floor lamp · pipe floor lamp",
          terms: 5, impressionsK: 84,
          organicRank: 11, organicRankBenchmark: 6,
          adPosition: 3,  adPositionBenchmark: 2,
          ctr: 1.9, cr: 8.1,
        },
        {
          name: "复古",
          exampleTerms: "vintage floor lamp · antique brass floor lamp · old fashioned floor lamp",
          terms: 4, impressionsK: 48,
          organicRank: 15, organicRankBenchmark: 7,
          adPosition: 4,  adPositionBenchmark: 3,
          ctr: 1.6, cr: 7.4,
          alert: true, alertNote: "流量与 CTR 均落后",
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
        name: "品牌 · 精准匹配",
        campaignName: "SP — 品牌防御",
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
        name: "品牌 · 词组匹配",
        campaignName: "SP — 品牌防御",
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
        name: "品类 · 广泛匹配",
        campaignName: "SP — 品类广泛",
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
          { kw: "floor lamp for bedroom", impressions:  38200, clicks:  420, ctr: 1.1, cr: 6.2, flagged: "卧室 · 洞察 #1" },
          { kw: "bedside floor lamp",     impressions:  22400, clicks:  224, ctr: 1.0, cr: 5.8, flagged: "卧室 · 洞察 #1" },
          { kw: "bedroom reading lamp",   impressions:  14200, clicks:  170, ctr: 1.2, cr: 7.4, flagged: "卧室 · 洞察 #1" },
          { kw: "tall arc floor lamp",    impressions:  18600, clicks:  372, ctr: 2.0, cr: 8.9 },
        ],
      },
      {
        id: "ag-cat-hero-exact",
        name: "品类核心 · 精准",
        campaignName: "SP — 品类精准",
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
          { kw: "modern floor lamp (精准)",     impressions: 84200, clicks: 2021, ctr: 2.4, cr: 10.1 },
          { kw: "minimalist floor lamp (精准)", impressions: 62400, clicks: 1622, ctr: 2.6, cr:  9.8 },
        ],
      },
      {
        id: "ag-cat-secondary-exact",
        name: "品类次级 · 精准",
        campaignName: "SP — 品类精准",
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
        name: "长尾 · 词组",
        campaignName: "SP — 长尾词组",
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
          { kw: "tall floor lamp for bedroom",       impressions: 12100, clicks: 145, ctr: 1.2, cr: 6.4, flagged: "卧室 · 洞察 #1" },
          { kw: "floor lamp for small bedroom",      impressions:  8400, clicks:  92, ctr: 1.1, cr: 5.8, flagged: "卧室 · 洞察 #1" },
          { kw: "industrial floor lamp",             impressions: 11200, clicks: 224, ctr: 2.0, cr: 8.0 },
        ],
      },
      {
        id: "ag-longtail-auto",
        name: "长尾 · 自动发现",
        campaignName: "SP — 长尾词组",
        campaignType: "SP",
        keywordCount: "自动",
        dailyBudget: 49,
        spend30d: 1120,
        sales30d:  4780,
        tacos: 23.4,
        acos: 19.3,
        ctr: 1.2,
        cr: 7.6,
        topKeywords: [
          { kw: "自动定位发现的搜索词(30 天约 28 个)", impressions: 38400, clicks: 461, ctr: 1.2, cr: 7.6 },
        ],
      },
      {
        id: "ag-sd-adjacent",
        name: "SD · 邻近 SKU 受众",
        campaignName: "SD — 详情页",
        campaignType: "SD",
        keywordCount: "受众",
        dailyBudget: 38,
        spend30d: 1480,
        sales30d:  6420,
        tacos: 23.1,
        acos: 18.9,
        ctr: 1.2,
        cr: 7.1,
        topKeywords: [
          { kw: "邻近 SKU 购物者(受众)", impressions: 64200, clicks: 770, ctr: 1.2, cr: 7.1 },
        ],
      },
      {
        id: "ag-sd-remarketing",
        name: "SD · 详情页再营销",
        campaignName: "SD — 详情页",
        campaignType: "SD",
        keywordCount: "受众",
        dailyBudget: 38,
        spend30d:  800,
        sales30d: 3360,
        tacos: 23.8,
        acos: 19.3,
        ctr: 1.0,
        cr: 6.2,
        topKeywords: [
          { kw: "详情页再营销(14 天窗口)", impressions: 32400, clicks: 324, ctr: 1.0, cr: 6.2 },
        ],
      },
    ],
  },

  /* Listing operation log — past milestones on this SKU */
  operationLog: [
    { date: "Apr 4, 2025",  milestone: "Listing 上线",                                detail: "初始售价 $189 · 4 张主图 · 3 条 bullet point" },
    { date: "May 18, 2025", milestone: "主图更换为生活场景图",       detail: "14 天内 CTR 从 1.2% 提升至 1.8%" },
    { date: "Jul 22, 2025", milestone: "评论数突破 100 · 平均 4.6 星",             detail: "CR 提升至 7.4%(当时品类基准:6.2%)" },
    { date: "Sep 8, 2025",  milestone: "A+ Content 上线 · 功能对比模块", detail: "CR 连续 8 周保持 ≥ 8.2%" },
    { date: "Nov 16, 2025", milestone: "核心关键词 CR 突破品类基准",            detail: "'modern floor lamp' CR 8.9%,品类 6.4%" },
    { date: "Jan 11, 2026", milestone: "拿下品类 Top-5 排名",                     detail: "首次进入自然排名前 5" },
    { date: "Feb 22, 2026", milestone: "'minimalist floor lamp' CTR 高出品类 +52%",  detail: "连续保持 21 天 — 验证该词的素材契合度" },
    { date: "Apr 18, 2026", milestone: "拿下品类第 2 名",                        detail: "当前排名 · 已保持 27 天" },
  ],

  /* Agent insights — two distinct types */
  insights: [
    {
      id: "bedroom-ctr",
      type: "informational",
      title: "卧室场景流量上不去 — 问题在点击率",
      summary:
        "14 个卧室相关词每月只带来 $3.2K 流量。点击率 1.1%,品类基准 2.8% — 差了一半多。",
      observations: [
        "这 14 个词的自然位在 18 名左右(品类前 5 都在 #4 以内),广告位也偏后(slot 4 vs 头部 slot 2)",
        "5 个词当前在投广告中。在右侧 Ad architecture 面板里标红了",
        "主图和详情页前 3 张图都是客厅/大厅场景,没有卧室场景图 — 这可能是点击率上不去的原因",
      ],
      projectedImpact: {
        primary: "+$18K / 月销售额",
        condition: "卧室点击率追平品类基准后估算",
      },
      ownership: "品牌团队",
      ownershipReason:
        "改主图、调图序、改文案需要品牌团队上手。Agent 负责发现和量化,不替团队拍图。",
      recommendation:
        "拍一张卧室场景主图做 A/B 测试 — control 是当前主图,treatment 加入卧室场景。14 天能看出来。",
      actions: ["通知 Listing 团队", "暂缓 7 天", "标记为已解决"],
    },
    {
      id: "best-seller-playbook",
      type: "executable",
      title: "将之前 #2 → #1 的争取打法应用到 SKU-A",
      summary:
        "ABC Home Goods · 床架 SKU-117 在 7 周内完成 #2 → #1(2025 Q4),使用了 TACoS 由 19% 临时升至 31% + 14 天促销的打法。落地灯 SKU-A 在生命周期阶段、竞争烈度、价格带上均匹配。",
      reference: {
        sku: "床架 · SKU-117",
        period: "2025 Q4",
        outcome: "7 周内 #2 → #1",
        method:
          "4 周内 TACoS 临时由 19% 升至 31% + 14 天 15% 折扣促销。在第 6 周拿下 #1。随后 6 周的回落期内,销售额保持在活动前基线 +18% — BS 标签带动自然点击 +34%,抵消了广告花费的下降。",
      },
      plan: {
        phases: [
          {
            label: "1–4 周 · 预算 +67% · 加 SB 层 · 上线促销",
            actions: [
              "日广告预算 $848 → $1,420(+67%)",
              "在前 12 个核心品类关键词上叠加 SB 头条广告层",
              "上线 14 天促销券:12% 折扣",
            ],
            tacos: 32.4,
            sales: 172,
          },
          {
            label: "5–8 周 · 架构维持 · BS 标签带动自然流量",
            actions: [
              "在争取窗口期保持第 4 周的广告架构",
              "BS 标签预计带动自然点击 +28% 至 +42%",
            ],
            tacos: 28.6,
            sales: 196,
          },
          {
            label: "9–12 周 · 预算 −35% · 自然 + BS 标签承接",
            actions: [
              "日广告预算 $1,420 → $920(−35%)",
              "自然 + BS 标签预计跑赢广告下调 · 销售保持或小幅增长",
            ],
            tacos: 17.8,
            sales: 204,
          },
        ],
        summary: {
          cumulativeSalesLift: 158,
          finalTacos: 17.8,
          captureWindow: "第 6–8 周",
        },
      },
      confidence: 81,
      confidenceLabel: "9 个过往可比 #2 → #1 争取案例 · 其中 7 个使用此类打法",
    },
  ],

  /* Milestone path — aligned to this specific best-seller goal */
  milestonePath: [
    {
      idx: 1,
      label: "Listing 优化",
      target: "卧室意图 CTR 追平品类基准(1.1% → 2.0%+)",
      window: "第 1–2 周",
      dependsOn: "品牌团队 · 来自洞察 #1",
      status: "blocked-on-team",
    },
    {
      idx: 2,
      label: "广告架构提升",
      target: "核心关键词进入自然 Top-3 · SOV 14% → 26%",
      window: "第 1–4 周",
      dependsOn: "Agent · 来自洞察 #2 计划",
      status: "awaiting-approval",
    },
    {
      idx: 3,
      label: "争取 BS",
      target: "品类排名 #1",
      window: "第 6–8 周",
      dependsOn: "#1 + #2 的结果",
      status: "goal",
    },
    {
      idx: 4,
      label: "回到目标 TACoS",
      target: "TACoS 回到 17–19% · 销售保持在峰值 −5% 以内",
      window: "第 9–12 周",
      dependsOn: "#3 完成后启动",
      status: "preview",
    },
  ],

  reasoning: {
    chain: [
      "从既定目标出发:90 天内争取 BS。",
      "分析当前 listing 健康度:排名 #2,销售额 $138K/月,TACoS 18.1% — 在目标区间内。Listing 处于成熟期且运行高效。仅靠广告架构调整难以追到 #1。",
      "审计当前广告架构(5 个广告活动,合计日预算 $848)。在广告活动层面未发现结构性低效。",
      "扫描 listing 的薄弱环节,识别出卧室场景搜索词为最高影响的 CTR 缺口 — 但其解决需要 listing 内容修改,不在 agent 执行范围内(已作为洞察 #1 呈现)。",
      "从公司大脑中调取 9 个过往 #2 → #1 案例,其中 7 个使用了短期提高广告预算 + 促销打法。最佳匹配:2025 Q4 床架 SKU-117(相同生命周期阶段、可比竞争烈度、相邻价格带)。",
      "基于该打法起草 3 阶段计划(洞察 #2)。BS 标签与回落阶段的产出基于观测到的过往结果建模。",
      "编排顺序里程碑路径:listing 修复(团队)+ 短期提高广告预算(agent)→ 拿下 #1 → 恢复目标 TACoS。",
      "90 天时间表的信心度:81%。",
    ],
    accuracy: 81,
    accuracyLabel: "同类 #2 → #1 争取案例",
  },
};

/* Floor Lamp 搜索词人群划分 — backs the "查看人群划分逻辑" InspectionDrawer */
const FLOOR_LAMP_CLUSTERING = {
  methodology:
    "Amazon 搜索词按词性逐层打标签:先判断是否含产品主词,再判断是否带场景 / 风格 / 季节修饰词。同一关键词可同时含多种属性,以最具区分度的为主标签。表格按月搜索量降序排列。",
  tableHeaders: ["关键词", "月搜索量", "词性", "具体类目"],
  rows: [
    ["floor lamp",                          "240.4K", "中性词", "主词"],
    ["modern floor lamp",                   "84.2K",  "风格词", "现代"],
    ["minimalist floor lamp",               "62.4K",  "风格词", "现代"],
    ["mid-century floor lamp",              "44.8K",  "风格词", "中世纪"],
    ["industrial floor lamp",               "38.2K",  "风格词", "工业"],
    ["tall floor lamp",                     "34.6K",  "中性词", "高度属性"],
    ["contemporary floor lamp",             "32.4K",  "风格词", "现代"],
    ["arc floor lamp",                      "28.8K",  "中性词", "形态属性"],
    ["modern floor lamp for living room",   "22.4K",  "场景词", "客厅"],
    ["mid-century modern lamp",             "21.2K",  "风格词", "中世纪"],
    ["floor lamp for bedroom",              "18.4K",  "场景词", "卧室"],
    ["tall floor lamp living room",         "16.8K",  "场景词", "客厅"],
    ["vintage floor lamp",                  "16.8K",  "风格词", "复古"],
    ["tripod floor lamp",                   "15.2K",  "中性词", "形态属性"],
    ["loft floor lamp",                     "14.4K",  "风格词", "工业"],
    ["retro 60s floor lamp",                "12.8K",  "风格词", "中世纪"],
    ["bedside floor lamp",                  "12.2K",  "场景词", "卧室"],
    ["arc lamp living room",                "11.4K",  "场景词", "客厅"],
    ["antique brass floor lamp",            "11.2K",  "风格词", "复古"],
    ["pipe floor lamp",                     "9.6K",   "风格词", "工业"],
    ["bedroom reading lamp",                "8.8K",   "场景词", "卧室"],
    ["old fashioned floor lamp",            "8.4K",   "风格词", "复古"],
    ["outdoor patio floor lamp",            "6.8K",   "季节词", "户外 / 夏季"],
    ["study floor lamp",                    "5.4K",   "场景词", "书房 / 办公"],
    ["kids room floor lamp",                "4.8K",   "场景词", "儿童房"],
    ["office floor lamp",                   "4.1K",   "场景词", "书房 / 办公"],
    ["nursery floor lamp",                  "3.6K",   "场景词", "儿童房"],
    ["holiday floor lamp",                  "3.2K",   "季节词", "节日 / 冬季"],
    ["desk reading floor lamp",             "2.8K",   "场景词", "书房 / 办公"],
    ["child-safe floor lamp",               "2.2K",   "场景词", "儿童房"],
  ],
  rules: [
    {
      term: "中性词",
      definition:
        "仅含产品主词(floor lamp)及物理属性词(tall / arc / tripod)。无场景、风格、季节信息;承接最宽泛的搜索需求。",
    },
    {
      term: "场景词",
      definition:
        "包含使用场景(bedroom / living room / nursery / study)— 表达用户的使用环境;定位最精准。",
    },
    {
      term: "风格词",
      definition:
        "包含视觉风格描述(modern / mid-century / industrial / vintage)— 表达用户的审美偏好;品类内竞品差异化的主战场。",
    },
    {
      term: "季节词",
      definition:
        "包含季节或时段(outdoor / patio / holiday)— 此品类季节性较弱,样本量小,主要用于户外子品类。",
    },
  ],
};

/* Peak season canvas */
const PEAK = {
  trafficForecast: [
    { week: "当前", traffic: 100, pressure: 58 },
    { week: "W+1", traffic: 118, pressure: 72 },
    { week: "W+2", traffic: 144, pressure: 81 },
    { week: "W+3", traffic: 172, pressure: 89 },
    { week: "W+4", traffic: 195, pressure: 94 },
    { week: "W+5", traffic: 218, pressure: 96 },
    { week: "W+6", traffic: 234, pressure: 98 },
  ],
  competitiveSignals: [
    {
      label: "竞品出价花费增长",
      value: "+40 至 60%",
      detail: "过去 14 天内 3 个竞品 SKU 抬高出价",
    },
    {
      label: "新入场者",
      value: "上线 9 天",
      detail: "1 个新 SKU 处于上线期激进竞价",
    },
    {
      label: "竞品在核心关键词上的 SOV 增长",
      value: "+27pp",
      detail: "Top 12 品类词上的综合竞品 SOV 变动",
    },
  ],
  portfolio: [
    { sku: "SKU-A 弧形落地灯",     lifecycle: "增长",  sov: 18.4, posture: "defend",    tacosCap: 32, bidAdj: "+18%" },
    { sku: "SKU-B 三脚架 64\"",       lifecycle: "增长",  sov: 14.2, posture: "defend",    tacosCap: 32, bidAdj: "+14%" },
    { sku: "SKU-D 阅读灯",       lifecycle: "成熟",   sov:  9.6, posture: "defend",    tacosCap: 32, bidAdj: "+12%" },
    { sku: "SKU-E 中世纪",        lifecycle: "成熟",   sov: 11.8, posture: "defend",    tacosCap: 32, bidAdj: "+9%"  },
    { sku: "SKU-F 极简 LED",        lifecycle: "增长",  sov:  6.4, posture: "lean-in",   tacosCap: 38, bidAdj: "+28%" },
    { sku: "SKU-G 角落弧形",         lifecycle: "增长",  sov:  5.1, posture: "lean-in",   tacosCap: 38, bidAdj: "+24%" },
    { sku: "SKU-H 工业风",         lifecycle: "新品",   sov:  3.2, posture: "lean-in",   tacosCap: 42, bidAdj: "+32%" },
    { sku: "SKU-I 复古黄铜",      lifecycle: "衰退",  sov:  2.1, posture: "step-back", tacosCap: 18, bidAdj: "−22%" },
    { sku: "SKU-J 玻璃球",        lifecycle: "衰退",  sov:  1.8, posture: "step-back", tacosCap: 18, bidAdj: "−18%" },
  ],
  decision: {
    additionalWeeklyBudget: 42,
    defendCount: 4,
    leanInCount: 3,
    stepBackCount: 2,
  },
  reasoning: {
    chain: [
      "在峰值流量切换期间保持 TACoS 不变,意味着在最有价值的窗口让出 SOV。",
      "从公司大脑调取过去 3 次旺季数据。保持 TACoS 不变的品牌平均损失 14pp 品类 SOV — 恢复耗时 4–6 个月。",
      "按生命周期阶段分层:对增长/成熟期高 SOV SKU 采取防守;对竞品出价尚未饱和的增长/新品 SKU 采取加注;对衰退期 SKU 采取收缩以保护利润。",
      "SOV 防御结果的信心度:71%。",
    ],
    accuracy: 71,
    accuracyLabel: "旺季 SOV 防御结果",
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
    { ts: "May 15 · 08:24", type: "出价调整",       kind: "autonomous", delta: '"modern floor lamp" 出价上调 $1.40 → $1.85', reason: "CTR 连续 48 小时高于目标;出价上调在授权类别内。",                approver: "自主执行 · 类别:bid_raise_under_15pct",  status: "线上" },
    { ts: "May 14 · 22:11", type: "预算",         kind: "approved",   delta: "SP-Category-Exact 日预算上调 $480 → $640",        reason: "最近 9 天有 7 天触顶;曝光份额被压制约 6pp。",        approver: "由 Maya Chen 批准",                       status: "线上" },
    { ts: "May 14 · 14:08", type: "关键词",        kind: "approved",   delta: "从搜索词报告中新增 6 个长尾关键词", reason: "过去 14 天 CR > 9%;此前仅靠自动定位覆盖。",                  approver: "由 Devon Park 批准",                      status: "线上" },
    { ts: "May 13 · 16:42", type: "出价调整",       kind: "autonomous", delta: '"tripod floor lamp" 出价下调 $1.95 → $1.70',           reason: "ACoS 连续 72 小时超目标 12pp;在授权类别内。",           approver: "自主执行 · 类别:bid_lower_under_15pct",   status: "线上" },
    { ts: "May 13 · 09:22", type: "重构",    kind: "approved",   delta: "将 SP-Category-Broad 拆分为广泛 + 词组两层",          reason: "仅词组的子集在中部漏斗词上预计 +14% 效率。",        approver: "由 Sara Lin 批准",                        status: "线上" },
    { ts: "May 12 · 18:34", type: "预算",         kind: "approved",   delta: "将 $320/天 从 SP-Branded 重分配至 SP-Category-Exact",   reason: "品牌词曝光份额已饱和至 98%;边际预算用在他处更有效。",   approver: "由 Maya Chen 批准",                       status: "线上" },
    { ts: "May 11 · 11:15", type: "关键词",        kind: "approved",   delta: '新增否定词:"lava lamp"、"salt lamp"、"lamp shade"',    reason: "搜索词报告中识别出高曝光零转化词。", approver: "由 Jamal Hassan 批准",                    status: "线上" },
    { ts: "May 10 · 14:52", type: "出价调整",       kind: "autonomous", delta: '"reading floor lamp modern" 出价上调 $1.40 → $1.62',   reason: "CR 连续 48 小时高于目标;出价上调在授权类别内。",                  approver: "自主执行 · 类别:bid_raise_under_15pct",   status: "线上" },
    { ts: "May 09 · 10:08", type: "出价调整",       kind: "autonomous", delta: '"corner floor lamp" 出价下调 $1.25 → $1.10',          reason: "ACoS 飙升 +14pp 持续 72 小时;自动节流已启动。",               approver: "自主执行 · 类别:bid_lower_under_15pct",   status: "线上" },
  ],
  pending: [
    { ts: "May 15 · 11:42", summary: "暂停表现不佳的广告组:Category-Phrase-Long-Tail(47 个词)",      reason: "过去 11 天净贡献为 −$184/天。" },
    { ts: "May 15 · 09:18", summary: "将 SP-Branded-Defense 日预算上限提高 $180",                    reason: "竞品 SKU-X 于 4 天前开始竞价我方品牌词。" },
    { ts: "May 14 · 17:55", summary: "将 8 个关键词从 SP 广泛迁移至 SP 精准",                       reason: "CR 持续 > 7% — 匹配方式收敛预计提升效率。" },
  ],
  autonomousClasses: [
    { name: "出价提升 / 下调(≤15%)",                 count: 38, lastUsed: "May 15 · 08:24" },
    { name: "否定词收集(零转化 > 14 天)",     count: 22, lastUsed: "May 13 · 06:00" },
    { name: "广告活动内预算重新分配(≤20%)",     count:  9, lastUsed: "May 14 · 03:12" },
    { name: "曝光份额饱和时分时段投放",       count:  4, lastUsed: "May 11 · 18:30" },
  ],
  reasoning: {
    chain: [
      "过去 7 天,agent 在 SKU-A 上执行了 23 个广告平台操作。",
      "其中 18 个走标准的审核-批准流程;团队平均在 47 分钟内完成批准。",
      "5 个在已授权的决策类别下运行 — 均为 ±15% 内的出价调整。团队随时可撤销授权。",
      "0 个操作被回滚;期间 SKU-A 的净效率提升:ACoS −3.2pp,曝光份额 +4pp。",
    ],
    accuracy: 94,
    accuracyLabel: "团队审核后保留的操作",
  },
};

/* Launch canvas */
const LAUNCH = {
  sku: "SKU-C 三脚架落地灯",
  category: "落地灯",
  targetLaunch: "June 12",
  priorLaunches: [
    { sku: "SKU-prior-3 黄铜弧形",  date: "2025 Q4", outcome: "11 周内进入 Top-12", similarity: "高",   note: "相同价格带、相同品类" },
    { sku: "SKU-prior-5 工业风", date: "2025 Q4", outcome: "9 周内进入 Top-20",  similarity: "高",   note: "相同生命周期切入点" },
    { sku: "SKU-prior-2 中世纪",date: "2025 Q3", outcome: "14 周内进入 Top-8",  similarity: "中", note: "相邻风格集群" },
  ],
  campaignArchitecture: [
    { type: "SP", name: "SP — 上线核心",        adgroups: ["头部精准(6 个词)", "头部词组(6 个词)"],            budget: 920 },
    { type: "SP", name: "SP — 上线中部",         adgroups: ["中部词组(24 个词)", "中部精准(第 2 周后)"],      budget: 1480 },
    { type: "SP", name: "SP — 上线长尾",   adgroups: ["长尾词组(64 个词)"],                          budget: 740 },
    { type: "SB", name: "SB — 品类头条",  adgroups: ["核心关键词视频(6 个词)"],                         budget: 680 },
    { type: "SD", name: "SD — 详情页受众", adgroups: ["邻近 SKU 购物者"],                           budget: 240 },
  ],
  keywords: [
    { tier: "头部",      count:  6, dailyBudget: 920,  examples: "modern floor lamp · minimalist floor lamp" },
    { tier: "中部",       count: 24, dailyBudget: 1480, examples: "arc floor lamp · tripod floor lamp · reading lamp tall" },
    { tier: "长尾", count: 64, dailyBudget: 740,  examples: "modern floor lamp for small apartment · tripod 64 inch" },
  ],
  bidStrategy: [
    { phase: "第 1 周 · 激进", head: "$2.40 – $2.85", mid: "$1.60 – $1.95", long: "$0.80 – $1.10", logic: "建立竞价存在感;在核心关键词上以出价底价获取早期排名信号。" },
    { phase: "第 2–3 周 · 稳定", head: "$2.10 – $2.45", mid: "$1.40 – $1.70", long: "$0.65 – $0.90", logic: "依据观测到的 CTR / CR 调优,守住第 1 周获取的 SOV。" },
    { phase: "第 4 周 · 效率", head: "$1.80 – $2.10", mid: "$1.20 – $1.45", long: "$0.55 – $0.75", logic: "转向 TACoS 优化。长尾层优先用于获取边际高效收入。" },
  ],
  pacing: [
    { week: "W1", daily: 449, total: 3143 },
    { week: "W2", daily: 383, total: 2681 },
    { week: "W3", daily: 346, total: 2422 },
    { week: "W4", daily: 311, total: 2177 },
  ],
  milestones: [
    { week: 1, gate: "曝光门槛", target: "核心关键词曝光 ≥ 50K",   rationale: "在扩大花费前确认竞价存在感。" },
    { week: 2, gate: "CTR 门槛",        target: "中部层 CTR ≥ 1.4%",                 rationale: "在中部层放量前确认素材与 listing 的相关性。" },
    { week: 3, gate: "SOV 门槛",        target: "品类 SOV ≥ 4%",                       rationale: "在最终效率阶段前确认品类层可见性。" },
    { week: 4, gate: "TACoS 门槛",           target: "综合 TACoS ≤ 42%",                     rationale: "在进入稳态放量前确认效率区间。" },
  ],
  reasoning: {
    chain: [
      "从公司大脑中 7 个过往上线案例提取方法论,其中 3 个高相似度案例权重最高。",
      "成功案例的共同模式:第 1 周在 4–6 个核心关键词上以激进出价底价投放;在曝光达 50K 门槛时切换生命周期;CR 达 5% 时由 SP 广泛切换至 SP 精准。",
      "起草 5 阶段打法,采用里程碑门槛逐阶段批准,而非整体一次批准。",
      "12 周内进入 Top-12 的信心度:81%。",
    ],
    accuracy: 81,
    accuracyLabel: "同类新 SKU 上线",
  },
};

const COMPANY_BRAIN = {
  decisionClasses: 47,
  playbooks: 19,
  capturedPatterns: 142,
  recentEntries: [
    { name: "争取 BS · SB 叠加层模式", added: "May 2 · 来自 SKU-prior-1 的结果" },
    { name: "旺季 SOV 防御 · 增长期 SKU", added: "Apr 28 · 来自 2025 Q4 复盘" },
    { name: "漏斗瓶颈 · CTR 解决方案打法", added: "Apr 21 · 来自 SKU-B 的结果" },
    { name: "上线爬坡曲线 · 价格带 $120–180", added: "Apr 14 · 来自 SKU-prior-5 的结果" },
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

/* Wraps known jargon metric labels with MetricTerm; passes through plain text otherwise */
function wrapMetric(label) {
  const map = {
    TACoS: METRIC_DEFINITIONS.tacos,
    ACoS: METRIC_DEFINITIONS.acos,
    CTR: METRIC_DEFINITIONS.ctr,
    CR: METRIC_DEFINITIONS.cr,
    SOV: METRIC_DEFINITIONS.sov,
    LTV: METRIC_DEFINITIONS.ltv,
    月曝光: METRIC_DEFINITIONS.impressions,
    转化率: METRIC_DEFINITIONS.cr,
  };
  const def = map[label];
  if (def) return <MetricTerm definition={def}>{label}</MetricTerm>;
  return label;
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

function ActionBar({ approveLabel = "批准" }) {
  const [modifying, setModifying] = useState(false);
  return (
    <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-4">
      {modifying ? (
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
            用自然语言修改
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="例如:在 SKU-A 库存出清前暂缓上线 SB 叠加层"
              className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
            <button
              type="button"
              onClick={() => setModifying(false)}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              取消
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-md"
            >
              <Send className="w-3.5 h-3.5" />
              发送修改
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500">
            14 分钟前生成 · 等待团队决策
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
              拒绝
            </button>
            <button
              type="button"
              onClick={() => setModifying(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-100 rounded-md bg-white"
            >
              <Edit3 className="w-3.5 h-3.5" />
              修改
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
            Agent 推理
          </span>
          <span className="text-xs text-slate-400">·</span>
          <span className="text-xs text-slate-500">
            历史准确率:{" "}
            <span className="font-mono text-slate-700">{reasoning.accuracy}%</span>{" "}
            ·{reasoning.accuracyLabel}
          </span>
        </div>
        <div className="text-xs text-slate-400">
          {reasoning.chain.length} 步
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
            {wrapMetric(gap.label)}
          </div>
        </div>
        {gap.widest && (
          <Pill tone="rose">差距最大</Pill>
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
            <span className="text-11 text-slate-500">#1 BS</span>
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
          与 #1 的差距
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
        曝光被拆解为{" "}
        <span className="text-slate-900 font-medium">平均自然排名</span>{" "}
        与{" "}
        <span className="text-slate-900 font-medium">平均广告位</span>{" "}
        — 驱动曝光体量的两个杠杆。
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              子分段
            </th>
            <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              词数
            </th>
            <th className="text-left text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              月曝光
            </th>
            <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              平均自然排名
            </th>
            <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              平均广告位
            </th>
            <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              {wrapMetric("CTR")}
            </th>
            <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2.5 px-3">
              {wrapMetric("CR")}
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
                      示例:{r.exampleTerms}
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
                    BS #{r.organicRankBenchmark}
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
                    位 {r.adPosition}
                  </div>
                  <div className="text-10 text-slate-400 font-mono mt-0.5">
                    BS 位 {r.adPositionBenchmark}
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
  const [clusteringOpen, setClusteringOpen] = useState(false);
  const [modifyingCluster, setModifyingCluster] = useState(false);
  const gaps = p.gapsBySegment[activeSegment] || p.gapsBySegment.all;
  const breakdown = p.segmentBreakdown[activeSegment];
  const activeChip = p.segments.find((s) => s.id === activeSegment);
  const closeClusteringDrawer = () => {
    setClusteringOpen(false);
    setModifyingCluster(false);
  };
  const clusterFooter = modifyingCluster ? (
    <div className="space-y-3">
      <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
        用自然语言修改划分逻辑
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="例如:把 outdoor 相关词单独归为户外子品类,或把 arc 从中性词改为风格词"
          className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
        />
        <button
          type="button"
          onClick={() => setModifyingCluster(false)}
          className="px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
        >
          取消
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-md"
        >
          <Send className="w-3.5 h-3.5" />
          发送修改
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-between gap-3">
      <div className="text-11 text-slate-500 leading-relaxed">
        划分逻辑基于过去 90 天搜索词数据。可用自然语言调整规则、新增类目、或重新打标签。
      </div>
      <button
        type="button"
        onClick={() => setModifyingCluster(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-300 bg-white hover:border-slate-400 rounded-md text-xs font-medium text-slate-700 flex-shrink-0"
      >
        <Edit3 className="w-3.5 h-3.5 text-slate-500" />
        修改划分逻辑
      </button>
    </div>
  );

  return (
    <>
      {/* Status meta line */}
      <div className="mb-3 flex items-center gap-2 text-11 text-slate-500">
        <Pill tone="slate">当前 {p.rank}</Pill>
        <span>·</span>
        <span>
          {p.rankCategory} · 已保持 {p.rankHeldDays} 天 · 销售额{" "}
          <span className="font-mono text-slate-700">
            ${(p.salesLast30d / 1000).toFixed(0)}K / 月
          </span>{" "}
          · 综合 {wrapMetric("TACoS")}{" "}
          <span className="font-mono text-slate-700">{p.tacos}%</span>
        </span>
      </div>

      {/* Segment chips + audience segmentation entry */}
      <div className="mb-3 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
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
        <button
          type="button"
          onClick={() => setClusteringOpen(true)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 rounded-md text-xs font-medium text-slate-700 flex-shrink-0"
        >
          <Layers className="w-3.5 h-3.5 text-slate-500" />
          查看人群划分逻辑
          <ArrowUpRight className="w-3 h-3 text-slate-400" />
        </button>
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
            子分段拆解
          </div>
          <SegmentBreakdownTable rows={breakdown} />
        </div>
      )}

      <InspectionDrawer
        open={clusteringOpen}
        onClose={closeClusteringDrawer}
        title="人群划分逻辑 · 落地灯"
        methodologyDescription={FLOOR_LAMP_CLUSTERING.methodology}
        tableHeaders={FLOOR_LAMP_CLUSTERING.tableHeaders}
        tableRows={FLOOR_LAMP_CLUSTERING.rows}
        columnWidths={["44%", "16%", "14%", "26%"]}
        definitionsList={FLOOR_LAMP_CLUSTERING.rules}
        definitionsLabel="词性分类规则"
        footer={clusterFooter}
      />
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
                  <Pill tone="rose">{flaggedCount} 项标记</Pill>
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
                  Top 关键词 / 受众
                </div>
                <div className="text-11 text-slate-400">
                  共 {adGroup.topKeywords.length} 条 · 按曝光排序
                </div>
              </div>
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left text-10 uppercase tracking-wider text-slate-500 font-medium py-1.5 pr-3">
                      关键词 / 受众
                    </th>
                    <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-1.5 px-3">
                      曝光
                    </th>
                    <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-1.5 px-3">
                      点击
                    </th>
                    <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-1.5 px-3">
                      {wrapMetric("CTR")}
                    </th>
                    <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-1.5 pl-3">
                      {wrapMetric("CR")}
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
    { label: "广告组 · 所属广告活动", align: "left" },
    { label: "定位数", align: "right" },
    { label: "日预算 $", align: "right" },
    { label: "30 天花费", align: "right" },
    { label: "30 天销售额", align: "right" },
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
                {wrapMetric(h.label)}
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
              综合 · {s.adGroupCount} 个广告组 · {s.campaignCount} 个广告活动
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
            <Pill tone="amber">品牌团队操作</Pill>
            <span className="text-11 text-slate-500">洞察 #1 / 共 2 条</span>
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
        <SectionLabel>观察</SectionLabel>
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
            预期影响
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
            Agent 为何不执行
          </div>
          <div className="text-xs text-slate-700 mt-0.5 leading-relaxed">
            {insight.ownershipReason}
          </div>
        </div>
      </div>

      {/* Recommendation */}
      {insight.recommendation && (
        <div className="px-5 py-3 border-t border-amber-100 bg-amber-50/40">
          <div className="text-11 uppercase tracking-wider text-amber-800 font-medium mb-1">
            建议
          </div>
          <div className="text-xs text-slate-700 leading-relaxed">
            {insight.recommendation}
          </div>
        </div>
      )}

      {/* Action bar */}
      <div className="px-5 py-3 border-t border-amber-100 flex items-center justify-between">
        <div className="text-11 text-slate-500">
          责任人:{" "}
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
            <Pill tone="emerald">Agent 可执行</Pill>
            <span className="text-11 text-slate-500">
              洞察 #2 / 共 2 条 · 批准或修改
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
        <SectionLabel>参考先例 · 公司大脑</SectionLabel>
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
        <SectionLabel kicker="3 阶段计划">建议方案</SectionLabel>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left text-11 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">
                阶段
              </th>
              <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">
                预期 {wrapMetric("TACoS")}
              </th>
              <th className="text-right text-11 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">
                预期月销售额
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
            累计销售额增量
          </div>
          <div className="text-base font-mono font-semibold text-emerald-700 mt-0.5">
            +${insight.plan.summary.cumulativeSalesLift}K
          </div>
        </div>
        <div>
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            最终 {wrapMetric("TACoS")}
          </div>
          <div className="text-base font-mono font-semibold text-slate-900 mt-0.5">
            {insight.plan.summary.finalTacos}%
          </div>
        </div>
        <div>
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            争取窗口
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
              修改:
            </div>
            <input
              type="text"
              placeholder="例如:在库存出清前将促销推迟 2 周"
              className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-md text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
            <button
              type="button"
              onClick={() => setModifying(false)}
              className="text-xs text-slate-600 hover:text-slate-900 px-2"
            >
              取消
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1.5 rounded-md"
            >
              <Send className="w-3 h-3" />
              发送
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-11 text-slate-500">
              信心度{" "}
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
                拒绝
              </button>
              <button
                type="button"
                onClick={() => setModifying(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 px-2.5 py-1.5 rounded-md bg-white"
              >
                <Edit3 className="w-3.5 h-3.5" />
                修改
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1.5 rounded-md"
              >
                <Check className="w-3.5 h-3.5" />
                批准方案
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
      label: "等待团队",
    },
    "awaiting-approval": {
      tone: "slate",
      icon: AlertCircle,
      label: "等待批准",
    },
    "goal": { tone: "emerald", icon: Target, label: "目标" },
    "preview": { tone: "slate", icon: CircleDot, label: "下一阶段预览" },
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
        kicker="策略 · BS 路径"
        title="SKU-A 在落地灯品类的 BS 路径"
        meta={
          <>
            <Pill tone="slate">
              <Target className="w-3 h-3" />
              90 天窗口期
            </Pill>
            <Pill tone="emerald">
              <ShieldCheck className="w-3 h-3" />
              目标已确认
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
                目标
              </div>
              <div className="text-sm font-medium truncate">
                {STRATEGY.goal}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300 flex-shrink-0">
            <span>
              由{" "}
              <span className="text-white font-medium">
                {STRATEGY.goalConfirmedBy}
              </span>{" "}
              于 {STRATEGY.goalConfirmedOn} 确认
            </span>
            <button
              type="button"
              className="text-slate-300 hover:text-white underline underline-offset-2"
            >
              修改目标
            </button>
          </div>
        </div>
      </div>

      {/* Listing snapshot — visual context for the SKU under discussion */}
      <div className="px-6 pt-5">
        <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg p-3">
          <img
            src="/sku-a-hero.png"
            alt="SKU-A · 弧形落地灯主图"
            className="w-20 h-20 rounded-md object-cover flex-shrink-0 border border-slate-200"
          />
          <div className="flex-1 min-w-0">
            <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-0.5">
              Listing
            </div>
            <div className="text-sm font-semibold text-slate-900 truncate">
              SKU-A · 弧形落地灯
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              落地灯 · 亚麻鼓型灯罩 · 3-CCT · 弧形支架
            </div>
          </div>
        </div>
      </div>

      {/* Gap to best seller — three core path metrics */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="流量 · 点击 · 转化 · 对比 BS">
          与 BS 的差距
        </SectionLabel>
        <PerformanceStrip />
      </div>

      {/* Current ad architecture lives in the right-side panel — see top bar */}

      {/* Listing operation log */}
      <div className="px-6 pt-6">
        <SectionLabel
          kicker={`${STRATEGY.operationLog.length} 个里程碑 · 上线至今`}
        >
          Listing 操作记录
        </SectionLabel>
        <OperationLog />
      </div>

      {/* Agent insights */}
      <div className="px-6 pt-6">
        <SectionLabel
          kicker={`本次发现 ${STRATEGY.insights.length} 条 · 按影响排序`}
        >
          Agent 洞察
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
        <SectionLabel kicker="顺序门槛 · 针对当前目标">
          通往 BS 的里程碑路径
        </SectionLabel>
        <MilestonePath />
      </div>

      <ReasoningSection reasoning={STRATEGY.reasoning} />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Stage 2b — Peak season canvas                                             */
/* ────────────────────────────────────────────────────────────────────────── */

function PostureBadge({ posture }) {
  if (posture === "defend") {
    return <Pill tone="blue">防守</Pill>;
  }
  if (posture === "lean-in") {
    return <Pill tone="emerald">加注</Pill>;
  }
  return <Pill tone="slate">收缩</Pill>;
}

function PeakSeasonCanvas() {
  return (
    <>
      <CanvasHeader
        kicker="优化 · 市场状况预测"
        title="旺季应对 · 6 周倒计时"
        meta={
          <>
            <Pill tone="amber">
              <AlertCircle className="w-3 h-3" />
              竞争压力上升
            </Pill>
            <Pill tone="slate">9 SKU 组合</Pill>
          </>
        }
      />

      {/* Traffic + pressure chart */}
      <div className="px-6 pt-5">
        <SectionLabel kicker="预测品类流量 + 竞品出价压力">
          6 周预测
        </SectionLabel>
        <Card className="p-5">
          <div className="flex items-center gap-6 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-px bg-slate-900" />
              <span className="text-slate-600">品类流量(指数)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-px bg-emerald-600 border-t border-dashed" />
              <span className="text-slate-600">竞品出价压力</span>
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
        <SectionLabel kicker="过去 14 天">
          竞品信号
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
        <SectionLabel kicker={`${PEAK.portfolio.length} 个 SKU · 差异化姿态`}>
          组合应对矩阵
        </SectionLabel>
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  SKU
                </th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  生命周期
                </th>
                <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  当前 SOV
                </th>
                <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  姿态
                </th>
                <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  TACoS 上限
                </th>
                <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                  出价 Δ
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
              建议框架
            </div>
            <div className="text-sm leading-relaxed text-slate-100">
              旺季窗口对{" "}
              {PEAK.decision.defendCount} 个防守模式 SKU 接受 TACoS 上限{" "}
              <span className="font-mono font-medium text-white">32%</span>。
              对 {PEAK.decision.stepBackCount} 个收缩 SKU 将上限降至{" "}
              <span className="font-mono font-medium text-white">18%</span>{" "}
              以保护利润。
              在 {PEAK.decision.leanInCount} 个竞品出价压力尚未饱和的加注 SKU 上追加{" "}
              <span className="font-mono font-medium text-emerald-400">
                ${PEAK.decision.additionalWeeklyBudget}K 周预算
              </span>。
            </div>
          </div>
        </Card>
      </div>

      <ActionBar approveLabel="批准框架" />
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
    { id: "all", label: "全部操作" },
    { id: "出价调整", label: "出价调整" },
    { id: "预算", label: "预算" },
    { id: "关键词", label: "关键词" },
    { id: "重构", label: "重构" },
  ];
  const visible = EXECUTION.actions.filter(
    (a) => filter === "all" || a.type === filter
  );

  return (
    <>
      <CanvasHeader
        kicker="执行 · 日志"
        title="SKU-A 操作 · 过去 7 天"
        meta={
          <>
            <Pill tone="emerald">
              <Activity className="w-3 h-3" />
              全部线上
            </Pill>
            <Pill tone="slate">0 个回滚</Pill>
          </>
        }
      />

      {/* Summary stat strip */}
      <div className="px-6 pt-5">
        <div className="grid grid-cols-4 gap-3">
          <Card className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              总操作数
            </div>
            <div className="text-2xl font-mono font-semibold text-slate-900 mt-1">
              {EXECUTION.summary.total}
            </div>
          </Card>
          <Card className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              团队批准
            </div>
            <div className="text-2xl font-mono font-semibold text-slate-900 mt-1">
              {EXECUTION.summary.teamApproved}
            </div>
          </Card>
          <Card className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              自主执行
            </div>
            <div className="text-2xl font-mono font-semibold text-emerald-700 mt-1">
              {EXECUTION.summary.autonomous}
            </div>
          </Card>
          <Card className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              回滚
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
        <SectionLabel kicker={`${visible.length} 条记录`}>
          操作时间线
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
                            自主执行
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
                          撤销授权
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
        <SectionLabel kicker={`${EXECUTION.pending.length} 项等待团队`}>
          等待团队批准
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
                    拒绝
                  </button>
                  <button
                    type="button"
                    className="text-xs px-2.5 py-1 text-white bg-emerald-600 hover:bg-emerald-700 rounded-md font-medium"
                  >
                    批准
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Autonomous classes */}
      <div className="px-6 pt-6 pb-6">
        <SectionLabel kicker="已授权给 Agent 的决策类别">
          自主执行中
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
                      上次使用 {c.lastUsed}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-10 uppercase tracking-wider text-slate-400 font-medium">
                      操作数
                    </div>
                    <div className="text-sm font-mono font-medium text-slate-700">
                      {c.count}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="text-xs px-2.5 py-1 text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-md bg-white"
                  >
                    撤销
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
    { id: "architecture", label: "广告活动架构", icon: Workflow },
    { id: "keywords",     label: "关键词分配",    icon: ListTree },
    { id: "bids",         label: "出价策略",          icon: TrendingUp },
    { id: "pacing",       label: "预算节奏",         icon: DollarSign },
    { id: "milestones",   label: "里程碑门槛",       icon: Target },
  ];

  return (
    <>
      <CanvasHeader
        kicker="学习 · 新品上线"
        title={`上线计划 · ${LAUNCH.sku}`}
        meta={
          <>
            <Pill tone="slate">
              <Calendar className="w-3 h-3" />
              {LAUNCH.targetLaunch} 上线
            </Pill>
            <Pill tone="emerald">
              <Brain className="w-3 h-3" />
              参考 7 个过往上线
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
                方法论溯源 · 公司大脑
              </div>
            </div>
            <div className="text-sm text-slate-200 leading-relaxed mb-3">
              基于本品类与价格带的 7 个过往上线案例。
              提取的模式:关键词分类、广告活动结构、出价爬坡曲线、上线阶段打法。
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
                    {p.similarity}相似度 · {p.note}
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
                    类型
                  </th>
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    广告活动
                  </th>
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    广告组
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    日预算
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
                    日预算合计
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
                    层级
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    词数
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    日预算
                  </th>
                  <th className="text-left text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    示例
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
                    阶段
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    头部
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    中部
                  </th>
                  <th className="text-right text-xs uppercase tracking-wider text-slate-500 font-medium py-2.5 px-4">
                    长尾
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
                      name === "total" ? "周" : "日",
                    ]}
                  />
                  <Bar dataKey="total" fill="#0f172a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-xs text-slate-500 mt-3 leading-relaxed">
              前置爬坡:4 周预算中 26% 集中在第 1 周以建立竞价存在感。
              随效率数据积累,日预算上限逐步回落。
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
                        目标:{m.target}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {m.rationale}
                      </div>
                    </div>
                  </div>
                  <Pill tone="slate">门槛</Pill>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Action bar — special multi-option for launch */}
      <div className="px-6 pt-6 pb-2">
        <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-2">
          批准选项
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md"
          >
            <Check className="w-3.5 h-3.5" />
            批准全部计划
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-md bg-white"
          >
            逐阶段批准
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 rounded-md bg-white"
          >
            <Edit3 className="w-3.5 h-3.5" />
            修改任一阶段
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md"
          >
            <X className="w-3.5 h-3.5" />
            拒绝
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

function TopBar({ onOpenBrain, onOpenAdArch, locale, setLocale }) {
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
        <div className="flex items-center gap-2 ml-1 text-11 text-slate-600">
          <span className="text-slate-400">昨日(PDT)</span>
          <span className="text-slate-300">·</span>
          <span>
            销售额{" "}
            <span className="font-mono font-medium text-slate-900">$58,420</span>
          </span>
          <span className="text-slate-300">·</span>
          <span>
            TACoS{" "}
            <span className="font-mono font-medium text-slate-900">19.4%</span>
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-2 text-xs text-slate-600">
        <PulseDot />
        <span>
          Agent 自 06:00 起已摄入{" "}
          <span className="font-mono text-slate-900 font-medium">4,182</span>{" "}
          个数据点
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-md">
          <Lock className="w-3 h-3 text-emerald-700" />
          <span className="text-11 font-medium text-emerald-800">
            团队保留所有类别的覆盖权
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenAdArch}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 hover:bg-slate-50 rounded-md"
        >
          <ListTree className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-11 font-medium text-slate-700">
            广告架构
          </span>
        </button>
        <button
          type="button"
          onClick={onOpenBrain}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 hover:bg-slate-50 rounded-md"
        >
          <Brain className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-11 font-medium text-slate-700">
            公司大脑
          </span>
        </button>
        <div className="inline-flex items-center border border-slate-200 rounded-md overflow-hidden">
          <button
            type="button"
            onClick={() => setLocale("en")}
            className={`px-2 py-1 text-11 font-medium ${
              locale === "en"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLocale("zh")}
            className={`px-2 py-1 text-11 font-medium ${
              locale === "zh"
                ? "bg-slate-900 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            中
          </button>
        </div>
        <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-11 font-medium text-slate-700">
          MC
        </div>
      </div>
    </header>
  );
}

function ChatPanel({ activeId, onSelect }) {
  const agentFlagged = THREADS.filter((t) => t.initiator === "agent");
  const userThreads = THREADS.filter((t) => t.initiator === "user");
  const newCount = agentFlagged.filter((t) => t.unread).length;

  return (
    <aside className="w-80 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col">
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
        <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
          对话
        </div>
        <div className="text-11 text-slate-400 font-mono">
          {THREADS.length} 个会话
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5">
        {agentFlagged.length > 0 && (
          <div>
            <div className="px-1 mb-2 flex items-center gap-2">
              <ChevronDown className="w-3 h-3 text-slate-500" />
              <span className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                Agent 提示
              </span>
              {newCount > 0 && (
                <span className="text-10 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-1.5 font-medium">
                  {newCount} 新
                </span>
              )}
            </div>
            <div className="space-y-2">
              {agentFlagged.map((thread) => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  active={activeId === thread.id}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="px-1 mb-2 flex items-center gap-2">
            <ChevronDown className="w-3 h-3 text-slate-500" />
            <span className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              你的会话
            </span>
          </div>
          <div className="space-y-2">
            {userThreads.map((thread) => (
              <ThreadCard
                key={thread.id}
                thread={thread}
                active={activeId === thread.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 p-3 bg-slate-50/50 flex-shrink-0">
        <div className="relative">
          <input
            type="text"
            disabled
            placeholder="开始新会话……"
            className="w-full pl-3 pr-20 py-2.5 text-xs bg-white border border-slate-200 rounded-md text-slate-400 placeholder-slate-400 cursor-not-allowed"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-slate-400" />
            <span className="text-10 uppercase tracking-wider text-slate-400 font-medium">
              演示锁定
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function ThreadCard({ thread, active, onSelect }) {
  const isAgent = thread.initiator === "agent";
  const lastTurn = thread.turns[thread.turns.length - 1];
  const previewBody = lastTurn?.body || "";

  return (
    <div
      className={`rounded-lg border transition-colors ${
        active
          ? "bg-slate-50 border-slate-300"
          : "bg-white border-slate-200 hover:border-slate-300"
      } ${isAgent ? "border-l-2 border-l-emerald-500" : ""}`}
    >
      <button
        type="button"
        onClick={() => onSelect(thread.id)}
        className="w-full text-left p-3"
      >
        <div className="flex items-start gap-2">
          {isAgent ? (
            <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0 relative">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              {thread.unread && (
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full border border-white" />
              )}
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-10 font-semibold text-slate-700 flex-shrink-0">
              {thread.initials}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <div className="text-xs font-semibold text-slate-900 truncate">
                {thread.title}
              </div>
              <div className="text-10 text-slate-400 font-mono flex-shrink-0">
                {thread.lastActivityTimestamp}
              </div>
            </div>
            <div className="text-11 text-slate-500 truncate mt-0.5">
              {thread.initiatorName} · {thread.initiatorRole}
            </div>
            {isAgent && (
              <div className="mt-1.5 inline-flex items-center gap-1 text-10 text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-1.5 py-0.5 font-medium">
                <Sparkles className="w-2.5 h-2.5" />
                Agent 标记 · 监控警报
              </div>
            )}
            {!active && (
              <div className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                {previewBody}
              </div>
            )}
          </div>
        </div>
      </button>

      {active && (
        <div className="border-t border-slate-200">
          <div className="px-3 py-3 space-y-3">
            {thread.turns.map((turn, i) => (
              <ThreadTurn key={i} turn={turn} thread={thread} />
            ))}
          </div>
          <div className="border-t border-slate-100 px-3 py-2.5 bg-slate-50/60">
            <div className="relative">
              <input
                type="text"
                disabled
                placeholder="回复……"
                className="w-full pl-3 pr-14 py-2 text-11 bg-white border border-slate-200 rounded-md text-slate-400 placeholder-slate-400 cursor-not-allowed"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-slate-400" />
                <span className="text-10 uppercase tracking-wider text-slate-400 font-medium">
                  锁定
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ThreadTurn({ turn, thread }) {
  const isAgent = turn.speaker === "agent";
  return (
    <div className="flex items-start gap-2">
      {isAgent ? (
        <div className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
        </div>
      ) : (
        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-10 font-semibold text-slate-700 flex-shrink-0">
          {thread.initials || "U"}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-11 font-medium text-slate-900">
            {isAgent ? "Agent" : thread.initiatorName}
          </span>
          <span className="text-10 text-slate-400 font-mono">
            {turn.timestamp}
          </span>
        </div>
        <div className="text-xs text-slate-700 mt-0.5 leading-relaxed">
          {turn.body}
        </div>
        {turn.canvasLink && (
          <div className="mt-1 inline-flex items-center gap-1 text-11 text-emerald-700 font-medium">
            <FileText className="w-3 h-3" />
            画布已打开 →
          </div>
        )}
      </div>
    </div>
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
              广告架构
            </div>
            <span className="text-slate-300">·</span>
            <span className="text-xs text-slate-600">SKU-A</span>
            <Pill tone="slate">线上</Pill>
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
              广告组
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              {s.adGroupCount}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              广告活动
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              {s.campaignCount}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              关键词
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              {s.keywordCount}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              日预算
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              ${s.dailyBudget}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              30 天销售额
            </div>
            <div className="text-lg font-mono font-semibold text-slate-900 mt-0.5">
              ${(s.sales30d / 1000).toFixed(0)}K
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              {wrapMetric("TACoS")}
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
              点击任一广告组
            </span>{" "}
            可查看其 Top 关键词 / 受众及对应的点击与转化数据。
            玫红色行为被{" "}
            <span className="text-rose-700 font-medium">洞察 #1</span>{" "}
            (卧室场景 CTR 缺口)标记的关键词。
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
              公司大脑
            </div>
            <Pill tone="slate">只读</Pill>
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
            ABC Home Goods 沉淀的运营方法论。所有已批准的决策、已捕获的模式、过往打法均归品牌所有,可随时迁移。
          </div>
        </div>

        <div className="px-5 py-4 border-b border-slate-200 grid grid-cols-3 gap-3">
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              决策类别
            </div>
            <div className="text-xl font-mono font-semibold text-slate-900 mt-1">
              {COMPANY_BRAIN.decisionClasses}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              打法库
            </div>
            <div className="text-xl font-mono font-semibold text-slate-900 mt-1">
              {COMPANY_BRAIN.playbooks}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              已捕获模式
            </div>
            <div className="text-xl font-mono font-semibold text-slate-900 mt-1">
              {COMPANY_BRAIN.capturedPatterns}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          <SectionLabel>最新条目</SectionLabel>
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
/*  Placeholder canvas — for threads whose canvas is built in later Parts     */
/* ────────────────────────────────────────────────────────────────────────── */

function PlaceholderCanvas({ kicker, title, part }) {
  return (
    <>
      <CanvasHeader kicker={kicker} title={title} meta={null} />
      <div className="px-6 pt-8">
        <div className="border border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50/40">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-2">
            画布待构建
          </div>
          <div className="text-sm text-slate-700 leading-relaxed">
            会话结构已建立。该画布在{" "}
            <span className="font-mono font-medium text-slate-900">{part}</span>{" "}
            实现。
          </div>
          <div className="text-11 text-slate-500 mt-2 leading-relaxed">
            可在左侧查看本会话的 turn-by-turn 历史。
          </div>
        </div>
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  App                                                                       */
/* ────────────────────────────────────────────────────────────────────────── */

export default function App({ locale, setLocale }) {
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
      case "strategy":
        return <StrategyCanvas />;
      case "defense":
        return (
          <PlaceholderCanvas
            kicker="防御 · BSR 守卫"
            title="SKU-A · 受到竞品攻击"
            part="Part 5"
          />
        );
      case "omnichannel":
        return (
          <PlaceholderCanvas
            kicker="全渠道 · 移动充电宝"
            title="$100K 预算在 Amazon / Walmart / TikTok 分配"
            part="Part 2"
          />
        );
      case "razor-blade":
        return (
          <PlaceholderCanvas
            kicker="刮胡刀 + 刀头 · Henry's"
            title="产品线 blended margin ≥ 15% · 销售最大化"
            part="Part 3"
          />
        );
      case "launch-cr":
        return (
          <PlaceholderCanvas
            kicker="新品 CR 诊断 · 轮胎充气泵"
            title="皮卡相关搜索词 CR 偏低"
            part="Part 4"
          />
        );
      default:
        return null;
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
        locale={locale}
        setLocale={setLocale}
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
