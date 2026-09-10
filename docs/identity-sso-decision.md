# Identity & SSO Decision — Platform + Multi-App Login

**Resolves:** Wireframe review finding 1.1 (Double login) in `wireframe-review-notes.md`.

## Decision

One login only. The platform login screen is the single authentication event; every downstream app or workspace — regardless of whether it's delivered as shared SaaS or deployed into a client's own tenant — is reached via SSO, never a second credential prompt.

## Why two deployment shapes need different mechanics for the same experience

- **SaaS-hosted apps sharing the platform's backend/tenant boundary:** "Open Solution" is a pure entitlement/authorization check against the session that already exists. No token exchange, no redirect, no second screen — the platform already knows who the user is; it only checks whether they're licensed for that app.
- **Client-deployed apps** (running inside a customer's own Azure tenant, per the tenant-deployed model in the Demand Forecasting Blueprint): there is no shared backend to check a session against, so SSO here means federation. The platform's identity provider (Microsoft Entra ID) issues a token via OIDC/OAuth2 (or SAML where required) after the one platform login. The client-deployed app is configured to trust tokens from that IdP — via a multi-tenant app registration, cross-tenant access settings, or SAML federation — and validates the token silently instead of presenting its own login form. This is the standard mechanism for enterprise SSO into a vendor app and should be designed in from the start, not retrofitted.

## Supporting rules

- A tenant/organization switcher remains in the UI as a lightweight header control, not a re-authentication gate.
- Step-up authentication (a genuine second prompt) is reserved for sensitive actions only — e.g. approving a supplier reallocation or a working-capital release — not for routine navigation between apps. This ties into the missing audit-trail gap also flagged in the wireframe review (Section 2).
- Net effect on the current wireframe: the second "Organization + Solution User ID + Password" screen is removed in favor of silent token validation against the platform session.
