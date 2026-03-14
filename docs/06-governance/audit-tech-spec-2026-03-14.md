# Tech Spec Documentation Audit — 2026-03-14

## Persona Used
**Principal Engineer / Solution Architect**

This persona is appropriate because the tech-spec phase must be implementation-ready, internally consistent, and operationally viable. The review emphasizes architecture boundaries, API/data contract rigor, reliability semantics, and traceability to product commitments.

## Executive Critique
The technical documentation set is strong on architecture intent, reliability framing, and operational concerns. Core lifecycle sequencing (`ingest -> extract -> dedupe -> schedule -> calendar sync`) is clear and generally coherent across overview, backend, integration, and schema artifacts.

However, implementation readiness is reduced by a set of cross-file ambiguities: (1) MVP scope boundaries vs API/channel exposure are inconsistent in places, (2) some endpoint and status contracts remain underspecified for deterministic implementation/testing, and (3) key traceability links to product acceptance criteria are present but not uniformly explicit at section level. These are fixable with focused P0/P1 edits.

---

## Section-by-Section Findings

| Section | Issue | Severity | Recommendation |
| --- | --- | --- | --- |
| `tech-overview.md` | Good lifecycle and reliability baseline, but section-level references to exact API/status constants are not linked to canonical contract docs. | P2 | Add explicit pointers to canonical enums/statuses in API + DB docs to reduce drift risk. |
| `backend-spec.md` | Retry and terminal failure behavior are documented, but exact worker idempotency conflict handling outcomes (e.g., duplicate enqueue/result code) are not fully normalized into API-visible semantics. | P1 | Add a normative “conflict resolution outcomes” table mapping job states to persisted statuses and operator actions. |
| `frontend-spec.md` | UX/technical assumptions for capability flags appear ahead of finalized MVP channel boundaries. | P1 | Clarify that non-MVP channels must render as disabled/hidden with explicit feature-flag behavior. |
| `api-spec.md` | Contains responses/fields implying active SMS/WhatsApp capabilities while other docs position those channels post-MVP. | P0 | Mark SMS/WhatsApp fields as `postMvpReserved` or remove from MVP response examples; add versioning note for future exposure. |
| `db-schema.md` | Schema supports post-MVP channels as reserved enum values, which is acceptable, but migration/constraint guidance does not explicitly prevent accidental activation in MVP business logic. | P1 | Add a guardrail note: enum values may exist, but application-layer validation must reject non-MVP channels. |
| `integration-spec.md` | Strong provider failure handling for Google APIs; post-MVP provider placeholders exist but lack explicit non-use enforcement in MVP runbooks. | P1 | Add “MVP execution boundary” section stating WhatsApp/SMS adapters are disabled and excluded from operational SLOs. |
| `security-nfr.md` | Security and NFR coverage is comprehensive, but several requirements remain non-testable as written (“align with applicable regulations”, broad availability statements). | P1 | Add measurable controls and verification hooks (e.g., concrete policy docs, audit cadence, SLO measurement windows). |
| `diagrams/*` | Diagram set is coherent and aligns with modular architecture; sequence placeholders are useful but not tied to explicit error-path variants for critical flows. | P2 | Add one failure-path sequence (calendar terminal failure + remediation) and reference corresponding statuses. |

---

## Priority Fix List

### P0 Critical
1. **Resolve MVP scope contradiction for messaging channels**
   - `api-spec.md` currently exposes examples that can be interpreted as live SMS/WhatsApp capabilities.
   - Align with `tech-overview.md` and `system-context.md`, which clearly place these channels post-MVP.

### P1 Important
1. **Normalize contract-level semantics for retries/terminal failures** across backend/integration/API/DB docs.
2. **Add enforceable MVP channel guardrails** in schema + API + frontend behavior notes.
3. **Convert non-testable NFR/security statements into measurable acceptance checks**.
4. **Increase explicit traceability tags at section granularity** (FR/US references per major section, not only in summary tables).

### P2 Improvement
1. Add failure-path sequence diagrams for operator workflows.
2. Expand glossary/enum registry to reduce terminology drift (`FAILED_TERMINAL`, retryable vs terminal classes, etc.).

---

## Proposed Edits

### 1) API scope ambiguity (P0)
**Issue**  
`api-spec.md` response examples imply active SMS/WhatsApp in MVP.

**Why it matters**  
Creates implementation and QA ambiguity, and can lead to shipping UI/backend behavior beyond committed MVP scope.

**Suggested replacement text**  
> In MVP, only `calendarSync` capability is active. `sms` and `whatsapp` capabilities are reserved for post-MVP and MUST be omitted or explicitly returned as disabled via a `postMvpReserved` metadata flag.

---

### 2) Schema guardrail for reserved channels (P1)
**Issue**  
`db-schema.md` reserves non-MVP channels but lacks explicit application enforcement language.

**Why it matters**  
Reserved enum values can be inadvertently activated if validation boundaries are not explicit.

**Suggested replacement text**  
> Although `whatsapp` and `sms` enum values are pre-modeled for future migrations, MVP services MUST reject creation/scheduling of reminders for non-`calendar` channels at validation boundaries.

---

### 3) Reliability semantics normalization (P1)
**Issue**  
Retry/terminal handling exists but is spread across documents with minor wording variation.

**Why it matters**  
Increases risk of inconsistent implementation and inconsistent incident triage behavior.

**Suggested replacement text**  
> Canonical sync states: `PENDING`, `IN_PROGRESS`, `SYNCED`, `FAILED_RETRYABLE`, `FAILED_TERMINAL`. All docs and APIs MUST use this exact set. Any state transition to `FAILED_TERMINAL` MUST persist `failure_reason`, `provider_status`, and `last_attempt_at`.

---

### 4) Testability upgrades for NFRs (P1)
**Issue**  
Some NFR language is policy-level without verification criteria.

**Why it matters**  
Non-testable requirements reduce auditability and release readiness confidence.

**Suggested replacement text**  
> Availability SLO verification: monthly rolling window, excluding planned maintenance, measured from API ingress success ratio and sync pipeline completion ratio. Security control verification: quarterly access review, dependency scan gate on high/critical vulnerabilities, and annual restore drill evidence.

---

## Traceability Validation

### Strong Linkages Found
- FR-09 / US-09 are consistently represented in overview, backend flow ordering, integration behavior, and data model support.
- FR-10 / US-07 duplicate prevention is reflected in dedupe sequencing and persistence constraints.

### Gaps / Partial Linkages
- FR-07 / FR-08 post-MVP status is clear in some docs but not uniformly enforced in API/frontend examples.
- Some security and availability requirements are not yet tied to explicit acceptance checks or delivery milestones.

### Recommended Traceability Enhancement
Add per-section trace tags (e.g., `Trace: FR-09, US-09`) to each major subsection in API/backend/integration/security docs to make audits deterministic.

---

## Risks

| Risk | Severity | Impact |
| --- | --- | --- |
| MVP scope leakage through capability APIs | High | Team may implement/test unsupported channels, causing schedule and quality risk. |
| Inconsistent failure-state vocabulary across docs | Medium | Divergent retry/terminal handling and harder incident response. |
| Non-testable NFR phrasing | Medium | Governance and release-readiness reviews become subjective. |
| Missing explicit failure-path diagrams | Low | Slower onboarding and troubleshooting during production incidents. |

---

## Open Questions
1. For MVP, should `sms`/`whatsapp` be omitted entirely from API payloads or included as explicit disabled placeholders?
2. Should calendar reconcile be operator-triggered only in MVP, or scheduled periodically with bounded load?
3. Which NFR checks are mandatory release gates vs post-launch hardening tasks?
4. Do we want a centralized enum/state registry document to eliminate contract drift across API, backend, and schema docs?

---

## Dual-Layer Documentation Reminder
If any `docs/01-tech-spec/*.md` files are updated to apply these recommendations, regenerate `docs/01-tech-spec/tech-spec-summary.html` in the same change set.
