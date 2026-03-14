# Acceptance Criteria

## US-01: Google Sign-In (FR-01)
- Given a new user is on onboarding, when they select Google Sign-In and complete authentication, then account access is granted.
- Given authentication fails, when the failure occurs, then the user receives a clear retry path without partial account corruption.

## US-02: Gmail Permission Clarity (FR-02)
- Given a user starts Gmail connection, when consent prompts are shown, then the requested permissions are explicitly described.
- Given a user denies consent, when onboarding continues, then the product explains what functionality is unavailable.

## US-03: Preference Setup (FR-11)
- Given onboarding is in progress, when the user sets reminder and integration preferences, then preferences are saved and reflected in system behavior.

## US-04: Event Email Detection (FR-03)
- Given a connected Gmail account receives an event-related email, when processing runs, then the email is classified as an event candidate.

## US-05: Event Detail Extraction (FR-04)
- Given an event candidate email with parseable fields, when extraction runs, then title, date, and time are captured, with location captured when present.
- Given extraction executes for supported event email formats, when processing completes, then extraction confidence for auto-scheduling decisions is at least 95% and lower-confidence results are flagged or gated according to policy.

## US-06: Event Persistence (FR-05)
- Given extraction succeeds, when persistence executes, then a user-associated event record is stored and retrievable.

## US-07: Duplicate Prevention (FR-10)
- Given duplicate or repeated event source emails, when processing runs, then duplicate active events and reminder schedules are not created.
- Given semantically equivalent source emails, when normalization identifies an existing event key, then no duplicate reminder schedule is created.

## US-08: Default Reminder Scheduling (FR-06)
- Given a valid stored event, when scheduling executes, then reminders are created for 4h, 1h, and 15m before event start.

## US-09: Google Calendar Sync (FR-09)
- Given calendar sync is enabled and event creation succeeds, when sync executes, then an equivalent calendar entry is created or updated.
- Given sync executes successfully, when the operation completes, then the event appears in Google Calendar within 10 seconds.
- Given transient provider errors occur, when retry policy executes, then retries follow policy and terminal failures are recorded with explicit failure reasons.

## US-10: WhatsApp Delivery (FR-07)
- Given the future-phase WhatsApp channel is enabled and a reminder trigger time is reached, when dispatch executes, then a reminder is sent with successful status or logged failure details.

## US-11: Optional SMS Delivery (FR-08)
- Given the future-phase SMS channel is enabled and trigger time is reached, when dispatch executes, then an SMS reminder is sent with status captured.
- Given SMS is disabled, when trigger time is reached, then no SMS reminder is sent.


## High-Risk Flow Reliability Criteria

### US-05 Event Extraction Reliability

Given a supported event email format  
When the system processes the email  
Then title, date, and time fields are extracted successfully  
And extraction quality meets the minimum confidence threshold of 95%  
And low-confidence extractions are logged for review.

### US-07 Duplicate Prevention

Given repeated or semantically equivalent event emails  
When event normalization identifies an existing event key  
Then the system must not create a duplicate reminder schedule.

### US-09 Google Calendar Sync Reliability

Given calendar sync is enabled  
When an event is successfully persisted  
Then the event appears in the user’s Google Calendar within 10 seconds.

Given transient provider errors occur  
When retry policy executes  
Then the system retries according to policy  
And records terminal failure status with a clear failure reason.

## High-Risk Journey Acceptance Mapping

| Journey | Acceptance Requirement |
|------|------|
| Email → Event Extraction | Title/date/time parsed correctly |
| Event → Calendar Sync | Event appears in calendar within 10 seconds |
| Duplicate Detection | System prevents duplicate creation |
| Reminder Scheduling | Reminders generated at 4h / 1h / 15m |

## Traceability
Each acceptance block maps directly to [user-stories.md](./user-stories.md) by US ID and indirectly to FR requirements in [requirements.md](./requirements.md).
