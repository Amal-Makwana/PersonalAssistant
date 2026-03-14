# Prompt: Critical Persona Review by Documentation Phase

Repository Command:
Run audit - <phase>

Supported phases:
product
tech-spec
ui-ux
design
delivery

Command Behavior:

1. Execute this prompt file: `docs/05-prompts/critical-persona-review.md`.
2. Map `<phase>` to target files:
   - product -> `docs/00-product/*`
   - tech-spec -> `docs/01-tech-spec/*`
   - ui-ux -> `docs/02-ui-ux/*`
   - design -> `docs/03-design/*`
   - delivery -> `docs/04-delivery/*`
3. Generate a phase documentation review.
4. Save output to `docs/06-governance/audit-<phase>-YYYY-MM-DD.md`.

Output File Rules:

- Create `docs/06-governance` if it does not exist.
- Use today's date in `YYYY-MM-DD` format.
- Never overwrite an existing report.
- If the dated filename already exists, append incremental suffixes (`-1`, `-2`, etc.).
- Return a short audit summary in the response.

Purpose:
Critically review documentation using a phase-appropriate expert persona.

Inputs:
Phase:
- Product
- Tech Spec
- UI/UX
- Design
- Delivery

Target Files:
(list of markdown files)

Optional Context:
(requirement changes, architecture decisions, etc.)

Persona Mapping:

Product → Head of Product / Business Analyst  
Tech Spec → Principal Engineer / Solution Architect  
UI/UX → UX Lead / Accessibility Specialist  
Design → Staff Architect / SRE-minded reviewer  
Delivery → Program Manager / Release Manager  

Review Instructions:

1. Select persona based on phase and explain in 2–3 lines.
2. Review each section for:
   - clarity
   - completeness
   - ambiguity
   - feasibility
   - testability
3. Identify:
   - missing details
   - contradictions with other docs
   - non-testable statements
   - architectural risks
4. Provide edits using structure:

Issue  
Why it matters  
Suggested replacement text

5. Validate cross-document traceability.

Examples:
requirements ↔ stories ↔ acceptance criteria  
flows ↔ screens ↔ states  
architecture ↔ components ↔ reliability model

6. Do NOT generate application code.
7. Scoring is mandatory for every phase audit.
8. Always provide a numeric `X/5` score using the allowed 0.5-step increment scale.
9. Do not skip scoring for incomplete docs; assign score and explain.
10. Validate section HTML summary quality (if present): markdown-to-HTML completeness, source coverage, synchronization with markdown, flow readability, and style alignment to Product summary.
11. Mark incomplete/shallow HTML summary coverage as a documentation defect.

Output Format:

Persona Used  

## Phase Score

Phase: <selected phase>  
Score: X/5

Short explanation:
- why this score was assigned
- what prevents a higher score

Rules:
- This section must always appear near the top of every phase audit output.
- Score format must always be `X/5`.
- Allowed values are whole-step or 0.5-step increments only: `0/5`, `0.5/5`, `1/5`, `1.5/5`, `2/5`, `2.5/5`, `3/5`, `3.5/5`, `4/5`, `4.5/5`, `5/5`.
- Never omit scoring sections.
- Never replace numeric scores with only qualitative labels.
- Never skip scoring because documentation is incomplete.
- Incomplete documentation must still be scored with explanation.
- Score must reflect documentation quality, traceability, measurability, and implementation readiness.

Scoring rubric:

5/5
- complete, measurable, traceable, implementation-ready, minimal ambiguity

4/5
- strong and mostly ready, minor gaps in precision or traceability

3/5
- usable but important gaps remain in measurability, consistency, or readiness

2/5
- major gaps, weak traceability, insufficient implementation detail

1/5
- critical missing content or placeholder-level documentation

0/5
- phase absent or not reviewable

Use `0.5` increments when documentation falls between levels.

Executive Critique  

Section-by-Section Findings

| Section | Issue | Severity | Recommendation |

Priority Fix List

P0 Critical  
P1 Important  
P2 Improvement  

Proposed Edits

Traceability Validation

## HTML Summary Compliance (Mandatory when section HTML exists)

- HTML Coverage Status: Complete / Partial / Missing
- Missing Coverage Items
- Synchronization Issues
- Style Consistency Status (Aligned / Partially Aligned / Not Aligned)

Risks

| Risk | Severity | Impact |

Open Questions

## Score Improvement Path

List the top 3 to 5 changes that would raise the score.

Dual-Layer Documentation Reminder:
If markdown changes are recommended, regenerate corresponding section HTML summaries in the same change set as rich consolidated executive views with complete source coverage and Product-style visual consistency.
