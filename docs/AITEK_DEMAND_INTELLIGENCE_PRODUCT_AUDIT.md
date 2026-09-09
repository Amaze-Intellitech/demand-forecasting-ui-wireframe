# AITEK Demand Intelligence — Enterprise Product & Architecture Audit

**Document Version:** 1.0.0  
**Audit Horizon:** 2026 Enterprise Manufacturing Benchmark  
**Author:** Principal Product Architect & Supply Chain Domain Architect  
**Target Solution:** AITEK Demand Intelligence (Platform Module)  
**Status:** Complete Architectural Baseline Audit  

---

## 1. Executive Summary & Audit Mandate

This document establishes the official technical, domain, and product audit of the **AITEK Demand Intelligence** application. It rigorously evaluates what is genuinely implemented in the repository today against the strategic benchmark defined in `AITEK_Demand_Intelligence_2026_Assessment.md` and `AITEK_Demand_Intelligence_Assessment.md`, as well as leading global manufacturing platforms (SAP IBP, Kinaxis Maestro, o9 Solutions Digital Brain, Blue Yonder, Oracle Cloud SCM).

### Core Audit Findings

1. **Analytical Credibility vs. Operational Immaturity:**  
   The underlying analytical foundation (Prophet, Holt-Winters, XGBoost, SHAP, linear-programming supplier allocation via PuLP/CBC, statistical diagnostics, and LangGraph-based grounded tool calling) is mathematically sound and significantly more advanced than cosmetic dashboard prototypes.
2. **The Fundamental Enterprise Gap:**  
   Modern enterprise demand platforms operate across an integrated closed loop:
   $$\text{Enterprise Data} \longrightarrow \text{Demand Sensing} \longrightarrow \text{Forecast Intelligence} \longrightarrow \text{Causal AI} \longrightarrow \text{Decision Twin} \longrightarrow \text{Prescriptive Optimization} \longrightarrow \text{Governed Agents} \longrightarrow \text{Human Approval} \longrightarrow \text{Execution} \longrightarrow \text{Learning}$$
   The current AITEK application implements discrete fragments of the middle steps ($\text{Historical Forecast} \to \text{Single What-If} \to \text{Supplier LP} \to \text{Single Copilot}$), while lacking enterprise data hierarchy, near-real-time sensing, causal inference, probabilistic distributions, multi-agent orchestration, and closed-loop execution.
3. **The Current 6-Screen Architecture is a UX Baseline, Not the Final Product:**  
   The current screens (Executive Cockpit, Demand Signals, Demand Forecast, Scenario Studio, Prescriptive Sourcing, AI Decision Copilot) provide a strong narrative backbone for CXO demonstrations, but conflate historical analytics with demand sensing, lack inventory and risk exception workspaces, and fail to expose probabilistic risk or agentic governance.

---

## 2. Current Product Inventory & Codebase Baseline

### 2.1 Repository Architecture & Technology Stack

| Layer | Repository Implementation | Benchmark Alignment | Status |
|---|---|---|---|
| **Framework** | React 18.3.1 + Vite 6.0.3 + TypeScript 5.7.2 | Aligned with AITEK Platform Standards (`GEMINI.md`) | **IMPLEMENTED** |
| **Styling & UI Tokens** | Tailwind CSS 3.4.16 + Radix UI Primitives + Lucide Icons | Clean enterprise SaaS aesthetic, cobalt primary (`#0062d2`), neutral slate base | **IMPLEMENTED** |
| **Routing** | React Router DOM 6.28.0 with Platform Authentication Guard (`RequirePlatformAuth`) | Clean protected shell; deep-linking enabled for primary screens | **IMPLEMENTED** |
| **State Management** | React Local State (`useState`, `useMemo`) + React Context (`AitekContext`) | Single-session local state; no centralized domain state machine | **PARTIALLY IMPLEMENTED** |
| **Data Layer** | Hardcoded typed mock fixtures in `src/data/*.ts` | Realistic typed contracts, but single-plant, single-series data | **POC / HARDCODED** |
| **Backend / Services** | FastAPI backend with LangGraph/Python referenced in assessment docs | Frontend operates in decoupled mock mode; APIs not bound | **POC / HARDCODED** |

### 2.2 Existing Routes

```text
/                                   -> Root redirect (/solutions or /login)
/login                              -> Platform Login (Screen 1)
/solutions                          -> Solution Hub (Screen 2)
/solutions/:solutionId/login        -> Solution-Specific Auth (Screen 3)
/solutions/:solutionId/data         -> Enterprise Data Ingestion (Screen 4)
/solutions/demand-intelligence/overview   -> Executive Cockpit (Screen 01)
/solutions/demand-intelligence/signals    -> Demand Signals (Screen 02)
/solutions/demand-intelligence/forecast   -> Demand Forecast (Screen 03)
/solutions/demand-intelligence/scenarios  -> Scenario Studio (Screen 04)
/solutions/demand-intelligence/sourcing   -> Prescriptive Sourcing (Screen 05)
/solutions/demand-intelligence/copilot    -> AI Decision Copilot (Screen 06)
```

*(Note: `/solutions/demand-intelligence/analytics` is referenced in `DemandIntelligenceSidebar.tsx` as "Analytics Lab" but has no route definition in `App.tsx`).*

### 2.3 Component Inventory & Structure

The repository contains 65 `.tsx` components organized into three primary layers:
1. **Platform Layer (`src/components/aitek/`):** `AitekLogo`, `PlatformHeader`, `SolutionCard`, `ConnectorCard`, `ConnectionWizardModal`.
2. **Demand Domain Layer (`src/components/demand/`):**
   - **Shell & Navigation:** `DemandIntelligenceSidebar`, `DemandTopbar`, `HierarchyFilters`.
   - **Screen 01 (Cockpit):** `KpiRow`, `DemandOutlookChart`, `AitekIntelligencePanel`, `BottomValuePanels`, `DemandModals`.
   - **Screen 02 (Signals):** `SignalSummaryGrid`, `HistoricalDemandChart`, `DemandDriversChart`, `SeasonalityHeatmap`, `StructuralChangesCard`, `SegmentDonutChart`, `BusinessInterpretationCard`.
   - **Screen 03 (Forecast):** `ForecastFilterBar`, `ForecastKpiGrid`, `HistoricalForecastChart`, `ForecastModelPanel`, `ForecastAiInsightCard`, `QuarterlyForecastChart`, `MonthlyForecastTable`, `KeyTakeawaysCard`.
   - **Screen 04 (Scenarios):** `ScenarioPresetGrid`, `ScenarioParametersCard`, `ScenarioForecastChart`, `ScenarioImpactCard`, `RevenueWaterfallChart`, `ScenarioKeyInsightsCard`, `ScenarioRecommendedActionsCard`.
   - **Screen 05 (Sourcing):** `SourcingFilterBar`, `SourcingKpiGrid`, `OptimizedSupplyAllocationChart`, `CostComparisonWaterfallChart`, `SupplierRecommendationsTable`, `SourcingAiRecommendationCard`, `SourcingRiskAnalysisCard`, `SourcingNextStepsCard`.
   - **Screen 06 (Copilot):** `CopilotQuickActions`, `SuggestedQuestionsPanel`, `CopilotConversationWorkspace`, `CopilotContextPanel`, `EmbeddedDemandForecastChart`.
3. **UI Primitives (`src/components/ui/`):** Minimal Button and Dialog wrappers.

---

## 3. Existing Capabilities vs. Architectural Limitations

### 3.1 Existing UX Strengths
- **Coherent Executive Narrative:** The sequential progression from Baseline $\to$ Forecast $\to$ Stress-Test $\to$ Sourcing $\to$ Copilot represents an intuitive decision story for CXOs.
- **Enterprise Design Discipline:** Restrained enterprise palette (`#080e1a` slate sidebar, `#0062d2` cobalt accent, `#f8fafc` canvas, clean borders, high-density data typography).
- **Business-First KPI Framing:** Emphasizes working capital, OTIF, procurement savings, and margin protection rather than purely statistical metrics.
- **Grounded AI Interaction Pattern:** The Copilot emits structured decision cards, embedded mini-charts, and verified action links rather than conversational markdown filler.

### 3.2 Architectural Limitations
- **Data Model Flatness:** Single aggregate production stream (`Columbus #04`, `HDPE Resin`). The 5-level hierarchy dropdown (`Enterprise` $\to$ `Division` $\to$ `Plant` $\to$ `Category` $\to$ `SKU`) is cosmetic; switching selections does not recalculate rollups or aggregate bottom-up numbers.
- **Point Forecasts Only:** Forecasts display only a single expected path with a fixed symmetric confidence interval ($\pm 10\%$). Real supply chain decisions require probability quantiles ($P10, P50, P80, P90, P95$) to size safety buffers.
- **Missing Real-Time Sensing:** Screen 02 ("Demand Signals") is mislabeled; it is actually a historical analytics view (2020–2025 actuals, 10-year heatmap, static SHAP importance). It lacks real-time ingestion, signal confidence, freshness, or near-term adjustments.
- **Siloed Supplier Optimization:** Prescriptive sourcing only models 5 hardcoded raw-material suppliers. It ignores internal plant production capacity, line bottlenecks, bill-of-materials constraints, and multi-echelon network inventory.
- **No Agent Coordination / Governance:** The AI Copilot is a single conversational agent. There is no visibility into specialized subagents, approval thresholds, policy verification gates, or ERP execution triggers.

---

## 4. Current Maturity Assessment

Using the established 5-level maturity scale:
- **Level 1 — Basic / Manual**
- **Level 2 — Digital / Descriptive**
- **Level 3 — Predictive**
- **Level 4 — Prescriptive**
- **Level 5 — Autonomous / Agentic**

| Dimension | Current AITEK Level | Typical Enterprise Level | State-of-the-Art Target | Gap Description | Business Impact | Priority |
|---|:---:|:---:|:---:|---|---|:---:|
| **Enterprise Data & Hierarchy** | **L1** (Single table, POC mock) | L3–L4 (MDM, Data Warehouse) | **L5** (Semantic Lakehouse + Knowledge Graph) | No queryable multi-echelon hierarchy; no ERP/MES integration | Prevents enterprise rollups and plant-level planning | **P0** |
| **Demand Sensing** | **L1** (None; historical only) | L3 (Order/POS feeds) | **L5** (Continuous multi-signal event stream) | Screen 02 shows trailing 5-year data; zero live market/channel signals | Demand shifts caught weeks late, causing stockouts | **P0** |
| **Forecast Intelligence** | **L3** (Point forecasts, backtested) | L3–L4 (Automated models) | **L5** (Probabilistic quantiles, hierarchical MinT, foundation models) | Single deterministic forecast; manual model selection dropdown | Understates risk; safety stock sizes miscalculated | **P0** |
| **Driver & Causal AI** | **L2** (Correlation / SHAP) | L3 (Feature importance) | **L5** (Causal graphs, counterfactual uplift) | Inability to distinguish confounders from actionable interventions | Misleading price/promotion elasticity guidance | **P1** |
| **Inventory Intelligence** | **L2** (Formulaic dynamic stock) | L3–L4 (Multi-echelon optimization) | **L5** (Network-wide probabilistic stock optimization) | Single-node safety stock formula; no network inventory visibility | Capital trapped in buffers; stockouts in remote DCs | **P0** |
| **Scenario & Digital Twin** | **L3** (Single slider what-if) | L3 (Multi-scenario compare) | **L5** (Monte Carlo scenario trees & disruption sensing) | One scenario at a time; no probability distributions or ranking | Inability to evaluate complex macro/tariff shocks | **P1** |
| **Supply & Capacity Planning** | **L2** (None; supplier LP only) | L4 (Constrained APS) | **L5** (Joint production, capacity, and procurement optimization) | No plant line capacity, maintenance, or shift constraints | Unfeasible production plans generated | **P1** |
| **Prescriptive Sourcing** | **L4** (PuLP CBC LP Allocation) | L3–L4 (Contract allocation) | **L5** (Stochastic MIP with multi-tier risk) | Hardcoded 5 suppliers; ignores tier-2/3 disruptions | Vulnerable to single-source component failures | **P1** |
| **Risk & Exception Management** | **L1** (Static at-risk modal) | L3 (Threshold alerts) | **L5** (Predictive early warning + automated triage) | No centralized exception center; users must manually hunt anomalies | Planners overwhelmed by data noise | **P0** |
| **GenAI & Copilot** | **L3** (Grounded tool calling) | L2–L3 (Chatbots / Copilots) | **L5** (Enterprise RAG + reasoning + execution orchestrator) | Narrates numbers well, but no document/policy RAG | Cannot explain sourcing contract terms or SOPs | **P1** |
| **Agentic AI & Orchestration** | **L3** (Single LangGraph agent) | L2–L3 (Early agent pilots) | **L5** (Governed multi-agent network + bounded autonomy) | One agent with 9 tools; no specialized agent coordination | Blocks autonomous planning workflows | **P1** |
| **Closed-Loop Execution** | **L1** (Advisory only) | L2–L3 (Manual ERP push) | **L5** (Policy-controlled bounded autonomous execution) | Recommendations stop at "Next Steps"; no ERP writeback | Manual latency and friction in executing decisions | **P2** |
| **Governance & MLOps** | **L1** (Prompt guard only) | L3–L4 (Model registry, drift) | **L5** (Continuous drift monitoring, FVA, audit trail, RBAC) | No model drift tracking, no decision audit log, no RBAC | High model decay and compliance failure risk | **P0** |

---

## 5. Comprehensive Industry Capability Gap Matrix

| Capability Dimension | Current AITEK Baseline | Current UX Representation | Typical Enterprise Benchmark | State-of-the-Art Benchmark | Exact Gap | Business Consequence | Priority | Frontend Implication | Backend / Data Implication |
|---|---|---|---|---|---|---|:---:|---|---|
| **Data Hierarchy & Master Data** | Single aggregate table, mock JSON | 5 decorative dropdowns in `HierarchyFilters.tsx` | Star-schema warehouse across SKU, Plant, Category, Customer | Enterprise semantic layer, MDM, continuous sync with ERP/MES | No true hierarchical rollup or drill-down | Inability to serve both CEO (rollup) and Plant Manager (SKU level) | **P0** | Enterprise Hierarchy Selector with dynamic aggregation levels | Relational/OLAP data cube model; multi-level aggregation service |
| **Near-Real-Time Demand Sensing** | Trailing 72-month historical series | Screen 02 "Demand Signals" (actually historical analysis) | Weekly/Daily POS & Order pipeline ingestion | Continuous signal ingestion (orders, POS, weather, commodities, macro) | Zero real-time external/internal sensing signals | Demand shocks identified 4–8 weeks too late | **P0** | Dedicated Demand Sensing Workspace: Live feed, Signal Confidence, Short-Term Delta | Streaming event bus, signal anomaly detector, Bayesian short-term adjuster |
| **Probabilistic Forecasting** | Point forecast with $\pm 10\%$ static interval | Single line with shaded band in `HistoricalForecastChart.tsx` | Point forecast with statistical intervals | Quantile distributions ($P10, P50, P80, P90, P95$) | Planners see only one expected number, hiding tail risks | Mis-sized safety stocks; stockouts during volatility | **P0** | Fan chart with quantile toggles, risk distribution curve | Quantile regression (LightGBM/DeepAR), probabilistic prediction service |
| **Forecast Value Added (FVA)** | Single MAPE/RMSE/R² metrics | 5 cards in `ForecastKpiGrid.tsx` | MAPE / WAPE tracking | Multi-stage FVA: Naive $\to$ Statistical $\to$ ML $\to$ Human Override | Cannot quantify whether models or planners add value | Wasted planning effort; unspotted model degradation | **P1** | FVA Waterfall Card showing step-by-step accuracy contribution | FVA tracking engine logging each touchpoint in planning cycle |
| **Causal AI & Intervention** | SHAP feature importance & Granger causality | Horizontal bar chart in `DemandDriversChart.tsx` | Correlational driver analysis | Causal DAGs, uplift modeling, counterfactual simulation | Tells what correlated in past, not what happens upon price change | Flawed pricing and promotional decisions | **P1** | Causal Driver Explorer with intervention sliders & confidence | DoWhy / EconML causal inference engine |
| **Inventory Health & Optimization** | 3 static KPIs in modal & Dynamic SS formula | Modals in `ExecutiveCockpit.tsx` | Single-echelon safety stock calculation | Multi-echelon inventory optimization (MEIO) with working capital liberation | No dedicated workspace for stockout risk, DOS, excess inventory | Millions trapped in dead stock while critical SKUs stock out | **P0** | First-class Inventory Intelligence Workspace with stockout heatmap | MEIO network graph solver, inventory coverage engine |
| **Supply & Plant Constraints** | Raw material supplier LP allocation only | Screen 05 `PrescriptiveSourcingPage.tsx` | Constrained capacity planning in ERP/APS | Joint optimization of line capacity, shifts, tooling, and sourcing | Ignores whether the manufacturing plant can actually produce | Prescribed supplier orders cannot be processed by factory | **P1** | Supply & Capacity Intelligence module with line utilization meters | Mixed Integer Linear Program (MIP) with machine/labor constraints |
| **Scenario Stress-Testing** | 4 single-scenario slider presets | Screen 04 `ScenarioStudioPage.tsx` | Manual scenario comparison in spreadsheets | Monte Carlo scenario trees, automated disruption ranking | One scenario evaluated at a time; no probability weights | Blind spots to low-probability, catastrophic disruptions | **P1** | Multi-scenario comparison matrix, Monte Carlo distribution curve | Stochastic simulation engine running 1,000+ iterations |
| **Risk & Exception Management** | Modal list of 3 at-risk SKUs | Modal in `ExecutiveCockpit.tsx` | Email alerts on threshold breaches | Unified exception triage: Detect $\to$ Root Cause $\to$ Recommend $\to$ Act | Planners must manually inspect dozens of charts | Critical supply exceptions missed until customer escalates | **P0** | Risk & Exception Center with prioritized actionable cards | Automated anomaly scoring and priority triage pipeline |
| **Multi-Agent Orchestration** | Single LangGraph copilot with 9 tools | Screen 06 `AIDecisionCopilotPage.tsx` | Single conversational assistant (e.g. Joule) | Governed multi-agent network (Demand, Inventory, Supply, Finance, Gov) | No specialized agent delegation, state sharing, or audit trail | Complex cross-functional decisions cannot be automated | **P1** | Agent Control Center: Active tasks, agent coordination, audit logs | Multi-agent state graph with inter-agent message passing |
| **Governance & Human-in-the-Loop** | Basic prompt injection guard | Minimal guard indicator in Copilot | Basic RBAC in portal | Tiered Bounded Autonomy ($L1 \to L5$) with policy approval gates | No explicit Approve / Modify / Reject workflows for AI advice | Legal, financial, and operational hesitation to adopt AI | **P0** | Action Approval Drawer with audit stamp and policy compliance check | Policy engine, digital signature logging, RBAC enforcement |

---

## 6. Screen-by-Screen Deep Audit

### Screen 01: Executive Cockpit
- **Current Role:** High-level dashboard showing 12-month outlook, 4 executive KPIs, AI summary, and 3 bottom value cards.
- **What Works:** Clear CXO-aligned metrics (Working Capital, OTIF, Sourcing Savings), responsive layout, clean chart.
- **What is Missing:** Multi-plant/division rollup; real-time exception banner; financial P&L exposure breakdown; direct action triggers.
- **Industry Gap:** Leading command centers provide a unified operational heartbeat synthesizing demand, supply, cash, and active exceptions.
- **Verdict: B — ENHANCE CURRENT SCREEN.** Evolve into **Executive Command Center**. Add multi-echelon aggregation, active risk alerts, and one-click drill-down to decisions.

### Screen 02: Demand Signals
- **Current Role:** 5 summary cards, 72-month historical demand curve, SHAP driver bar, seasonality heatmap, structural changes timeline, segment donut.
- **What Works:** High visual appeal; excellent historical pattern and seasonality representation.
- **What is Missing:** **It is NOT Demand Sensing.** It has no near-real-time signals (orders, POS, promotions, commodities, weather, channel inventory), no signal freshness indicator, and no confidence weighting.
- **Industry Gap:** Demand Sensing is short-term (1–8 weeks) and dynamic; Screen 02 is 10-year backward-looking analytics.
- **Verdict: C — SPLIT & EVOLVE.**
  - Transform Screen 02 into true **Demand Sensing** (Live Signal Feed, Signal Freshness, Demand Events, Short-Term Adjustments).
  - Move trailing statistical drivers and structural change analysis into a dedicated **Driver & Causal Intelligence** workspace.

### Screen 03: Demand Forecast
- **Current Role:** 5 KPI cards, historical + forecast timeline, model panel (XGBoost/Prophet/Holt-Winters), AI insight, quarterly bars, monthly table.
- **What Works:** Clean side-by-side model metadata and backtesting score display (MAPE, RMSE, R²).
- **What is Missing:** Point forecasts only; no probabilistic quantile fan ($P10/P50/P80/P90/P95$); no Forecast Value Added (FVA); no automated model recommendation by SKU profile; no hierarchical reconciliation.
- **Industry Gap:** State-of-the-art platforms provide probabilistic forecast distributions and automated champion/challenger selection.
- **Verdict: B — ENHANCE CURRENT SCREEN.** Evolve into **Forecast Intelligence**. Add probabilistic quantile toggles, FVA breakdown, and automated model tournament results.

### Screen 04: Scenario Studio
- **Current Role:** 4 preset buttons, 4 parameter sliders (Price, Demand, Seasonality, Service Level), scenario vs. base forecast chart, impact table, revenue waterfall.
- **What Works:** Interactive recalculation of P&L waterfall and safety stock buffers; intuitive slider controls.
- **What is Missing:** Evaluates only one scenario at a time; no Monte Carlo probabilistic simulation; no supply shock modeling (plant outage, port delay, supplier failure); no multi-scenario comparison matrix.
- **Industry Gap:** Modern platforms provide digital decision twins that simulate scenario trees and rank mitigation plans by expected financial loss.
- **Verdict: B — ENHANCE CURRENT SCREEN.** Evolve into **Scenario & Decision Twin**. Add Monte Carlo stress-testing view, multi-scenario comparison matrix, and disruption risk ranking.

### Screen 05: Prescriptive Sourcing
- **Current Role:** 5 sourcing KPIs, stacked supplier allocation chart, cost waterfall, supplier recommendation table, AI recommendation card.
- **What Works:** Real LP formulation framing (cost vs. reliability vs. lead-time optimization).
- **What is Missing:** Supplier-only view. Ignores plant manufacturing capacity, machine bottlenecks, labor constraints, and multi-echelon inventory synchronization. Also lacks approval/execution workflow.
- **Industry Gap:** Enterprise platforms do not separate raw material procurement from plant capacity planning.
- **Verdict: B — ENHANCE CURRENT SCREEN.** Evolve into **Supply & Procurement Optimization**. Incorporate plant capacity utilization meters, constraint feasibility checks, and human approval/ERP execution triggers.

### Screen 06: AI Decision Copilot
- **Current Role:** Quick action pills, categorized suggested questions, conversational workspace with structured decision blocks, context panel.
- **What Works:** Disciplined grounded architecture (invokes tools, emits verified decision cards, zero numerical hallucination).
- **What is Missing:** Operates as a single standalone copilot. No visibility into specialized agents, no shared multi-agent state, no policy verification checks, no human approval gates ($L1 \to L5$ autonomy).
- **Industry Gap:** Leading platforms provide governed multi-agent workspaces with audit trails and human-in-the-loop sign-off.
- **Verdict: B — ENHANCE CURRENT SCREEN.** Add multi-agent coordination panel, policy compliance badges, and explicit human approval actions (Approve / Modify / Reject).

---

## 7. Analysis of Missing Enterprise Workspaces

Based on domain gaps and benchmark analysis, the following three capabilities cannot fit cleanly into existing screens without causing severe visual clutter and cognitive overload:

### Missing Workspace 1: Inventory Intelligence (HIGH PRIORITY — P0)
- **Why it cannot fit in existing screens:** Currently, inventory is relegated to a single dynamic safety stock number in Scenario Studio and an at-risk modal in Executive Cockpit. An operations leader or CFO requires a dedicated operational cockpit to track:
  - Inventory health across the network (Days of Inventory, Turnover, Excess vs. Obsolete).
  - Multi-echelon stock positioning (Plant $\to$ Central DC $\to$ Regional Warehouse).
  - Stockout risk probability and trapped working capital heatmaps.
  - Recommended dynamic reorder points and safety stock buffers.
- **Verdict: CREATE NEW FIRST-CLASS WORKSPACE.**

### Missing Workspace 2: Risk & Exception Management (HIGH PRIORITY — P0)
- **Why it cannot fit in existing screens:** Planners should not have to hunt through 6 analytical screens to locate demand surges or supply bottlenecks. Enterprise planning must be exception-driven:
  - Prioritized exception triage queue (Critical, High, Medium).
  - Automated root-cause diagnostics (e.g., "Supplier B lead-time spike + Q3 seasonal peak").
  - Multi-agent recommended resolution with financial impact quantification.
  - One-click approval and execution dispatch to ERP.
- **Verdict: CREATE NEW FIRST-CLASS WORKSPACE.**

### Missing Workspace 3: Agent Control Center & Governance (MEDIUM-HIGH PRIORITY — P1)
- **Why it cannot fit in existing screens:** The Copilot is conversational; enterprise IT, CDOs, and operations heads need an operational control plane to monitor autonomous agents:
  - Real-time agent status (Demand Sensing Agent, Forecast Agent, Inventory Agent, Procurement Agent, Governance Agent).
  - Task execution log and decision audit trail.
  - Bounded autonomy policy controls (thresholds for auto-execution vs. human sign-off).
- **Verdict: CREATE NEW WORKSPACE (Or Advanced Governance Plane).**

---

## 8. Recommended Information Architecture

```text
AITEK PLATFORM SHELL
├── Executive Command Center           (Overview: Rollup, KPIs, Cash, Active Exceptions)
├── Demand Sensing                     (Real-Time Signals, Signal Freshness, Short-Term Delta)
├── Forecast Intelligence              (Probabilistic Quantiles, Ensembles, FVA, Hierarchy)
├── Driver & Causal Intelligence       (Causal Inference, Elasticity, Uplift, Regimes)
├── Inventory Intelligence             (Stock Health, Multi-Echelon, Safety Stock, Working Capital) [NEW]
├── Scenario & Decision Twin           (Monte Carlo, Stress Tests, Disruption Ranking)
├── Supply & Procurement Optimization   (Plant Capacity, Constraints, Supplier LP Allocation)
├── Risk & Exception Management        (Automated Exception Triage, Root-Cause, Approvals) [NEW]
├── AI Decision Copilot                (Grounded Reasoning, Cross-Functional Q&A, Briefings)
│
└── [ADVANCED & GOVERNANCE]
    ├── Agent Control Center           (Multi-Agent Status, Task Logs, Autonomy Policies) [NEW]
    └── Model Operations (MLOps)       (Drift Detection, Model Registry, FVA Tracking)
```

---

## 9. Final Screen Disposition & Priority Matrix

| Workspace / Screen | Action | Rationale | Priority | Target Release |
|---|:---:|---|:---:|:---:|
| **Executive Command Center** | **ENHANCE** | Add multi-plant rollups, active exception banners, working capital risk waterfall | **P0** | Sprint 1 |
| **Demand Sensing** | **SPLIT / EVOLVE** | Convert Screen 02 from historical analysis to live signal feed, freshness, and short-term delta | **P0** | Sprint 1 |
| **Forecast Intelligence** | **ENHANCE** | Add probabilistic quantile fan ($P10 \dots P95$), FVA waterfall, automated model tournament | **P0** | Sprint 1 |
| **Inventory Intelligence** | **CREATE NEW** | Essential enterprise capability; manages working capital, stockout risks, and safety stock | **P0** | Sprint 1 |
| **Risk & Exception Center** | **CREATE NEW** | Establishes modern exception-driven planning; automated triage and approval loop | **P0** | Sprint 2 |
| **Scenario & Decision Twin** | **ENHANCE** | Add Monte Carlo stress tests, multi-scenario comparison matrix, and disruption ranking | **P1** | Sprint 2 |
| **Supply & Procurement Optimization** | **ENHANCE** | Add plant capacity utilization, machine/line constraints, and human sign-off workflow | **P1** | Sprint 2 |
| **Driver & Causal Intelligence** | **CREATE NEW** | Separates deep causal inference from real-time sensing; models counterfactual interventions | **P1** | Sprint 2 |
| **AI Decision Copilot** | **ENHANCE** | Integrate multi-agent status, policy compliance verification, and human approval drawer | **P1** | Sprint 3 |
| **Agent Control Center** | **CREATE NEW** | Provides C-suite and IT visibility into agent tasks, bounded autonomy policies, and audit logs | **P2** | Sprint 3 |
| **S&OP / IBP Workspace** | **DEFER** | Cross-functional consensus matrix; build once demand-supply synchronization is proven | **P3** | Future State |
| **Model Operations (MLOps)** | **DEFER** | Full automated retraining and CI/CD pipelines; retain lightweight monitoring in POC | **P3** | Future State |

---

## 10. Architectural Principles for Implementation

1. **Typed Domain Models Before Presentation:**  
   Define comprehensive TypeScript interfaces for all domain entities (`DemandSignal`, `ProbabilisticForecast`, `InventoryPosition`, `SupplyConstraint`, `PlanningException`, `AgentTask`, `DecisionApproval`) in `src/types/domain/`.
2. **Deterministic Computation Over LLM Generation:**  
   Retain strict separation: deterministic simulation/optimization services calculate numerical outcomes; GenAI/Copilot agents narrate and reason over verified outputs.
3. **Bounded Autonomy with Human-in-the-Loop:**  
   Every AI recommendation with financial or operational impact must include an explicit approval card (`Approve`, `Modify`, `Reject`) with an audit trace.
4. **No Fake Production Claims:**  
   Clearly label simulated components ("Simulated Enterprise Data Cube", "Synthetic Stream Engine") while maintaining production-grade data contracts.
5. **Preserve Platform Design Consistency:**  
   Strictly adhere to `GEMINI.md`: cobalt accent (`#0062d2`), neutral slate background (`#f8fafc`), high-density typography, consistent card padding, accessible focus states, and responsive flex/grid layouts.
