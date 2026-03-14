# MVP Sequence Flows

## 1. Email to Calendar Sync (Primary MVP Flow)

```mermaid
sequenceDiagram
  participant Gmail as Gmail API
  participant Ingest as Ingestion Adapter
  participant Extract as Extraction Service
  participant EventSvc as Event Service
  participant Sched as Scheduling Service
  participant Sync as Calendar Sync Service
  participant Cal as Google Calendar API

  Gmail->>Ingest: new message metadata/body
  Ingest->>Extract: candidate event payload
  Extract->>EventSvc: normalized event + confidence
  EventSvc->>EventSvc: dedupe check (FR-10 / US-07)
  EventSvc->>EventSvc: persist event transaction
  EventSvc->>Sched: generate 4h/1h/15m reminders
  EventSvc->>Sync: enqueue calendar sync job (FR-09)
  Sync->>Cal: upsert event
  Cal-->>Sync: success/failure response
  Sync->>Sync: update sync status + metrics
```

## 2. Calendar Sync Retry and Terminal Failure

```mermaid
sequenceDiagram
  participant Sync as Calendar Sync Service
  participant Cal as Google Calendar API
  participant Obs as Observability

  loop retry attempts (max 5)
    Sync->>Cal: upsert event (10s timeout)
    alt transient error / timeout
      Cal-->>Sync: retryable failure
      Sync->>Obs: emit retry metric + structured log
    else success
      Cal-->>Sync: success
      Sync->>Obs: emit success metric + latency
    end
  end

  alt max retries exceeded
    Sync->>Obs: emit terminal failure event with reason
  end
```

## 3. Scope Guardrails
- WhatsApp and SMS flows are intentionally excluded from MVP sequence diagrams.
- These channels remain post-MVP extension points.
