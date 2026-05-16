# Phase 4 — Outcomes, Graduation, TACoS Color

> Three additions: TACoS color rule (cross-cutting), Outcomes inspector tab (new), Decision class graduation in Brain (new). Recommend doing them in this order.

---

## Part 1 — TACoS color rule (cross-cutting, 30 min)

Define a small helper and apply it everywhere TACoS appears.

### 1.1 Add helper

In `BrandOperationsAgent.jsx`, near the top with other utilities, add:

```js
function tacosColorClass(value) {
  if (value < 20)  return "text-emerald-600";  // healthy
  if (value <= 40) return "text-amber-600";    // cautionary
  return "text-rose-600";                       // problematic
}

function tacosBgClass(value) {
  if (value < 20)  return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (value <= 40) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}
```

### 1.2 Build `<TacosValue>` display component

```jsx
function TacosValue({ value, size = "md" }) {
  const colorCls = tacosColorClass(value);
  const sizeCls = size === "lg" ? "text-2xl" : size === "sm" ? "text-xs" : "text-sm";
  return (
    <span className={`${colorCls} ${sizeCls} font-mono tabular-nums font-semibold`}>
      {value.toFixed(1)}%
    </span>
  );
}
```

### 1.3 Apply everywhere

Find every place TACoS is rendered and replace the inline string with `<TacosValue value={...} />`. Locations to check (not exhaustive):

- `PerformanceStrip` top summary in every canvas
- `GapCard` for TACoS gap
- `AdGroupRow` and `SegmentBreakdownTable` rows
- Phase tables in 3-phase plans (e.g., Floor Lamp Insight #2)
- Ad architecture drawer summary
- Top-bar continuous-loop banner (if it mentions TACoS)
- Outcomes inspector tab (Part 2 below)
- Any reference precedent that quotes prior TACoS

Leave the `<MetricTerm>` definition wrap intact — the wrap is on the *label* "TACoS", the color is on the *value* next to it.

### 1.4 Same rule applied implicitly elsewhere

The 20% / 40% thresholds are the brand-wide defaults from Brain → Brand defaults. If the user changes those thresholds, the helper should read from a config object. For the mock, hardcoding is fine. Keep the thresholds in the Brand defaults display so reviewers can see the link.

---

## Part 2 — Outcomes inspector tab (new top-bar button, 60-75 min)

A new tab in the inspector panel showing per-listing billing and outcomes.

### 2.1 Top-bar addition

Add a third button next to "Ad architecture" and "Company Brain": **"Outcomes"**.

Same button styling, same toggle behavior:
- Clicking opens the inspector panel with the Outcomes tab active
- If panel is open on another tab, clicking switches to Outcomes
- Clicking the active Outcomes button closes the panel

### 2.2 Inspector panel tab row

The tab row at the top of the inspector now has three tabs: `[Ad architecture] [Company Brain] [Outcomes] [+]`. Same active-state styling.

### 2.3 Outcomes tab content

Single column. Stacked sections, top to bottom.

#### Section A: Quarterly summary header (top, always visible)

```
Q2 2026 · ABC Home Goods
[Quarter selector ⌄ — clickable, defaults to current Q]

XNURTA billing this quarter
$14,820 total
├─ Subscription      $8,400  (35 listings × $240)
└─ Outcome bonus     $6,420  (12 delegated listings)

Outcome base
Q2 net revenue (delegated): $642,000
Bonus effective rate:        1.00%

Portfolio at a glance
TACoS [colored, hero-sized 24px]  17.4%
Listings under management         47
  ├─ Delegated                    12
  └─ Training                     35
Operations time saved (estimated) 4.2 FTE-weeks/mo
```

The TACoS number uses `<TacosValue value={17.4} size="lg" />`. The "saved time" number is intentionally an estimate with the word "estimated" in lower-emphasis text — honest framing.

The quarter selector dropdown shows Q1 2026 · Q4 2025 · Q3 2025 (3 prior quarters) for reviewers to see trends. Doesn't need to actually switch data in mock; pre-script Q2 only.

#### Section B: Filter + sort row

Small horizontal strip:
- Filter chips: All · Delegated · Training
- Sort dropdown: Sort by Revenue ⌄ (options: Revenue, Ad spend, TACoS, Billing)
- Search input: "Find listing..."

#### Section C: Listing list

Cards, one per listing. Compact card design (since the panel is narrow):

```
┌─────────────────────────────────────────────┐
│ SKU-A · Floor Lamp                          │
│ [Delegated · 14d ago] [emerald pill]        │
│                                              │
│ Q2 Revenue  $84,200    Q2 Ad spend  $14,062 │
│ Q2 TACoS    16.7%    [emerald-colored]      │
│                                              │
│ XNURTA billing                              │
│ $840  (outcome bonus · 1.2% of net rev)     │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SKU-PB-A · Power bank                       │
│ [Training · since Mar 8] [slate pill]       │
│                                              │
│ Q2 Revenue  $42,100    Q2 Ad spend  $7,748  │
│ Q2 TACoS    18.4%    [emerald-colored]      │
│                                              │
│ XNURTA billing                              │
│ $240  (subscription · per-listing)          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SKU-RZ-001 · Razor                          │
│ [Training · since Jan 22] [slate pill]      │
│                                              │
│ Q2 Revenue  $128,400   Q2 Ad spend $43,656  │
│ Q2 TACoS    34.0%    [amber-colored]        │
│                                              │
│ XNURTA billing                              │
│ $240  (subscription · per-listing)          │
└─────────────────────────────────────────────┘
```

Card details:

- **Header row**: SKU + descriptor, then status pill (Delegated = emerald, Training = slate)
- **Metric row**: Revenue and Ad spend side by side (use Geist Mono, tabular nums)
- **TACoS row**: large, colored by the rule from Part 1
- **Billing row**: dollar amount + parenthetical method ("outcome bonus · X%" or "subscription · per-listing")

#### Section D: Mock data — 12 listings

Mix of statuses, mix of categories. Numbers must be internally consistent (sum of subscriptions = $8,400 for 35 training listings × $240; sum of outcome bonuses = $6,420 across 12 delegated listings).

**Delegated (12 — these earn outcome bonus)**:

1. SKU-A · Floor Lamp · Rev $84,200 · Spend $14,062 · TACoS 16.7% · Bonus $840 (1.2%)
2. SKU-117 · Bed Frame · Rev $128,400 · Spend $19,260 · TACoS 15.0% · Bonus $1,310
3. SKU-LH-04 · Lounge Chair · Rev $67,800 · Spend $11,526 · TACoS 17.0% · Bonus $678
4. SKU-DR-12 · Dining Rug · Rev $42,300 · Spend $7,196 · TACoS 17.0% · Bonus $423
5. SKU-WD-08 · Wall Decor · Rev $38,200 · Spend $7,258 · TACoS 19.0% · Bonus $382
6. SKU-PL-21 · Pendant Light · Rev $54,600 · Spend $10,374 · TACoS 19.0% · Bonus $546
7. SKU-OS-03 · Office Storage · Rev $74,200 · Spend $13,356 · TACoS 18.0% · Bonus $742
8. SKU-CD-15 · Coffee Decanter · Rev $24,800 · Spend $4,712 · TACoS 19.0% · Bonus $248
9. SKU-TR-09 · Throw Pillow · Rev $48,200 · Spend $9,158 · TACoS 19.0% · Bonus $482
10. SKU-VS-04 · Vase Set · Rev $36,400 · Spend $6,552 · TACoS 18.0% · Bonus $364
11. SKU-BR-07 · Bath Rug · Rev $28,400 · Spend $5,396 · TACoS 19.0% · Bonus $284
12. SKU-OT-11 · Ottoman · Rev $14,500 · Spend $2,755 · TACoS 19.0% · Bonus $121

Total delegated revenue: $642,000 · Total ad spend: $111,605 · Net base: ~$530K · Total bonus billed: $6,420 (~1.2% of net)

**Training (35 — these pay subscription only)**:

Examples to show (don't need all 35 listed; can collapse "+ 25 more training listings" at the end):

13. SKU-PB-A · Power bank · Rev $42,100 · Spend $7,748 · TACoS 18.4% · Sub $240
14. SKU-RZ-001 · Razor (Henry's) · Rev $128,400 · Spend $43,656 · TACoS 34.0% [amber] · Sub $240 — *the higher TACoS shows the color rule firing*
15. SKU-RZ-002 · Razor Blade · Rev $44,200 · Spend $13,260 · TACoS 30.0% [amber] · Sub $240
16. SKU-TI-01 · Tire Inflator · Rev $18,600 · Spend $7,254 · TACoS 39.0% [amber] · Sub $240 — *new launch, TACoS still high*
17. SKU-TI-02 · RV Compressor · Rev $9,200 · Spend $4,968 · TACoS 54.0% [rose] · Sub $240 — *the rose case, shows the highest-cost state*
... (collapse rest as "+ 30 more training listings")

That gives reviewers a real mix: most green (healthy mature SKUs), several amber (mid-life or being tested), one rose (new launch eating ad dollars). TACoS color rule visible at a glance.

### 2.4 Section E: Below the listings, a small footnote card

```
┌─────────────────────────────────────────────┐
│ How billing works                           │
│                                             │
│ Training: $240/listing/month subscription   │
│ Delegated: 1% of (revenue − ad spend) bonus │
│                                             │
│ Delegation is the customer's call. The team │
│ promotes a listing when they trust the      │
│ agent on it. Subscription stops when bonus  │
│ begins.                                     │
│                                             │
│ See Brain → Decision classes for what's     │
│ been delegated and what's still in training.│
└─────────────────────────────────────────────┘
```

This card explains the pricing model in 50 words. Reviewers reading the PRFAQ will see this and understand.

### 2.5 Edge cases

- Narrow panel (< 400px): single-column metric rows (Revenue, Ad spend stack vertically)
- Search yields 0: "No listings match 'X'. Try a different term."
- All filter: shows all 47 (12 cards + collapse for 35)
- Sort by TACoS: amber and rose listings rise to top — useful for ops reviews

---

## Part 3 — Decision class graduation in Brain panel (75-90 min)

Extend the existing Decision classes section in the Company Brain inspector tab.

### 3.1 Restructure the section into two subsections

```
Section: Decision classes

  ▾ Currently delegated (5)
    [card 1, expandable]
    [card 2]
    ...
  
  ▾ In training (3)
    [card 1, expandable]
    [card 2]
    ...
  
  ── small footer link: "How does graduation work? ↗" ──
```

The "How does graduation work?" link opens a small inline explainer or an `<InspectionDrawer>` with the methodology.

### 3.2 Currently delegated cards (extended from existing)

For each delegated class, the card has:

**Compact view (default)**:
```
┌──────────────────────────────────────────────┐
│ Bid raise / lower (≤15% delta)               │
│ [Delegated · graduated Mar 22] [emerald pill]│
│                                              │
│ Track record since graduation                │
│ 38 autonomous executions · 94.7% on outcome  │
│ 2 exceptions raised in 30d (both correct)    │
│                                              │
│ [View graduation trail ↗]  [Revoke]          │
└──────────────────────────────────────────────┘
```

Keys:
- Title (class name)
- Status pill: "Delegated · graduated [date]"
- Track record stats: count, accuracy, exceptions
- Two actions: "View graduation trail ↗" (expand inline) and "Revoke" (existing)

**Expanded view (after clicking "View graduation trail")**:

Adds 3 sections below the compact view:

```
Pre-graduation track record (37 days · Feb 13 → Mar 22)
[Sparkline showing approval rate over time, slope rising]
- 47 agent recommendations in this class
- 44 approved by team (94%)
- 2 modified (4%)
- 1 declined (2%)
- Trending: approval rate moved from 86% (week 1) to 100% (week 5)

Graduation
Approved by: Maya Chen (VP eCommerce) on Mar 22, 2026
Threshold met: ≥ 30 consistent approvals + ≥ 92% approval rate
Authority granted: Class executes autonomously; agent surfaces
exceptions defined as outcome > 1.5σ from prediction

Post-graduation outcome
[Sparkline showing prediction-vs-actual accuracy, mostly flat]
- 38 autonomous executions
- 36 outcomes within prediction interval (94.7%)
- 2 outcomes flagged as exceptions (both correct — class behaved
  as expected, exceptions were unrelated category shocks)
```

The sparklines are simple inline SVG line charts (12-20 data points each). Don't need to be precise — just signal "trend over time".

### 3.3 In training cards (new, 3 cards)

For each in-training class:

```
┌──────────────────────────────────────────────┐
│ Bid raise on velocity-positive SKUs          │
│ [In training · 24 of 30 toward graduation]   │
│                                              │
│ Progress                                     │
│ [Progress bar: 24/30 ≈ 80%]                  │
│                                              │
│ Recent record                                │
│ 28 agent recommendations · 26 approved (93%) │
│ 2 modified · 0 declined                      │
│                                              │
│ [View recent decisions ↗]                    │
└──────────────────────────────────────────────┘
```

Three in-training classes for the mock:

1. **Bid raise on velocity-positive SKUs** · 24/30 · 93% approval rate · "Eligible for graduation review in ~6 more decisions"
2. **Inventory-aware budget pause** · 18/30 · 89% approval rate · *plus a note*: "1 declined decision: team felt the pause was premature given upcoming promo. Agent integrated the rule."
3. **DSP audience expansion** · 8/30 · 88% approval rate · "Early phase — too few decisions to assess"

The "Approve graduation" button only appears when a class meets the threshold (30 + ≥ 92%). For the mock, show it on class #1 (24/30, will pass at 30) as a disabled button: `[Approve graduation — eligible in ~6 decisions]`.

### 3.4 "How does graduation work?" explainer

Small inline explainer or drawer:

```
How graduation works

Every recommendation the agent makes is annotated with a
decision class (bid_raise, negative_keyword_harvest, etc.).
The agent tracks how the team responds to each class:
approve / modify / decline.

A class becomes eligible for autonomous execution when two
thresholds are met:
- At least 30 consistent decisions in the class
- At least 92% approval rate

When eligible, the team can review the track record and
approve graduation. Once graduated, the agent executes the
class autonomously, surfacing only exceptions (outcomes
that deviate > 1.5σ from prediction) for team review.

The team retains revocation authority at any time. Revoking
a class returns it to per-decision approval immediately.

Graduation criteria are tunable per class — high-stakes
classes (e.g., DSP budget changes > $5K/day) carry stricter
thresholds. See Brand defaults for current thresholds.
```

### 3.5 Connection to Outcomes tab

In the "How does graduation work?" explainer, add a final line:

> Once a listing has its dominant decision classes graduated, the team typically delegates the listing fully — which switches billing from subscription to outcome bonus. See **Outcomes tab** for current delegation status per listing.

This creates the conceptual link: graduation of decision classes (Brain) → delegation of listings (Outcomes) → outcome bonus (pricing). The reviewer sees the full lifecycle.

---

## Part 4 — Order of operations

1. **Part 1** (30 min) — TACoS color rule. Cross-cutting, fast, immediately visible improvement.
2. **Part 2** (60-75 min) — Outcomes inspector tab. New top-bar button + new tab content + 12 listings of mock data.
3. **Part 3** (75-90 min) — Decision class graduation in Brain. Most complex, save for last.

Commit after each part. Test the TACoS color visually after Part 1 (every existing canvas should show TACoS in the right color now — most should be green, a few amber). Part 2 should make pricing model immediately clear to a PRFAQ reviewer. Part 3 ties graduation framework to Outcomes tab.

---

## Mock data consistency notes

Few things to keep aligned across Parts 2 and 3:

- The Razor SKU-RZ-001 (Henry's) is in Training in the Outcomes tab. It should NOT appear in the delegated listings. Consistent with the razor-blade canvas (Conversation #3 was about Henry's, which is still being optimized).
- The 5 currently delegated decision classes (bid_lower, negative_keyword_harvest, etc.) should all be classes that apply to the 12 delegated listings. Don't show a delegated class that only makes sense for training listings.
- The 3 in-training decision classes should be classes that are being tested on multiple listings across the portfolio, so the "X recommendations" numbers feel real.
- Brand defaults should include the graduation thresholds (≥ 30 decisions + ≥ 92% approval) so reviewers can find where they're configured.
