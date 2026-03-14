# Reminder App Monorepo

## Documentation-First Workflow

This repository enforces a strict development lifecycle:

**Product → UI/UX → Design → Task Planning → Delivery → Code**

No implementation should begin until each upstream documentation layer is complete, reviewed, and approved.

## Required Execution Order

1. `docs/00-product` — Define business intent and user outcomes.
2. `docs/01-ui-ux` — Define UI/UX structure, screens, flows, and component behavior.
3. `docs/02-design` — Define merged technical + architecture design contracts.
4. `docs/03-task-planning` — Convert design into implementation tasks and increments.
5. `docs/04-delivery` — Plan implementation phases, testing, and rollout.
6. Implementation in `apps/`, `packages/`, and `infra/`.

## Dual-Layer Documentation Standard (Required)

For each major section (`00-product` through `04-delivery`), maintain both:

- **Detailed markdown source files** (authoritative working docs)
- **One polished consolidated HTML summary** (stakeholder-facing presentation layer)

Required section summaries:

- `docs/00-product/product-summary.html`
- `docs/01-ui-ux/ui-ux-summary.html`
- `docs/02-design/design-summary.html`
- `docs/03-task-planning/task-planning-summary.html`
- `docs/04-delivery/delivery-summary.html`

Whenever markdown files in a section are created or updated, refresh the matching HTML summary in the same change.

## Repository Layout

- `docs/` — Source of truth for requirements, UX artifacts, merged design contracts, planning, and delivery docs.
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
