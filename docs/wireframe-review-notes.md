# AITEK Demand Intelligence — Wireframe Review Notes

**Reviewed:** https://demand-forecasting-ui-wireframe.vercel.app (root domain — `/login` currently 404s)
**Scope:** Platform login, solution login, Demand Intelligence data ingestion wizard, and all nine workspaces (Executive Command Center, Demand Sensing, Forecast Intelligence, Driver & Causal Intelligence, Inventory Intelligence, Scenario & Decision Twin, Supply & Capacity Optimization, Risk & Exception Center, AI Decision Copilot, Agent Control Center).
**Reviewer note:** Notes below are UX/product observations from clicking through the live wireframe, not a code review — no repo was available at review time.

---

## Overall take

The information architecture and the analytical concepts behind each screen are strong and on par with mature commercial demand-planning suites (o9, Kinaxis, Blue Yonder). The SAP field-level data mapping (VBAK/VBAP tables), probabilistic forecast quantiles (P10–P95), champion/challenger model tournament, and Forecast Value Added waterfall all show real domain grounding, not just UI polish. The main risks are (1) scope is larger than the stated "demand forecasting first" sequencing, (2) two nav items aren't wired up yet, and (3) the path from "something needs attention" to "here's why" takes more clicks and re-filtering than it should.

---

## 1. Critical UX issues

### 1.1 Double login — **DECIDED**, see `claude/identity-sso-decision.md`
Users authenticate once at the platform level, land on the Solutions hub, then hit a **second** login screen (Organization + Solution User ID + Password) just to open Demand Intelligence. This contradicts the platform's own positioning ("Same platform. Deeper possibilities.").

Resolution: one login only, for every app regardless of whether it's shared SaaS or deployed into a client's own tenant. SaaS-hosted apps reuse the existing platform session (pure entitlement check, no second prompt). Client-deployed apps get there via SSO federation off the platform's identity provider (OIDC/OAuth2 or SAML) rather than their own login form. Full mechanics and rationale in `claude/identity-sso-decision.md`.

### 1.2 Too many clicks/scrolls to reach real insight
Getting from "something needs attention" to the underlying reason currently requires visiting several separate, un-filtered workspaces:
- The same top-line KPIs (total demand, service level, inventory value) are repeated near-identically across Executive Command Center, Forecast Intelligence, and Inventory Intelligence — redundant re-orientation without new information.
- On Demand Sensing, Forecast Intelligence, and Driver & Causal Intelligence, the AI Insight/Recommendation block (the actual "so what") sits at the very bottom of the page, after 8–10 chart sections.
- Clicking a KPI or exception (e.g. "Inventory risk in APAC — 18% stockout probability") doesn't deep-link into that specific item, filtered — it just opens a new, unfiltered workspace where the user has to re-apply filters and re-locate the number.
- The "Explore in Forecast Intelligence" / "Explore in Scenario Studio" links at the bottom of pages are a good pattern but are one-way forward pointers, not context-preserving deep links.
- **Recommendation:** Treat the IA as two tiers. Fast tier: Executive Command Center + a working Risk & Exception Center, purely for "what changed, what needs a decision." Slow tier: the six analytical workspaces, for deliberate deep dives. Make fast-tier items click straight into the relevant filtered view in the slow tier (same SKU/region/time range carried over), instead of dropping the user on a blank workspace.

### 1.3 Filters don't persist across pages
Demand Sensing, Forecast Intelligence, Driver & Causal Intelligence, and Inventory Intelligence each have independent Plant/Product/Region/Time-horizon selectors. A user who sets "Columbus Plant #04, HDPE Resin" on one page has to re-select it on the next, compounding the click-fatigue from 1.2.
- **Recommendation:** Hoist Plant/Product/Region/Time-window into a persistent context bar that holds for the whole solution session; layer page-specific filters on top only where genuinely needed.

---

## 2. Functional gaps

- **Risk & Exception Center** — nav item is present and does highlight as active, but the page renders blank (or falls back to Executive Command Center content). This is arguably the most important page to finish first, since it's structurally the fix for issue 1.2 (a single triage view).
- **Agent Control Center** — nav item doesn't navigate at all when clicked.
- **Data Ingestion wizard** — clicking "Next" from Step 1 (Select Source) jumps straight to Step 4 (Map Fields), skipping Step 2 (Connect/Authenticate) and Step 3 (Select Data). Likely a demo shortcut, but worth confirming intent — real SAP authentication (RFC destinations, OAuth, IP allowlisting) is nontrivial and shouldn't get glossed over in the real build.
- **No audit trail** — the app surfaces real decision triggers ("Approve supplier reallocation," "Authorize working capital release") with no visible record of who approved what, when, or what the AI recommended vs. what a human actually did. This is presumably what Agent Control Center is meant to cover — worth prioritizing for governance reasons, not just to fix the dead link.

---

## 3. Consistency / polish

- Sidebar label vs. page title mismatches: sidebar says "Supply & Capacity Optimization," page header says "Prescriptive Sourcing"; sidebar says "Scenario & Decision Twin," page header says "Scenario Studio."
- No real URL routing — the app is single-path client-side state, so no screen can be bookmarked, deep-linked, or reached via browser back/forward. Worth adding real routes (including query params for filter state) early, since retrofitting later touches everything and is also the mechanism that would fix the deep-linking gap in 1.2.
- `/login` 404s directly; only the root domain resolves.

---

## 3b. Brand alignment — wireframe does not follow the AITEK brand guide

Cross-checked against `aitek-style-guide.html` (AiTek-BrandGuideline folder). The wireframe does not follow it:

- **Theme:** the wireframe forces dark navy on every screen with no light mode. The brand's default theme is light (`color-scheme: light` at root); dark is an explicit secondary mode (system preference or manual toggle), not the only option.
- **Accent color:** the wireframe uses a teal-to-cyan gradient accent (the logo mark, several highlights). The brand guide is explicit about a single accent color — Brand Primary blue (`#155DFC` light / `#5B93FF` dark) — "Info reuses Brand Primary rather than adding a second blue." Teal/cyan isn't part of the palette anywhere.
- **Typography:** the wireframe reads as a generic UI sans-serif; the brand specifies Urbanist for headings/labels and Epilogue for body text.

Recommendation: the React rebuild should default to light theme, add dark as a real toggle rather than the forced default, and use only the single blue accent throughout. Full token values are in `frontend-build-spec.md`.

---

## 4. Trust / security hygiene

- The login form ships with a real-looking pre-filled demo email and password on page load. Harmless for an internal demo, but should be removed (or replaced with a clearly labeled "Demo login" button) before the link circulates more broadly, so it doesn't read as an exposed credential.
- The Organization dropdown on the solution-login screen lists other tenants by name (Global Supply Enterprise, Acme Industrial Operations) before the user has proven they belong to any of them. For a real multi-tenant product this is a genuine hygiene issue — enterprise contracts often restrict revealing who else is a customer. Infer the org from the authenticated identity (email domain, invite binding) rather than presenting an open list.
- The platform leans hard on confidence language without showing methodology: "100% Auto-Map AI Confidence," "0 Violations," "99.2% Convergence," "Zero-Loss Checksum Active." Fine for a demo, but sophisticated buyers will ask what the number is based on — decide now whether these get methodology tooltips later, or whether the language should be softened so it doesn't overpromise.
- The Driver & Causal Intelligence module uses genuine causal-inference language (causal network map, price elasticity, "causal, not just correlation"). If the eventual backend is really correlation/feature-importance dressed up with causal language, that's a credibility risk with technical buyers — worth deciding early whether real causal modeling (e.g. structural time-series, DoWhy-style methods) is in scope, and scoping it as its own engineering effort if so.

---

## 5. Scope sequencing

The wireframe already bundles nine workspaces — demand sensing, probabilistic forecasting, causal drivers, inventory optimization, scenario simulation, prescriptive sourcing, risk/exception triage, an AI copilot, and agent governance — even though the stated plan was demand forecasting first, with inventory modeling to follow. Recommend explicitly deciding which 2–3 modules get real backends first (Executive Command Center, Demand Sensing, Forecast Intelligence are the natural core) and treating the rest as UI-only placeholders for now, clearly marked as such, so the gap between what the screens promise and what's actually running doesn't become a credibility risk in front of prospects.

---

## 6. Minor / lower priority

- Mobile breakpoint (~700px) collapses to a stacked single column, but dense elements (SKU-level tables, the model tournament table, the causal network map) will be close to unusable that narrow. Worth deciding whether mobile is a real target (e.g. execs glancing at KPIs on a phone) — if so, the Executive Command Center likely needs a genuinely condensed mobile variant rather than the desktop layout reflowing into one column.
- The AI Decision Copilot's disclaimer ("AI responses are powered by AITEK's demand intelligence models. Please validate critical decisions.") only appears once per response. Given the copilot touches forecast, sourcing, and pricing decisions, consider making it a persistent, always-visible line near the chat input rather than per-message footer text.

---

## Suggested priority order

1. Fix the double-login flow (1.1) — highest visibility, affects every demo.
2. Build out Risk & Exception Center (2) — it's the structural fix for the click-depth problem (1.2) as well as a standalone gap.
3. Persist filter/context state across pages (1.3) — directly reduces perceived friction.
4. Add real routing + deep-linking (3) — unlocks bookmarking and makes the drill-down fix in 1.2 straightforward to implement.
5. Everything else (naming consistency, credential hygiene, org-list exposure, confidence-language tuning) — low effort, do opportunistically.
6. Scope-sequencing decision (5) and the causal-modeling scope question (4) — not wireframe fixes per se, but worth resolving before committing engineering time to the deeper modules.
