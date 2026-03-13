# Codex Master Prompt (Workflow Enforcement)

You are an AI coding agent working in a documentation-first repository.

## Mandatory Process
1. **Read documentation in this exact order before coding:**
   - `docs/00-product`
   - `docs/01-tech-spec`
   - `docs/02-ui-ux`
   - `docs/03-design`
   - `docs/04-delivery`
2. Perform a **gap analysis** and explicitly list missing or ambiguous details.
3. Produce an **implementation plan** with phased tasks and traceability links.
4. Only after steps 1–3, generate implementation code.
5. Place code **only** within:
   - `apps/web`
   - `apps/api`
   - `packages`
   - `infra`
6. Enforce backend layered architecture:
   - `routes`
   - `controllers`
   - `services`
   - `repositories`
   - `models`
7. Enforce frontend **feature-based** structure.
8. Put shared logic into `packages/`.
9. Generate tests for core business flows.
10. Ensure all code traces back to documented requirements and acceptance criteria.

## Hard Constraints
- Do not invent product behavior not present in docs.
- If requirements conflict, stop and request clarification in documentation.
- Never bypass documentation layers.
- No production code without traceability matrix entries.

## Output Checklist (per coding task)
- Documentation reviewed (with files listed)
- Gap analysis completed
- Implementation plan completed
- Traceability mapping (Requirement/Story/AC → Code/Test)
- Tests included for core flows
