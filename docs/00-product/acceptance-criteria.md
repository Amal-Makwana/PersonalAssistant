# Acceptance Criteria

## US-01: Google Sign-In (FR-01)
- Given a new user is on onboarding, when they select Google Sign-In and complete authentication, then account access is granted.
- Given authentication fails, when the failure occurs, then the user receives a clear retry path without partial account corruption.

## US-02: Gmail Permission Clarity (FR-02)
- Given a user starts Gmail connection, when consent prompts are shown, then the requested permissions are explicitly described.
- Given a user denies consent, when onboarding continues, then the product explains what functionality is unavailable.

## US-03: Preference Setup (FR-11)
- Given onboarding is in progress, when the user sets channel preferences, then preferences are saved and reflected in reminder behavior.

## US-04: Event Email Detection (FR-03)
- Given a connected Gmail account receives an event-related email, when processing runs, then the email is classified as an event candidate.

## US-05: Event Detail Extraction (FR-04)
- Given an event candidate email with parseable fields, when extraction runs, then title, date, and time are captured, with location captured when present.

## US-06: Event Persistence (FR-05)
- Given extraction succeeds, when persistence executes, then a user-associated event record is stored and retrievable.

## US-07: Duplicate Prevention (FR-10)
- Given duplicate or repeated event source emails, when processing runs, then duplicate active events and reminder schedules are not created.

## US-08: Default Reminder Scheduling (FR-06)
- Given a valid stored event, when scheduling executes, then reminders are created for 4h, 1h, and 15m before event start.

## US-09: WhatsApp Delivery (FR-07)
- Given a reminder trigger time is reached and WhatsApp is enabled, when dispatch executes, then a reminder is sent with successful status or logged failure details.

## US-10: Optional SMS Delivery (FR-08)
- Given SMS is enabled and trigger time is reached, when dispatch executes, then an SMS reminder is sent with status captured.
- Given SMS is disabled, when trigger time is reached, then no SMS reminder is sent.

## US-11: Optional Calendar Sync (FR-09)
- Given Calendar sync is enabled and event creation succeeds, when sync executes, then an equivalent calendar entry is created or updated.

## Traceability
Each acceptance block maps directly to [user-stories.md](./user-stories.md) by US ID and indirectly to FR requirements in [requirements.md](./requirements.md).
