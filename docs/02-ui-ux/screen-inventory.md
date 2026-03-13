# Screen Inventory

## 1. Purpose
Define every in-scope screen, its user value, action model, and state expectations to support implementation, testing, and review.

## 2. Screen Catalogue

### Screen: Login
- **Purpose:** Authenticate user and initiate secure onboarding.
- **User type:** Unauthenticated user.
- **Key content areas:** Value proposition, sign-in CTA, privacy/terms links.
- **Primary actions:** Continue with Google.
- **Secondary actions:** View help/privacy.
- **Empty states:** N/A.
- **Error states:** OAuth initiation failure, unsupported browser warning.
- **Permissions / visibility notes:** Public.
- **Related user flows:** Flow A.

### Screen: Onboarding Wizard
- **Purpose:** Configure timezone, default reminders, and channel setup.
- **User type:** Newly authenticated user.
- **Key content areas:** Step indicator, configuration form, integration status cards.
- **Primary actions:** Save and Continue, Connect channel.
- **Secondary actions:** Skip optional integration.
- **Empty states:** No optional channels connected yet.
- **Error states:** Validation errors, provider connectivity failure.
- **Permissions / visibility notes:** Authenticated, first-run or reset onboarding.
- **Related user flows:** Flow A.

### Screen: Dashboard
- **Purpose:** Provide operational overview and prioritized next actions.
- **User type:** Authenticated user.
- **Key content areas:** KPI cards, needs-attention queue, upcoming reminders list.
- **Primary actions:** Review event, open activity issue, reconnect integration.
- **Secondary actions:** Filter date range, dismiss informational cards.
- **Empty states:** No upcoming events; no action needed.
- **Error states:** Partial data load failure by widget.
- **Permissions / visibility notes:** Authenticated.
- **Related user flows:** Flow B, Flow D.

### Screen: Events List
- **Purpose:** Manage event backlog with search/filter and status-based triage.
- **User type:** Authenticated user.
- **Key content areas:** Search bar, filter panel, event table/card list.
- **Primary actions:** Open event detail, bulk confirm schedule.
- **Secondary actions:** Save filter view (future), export list (future).
- **Empty states:** No matching events for filter.
- **Error states:** Query timeout, invalid filter combination.
- **Permissions / visibility notes:** Authenticated.
- **Related user flows:** Flow B.

### Screen: Event Detail
- **Purpose:** Review extracted event data and manage reminder specifics.
- **User type:** Authenticated user.
- **Key content areas:** Event summary, extraction confidence, reminder schedule panel, source metadata.
- **Primary actions:** Confirm schedule, edit timing, retry extraction (future).
- **Secondary actions:** View source context, copy event reference.
- **Empty states:** Missing extracted fields requiring manual completion.
- **Error states:** Save conflict, stale event status, unavailable source metadata.
- **Permissions / visibility notes:** Event visibility scoped by user ownership.
- **Related user flows:** Flow B.

### Screen: Preferences
- **Purpose:** Configure global defaults affecting future reminders.
- **User type:** Authenticated user.
- **Key content areas:** Reminder defaults, quiet hours, channel toggles, timezone.
- **Primary actions:** Save preferences.
- **Secondary actions:** Reset section to defaults.
- **Empty states:** No channels enabled warning.
- **Error states:** Validation and persistence errors.
- **Permissions / visibility notes:** Authenticated.
- **Related user flows:** Flow C.

### Screen: Integrations Overview
- **Purpose:** Show health and management actions for connected providers.
- **User type:** Authenticated user.
- **Key content areas:** Provider cards, status chips, last sync and token health.
- **Primary actions:** Connect, reconnect, disconnect.
- **Secondary actions:** View provider detail.
- **Empty states:** No providers connected.
- **Error states:** Status refresh failure, reconnect error.
- **Permissions / visibility notes:** Authenticated.
- **Related user flows:** Flow A, Flow D.

### Screen: Activity & Diagnostics
- **Purpose:** Provide reminder delivery traceability and remediation controls.
- **User type:** Authenticated user, support-oriented persona.
- **Key content areas:** Attempt history list, status timeline, filter bar.
- **Primary actions:** Retry delivery, inspect attempt detail.
- **Secondary actions:** Apply filter presets, clear filters.
- **Empty states:** No activity in selected range.
- **Error states:** Log retrieval failure.
- **Permissions / visibility notes:** Authenticated; verbose diagnostics can be role-gated in future.
- **Related user flows:** Flow E.

### Screen: Account & Settings
- **Purpose:** Manage profile, session security, and account-level controls.
- **User type:** Authenticated user.
- **Key content areas:** Profile info, session devices, consent and data controls.
- **Primary actions:** Sign out all sessions, update profile metadata.
- **Secondary actions:** Access support links.
- **Empty states:** No active secondary sessions.
- **Error states:** Session revoke failure.
- **Permissions / visibility notes:** Authenticated.
- **Related user flows:** Authentication/session flows.

## 3. Screen Ownership / Relevance
- **Product:** Defines screen-level value and prioritization.
- **Design:** Owns visual patterns and interaction fidelity.
- **Frontend:** Owns component composition, routing, and state handling.
- **QA:** Owns coverage across normal, empty, and error paths.

## 4. Screen Priority (MVP / Future)
- **MVP:** Login, Onboarding, Dashboard, Events List, Event Detail, Preferences, Integrations Overview, Activity.
- **Future:** Advanced provider detail drill-down, saved event views, activity export workflows.

## 5. Entry Conditions
- Auth screens: unauthenticated state.
- App screens: authenticated state with valid session token.
- Event detail: event identifier exists and is accessible.
- Diagnostics detail: reminder attempt reference exists.

## 6. Exit Conditions
- Save actions produce persistent confirmation and return to prior context.
- Destructive actions require confirmation and provide undo/recovery path when possible.
- Session expiration exits to login while preserving intended return destination.

## 7. Cross-Screen Dependencies
- Dashboard cards deep-link into Events Detail and Integrations.
- Events status badges depend on backend lifecycle statuses (`Detected`, `Scheduled`, `Failed`, `Delivered`).
- Preferences changes influence default fields in Event Detail edit surfaces.
- Activity remediation actions depend on integrations channel health.

## 8. Open Questions / Gaps
1. Should Account & Settings merge with Preferences in MVP navigation?
2. Do we need role-based screen variants for support vs end-user personas in V1?
3. Is Activity detail enough for support workflows without export/share capability?

**Cross references:** `information-architecture.md`, `user-flows.md`, `components.md`, `docs/01-tech-spec/frontend-spec.md`.
