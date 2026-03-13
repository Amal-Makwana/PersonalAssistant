# Product Requirements
## Email-Driven Reminder Assistant — Enterprise Product Requirements (V1)

## 1. Document Purpose
This document is the consolidated product and business requirements baseline for V1. It is the source of truth for stakeholder alignment across Product, Business, Delivery, Architecture, Engineering, QA, and Operations.

> Consolidation note: content formerly maintained in `business-requirements.md` has been merged into this document.

## 2. Problem Statement
Users receive critical event information in email (appointments, interviews, classes, bookings), but many events are still missed due to fragmented manual workflows and inconsistent reminder setup. The gap between receiving an event email and acting on that commitment creates avoidable no-shows, stress, and operational inefficiency.

## 3. Business Context
- **Market behavior:** people increasingly use messaging channels for real-time notification consumption.
- **Behavioral challenge:** inbox volume and thread complexity reduce reliability of manual follow-through.
- **Opportunity:** automate conversion of event emails into reminders with low setup effort and high trust.
- **Business thesis:** a dependable reminder layer on top of email can increase user retention through daily utility.

## 4. Background
Current alternatives require users to manually parse and transfer event details into calendars/reminder tools. This creates failure points around forgetfulness, timing, and data-entry friction. V1 focuses on a tightly-scoped MVP that validates core product-market fit before broad channel and provider expansion.

## 5. Goals and Objectives
### 5.1 Business Goals
- **G-01:** Reduce missed events for active users.
- **G-02:** Increase confidence in inbox-to-reminder automation.
- **G-03:** Establish a reliable and auditable core workflow suitable for scale.

### 5.2 Product Objectives (V1)
- **O-01:** Enable secure Gmail connection with explicit user consent.
- **O-02:** Detect event-related emails and extract usable event details.
- **O-03:** Automatically create event records and schedule default reminders.
- **O-04:** Deliver reminders via WhatsApp, with optional SMS support.
- **O-05:** Prevent duplicate events and duplicate reminder sends.

## 6. Measurable Success Criteria
- **SC-01:** Reminder delivery success rate meets target threshold for production readiness.
- **SC-02:** Onboarding funnel completion (sign-in → Gmail connected) reaches agreed adoption threshold.
- **SC-03:** Event extraction success from relevant emails meets target quality bar.
- **SC-04:** Active users report fewer missed events post-onboarding.
- **SC-05:** Privacy and permission transparency concerns remain below escalation threshold.

## 7. Business Requirements
- **BR-01:** The product shall deliver measurable reduction in missed user commitments.
- **BR-02:** The product shall provide a low-friction onboarding experience for non-technical users.
- **BR-03:** The product shall support transparent consent and user trust for inbox access.
- **BR-04:** The product shall provide notification channel flexibility (WhatsApp mandatory, SMS optional).
- **BR-05:** The product shall maintain operational visibility and auditability for critical flows.
- **BR-06:** The MVP shall prioritize individual users and exclude team workflow complexity.

## 8. Functional Requirements
- **FR-01 Authentication:** Users can sign in with Google account.
- **FR-02 Gmail Authorization:** Users can connect Gmail with clear permission scope messaging.
- **FR-03 Email Detection:** System identifies event-related emails from connected inboxes.
- **FR-04 Detail Extraction:** System extracts title, date, time, and optional location.
- **FR-05 Event Persistence:** System stores extracted events per user profile.
- **FR-06 Reminder Scheduling:** System schedules default reminders at 4h, 1h, and 15m pre-event.
- **FR-07 WhatsApp Delivery:** System sends reminders to enabled WhatsApp destination.
- **FR-08 SMS Optional Delivery:** System sends reminders via SMS when user opts in.
- **FR-09 Duplicate Prevention:** System avoids duplicate event and reminder creation.
- **FR-10 Preference Management:** Users can manage basic reminder channel preferences.
- **FR-11 Calendar Sync Optional:** Users can enable optional Google Calendar synchronization.
- **FR-12 Operational Logging:** System records processing milestones for troubleshooting and audit.

## 9. Non-Functional Product Requirements
- **NFR-01 Reliability:** Core pipeline (detect → extract → schedule → notify) must be dependable.
- **NFR-02 Performance:** Event processing and reminder scheduling should occur within acceptable latency windows.
- **NFR-03 Availability:** Reminder dispatch capability should meet agreed service availability objectives.
- **NFR-04 Security:** Authentication, token handling, and data storage must follow secure practices.
- **NFR-05 Privacy:** Inbox-derived data usage must align with user consent and minimization principles.
- **NFR-06 Usability:** Onboarding and settings must be understandable for non-technical users.
- **NFR-07 Observability:** Monitoring, alerting, and logging must support rapid issue detection.
- **NFR-08 Scalability:** Solution must support growth in users, processed emails, and reminder volume.

## 10. Stakeholder Needs
- **Business:** evidence of user value and retention potential.
- **Product:** clear traceability from outcomes to features and acceptance criteria.
- **Engineering:** precise requirements and boundaries for implementation.
- **Architecture/Security:** explicit constraints for privacy, compliance, and integration risk.
- **Delivery/QA:** testable acceptance definitions and release gating criteria.
- **Operations/Support:** actionable logs, reporting, and incident response hooks.

## 11. User Segments
Primary segments are detailed in `user-personas.md`:
- Busy professionals
- Parents managing school/family schedules
- University students
- Freelancers/consultants
- Small business owners

## 12. Scope
### 12.1 In Scope (V1)
- Gmail-based event email processing.
- Event extraction and event storage.
- Automated reminder scheduling with default timing windows.
- WhatsApp reminders and optional SMS reminders.
- Basic user notification preferences.
- Optional Google Calendar sync.

### 12.2 Out of Scope (V1)
- Non-Gmail inbox providers.
- Conversational AI assistant features.
- Complex automation/if-this-then-that rule engines.
- Enterprise team workflow and shared workspace controls.
- Voice reminders and advanced recurring reminder logic.

## 13. Assumptions
- Users are willing to grant limited Gmail access when value and privacy posture are clear.
- A meaningful share of relevant emails contain parseable event metadata.
- Messaging channels remain the highest-engagement reminder surfaces.
- Default reminder schedule is broadly acceptable for early users.

## 14. Constraints
- Dependency on third-party provider APIs and policy changes.
- Message channel delivery behavior can vary by geography and carrier/provider conditions.
- Early-stage architecture must balance speed-to-market with audit/security fundamentals.

## 15. Dependencies
- Google authentication and Gmail API integration.
- WhatsApp delivery integration.
- Optional SMS provider integration.
- Secure storage for user, event, preference, and audit data.
- Monitoring and logging stack for operational oversight.

## 16. Risks and Mitigations
- **R-01 Parsing ambiguity:** unstructured emails reduce extraction accuracy.  
  *Mitigation:* confidence scoring, fallback handling, and visibility in event review surfaces.
- **R-02 Consent friction:** users may hesitate to grant inbox access.  
  *Mitigation:* clear permission language, value explanation, and revocation controls.
- **R-03 Delivery failures:** third-party channel delays or outages.  
  *Mitigation:* retry policies, alerting, and delivery status reporting.
- **R-04 Duplicate processing:** repeated emails/threads can create noise.  
  *Mitigation:* deterministic dedup logic and idempotent scheduling behavior.

## 17. Compliance, Privacy, and Security Considerations
- Explicit consent for inbox and channel access.
- Data minimization and retention-by-need posture for extracted event content.
- Secure token and credential handling.
- Access control and auditability for sensitive operations.
- User-visible controls for connection management and notification preferences.

## 18. Reporting and Audit Expectations
- Funnel reporting: sign-in, authorization completion, first event detected, first reminder delivered.
- Operational reporting: extraction success/failure rates, reminder success/failure rates, duplicates prevented.
- Audit trails: critical workflow events with timestamped traceability for troubleshooting and support.
- Product KPI reporting aligned with success criteria SC-01 to SC-05.

## 19. Operational Expectations
- Defined incident response ownership for reminder-delivery degradation.
- Health monitoring for integrations and job-processing pipelines.
- Clear runbooks for token expiration, provider outages, and retry backlogs.
- Release-readiness checks aligned with `acceptance-criteria.md` and `scope-v1.md`.

## 20. Future / Phase 2 Considerations
- Multi-provider email support.
- Smarter, context-aware reminder timing.
- Deeper personalization and priority detection.
- Family/team coordination features.
- Expanded channel coverage and richer notification interactions.

## 21. Traceability Matrix (Requirements to Stories and Acceptance)
| Requirement | Linked Stories | Linked Acceptance Criteria |
|---|---|---|
| FR-01, FR-02 | US-001, US-002 | AC-001, AC-002 |
| FR-03, FR-04 | US-003, US-004, US-005 | AC-003, AC-004 |
| FR-05, FR-06 | US-006, US-007 | AC-005, AC-006 |
| FR-07, FR-08 | US-008, US-009 | AC-007, AC-008 |
| FR-09 | US-010 | AC-009 |
| FR-10, FR-11 | US-011, US-012 | AC-010, AC-011 |
| FR-12, NFR-07 | US-013 | AC-012 |
