# Acceptance Criteria (V1)

## Acceptance Mapping Rules
- Every acceptance criterion must map to at least one user story and one requirement.
- P0 stories require full acceptance pass before V1 release sign-off.
- Criteria are written in Given/When/Then format for testability.

## Acceptance Criteria by Story

- **AC-001 — Authentication Success**  
  **Given** a new user is on onboarding  
  **When** they complete Google sign-in successfully  
  **Then** an authenticated account session is established.  
  **Links:** US-001 | FR-01

- **AC-002 — Consent Transparency**  
  **Given** a user is asked to connect Gmail  
  **When** permission is requested  
  **Then** the UI clearly explains scope and purpose before authorization.  
  **Links:** US-002 | FR-02, BR-03, NFR-05

- **AC-003 — Event Email Detection**  
  **Given** a connected inbox contains a valid event email  
  **When** processing runs  
  **Then** the email is classified as event-related for extraction workflow.  
  **Links:** US-003, US-004 | FR-03

- **AC-004 — Event Detail Extraction**  
  **Given** an event-related email is detected  
  **When** extraction executes successfully  
  **Then** title, date, and time are captured, with location when available.  
  **Links:** US-005 | FR-04

- **AC-005 — Event Record Persistence**  
  **Given** event details are extracted  
  **When** persistence is applied  
  **Then** an event record is stored and associated with the correct user.  
  **Links:** US-006 | FR-05

- **AC-006 — Default Reminder Scheduling**  
  **Given** an event has a valid date/time  
  **When** reminder scheduling runs  
  **Then** reminders are created for 4h, 1h, and 15m before the event.  
  **Links:** US-007 | FR-06

- **AC-007 — WhatsApp Reminder Delivery**  
  **Given** a scheduled reminder reaches trigger time  
  **When** WhatsApp is enabled for the user  
  **Then** a reminder is sent successfully or recorded with failure status.  
  **Links:** US-008 | FR-07, NFR-07

- **AC-008 — Optional SMS Delivery**  
  **Given** a scheduled reminder reaches trigger time  
  **When** SMS is enabled for the user  
  **Then** a reminder is sent via SMS or logged with actionable failure detail.  
  **Links:** US-009 | FR-08, FR-10

- **AC-009 — Duplicate Prevention**  
  **Given** repeated or duplicate source emails are processed  
  **When** event/reminder creation logic runs  
  **Then** duplicate events and duplicate reminder sends are prevented.  
  **Links:** US-010 | FR-09

- **AC-010 — Preference Management**  
  **Given** a user updates channel settings  
  **When** they save preferences  
  **Then** reminder delivery behavior reflects updated settings for future reminders.  
  **Links:** US-011 | FR-10

- **AC-011 — Optional Calendar Sync**  
  **Given** a user enables calendar sync  
  **When** eligible events are created  
  **Then** sync behavior follows configured integration rules.  
  **Links:** US-012 | FR-11

- **AC-012 — Operational Traceability**  
  **Given** detection, extraction, scheduling, and send workflows execute  
  **When** success or failure occurs at each stage  
  **Then** timestamped logs are available for monitoring and troubleshooting.  
  **Links:** US-013 | FR-12, NFR-07

## Definition of Done (Product)
- All mapped P0 acceptance criteria pass.
- Requirement-story-acceptance traceability is complete and internally consistent.
- Product, QA, and Delivery sign-off obtained for V1 scope boundaries.
