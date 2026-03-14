# Prompt: Critical Persona Review by Documentation Phase

Repository Command:
Run audit - <phase>

Supported phases:
- product
- ui-ux
- design
- execution-planning

Phase mapping:
- product -> `docs/00-product/*`
- ui-ux -> `docs/01-ui-ux/*`
- design -> `docs/02-design/*`
- execution-planning -> `docs/03-execution-planning/*`

Persona mapping:
- Product -> Head of Product / Business Analyst
- UI/UX -> UX Lead / Accessibility Specialist
- Design -> Principal Architect / Principal Engineer
- Execution Planning -> Engineering Manager / Technical Program Manager

## Mandatory Review Checks
Apply all checks relevant to the selected phase:
- Cross-phase traceability continuity against `docs/00-product/traceability-matrix.md`
- Canonical-contract alignment for runtime/reliability references
- Scope integrity (MVP vs future-phase boundaries)
- Documentation-first workflow compliance

### Execution Planning-specific checks
When phase is `execution-planning`, explicitly score:
- decomposition quality and canonical backlog clarity
- sequencing quality and dependency ordering
- milestone and increment logic
- test strategy and quality gate clarity
- rollout/rollback planning quality
- execution readiness completeness

### HTML summary checks (when summary exists)
- HTML Coverage Status
- Missing Coverage Items
- Synchronization Issues (markdown vs HTML)
- Style Consistency Status (baseline: `docs/00-product/product-summary.html`)

Output requirements:
- Numeric score `X/5` (0.5 increments allowed)
- Findings, risks, priority fixes, and rewrite recommendations
- Explicit sub-scores for any phase-specific mandatory checks
- Cross-document traceability validation
- No application code generation
