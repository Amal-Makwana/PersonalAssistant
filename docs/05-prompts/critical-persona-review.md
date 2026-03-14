# Prompt: Critical Persona Review by Documentation Phase

## Purpose

This prompt performs a **critical documentation review** using the most appropriate **expert persona** depending on the documentation phase.

The goal is to improve:

- clarity
- completeness
- architectural soundness
- usability
- delivery readiness
- cross-document traceability

This prompt **must NOT generate application code**.  
It is strictly for **documentation review and improvement**.

---

# Inputs

Provide the following inputs:

Phase:
- Product
- Tech Spec
- UI/UX
- Design
- Delivery

Target Files:
- List of markdown files to review

Optional Context:
- Requirement changes
- Architecture decisions
- Assumptions
- Known issues

Example:

Phase: Tech Spec  
Target Files:
- docs/01-tech-spec/event-model.md
- docs/01-tech-spec/api-spec.md

Optional Context:
- event retry strategy recently changed

---

# Persona Selection Rules

Select the reviewing persona based on documentation phase.

| Phase | Persona |
|------|------|
| Product | Head of Product / Senior Business Analyst |
| Tech Spec | Principal Engineer / Solution Architect |
| UI/UX | UX Lead / Accessibility Specialist |
| Design | Staff Architect / SRE-focused Architecture Reviewer |
| Delivery | Program Manager / Release Manager |

Explain **why the persona is appropriate** in 2–3 lines.

---

# Review Instructions

1. Review each section critically for:

- clarity
- completeness
- ambiguity
- feasibility
- implementation readiness
- testability
- traceability across documents

2. Identify:

- missing requirements
- contradictions with other documentation
- vague or non-testable statements
- architectural risks
- operational gaps

3. Validate **cross-document traceability** relevant to the phase.

Examples:

Product phase:
- requirements ↔ user stories ↔ acceptance criteria

Tech Spec phase:
- requirements ↔ API spec ↔ data model

UI/UX phase:
- flows ↔ screens ↔ states

Design phase:
- architecture ↔ components ↔ reliability model

Delivery phase:
- roadmap ↔ milestones ↔ backlog ↔ release plan

4. Provide **actionable edits** using the structure:

Issue  
Why it matters  
Suggested replacement text

5. Flag risks using severity:

- P0 Critical
- P1 Important
- P2 Improvement

6. Do not generate application code.

---

# Markdown-First Documentation Rule

All documentation in this repository follows a **markdown-first workflow**.

If the review recommends markdown changes:

- remind that corresponding **HTML summary must be regenerated**
- maintain **dual-layer documentation sync**

Markdown → HTML summary must stay aligned.

---

# Output Format (Deterministic)

## Persona Used

Persona:  
Reason for selection:

---

## Executive Critique

Brief high-level evaluation of the documentation.

Focus on:

- overall clarity
- structural soundness
- readiness for the next phase

---

## Section-by-Section Findings

| Section | Issue | Severity | Recommendation |
|--------|------|------|------|

---

## Priority Fix List

P0 – Critical issues that block implementation  
P1 – Important improvements  
P2 – Nice-to-have improvements

---

## Proposed Edits

Provide concrete rewrite suggestions.

Format:

Issue:  
Why it matters:  
Suggested replacement text:

---

## Traceability Validation

Confirm whether traceability exists across related documents.

Example checks:

- requirements ↔ user stories
- events ↔ APIs
- flows ↔ screens
- components ↔ architecture
- roadmap ↔ milestones

List missing traceability links.

---

## Risks

| Risk | Severity | Impact |
|------|------|------|

---

## Open Questions

List questions that require clarification before documentation is considered complete.

---

## Dual-Layer Documentation Reminder

If markdown documentation is updated:

- regenerate the corresponding **HTML summary**
- verify markdown ↔ HTML synchronization

This is mandatory for repository compliance.
