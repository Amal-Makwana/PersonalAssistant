# Product Vision

For critical documentation review, use docs/05-prompts/critical-persona-review.md

## Strategic Narrative
Modern users do not fail to keep commitments because they lack calendars; they fail because the operational step between receiving an event email and configuring reminders is fragile, repetitive, and easy to postpone. The Email-Driven Reminder Assistant exists to close that gap with dependable automation.

The product is designed as a trust-centric orchestration layer that listens to user-authorized inbox signals, identifies event intent, and converts those signals into timely reminders in channels users actually see. This makes “I got the email” equivalent to “I will be reminded,” reducing missed commitments and decision fatigue.

## Mission
Enable people to consistently act on email-based commitments by automatically transforming event emails into reliable reminders with minimal effort.

## Long-Term Vision
Become the default personal commitment assurance layer for inbox-driven lives, evolving from reminders into broader email-to-action support while preserving user trust, privacy, and control.

## Value Proposition
- **For users:** Fewer missed events, less manual setup, and greater day-to-day confidence.
- **For the business:** High-clarity product value, strong retention potential, and an extensible foundation for future assistant capabilities.

## Strategic Goals
1. Deliver a dependable core workflow (detect → extract → schedule → notify).
2. Build user trust with consistent outcomes and transparent preference control.
3. Establish a scalable architecture for future expansion beyond reminders.

## Success Horizon
- **Near term (V1):** Reliable Gmail-based event detection, event extraction, reminder schedule generation, and Google Calendar synchronization.
- **Mid term:** Custom reminder rules, additional provider support, and stronger context intelligence.
- **Long term:** Multi-action assistant experiences built on inbox intent and lifecycle automation.

## V1 Delivery Scope Clarification

For V1, the committed delivery scope includes:
- Gmail email ingestion
- Event detection and extraction
- Reminder schedule generation
- Google Calendar synchronization

Notification channels such as WhatsApp and SMS are intentionally deferred to post-MVP phases to ensure the reliability and accuracy of the core email-to-calendar workflow before expanding into messaging channels.


## Alignment and Traceability
- This vision informs PRD goals in [requirements.md](./requirements.md) Section 5.
- Functional realization is defined by PRD requirements FR-01 through FR-11.
