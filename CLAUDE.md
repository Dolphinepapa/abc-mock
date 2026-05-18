# CLAUDE.md

> Claude Code reads this automatically. Follow these unless told otherwise.

## What this is

A UI mock for stakeholder review. **Readers are operators (VPs, senior PMs)** — they read fast, hate marketing language, and judge credibility from how dense and specific the numbers are.

**Interaction discipline — the soul of the product:**

- **Chat is the verb.** All actions through conversation (ask, upload, connect, modify, approve).
- **Canvas is the artifact.** Each conversation produces a structured output in the center.
- **Inspector panel is the noun.** Right side shows current state of brain / ad architecture — read-mostly.

Chat input is intentionally disabled; all conversations are pre-scripted.

## Canvas rhythm — every canvas has 4 parts

1. **现状 · Current state** — concrete numbers, not interpretation
2. **具体问题 · Specific problem** — diagnosis (where the gap is, why if knowable)
3. **具体建议 · Specific recommendation** — concrete actions with expected metrics
4. **里程碑 · Milestones** — gates, target metrics, dates

If hard constraints apply (price locked, margin floor, inventory cap), put them in a callout **before 现状**.

Don't muddle: 现状 has no recommendations; 问题 doesn't jump to solutions; 建议 doesn't recap 现状; 里程碑 is measurable, not aspirational.

## Agent voice

The agent talks like an experienced operator, not a strategy consultant.

| ❌ Consulting tone | ✅ Operator tone |
|---|---|
| 诊断结论: 卧室场景关键词 CTR 显著低于品类基准 | 卧室词流量上不去 — 点击率拖后腿 |
| 根因假设: 主图与详情页前 3 张图均强调客厅 | 主图都是客厅, 没有卧室场景 |
| Listing 内容变更不在平台层执行范围内 | 改主图、改文案需要品牌团队上手 |
| 基于多维度分析识别出... | 我看了下... |
| 建议在受控条件下进行 A/B 测试 | 拍一张卧室场景主图试试 |

**Constraints filter playbooks.** When picking from Company Brain, filter by constraint compatibility first. If the closest prior case isn't compatible (e.g., relied on a promo lever we don't have), say so explicitly and pick a different pattern. Don't silently adapt.

**Marginal returns, not slice-the-pie.** Budget allocation ranked by "where does the next $1 produce the most additional outcome" — not proportional split. Never default to a "reserve" bucket.

**Honest limits.** Confidence ≤ 85% on most recommendations. Some insights are informational (brand team must execute). "I'm not sure, propose a test" is a valid agent state.

## Content rules

- **Brand**: ABC Home Goods (no Co./Inc.). Products = SKU + descriptor ("SKU-A · Floor Lamp", "Bed frame · SKU-117").
- **Team**: CMO (oversight + approval) · Maya Chen (VP eCommerce / MC, owns portfolio + strategy + margin / LTV calls) · Devon Park (Operator / DP, owns paid media + launches + day-to-day ops). **Do not invent new team members** or generic roles like "品牌运营助手". Route by case: strategy / BSR / pricing / margin → Maya · launches / paid-media tactics / daily ops → Devon.
- **Numbers**: never round. Use 37.4% not 25%, $1.04M not $1M, 94 keywords not 100. Exception: user-stated budgets/goals stay round.
- **Date**: today is May 15, 2026. Q2 2026 is current.
- **Jargon**: wrap operational terms in `<MetricTerm definition>...</MetricTerm>`. Definitions in `METRIC_DEFINITIONS` map. Common: TACoS, ACoS, LTV, blended margin, attach rate, contribution margin, SOV, CTR, CR, cohort revenue, incrementality, geographic holdout test, cost cap bidding.
- ### Jargon — Chinese vs English
When the UI is in Chinese, operational terms should be in Chinese unless the
term is a widely-used English acronym in the Chinese Amazon-ops industry
(TACoS, ACoS, BSR, ROAS, CTR, CR, SKU, ASIN, SP, SB, SD, DSP, AMC — keep
these in English).
Terms that have natural Chinese equivalents must be translated:
- Cohort revenue → 队列收入
- Blended margin → 产品线综合毛利率
- Attach rate → 绑定购买率
- LTV → 客户终身价值
- Contribution margin → 贡献毛利
- SOV → 曝光份额
- Incrementality → 增量效果
Test: would a Chinese ops director say this term in a meeting? If yes,
keep English. If they'd say it in Chinese, translate.

### Section titles

Don't use "A 节 / B 节 / Section X" formatting. Use a natural short
Chinese phrase that describes the content ("先看自己", "对照竞品",
"看下数据") in operator voice.

## Color palette — strict

- **Slate** (50-900): all neutrals
- **Emerald-600**: ONLY accent for positive signals (agent identity, recommendations, approve actions, healthy metrics)
- **Rose**: alerts, gaps, attacks, "flagged"
- **Amber**: cautionary, brand-team-action, hard constraints, informational insights
- **Blue**: defensive postures, "Internal" sensitivity tag (sparingly)

No indigo / purple / teal / sky / any other accent without explicit ask.

## Two insight card types — keep distinct

- **Informational** (amber): brand team must execute (creative, listing changes, OAuth). Actions: Brief team / Snooze / Mark resolved. **No Approve.**
- **Executable** (emerald): agent can execute itself given approval. Actions: Approve / Modify / Decline.

The honest "I can do this" vs "you need to do this" framing is central to the product story.

## Reference precedents — must have caveats

When agent references Company Brain, use slate-900 dark card with SKU + period + outcome + 1-2 sentence method. **If the reference doesn't apply 1:1, state the gap in rose** (e.g., "attach rate differs, can't copy directly"). Referencing without caveats is dishonest.

## Inspector panel

Closed by default. Top-bar buttons open it. Internal tabs switch content. Draggable boundary 360-720px.

**Read-mostly.** Most actions trigger a chat conversation, not direct in-panel changes.

- **Allowed direct in panel**: revoke decision class, filter/search, switch demo user, expand/collapse, click "View source ↗" links.
- **Forbidden direct** (must go through chat): upload, connect, ask Q&A, modify playbook, edit defaults, add pattern.

## Conversation panel

Multi-thread sidebar. Two groups: **Agent-flagged** (proactive alerts, top, emerald accent) and **Your conversations**. Selected thread expands inline showing full message turns. Locked "Start new conversation..." input at bottom.

**Agent-initiated threads** (e.g., Defense case): "Flagged by agent · [trigger]" pill, agent sparkle icon as initiator, unread indicator. When such a thread needs a human responder, pick from the 4-person team — don't invent role names.

**Canvas weight**: Strategy / Omnichannel / Defense / Launch CR / Razor-blade get **heavy canvases** (full plans). Q&A gets a **light canvas** (single card with answer + sources). Both are valid.

## Sensitivity tags

Public (slate) · Internal (blue) · Sensitive (emerald) · Confidential (rose).

`canView(userClearance, contentTag)` gates display. Masked content shows an **informative mask** (not silent blur): "Tagged: [Tag]. Restricted at your clearance. Available to [minimum role]."

## Number / data principles

- **Internal consistency over precision**. Sums must match summaries (94 keywords total → ad-group counts sum to 94).
- **Plausibility over precision**. Amazon TACoS for a Mature product is 15-25%, not 8% or 45%.
- **Asymmetric gaps tell better stories** (CR 1.1% vs benchmark 2.8% reads stronger than vs 1.5%).
- **Confidence scores 65-85%**.

## Anti-patterns

- ❌ Multi-tab Stage 2 (Optimization with growth/peak sub-tabs)
- ❌ Sidebar nav as 4 fixed modules (Strategy/Optimization/Execution/Learning are NOT a menu — conversations drive canvases)
- ❌ "Approve full plan" as the only action when there are distinct insights — per-insight approval respects user's right to slice
- ❌ Round demo numbers
- ❌ Agent appearing omniscient (90%+ confidence; no informational insights; never says "not sure")
- ❌ Emoji in mock content (lucide-react icons only)
- ❌ Marketing language ("powerful", "seamless", "next-gen", "revolutionary")
- ❌ Arbitrary Tailwind values (`text-[10px]`) — use pre-defined `.text-10` / `.text-11` or inline style
- ❌ Consulting-deck voice (诊断 / 根因假设 / 不在执行范围内 / 多维度分析)
- ❌ Smooth playbook adaptation (silently tweaking incompatible precedent and lowering confidence)
- ❌ Slice-the-pie budget allocation; default "reserve" buckets
- ❌ Upload / connect / Q&A directly in inspector panel
- ❌ Hiding agent limits when data is thin
- ❌ Skipping any of the 4 canvas rhythm parts
- ❌ Inventing new team member names

## Verification before commit

- `<MetricTerm>` wraps have definitions in `METRIC_DEFINITIONS`
- No emoji
- Numbers non-round, plausible, internally consistent
- Palette only slate / emerald / rose / amber / blue
- No arbitrary Tailwind values
- Brand name "ABC Home Goods" everywhere
- Canvas has all 4 rhythm parts; hard constraints in callout above 现状
- Playbook references include constraint-compatibility statement
- Language passes "say it plain" test
- Budget allocations by marginal return ranking
- Only the 4 team names appear as humans
