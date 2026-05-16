# CLAUDE.md

> Project conventions for the XNURTA Brand Operations Agent UI mock.
> Claude Code reads this file automatically. Follow these rules unless explicitly told otherwise in a session.

## What this project is

A high-fidelity interactive UI mock for the XNURTA Brand Operations Agent. Intended as **PRFAQ Appendix A9** — a stakeholder review artifact, not a production product. Reviewers are VPs and senior PMs.

Visual concept: **generative canvas** — the user (or the agent itself) initiates a conversation, the agent generates a canvas response on the right. Each conversation is one capability demonstration. The chat input is intentionally disabled (locked demo state).

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

## Visual design

### Color palette — strict

- **Slate** (50-900) for all neutrals — backgrounds, borders, text, dividers
- **Emerald-600** is the ONLY accent color for positive signals: agent identity, recommendations, "approve" actions, healthy metrics
- **Rose-50/200/700** for alerts, gaps, negative diagnostics, "flagged" items
- **Amber-50/200/700** for cautionary / brand-team-action states (informational insights)
- **Blue-50/200/700** for defensive postures (use sparingly, only when blue is semantically meaningful)

Do not introduce indigo, purple, teal, sky, or any other accent color without explicit ask.

### Typography

- All body text: Geist (sans)
- All numbers, codes, technical labels: Geist Mono with `font-variant-numeric: tabular-nums`
- Headers: tracking-tight, font-semibold
- Section labels (small caps style): `text-xs uppercase tracking-wider text-slate-500 font-medium`

### Layout patterns

- Top bar: 56px (`h-14`)
- Left chat panel: 320px (`w-80`)
- Main canvas: flex-1, contained at max-width 1200px
- Cards: `bg-white border border-slate-200 rounded-lg`
- Hairline dividers: `border-slate-200` or `border-slate-100` for subtler

### Density and tone

- **Linear / Vercel refined minimalism**. Dense data presentation, sharp typography, restrained color.
- Disclaimers and caveats should be brief. Main answer takes the space.
- No emojis anywhere in mock content. Icons via lucide-react only.
- No marketing language. No "powerful," "revolutionary," "seamless," "next-gen." Operational tone.
- No placeholders. No "Lorem ipsum," no "TODO," no "Coming soon." Every label and number is fully specified.

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

Never use round demo numbers. Bad: 25%, $100K, 100 keywords. Good: 37.4%, $1.04M, 94 keywords. This is non-negotiable — round numbers signal "demo" instantly to experienced reviewers.

Exception: budgets and round-number goals stated by the user (e.g., "$100K monthly budget") are fine because they're the user's input. Agent-generated numbers must be non-round.

### Date context

Current quarter is Q2 2026 (April–June). All timestamps in the mock should be May 2026 dates. Past references can go back to 2025 (e.g., "Q4 2025 launch"). Today's "now" is **May 15, 2026**.

### Jargon

Every jargon-y operational term must be wrapped in the `<MetricTerm>` component (defined in src/BrandOperationsAgent.jsx) with a 1-2 sentence plain-language definition that shows on hover. Examples: TACoS, ACoS, LTV, blended margin, attach rate, SOV, CTR, CR, incrementality, geographic holdout test, cost cap bidding.

Definitions live in the `METRIC_DEFINITIONS` map at the top of BrandOperationsAgent.jsx. Add to it when introducing new jargon.

## Interaction patterns

### Insight cards — two distinct types

Use these exact patterns when designing canvas content:

- **Informational insight** (`<InformationalInsightCard>`): amber-tinted. Used when the action requires brand team execution (creative work, listing content changes, etc.) — things the agent cannot do itself. Actions: "Brief listing team / Snooze / Mark resolved" (no Approve, because there's nothing for agent to execute).
- **Executable insight** (`<ExecutableInsightCard>`): emerald-tinted. Used when the agent can execute the plan itself given approval. Actions: Approve / Modify / Decline.

Don't blur the distinction. The honest framing of "I can do this" vs. "you need to do this" is central to the product story.

### Reference precedents

When the agent references Company Brain (prior cases, playbooks), use a slate-900 dark card with:
- Brain icon + emerald accent
- Reference SKU + period + outcome
- 1-2 sentence method description
- **Critical caveat in rose if the reference doesn't apply 1:1** (e.g., "Attach rate is different, can't copy directly, needs validation")

Referencing precedent without caveats is dishonest. Always state what differs.

### Reasoning sections

`<ReasoningSection>` defaults to **collapsed**. Reviewer can expand to inspect the agent's reasoning chain (5-8 steps) + historical accuracy badge. Don't open by default — keeps canvas clean.

### Drawers

Side drawers (Company Brain, Ad Architecture, InspectionDrawer for analysis logic) overlay from the right at width `min(1040px, 78vw)` for data-heavy drawers, or 420px for lighter drawers. All accessed from the top bar's button row or inline "View [X] ↗" links.

### Action bars

Approve / Modify / Decline button order, with Approve in emerald-600 (right-most), Modify in white-bordered (middle), Decline in low-emphasis text (left). Modify expands an inline plain-language input field, not a modal.

### Time-sensitive callouts

When agent recommends action within a deadline (e.g., Defense case): amber callout above the approval bar with a clock icon and clear "decide within Xh" framing.

## Conversation panel

- Multi-thread structure (each conversation is a persistent thread)
- Threads in two groups: **Agent-flagged** (proactive alerts, emerald accent, top of sidebar) and **Your conversations** (user-initiated, below)
- Each thread expands inline to show its full message history (user ↔ agent turns)
- Bottom-locked "Start new conversation..." input (disabled in mock)
- Per-thread locked "Reply..." input at bottom of expanded thread (disabled in mock)

The mock is intentionally read-only for the chat input. All interaction lives in the canvas: clicking insight cards, expanding rows, switching chip filters, hovering metric terms.

## Number / data principles

When generating mock data:

- **Internal consistency matters more than precision**. If summary says "94 keywords" then the sum of keyword counts across ad groups must = 94. If blended margin is 38%, the underlying razor + blade margins must arithmetically produce that.
- **Plausibility over precision**. Real-world Amazon TACoS for a Mature product is 15-25%, not 8% or 45%. Stay in plausible bands.
- **Asymmetric numbers tell better stories**. Bedroom cluster CR 1.1% vs benchmark 2.8% is a stronger gap than 1.1% vs 1.5%. Make gaps meaningful.
- **Confidence scores between 65-85%**. Above 90% looks naive; below 60% undermines the recommendation.

## Anti-patterns (don't do these)

- ❌ Multi-tab Stage 2 (Optimization with growth + peak sub-tabs). Each capability gets its own conversation thread, period.
- ❌ Sidebar navigation that treats the 4 agent capabilities as 4 fixed modules. The whole point of generative canvas is that the conversation drives the canvas.
- ❌ "Approve full plan" as the only action when there are multiple distinct insights. Per-insight approval respects the reviewer's right to slice.
- ❌ Round demo numbers (25%, $100K daily budget, 100 keywords). Looks like Lorem Ipsum to experienced operators.
- ❌ Letting the agent appear omniscient. The agent has confidence scores, sometimes ≤ 70%. Sometimes it surfaces an insight the brand team must execute. Honest > impressive.
- ❌ Emoji in mock content. Lucide icons only.
- ❌ Marketing language. The reviewers are operators; they're allergic to it.
- ❌ Arbitrary Tailwind values (`text-[10px]`, `max-w-[420px]`, `bg-[#059669]`). Doesn't work in the current Tailwind v3 setup without JIT config. Use inline style or existing pre-defined utility classes.

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

### Big structural changes

Before refactoring more than ~200 lines or touching multiple canvases, summarize the plan in chat first and wait for go-ahead. Don't do speculative large refactors.

## Reference: existing primitives in src/BrandOperationsAgent.jsx

If you're adding something new, check if these already exist:

- `<Pill tone="slate|emerald|rose|amber|blue|dark">` — small status labels
- `<Card>` — bordered white container
- `<SectionLabel kicker>` — small-caps section header
- `<CanvasHeader kicker title meta>` — top of each canvas
- `<MetricTerm definition>` — jargon wrapper with hover tooltip
- `<InformationalInsightCard insight>` — amber, brand-team-action
- `<ExecutableInsightCard insight>` — emerald, agent-can-execute
- `<ReasoningSection reasoning>` — collapsible reasoning chain
- `<GapCard gap>` — current vs benchmark comparison with bar
- `<PerformanceStrip>` — segment chips + gap cards + breakdown table
- `<SegmentBreakdownTable rows>` — sub-segment data with organic/ad position decomposition
- `<AdArchitectureTable>` — ad group rows with keyword drill-down
- `<AdArchitectureDrawer>` / `<CompanyBrainDrawer>` / `<InspectionDrawer>` — right-side overlays

When adding new components, follow these primitives' style (border-slate-200, rounded-md, Geist Mono for numbers, text-11 for small caps).
