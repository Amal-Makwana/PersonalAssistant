# Documentation Canonical Structure

This repository uses a **single canonical documentation tree** under `docs/`.

## Original Scope
The original V1 documentation scope is organized as:
- `docs/00-product`
- `docs/01-ui-ux`
- `docs/02-design`
- `docs/03-execution-planning`
- `docs/05-prompts`

This preserves the documentation-first progression:
**Product -> UI/UX -> Design -> Execution Planning -> Prompt Governance**.

## Prototype Baseline
A temporary `docs/prototype` tree was used during the mock-first implementation stage to iterate quickly on frontend and early backend contracts.

That parallel tree is now retired. Useful prototype content has been merged back into canonical documents, especially:
- endpoint behavior and validation notes in `docs/02-design/api-spec.md`
- incremental implementation guidance in `docs/05-prompts/prototype-backend-development.md`
- product scope transition notes in `docs/00-product/scope-v1.md`

## Incremental Build Progress
The canonical docs now reflect the implementation journey explicitly:
1. Mock-first prototype baseline for rapid UX validation.
2. Incremental transition to DB-backed event and system flows.
3. Ongoing hardening against canonical schema and reliability contracts.

## Current State
- `docs/` is the only active documentation authority.
- No parallel prototype documentation tree should be reintroduced.
- New documentation updates must be applied directly to canonical sections.
