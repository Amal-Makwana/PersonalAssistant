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

## Task Planning Governance Checks (Mandatory)
For `docs/03-task-planning`, audit must explicitly evaluate:
- traceability to Product/UI/UX/Design artifacts
- sequencing quality and dependency ordering
- milestone clarity (outcomes + entry/exit criteria)
- delivery increment quality (thin slices + demoability)
- execution readiness (test/reliability/doc-sync planning)
- critical-path articulation and scope discipline (MVP vs future-phase)

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
