# Frontend App (apps/web)

This application is wired to backend APIs for dashboard, events, event detail, integrations, diagnostics, and profile/preferences flows.

## Current exception
- Authentication remains intentionally mocked in `S01 Login` per product decision.

## API-backed screens
- `S02 Onboarding` persists timezone and default sync settings to `/system/profile`.
- `S03 Dashboard` reads `/dashboard/summary`.
- `S04 Events List` reads `/events`.
- `S05 Event Detail` reads `/events/:id`, `/events/:id/reminder-channels`, `/events/:id/notification-history` and writes `/events/:id/reminder-plan`.
- `S06 Preferences` reads/writes `/system/profile`.
- `S07 Integrations` reads `/system/integrations/status`.
- `S08 Diagnostics` reads `/system/diagnostics/activity`.
