# Product Requirements Document
## Email-Driven Reminder Assistant (Enterprise PRD, V1)

## 1. Document Overview
This Product Requirements Document (PRD) defines the business intent, user outcomes, delivery boundaries, and operational expectations for the Email-Driven Reminder Assistant V1. It is the authoritative source for product planning, engineering implementation, quality validation, and release readiness.

**Audience:** Product management, business analysts, engineering leads, QA, design, support operations, and executive sponsors.

**How this document should be used:**
- Product and business teams use this document to align on value, priorities, and measurable outcomes.
- Engineering and architecture teams use this document to derive technical specifications and delivery plans.
- QA and operations use this document to validate acceptance, observability, support readiness, and production reliability.

> [!NOTE]
> **Legacy gap analysis (pre-rewrite):** Prior documentation described core features but lacked enterprise-grade structure, explicit KPI definitions, stakeholder accountability, operational requirements, risk management, and traceability between vision, requirements, stories, and acceptance criteria. Functional requirements were brief, with weak business rationale and limited prioritization detail. Non-functional constraints, compliance assumptions, integration boundaries, and open questions were underdeveloped.

## 2. Product Overview
The Email-Driven Reminder Assistant is a workflow automation product that converts event-bearing emails into trusted reminders without requiring users to manually re-enter event details or configure reminder timing each time.

At launch, the product focuses on Gmail as the source channel and WhatsApp as the default reminder channel, with optional SMS and optional Google Calendar sync. The product operates as an intelligent “event capture and follow-through layer” between inbox activity and real-world commitments.

**Strategic intent:** Remove failure points between receiving event information and acting on it.

**What the product enables:**
- Automatic event recognition from incoming email.
- Event normalization into structured records.
- Policy-based reminder scheduling.
- Multi-channel reminder delivery for high-attention notification reach.

## 3. Business Context
### Business drivers
- Missed appointments and commitments create personal stress and measurable financial or reputational loss.
- Manual event management is repetitive and error-prone.
- Inbox volume continues to grow, reducing visibility of critical event details.

### Strategic goals
- Establish a dependable user habit loop around “email received → reminder guaranteed.”
- Increase user trust through consistent extraction, scheduling, and delivery.
- Build a foundation for future inbox-driven assistant capabilities.

### Market opportunity
A broad consumer and prosumer segment receives confirmations, invitations, and operational notices through email but does not reliably convert these into reminders. A low-friction automation layer addresses this gap with clear immediate value.

### Business problems being solved
- Commitment loss due to unstructured inbox workflows.
- Inconsistent reminder setup behavior.
- Over-reliance on passive channels (email-only notifications).

## 4. Problem Statement
### Current situation
Users receive time-sensitive event emails but must manually detect, parse, and convert information into reminders.

### Pain points
- Event details are often buried within long or multi-message threads.
- Users defer calendar entry during busy periods.
- Reminder setup is inconsistent across events.

### Operational inefficiencies
- Repetitive manual entry for title, date, and time.
- Duplicate effort when email, calendar, and messaging tools are disconnected.

### User frustrations
- Anxiety from uncertainty about missing important commitments.
- Notification fatigue from low-priority channels while critical events are still overlooked.

## 5. Goals and Objectives
### Primary goals
1. Reduce missed event incidents for active users.
2. Minimize manual effort needed to turn event emails into reminders.
3. Deliver reminders in channels users check frequently.

### Secondary goals
1. Improve confidence in email parsing reliability.
2. Support lightweight preference control for delivery channels.
3. Provide optional calendar continuity for users who rely on Google Calendar.

### Success outcomes
- Users report higher confidence in commitment follow-through.
- Reminder workflow completion (detect → schedule → deliver) becomes the default experience.

## 6. Success Metrics
### Business KPIs
- Weekly Active Users (WAU).
- 30-day retained users after onboarding.
- Reduction in self-reported missed events among retained users.

### User adoption metrics
- Gmail connection completion rate.
- Opt-in rate for WhatsApp reminders.
- Optional SMS enablement rate.

### Operational metrics
- Event extraction success rate from eligible event emails.
- Reminder scheduling success rate.
- Reminder delivery success rate by channel.

### Technical success metrics
- Median time from email ingestion to event creation.
- P95 latency for reminder dispatch.
- Duplicate event prevention accuracy.

## 7. Stakeholders
### Product stakeholders
- Product Manager (owns scope, priorities, KPI targets).
- Business Analyst (owns requirement integrity and traceability).

### Business stakeholders
- Executive sponsor (owns strategic outcome validation).
- Growth/marketing lead (owns activation and retention initiatives).

### Technical stakeholders
- Engineering manager (owns technical execution and delivery quality).
- Solution architect (owns architecture and integration boundaries).
- QA lead (owns acceptance and release quality).

### Operational stakeholders
- Support lead (owns incident handling and user issue resolution readiness).
- DevOps/SRE lead (owns observability, reliability, and on-call readiness).

## 8. Target Users
### User segments
- Individuals managing high volumes of appointment and scheduling emails.
- Time-constrained users with frequent context switching.

### Primary personas
- Busy Professional
- Parent Coordinator
- Freelancer/Consultant

### Secondary personas
- University Student
- Small Business Operator

See the expanded persona definitions in [user-personas.md](./user-personas.md).

## 9. User Scenarios
1. **Healthcare appointment flow:** A user receives a clinic confirmation email. The product extracts appointment details and sends reminders at 4h, 1h, and 15m prior.
2. **School operations flow:** A parent receives a school notice email for a meeting. The event is captured and reminder delivery ensures attendance readiness.
3. **Interview preparation flow:** A candidate receives an interview invitation; reminders support preparation and punctual attendance.
4. **Travel commitment flow:** A traveler receives booking confirmation and gets timely pre-departure reminders.

## 10. Functional Requirements
### FR-01 Authentication and Account Access
- **Description:** Users shall authenticate using Google Sign-In.
- **Business reason:** Reduce onboarding friction and leverage trusted identity.
- **Priority:** Must
- **Affected user types:** All personas

### FR-02 Gmail Authorization and Ingestion
- **Description:** Users shall authorize Gmail access for event-related email processing.
- **Business reason:** Enables core automation pipeline.
- **Priority:** Must
- **Affected user types:** All personas

### FR-03 Event Detection
- **Description:** System shall identify candidate event emails from Gmail content.
- **Business reason:** Prevent missed commitments by automating event discovery.
- **Priority:** Must
- **Affected user types:** All personas

### FR-04 Event Extraction and Structuring
- **Description:** System shall extract title, date, time, and optional location into structured event records.
- **Business reason:** Structured data is required for scheduling and delivery reliability.
- **Priority:** Must
- **Affected user types:** All personas

### FR-05 Event Repository Management
- **Description:** System shall persist extracted events and associate them with the correct user account.
- **Business reason:** Creates auditable source for reminder lifecycle.
- **Priority:** Must
- **Affected user types:** All personas

### FR-06 Reminder Schedule Generation
- **Description:** System shall generate default reminders at 4 hours, 1 hour, and 15 minutes before event start.
- **Business reason:** Standardized policy creates predictable value at MVP stage.
- **Priority:** Must
- **Affected user types:** All personas

### FR-07 WhatsApp Reminder Delivery
- **Description:** System shall deliver reminders via WhatsApp for enabled users.
- **Business reason:** High-attention channel improves reminder effectiveness.
- **Priority:** Must
- **Affected user types:** All personas

### FR-08 Optional SMS Reminder Delivery
- **Description:** System shall support optional SMS reminder delivery.
- **Business reason:** Channel redundancy improves reach for users with different preferences.
- **Priority:** Should
- **Affected user types:** Preference-driven segments

### FR-09 Optional Google Calendar Sync
- **Description:** System shall support optional event sync to Google Calendar.
- **Business reason:** Increases ecosystem compatibility for calendar-dependent users.
- **Priority:** Should
- **Affected user types:** Calendar-centric users

### FR-10 Duplicate Detection and Prevention
- **Description:** System shall prevent duplicate event and reminder creation for equivalent source emails.
- **Business reason:** Preserves trust and avoids notification spam.
- **Priority:** Must
- **Affected user types:** All personas

### FR-11 Preference Management
- **Description:** Users shall manage channel preferences (e.g., enable/disable SMS).
- **Business reason:** User control improves adoption and reduces churn risk.
- **Priority:** Could
- **Affected user types:** Users with channel-specific preferences

## 11. Non Functional Requirements
- **Performance:** Event ingestion-to-record creation should be near-real-time for user confidence.
- **Scalability:** Architecture must support growth in concurrent users and email volume without major service degradation.
- **Security:** OAuth-based access, least privilege practices, and secure data handling are mandatory.
- **Availability:** Reminder pipeline should meet production-grade uptime expectations.
- **Reliability:** Delivery attempts and failures must be traceable with retry behavior defined by downstream design.
- **Compliance:** Product must align with applicable privacy and messaging provider policy obligations.

## 12. Operational Requirements
- **Monitoring:** Health dashboards for ingestion throughput, extraction success, scheduling success, and delivery outcomes.
- **Logging:** Structured logs with correlation identifiers across ingest, parse, schedule, and notify stages.
- **Support:** Support workflow for failed delivery investigation and user configuration troubleshooting.
- **Maintenance expectations:** Versioned release practices with incident response ownership and recovery playbooks.

## 13. Integration Expectations
- **External systems:** Gmail API, Google OAuth, WhatsApp messaging provider, optional SMS provider, optional Google Calendar API.
- **Third-party services:** Messaging gateways must expose delivery status and error responses.
- **APIs:** Internal interfaces must support event ingestion, preference management, scheduling, and delivery state tracking.

## 14. Business Rules
1. Reminder policy defaults to exactly three pre-event windows in MVP (4h, 1h, 15m).
2. Only authorized user mailboxes are processed.
3. Duplicate source events must not generate duplicate active reminders.
4. Optional channels (SMS, Calendar sync) require explicit user enablement.

## 15. Assumptions
- Users are willing to authorize Gmail for automation value.
- A sufficient share of event emails include parseable temporal details.
- WhatsApp is a high-attention channel for the primary user base.
- Users value automation over manual reminder setup.

## 16. Constraints
### Technical constraints
- MVP limited to Gmail as the mail source.
- Reminder timing profile is fixed in V1.

### Business constraints
- MVP scope prioritizes high-confidence automation over broad feature breadth.

### Regulatory constraints
- Data handling and messaging must adhere to applicable privacy and provider policy requirements.

## 17. Risks
### Potential product risks
- Incomplete or ambiguous email content may reduce extraction quality.

### Delivery risks
- Third-party API changes or quota limitations may impact integration timelines.

### Operational risks
- Messaging provider disruptions may affect delivery SLA in specific windows.

## 18. Dependencies
### Internal dependencies
- Platform services for authentication, data persistence, and job scheduling.

### External dependencies
- Google APIs (OAuth, Gmail, Calendar).
- WhatsApp and SMS provider service availability and throughput.

## 19. Scope Definition
### In Scope
- Gmail authorization and event email processing.
- Event extraction and persistence.
- Default reminder scheduling policy.
- WhatsApp reminders.
- Optional SMS reminders.
- Optional Google Calendar sync.
- Duplicate prevention and preference management.

### Out of Scope
- Non-Gmail providers.
- Recurring reminder rule engines.
- Team/enterprise administration workflows.
- Voice assistants or conversational AI workflows.
- Complex automation beyond event-to-reminder lifecycle.

## 20. Phase Planning
### MVP capabilities (V1)
Deliver FR-01 through FR-11 with a focus on reliability and traceability across the core reminder lifecycle.

### Future phases
- Custom reminder timing profiles.
- Additional mail providers.
- Broader messaging channel strategy.
- Context-aware reminder intelligence.

### Expansion roadmap
Evolve from event capture/reminders to a broader “email-to-action” assistant while maintaining privacy and trust as core differentiators.

## 21. Open Questions
1. What minimum extraction confidence threshold is acceptable for automatic scheduling vs. manual confirmation?
2. What target SLA should be committed for reminder delivery by channel?
3. Which privacy disclosures and consent artifacts are required at onboarding for each jurisdiction?
4. Should channel fallback logic (e.g., WhatsApp failure → SMS fallback) be included in V1 or deferred?

---

## Traceability Matrix
- **Vision → Goals:** See [vision.md](./vision.md), sections “Strategic Goals” and “Success Horizon.”
- **Goals → Requirements:** Goals in Section 5 map primarily to FR-01..FR-11 in Section 10.
- **Requirements → User Stories:** FR IDs are referenced in [user-stories.md](./user-stories.md).
- **User Stories → Acceptance Criteria:** Story IDs are mapped in [acceptance-criteria.md](./acceptance-criteria.md).
