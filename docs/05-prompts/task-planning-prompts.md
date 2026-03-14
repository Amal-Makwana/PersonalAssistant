# Task Planning Prompts

## Prompt Name
Generate / Improve Task Planning Documentation

### Purpose
Generate or improve incremental implementation planning in `docs/03-task-planning` using canonical runtime, reliability, and traceability contracts.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve task planning docs in docs/03-task-planning.

Required outputs:
- docs/03-task-planning/implementation-plan.md
- docs/03-task-planning/milestone-plan.md
- docs/03-task-planning/task-breakdown.md
- docs/03-task-planning/delivery-increments.md

Planning constraints:
- Reference runtime lifecycle from docs/02-design/runtime-flow.md.
- Reference reliability policy from docs/02-design/reliability-policy.md.
- Reference traceability from docs/00-product/traceability-matrix.md.
- Do not redefine canonical contracts in planning docs.
- Markdown only; no application code.

After markdown updates, regenerate docs/03-task-planning/task-planning-summary.html with source coverage.
```
