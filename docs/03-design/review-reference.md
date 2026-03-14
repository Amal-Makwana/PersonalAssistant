# Design Review Reference

Use canonical prompts from `docs/05-prompts` when updating this phase:
- `critical-persona-review.md` for phase-level design critique and targeted architecture updates.
- `html-summary-generation.md` for mandatory, coverage-enforced regeneration of `docs/03-design/design-summary.html` after any markdown update.
- `repository-documentation-audit.md` for full-repository governance checks.

## Required design workflow guardrails
1. Preserve phase order: Product -> Tech Spec -> UI/UX -> Design -> Task Planning -> Delivery.
2. Keep markdown as source of truth and HTML as secondary consolidated artifact.
3. Regenerate `design-summary.html` in the same change set whenever any file in `docs/03-design/*.md` changes.
4. Run an HTML Coverage Check before finalization:
   - Every markdown source file represented.
   - Every major heading/topic represented.
   - Reliability/failure/traceability content represented.
   - Risks/assumptions/open questions represented when present.
   - Product-summary visual baseline preserved.
