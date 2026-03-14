# Prompt: Repository Documentation Audit

Repository Command:
Run full audit

Command Behavior:

1. Execute this prompt file: `docs/05-prompts/repository-documentation-audit.md`.
2. Use scope: Full repository.
3. Generate a repository documentation governance audit report.
4. Save output to `docs/06-governance/repo-audit-YYYY-MM-DD.md`.

Output File Rules:

- Create `docs/06-governance` if it does not exist.
- Use today's date in `YYYY-MM-DD` format.
- Never overwrite an existing report.
- If the dated filename already exists, append incremental suffixes (`-1`, `-2`, etc.).
- Return a short audit summary in the response.

Purpose:
Run a full documentation governance audit across the repository.

Phases reviewed in order:

1 Product  
2 Tech Spec  
3 UI/UX  
4 Design  
5 Delivery  

The audit orchestrates phase reviews using:

docs/05-prompts/critical-persona-review.md

Review Targets:

docs/00-product/*  
docs/01-tech-spec/*  
docs/02-ui-ux/*  
docs/03-design/*  
docs/04-delivery/*  

Output Format:

## Repository Health Score

This section MUST appear first in the report.

| Phase | Score | Summary |
|------|------|------|
| Product | X/5 | ... |
| Tech Spec | X/5 | ... |
| UI/UX | X/5 | ... |
| Architecture (Design) | X/5 | ... |
| Delivery | X/5 | ... |

Rules:

- All phases must always appear, even if documentation is missing or placeholder-only.
- Score format must always be `X/5`.
- Allowed values are whole-step or 0.5-step increments only: `0/5`, `0.5/5`, `1/5`, `1.5/5`, `2/5`, `2.5/5`, `3/5`, `3.5/5`, `4/5`, `4.5/5`, `5/5`.
- Summary must be concise and specific.
- Never omit this section.
- Never replace numeric scores with only qualitative labels.
- Never skip scoring because documentation is incomplete.
- Incomplete or placeholder documentation must still receive a score and summary.

Use these exact phase labels:

Product  
Tech Spec  
UI/UX  
Architecture (Design)  
Delivery

Score scale:
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

## Phase Findings

For every phase section, use this exact structure:

### <Phase Name>

Summary critique

Key issues

Priority fixes

Improvement Recommendations

Include a table:

| Recommendation | Impact | Priority |
|---------------|------|------|

Priority scale:

P0 – Critical (blocks implementation)  
P1 – Important (should fix soon)  
P2 – Improvement (quality enhancement)

Recommendations must be:

- concrete
- documentation-focused
- actionable

Phase names to review:

Product  
Tech Spec  
UI/UX  
Architecture  
Delivery

Each section must include:

Summary critique  
Key issues  
Priority fixes  
Improvement Recommendations

Example recommendation types:

- Add missing architecture diagram
- Define retry strategy for event handling
- Add accessibility acceptance criteria
- Add delivery milestone breakdown

## Top Repository Improvements

List the 10 most important improvements across all phases.

Format:

| Recommendation | Phase | Priority | Impact |

Cross-Phase Consistency Issues

Examples:
- requirements missing API coverage
- screens without backend support
- architecture missing components required by UX
- roadmap missing implementation work

Critical Risks

| Risk | Phase | Severity | Impact |

Implementation Readiness

Rating:
Ready  
Ready with fixes  
Not ready

Explain reasoning.

Top 10 Fixes Required

Traceability Validation

Validate chain:

Product → Tech Spec → UI/UX → Design → Delivery

Documentation Quality Observations

## Overall Repository Score

Score: X/5

Rules:
- Score format must always be `X/5`.
- Allowed values are whole-step or 0.5-step increments only: `0/5`, `0.5/5`, `1/5`, `1.5/5`, `2/5`, `2.5/5`, `3/5`, `3.5/5`, `4/5`, `4.5/5`, `5/5`.
- This section must always appear in every full repository audit.
- Never omit this score, even when one or more phases are incomplete.

Include a short explanation of how the overall score was determined.

Dual-Layer Documentation Reminder:
If markdown is updated, regenerate HTML summaries.
