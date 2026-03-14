# Execution Planning Prompts

## Prompt Name
Generate / Improve Execution Planning Documentation

### Purpose
Generate or improve canonical execution planning in `docs/03-execution-planning` using Product traceability and Design runtime/reliability contracts.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve execution planning docs in docs/03-execution-planning.

Required outputs:
- docs/03-execution-planning/build-plan.md
- docs/03-execution-planning/backlog-and-dependencies.md
- docs/03-execution-planning/test-and-quality-gates.md
- docs/03-execution-planning/rollout-and-rollback.md

Rules:
- Preserve phase order: Product -> UI/UX -> Design -> Execution Planning.
- Execution Planning owns decomposition, sequencing, backlog/dependencies, quality gates, rollout/rollback, and readiness planning.
- Design remains canonical for architecture/runtime/reliability contracts; reference instead of redefining.
- Use `docs/00-product/traceability-matrix.md` as the single canonical traceability source.
- Preserve MVP scope: Gmail ingestion, extraction, persistence, dedupe, reminder scheduling, Google Calendar sync.
- Keep WhatsApp/SMS only as post-MVP placeholders.
- Markdown only; no application code.

After markdown updates, regenerate docs/03-execution-planning/execution-planning-summary.html with source coverage.
```

## Prompt Name
Review Execution Planning Documentation

### Purpose
Evaluate execution-planning quality before implementation and identify gaps in decomposition, dependency logic, quality gates, and rollout readiness.

### Prompt Text
```text
Review docs/03-execution-planning against Product/UI-UX/Design sources.

Score each area out of 5 (0.5 increments allowed):
1) Decomposition and backlog quality
2) Dependency and sequencing quality
3) Milestone and increment clarity
4) Test strategy and quality-gate clarity
5) Rollout/rollback and readiness completeness

Return:
- Scorecard by area (X/5)
- Top defects
- Priority remediations
- Scope drift warnings (especially WhatsApp/SMS in MVP)
```

## Prompt Name
Audit Execution Planning + HTML Synchronization

### Purpose
Run governance checks ensuring markdown-first integrity and HTML coverage completeness for Execution Planning.

### Prompt Text
```text
Audit docs/03-execution-planning markdown and docs/03-execution-planning/execution-planning-summary.html.

Required checks:
- Markdown files are complete and execution-oriented.
- HTML summary covers every markdown file and all major headings/topics.
- Backlog, dependency, increment, quality gate, and rollout/rollback content are represented.
- Traceability references to Product and Design are explicit.
- Coverage report includes: HTML Coverage Status, Missing Coverage Items, Synchronization Issues, Style Consistency Status.

Output:
- Execution Planning audit score: X/5
- HTML synchronization score: X/5
- Findings and required fixes
```
