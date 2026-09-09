# AITEK Demand Intelligence — Proposed Future UX & Information Architecture

**Document Version:** 1.0.0  
**Target Horizon:** 2026 Enterprise Decision Intelligence  
**Author:** Enterprise UX Architect & Supply Chain Domain Architect  
**Status:** Approved Future UX Specification  

---

## 1. UX Design Philosophy: From Dashboards to Decision Loops

AITEK Demand Intelligence is not a collection of static charting dashboards. It is designed around the closed-loop manufacturing operating model:

$$\text{Sense} \longrightarrow \text{Predict} \longrightarrow \text{Explain} \longrightarrow \text{Simulate} \longrightarrow \text{Optimize} \longrightarrow \text{Recommend} \longrightarrow \text{Approve} \longrightarrow \text{Execute} \longrightarrow \text{Learn}$$

### Core UX Principles
1. **Executive-First Progressive Disclosure:**  
   Every screen immediately answers: *What happened? Why does it matter? What is at risk? What should I do?* Deep statistical diagnostics, correlograms, and solver parameters are placed in collapsible drawers, tabs, or dedicated advanced workspaces.
2. **Business Questions Over Technology Labels:**  
   Navigation and screen titles represent business decisions ("Demand Sensing", "Forecast Intelligence", "Inventory Intelligence", "Supply Optimization") rather than algorithmic techniques ("Machine Learning", "FastAPI Solvers", "SHAP Feature Importance").
3. **Probabilistic by Default:**  
   All forward-looking horizons expose probability distributions ($P10, P50, P80, P90, P95$) rather than false point certainties, giving manufacturing leaders explicit visibility into downside risk and buffer requirements.
4. **Governed Bounded Autonomy:**  
   AI never acts silently or uncontrollably. Every recommendation features an explicit confidence rating, causal justification, policy verification badge, and human-in-the-loop action card (`Approve`, `Modify`, `Reject`).
5. **Platform Visual Coherence (`GEMINI.md`):**  
   Strict adherence to AITEK design tokens: Slate-950/900 background rails, Cobalt-600 primary accents (`#0062d2`), Sky-400 secondary highlights, accessible high-contrast text, consistent card radius, and clean 12-column responsive grids.

---

## 2. Complete Workspace & Screen Inventory

The evolved platform organizes capabilities into four clean operational tiers:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                  AITEK PLATFORM SHELL                                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 1. EXECUTIVE COMMAND CENTER          Overview, enterprise rollups, cash & risk triage  │
│ 2. DEMAND SENSING                    Near-real-time signals, freshness, 1-8 week delta │
│ 3. FORECAST INTELLIGENCE             Probabilistic quantiles, FVA, model tournament    │
│ 4. DRIVER & CAUSAL INTELLIGENCE      Causal inference, elasticity curves, interventions │
│ 5. INVENTORY INTELLIGENCE [NEW]      Stock health, multi-echelon buffers, cash release │
│ 6. SCENARIO & DECISION TWIN          Monte Carlo stress tests, disruption trees        │
│ 7. SUPPLY & CAPACITY OPTIMIZATION    Plant line capacity, constraints, supplier LP     │
│ 8. RISK & EXCEPTION CENTER [NEW]     Prioritized operational alerts, root-cause, triage│
│ 9. AI DECISION COPILOT               Cross-functional grounded reasoning & briefings   │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ [ADVANCED / GOVERNANCE]                                                                │
│ 10. AGENT CONTROL CENTER [NEW]       Multi-agent status, autonomy policies, audit log  │
│ 11. MODEL OPERATIONS (MLOps)         Continuous drift monitoring, registry, retraining │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Workspace Specifications

---

### Workspace 01: Executive Command Center
*Evolution of Screen 01 (Executive Cockpit)*

- **Primary Route:** `/solutions/demand-intelligence/overview`
- **Business Question:** *"What is the operational and financial heartbeat of our enterprise right now, and where is our margin, OTIF, or working capital at risk?"*
- **Primary User:** CEO, COO, CFO, Chief Supply Chain Officer (CSCO)
- **Key Decisions:**
  - Executive capital allocation and working capital buffer adjustments.
  - Multi-plant production load-balancing under regional demand shocks.
  - High-priority exception escalation and cross-functional sign-off.
- **Key KPIs:**
  - `Enterprise Demand Outlook`: 12-Month Projected Volume with YoY trend ($+7.4\%$).
  - `Working Capital at Risk`: Dollar exposure tied to stockouts vs. sluggish inventory ($\$2.4\text{M}$).
  - `Service Level Assured`: Target OTIF delivery probability ($94.2\%$).
  - `Procurement Savings Realized`: Year-to-date savings through optimized allocation ($\$142.5\text{K}$).
  - `Active Decision Exceptions`: Count and dollar value of unresolved supply disruptions ($3 \text{ Critical} / \$680\text{K}$).
- **Key Visuals:**
  - *Enterprise Heartbeat Map & Multi-Plant Bar*: Regional status across Columbus, Düsseldorf, Jurong Island, Akron.
  - *12-Month Demand Outlook Chart*: Historical actuals, forward forecast, and confidence corridor with toggle for monthly/quarterly aggregation.
  - *Working Capital Risk Waterfall*: Bridge from current inventory holding cost to optimized target.
  - *Executive Decision Stream*: Prioritized list of active AI-formulated decisions ready for C-suite review.
- **Key Interactions:**
  - Select Enterprise, Division, or Plant from the unified hierarchy bar (updates all metrics dynamically).
  - Click on any active exception to open the triage drawer.
  - One-click trigger to generate an executive AI briefing.
- **AI Role:** Grounded multi-series synthesis, enterprise anomaly detection, natural-language executive narration.
- **Agent Role:** `Executive Agent` (aggregates summaries from specialized agents into a unified P&L view) and `Governance Agent` (validates policy compliance).
- **Recommended Action:** *"Authorize working capital buffer adjustment of $1.2M on Columbus Plant #04 to protect Q3 seasonal surge."*
- **Navigation Relationship:** Primary platform landing workspace; links directly to Demand Sensing, Inventory Intelligence, and Risk Center.

---

### Workspace 02: Demand Sensing
*Transformation & Split of Screen 02 (Demand Signals)*

- **Primary Route:** `/solutions/demand-intelligence/sensing`
- **Business Question:** *"What is changing right now in the market, channel, and order stream, and should we adjust our near-term plan before it appears in sales history?"*
- **Primary User:** Demand Planner, Master Scheduler, Commercial Planning Manager
- **Key Decisions:**
  - 1–8 week near-term forecast adjustments based on real-time order acceleration or cancellations.
  - Channel allocation rationing during sudden supply crunches.
  - Promotional timing adjustments based on early POS scanner data.
- **Key KPIs:**
  - `Signal Freshness`: Latency of incoming telemetry (e.g. Orders: $12\text{ min}$, POS: $2\text{ hr}$, Weather: $15\text{ min}$).
  - `Signal Confidence Index`: Statistical reliability of detected trend ($88\%$).
  - `30-Day Demand Velocity Delta`: Divergence between base forecast and real-time sensed trajectory ($+5.2\%$).
  - `Active Market Events`: Shocks detected (e.g. "Gulf Coast resin plant force majeure", "Packaging sector demand surge").
- **Key Visuals:**
  - *Live Signal Stream Grid*: Cards for Orders, Shipments, POS Scans, Raw Material Commodities, Macro Trends, Weather.
  - *Near-Term Sensing Horizon Chart*: 8-week high-frequency chart showing Base Plan vs. Sensed Trajectory vs. Actuals.
  - *Signal Attribution Matrix*: Breakdown showing which specific signal types are driving the near-term deviation.
  - *Event Anomaly Radar*: Early warning detection of demand shocks and structural breaks.
- **Key Interactions:**
  - Filter signals by category (Internal Operations, Channel/Customer, External Market).
  - Adjust signal weighting sensitivity slider.
  - Click "Apply Sensed Adjustment" to update the near-term planning schedule.
- **AI Role:** Real-time event detection, anomaly filtering, multi-covariate time-series sensing adjustment.
- **Agent Role:** `Demand Sensing Agent` (continuously monitors streaming inputs, scores feature freshness, alerts on high-confidence divergence).
- **Recommended Action:** *"Apply +4.8% near-term sensing adjustment to HDPE Resin for Weeks 38-42 driven by accelerated packaging orders."*
- **Navigation Relationship:** Sits between Executive Command Center and Forecast Intelligence; feeds urgent deltas to the Risk & Exception Center.

---

### Workspace 03: Forecast Intelligence
*Evolution of Screen 03 (Demand Forecast)*

- **Primary Route:** `/solutions/demand-intelligence/forecast`
- **Business Question:** *"What is likely to happen over the 3–24 month horizon, and what is our quantified distribution of planning risk?"*
- **Primary User:** Senior Demand Planner, S&OP Director, Supply Chain Strategist
- **Key Decisions:**
  - Sign-off on baseline consensus forecast for the S&OP cycle.
  - Selection of optimal champion model family per SKU behavior (stable, intermittent, volatile, new product).
  - Quantile selection ($P50$ vs. $P80$ vs. $P90$) for safety stock and production buffering.
- **Key KPIs:**
  - `Forecast Accuracy (WAPE)`: $94.2\%$ (Weighted Absolute Percentage Error).
  - `Forecast Bias`: $+1.3\%$ (systematic tracking signal within tolerance).
  - `Forecast Value Added (FVA)`: $+3.8\%$ (quantified improvement over naïve benchmark).
  - `Quantile Risk Spread`: Difference between $P90$ upside and $P10$ downside ($\pm 14.8\%$).
  - `Model Tournament Champion`: Best-performing algorithm (e.g. `XGBoost + LightGBM Ensemble`).
- **Key Visuals:**
  - *Probabilistic Fan Chart*: 24-month interactive timeline with selectable quantile bands ($P10, P50, P80, P90, P95$) and historical actuals.
  - *Model Tournament Panel*: Champion vs. Challenger comparison table (XGBoost, Prophet, Holt-Winters, Chronos-2, Naïve baseline).
  - *Forecast Value Added (FVA) Waterfall*: Step-by-step contribution: $\text{Naïve} \to \text{Statistical} \to \text{ML} \to \text{Planner Override}$.
  - *Monthly & Quarterly Planning Table*: Grid with actuals, forecast, confidence bounds, YoY growth, and override inputs.
- **Key Interactions:**
  - Toggle quantile distributions ($P50, P80, P90, P95$) to see the impact on inventory buffers.
  - Switch active champion model or inspect backtesting holdout accuracy.
  - Input a planner override with mandatory justification tagging.
- **AI Role:** Automated model selection, rolling-origin backtesting, quantile regression, hierarchical reconciliation.
- **Agent Role:** `Forecasting Agent` (manages model portfolio execution, detects accuracy decay, calculates FVA contributions).
- **Recommended Action:** *"Adopt XGBoost + LightGBM ensemble champion model, delivering +2.4% FVA over statistical baseline."*
- **Navigation Relationship:** Feeds directly into Inventory Intelligence and Scenario Studio.

---

### Workspace 04: Driver & Causal Intelligence
*New Dedicated Workspace (Extending Screen 02 Analytics)*

- **Primary Route:** `/solutions/demand-intelligence/drivers`
- **Business Question:** *"Why did demand change in the past, and what will happen to future demand if we intervene on price, marketing, or lead time?"*
- **Primary User:** Pricing Director, Commercial Strategist, Marketing & Sales Operations Lead
- **Key Decisions:**
  - Pricing adjustment elasticity boundaries.
  - Promotional uplift campaign budget allocation.
  - Contract lead-time SLA renegotiation with customers.
- **Key KPIs:**
  - `Price Elasticity Coefficient`: $\epsilon = -1.32$ (statistically significant at $p < 0.01$).
  - `Primary Driver Importance`: Price ($87.1\%$), Closing Stock ($5.3\%$), Lead Time ($4.6\%$).
  - `Causal Uplift Potential`: Projected revenue gain from targeted promotional intervention ($\$480\text{K}$).
  - `Regime Stability Index`: High confidence in current post-recovery growth regime.
- **Key Visuals:**
  - *Causal Directed Acyclic Graph (DAG)*: Visual graph separating direct causal interventions from confounding covariates.
  - *Price Elasticity Response Curve*: Non-linear curve with elasticity cliff and optimal pricing window.
  - *10-Year Seasonality Heatmap*: Historical monthly intensity matrix identifying recurring Q3 seasonal peaks.
  - *Driver Contribution Waterfall*: Attribution of recent demand shift across Price, Marketing, Availability, and Market Expansion.
- **Key Interactions:**
  - Drag the Price Intervention slider to dynamically simulate demand response curve and net revenue impact.
  - Toggle between correlational SHAP feature attribution and causal treatment effects.
  - Select historical regime periods to compare pre- and post-disruption elasticities.
- **AI Role:** Causal inference (DoWhy / EconML), counterfactual simulation, structural break analysis (Ruptures PELT).
- **Agent Role:** `Causal AI / Economic Agent` (evaluates proposed pricing interventions against segment sensitivity).
- **Recommended Action:** *"Maintain proposed price increase below +6.5% to avoid crossing the critical elasticity drop-off threshold."*
- **Navigation Relationship:** Complements Demand Sensing and Scenario Studio; provides causal validation for commercial teams.

---

### Workspace 05: Inventory Intelligence
*New Dedicated Workspace (High Priority Enterprise Addition)*

- **Primary Route:** `/solutions/demand-intelligence/inventory`
- **Business Question:** *"Where is working capital trapped in excess stock, which SKUs face stockout risk in the next 30–90 days, and what dynamic safety stocks are required?"*
- **Primary User:** VP of Supply Chain, Inventory Controller, Working Capital Director, Materials Manager
- **Key Decisions:**
  - Dynamic safety stock and reorder point resets based on probabilistic demand quantiles.
  - Inter-facility stock rebalancing (transferring excess from Plant A to DC B).
  - Obsolete/sluggish inventory liquidation and working capital liberation.
- **Key KPIs:**
  - `Total Network Inventory Value`: $\$18.4\text{M}$ across all plants and distribution centers.
  - `Trapped Working Capital`: Identified excess inventory available for release ($\$2.1\text{M}$).
  - `Days of Supply (DOS)`: Current average network cover ($34\text{ days}$ vs. target $28\text{ days}$).
  - `Stockout Risk Exposure`: Number of SKUs with $< 14\text{ days}$ cover ($4\text{ Critical SKUs}$).
  - `Fill Rate Assured`: Projected OTIF customer fulfillment ($96.2\%$).
- **Key Visuals:**
  - *Stock Health Matrix (ABC/XYZ Segmentation)*: Quadrant plotting SKUs by revenue value vs. demand volatility.
  - *Multi-Echelon Network Inventory Map*: Node-level inventory health across Central Plants, Regional DCs, and In-Transit.
  - *Stockout Probability Heatmap*: Forward 12-week risk timeline showing when critical items breach safety buffer.
  - *Working Capital Liberation Waterfall*: Bridge showing dollar savings achievable through dynamic buffer optimization.
- **Key Interactions:**
  - Filter inventory by risk category: Critical Stockout, Healthy, Sluggish, Excess.
  - Adjust the Target Service Level slider ($90\% \to 95\% \to 98\%$) to see dynamic safety stock requirements and carrying costs.
  - Click "Approve Rebalance" to generate inter-site transfer orders.
- **AI Role:** Multi-echelon inventory optimization (MEIO), dynamic safety stock calculation ($Z \times \sigma \times \sqrt{L}$), stockout hazard rate prediction.
- **Agent Role:** `Inventory Agent` (continuously simulates buffer adequacy against probabilistic demand and lead-time variability).
- **Recommended Action:** *"Release $340K trapped capital by lowering safety stock on LDPE Film while buffering HDPE Resin at Columbus."*
- **Navigation Relationship:** Direct counterpart to Forecast Intelligence and Prescriptive Sourcing.

---

### Workspace 06: Scenario & Decision Twin
*Evolution of Screen 04 (Scenario Studio)*

- **Primary Route:** `/solutions/demand-intelligence/scenarios`
- **Business Question:** *"What could happen if a critical disruption strikes, and what is our optimal mitigation strategy before it occurs?"*
- **Primary User:** Head of S&OP, Chief Supply Chain Officer, Risk Committee, Plant General Manager
- **Key Decisions:**
  - Strategic inventory pre-build authorization ahead of anticipated disruptions.
  - Dual-sourcing contract activation to mitigate geopolitical or tariff risks.
  - Financial hedging and margin defense planning under raw material cost inflation.
- **Key KPIs:**
  - `Expected Financial Impact`: Net EBITDA delta across evaluated scenarios ($\Delta \$1.8\text{M}$).
  - `Worst-Case Value at Risk (VaR 95%)`: Downside exposure in severe disruption ($\$3.4\text{M}$).
  - `Resilience Index`: Enterprise ability to absorb shock without line stoppages ($84/100$).
  - `Service Level Under Stress`: Predicted fill rate under selected shock ($88.4\%$).
- **Key Visuals:**
  - *Monte Carlo Simulation Distribution*: 1,000-iteration probability distribution curve showing revenue and profit spread.
  - *Multi-Scenario Comparison Matrix*: Side-by-side scorecard comparing Base Case, Demand Surge (+25%), Cost Inflation (+12%), Tariff Escalation (+15%), and Supplier Outage.
  - *P&L Impact Waterfall Chart*: Bridge from baseline gross margin to stressed margin, showing elasticity and buffer offsets.
  - *Interactive Scenario Parameter Dock*: Fine-grained controls for Price Change, Demand Multiplier, Lead-Time Shock, Service Level Target.
- **Key Interactions:**
  - Switch between predefined disruption presets or build custom multi-variable stress tests.
  - Click "Run Monte Carlo Simulation" to generate full probabilistic risk envelopes.
  - Click "Send Scenario to Sourcing" to immediately optimize procurement under the stressed demand load.
- **AI Role:** Stochastic simulation, scenario tree branching, automated multi-dimensional sensitivity analysis.
- **Agent Role:** `Scenario Agent` (generates disruption permutations, models operational bottlenecks, ranks mitigation options by ROI).
- **Recommended Action:** *"Execute Scenario C mitigation: pre-build 8,000 kg inventory ahead of anticipated supplier maintenance window in November."*
- **Navigation Relationship:** Receives inputs from Forecast Intelligence; delivers stressed targets to Supply & Capacity Optimization.

---

### Workspace 07: Supply & Capacity Optimization
*Evolution of Screen 05 (Prescriptive Sourcing)*

- **Primary Route:** `/solutions/demand-intelligence/sourcing`
- **Business Question:** *"How should our manufacturing plants and suppliers respond to meet demand at the lowest total landed cost, highest reliability, and within capacity constraints?"*
- **Primary User:** Chief Procurement Officer (CPO), Plant Operations Director, Sourcing Category Manager
- **Key Decisions:**
  - Optimal supplier allocation split across contract tiers.
  - Production line scheduling and overtime authorization to resolve plant bottlenecks.
  - Trade-off balancing: Cost vs. Lead Time vs. Reliability vs. Carbon Emissions.
- **Key KPIs:**
  - `Total Landed Sourcing Cost`: $\$9.2\text{M}$ ($-12.4\%$ vs. current unconstrained plan).
  - `Net Identified Savings`: $\$142.5\text{K}$ annual procurement value.
  - `Plant Line Capacity Utilization`: $86.4\%$ (balanced across available shifts).
  - `Supply Network Reliability`: $98.5\%$ ($+3.8\text{ pts}$ improvement).
  - `Constraint Feasibility Index`: $100\%$ (all machine, labor, and supplier minimums satisfied).
- **Key Visuals:**
  - *Plant Capacity vs. Demand Load Chart*: Line-by-line utilization bars showing machine bottleneck limits.
  - *Stacked Quarterly Supplier Allocation*: Interactive visual showing allocated volumes across primary and secondary suppliers.
  - *Cost & Reliability Waterfall*: Breakdown of savings achieved through dynamic LP supplier reallocation.
  - *Prescriptive Sourcing Recommendations Table*: Detailed supplier roster with cost, lead time, reliability score, and allocated units.
- **Key Interactions:**
  - Click "Run Optimization Solver" (executes PuLP CBC / Mixed Integer Programming solver with real-time status convergence).
  - Adjust solver objective weights (e.g. prioritize Reliability over Lowest Cost).
  - Click "Approve & Dispatch to ERP" to generate purchase orders and production orders.
- **AI Role:** Mixed Integer Linear Programming (MIP), multi-objective Pareto optimization, supplier risk score weighting.
- **Agent Role:** `Supply Planning Agent` (verifies plant machine/shift feasibility) & `Procurement Agent` (computes optimal contract allocations).
- **Recommended Action:** *"Reallocate 22,000 units from Supplier A to Supplier B to capture $142.5K net savings while maintaining 98.5% reliability."*
- **Navigation Relationship:** Downstream recipient of Forecast and Scenario inputs; execution bridge to enterprise ERP/procurement systems.

---

### Workspace 08: Risk & Exception Management
*New Dedicated Workspace (High Priority Operational Hub)*

- **Primary Route:** `/solutions/demand-intelligence/exceptions`
- **Business Question:** *"What critical planning exceptions require attention today, what is the root cause, and what approved action resolves them?"*
- **Primary User:** Supply Chain Exception Manager, S&OP Coordinator, Plant Materials Planner
- **Key Decisions:**
  - Emergency expedited freight authorization.
  - Customer order de-prioritization / allocation rationing during stockouts.
  - Fast-track secondary supplier activation.
- **Key KPIs:**
  - `Active Critical Exceptions`: $4\text{ Critical}$ supply chain alerts requiring sign-off.
  - `Revenue at Risk`: $\$840\text{K}$ exposed across unresolved bottlenecks.
  - `Mean Time to Resolution (MTTR)`: $2.4\text{ hours}$ (down from 18 hours manually).
  - `Automated Triage Rate`: $76\%$ of routine alerts handled by bounded autonomy.
- **Key Visuals:**
  - *Priority Exception Triage Board*: Categorized feed (Critical, Warning, Informational) with financial impact tags.
  - *Root-Cause Diagnostic Card*: Visual diagnostic chain linking signal anomaly $\to$ stockout hazard $\to$ customer delivery impact.
  - *Actionable Mitigation Drawer*: Side-by-side comparison of AI-formulated mitigation options with cost, time, and risk ratings.
  - *One-Click Action Bar*: Explicit `Approve Action`, `Modify Parameters`, `Delegate to Team`, `Dismiss` controls.
- **Key Interactions:**
  - Click on an exception card to highlight the full causal path and load the recommended resolution.
  - Click "Approve AI Action" to trigger the underlying system execution and log an audit entry.
  - Filter by exception domain: Demand Surge, Stockout Hazard, Supplier Delay, Capacity Overload.
- **AI Role:** Automated alert correlation, root-cause diagnostics, multi-option mitigation synthesis.
- **Agent Role:** `Risk Agent` (identifies and scores anomalies) + `Governance Agent` (validates approval policy and audit logging).
- **Recommended Action:** *"Approve alternative carrier expediting for 4,500 kg resin delivery to prevent line stoppage at Columbus Plant (Cost: $4,200 vs $45,000 downtime)."*
- **Navigation Relationship:** Accessible from the topbar notification bell from any screen; links directly into Sourcing and Inventory workspaces.

---

### Workspace 09: AI Decision Copilot
*Evolution of Screen 06 (AI Decision Copilot)*

- **Primary Route:** `/solutions/demand-intelligence/copilot`
- **Business Question:** *"What do these trends mean for our business, what are the cross-functional trade-offs, and what policy applies to this decision?"*
- **Primary User:** All planning personas (Executive, Planner, Procurement, Plant Operations)
- **Key Decisions:**
  - Ad-hoc natural language scenario exploration.
  - S&OP preparation and board-level briefing generation.
  - Sourcing contract and planning policy verification.
- **Key KPIs:**
  - `Grounded Citation Rate`: $100\%$ (zero hallucination; all numbers backed by verified service calls).
  - `Decision Cycle Time`: Immediate conversational response ($< 600\text{ ms}$).
  - `Recommendation Acceptance Rate`: $82\%$ of copilot-suggested actions approved by planners.
- **Key Visuals:**
  - *Conversational Decision Stream*: Message feed featuring rich, structured decision cards, embedded interactive mini-charts, KPI tiles, and next-step actions.
  - *Multi-Agent Orchestration HUD*: Real-time status chips indicating which specialized agents are contributing to the answer.
  - *Suggested Questions & Quick Action Dock*: Categorized shortcuts (Demand Outlook, Scenario Stress Test, Supplier Allocation, Stockout Risk, Board Summary).
  - *Context & Grounding Panel*: Persistent panel showing Active Hierarchy, Active Solution Context, Whitelisted Tools, and Knowledge Base Citations.
- **Key Interactions:**
  - Type or speak (via Web Speech API) natural language business inquiries.
  - Click on interactive charts embedded inside responses to drill directly into corresponding workspaces.
  - Click "Approve Recommendation" directly inside a copilot response card.
- **AI Role:** Natural language intent extraction, tool calling orchestration, synthesis over verified deterministic outputs, enterprise RAG.
- **Agent Role:** `Orchestrator Agent` (coordinates Demand Sensing, Forecasting, Inventory, and Procurement subagents).
- **Recommended Action:** *"Copilot answers complex queries such as: 'Why is gross margin dropping in Q3 despite rising sales volume?' with a grounded revenue waterfall and sourcing breakdown."*
- **Navigation Relationship:** Serves as a full-page workspace or persistent right-rail assistant accessible from any screen.

---

### Workspace 10: Agent Control Center & Governance
*New Advanced Workspace (Strategic Enterprise Addition)*

- **Primary Route:** `/solutions/demand-intelligence/agents`
- **Business Question:** *"What are our specialized AI agents doing right now, what decisions have they made, and where is human governance required?"*
- **Primary User:** Chief Digital Officer (CDO), Head of Enterprise AI, S&OP Governance Committee, IT Compliance Officer
- **Key Decisions:**
  - Bounded autonomy policy configuration (e.g. setting dollar thresholds for auto-execution vs. human sign-off).
  - Monitoring agent performance, execution latency, and tool health.
  - Audit trail inspection for regulatory and internal compliance.
- **Key KPIs:**
  - `Active Specialized Agents`: 10 Agents running (Demand, Forecast, Inventory, Supply, Procurement, Scenario, Risk, Finance, Executive, Governance).
  - `Decisions Processed (24h)`: Count of automated and human-approved actions ($142\text{ decisions}$).
  - `Autonomy Level Active`: Tiered $L1 \to L5$ bounded governance status.
  - `Policy Compliance Rate`: $100\%$ adherence to enterprise risk thresholds.
- **Key Visuals:**
  - *Multi-Agent Topology Graph*: Live interactive graph showing agent nodes, message passing, and active tasks.
  - *Live Task Execution Stream*: Real-time activity feed showing tool calls, grounding verifications, and outputs.
  - *Bounded Autonomy Policy Matrix*: Configurable threshold table assigning decision classes to autonomy levels ($L1 \dots L5$).
  - *Immutable Decision Audit Log*: Timestamped ledger of all AI recommendations, approvals, user overrides, and execution status.
- **Key Interactions:**
  - Adjust the approval threshold slider for specific decision types (e.g. raise supplier reallocation auto-approval to $\$50\text{K}$).
  - Pause or resume specific agent workflows.
  - Export audit logs for compliance review.
- **AI Role:** Agent telemetry, tool permission enforcement, execution tracing.
- **Agent Role:** `Governance Agent` (acts as policy gatekeeper, enforces RBAC, prevents unauthorized tool invocation).
- **Recommended Action:** *"Promote routine low-volume replenishment to Level 5 bounded autonomy while keeping all multi-plant supplier changes at Level 3 human-approval."*
- **Navigation Relationship:** Advanced governance plane; accessible via secondary navigation rail.

---

## 4. Persona User Journeys

### Journey 1: Chief Executive Officer & Chief Financial Officer
- **Entry:** Lands on `Executive Command Center` (`/overview`).
- **Scan:** Reviews Working Capital at Risk ($\$2.4\text{M}$) and 12-Month Demand Trajectory ($+7.4\%$).
- **Alert:** Observes active exception banner: "High risk of Q3 stockout on HDPE Resin at Columbus Plant."
- **Action:** Triggers "Generate Executive Briefing"; Copilot summarizes root cause (supplier maintenance + seasonal demand surge).
- **Outcome:** Approves $\$1.2\text{M}$ working capital buffer reallocation with one click.

### Journey 2: Senior Demand Planner
- **Entry:** Lands on `Demand Sensing` (`/sensing`).
- **Detect:** Notes $+5.2\%$ velocity divergence in recent orders from packaging customers.
- **Validate:** Navigates to `Forecast Intelligence` (`/forecast`); compares XGBoost champion model against historical baseline; reviews $+3.8\%$ Forecast Value Added.
- **Explore:** Opens `Scenario & Decision Twin` (`/scenarios`); evaluates $+25\%$ Demand Surge scenario; confirms safety stock requirements.
- **Outcome:** Submits updated consensus plan to S&OP review with automated model documentation.

### Journey 3: Chief Procurement Officer & Sourcing Lead
- **Entry:** Receives alert in `Risk & Exception Center` (`/exceptions`) regarding raw material price spike.
- **Analyze:** Navigates to `Supply & Capacity Optimization` (`/sourcing`); reviews plant line utilization ($86.4\%$).
- **Optimize:** Clicks "Run Optimization Solver"; PuLP MIP converges on 3-supplier allocation balancing cost, lead time, and carbon emissions.
- **Outcome:** Captures $\$142.5\text{K}$ net savings and clicks "Approve & Dispatch to ERP" to issue purchase requisitions.
