# Frontend Build Spec — AITEK Demand Intelligence (React + TypeScript)

Supersedes `v0-generation-prompts.md`. Stack decision: plain React + TypeScript — no Next.js, no v0.dev. Content requirements (what each page contains) are unchanged from the earlier v0-prompt draft; what's changed is the build tooling and, importantly, the addition of real brand tokens below.

---

## 1. Stack

- **Build tool:** Vite, `react-ts` template. (Not Create React App — it's effectively deprecated.)
- **Routing:** React Router (v6/v7). Every screen gets a real route (e.g. `/solutions`, `/demand-intelligence/executive`, `/demand-intelligence/risk-exceptions`) so pages are shareable, bookmarkable, and browser back/forward works.
- **Filter state:** the shared Plant / Product / Region / Time Horizon filter bar keeps its selected values in the URL via `useSearchParams`, so filters persist automatically across page navigation and can be deep-linked (e.g. `?plant=columbus-04&product=hdpe&region=apac`).
- **Charts:** Recharts.
- **Styling:** the brand tokens in Section 2 are plain CSS custom properties (from `aitek-style-guide.html` in the AiTek-BrandGuideline folder) — framework-agnostic. Import them as a global stylesheet (`tokens.css`) and build components against them, whether with CSS Modules, styled-components, or Tailwind (map Tailwind's theme config to these same variables if you go that route — don't introduce a second, parallel color/spacing system).
- **Fonts:** Urbanist (headings/labels), Epilogue (body/UI text), JetBrains Mono (code/mono values) — loaded via Google Fonts exactly as in the style guide.

---

## 2. Brand tokens — carry these over exactly from `aitek-style-guide.html`

**Color — light is the default theme, not dark:**
- Brand Deep `#0F172B` — headings, dark sections/accents (not the page background)
- Brand Primary `#155DFC` — the *only* accent color (CTAs, links, focus rings, active states)
- Background `#FFFFFF`, Surface `#F8FAFC`, Muted `#F1F5F9`, Border `#E2E8F0`
- Body text `#45556C`, Subtle text `#90A1B9`

**Semantic (tint background + readable text, never raw color on white):**
- Success `#059669` / bg `#ECFDF5` / text `#047857`
- Warning `#D97706` / bg `#FFFBEB` / text `#B45309`
- Error `#E7000B` / bg `#FEF2F2` / text `#B91C1C`
- Info reuses Brand Primary `#155DFC` / bg `#EFF6FF` / text `#1D4ED8` — **there is no second accent color.** Info does not get its own hue.

**Dark mode — a secondary, togglable theme (system preference or explicit toggle), not the forced default:**
- Background `#0B1220`, Surface `#141F35`, Muted `#1B2A47`
- Primary `#5B93FF` (lighter, for contrast on dark)
- Body text `#C7D2E0`, Subtle `#8CA0BE`, Border `#26385A`

**Spacing scale (8px base, 4px for tight cases):** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 (`sp-1` … `sp-16`)

**Radius scale:** sm 6px (inputs, tags) · md 10px (buttons, badges) · lg 16px (cards, modals) · full (pills, switches)

**Elevation:** shadow-sm (hairline cards) · shadow-md (dropdowns) · shadow-lg (feature cards) · shadow-xl (modals)

**Components, per the guide:**
- Buttons: primary (filled blue, hover → Brand Deep), deep (filled navy), outline, ghost, destructive (quiet tint until hover — never the loudest thing on screen)
- Badges: success/warning/error/info/neutral — small dot + tint pairing, used in tables/cards/nav counts
- Alerts: 3px left-edge accent + tint background, not a filled banner
- Cards: `radius-lg`, hairline border, `shadow-lg`; feature-card variant carries its accent only as a 4px top hairline, never a full-color block
- Tables: hairline rows, hover highlight, status conveyed via badges — never colored text alone
- Forms: consistent field/label/help pattern with explicit focus, error, and disabled states already defined in the guide

**Type scale:** H1 44–60px / H2 30–40px / H3 18–24px / H4 16px (Urbanist, 700 or 600); Lead 18px / Paragraph 16px / Small 13px / Eyebrow 11px uppercase (Epilogue); Code 13–14px (JetBrains Mono).

---

## 3. Correction vs. the current v0/Vercel wireframe — brand mismatch found

The existing wireframe (`demand-forecasting-ui-wireframe.vercel.app`) does **not** follow this brand guide, and this is worth fixing in the rebuild, not carrying forward:

- It forces a dark navy theme on every screen with no light mode. The brand's default is light (`color-scheme: light` at root); dark is an explicit secondary mode (system preference or a manual toggle), not the only option.
- It uses a teal-to-cyan gradient accent (visible in the logo mark and various highlights). The brand guide is explicit that there is a **single accent color** — Brand Primary blue (`#155DFC` light / `#5B93FF` dark) — and that "Info reuses Brand Primary rather than adding a second blue." Teal/cyan doesn't appear anywhere in the guide.
- Typography in the wireframe reads as a generic UI sans-serif; the brand specifies Urbanist for all headings/labels and Epilogue for body text specifically.

The React rebuild should default to the light theme, add dark as a real toggle (the CSS in the style guide already handles both via `prefers-color-scheme` and a `data-theme` override), and use only the single blue accent — no teal anywhere.

---

## 4. Routing map (same information architecture as before, now as React Router paths)

- `/login` — single platform login (see `identity-sso-decision.md` — no second login for any solution)
- `/solutions` — Solutions Hub
- `/demand-intelligence/executive` — Executive Command Center (default landing page for the solution)
- `/demand-intelligence/demand-sensing`
- `/demand-intelligence/forecast`
- `/demand-intelligence/drivers`
- `/demand-intelligence/inventory`
- `/demand-intelligence/scenarios`
- `/demand-intelligence/supply-capacity`
- `/demand-intelligence/risk-exceptions`
- `/demand-intelligence/copilot`
- `/demand-intelligence/agent-control`
- `/demand-intelligence/data-ingestion` (6-step wizard, see Section 6)

Sidebar label and each page's own heading must match exactly — the current wireframe has two mismatches ("Supply & Capacity Optimization" vs. "Prescriptive Sourcing", "Scenario & Decision Twin" vs. "Scenario Studio") that shouldn't be repeated. Use the sidebar names above as the single source of truth for both nav and page headers.

---

## 5. Page-by-page content requirements

### Executive Command Center
KPI row: Total Demand, Revenue Opportunity, Inventory Value, Service Level, Active Exceptions, Sourcing Savings, each with trend vs. last period. A prominent "N critical exceptions require executive attention" banner near the top of the page (above the fold), with a button linking to Risk & Exception Center carrying the current filter context in the URL. Demand vs. Supply Outlook chart (forecast line + supply plan + P10–P90 band, monthly/quarterly toggle). Demand by Region and by Product Category breakdowns. A Recent Activity & Key Events table whose "View" action deep-links into Risk & Exception Center pre-filtered to that event. C-Suite Decision Triggers and Quick Actions panels linking to the other workspaces.

### Risk & Exception Center (build fully — this was blank in the wireframe, it's core, not a stub)
A filterable, sortable table of all open exceptions: severity (Critical/High/Medium/Low), category (Supply Risk, Demand Surge, Inventory, Market Signal, Sourcing), affected SKU/plant/region, description, detected time, status (Open/In Review/Monitoring/Resolved), owner. Filters for severity/category/status, plus support for arriving via URL query params so a link from elsewhere opens pre-filtered to one exception. Row click opens a detail drawer with the full description, underlying signals, and recommended next actions. A summary strip (counts by severity) at the top.

### Demand Sensing
Insight/recommendation callout near the top, not only at the bottom. KPI tiles: Real-Time Demand Index, Signal Coverage, Detected Demand Events, Demand Uplift, Signal Confidence, At-Risk SKUs. Sensed Demand vs. Baseline Forecast chart. Signal Sources panel (Customer Orders, POS, Distributor Shipments, Inventory Levels, Pricing, Promotions, Macro Data, Commodity Prices, Weather, Social/Market Signals) with active/inactive status and last-updated time. A short-term demand adjustment waterfall (baseline → order changes → market signals → inventory signals → other factors → sensed demand). Top SKUs with Demand Change table. Live Signal Feed table.

### Forecast Intelligence
Insight callout at top. KPI tiles: Forecast Accuracy (WAPE), Forecast Value Added, Total Forecast Demand, Service Level, High Uncertainty SKUs. Probabilistic forecast chart with P10/P50/P80/P90/P95 quantile bands. Model Performance Tournament table (model, WAPE, bias, champion/challenger/baseline — Temporal Fusion Transformer, XGBoost, LightGBM, ARIMA, Prophet, naive baseline). Forecast Value Added waterfall (naive → statistical → ML → planner adjustment → final). Forecast by Product Category and by Region. Top SKUs by Forecast Change table. Forecast Scenario Comparison table (Base Case, High Growth, Commodity Shock, Supply Disruption).

### Driver & Causal Intelligence
Insight callout at top. KPI tiles: Key Demand Drivers, Explained Variance (R²), Positive/Negative Impact Driver counts, Structural Changes, Causal Confidence. Top Demand Drivers bar chart (Price Index, Promotions, Economic Activity, Seasonality, Competitor Pricing, Weather, New Product Launch, Raw Material Price, Customer Sentiment, Channel Mix) with positive/negative coloring. Causal network diagram. Causal Insights by Driver table (driver, impact %, significance, direction, plain-language insight). Price/promotion scenario simulation table. Add an info tooltip next to "Causal" explaining the underlying methodology in plain terms — this is a strong claim worth substantiating, not just asserting.

### Inventory Intelligence
Insight callout at top. KPI tiles: Total Inventory, Inventory Value, Service Level, At-Risk SKUs, Days of Supply, Working Capital Impact. Inventory Position vs. Target chart (on-hand, target, upper/lower limits). Inventory by Product Category and by Plant. Inventory Health by SKU table (on-hand, target, status: At Risk/Healthy/Overstocked/Understocked, days of supply) with filter chips. Projected Inventory Coverage chart under base vs. high-demand scenarios. Inventory Optimization Opportunities table (opportunity, potential impact, affected SKUs, action).

### Scenario Studio
Scenario picker (Base Case, Demand Surge, Cost Inflation, Price Shock, Custom). Sliders for Price Change / Demand Change / Seasonality / Service Level. Demand forecast comparison chart across scenarios. Scenario impact summary table (demand, revenue, gross profit, inventory requirement, working capital, service level, stockout risk vs. base case). Revenue impact waterfall. AI-generated recommended-actions list.

### Supply & Capacity Optimization
(Use this exact name in both nav and page header — do not relabel as "Prescriptive Sourcing" anywhere in the UI.) Supplier/plant/product/time-horizon/scenario selectors. KPI tiles: Total Sourcing Cost, Supplier Count, Supply Reliability, CO2e Emissions, Risk Exposure. Optimized supply allocation chart by supplier over time. Cost comparison waterfall (current plan → optimized plan). Supplier Recommendations table (supplier, recommended allocation, unit cost, total cost, savings vs. current, reliability, select action). Risk Analysis panel (supply concentration, geopolitical risk, price volatility). Next Steps checklist ending in an "Implement Plan" action.

### AI Decision Copilot
Chat interface with starter action cards (Ask About Demand, Explore Scenarios, Optimize Sourcing, Assess Risk, Get Recommendations), a suggested-questions list, and a chat thread where responses can embed KPI tiles/charts inline. A persistent, always-visible disclaimer pinned near the chat input ("AI-generated responses; validate before acting on critical decisions") rather than repeated per-message only.

### Agent Control Center (build fully — this was a dead nav link in the wireframe)
A registry of the platform's AI/automation agents (e.g. Forecasting Agent, Sourcing Agent, Inventory Rebalancing Agent), each showing status (active/paused), last action, confidence. Below that, an audit/decision log recording every AI recommendation surfaced platform-wide, whether a human approved/rejected/modified it, who did so, and when — this is the audit trail for actions like "Approve supplier reallocation" and "Authorize working capital release" that appear elsewhere. Filters by agent, date range, decision status.

---

## 6. Data Ingestion wizard

A 6-step wizard where every step actually renders in sequence — do not skip steps (the current wireframe jumps from Step 1 straight to Step 4):
1. **Select Source** — SAP, Oracle, Microsoft Dynamics, PostgreSQL, MySQL, SQL Server, Snowflake, Databricks, AWS, Azure, Google Cloud, Upload Files; filterable by category.
2. **Connect/Authenticate** — credentials/auth form appropriate to the selected source (for SAP: connection type, client, system number, or OAuth).
3. **Select Data** — table/object selection from the source.
4. **Map Fields** — canonical field mapping table (source column → target field → data type → validation status), with an auto-map action.
5. **Validate** — schema integrity, null constraint checks, estimated row count, connection latency.
6. **Sync** — live progress view with record count and throughput.

---

## 7. Global patterns to bake in from day one

- **Single login only** — see `identity-sso-decision.md`. No second credential prompt for any solution.
- **Persistent filter state** via URL query params (Section 1), shared across every page in the solution.
- **Insight-at-top pattern** — every analytical page states its AI insight/recommendation near the top, with full supporting detail below, not only as a payoff at the very bottom.
- **Sidebar label = page header**, always (Section 4).
- **No dead or blank pages** — Risk & Exception Center and Agent Control Center are full pages from the start, not stubs.
- **No pre-filled realistic credentials** on the login form; no other-tenant names shown before authentication.
- **No bare absolute claims** — a confidence/validation metric ("100%", "0 violations") gets a supporting caption explaining what it's based on.
- **Light theme by default, dark as a real toggle, single blue accent only** (Section 3).
