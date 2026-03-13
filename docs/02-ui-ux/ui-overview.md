# UI/UX Overview

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
Users connect Google account(s), allow event extraction from email, and manage reminder delivery through dashboard triage, event review, preferences, integrations, and activity diagnostics.

## 4. UX Outcomes
1. New user setup completion in under 5 minutes.
2. Returning user can confirm or edit an extracted reminder in <= 3 interactions.
3. High visibility into reminder lifecycle states (Detected -> Review Needed -> Scheduled -> Sent/Failed).
4. Clear corrective paths for extraction ambiguity and delivery failure.

## 5. UX Gap Analysis (Current -> Resolved by this update)
| Gap area | Previous issue | Resolution in this documentation set |
|---|---|---|
| Screen specificity | Wireframes were conceptual and not screen-realistic | `wireframes.md` now defines concrete screen regions, ASCII layouts, zones, and states per screen |
| Flow-to-screen traceability | Flows did not reliably map to entry/exit screens | `user-flows.md`, `screen-inventory.md`, and `information-architecture.md` now share Flow IDs and Screen IDs |
| Component-to-screen mapping | Components listed without systematic usage mapping | `components.md` now maps each component to screen IDs and interaction states |
| Responsive guidance | Generic notes without structural fallback patterns | Every screen includes desktop/tablet/mobile behavior and collapse rules |
| Figma execution detail | No clear naming/auto layout/variant guidance | `design-principles.md`, `wireframes.md`, and `ui-mockups.md` include Figma build rules |

## 6. Core Users
- **Primary:** Busy professionals relying on email-based commitments.
- **Secondary:** Operations-minded users who monitor failures and retry deliveries.
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
- **F4** Resolve extraction ambiguity
- **F5** Recover from delivery failure

Detailed definitions are in `user-flows.md`, with screen mapping in `screen-inventory.md`.

## 9. Experience Standards
- Keep global navigation landmarks stable across authenticated screens.
- Keep primary CTA in predictable top-right page header location (mobile: sticky bottom action for form-heavy screens).
- Always show explicit state messaging: loading, empty, error, success, permission-restricted.
- Ensure keyboard accessibility and semantic heading structure for each screen.

## 10. Figma-Readiness Baseline
The markdown files in this folder are the source of truth and specify:
- frame names and recommended sizes
- auto layout direction and nesting
- layout guide usage and spacing rhythm
- reusable components and variants
- state coverage expectations
- Dev Mode annotation priorities

## 11. Cross-Reference Index
- IA and nav model: `information-architecture.md`
- Step-by-step journeys: `user-flows.md`
- Screen catalog: `screen-inventory.md`
- Visual fidelity bridge: `ui-mockups.md`
- Low-fidelity screen structures: `wireframes.md`
- Component library contract: `components.md`
- Styling and system rules: `design-principles.md`

## 12. Assumptions
1. MVP supports one authenticated user workspace with connected Google account.
2. Reminder channels include in-app + at least one external delivery channel.
3. Support workflows rely on Activity timeline plus retry tools, not external analytics exports.
