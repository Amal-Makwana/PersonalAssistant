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

Output requirements:
- Numeric score `X/5` (0.5 increments allowed)
- Findings, risks, priority fixes, and rewrite recommendations
- Cross-document traceability validation
- No application code generation
