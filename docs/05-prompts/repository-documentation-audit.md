# Prompt: Repository Documentation Audit

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

Repository Health Score

| Phase | Score | Summary |

Score scale:
5 Excellent  
4 Good  
3 Needs improvement  
2 Major gaps  
1 Critical issues

Phase Findings:

Product  
Tech Spec  
UI/UX  
Architecture  
Delivery

Each section must include:

Summary critique  
Key issues  
Priority fixes

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

Dual-Layer Documentation Reminder:
If markdown is updated, regenerate HTML summaries.
