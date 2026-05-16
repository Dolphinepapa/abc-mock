# Phase 3 — Right Inspector Panel (revised v2)

> **This replaces the prior phase3 spec.** v1 proposed a full-page Brain workspace with Cursor-like modules. v2 simplifies dramatically: existing chat + canvas layout stays, just add a third panel on the right with tabs.

> **Prerequisite**: Phase 2 spec should be complete (`<MetricTerm>`, `<InspectionDrawer>`, multi-thread chat panel).

## Core concept

The product has **one interaction model**: chat → canvas. The right panel is purely an **inspection surface** that displays current state of various data — never the primary place users *do* things.

```
┌────────────────────────────────────────────────────────────────────┐
│ Top bar                                                            │
├──────────┬──────────────────────────────┬──────────────────────────┤
│          │                              │ ┌──────┬──────┬───┐      │
│   Chat   │     Canvas                   │ │ Ads  │Brain │ + │      │
│  (320px) │     (策略输出)                │ ├──────┴──────┴───┤      │
│          │                              │ │                  │      │
│          │                              │ │ Inspector panel  │      │
│          │                              │ │ (480px default,  │      │
│          │                              │ │  draggable width)│      │
│          │                              │ │                  │      │
└──────────┴──────────────────────────────┴──────────────────────────┘
                                       ↑                          
                                  可拖拽边界
```

**Rule of thumb**:
- Anything creating new state (uploading, connecting, asking) → goes through chat
- Anything inspecting current state → lives in inspector panel
- Anything reverting/revoking discrete items → can happen directly in panel as shortcut

---

## Part 1 — Three-column layout

### 1.1 Default state

- Left chat panel: 320px (unchanged)
- Middle canvas: `flex-1`
- Right inspector panel: **closed by default**

When inspector is closed, canvas fills the entire right side. No empty space.

### 1.2 Opening / closing the inspector

**Open**: click top-bar button (`Ad architecture` or `Company Brain`)
- Inspector slides in from the right, 480px default width
- The clicked button's corresponding tab becomes active
- Top-bar button gets active-state styling (slate-900 bg, white text)

**Close**: click the active top-bar button again, OR click X in panel header
- Inspector slides out
- Canvas reclaims space

**Switch tabs**: click the other top-bar button while inspector is open
- Inspector stays open, just changes which tab is active
- No animation needed for tab switch

### 1.3 Width drag

Drag handle on the left edge of the inspector panel (between canvas and inspector):
- 4px-wide strip, slate-200 normally, slate-400 on hover
- Cursor `col-resize` on hover
- Drag to resize, clamped between 360px (min) and 720px (max)
- State persists during session

### 1.4 Inspector panel header

Shared header at the top of the inspector (above all tabs):

```
┌──────────────────────────────────────────────────┐
│  [Ad architecture]  [Company Brain]  [+]    [X]  │
└──────────────────────────────────────────────────┘
```

- Tab buttons: slate-50 inactive, white + emerald accent active
- `[+]` is a placeholder/disabled (visual hint that more inspectors can be added in future)
- `[X]` close button on the far right

---

## Part 2 — Ad architecture tab (port existing content)

The existing `<AdArchitectureDrawer>` content moves into this tab. Adjustments:

- Drop the existing right-side overlay slide-in (it's already inside the panel now)
- Make the table responsive: when panel width < 540px, hide the `TACoS` and `Spend 30d` columns (least-essential); show all columns when ≥ 600px
- Keep all interaction (expand ad group → see keywords, flagged rows in rose)

The old `<AdArchitectureDrawer>` component can be **deleted or repurposed** into a pure content component (e.g., `<AdArchitectureContent>`) that the inspector renders.

---

## Part 3 — Company Brain tab (new design)

**Single column. Multiple collapsible sections.** Read-mostly. Most data display.

### 3.1 Section structure

Each section in the Brain tab has:
- Header: title + count badge + chevron (collapse/expand) — clicking the entire header bar toggles
- Body: section content, hidden when collapsed
- Hairline divider between sections

Default collapsed/expanded state (since panel is narrow, default to mostly collapsed):
- **Expanded by default**: Identity card, Recent activity
- **Collapsed by default**: everything else

### 3.2 Section: Identity card (always visible, not collapsible)

Top of the Brain tab, fixed:

```
┌──────────────────────────────────────────────────┐
│  ●  MC  Maya Chen                                │
│        VP, eCommerce · L7                        │
│        Clearance: Sensitive  [emerald pill]      │
│                                                  │
│        Switch demo user ⌄                        │
└──────────────────────────────────────────────────┘
```

`Switch demo user` dropdown toggles between:
- Maya Chen · L7 · Sensitive (default)
- Devon Park · L6 · Internal
- (Demo) Analyst · L4 · Public

Switching updates **which content is visible / masked** across all Brain sections AND in any open Q&A canvas in the middle area. This is the clearance demonstration.

### 3.3 Section: Recent activity (default expanded)

A condensed view of what's happened in the Brain recently. 5-7 entries:

```
🧠  Extracted razor-blade methodology · Q4-2025-Retrospective.pdf
    Apr 12 · Sensitive · 3 patterns added

🧠  Pattern strengthened: Best-seller capture · #2 → #1
    Apr 8 · Internal · confidence 71% → 79%

🧠  Walmart Connect API · ingested 90d historical
    Apr 5 · Internal · 12K new data points

🧠  Decision class revoked: dayparting on saturated IS
    Mar 28 · Sensitive · revoked by Maya Chen

🧠  Pattern flagged for revalidation
    Mar 22 · Confidential · Q4 actuals diverged 14%
```

Click any entry → opens an `<InspectionDrawer>` (or expands inline) with details + trace to source.

### 3.4 Section: Connectors (collapsed default)

When expanded, shows the connector list (same data as phase3 v1's Connectors module).

Each row:
- Service name + status pill
- Last-sync time
- **Manage button** is removed — management goes through chat ("Disconnect Slack" in chat)
- Exception: visual "View OAuth scope ↗" link is OK (read-only inspection)

Bottom of expanded section: small inline hint:
> "To add a new connector or modify scope, start a conversation: 'Connect [service]' or 'Update [service] scope'"

### 3.5 Section: Uploaded documents (collapsed default)

List of uploaded docs (same as phase3 v1).

- No drop zone in panel (uploads happen via chat)
- Each row: filename, type icon, status badge, distilled-patterns count, upload date
- Right-click or 3-dot menu on each row: "View source", "View extracted patterns", "Remove from brain"
- Bottom inline hint:
> "To upload a new document, start a conversation: 'Upload [filename]' or drag the file into the chat input"

### 3.6 Section: Captured patterns (collapsed default)

List of patterns with filter chips on top: All · Strategy · Optimization · Execution · Launch · Defense.

Each pattern card (compact, since column is narrow):
- Name
- Category pill
- Confidence score with `<MetricTerm>` wrapper
- Used-in count
- Source-count badge (indicating lineage depth)

Click any pattern card → opens `<InspectionDrawer>` with the full pattern: definition, evidence trail, where it's been applied.

### 3.7 Section: Playbooks (collapsed default)

Same data as before. List view, click to expand inline (show phases).

### 3.8 Section: Decision classes (collapsed default)

List of delegated classes. Each row has a **Revoke button** that works directly (this is one of the few exceptions to "all action through chat" — revocation is a discrete reversible toggle, fine to do in panel).

Clicking Revoke:
- Confirmation popover: "Revoke '[class name]'? Agent will require explicit approval for these actions going forward."
- Confirm → class moves to "Recently revoked" subsection at the bottom

### 3.9 Section: Brand defaults (collapsed default)

Key-value list. Each row has a small edit icon — clicking it **opens a chat conversation** pre-filled with "Update [default name] to [new value]". Not directly editable in panel (because changes to brand defaults are high-impact and should have agent reasoning + audit trail).

### 3.10 Section: Recent queries (collapsed default)

Shows recent chat questions submitted to the Brain Q&A. Each row:
- Question (truncated)
- Asker + timestamp
- Sensitivity tag
- "Open thread →" link (jumps to that chat conversation)

For lower-clearance users, restricted questions show as: `[Question restricted at your clearance]`

---

## Part 4 — Brain operations as chat conversations

Add 3 new pre-scripted conversation threads to the left chat panel demonstrating that brain operations happen through chat. These are alongside the 5 existing strategy conversations.

The chat panel structure (after phase 2) already supports multi-turn threads. Reuse that.

### 4.1 Thread: "Upload Q4 retrospective"

**Initiator**: Maya Chen
**Date**: May 12

**Turns**:
1. (Maya) "上传了 Q4-2025-Retrospective.pdf. Distill methodology and update the brain."
2. (Agent) "Parsing 47-page PDF... extracted 138K tokens of text + 12 tables + 4 charts."
3. (Agent) "Distilled 3 new patterns and updated 2 existing playbooks. Opening canvas with details."

**Canvas** (this is the canvas that appears when user clicks this thread):

Top section: Document summary card
- Filename, page count, extraction stats
- Confidence: "High signal — 8 of 47 pages contain operational learnings"

Middle section: 3 new pattern cards (each in the existing pattern card pattern)
- Pattern A: "Razor-blade attach lift via 12-day promo window"
  - Confidence: 74%
  - Source pages: pp. 14, 19, 23-25
  - Sensitivity: Sensitive
  - Categories: Strategy, Optimization
- Pattern B: "Holiday-driven CR inflation on category-broad keywords"
  - Confidence: 68%
  - Source pages: pp. 8-9, 31
  - Sensitivity: Internal
  - Categories: Optimization
- Pattern C: "Inventory-coupling effect on best-seller halo duration"
  - Confidence: 71%
  - Source pages: pp. 36-38, 42
  - Sensitivity: Sensitive
  - Categories: Strategy, Defense

Bottom section: 2 playbook updates
- "Best-seller capture · #2 → #1" — added new phase consideration (inventory check before promo)
- "Peak season SOV defense" — confidence raised from 71% → 78%

Bottom action bar:
- Approve all → integrate into brain
- Selectively approve (checkbox each)
- Defer (mark for human review)
- Reject (don't ingest)

### 4.2 Thread: "Connect Walmart Connect API"

**Initiator**: Devon Park
**Date**: May 10

**Turns**:
1. (Devon) "Connect Walmart Connect API for our Floor Lamps account"
2. (Agent) "I need OAuth authorization from a Walmart admin. Sending the auth request to maya.chen@abchomegoods.com (account admin). [Authorize ↗ button shown — visual only in mock]"
3. (Agent) "Authorization received. Connection established. Ingesting last 90 days of data — should complete in ~12 minutes."
4. (Agent · 12 min later) "Ingestion complete. 8 tables synced, 12,400 historical events indexed. Ready for analysis. Opening canvas with what's now accessible."

**Canvas**:

Top: Connection status card
- Service: Walmart Connect API
- Connected by: Devon Park, May 10, 14:22
- OAuth scope: [list of permissions granted]
- Sync status: Live · last event 4 min ago

Middle: Data scope card
- 8 tables synced (campaigns, ad groups, keywords, daily performance, search terms, etc.)
- 12,400 historical events indexed
- 90-day backfill: complete
- Live sync: every 15 min

Bottom: Implication card
- "What's newly possible now that Walmart is connected:"
- "Cross-platform analysis (Amazon ↔ Walmart) — see conversation #2"
- "Walmart-specific competitive monitoring"
- "Walmart Connect ad architecture inspection — accessible in Ad architecture panel"

### 4.3 Thread: "Compare razor and toothbrush margins" (Q&A)

**Initiator**: Sara Lin
**Date**: May 13

**Turns**:
1. (Sara) "Compare razor and toothbrush product line margins"
2. (Agent) [answer] — Opens minimal Q&A canvas

**Canvas** (compact, since it's a Q&A, not a strategic plan):

A single card with:
- Question (echoed at top)
- Sensitivity tag: "Confidential"
- Asked by: Sara Lin · May 13, 10:14
- Answer body (detailed comparison)
  - Razor line: blended margin **38%** (razor 24% · blade 64%)
  - Toothbrush line: blended margin **42%** (handle 28% · heads 58%)
  - Comparative analysis: "Both well above 15% floor. Razor has more headroom in blade pricing; toothbrush has higher <MetricTerm>attach rate</MetricTerm> (78% vs 47%)."
- Sources (clickable chips):
  - ↗ Pricing-Strategy-2026.xlsx (pp. 12-14)
  - ↗ Pattern: Razor-blade attach lift
  - ↗ Pattern: Toothbrush-head attach durability
- Related patterns: 3 cards showing patterns that informed this answer
- Bottom: "Was this answer helpful?" with thumbs up/down + a "Ask follow-up" affordance that adds a turn to the thread

**Clearance demo**: When user switches identity card to Analyst · L4 · Public, this canvas shows:
- The answer body is replaced with: "Tagged: Confidential. Restricted at your clearance. Available to L6+ at Sensitive clearance. Contact admin for access."
- Sources and related patterns also masked
- Question echo at top remains visible (the question itself is logged but not the answer)

---

## Part 5 — Direct actions allowed in inspector panel (the exceptions)

The general rule is "all interaction through chat", but these direct actions in panel are OK because they're discrete, low-stakes, or naturally fit panel context:

| Action | Location | Why allowed |
|---|---|---|
| Revoke decision class | Brain · Decision classes section | Discrete toggle, reversible, panel context fits |
| Filter patterns by category | Brain · Captured patterns section | Pure read filter |
| Search Brain (text input) | Top of any section | Pure read query |
| Switch demo user (clearance) | Identity card | Mock affordance |
| Click pattern card to inspect | Anywhere | Opens drawer for read-deeper |
| Expand/collapse sections | Section headers | UI navigation |
| Click "View source ↗" link | Anywhere | Read jump |

These are NOT allowed in panel (must go through chat):
- Upload new document
- Connect new service
- Disconnect service
- Modify connector scope
- Add new pattern manually
- Edit / merge / delete patterns
- Modify playbook
- Edit brand defaults
- Ask a question (Q&A)

---

## Part 6 — Cross-cutting sensitivity tag system

Same as phase3 v1 Part 6. Reproduce here for completeness:

```js
const SENSITIVITY_TAGS = {
  Public:       { color: "slate",   minClearance: "Public",       label: "Public" },
  Internal:     { color: "blue",    minClearance: "Internal",     label: "Internal" },
  Sensitive:    { color: "emerald", minClearance: "Sensitive",    label: "Sensitive" },
  Confidential: { color: "rose",    minClearance: "Confidential", label: "Confidential" },
};

const CLEARANCE_LEVELS = ["Public", "Internal", "Sensitive", "Confidential"];

function canView(userClearance, contentTag) {
  return CLEARANCE_LEVELS.indexOf(userClearance) >= CLEARANCE_LEVELS.indexOf(contentTag);
}
```

When `canView` returns false, render a masked stub instead of the content. Stub format:
> Tagged: [Tag]. Restricted at your clearance. Available to [minimum role] at [minimum clearance].

---

## Part 7 — Build order

1. **Part 1** — Three-column layout, drag-resize boundary, top-bar button wiring
2. **Part 2** — Port AdArchitecture content from existing drawer into Ad architecture tab
3. **Part 3.1–3.3** — Brain tab shell: identity card + Recent activity section
4. **Part 3.4–3.10** — Remaining Brain sections (collapsible, read content)
5. **Part 4** — 3 new chat threads + their canvases (Upload / Connector / Q&A)
6. **Part 5** — Wire the "direct actions" (revoke decision class, etc.)
7. **Part 6** — Sensitivity tagging applied consistently across all displays

Each part ~30-45 min in Claude Code. Recommend committing after each.

---

## Design principles (preserve from phase3 v1)

### Transparency is the soul of the Brain

Every distilled pattern, every captured insight, every log entry must trace back to its source. Even in the compact panel view, the source link is always visible (small "↗" suffix or expandable lineage).

### Honest limits

Some patterns have lower confidence (60-70%). Some uploaded docs distill no patterns (status stays "Indexed" forever). When patterns get flagged for revalidation because actuals diverged, show that visibly — it builds trust.

### Role-aware, not redacted

When a lower-clearance user can't see content, the mask is **informative**: tells them what category of content it is, who can see it, and how to request access.

### MCP/API abstraction is intentional

In the UI, never distinguish between MCP-based and direct-API connectors. The user shouldn't care. The abstraction is product value.

### Chat is the verb. Panel is the noun.

Everything that *does* something happens in chat. The panel only *shows* current state. This separation is the entire product's interaction discipline — don't break it.

---

## Notes for Claude Code

- Reuse `<MetricTerm>`, `<InspectionDrawer>` from phase 2
- Brain section content reuses the data structures from phase3 v1 (connectors list, uploaded docs, methodology log, patterns, playbooks, decision classes, brand defaults). Just render in a single-column collapsible format instead of three-column workspace.
- The 3 new chat threads (Upload / Connector / Q&A) follow the same multi-turn pattern as the Defense thread from phase 2 (agent-initiated turns are allowed)
- For the Q&A canvas (Thread 4.3), keep it minimal — a single Card, not a multi-block canvas. Q&A doesn't need to look like a strategic plan.
- When inspector panel width < 360px (edge case if user drags below min), just clamp; don't try to make Brain sections responsive below that.
