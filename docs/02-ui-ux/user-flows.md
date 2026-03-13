# User Flows

## 1. Purpose
Provide step-level user journeys that map directly to concrete screens, states, and component patterns so designs can be recreated in Figma and validated in development.

## 2. Flow Legend
- **Sxx:** Screen ID from `screen-inventory.md`
- **Cxx:** Component IDs from `components.md`
- **State tags:** Default, Loading, Empty, Error, Success, Permission

## 3. Flow Catalog

## F1 — First-Time Setup and Account Connection
**Goal:** user reaches an operational dashboard with at least one active reminder channel.

| Step | Screen | User Action | System Response | Components | States |
|---|---|---|---|---|---|
| 1 | S01 | Click "Continue with Google" | OAuth starts | C01 Top Nav (light), C02 Primary Button | Loading |
| 2 | S01 | Approve permissions | Redirect to onboarding | C18 Alert/Inline status | Success/Error |
| 3 | S02 | Set timezone + default reminder offset | Validate and save step | C04 Inputs, C05 Select, C02 Button | Validation |
| 4 | S02 | Enable delivery channels | Run channel test | C06 Toggle, C18 Alert, C19 Toast | Loading/Success/Error |
| 5 | S02 | Complete setup | Enter S03 | C02 Button | Success |

**Exit condition:** S03 visible with onboarding checklist dismissed.

## F2 — Review Extracted Event and Confirm Reminder
**Goal:** user confirms or updates a detected event reminder.

| Step | Screen | User Action | System Response | Components | States |
|---|---|---|---|---|---|
| 1 | S03 | Click queue card marked Needs Review | Open detail screen | C09 Event Card, C15 Badge | Default |
| 2 | S05 | Inspect event metadata and confidence | Show extraction highlights | C13 Tabs, C10 Table/List, C18 Alert | Default |
| 3 | S05 | Adjust channel/time if needed | Preview next reminder | C04 Inputs, C05 Select, C12 Card | Validation |
| 4 | S05 | Click "Confirm Reminder" | Persist schedule and show toast | C02 Button, C19 Toast | Loading/Success |
| 5 | S03 or S04 | Return and verify status | Badge updates to Scheduled | C15 Badge, C10 Table/List | Success |

## F3 — Modify Global Reminder Defaults
**Goal:** user updates default channel/timing preferences for future events.

| Step | Screen | User Action | System Response | Components | States |
|---|---|---|---|---|---|
| 1 | S03 | Open Preferences | Navigate to S06 | C07 Side Nav | Default |
| 2 | S06 | Update defaults (timing/channel/window) | Mark form as dirty | C04 Inputs, C05 Select, C06 Toggle | Default/Validation |
| 3 | S06 | Save changes | Persist and confirm | C17 Sticky Action Bar, C19 Toast | Loading/Success/Error |
| 4 | S03 | Return to dashboard | Show confirmation banner if needed | C18 Alert | Success |

## F4 — Resolve Extraction Ambiguity
**Goal:** user handles low-confidence extraction and either confirms, edits, or dismisses.

| Step | Screen | User Action | System Response | Components | States |
|---|---|---|---|---|---|
| 1 | S04 | Filter by Needs Review | List narrows | C14 Filter Bar, C10 Table/List | Loading/Empty |
| 2 | S05 | Open ambiguous event | Confidence callout shown | C18 Alert, C12 Card | Default |
| 3 | S05 | Edit parsed details | Recalculate reminder preview | C04 Inputs, C20 Modal (optional quick help) | Validation |
| 4A | S05 | Confirm | Status -> Scheduled | C02 Button, C19 Toast | Success |
| 4B | S05 | Dismiss event | Remove from queue | C20 Modal (confirm) | Success |

## F5 — Recover from Delivery Failure
**Goal:** user restores healthy channel delivery and retries failed reminders.

| Step | Screen | User Action | System Response | Components | States |
|---|---|---|---|---|---|
| 1 | S03/S08 | Click failure alert | Open diagnostics scope | C18 Alert, C10 Table/List | Error |
| 2 | S08 | Inspect failed attempt timeline | Show root cause and affected events | C10 Table/List, C12 Card, C15 Badge | Default |
| 3 | S08 -> S07 | Click "Fix integration" | Open channel auth/config | C02 Button, C07 Side Nav | Loading |
| 4 | S07 | Reconnect channel and test | Mark integration healthy | C06 Toggle, C02 Button, C19 Toast | Loading/Success/Error |
| 5 | S08 | Retry failed delivery | Update attempt status | C02 Button, C15 Badge | Success |

## 4. Flow-to-Screen Quick Map
| Screen | Flows touching screen |
|---|---|
| S01 | F1 |
| S02 | F1 |
| S03 | F1, F2, F3, F5 |
| S04 | F2, F4 |
| S05 | F2, F4, F5 |
| S06 | F3 |
| S07 | F1, F5 |
| S08 | F2, F4, F5 |
| S09 | F3 (optional security checks) |

## 5. Figma Flow Construction Notes
- In Figma, place each flow in a horizontal sequence with desktop frames first, then tablet/mobile variants below.
- Use connector labels: `Trigger`, `Decision`, `System Response`, `Outcome`.
- Link each decision node to at least one non-happy-path state frame (Error, Empty, Permission).
