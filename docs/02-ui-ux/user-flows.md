# User Flows

## 1. Purpose
Provide step-level journeys mapped to the canonical screen catalogue in `screen-inventory.md` so flows, wireframes, and mockups stay synchronized.

## 2. Canonical Screen References
| Screen ID | Canonical Screen Name |
|---|---|
| S01 | Login & Consent |
| S02 | Onboarding Wizard |
| S03 | Dashboard |
| S04 | Events List |
| S05 | Event Detail |
| S06 | Preferences |
| S07 | Integrations |
| S08 | Activity & Diagnostics |
| S09 | Account & Session Settings |

## 3. Flow Legend
- **Sxx:** Screen ID from `screen-inventory.md`
- **Cxx:** Component IDs from `components.md`
- **State tags:** Default, Loading, Empty, Error, Success, Permission

## 4. Flow Catalog

## F1 — First-Time Setup and Account Connection
**Goal:** user reaches an operational dashboard with Gmail + Google Calendar sync configured for MVP.
**Trace:** FR-01, FR-02, FR-09, FR-11, US-01, US-02, US-03, US-09

| Step | Screen | User Action | System Response | Components | States |
|---|---|---|---|---|---|
| 1 | S01 | Click "Continue with Google" | OAuth starts | C01 Top Nav (light), C02 Primary Button | Loading |
| 2 | S01 | Approve permissions | Redirect to onboarding | C18 Alert/Inline status | Success/Error |
| 3 | S02 | Set timezone + default reminder offsets | Validate and save step | C04 Inputs, C05 Select, C02 Button | Validation |
| 4 | S02 | Enable Google Calendar sync | Run calendar connectivity check | C06 Toggle, C18 Alert, C19 Toast | Loading/Success/Error |
| 5 | S02 | Complete setup | Enter S03 with setup checklist cleared | C02 Button | Success |

**Exit condition:** S03 visible with onboarding checklist dismissed.

## F2 — Review Extracted Event and Confirm Reminder
**Goal:** user confirms or updates a detected event reminder and sees sync outcome visibility.
**Trace:** FR-04, FR-06, FR-09, US-05, US-08, US-09

| Step | Screen | User Action | System Response | Components | States |
|---|---|---|---|---|---|
| 1 | S03 | Click queue card marked Needs Review | Open detail screen | C09 Event Card, C15 Badge | Default |
| 2 | S05 | Inspect event metadata and confidence | Show extraction highlights and confidence hints | C13 Tabs, C10 Table/List, C18 Alert | Default |
| 3 | S05 | Adjust time/details if needed | Preview next reminder + pending sync state | C04 Inputs, C05 Select, C12 Card | Validation |
| 4 | S05 | Click "Confirm Reminder" | Persist schedule, queue calendar sync, and show toast | C02 Button, C19 Toast | Loading/Success |
| 5 | S03 or S04 | Return and verify status | Badge updates to Scheduled/Syncing/Synced | C15 Badge, C10 Table/List | Success |

## F3 — Modify Global Reminder Defaults
**Goal:** user updates default reminder timing and calendar sync preferences for future events.
**Trace:** FR-09, FR-11, US-03, US-09

| Step | Screen | User Action | System Response | Components | States |
|---|---|---|---|---|---|
| 1 | S03 | Open Preferences | Navigate to S06 | C07 Side Nav | Default |
| 2 | S06 | Update defaults (timing/window/calendar sync preference) | Mark form as dirty | C04 Inputs, C05 Select, C06 Toggle | Default/Validation |
| 3 | S06 | Save changes | Persist and confirm | C17 Sticky Action Bar, C19 Toast | Loading/Success/Error |
| 4 | S03 | Return to dashboard | Show confirmation banner if needed | C18 Alert | Success |

## F4 — Resolve Extraction Ambiguity and Duplicate Risk
**Goal:** user handles low-confidence extraction and duplicate suppression outcomes.
**Trace:** FR-04, FR-10, US-05, US-07

| Step | Screen | User Action | System Response | Components | States |
|---|---|---|---|---|---|
| 1 | S04 | Filter by Needs Review or Duplicate Suppressed | List narrows | C14 Filter Bar, C10 Table/List | Loading/Empty |
| 2 | S05 | Open ambiguous event | Confidence and duplicate context callouts shown | C18 Alert, C12 Card | Default |
| 3 | S05 | Edit parsed details | Recalculate reminder preview and duplicate key hint | C04 Inputs, C20 Modal (optional quick help) | Validation |
| 4A | S05 | Confirm | Status -> Scheduled | C02 Button, C19 Toast | Success |
| 4B | S05 | Dismiss event | Remove from queue | C20 Modal (confirm) | Success |

## F5 — Recover from Google Calendar Sync Failure
**Goal:** user restores sync health and retries failed calendar sync operations.
**Trace:** FR-09, FR-10, US-07, US-09

| Step | Screen | User Action | System Response | Components | States |
|---|---|---|---|---|---|
| 1 | S03/S08 | Click sync failure alert | Open diagnostics scope | C18 Alert, C10 Table/List | Error |
| 2 | S08 | Inspect failed attempt timeline | Show root cause and affected events | C10 Table/List, C12 Card, C15 Badge | Default |
| 3 | S08 -> S07 | Click "Fix integration" | Open Google auth/config repair flow | C02 Button, C07 Side Nav | Loading |
| 4 | S07 | Reconnect Google integration and retest | Mark integration healthy | C06 Toggle, C02 Button, C19 Toast | Loading/Success/Error |
| 5 | S08 | Retry failed sync | Update attempt status and reflect retry outcome | C02 Button, C15 Badge | Success |

## 5. MVP Channel Boundaries
- Active MVP path: Gmail ingest + reminder scheduling + Google Calendar sync.
- WhatsApp and SMS are post-MVP only and do not appear as active actions in F1-F5.
- If future-channel copy is needed in UI labels, annotate as "Post-MVP" and render disabled/non-interactive.

## 6. Flow-to-Screen Quick Map
| Screen ID | Screen Name | Flows touching screen |
|---|---|---|
| S01 | Login & Consent | F1 |
| S02 | Onboarding Wizard | F1 |
| S03 | Dashboard | F1, F2, F3, F5 |
| S04 | Events List | F2, F4 |
| S05 | Event Detail | F2, F4, F5 |
| S06 | Preferences | F3 |
| S07 | Integrations | F1, F5 |
| S08 | Activity & Diagnostics | F2, F4, F5 |
| S09 | Account & Session Settings | F3 (optional security checks) |

## 7. Figma Flow Construction Notes
- In Figma, place each flow in a horizontal sequence with desktop frames first, then tablet/mobile variants below.
- Use connector labels: `Trigger`, `Decision`, `System Response`, `Outcome`.
- Link each decision node to at least one non-happy-path state frame (Error, Empty, Permission).
- Annotate each flow with its `Trace` line so Product -> Tech Spec -> UI/UX chain remains auditable.
