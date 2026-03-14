# Delivery Documentation Prompts

## Prompt Name
Generate / Improve Delivery Documentation

### Purpose
Generate or improve execution-readiness documentation in `docs/04-delivery`.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve delivery docs in docs/04-delivery.

Required outputs:
- docs/04-delivery/backlog.md
- docs/04-delivery/test-strategy.md
- docs/04-delivery/rollout-plan.md
- docs/04-delivery/review-reference.md

Rules:
- Preserve phase order: Product -> UI/UX -> Design -> Task Planning -> Delivery.
- Delivery must consume approved artifacts from docs/03-task-planning.
- Markdown only; no application code.

After markdown updates, regenerate docs/04-delivery/delivery-summary.html with source coverage.
```
