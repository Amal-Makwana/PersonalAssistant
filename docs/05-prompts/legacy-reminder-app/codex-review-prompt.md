# Deprecated Legacy Prompt (Reference Only)

This prompt is preserved for historical context and is not part of the canonical prompt workflow.

# Codex Review Prompt Template

## Purpose
Review proposed code and documentation changes for workflow compliance and quality.

## Review Checklist
- Documentation order respected before coding (`00-product → 01-tech-spec → 02-ui-ux → 03-design → 04-delivery`).
- Gap analysis and implementation plan exist.
- Code limited to approved directories.
- Backend layering and frontend feature structure respected.
- Shared logic placed in packages.
- Tests cover core business flows.
- Traceability to requirements and acceptance criteria provided.
- Documentation sync enforced: section markdown updates also update the corresponding premium HTML summary.
- Required summaries exist:
  - `docs/00-product/product-summary.html`
  - `docs/01-tech-spec/tech-spec-summary.html`
  - `docs/02-ui-ux/ui-ux-summary.html`
  - `docs/03-design/design-summary.html`
  - `docs/04-delivery/delivery-summary.html`

## Output Format
- Compliance findings
- Risks/issues
- Required fixes
- Approval recommendation
