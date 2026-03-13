# Information Architecture

## 1. Purpose
Define how users move through the product and how information is structured so each major task has a clear entry point, orientation model, and completion path.

## 2. Navigation Model

## 2.1 Global Navigation (authenticated)
1. Dashboard (S03)
2. Events (S04)
3. Preferences (S06)
4. Integrations (S07)
5. Activity (S08)
6. Account (S09)

## 2.2 Unauthenticated Path
- Login & Consent (S01)
- Onboarding Wizard (S02)

## 2.3 Secondary Navigation
- On S04: Filter tabs (All, Needs Review, Scheduled, Failed)
- On S05: Internal sections (Overview, Reminder Settings, Delivery History)
- On S08: Timeline filters (Status, Channel, Date)

## 3. IA Hierarchy
- **Level 0:** Access (S01)
- **Level 1:** Setup (S02)
- **Level 2:** Core operations (S03, S04, S05)
- **Level 3:** Configuration (S06, S07)
- **Level 4:** Diagnostics and account controls (S08, S09)

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
| S03/S08 | Integration warning CTA | S07 | Fix provider/channel health |
| S05/S07 | "View diagnostics" | S08 | Inspect failures/retries |
| Any authenticated screen | Profile menu | S09 | Account/session updates |

## 5. Navigation Landmarks by Layout

### Desktop
- Top bar: product title, global search, notifications, profile menu.
- Left sidebar: global navigation list.
- Main content: page header + body regions.
- Right rail (optional on S03/S05/S08): contextual details and quick actions.

### Tablet
- Sidebar collapses to icon rail; labels shown on tap.
- Right rail converts to stacked section below main body.

### Mobile
- Top app bar + optional bottom nav for primary sections.
- Filters and non-critical actions move into sheets/drawers.
- Detail-heavy side panels become full-width stacked sections.

## 6. IA-to-Flow Mapping
| Flow ID | Primary Screens | Support Screens | Notes |
|---|---|---|---|
| F1 | S01 -> S02 -> S03 | S07 | Integration checks can appear during onboarding |
| F2 | S03 -> S05 -> S03/S04 | S08 | Activity inspection optional after confirmation |
| F3 | S03 -> S06 -> S03 | S09 | Session verification may be required for sensitive settings |
| F4 | S03/S04 -> S05 -> S04 | S08 | Low-confidence events branch to diagnostics if unresolved |
| F5 | S03/S08 -> S07 -> S08 -> S03 | S05 | Recover failed reminders and verify status transition |

## 7. State Visibility Rules by IA Layer
- **Global layer:** banners for outage, disconnected channels, or permissions.
- **Page layer:** section-level loading/error/empty states.
- **Component layer:** inline validation and status badges.
- **System feedback layer:** toasts and non-blocking confirmations.

## 8. Figma IA Notes
- Create Figma pages: `00 Foundations`, `01 Navigation`, `02 Screens`, `03 Components`, `04 Flows`, `05 Handoff`.
- Use screen frame naming: `S03_Dashboard/Desktop`, `S03_Dashboard/Tablet`, `S03_Dashboard/Mobile`.
- Keep nav patterns as reusable shell components referenced by all screen frames.
- Use connector annotations in `04 Flows` page to mirror Flow IDs F1-F5.
