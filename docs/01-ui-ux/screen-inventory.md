# Screen Inventory (Canonical Screen Catalogue)

## 1. Purpose
Define and govern the single authoritative screen catalogue for all UI/UX documentation in `docs/01-ui-ux`.

## 2. Canonical Screen Catalogue

| Screen ID | Screen Name | Purpose | Primary User | Entry Points | Exit Paths | Core States | Related Flows | Related Components | Traceability |
|---|---|---|---|---|---|---|---|---|---|
| S01 | Login & Consent | Authenticate users and capture required OAuth permissions before access. | First-time and returning users with expired sessions. | App launch, session expiry, sign-in required redirects. | S02 for first-time setup, S03 for returning users, retry on auth failure. | Default, Loading, Error, Permission, Success Redirect | F1 | C01, C02, C18 | FR-01, FR-02, US-01, US-02 |
| S02 | Onboarding Wizard | Collect timezone/default reminder settings and enable Google Calendar sync in MVP. | Newly authenticated first-time users. | Successful S01 authentication for new accounts. | S03 after completion, back to S01 if auth/session breaks. | Default, Validation, Loading, Error, Success | F1 | C04, C05, C06, C17, C18, C19 | FR-06, FR-09, FR-11, US-03, US-08, US-09 |
| S03 | Dashboard | Provide operational overview, triage queue, and shortcuts to key reminder + calendar-sync actions. | Active returning users managing daily reminders. | Post-onboarding completion, post-login landing, global navigation. | S04, S05, S06, S07, S08, S09. | Default, Loading, Empty, Error, Success Feedback | F1, F2, F3, F5 | C01, C07, C08, C09, C10, C15, C18 | FR-04, FR-09, FR-10, US-05, US-07, US-09 |
| S04 | Events List | Enable bulk review, filtering, sorting, and navigation across extracted events and sync outcomes. | Power users triaging multiple reminders/events. | S03 CTA, global navigation, filtered deep-links. | S05 event detail, S03 dashboard. | Default, Loading, Empty, Error, Permission | F2, F4 | C10, C14, C15, C16 | FR-04, FR-10, US-05, US-07 |
| S05 | Event Detail | Review one extracted event, confirm reminder behavior, and view calendar sync state/history. | Users validating event-level reminder decisions. | S03 attention queue card, S04 row/card selection. | S03 or S04 after save/dismiss, S08 diagnostics. | Default, Loading, Validation, Error, Success, Permission | F2, F4, F5 | C04, C05, C12, C13, C17, C18, C20 | FR-04, FR-06, FR-09, FR-10, US-05, US-08, US-09 |
| S06 | Preferences | Manage global reminder defaults and calendar sync behavior for future events. | Returning users adjusting reminder defaults. | Global navigation, S03 quick actions. | S03 dashboard. | Default, Loading, Validation, Error, Success | F3 | C04, C05, C06, C17, C18, C19 | FR-09, FR-11, US-03, US-09 |
| S07 | Integrations | Monitor and repair Google provider connectivity (OAuth, Gmail, Calendar). | Users resolving integration health issues. | Global navigation, S03/S08 health alerts, onboarding checks. | S03 dashboard, S08 activity diagnostics. | Default, Loading, Error, Success, Permission | F1, F5 | C02, C06, C10, C18, C19, C20 | FR-02, FR-09, US-02, US-09 |
| S08 | Activity & Diagnostics | Audit extraction/sync attempts, inspect failures, and run retries with traceability. | Users/operators troubleshooting delivery outcomes. | Global navigation, S03 failure alerts, S05 diagnostics CTA. | S03 dashboard, S05 event detail, S07 integrations. | Default, Loading, Empty, Error, Success | F2, F4, F5 | C02, C10, C12, C14, C15, C20 | FR-04, FR-09, FR-10, US-05, US-07, US-09 |
| S09 | Account & Session Settings | Manage profile/session controls including timezone/account preferences and sign-out. | Authenticated users managing account/session state. | Profile menu from authenticated app shell. | S03 dashboard, S01 after sign-out/session reset. | Default, Loading, Error, Success | F3 | C02, C04, C19, C20 | FR-01, FR-11, US-01, US-03 |

## 3. Naming and ID Normalization Decisions
- Canonical names are fixed to the exact values in the table above.
- `S08` is standardized as **Activity & Diagnostics** (not `Activity`).
- `S06` remains **Preferences**; `S09` covers account/session controls.
- IDs are stable and sequential (`S01` through `S09`), and `S04 Events List` is explicitly included as a first-class screen.

## 4. MVP Scope Guardrails in Screen Inventory
- Gmail ingestion + Google Calendar sync are represented as active MVP experiences.
- WhatsApp and SMS are not represented as active screen paths, controls, or states in this inventory.
- Any roadmap references to WhatsApp/SMS in downstream artifacts must be labeled Post-MVP and non-interactive.

## 5. Flow Mapping (Canonical)
| Screen ID | Related Flows |
|---|---|
| S01 | F1 |
| S02 | F1 |
| S03 | F1, F2, F3, F5 |
| S04 | F2, F4 |
| S05 | F2, F4, F5 |
| S06 | F3 |
| S07 | F1, F5 |
| S08 | F2, F4, F5 |
| S09 | F3 |

## 6. Navigation Structure Mapping
- **Top app bar:** global search, notifications, profile controls (S03-S09).
- **Side navigation:** primary sections with active-state indicator (S03-S09 on desktop/tablet).
- **Contextual tabs:** event and diagnostics sub-navigation (S05, S08).
- **Sticky action footer:** primary save/confirm actions on S02, S05, S06 (mobile-priority).

## 7. State Coverage Checklist by Screen
- **Default:** all screens.
- **Loading:** all network-backed screens.
- **Empty:** S03, S04, S08.
- **Error:** all screens.
- **Success confirmation:** S02, S05, S06, S07, S08, S09.
- **Permission-restricted:** S01, S04, S05, S07.
- **Calendar sync-specific state visibility:** S03, S05, S07, S08.
- **Duplicate suppression state visibility:** S03, S04, S05, S08.

## 8. Screen Governance Rules
1. Every product screen must be registered in this file before being referenced anywhere else in `docs/01-ui-ux`.
2. `wireframes.md`, `ui-mockups.md`, `user-flows.md`, and `information-architecture.md` must only reference screens that exist in this inventory.
3. Screen IDs (`Sxx`) are stable identifiers and must not be reassigned to different screens.
4. Screen names must match the canonical names exactly across all UI/UX documents.
5. New screens must be appended with the next sequential ID and back-linked to affected flows/components.
6. Wireframes cannot introduce undocumented screens or alternate aliases.
7. Any change to screen scope, naming, or numbering requires synchronized updates to `ui-ux-summary.html` in the same commit.
