# AI Development Workflow

This repository follows a documentation-first AI development process.

## 1. Core Rule
AI contributors must **not jump directly to code**.

Before implementation begins:
1. Read documentation in the required order.
2. Identify gaps, conflicts, and assumptions.
3. Produce implementation planning artifacts.
4. Produce file-level change plan with traceability.
5. Then implement and test.
6. Update documentation in the same workflow.

## 2. Mandatory Documentation Reading Order
1. `docs/00-product`
2. `docs/01-ui-ux`
3. `docs/02-design`
4. `docs/03-execution-planning`

Progression:
**Business Intent -> Experience Definition -> System Design -> Execution Planning**

## 3. Documentation Layer Responsibilities
| Layer | Path | Purpose |
|------|------|------|
| Product | docs/00-product | Vision, personas, requirements, stories, acceptance criteria |
| UI / UX | docs/01-ui-ux | Flows, IA, screens, wireframes, components, UX principles |
| Design | docs/02-design | Merged technical + architecture design contracts |
| Execution Planning | docs/03-execution-planning | Build decomposition, backlog/dependencies, quality gates, rollout/rollback, and execution readiness planning |
| Prompt Library | docs/05-prompts | Canonical prompts for documentation generation |


> Consolidation note: the former Delivery phase has been retired as a separate planning phase and absorbed into Execution Planning (`docs/03-execution-planning`).

## 4. Canonical Contract Artifacts
- Runtime flow authority: `docs/02-design/runtime-flow.md`
- Reliability policy authority: `docs/02-design/reliability-policy.md`
- Cross-phase traceability authority: `docs/00-product/traceability-matrix.md`

Design and sequence documents must reference these artifacts instead of redefining them.

## 5. Single Documentation Authority
The single authoritative documentation tree is `docs/`.

`reminder-app/docs/` is deprecated and must not be used for new documentation work.

## 6. Dual-Layer Documentation Rule
Each major section must maintain:
- Markdown files as source of truth.
- A consolidated HTML summary as stakeholder presentation layer.

Required HTML summaries:
- `docs/00-product/product-summary.html`
- `docs/01-ui-ux/ui-ux-summary.html`
- `docs/02-design/design-summary.html`
- `docs/03-execution-planning/execution-planning-summary.html`

When markdown files in a section change, regenerate that section HTML summary in the same change set.

## 7. Required Process Before Code
1. Review documentation layers in order.
2. Produce gap analysis and assumptions.
3. Build implementation and file-by-file plans.
4. Implement.
5. Add tests.
6. Refresh impacted documentation.

## 8. Scope and Location Rules
- Frontend: `apps/web`
- Backend: `apps/api`
- Shared code: `packages/`
- Infrastructure: `infra/`

## 9. Architecture Constraints
- Backend layering: `routes -> controllers -> services -> repositories -> models`
- Frontend structure: feature-based modules
- Shared UI components: `packages/ui`

## 10. Quality and Traceability
- Tests must exist for core business flows.
- Do not invent behavior outside documented requirements.
- If docs are missing/conflicting, report gaps and assumptions before coding.

## 11. Frontend-Only Mock Prototype Exception Scope
When work is explicitly marked as the frontend-only prototype phase:
- Keep implementation local to frontend prototype surfaces and documentation.
- Use local fixtures, mock services, deterministic scenario toggles, and simulated async behavior.
- Do not add backend services, API routes, databases, OAuth/auth providers, or external integrations.
- Keep visual execution consistent with the approved brand-inspired system (Inter + selective JetBrains Mono, light slate/sky/teal palette, rounded editorial cards, section-based layouts).
