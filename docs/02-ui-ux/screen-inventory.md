# Screen Inventory

## 1. Purpose
Define all major product screens as implementation-ready specifications tied to flows, IA, components, and state coverage.

## 2. Screen Catalog

| ID | Screen | Primary Purpose | Entry Points | Exit Paths | Key Components | Required States |
|---|---|---|---|---|---|---|
| S01 | Login & Consent | Authenticate user and request permissions | App launch, session expiry | S02 on success | C02, C04, C18 | Default, Loading, Error, Permission |
| S02 | Onboarding Wizard | Collect defaults and activate channels | First successful login | S03 when complete | C04, C05, C06, C17 | Default, Validation, Loading, Success |
| S03 | Dashboard | Operational overview and queue triage | Post-onboarding, global nav | S04, S05, S06, S07, S08 | C01, C07, C08, C09, C15, C18 | Default, Loading, Empty, Error |
| S04 | Events List | Bulk review/filter/sort extracted events | Global nav, dashboard CTA | S05, S03 | C14, C10, C15, C16 | Default, Loading, Empty, Error |
| S05 | Event Detail | Confirm/edit reminder details for one event | Dashboard card, events row | S03, S04, S08 | C13, C04, C05, C12, C17, C20 | Default, Loading, Validation, Error, Success, Permission |
| S06 | Preferences | Set default timing/channels/rules | Global nav, S03 quick action | S03 | C04, C05, C06, C17, C18 | Default, Loading, Validation, Success, Error |
| S07 | Integrations | Manage provider/channel health | Global nav, alerts, onboarding | S03, S08 | C10, C06, C02, C18, C19 | Default, Loading, Error, Success, Permission |
| S08 | Activity & Diagnostics | Audit reminder attempts and run retries | Global nav, S03/S05 alerts | S03, S05, S07 | C14, C10, C12, C15, C20 | Default, Loading, Empty, Error, Success |
| S09 | Account & Session Settings | User profile, timezone, sessions, sign-out | Profile menu | S03, S01 | C04, C02, C20, C19 | Default, Loading, Success, Error |

## 3. Flow Mapping
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

## 4. Navigation Structure Mapping
- **Top app bar:** global search, notifications, profile controls (S03-S09).
- **Side navigation:** primary sections, active-state indicator (S03-S09 desktop/tablet).
- **Contextual tabs:** event detail and diagnostics subgrouping (S05, S08).
- **Sticky action footer:** form save/cancel on S02, S05, S06 mobile.

## 5. State Coverage Checklist by Screen
- **Default:** all screens
- **Loading:** all screens with network data
- **Empty:** S03, S04, S08
- **Error:** all screens
- **Success confirmation:** S02, S05, S06, S07, S09
- **Permission-restricted:** S01, S05, S07

## 6. Figma Artifact Expectations per Screen
Each screen should have:
1. Desktop frame (1440 width baseline)
2. Tablet frame (1024 width baseline)
3. Mobile frame (390 width baseline)
4. At least one non-happy-path frame
5. Component instance references (not detached clones)
