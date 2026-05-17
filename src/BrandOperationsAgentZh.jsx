import { useState, useEffect, useRef } from "react";
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
  AlertTriangle,
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
  Image as ImageIcon,
  Type,
  LayoutTemplate,
  List as ListIcon,
  Truck,
  Star,
  Users,
  FileSpreadsheet,
  MoreVertical,
  Trash2,
  MessageSquare,
  Search,
  Eye,
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
    "主产品购买者中,在指定窗口期内购买配套产品的比例(基于 Amazon Brand Analytics 重复购买行为计算)。国际通用术语:attach rate。",
  ltv: "单个客户在与品牌的生命周期内预期产生的总贡献毛利。国际通用术语:LTV (Lifetime Value)。",
  blendedMargin: "整个产品线各产品毛利的加权平均值。国际通用术语:blended margin。",
  tacos:
    "Total Advertising Cost of Sales · 广告花费 ÷ 总销售额(自然 + 广告归因)。",
  acos: "Advertising Cost of Sales · 广告花费 ÷ 仅广告归因销售额。",
  contributionMargin:
    "销售价减去所有变动成本(COGS、履约、可归因单位广告花费)。国际通用术语:contribution margin。",
  sov: "品牌在指定关键词簇上的曝光份额。国际通用术语:SOV (Share of Voice)。",
  cohortRevenue:
    "指定客户群体(例如 5 月获取的客户)在指定时间窗口内产生的收入。国际通用术语:cohort revenue。",
  costCapBidding:
    "TikTok 竞价策略 · 设定目标单次转化成本,平台尽量靠近此目标(不保证达成;未达成不退费)。国际通用术语:cost cap bidding。",
  incrementality:
    "渠道对收入的因果贡献 — 即不投放该渠道时无法实现的收入。通过地区对照测试衡量。国际通用术语:incrementality。",
  geographicHoldoutTest:
    "在一组地区投放广告、在匹配的对照地区不投放,通过对比销售差异分离真实因果影响。国际通用术语:geographic holdout test。",
  ctr: "Click-through Rate · 点击率 · 点击 ÷ 曝光。",
  cr: "Conversion Rate · 转化率 · 订单 ÷ 点击。",
  roas: "Return on Ad Spend · 广告投资回报 · 广告归因销售额 ÷ 广告花费。ROAS 与 ACoS 互为倒数(ROAS = 1 / ACoS)。",
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
    initialTimestamp: "2 小时前",
    lastActivityTimestamp: "2 小时前",
    unread: true,
    title: "防御警报 · 床架 SKU-117",
    turns: [
      {
        speaker: "agent",
        timestamp: "2 小时前",
        body:
          "昨天 NightFox Bedding 开始在我们床架的 7 个核心词上集中抬 bid。今天监控了一天,势头没回落,这不是临时促销引流。加上他们刚挂了 18% 折扣券,我判断这是有组织的份额抢占。建议今天就反应,等不到明天。",
        canvasLink: false,
      },
      {
        speaker: "user",
        name: "Devon Park",
        initials: "DP",
        role: "高级增长经理",
        timestamp: "刚刚",
        body: "给我看下方案。",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "刚刚",
        body:
          "已起草 3 种应对姿态。这次的关键是看懂他们的意图,他们不是抢这周订单,是抢旺季前的自然位。打开画布,推荐姿态已高亮。",
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
          "Henry's 刮胡刀产品线 — 刀头 3 个月换一次。需要保持产品线综合毛利率 ≥ 15% 的同时把整体销售额最大化。该如何测试和制定定价 + 营销策略?",
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
  {
    id: "upload-q4",
    canvasId: "upload-q4",
    initiator: "user",
    initiatorName: "Maya Chen",
    initiatorRole: "电商副总裁",
    initials: "MC",
    initialTimestamp: "May 12, 10:08",
    lastActivityTimestamp: "May 12, 10:21",
    unread: false,
    title: "上传 Q4 复盘 · 提炼方法学",
    category: "brain-ops",
    turns: [
      {
        speaker: "user",
        timestamp: "May 12, 10:08",
        body: "上传了 Q4-2025-Retrospective.pdf。Distill methodology 并更新到 Company Brain。",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "May 12, 10:14",
        body: "Parsing 47 页 PDF…… 提取了 138K tokens 文本 + 12 张表 + 4 张图。",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "May 12, 10:21",
        body: "提炼出 3 个新模式 + 2 个 playbook 更新。打开画布查看详情。",
        canvasLink: true,
      },
    ],
  },
  {
    id: "connect-walmart",
    canvasId: "connect-walmart",
    initiator: "user",
    initiatorName: "Devon Park",
    initiatorRole: "高级增长经理",
    initials: "DP",
    initialTimestamp: "May 10, 14:18",
    lastActivityTimestamp: "May 10, 14:42",
    unread: false,
    title: "连接 Walmart Connect API · 落地灯账户",
    category: "brain-ops",
    turns: [
      {
        speaker: "user",
        timestamp: "May 10, 14:18",
        body: "为落地灯账户连接 Walmart Connect API。",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "May 10, 14:21",
        body: "需要 Walmart admin 授权。已发送授权请求至 maya.chen@abchomegoods.com(账户管理员)。",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "May 10, 14:30",
        body: "授权已收到。连接已建立。开始摄入过去 90 天数据 — 预计 12 分钟完成。",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "May 10, 14:42",
        body: "摄入完成。8 个表已同步,12,400 条历史事件已索引。打开画布查看现在可访问的能力。",
        canvasLink: true,
      },
    ],
  },
  {
    id: "qa-margins",
    canvasId: "qa-margins",
    initiator: "user",
    initiatorName: "Sara Lin",
    initiatorRole: "投资组合负责人",
    initials: "SL",
    initialTimestamp: "May 13, 10:14",
    lastActivityTimestamp: "May 13, 10:14",
    unread: false,
    title: "对比刮胡刀和牙刷产品线毛利",
    category: "brain-ops",
    turns: [
      {
        speaker: "user",
        timestamp: "May 13, 10:14",
        body: "对比一下刮胡刀和牙刷产品线的毛利。",
        canvasLink: false,
      },
      {
        speaker: "agent",
        timestamp: "May 13, 10:14",
        body: "已查询品牌大脑。打开画布给你答案 + 来源 + 相关模式。",
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

/* Omnichannel budget allocation canvas — SKU-PB-A 移动充电宝 */
const OMNICHANNEL = {
  sku: "SKU-PB-A · 移动充电宝",
  initiator: "Devon Park",
  confirmedOn: "May 11",
  budget: {
    current: {
      amazon: 35000,
      walmart: 18000,
      tiktok: 0,
      total: 53000,
    },
    incremental: 100000,
    combinedTotal: 153000,
    allocation: [
      {
        channel: "Walmart",
        incremental: 36000,
        combined: 54000,
        tag: "陡峭段 · 边际 ROAS 估 4.2x",
        color: "emerald",
      },
      {
        channel: "TikTok",
        incremental: 36000,
        combined: 36000,
        tag: "验证段 · 测下游 lift",
        color: "blue",
      },
      {
        channel: "Amazon",
        incremental: 28000,
        combined: 63000,
        tag: "品牌广告杠杆 · CPC 下行预期",
        color: "slate",
      },
    ],
  },

  amazon: {
    headline: "扩量争取排名",
    subhead: "季度目标 · BSR ≤ 5",
    lifecycle: "成熟期 · 扩量阶段",
    currentState: {
      bsr: "#10",
      monthlySales: "$42.4K",
      tacos: "18.4%",
      bsrHeldDays: 38,
    },
    quarterGoal: "90 天内进入 BSR ≤ 5",
    gaps: [
      {
        kicker: "流量",
        label: "月曝光",
        currentValue: "1.62M",
        currentNumeric: 1.62,
        benchmarkValue: "3.84M",
        benchmarkNumeric: 3.84,
        gap: "−58%",
        gapDetail: "−2.22M / 月 · 差距最大",
        widest: true,
      },
      {
        kicker: "点击",
        label: "CTR",
        currentValue: "1.8%",
        currentNumeric: 1.8,
        benchmarkValue: "2.4%",
        benchmarkNumeric: 2.4,
        gap: "−0.6pp",
        gapDetail: "相对 −25%",
      },
      {
        kicker: "转化",
        label: "转化率",
        currentValue: "9.4%",
        currentNumeric: 9.4,
        benchmarkValue: "10.1%",
        benchmarkNumeric: 10.1,
        gap: "−0.7pp",
        gapDetail: "相对 −7% · 接近持平",
      },
    ],
    insight: {
      id: "amazon-brand-ads",
      type: "executable",
      title: "持续投放品牌广告 → CPC 下行",
      summary:
        "价格全渠道锁定下,无法用促销 / 降价拉量。在「广告效率 + 广告结构」可用杠杆中,品牌广告持续扩量是 ROAS 最稳的一项 — 历史 4-6 周内可拉低品牌词 CPC 14-22%,长期建立品牌词 SOV。",
      reference: {
        sku: "牙刷品牌广告持续投放案例",
        period: "2024 Q3",
        outcome: "12 周累计品牌词转化 +$118K",
        method:
          "牙刷产品线持续投放品牌广告 (Sponsored Brands) 6 周后,品牌词 CPC 由 $0.84 降至 $0.68 (-19%),同期 ACoS 由 12.4% 降至 9.6%。12 周累计品牌词转化贡献 +$118K。",
        caveat:
          "床架 SKU-117 #2 → #1 打法依赖 14 天 12% 折扣券。本 case 因价格全渠道锁定,该打法不适用。改用「品牌广告持续扩量 → CPC 下行」pattern。",
      },
      plan: {
        phases: [
          {
            label: "Phase 1 · W1-4 · 品牌广告扩量阶段",
            actions: [
              "Amazon 月预算 $35K → $63K(品牌广告增量 +$22K,SP/SD 增量 +$6K)",
              "品牌广告投入 $5K/月 → $25K/月(5x 扩量)",
              "前 12 个品牌词 + 长尾品牌变体,广告位 1-3 重点占位",
              "注:此阶段 ACoS 会因品牌广告快速扩量而暂时升高,正常",
            ],
            tacos: 22.8,
            sales: 52,
          },
          {
            label: "Phase 2 · W5-8 · CPC 下行阶段",
            actions: [
              "维持品牌广告投入水平,无需追加",
              "公司大脑案例:持续 4-6 周后 CPC 平均下降 14-22%",
              "注:品牌词 SOV 应在此阶段建立,品牌搜索量预计 +35-50%",
            ],
            tacos: 19.4,
            sales: 61,
          },
          {
            label: "Phase 3 · W9-12 · 稳态运营",
            actions: [
              "品牌广告稳定在 $20K/月(略低于 Phase 1 峰值)",
              "长期品牌广告占位 → 品类竞品成本上升 → 长尾溢出收益",
              "注:BSR 目标 ≤ 5 不强求 Phase 3 即达成,可能 Phase 4(12 周外)实现",
            ],
            tacos: 16.8,
            sales: 68,
          },
        ],
        summary: {
          cumulativeSalesLift: 54,
          finalTacos: 16.8,
          captureWindow: "Phase 4(12 周外)",
        },
      },
      confidence: 76,
      confidenceLabel: "12 个过往品牌广告扩量案例 · CPC 平均下降 18.4%",
    },
    recommendedIncremental: 28000,
    combinedAfter: 63000,
  },

  walmart: {
    headline: "守住利润 · 效率优先",
    subhead: "成熟期 · 价格锁定 · 只剩效率杠杆",
    lifecycle: "成熟期 · 效率模式",
    currentState: {
      monthlySpend: "$18K",
      tacos: "22.1%",
      cr: "6.4%",
    },
    constraint:
      "全渠道价格已锁定 — 不能用降价拉量,只能在广告效率上做文章。三个测试均围绕「同样的钱花得更准」。",
    insights: [
      {
        id: "wm-creative-test",
        title: "对比图主图 A/B 测试",
        summary:
          "Walmart 头部充电宝 3 个竞品中 3 个都把对比图当主图(vs 我们的产品独立图)。Walmart 受众对对比性视觉响应可能更强。",
        treatment:
          "control = 当前产品独立图;treatment = 加入「vs 竞品 / vs 自家其他容量」对比图。仅替换主图,详情页其余素材不变。",
        sampleSize: "约 3,200 次 Walmart 曝光 / 组(5pp 提升检测)",
        duration: "14 天",
        successMetric: "Walmart Listing CR ≥ +1.5pp;Amazon 不退化(Walmart 主图独立,不影响 Amazon Listing)",
        budget: "$0 增量(仅素材测试)",
        confidence: 68,
        confidenceLabel: "类似主图对比测试历史 · 中等可比性",
      },
      {
        id: "wm-sb-expansion",
        title: "Sponsored Brand 扩量",
        summary:
          "Walmart SB CPC 较 Amazon 同位置低 ~42%,但 SB 仅占 Walmart 广告花费 8% — 杠杆未充分利用。Reference: 公司大脑显示品牌广告持续投放 4-6 周后 CPC 平均下降 14-22%(见 Amazon block 同一 Company Brain 案例)。Walmart 当前品牌广告 CPC 水平较 Amazon 低 42%,且基础投入小,边际下行空间预期更明显。",
        treatment: "Walmart SB 月预算 $1.4K → $3.0K,扩量前 8 个品牌词与 4 个核心品类词。",
        sampleSize: "Walmart 月度 SB 曝光样本(无显式分组)",
        duration: "4 周观察",
        successMetric: "SB ROAS ≥ 3.2x · 品牌词 SOV 提升 ≥ +6pp",
        budget: "+$1.6K / 月",
        confidence: 76,
        confidenceLabel: "Walmart SB 历史扩量 · 同位置 CPC 对比可信",
      },
      {
        id: "wm-pdp-placement",
        title: "商品页面广告(PDP placement)扩量",
        summary:
          "当前商品页面 placement 的 ROAS 比其他位置高 38%,但仅花 $1.8K/月 — 这是被低估的位置。",
        treatment: "Top 8 详情页 placement 预算翻倍 + 加 placement modifier 提高出价权重。",
        sampleSize: "Top 8 PDP · 月度独立曝光",
        duration: "4 周",
        successMetric: "增量 ROAS ≥ 4.0x",
        budget: "+$2.0K / 月",
        confidence: 72,
        confidenceLabel: "类似 PDP placement 扩量历史 · 高 ROAS 起点更稳",
      },
    ],
    recommendedIncremental: 36000,
    combinedAfter: 54000,
  },

  tiktok: {
    headline: "验证增量贡献",
    subhead: "测试阶段 · 无历史数据",
    lifecycle: "上线 / 验证期",
    currentState: {
      spend: "$0",
      history: "无历史数据",
      status: "未启动",
    },
    explainer:
      "TikTok 用户不是来直接买充电宝的 — TikTok 的价值在于通过场景化内容(露营 / 出差 / 演唱会等)扩大品类需求,下游被 Amazon / Walmart 收割。所以 TikTok 的 ROAS 不应只看当下 (in-period),要看是否带来下游 Amazon + Walmart 销售增量(即增量效果)。",
    biddingMechanisms: [
      {
        name: "Cost Cap bidding",
        description:
          "设定目标单次转化成本(例如 $15),平台尽量靠近此目标。达不到目标不退钱,算法只是自动停止低效流量。",
      },
      {
        name: "Value-based bidding",
        description:
          "设定目标 ROAS,类似机制 — 平台优化向价值高的人群,而不是单纯压低 CPA。",
      },
      {
        name: "Performance Plus",
        description:
          "全自动版本,平台自行优化全部参数(类似 Google Performance Max)。透明度最低,但起量最快。",
      },
    ],
    recommendation:
      "本次建议先用 Cost Cap 限制下行风险。目标 CPA $14,基于本品 LTV $42.80 反算(LTV ÷ 3.06x 目标回收倍数)。",
    insight: {
      id: "tiktok-geo-holdout",
      title: "地区对照测试 · 验证 TikTok 增量",
      summary:
        "在 7 个测试 DMA 投 TikTok 8 周,7 个匹配对照 DMA 不投,对比两组下游 Amazon + Walmart 销售差异 — 隔离 TikTok 的真实因果贡献。样本由 5 + 5 扩至 7 + 7,目的是提高 minimum detectable lift 的统计能力。",
      hypothesis:
        "TikTok 投放能为充电宝带来下游 Amazon + Walmart 销售增量(每 $1 TikTok 花费带来 ≥ $0.80 的 Amazon + Walmart 销售增量)。",
      treatment:
        "7 个测试 DMA(基线 Amazon + Walmart 销售匹配后选定)投 TikTok 视频广告,Cost Cap CPA $14;7 个对照 DMA 维持原状。",
      sampleSize: "7 测试 DMA + 7 对照 DMA · 基线销售 ±8% 内匹配 · 提高 minimum detectable lift 统计能力",
      duration: "8 周",
      budget: "$36K 测试预算 · 平均每周 $4.5K · 7 个 DMA 均分",
      successMetric:
        "测试 DMA Amazon + Walmart 销售增量 ÷ TikTok 花费 ≥ $0.80。若达标 → 扩至全国;若不达标 → 重分配至 Walmart 品牌广告。",
      confidence: 67,
      confidenceLabel: "4 个过往 DMA 对照测试 · 增量比率方差较大",
    },
    recommendedIncremental: 36000,
    combinedAfter: 36000,
  },

  crossChannel: {
    totalIncremental: 100000,
    currentTotal: 53000,
    combinedTotal: 153000,
    totalSummary:
      "增量分配:Walmart +$36K · TikTok +$36K · Amazon +$28K · 储备 $0 · 全部投出 = $100K · 合并后月度总投入由 $53K 升至 $153K",
    reviewCadence:
      "Week 4 复盘 · 重点看 TikTok holdout 早期信号方向。如 lift 显著低于预期,Week 5-8 可考虑把 TikTok 剩余预算挪到 Walmart 加码品牌广告。",
    reasoning: {
      chain: [
        "客户多出 $100K 增量预算,要求全部投出。三个 channel 的 allocation 不按比例切,按边际回报和战略适配度排:",
        "Walmart 现状最小但边际最陡 — CPC 较 Amazon 低 42%,品牌广告占比仅 8%,有结构性扩量空间。+$36K 主要投入对比图测试 + 品牌广告扩量 + 商品页面广告扩量三个具体动作。",
        "TikTok 是 0 → 1 验证投资。+$36K 跑 7 DMA holdout test(8 周),验证下游 Amazon + Walmart lift。如果验证通过,Q3 再决定是否全量扩。",
        "Amazon 现状最大、接近饱和。+$28K 不走 Bed Frame 打法(价格锁定下不兼容),改走「品牌广告持续扩量 → CPC 下行」pattern。12 周内不一定完成 BSR ≤ 5 目标,但建立的品牌词 SOV 和广告效率改善是长期资产。",
        "Week 4 复盘:重点看 TikTok holdout 早期信号方向。如 lift 显著低于预期,Week 5-8 可考虑把 TikTok 剩余预算挪到 Walmart 加码品牌广告。",
        "价格锁定约束是底层 framing — 任何依赖促销 / 降价的方案都被排除。三个 channel 的方案全部基于「流量效率 + 广告结构」改进。",
        "Walmart +$36K + TikTok +$36K + Amazon +$28K = $100K 增量,无储备。合并后月度总投入 $153K,Q3 预算审议前可调整。",
      ],
      accuracy: 71,
      accuracyLabel: "多平台预算分配 · 季度复盘后保留率",
    },
  },
};

/* Razor-and-blade pricing canvas — Henry's 刮胡刀产品线 */
const RAZOR_BLADE = {
  sku: "Henry's · 刮胡刀产品线",
  initiator: "Sara Lin",
  confirmedOn: "May 13",
  economics: {
    razor: {
      price: "$39.99",
      cogs: "$30.39",
      contributionMarginValue: "$9.60",
      contributionMarginPct: "24.0%",
      monthlyUnits: "3,820",
    },
    blade: {
      price: "$19.99",
      priceNote: "4 件装",
      cogs: "$7.20",
      contributionMarginValue: "$12.79",
      contributionMarginPct: "64.0%",
      monthlyUnits: "4,180",
    },
    attachRatePct: "47%",
    attachRateWindow: "3 个月窗口 · Amazon Brand Analytics 重复购买行为",
    repeatRate: "2.3 次 / 客户",
    repeatRateWindow: "12 个月窗口 · 刀头购买者",
    ltv: "$23.43",
    ltvFormula: "LTV = $9.60 + 0.47 × $12.79 × 2.3 = $23.43",
    productLineBlendedMarginPct: "38.1%",
    productLineBlendedMarginNote: "远高于 15% 下限 · 23.1pp 余量",
    marginFloorPct: "15%",
  },
  competitors: [
    {
      name: "Competitor A",
      razorPrice: "$34.99",
      bladePrice: "$18.49",
      bladePriceNote: "4 件装",
      estAttachRatePct: "62%",
      estLtv: "$31.84",
      source: "Helium10 + Jungle Scout · 90 天均值",
      priceDeltaNote: "我方刮胡刀高 14.3%",
    },
    {
      name: "Competitor B",
      razorPrice: "$29.99",
      bladePrice: "$16.99",
      bladePriceNote: "4 件装",
      estAttachRatePct: "58%",
      estLtv: "$27.42",
      source: "Helium10 + Jungle Scout · 90 天均值",
      priceDeltaNote: "我方刮胡刀高 33.3%",
    },
  ],
  diagnosis: {
    headline: "刮胡刀定价似乎在压制捆绑购买率,进而压制 LTV",
    body:
      "我方刮胡刀价格比 Competitor A 高 14.3%,估算捆绑购买率低 15pp,估算 LTV 低约 26%。三者的关系一致指向刮胡刀定价是上游约束:",
    hypothesis:
      "刮胡刀定价正在压制捆绑购买率,进而压制 LTV。降低刮胡刀价格带来的 LTV 提升应当超过刮胡刀单位毛利损失 — 但必须通过实验验证。",
  },
  headroom: {
    currentPct: 38.1,
    floorPct: 15,
    headroomPct: 23.1,
    priceFloorIfDrop: "$25.49",
    narrative:
      "当前产品线综合毛利率 38.1%,约束下限 15%,余量 23.1pp。刮胡刀售价理论上可降至约 $25.49(单位毛利损失 $4.90,假设销量与捆绑率响应到位),同时产品线毛利 ≥ 15%。空间存在;但能否回本是 Phase 2 要回答的问题。",
  },
  precedent: {
    sku: "牙刷 · SKU-TB-22",
    period: "Q2 2025",
    summary:
      "牙刷产品线(牙刷主体 + 替换刷头)曾做过类似 razor-and-blade 定价测试:主体降价 18%。净结果 · 产品线 90 天队列收入 +24.3%,产品线综合毛利率全程保持在 18% 下限以上。",
    outcome: "90 天队列收入 +24.3%",
    method:
      "Amazon Manage Your Experiments · 牙刷 ASIN 价格 A/B 测试;替换刷头 ASIN 不变;结果以 90 天获客队列收入衡量。",
    caveat:
      "牙刷捆绑购买率估算约 78%,远高于刮胡刀的 47%。LTV 数学根本不同 — 直接照搬降价幅度为时过早,必须通过 A/B 测试验证后再外推。",
  },
  experiments: [
    {
      id: "razor-price-drop",
      title: "实验 A · 刮胡刀降价 12.5%",
      treatmentLabel: "$39.99 → $34.99",
      treatmentDetail:
        "刮胡刀售价降至与 Competitor A 持平。刀头价格与广告架构保持不变;仅刮胡刀挂牌价变动。",
      hypothesis:
        "在与 Competitor A 持平的价格下,刮胡刀销量 ≥ +20% 且捆绑购买率不下降甚至上升,从而 90 天获客队列收入上升,覆盖刮胡刀单位毛利的下降。",
      testMethod: "Amazon Manage Your Experiments · 刮胡刀 ASIN 价格 A/B 测试",
      sampleSize: "每组 ~12,400 刮胡刀买家 · 3 周爬坡",
      duration: "3 周",
      successMetric:
        "每个获客 90 天队列收入 ≥ +15% vs 对照组 · 捆绑购买率衰减不超过 3pp",
      marginCheck: {
        passes: true,
        detail:
          "$34.99 全量场景下产品线毛利计算为 31.4% — 仍高于 15% 下限 16.4pp。",
      },
      scenarios: [
        {
          label: "最优情景",
          tone: "emerald",
          summary: "队列收入 +22% · 捆绑率升至 51%",
          nextMove:
            "全产品线锁定新刮胡刀定价;广告预算向刮胡刀获客转移(Phase 3 详述)。",
        },
        {
          label: "基准情景",
          tone: "slate",
          summary: "队列收入 +14% · 捆绑率维持 47%",
          nextMove:
            "新定价保留 60 天观察;期满前不宣布为永久。",
        },
        {
          label: "最差情景",
          tone: "rose",
          summary: "队列收入 +3% · 捆绑率降至 44%",
          nextMove:
            "回退价格;假设失败 — 定价不是捆绑率的约束。",
        },
      ],
      confidence: 72,
      confidenceLabel: "12 次历史价格测试 · 捆绑率响应方差较大",
    },
    {
      id: "razor-bundle",
      title: "实验 B · 套装上架 · 刮胡刀 + 3 刀头 · $59.99",
      treatmentLabel: "新套装 ASIN · $59.99",
      treatmentDetail:
        "在刮胡刀主 ASIN 旁上架套装 ASIN:1 把刮胡刀 + 3 个刀头, $59.99。套装 COGS = $30.39 + $5.40 = $35.79 → 单位毛利 $24.20 / 40.3%。",
      hypothesis:
        "套装结构性地把捆绑购买率锁定为 100%,套装买家的单位 LTV 在扣除对单独刮胡刀销量的蚕食后,仍高于单独刮胡刀的平均 LTV($23.43)。",
      testMethod: "新套装 ASIN 与刮胡刀主 ASIN 并列上架 · 自然 + 付费流量",
      sampleSize: "套装 vs 单独刮胡刀 LTV 对比 · 预估 ~6,800 套装买家",
      duration: "4 周",
      successMetric: "套装 LTV ÷ 单独刮胡刀 LTV ≥ 1.25× · 套装销量 ≥ 刮胡刀单量的 18%",
      marginCheck: {
        passes: true,
        detail:
          "套装单位毛利 $24.20 / 40.3%。含套装的全场景下产品线毛利约 22.4% — 高于下限 7.4pp。",
      },
      scenarios: [
        {
          label: "最优情景",
          tone: "emerald",
          summary: "套装 LTV 比 1.84× · 28% 刮胡刀需求迁移至套装",
          nextMove:
            "将套装提升为主推 SKU;围绕套装 ASIN 重构广告架构(Phase 3 详述)。",
        },
        {
          label: "基准情景",
          tone: "slate",
          summary: "套装 LTV 比 1.32× · 19% 销售结构迁移",
          nextMove:
            "保留两个 listing;允许套装自然增长,同时维护单独刮胡刀的入口。",
        },
        {
          label: "最差情景",
          tone: "rose",
          summary: "套装 LTV 比 1.08× · 套装买家主要来自单独刮胡刀的蚕食",
          nextMove:
            "下架套装;LTV 增量假设失败 — 套装结构未产生增量价值。",
        },
      ],
      confidence: 69,
      confidenceLabel: "8 次历史套装发布 · 蚕食率预估测前难以准确",
    },
    {
      id: "blade-sns",
      title: "实验 C · 刀头 Subscribe-and-Save · 叠加 +10% 折扣",
      treatmentLabel: "刀头 $19.99 + SnS 10% off(实际 $17.99)",
      treatmentDetail:
        "将刀头 ASIN 加入 SnS 促销活动,在 5% SnS 基础折扣上叠加 10% 额外折扣 — 实际售价降至 $17.99。刮胡刀价格不变。",
      hypothesis:
        "SnS 折扣叠加增强订阅锚定,通过降低订阅放弃率,使 90 天刀头复购率提升 ≥ 20%。",
      testMethod: "14 天 SnS 注册活动 · 保留组追踪至 90 天窗口",
      sampleSize: "处理组 ~9,200 刀头买家 · 对照组 9,200",
      duration: "6 周(2 周爬坡 + 4 周观察)",
      successMetric: "90 天刀头复购率 ≥ +20% · 刮胡刀 LTV 不下降",
      marginCheck: {
        passes: true,
        detail:
          "刀头单位毛利由 $12.79 降至 $10.79(64% → 54%)。产品线毛利计算为 28.3% — 高于下限 13.3pp。",
      },
      scenarios: [
        {
          label: "最优情景",
          tone: "emerald",
          summary: "复购率 +27% · LTV 升至 $25.91",
          nextMove:
            "将叠加 SnS 设为刀头默认促销;减少刀头 ASIN 的单次购买广告投入。",
        },
        {
          label: "基准情景",
          tone: "slate",
          summary: "复购率 +14% · LTV 升至 $24.42",
          nextMove:
            "仅在旺季(Q2 / Q4)保留 SnS 叠加;每年重审。",
        },
        {
          label: "最差情景",
          tone: "rose",
          summary: "复购率 +4% · 订阅者在首次补货后流失率与历史持平",
          nextMove:
            "撤销叠加;SnS 锚定不是有效杠杆 — 改为调研补货摩擦。",
        },
      ],
      confidence: 74,
      confidenceLabel: "11 次历史 SnS 叠加测试 · 复购率响应是 3 个测试中最可靠的",
    },
  ],
  phase3DecisionTree: [
    {
      condition: "若实验 A 成功 · 队列收入 ≥ +15%",
      action:
        "全产品线锁定新刮胡刀定价。将刮胡刀广告预算向获客关键词重新分配;减少刀头侧重的获客花费。",
      riskCallout: null,
    },
    {
      condition: "若实验 B 成功 · 套装 LTV 比 ≥ 1.25×",
      action:
        "将套装 ASIN 提升为主推 SKU。围绕套装重构 SP / SB 广告架构;保留单独刮胡刀作为次要入口。",
      riskCallout: null,
    },
    {
      condition: "若多个实验同时成功",
      action:
        "需要产品线层面重新优化。套装 + 降价存在非线性相互作用 — 不能将结果简单叠加。",
      riskCallout:
        "蚕食风险:降价后的刮胡刀与套装同时存在会争夺同一类买家。在扩大任一变更前,基于联合处理数据重做销售结构建模。",
    },
    {
      condition: "若 A / B / C 都未成功",
      action:
        "重新审视上游假设。定价不是约束。改为调研产品兼容性 / 刀头锁定机制、搜索可见性、或购后补货摩擦。",
      riskCallout:
        "失败阶段同样产生信息:每个实验隔离了不同杠杆 — A 测价格、B 测套装结构、C 测订阅。每个 null 结果都是一条已学约束。",
    },
  ],
  competitorDataSources: {
    methodology:
      "竞品价格每日从 Helium10 产品 feed 抓取。捆绑购买率与 LTV 估算来自公开 Amazon Brand Analytics Top-of-Funnel 数据 · Jungle Scout BSR 轨迹推断 · 公开 review 量反推(每单评论率基线 1.4%)。",
    tableHeaders: ["字段", "Competitor A", "Competitor B", "数据来源"],
    columnWidths: ["28%", "22%", "22%", "28%"],
    tableRows: [
      ["刮胡刀挂牌价(当前)", "$34.99", "$29.99", "Helium10 每日价格 feed"],
      ["刮胡刀挂牌价(90 天均值)", "$34.99", "$30.49", "Helium10 每日价格 feed"],
      ["刀头 4 件装挂牌价", "$18.49", "$16.99", "Helium10 每日价格 feed"],
      ["估算月度刮胡刀销量", "5,840", "7,210", "Jungle Scout BSR-销量模型"],
      ["估算 12 个月评论量", "2,847", "3,612", "公开 Amazon 评论数"],
      ["提及刀头复购的评论数", "1,766(62%)", "2,094(58%)", "Helium10 评论文本爬取 · 捆绑率代理"],
      ["估算捆绑购买率", "62%", "58%", "评论 / 单 + 复购提及反推"],
      ["估算 LTV", "$31.84", "$27.42", "我方 LTV 公式 · 用他们的经济结构代入"],
    ],
    definitionsList: [
      {
        term: "评论 / 单捆绑率代理",
        definition:
          "公开评论中提及刀头复购或订阅注册的占比。在我方过往牙刷与刮胡刀 SKU 中与实际捆绑购买率高度相关(14 个历史案例 r² = 0.71)。非完美 · 已知是下限。",
      },
      {
        term: "Jungle Scout BSR-销量模型",
        definition:
          "销售排名 → 销量的换算每季度校准一次,以我方在共有品类的 BSR-销量数据为基准。月度销量估算置信区间 ±14%。",
      },
      {
        term: "Helium10 价格 feed",
        definition:
          "直接从 Amazon 商品详情页爬取的每日挂牌价。被追踪 ASIN 的捕获率 99.4%。促销标记的字段已剥离。",
      },
    ],
  },
  precedentDataSources: {
    methodology:
      "牙刷定价测试数据来自 Company Brain 的 Q2 2025 案例。90 天队列收入提升由 Amazon Manage Your Experiments 处理-对照报表与我方内部 LTV 账目导出。注意 · 捆绑率差异意味着结果只能在方向上 — 而非数值上 — 迁移。",
    tableHeaders: ["指标", "测试前", "测试中", "测试后(90 天)"],
    columnWidths: ["32%", "22%", "22%", "24%"],
    tableRows: [
      ["牙刷主体挂牌价", "$54.99", "$44.99", "$44.99(维持)"],
      ["替换刷头挂牌价", "$22.49", "$22.49", "$22.49"],
      ["估算捆绑购买率", "76.4%", "78.2%", "78.6%"],
      ["牙刷主体月销量", "1,840", "2,610", "2,540"],
      ["队列收入指数(归一)", "100", "118.1", "124.3"],
      ["产品线综合毛利率", "42.3%", "21.6%", "23.8%"],
      ["当时的下限", "18.0%", "18.0%", "18.0%"],
    ],
    definitionsList: [
      {
        term: "队列收入",
        definition:
          "在测试窗口内获取的客户群体在随后 90 天内产生的总收入。基期为测试前基线归一为 100。",
      },
      {
        term: "为何只能方向迁移、不能数值迁移",
        definition:
          "牙刷捆绑率约 78%,比刮胡刀的 47% 高 31pp。刮胡刀降价的 LTV 提升幅度关键依赖于捆绑率移动幅度 — 牙刷案例无法预测幅度,只能说明方向上可能。",
      },
    ],
  },
  approval: {
    primaryLabel: "批准 Phase 1 + 2(自动激活 Phase 3 审核)",
    summary:
      "批准后将并行运行 3 个 Phase 2 实验,所有实验结束后自动呈现 Phase 3 供审核。",
  },
};

/* Launch CR 诊断画布 — 轮胎充气泵(皮卡市场) */
const LAUNCH_CR = {
  sku: "SKU-TI-A · 轮胎充气泵(皮卡)",
  initiator: "Jamal Hassan",
  confirmedOn: "May 15",
  constraint:
    "Listing 改动 — 主图、标题、A+、文案 — 由品牌创意团队上手。我负责把问题摆出来、把测试设计好、把结果盯下来。",
  clusters: [
    {
      id: "pickup",
      name: "皮卡",
      cr: "2.0%",
      benchmark: "8.4%",
      gapPp: "−6.4pp",
      status: "flagged",
      impressions: "28,420",
      clicks: "442",
      conversions: "9",
      exampleTerms: "tire inflator for F-150 · pickup tire pump · truck tire inflator 12V",
    },
    {
      id: "generic",
      name: "通用便携",
      cr: "6.7%",
      benchmark: "7.2%",
      gapPp: "−0.5pp",
      status: "ok",
      impressions: "41,680",
      clicks: "938",
      conversions: "63",
      exampleTerms: "portable tire inflator · cordless air pump · 12V tire inflator",
    },
    {
      id: "rv",
      name: "房车 / 越野",
      cr: "5.4%",
      benchmark: "6.1%",
      gapPp: "−0.7pp",
      status: "ok",
      impressions: "13,240",
      clicks: "264",
      conversions: "14",
      exampleTerms: "rv tire inflator · off road air compressor · jeep tire pump",
    },
  ],
  pickupDeepDive: {
    impressions: "28,420",
    clicks: "442",
    conversions: "9",
    ctr: "1.56%",
    ctrBenchmark: "2.1%",
    estLostRevenue: "$980 / 月",
    estLostRevenueNote:
      "皮卡集群 CR 如果回到 8.4% 基准,本流量上每月转化量从 9 升到约 37 单。按 $34.99 ASP 算,每月留在桌上的钱约 $980。等到付费流量进一步往这个集群推,缺口还会放大。",
    organicRankAvg: "#14",
    organicRankBest: "#3",
    adPositionAvg: "slot 4",
    adPositionBest: "slot 1",
    audienceProfile:
      "皮卡买家 · 男性为主 28-55 岁 · 约 38% 是商用 / 车队用途 · 强烈偏好重型 / 耐用化的视觉语言 · 对品牌专属度敏感 — 他们靠标题和主图判断这个产品是不是「为皮卡造的」,而不是恰好能装上去的通用配件。",
  },
  competitors: [
    {
      name: "Competitor A",
      type: "competitor",
      mainImageNote:
        "黑色 F-150 三分之二车头视角 · 充气泵正在给 35 寸卡车胎打气。一眼就读到「这就是为皮卡造的」。",
      mainImageHighlights: ["F-150 入镜", "在卡车胎上工作", "户外生活场景"],
      title:
        "Heavy Duty Tire Inflator for Truck & SUV · 160 PSI · Digital Auto-Stop · 12V DC",
      titleHighlights: ["Heavy Duty", "for Truck & SUV", "160 PSI"],
      bulletPoints: [
        "Inflates a stock F-150 tire from 20 to 35 PSI in 4 min 20 sec",
        "Brass cylinder rated for 160 PSI sustained · 50% above the category average",
        "Auto-stop at target PSI · works on truck, SUV, and trailer tires",
        "12V DC plug · 11-foot reach cord covers all 4 truck tires from one outlet",
        "Includes Schrader, Presta, and ball-needle adapters",
      ],
      bulletHighlights: ["F-150", "Heavy Duty", "truck"],
      aplusFirstModule:
        "卡车 vs 轿车胎的胎压和胎壁对比图 · 解释为什么常规打气泵在 35 寸卡车胎上跑不动。",
      reviewsRating: "4.6",
      reviewsCount: "8,420",
      truckMentionCount: "2,140(25.4%)",
      price: "$54.99",
      priceNote: "高端 · 比我方高 24%",
    },
    {
      name: "Competitor B",
      type: "competitor",
      mainImageNote:
        "升高 Silverado 双胎侧视角 · 配件摆在尾门上。户外 / 实用场景毫无歧义。",
      mainImageHighlights: ["Silverado 场景", "尾门摆件", "硬派陈列"],
      title:
        "Truck Tire Inflator · 12V Air Compressor for Pickup & Off-Road · 150 PSI Heavy Duty",
      titleHighlights: ["Truck", "Pickup & Off-Road", "Heavy Duty"],
      bulletPoints: [
        "Built for pickup trucks, SUVs, and off-road rigs — handles 33-37\" tires",
        "150 PSI rated brass piston · 3x duty cycle of plastic-piston units",
        "Inflates a 33\" Silverado tire 18 → 35 PSI in 5 min 10 sec",
        "10-foot power cord + 24-inch hose · reaches all 4 corners of a full-size truck",
        "12-month replacement warranty · TPMS-safe pressure sensor",
      ],
      bulletHighlights: ["pickup", "33-37\" tires", "Silverado"],
      aplusFirstModule:
        "使用场景网格:33 寸皮卡胎 / 18 寸 SUV 胎 / 32 寸越野胎 — 每个场景标注实测充气时间。",
      reviewsRating: "4.4",
      reviewsCount: "5,640",
      truckMentionCount: "1,310(23.2%)",
      price: "$48.99",
      priceNote: "中位 · 比我方高 10%",
    },
    {
      name: "我方 · SKU-TI-A",
      type: "self",
      mainImageNote:
        "白底纯产品图 · 单独打气泵,没车、没场景。读起来就是个通用配件 — 皮卡买家看不出这是给他们的。",
      mainImageHighlights: [],
      title:
        "Portable Tire Inflator · 12V Cordless Air Pump · Digital Display · 150 PSI",
      titleHighlights: [],
      bulletPoints: [
        "Cordless rechargeable battery · 4 inflations on a single charge",
        "150 PSI max pressure · digital display with auto-stop",
        "Compact size fits in any glove box or trunk",
        "Includes nozzle adapters for tires, balls, and pool floats",
        "USB-C charging · LED flashlight built in",
      ],
      bulletHighlights: [],
      aplusFirstModule:
        "产品特性轮播 · 电池续航、数字显示、USB-C 充电。一条都没提到皮卡。",
      reviewsRating: "4.3",
      reviewsCount: "486",
      truckMentionCount: "18(3.7%)",
      price: "$44.49",
      priceNote: "参考 · 我方挂牌价",
    },
  ],
  agentDiagnosis: {
    summary:
      "我们 listing 没有给皮卡买家他们要看的三个信号。主图里没有卡车。标题没说「为皮卡设计」。A+ 没放在皮卡胎上的性能数据。三个加在一起,皮卡买家扫一眼就知道这不是给他们的 — 即便产品其实完全能用。",
    signals: [
      {
        label: "视觉场景",
        gap: "主图没有皮卡 · 白底纯产品图",
      },
      {
        label: "标题信号",
        gap: "标题前 30 字没出现 truck / pickup / heavy duty",
      },
      {
        label: "A+ 证据",
        gap: "A+ 没有皮卡胎性能数据 · 没出现 F-150 / Silverado / Ram",
      },
    ],
  },
  hypotheses: [
    {
      id: "h1",
      label: "H1",
      priority: "P0",
      title: "主图重做 · 加入皮卡场景",
      treatment:
        "拍一张新主图:黑色 F-150,充气泵接在前驾驶位胎上。标题和 A+ 保持现状。",
      variableControl:
        "只换主图。标题、bullets、A+ 全部保持当前状态 — 这样信号读起来干净。",
      sampleSize: "皮卡集群每组 8,400 曝光 · 按检测 5pp 提升量定的",
      duration: "14 天",
      successMetric: "皮卡集群 CR ≥ 4.5%",
      expectedImpact:
        "单项最大提升 — 主图是皮卡买家在搜索结果里第一眼看到的东西。",
      type: "image",
      typeLabel: "主图",
      confidence: 78,
      confidenceLabel:
        "9 次同品类(车配)主图更换历史 · 场景化主图能稳定带来 3-7pp CR 提升",
    },
    {
      id: "h2",
      label: "H2",
      priority: "P0",
      title: "标题改写 · 前 30 字插入「Heavy Duty for Truck/SUV」",
      treatment:
        "把「Heavy Duty for Truck/SUV」挪到标题最前。标题其余部分不动。",
      variableControl:
        "只改标题。主图、A+、bullets 在测试期内一律不动。",
      sampleSize: "Listing 级 · 皮卡集群的自然 + 付费流量",
      duration: "21 天",
      successMetric: "皮卡集群 CTR + CR 联合提升",
      expectedImpact:
        "标题同时影响自然匹配相关性和搜索结果页的点击决策 — 串联拉动 CTR 和 CR。",
      type: "title",
      typeLabel: "标题",
      confidence: 74,
      confidenceLabel:
        "12 次历史标题改写测试 · 前 30 字带核心词能可靠地拉高品类匹配相关性",
    },
    {
      id: "h3",
      label: "H3",
      priority: "P1",
      title: "A+ 模块 · F-150 充气性能数据",
      treatment:
        "新增 A+ 第一模块:「Inflates an F-150 stock tire from 20 to 35 PSI in 4 min 30 sec」 — 大字号数字 + 配产品图。",
      variableControl:
        "只动 A+。前两项测试的主图和标题在本测试期间保持冻结。",
      sampleSize: "皮卡集群的详情页流量 · Listing 级读数",
      duration: "21 天",
      successMetric: "皮卡集群 CR 提升 + 详情页跳出率下降",
      expectedImpact:
        "解决「这玩意儿在我皮卡上到底行不行」的疑问 — 在皮卡买家点进详情页后补上证据。",
      type: "aplus",
      typeLabel: "A+",
      confidence: 68,
      confidenceLabel:
        "7 次历史 A+ 首模块改写 · 对 CR 的拉动比图/标题小,但方向稳定",
    },
    {
      id: "h4",
      label: "H4",
      priority: "P1",
      title: "Bullets 重排 · 皮卡证据提到第 1 条",
      treatment:
        "把「inflates a 33\" pickup tire in under 5 min」挪到第 1 条 bullet。无线电池那条往下挤到第 4。",
      variableControl:
        "只动 bullets。上面几项的状态保持当前。",
      sampleSize: "皮卡集群的详情页流量",
      duration: "21 天",
      successMetric: "皮卡集群 CR 提升 · 详情页转化流量上的读数",
      expectedImpact:
        "单独效果最小 — 但成本低,可以叠在前三个上面。当作干净收尾。",
      type: "bullets",
      typeLabel: "Bullets",
      confidence: 65,
      confidenceLabel:
        "11 次历史 bullets 重排 · 单独效果有限(集群 CR 提升 ≤ 1pp)",
    },
  ],
  schedule: [
    { hypothesisId: "h1", label: "H1 · 主图", startWeek: 1, endWeek: 2, type: "image" },
    { hypothesisId: "h2", label: "H2 · 标题", startWeek: 1, endWeek: 3, type: "title" },
    { hypothesisId: "h3", label: "H3 · A+", startWeek: 3, endWeek: 5, type: "aplus" },
    { hypothesisId: "h4", label: "H4 · Bullets", startWeek: 6, endWeek: 8, type: "bullets" },
  ],
  scheduleLogic: [
    "H1 + H2 并行 · 主图打的是 SERP 上的点击决策,标题打的是自然匹配 — 两者不会污染彼此。",
    "H3 接在 H1 之后 · 两个都作用在详情页 CR 上,并行跑会把信号搅在一起。",
    "H4 接在 H3 之后 · bullets 和 A+ 都在详情页上被读到,顺序跑保持变量隔离,读数才干净。",
  ],
  scheduleTradeoff:
    "总测试窗口 8 周 · 4 个测试 · 1 对并行 · 2 处顺序依赖。代价就是总时长 vs 变量干净度 — 全部并行 3 周能跑完,但 CR 信号没法解读。",
  clusteringInspection: {
    methodology:
      "皮卡集群包含含「pickup」「truck」或任一主流皮卡型号(F-150、Silverado、Ram、Tacoma、Sierra、Tundra、Frontier)的搜索词。房车 / 越野集群需要包含「rv」「off-road」「jeep」或「overland」。其余归入通用便携集群。按 30 天搜索量降序排列。",
    tableHeaders: ["搜索词", "集群", "30 天曝光", "集群 CR"],
    columnWidths: ["44%", "20%", "18%", "18%"],
    tableRows: [
      ["portable tire inflator",              "通用便携",    "12.8K", "6.7%"],
      ["12v tire inflator",                   "通用便携",    "9.4K",  "6.7%"],
      ["cordless tire inflator",              "通用便携",    "7.6K",  "6.7%"],
      ["tire inflator for car",               "通用便携",    "6.2K",  "6.7%"],
      ["air compressor for tires",            "通用便携",    "5.8K",  "6.7%"],
      ["tire inflator with gauge",            "通用便携",    "4.2K",  "6.7%"],
      ["mini tire inflator",                  "通用便携",    "3.4K",  "6.7%"],
      ["tire inflator for f-150",             "皮卡",        "4.8K",  "2.0%"],
      ["truck tire inflator 12v",             "皮卡",        "4.2K",  "2.0%"],
      ["pickup tire pump",                    "皮卡",        "3.6K",  "2.0%"],
      ["tire inflator silverado",             "皮卡",        "3.2K",  "2.0%"],
      ["heavy duty tire inflator truck",      "皮卡",        "2.8K",  "2.0%"],
      ["ram 1500 tire inflator",              "皮卡",        "2.4K",  "2.0%"],
      ["tacoma tire inflator",                "皮卡",        "2.1K",  "2.0%"],
      ["tundra tire pump",                    "皮卡",        "1.8K",  "2.0%"],
      ["sierra tire inflator",                "皮卡",        "1.6K",  "2.0%"],
      ["pickup truck air pump",               "皮卡",        "1.4K",  "2.0%"],
      ["tire inflator for frontier",          "皮卡",        "0.9K",  "2.0%"],
      ["rv tire inflator",                    "房车 / 越野", "4.6K",  "5.4%"],
      ["jeep tire pump",                      "房车 / 越野", "3.2K",  "5.4%"],
      ["off road air compressor",             "房车 / 越野", "2.4K",  "5.4%"],
      ["overland tire inflator",              "房车 / 越野", "1.6K",  "5.4%"],
      ["jeep wrangler tire pump",             "房车 / 越野", "0.9K",  "5.4%"],
      ["off road tire inflator portable",     "房车 / 越野", "0.6K",  "5.4%"],
    ],
    rules: [
      {
        term: "皮卡集群",
        definition:
          "包含「pickup」「truck」或任一主流皮卡型号名称(F-150、Silverado、Ram、Tacoma、Sierra、Tundra、Frontier)的搜索词。是该品类里商用 / 重型用途最强的一类。",
      },
      {
        term: "房车 / 越野集群",
        definition:
          "包含「rv」「off-road」「jeep」「wrangler」「overland」的搜索词。和皮卡相邻但不同 — 这类买家关心离地间隙、大尺寸胎、越野使用信号。",
      },
      {
        term: "通用便携集群",
        definition:
          "其余 — 描述品类本身、不带车辆锚点的搜索词。这一群主要是乘用车车主,是该品类的基线。",
      },
    ],
  },
  approval: {
    primaryLabel: "批准测试计划",
    summary:
      "批准后我会把 4 项 listing 改动 brief 给品牌创意团队,并锁定 8 周测试日程。结果我来盯、提升度我来分析,每个交接节点都向你回报。",
  },
};

/* Defense canvas — agent-initiated, time-sensitive */
const DEFENSE = {
  sku: "SKU-117 · 床架",
  attacker: "NightFox Bedding",
  initiator: "品牌运营助手",
  initiatorRole: "实时监控警报",
  detectedAt: "2 小时前",
  timeSensitive: {
    window: "今天/明天",
    expiresIn: "5 天",
    reason: "NightFox 18% 折扣券大概还能打 5 天就结束",
    framing:
      "我们的反击如果今天上,能正面对位 5 天。如果拖到周三才上,实际只剩 2 天对位,然后他们促销结束,但他们抢到的份额已经留下了。",
  },
  currentState: {
    ourBsr: "#2",
    ourBsrHeldDays: 27,
    ourSales: "$184K / 月",
    ourTacos: 17.4,
    ourDailyAdSpend: 980,
    attackerName: "NightFox",
    keywordCount: 7,
  },
  context: {
    headline: "这不是普通攻击",
    body:
      "公司大脑显示:床架品类即将进入返校 + 秋季促销旺季(历史 6-8 月品类搜索量 +180-220%)。NightFox 选这个时间点在我们核心词上集中加投,意图明显是抢自然排名,不是抢眼前订单。旺季时,自然位 #1-3 拿到的免费流量是平时的 3-4 倍。\n\n他在用现在的广告费,买未来 8 周的免费流量。\n\n这种攻击不能用 TACoS 算账。要按「自然位失守一个季度的总流量损失」算。",
    inlinePrecedent: {
      sku: "厨房刀具 SKU-K22",
      period: "2024 Q3",
      summary:
        "竞品在旺季前 6 周抢自然位,我方初期按 TACoS 看觉得不亏所以没动。旺季时对方占 #1,我方掉到 #4,Q4 整季多花 $89K 广告才拉回 #3。",
      lesson: "教训:旺季前 1-2 个月看到这种 pattern,要守 BSR,不要算 TACoS。",
    },
  },
  attackSignals: [
    {
      id: "bids",
      title: "出价拉得很猛",
      icon: "DollarSign",
      lines: [
        "NightFox 在 7 个核心词上的 CPC 过去 36 小时累计 +180%(来源:bid-loss 报表)。",
        "估算 NightFox 日广告花费 $1,400 vs 我方 $620 · 在这 7 个词上是我们 2.3 倍。",
      ],
    },
    {
      id: "organic",
      title: "自然势能在堆积",
      icon: "TrendingUp",
      lines: [
        "NightFox 过去 7 天评论增速 1.8x 我方 · 5 天前上了新 A+ 内容。",
        "Listing 转化率从 6.4% 爬到 8.9% · 不是只在买流量,详情页本身也在赢。",
      ],
    },
    {
      id: "promo",
      title: "促销信号 · 这是有期限的攻击",
      icon: "Clock",
      lines: [
        "NightFox 18% off 折扣券已挂 9 天 · 典型 14 天周期。",
        "我推算还剩 ~5 天到期。窗口一关,他们的势能多半要回落,但自然位已经被抢走。",
      ],
    },
  ],
  competitorTrend: [
    { day: "H-36", adPosition: 5,   organicRank: 14, estDailySales: 1.8 },
    { day: "H-24", adPosition: 3,   organicRank: 13, estDailySales: 2.4 },
    { day: "H-12", adPosition: 2.5, organicRank: 12, estDailySales: 2.9 },
    { day: "H-0",  adPosition: 2,   organicRank: 11, estDailySales: 3.4 },
  ],
  trendChartTitle: "NightFox 36 小时势能轨迹",
  projection: {
    headline: "床架 SKU-117 预计 14 天内跌到 BSR #4-5",
    body:
      "按 NightFox 当前势头线性延伸:我们若不动,7 个核心词的曝光份额会被他们继续吃。组合广告 + 自然 + 促销三条线一起咬,我们的 #2 撑不住。",
    revenueLoss: "$58K / 14 天",
    revenueLossNote: "按当前流量被夺份额 × 我方 ASP 估算 · 不含后续 BSR 滑落带来的连锁效应",
    confidence: 78,
    confidenceNote: "基于过去 12 次同类型攻击的轨迹回放",
    assumption: "NightFox 当前势能延续,我方不主动响应",
  },
  postures: [
    {
      id: "defend-frontal",
      name: "正面顶住 · 守自然位",
      kind: "frontal",
      tone: "blue",
      recommended: false,
      tagline: "在他们最强的 7 个词上跟齐出价",
      approach:
        "在 7 核心词上跟齐 NightFox 的出价 · SB 叠加层日预算 +80% · 14 天匹配券 (15% off)。把战场摆在他们最强的地方。",
      cost: "+$11.4K 广告 / 14 天 · 贡献毛利 -3.2pp",
      risk: "出价战会再升级 · 竞品大概率追加跟进 · 14 天窗口结束后 CPC 难回落",
      outcomeProbability: "78% 概率 BSR 守住 ≤ #3",
      recommendedWhen: "旺季在即,BSR #1-3 的自然流量价值远超短期毛利让利",
      confidence: 73,
      confidenceLabel: "硬刚是熟悉打法 · 但代价压在我方毛利上",
    },
    {
      id: "wait-it-out",
      name: "赌他们短期撤",
      kind: "patient",
      tone: "slate",
      recommended: false,
      tagline: "靠促销窗口自然关闭 · 不接招",
      approach:
        "广告花费保持现状 · 高频监控 BSR 与流量份额 · 准备一个反击方案放抽屉里 · 真跌到 #4 再启动。",
      cost: "$0 额外投入",
      risk:
        "如果 NightFox 不撤(他在抢旺季流量,促销结束他可能转打长期),我们旺季时 BSR 在 #4-5,损失放大 2-3 倍",
      outcomeProbability:
        "65% 概率促销到期后 NightFox 撤,但自然位他已经先吃走一部分",
      recommendedWhen: "判断这波 90% 是促销驱动 + 现金流紧张需要保毛利",
      confidence: 52,
      confidenceLabel: "旺季背景下信心很薄 · 故意低于平时 65% 的底线",
    },
    {
      id: "asymmetric",
      name: "不正面碰 · 抢他们后路",
      kind: "asymmetric",
      tone: "emerald",
      recommended: true,
      tagline: "12 个 NightFox 弱词 + 对比型促销",
      approach:
        "我们别在他们最强的 7 个词上硬刚。去他们弱的 12 个词上扩量,同时上一个对比型促销 (买 2 件减 $18,不打折扣率),和他们的 18% off 不正面碰。",
      cost: "+$7.8K 广告 / 14 天 · 贡献毛利 -1.8pp (主要来自买 2 件减价)",
      risk:
        "12 个弱词里有 3 个流量基数偏小,实际拉动可能比模型小 · 对比型促销执行需要 Listing 团队 36 小时上线",
      outcomeProbability:
        "71% 概率 BSR 守住 ≤ #3 · 同时 23% 概率在 NightFox 弱词上反向抢份额",
      recommendedWhen: "竞品促销有期限,我们用非促销手段建持续优势 · 旺季前抢长尾词的自然位",
      confidence: 71,
      confidenceLabel: "三个选项里信心最高 · 来自公司大脑 SKU-117 自身先例",
      reference: {
        sku: "床架 · SKU-117",
        period: "2024 Q2",
        outcome: "攻击窗口内 BSR #2 全程守住",
        method:
          "竞品 SKU-Y 在 5 个核心词上拉高 CPC + 上促销 · 我方避开正面战场,在 SKU-Y 弱的 9 个长尾词上加注,叠加买赠促销。攻击窗口结束后 SKU-Y 占有率回落,我方还多了 2 个 BSR 子类 #1。",
        confidencePct: 71,
        compatibilityNote:
          "结构匹配 · 同样是「促销驱动 + 集中核心词」的攻击形态,同样有可识别的弱词。差异: 床架的促销杠杆是「买 2 件减」(SKU-117 当时是买赠),杠杆类型可比但不一样,所以信心没拉到 80%。",
      },
    },
  ],
  deepDive: {
    asymmetric: {
      kicker: "扩 NightFox 弱词 12 个 · 对比型促销 · 不在他们最强的地方耗",
      targetKeywords: [
        { keyword: "platform bed frame queen storage",      ourAdPosition: "#18", competitorAdPosition: "#42", ourCr: "5.4%", projectedImpact: "+$2.6K / 14 天" },
        { keyword: "wooden bed frame king with headboard",  ourAdPosition: "#15", competitorAdPosition: "#38", ourCr: "5.9%", projectedImpact: "+$2.2K / 14 天" },
        { keyword: "rustic farmhouse bed frame queen",      ourAdPosition: "#22", competitorAdPosition: "#48", ourCr: "5.1%", projectedImpact: "+$1.7K / 14 天" },
        { keyword: "metal bed frame full no box spring",    ourAdPosition: "#19", competitorAdPosition: "#36", ourCr: "5.6%", projectedImpact: "+$1.5K / 14 天" },
        { keyword: "bed frame queen low profile",           ourAdPosition: "#16", competitorAdPosition: "#34", ourCr: "6.2%", projectedImpact: "+$1.4K / 14 天" },
        { keyword: "upholstered bed frame king tufted",     ourAdPosition: "#21", competitorAdPosition: "#52", ourCr: "5.0%", projectedImpact: "+$1.1K / 14 天" },
        { keyword: "bed frame with drawers full size",      ourAdPosition: "#24", competitorAdPosition: "#41", ourCr: "4.8%", projectedImpact: "+$0.9K / 14 天" },
        { keyword: "modern bed frame queen wood",           ourAdPosition: "#17", competitorAdPosition: "#33", ourCr: "5.7%", projectedImpact: "+$0.8K / 14 天" },
        { keyword: "low height bed frame twin",             ourAdPosition: "#27", competitorAdPosition: "#54", ourCr: "4.6%", projectedImpact: "+$0.6K / 14 天" },
        { keyword: "bed frame king upholstered grey",       ourAdPosition: "#23", competitorAdPosition: "#46", ourCr: "5.2%", projectedImpact: "+$0.5K / 14 天" },
        { keyword: "japanese platform bed frame queen",     ourAdPosition: "#29", competitorAdPosition: "#58", ourCr: "4.4%", projectedImpact: "+$0.4K / 14 天" },
        { keyword: "bed frame full with usb ports",         ourAdPosition: "#26", competitorAdPosition: "#49", ourCr: "4.9%", projectedImpact: "+$0.3K / 14 天" },
      ],
      bidChanges: [
        { keyword: "platform bed frame queen storage",     currentBid: "$1.94", proposedBid: "$2.48", dailyDelta: "+$78" },
        { keyword: "wooden bed frame king with headboard", currentBid: "$1.86", proposedBid: "$2.36", dailyDelta: "+$68" },
        { keyword: "rustic farmhouse bed frame queen",     currentBid: "$1.42", proposedBid: "$1.92", dailyDelta: "+$56" },
        { keyword: "metal bed frame full no box spring",   currentBid: "$1.54", proposedBid: "$2.04", dailyDelta: "+$52" },
        { keyword: "bed frame queen low profile",          currentBid: "$1.62", proposedBid: "$2.14", dailyDelta: "+$48" },
        { keyword: "upholstered bed frame king tufted",    currentBid: "$1.38", proposedBid: "$1.88", dailyDelta: "+$42" },
        { keyword: "其他 6 个长尾词(并入)",                currentBid: "—",    proposedBid: "—",     dailyDelta: "+$214" },
      ],
      bidChangesTotal: "+$558 / 天 · +$7.8K / 14 天",
      promo: {
        type: "对比型促销 · 买 2 件减 $18",
        structure:
          "买 2 件床架立减 $18 (等效约 9% off,但落到「立减金额」而不是「折扣率」上),故意不和 NightFox 的 18% off 在同一个维度比较。",
        rationale:
          "NightFox 在打折扣率战 · 我们直接撤出这个战场,把促销拍在「金额」上 · 看起来不像在跟随,买 2 件还把 ASP 拉上去,客单价 +37%。",
        marginImpact: "贡献毛利 -1.8pp · 14 天预计 ~520 单买 2 件捆绑",
        executionGate: "对比型促销执行需要 Listing 团队 36 小时上线 · 我方负责广告同步 · 库存验证 ≥ 2,400 件",
        listingBrief: "对比型促销执行需要 Listing 团队 36 小时上线",
      },
    },
    "defend-frontal": {
      kicker: "跟价到底 + 匹配促销 · 战场摆在他们最强的地方",
      costBreakdown: [
        { line: "7 核心词 CPC 跟齐 NightFox",       dailyDelta: "+$640", note: "把我方平均 CPC 从 $1.82 拉到 ~$2.95" },
        { line: "SB 叠加层日预算 +80%",             dailyDelta: "+$180", note: "强化 SERP 顶部位置抢占" },
        { line: "14 天匹配券(15% off)毛利让利",   dailyDelta: "—",     note: "贡献毛利 -3.2pp · 14 天 ~1,180 单受影响" },
      ],
      costTotal: "+$11.4K 广告 / 14 天 · 贡献毛利 -3.2pp",
    },
    "wait-it-out": {
      kicker: "不动 · 把监控密度拉满 · 准备好反击但不启动",
      monitoringPlan: [
        { item: "BSR 实时监控",        frequency: "每 4 小时", trigger: "BSR 跌到 #4 触发警报 → 自动通知 Maya + Devon" },
        { item: "7 核心词流量份额",    frequency: "每日",     trigger: "我方份额下降 ≥ 15% 触发反击方案 brief" },
        { item: "NightFox 促销页",     frequency: "每日",     trigger: "促销下架信号 = 主动收信号,准备防御撤离" },
        { item: "自然位 #1-3 流量份额", frequency: "每日",     trigger: "我方自然位流量份额下滑 ≥ 8% → 触发切换到非对称方案" },
      ],
      readyResponse:
        "反击方案预先起草好 · 如果 BSR 真跌到 #4,我们 6 小时内能切到「不正面碰 · 抢他们后路」方案。代价是先吃掉 ~$15-18K 流失 + BSR 修复需要额外 7-10 天。",
    },
  },
  milestones: {
    asymmetric: [
      {
        day: "D+1",
        window: "今天 → 明天",
        action: "弱词扩量配置完成 · 对比促销文案 brief 发给 Listing 团队",
        gate: "出价更新生效率 ≥ 95% · brief 已签收",
      },
      {
        day: "D+3",
        window: "本周内",
        action: "买 2 件减 $18 促销上线 · 同步广告活动 promo 标签",
        gate: "促销页面上线 · 当日订单中买 2 件占比 ≥ 8%",
      },
      {
        day: "D+7",
        window: "下周一",
        action: "第一节点复盘 · 12 个弱词曝光份额 + 我方 BSR 维持情况",
        gate: "12 词加权曝光份额 +18pp · BSR 维持 ≤ #3",
      },
      {
        day: "D+14",
        window: "两周末尾",
        action: "促销窗口结束 · NightFox 撤了没 · 关键转折点:他撤了我们赢,他不撤我们要立刻跟进 Phase 2",
        gate: "BSR 守在 ≤ #3 · 14 天累计净影响接近 +$8-10K(扣除广告成本)",
      },
    ],
    "defend-frontal": [
      { day: "D+1",  window: "今天 → 明天", action: "7 词出价跟齐 · 匹配券预约 14 天",                  gate: "出价生效率 ≥ 95% · 券预约成功" },
      { day: "D+3",  window: "本周内",     action: "首次出价对线复盘 · 看 NightFox 是否再加价",        gate: "我方在 7 词中 ≥ 5 词重回 ad position ≤ #2" },
      { day: "D+7",  window: "下周一",     action: "中期复盘 · 评估是否值得再加注 · 首次看到 organic 影响", gate: "BSR 维持 ≤ #3 · 14 天到期前 TACoS ≤ 24%" },
      { day: "D+14", window: "两周末尾",   action: "促销窗口结束 · NightFox 撤了没 · 关键转折点:他撤了我们赢,他不撤我们要立刻跟进 Phase 2", gate: "BSR 守在 ≤ #3 · 出价下调路径已定" },
    ],
    "wait-it-out": [
      { day: "D+1",  window: "今天 → 明天", action: "监控警报参数上线 · 反击方案放抽屉里",     gate: "4 项监控全部生效 · 反击 brief 已就位" },
      { day: "D+3",  window: "本周内",     action: "中期评估 · 看趋势是否符合「促销驱动」假设", gate: "NightFox 自然势能拐头 → 假设成立" },
      { day: "D+7",  window: "下周一",     action: "BSR 第一节点检查 · 决定是否启动反击",     gate: "BSR 仍 ≤ #3 → 继续等待;= #4 → 触发切换" },
      { day: "D+14", window: "两周末尾",   action: "促销窗口预计到期 · 验证假设",            gate: "促销下架 + 指标回落 = 方案成功;否则补救" },
    ],
  },
  milestonesTradeoff:
    "D+1 到 D+3 是关键 · 出价和促销得同步打才有效。Listing 团队 36 小时是这个方案的硬约束,如果他们排不进来,我们要降级到「只调出价、不上促销」的备选。",
  reasoning: {
    chain: [
      "监控到 NightFox 在 7 核心词 36 小时内 CPC +180%",
      "排除单点波动可能性 · 趋势在 24-36 小时窗口持续",
      "拉公司大脑 · 床架品类历史 6-8 月旺季搜索量数据",
      "匹配到「旺季前自然位抢占」攻击 pattern · 历史 12 次",
      "评估三种应对姿态的 cost / outcome 概率",
      "对比公司大脑里 SKU-117 自身 2024 Q2 同类案例 (71% 守住)",
      "加权评估:正面顶住 73% · 按兵不动 52% (旺季背景下) · 非对称 71%",
      "推荐非对称 · 因为代价低 + 同时获得旺季前抢长尾自然位的副作用",
    ],
    accuracy: 74,
    accuracyLabel: "同类竞品攻击场景",
  },
  approval: {
    note: "时间敏感 · 今天/明天决策窗口 · NightFox 折扣券约 5 天后到期",
    primaryLabel: "批准「不正面碰 · 抢他们后路」",
    secondaryLabel: "选择其他姿态 →",
    timeSensitiveLabel: "时间敏感 · 今天/明天决策窗口",
  },
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

  identity: {
    activeUserId: "maya",
    users: [
      {
        id: "maya",
        name: "Maya Chen",
        initials: "MC",
        role: "电商副总裁",
        level: "L7",
        clearance: "Sensitive",
        clearanceLabel: "敏感",
      },
      {
        id: "devon",
        name: "Devon Park",
        initials: "DP",
        role: "高级增长经理",
        level: "L6",
        clearance: "Internal",
        clearanceLabel: "内部",
      },
      {
        id: "analyst",
        name: "(Demo) Analyst",
        initials: "DA",
        role: "分析师",
        level: "L4",
        clearance: "Public",
        clearanceLabel: "公开",
      },
    ],
  },

  recentActivity: [
    {
      id: "act-pattern-cpc",
      kind: "pattern_strengthened",
      title: "Pattern · 品牌广告持续投放 → CPC 下行",
      summary: "12 个 brand-ad scale-up 案例 · 平均 CPC 降幅 18.4%",
      addedAt: "May 14, 14:22",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      detail: {
        sourceCount: 12,
        confidencePct: 76,
        sourceNote: "源案例:SKU-117 2024 Q3、SKU-toothbrush 2025 Q2、SKU-A 2026 Q1,另含 9 个 scale-up 窗口。",
        appliedIn: ["全渠道 Amazon 计划", "全渠道 Walmart SB 扩量"],
        definition: "品牌广告在 2 倍基线水平持续投放 8 周以上时,CPC 随相关性驱动的曝光替代竞价驱动的曝光而下行。",
      },
      story: {
        context:
          "2024 Q3 起,我们注意到几个稳态产品(BSR 5-15 段)的品牌词 CPC 一直在 $0.80-1.00 区间,但品牌词曝光份额只有 12-18%,大量品牌搜索流量被竞品 SB 头位接走。",
        problem:
          "想拉品牌词曝光份额,但又不想被认为是「烧钱抢自己的词」。需要测试:持续投品牌广告会不会让 CPC 自然下降。",
        action:
          "在 12 个 SKU 上分批做了这个测试,每次 6 周。每个 SKU 把品牌广告月预算从 $3-5K 拉到 $12-18K,前 4 周不调,只观察。",
        results:
          "12 次里 11 次 CPC 在 4-6 周后自然下行,平均降幅 18.4%。1 次失败是因为同期竞品也加注品牌广告。",
        takeaway:
          "看到稳态产品 SOV < 20% 且预算有余,会主动提「4-6 周品牌广告持续投放」作为执行选项,不会直接推降价或加 SP 出价。如果监控到竞品同期加品牌广告,会标注信心度从 76% 降到 55%。",
      },
    },
    {
      id: "act-extract-q4",
      kind: "extraction",
      title: "Q4-2025-Retrospective.pdf 提炼出 3 个新模式",
      summary: "razor-blade 方法、旺季 SOV 防御、库存耦合 BS 光环三个模式被沉淀",
      addedAt: "May 12, 09:47",
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      detail: {
        sourceCount: 1,
        confidencePct: 72,
        sourceNote: "来源:Q4-2025-Retrospective.pdf · 47 页 · 由 Maya Chen 上传。",
        appliedIn: ["razor-blade 计划 · SKU-A 套装", "旺季 SOV 防御打法"],
        definition: "三个模式各自由文档内 4 个以上历史 SKU 结果支撑。",
      },
      story: {
        context:
          "2026 Q1,团队对 razor-blade 定价机制(怎么定刀头复购价、能撑多大降价区间)的判断主要靠 Sara 个人经验,品牌大脑里没有系统化的 pattern。Maya 把 Q4 2025 的内部复盘 PDF 上传过来,要求 agent 提炼方法学,而不是让人一页页看。",
        problem:
          "47 页的复盘文档,人读 3-4 小时,中间有大量项目背景和 SKU 名单。需要从里面把「可复用的操作决策」挑出来,剩下的背景 / 现状描述忽略掉。",
        action:
          "解析 47 页(138K tokens 文本 + 12 张表 + 4 张图)。识别出 8 页含真正的操作学习,其余 39 页是项目背景。把 finding 跟现有 pattern 库交叉比对 — 3 段产出新 pattern,2 段给现有 playbook 加了强化。",
        results:
          "3 个新 pattern,信心度 68-74%:razor-blade 12 天促销窗口的 attach 提升(74%)、节日驱动的品类宽匹配 CR 膨胀(68%)、库存耦合对 BS 光环持续时间的影响(71%)。2 个 playbook 更新:「BS 争取 #2 → #1」加了上线前库存预检 phase,「旺季 SOV 防御」信心度 71% → 78%。",
        takeaway:
          "碰到团队复盘类 PDF,会先标「真操作学习页面」的比例(这次 8/47 = 17%,postmortem 类一般 15-25%)。低于 10% 我会建议团队先精简再上传,信噪比太低提炼出来的 pattern 不可靠。给现有 playbook 加新案例时,我会显示信心度变化 + 文档哪几页支撑了这次更新,让团队能审。",
      },
    },
    {
      id: "act-ingest-walmart",
      kind: "ingestion",
      title: "Walmart Connect API ingested 90d historical · 12,400 events",
      summary: "12,400 个事件 · 截至 5 月 9 日的 campaign、关键词、SB 创意表现",
      addedAt: "May 10, 03:12",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      detail: {
        sourceCount: 12400,
        confidencePct: 81,
        sourceNote: "来源:Walmart Connect OAuth 只读权限 · 回填窗口 2026/2/9 — 2026/5/9。",
        appliedIn: ["全渠道 Walmart SB 扩量", "Walmart 出价节奏基线"],
        definition: "12,400 个事件已规范化到与 Amazon Ads 数据相同的 schema,可用的部分按 ASIN / GTIN 进行 join。",
      },
      story: {
        context:
          "落地灯线在 Walmart 上的广告投入做了一年多,但品牌大脑里关于 Walmart 的数据一直是第三方 scrape(精度 ±20%),没有第一方接入。Cross-platform 分析(Amazon vs Walmart 同一 SKU)只能基于估算。",
        problem:
          "Devon 在 5 月 10 日通过 chat 发起 connect。要让品牌大脑能从 Walmart 第一方拉数据:campaigns、关键词表现、SB 创意、search terms、销售对应,过去 90 天历史 + 之后每 15 分钟实时同步。",
        action:
          "Maya 授权 OAuth(4 项 read scope)。Agent 从授权完成到第一条数据落库花了 12 分钟 — 8 个 Walmart 表 backfill 90 天,12,400 条历史事件被索引。建立了跨平台 SKU 映射(Amazon ASIN ↔ Walmart Item ID)。",
        results:
          "现在能跑跨平台分析(见 Devon 的全渠道方案画布,Walmart $36K 增量基于真实 CPC,不是 scrape 估值)。Walmart 广告架构在 Ad architecture inspector 自动多了一个 tab。30 天后会自动触发一次跨平台 attribution 模型重训。",
        takeaway:
          "现在我能比较 Amazon 和 Walmart 真实 CPC 时,我会主动指出 Walmart 上的结构性扩量空间(本案例发现 CPC 低 42%、SB 占比仅 8%)— 这种洞察在没有第一方数据时只能猜。如果未来 sync 失败超过 6 小时,我会在画布顶部红色 callout 提示数据可能滞后,避免基于过时数据做决策。",
      },
    },
    {
      id: "act-revoke-dayparting",
      kind: "revocation",
      title: "决策类别已撤回 · 饱和曝光份额上的 dayparting",
      summary: "Maya 撤回了 agent 的自主权限;过去 4 周曝光份额仅提升 0.4 pt,信号收益太小",
      addedAt: "May 8, 16:08",
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      detail: {
        sourceCount: 4,
        confidencePct: 68,
        sourceNote: "Maya Chen 在 2026 Q1 复盘后撤回。该类别活跃 11 周,IS 净提升 0.4 pt。",
        appliedIn: ["SKU-A(撤回前活跃)", "SKU-117(撤回前活跃)"],
        definition: "对曝光份额 >85% 的 SKU 的 dayparting 调整,agent 今后需要明确批准。",
      },
      story: {
        context:
          "agent 从 2025 Q3 起对「曝光份额 >85% 的 SKU dayparting 调整」有自主权限。当时 Maya 授权的逻辑是:IS >85% 说明我们在低 CR 时段也在抢曝光,dayparting 可以剪掉浪费。",
        problem:
          "11 周后,跨 SKU-A 和 SKU-117 累计 IS 提升只有 0.4 pt。同时这些 dayparting 决策给归因分析加了噪声 — Sara 在 Q1 复盘里反复要解释「这个 SKU 凌晨 3 点停了 2 小时」。收益太小,审计成本太高。",
        action:
          "Maya 在 chat 里发起 revoke。Agent 把该类别从 Active 移到 Recently revoked。取消了 3 个排队中的 dayparting 操作(5 月 8 日晚原本要执行)。后续所有针对 IS 饱和 SKU 的 dayparting 都需团队逐次批准。",
        results:
          "5 月 8 日起 0 个 dayparting 自主操作。该类别显示在 Recently revoked 区,Maya 标为撤回人。撤回后 IS 净影响 -0.1 pt(在噪声范围内)。Sara 没有再投诉归因可读性问题。",
        takeaway:
          "我现在对「申请自主权限」的门槛提高了 — 至少需要历史案例支持 8 周内 IS 提升 ≥1 pt,且操作不会跟同小时的 budget / bid 调整复合污染归因。dayparting 我现在默认按「团队逐批批准」处理,不再作为自主候选。",
      },
    },
    {
      id: "act-flag-q4-diverge",
      kind: "flagged",
      title: "模式被标记需重新验证 · Q4 实际偏离 14%",
      summary: "上线爬坡曲线低于预测;簇内需要新证据后才能复用",
      addedAt: "May 5, 11:30",
      sensitivity: "Confidential",
      sensitivityLabel: "机密",
      detail: {
        sourceCount: 3,
        confidencePct: 62,
        sourceNote: "2025 Q4 三个新品 SKU 实际表现较模式预测平均偏离 14%(范围 9–21%)。",
        appliedIn: ["暂停中 — 当前无活跃引用"],
        definition: "模式保留在 brain 中但已被门控:agent 每次引用该模式时会同时标出偏离。",
      },
      story: {
        context:
          "模式「上线爬坡曲线 · $120-180 价格带」从 2024 Q2 起一直是品牌大脑里新品上线预测的默认参考。过去 6 个该价格带的新品上线,实际落在曲线预测的 ±8% 范围内。",
        problem:
          "2025 Q4 该价格带连续 3 个新品(SKU-PB-A 充电宝、SKU-LV-2 落地灯变体、1 个 offline SKU)实际表现比预测低 9-21%,平均偏离 14%。如果继续无标记使用,agent 给 2026 Q1 新品的预测会系统性偏乐观,影响预算分配。",
        action:
          "Maya 在 Q1 实际值 vs 预测对账时发现偏离,标记该模式。Agent 给模式加门控 — 保留在 brain,但每次引用都会显示「模式已标 · 近 3 个案例偏离 14%,证据待补」。3 个旧 draft canvas 里的引用加了脚注。同时开始侧通道收集偏离原因 — 早期假设是 TikTok 拉动品类认知改变了上线初期流量形态,跟 pre-TikTok 时代的案例不一样了。",
        results:
          "模式在 UI 上的有效信心度从 78% 降到 62%。目前没有 active canvas 引用它;3 个 flagged 的旧引用都有脚注。Maya 在审 5 个原本会用这个模式的候选新品 — agent 给出更宽的误差带,而不是直接套这条模式。",
        takeaway:
          "当一个模式的连续 2/3 或 3/4 个实际值落在历史 ±10% 区间外,我会主动标记需重新验证,不等团队发现。模式建立便宜,过时使用代价大。这次(TikTok 对 Q1 上线的影响)是品类层结构性变化,任何按单案例的微调都抓不到 — 以后我会在品类有结构性变化迹象时(比如新平台进入)主动检查相关模式的 lineage。",
      },
    },
    {
      id: "act-ingest-bsr",
      kind: "extraction",
      title: "Walmart competitor BSR scrape · 4 weeks ingested",
      summary: "Lighting、Bedroom Furniture、Bath 三个类目 Top-50 按日抓取",
      addedAt: "May 3, 22:55",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      detail: {
        sourceCount: 4200,
        confidencePct: 74,
        sourceNote: "抓取窗口 2026/4/6 — 2026/5/3。3 个子类目共 4,200 条日排名快照。",
        appliedIn: ["防御案例 · BSR 滑落检测", "razor-blade 计划竞品图谱"],
        definition: "日级 BSR 快照按时间序列存储;agent 现已监控排名变化阈值(每周 ≥3 位)用于告警。",
      },
      story: {
        context:
          "2026 Q1 我们只有 Walmart 第三方 scrape(自有 SKU 也是)— 5 月 10 日 Walmart Connect API 连接后才有第一方数据。但要早期发现 Walmart-only 竞品对落地灯品类的 BSR 攻击,光靠自有数据不够,需要竞品 BSR 的日级时间序列,而 Walmart 没开放竞品 BSR 接口。",
        problem:
          "SKU-A 的防御能力依赖「竞品 BSR 排名变化的早期信号」。如果只能事后看到自家 BSR 掉了再响应,反应慢了至少 1-2 周。需要建竞品 BSR 监控管道。",
        action:
          "对 3 个 Walmart 子品类(Lighting、Bedroom Furniture、Bath)设了 Helium10 + Jungle Scout 双源轮询,每天抓一次 Top-50 BSR。摄入了 2026/4/6 — 2026/5/3 共 4 周的历史数据 — 按 Walmart Item ID 索引的 4,200 个日级快照。建了变化率检测器:任何竞品 SKU 单周上升 ≥3 位即触发软告警,在 Defense 画布的早期预警面板显示。",
        results:
          "4 周历史窗口里系统捕捉到 2 个早期预警 — 都是促销驱动(竞品 14 天促销券),没有升级为真实攻击。验证了 3 位阈值合理,如果设到 5 位会全漏。",
        takeaway:
          "Walmart 竞品监控没有官方 API,我依赖 Helium10 + Jungle Scout 轮询层。在告警升级前,我会把变化率跟历史基线对比 — 历史 2 次告警里 1 次是促销驱动,团队真正需要的只是「持续上升」那一类。所以在任何 BSR 告警里,我会单独标「促销驱动 vs 结构性上升」,不让两者混淆。",
      },
    },
  ],

  connectors: [
    {
      id: "cn-amazon-ads",
      name: "Amazon Advertising API",
      type: "api",
      status: "live",
      lastSync: "4 分钟前",
      scopeUrl: "https://advertising.amazon.com/account/oauth-scope",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
    },
    {
      id: "cn-walmart-connect",
      name: "Walmart Connect API",
      type: "api",
      status: "live",
      lastSync: "12 分钟前",
      scopeUrl: "https://advertising.walmart.com/scope",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
    },
    {
      id: "cn-tiktok-ads",
      name: "TikTok Ads Manager API",
      type: "api",
      status: "syncing",
      lastSync: "刚开始",
      scopeUrl: "https://ads.tiktok.com/marketing_api/scope",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
    },
    {
      id: "cn-brand-analytics",
      name: "Amazon Brand Analytics",
      type: "api",
      status: "live",
      lastSync: "2 小时前",
      scopeUrl: "https://sellercentral.amazon.com/brand-analytics/scope",
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
    },
    {
      id: "cn-helium10",
      name: "Helium10 scrape",
      type: "scrape",
      status: "paused",
      lastSync: "3 天前",
      scopeUrl: "https://helium10.com/integrations/scope",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
    },
    {
      id: "cn-slack",
      name: "Slack 通知",
      type: "api",
      status: "live",
      lastSync: "最近事件 8 分钟前",
      scopeUrl: "https://slack.com/oauth/scope",
      sensitivity: "Public",
      sensitivityLabel: "公开",
    },
    {
      id: "cn-gdrive",
      name: "Google Drive",
      type: "file",
      status: "live",
      lastSync: "已索引 6 份文档",
      scopeUrl: "https://drive.google.com/oauth/scope",
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
    },
  ],

  uploadedDocs: [
    {
      id: "doc-q4-retro",
      filename: "Q4-2025-Retrospective.pdf",
      type: "pdf",
      status: "indexed",
      patternsCount: 3,
      uploadedAt: "Apr 12",
      uploadedBy: "Maya Chen",
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
    },
    {
      id: "doc-pricing",
      filename: "Pricing-Strategy-2026.xlsx",
      type: "xlsx",
      status: "indexed",
      patternsCount: 2,
      uploadedAt: "Apr 28",
      uploadedBy: "Sara Lin",
      sensitivity: "Confidential",
      sensitivityLabel: "机密",
    },
    {
      id: "doc-teardown",
      filename: "Competitor-Teardown-Floor-Lamps.pdf",
      type: "pdf",
      status: "indexed",
      patternsCount: 4,
      uploadedAt: "May 2",
      uploadedBy: "Devon Park",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
    },
    {
      id: "doc-style",
      filename: "Brand-Style-Guide-v3.pdf",
      type: "pdf",
      status: "no_patterns",
      patternsCount: 0,
      uploadedAt: "Feb 14",
      uploadedBy: "Maya Chen",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
    },
    {
      id: "doc-bsr-csv",
      filename: "BSR-Trajectory-2024-Q4.csv",
      type: "csv",
      status: "indexed",
      patternsCount: 1,
      uploadedAt: "Apr 8",
      uploadedBy: "Devon Park",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
    },
    {
      id: "doc-sku-postmortem",
      filename: "SKU-launch-postmortem-PB-A.pdf",
      type: "pdf",
      status: "processing",
      patternsCount: null,
      uploadedAt: "May 14",
      uploadedBy: "Devon Park",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
    },
  ],

  patterns: [
    {
      id: "pat-brand-ad-cpc",
      name: "品牌广告持续投放 → CPC 下行",
      category: "Strategy",
      confidencePct: 76,
      usedInCount: 7,
      sourceCount: 12,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      addedAt: "May 14",
      detail: {
        definition: "品牌广告在 2 倍基线水平持续投放 8 周以上时,CPC 随相关性驱动的曝光替代竞价驱动的曝光而下行。",
        lineage: "由 12 个 scale-up 案例提炼;首次观察到是 SKU-117 2024 Q3,SKU-A 2026 Q1 再次确认。",
        sourceList: [
          ["SKU-117 · 2024 Q3", "品牌广告投放 2.1x → 11 周内 CPC 降 22.3%"],
          ["SKU-toothbrush · 2025 Q2", "品牌广告投放 1.9x → 9 周内 CPC 降 14.6%"],
          ["SKU-A · 2026 Q1", "品牌广告投放 2.4x → 10 周内 CPC 降 18.1%"],
          ["另含 9 个案例", "平均 CPC 降幅 18.4%,窗口 8–13 周"],
        ],
        appliedIn: ["全渠道 Amazon 计划", "全渠道 Walmart SB 扩量", "BSR 占位打法"],
      },
    },
    {
      id: "pat-bsr-capture",
      name: "BSR 占位 · 通过集中广告抬升从 #2 上 #1",
      category: "Strategy",
      confidencePct: 81,
      usedInCount: 4,
      sourceCount: 6,
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      addedAt: "Apr 22",
      detail: {
        definition: "从 BSR #2 出发,3 周集中广告投放(正常预算 3-4 倍)在 6/6 案例中翻盘到 #1 — 前提是类目第一未跑促销。",
        lineage: "6 个案例均为 ABC 内部 SKU,涉及灯具、卧室、浴室类目,时间跨度 2023–2025。",
        sourceList: [
          ["SKU-117 床架 · 2024 年 7 月", "投放 3.4x · BSR 第 3 周到 #1,保持 14 周"],
          ["SKU-A 落地灯 · 2024 年 11 月", "投放 2.9x · BSR 第 2 周到 #1,保持 9 周"],
          ["SKU-toothbrush · 2025 年 1 月", "投放 3.1x · BSR 第 3 周到 #1,保持 11 周"],
          ["另含 3 个案例", "全部在投放开始后 3 周内 #2 → #1"],
        ],
        appliedIn: ["3 阶段 BSR 占位打法", "全渠道 Amazon 计划"],
      },
    },
    {
      id: "pat-bedroom-ctr",
      name: "卧室词簇 CTR 诊断模式",
      category: "Optimization",
      confidencePct: 73,
      usedInCount: 3,
      sourceCount: 4,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      addedAt: "Mar 9",
      detail: {
        definition: "当卧室场景关键词 CTR 在 1.1–1.4%、类目基准是 2.8% 时,根因几乎总是主图场景错位(客厅 vs 卧室)。",
        lineage: "ABC 4 个 SKU(落地灯、床架)出现同样模式;改完主图后 4/4 都修好了。",
        sourceList: [
          ["SKU-A 落地灯 · 2025 年 2 月", "卧室 CTR 1.2% → 2.6%,换了卧室主图后"],
          ["SKU-A2 落地灯 · 2025 年 4 月", "卧室 CTR 1.1% → 2.4%,重拍后"],
          ["SKU-117 床架 · 2025 年 8 月", "卧室 CTR 1.4% → 3.1%,换场景后"],
          ["另含 1 个案例", "同样的诊断,改完都修好了"],
        ],
        appliedIn: ["落地灯优化画布", "床架上新 CR 打法"],
      },
    },
    {
      id: "pat-longtail-harvest",
      name: "从搜索词报告抓长尾词",
      category: "Optimization",
      confidencePct: 84,
      usedInCount: 11,
      sourceCount: 18,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      addedAt: "Feb 18",
      detail: {
        definition: "搜索词报告里曝光 ≥18、CR ≥ 类目中位数的词,升级到精准匹配后,14 天内 ACoS 预期改善 4–9 pt。",
        lineage: "18 个 SKU 窗口跨 2024–2025,含 3 个合作品牌案例研究做对照。",
        sourceList: [
          ["SKU-A · 2024 Q4 抓取", "升级 37 个词 · 14 天 ACoS -6.2 pt"],
          ["SKU-117 · 2025 Q1 抓取", "升级 29 个词 · 14 天 ACoS -4.8 pt"],
          ["SKU-toothbrush · 2025 Q2 抓取", "升级 44 个词 · 14 天 ACoS -8.1 pt"],
          ["另含 15 个窗口", "平均 ACoS 降幅 6.4 pt"],
        ],
        appliedIn: ["否定词抓取决策类别", "优化画布 · 长尾词"],
      },
    },
    {
      id: "pat-bid-raise-cap",
      name: "出价上调 ≤15% · CR > 目标 48 小时触发",
      category: "Execution",
      confidencePct: 89,
      usedInCount: 38,
      sourceCount: 38,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      addedAt: "Jan 12",
      detail: {
        definition: "关键词 CR 连续 48 小时超过目标时,自动上调出价 ≤15%。过去 90 天 38 次调用,0 次回滚;审计干净。",
        lineage: "Brain 中置信度最高的可执行模式。审计节奏:Maya 每周、Devon 每季。",
        sourceList: [
          ["38 次调用 · 2 月 12 日 – 5 月 14 日", "0 回滚 · 每个受影响关键词平均增量转化 +14.3%"],
          ["审计 · 4 月 28 日", "Maya 签字 · 干净"],
          ["审计 · 3 月 31 日", "Devon 签字 · 干净"],
        ],
        appliedIn: ["出价上调决策类别(自主)", "执行画布 · 实时运营"],
      },
    },
    {
      id: "pat-negkw-harvest",
      name: "否定词抓取 · 14 天零转化",
      category: "Execution",
      confidencePct: 87,
      usedInCount: 22,
      sourceCount: 22,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      addedAt: "Jan 14",
      detail: {
        definition: "滚动 14 天 0 转化 + ≥84 次点击的关键词,自动加入广告组的否定词列表。历史回滚率 <2%。",
        lineage: "过去 90 天 22 次调用,0 回滚。算 brain 里最干净的『减法』类别之一。",
        sourceList: [
          ["22 次调用 · 2 月 14 日 – 5 月 14 日", "0 回滚 · 每 SKU 每周平均回收浪费支出 $1,847"],
          ["边界案例 · 3 月 22 日", "1 个品牌防御关键词被标记复核(自动抑制正确)"],
        ],
        appliedIn: ["否定词决策类别", "优化画布"],
      },
    },
    {
      id: "pat-launch-ramp",
      name: "上新爬坡曲线 · $120-180 价格带",
      category: "Launch",
      confidencePct: 74,
      usedInCount: 5,
      sourceCount: 7,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      addedAt: "Nov 4",
      detail: {
        definition: "$120-180 价格带的 SKU,4-6 周内从 0 爬到目标 run-rate 的 ~70%。比这快通常是花多了,比这慢是 listing 端有缺口。",
        lineage: "ABC 7 个上新跨 2023–2025,加上 2 个合作品牌案例。Q4 2025 实际偏离 14% — 模式已被标记。",
        sourceList: [
          ["SKU-A 落地灯 · 2024 上新", "第 5 周到目标 run-rate 的 68%"],
          ["SKU-117 床架 · 2025 上新", "第 6 周到目标 run-rate 的 72%"],
          ["SKU-A2 落地灯 · 2025 上新", "第 4 周到目标 run-rate 的 64% — 已标记复核"],
          ["另含 4 个上新", "平均第 5 周达 run-rate 的 67%"],
        ],
        appliedIn: ["上新 CR 打法", "当前已标记 · Q4 实际复核"],
      },
    },
    {
      id: "pat-p0-main-image",
      name: "P0 主图先改再放量",
      category: "Launch",
      confidencePct: 78,
      usedInCount: 6,
      sourceCount: 8,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      addedAt: "Aug 22",
      detail: {
        definition: "上新第一周 CTR 低于类目基准 0.6 倍时,主图未改就放量,60-70% 的增量预算白花。先改主图。",
        lineage: "ABC 8 个上新都出现同模式;每次先放量的,CTR 都得等主图改完才能起来。",
        sourceList: [
          ["SKU-A2 · 2025 年 4 月上新", "放量太早 · 浪费 42% · 主图第 8 周才修好"],
          ["SKU-117 · 2024 年 7 月上新", "先改主图 · 第 3 周 CTR 到 2.4%"],
          ["另含 6 个上新", "模式成立 8/8"],
        ],
        appliedIn: ["上新 CR 打法 · P0 顺序", "床架上新案例"],
      },
    },
    {
      id: "pat-counter-attack",
      name: "反击对手弱势位(非对称)",
      category: "Defense",
      confidencePct: 71,
      usedInCount: 4,
      sourceCount: 5,
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      addedAt: "Dec 8",
      detail: {
        definition: "被攻击时,不直接守被攻击的 SKU,而是去打攻击方最弱的 SKU。资源非对称让防御方在观察到的 5 个案例里有 3 次占优。",
        lineage: "5 个防御窗口跨 2023–2025。提示:5 个案例里有 2 次反击没把攻击方拉开;反击是补充手段,不是替代直接防御。",
        sourceList: [
          ["防御案例 · 2024 年 6 月", "反击 11 天后把攻击方拉开"],
          ["防御案例 · 2024 年 11 月", "反击只是补充,主要靠直接防御"],
          ["另含 3 个窗口", "3/5 成功率"],
        ],
        appliedIn: ["防御姿态选择打法"],
      },
    },
    {
      id: "pat-wait-out",
      name: "等待姿态 · 促销驱动的攻击",
      category: "Defense",
      confidencePct: 65,
      usedInCount: 3,
      sourceCount: 4,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      addedAt: "Oct 11",
      detail: {
        definition: "竞品攻击是促销驱动的(有明确结束日期)时,等待姿态(不投入响应)在 4 个案例里有 3 次正确。促销期内防御浪费预算。",
        lineage: "4 个窗口跨 2024–2025。提示:需要看到明确的促销结束日期 — 没有结束日期的攻击需要直接防御。",
        sourceList: [
          ["防御案例 · 2024 年 7 月", "等待 · 攻击方促销后退场,9 天 BSR 恢复"],
          ["防御案例 · 2025 年 3 月", "等待 · 同样结果"],
          ["另含 2 个案例", "1 次失误(促销意外延期)"],
        ],
        appliedIn: ["防御姿态选择打法"],
      },
    },
    {
      id: "pat-pickup-cr",
      name: "Pickup-truck 词簇 CR 诊断模式",
      category: "Optimization",
      confidencePct: 76,
      usedInCount: 2,
      sourceCount: 3,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      addedAt: "Sep 17",
      detail: {
        definition: "pickup-truck / 车载场景关键词 CR 在 0.8-1.2% 但 CTR 健康时,差距通常是定价与场景错位:用户点了,但卡在与卡车场景对应的价格。",
        lineage: "工具 / 户外类目 3 个案例。样本比其他优化模式小 — 置信度反映这一点。",
        sourceList: [
          ["工具车案例 · 2025 年 4 月", "调价后 CR 0.9% → 2.1%"],
          ["户外灯案例 · 2024 年 8 月", "做场景组合后 CR 1.1% → 2.4%"],
          ["另含 1 个案例", "同样诊断成立"],
        ],
        appliedIn: ["优化画布(冷门场景)"],
      },
    },
    {
      id: "pat-razor-attach",
      name: "razor-blade 促销窗口拉动绑定购买率",
      category: "Strategy",
      confidencePct: 72,
      usedInCount: 3,
      sourceCount: 4,
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      addedAt: "May 12",
      detail: {
        definition: "razor-blade 类 SKU,在购买周期窗口内对手柄做 7 天促销,刀片绑定购买率提升 2.4-3.1 pt。前提:手柄毛利能吸收促销折扣。",
        lineage: "4 个窗口 · ABC 牙刷 + 1 个合作品牌案例研究。最近从 Q4-2025-Retrospective.pdf 提炼出来。",
        sourceList: [
          ["SKU-toothbrush · 2025 年 3 月", "7 天窗口内绑定购买率 14.2% → 16.8%"],
          ["SKU-toothbrush · 2025 年 9 月", "7 天窗口内绑定购买率 13.9% → 17.0%"],
          ["另含 2 个窗口", "平均绑定购买率提升 2.7 pt"],
        ],
        appliedIn: ["razor-blade 计划 · SKU-A 套装"],
      },
    },
  ],

  playbookList: [
    {
      id: "pb-bsr-3phase",
      name: "3 阶段 BSR 占位",
      category: "Strategy",
      basedOnCases: 6,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      phases: [
        { label: "阶段 1", focus: "listing + 创意夯实", durationWeeks: 3, exitGate: "主图 CTR ≥ 2.4%" },
        { label: "阶段 2", focus: "集中广告抬升 · 3-4x 投放", durationWeeks: 4, exitGate: "BSR ≤ #2 持续 7 天" },
        { label: "阶段 3", focus: "守住新位置", durationWeeks: 5, exitGate: "BSR #1 持续 14 天 · ROAS ≥ 基线" },
      ],
    },
    {
      id: "pb-brand-ad-scale",
      name: "品牌广告 scale-up · CPC 下行",
      category: "Strategy",
      basedOnCases: 12,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      phases: [
        { label: "阶段 1", focus: "品牌广告投放 2x 基线 · 4 周", durationWeeks: 4, exitGate: "品牌曝光份额 ≥ 38%" },
        { label: "阶段 2", focus: "保持投放,观察 CPC 趋势", durationWeeks: 4, exitGate: "CPC 周环比下行" },
        { label: "阶段 3", focus: "稳定后逐步降投放", durationWeeks: 4, exitGate: "CPC 较基线 -15% · ROAS 稳定" },
      ],
    },
    {
      id: "pb-geo-holdout",
      name: "分地区对照测试 · 增量效果验证",
      category: "Strategy",
      basedOnCases: 5,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      phases: [
        { label: "阶段 1", focus: "地区选择 + 功效分析定样本量", durationWeeks: 2, exitGate: "对照 / 实验 DMA 匹配 · MDE ≤ 6%" },
        { label: "阶段 2", focus: "跑测试 · 对照 DMA 广告归零", durationWeeks: 4, exitGate: "测试跑完 · 日志干净" },
        { label: "阶段 3", focus: "读数 + 决策", durationWeeks: 2, exitGate: "增量 ROAS 算出 · 决策归档" },
      ],
    },
    {
      id: "pb-razor-pricing",
      name: "razor-blade 定价实验设计",
      category: "Strategy",
      basedOnCases: 4,
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      phases: [
        { label: "阶段 1", focus: "手柄毛利下限 + 刀片绑定基线", durationWeeks: 1, exitGate: "毛利下限由 Sara 签字" },
        { label: "阶段 2", focus: "7 天手柄促销 · 3 个价格点", durationWeeks: 3, exitGate: "每个价格点 ≥ 200 名买家" },
        { label: "阶段 3", focus: "促销后 28 天窗口测绑定", durationWeeks: 2, exitGate: "绑定差异置信区间 ≤ ±0.8 pt" },
      ],
    },
    {
      id: "pb-defense-3posture",
      name: "防御响应 · 3 姿态选择",
      category: "Defense",
      basedOnCases: 9,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      phases: [
        { label: "阶段 1", focus: "攻击性质判断 · 促销?出价?listing?", durationWeeks: 1, exitGate: "姿态归档:反击 / 直接防御 / 等待" },
        { label: "阶段 2", focus: "执行所选姿态", durationWeeks: 1, exitGate: "BSR / 曝光份额企稳或恢复" },
      ],
    },
    {
      id: "pb-launch-cr",
      name: "上新 CR · P0/P1 假设顺序",
      category: "Launch",
      basedOnCases: 7,
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      phases: [
        { label: "阶段 1", focus: "P0 假设 · 主图 + 价格测试", durationWeeks: 3, exitGate: "CTR ≥ 2.2% · CR ≥ 1.8%" },
        { label: "阶段 2", focus: "P1 假设 · 人群 + 关键词扩展", durationWeeks: 3, exitGate: "Run rate ≥ 目标 60%" },
        { label: "阶段 3", focus: "放量 + 稳定", durationWeeks: 2, exitGate: "Run rate ≥ 目标 80% · ACoS 在带内" },
      ],
    },
    {
      id: "pb-peak-sov",
      name: "跨平台旺季曝光份额防御",
      category: "Defense",
      basedOnCases: 3,
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      phases: [
        { label: "阶段 1", focus: "峰前曝光份额基线 · Amazon + Walmart", durationWeeks: 2, exitGate: "各平台基线已取" },
        { label: "阶段 2", focus: "峰内守份额 · 广告预算抬高", durationWeeks: 3, exitGate: "曝光份额波动 ≤ 基线 -3 pt" },
        { label: "阶段 3", focus: "峰后回归 · 逐步降投放", durationWeeks: 1, exitGate: "投放降回完成 · 读数归档" },
      ],
    },
  ],

  decisionClassesDetail: [
    {
      id: "dc-bid-raise",
      name: "出价上调 ≤15%",
      definition: "关键词 CR 连续 48 小时超过目标时,自动上调出价 ≤15%。",
      delegatedBy: "Maya Chen",
      delegatedAt: "Jan 10",
      thresholdSummary: "调幅 ≤15% · 触发:CR > 目标 48 小时",
      recentInvocations: 38,
      lastInvoked: "5 月 14 日 03:18",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      revoked: false,
    },
    {
      id: "dc-bid-lower",
      name: "出价下调 ≤15%",
      definition: "关键词 ACoS 连续 72 小时超过目标时,自动下调出价 ≤15%。",
      delegatedBy: "Maya Chen",
      delegatedAt: "Jan 10",
      thresholdSummary: "调幅 ≤15% · 触发:ACoS > 目标 72 小时",
      recentInvocations: 22,
      lastInvoked: "5 月 13 日 21:42",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      revoked: false,
    },
    {
      id: "dc-negkw",
      name: "否定词抓取 · 14 天零转化",
      definition: "滚动 14 天 0 转化 + ≥84 次点击的关键词,自动加入广告组否定词列表。",
      delegatedBy: "Devon Park",
      delegatedAt: "Jan 14",
      thresholdSummary: "0 转化 · ≥84 次点击 · 14 天窗口",
      recentInvocations: 22,
      lastInvoked: "5 月 12 日 11:08",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      revoked: false,
    },
    {
      id: "dc-budget-realloc",
      name: "campaign 内预算重分配 · ≤20%",
      definition: "CR 信号支持时,在同一 campaign 内的广告组间移动最多 20% 预算。",
      delegatedBy: "Maya Chen",
      delegatedAt: "Feb 14",
      thresholdSummary: "调幅 ≤20% · 仅 campaign 内",
      recentInvocations: 9,
      lastInvoked: "5 月 11 日 16:30",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      revoked: false,
    },
    {
      id: "dc-dayparting",
      name: "饱和曝光份额上的 dayparting",
      definition: "曝光份额 > 85% 时,在低 CR 时段下调出价 — 仅限曝光份额稳定的 SKU。",
      delegatedBy: "Devon Park",
      delegatedAt: "Feb 22",
      thresholdSummary: "曝光份额 > 85% · 仅低 CR 时段",
      recentInvocations: 4,
      lastInvoked: "5 月 6 日 09:14",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      revoked: false,
    },
    {
      id: "dc-match-consol",
      name: "匹配类型合并 · CR > 7%",
      definition: "精准匹配 CR 超过 7% 时,把广泛 / 词组匹配合并到精准。",
      delegatedBy: "Maya Chen",
      delegatedAt: "Mar 4",
      thresholdSummary: "精准 CR > 7% · 自动合并",
      recentInvocations: 6,
      lastInvoked: "5 月 9 日 14:22",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      revoked: false,
    },
    {
      id: "dc-pause-underperf",
      name: "暂停低效广告组 · 11 天贡献毛利 < $X",
      definition: "广告组 11 天滚动贡献毛利低于 SKU 下限时暂停。",
      delegatedBy: "Maya Chen",
      delegatedAt: "Mar 18",
      thresholdSummary: "贡献毛利 < 下限 · 11 天窗口",
      recentInvocations: 3,
      lastInvoked: "5 月 4 日 08:55",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      revoked: false,
    },
    {
      id: "dc-brand-defense",
      name: "品牌防御出价上调 · 品牌词上出现新进入者",
      definition: "品牌词搜索结果上出现新竞品广告时,自动上调品牌关键词出价。",
      delegatedBy: "Sara Lin",
      delegatedAt: "Apr 2",
      thresholdSummary: "检测到新进入者 · 仅品牌词",
      recentInvocations: 2,
      lastInvoked: "5 月 10 日 19:48",
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      revoked: false,
    },
    {
      id: "dc-revoked-auto-kw",
      name: "搜索词报告自动上新关键词",
      definition: "原:CR 强的搜索词自动升级到精准匹配,无人工复核。",
      delegatedBy: "Maya Chen",
      delegatedAt: "Dec 8",
      thresholdSummary: "3 月 28 日 Maya 撤回 · 1 次误报",
      recentInvocations: 12,
      lastInvoked: "3 月 26 日(撤回前)",
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      revoked: true,
      revokedAt: "Mar 28",
      revokedBy: "Maya Chen",
    },
    {
      id: "dc-revoked-auto-pause",
      name: "低 CR 关键词无复核自动暂停",
      definition: "原:CR 持续偏低的关键词自动暂停 — 发现上新 SKU 早期 CR 噪声大,有边界案例。",
      delegatedBy: "Maya Chen",
      delegatedAt: "Nov 14",
      thresholdSummary: "2 月 14 日 Maya 撤回 · 上新 SKU 边界案例",
      recentInvocations: 8,
      lastInvoked: "2 月 12 日(撤回前)",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      revoked: true,
      revokedAt: "Feb 14",
      revokedBy: "Maya Chen",
    },
  ],

  brandDefaults: [
    {
      id: "bd-tacos-band",
      key: "默认 TACoS 目标带",
      value: "15-22%",
      category: "Budget",
      categoryLabel: "预算",
      rationale: "成熟期 SKU 的行业合理带。",
      lastModified: "Apr 14",
      modifiedBy: "Maya Chen",
    },
    {
      id: "bd-budget-review",
      key: "默认广告预算复盘节奏",
      value: "每月",
      category: "Operations",
      categoryLabel: "运营",
      rationale: "季度复盘发现每月看能更早发现漂移。",
      lastModified: "Mar 22",
      modifiedBy: "Maya Chen",
    },
    {
      id: "bd-ab-min",
      key: "默认 A/B 测试最短时长",
      value: "14 天",
      category: "Quality",
      categoryLabel: "质量",
      rationale: "避免 listing 端测试的早期置信度偏差。",
      lastModified: "Feb 14",
      modifiedBy: "Devon Park",
    },
    {
      id: "bd-bid-floor",
      key: "默认关键词出价下限",
      value: "$0.40",
      category: "Budget",
      categoryLabel: "预算",
      rationale: "更低出价历史上曝光份额 <5%。",
      lastModified: "Feb 14",
      modifiedBy: "Devon Park",
    },
    {
      id: "bd-auto-bid-cap",
      key: "默认自主出价调整上限",
      value: "15%",
      category: "Operations",
      categoryLabel: "运营",
      rationale: "聚合审计显示该上限内 0 回滚。",
      lastModified: "Jan 10",
      modifiedBy: "Maya Chen",
    },
    {
      id: "bd-launch-budget",
      key: "默认新品上新月预算带",
      value: "$30K-$60K/月",
      category: "Budget",
      categoryLabel: "预算",
      rationale: "跨越成熟到激进上新姿态。",
      lastModified: "Feb 14",
      modifiedBy: "Sara Lin",
    },
    {
      id: "bd-voice",
      key: "默认品牌语气",
      value: "运营口吻(简练、直接)",
      category: "Voice",
      categoryLabel: "语气",
      rationale: "与 agent voice 手册一致。",
      lastModified: "Apr 2",
      modifiedBy: "Maya Chen",
    },
    {
      id: "bd-conf-routing",
      key: "默认机密权限路由",
      value: "仅高级团队",
      category: "Operations",
      categoryLabel: "运营",
      rationale: "敏感度策略。",
      lastModified: "Jan 14",
      modifiedBy: "Maya Chen",
    },
    {
      id: "bd-holiday-window",
      key: "默认节日促销窗口",
      value: "14 天",
      category: "Budget",
      categoryLabel: "预算",
      rationale: "匹配 Amazon 典型促销节奏。",
      lastModified: "Apr 10",
      modifiedBy: "Sara Lin",
    },
    {
      id: "bd-paused-review",
      key: "默认已暂停 campaign 复盘节奏",
      value: "7 天",
      category: "Operations",
      categoryLabel: "运营",
      rationale: "在漂移前抓住被遗忘的 campaign。",
      lastModified: "Apr 28",
      modifiedBy: "Devon Park",
    },
  ],

  recentQueries: [
    {
      id: "rq-razor-toothbrush",
      question: "对比 razor 和牙刷产品线的毛利",
      asker: "Sara Lin",
      askerInitials: "SL",
      askedAt: "1 天前",
      sensitivity: "Confidential",
      sensitivityLabel: "机密",
      threadId: "qa-margins",
    },
    {
      id: "rq-bedroom-cr",
      question: "卧室场景的 CR 为什么差?",
      asker: "Maya Chen",
      askerInitials: "MC",
      askedAt: "3 天前",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      threadId: "thread-bedroom-cr",
    },
    {
      id: "rq-holiday-sku-a",
      question: "价格锁的情况下 SKU-A 要不要跑节日促销?",
      asker: "Devon Park",
      askerInitials: "DP",
      askedAt: "5 天前",
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      threadId: "thread-holiday-promo",
    },
    {
      id: "rq-tiktok-floor",
      question: "TikTok 增量测试方法 · go/no-go 底线在哪里?",
      asker: "Devon Park",
      askerInitials: "DP",
      askedAt: "6 天前",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      threadId: "thread-tiktok-methodology",
    },
    {
      id: "rq-walmart-amazon-cpc",
      question: "充电宝类目 Walmart vs Amazon 的 CPC",
      asker: "Devon Park",
      askerInitials: "DP",
      askedAt: "8 天前",
      sensitivity: "Internal",
      sensitivityLabel: "内部",
      threadId: "thread-cpc-compare",
    },
    {
      id: "rq-sku-x-attack",
      question: "过去一年 Company Brain 里有多少 SKU-X 攻击模式?",
      asker: "Maya Chen",
      askerInitials: "MC",
      askedAt: "9 天前",
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      threadId: "thread-attack-count",
    },
    {
      id: "rq-razor-attach-range",
      question: "我们品牌 razor-blade 的绑定购买率典型范围?",
      asker: "Sara Lin",
      askerInitials: "SL",
      askedAt: "11 天前",
      sensitivity: "Confidential",
      sensitivityLabel: "机密",
      threadId: "thread-attach-range",
    },
  ],
};

/* ────────────────────────────────────────────────────────────────────────── */
/*  Brain operations · Part 4 data                                            */
/* ────────────────────────────────────────────────────────────────────────── */

const BRAIN_OPS = {
  upload: {
    document: {
      filename: "Q4-2025-Retrospective.pdf",
      pages: 47,
      tokens: "138K",
      tables: 12,
      charts: 4,
      uploadedBy: "Maya Chen",
      uploadedAt: "May 12, 10:08",
      sensitivity: "Sensitive",
      sensitivityLabel: "敏感",
      signalNote: "高信号 · 47 页里 8 页含可沉淀的运营经验",
    },
    coverageNote:
      "公司大脑此前在 razor-blade 绑定购买率提升方向只有 4 个先例,且都没有 12 天促销窗口的具体打法。本次上传补齐这个缺口。",
    patterns: [
      {
        id: "bop-pat-razor-attach",
        name: "牙刷线 12 天促销窗口 attach 提升 +24%",
        confidencePct: 74,
        sources: "pp. 14, 19, 23–25",
        sensitivity: "Sensitive",
        sensitivityLabel: "敏感",
        categories: ["Strategy", "Optimization"],
        summary: "12 天连续促销窗口下,刀片绑定购买率从基线 47% 提升至 71%。前提:手柄毛利 ≥ 24%。",
      },
      {
        id: "bop-pat-holiday-cr",
        name: "节日驱动的品类宽匹配 CR 膨胀",
        confidencePct: 68,
        sources: "pp. 8–9, 31",
        sensitivity: "Internal",
        sensitivityLabel: "内部",
        categories: ["Optimization"],
        summary: "节假日窗口里,品类宽匹配关键词的转化率会膨胀 1.6 – 2.4 倍,但 7 天后回落。出价节奏需要相应调整。",
      },
      {
        id: "bop-pat-inv-halo",
        name: "库存耦合对 BS 光环持续时间的影响",
        confidencePct: 71,
        sources: "pp. 36–38, 42",
        sensitivity: "Sensitive",
        sensitivityLabel: "敏感",
        categories: ["Strategy", "Defense"],
        summary: "拿下 #1 后,如果库存深度不足 18 天,BS 光环窗口会缩到 11 天以内。促销前必须做库存预检。",
      },
    ],
    playbookUpdates: [
      {
        id: "bop-pb-bsr",
        name: "Best-seller capture · #2 → #1",
        change: "新增阶段考虑 · 促销前先做库存预检",
      },
      {
        id: "bop-pb-peak",
        name: "Peak season SOV defense",
        change: "置信度 71% → 78% · 增加 1 个高质量先例",
      },
    ],
    milestones: [
      "Razor-blade 促销决策现在有 4 个先例可对照",
      "节日窗口的关键词出价计划可引用 CR 膨胀模式",
      "Best-seller capture 打法新增库存预检阶段",
    ],
  },

  connector: {
    service: "Walmart Connect API",
    connectedBy: "Devon Park",
    connectedAt: "May 10, 14:22",
    oauthScopeCount: 4,
    oauthScopes: [
      "campaigns.read",
      "ad_groups.read",
      "performance.read",
      "search_terms.read",
    ],
    syncStatus: "在线 · 最新事件 4 分钟前",
    sensitivity: "Internal",
    sensitivityLabel: "内部",
    coverageGap:
      "落地灯线在 Walmart 的广告 / 销售 / 搜索词数据,Company Brain 此前没有第一方接入。所有 Walmart 假设都依赖第三方 scrape(精度 ±20%)。",
    dataScope: {
      tables: [
        "campaigns",
        "ad_groups",
        "keywords",
        "daily_performance",
        "search_terms",
        "listings",
        "conversions",
        "audiences",
      ],
      historicalEvents: "12,400",
      backfillDays: 90,
      liveSyncInterval: "15 分钟",
    },
    implications: [
      "Amazon ↔ Walmart 跨平台分析(见 全渠道分配 会话)",
      "Walmart 专属竞品监控",
      "Ad architecture inspector 增加 Walmart tab(已自动接入)",
    ],
    milestones: [
      "Live sync 每 15 分钟一次 · 7 天内人工核对一次精度",
      "30 天数据后,自动触发跨平台 attribution 模型重训",
    ],
  },

  qa: {
    question: "对比刮胡刀和牙刷产品线的毛利。",
    sensitivity: "Confidential",
    sensitivityLabel: "机密",
    minClearance: "Sensitive",
    asker: "Sara Lin",
    askedAt: "May 13, 10:14",
    queryLatency: "1.2 秒",
    answer: {
      razor: {
        blended: "38%",
        breakdown: "刮胡刀 24% · 刀片 64%",
      },
      toothbrush: {
        blended: "42%",
        breakdown: "手柄 28% · 刀头 58%",
      },
      analysisZh:
        "两条产品线都远超 15% 底线。刮胡刀这边主要靠未来的绑定购买率增长(当前 47%);牙刷因为绑定购买率已经 78%,杠杆主要在单价 / 复购周期。",
    },
    sources: [
      {
        id: "src-pricing",
        label: "Pricing-Strategy-2026.xlsx · pp. 12–14",
        kind: "doc",
        detail: {
          methodology: "Sara Lin 维护的产品线毛利定价模型。每季度更新一次。",
          rows: [
            ["所属文档", "Pricing-Strategy-2026.xlsx"],
            ["页码", "pp. 12–14"],
            ["上传人", "Sara Lin · Apr 28"],
            ["敏感度", "机密"],
          ],
        },
      },
      {
        id: "src-pat-razor",
        label: "模式 · razor-blade 绑定购买率提升",
        kind: "pattern",
        detail: {
          methodology:
            "razor-blade 类 SKU,在购买周期窗口内对手柄做 7 天促销,刀片绑定购买率提升 2.4–3.1 pt。",
          rows: [
            ["置信度", "72%"],
            ["来源数", "4"],
            ["最近应用", "razor-blade 计划 · SKU-A 套装"],
            ["录入", "May 12"],
          ],
        },
      },
      {
        id: "src-pat-toothbrush",
        label: "模式 · 刀头绑定购买率耐久度",
        kind: "pattern",
        detail: {
          methodology:
            "牙刷线维持 78% 刀头绑定购买率已 14 个月,因刷头 3 个月一换的物理周期。模式提示:复购周期是绑定购买率耐久度的关键变量。",
          rows: [
            ["置信度", "79%"],
            ["来源数", "6"],
            ["最近应用", "牙刷 LTV 模型 · razor-blade 计划对照"],
            ["录入", "Mar 22"],
          ],
        },
      },
    ],
    relatedPatterns: [
      {
        id: "rel-pat-razor",
        name: "razor-blade 促销窗口拉动绑定购买率",
        category: "Strategy",
        confidencePct: 72,
        sensitivity: "Sensitive",
        sensitivityLabel: "敏感",
        addedAt: "May 12",
      },
      {
        id: "rel-pat-toothbrush",
        name: "刀头绑定购买率耐久度 · 复购周期驱动",
        category: "Strategy",
        confidencePct: 79,
        sensitivity: "Confidential",
        sensitivityLabel: "机密",
        addedAt: "Mar 22",
      },
      {
        id: "rel-pat-margin-floor",
        name: "毛利下限 15% · 配套产品线定价护栏",
        category: "Strategy",
        confidencePct: 83,
        sensitivity: "Sensitive",
        sensitivityLabel: "敏感",
        addedAt: "Feb 14",
      },
    ],
    maskedAnswerNote:
      "标记:机密。当前权限不足。L6 及以上的 敏感 权限可查看;如需访问请联系管理员。",
  },
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
    ROAS: METRIC_DEFINITIONS.roas,
    曝光份额: METRIC_DEFINITIONS.sov,
    客户终身价值: METRIC_DEFINITIONS.ltv,
    队列收入: METRIC_DEFINITIONS.cohortRevenue,
    产品线综合毛利率: METRIC_DEFINITIONS.blendedMargin,
    绑定购买率: METRIC_DEFINITIONS.attachRate,
    贡献毛利: METRIC_DEFINITIONS.contributionMargin,
    增量效果: METRIC_DEFINITIONS.incrementality,
    分地区对照测试: METRIC_DEFINITIONS.geographicHoldoutTest,
    成本上限竞价: METRIC_DEFINITIONS.costCapBidding,
    月曝光: METRIC_DEFINITIONS.impressions,
    转化率: METRIC_DEFINITIONS.cr,
  };
  const def = map[label];
  if (def) return <MetricTerm definition={def}>{label}</MetricTerm>;
  return label;
}

function tacosColorClass(value) {
  if (value < 20)  return "text-emerald-600";
  if (value <= 40) return "text-amber-600";
  return "text-rose-600";
}

function tacosBgClass(value) {
  if (value < 20)  return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (value <= 40) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

function TacosValue({ value, size = "md" }) {
  const colorCls = tacosColorClass(value);
  const sizeCls =
    size === "lg" ? "text-2xl" :
    size === "sm" ? "text-xs"  : "text-sm";
  return (
    <span
      className={`${colorCls} ${sizeCls} font-mono tabular-nums font-semibold`}
    >
      {value.toFixed(1)}%
    </span>
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
          <TacosValue value={p.tacos} size="sm" />
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

function AdGroupRow({ adGroup, expanded, onToggle, compact }) {
  const flaggedCount = adGroup.topKeywords.filter((k) => k.flagged).length;
  const colSpan = compact ? 6 : 8;
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
        {!compact && (
          <td className="py-2.5 px-3 text-right font-mono text-slate-700">
            ${adGroup.spend30d.toLocaleString()}
          </td>
        )}
        <td className="py-2.5 px-3 text-right font-mono text-slate-900 font-medium">
          ${adGroup.sales30d.toLocaleString()}
        </td>
        {!compact && (
          <td className="py-2.5 px-3 text-right">
            <TacosValue value={adGroup.tacos} size="sm" />
          </td>
        )}
        <td className="py-2.5 px-3 text-right font-mono text-slate-700">
          {adGroup.ctr}%
        </td>
        <td className="py-2.5 px-3 text-right font-mono text-slate-700">
          {adGroup.cr}%
        </td>
      </tr>
      {expanded && (
        <tr className="bg-slate-50/60">
          <td colSpan={colSpan} className="p-0">
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

function AdArchitectureTable({ panelWidth }) {
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const toggle = (id) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const compact = typeof panelWidth === "number" && panelWidth < 540;
  const s = STRATEGY.adArchitecture.summary;
  const allHeaders = [
    { label: "广告组 · 所属广告活动", align: "left" },
    { label: "定位数", align: "right" },
    { label: "日预算 $", align: "right" },
    { label: "30 天花费", align: "right" },
    { label: "30 天销售额", align: "right" },
    { label: "TACoS", align: "right" },
    { label: "CTR", align: "right" },
    { label: "CR", align: "right" },
  ];
  const colHeaders = compact
    ? allHeaders.filter(
        (h) => h.label !== "30 天花费" && h.label !== "TACoS",
      )
    : allHeaders;
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
              compact={compact}
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
            {!compact && (
              <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                ${s.spend30d.toLocaleString()}
              </td>
            )}
            <td className="py-2.5 px-3 text-right font-mono text-slate-900 font-semibold">
              ${s.sales30d.toLocaleString()}
            </td>
            {!compact && (
              <td className="py-2.5 px-3 text-right">
                <TacosValue value={s.tacos} size="sm" />
              </td>
            )}
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
                <td className="py-3 px-2 text-right align-top">
                  <TacosValue value={p.tacos} size="sm" />
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
          <div className="mt-0.5">
            <TacosValue value={insight.plan.summary.finalTacos} size="md" />
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

      <HeroImageStrip
        images={[
          {
            src: "/sku-a-hero.png",
            caption: "我方 SKU-A · 弧形落地灯主图",
            fallbackText: "等待上传 · 我方 SKU-A 主图",
            gallery: [
              "/sku-a-gallery-1.png",
              "/sku-a-gallery-2.png",
              "/sku-a-gallery-3.png",
              "/sku-a-gallery-4.png",
              "/sku-a-gallery-5.png",
            ],
          },
        ]}
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
/*  Omnichannel canvas — SKU-PB-A 移动充电宝                                  */
/* ────────────────────────────────────────────────────────────────────────── */

function BudgetEnvelopeStrip({ budget }) {
  const cur = budget.current;
  const inc = budget.incremental;
  const alloc = budget.allocation;
  const combinedTotal = alloc.reduce((sum, a) => sum + a.combined, 0);
  const pct = (n) => ((n / combinedTotal) * 100).toFixed(1);
  const barColor = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    slate: "bg-slate-500",
    muted: "bg-slate-700",
  };
  const dotColor = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    slate: "bg-slate-500",
    muted: "bg-slate-600",
  };
  return (
    <div className="bg-slate-900 text-white rounded-lg px-5 py-4">
      {/* Top layer: existing monthly ad spend */}
      <div className="flex items-baseline justify-between mb-2">
        <div className="text-11 uppercase tracking-wider text-slate-400 font-medium">
          现有月度广告投入
        </div>
        <div className="text-11 text-slate-400">
          合计{" "}
          <span className="font-mono text-white font-semibold">
            ${cur.total.toLocaleString()}
          </span>{" "}
          · 现状
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs">
        <div>
          <span className="text-slate-400">Amazon </span>
          <span className="font-mono text-white">
            ${cur.amazon.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-slate-400">Walmart </span>
          <span className="font-mono text-white">
            ${cur.walmart.toLocaleString()}
          </span>
        </div>
        <div>
          <span className="text-slate-400">TikTok </span>
          <span className="font-mono text-slate-500 italic">未投放</span>
        </div>
      </div>

      {/* Dashed divider */}
      <div className="border-t border-dashed border-slate-700 my-4" />

      {/* Bottom layer: combined monthly distribution */}
      <div className="flex items-baseline gap-2 mb-3 flex-wrap">
        <DollarSign className="w-4 h-4 text-emerald-400 self-center" />
        <span className="text-11 uppercase tracking-wider text-emerald-400 font-medium">
          + 增量预算
        </span>
        <span className="text-base font-mono font-semibold text-white">
          ${inc.toLocaleString()}
        </span>
        <span className="text-11 text-slate-400">
          · 合并后本月新分布
        </span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden bg-slate-800 mb-3">
        {alloc.map((a, i) => (
          <div
            key={i}
            className={barColor[a.color]}
            style={{ width: `${pct(a.combined)}%` }}
            title={`${a.channel} $${a.combined.toLocaleString()}`}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 text-11">
        {alloc.map((a, i) => (
          <div key={i} className="flex items-start gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                dotColor[a.color]
              } mt-1 flex-shrink-0`}
            />
            <div className="min-w-0">
              <div className="text-slate-400 uppercase tracking-wider font-medium">
                {a.channel}
              </div>
              <div className="font-mono text-white font-semibold mt-0.5">
                ${a.combined.toLocaleString()}
              </div>
              <div className="text-10 text-slate-400 mt-0.5 leading-snug">
                +${a.incremental.toLocaleString()} · {a.tag}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChannelStatusRow({ entries }) {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-md">
      {entries.map((e, i) => (
        <div key={i} className="flex items-baseline gap-2">
          <span className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            {e.label}
          </span>
          <span className="text-sm font-mono font-semibold text-slate-900">
            {e.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChannelBlock({
  index,
  channel,
  headline,
  subhead,
  lifecycle,
  toneTag,
  statusEntries,
  recommendedIncremental,
  recommendedDelta,
  approveLabel,
  children,
}) {
  return (
    <section className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <div className="px-5 py-4 border-b border-slate-200 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-slate-900 text-white flex items-center justify-center text-sm font-mono font-semibold flex-shrink-0">
              {index}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="text-11 uppercase tracking-wider text-emerald-700 font-semibold">
                  {channel}
                </div>
                <span className="text-slate-300">·</span>
                <span className="text-11 text-slate-500">{subhead}</span>
              </div>
              <div className="text-base font-semibold text-slate-900 tracking-tight">
                {headline}
              </div>
              <div className="text-11 text-slate-500 mt-1">{lifecycle}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">{toneTag}</div>
        </div>
      </div>

      <div className="px-5 pt-4">
        <ChannelStatusRow entries={statusEntries} />
      </div>

      <div className="px-5 pt-5 pb-5 space-y-5">{children}</div>

      <div className="px-5 py-3 border-t border-slate-200 bg-slate-50/40 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            推荐增量投入
          </span>
          <span className="text-base font-mono font-semibold text-emerald-700">
            +${recommendedIncremental.toLocaleString()}
          </span>
          {recommendedDelta && (
            <span className="text-11 text-slate-500">{recommendedDelta}</span>
          )}
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
            {approveLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

function AmazonInsightCard({ insight }) {
  return (
    <Card className="border-emerald-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-emerald-100 bg-emerald-50/40 flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Pill tone="emerald">Agent 可执行</Pill>
            <span className="text-11 text-slate-500">参考先例 + 3 阶段计划</span>
          </div>
          <div className="text-sm font-medium text-slate-900">
            {insight.title}
          </div>
          <div className="text-xs text-slate-600 mt-1 leading-relaxed">
            {insight.summary}
          </div>
        </div>
      </div>

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
          {insight.reference.caveat && (
            <div className="mt-2.5 pt-2.5 border-t border-slate-700">
              <div className="flex items-start gap-1.5 text-11 text-rose-300 bg-rose-900/30 border border-rose-800/50 px-2 py-1 rounded leading-relaxed">
                <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{insight.reference.caveat}</span>
              </div>
            </div>
          )}
        </div>
      </div>

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
                <td className="py-3 px-2 text-right align-top">
                  <TacosValue value={p.tacos} size="sm" />
                </td>
                <td className="py-3 px-2 text-right font-mono text-slate-900 font-medium align-top">
                  ${p.sales}K
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-5 py-3 grid grid-cols-3 gap-6">
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
          <div className="mt-0.5">
            <TacosValue value={insight.plan.summary.finalTacos} size="md" />
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

      <div className="px-5 py-2 border-t border-slate-100 bg-slate-50/40 flex items-center justify-end">
        <div className="text-11 text-slate-500">
          信心度{" "}
          <span className="font-mono text-slate-900 font-medium">
            {insight.confidence}%
          </span>{" "}
          · {insight.confidenceLabel}
        </div>
      </div>
    </Card>
  );
}

function WalmartInsightCard({ insight, index }) {
  return (
    <Card className="border-emerald-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-emerald-100 bg-emerald-50/40 flex items-start gap-3">
        <div className="w-7 h-7 rounded-md bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Pill tone="emerald">实验 #{index}</Pill>
            <span className="text-11 text-slate-500">Agent 可执行</span>
          </div>
          <div className="text-sm font-medium text-slate-900">
            {insight.title}
          </div>
          <div className="text-xs text-slate-600 mt-1 leading-relaxed">
            {insight.summary}
          </div>
        </div>
      </div>

      <div className="px-5 py-3 grid grid-cols-12 gap-x-4 gap-y-3 text-xs">
        <div className="col-span-12">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            处理方式
          </div>
          <div className="text-slate-700 leading-relaxed">{insight.treatment}</div>
        </div>
        <div className="col-span-6">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            样本量
          </div>
          <div className="text-slate-700 font-mono">{insight.sampleSize}</div>
        </div>
        <div className="col-span-6">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            周期
          </div>
          <div className="text-slate-700 font-mono">{insight.duration}</div>
        </div>
        <div className="col-span-12">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            成功指标
          </div>
          <div className="text-slate-700 leading-relaxed">
            {insight.successMetric}
          </div>
        </div>
        <div className="col-span-12">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            预算增量
          </div>
          <div className="text-slate-900 font-mono font-semibold">
            {insight.budget}
          </div>
        </div>
      </div>

      <div className="px-5 py-2 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
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
            className="inline-flex items-center gap-1.5 text-11 px-2 py-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded font-medium"
          >
            <X className="w-3 h-3" />
            拒绝
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-11 font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 px-2 py-1 rounded bg-white"
          >
            <Edit3 className="w-3 h-3" />
            修改
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-11 font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-2 py-1 rounded"
          >
            <Check className="w-3 h-3" />
            批准实验
          </button>
        </div>
      </div>
    </Card>
  );
}

function TikTokBiddingCard({ mechanisms, recommendation }) {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 hover:bg-slate-50"
      >
        <div className="flex items-center gap-2">
          {open ? (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-500" />
          )}
          <span className="text-sm font-medium text-slate-900">
            TikTok 竞价机制 · 3 种主要策略
          </span>
        </div>
        <span className="text-11 text-slate-500">
          {open ? "收起" : "展开了解机制差异"}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 space-y-3 border-t border-slate-100">
          {mechanisms.map((m, i) => {
            const isCostCap = m.name === "Cost Cap bidding";
            return (
              <div
                key={i}
                className="border border-slate-200 rounded-md px-4 py-3"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-sm font-medium text-slate-900">
                    {isCostCap ? (
                      <MetricTerm definition={METRIC_DEFINITIONS.costCapBidding}>
                        {m.name}
                      </MetricTerm>
                    ) : (
                      m.name
                    )}
                  </div>
                  {isCostCap && (
                    <Pill tone="emerald">本次建议</Pill>
                  )}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  {m.description}
                </div>
              </div>
            );
          })}
          <div className="bg-slate-900 text-white rounded-md px-4 py-3">
            <div className="text-11 uppercase tracking-wider text-emerald-400 font-medium mb-1">
              Agent 建议
            </div>
            <div className="text-xs text-slate-200 leading-relaxed">
              {recommendation}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function TikTokInsightCard({ insight }) {
  return (
    <Card className="border-emerald-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-emerald-100 bg-emerald-50/40 flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Pill tone="emerald">Agent 可执行</Pill>
            <span className="text-11 text-slate-500">8 周地区对照测试</span>
          </div>
          <div className="text-sm font-medium text-slate-900">
            {insight.title}
          </div>
          <div className="text-xs text-slate-600 mt-1 leading-relaxed">
            {insight.summary}
          </div>
        </div>
      </div>

      <div className="px-5 py-4 grid grid-cols-12 gap-x-4 gap-y-3 text-xs">
        <div className="col-span-12">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            假设
          </div>
          <div className="text-slate-700 leading-relaxed">
            {insight.hypothesis}
          </div>
        </div>
        <div className="col-span-12">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            处理方式 ·{" "}
            <MetricTerm definition={METRIC_DEFINITIONS.geographicHoldoutTest}>
              分地区对照测试
            </MetricTerm>
          </div>
          <div className="text-slate-700 leading-relaxed">
            {insight.treatment}
          </div>
        </div>
        <div className="col-span-6">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            样本量
          </div>
          <div className="text-slate-700 font-mono">{insight.sampleSize}</div>
        </div>
        <div className="col-span-6">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            周期
          </div>
          <div className="text-slate-700 font-mono">{insight.duration}</div>
        </div>
        <div className="col-span-12">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            成功指标
          </div>
          <div className="text-slate-700 leading-relaxed">
            {insight.successMetric}
          </div>
        </div>
        <div className="col-span-12">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            所需测试预算
          </div>
          <div className="text-slate-900 font-mono font-semibold">
            {insight.budget}
          </div>
        </div>
      </div>

      <div className="px-5 py-2 border-t border-slate-100 bg-slate-50/40 flex items-center justify-end">
        <div className="text-11 text-slate-500">
          信心度{" "}
          <span className="font-mono text-slate-900 font-medium">
            {insight.confidence}%
          </span>{" "}
          · {insight.confidenceLabel}
        </div>
      </div>
    </Card>
  );
}

function OmnichannelCanvas() {
  const O = OMNICHANNEL;
  const amazonStatus = [
    { label: "BSR", value: O.amazon.currentState.bsr },
    { label: "月销售额", value: O.amazon.currentState.monthlySales },
    {
      label: "TACoS",
      value: <TacosValue value={parseFloat(O.amazon.currentState.tacos)} size="sm" />,
    },
    {
      label: "已保持",
      value: `${O.amazon.currentState.bsrHeldDays} 天`,
    },
  ];
  const walmartStatus = [
    { label: "Walmart 花费 / 月", value: O.walmart.currentState.monthlySpend },
    {
      label: "TACoS",
      value: <TacosValue value={parseFloat(O.walmart.currentState.tacos)} size="sm" />,
    },
    {
      label: "CR",
      value: O.walmart.currentState.cr,
    },
  ];
  const tiktokStatus = [
    { label: "已花费", value: O.tiktok.currentState.spend },
    { label: "历史数据", value: O.tiktok.currentState.history },
    { label: "状态", value: O.tiktok.currentState.status },
  ];

  return (
    <>
      <CanvasHeader
        kicker="全渠道 · 移动充电宝"
        title="$100K 预算在 Amazon / Walmart / TikTok 三平台分配"
        meta={
          <>
            <Pill tone="slate">
              <Calendar className="w-3 h-3" />
              本月 · 5 月
            </Pill>
            <Pill tone="emerald">
              <ShieldCheck className="w-3 h-3" />
              由 {O.initiator} 于 {O.confirmedOn} 提出
            </Pill>
          </>
        }
      />

      <HeroImageStrip
        images={[
          {
            src: "/sku-pb-a-hero.png",
            caption: "我方 SKU-PB-A · 移动充电宝主图",
            fallbackText: "等待上传 · 我方 SKU-PB-A 主图",
          },
        ]}
      />

      <div className="px-6 pt-5">
        <div className="bg-amber-50/40 border border-amber-200 rounded-md px-5 py-4 mb-5">
          <div className="flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-11 uppercase tracking-wider text-amber-800 font-semibold mb-1">
                约束 · 价格全渠道锁定
              </div>
              <div className="text-sm text-amber-900 leading-relaxed">
                Amazon / Walmart / TikTok 售价统一,促销 / 降价不能作为杠杆。所有方案必须依靠 流量效率 + 广告结构 改进。
              </div>
            </div>
          </div>
        </div>
        <BudgetEnvelopeStrip budget={O.budget} />
      </div>

      <div className="px-6 pt-6 space-y-5">
        <ChannelBlock
          index="A"
          channel="Amazon"
          headline={O.amazon.headline}
          subhead={O.amazon.subhead}
          lifecycle={O.amazon.lifecycle}
          toneTag={
            <Pill tone="emerald">
              <TrendingUp className="w-3 h-3" />
              扩量
            </Pill>
          }
          statusEntries={amazonStatus}
          recommendedIncremental={O.amazon.recommendedIncremental}
          recommendedDelta={`现状 $35K → 共 $${(O.amazon.combinedAfter / 1000).toFixed(0)}K · +$28K 品牌广告`}
          approveLabel="批准 Amazon 方案"
        >
          <div>
            <SectionLabel kicker="季度目标 · BSR ≤ 5">
              与 BSR #1 的差距
            </SectionLabel>
            <div className="grid grid-cols-3 gap-3">
              {O.amazon.gaps.map((g, i) => (
                <GapCard key={i} gap={g} />
              ))}
            </div>
          </div>
          <div>
            <SectionLabel kicker="品牌广告持续扩量 → CPC 下行">
              Amazon 执行方案
            </SectionLabel>
            <AmazonInsightCard insight={O.amazon.insight} />
          </div>
        </ChannelBlock>

        <ChannelBlock
          index="B"
          channel="Walmart"
          headline={O.walmart.headline}
          subhead={O.walmart.subhead}
          lifecycle={O.walmart.lifecycle}
          toneTag={
            <Pill tone="blue">
              <ShieldCheck className="w-3 h-3" />
              效率优先
            </Pill>
          }
          statusEntries={walmartStatus}
          recommendedIncremental={O.walmart.recommendedIncremental}
          recommendedDelta={`现状 $18K → 共 $${(O.walmart.combinedAfter / 1000).toFixed(0)}K · 全部用于 3 项实验`}
          approveLabel="批准 Walmart 方案"
        >
          <div className="bg-rose-50 border border-rose-200 rounded-md px-4 py-3">
            <div className="flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-rose-700 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-11 uppercase tracking-wider text-rose-700 font-semibold mb-0.5">
                  约束 · 价格全渠道锁定
                </div>
                <div className="text-xs text-rose-900 leading-relaxed">
                  {O.walmart.constraint}
                </div>
              </div>
            </div>
          </div>
          <div>
            <SectionLabel kicker="3 项独立实验 · 可逐项批准">
              Walmart 实验方案
            </SectionLabel>
            <div className="space-y-3">
              {O.walmart.insights.map((ins, i) => (
                <WalmartInsightCard key={ins.id} insight={ins} index={i + 1} />
              ))}
            </div>
          </div>
        </ChannelBlock>

        <ChannelBlock
          index="C"
          channel="TikTok"
          headline={O.tiktok.headline}
          subhead={O.tiktok.subhead}
          lifecycle={O.tiktok.lifecycle}
          toneTag={
            <Pill tone="amber">
              <AlertCircle className="w-3 h-3" />
              验证阶段
            </Pill>
          }
          statusEntries={tiktokStatus}
          recommendedIncremental={O.tiktok.recommendedIncremental}
          recommendedDelta="从 0 启动 · 7 DMA holdout · 8 周窗口"
          approveLabel="批准 TikTok 测试"
        >
          <Card className="p-4">
            <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-2">
              TikTok 对本产品的作用
            </div>
            <div className="text-sm text-slate-700 leading-relaxed">
              TikTok 用户不是来直接买充电宝的 — TikTok 的价值在于通过场景化内容(露营 / 出差 / 演唱会等)扩大品类需求,下游被 Amazon / Walmart 收割。所以 TikTok 的{" "}
              {wrapMetric("ROAS")} 不应只看当下 (in-period),要看是否带来下游 Amazon + Walmart 销售增量(即{" "}
              <MetricTerm definition={METRIC_DEFINITIONS.incrementality}>
                增量效果
              </MetricTerm>
              )。
            </div>
          </Card>
          <TikTokBiddingCard
            mechanisms={O.tiktok.biddingMechanisms}
            recommendation={O.tiktok.recommendation}
          />
          <div>
            <SectionLabel kicker="测试 TikTok 的真实增量贡献">
              TikTok 执行方案
            </SectionLabel>
            <TikTokInsightCard insight={O.tiktok.insight} />
          </div>
        </ChannelBlock>
      </div>

      <div className="px-6 pt-6">
        <SectionLabel kicker="+$100K 增量 · 全部投入 · 合并后月度 $153K">
          跨渠道汇总
        </SectionLabel>
        <Card className="p-5">
          <div className="text-sm font-mono text-slate-900 mb-3">
            {O.crossChannel.totalSummary}
          </div>
          <div className="text-xs">
            <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
              复盘节奏
            </div>
            <div className="text-slate-700 leading-relaxed">
              {O.crossChannel.reviewCadence}
            </div>
          </div>
        </Card>
      </div>

      <div className="h-2" />
      <ReasoningSection reasoning={O.crossChannel.reasoning} />
      <ActionBar approveLabel="批准全部分配" />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Razor + blade pricing canvas — Henry's                                    */
/* ────────────────────────────────────────────────────────────────────────── */

function PhaseSection({ index, title, kicker, disabled, badge, children }) {
  return (
    <section
      className={`rounded-lg border ${
        disabled
          ? "border-slate-200 bg-slate-100"
          : "border-slate-200 bg-white"
      } overflow-hidden`}
    >
      <div
        className={`px-5 py-4 border-b ${
          disabled ? "border-slate-200" : "border-slate-200"
        } flex items-start justify-between gap-3`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-mono font-semibold flex-shrink-0 ${
              disabled
                ? "bg-slate-200 text-slate-500"
                : "bg-slate-900 text-white"
            }`}
          >
            {index}
          </div>
          <div>
            {kicker && (
              <div
                className={`text-11 uppercase tracking-wider font-semibold mb-1 ${
                  disabled ? "text-slate-500" : "text-emerald-700"
                }`}
              >
                {kicker}
              </div>
            )}
            <div
              className={`text-base font-semibold tracking-tight ${
                disabled ? "text-slate-600" : "text-slate-900"
              }`}
            >
              {title}
            </div>
          </div>
        </div>
        {badge && (
          <div className="pt-1 flex-shrink-0">
            {badge}
          </div>
        )}
      </div>
      <div
        className={`px-5 py-5 ${
          disabled ? "opacity-60" : ""
        }`}
        style={disabled ? { cursor: "not-allowed" } : undefined}
      >
        {children}
      </div>
    </section>
  );
}

function EconomicsCard({ label, price, priceNote, cogs, contributionValue, contributionPct, units }) {
  return (
    <Card className="p-4">
      <div className="text-11 uppercase tracking-wider text-emerald-700 font-semibold mb-2">
        {label}
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-baseline justify-between">
          <span className="text-slate-500">售价</span>
          <span className="font-mono text-slate-900 font-semibold">
            {price}
            {priceNote && (
              <span className="ml-1.5 text-11 text-slate-400 font-normal">
                {priceNote}
              </span>
            )}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-slate-500">COGS</span>
          <span className="font-mono text-slate-700">{cogs}</span>
        </div>
        <div className="border-t border-slate-100 pt-2 flex items-baseline justify-between">
          <span className="text-slate-700">
            <MetricTerm definition={METRIC_DEFINITIONS.contributionMargin}>
              贡献毛利
            </MetricTerm>
          </span>
          <span className="font-mono text-emerald-700 font-semibold">
            {contributionValue}
            <span className="ml-1.5 text-slate-500 font-normal">
              / {contributionPct}
            </span>
          </span>
        </div>
        <div className="flex items-baseline justify-between pt-1">
          <span className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            月销量 · 最近 30 天
          </span>
          <span className="font-mono text-slate-700 text-xs">{units}</span>
        </div>
      </div>
    </Card>
  );
}

function CompetitorBaselineCard({ competitor }) {
  return (
    <Card className="p-4">
      <div className="flex items-baseline justify-between mb-2">
        <div className="text-11 uppercase tracking-wider text-slate-600 font-semibold">
          {competitor.name}
        </div>
        <Pill tone="rose">{competitor.priceDeltaNote}</Pill>
      </div>
      <div className="space-y-1.5 text-xs">
        <div className="flex items-baseline justify-between">
          <span className="text-slate-500">刮胡刀价格</span>
          <span className="font-mono text-slate-900">{competitor.razorPrice}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-slate-500">刀头价格</span>
          <span className="font-mono text-slate-900">
            {competitor.bladePrice}
            <span className="ml-1.5 text-10 text-slate-400 font-normal">
              {competitor.bladePriceNote}
            </span>
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-slate-500">
            估算{" "}
            <MetricTerm definition={METRIC_DEFINITIONS.attachRate}>
              绑定购买率
            </MetricTerm>
          </span>
          <span className="font-mono text-slate-900">{competitor.estAttachRatePct}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-slate-500">
            估算{" "}
            <MetricTerm definition={METRIC_DEFINITIONS.ltv}>客户终身价值</MetricTerm>
          </span>
          <span className="font-mono text-emerald-700 font-semibold">{competitor.estLtv}</span>
        </div>
      </div>
      <div className="mt-3 pt-2.5 border-t border-slate-100 text-10 text-slate-500 leading-relaxed">
        {competitor.source}
      </div>
    </Card>
  );
}

function HeadroomBar({ currentPct, floorPct, priceFloorIfDrop }) {
  const max = 100;
  const floorLeft = (floorPct / max) * 100;
  const currentLeft = (currentPct / max) * 100;
  return (
    <div className="space-y-3">
      <div className="relative" style={{ height: "56px" }}>
        <div className="absolute inset-x-0 top-7 h-3 rounded-full overflow-hidden bg-slate-100 flex">
          <div
            className="bg-rose-200 h-full"
            style={{ width: `${floorLeft}%` }}
          />
          <div
            className="bg-emerald-500 h-full"
            style={{ width: `${currentLeft - floorLeft}%` }}
          />
          <div
            className="bg-slate-200 h-full"
            style={{ width: `${100 - currentLeft}%` }}
          />
        </div>
        <div
          className="absolute top-0 flex flex-col items-center"
          style={{ left: `${floorLeft}%`, transform: "translateX(-50%)" }}
        >
          <div className="text-10 uppercase tracking-wider text-rose-700 font-semibold whitespace-nowrap">
            下限 {floorPct}%
          </div>
          <div className="w-px h-7 bg-rose-700 mt-0.5" />
        </div>
        <div
          className="absolute top-0 flex flex-col items-center"
          style={{ left: `${currentLeft}%`, transform: "translateX(-50%)" }}
        >
          <div className="text-10 uppercase tracking-wider text-emerald-700 font-semibold whitespace-nowrap">
            当前 {currentPct}%
          </div>
          <div className="w-px h-7 bg-emerald-700 mt-0.5" />
        </div>
        <div className="absolute left-0 bottom-0 text-10 text-slate-400 font-mono">0%</div>
        <div className="absolute right-0 bottom-0 text-10 text-slate-400 font-mono">100%</div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-rose-50 border border-rose-200 rounded-md px-3 py-2">
          <div className="text-10 uppercase tracking-wider text-rose-700 font-semibold">
            0% — {floorPct}%
          </div>
          <div className="text-slate-700 mt-0.5">下限以下 · 禁区</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
          <div className="text-10 uppercase tracking-wider text-emerald-700 font-semibold">
            {floorPct}% — {currentPct}%
          </div>
          <div className="text-slate-700 mt-0.5">可用余量 · 可用于增长投入</div>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-md px-3 py-2">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-semibold">
            {currentPct}% — 100%
          </div>
          <div className="text-slate-600 mt-0.5">未触达 · 不在本议题范围</div>
        </div>
      </div>
      <div className="text-11 text-slate-500 leading-relaxed">
        刮胡刀挂牌价理论上可降至约{" "}
        <span className="font-mono text-slate-900">{priceFloorIfDrop}</span>{" "}
        触及产品线综合毛利率下限(假设销量与捆绑购买率响应到位)。
      </div>
    </div>
  );
}

function ExperimentCard({ experiment, index }) {
  const scenarioTone = {
    emerald: "border-emerald-200 bg-emerald-50/40",
    slate: "border-slate-200 bg-white",
    rose: "border-rose-200 bg-rose-50/40",
  };
  const scenarioLabelTone = {
    emerald: "text-emerald-700",
    slate: "text-slate-600",
    rose: "text-rose-700",
  };
  return (
    <Card className="border-emerald-200 overflow-hidden">
      <div className="px-5 py-3 border-b border-emerald-100 bg-emerald-50/40 flex items-start gap-3">
        <div className="w-7 h-7 rounded-md bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Pill tone="emerald">实验 {index}</Pill>
            <span className="text-11 text-slate-500">Agent 可执行 · Phase 2</span>
          </div>
          <div className="text-sm font-semibold text-slate-900">
            {experiment.title}
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/40">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-11 uppercase tracking-wider text-slate-500 font-medium">
            处理
          </span>
          <Pill tone="dark">{experiment.treatmentLabel}</Pill>
        </div>
        <div className="text-xs text-slate-700 mt-1.5 leading-relaxed">
          {experiment.treatmentDetail}
        </div>
      </div>

      <div className="px-5 py-3 grid grid-cols-12 gap-x-4 gap-y-3 text-xs border-b border-slate-100">
        <div className="col-span-12">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            假设
          </div>
          <div className="text-slate-700 leading-relaxed">{experiment.hypothesis}</div>
        </div>
        <div className="col-span-12">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            测试方法
          </div>
          <div className="text-slate-700 leading-relaxed">{experiment.testMethod}</div>
        </div>
        <div className="col-span-6">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            样本规模
          </div>
          <div className="text-slate-700 font-mono">{experiment.sampleSize}</div>
        </div>
        <div className="col-span-6">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            周期
          </div>
          <div className="text-slate-700 font-mono">{experiment.duration}</div>
        </div>
        <div className="col-span-12">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
            成功指标
          </div>
          <div className="text-slate-700 leading-relaxed">{experiment.successMetric}</div>
        </div>
      </div>

      <div className="px-5 py-3 border-b border-slate-100">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-emerald-700" />
          </div>
          <div className="flex-1">
            <div className="text-11 uppercase tracking-wider text-emerald-700 font-semibold">
              毛利检查通过
            </div>
            <div className="text-xs text-slate-700 mt-0.5 leading-relaxed">
              {experiment.marginCheck.detail}
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-b border-slate-100">
        <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-2">
          情景结果 · 下一步动作
        </div>
        <div className="grid grid-cols-3 gap-3">
          {experiment.scenarios.map((s, i) => (
            <div
              key={i}
              className={`rounded-md border px-3 py-2.5 ${scenarioTone[s.tone]}`}
            >
              <div
                className={`text-10 uppercase tracking-wider font-semibold ${scenarioLabelTone[s.tone]}`}
              >
                {s.label}
              </div>
              <div className="text-xs text-slate-900 font-medium mt-1 leading-snug">
                {s.summary}
              </div>
              <div className="mt-2 pt-2 border-t border-slate-200 text-11 text-slate-600 leading-relaxed">
                <span className="text-slate-500 font-medium">下一步 · </span>
                {s.nextMove}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-2 bg-slate-50/40 flex items-center justify-between">
        <div className="text-11 text-slate-500">
          置信度{" "}
          <span className="font-mono text-slate-900 font-medium">
            {experiment.confidence}%
          </span>{" "}
          · {experiment.confidenceLabel}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-11 px-2 py-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded font-medium"
          >
            <X className="w-3 h-3" />
            拒绝
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-11 font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 px-2 py-1 rounded bg-white"
          >
            <Edit3 className="w-3 h-3" />
            修改
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-11 font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-2 py-1 rounded"
          >
            <Check className="w-3 h-3" />
            批准实验
          </button>
        </div>
      </div>
    </Card>
  );
}

function DecisionTreeBranch({ branch, index }) {
  return (
    <div className="border border-slate-300 rounded-md bg-white">
      <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/40 flex items-start gap-3">
        <div className="w-6 h-6 rounded-md bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-mono font-semibold flex-shrink-0">
          {index}
        </div>
        <div className="flex-1">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
            条件
          </div>
          <div className="text-sm font-medium text-slate-700">{branch.condition}</div>
        </div>
      </div>
      <div className="px-4 py-3 flex items-start gap-2">
        <ArrowRight className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
            动作
          </div>
          <div className="text-xs text-slate-700 leading-relaxed">{branch.action}</div>
        </div>
      </div>
      {branch.riskCallout && (
        <div className="px-4 py-2.5 border-t border-rose-100 bg-rose-50/40 flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-rose-700 mt-0.5 flex-shrink-0" />
          <div className="text-11 text-rose-900 leading-relaxed">
            <span className="uppercase tracking-wider text-rose-700 font-semibold">
              风险 ·{" "}
            </span>
            {branch.riskCallout}
          </div>
        </div>
      )}
    </div>
  );
}

function RazorBladeCanvas() {
  const R = RAZOR_BLADE;
  const [competitorSourcesOpen, setCompetitorSourcesOpen] = useState(false);
  const [precedentSourcesOpen, setPrecedentSourcesOpen] = useState(false);
  return (
    <>
      <CanvasHeader
        kicker="刮胡刀 + 刀头 · Henry's"
        title={R.sku}
        meta={
          <>
            <Pill tone="slate">
              <Calendar className="w-3 h-3" />
              May · 本月
            </Pill>
            <Pill tone="emerald">
              <ShieldCheck className="w-3 h-3" />
              {R.initiator} 于 {R.confirmedOn} 提出
            </Pill>
            <Pill tone="slate">
              <Workflow className="w-3 h-3" />
              Phase 1 + 2 · Phase 3 待激活
            </Pill>
          </>
        }
      />

      <HeroImageStrip
        images={[
          {
            src: "/razor-blade-hero.png",
            caption: "我方 Henry's · 刀身 + 刀头主图",
            fallbackText: "等待上传 · Henry's 刀身 + 刀头主图",
          },
        ]}
      />

      <div className="px-6 pt-6 space-y-5">
        {/* PHASE 1 */}
        <PhaseSection
          index="1"
          kicker="Phase 1 · 基线诊断"
          title="产品线当前所在位置"
          badge={
            <Pill tone="emerald">
              <Check className="w-3 h-3" />
              诊断
            </Pill>
          }
        >
          <div className="space-y-5">
            {/* Section A: Economics */}
            <div>
              <SectionLabel kicker="我方经济结构 · 最近 30 天">
                先看自己
              </SectionLabel>
              <div className="grid grid-cols-2 gap-3">
                <EconomicsCard
                  label="刮胡刀"
                  price={R.economics.razor.price}
                  cogs={R.economics.razor.cogs}
                  contributionValue={R.economics.razor.contributionMarginValue}
                  contributionPct={R.economics.razor.contributionMarginPct}
                  units={R.economics.razor.monthlyUnits}
                />
                <EconomicsCard
                  label="刀头"
                  price={R.economics.blade.price}
                  priceNote={R.economics.blade.priceNote}
                  cogs={R.economics.blade.cogs}
                  contributionValue={R.economics.blade.contributionMarginValue}
                  contributionPct={R.economics.blade.contributionMarginPct}
                  units={R.economics.blade.monthlyUnits}
                />
              </div>
              <Card className="mt-3 p-4">
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-6 text-sm">
                  <div className="flex items-baseline justify-between">
                    <span className="text-slate-700">
                      <MetricTerm definition={METRIC_DEFINITIONS.attachRate}>
                        绑定购买率
                      </MetricTerm>
                      <span className="text-11 text-slate-500 ml-1.5">
                        · {R.economics.attachRateWindow}
                      </span>
                    </span>
                    <span className="font-mono text-slate-900 font-semibold">
                      {R.economics.attachRatePct}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-slate-700">
                      12 个月复购率
                      <span className="text-11 text-slate-500 ml-1.5">
                        · 刀头购买者
                      </span>
                    </span>
                    <span className="font-mono text-slate-900 font-semibold">
                      {R.economics.repeatRate}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-slate-700">
                      <MetricTerm definition={`${METRIC_DEFINITIONS.ltv} 公式 · ${R.economics.ltvFormula}。`}>
                        客户终身价值
                      </MetricTerm>
                      <span className="text-11 text-slate-500 ml-1.5">
                        · 每位获客刮胡刀买家
                      </span>
                    </span>
                    <span className="font-mono text-emerald-700 font-semibold">
                      {R.economics.ltv}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-slate-700">
                      产品线{" "}
                      <MetricTerm definition={METRIC_DEFINITIONS.blendedMargin}>
                        产品线综合毛利率
                      </MetricTerm>
                    </span>
                    <span className="font-mono text-emerald-700 font-semibold">
                      {R.economics.productLineBlendedMarginPct}
                      <span className="ml-2 text-11 text-emerald-700 font-normal">
                        远高于 {R.economics.marginFloorPct} 下限
                      </span>
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Section B: Competitor baselines */}
            <div>
              <SectionLabel kicker="价格爬取 + Amazon Brand Analytics 推断">
                看下竞品
              </SectionLabel>
              <div className="grid grid-cols-2 gap-3">
                {R.competitors.map((c, i) => (
                  <CompetitorBaselineCard key={i} competitor={c} />
                ))}
              </div>
              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCompetitorSourcesOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 rounded-md text-xs font-medium text-slate-700"
                >
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  查看竞品数据来源
                  <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Diagnosis callout */}
            <div className="bg-slate-900 text-white rounded-md px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-11 uppercase tracking-wider text-emerald-400 font-semibold mb-1.5">
                    诊断
                  </div>
                  <div className="text-sm font-semibold text-white mb-1.5 leading-snug">
                    {R.diagnosis.headline}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    {R.diagnosis.body}
                  </div>
                  <div className="text-xs text-white font-semibold mt-2 leading-relaxed">
                    {R.diagnosis.hypothesis}
                  </div>
                </div>
              </div>
            </div>

            {/* Section C: Headroom */}
            <div>
              <SectionLabel kicker="毛利下限 15%">
                还有多少空间
              </SectionLabel>
              <Card className="p-5">
                <HeadroomBar
                  currentPct={R.headroom.currentPct}
                  floorPct={R.headroom.floorPct}
                  priceFloorIfDrop={R.headroom.priceFloorIfDrop}
                />
                <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-700 leading-relaxed">
                  {R.headroom.narrative}
                </div>
              </Card>
            </div>
          </div>
        </PhaseSection>

        {/* PHASE 2 */}
        <PhaseSection
          index="2"
          kicker="Phase 2 · 定价实验"
          title="3 个并行测试 · A / B / C"
          badge={
            <Pill tone="emerald">
              <Sparkles className="w-3 h-3" />
              Agent 可执行
            </Pill>
          }
        >
          <div className="space-y-4">
            {/* Reference precedent */}
            <div>
              <SectionLabel>参考案例 · Company Brain</SectionLabel>
              <div className="bg-slate-900 text-white rounded-md px-5 py-4">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-2">
                  <Brain className="w-3.5 h-3.5 text-emerald-400" />
                  <div className="text-xs font-medium">{R.precedent.sku}</div>
                  <span className="text-11 text-slate-500">·</span>
                  <span className="text-11 text-slate-400 font-mono">
                    {R.precedent.period}
                  </span>
                  <span className="text-11 text-slate-500">·</span>
                  <span className="text-11 text-emerald-400 font-medium">
                    {R.precedent.outcome}
                  </span>
                </div>
                <div className="text-xs text-slate-200 leading-relaxed mb-2">
                  {R.precedent.summary}
                </div>
                <div className="text-11 text-slate-400 leading-relaxed">
                  方法 · {R.precedent.method}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-300 mt-0.5 flex-shrink-0" />
                    <div className="text-11 text-rose-200 leading-relaxed">
                      <span className="uppercase tracking-wider text-rose-300 font-semibold">
                        告诫 ·{" "}
                      </span>
                      {R.precedent.caveat}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 experiment cards */}
            <div className="space-y-3">
              {R.experiments.map((e, i) => (
                <ExperimentCard
                  key={e.id}
                  experiment={e}
                  index={String.fromCharCode(65 + i)}
                />
              ))}
            </div>
          </div>
        </PhaseSection>

        {/* PHASE 3 — disabled */}
        <PhaseSection
          index="3"
          kicker="Phase 3 · Phase 2 测试结束后激活"
          title="条件下一步 · 决策树"
          disabled
          badge={
            <Pill tone="amber">
              <Clock className="w-3 h-3" />
              待 Phase 2 结果
            </Pill>
          }
        >
          <div className="grid grid-cols-2 gap-3">
            {R.phase3DecisionTree.map((b, i) => (
              <DecisionTreeBranch key={i} branch={b} index={i + 1} />
            ))}
          </div>
        </PhaseSection>
      </div>

      <div className="h-2" />

      {/* Bottom action bar */}
      <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
              批准范围
            </div>
            <div className="text-xs text-slate-700 leading-relaxed max-w-2xl">
              {R.approval.summary}
            </div>
            <button
              type="button"
              onClick={() => setPrecedentSourcesOpen(true)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              查看参考案例数据来源
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </button>
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
              {R.approval.primaryLabel}
            </button>
          </div>
        </div>
      </div>

      <InspectionDrawer
        open={competitorSourcesOpen}
        onClose={() => setCompetitorSourcesOpen(false)}
        title="竞品数据来源 · 刮胡刀 + 刀头定价"
        methodologyDescription={R.competitorDataSources.methodology}
        tableHeaders={R.competitorDataSources.tableHeaders}
        tableRows={R.competitorDataSources.tableRows}
        columnWidths={R.competitorDataSources.columnWidths}
        definitionsList={R.competitorDataSources.definitionsList}
        definitionsLabel="来源告诫"
      />

      <InspectionDrawer
        open={precedentSourcesOpen}
        onClose={() => setPrecedentSourcesOpen(false)}
        title="参考案例数据来源 · 牙刷 Q2 2025"
        methodologyDescription={R.precedentDataSources.methodology}
        tableHeaders={R.precedentDataSources.tableHeaders}
        tableRows={R.precedentDataSources.tableRows}
        columnWidths={R.precedentDataSources.columnWidths}
        definitionsList={R.precedentDataSources.definitionsList}
        definitionsLabel="来源告诫"
      />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Launch CR 诊断画布 — 轮胎充气泵(皮卡)                                       */
/* ────────────────────────────────────────────────────────────────────────── */

const TEST_TYPE_STYLE = {
  image:   { bar: "bg-emerald-500", track: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-200", icon: ImageIcon,    label: "主图" },
  title:   { bar: "bg-slate-700",   track: "bg-slate-100",   text: "text-slate-700",   border: "border-slate-300",   icon: Type,         label: "标题" },
  aplus:   { bar: "bg-blue-500",    track: "bg-blue-100",    text: "text-blue-700",    border: "border-blue-200",    icon: LayoutTemplate, label: "A+" },
  bullets: { bar: "bg-amber-500",   track: "bg-amber-100",   text: "text-amber-700",   border: "border-amber-200",   icon: ListIcon,     label: "Bullets" },
};

function ClusterStatCard({ cluster, label }) {
  const flagged = cluster.status === "flagged";
  return (
    <Card className={`p-4 ${flagged ? "border-rose-300" : ""}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className={`text-10 uppercase tracking-wider font-semibold ${flagged ? "text-rose-700" : "text-emerald-700"}`}>
            {label}
          </div>
          <div className="text-sm font-semibold text-slate-900 mt-0.5">
            {cluster.name}
          </div>
        </div>
        {flagged ? (
          <Pill tone="rose">问题集群</Pill>
        ) : (
          <Pill tone="slate">达基准</Pill>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-mono font-semibold text-slate-900">
          {cluster.cr}
        </span>
        <span className="text-11 text-slate-500">{wrapMetric("CR")}</span>
        <span className="text-11 text-slate-400">·</span>
        <span className="text-11 text-slate-500 font-mono">
          基准 {cluster.benchmark}
        </span>
      </div>
      <div className={`mt-1 text-xs font-mono font-medium ${flagged ? "text-rose-700" : "text-slate-600"}`}>
        {cluster.gapPp} vs 基准
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 text-11 text-slate-500 space-y-1">
        <div className="flex items-baseline justify-between">
          <span>月曝光</span>
          <span className="font-mono text-slate-700">{cluster.impressions}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span>点击 · 转化</span>
          <span className="font-mono text-slate-700">
            {cluster.clicks} · {cluster.conversions}
          </span>
        </div>
        <div className="pt-1 text-slate-400 italic leading-relaxed">
          示例:{cluster.exampleTerms}
        </div>
      </div>
    </Card>
  );
}

function CompetitorMainImage({ competitor }) {
  const isSelf = competitor.type === "self";
  return (
    <div
      className={`rounded-md border ${isSelf ? "border-rose-200 bg-rose-50/30" : "border-slate-200 bg-slate-50"} overflow-hidden`}
    >
      <div
        className="flex items-center justify-center"
        style={{ aspectRatio: "1 / 1" }}
      >
        {isSelf ? (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <ImageIcon className="w-8 h-8" strokeWidth={1.5} />
            <div className="text-10 uppercase tracking-wider font-medium">
              纯产品图 · 白底
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <Truck className="w-8 h-8 text-slate-600" strokeWidth={1.5} />
            <div className="text-10 uppercase tracking-wider font-medium text-slate-600">
              皮卡场景
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HighlightedTitle({ title, highlights, mute }) {
  if (mute || !highlights || highlights.length === 0) {
    return <span>{title}</span>;
  }
  const escaped = highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = title.split(re);
  return parts.map((p, i) =>
    highlights.some((h) => h.toLowerCase() === p.toLowerCase()) ? (
      <span
        key={i}
        className="bg-emerald-100 text-emerald-800 px-1 rounded-sm font-medium"
      >
        {p}
      </span>
    ) : (
      <span key={i}>{p}</span>
    )
  );
}

function CompetitorColumn({ competitor }) {
  const isSelf = competitor.type === "self";
  return (
    <div
      className={`flex flex-col rounded-lg border overflow-hidden ${
        isSelf
          ? "border-rose-300 bg-rose-50/20"
          : "border-slate-200 bg-white"
      }`}
    >
      {/* Header */}
      <div
        className={`px-4 py-3 border-b ${
          isSelf ? "border-rose-200 bg-rose-50/40" : "border-slate-200 bg-slate-50/60"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className={`text-sm font-semibold ${isSelf ? "text-rose-800" : "text-slate-900"}`}>
            {competitor.name}
          </div>
          {isSelf ? (
            <Pill tone="rose">我方</Pill>
          ) : (
            <Pill tone="slate">竞品</Pill>
          )}
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Main image */}
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1.5">
            主图
          </div>
          <CompetitorMainImage competitor={competitor} />
          <div className={`mt-2 text-11 leading-relaxed ${isSelf ? "text-rose-800" : "text-slate-600"}`}>
            {competitor.mainImageNote}
          </div>
        </div>

        {/* Title */}
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1.5">
            标题
          </div>
          <div className="text-xs text-slate-900 leading-relaxed">
            <HighlightedTitle
              title={competitor.title}
              highlights={competitor.titleHighlights}
              mute={isSelf}
            />
          </div>
        </div>

        {/* Bullets */}
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1.5">
            前 5 条 bullets
          </div>
          <ol className="space-y-1.5 text-11 text-slate-700 leading-relaxed">
            {competitor.bulletPoints.map((b, i) => {
              const hit =
                !isSelf &&
                competitor.bulletHighlights.some((h) =>
                  b.toLowerCase().includes(h.toLowerCase())
                );
              return (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="font-mono text-slate-400 flex-shrink-0">
                    {i + 1}.
                  </span>
                  <span
                    className={
                      hit
                        ? "bg-emerald-100 text-emerald-800 px-1 rounded-sm font-medium"
                        : ""
                    }
                  >
                    {b}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* A+ */}
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1.5">
            A+ 首模块
          </div>
          <div
            className={`text-11 leading-relaxed rounded-md border px-2.5 py-2 ${
              isSelf
                ? "border-rose-200 bg-white text-rose-800"
                : "border-emerald-200 bg-emerald-50/40 text-emerald-900"
            }`}
          >
            {competitor.aplusFirstModule}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1.5">
            评论
          </div>
          <div className="flex items-center gap-3 text-11">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="font-mono font-semibold text-slate-900">
                {competitor.reviewsRating}
              </span>
            </span>
            <span className="text-slate-400">·</span>
            <span className="font-mono text-slate-700">
              {competitor.reviewsCount}
            </span>
            <span className="text-slate-400">条</span>
          </div>
          <div className="mt-1 text-11 text-slate-500">
            提及 truck 的评论 ·{" "}
            <span
              className={`font-mono ${
                isSelf ? "text-rose-700 font-semibold" : "text-slate-700"
              }`}
            >
              {competitor.truckMentionCount}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
            价格
          </div>
          <div className="text-right">
            <div className="text-sm font-mono font-semibold text-slate-900">
              {competitor.price}
            </div>
            <div className="text-10 text-slate-500 mt-0.5">
              {competitor.priceNote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HypothesisCard({ hypothesis }) {
  const [modifying, setModifying] = useState(false);
  const typeStyle = TEST_TYPE_STYLE[hypothesis.type];
  const TypeIcon = typeStyle.icon;
  const priorityTone = hypothesis.priority === "P0" ? "emerald" : "amber";
  return (
    <Card className="border-slate-200 overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/40 flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-md border flex items-center justify-center flex-shrink-0 ${typeStyle.border} bg-white`}
        >
          <TypeIcon className={`w-4 h-4 ${typeStyle.text}`} strokeWidth={1.75} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Pill tone="dark">{hypothesis.label}</Pill>
            <Pill tone={priorityTone}>{hypothesis.priority}</Pill>
            <span className="text-11 text-slate-500">{typeStyle.label}</span>
          </div>
          <div className="text-sm font-semibold text-slate-900 leading-snug">
            {hypothesis.title}
          </div>
        </div>
      </div>

      <div className="px-4 py-3 space-y-3 text-xs flex-1">
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
            动作
          </div>
          <div className="text-slate-700 leading-relaxed">
            {hypothesis.treatment}
          </div>
        </div>
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
            变量控制
          </div>
          <div className="text-slate-700 leading-relaxed">
            {hypothesis.variableControl}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
              样本量
            </div>
            <div className="text-slate-700 font-mono text-11 leading-relaxed">
              {hypothesis.sampleSize}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
              时长
            </div>
            <div className="text-slate-700 font-mono">{hypothesis.duration}</div>
          </div>
        </div>
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
            成功指标
          </div>
          <div className="text-slate-700 leading-relaxed">
            {hypothesis.successMetric}
          </div>
        </div>
        <div className="pt-2 border-t border-slate-100">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
            为什么能拉 CR
          </div>
          <div className="text-slate-700 leading-relaxed">
            {hypothesis.expectedImpact}
          </div>
        </div>
      </div>

      <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/40">
        {modifying ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="比如:把 F-150 换成 Silverado 场景"
              className="flex-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-md text-11 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
            <button
              type="button"
              onClick={() => setModifying(false)}
              className="text-11 text-slate-600 hover:text-slate-900 px-1.5"
            >
              取消
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-11 font-medium text-white bg-slate-900 hover:bg-slate-800 px-2 py-1 rounded"
            >
              <Send className="w-3 h-3" />
              发送
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="text-11 text-slate-500">
              置信度{" "}
              <span className="font-mono text-slate-900 font-medium">
                {hypothesis.confidence}%
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-11 px-1.5 py-1 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded font-medium"
              >
                <X className="w-3 h-3" />
                拒绝
              </button>
              <button
                type="button"
                onClick={() => setModifying(true)}
                className="inline-flex items-center gap-1 text-11 font-medium text-slate-700 border border-slate-300 hover:bg-slate-50 px-1.5 py-1 rounded bg-white"
              >
                <Edit3 className="w-3 h-3" />
                修改
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-11 font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-1.5 py-1 rounded"
              >
                <Check className="w-3 h-3" />
                批准
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function TestScheduleGantt({ schedule, hypotheses }) {
  const totalWeeks = 8;
  const colWidthPct = 100 / totalWeeks;
  const hypothesesById = Object.fromEntries(hypotheses.map((h) => [h.id, h]));
  return (
    <Card className="p-5">
      {/* Legend */}
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {Object.entries(TEST_TYPE_STYLE).map(([key, style]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span
              className={`inline-block w-3 h-3 rounded-sm ${style.bar}`}
            />
            <span className="text-11 text-slate-600">{style.label}</span>
          </div>
        ))}
      </div>

      {/* Header row · weeks */}
      <div className="relative">
        <div className="flex border-b border-slate-200 pb-1.5 mb-2 pl-32">
          {Array.from({ length: totalWeeks }, (_, i) => (
            <div
              key={i}
              className="text-10 uppercase tracking-wider text-slate-500 font-medium text-center"
              style={{ width: `${colWidthPct}%` }}
            >
              W{i + 1}
            </div>
          ))}
        </div>

        {/* Gantt rows */}
        <div className="space-y-2">
          {schedule.map((row) => {
            const hyp = hypothesesById[row.hypothesisId];
            const style = TEST_TYPE_STYLE[row.type];
            const startPct = ((row.startWeek - 1) / totalWeeks) * 100;
            const widthPct = ((row.endWeek - row.startWeek + 1) / totalWeeks) * 100;
            return (
              <div key={row.hypothesisId} className="flex items-center">
                <div className="flex items-center gap-1.5 text-11 font-medium text-slate-700 flex-shrink-0" style={{ width: "128px" }}>
                  <Pill tone="dark">{hyp.label}</Pill>
                  <span className={`${style.text}`}>{style.label}</span>
                </div>
                <div className={`flex-1 relative h-7 ${style.track} rounded-md`}>
                  <div
                    className={`absolute top-0 h-7 rounded-md ${style.bar} flex items-center px-2.5`}
                    style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                  >
                    <span className="text-10 font-mono font-semibold text-white">
                      W{row.startWeek} – W{row.endWeek} · {row.endWeek - row.startWeek + 1}w
                    </span>
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

function LaunchCRCanvas() {
  const L = LAUNCH_CR;
  const [clusteringOpen, setClusteringOpen] = useState(false);
  const pickupCluster = L.clusters.find((c) => c.id === "pickup");
  return (
    <>
      <CanvasHeader
        kicker="新品 CR 诊断 · 轮胎充气泵 · 皮卡市场"
        title={L.sku}
        meta={
          <>
            <Pill tone="slate">
              <Calendar className="w-3 h-3" />
              5 月 · 本月
            </Pill>
            <Pill tone="emerald">
              <ShieldCheck className="w-3 h-3" />
              {L.initiator} 于 {L.confirmedOn} 提出
            </Pill>
            <Pill tone="slate">
              <Workflow className="w-3 h-3" />
              诊断 + 4 项测试
            </Pill>
          </>
        }
      />

      <HeroImageStrip
        images={[
          {
            src: "/tire-inflator-hero.png",
            caption: "我方 SKU-TI-A · 轮胎充气泵主图",
            fallbackText: "等待上传 · 我方 SKU-TI-A 主图",
            descriptor: "我方主图(应用场景图:SUV · 摩托 · 轿车 · 篮球)",
            gallery: [
              "/tire-inflator-gallery-1.png",
              "/tire-inflator-gallery-2.png",
              "/tire-inflator-gallery-3.png",
              "/tire-inflator-gallery-4.png",
              "/tire-inflator-gallery-5.png",
            ],
          },
          {
            src: "/tire-inflator-competitor.png",
            caption: "头部竞品 · 轮胎充气泵主图",
            fallbackText: "等待上传 · 竞品主图",
            descriptor: "竞品主图(皮卡越野胎 · F-150 + Jeep · 容量数字 + US Patent)",
            gallery: [
              "/tire-inflator-competitor-gallery-1.png",
              "/tire-inflator-competitor-gallery-2.png",
              "/tire-inflator-competitor-gallery-3.png",
              "/tire-inflator-competitor-gallery-4.png",
              "/tire-inflator-competitor-gallery-5.png",
            ],
          },
        ]}
      />

      {/* Constraint callout · before 现状 */}
      <div className="px-6 pt-5">
        <div className="bg-amber-50/40 border border-amber-200 rounded-md px-5 py-4 mb-5">
          <div className="flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-11 uppercase tracking-wider text-amber-800 font-semibold mb-1">
                约束 · Listing 改动需要品牌创意团队
              </div>
              <div className="text-sm text-amber-900 leading-relaxed">
                {L.constraint}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. 现状 · 受众聚类 */}
      <div className="px-6">
        <SectionLabel kicker="3 个受众集群 · 皮卡是问题集群">
          1. 现状
        </SectionLabel>
        <div className="grid grid-cols-3 gap-3">
          {L.clusters.map((c, i) => (
            <ClusterStatCard
              key={c.id}
              cluster={c}
              label={`集群 ${i + 1}`}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={() => setClusteringOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 hover:border-slate-400 rounded-md text-xs font-medium text-slate-700"
          >
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            查看聚类逻辑
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 2. 具体问题 · 皮卡深拆 + 竞品 listing 拆解 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="皮卡集群 CR 比基准低 6.4pp 的原因">
          2. 具体问题
        </SectionLabel>

        {/* Pickup numbers row */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="p-4">
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              皮卡集群曝光 · 月度
            </div>
            <div className="mt-1 text-xl font-mono font-semibold text-slate-900">
              {L.pickupDeepDive.impressions}
            </div>
            <div className="text-11 text-slate-500 mt-1">
              {wrapMetric("CTR")}{" "}
              <span className="font-mono text-slate-700">
                {L.pickupDeepDive.ctr}
              </span>{" "}
              · 基准{" "}
              <span className="font-mono text-slate-700">
                {L.pickupDeepDive.ctrBenchmark}
              </span>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              点击
            </div>
            <div className="mt-1 text-xl font-mono font-semibold text-slate-900">
              {L.pickupDeepDive.clicks}
            </div>
            <div className="text-11 text-slate-500 mt-1">
              流量已经进来了 — 问题在下游。
            </div>
          </Card>
          <Card className="p-4 border-rose-300">
            <div className="text-10 uppercase tracking-wider text-rose-700 font-semibold">
              转化
            </div>
            <div className="mt-1 text-xl font-mono font-semibold text-rose-700">
              {L.pickupDeepDive.conversions}
            </div>
            <div className="text-11 text-slate-500 mt-1">
              {wrapMetric("CR")}{" "}
              <span className="font-mono text-rose-700 font-semibold">
                {pickupCluster.cr}
              </span>{" "}
              · 基准{" "}
              <span className="font-mono text-slate-700">
                {pickupCluster.benchmark}
              </span>
            </div>
          </Card>
        </div>

        {/* Lost revenue callout */}
        <div className="mt-3 bg-rose-50 border border-rose-200 rounded-md px-4 py-3 flex items-start gap-3">
          <DollarSign className="w-4 h-4 text-rose-700 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-11 uppercase tracking-wider text-rose-700 font-semibold mb-0.5">
              估算流失收入 ·{" "}
              <span className="font-mono">
                {L.pickupDeepDive.estLostRevenue}
              </span>
            </div>
            <div className="text-xs text-rose-900 leading-relaxed">
              {L.pickupDeepDive.estLostRevenueNote}
            </div>
          </div>
        </div>

        {/* Position split */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              自然排名 · 皮卡集群
            </div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-base font-mono font-semibold text-slate-900">
                平均 {L.pickupDeepDive.organicRankAvg}
              </span>
              <span className="text-11 text-slate-500">
                最佳{" "}
                <span className="font-mono text-slate-700">
                  {L.pickupDeepDive.organicRankBest}
                </span>
              </span>
            </div>
            <div className="text-11 text-slate-500 mt-1">
              我们在这些搜索词上有排名 · 可见度不是瓶颈。
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              广告位置 · 皮卡集群
            </div>
            <div className="mt-1 flex items-baseline gap-3">
              <span className="text-base font-mono font-semibold text-slate-900">
                平均 {L.pickupDeepDive.adPositionAvg}
              </span>
              <span className="text-11 text-slate-500">
                最佳{" "}
                <span className="font-mono text-slate-700">
                  {L.pickupDeepDive.adPositionBest}
                </span>
              </span>
            </div>
            <div className="text-11 text-slate-500 mt-1">
              我们花钱买到了曝光 · 点击有 · 就是不转化。
            </div>
          </Card>
        </div>

        {/* Audience profile */}
        <Card className="mt-3 p-4 bg-slate-50/60">
          <div className="flex items-start gap-2.5">
            <Users className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-10 uppercase tracking-wider text-slate-500 font-semibold mb-1">
                皮卡买家画像
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                {L.pickupDeepDive.audienceProfile}
              </div>
            </div>
          </div>
        </Card>

        {/* Competitive listing teardown */}
        <div className="mt-6">
          <SectionLabel kicker="并排对比 · Competitor A · Competitor B · 我方">
            竞品 listing 拆解
          </SectionLabel>
          <div className="grid grid-cols-3 gap-3 items-stretch">
            {L.competitors.map((c, i) => (
              <CompetitorColumn key={i} competitor={c} />
            ))}
          </div>
        </div>

        {/* Agent diagnosis callout */}
        <div className="mt-4 bg-slate-900 text-white rounded-md px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-11 uppercase tracking-wider text-emerald-400 font-semibold mb-1.5">
                问题在哪
              </div>
              <div className="text-sm text-white leading-relaxed mb-3">
                {L.agentDiagnosis.summary}
              </div>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-700">
                {L.agentDiagnosis.signals.map((s, i) => (
                  <div key={i}>
                    <div className="text-10 uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                      {s.label}
                    </div>
                    <div className="text-11 text-slate-300 leading-relaxed">
                      {s.gap}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 具体建议 · 4 项假设 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="4 项 listing 内容测试 · 2 个 P0 · 2 个 P1">
          3. 具体建议
        </SectionLabel>
        <div className="grid md:grid-cols-2 gap-3">
          {L.hypotheses.map((h) => (
            <HypothesisCard key={h.id} hypothesis={h} />
          ))}
        </div>
      </div>

      {/* 4. 里程碑 · 测试日程 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="8 周测试窗口 · 1 对并行 · 2 处顺序依赖">
          4. 里程碑
        </SectionLabel>
        <TestScheduleGantt schedule={L.schedule} hypotheses={L.hypotheses} />
        <div className="mt-3 space-y-2">
          {L.scheduleLogic.map((line, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
              <CornerDownRight className="w-3 h-3 text-slate-300 mt-1 flex-shrink-0" />
              <span>{line}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 text-11 text-slate-500 leading-relaxed italic">
          {L.scheduleTradeoff}
        </div>
      </div>

      <div className="h-2" />

      {/* Bottom approval bar */}
      <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0">
            <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-1">
              批准范围
            </div>
            <div className="text-xs text-slate-700 leading-relaxed max-w-2xl">
              {L.approval.summary}
            </div>
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
              {L.approval.primaryLabel}
            </button>
          </div>
        </div>
      </div>

      <InspectionDrawer
        open={clusteringOpen}
        onClose={() => setClusteringOpen(false)}
        title="搜索词聚类逻辑 · 轮胎充气泵"
        methodologyDescription={L.clusteringInspection.methodology}
        tableHeaders={L.clusteringInspection.tableHeaders}
        tableRows={L.clusteringInspection.tableRows}
        columnWidths={L.clusteringInspection.columnWidths}
        definitionsList={L.clusteringInspection.rules}
        definitionsLabel="集群规则"
      />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Defense canvas — agent-initiated, time-sensitive                          */
/* ────────────────────────────────────────────────────────────────────────── */

const THREAT_SIGNAL_ICONS = {
  DollarSign,
  TrendingUp,
  Clock,
};

function ThreatSignalCard({ signal }) {
  const Icon = THREAT_SIGNAL_ICONS[signal.icon] || AlertCircle;
  return (
    <Card className="p-4 flex flex-col h-full">
      <div className="flex items-start gap-2.5 mb-2">
        <div className="w-7 h-7 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center flex-shrink-0">
          <Icon className="w-3.5 h-3.5 text-rose-700" strokeWidth={1.75} />
        </div>
        <div className="text-sm font-semibold text-slate-900 leading-snug">
          {signal.title}
        </div>
      </div>
      <div className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
        {signal.lines.map((line, i) => (
          <div key={i} className="flex items-start gap-1.5">
            <CornerDownRight className="w-3 h-3 text-slate-300 mt-0.5 flex-shrink-0" />
            <span>{line}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function CompetitorTrendChart({ data }) {
  const charts = [
    {
      label: "NightFox 广告位置",
      dataKey: "adPosition",
      kicker: "数字越小越靠前 · 36 小时内由 #5 升到 #2",
      reversed: true,
      domain: [1, 6],
      stroke: "#e11d48",
      format: (v) => `#${v.toFixed(1)}`,
    },
    {
      label: "NightFox 自然排名",
      dataKey: "organicRank",
      kicker: "数字越小越靠前 · 由 #14 升到 #11",
      reversed: true,
      domain: [10, 16],
      stroke: "#b45309",
      format: (v) => `#${Math.round(v)}`,
    },
    {
      label: "NightFox 估算日销",
      dataKey: "estDailySales",
      kicker: "$K / 天 · 由 ~$1.8K 涨到 ~$3.4K",
      reversed: false,
      domain: [1.5, 3.8],
      stroke: "#0f766e",
      format: (v) => `$${v.toFixed(1)}K`,
    },
  ];
  return (
    <div className="grid grid-cols-3 gap-3">
      {charts.map((c) => (
        <Card key={c.dataKey} className="p-4">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
            {c.label}
          </div>
          <div className="text-11 text-slate-500 mt-0.5 leading-relaxed">
            {c.kicker}
          </div>
          <div className="mt-2" style={{ height: 96 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: "#64748b" }}
                  axisLine={{ stroke: "#cbd5e1" }}
                  tickLine={false}
                />
                <YAxis
                  reversed={c.reversed}
                  domain={c.domain}
                  tick={{ fontSize: 10, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                  tickFormatter={c.format}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    border: "1px solid #cbd5e1",
                    borderRadius: 6,
                    padding: "4px 8px",
                  }}
                  formatter={(value) => [c.format(value), c.label]}
                />
                <Line
                  type="monotone"
                  dataKey={c.dataKey}
                  stroke={c.stroke}
                  strokeWidth={2}
                  dot={{ r: 2.5, fill: c.stroke, strokeWidth: 0 }}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      ))}
    </div>
  );
}

function PostureCard({ posture, selected, onSelect }) {
  const isRecommended = posture.recommended;
  const borderClass = isRecommended
    ? "border-emerald-500 border-2"
    : selected
    ? "border-slate-400 border-2"
    : "border-slate-200";
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left bg-white rounded-lg ${borderClass} hover:border-slate-400 transition-colors overflow-hidden flex flex-col`}
    >
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/40">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          {isRecommended && (
            <Pill tone="emerald">
              <Sparkles className="w-3 h-3" />
              Agent 推荐
            </Pill>
          )}
          <Pill tone={posture.tone}>{posture.kind === "frontal" ? "正面顶" : posture.kind === "patient" ? "等一下" : "非对称"}</Pill>
          {selected && !isRecommended && (
            <span className="text-10 text-slate-500 font-medium">已选中</span>
          )}
        </div>
        <div className="text-sm font-semibold text-slate-900 leading-snug">
          {posture.name}
        </div>
        <div className="text-11 text-slate-500 mt-0.5 leading-relaxed">
          {posture.tagline}
        </div>
      </div>

      <div className="px-4 py-3 space-y-2.5 text-xs flex-1">
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
            打法
          </div>
          <div className="text-slate-700 leading-relaxed">{posture.approach}</div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
              代价
            </div>
            <div className="text-slate-700 leading-relaxed font-mono text-11">
              {posture.cost}
            </div>
          </div>
          <div>
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
              结果概率
            </div>
            <div className="text-slate-700 leading-relaxed text-11">
              {posture.outcomeProbability}
            </div>
          </div>
        </div>

        <div className="pt-1">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
            风险
          </div>
          <div className="text-slate-700 leading-relaxed text-11">{posture.risk}</div>
        </div>

        <div className="pt-1">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
            什么时候用
          </div>
          <div className="text-slate-700 leading-relaxed text-11 italic">
            {posture.recommendedWhen}
          </div>
        </div>

        {posture.reference && (
          <div className="bg-slate-900 text-white rounded-md px-3 py-2.5 mt-2">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mb-1">
              <Brain className="w-3 h-3 text-emerald-400 flex-shrink-0" />
              <span className="text-11 font-medium">公司大脑 · 先例</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mb-1">
              <span className="text-11 font-medium text-white">
                {posture.reference.sku}
              </span>
              <span className="text-10 text-slate-500">·</span>
              <span className="text-10 text-slate-400 font-mono">
                {posture.reference.period}
              </span>
            </div>
            <div className="text-11 text-emerald-400 font-medium mb-1.5 leading-relaxed">
              {posture.reference.outcome}
            </div>
            <div className="text-11 text-slate-300 leading-relaxed">
              {posture.reference.method}
            </div>
            <div className="mt-2 pt-2 border-t border-slate-700 flex items-center justify-between">
              <span className="text-10 text-slate-500">先例信心度</span>
              <span className="text-11 font-mono text-emerald-400 font-medium">
                {posture.reference.confidencePct}%
              </span>
            </div>
            <div className="mt-1.5 flex items-start gap-1.5 text-11 text-rose-300 bg-rose-900/30 border border-rose-800/50 px-2 py-1 rounded leading-relaxed">
              <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{posture.reference.compatibilityNote}</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
        <span className="text-11 text-slate-500">
          信心度{" "}
          <span className="font-mono text-slate-900 font-medium">
            {posture.confidence}%
          </span>
        </span>
        <span className="text-10 text-slate-500 leading-tight max-w-[55%] text-right">
          {posture.confidenceLabel}
        </span>
      </div>
    </button>
  );
}

function PostureDeepDive({ posture, deepDive }) {
  if (posture.id === "asymmetric") {
    const d = deepDive;
    return (
      <Card className="p-5">
        <div className="text-11 text-slate-500 leading-relaxed mb-4">
          {d.kicker}
        </div>

        <div className="mb-5">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-semibold mb-2">
            12 个目标长尾词 · 我方位置较强 · NightFox 较弱
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">关键词</th>
                  <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">我方广告位</th>
                  <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">NightFox 广告位</th>
                  <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">我方 {wrapMetric("CR")}</th>
                  <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">预计影响</th>
                </tr>
              </thead>
              <tbody>
                {d.targetKeywords.map((kw, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="py-2 px-2 text-slate-900 font-mono">{kw.keyword}</td>
                    <td className="py-2 px-2 text-right font-mono text-slate-700">{kw.ourAdPosition}</td>
                    <td className="py-2 px-2 text-right font-mono text-slate-500">{kw.competitorAdPosition}</td>
                    <td className="py-2 px-2 text-right font-mono text-slate-700">{kw.ourCr}</td>
                    <td className="py-2 px-2 text-right font-mono text-emerald-700 font-medium">{kw.projectedImpact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-5">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-semibold mb-2">
            出价调整 · 14 天窗口
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">关键词</th>
                  <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">当前出价</th>
                  <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">建议出价</th>
                  <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">日 $ 增量</th>
                </tr>
              </thead>
              <tbody>
                {d.bidChanges.map((b, i) => (
                  <tr key={i} className="border-b border-slate-100 last:border-0">
                    <td className="py-2 px-2 text-slate-900 font-mono">{b.keyword}</td>
                    <td className="py-2 px-2 text-right font-mono text-slate-500">{b.currentBid}</td>
                    <td className="py-2 px-2 text-right font-mono text-slate-900 font-medium">{b.proposedBid}</td>
                    <td className="py-2 px-2 text-right font-mono text-rose-700">{b.dailyDelta}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50/60">
                  <td className="py-2 px-2 text-10 uppercase tracking-wider text-slate-700 font-semibold">合计</td>
                  <td colSpan={2} />
                  <td className="py-2 px-2 text-right font-mono text-slate-900 font-semibold">{d.bidChangesTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-emerald-50/40 border border-emerald-200 rounded-md px-4 py-3">
          <div className="flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-11 uppercase tracking-wider text-emerald-800 font-semibold mb-1">
                对比型促销 · 不和他们在折扣率维度上比较
              </div>
              <div className="text-sm text-slate-900 font-medium mb-1">
                {d.promo.type}
              </div>
              <div className="text-xs text-slate-700 leading-relaxed mb-2">
                {d.promo.structure}
              </div>
              <div className="text-xs text-slate-700 leading-relaxed mb-2">
                <span className="text-10 uppercase tracking-wider text-emerald-800 font-semibold mr-1.5">为什么这个杠杆</span>
                {d.promo.rationale}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-2 pt-2 border-t border-emerald-200">
                <div>
                  <div className="text-10 uppercase tracking-wider text-slate-500 font-semibold mb-0.5">毛利影响</div>
                  <div className="text-11 text-slate-700 leading-relaxed">{d.promo.marginImpact}</div>
                </div>
                <div>
                  <div className="text-10 uppercase tracking-wider text-slate-500 font-semibold mb-0.5">执行门槛</div>
                  <div className="text-11 text-slate-700 leading-relaxed">{d.promo.executionGate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (posture.id === "defend-frontal") {
    const d = deepDive;
    return (
      <Card className="p-5">
        <div className="text-11 text-slate-500 leading-relaxed mb-4">
          {d.kicker}
        </div>
        <div className="text-10 uppercase tracking-wider text-slate-500 font-semibold mb-2">
          代价拆分 · 14 天窗口
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">动作</th>
                <th className="text-right text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">日 $ 增量</th>
                <th className="text-left text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">说明</th>
              </tr>
            </thead>
            <tbody>
              {d.costBreakdown.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 last:border-0">
                  <td className="py-2 px-2 text-slate-900">{row.line}</td>
                  <td className="py-2 px-2 text-right font-mono text-rose-700 font-medium">{row.dailyDelta}</td>
                  <td className="py-2 px-2 text-slate-600 leading-relaxed">{row.note}</td>
                </tr>
              ))}
              <tr className="bg-slate-50/60">
                <td className="py-2 px-2 text-10 uppercase tracking-wider text-slate-700 font-semibold">合计</td>
                <td colSpan={2} className="py-2 px-2 font-mono text-slate-900 font-semibold">{d.costTotal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  // wait-it-out
  const d = deepDive;
  return (
    <Card className="p-5">
      <div className="text-11 text-slate-500 leading-relaxed mb-4">
        {d.kicker}
      </div>
      <div className="text-10 uppercase tracking-wider text-slate-500 font-semibold mb-2">
        监控方案 · 触发即切到非对称反击
      </div>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">监控项</th>
              <th className="text-left text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">频率</th>
              <th className="text-left text-10 uppercase tracking-wider text-slate-500 font-medium py-2 px-2">触发条件</th>
            </tr>
          </thead>
          <tbody>
            {d.monitoringPlan.map((row, i) => (
              <tr key={i} className="border-b border-slate-100 last:border-0">
                <td className="py-2 px-2 text-slate-900">{row.item}</td>
                <td className="py-2 px-2 text-slate-700 font-mono">{row.frequency}</td>
                <td className="py-2 px-2 text-slate-700 leading-relaxed">{row.trigger}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50/60 border border-slate-200 rounded-md px-4 py-3 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
        <div className="text-xs text-slate-700 leading-relaxed">
          <span className="text-10 uppercase tracking-wider text-slate-500 font-semibold mr-1.5">备用反击</span>
          {d.readyResponse}
        </div>
      </div>
    </Card>
  );
}

function DefenseMilestoneTimeline({ milestones }) {
  return (
    <Card className="p-5">
      <div className="grid grid-cols-4 gap-3">
        {milestones.map((m, i) => (
          <div key={i} className="relative">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                <span className="text-11 font-mono font-semibold text-emerald-700">
                  {m.day}
                </span>
              </div>
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                {m.window}
              </div>
            </div>
            <div className="text-xs text-slate-900 font-medium leading-snug mb-1.5">
              {m.action}
            </div>
            <div className="flex items-start gap-1.5 text-11 text-slate-600 leading-relaxed">
              <CircleDot className="w-3 h-3 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>{m.gate}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function GalleryLightbox({ open, onClose, title, images }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full flex flex-col"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            {title} · 完整橱窗({images.length} 张)
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-2 gap-4">
            {images.map((src, i) => (
              <div
                key={i}
                className="aspect-square rounded-md border border-slate-200 bg-slate-100 overflow-hidden"
              >
                <img
                  src={src}
                  alt={`第 ${i + 1} 张`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroImageStrip({ images }) {
  const [openGallery, setOpenGallery] = useState(null);
  return (
    <div className="px-6 pt-5">
      <div
        className={`grid ${
          images.length === 1
            ? "grid-cols-1 max-w-xs"
            : "grid-cols-2 gap-4 max-w-2xl"
        } mx-auto`}
      >
        {images.map((img, i) => (
          <div key={i}>
            <div
              className="rounded-md border border-slate-200 bg-slate-100 flex items-center justify-center text-11 text-slate-500 text-center px-4 mx-auto"
              style={{ width: "280px", height: "280px" }}
            >
              {img.src ? (
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <span>{img.fallbackText}</span>
              )}
            </div>
            <div
              className="mt-2 text-11 text-slate-600 text-center mx-auto"
              style={{ width: "280px" }}
            >
              {img.caption}
            </div>
            {img.gallery && img.gallery.length > 0 && (
              <div
                className="mt-1 text-center mx-auto"
                style={{ width: "280px" }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenGallery({
                      images: img.gallery,
                      title: img.caption,
                    })
                  }
                  className="inline-flex items-center gap-1 text-11 text-emerald-700 hover:text-emerald-800 font-medium"
                >
                  查看完整橱窗 ({img.gallery.length} 张)
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {images.length === 2 && (
        <div className="mt-3 text-11 text-slate-600 text-center max-w-2xl mx-auto">
          {images[0].descriptor} · {images[1].descriptor}
        </div>
      )}
      <GalleryLightbox
        open={!!openGallery}
        onClose={() => setOpenGallery(null)}
        title={openGallery?.title || ""}
        images={openGallery?.images || []}
      />
    </div>
  );
}

function DefenseCanvas() {
  const D = DEFENSE;
  const [selectedPostureId, setSelectedPostureId] = useState("asymmetric");
  const selectedPosture = D.postures.find((p) => p.id === selectedPostureId);
  const selectedDeepDive = D.deepDive[selectedPostureId];
  const selectedMilestones = D.milestones[selectedPostureId];
  const recommendedPosture = D.postures.find((p) => p.recommended);

  return (
    <>
      <CanvasHeader
        kicker="防御 · BSR 守卫"
        title={`${D.sku} 受到 ${D.attacker} 攻击`}
        meta={
          <>
            <Pill tone="rose">
              <AlertCircle className="w-3 h-3" />
              监控警报 · {D.detectedAt}
            </Pill>
            <Pill tone="emerald">
              <Sparkles className="w-3 h-3" />
              Agent 监控中
            </Pill>
            <Pill tone="slate">
              <Workflow className="w-3 h-3" />
              3 个应对姿态
            </Pill>
          </>
        }
      />

      <HeroImageStrip
        images={[
          {
            src: "/sku-117-hero.png",
            caption: "我方 SKU-117 床架主图",
            fallbackText: "等待上传 · 我方 SKU-117 主图",
            descriptor: "我方主图(深灰亚麻 · 三层条纹床头板)",
            gallery: [
              "/sku-117-gallery-1.png",
              "/sku-117-gallery-2.png",
              "/sku-117-gallery-3.png",
              "/sku-117-gallery-4.png",
              "/sku-117-gallery-5.png",
            ],
          },
          {
            src: "/nightfox-hero.png",
            caption: "NightFox 床架主图",
            fallbackText: "等待上传 · NightFox 主图",
            descriptor: "NightFox 主图(灰色亚麻床头板 + 现代卧室实景)",
            gallery: [
              "/nightfox-gallery-1.png",
              "/nightfox-gallery-2.png",
              "/nightfox-gallery-3.png",
              "/nightfox-gallery-4.png",
              "/nightfox-gallery-5.png",
            ],
          },
        ]}
      />

      {/* Time-sensitive constraint callout · before 现状 */}
      <div className="px-6 pt-5">
        <div className="bg-rose-50 border border-rose-200 rounded-md px-5 py-4 mb-5">
          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-rose-700 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-11 uppercase tracking-wider text-rose-700 font-semibold mb-1">
                时间敏感 · 建议{D.timeSensitive.window}决策
              </div>
              <div className="text-sm text-rose-900 leading-relaxed">
                {D.timeSensitive.framing}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 1. 现状 */}
      <div className="px-6">
        <SectionLabel kicker={`SKU-117 当前 BSR ${D.currentState.ourBsr} · 守了 ${D.currentState.ourBsrHeldDays} 天`}>
          1. 现状 · Current state
        </SectionLabel>

        <div className="grid grid-cols-4 gap-3 mb-5">
          <Card className="p-4">
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              我方 BSR · 床架
            </div>
            <div className="mt-1 text-xl font-mono font-semibold text-slate-900">
              {D.currentState.ourBsr}
            </div>
            <div className="text-11 text-slate-500 mt-1">
              守了 <span className="font-mono">{D.currentState.ourBsrHeldDays}</span> 天
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              月销售额
            </div>
            <div className="mt-1 text-xl font-mono font-semibold text-slate-900">
              {D.currentState.ourSales}
            </div>
            <div className="text-11 text-slate-500 mt-1">参考基准</div>
          </Card>
          <Card className="p-4">
            <div className="text-10 uppercase tracking-wider text-emerald-700 font-semibold">
              {wrapMetric("TACoS")}
            </div>
            <div className="mt-1">
              <TacosValue value={D.currentState.ourTacos} size="lg" />
            </div>
            <div className="text-11 text-slate-500 mt-1">
              日广告 <span className="font-mono">${D.currentState.ourDailyAdSpend}</span>
            </div>
          </Card>
          <Card className="p-4 border-rose-300">
            <div className="text-10 uppercase tracking-wider text-rose-700 font-semibold">
              攻击方
            </div>
            <div className="mt-1 text-xl font-mono font-semibold text-rose-700">
              {D.currentState.attackerName}
            </div>
            <div className="text-11 text-rose-700 mt-1">
              {D.currentState.keywordCount} 核心词上的主要威胁
            </div>
          </Card>
        </div>
      </div>

      {/* 2. 背景 · CONTEXT (NEW) */}
      <div className="px-6 pt-2">
        <SectionLabel kicker="为什么这次值得反应 · 不是普通促销引流">
          2. 背景 · Context
        </SectionLabel>

        <div className="bg-slate-900 rounded-lg px-5 py-5 text-white">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 rounded-md bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
              <Brain className="w-4 h-4 text-emerald-400" strokeWidth={1.75} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-11 uppercase tracking-wider text-emerald-400 font-semibold mb-1">
                公司大脑 · 上下文
              </div>
              <div className="text-base font-semibold text-white leading-snug">
                {D.context.headline}
              </div>
            </div>
          </div>
          <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line mb-4">
            {D.context.body}
          </div>

          <div className="rounded-md bg-slate-800/70 border border-slate-700 px-4 py-3">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mb-1">
              <Brain className="w-3 h-3 text-emerald-400 flex-shrink-0" />
              <span className="text-11 font-medium text-white">公司大脑 · 同形态先例</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 mb-1.5">
              <span className="text-11 font-medium text-white">
                {D.context.inlinePrecedent.sku}
              </span>
              <span className="text-10 text-slate-500">·</span>
              <span className="text-10 text-slate-400 font-mono">
                {D.context.inlinePrecedent.period}
              </span>
            </div>
            <div className="text-11 text-slate-300 leading-relaxed mb-2">
              {D.context.inlinePrecedent.summary}
            </div>
            <div className="flex items-start gap-1.5 text-11 text-rose-300 bg-rose-900/30 border border-rose-800/50 px-2 py-1 rounded leading-relaxed">
              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              <span>{D.context.inlinePrecedent.lesson}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 具体问题 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="若不动 · 14 天内的预测">
          3. 具体问题 · Specific problem
        </SectionLabel>

        <div className="bg-rose-50 border border-rose-200 rounded-md px-5 py-4 mb-5">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md bg-rose-100 border border-rose-200 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-4 h-4 text-rose-700" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-11 uppercase tracking-wider text-rose-700 font-semibold mb-1">
                预测影响
              </div>
              <div className="text-base font-semibold text-rose-900 leading-snug mb-2">
                {D.projection.headline}
              </div>
              <div className="text-xs text-rose-900 leading-relaxed mb-3">
                {D.projection.body}
              </div>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-rose-200">
                <div>
                  <div className="text-10 uppercase tracking-wider text-rose-700 font-semibold mb-0.5">
                    估算销售流失
                  </div>
                  <div className="text-base font-mono font-semibold text-rose-900">
                    {D.projection.revenueLoss}
                  </div>
                  <div className="text-11 text-rose-700 mt-0.5 leading-relaxed">
                    {D.projection.revenueLossNote}
                  </div>
                </div>
                <div>
                  <div className="text-10 uppercase tracking-wider text-rose-700 font-semibold mb-0.5">
                    预测信心度
                  </div>
                  <div className="text-base font-mono font-semibold text-rose-900">
                    {D.projection.confidence}%
                  </div>
                  <div className="text-11 text-rose-700 mt-0.5 leading-relaxed">
                    {D.projection.confidenceNote}
                  </div>
                </div>
                <div>
                  <div className="text-10 uppercase tracking-wider text-rose-700 font-semibold mb-0.5">
                    关键假设
                  </div>
                  <div className="text-11 text-rose-900 leading-relaxed">
                    {D.projection.assumption}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-5">
          <SectionLabel kicker="3 条独立信号 · 都指向同一个方向">
            攻击信号
          </SectionLabel>
          <div className="grid grid-cols-3 gap-3">
            {D.attackSignals.map((s) => (
              <ThreatSignalCard key={s.id} signal={s} />
            ))}
          </div>
        </div>

        <div>
          <SectionLabel kicker="过去 36 小时 · 数字越靠左越早">
            {D.trendChartTitle}
          </SectionLabel>
          <CompetitorTrendChart data={D.competitorTrend} />
        </div>
      </div>

      {/* 4. 具体建议 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="3 个姿态 · 点击切换深拆 · 推荐项已高亮">
          4. 具体建议 · Recommendation
        </SectionLabel>
        <div className="grid grid-cols-3 gap-3 items-stretch">
          {D.postures.map((p) => (
            <PostureCard
              key={p.id}
              posture={p}
              selected={selectedPostureId === p.id}
              onSelect={() => setSelectedPostureId(p.id)}
            />
          ))}
        </div>

        <div className="mt-4">
          <SectionLabel kicker={`姿态深拆 · ${selectedPosture.name}`}>
            选中姿态
          </SectionLabel>
          <PostureDeepDive posture={selectedPosture} deepDive={selectedDeepDive} />
        </div>
      </div>

      {/* 5. 里程碑 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker={`W1-2 日程 · ${selectedPosture.name}`}>
          5. 里程碑 · Milestones
        </SectionLabel>
        <DefenseMilestoneTimeline milestones={selectedMilestones} />
        {selectedPostureId === "asymmetric" && (
          <div className="mt-3 text-11 text-slate-500 leading-relaxed italic">
            {D.milestonesTradeoff}
          </div>
        )}
      </div>

      <div className="h-2" />

      <ReasoningSection reasoning={D.reasoning} />

      {/* Time-sensitive approval bar */}
      <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-4">
        <div className="flex items-start gap-2 mb-3 bg-rose-50 border border-rose-200 rounded-md px-3 py-2">
          <Clock className="w-3.5 h-3.5 text-rose-700 mt-0.5 flex-shrink-0" />
          <div className="flex-1 text-11 text-rose-900 leading-relaxed">
            <span className="uppercase tracking-wider text-rose-700 font-semibold mr-1.5">
              {D.approval.timeSensitiveLabel}
            </span>
            <span className="text-rose-800">· NightFox 折扣券约 {D.timeSensitive.expiresIn}后到期</span>
          </div>
        </div>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="min-w-0 max-w-xl text-xs text-slate-700 leading-relaxed">
            当前选中:<span className="font-medium text-slate-900">{selectedPosture.name}</span>{" "}
            · 信心度 <span className="font-mono">{selectedPosture.confidence}%</span>
            {selectedPostureId !== "asymmetric" && (
              <span className="text-slate-500">
                {" "}· Agent 推荐切回「{recommendedPosture.name}」
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              className="text-11 font-medium text-slate-500 hover:text-slate-700 px-2"
            >
              升级到人工审核
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md"
            >
              <Edit3 className="w-3.5 h-3.5" />
              修改
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-100 rounded-md bg-white"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              {D.approval.secondaryLabel}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md"
            >
              <Check className="w-3.5 h-3.5" />
              {selectedPostureId === "asymmetric"
                ? D.approval.primaryLabel
                : `批准「${selectedPosture.name}」`}
            </button>
          </div>
        </div>
      </div>
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

function TopBar({
  onToggleTab,
  inspectorOpen,
  inspectorTab,
  locale,
  setLocale,
}) {
  const adArchActive = inspectorOpen && inspectorTab === "ad-architecture";
  const brainActive = inspectorOpen && inspectorTab === "company-brain";
  const outcomesActive = inspectorOpen && inspectorTab === "outcomes";
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
            TACoS <TacosValue value={19.4} size="sm" />
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
          onClick={() => onToggleTab("ad-architecture")}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${
            adArchActive
              ? "bg-slate-900 border border-slate-900"
              : "border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <ListTree
            className={`w-3.5 h-3.5 ${
              adArchActive ? "text-white" : "text-slate-600"
            }`}
          />
          <span
            className={`text-11 font-medium ${
              adArchActive ? "text-white" : "text-slate-700"
            }`}
          >
            广告架构
          </span>
        </button>
        <button
          type="button"
          onClick={() => onToggleTab("company-brain")}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${
            brainActive
              ? "bg-slate-900 border border-slate-900"
              : "border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Brain
            className={`w-3.5 h-3.5 ${
              brainActive ? "text-white" : "text-slate-600"
            }`}
          />
          <span
            className={`text-11 font-medium ${
              brainActive ? "text-white" : "text-slate-700"
            }`}
          >
            公司大脑
          </span>
        </button>
        <button
          type="button"
          onClick={() => onToggleTab("outcomes")}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md ${
            outcomesActive
              ? "bg-slate-900 border border-slate-900"
              : "border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <BarChart3
            className={`w-3.5 h-3.5 ${
              outcomesActive ? "text-white" : "text-slate-600"
            }`}
          />
          <span
            className={`text-11 font-medium ${
              outcomesActive ? "text-white" : "text-slate-700"
            }`}
          >
            结果
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
  const userThreads = THREADS.filter(
    (t) => t.initiator === "user" && t.category !== "brain-ops",
  );
  const brainOpsThreads = THREADS.filter(
    (t) => t.initiator === "user" && t.category === "brain-ops",
  );
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

        {brainOpsThreads.length > 0 && (
          <div>
            <div className="px-1 mb-2 flex items-center gap-2">
              <ChevronDown className="w-3 h-3 text-slate-500" />
              <span className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                品牌大脑操作
              </span>
            </div>
            <div className="space-y-2">
              {brainOpsThreads.map((thread) => (
                <ThreadCard
                  key={thread.id}
                  thread={thread}
                  active={activeId === thread.id}
                  onSelect={onSelect}
                  tone="brain-ops"
                />
              ))}
            </div>
          </div>
        )}
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

function ThreadCard({ thread, active, onSelect, tone }) {
  const isAgent = thread.initiator === "agent";
  const isBrainOps = tone === "brain-ops";
  const lastTurn = thread.turns[thread.turns.length - 1];
  const previewBody = lastTurn?.body || "";

  return (
    <div
      className={`rounded-lg border transition-colors ${
        active
          ? "bg-slate-50 border-slate-300"
          : isBrainOps
            ? "bg-slate-100/60 border-slate-200 hover:border-slate-300"
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
  const userInitials = turn.initials || thread.initials || "U";
  const userName = turn.name || thread.initiatorName;
  return (
    <div className="flex items-start gap-2">
      {isAgent ? (
        <div className="w-5 h-5 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-2.5 h-2.5 text-emerald-400" />
        </div>
      ) : (
        <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-10 font-semibold text-slate-700 flex-shrink-0">
          {userInitials}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-11 font-medium text-slate-900">
            {isAgent ? "Agent" : userName}
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

function AdArchitectureContent({ panelWidth }) {
  const s = STRATEGY.adArchitecture.summary;
  const compact = typeof panelWidth === "number" && panelWidth < 540;
  return (
    <>
      <div className="px-5 py-3 border-b border-slate-200 bg-slate-50/40 flex items-center gap-2 flex-shrink-0">
        <ListTree className="w-4 h-4 text-slate-700" />
        <span className="text-xs text-slate-600">SKU-A</span>
        <Pill tone="slate">线上</Pill>
      </div>

      <div
        className={`px-5 py-3 border-b border-slate-200 grid gap-4 flex-shrink-0 ${
          compact ? "grid-cols-3" : "grid-cols-6"
        }`}
      >
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
          <div className="mt-0.5">
            <TacosValue value={s.tacos} size="lg" />
          </div>
        </div>
      </div>

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

      <div className="flex-1 overflow-y-auto px-5 py-4">
        <AdArchitectureTable panelWidth={panelWidth} />
      </div>
    </>
  );
}

const SENSITIVITY_LABEL_ZH = {
  Public: "公开",
  Internal: "内部",
  Sensitive: "敏感",
  Confidential: "机密",
};

const SENSITIVITY_TAGS = {
  Public: {
    tone: "slate",
    label: "公开",
    minClearance: "Public",
    minRole: "任何人",
  },
  Internal: {
    tone: "blue",
    label: "内部",
    minClearance: "Internal",
    minRole: "L5+ 且具备内部权限",
  },
  Sensitive: {
    tone: "emerald",
    label: "敏感",
    minClearance: "Sensitive",
    minRole: "L6+ 且具备敏感权限",
  },
  Confidential: {
    tone: "rose",
    label: "机密",
    minClearance: "Confidential",
    minRole: "L7+ 且具备机密权限",
  },
};

const SENSITIVITY_TONE = Object.fromEntries(
  Object.entries(SENSITIVITY_TAGS).map(([k, v]) => [k, v.tone]),
);

const CLEARANCE_TONE = SENSITIVITY_TONE;

const CLEARANCE_ORDER = ["Public", "Internal", "Sensitive", "Confidential"];
function canView(userClearance, contentSensitivity) {
  return (
    CLEARANCE_ORDER.indexOf(userClearance) >=
    CLEARANCE_ORDER.indexOf(contentSensitivity)
  );
}

function MaskedItem({ tag = "Internal", layout = "inline", iconSize = 14 }) {
  const meta = SENSITIVITY_TAGS[tag] || SENSITIVITY_TAGS.Internal;
  if (layout === "card") {
    return (
      <div className="border border-rose-200 bg-rose-50/40 rounded-md py-6 px-5">
        <div className="flex items-start gap-3 max-w-xl mx-auto">
          <Lock
            className="text-rose-700 flex-shrink-0 mt-0.5"
            style={{ width: iconSize + 4, height: iconSize + 4 }}
          />
          <div className="flex-1 min-w-0">
            <div className="text-10 uppercase tracking-wider text-rose-700 font-semibold">
              标签:{meta.label}
            </div>
            <div className="text-sm text-rose-900 leading-relaxed mt-1">
              当前权限下受限 · 需 {meta.minRole} 可访问。
            </div>
            <div className="text-11 text-slate-600 leading-relaxed mt-1.5">
              切换演示用户以查看此内容。
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-rose-50 border-l-2 border-rose-200 pl-2 pr-2 py-1 rounded-r-md flex items-center gap-1.5">
      <Lock
        className="text-rose-700 flex-shrink-0"
        style={{ width: iconSize - 2, height: iconSize - 2 }}
      />
      <span className="text-10 uppercase tracking-wider text-rose-700 font-medium">
        标签:{meta.label}
      </span>
      <span className="text-11 text-rose-800 leading-snug truncate">
        当前权限下受限 · 需 {meta.minRole}。
      </span>
    </div>
  );
}

function countRestrictedItems(activeClearance, brain) {
  let n = 0;
  const check = (s) => !canView(activeClearance, s);
  (brain.recentActivity || []).forEach((x) => x.sensitivity && check(x.sensitivity) && n++);
  (brain.connectors || []).forEach((x) => x.sensitivity && check(x.sensitivity) && n++);
  (brain.uploadedDocs || []).forEach((x) => x.sensitivity && check(x.sensitivity) && n++);
  (brain.patterns || []).forEach((x) => x.sensitivity && check(x.sensitivity) && n++);
  (brain.playbookList || []).forEach((x) => x.sensitivity && check(x.sensitivity) && n++);
  (brain.decisionClassesDetail || []).forEach(
    (x) => !x.revoked && x.sensitivity && check(x.sensitivity) && n++,
  );
  (brain.recentQueries || []).forEach((x) => x.sensitivity && check(x.sensitivity) && n++);
  return n;
}

const CONNECTOR_STATUS_TONE = {
  live: "emerald",
  syncing: "blue",
  paused: "rose",
  auth_required: "rose",
};
const CONNECTOR_STATUS_LABEL = {
  live: "在线",
  syncing: "同步中",
  paused: "已暂停",
  auth_required: "需重新授权",
};
const CONNECTOR_TYPE_LABEL = {
  api: "API",
  scrape: "抓取",
  file: "文件",
};

const DOC_STATUS_TONE = {
  indexed: "emerald",
  processing: "blue",
  no_patterns: "slate",
  queued: "amber",
};
const DOC_STATUS_LABEL = {
  indexed: "已索引",
  processing: "处理中",
  no_patterns: "无模式",
  queued: "排队中",
};

const PATTERN_CATEGORY_TONE = {
  Strategy: "emerald",
  Optimization: "blue",
  Execution: "slate",
  Launch: "amber",
  Defense: "rose",
};
const PATTERN_CATEGORY_LABEL = {
  Strategy: "策略",
  Optimization: "优化",
  Execution: "执行",
  Launch: "上新",
  Defense: "防御",
};

const DEFAULT_CATEGORY_LABEL = {
  Operations: "运营",
  Budget: "预算",
  Voice: "语气",
  Quality: "质量",
};

function BrainSection({ id, title, count, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const lastDefault = useRef(defaultOpen);
  useEffect(() => {
    if (lastDefault.current !== defaultOpen) {
      lastDefault.current = defaultOpen;
      if (defaultOpen) setOpen(true);
    }
  }, [defaultOpen]);
  return (
    <section id={id} className="border-b border-slate-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-slate-50 text-left"
      >
        <ChevronRight
          className={`w-4 h-4 text-slate-500 transition-transform ${open ? "rotate-90" : ""}`}
        />
        <span className="text-sm font-semibold text-slate-900">{title}</span>
        {typeof count === "number" && (
          <span className="ml-auto inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-11 font-mono tabular-nums">
            {count}
          </span>
        )}
      </button>
      {open && (
        <div className="border-t border-slate-200 px-4 pb-4 pt-3">
          {children}
        </div>
      )}
    </section>
  );
}

function IdentityCard({ identity, onSwitchUser }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const active = identity.users.find((u) => u.id === identity.activeUserId) || identity.users[0];
  return (
    <div className="px-4 py-4 border-b border-slate-200 bg-white">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-semibold text-sm flex items-center justify-center flex-shrink-0">
          {active.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-slate-900">{active.name}</div>
          <div className="text-11 text-slate-600 mt-0.5">
            {active.role} · {active.level}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-10 uppercase tracking-wider text-slate-500 font-medium">
              权限
            </span>
            <Pill tone={CLEARANCE_TONE[active.clearance] || "slate"}>
              {active.clearanceLabel || active.clearance}
            </Pill>
          </div>
          <div className="mt-3 relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="inline-flex items-center gap-1 text-11 text-slate-600 hover:text-slate-900"
            >
              切换演示用户
              <ChevronDown className="w-3 h-3" />
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-md shadow-lg z-20">
                {identity.users.map((u) => {
                  const isActive = u.id === active.id;
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => {
                        onSwitchUser(u.id);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-50 border-b border-slate-100 last:border-b-0 ${
                        isActive ? "bg-slate-50" : ""
                      }`}
                    >
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-semibold text-11 flex items-center justify-center flex-shrink-0">
                        {u.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-slate-900">
                          {u.name}
                        </div>
                        <div className="text-10 text-slate-500">
                          {u.level} · {u.clearanceLabel || u.clearance}
                        </div>
                      </div>
                      {isActive && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BrainStatStrip() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div>
        <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
          决策类别
        </div>
        <div className="text-xl font-mono tabular-nums font-semibold text-slate-900 mt-1">
          {COMPANY_BRAIN.decisionClasses}
        </div>
      </div>
      <div>
        <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
          打法库
        </div>
        <div className="text-xl font-mono tabular-nums font-semibold text-slate-900 mt-1">
          {COMPANY_BRAIN.playbooks}
        </div>
      </div>
      <div>
        <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
          已捕获模式
        </div>
        <div className="text-xl font-mono tabular-nums font-semibold text-slate-900 mt-1">
          {COMPANY_BRAIN.capturedPatterns}
        </div>
      </div>
    </div>
  );
}

function ActivityIcon({ kind }) {
  if (kind === "extraction") {
    return (
      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
        <FileText className="w-3.5 h-3.5" />
      </div>
    );
  }
  if (kind === "ingestion") {
    return (
      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
        <Activity className="w-3.5 h-3.5" />
      </div>
    );
  }
  if (kind === "revocation") {
    return (
      <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center flex-shrink-0">
        <X className="w-3.5 h-3.5" />
      </div>
    );
  }
  if (kind === "flagged") {
    return (
      <div className="w-7 h-7 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
        <AlertCircle className="w-3.5 h-3.5" />
      </div>
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
      <Brain className="w-3.5 h-3.5" />
    </div>
  );
}

function RecentActivityList({ entries, onSelect, activeClearance }) {
  const wrapSummary = (text) => {
    const tokens = ["CPC", "ROAS", "TACoS", "CTR", "CR", "SOV", "LTV", "ACoS"];
    const pattern = new RegExp(`\\b(${tokens.join("|")})\\b`, "g");
    const parts = text.split(pattern);
    return parts.map((part, i) =>
      tokens.includes(part) ? (
        <span key={i}>{wrapMetric(part)}</span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  };
  return (
    <div className="space-y-2">
      {entries.map((e) => {
        const visible = canView(activeClearance, e.sensitivity);
        return (
          <button
            key={e.id}
            type="button"
            onClick={() => onSelect(e)}
            className="w-full text-left border border-slate-200 rounded-md px-3 py-2.5 hover:bg-slate-50 hover:border-slate-300 flex items-start gap-3"
          >
            <ActivityIcon kind={e.kind} />
            <div className="flex-1 min-w-0">
              {visible ? (
                <>
                  <div className="text-sm font-medium text-slate-900 leading-snug">
                    {e.title}
                  </div>
                  <div className="text-11 text-slate-600 mt-1 leading-relaxed">
                    {wrapSummary(e.summary)}
                  </div>
                </>
              ) : (
                <MaskedItem tag={e.sensitivity} layout="inline" />
              )}
              <div className="mt-1.5 flex items-center gap-2">
                <Pill tone={SENSITIVITY_TONE[e.sensitivity] || "slate"}>
                  {e.sensitivityLabel || SENSITIVITY_LABEL_ZH[e.sensitivity]}
                </Pill>
                <span className="text-10 text-slate-500 font-mono tabular-nums">
                  {e.addedAt}
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
          </button>
        );
      })}
    </div>
  );
}

function StorySection({ title, body }) {
  return (
    <div>
      <div className="text-sm font-semibold text-slate-900 mb-1.5">
        「{title}」
      </div>
      <div
        className="text-slate-700 leading-relaxed"
        style={{ fontSize: "13px" }}
      >
        {body}
      </div>
    </div>
  );
}

function StoryTakeawaySection({ title, body }) {
  return (
    <div className="bg-slate-50 border-l-2 border-emerald-500 pl-4 py-3 pr-4">
      <div className="text-sm font-semibold text-slate-900 mb-1.5">
        「{title}」
      </div>
      <div
        className="text-slate-700 leading-relaxed"
        style={{ fontSize: "13px" }}
      >
        {body}
      </div>
    </div>
  );
}

function ActivityStoryBody({ entry }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  if (!entry?.story) return null;
  const s = entry.story;
  return (
    <div>
      <div className="space-y-5">
        <StorySection title="背景" body={s.context} />
        <StorySection title="要解决的问题" body={s.problem} />
        <StorySection title="做了什么" body={s.action} />
        <StorySection title="结果" body={s.results} />
        <StoryTakeawaySection title="Agent 沉淀" body={s.takeaway} />
      </div>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={() => setDetailsOpen(!detailsOpen)}
          className="inline-flex items-center gap-1 text-11 text-slate-600 hover:text-slate-900 font-medium"
        >
          {detailsOpen ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
          查看详细字段
          {!detailsOpen && (
            <ArrowUpRight className="w-3 h-3 text-slate-400 ml-0.5" />
          )}
        </button>
        {detailsOpen && (
          <div className="mt-3 space-y-3">
            <div className="text-11 text-slate-600 leading-relaxed bg-slate-50/60 border border-slate-200 rounded-md px-3 py-2">
              {entry.summary}。{entry.detail.sourceNote}
            </div>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-3 text-10 uppercase tracking-wider text-slate-500 font-medium w-32">
                    源数量
                  </td>
                  <td className="py-2 text-slate-700 font-mono tabular-nums">
                    {entry.detail.sourceCount}
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-3 text-10 uppercase tracking-wider text-slate-500 font-medium">
                    置信度
                  </td>
                  <td className="py-2 text-slate-700 font-mono tabular-nums">
                    {entry.detail.confidencePct}%
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-3 text-10 uppercase tracking-wider text-slate-500 font-medium">
                    已应用于
                  </td>
                  <td className="py-2 text-slate-700">
                    {entry.detail.appliedIn.join("、")}
                  </td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="py-2 pr-3 text-10 uppercase tracking-wider text-slate-500 font-medium">
                    敏感度
                  </td>
                  <td className="py-2 text-slate-700">
                    {entry.sensitivityLabel || entry.sensitivity}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 text-10 uppercase tracking-wider text-slate-500 font-medium">
                    记录时间
                  </td>
                  <td className="py-2 text-slate-700 font-mono tabular-nums">
                    {entry.addedAt}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="text-xs">
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
                这条记录的含义
              </div>
              <div className="text-slate-700 leading-relaxed">
                {entry.detail.definition}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const CONNECTOR_SCOPES = {
  "cn-amazon-ads": [
    "advertising::campaign_management",
    "advertising::reports",
    "advertising::audiences (只读)",
    "profile (只读)",
  ],
  "cn-walmart-connect": [
    "ads:read",
    "ads:write",
    "reports:read",
    "items:read",
  ],
  "cn-tiktok-ads": [
    "ad.account.list",
    "ad.report.get",
    "ad.creative.read",
  ],
  "cn-brand-analytics": [
    "brand_analytics:repeat_purchase",
    "brand_analytics:search_terms",
    "brand_analytics:market_basket",
  ],
  "cn-helium10": [
    "scrape:keyword_rank",
    "scrape:asin_history",
  ],
  "cn-slack": [
    "chat:write",
    "incoming-webhook",
  ],
  "cn-gdrive": [
    "drive.readonly",
    "drive.metadata.readonly",
  ],
};

function ConnectorList({ connectors, query, activeClearance }) {
  const [openScopeId, setOpenScopeId] = useState(null);
  const q = (query || "").trim().toLowerCase();
  const filtered = q
    ? connectors.filter((c) => c.name.toLowerCase().includes(q))
    : connectors;
  if (filtered.length === 0) {
    return <div className="text-11 text-slate-500 px-1 py-1">无匹配项。</div>;
  }
  return (
    <div className="space-y-2">
      {filtered.map((c) => {
        const open = openScopeId === c.id;
        const scopes = CONNECTOR_SCOPES[c.id] || [];
        const visible = canView(activeClearance, c.sensitivity);
        return (
          <div
            key={c.id}
            className="border border-slate-200 rounded-md px-3 py-2.5 bg-white relative"
          >
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-900">
                    {c.name}
                  </span>
                  <Pill tone="slate">{CONNECTOR_TYPE_LABEL[c.type]}</Pill>
                  <Pill tone={CONNECTOR_STATUS_TONE[c.status] || "slate"}>
                    {CONNECTOR_STATUS_LABEL[c.status] || c.status}
                  </Pill>
                  <Pill tone={SENSITIVITY_TONE[c.sensitivity] || "slate"}>
                    {c.sensitivityLabel || SENSITIVITY_LABEL_ZH[c.sensitivity]}
                  </Pill>
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenScopeId(open ? null : c.id)}
                    className="inline-flex items-center gap-1 text-11 text-slate-600 hover:text-slate-900"
                  >
                    查看 OAuth 权限范围
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                  {c.lastSync && (
                    <span className="text-11 text-slate-500 font-mono tabular-nums">
                      {c.lastSync}
                    </span>
                  )}
                </div>
                {open && (
                  <div className="mt-2 border-t border-slate-200 pt-2">
                    {visible ? (
                      <>
                        <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1.5">
                          OAuth 权限范围
                        </div>
                        {scopes.length > 0 ? (
                          <ul className="space-y-0.5">
                            {scopes.map((s, i) => (
                              <li
                                key={i}
                                className="text-11 text-slate-700 font-mono tabular-nums leading-snug"
                              >
                                · {s}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-11 text-slate-500">
                            权限范围未登记。
                          </div>
                        )}
                        <div className="mt-1.5 text-10 text-slate-500 leading-relaxed">
                          要修改权限范围,在对话里说一句:"更新 {c.name} 的权限范围"。
                        </div>
                      </>
                    ) : (
                      <MaskedItem tag={c.sensitivity} layout="card" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-3 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-11 text-slate-600 leading-relaxed">
        要新增连接器或修改权限范围,在对话里说一句:"连接 [服务]" 或 "更新 [服务] 的权限范围"。
      </div>
    </div>
  );
}

function DocFileIcon({ type }) {
  const Icon = type === "xlsx" || type === "csv" ? FileSpreadsheet : FileText;
  return (
    <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center flex-shrink-0">
      <Icon className="w-3.5 h-3.5" />
    </div>
  );
}

function UploadedDocsList({ docs, query, activeClearance }) {
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [drawerMode, setDrawerMode] = useState(null);
  const [drawerDocId, setDrawerDocId] = useState(null);
  const [removePromptId, setRemovePromptId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpenId) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpenId]);

  const q = (query || "").trim().toLowerCase();
  const filtered = q
    ? docs.filter((d) => d.filename.toLowerCase().includes(q))
    : docs;

  const drawerDoc = drawerDocId
    ? docs.find((d) => d.id === drawerDocId) || null
    : null;

  const drawerPatterns =
    drawerDoc && drawerMode === "patterns"
      ? COMPANY_BRAIN.patterns.filter((p) =>
          (p.detail.sourceList || []).some((row) =>
            (row[0] || "").toLowerCase().includes(
              drawerDoc.filename.replace(/\.[a-z]+$/i, "").toLowerCase().split("-")[0],
            ),
          ),
        )
      : [];

  const closeDrawer = () => {
    setDrawerMode(null);
    setDrawerDocId(null);
  };

  return (
    <div className="space-y-2">
      {filtered.length === 0 && (
        <div className="text-11 text-slate-500 px-1 py-1">无匹配项。</div>
      )}
      {filtered.map((d) => (
        <div
          key={d.id}
          className="border border-slate-200 rounded-md px-3 py-2.5 bg-white relative"
        >
          <div className="flex items-start gap-2.5">
            <DocFileIcon type={d.type} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 truncate">
                {d.filename}
              </div>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <Pill tone={DOC_STATUS_TONE[d.status] || "slate"}>
                  {DOC_STATUS_LABEL[d.status] || d.status}
                </Pill>
                {d.patternsCount !== null && (
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-10 font-mono tabular-nums border ${
                      d.patternsCount > 0
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    {d.patternsCount} 个模式
                  </span>
                )}
                <Pill tone={SENSITIVITY_TONE[d.sensitivity] || "slate"}>
                  {d.sensitivityLabel || SENSITIVITY_LABEL_ZH[d.sensitivity]}
                </Pill>
              </div>
              <div className="mt-1 text-11 text-slate-500">
                {d.uploadedAt} · 由 {d.uploadedBy} 上传
              </div>
            </div>
            <div
              className="flex-shrink-0 relative"
              ref={menuOpenId === d.id ? menuRef : null}
            >
              <button
                type="button"
                onClick={() =>
                  setMenuOpenId(menuOpenId === d.id ? null : d.id)
                }
                title="操作"
                className="p-1 text-slate-500 hover:text-slate-900"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {menuOpenId === d.id && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-200 rounded-md shadow-lg z-20">
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerMode("source");
                      setDrawerDocId(d.id);
                      setMenuOpenId(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-11 text-slate-700 hover:bg-slate-50 border-b border-slate-100"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    查看原文
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDrawerMode("patterns");
                      setDrawerDocId(d.id);
                      setMenuOpenId(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-11 text-slate-700 hover:bg-slate-50 border-b border-slate-100"
                  >
                    <ListTree className="w-3.5 h-3.5 text-slate-500" />
                    查看提炼出的模式
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRemovePromptId(d.id);
                      setMenuOpenId(null);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left text-11 text-slate-700 hover:bg-slate-50"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                    从 brain 中移除
                  </button>
                </div>
              )}
            </div>
          </div>
          {removePromptId === d.id && (
            <div className="mt-2 border-t border-slate-200 pt-2">
              <div className="text-11 text-slate-700 leading-snug">
                要移除文档,在对话里说一句:
                <span className="font-mono text-slate-900">
                  "把 {d.filename} 从 brain 里移除"
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setRemovePromptId(null)}
                  className="px-2 py-1 text-11 font-medium text-slate-600 hover:text-slate-900"
                >
                  取消
                </button>
                <span className="inline-flex items-center gap-1 text-11 font-medium text-emerald-700">
                  已在对话中起草
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="mt-3 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-11 text-slate-600 leading-relaxed">
        要上传新文档,在对话里说一句:"上传 [文件名]",或者直接把文件拖进聊天框。
      </div>

      <InspectionDrawer
        open={!!drawerDoc && drawerMode === "source"}
        onClose={closeDrawer}
        title={drawerDoc?.filename}
        methodologyDescription={
          drawerDoc
            ? `${DOC_STATUS_LABEL[drawerDoc.status] || drawerDoc.status} · ${drawerDoc.uploadedAt} 由 ${drawerDoc.uploadedBy} 上传。`
            : undefined
        }
        tableHeaders={["字段", "取值"]}
        columnWidths={["40%", "60%"]}
        bodyOverride={
          drawerDoc && !canView(activeClearance, drawerDoc.sensitivity) ? (
            <MaskedItem tag={drawerDoc.sensitivity} layout="card" />
          ) : undefined
        }
        tableRows={
          drawerDoc
            ? [
                ["文件名", drawerDoc.filename],
                ["格式", drawerDoc.type.toUpperCase()],
                ["状态", DOC_STATUS_LABEL[drawerDoc.status] || drawerDoc.status],
                [
                  "提炼出的模式",
                  drawerDoc.patternsCount === null
                    ? "解析中"
                    : `${drawerDoc.patternsCount} 个`,
                ],
                ["上传人", drawerDoc.uploadedBy],
                ["上传时间", drawerDoc.uploadedAt],
                [
                  "敏感度",
                  drawerDoc.sensitivityLabel ||
                    SENSITIVITY_LABEL_ZH[drawerDoc.sensitivity],
                ],
              ]
            : []
        }
        definitionsList={
          drawerDoc
            ? [
                {
                  term: "原文存放位置",
                  definition:
                    "Company Brain · 原始文档存储(只读)。要替换或重新上传,通过对话发起。",
                },
              ]
            : undefined
        }
        definitionsLabel="详情"
      />

      <InspectionDrawer
        open={!!drawerDoc && drawerMode === "patterns"}
        onClose={closeDrawer}
        title={drawerDoc ? `${drawerDoc.filename} · 提炼出的模式` : undefined}
        methodologyDescription={
          drawerDoc
            ? drawerDoc.patternsCount === 0
              ? "该文档已索引但暂未提炼出任何模式。"
              : `${drawerDoc.patternsCount} 个模式由该文档贡献证据。下表按置信度展示与该文档相关的模式。`
            : undefined
        }
        tableHeaders={["模式", "类别", "置信度"]}
        columnWidths={["52%", "24%", "24%"]}
        bodyOverride={
          drawerDoc && !canView(activeClearance, drawerDoc.sensitivity) ? (
            <MaskedItem tag={drawerDoc.sensitivity} layout="card" />
          ) : undefined
        }
        tableRows={drawerPatterns.map((p) => [
          p.name,
          PATTERN_CATEGORY_LABEL[p.category] || p.category,
          `${p.confidencePct}%`,
        ])}
        definitionsList={
          drawerDoc && drawerPatterns.length === 0
            ? [
                {
                  term: "未找到回链",
                  definition:
                    "该文档未在任何模式的来源列表中直接出现 — 见 '已捕获模式' 区分类浏览。",
                },
              ]
            : undefined
        }
        definitionsLabel="提示"
      />
    </div>
  );
}

function CapturedPatterns({ patterns, onSelect, query, activeClearance }) {
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Strategy", "Optimization", "Execution", "Launch", "Defense"];
  const q = (query || "").trim().toLowerCase();
  const byCategory =
    filter === "All" ? patterns : patterns.filter((p) => p.category === filter);
  const filtered = q
    ? byCategory.filter((p) => p.name.toLowerCase().includes(q))
    : byCategory;
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {categories.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-2 py-0.5 text-11 rounded-md border ${
                active
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat === "All" ? "全部" : PATTERN_CATEGORY_LABEL[cat]}
            </button>
          );
        })}
      </div>
      <div className="space-y-2">
        {filtered.map((p) => {
          const visible = canView(activeClearance, p.sensitivity);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p)}
              className="w-full text-left border border-slate-200 rounded-md px-3 py-2.5 hover:bg-slate-50 hover:border-slate-300 bg-white"
            >
              {visible ? (
                <>
                  <div className="text-sm font-medium text-slate-900 leading-snug">
                    {p.name}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                    <Pill tone={PATTERN_CATEGORY_TONE[p.category] || "slate"}>
                      {PATTERN_CATEGORY_LABEL[p.category]}
                    </Pill>
                    <span className="text-11 text-slate-600">
                      置信度{" "}
                      <span className="font-mono tabular-nums text-slate-900">
                        {p.confidencePct}%
                      </span>
                    </span>
                    <Pill tone={SENSITIVITY_TONE[p.sensitivity] || "slate"}>
                      {p.sensitivityLabel || SENSITIVITY_LABEL_ZH[p.sensitivity]}
                    </Pill>
                  </div>
                  <div className="mt-1 text-11 text-slate-500">
                    已应用{" "}
                    <span className="font-mono tabular-nums text-slate-700">
                      {p.usedInCount}
                    </span>{" "}
                    次 · 来源{" "}
                    <span className="font-mono tabular-nums text-slate-700">
                      {p.sourceCount}
                    </span>{" "}
                    个 · 录入 {p.addedAt}
                  </div>
                </>
              ) : (
                <>
                  <MaskedItem tag={p.sensitivity} layout="card" />
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <Pill tone={PATTERN_CATEGORY_TONE[p.category] || "slate"}>
                      {PATTERN_CATEGORY_LABEL[p.category]}
                    </Pill>
                    <Pill tone={SENSITIVITY_TONE[p.sensitivity] || "slate"}>
                      {p.sensitivityLabel || SENSITIVITY_LABEL_ZH[p.sensitivity]}
                    </Pill>
                  </div>
                </>
              )}
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-11 text-slate-500 px-1 py-3">
            {q ? "无匹配项。" : "当前类别下无模式。"}
          </div>
        )}
      </div>
    </div>
  );
}

function PlaybookList({ playbooks, query, activeClearance }) {
  const [openId, setOpenId] = useState(null);
  const q = (query || "").trim().toLowerCase();
  const filtered = q
    ? playbooks.filter((pb) => pb.name.toLowerCase().includes(q))
    : playbooks;
  if (filtered.length === 0) {
    return <div className="text-11 text-slate-500 px-1 py-1">无匹配项。</div>;
  }
  return (
    <div className="space-y-2">
      {filtered.map((pb) => {
        const open = openId === pb.id;
        const phasesCount = pb.phases.length;
        const visible = canView(activeClearance, pb.sensitivity);
        return (
          <div
            key={pb.id}
            className="border border-slate-200 rounded-md bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenId(open ? null : pb.id)}
              className="w-full text-left px-3 py-2.5 hover:bg-slate-50 flex items-start gap-2"
            >
              <ChevronRight
                className={`w-4 h-4 text-slate-500 mt-0.5 transition-transform ${open ? "rotate-90" : ""}`}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-900 leading-snug">
                  {pb.name}
                </div>
                <div className="mt-1 flex items-center gap-2 flex-wrap">
                  <Pill tone={PATTERN_CATEGORY_TONE[pb.category] || "slate"}>
                    {PATTERN_CATEGORY_LABEL[pb.category]}
                  </Pill>
                  <Pill tone={SENSITIVITY_TONE[pb.sensitivity] || "slate"}>
                    {pb.sensitivityLabel || SENSITIVITY_LABEL_ZH[pb.sensitivity]}
                  </Pill>
                </div>
                <div className="mt-1 text-11 text-slate-500">
                  <span className="font-mono tabular-nums text-slate-700">
                    {phasesCount}
                  </span>{" "}
                  阶段 ·{" "}
                  <span className="font-mono tabular-nums text-slate-700">
                    {pb.basedOnCases}
                  </span>{" "}
                  个案例
                </div>
              </div>
            </button>
            {open && (
              <div className="border-t border-slate-200 px-3 py-2.5 bg-slate-50/40">
                {visible ? (
                  <table className="w-full text-11">
                    <thead>
                      <tr className="text-left text-10 uppercase tracking-wider text-slate-500">
                        <th className="font-medium py-1 pr-2">阶段</th>
                        <th className="font-medium py-1 pr-2">重点</th>
                        <th className="font-medium py-1 pr-2 text-right">周数</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pb.phases.map((ph, i) => (
                        <tr key={i} className="border-t border-slate-200 align-top">
                          <td className="py-1.5 pr-2 text-slate-700 font-medium whitespace-nowrap">
                            {ph.label}
                          </td>
                          <td className="py-1.5 pr-2 text-slate-700">
                            <div>{ph.focus}</div>
                            <div className="text-10 text-slate-500 mt-0.5">
                              通过条件:{ph.exitGate}
                            </div>
                          </td>
                          <td className="py-1.5 pr-2 text-slate-700 font-mono tabular-nums text-right">
                            {ph.durationWeeks}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <MaskedItem tag={pb.sensitivity} layout="card" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DecisionClassList({ classes, query, activeClearance }) {
  const [revokedIds, setRevokedIds] = useState(new Set());
  const [confirmingId, setConfirmingId] = useState(null);
  const q = (query || "").trim().toLowerCase();
  const matches = (c) => !q || c.name.toLowerCase().includes(q);

  const isJustRevoked = (id) => revokedIds.has(id);
  const active = classes.filter(
    (c) => !c.revoked && !isJustRevoked(c.id) && matches(c),
  );
  const justRevoked = classes.filter(
    (c) => !c.revoked && isJustRevoked(c.id) && matches(c),
  );
  const historicallyRevoked = classes.filter((c) => c.revoked && matches(c));
  const noResults =
    q &&
    active.length === 0 &&
    justRevoked.length === 0 &&
    historicallyRevoked.length === 0;

  const onConfirm = (id) => {
    setRevokedIds((s) => {
      const next = new Set(s);
      next.add(id);
      return next;
    });
    setConfirmingId(null);
  };

  if (noResults) {
    return <div className="text-11 text-slate-500 px-1 py-1">无匹配项。</div>;
  }

  return (
    <div className="space-y-4">
      {active.length > 0 && (
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-2">
            活跃类别
          </div>
          <div className="space-y-2">
            {active.map((dc) => {
              const visible = canView(activeClearance, dc.sensitivity);
              return (
              <div
                key={dc.id}
                className="border border-slate-200 rounded-md px-3 py-2.5 bg-white"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 leading-snug">
                      {dc.name}
                    </div>
                    {visible ? (
                      <>
                        <div className="text-11 text-slate-600 mt-1 leading-snug">
                          {dc.definition}
                        </div>
                        <div className="text-10 text-slate-500 mt-1">
                          {dc.thresholdSummary}
                        </div>
                      </>
                    ) : (
                      <div className="mt-1.5">
                        <MaskedItem tag={dc.sensitivity} layout="inline" />
                      </div>
                    )}
                    <div className="text-10 text-slate-500 mt-1">
                      近 30 天调用:{" "}
                      <span className="font-mono tabular-nums text-slate-700">
                        {dc.recentInvocations}
                      </span>{" "}
                      次 · 最近{" "}
                      <span className="font-mono tabular-nums text-slate-700">
                        {dc.lastInvoked}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Pill tone={SENSITIVITY_TONE[dc.sensitivity] || "slate"}>
                        {dc.sensitivityLabel || SENSITIVITY_LABEL_ZH[dc.sensitivity]}
                      </Pill>
                      <span className="text-10 text-slate-500">
                        授权人 {dc.delegatedBy} · {dc.delegatedAt}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setConfirmingId(dc.id)}
                    className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-1 text-11 font-medium text-slate-700 border border-slate-300 rounded-md hover:bg-slate-50"
                  >
                    <Trash2 className="w-3 h-3" />
                    撤回
                  </button>
                </div>
                {confirmingId === dc.id && (
                  <div className="mt-2 border-t border-slate-200 pt-2">
                    <div className="text-11 text-slate-700 leading-snug">
                      撤回 "{dc.name}"?今后 agent 执行这类动作前需要明确批准。
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirmingId(null)}
                        className="px-2 py-1 text-11 font-medium text-slate-600 hover:text-slate-900"
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        onClick={() => onConfirm(dc.id)}
                        className="px-2 py-1 text-11 font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md"
                      >
                        确认撤回
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
            })}
          </div>
        </div>
      )}

      {(justRevoked.length > 0 || historicallyRevoked.length > 0) && (
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-2">
            近期已撤回
          </div>
          <div className="space-y-2">
            {justRevoked.map((dc) => (
              <div
                key={dc.id}
                className="border border-slate-200 rounded-md px-3 py-2.5 bg-slate-50/60"
              >
                <div className="text-sm font-medium text-slate-500 line-through leading-snug">
                  {dc.name}
                </div>
                <div className="text-11 text-slate-500 mt-1 leading-snug line-through">
                  {dc.definition}
                </div>
                <div className="text-10 text-slate-500 mt-1">
                  {dc.thresholdSummary}
                </div>
                <div className="text-10 text-slate-500 mt-1">
                  撤回时累计调用{" "}
                  <span className="font-mono tabular-nums text-slate-700">
                    {dc.recentInvocations}
                  </span>{" "}
                  次 · 最后一次 {dc.lastInvoked}
                </div>
                <div className="text-10 text-slate-500 mt-1">刚刚撤回</div>
              </div>
            ))}
            {historicallyRevoked.map((dc) => (
              <div
                key={dc.id}
                className="border border-slate-200 rounded-md px-3 py-2 bg-slate-50/60"
              >
                <div className="text-sm font-medium text-slate-500 line-through leading-snug">
                  {dc.name}
                </div>
                <div className="text-11 text-slate-600 mt-1 leading-snug">
                  {dc.definition}
                </div>
                <div className="text-10 text-slate-500 mt-1">
                  {dc.thresholdSummary}
                </div>
                <div className="text-10 text-slate-500 mt-1">
                  撤回前累计调用{" "}
                  <span className="font-mono tabular-nums text-slate-700">
                    {dc.recentInvocations}
                  </span>{" "}
                  次 · 最后一次 {dc.lastInvoked}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BrandDefaultsList({ defaults, query }) {
  const [editId, setEditId] = useState(null);
  const q = (query || "").trim().toLowerCase();
  const filtered = q
    ? defaults.filter((d) => d.key.toLowerCase().includes(q))
    : defaults;
  if (filtered.length === 0) {
    return <div className="text-11 text-slate-500 px-1 py-1">无匹配项。</div>;
  }
  return (
    <div className="space-y-2">
      {filtered.map((d) => (
        <div
          key={d.id}
          className="border border-slate-200 rounded-md px-3 py-2.5 bg-white"
        >
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 leading-snug">
                {d.key}
              </div>
              <div className="mt-1 font-mono tabular-nums text-slate-900 text-sm">
                {d.value}
              </div>
              <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                <Pill tone="slate">{d.categoryLabel || DEFAULT_CATEGORY_LABEL[d.category] || d.category}</Pill>
                <span className="text-10 text-slate-500">
                  {d.lastModified} · {d.modifiedBy} 修改
                </span>
              </div>
              <div className="text-11 text-slate-600 mt-1 leading-snug">
                {d.rationale}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setEditId(editId === d.id ? null : d.id)}
              className="flex-shrink-0 p-1 text-slate-500 hover:text-slate-900"
              title="通过对话修改"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>
          {editId === d.id && (
            <div className="mt-2 border-t border-slate-200 pt-2 space-y-2">
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                对话指令草稿
              </div>
              <div className="font-mono text-11 text-slate-900 bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 leading-snug">
                把 {d.key} 改为 ___ (当前:{d.value})
              </div>
              <div className="text-11 text-slate-500 leading-snug">
                品牌默认值改动走对话以留下审计记录。
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditId(null)}
                  className="px-2 py-1 text-11 font-medium text-slate-600 hover:text-slate-900"
                >
                  取消
                </button>
                <span className="inline-flex items-center gap-1 text-11 font-medium text-emerald-700">
                  已在对话中起草
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RecentQueriesList({ queries, activeUser, query, onOpenThread, threadIds }) {
  const qStr = (query || "").trim().toLowerCase();
  const filtered = qStr
    ? queries.filter((rq) => rq.question.toLowerCase().includes(qStr))
    : queries;
  if (filtered.length === 0) {
    return <div className="text-11 text-slate-500 px-1 py-1">无匹配项。</div>;
  }
  return (
    <div className="space-y-2">
      {filtered.map((rq) => {
        const visible = canView(activeUser.clearance, rq.sensitivity);
        const threadExists = threadIds.has(rq.threadId);
        return (
          <div
            key={rq.id}
            className="border border-slate-200 rounded-md px-3 py-2.5 bg-white"
          >
            <div className="text-sm font-medium text-slate-900 leading-snug flex items-start gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
              <span className="flex-1 min-w-0 truncate">
                {visible
                  ? rq.question
                  : "[本问题在当前权限下受限 · 可联系 Maya Chen 或更高权限]"}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 flex-wrap">
              <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-semibold text-10 flex items-center justify-center flex-shrink-0">
                {rq.askerInitials}
              </div>
              <span className="text-11 text-slate-600">{rq.asker}</span>
              <span className="text-10 text-slate-500 font-mono tabular-nums">
                {rq.askedAt}
              </span>
              <Pill
                tone={SENSITIVITY_TONE[rq.sensitivity] || "slate"}
                className="ml-auto"
              >
                {rq.sensitivityLabel || SENSITIVITY_LABEL_ZH[rq.sensitivity]}
              </Pill>
            </div>
            <div className="mt-1.5">
              {threadExists ? (
                <button
                  type="button"
                  onClick={() => onOpenThread && onOpenThread(rq.threadId)}
                  className="inline-flex items-center gap-1 text-11 font-medium text-emerald-700 hover:text-emerald-800"
                >
                  打开对话
                  <ArrowRight className="w-3 h-3" />
                </button>
              ) : (
                <span
                  title="该会话不在当前演示中"
                  className="inline-flex items-center gap-1 text-11 font-medium text-slate-400 cursor-default"
                >
                  打开对话
                  <ArrowRight className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CompanyBrainContent({ activeUserId, onSwitchUser, onOpenThread }) {
  const [openActivity, setOpenActivity] = useState(null);
  const [openPattern, setOpenPattern] = useState(null);
  const [query, setQuery] = useState("");
  const identity = { ...COMPANY_BRAIN.identity, activeUserId };
  const activeUser =
    identity.users.find((u) => u.id === activeUserId) || identity.users[0];
  const activeClearance = activeUser.clearance;
  const threadIds = new Set(THREADS.map((t) => t.id));

  const restrictedCount = countRestrictedItems(activeClearance, COMPANY_BRAIN);
  const atMaxClearance = activeClearance === "Confidential";
  const clearanceLabel =
    SENSITIVITY_LABEL_ZH[activeClearance] || activeClearance;

  const drawerRows = openActivity
    ? [
        ["源数量", String(openActivity.detail.sourceCount)],
        ["置信度", `${openActivity.detail.confidencePct}%`],
        ["已应用于", openActivity.detail.appliedIn.join("、")],
        ["敏感度", openActivity.sensitivityLabel || openActivity.sensitivity],
        ["记录时间", openActivity.addedAt],
      ]
    : [];

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        <IdentityCard identity={identity} onSwitchUser={onSwitchUser} />
        <div className="px-4 pt-3 pb-3 border-b border-slate-200 bg-white">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索品牌大脑..."
              className="w-full bg-slate-50 border border-slate-200 rounded-md pl-8 pr-7 py-1.5 text-11 text-slate-900 placeholder-slate-500 focus:outline-none focus:border-slate-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                title="清除"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          {!query && (
            <div className="mt-1.5 text-11 text-slate-500 leading-snug">
              {atMaxClearance
                ? `你的权限:${clearanceLabel} · 全部可见`
                : `你的权限:${clearanceLabel} · ${restrictedCount} 条内容受限`}
            </div>
          )}
        </div>
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50/40">
          <BrainStatStrip />
        </div>
        <BrainSection
          id="recent-activity"
          title="近期动态"
          count={COMPANY_BRAIN.recentActivity.length}
          defaultOpen={true}
        >
          <RecentActivityList
            entries={COMPANY_BRAIN.recentActivity}
            onSelect={setOpenActivity}
            activeClearance={activeClearance}
          />
        </BrainSection>
        <BrainSection
          id="connectors"
          title="数据连接器"
          count={COMPANY_BRAIN.connectors.length}
          defaultOpen={!!query}
        >
          <ConnectorList
            connectors={COMPANY_BRAIN.connectors}
            query={query}
            activeClearance={activeClearance}
          />
        </BrainSection>
        <BrainSection
          id="uploaded-docs"
          title="已上传文档"
          count={COMPANY_BRAIN.uploadedDocs.length}
          defaultOpen={!!query}
        >
          <UploadedDocsList
            docs={COMPANY_BRAIN.uploadedDocs}
            query={query}
            activeClearance={activeClearance}
          />
        </BrainSection>
        <BrainSection
          id="captured-patterns"
          title="已捕获模式"
          count={COMPANY_BRAIN.patterns.length}
          defaultOpen={!!query}
        >
          <CapturedPatterns
            patterns={COMPANY_BRAIN.patterns}
            onSelect={setOpenPattern}
            query={query}
            activeClearance={activeClearance}
          />
        </BrainSection>
        <BrainSection
          id="playbooks"
          title="打法库"
          count={COMPANY_BRAIN.playbookList.length}
          defaultOpen={!!query}
        >
          <PlaybookList
            playbooks={COMPANY_BRAIN.playbookList}
            query={query}
            activeClearance={activeClearance}
          />
        </BrainSection>
        <BrainSection
          id="decision-classes"
          title="决策类别"
          count={COMPANY_BRAIN.decisionClassesDetail.filter((c) => !c.revoked).length}
          defaultOpen={!!query}
        >
          <DecisionClassList
            classes={COMPANY_BRAIN.decisionClassesDetail}
            query={query}
            activeClearance={activeClearance}
          />
        </BrainSection>
        <BrainSection
          id="brand-defaults"
          title="品牌默认值"
          count={COMPANY_BRAIN.brandDefaults.length}
          defaultOpen={!!query}
        >
          <BrandDefaultsList
            defaults={COMPANY_BRAIN.brandDefaults}
            query={query}
          />
        </BrainSection>
        <BrainSection
          id="recent-queries"
          title="近期问询"
          count={COMPANY_BRAIN.recentQueries.length}
          defaultOpen={!!query}
        >
          <RecentQueriesList
            queries={COMPANY_BRAIN.recentQueries}
            activeUser={activeUser}
            query={query}
            onOpenThread={onOpenThread}
            threadIds={threadIds}
          />
        </BrainSection>
      </div>

      <InspectionDrawer
        open={!!openActivity}
        onClose={() => setOpenActivity(null)}
        title={openActivity?.title}
        headerMeta={
          openActivity ? (
            <>
              <Pill tone={SENSITIVITY_TONE[openActivity.sensitivity] || "slate"}>
                {openActivity.sensitivityLabel ||
                  SENSITIVITY_LABEL_ZH[openActivity.sensitivity]}
              </Pill>
              <span className="text-slate-300">·</span>
              <span>
                置信度{" "}
                <span className="font-mono text-slate-700 tabular-nums">
                  {openActivity.detail.confidencePct}%
                </span>
              </span>
              <span className="text-slate-300">·</span>
              <span>记录于 {openActivity.addedAt}</span>
              {openActivity.detail.appliedIn.length > 0 && (
                <>
                  <span className="text-slate-300">·</span>
                  <span>
                    已应用于{" "}
                    <span className="font-mono text-slate-700 tabular-nums">
                      {openActivity.detail.appliedIn.length}
                    </span>{" "}
                    个计划
                  </span>
                </>
              )}
            </>
          ) : null
        }
        methodologyDescription={
          openActivity && !openActivity.story
            ? `${openActivity.summary}。${openActivity.detail.sourceNote}`
            : undefined
        }
        tableHeaders={openActivity && !openActivity.story ? ["字段", "取值"] : []}
        tableRows={openActivity && !openActivity.story ? drawerRows : []}
        columnWidths={openActivity && !openActivity.story ? ["40%", "60%"] : undefined}
        bodyOverride={
          openActivity && !canView(activeClearance, openActivity.sensitivity) ? (
            <MaskedItem tag={openActivity.sensitivity} layout="card" />
          ) : openActivity?.story ? (
            <ActivityStoryBody entry={openActivity} />
          ) : undefined
        }
        definitionsList={
          openActivity && !openActivity.story
            ? [
                {
                  term: "这条记录的含义",
                  definition: openActivity.detail.definition,
                },
              ]
            : undefined
        }
        definitionsLabel="详情"
      />

      <InspectionDrawer
        open={!!openPattern}
        onClose={() => setOpenPattern(null)}
        title={openPattern?.name}
        methodologyDescription={
          openPattern
            ? `${openPattern.detail.definition} ${openPattern.detail.lineage}`
            : undefined
        }
        tableHeaders={["来源", "结果"]}
        tableRows={openPattern ? openPattern.detail.sourceList : []}
        columnWidths={["44%", "56%"]}
        bodyOverride={
          openPattern && !canView(activeClearance, openPattern.sensitivity) ? (
            <MaskedItem tag={openPattern.sensitivity} layout="card" />
          ) : undefined
        }
        definitionsList={
          openPattern
            ? openPattern.detail.appliedIn.map((a, i) => ({
                term: `应用 ${i + 1}`,
                definition: a,
              }))
            : undefined
        }
        definitionsLabel="已应用于"
      />
    </>
  );
}

const OUTCOMES_DATA = {
  quarter: "Q2 2026",
  brand: "ABC Home Goods",
  subscription: { total: 8400, listings: 35, perListing: 240 },
  bonus: { total: 6420, listings: 12 },
  base: { netRevenue: 642000, effectiveRate: 1.0 },
  portfolio: {
    tacos: 17.4,
    listingsTotal: 47,
    delegated: 12,
    training: 35,
    timeSavedLabel: "4.2 FTE-周/月",
  },
  delegated: [
    { sku: "SKU-A",     name: "Floor Lamp",      rev: 84200,  spend: 14062, tacos: 16.7, bonus: 840,  bonusPct: 1.2, since: "14 天前" },
    { sku: "SKU-117",   name: "Bed Frame",       rev: 128400, spend: 19260, tacos: 15.0, bonus: 1310, bonusPct: 1.2, since: "since Feb 12" },
    { sku: "SKU-LH-04", name: "Lounge Chair",    rev: 67800,  spend: 11526, tacos: 17.0, bonus: 678,  bonusPct: 1.2, since: "since Mar 4" },
    { sku: "SKU-DR-12", name: "Dining Rug",      rev: 42300,  spend: 7196,  tacos: 17.0, bonus: 423,  bonusPct: 1.2, since: "since Mar 18" },
    { sku: "SKU-WD-08", name: "Wall Decor",      rev: 38200,  spend: 7258,  tacos: 19.0, bonus: 382,  bonusPct: 1.2, since: "since Mar 22" },
    { sku: "SKU-PL-21", name: "Pendant Light",   rev: 54600,  spend: 10374, tacos: 19.0, bonus: 546,  bonusPct: 1.2, since: "since Mar 28" },
    { sku: "SKU-OS-03", name: "Office Storage",  rev: 74200,  spend: 13356, tacos: 18.0, bonus: 742,  bonusPct: 1.2, since: "since Apr 2"  },
    { sku: "SKU-CD-15", name: "Coffee Decanter", rev: 24800,  spend: 4712,  tacos: 19.0, bonus: 248,  bonusPct: 1.2, since: "since Apr 10" },
    { sku: "SKU-TR-09", name: "Throw Pillow",    rev: 48200,  spend: 9158,  tacos: 19.0, bonus: 482,  bonusPct: 1.2, since: "since Apr 14" },
    { sku: "SKU-VS-04", name: "Vase Set",        rev: 36400,  spend: 6552,  tacos: 18.0, bonus: 364,  bonusPct: 1.2, since: "since Apr 20" },
    { sku: "SKU-BR-07", name: "Bath Rug",        rev: 28400,  spend: 5396,  tacos: 19.0, bonus: 284,  bonusPct: 1.2, since: "since Apr 24" },
    { sku: "SKU-OT-11", name: "Ottoman",         rev: 14500,  spend: 2755,  tacos: 19.0, bonus: 121,  bonusPct: 1.2, since: "since May 2"  },
  ],
  trainingShown: [
    { sku: "SKU-PB-A",   name: "Power bank",       rev: 42100,  spend: 7748,  tacos: 18.4, sub: 240, since: "since Mar 8"  },
    { sku: "SKU-RZ-001", name: "Razor (Henry's)",  rev: 128400, spend: 43656, tacos: 34.0, sub: 240, since: "since Jan 22" },
    { sku: "SKU-RZ-002", name: "Razor Blade",      rev: 44200,  spend: 13260, tacos: 30.0, sub: 240, since: "since Jan 22" },
    { sku: "SKU-TI-01",  name: "Tire Inflator",    rev: 18600,  spend: 7254,  tacos: 39.0, sub: 240, since: "since Apr 30", note: "新品" },
    { sku: "SKU-TI-02",  name: "RV Compressor",    rev: 9200,   spend: 4968,  tacos: 54.0, sub: 240, since: "since May 6",  note: "红色案例" },
  ],
  trainingCollapsedCount: 30,
};

const OUTCOMES_QUARTERS = ["Q2 2026", "Q1 2026", "Q4 2025", "Q3 2025"];

function formatMoney(n) {
  return `$${n.toLocaleString()}`;
}

function OutcomesContent({ panelWidth, onTabChange }) {
  const compact = typeof panelWidth === "number" && panelWidth < 400;
  const [quarterOpen, setQuarterOpen] = useState(false);
  const [quarterHint, setQuarterHint] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("revenue");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [trainingExpanded, setTrainingExpanded] = useState(false);

  const data = OUTCOMES_DATA;

  const allListings = [
    ...data.delegated.map((d) => ({
      ...d,
      status: "delegated",
      billing: d.bonus,
    })),
    ...data.trainingShown.map((t) => ({
      ...t,
      status: "training",
      billing: t.sub,
    })),
  ];

  const filtered = allListings.filter((l) => {
    if (activeFilter === "delegated" && l.status !== "delegated") return false;
    if (activeFilter === "training" && l.status !== "training") return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      if (
        !l.sku.toLowerCase().includes(q) &&
        !l.name.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "revenue") return b.rev - a.rev;
    if (sortBy === "spend") return b.spend - a.spend;
    if (sortBy === "tacos") return b.tacos - a.tacos;
    if (sortBy === "billing") return b.billing - a.billing;
    return 0;
  });

  const sortLabels = {
    revenue: "按收入排序",
    spend: "按广告花费",
    tacos: "按 TACoS",
    billing: "按计费",
  };

  const filterChips = [
    { id: "all", label: "全部" },
    { id: "delegated", label: "委托" },
    { id: "training", label: "培训中" },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Section A · Quarterly summary header */}
      <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-semibold text-slate-900">
            {data.quarter} · {data.brand}
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setQuarterOpen(!quarterOpen);
                setQuarterHint(false);
              }}
              className="inline-flex items-center gap-1 text-11 text-slate-700 border border-slate-200 rounded-md px-2 py-1 hover:bg-white"
            >
              <span>{data.quarter}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {quarterOpen && (
              <div className="absolute right-0 top-full mt-1 z-10 bg-white border border-slate-200 rounded-md shadow-sm py-1 min-w-[140px]">
                {OUTCOMES_QUARTERS.map((q) => {
                  const isCurrent = q === data.quarter;
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => {
                        if (!isCurrent) {
                          setQuarterHint(true);
                        }
                        setQuarterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-11 ${
                        isCurrent
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {q}
                      {isCurrent && (
                        <span className="ml-1 text-slate-500">· 当前</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
            {quarterHint && (
              <div className="absolute right-0 top-full mt-1 z-10 text-10 text-slate-500 bg-white border border-slate-200 rounded px-2 py-1">
                本演示只含 Q2 数据
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
            XNURTA 本季度计费
          </div>
          <div className="text-2xl font-mono font-semibold text-slate-900 tabular-nums mb-2">
            {formatMoney(data.subscription.total + data.bonus.total)}{" "}
            <span className="text-xs text-slate-500 font-normal">合计</span>
          </div>
          <div className="text-11 text-slate-700 space-y-1 pl-1">
            <div className="flex items-baseline gap-2">
              <CornerDownRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-600">订阅</span>
              <span className="font-mono font-medium text-slate-900 tabular-nums">
                {formatMoney(data.subscription.total)}
              </span>
              <span className="text-slate-500">
                ({data.subscription.listings} 个 listing × $
                {data.subscription.perListing})
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <CornerDownRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-600">结果奖金</span>
              <span className="font-mono font-medium text-emerald-700 tabular-nums">
                {formatMoney(data.bonus.total)}
              </span>
              <span className="text-slate-500">
                ({data.bonus.listings} 个委托 listing)
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-1">
            奖金基数
          </div>
          <div className="text-11 text-slate-700 space-y-1">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-600">Q2 净收入(委托)</span>
              <span className="font-mono font-medium text-slate-900 tabular-nums">
                {formatMoney(data.base.netRevenue)}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-600">奖金实际比率</span>
              <span className="font-mono font-medium text-slate-900 tabular-nums">
                {data.base.effectiveRate.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-2">
            组合概览
          </div>
          <div className="space-y-1.5 text-11">
            <div className="flex items-baseline justify-between">
              <span className="text-slate-700">{wrapMetric("TACoS")}</span>
              <TacosValue value={data.portfolio.tacos} size="lg" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-700">管理的 listing</span>
              <span className="font-mono font-medium text-slate-900 tabular-nums">
                {data.portfolio.listingsTotal}
              </span>
            </div>
            <div className="flex items-baseline justify-between pl-4">
              <span className="text-slate-600 flex items-center gap-1.5">
                <CornerDownRight className="w-3 h-3 text-slate-400" />
                委托
              </span>
              <span className="font-mono font-medium text-emerald-700 tabular-nums">
                {data.portfolio.delegated}
              </span>
            </div>
            <div className="flex items-baseline justify-between pl-4">
              <span className="text-slate-600 flex items-center gap-1.5">
                <CornerDownRight className="w-3 h-3 text-slate-400" />
                培训中
              </span>
              <span className="font-mono font-medium text-slate-700 tabular-nums">
                {data.portfolio.training}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-slate-700">
                节省运营时间{" "}
                <span className="text-slate-500">(估算)</span>
              </span>
              <span className="font-mono font-medium text-slate-900 tabular-nums">
                {data.portfolio.timeSavedLabel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section B · Filter + sort row */}
      <div className="px-5 py-3 border-b border-slate-200 flex flex-wrap items-center gap-2">
        <div className="inline-flex items-center gap-1">
          {filterChips.map((c) => {
            const active = activeFilter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveFilter(c.id)}
                className={`text-11 font-medium px-2 py-1 rounded-md border ${
                  active
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setSortOpen(!sortOpen)}
            className="inline-flex items-center gap-1 text-11 text-slate-700 border border-slate-200 rounded-md px-2 py-1 hover:bg-slate-50"
          >
            <span>{sortLabels[sortBy]}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
          {sortOpen && (
            <div className="absolute left-0 top-full mt-1 z-10 bg-white border border-slate-200 rounded-md shadow-sm py-1 min-w-[120px]">
              {Object.entries(sortLabels).map(([id, label]) => {
                const active = sortBy === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSortBy(id);
                      setSortOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-11 ${
                      active
                        ? "bg-emerald-50 text-emerald-700 font-medium"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex-1 min-w-[140px] relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="查找 listing..."
            className="w-full text-11 pl-6 pr-6 py-1 border border-slate-200 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Section C · Listing list */}
      <div className="px-5 py-4 space-y-2.5">
        {sorted.length === 0 ? (
          <div className="text-xs text-slate-600 py-4">
            没有匹配 &ldquo;{searchQuery}&rdquo; 的 listing。试试其他关键词。
          </div>
        ) : (
          sorted.map((l) => (
            <OutcomesListingCard key={l.sku} listing={l} compact={compact} />
          ))
        )}

        {(activeFilter === "all" || activeFilter === "training") &&
          searchQuery.trim() === "" && (
            <div className="border border-dashed border-slate-200 rounded-md">
              <button
                type="button"
                onClick={() => setTrainingExpanded(!trainingExpanded)}
                className="w-full text-left px-4 py-2.5 text-11 text-slate-600 hover:bg-slate-50 flex items-center justify-between"
              >
                <span>
                  + 还有 {data.trainingCollapsedCount} 个培训中 listing
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  {trainingExpanded ? "收起" : "点击展开"}
                  {trainingExpanded ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )}
                </span>
              </button>
              {trainingExpanded && (
                <div className="px-4 pb-3 pt-1 text-11 text-slate-600 border-t border-slate-100">
                  <div className="mb-1.5 text-slate-500">
                    + 还有 {data.trainingCollapsedCount} 个 · 每个订阅 $
                    {data.subscription.perListing}/月
                  </div>
                </div>
              )}
            </div>
          )}
      </div>

      {/* Section E · How billing works */}
      <div className="px-5 pb-5">
        <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-xs text-slate-700 leading-relaxed">
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-2">
            计费方式
          </div>
          <div className="mb-2.5 space-y-1">
            <div>
              <span className="text-slate-900 font-medium">培训中:</span> 每个
              listing $
              {data.subscription.perListing}/月订阅
            </div>
            <div>
              <span className="text-slate-900 font-medium">委托:</span>{" "}
              (收入 − 广告花费) 的 1% 作为奖金
            </div>
          </div>
          <div className="mb-2.5 text-slate-600">
            委托与否客户自己定。团队对某个 listing 上的 agent
            建立信任后,才会把它升级为委托。委托一开始,订阅就停。
          </div>
          <button
            type="button"
            onClick={() => onTabChange && onTabChange("company-brain")}
            className="inline-flex items-center gap-1 text-11 font-medium text-emerald-700 hover:text-emerald-800"
          >
            去公司大脑 → 决策类别 看哪些已委托、哪些还在培训
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

function OutcomesListingCard({ listing, compact }) {
  const isDelegated = listing.status === "delegated";
  const statusLabel = isDelegated
    ? `委托 · ${listing.since}`
    : `培训中 · ${listing.since}`;
  return (
    <div className="border border-slate-200 rounded-md px-4 py-3 bg-white">
      <div className="flex items-baseline justify-between mb-1.5">
        <div className="text-sm font-semibold text-slate-900">
          <span className="font-mono">{listing.sku}</span>
          <span className="text-slate-500 font-normal"> · </span>
          {listing.name}
        </div>
      </div>
      <div className="mb-3 flex items-center gap-1.5 flex-wrap">
        <Pill tone={isDelegated ? "emerald" : "slate"}>{statusLabel}</Pill>
        {listing.note && (
          <span className="text-10 text-slate-500 italic">{listing.note}</span>
        )}
      </div>

      <div
        className={`mb-2 ${
          compact ? "space-y-1.5" : "grid grid-cols-2 gap-3"
        }`}
      >
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
            Q2 收入
          </div>
          <div className="text-sm font-mono font-semibold text-slate-900 tabular-nums">
            ${listing.rev.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
            Q2 广告花费
          </div>
          <div className="text-sm font-mono font-semibold text-slate-900 tabular-nums">
            ${listing.spend.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="mb-3 flex items-baseline justify-between">
        <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
          Q2 {wrapMetric("TACoS")}
        </div>
        <TacosValue value={listing.tacos} size="md" />
      </div>

      <div className="border-t border-slate-100 pt-2">
        <div className="text-10 uppercase tracking-wider text-slate-500 font-medium mb-0.5">
          XNURTA 计费
        </div>
        <div className="text-sm">
          <span
            className={`font-mono font-semibold tabular-nums ${
              isDelegated ? "text-emerald-700" : "text-slate-900"
            }`}
          >
            ${listing.billing.toLocaleString()}
          </span>
          <span className="text-11 text-slate-500 ml-2">
            (
            {isDelegated
              ? `结果奖金 · 净收入的 ${listing.bonusPct.toFixed(1)}%`
              : "订阅 · 按 listing 计"}
            )
          </span>
        </div>
      </div>
    </div>
  );
}

function InspectorDragHandle({ currentWidth, onWidthChange }) {
  const startX = useRef(0);
  const startWidth = useRef(0);
  const moveRef = useRef(null);
  const upRef = useRef(null);

  const onMouseDown = (e) => {
    e.preventDefault();
    startX.current = e.clientX;
    startWidth.current = currentWidth;
    moveRef.current = (ev) => {
      const delta = startX.current - ev.clientX;
      const newWidth = Math.min(
        720,
        Math.max(360, startWidth.current + delta),
      );
      onWidthChange(newWidth);
    };
    upRef.current = () => {
      document.removeEventListener("mousemove", moveRef.current);
      document.removeEventListener("mouseup", upRef.current);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    document.addEventListener("mousemove", moveRef.current);
    document.addEventListener("mouseup", upRef.current);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  return (
    <div
      onMouseDown={onMouseDown}
      className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize bg-slate-200 hover:bg-slate-400 z-10"
    />
  );
}

function InspectorPanel({
  open,
  tab,
  onTabChange,
  onClose,
  width,
  onWidthChange,
  activeUserId,
  onSwitchUser,
  onOpenThread,
}) {
  if (!open) return null;
  const tabs = [
    { id: "ad-architecture", label: "广告架构" },
    { id: "company-brain", label: "公司大脑" },
    { id: "outcomes", label: "结果" },
  ];
  return (
    <aside
      style={{ width: `${width}px` }}
      className="flex flex-col border-l border-slate-200 bg-white flex-shrink-0 relative"
    >
      <InspectorDragHandle
        currentWidth={width}
        onWidthChange={onWidthChange}
      />
      <div className="flex items-center border-b border-slate-200 pl-1 pr-2 flex-shrink-0">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onTabChange(t.id)}
              className={`text-sm font-medium px-3 py-2 border-b-2 -mb-px ${
                active
                  ? "bg-white text-slate-900 border-emerald-600 font-semibold"
                  : "bg-slate-50 text-slate-600 border-transparent hover:bg-slate-100"
              }`}
            >
              {t.label}
            </button>
          );
        })}
        <button
          type="button"
          disabled
          title="更多检视器即将推出"
          className="text-sm font-medium px-2 py-2 text-slate-400 cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={onClose}
          className="text-slate-500 hover:text-slate-900 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="flex-1 flex flex-col min-h-0">
        {tab === "ad-architecture" ? (
          <AdArchitectureContent panelWidth={width} />
        ) : tab === "company-brain" ? (
          <CompanyBrainContent
            activeUserId={activeUserId}
            onSwitchUser={onSwitchUser}
            onOpenThread={onOpenThread}
          />
        ) : (
          <OutcomesContent
            panelWidth={width}
            onTabChange={onTabChange}
          />
        )}
      </div>
    </aside>
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
/*  Brain operations canvases · Part 4                                        */
/* ────────────────────────────────────────────────────────────────────────── */

function UploadCanvas() {
  const U = BRAIN_OPS.upload;
  return (
    <>
      <CanvasHeader
        kicker="上传 · 提炼方法学"
        title={U.document.filename}
        meta={
          <>
            <Pill tone="slate">
              <FileText className="w-3 h-3" />
              {U.document.pages} 页
            </Pill>
            <Pill tone={SENSITIVITY_TONE[U.document.sensitivity] || "slate"}>
              {U.document.sensitivityLabel}
            </Pill>
            <Pill tone="emerald">
              <Sparkles className="w-3 h-3" />
              由 {U.document.uploadedBy} 上传
            </Pill>
          </>
        }
      />

      {/* 1. 现状 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="解析输出 + 文档摘要">
          1. 现状
        </SectionLabel>
        <Card className="p-5">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                页数
              </div>
              <div className="mt-1 text-xl font-mono font-semibold text-slate-900">
                {U.document.pages}
              </div>
            </div>
            <div>
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                提取 tokens
              </div>
              <div className="mt-1 text-xl font-mono font-semibold text-slate-900">
                {U.document.tokens}
              </div>
            </div>
            <div>
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                表格
              </div>
              <div className="mt-1 text-xl font-mono font-semibold text-slate-900">
                {U.document.tables}
              </div>
            </div>
            <div>
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                图表
              </div>
              <div className="mt-1 text-xl font-mono font-semibold text-slate-900">
                {U.document.charts}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-11 text-slate-500 leading-relaxed">
            {U.document.signalNote} · 上传时间 {U.document.uploadedAt}
          </div>
        </Card>
      </div>

      {/* 2. 具体问题 — 这次上传补的是什么缺口 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="本次上传补的缺口">
          2. 具体问题
        </SectionLabel>
        <Card className="p-5 bg-slate-50/60">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-2">
            公司大脑此前对该领域的覆盖
          </div>
          <div className="text-sm text-slate-700 leading-relaxed">
            {U.coverageNote}
          </div>
        </Card>
      </div>

      {/* 3. 具体建议 — 提炼出的 3 个模式 + 2 个 playbook 更新 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="3 个新模式 · 2 个 playbook 更新">
          3. 具体建议
        </SectionLabel>

        <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-2">
          提炼出的 3 个新模式
        </div>
        <div className="space-y-2.5">
          {U.patterns.map((p) => (
            <div
              key={p.id}
              className="border border-slate-200 rounded-md px-3 py-2.5 bg-white"
            >
              <div className="text-sm font-medium text-slate-900 leading-snug">
                {p.name}
              </div>
              <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                {p.categories.map((cat) => (
                  <Pill key={cat} tone={PATTERN_CATEGORY_TONE[cat] || "slate"}>
                    {PATTERN_CATEGORY_LABEL[cat]}
                  </Pill>
                ))}
                <span className="text-11 text-slate-600">
                  置信度{" "}
                  <span className="font-mono tabular-nums text-slate-900">
                    {p.confidencePct}%
                  </span>
                </span>
                <Pill tone={SENSITIVITY_TONE[p.sensitivity] || "slate"}>
                  {p.sensitivityLabel}
                </Pill>
                <span className="text-11 text-slate-500 font-mono">
                  {p.sources}
                </span>
              </div>
              <div className="mt-1.5 text-11 text-slate-600 leading-relaxed">
                {p.summary}
              </div>
            </div>
          ))}
        </div>

        <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mt-5 mb-2">
          2 个 playbook 更新
        </div>
        <div className="space-y-2">
          {U.playbookUpdates.map((pb) => (
            <div
              key={pb.id}
              className="flex items-start gap-2 border border-slate-200 rounded-md px-3 py-2 bg-white"
            >
              <Workflow className="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-slate-900">
                  {pb.name}
                </div>
                <div className="text-11 text-slate-600 mt-0.5">{pb.change}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 里程碑 — 写入后能做什么 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="写入大脑后能做什么">
          4. 里程碑
        </SectionLabel>
        <div className="space-y-1.5">
          {U.milestones.map((m, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
              <CornerDownRight className="w-3 h-3 text-slate-300 mt-1 flex-shrink-0" />
              <span>{m}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2" />

      {/* Bottom approval bar */}
      <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="text-11 text-slate-500">
            3 个模式 + 2 个 playbook 更新 · 等待确认后写入
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-100 rounded-md bg-white"
            >
              <Clock className="w-3.5 h-3.5" />
              延后
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-100 rounded-md bg-white"
            >
              <Edit3 className="w-3.5 h-3.5" />
              逐项批准
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md"
            >
              <Check className="w-3.5 h-3.5" />
              全部批准 · 写入公司大脑
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ConnectorCanvas() {
  const C = BRAIN_OPS.connector;
  const [scopeOpen, setScopeOpen] = useState(false);
  return (
    <>
      <CanvasHeader
        kicker="连接数据源"
        title={C.service}
        meta={
          <>
            <Pill tone="emerald">
              <ShieldCheck className="w-3 h-3" />
              已建立
            </Pill>
            <Pill tone={SENSITIVITY_TONE[C.sensitivity] || "slate"}>
              {C.sensitivityLabel}
            </Pill>
          </>
        }
      />

      {/* 1. 现状 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="连接状态 · OAuth 范围 · 实时同步">
          1. 现状
        </SectionLabel>
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                服务
              </div>
              <div className="text-sm font-medium text-slate-900 mt-1">
                {C.service}
              </div>
            </div>
            <div>
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                连接人
              </div>
              <div className="text-sm font-medium text-slate-900 mt-1">
                {C.connectedBy}
              </div>
              <div className="text-11 text-slate-500 font-mono mt-0.5">
                {C.connectedAt}
              </div>
            </div>
            <div>
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                OAuth 范围
              </div>
              <div className="text-sm font-medium text-slate-900 mt-1">
                {C.oauthScopeCount} 项权限
              </div>
              <button
                type="button"
                onClick={() => setScopeOpen(true)}
                className="inline-flex items-center gap-1 text-11 text-emerald-700 hover:text-emerald-800 mt-0.5"
              >
                查看 OAuth 范围
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <div>
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                同步状态
              </div>
              <div className="text-sm font-medium text-emerald-700 mt-1">
                {C.syncStatus}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 2. 具体问题 — 之前缺什么 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="连接前公司大脑缺什么">
          2. 具体问题
        </SectionLabel>
        <Card className="p-5 bg-slate-50/60">
          <div className="text-sm text-slate-700 leading-relaxed">
            {C.coverageGap}
          </div>
        </Card>
      </div>

      {/* 3. 具体建议 — 现在能做什么 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="新增数据范围 · 新增可用场景">
          3. 具体建议
        </SectionLabel>
        <Card className="p-5">
          <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-2">
            数据范围
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                已同步表
              </div>
              <div className="mt-1 text-sm font-mono text-slate-900">
                {C.dataScope.tables.length} 个
              </div>
              <div className="text-11 text-slate-600 mt-1 leading-relaxed">
                {C.dataScope.tables.join("、")}
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                  历史事件已索引
                </div>
                <div className="mt-0.5 text-sm font-mono text-slate-900">
                  {C.dataScope.historicalEvents}
                </div>
              </div>
              <div>
                <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                  回填窗口
                </div>
                <div className="mt-0.5 text-sm font-mono text-slate-900">
                  {C.dataScope.backfillDays} 天 · 已完成
                </div>
              </div>
              <div>
                <div className="text-10 uppercase tracking-wider text-slate-500 font-medium">
                  Live sync 间隔
                </div>
                <div className="mt-0.5 text-sm font-mono text-slate-900">
                  {C.dataScope.liveSyncInterval}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mt-5 mb-2">
          新增可用场景
        </div>
        <div className="space-y-1.5">
          {C.implications.map((line, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
              <CornerDownRight className="w-3 h-3 text-slate-300 mt-1 flex-shrink-0" />
              <span>{line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. 里程碑 */}
      <div className="px-6 pt-6">
        <SectionLabel kicker="后续节奏">
          4. 里程碑
        </SectionLabel>
        <div className="space-y-1.5">
          {C.milestones.map((m, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
              <CornerDownRight className="w-3 h-3 text-slate-300 mt-1 flex-shrink-0" />
              <span>{m}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="h-2" />

      {/* Bottom — informational, close-only */}
      <div className="border-t border-slate-200 bg-slate-50/50 px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="text-11 text-slate-500">
            连接已生效 · 由 Devon Park 在 {C.connectedAt} 建立
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setScopeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 hover:bg-slate-100 rounded-md bg-white"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              查看 OAuth 范围
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-md"
            >
              <Check className="w-3.5 h-3.5" />
              已生效 · 关闭
            </button>
          </div>
        </div>
      </div>

      <InspectionDrawer
        open={scopeOpen}
        onClose={() => setScopeOpen(false)}
        title={`${C.service} · OAuth 范围`}
        methodologyDescription={`已授权 ${C.oauthScopeCount} 项只读权限。所有权限均限于读取,Agent 无法在 Walmart 端做修改 — 任何修改类操作需返回 Walmart 端授权。`}
        tableHeaders={["权限", "说明"]}
        tableRows={[
          ["campaigns.read", "读取广告活动列表与配置"],
          ["ad_groups.read", "读取广告组结构与状态"],
          ["performance.read", "读取每日 / 每小时表现数据"],
          ["search_terms.read", "读取搜索词报告"],
        ]}
        columnWidths={["40%", "60%"]}
      />
    </>
  );
}

function QASource({ source, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(source)}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-11 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-md bg-white text-slate-700"
    >
      {source.kind === "doc" ? (
        <FileText className="w-3 h-3 text-slate-500" />
      ) : (
        <Brain className="w-3 h-3 text-slate-500" />
      )}
      <span>{source.label}</span>
      <ArrowUpRight className="w-3 h-3 text-slate-400" />
    </button>
  );
}

function QACanvas({ activeClearance }) {
  const Q = BRAIN_OPS.qa;
  const [openSource, setOpenSource] = useState(null);
  const visible = canView(activeClearance, Q.minClearance || Q.sensitivity);
  return (
    <>
      <CanvasHeader
        kicker="问答 · 公司大脑"
        title={Q.question}
        meta={
          <>
            <Pill tone={SENSITIVITY_TONE[Q.sensitivity] || "slate"}>
              {Q.sensitivityLabel}
            </Pill>
            <Pill tone="slate">
              <Brain className="w-3 h-3" />
              查询用时 {Q.queryLatency}
            </Pill>
          </>
        }
      />

      <div className="px-6 pt-6 pb-6">
        <Card className="p-5">
          <div className="text-11 text-slate-500">
            {Q.asker} 在 {Q.askedAt} 询问 · 已查询品牌大脑
          </div>

          {visible ? (
            <>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-md p-4 bg-slate-50/40">
                  <div className="text-11 uppercase tracking-wider text-slate-500 font-medium">
                    刮胡刀产品线
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="text-2xl font-mono font-semibold text-slate-900">
                      {Q.answer.razor.blended}
                    </span>
                    <MetricTerm definition={METRIC_DEFINITIONS.blendedMargin}>
                      <span className="text-11 text-slate-500">综合毛利</span>
                    </MetricTerm>
                  </div>
                  <div className="text-11 text-slate-600 mt-1">
                    {Q.answer.razor.breakdown}
                  </div>
                </div>
                <div className="border border-slate-200 rounded-md p-4 bg-slate-50/40">
                  <div className="text-11 uppercase tracking-wider text-slate-500 font-medium">
                    牙刷产品线
                  </div>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="text-2xl font-mono font-semibold text-slate-900">
                      {Q.answer.toothbrush.blended}
                    </span>
                    <MetricTerm definition={METRIC_DEFINITIONS.blendedMargin}>
                      <span className="text-11 text-slate-500">综合毛利</span>
                    </MetricTerm>
                  </div>
                  <div className="text-11 text-slate-600 mt-1">
                    {Q.answer.toothbrush.breakdown}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-700 leading-relaxed">
                {Q.answer.analysisZh}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-2">
                  来源
                </div>
                <div className="flex flex-wrap gap-2">
                  {Q.sources.map((s) => (
                    <QASource key={s.id} source={s} onOpen={setOpenSource} />
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="text-11 uppercase tracking-wider text-slate-500 font-medium mb-2">
                  相关模式
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {Q.relatedPatterns.map((p) => (
                    <div
                      key={p.id}
                      className="border border-slate-200 rounded-md p-2.5 bg-white"
                    >
                      <div className="text-11 font-medium text-slate-900 leading-snug">
                        {p.name}
                      </div>
                      <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                        <Pill tone={PATTERN_CATEGORY_TONE[p.category] || "slate"}>
                          {PATTERN_CATEGORY_LABEL[p.category]}
                        </Pill>
                        <span className="text-10 text-slate-600">
                          <span className="font-mono tabular-nums">
                            {p.confidencePct}%
                          </span>
                        </span>
                      </div>
                      <div className="mt-1 text-10 text-slate-500">
                        录入 {p.addedAt}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-11 text-slate-500">这个回答有用吗?</span>
                    <button
                      type="button"
                      className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50"
                      title="有用"
                    >
                      <Check className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 border border-slate-200 rounded-md hover:bg-slate-50"
                      title="无用"
                    >
                      <X className="w-3.5 h-3.5 text-slate-600" />
                    </button>
                  </div>
                  <div className="relative flex-1 min-w-[200px] max-w-md">
                    <input
                      type="text"
                      disabled
                      placeholder="追问……"
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
            </>
          ) : (
            <div className="mt-4 border border-rose-200 bg-rose-50/60 rounded-md p-5">
              <div className="flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-rose-700 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-11 uppercase tracking-wider text-rose-700 font-semibold mb-1">
                    回答已被遮蔽
                  </div>
                  <div className="text-sm text-rose-900 leading-relaxed">
                    {Q.maskedAnswerNote}
                  </div>
                  <div className="text-11 text-rose-700 mt-2">
                    问题本身已被记录;来源 + 相关模式同样不可见。
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      <InspectionDrawer
        open={!!openSource}
        onClose={() => setOpenSource(null)}
        title={openSource?.label}
        methodologyDescription={openSource?.detail.methodology}
        tableHeaders={["字段", "取值"]}
        tableRows={openSource?.detail.rows || []}
        columnWidths={["40%", "60%"]}
      />
    </>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  App                                                                       */
/* ────────────────────────────────────────────────────────────────────────── */

export default function App({ locale, setLocale }) {
  const [activeId, setActiveId] = useState("strategy");
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [inspectorTab, setInspectorTab] = useState("ad-architecture");
  const [inspectorWidth, setInspectorWidth] = useState(480);
  const [activeUserId, setActiveUserId] = useState(
    COMPANY_BRAIN.identity.activeUserId,
  );
  const activeUser =
    COMPANY_BRAIN.identity.users.find((u) => u.id === activeUserId) ||
    COMPANY_BRAIN.identity.users[0];

  function toggleInspectorTab(tab) {
    if (!inspectorOpen) {
      setInspectorOpen(true);
      setInspectorTab(tab);
    } else if (inspectorTab === tab) {
      setInspectorOpen(false);
    } else {
      setInspectorTab(tab);
    }
  }

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
        return <DefenseCanvas />;
      case "omnichannel":
        return <OmnichannelCanvas />;
      case "razor-blade":
        return <RazorBladeCanvas />;
      case "launch-cr":
        return <LaunchCRCanvas />;
      case "upload-q4":
        return <UploadCanvas />;
      case "connect-walmart":
        return <ConnectorCanvas />;
      case "qa-margins":
        return <QACanvas activeClearance={activeUser.clearance} />;
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
        onToggleTab={toggleInspectorTab}
        inspectorOpen={inspectorOpen}
        inspectorTab={inspectorTab}
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
        <InspectorPanel
          open={inspectorOpen}
          tab={inspectorTab}
          onTabChange={setInspectorTab}
          onClose={() => setInspectorOpen(false)}
          width={inspectorWidth}
          onWidthChange={setInspectorWidth}
          activeUserId={activeUserId}
          onSwitchUser={setActiveUserId}
          onOpenThread={setActiveId}
        />
      </div>
    </div>
  );
}
