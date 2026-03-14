# Design Review Reference

Use canonical prompts from `docs/05-prompts` when updating this phase:
- `critical-persona-review.md` for phase-level design critique.
- `html-summary-generation.md` for required regeneration of `docs/02-design/design-summary.html` when markdown changes.
- `repository-documentation-audit.md` for full-repository governance checks.

## Required Design Workflow Guardrails
1. Preserve phase order: Product -> UI/UX -> Design -> Execution Planning.
2. Keep markdown as source of truth and HTML as secondary consolidated artifact.
3. Regenerate `design-summary.html` in the same change set whenever any file in `docs/02-design/*.md` changes.
4. Run HTML coverage checks before finalization.
