# UI/UX Documentation Prompts

## Prompt Name
Generate / Improve Full UI/UX Documentation Set

### Purpose
Generate or improve the complete UX documentation in `docs/02-ui-ux` with enterprise-grade structure and cross-file consistency.

### When To Use
Use when establishing the UX baseline or performing major UX documentation improvements.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve docs/02-ui-ux documentation for the Email-Driven Reminder Assistant.

Required markdown outputs:
- docs/02-ui-ux/ui-overview.md
- docs/02-ui-ux/information-architecture.md
- docs/02-ui-ux/user-flows.md
- docs/02-ui-ux/screen-inventory.md
- docs/02-ui-ux/wireframes.md
- docs/02-ui-ux/components.md
- docs/02-ui-ux/design-principles.md
- docs/02-ui-ux/ui-mockups.md

Documentation requirements:
- Enterprise-grade clarity for product, design, and engineering audiences.
- Clear mapping: user flows <-> screen inventory <-> wireframes <-> components.
- Explicit state behavior (loading, empty, error, success, validation) where relevant.
- Figma-ready specification quality for screen layouts and component behavior.
- Terminology and IDs must remain consistent across all UI/UX files.

Constraints:
- Markdown documentation only for source-of-truth updates.
- Do NOT generate application code.

After markdown updates, regenerate docs/02-ui-ux/ui-ux-summary.html as a rich consolidated executive view with complete section coverage, source mappings, and Product-summary-aligned visual style.
```

---

## Prompt Name
Generate / Improve Screen Inventory, Flows, and Wireframe Consistency

### Purpose
Resolve mismatches between user flows, screen inventory, and wireframe documentation.

### When To Use
Use when screens are duplicated, missing, renamed inconsistently, or not traceable through flow docs.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Reconcile and improve consistency across:
- docs/02-ui-ux/user-flows.md
- docs/02-ui-ux/screen-inventory.md
- docs/02-ui-ux/wireframes.md

Required outputs:
- One canonical ID per screen.
- Flows reference canonical screen IDs.
- Wireframes correspond to the same screen IDs and state definitions.
- Inconsistencies are resolved with clear final naming.

Quality rules:
- Keep the documentation implementation-ready for design/engineering handoff.
- Keep language explicit and non-ambiguous.
- Preserve traceability to product requirements and tech constraints.

Constraints:
- Documentation only.
- Do NOT generate application code.

After updates, regenerate docs/02-ui-ux/ui-ux-summary.html with complete coverage, source mapping labels, traceability cues, and Product-summary-aligned visual style.
```

---

## Prompt Name
Generate / Improve Component Specification Documentation

### Purpose
Create and refine reusable component documentation with clear behavior, variants, and usage guidance.

### When To Use
Use when component definitions are incomplete or UX behavior needs standardization.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate or improve docs/02-ui-ux/components.md.

Include for each component:
- Purpose and usage context.
- Anatomy and content rules.
- Variants and states.
- Interaction behavior and validation behavior.
- Accessibility considerations.
- Relationships to specific screens and flows.

Rules:
- Keep component language design-system friendly and implementation-guiding.
- Ensure alignment with wireframes and screen inventory.
- Do NOT generate application code.

After updates, regenerate docs/02-ui-ux/ui-ux-summary.html with complete coverage, source mapping labels, traceability cues, and Product-summary-aligned visual style.
```

---

## Prompt Name
Regenerate UI/UX HTML Summary from Markdown

### Purpose
Refresh `docs/02-ui-ux/ui-ux-summary.html` as a premium stakeholder and design handoff summary.

### When To Use
Use after any markdown change in `docs/02-ui-ux`.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Regenerate docs/02-ui-ux/ui-ux-summary.html from docs/02-ui-ux markdown sources.

Presentation goals:
- Executive summary + table of contents with clear section-to-section continuity.
- Comprehensive condensed coverage of IA, flows, screens, wireframes, components, principles, and mockups.
- Explicit source mapping labels, traceability cues, and canonical ID coverage.
- Include constraints, risks/gaps, and open questions where present in markdown.
- Follow the Product summary visual system and readability quality bar.

Rules:
- HTML is presentation layer only.
- Do not add undocumented features.
- Do NOT generate application code.
```

---

## Prompt Name
Generate Realistic Documentation Wireframe HTML (Non-Product-Code)

### Purpose
Create realistic HTML wireframe artifacts for documentation demos while explicitly avoiding production application code.

### When To Use
Use when documentation needs visual wireframe pages for review or stakeholder communication.

### Prompt Text
```text
Follow .github/copilot-instructions.md and docs/99-ai-rules/AI_DEVELOPMENT_WORKFLOW.md.

Task: Generate realistic wireframe HTML artifacts that represent documented screens and states.

Requirements:
- Map each wireframe artifact to canonical screen IDs from screen-inventory.md.
- Reflect states documented in wireframes/components docs.
- Use semantic HTML and simple CSS for documentation readability.
- Keep this strictly as documentation visualization artifacts.

Constraints:
- Do NOT create production-ready app code.
- Do NOT implement business logic.
- Keep markdown docs as source of truth and refresh ui-ux-summary.html accordingly.
```
