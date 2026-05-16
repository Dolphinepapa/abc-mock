# CLAUDE.md

> Project conventions for the XNURTA Brand Operations Agent UI mock.
> Claude Code reads this file automatically. Follow these rules unless explicitly told otherwise in a session.

## What this project is

A high-fidelity interactive UI mock for the XNURTA Brand Operations Agent. Intended as **PRFAQ Appendix A9** — a stakeholder review artifact, not a production product. Reviewers are VPs and senior PMs.

Visual concept: **generative canvas** — the user (or the agent itself) initiates a conversation, the agent generates a canvas response in the center. Each conversation is one capability demonstration.

**The product's interaction discipline** (this is the soul of the product):

- **Chat is the verb.** All actions happen through conversation: ask, upload, connect, modify, approve.
- **Canvas is the artifact.** Each conversation produces a structured output in the center.
- **Inspector panel is the noun.** The right-side panel shows current state of brain content / ad architecture — read-mostly inspection.
- The chat input is intentionally disabled (locked demo state). All conversations are pre-scripted.

Don't break this discipline. Everything new should fit into one of these three buckets.

## Tech stack

- **Vite + React 18** (JSX, not TypeScript for now)
- **Tailwind CSS v3** (core utility classes only; arbitrary values like `text-[10px]` don't work — use inline `style={{...}}` or the project's pre-defined `.text-10` / `.text-11` classes)
- **Recharts** for charts
- **Lucide React** for icons
- **Geist + Geist Mono** fonts (loaded via Google Fonts link in index.html)
- Deployment: **Vercel** (auto-deploys on push to main)

## File structure

```
src/
├── main.jsx                    React mount point
├── index.css                   Tailwind directives only
└── BrandOperationsAgent.jsx    THE ENTIRE MOCK — single file by design
```

The single-file structure is intentional for now (easier handoff, easier review). Don't split into a project structure unless asked.

## Layout

Three-column workspace:

```
┌────────────────────────────────────────────────────────────┐
│ Top bar                                                    │
├──────────┬─────────────────────────────┬───────────────────┤
│          │                             │                   │
│   Chat   │     Canvas                  │  Inspector panel  │
│  (320px) │     (flex, main viewport)   │  (closed default; │
│          │                             │   480px when open,│
│          │                             │   draggable width)│
│          │                             │                   │
└──────────┴─────────────────────────────┴───────────────────┘
```

- **Left chat panel** (320px, fixed): persistent multi-thread sidebar. Each thread can have multiple turns. Threads grouped by "Agent-flagged" (proactive alerts, top) and "Your conversations" (user-initiated, below).
- **Middle canvas**: rich generative output from the selected conversation. Strategy / Defense / Omnichannel / Launch CR / Razor-blade canvases are "heavy" canvases (full structured plans). Q&A canvases are "light" (single card with answer + sources).
- **Right inspector panel**: closed by default. Top-bar buttons (`Ad architecture`, `Company Brain`) open it. Internal tabs switch between content. Draggable boundary between canvas and inspector (range 360-720px).

## Visual design

### Color palette — strict

- **Slate** (50-900) for all neutrals — backgrounds, borders, text, dividers
- **Emerald-600** is the ONLY accent color for positive signals: agent identity, recommendations, "approve" actions, healthy metrics
- **Rose-50/200/700** for alerts, gaps, negative diagnostics, "flagged" items, attack warnings
- **Amber-50/200/700** for cautionary / brand-team-action states, hard constraints, informational insights
- **Blue-50/200/700** for defensive postures and "Internal" sensitivity tag (use sparingly)

Do not introduce indigo, purple, teal, sky, or any other accent color without explicit ask.

### Typography

- All body text: Geist (sans)
- All numbers, codes, technical labels: Geist Mono with `font-variant-numeric: tabular-nums`
- Headers: tracking-tight, font-semibold
- Section labels (small caps style): `text-xs uppercase tracking-wider text-slate-500 font-medium`

### Layout patterns

- Top bar: 56px (`h-14`)
- Left chat panel: 320px (`w-80`)
- Inspector panel: 480px default when open (range 360-720, user-draggable)
- Cards: `bg-white border border-slate-200 rounded-lg`
- Hairline dividers: `border-slate-200` or `border-slate-100` for subtler

### Density and tone

- **Linear / Vercel refined minimalism**. Dense data presentation, sharp typography, restrained color.
- Disclaimers and caveats should be brief. Main answer takes the space.
- No emojis anywhere in mock content. Icons via lucide-react only.
- No marketing language. No "powerful," "revolutionary," "seamless," "next-gen." Operational tone.
- No placeholders. No "Lorem ipsum," no "TODO," no "Coming soon." Every label and number is fully specified.

## Canvas rhythm — every canvas follows this 4-part shape

Every canvas the agent generates follows the same logical rhythm. This is the agent's "operating manual" voice — it's how an experienced ops director walks you through any problem.

### 1. 现状 · Current state

What's happening right now. Concrete numbers, not interpretation.
*Examples*: BSR #10 · sales $42K/mo · TACoS 18.4%. Bedroom cluster CR 2.1%. Competitor SKU-X bidding +180% on hero keywords past 96hr.

### 2. 具体问题 · Specific problem

The diagnosis. Where the gap is and (when knowable) why.
*Examples*: Pickup cluster CR 6.3pp below benchmark — main image lacks pickup context. Bedroom keywords organic rank #18 vs best #4 — listing content doesn't signal bedroom relevance.

### 3. 具体建议 · Specific recommendation

What to do, concretely. Phase plan, hypothesis cards, posture options — the form varies, but it must be specific actions with expected metrics, not abstract advice.

### 4. 里程碑 · Milestones

How we'll know it's working. Gates, target metrics, dates. Forward-looking artifact the user can hold the agent accountable to.

**If a canvas is missing any of these four sections, it's incomplete.** If a section is weak (vague language, no numbers, no source), strengthen it.

### Don't muddle the rhythm

- 现状 should NOT contain recommendations or hypothesis ("we should..." belongs in 建议, not 现状)
- 问题 should NOT prematurely jump to solutions
- 建议 should NOT recap 现状 — the reader has it above
- 里程碑 should be measurable, not aspirational ("become a category leader" is not a milestone; "BSR ≤ 5 by Q3-end" is)

### Hard constraints come first

If the case has hard constraints (price locked, margin floor, inventory cap), put them in a callout BEFORE 现状. This frames every section below — readers should know what's off the table before they evaluate the plan.

## Agent voice and operator discipline

This section is the agent's voice manual. The product's stakeholders read these canvases and decide whether the agent feels like "an experienced ops director" or "a consulting deck generator." Voice matters more than feature completeness.

### Say it plain

The agent talks like an experienced operator, not a strategy consultant.

| ❌ Consulting tone | ✅ Operator tone |
|---|---|
| 诊断结论: 卧室场景关键词 CTR 显著低于品类基准 | 卧室词流量上不去 — 点击率拖后腿 |
| 根因假设: 主图与详情页前 3 张图均强调客厅 | 主图都是客厅, 没有卧室场景 |
| Listing 内容变更不在平台层执行范围内 | 改主图、改文案需要品牌团队上手 |
| 基于多维度分析识别出... | 我看了下... |
| 建议在受控条件下进行 A/B 测试 | 拍一张卧室场景主图试试 |

The right column is shorter, more direct, more confident. That's what an operator sounds like. Never write the left column.

### Constraints come first; playbooks are filtered by constraints

When the agent picks a playbook from Company Brain, it's not "find the most similar prior case and copy it." It's:

1. **Identify hard constraints** (price-locked across channels, margin floor, inventory cap, etc.) — show these at the top of the canvas
2. **Filter candidate playbooks** by which ones are compatible with those constraints
3. **Pick the highest-confidence compatible playbook**
4. **If the most similar prior case is INcompatible** (e.g., it relied on a promo lever we can't use), the agent must say so explicitly — don't silently adapt and proceed

This is honest operator behavior. Example: "Bed Frame SKU-117 captured #1 with SB layer + 14-day promo. Our price is channel-locked, so the promo lever is unavailable. I'm switching to a different pattern: sustained brand-ad investment with CPC-decline dynamics. Confidence on alternative: 76%."

This explicit honesty about constraint-playbook fit is one of the agent's clearest "operator with experience" signals. Don't lose it to a smooth-sounding playbook adaptation.

### Marginal returns thinking, not slice-the-pie

When allocating budget across channels / SKUs / experiments, the agent does NOT slice the budget proportionally. It thinks at the margin: where does the next $1 produce the most additional outcome?

This requires reasoning about:

- **Saturation curves** per channel (Amazon SP at $35K may be 78% saturated; Walmart at $18K may be on the steep slope)
- **Strategic role** of each channel (Amazon = harvest demand; TikTok = create demand; Walmart = adjacent reach)
- **Cross-channel dependencies** (TikTok dollars create downstream Amazon lift — incrementality)

When showing budget allocation, always order by **marginal return ranking**, not by current spend or fairness. Never default to a "reserve" bucket unless the customer asks for one — money allocated to "reserve" is money the agent failed to think hard about.

### Honest limits

The agent should not appear omniscient. Show its limits visibly:

- Confidence scores ≤ 85% on most recommendations (90%+ looks naive)
- Some patterns flagged for revalidation when prior outcomes diverged from forecast
- Some insights labeled "informational" because the agent CAN'T execute them (brand team must)
- "I'm not sure" is a valid agent state — when data is thin, say so and propose a test
- When a precedent doesn't fit perfectly, name the gap explicitly

This is more credible than overclaiming.

## Content rules

### Brand

- Company is **ABC Home Goods** (no "Co.", no "Inc.").
- Products are referenced by **SKU + product-type descriptor** (e.g., "SKU-A · Floor Lamp", "Bed frame · SKU-117").
- No standalone product brand names (no "Reclaimed Walnut," no model names). Just SKU + descriptor.

### Team

The team that appears as conversation initiators:

- **Maya Chen** — VP, eCommerce (MC)
- **Devon Park** — Sr. Growth Manager (DP)
- **Sara Lin** — Portfolio Lead (SL)
- **Jamal Hassan** — Ops Manager (JH)

### Numbers — non-round

Never use round demo numbers. Bad: 25%, $100K, 100 keywords. Good: 37.4%, $1.04M, 94 keywords.

Exception: budgets and round-number goals stated by the user (e.g., "$100K monthly budget") are fine because they're the user's input. Agent-generated numbers must be non-round.

### Date context

Current quarter is Q2 2026 (April–June). All timestamps in the mock should be May 2026 dates. Past references can go back to 2025. Today's "now" is **May 15, 2026**.

### Jargon

Every jargon-y operational term must be wrapped in the `<MetricTerm>` component with a 1-2 sentence plain-language definition that shows on hover.

Common terms requiring `<MetricTerm>` wrap: TACoS, ACoS, LTV, blended margin, attach rate, contribution margin, SOV, CTR, CR, cohort revenue, incrementality, geographic holdout test, cost cap bidding.

Definitions live in the `METRIC_DEFINITIONS` map at the top of BrandOperationsAgent.jsx. Add to it when introducing new jargon.

## Interaction patterns

### Insight cards — two distinct types

- **Informational insight** (`<InformationalInsightCard>`): amber-tinted. The action requires brand team execution (creative work, listing content changes, OAuth approvals, etc.) — things the agent cannot do itself. Actions: "Brief listing team / Snooze / Mark resolved" (no Approve, because there's nothing for agent to execute).
- **Executable insight** (`<ExecutableInsightCard>`): emerald-tinted. The agent can execute the plan itself given approval. Actions: Approve / Modify / Decline.

Don't blur the distinction. The honest framing of "I can do this" vs. "you need to do this" is central to the product story.

### Reference precedents

When the agent references Company Brain (prior cases, playbooks), use a slate-900 dark card with:

- Brain icon + emerald accent
- Reference SKU + period + outcome
- 1-2 sentence method description
- **Critical caveat in rose if the reference doesn't apply 1:1** (e.g., "Attach rate is different, can't copy directly, needs validation" or "This relied on a promo lever we don't have, switching to alternative pattern")

Referencing precedent without caveats is dishonest. Always state what differs.

### Reasoning sections

`<ReasoningSection>` defaults to **collapsed**. Reviewer can expand to inspect the agent's reasoning chain (5-8 steps) + historical accuracy badge. Don't open by default — keeps canvas clean.

### Inspector panel (right side)

- Closed by default; opened via top-bar buttons (`Ad architecture`, `Company Brain`, future ones)
- Internal tabs switch between inspector content
- Draggable left boundary (360-720px range)
- **Read-mostly**. Most actions trigger a chat conversation instead of direct in-panel changes.
- **Direct actions allowed in panel** (the few exceptions): revoke decision class, filter/search, switch demo user (mock affordance), expand/collapse sections, click "View source ↗" links.
- **Direct actions forbidden in panel**: upload, connect, ask Q&A, modify playbook, edit defaults, add pattern manually.

### Action bars

Approve / Modify / Decline button order, with Approve in emerald-600 (right-most), Modify in white-bordered (middle), Decline in low-emphasis text (left). Modify expands an inline plain-language input field, not a modal.

### Time-sensitive callouts

When agent recommends action within a deadline (e.g., Defense case): amber callout above the approval bar with a clock icon and clear "decide within Xh" framing.

## Conversation panel

- **Multi-thread structure**. Each conversation is a persistent thread that can have multiple turns.
- **Two groups**: "Agent-flagged" (proactive alerts, emerald accent, top of sidebar) and "Your conversations" (user-initiated, below).
- Each thread expands inline when selected, showing full message history (user ↔ agent turns).
- Bottom-locked "Start new conversation..." input (disabled in mock).
- Per-thread locked "Reply..." input at bottom of expanded thread (disabled in mock).

The mock chat input is intentionally read-only. All interaction lives in the canvas + inspector panel via clicks, hovers, drags.

### Agent-initiated threads

Some threads are started by the agent (proactive monitoring alerts, like the Defense case). Visual:

- "Flagged by agent · [trigger reason]" pill in thread header
- Agent sparkle icon as initiator avatar (not a person)
- "Unread" indicator until viewed
- Appears at TOP of sidebar in "Agent-flagged" group

### Brain operation threads

Some threads are about Brain operations (upload, connect, Q&A). They look like normal threads but the resulting canvas is different:

- **Heavy canvases** (Strategy / Omnichannel / Defense / Launch CR / Razor-blade): full structured plan with sections, tables, action bars
- **Light canvases** (Q&A): single card with question + answer + sources + sensitivity tag — not a full plan

Reviewers should see both forms; both are valid agent outputs.

## Sensitivity tag system

For Brain content and Q&A answers, every data point has a sensitivity tag:

- **Public** (slate) — anyone can see
- **Internal** (blue) — team members
- **Sensitive** (emerald) — VP-level
- **Confidential** (rose) — C-level / restricted

`canView(userClearance, contentTag)` gates display. When a user can't see content, render an **informative mask** (not a silent blur): "Tagged: [Tag]. Restricted at your clearance. Available to [minimum role]."

## Number / data principles

- **Internal consistency matters more than precision**. If summary says "94 keywords" then the sum of keyword counts across ad groups must = 94. If blended margin is 38%, the underlying razor + blade margins must arithmetically produce that.
- **Plausibility over precision**. Real-world Amazon TACoS for a Mature product is 15-25%, not 8% or 45%. Stay in plausible bands.
- **Asymmetric numbers tell better stories**. Bedroom cluster CR 1.1% vs benchmark 2.8% is a stronger gap than 1.1% vs 1.5%. Make gaps meaningful.
- **Confidence scores between 65-85%**. Above 90% looks naive; below 60% undermines the recommendation.

## Anti-patterns (don't do these)

- ❌ **Multi-tab Stage 2** (Optimization with growth + peak sub-tabs). Each capability gets its own conversation thread.
- ❌ **Sidebar nav as 4 fixed modules**. The 4 agent capabilities (Strategy/Optimization/Execution/Learning) are NOT a menu. The whole point of generative canvas is that conversations drive canvases — not fixed nav.
- ❌ **"Approve full plan"** as the only action when there are multiple distinct insights. Per-insight approval respects the reviewer's right to slice.
- ❌ **Round demo numbers** (25%, $100K daily budget, 100 keywords).
- ❌ **Agent appearing omniscient**. Confidence ≤ 85%. Some insights are informational (brand team must execute). Some patterns flagged for revalidation.
- ❌ **Emoji in mock content**. Lucide icons only.
- ❌ **Marketing language**. The reviewers are operators; they're allergic to it.
- ❌ **Arbitrary Tailwind values** (`text-[10px]`, `max-w-[420px]`). Use inline style or pre-defined utility classes.
- ❌ **Consulting-deck voice** (诊断 / 根因假设 / 不在执行范围内 / 多维度分析). Use operator voice.
- ❌ **Smooth playbook adaptation**. If a precedent doesn't fit the constraints, say so explicitly and pick a different pattern. Don't silently lower confidence and proceed.
- ❌ **Slice-the-pie budget allocation**. Allocate by marginal return ranking, not proportional split. Don't default to a "reserve" bucket.
- ❌ **Direct upload / connect / Q&A in inspector panel**. These must go through chat.
- ❌ **Hiding agent limits**. If data is thin, say so and propose a test.
- ❌ **Skipping any of the 4 canvas rhythm parts** (现状 / 问题 / 建议 / 里程碑). A canvas missing one of these is incomplete.

## Workflow

### Commits

Each meaningful change = one commit. Commit messages describe the user-visible change, not the implementation. Examples:

- ✅ "Add scenario sub-segment breakdown to gap analysis"
- ✅ "Fix Phase 3 sales projection to reflect best-seller halo"
- ❌ "Update STRATEGY constant"
- ❌ "Fix bug"

### Verification before commit

Before committing, mentally check:

- All `<MetricTerm>` wraps have definitions in METRIC_DEFINITIONS
- No emoji slipped into JSX strings
- Numbers feel plausible and non-round
- New color usage matches the strict palette (slate/emerald/rose/amber/blue only)
- New Tailwind classes are core utility classes (no arbitrary values)
- Brand name is "ABC Home Goods" everywhere
- Canvas has all 4 rhythm sections (现状 / 问题 / 建议 / 里程碑)
- If hard constraints apply, they appear in a callout at the top of the canvas
- If referencing a playbook, the constraint compatibility is stated (especially if NOT compatible)
- Language passes the "say it plain" test (no 诊断 / 根因假设 etc.)
- Budget allocations ordered by marginal return ranking, not proportional split

### Big structural changes

Before refactoring more than ~200 lines or touching multiple canvases, summarize the plan in chat first and wait for go-ahead. Don't do speculative large refactors.

## Reference: existing primitives in src/BrandOperationsAgent.jsx

If you're adding something new, check if these already exist:

### Visual primitives

- `<Pill tone="slate|emerald|rose|amber|blue|dark">` — small status labels
- `<Card>` — bordered white container
- `<SectionLabel kicker>` — small-caps section header
- `<CanvasHeader kicker title meta>` — top of each canvas

### Content primitives

- `<MetricTerm definition>` — jargon wrapper with hover tooltip; definitions in METRIC_DEFINITIONS
- `<InformationalInsightCard insight>` — amber, brand-team-action type
- `<ExecutableInsightCard insight>` — emerald, agent-can-execute type
- `<ReasoningSection reasoning>` — collapsible reasoning chain (defaults closed)
- `<GapCard gap>` — current vs benchmark comparison with bar
- `<PerformanceStrip>` — segment chips + gap cards + breakdown table

### Strategy-specific

- `<SegmentBreakdownTable rows>` — sub-segment data with organic/ad position decomposition
- `<AdArchitectureTable>` — ad group rows with keyword drill-down

### Drawers and panels

- `<InspectionDrawer>` — generic drawer for analysis methodology + data audit
- Inspector panel — three-column layout's right side with tabs

When adding new components, follow these primitives' style (border-slate-200, rounded-md, Geist Mono for numbers, text-11 for small caps).
