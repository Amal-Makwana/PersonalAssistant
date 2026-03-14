# Reminder App Monorepo

## Documentation-First Workflow

This repository enforces a strict development lifecycle:

**Product → Tech Spec → UI/UX → Design → Task Planning → Delivery → Code**

No implementation should begin until each upstream documentation layer is complete, reviewed, and approved.

## Required Execution Order

1. `docs/00-product` — Define business intent and user outcomes.
2. `docs/01-tech-spec` — Define implementation-oriented technical specifications and system constraints.
3. `docs/02-ui-ux` — Define UI/UX structure, screens, flows, and component behavior.
4. `docs/03-design` — Define architecture, data/sequence flows, and ADR decisions.
5. `docs/04-task-planning`
6. `docs/05-delivery` — Plan implementation phases, testing, and rollout.
6. Implementation in `apps/`, `packages/`, and `infra/`.

## Dual-Layer Documentation Standard (Required)

For each major section (`00-product` through `05-delivery`), maintain both:

- **Detailed markdown source files** (authoritative working docs)
- **One polished consolidated HTML summary** (stakeholder-facing presentation layer)

Required section summaries:

- `docs/00-product/product-summary.html`
- `docs/01-tech-spec/tech-spec-summary.html`
- `docs/02-ui-ux/ui-ux-summary.html`
- `docs/03-design/design-summary.html`
- `docs/05-delivery/delivery-summary.html`

Whenever markdown files in a section are created or updated, refresh the matching HTML summary in the same change.

## Repository Layout

- `docs/` — Source of truth for requirements, technical specifications, UX artifacts, system design, and delivery planning.
- `apps/web` — Frontend application (feature-based structure).
- `apps/api` — Backend application (layered architecture).
- `packages/` — Shared UI, types, utilities, and config.
- `infra/` — Deployment, database, monitoring, and ops scripts.
- `.github/workflows/` — CI and quality automation.

## Enforcement Rules

- Every code change must reference supporting requirements and acceptance criteria.
- Backend code must follow: `routes → controllers → services → repositories → models`.
- Frontend code must be organized by feature/domain.
- Shared cross-app logic belongs in `packages/`.
- Core business flows require automated tests before merge.

## Current Stage

This repository is initialized with templates only. No application logic is included yet.
