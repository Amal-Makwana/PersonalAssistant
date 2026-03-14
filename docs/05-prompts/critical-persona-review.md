# Prompt: Critical Persona Review by Documentation Phase

Repository Command:
Run audit - <phase>

Supported phases:
- product
- ui-ux
- design
- task-planning
- delivery

Phase mapping:
- product -> `docs/00-product/*`
- ui-ux -> `docs/01-ui-ux/*`
- design -> `docs/02-design/*`
- task-planning -> `docs/03-task-planning/*`
- delivery -> `docs/04-delivery/*`

Persona mapping:
- Product -> Head of Product / Business Analyst
- UI/UX -> UX Lead / Accessibility Specialist
- Design -> Principal Architect / Principal Engineer
- Task Planning -> Engineering Manager / Technical Program Manager
- Delivery -> Program Manager / Release Manager

## Mandatory Review Checks
Apply all checks relevant to the selected phase:
- Cross-phase traceability continuity against `docs/00-product/traceability-matrix.md`
- Canonical-contract alignment for runtime/reliability references
- Scope integrity (MVP vs future-phase boundaries)
- Documentation-first workflow compliance

### Task Planning-specific checks
When phase is `task-planning`, explicitly score:
- traceability clarity to Product/UI/UX/Design
- sequencing quality and dependency ordering
- milestone clarity (entry/exit criteria and boundaries)
- increment quality (thin-slice demonstrability + risk reduction)
- execution readiness (test/observability/doc-sync tasks)
- dependency and critical-path clarity

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
