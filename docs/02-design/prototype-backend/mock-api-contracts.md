# Prototype API Contracts

## GET /events
### Purpose
Return events list payload for Events List (S04), now backed by Supabase/Postgres.

### Request schema
- Method: `GET`
- Path: `/events`
- Query:
  - `delay` (optional): `true|1` for deterministic simulated delay.

### Response schema (`200`)
```json
{
  "events": [
    {
      "id": "string",
      "title": "string",
      "date": "ISO-8601 string",
      "location": "string?",
      "status": "scheduled | needs-review | failed",
      "duplicate": "boolean",
      "syncStatus": "synced | pending | failed",
      "reminderPlan": [{ "offset": "Nh | Nm" }]
    }
  ]
}
```

### Notes
- Contract shape is preserved for frontend compatibility.
- Data source is now Postgres `events` table.

### Error responses
- `500` internal server errors (no scenario forcing in canonical runtime mode).

---

## POST /events
### Purpose
Create a new event record in Supabase/Postgres and return the created row.

### Request schema
- Method: `POST`
- Path: `/events`
- Body:
```json
{
  "title": "string",
  "description": "string",
  "event_date": "ISO-8601 string"
}
```

### Response schema (`201`)
```json
{
  "id": "string",
  "title": "string",
  "description": "string|null",
  "event_date": "ISO-8601 string",
  "created_at": "ISO-8601 string"
}
```

### Error responses
- `400` when required fields are missing or `event_date` is invalid.

---

## GET /events/:id
### Purpose
Return event detail for Event Detail (S05) from Postgres-backed event storage.

### Request schema
- Method: `GET`
- Path: `/events/:id`
- Path params:
  - `id` (required): event ID from DB-backed list/create flows.
- Query: none for runtime canonical mode.

### Response schema (`200`)
Same event object schema as list item.

### Error responses
- `404` when event ID is unknown.
- `500` internal server errors.

---

## PUT /events/:id/reminder-plan
### Purpose
Persist reminder plan edits and return save confirmation from DB-backed event support tables.

### Request schema
- Method: `PUT`
- Path: `/events/:id/reminder-plan`
- Body:
```json
{
  "reminderPlan": [{ "offset": "2h" }, { "offset": "45m" }],
  "channels": {
    "push": true,
    "email": true,
    "sms": false
  }
}
```

### Response schema (`200`)
```json
{
  "success": true,
  "eventId": "22222222-2222-4222-8222-222222222222",
  "message": "Reminder plan saved",
  "reminderCount": 2,
  "channels": ["push", "email"],
  "savedAt": "2026-03-15T10:00:00.000Z",
  "totalReminders": 2,
  "enabledChannels": ["push", "email"]
}
```

### Error responses
- `400` invalid payload.
- `404` unknown ID.
- `500` internal server errors.

---

## GET /dashboard/summary
### Purpose
Return deterministic Dashboard summary data for S03.

### Request schema
- Method: `GET`
- Path: `/dashboard/summary`
- Query: none for runtime canonical mode.

### Response schema (`200`)
```json
{
  "upcomingCount": "number",
  "needsReviewCount": "number",
  "failedCount": "number",
  "nextEventId": "string?"
}
```

### Error responses
- `500` internal server errors.

---

## GET /events/:id/notification-history
### Purpose
Return notification activity history for Event Detail (S08 content on S05 flow) from DB-backed event support tables.

### Request schema
- Method: `GET`
- Path: `/events/:id/notification-history`
- Path params:
  - `id` (required): DB-backed event ID.
- Query: none for runtime canonical mode.

### Response schema (`200`)
```json
{
  "eventId": "string",
  "history": [
    {
      "id": "string",
      "status": "Scheduled | Sent | Failed | Cancelled",
      "remindAt": "ISO-8601 string",
      "channels": ["push | email | sms"],
      "direction": "past | upcoming"
    }
  ]
}
```


---

## Additional Prototype System Endpoints

The following endpoint contracts are documented in dedicated files:
- `endpoints/get-reminder-channels.md`
- `endpoints/get-system-diagnostics-activity.md`
- `endpoints/get-system-integrations-status.md`
- `endpoints/get-system-profile.md`
- `endpoints/post-retry-sync.md`
- `endpoints/put-system-profile.md`

These endpoints support incremental slices for integrations, diagnostics, and system-profile management while preserving canonical documentation location under `docs/02-design/prototype-backend`.
