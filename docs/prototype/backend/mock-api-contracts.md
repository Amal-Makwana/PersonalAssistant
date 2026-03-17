# Prototype API Contracts

This document tracks active runtime API contracts for the prototype.

## Status
- Legacy fixture/mock contracts are deprecated.
- Active contracts are backend-connected and DB-backed (except auth UX state in web S01).

## Active endpoint groups
- Events:
  - `GET /events`
  - `GET /events/{id}`
  - `PUT /events/{id}/reminder-plan`
  - `GET /events/{id}/reminder-channels`
  - `POST /events/{id}/retry-sync`
  - `GET /events/{id}/notification-history`
- Dashboard:
  - `GET /dashboard/summary`
- System:
  - `GET /system/profile`
  - `PUT /system/profile`
  - `GET /system/integrations/status`
  - `GET /system/diagnostics/activity`

See individual endpoint docs in `docs/prototype/backend/endpoints` for schema details.
