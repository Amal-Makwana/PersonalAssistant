# Information Architecture

## 1. Purpose
Define how users move through the product and how information is structured, anchored to the canonical screen catalogue in `screen-inventory.md`.

## 2. Canonical Navigation Model

## 2.1 Global Navigation (authenticated)
1. Dashboard (S03)
2. Events List (S04)
3. Preferences (S06)
4. Integrations (S07)
5. Activity & Diagnostics (S08)
6. Account & Session Settings (S09)

## 2.2 Unauthenticated Path
- Login & Consent (S01)
- Onboarding Wizard (S02)

## 2.3 Secondary Navigation
- On S04 (Events List): Filter tabs (All, Needs Review, Scheduled, Calendar Sync Issues, Duplicate Suppressed).
- On S05 (Event Detail): Internal sections (Overview, Reminder Settings, Calendar Sync History).
- On S08 (Activity & Diagnostics): Timeline filters (Status, Sync State, Date).

## 3. IA Hierarchy
- **Level 0:** Access (S01)
- **Level 1:** Setup (S02)
- **Level 2:** Core operations (S03, S04, S05)
- **Level 3:** Configuration (S06, S07)
- **Level 4:** Diagnostics and account/session controls (S08, S09)

## 4. Screen Relationship Map
| From | Via | To | Intent |
|---|---|---|---|
| S01 | Successful sign-in | S02 | First-time setup |
| S02 | Complete setup | S03 | Enter operational workspace |
| S03 | Queue card click | S05 | Resolve or review specific event |
| S03 | "View all events" | S04 | Batch triage |
| S04 | Row/card click | S05 | Event-level action |
| S05 | Save reminder | S03 or S04 | Return to monitoring/triage |
| S03/S05 | "Manage defaults" | S06 | Update global behavior |
| S03/S08 | Integration warning CTA | S07 | Fix Google OAuth/Gmail/Calendar health |
| S05/S07 | "View diagnostics" | S08 | Inspect extraction/sync failures and retries |
| Any authenticated screen | Profile menu | S09 | Account/session updates |

## 5. IA-to-Flow Mapping
| Flow ID | Primary Screens | Support Screens | Notes |
|---|---|---|---|
| F1 | S01 -> S02 -> S03 | S07 | Google integration checks can appear during onboarding. Trace: FR-02, FR-09, US-02, US-09 |
| F2 | S03 -> S05 -> S03/S04 | S08 | Event review includes extraction confidence and calendar sync confirmation. Trace: FR-04, FR-06, FR-09, US-05, US-08, US-09 |
| F3 | S03 -> S06 -> S03 | S09 | Preferences govern reminder defaults and calendar sync behavior only in MVP. Trace: FR-11, US-03 |
| F4 | S03/S04 -> S05 -> S04 | S08 | Low-confidence and duplicate suppression branches are explicit. Trace: FR-04, FR-10, US-05, US-07 |
| F5 | S03/S08 -> S07 -> S08 -> S03 | S05 | Recover calendar sync failures and verify terminal/retried outcomes. Trace: FR-09, US-09 |

## 6. MVP Channel Boundary Rules
- MVP active channels: Gmail ingestion and Google Calendar synchronization.
- WhatsApp/SMS are post-MVP roadmap items and are not navigable interaction surfaces in IA.
- If future-channel placeholders appear, they must be non-interactive and labeled "Post-MVP".

## 7. State Visibility Rules by IA Layer
- **Global layer:** banners for outage, disconnected Google integration, or permissions.
- **Page layer:** section-level loading/error/empty states.
- **Component layer:** inline validation, confidence indicators, duplicate suppression badges, and sync status badges.
- **System feedback layer:** toasts and non-blocking confirmations.

## 8. Figma IA Notes
- Create Figma pages: `00 Foundations`, `01 Navigation`, `02 Screens`, `03 Components`, `04 Flows`, `05 Handoff`.
- Use screen frame naming: `S03_Dashboard/Desktop`, `S03_Dashboard/Tablet`, `S03_Dashboard/Mobile`.
- Keep nav patterns as reusable shell components referenced by all screen frames.
- Use connector annotations in `04 Flows` page to mirror Flow IDs F1-F5.
