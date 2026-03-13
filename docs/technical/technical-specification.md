# Technical Specification: Email-to-Reminder Assistant (MVP)

## 1. System Overview

The Email-to-Reminder Assistant MVP is a web application and background-processing system that ingests labeled Gmail messages, extracts event details, persists normalized event records, schedules reminder jobs, and delivers reminders through messaging channels.

At a high level, the system flow is:

1. User authenticates with Google OAuth in the Next.js application.
2. User grants Gmail read access and optional Google Calendar access.
3. Backend polling service fetches unread/new messages for a configured Gmail label (default: `Reminder`).
4. Parser extracts event fields (title, date, time, optional location) from message content.
5. Valid events are stored in PostgreSQL as system-of-record entities.
6. Optional Google Calendar synchronization creates/updates calendar events.
7. Reminder scheduler materializes and triggers reminders at 4h, 1h, and 15m before event time.
8. Notification service sends reminder payloads via WhatsApp (primary) and SMS (optional).

Textual architecture diagram:

- **Client (Next.js frontend)** → OAuth + Settings APIs
- **Application API (Next.js API routes)** → Gmail ingestion + parsing + event/reminder orchestration
- **PostgreSQL (Neon)** ← users/tokens/settings/events/reminders/delivery logs
- **External APIs**: Gmail, Google Calendar, Twilio WhatsApp, Twilio SMS
- **Background scheduler** → scans due reminders → calls notification provider → updates status

## 2. Core System Components

### Frontend (Next.js)

- **Onboarding UI**: sign-in, permission grant, and first-time setup completion.
- **Gmail Connection UI**: connect/disconnect state, label configuration, sync status.
- **User Settings UI**: calendar sync toggle, calendar target, WhatsApp target, optional SMS target.
- **Status Surfaces**: recent ingested events and reminder delivery outcomes (MVP-level visibility).

### Backend Services

- **Gmail Ingestion Service**
  - Polls Gmail API for configured label.
  - Fetches message metadata and body payloads.
  - Tracks last processed cursor/time and deduplicates by message ID.
- **Email Parser Service**
  - Converts MIME payload to normalized plain text.
  - Runs deterministic extraction for datetime/title/location.
  - Returns confidence outcome (`accepted` vs `skipped`).
- **Event Service**
  - Creates/updates event records.
  - Enforces uniqueness constraints (user + source email).
  - Triggers optional calendar sync.
- **Reminder Scheduler Service**
  - Generates default reminders for accepted events.
  - Scans for due reminders on interval.
  - Handles retries and state transitions.
- **Notification Service**
  - Formats message templates.
  - Dispatches through WhatsApp (primary) and optional SMS.
  - Logs provider response and delivery status.

### External Integrations

- **Gmail API**: label-based message retrieval and message content access.
- **Google Calendar API**: optional event creation/update for synchronized users.
- **WhatsApp Messaging Provider (Twilio)**: primary reminder channel.
- **SMS Provider (Twilio)**: optional fallback/secondary channel.

## 3. Technology Stack

### Frontend

- Next.js
- TypeScript

### Backend

- Node.js runtime
- Next.js API routes for HTTP endpoints and orchestration logic

### Database

- PostgreSQL (hosted on Neon)

### ORM

- Prisma or Drizzle (selection to be finalized during implementation design)

### Messaging

- Twilio WhatsApp API (required)
- Twilio SMS API (optional)

### Hosting

- Vercel (web + API deployment)

## 4. Authentication and User Management

Google OAuth 2.0 will be used for identity and API delegation.

Flow:

1. User initiates Google sign-in from frontend.
2. OAuth consent requests scopes for profile/email + Gmail read access + optional Calendar access.
3. OAuth callback exchanges authorization code for access/refresh tokens.
4. Backend creates/updates user and token records.
5. Session is established for authenticated frontend/API usage.

Requirements:

- Support Google sign-in as the primary authentication method.
- Request only least-privilege scopes required for MVP behavior.
- Persist tokens securely (encrypted at rest application-layer or database-layer strategy).
- Refresh expired access tokens using refresh token before integration calls.

## 5. Email Processing

Email ingestion behavior:

- Process only messages in a configured label (`Reminder` by default).
- Poll Gmail on a configurable interval (e.g., every 5 minutes for MVP baseline).
- Use Gmail message ID as immutable source identifier.
- Skip messages already processed for the same user/message ID.
- Safely extract plain text from multipart MIME payload:
  - Prefer `text/plain` part when present.
  - Fallback to sanitized `text/html` to text conversion.
  - Strip scripts/tracking/unsafe markup.

Processing states should include: `fetched`, `parsed`, `accepted`, `skipped`, `failed`.

## 6. Event Extraction

MVP extraction strategy is deterministic (rule-based), not AI-driven.

Extraction pipeline:

1. Normalize text (whitespace cleanup, timezone token normalization, locale-safe date tokens).
2. Extract date candidates.
3. Extract time candidates.
4. Compose `event_datetime` candidate in user timezone.
5. Extract optional location from known patterns (e.g., "Location:", "Venue:").
6. Resolve title from subject line fallback when body title is absent.

Acceptance criteria:

- Event is accepted only if datetime confidence is high enough (date + time resolved clearly).
- Ambiguous/incomplete data is skipped and logged for observability.
- No inferred or speculative event creation for low-confidence parses.

## 7. Event Storage

The application database (PostgreSQL) is the primary source of truth for events.

Google Calendar is a synchronization destination only.

Core event fields:

- `event_id`
- `user_id`
- `title`
- `event_datetime`
- `location`
- `source_email_id`
- `calendar_event_id` (nullable, populated if synced)

Behavior:

- Upsert semantics by (`user_id`, `source_email_id`) to prevent duplicate events.
- Persist normalization metadata (timestamps, parser version, parse status) for traceability.

## 8. Reminder Scheduling

Default reminders are created per accepted event at:

- 4 hours before event
- 1 hour before event
- 15 minutes before event

Scheduling behavior:

- Reminder rows are generated once at event creation (idempotent by event + reminder type).
- Each reminder has lifecycle states: `pending`, `processing`, `sent`, `failed`, `cancelled`.
- Scheduler selects reminders where `reminder_time <= now()` and `status = pending`.

## 9. Notification Delivery

Delivery channels:

- **Primary**: WhatsApp via Twilio
- **Optional**: SMS via Twilio

Notification service responsibilities:

- Build reminder payload template: event title, datetime, location, channel-safe formatting.
- Send via provider API using per-user destination settings.
- Persist send attempts and provider response IDs.
- Update reminder status and record final delivery outcome.

Failure handling:

- Transient failures retried with bounded backoff.
- Permanent failures marked and surfaced via logs/metrics.

## 10. Duplicate Prevention

Duplicate prevention rules:

1. **Email reprocessing prevention**: unique (`user_id`, `gmail_message_id`) in ingestion tracking.
2. **Event duplication prevention**: unique (`user_id`, `source_email_id`) in `Events`.
3. **Reminder duplication prevention**: unique (`event_id`, `reminder_type`) in `Reminders`.
4. **Notification idempotency**: do not resend reminders already in `sent` state.

Gmail message ID is the canonical external reference key.

## 11. Data Model

Initial MVP tables and representative fields:

### `Users`

- `id` (PK)
- `email` (unique)
- `created_at`

### `OAuthTokens`

- `user_id` (FK → Users.id)
- `access_token` (encrypted)
- `refresh_token` (encrypted)
- `expires_at`

### `UserSettings`

- `user_id` (FK → Users.id, unique)
- `gmail_label` (default `Reminder`)
- `calendar_id` (nullable)
- `whatsapp_target`
- `sms_target` (nullable)

### `Events`

- `id` (PK)
- `user_id` (FK → Users.id)
- `title`
- `event_datetime`
- `location` (nullable)
- `source_email_id` (unique per user)
- `calendar_event_id` (nullable)

### `Reminders`

- `id` (PK)
- `event_id` (FK → Events.id)
- `reminder_type` (`4h`, `1h`, `15m`)
- `reminder_time`
- `status`

Recommended supporting table for operations:

### `NotificationDeliveries` (operational log)

- `id` (PK)
- `reminder_id` (FK → Reminders.id)
- `channel` (`whatsapp` | `sms`)
- `provider_message_id`
- `attempted_at`
- `status`
- `error_code` (nullable)

## 12. Scheduler Design

Scheduler is a background process executed on a configurable interval.

Responsibilities:

1. Query due reminders in `pending` state.
2. Mark selected reminders `processing` in a transactional lock-safe manner.
3. Trigger notification sends.
4. Update reminder status (`sent`/`failed`) and persist attempt metadata.

Design considerations:

- Interval configurable via environment variable (e.g., `SCHEDULER_INTERVAL_SECONDS`).
- Batch size configurable to control load.
- Use database row-level locking or equivalent claim mechanism to avoid double-processing across concurrent workers.

## 13. Security Considerations

- **Token security**: encrypt OAuth access/refresh tokens at rest; restrict decrypt capability to server runtime.
- **Least privilege scopes**: request minimal Gmail/Calendar scopes required for label read and optional event write.
- **Data protection**: store only required email-derived fields, avoid retaining full raw email indefinitely unless needed for debugging policy.
- **Transport security**: enforce HTTPS/TLS for all external API calls and client-server communication.
- **Messaging safety**: validate destination numbers and sanitize outbound message content.
- **Access control**: all user data queries scoped by authenticated user ID.

## 14. Observability

Structured logs and metrics are required for core flows:

- Gmail polling logs: poll start/end, messages fetched, failures.
- Parsing logs: parse success/skipped counts and failure reasons.
- Reminder scheduling logs: reminders created, due reminders scanned, status transitions.
- Notification logs: channel, provider response, retries, terminal failure reasons.

Operational metrics (MVP baseline):

- Poll latency and fetch error rate.
- Parse acceptance rate.
- Reminder trigger latency vs scheduled time.
- Delivery success/failure rate by channel.

## 15. MVP Limitations

Known MVP constraints:

- Gmail-only ingestion (no Outlook/IMAP providers).
- Deterministic parsing only; no advanced AI interpretation.
- Limited reminder customization (fixed default reminder windows).
- Limited language/format robustness for highly unstructured emails.
- No advanced workflow automation, recurring rules, or team features.

