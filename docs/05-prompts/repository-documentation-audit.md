# Prompt: Repository Documentation Audit

Repository Command:
Run full audit

Purpose:
Run a full documentation governance audit across all active phases.

Phases reviewed in order:
1. Product (`docs/00-product`)
2. UI/UX (`docs/01-ui-ux`)
3. Design (`docs/02-design`)
4. Execution Planning (`docs/03-execution-planning`)

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

## Execution Planning Governance Checks (Mandatory)
For `docs/03-execution-planning`, audit must explicitly evaluate:
- decomposition quality and backlog clarity
- dependency clarity and critical-path articulation
- milestone and increment logic
- quality gate clarity and test strategy planning
- rollout/rollback planning quality
- execution readiness completeness and ownership clarity

## HTML Summary Governance Checks (Mandatory when summary exists)
For each phase summary HTML, include:
- HTML Coverage Status
- Missing Coverage Items
- Synchronization Issues
- Style Consistency Status (baseline: `docs/00-product/product-summary.html`)

## Audit Result Format
For each phase:
- Score: `X/5`
- Strengths
- Defects
- Required fixes
- Coverage + sync status (markdown vs HTML)

Then provide:
- Overall Score: `X/5`
- Top cross-phase risks
- Prioritized remediation plan with suggested sequence
