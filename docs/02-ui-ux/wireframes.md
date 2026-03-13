# Wireframes

## 1. Purpose
Capture low-fidelity structural intent for screen composition, information hierarchy, and interaction focus before high-fidelity design finalization.

## 2. Wireframe Conventions
- `[TopNav]` global app navigation
- `[Header]` page title + primary action area
- `[Panel]` grouped content region/card
- `[List]` repeatable list/table content
- `[Drawer/Modal]` temporary interaction surface
- `(*)` denotes primary interaction emphasis

## 3. Low-Fidelity Wireframe Definitions

### Wireframe: Dashboard
- **Screen:** Dashboard
- **Layout blocks:** `[TopNav]` + `[Header]` + `[Panel KPI Row]` + `[Panel Needs Attention*]` + `[Panel Upcoming]`
- **Content zones:** summary metrics, attention queue, timeline.
- **Interaction emphasis:** quick triage and deep-link transitions.
- **Information priority:** attention-required > upcoming > historical context.
- **Notes for implementation:** support partial panel loading without blocking full page.

### Wireframe: Events List
- **Screen:** Events
- **Layout blocks:** `[TopNav]` + `[Header]` + `[Panel Filter Bar*]` + `[List Events]` + `[Panel Pagination]`
- **Content zones:** filter controls, event rows/cards, batch actions.
- **Interaction emphasis:** search/filter and bulk confirm actions.
- **Information priority:** status + event time + reminder state + confidence.
- **Notes for implementation:** preserve filter state in URL query params.

### Wireframe: Event Detail
- **Screen:** Event Detail
- **Layout blocks:** `[TopNav]` + `[Header]` + `[Panel Event Summary]` + `[Panel Reminder Editor*]` + `[Panel Source Metadata]`
- **Content zones:** extracted fields, schedule controls, confidence context.
- **Interaction emphasis:** confirmation/edit and save behavior.
- **Information priority:** event date/time and reminder schedule above metadata.
- **Notes for implementation:** support optimistic update with conflict fallback messaging.

### Wireframe: Preferences
- **Screen:** Preferences
- **Layout blocks:** `[TopNav]` + `[Header]` + `[Panel Timing*]` + `[Panel Channels*]` + `[Panel Quiet Hours]` + `[Panel Save Bar]`
- **Content zones:** grouped settings and inline explanatory text.
- **Interaction emphasis:** safe editing and confident save.
- **Information priority:** default reminder timing and channel enablement.
- **Notes for implementation:** show unsaved-change guard on route leave.

### Wireframe: Integrations
- **Screen:** Integrations Overview
- **Layout blocks:** `[TopNav]` + `[Header]` + `[Panel Provider Cards*]` + `[Drawer Provider Detail]`
- **Content zones:** provider health, sync metadata, actions.
- **Interaction emphasis:** reconnect/disconnect actions.
- **Information priority:** connection status and corrective CTA.
- **Notes for implementation:** standardized status badge component across providers.

### Wireframe: Activity
- **Screen:** Activity & Diagnostics
- **Layout blocks:** `[TopNav]` + `[Header]` + `[Panel Filter Bar]` + `[List Attempts*]` + `[Drawer Attempt Detail]`
- **Content zones:** event/reminder attempts, status and timestamps, retry actions.
- **Interaction emphasis:** diagnosis and remediation.
- **Information priority:** failed/retried items first in default sort.
- **Notes for implementation:** timeline rows must support keyboard expansion.

## 4. Layout Intent by Screen
- Dashboard prioritizes situational awareness.
- Events and Activity prioritize list triage efficiency.
- Event Detail and Preferences prioritize form clarity and safe edits.
- Integrations prioritizes trust signals and corrective actions.

## 5. Interaction Notes
- Route transitions should keep orientation cues (title, breadcrumb where applicable).
- Confirmation dialogs required for high-risk actions.
- Form actions should support keyboard submit and cancel paths.
- Status updates should animate subtly but remain understandable without motion.

## 6. Responsive Notes
- Collapse two-column structures to single-column below tablet breakpoint.
- Move secondary details into expandable accordions on small screens.
- Keep primary action pinned and visible on long mobile forms.
- Reduce non-essential metadata density on mobile list cards.

## 7. Open Questions / Gaps
1. Should mobile list screens use bottom-sheet filters or full-screen filter pages?
2. Is split-view list/detail required for tablet landscape in MVP?
3. Do we need printable wireframe variants for stakeholder workshops?

**Related docs:** `ui-mockups.md`, `components.md`, `docs/01-tech-spec/frontend-spec.md`.
