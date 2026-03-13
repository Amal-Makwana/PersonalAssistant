# Data Model Diagram

## Objective
Summarize core entities and relationships backing V1 workflows.

## Core Relationship Notes
- `users` own preferences, source messages, events, and reminders
- `source_messages` can produce one or more event candidates, dedupe links logical equivalence
- `events` generate `reminders`; reminders generate `delivery_attempts`
- Optional calendar sync state kept in `calendar_sync_records`
- `audit_logs` and `job_runs` provide operational traceability

## ER Diagram (Mermaid)
```mermaid
erDiagram
  users ||--o{ auth_accounts : has
  users ||--|| user_preferences : has
  users ||--o{ oauth_tokens : owns
  users ||--o{ source_messages : imports
  users ||--o{ events : owns
  users ||--o{ reminders : owns

  source_messages ||--o{ events : originates
  events ||--o{ event_dedupe_keys : keyed_by
  events ||--o{ reminders : schedules
  reminders ||--o{ delivery_attempts : attempts
  events ||--o| calendar_sync_records : sync_record

  users {
    uuid id PK
    citext email UK
    timestamptz created_at
    timestamptz deleted_at
  }
  events {
    uuid id PK
    uuid user_id FK
    uuid source_message_id FK
    timestamptz start_at
    text status
  }
  reminders {
    uuid id PK
    uuid event_id FK
    text channel
    timestamptz scheduled_for
    text status
  }
```

See detailed entity specification in `../db-schema.md`.
