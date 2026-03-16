# AI Development Workflow (Frontend-Only Governance Profile)

## Profile Intent
This profile applies when backend layers are intentionally deferred.

## Rules
- Build UI flows/components/pages only.
- Replace backend dependencies with mock service contracts.
- Keep all data in local fixtures.
- Simulate loading/error/retry/permission/validation states.
- Keep implementation local-only and offline-compatible.
- Keep docs clear that API/DB/auth/integrations are deferred by design.

## Current implementation focus
- Active vertical slice: **S03 Dashboard -> S04 Events List -> S05 Event Detail**.
- S05 includes mock reminder plan preview, reminder channel preview, and reminder edit/save behavior with deterministic outcomes.

## Guardrails for future contributors
1. Do not add backend/API/database code in this phase.
2. Extend the current slice before broadening to other screens unless docs explicitly reprioritize.
3. Preserve mock-first architecture: fixtures -> mock services -> feature modules.
4. When scope shifts, update prototype docs + README + prompts in the same change.
5. Keep scenario-driven states deterministic for tests and demos.


## Current reminder preview note
- Reminder plan/channel previews are frontend-only mock implementations of future scheduling and delivery behavior.
- They must remain fixture-driven with no backend/API integrations in this phase.
