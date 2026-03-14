# Prompt: Repository Documentation Audit

Repository Command:
Run full audit

Purpose:
Run a full documentation governance audit across all active phases.

Phases reviewed in order:
1. Product (`docs/00-product`)
2. UI/UX (`docs/01-ui-ux`)
3. Design (`docs/02-design`)
4. Task Planning (`docs/03-task-planning`)
5. Delivery (`docs/04-delivery`)

Required output:
- Per-phase score (`X/5`)
- Overall repository score (`X/5`)
- Cross-phase consistency findings
- Priority remediation plan

Scoring rules:
- Use `X/5` format only
- 0.5 increments allowed
- Scoring is mandatory even for incomplete/placeholder docs

Audit must validate canonical contracts:
- Runtime flow: `docs/02-design/runtime-flow.md`
- Reliability policy: `docs/02-design/reliability-policy.md`
- Traceability matrix: `docs/00-product/traceability-matrix.md`
