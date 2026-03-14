# Prompt: Repository Documentation Audit

## Purpose

Perform a full governance audit of the repository documentation.

The audit validates that documentation across all phases is:

- complete
- consistent
- traceable
- implementation-ready

This audit runs reviews across documentation phases in the correct order:

1. Product
2. Tech Spec
3. UI/UX
4. Design
5. Delivery

The review uses the canonical prompt:

docs/05-prompts/critical-persona-review.md

This prompt orchestrates phase-by-phase review and produces a consolidated report.

---

# Inputs

Optional Scope:

- Full repository (default)
- Specific phase
- Specific files

Optional Focus Areas:

- architecture readiness
- product clarity
- UX completeness
- delivery readiness

Example Input:

Scope: Full repository  
Focus: Architecture readiness before development start

---

# Review Process

The audit must run the following phases in order.

## Phase 1 — Product

Review:

docs/00-product/*

Persona:

Head of Product / Senior Business Analyst

Validate:

- problem clarity
- personas
- requirements
- acceptance criteria
- business goals

Traceability checks:

requirements → user stories → acceptance criteria

---

## Phase 2 — Tech Spec

Review:

docs/01-tech-spec/*

Persona:

Principal Engineer / Solution Architect

Validate:

- system feasibility
- API definitions
- data models
- event flows
- integration assumptions

Traceability checks:

requirements → APIs → data model

---

## Phase 3 — UI/UX

Review:

docs/02-ui-ux/*

Persona:

UX Lead / Accessibility Specialist

Validate:

- user journeys
- screen inventory
- UI states
- accessibility
- usability

Traceability checks:

flows → screens → states

---

## Phase 4 — Design / Architecture

Review:

docs/03-design/*

Persona:

Staff Architect / SRE-minded reviewer

Validate:

- system architecture
- service boundaries
- reliability patterns
- failure modes
- observability
- scaling assumptions

Traceability checks:

architecture → components → operational model

---

## Phase 5 — Delivery

Review:

docs/04-delivery/*

Persona:

Program Manager / Release Manager

Validate:

- delivery roadmap
- milestones
- dependencies
- backlog completeness
- release readiness

Traceability checks:

roadmap → backlog → milestones

---

# Output Format

## Repository Health Score

Score each phase:

| Phase | Score | Summary |
|------|------|------|

Score range:

- 5 = Excellent
- 4 = Good
- 3 = Needs improvement
- 2 = Major gaps
- 1 = Critical issues

---

## Phase Findings

### Product

Summary critique

Key issues

Priority fixes

---

### Tech Spec

Summary critique

Key issues

Priority fixes

---

### UI/UX

Summary critique

Key issues

Priority fixes

---

### Architecture

Summary critique

Key issues

Priority fixes

---

### Delivery

Summary critique

Key issues

Priority fixes

---

## Cross-Phase Consistency Issues

Identify contradictions across documentation.

Examples:

- requirements not implemented in API
- screens without supporting backend
- architecture missing components required by UX
- roadmap not covering required work

---

## Critical Risks

| Risk | Phase | Severity | Impact |

Severity:

P0 Critical  
P1 Important  
P2 Improvement

---

## Implementation Readiness

Evaluate whether documentation is sufficient for engineering to begin.

Rating:

- Ready
- Ready with fixes
- Not ready

Explain reasoning.

---

## Top 10 Fixes Required

List highest priority improvements.

---

## Traceability Validation

Validate traceability chain:

Product → Tech Spec → UI/UX → Design → Delivery

Identify missing links.

---

## Documentation Quality Observations

Comment on:

- clarity
- duplication
- missing diagrams
- ambiguous requirements

---

## Dual-Layer Documentation Reminder

If markdown documentation requires changes:

- regenerate corresponding HTML summaries
- verify markdown ↔ HTML synchronization
