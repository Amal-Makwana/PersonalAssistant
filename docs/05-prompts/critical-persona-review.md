# Prompt: Critical Persona Review by Documentation Phase

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

Output Format:

Persona Used  
Executive Critique  

Section-by-Section Findings

| Section | Issue | Severity | Recommendation |

Priority Fix List

P0 Critical  
P1 Important  
P2 Improvement  

Proposed Edits

Traceability Validation

Risks

| Risk | Severity | Impact |

Open Questions

Dual-Layer Documentation Reminder:
If markdown changes are recommended, regenerate HTML summaries.
