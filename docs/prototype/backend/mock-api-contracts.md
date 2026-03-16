# Mock API Contracts

## GET /events
Returns deterministic event list payload.

Success `200`:
```json
{
  "events": [
    {
      "id": "evt-1",
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
Error simulation: `GET /events?scenario=error` => `500`.

## GET /events/:id
Returns deterministic detail payload for one event.

Success `200`:
```json
{
  "id": "evt-1",
  "title": "Dentist Appointment",
  "date": "2026-03-20T09:00:00Z",
  "location": "Smile Clinic",
  "status": "scheduled",
  "duplicate": false,
  "syncStatus": "synced",
  "reminderPlan": [{ "offset": "24h" }, { "offset": "3h" }, { "offset": "1h" }]
}
```
`404` for unknown id. `?scenario=error` => `500`.

## PUT /events/:id/reminder-plan
Accepts reminder-plan update payload and returns deterministic mock success.

Request:
```json
{
  "reminderPlan": [{ "offset": "2h" }, { "offset": "45m" }],
  "channels": { "push": true, "email": true, "sms": false }
}
```
Success `200`:
```json
{
  "eventId": "evt-1",
  "savedAt": "2026-03-15T10:00:00.000Z",
  "totalReminders": 2,
  "enabledChannels": ["push", "email"]
}
```
`400` for invalid payload. `404` unknown id. `?scenario=error` => `500`.

## GET /dashboard/summary
Returns dashboard summary data used by Dashboard UI.

Success `200`:
```json
{
  "upcomingCount": 2,
  "needsReviewCount": 1,
  "failedCount": 0,
  "nextEventId": "evt-1"
}
```
`?scenario=empty` returns all counts as `0`. `?scenario=error` => `500`.

## GET /events/:id/notification-history
Returns deterministic notification history for Event Detail.

Success `200`:
```json
{
  "eventId": "evt-1",
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
`404` for unknown id. `?scenario=error` => `500`.
