# AITEK Platform — Engineering & UI Instructions

## 0. Mandatory instruction loading

Before generating, modifying, deleting, or refactoring any code:

1. **Mandatory GEMINI.md Review Gate**: Read and consult `GEMINI.md` completely before proposing, writing, editing, or generating any code.
2. **Checklist Before Generating Code**:
   - Verify alignment with Section 1 (Product context & design direction: premium enterprise SaaS, restrained color, no visual noise/clutter).
   - Verify compliance with Section 2 & 7 (Technology direction: React, TypeScript, Tailwind, shadcn/ui; no MUI/Chakra).
   - Verify compliance with Section 3 (Design system rules: neutral base, single accent, consistent tokens).
   - Verify compliance with Section 4 (Screen specifications & mock data contracts).
   - Inspect existing repository files and preserve working architecture (no arbitrary replacements).
3. **No Blind Code Generation**: Always explicitly cross-check the target screen or component against its matching section in `GEMINI.md`.

---

## 1. Product context

AITEK is an enterprise AI/operations platform that will expose multiple business solutions through one platform experience.

The first workflow being implemented is:

AITEK Platform Login
→ Solution Selection
→ Solution-Specific Authentication
→ Enterprise Data Ingestion

The UI must feel like one coherent AITEK product, not four unrelated pages.

Target users are enterprise customers, operations leaders, IT/data teams, and administrators.

Design direction:
- premium enterprise SaaS
- modern AI-platform feel
- clean, calm, credible
- information-dense but not cluttered
- sophisticated rather than flashy
- strong visual hierarchy
- restrained use of color
- excellent spacing and typography
- accessible and responsive

Avoid:
- generic Bootstrap-looking screens
- excessive gradients
- unnecessary glassmorphism
- oversized decorative illustrations
- excessive animations
- visual noise
- "AI generated" gimmicks
- dashboard clutter
- excessive rounded cards everywhere

---

## 2. Technology direction

Preferred stack for new UI work:

- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix primitives through shadcn where appropriate

Use the repository's existing stack if it is already established and working.

Do not introduce Material UI or Chakra UI unless the repository already depends on them and migrating away would be clearly harmful.

Use strict TypeScript where practical.

Prefer composition and reusable components over duplicated page markup.

---

## 3. Design system rules

Create an AITEK visual language rather than directly sprinkling library defaults throughout pages.

Use:
- a restrained neutral base
- one primary AITEK accent
- semantic status colors only where meaningful
- a consistent spacing scale
- consistent border radius
- consistent elevation
- consistent typography hierarchy

Centralize visual tokens where practical.

Do not hard-code slightly different values for the same concept across files.

Examples of concepts that should remain consistent:
- page padding
- card radius
- button height
- input height
- heading sizes
- muted text
- border color
- focus states
- success/warning/error states

If an AITEK component will be reused, place it in a reusable component layer rather than duplicating it inside a page.

---

## 4. Required screens

### Screen 1 — AITEK Platform Login

Purpose:
Authenticate the user into the AITEK platform.

Required content:
- AITEK brand/logo treatment using an existing project asset if available
- welcome message
- work email / user ID input
- password input
- password visibility toggle
- remember-me option
- primary sign-in button
- forgot-password link
- optional SSO button if appropriate for the existing architecture

Behavior:
- client-side validation
- loading state during sign-in
- clear validation/error feedback
- successful login routes to the Solution Hub
- use mock authentication for this UI phase unless a real auth service already exists
- never hard-code real credentials or secrets

The screen should look intentionally minimal and premium.

---

### Screen 2 — AITEK Solution Hub

Purpose:
Allow the authenticated organization/user to select an AITEK solution.

Required experience:
- platform header
- user/account area
- clear page title and supporting description
- searchable/filterable solution collection if the number of solutions warrants it
- reusable solution cards
- solution name
- concise business outcome
- status badge
- action to open the solution

Use representative solutions such as:
- Demand Intelligence
- Inventory Intelligence
- Manufacturing Excellence
- Cement Intelligence
- Supply Chain Intelligence

Clearly distinguish:
- Active
- Available
- Coming Soon

Clicking an active/available solution should route to the Solution Login screen with solution context.

Keep solution metadata in structured configuration/data, not repeated hard-coded JSX.

---

### Screen 3 — Solution-Specific Login

Purpose:
Provide a second authentication boundary for a selected AITEK solution.

The page must dynamically reflect the selected solution.

Example:
Inventory Intelligence
"Secure access to your workspace"

Required:
- selected solution identity
- organization context placeholder
- solution user ID
- solution password
- visibility toggle
- sign-in/continue action
- forgot-password link
- back-to-solutions action

Successful sign-in should route to Data Ingestion for this prototype.

Do not create a separate page/component for every solution.
Use one reusable solution-auth experience driven by route/state/configuration.

---

### Screen 4 — Data Ingestion / Enterprise Connectivity

Purpose:
Allow a customer to connect enterprise data sources that will power the selected AITEK solution.

This is a high-value enterprise experience and should feel significantly more sophisticated than a basic upload form.

Landing state:
"Connect your enterprise data"
"Bring together the data that powers your AITEK solution."

Show source categories such as:
- ERP
- Databases
- Cloud/Data platforms
- Files
- APIs

Representative connectors:
- SAP
- Oracle
- Microsoft Dynamics
- SQL Server
- PostgreSQL
- Snowflake
- Databricks
- REST API
- CSV
- Excel
- JSON
- Parquet

Use connector cards/list items with:
- source icon or simple visual mark
- source name
- short description
- connection state
- action

For the initial prototype, clicking a source should open a guided connection flow.

Preferred flow:
Select Source
→ Authenticate
→ Select Data
→ Map Fields
→ Validate
→ Sync
→ Ready

The prototype can simulate these steps with local state.

Required UX states:
- not connected
- connecting
- connected
- validation successful
- validation error
- syncing
- sync complete

Include a sensible mapping view showing examples such as:
- AITEK Demand Date → source.order_date
- AITEK Product ID → source.material_code
- AITEK Quantity → source.order_quantity
- AITEK Location → source.plant_code

Do not build real SAP/database/API integrations unless they already exist in the repository.

For this UI milestone, use mocked connector configuration and local state.

---

## 5. Navigation & application shell

Implement a coherent route structure.

Preferred conceptual routes:

/login
/solutions
/solutions/:solutionId/login
/solutions/:solutionId/data

Use route guards or placeholder auth state where appropriate.

Do not create unnecessary nested routing complexity.

Maintain selected solution context consistently across navigation.

Provide:
- sensible back navigation
- clear active state
- consistent header behavior
- consistent responsive behavior

---

## 6. Component architecture

Create reusable components for recurring UI patterns.

Examples:
- AitekLogo
- PlatformHeader
- SolutionCard
- StatusBadge
- AuthForm
- PasswordInput
- ConnectorCard
- ConnectorGrid
- StepIndicator
- ConnectionForm
- DataMappingTable
- ValidationSummary
- SyncStatus

Names can vary to match existing project conventions.

Do not over-componentize trivial one-line elements.

Prefer:
- shared primitives for generic UI
- AITEK components for product-specific patterns
- pages for composition and flow

Avoid having pages directly own repeated visual logic.

---

## 7. shadcn/ui usage rules

Use shadcn/ui as the component foundation.

Prefer shadcn for:
- Button
- Input
- Label
- Card
- Badge
- Dialog
- Drawer
- Tabs
- Select
- Command
- Dropdown Menu
- Tooltip
- Progress
- Alert
- Table

Customize the components so the result feels AITEK-specific.

Do not make every page look like a shadcn demo page.

Do not blindly use every available component.

---

## 8. Forms & validation

Forms must be production-minded even when the backend is mocked.

Requirements:
- labels
- helpful placeholders where appropriate
- visible validation
- keyboard accessibility
- disabled/loading states
- error feedback
- success feedback
- sensible tab order

Use a consistent form strategy across the project.

Do not create fake validation that behaves inconsistently across screens.

---

## 9. Responsive behavior

The UI must work well at:
- desktop
- laptop
- tablet
- mobile

Prioritize the enterprise desktop experience, but do not allow layout breakage on smaller widths.

Avoid fixed-width layouts that cause horizontal scrolling.

For data-heavy areas, create intentional overflow behavior rather than allowing random clipping.

---

## 10. Accessibility

Accessibility is a first-class requirement.

Include:
- semantic HTML where possible
- accessible labels
- visible keyboard focus
- sufficient contrast
- meaningful button/link labels
- no interaction that depends only on hover
- accessible dialog behavior
- accessible password visibility controls
- keyboard-friendly forms

Do not use color alone to communicate status.

---

## 11. Icons & imagery

Prefer a consistent icon system already present in the repository.

If the project does not already have one, use a lightweight icon package compatible with the chosen UI stack.

Do not introduce random icon styles.

For enterprise source connectors, simple brand-neutral icon treatments are acceptable for the prototype when official logos are unavailable.

Do not add external image dependencies unless they are genuinely necessary.

---

## 12. Animation

Use motion sparingly.

Good:
- subtle page transitions
- button loading feedback
- step transitions
- connector state changes

Avoid:
- continuous floating animations
- excessive bounce
- distracting background motion
- animation on every card

The product should feel fast and trustworthy.

---

## 13. Data model for prototype

Keep prototype data separate from rendering.

Example conceptual structure:

solutions:
- id
- name
- description
- status
- category
- enabled

connectors:
- id
- name
- category
- description
- supported
- status

Do not scatter solution names and connector metadata throughout JSX.

---

## 14. Security & code quality

Never:
- commit secrets
- hard-code credentials
- expose API keys
- store passwords in local storage
- create fake security claims
- add unsafe HTML injection
- suppress TypeScript errors just to make the build pass

For mocked authentication, use clearly labeled demo state.

Keep security-sensitive behavior isolated so real auth can be integrated later.

---

## 15. Performance

Do not prematurely optimize, but avoid obvious problems.

Prefer:
- small reusable components
- local configuration arrays
- lazy loading where it materially helps
- no unnecessary giant dependencies
- no repeated expensive calculations during render
- no unnecessary global state

---

## 16. Error handling

Every async-looking UI flow should have meaningful states:
- idle
- loading
- success
- error

Avoid fake operations with no feedback.

Error messages should tell the user what happened and what to do next.

---

## 17. Development workflow

Before editing code:
1. inspect repository
2. inspect package.json
3. inspect current routes
4. inspect existing components
5. inspect existing styles/tokens
6. inspect available assets
7. identify whether React + TypeScript + Tailwind + shadcn are already present

Then implement incrementally.

Do not blindly overwrite files.

After implementation:
1. run type checking / linting if configured (e.g. tsc --noEmit)
2. do NOT use `npm run build`
3. use `npm run dev` to start the development server and verify the UI
4. inspect the final UI for layout issues and obvious visual inconsistencies

---

## 18. Important implementation principle

Build the platform as a foundation for future AITEK solutions.

The current four screens are the first slice of a larger platform.

Therefore:
- solution data must be extensible
- routing must be solution-aware
- shared components must be reusable
- authentication boundaries must be separable
- data ingestion must support additional connectors later
- visual language must remain consistent as the product expands

Do not solve today's screen in a way that makes tomorrow's fifth or tenth solution difficult.

---

## 19. Definition of done

The implementation is complete only when:

- all four screens exist
- navigation between them works
- selected solution context is preserved
- UI states are implemented
- responsive layouts are functional
- forms have validation
- loading/error/success states exist
- components are reasonably reusable
- no real credentials/secrets are introduced
- TypeScript/lint checks pass and `npm run dev` serves the application cleanly (no `npm run build`)
- UI feels like one AITEK enterprise product
- no obvious placeholder or broken states remain

If a requirement is ambiguous, prefer the simplest maintainable implementation that preserves the architecture above.
