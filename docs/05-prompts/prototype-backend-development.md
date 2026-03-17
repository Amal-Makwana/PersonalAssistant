# Prototype-to-Implementation Backend Development Prompt

Use this prompt when extending backend behavior that originated in prototype slices.

## Objective
Preserve original product scope while incrementally promoting prototype flows from mock-first behavior to canonical API and persistence-backed behavior.

## Canonical Documentation Rule
- Update canonical docs only (`docs/00-product`, `docs/01-ui-ux`, `docs/02-design`, `docs/03-execution-planning`, `docs/05-prompts`).
- Do not create or reintroduce a parallel `docs/prototype` documentation tree.

## Incremental Delivery Constraints
1. Keep auth in S01 mocked unless explicitly in scope for real auth integration.
2. Route S02-S09 data operations through canonical API contracts.
3. Preserve explicit validation and error contracts (400/404/500 or canonical equivalents).
4. Add/update tests whenever endpoint contracts, query logic, or UI states change.
5. Preserve UUID-based IDs and canonical reminder offset contract (`Nh|Nm` where applicable).
6. Keep runtime behavior deterministic in tests even when persistence-backed.

## Consolidated Endpoint Baseline
Prototype-era endpoint knowledge is now represented in canonical design docs. Treat the following as migration anchors:
- Events: list/detail/reminder-plan/reminder-channels/retry-sync/history
- Dashboard summary
- System profile/preferences/integrations/diagnostics

## Required Output in Responses
1. Files changed.
2. APIs implemented/updated.
3. Validation/error-contract notes.
4. Test commands and results.
