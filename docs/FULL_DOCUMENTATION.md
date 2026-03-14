# Full Documentation — PersonalAssistant

This document is the **single-entry documentation hub** for the PersonalAssistant repository. It consolidates what exists, where to find it, and how to use it in the required workflow.

---

## 1) Repository Purpose

PersonalAssistant is an AI-driven reminder assistant project currently operating in a **documentation-first phase**. The repository establishes requirements, UX, system design contracts, and execution planning before implementation work begins.

---

## 2) Mandatory Workflow

All work must follow this sequence:

1. `docs/00-product`
2. `docs/01-ui-ux`
3. `docs/02-design`
4. `docs/03-execution-planning`
5. Implementation (`apps/`, `packages/`, `infra/`)

No implementation should start until all upstream documentation layers are complete and reviewed.

---

## 3) Documentation Map (Complete)

### `docs/00-product` — Product and Business Foundations

Defines intent, scope, users, and requirements.

- `vision.md`
- `business-requirements.md`
- `requirements.md`
- `scope-v1.md`
- `user-personas.md`
- `user-stories.md`
- `acceptance-criteria.md`
- `traceability-matrix.md`
- `product-summary.html` (stakeholder summary)

### `docs/01-ui-ux` — Experience and Interaction Contracts

Defines information structure and UI behavior.

- `ui-overview.md`
- `information-architecture.md`
- `screen-inventory.md`
- `user-flows.md`
- `wireframes.md`
- `ui-mockups.md`
- `components.md`
- `design-principles.md`
- `ui-ux-summary.html` (stakeholder summary)

### `docs/02-design` — Technical Design and Architecture

Defines architecture, APIs, reliability, runtime lifecycle, and system behavior.

Core documents:

- `tech-overview.md`
- `architecture.md`
- `frontend-spec.md`
- `backend-spec.md`
- `integration-spec.md`
- `api-spec.md`
- `db-schema.md`
- `data-flow.md`
- `runtime-flow.md` (**canonical runtime lifecycle**)
- `reliability-policy.md` (**canonical reliability and sync semantics**)
- `security-nfr.md`
- `sequence-flows.md`
- `review-reference.md`
- `design-summary.html` (stakeholder summary)

Supporting documents:

- `diagrams/` (context, container, component, deployment, data-model, sequence placeholders)
- `decisions/` (ADR templates)

### `docs/03-execution-planning` — Build/Delivery Readiness

Defines execution decomposition, quality gates, and release control.

- `build-plan.md`
- `backlog-and-dependencies.md`
- `test-and-quality-gates.md`
- `rollout-and-rollback.md`
- `execution-planning-summary.html` (stakeholder summary)

### `docs/05-prompts` — Canonical Prompt Library

Reusable prompt contracts for regenerating or auditing documentation:

- `prompt-index.md`
- `full-docs-generation.md`
- `product-prompts.md`
- `ui-ux-prompts.md`
- `design-prompts.md`
- `execution-planning-prompts.md`
- `html-summary-generation.md`
- `repository-documentation-audit.md`
- `critical-persona-review.md`

### `docs/06-governance` — Audit and Authority Records

Contains governance records and audit snapshots that enforce documentation authority and consistency over time.

### `docs/99-ai-rules` — AI Workflow Rules

Contains AI execution constraints and process requirements.

---

## 4) Canonical Contracts (Must Not Be Re-defined Elsewhere)

- Runtime lifecycle: `docs/02-design/runtime-flow.md`
- Reliability/sync states: `docs/02-design/reliability-policy.md`
- Cross-phase traceability: `docs/00-product/traceability-matrix.md`

If another document needs these concepts, it should **reference** these files instead of redefining them.

---

## 5) Dual-Layer Documentation Standard

For each major section (`00-product`, `01-ui-ux`, `02-design`, `03-execution-planning`), maintain both:

1. Detailed markdown files (source of truth)
2. One consolidated premium HTML summary (stakeholder view)

Required HTML outputs:

- `docs/00-product/product-summary.html`
- `docs/01-ui-ux/ui-ux-summary.html`
- `docs/02-design/design-summary.html`
- `docs/03-execution-planning/execution-planning-summary.html`

Whenever markdown changes in one section, regenerate that section's summary HTML in the same change set.

---

## 6) How to Use This Documentation for Implementation

Before coding:

1. Read all four phases in order.
2. Produce a gap analysis.
3. List explicit assumptions.
4. Produce implementation plan.
5. Produce file-by-file change plan.
6. Then implement.

Implementation constraints:

- Frontend code in `apps/web`
- Backend code in `apps/api`
- Shared logic in `packages/`
- Infra and deploy concerns in `infra/`
- Backend layering: `routes → controllers → services → repositories → models`
- Tests are required for core business flows.

---

## 7) Quick Start Reading Paths

### For Product/Business Stakeholders

1. `docs/00-product/product-summary.html`
2. `docs/01-ui-ux/ui-ux-summary.html`
3. `docs/03-execution-planning/execution-planning-summary.html`

### For Engineering Leads

1. `docs/00-product/traceability-matrix.md`
2. `docs/02-design/architecture.md`
3. `docs/02-design/runtime-flow.md`
4. `docs/02-design/reliability-policy.md`
5. `docs/03-execution-planning/backlog-and-dependencies.md`

### For Developers Starting Implementation

1. `docs/00-product/requirements.md`
2. `docs/01-ui-ux/components.md`
3. `docs/02-design/backend-spec.md` and `docs/02-design/frontend-spec.md`
4. `docs/02-design/api-spec.md`
5. `docs/03-execution-planning/test-and-quality-gates.md`

---

## 8) Documentation Maintenance Checklist

Use this checklist when updating docs:

- [ ] Updated source markdown in the correct phase folder.
- [ ] Preserved canonical references (runtime, reliability, traceability).
- [ ] Updated corresponding HTML summary.
- [ ] Ensured cross-phase links still work.
- [ ] Confirmed no requirements drift outside approved scope.
- [ ] Updated governance/audit records if policy or authority changed.

---

## 9) Current Program State

The repository currently emphasizes documentation completion and governance readiness, with implementation scaffolding expected to follow the documented lifecycle.

