# Scope Definition for V1 (MVP)

## Scope Intent
V1 focuses on delivering a reliable, trust-building automation loop for inbox-derived events. Scope prioritizes consistency and operational confidence over feature breadth.

## In Scope (V1)
1. Google account authentication.
2. Gmail authorization and event email processing.
3. Structured extraction of title, date, time, and optional location.
4. Event persistence associated with user identity.
5. Default reminder schedule at 4 hours, 1 hour, and 15 minutes pre-event.
6. WhatsApp reminder delivery.
7. Optional SMS reminder delivery.
8. Optional Google Calendar sync.
9. Duplicate prevention for events/reminders.
10. User preference management for channel enablement.

## Explicit Exclusions (V1)
1. Non-Gmail mail providers.
2. Recurring event rule engines.
3. Team collaboration, shared inbox, or enterprise admin workflows.
4. Voice interfaces and conversational assistant features.
5. Advanced automation chains beyond event-to-reminder lifecycle.

## Boundary Decisions
- Preference depth is intentionally minimal in V1 to reduce complexity.
- Reminder timing is fixed to validate baseline behavior before introducing custom rules.
- Channel strategy is WhatsApp-first with optional SMS, prioritizing high-attention reach.

## Release Readiness Conditions
V1 is considered scope-complete when all mapped V1 requirements (FR-01 through FR-11) have corresponding implemented stories and accepted criteria validation.

## Traceability
- Requirements baseline: [requirements.md](./requirements.md), Sections 10 and 19.
- Story mapping: [user-stories.md](./user-stories.md).
- Validation mapping: [acceptance-criteria.md](./acceptance-criteria.md).
