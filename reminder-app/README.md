# Reminder App Monorepo

## Documentation-First Workflow

This repository enforces a strict development lifecycle:

**Product → Tech Spec → Design → Delivery → Code**

No implementation should begin until each upstream documentation layer is complete, reviewed, and approved.

## Required Execution Order

1. `docs/00-product` — Define business intent and user outcomes.
2. `docs/01-tech-spec` — Translate product intent into technical specifications.
3. `docs/02-design` — Define architecture, flows, and architectural decisions.
4. `docs/03-delivery` — Plan implementation phases, testing, and rollout.
5. Implementation in `apps/`, `packages/`, and `infra/`.

## Repository Layout

- `docs/` — Source of truth for requirements, system design, and delivery planning.
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
