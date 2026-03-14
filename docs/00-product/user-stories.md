# User Stories

## Epic E1: Onboarding & Trust
### US-01 (FR-01)
As a new user, I want to sign in with my Google account so that I can start quickly without creating another password.

### US-02 (FR-02)
As a privacy-conscious user, I want clear Gmail permission prompts so that I understand and trust the scope of access.

### US-03 (FR-11)
As a user, I want to configure reminder preferences during setup so that automation behavior matches my needs.

## Epic E2: Email → Event Automation
### US-04 (FR-03)
As a busy professional, I want relevant event emails to be detected automatically so that key commitments are not overlooked.

### US-05 (FR-04)
As a user, I want event title, date, time, and location (when present) extracted from email so that no manual data entry is required.

### US-06 (FR-05)
As a user, I want extracted events saved in my account so that reminder scheduling can run reliably.

### US-07 (FR-10)
As a user, I want duplicate events prevented so that I do not receive repeated reminders for the same commitment.

## Epic E3: Reminder Scheduling
### US-08 (FR-06)
As a user, I want reminders scheduled automatically at default intervals so that I receive adequate preparation time.

## Epic E4: Calendar Integration (MVP)
### US-09 (FR-09)
As a calendar-dependent user, I want events synced to Google Calendar so that my schedule remains consistent across tools.

## Epic E5: Notification Channels (Future Phase)
### US-10 (FR-07)
As a user, I want reminders sent to WhatsApp so that I notice alerts in a high-attention channel.

### US-11 (FR-08)
As a user who prefers text messages, I want optional SMS reminders so that I can choose my preferred channel.


## Risk Annotation for High-Impact Stories

| Story | Risk if Unmet |
|---|---|
| US-04 Detect event emails | Events not identified, resulting in missed commitments |
| US-05 Extract event details | Incorrect date/time extraction leads to inaccurate reminders |
| US-06 Persist events | Data loss results in reminder scheduling failure |
| US-07 Prevent duplicates | Users receive duplicate reminders causing trust erosion |
| US-08 Generate reminder schedule | Reminders not created in time for events |
| US-09 Sync event to Google Calendar | Users cannot see events in their calendar ecosystem |

These annotations assist prioritization during QA and production incident triage.

## Traceability
- Requirement mapping is indicated via FR references per story.
- Acceptance mappings are defined in [acceptance-criteria.md](./acceptance-criteria.md) using US IDs.
