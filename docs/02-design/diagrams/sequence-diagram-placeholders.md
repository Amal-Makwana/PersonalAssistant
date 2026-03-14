# Sequence Diagram Placeholders

These are baseline sequence outlines to be expanded as implementation details stabilize.

## 1) Request Handling (Authenticated API Call)
```mermaid
sequenceDiagram
  participant UI as Frontend
  participant API as API Service
  participant SVC as Domain Service
  participant DB as PostgreSQL

  UI->>API: GET /api/v1/events
  API->>API: Validate session + input
  API->>SVC: listEvents(user, filters)
  SVC->>DB: Query events/reminders
  DB-->>SVC: Result set
  SVC-->>API: DTO response
  API-->>UI: 200 + data + traceId
```

## 2) Auth Flow (Google OAuth)
```mermaid
sequenceDiagram
  participant U as User Browser
  participant API as API Service
  participant G as Google OAuth

  U->>API: /auth/google/start
  API-->>U: Redirect to Google consent
  U->>G: Approve scopes
  G-->>API: callback(code,state)
  API->>G: Exchange code for tokens
  API->>API: Create session + store encrypted tokens
  API-->>U: Redirect to app
```

## 3) Create/Update Flow (Preference Update)
```mermaid
sequenceDiagram
  participant UI as Frontend
  participant API as API Service
  participant SVC as PreferenceService
  participant DB as PostgreSQL
  participant AUD as AuditLog

  UI->>API: PATCH /preferences
  API->>SVC: validate and apply update
  SVC->>DB: transaction(update preferences)
  SVC->>AUD: append audit event
  API-->>UI: 200 updated preferences
```

## 4) Background Job Flow (Ingest -> Extract -> Schedule -> Calendar Sync)
```mermaid
sequenceDiagram
  participant SCH as Scheduler
  participant Q as Queue
  participant WK as Worker
  participant GM as Gmail API
  participant DB as PostgreSQL

  SCH->>Q: enqueue ingestion job
  Q->>WK: deliver job
  WK->>GM: fetch messages window
  WK->>DB: persist source_messages
  WK->>Q: enqueue normalization jobs
  Q->>WK: normalization job
  WK->>DB: upsert event + dedupe key + reminders
  WK->>Q: enqueue calendar.sync (status=PENDING)
```

## 5) Calendar Sync Transient Failure -> Retry -> Success
```mermaid
sequenceDiagram
  participant WK as Worker
  participant DB as PostgreSQL
  participant GC as Google Calendar API

  WK->>DB: set sync_status=IN_PROGRESS
  WK->>GC: upsert event
  GC-->>WK: 503 timeout
  WK->>DB: set sync_status=FAILED_RETRYABLE, provider_status=503, last_attempt_at=t1
  WK->>WK: apply backoff + retry
  WK->>DB: set sync_status=IN_PROGRESS
  WK->>GC: upsert event (retry)
  GC-->>WK: 200 OK
  WK->>DB: set sync_status=SYNCED, provider_status=200, last_attempt_at=t2
```

## 6) Calendar Sync Terminal Failure -> Persisted Terminal Status -> Operator Remediation
```mermaid
sequenceDiagram
  participant WK as Worker
  participant DB as PostgreSQL
  participant GC as Google Calendar API
  participant OPS as Operator

  WK->>DB: set sync_status=IN_PROGRESS
  WK->>GC: upsert event
  GC-->>WK: 401 invalid_grant
  WK->>DB: set sync_status=FAILED_TERMINAL\nset failure_reason=INVALID_CREDENTIALS\nset provider_status=401\nset last_attempt_at=t3
  WK->>OPS: emit alert with traceId and event_id
  OPS->>DB: inspect terminal record + metadata
  OPS->>WK: trigger remediation run after consent repair
```

## 7) Messaging Provider Callback (Post-MVP Placeholder)
```mermaid
sequenceDiagram
  participant WA as WhatsApp Provider
  participant API as Webhook API
  participant DB as PostgreSQL

  Note over WA,API: Disabled in MVP. Placeholder for post-MVP only.
  WA->>API: delivery callback
  API->>DB: update attempt/reminder status
```
