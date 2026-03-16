# Mock API Contracts

## GET /events
### Purpose
Return deterministic event list payload for Events List (S04).

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

### Example payload
```json
{
  "events": [
    {
      "id": "evt-001",
      "title": "Dentist Appointment",
      "date": "2026-03-20T09:00:00Z",
      "location": "Smile Clinic",
      "status": "scheduled",
      "duplicate": false,
      "syncStatus": "synced",
      "reminderPlan": [{ "offset": "24h" }, { "offset": "3h" }, { "offset": "1h" }]
    }
  ]
}
```

### Error responses
- `500` when `?scenario=error`.

---

## GET /events/:id
### Purpose
Return deterministic event detail for Event Detail (S05).

### Request schema
- Method: `GET`
- Path: `/events/:id`
- Path params:
  - `id` (required): stable fixture ID (e.g., `evt-001`).
- Query:
  - `scenario=error` (optional) for forced HTTP 500.

### Response schema (`200`)
Same event object schema as list item.

### Example payload
```json
{
  "id": "evt-001",
  "title": "Dentist Appointment",
  "date": "2026-03-20T09:00:00Z",
  "location": "Smile Clinic",
  "status": "scheduled",
  "duplicate": false,
  "syncStatus": "synced",
  "reminderPlan": [{ "offset": "24h" }, { "offset": "3h" }, { "offset": "1h" }]
}
```

### Error responses
- `404` unknown ID.
- `500` when `?scenario=error`.

---

## PUT /events/:id/reminder-plan
### Purpose
Accept reminder plan edits and return deterministic mock save confirmation.

### Request schema
- Method: `PUT`
- Path: `/events/:id/reminder-plan`
- Body:
```json
{
  "reminderPlan": [{ "offset": "2h" }, { "offset": "45m" }],
  "channels": { "push": true, "email": true, "sms": false }
}
```
Validation rules:
- `reminderPlan` must be non-empty.
- Each `offset` must match `Nh` or `Nm`.
- `channels` must be an object with boolean values.

### Response schema (`200`)
```json
{
  "success": "true",
  "eventId": "string",
  "message": "string",
  "reminderCount": "number",
  "channels": ["push | email | sms"],
  "savedAt": "ISO-8601 string",
  "totalReminders": "number",
  "enabledChannels": ["push | email | sms"]
}
```

### Example payload
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

### Example payload
```json
{
  "upcomingCount": 2,
  "needsReviewCount": 1,
  "failedCount": 0,
  "nextEventId": "evt-001"
}
```

### Error responses
- `500` when `?scenario=error`.

---

## GET /events/:id/notification-history
### Purpose
Return deterministic notification activity history for Event Detail (S08 content on S05 flow).

### Request schema
- Method: `GET`
- Path: `/events/:id/notification-history`
- Path params:
  - `id` (required): stable fixture ID.
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

### Example payload
```json
{
  "eventId": "evt-001",
  "history": [
    {
      "id": "n-1",
      "status": "Scheduled",
      "remindAt": "2026-03-19T09:00:00Z",
      "channels": ["push", "email"],
      "direction": "upcoming"
    }
  ]
}
```

### Error responses
- `404` unknown ID.
- `500` when `?scenario=error`.
