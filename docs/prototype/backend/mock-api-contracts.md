# Prototype API Contracts

## GET /events
### Purpose
Return events list payload for Events List (S04), now backed by Supabase/Postgres.

### Request schema
- Method: `GET`
- Path: `/events`
- Query:
  - `delay` (optional): `true|1` for deterministic simulated delay.
  - `scenario` (optional): `error` for forced HTTP 500.

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
- `500` when `?scenario=error`.

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
- Query:
  - `scenario=error` (optional) for forced HTTP 500.

### Response schema (`200`)
Same event object schema as list item.

### Error responses
- `404` when event ID is unknown.
- `500` when `?scenario=error`.

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
  "eventId": "evt-001",
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
- `500` when `?scenario=error`.

---

## GET /dashboard/summary
### Purpose
Return deterministic Dashboard summary data for S03.

### Request schema
- Method: `GET`
- Path: `/dashboard/summary`
- Query:
  - `scenario=empty` (optional) for zero counts.
  - `scenario=error` (optional) for forced HTTP 500.

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
- `500` when `?scenario=error`.

---

## GET /events/:id/notification-history
### Purpose
Return notification activity history for Event Detail (S08 content on S05 flow) from DB-backed event support tables.

### Request schema
- Method: `GET`
- Path: `/events/:id/notification-history`
- Path params:
  - `id` (required): DB-backed event ID.
- Query:
  - `scenario=error` (optional) for forced HTTP 500.

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
