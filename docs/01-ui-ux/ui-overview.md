# UI/UX Overview

For critical documentation review, use docs/05-prompts/critical-persona-review.md

## 1. Purpose
Define a Figma-ready UX specification for the Email-Driven Reminder Assistant V1 so product, design, frontend, and QA teams can build and validate the same screen system with minimal ambiguity.

## 2. Scope
This section covers:
- screen architecture and navigation
- user-task flows
- low-fidelity wireframes and high-fidelity mockup intent
- component system expectations
- responsive behavior and accessibility baseline
- Figma execution and Dev Mode handoff conventions

## 3. Product Context
Users connect a Google account, authorize Gmail ingestion, and manage reminder outcomes through dashboard triage, event review, Google Calendar synchronization, preferences, integrations, and activity diagnostics.

## 4. UX Outcomes
1. New user setup completion in under 5 minutes.
2. Returning user can confirm or edit an extracted reminder in <= 3 interactions.
3. High visibility into reminder lifecycle states (Detected -> Review Needed -> Scheduled -> Calendar Synced / Sync Failed).
4. Clear corrective paths for extraction ambiguity, duplicate suppression, and calendar sync failures.

## 5. UX Gap Analysis (Current -> Resolved by this update)
| Gap area | Previous issue | Resolution in this documentation set |
|---|---|---|
| MVP scope alignment | Calendar sync was not modeled as first-class MVP behavior | Flows, screen states, and wireframes now include calendar sync visibility and confirmations |
| Channel boundary clarity | Generic channel language implied non-MVP messaging controls | WhatsApp/SMS references are constrained to explicit post-MVP roadmap notes only |
| Flow-to-screen traceability | Flows did not reliably map to Product + Design contracts | UI/UX flows now include FR/US trace tags for auditable mapping |
| State specificity | Failure messaging under-specified for extraction/sync/duplicate cases | Screen docs now include explicit empty/loading/error/success states for critical transitions |

## 6. Core Users
- **Primary:** Busy professionals relying on email-based commitments.
- **Secondary:** Operations-minded users who monitor extraction and sync failures.
- **Internal stakeholders:** Product, design, frontend, QA, and support.

## 7. Core Screen Set
- **S01** Login & Consent
- **S02** Onboarding Wizard
- **S03** Dashboard
- **S04** Events List
- **S05** Event Detail
- **S06** Preferences
- **S07** Integrations
- **S08** Activity & Diagnostics
- **S09** Account & Session Settings

## 8. Primary Flows
- **F1** First-time setup and account connection
- **F2** Review extracted event and confirm reminder
- **F3** Modify global reminder defaults
- **F4** Resolve extraction ambiguity and duplicate risk
- **F5** Recover from Google Calendar sync failure

Detailed definitions are in `user-flows.md`, with screen mapping in `screen-inventory.md`.

## 9. Experience Standards
- Keep global navigation landmarks stable across authenticated screens.
- Keep primary CTA in predictable top-right page header location (mobile: sticky bottom action for form-heavy screens).
- Always show explicit state messaging: loading, empty, error, success, permission-restricted.
- Ensure keyboard accessibility and semantic heading structure for each screen.
- Display calendar sync outcome states wherever scheduling confirmation is shown.

## 10. Traceability Anchors
- Calendar sync UX and retry states. Trace: FR-09, US-09.
- Duplicate prevention messaging and suppression outcomes. Trace: FR-10, US-07.
- Extraction confidence review path. Trace: FR-04, US-05.
- Scheduling and confirmation path. Trace: FR-06, US-08.

## 11. Figma-Readiness Baseline
The markdown files in this folder are the source of truth and specify:
- frame names and recommended sizes
- auto layout direction and nesting
- layout guide usage and spacing rhythm
- reusable components and variants
- state coverage expectations
- Dev Mode annotation priorities

## 12. Cross-Reference Index
- IA and nav model: `information-architecture.md`
- Step-by-step journeys: `user-flows.md`
- Screen catalog: `screen-inventory.md`
- Visual fidelity bridge: `ui-mockups.md`
- Low-fidelity screen structures: `wireframes.md`
- Component library contract: `components.md`
- Styling and system rules: `design-principles.md`

## 13. Assumptions
1. MVP supports one authenticated user workspace with connected Google account.
2. Gmail ingestion and Google Calendar sync are active MVP integrations.
3. WhatsApp/SMS are post-MVP only and must not render as active controls in MVP screens.
4. Support workflows rely on Activity timeline plus retry tools, not external analytics exports.
