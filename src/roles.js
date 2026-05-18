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
  "razor-blade": "sara",
  "launch-cr": "jamal",
  "upload-q4": "maya",
  "connect-walmart": "maya",
  "qa-margins": "sara",
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

// Maya's direct reports — used to compute "你的团队" group.
export const MAYA_REPORT_ROLES = ["devon", "sara", "jamal"];

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
      scope: "自己的 SKU + 3 个下属",
    },
    devon: {
      name: "Devon Park",
      title: "高级增长经理",
      clearance: "内部",
      scope: "移动充电宝",
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
      scope: "Own SKUs + 3 direct reports",
    },
    devon: {
      name: "Devon Park",
      title: "Sr Growth Manager",
      clearance: "Internal",
      scope: "Portable charger",
    },
    header: "Viewing as {{name}}",
    sectionTitle: "Switch demo account",
    footnote: "Switching reloads conversation list and permissions",
  },
};
