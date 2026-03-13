# Scope Definition — V1

## Scope Purpose
Define release boundaries for the MVP and protect delivery focus by explicitly stating what must ship, what may be deferred, and what is excluded.

## In-Scope Capabilities (Must Align to P0/P1 Stories)
1. Google sign-in and Gmail authorization flow.
2. Detection of event-related emails.
3. Extraction of event metadata (title/date/time/location when available).
4. Event persistence and default reminder scheduling.
5. WhatsApp reminder delivery.
6. Optional SMS reminder delivery and basic preference controls.
7. Duplicate prevention logic for events/reminders.
8. Operational logs for core pipeline visibility.

## Conditionally In-Scope (Time/Capacity Dependent)
- Optional Google Calendar synchronization (US-012 / FR-11).
- Enhanced reporting views beyond baseline operational metrics.

## Out-of-Scope (Explicitly Excluded from V1)
- Non-Gmail providers (Outlook, Yahoo, IMAP custom providers).
- Enterprise team collaboration and shared workspace scheduling.
- Advanced conversational assistant behavior.
- Custom rule engines and complex reminder automation.
- Voice reminder channels and smart speaker integrations.
- Highly personalized AI timing optimization.

## Release Boundaries
### Must Ship for V1 Go-Live
- All P0 stories and linked acceptance criteria (AC-001 through AC-010, AC-012 as applicable).
- Operational confidence for detection, extraction, and delivery workflows.
- Risk controls for privacy, consent clarity, and duplicate prevention.

### Can Slip Without Blocking V1 (If Needed)
- Google Calendar sync (AC-011).
- Non-critical reporting enhancements beyond baseline audit expectations.

## Scope-to-Requirements Traceability
- In-scope capabilities map primarily to FR-01 through FR-10 and FR-12.
- Conditionally in-scope capability maps to FR-11.
- Scope exclusions align to Out-of-Scope section in `requirements.md`.

## Change Control Expectations
Any V1 scope change request must include:
1. Business rationale and expected impact.
2. Requirement, story, and acceptance criteria updates.
3. Delivery impact assessment (timeline/risk/resource).
4. Explicit stakeholder decision and approval record.
