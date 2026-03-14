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
- Preserve MVP scope: Gmail ingestion, extraction, persistence, dedupe, reminder scheduling, Google Calendar sync.
- Keep WhatsApp/SMS only as post-MVP placeholders.
- Markdown only; no application code.

After markdown updates, regenerate docs/03-task-planning/task-planning-summary.html with source coverage.
```

## Prompt Name
Review Task Planning Documentation

### Purpose
Evaluate task-planning quality before delivery execution and identify gaps in sequencing, dependency logic, and readiness.

### Prompt Text
```text
Review docs/03-task-planning against Product/UI-UX/Design sources.

Score each area out of 5 (0.5 increments allowed):
1) Traceability completeness
2) Sequencing and dependency quality
3) Milestone clarity (entry/exit/scope boundaries)
4) Increment quality (thin-slice + demoability)
5) Execution readiness (validation, observability, doc-sync)

Return:
- Scorecard by area (X/5)
- Top defects
- Priority remediations
- Scope drift warnings (especially WhatsApp/SMS in MVP)
```

## Prompt Name
Audit Task Planning + HTML Synchronization

### Purpose
Run governance checks ensuring markdown-first documentation integrity and HTML coverage completeness for Task Planning.

### Prompt Text
```text
Audit docs/03-task-planning markdown and docs/03-task-planning/task-planning-summary.html.

Required checks:
- Markdown files are complete and execution-oriented.
- HTML summary covers every markdown file and all major headings/topics.
- Traceability references to Product/UI-UX/Design are explicit.
- Critical path, dependencies, milestones, and increments are represented.
- Coverage report includes: HTML Coverage Status, Missing Coverage Items, Synchronization Issues, Style Consistency Status.

Output:
- Task Planning audit score: X/5
- HTML synchronization score: X/5
- Findings and required fixes
```
