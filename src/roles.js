// Multi-role account system — see multi-role-cmo-spec.md Phase A.3
// Phase A only wires the top-bar switcher + global role state.
// Phase B/C/D/E/F+G will read these flags to filter conversations,
// gate clearance, and pick default canvases.

export const ROLE_IDS = ["cmo", "maya", "devon"];
export const DEFAULT_ROLE = "maya";

export const ROLES = {
  cmo: {
    id: "cmo",
    initials: "CMO",
    level: "L9",
    clearance: "Confidential",
    defaultCanvas: "supervision",
    visibleConversations: "all_strategic",
  },
  maya: {
    id: "maya",
    initials: "MC",
    level: "L7",
    clearance: "Sensitive",
    defaultCanvas: "empty",
    visibleConversations: "own_and_team",
  },
  devon: {
    id: "devon",
    initials: "DP",
    level: "L6",
    clearance: "Internal",
    defaultCanvas: "empty",
    visibleConversations: "own_only",
  },
};

// Thread ownership — maps thread.id → role.id of the human who owns it.
// Drives sidebar filtering: Maya sees own + team, Devon sees own only,
// CMO sees a bespoke supervision sidebar (not derived from this map).
export const THREAD_OWNERS = {
  defense: "maya",
  "daily-report": "maya",
  strategy: "maya",
  omnichannel: "devon",
  "razor-blade": "maya",
  "launch-cr": "devon",
  "upload-q4": "maya",
  "qa-margins": "maya",
};

// Items that exceed VP autonomous authority and need CMO approval.
// Drives the "待审批 · 2 件" group at the top of the CMO sidebar.
export const STRATEGIC_THREAD_IDS = ["strategy", "razor-blade"];

// Phase D · CMO challenge canvas — pre-scripted per spec D.4.
// Keyed by the proposal threadId so [质疑] on strategy opens
// CHALLENGE_THREAD_IDS.strategy etc.
export const CHALLENGE_THREAD_IDS = {
  strategy: "challenge-strategy",
  "razor-blade": "challenge-razor-blade",
};
export const PROPOSAL_FOR_CHALLENGE = {
  "challenge-strategy": "strategy",
  "challenge-razor-blade": "razor-blade",
};

// Phase E · CMO sidebar pattern id → Company Brain panel pattern id.
// Only brand-ad CPC is already in brain.patterns; the other two are
// new entries this week and will land in brain.patterns in Phase G.
export const BRAIN_PATTERN_ID = {
  "pattern-brand-cpc": "pat-brand-ad-cpc",
};
export const PATTERN_REVISION_BY_BRAIN_ID = Object.fromEntries(
  Object.entries(BRAIN_PATTERN_ID).map(([sidebar, brain]) => [brain, sidebar]),
);

// Pattern-audit "thread" ids — analogous to challenge thread ids.
// activeId='pattern-audit-<sidebarId>' opens the PatternAuditCanvas.
export const PATTERN_AUDIT_PREFIX = "pattern-audit-";
export const SIDEBAR_PATTERN_IDS = [
  "pattern-brand-cpc",
  "playbook-peak-defense",
  "pattern-razor-pricing",
];

// Phase F · Which canvases cite which patterns. When CMO adopts or
// parks a revision, every canvas listed here gets a top banner so the
// reader (Maya/Devon) sees the precedent has moved underneath them.
export const CANVAS_PATTERN_CITATIONS = {
  strategy: ["pattern-brand-cpc"],
  omnichannel: ["pattern-brand-cpc"],
  defense: ["playbook-peak-defense"],
  "razor-blade": ["pattern-razor-pricing"],
};

// Maya's direct reports — used to compute "你的团队" group.
export const MAYA_REPORT_ROLES = ["devon"];

export const ROLE_LABELS = {
  zh: {
    cmo: {
      name: "CMO",
      title: "首席营销官",
      clearance: "机密",
      scope: "跨产品线 · 监督 + 审批",
    },
    maya: {
      name: "Maya Chen",
      title: "电商副总裁",
      clearance: "敏感",
      scope: "全产品线 · 战略 + 毛利",
    },
    devon: {
      name: "Devon Park",
      title: "运营",
      clearance: "内部",
      scope: "执行 · 投放 / 新品 / 日常运营",
    },
    header: "当前以 {{name}} 身份查看",
    sectionTitle: "切换演示账号",
    footnote: "切换会重新加载会话列表和权限",
  },
  en: {
    cmo: {
      name: "CMO",
      title: "Chief Marketing Officer",
      clearance: "Confidential",
      scope: "Portfolio-wide · oversight + approval",
    },
    maya: {
      name: "Maya Chen",
      title: "VP eCommerce",
      clearance: "Sensitive",
      scope: "Portfolio-wide · strategy + margin",
    },
    devon: {
      name: "Devon Park",
      title: "Operator",
      clearance: "Internal",
      scope: "Execution · paid media / launches / daily ops",
    },
    header: "Viewing as {{name}}",
    sectionTitle: "Switch demo account",
    footnote: "Switching reloads conversation list and permissions",
  },
};
