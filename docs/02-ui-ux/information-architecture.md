# Information Architecture

## 1. Purpose
Define how information, navigation, and screen relationships are organized so users can complete reminder-management workflows quickly and confidently.

## 2. IA Principles
- **Task-first grouping:** Organize by user intent (Connect, Review, Manage, Diagnose), not by backend entities.
- **Stable global landmarks:** Keep top-level sections persistent to reduce orientation loss.
- **Hierarchy depth control:** Prefer 2-level depth for high-frequency actions.
- **State-aware navigation:** Surface pending actions (e.g., failed delivery, low-confidence extraction) as first-class entry points.

## 3. Navigation Model
- **Primary model:** Authenticated app shell with persistent global navigation.
- **Secondary model:** Contextual sub-navigation within Events and Settings.
- **Utility model:** Notification center, user account menu, and quick actions.

## 4. Global Navigation Structure
1. **Dashboard**
   - Operational snapshot
   - Upcoming reminders
   - Attention-required items
2. **Events**
   - All events list
   - Event detail
   - Filters (status, date, confidence)
3. **Preferences**
   - Reminder timing defaults
   - Channel preferences
   - Timezone and locale settings
4. **Integrations**
   - Gmail connection status
   - WhatsApp/SMS status
   - Calendar sync (optional)
5. **Activity & Diagnostics**
   - Delivery history
   - Retry outcomes
   - Audit trail summary
6. **Account / Settings**
   - Profile/session controls
   - Security and consent management

## 5. Screen Hierarchy
- **Level 0:** Landing/Auth (`/login`, `/oauth/callback`)
- **Level 1 (global):** `/dashboard`, `/events`, `/preferences`, `/integrations`, `/activity`, `/settings`
- **Level 2 (detail/secondary):** `/events/:id`, `/integrations/:provider`, `/activity/:reminderId`
- **Modal surfaces:** quick edit reminder, reconnect integration, confirm retry, destructive confirmation dialogs

## 6. Feature-to-Screen Mapping
| Feature Domain | Primary Screen(s) | Supporting Screen(s) | Notes |
|---|---|---|---|
| Onboarding & Auth | Login, Onboarding Wizard | Integration connect modal | Depends on OAuth and permissions flow |
| Event Monitoring | Dashboard, Events List | Event Detail | Status chips and confidence indicators required |
| Reminder Configuration | Preferences | Quick Edit Modal, Event Detail | Must support global defaults + per-event override |
| Delivery Operations | Activity | Reminder Attempt Detail | Recovery actions: retry, channel switch |
| Integrations | Integrations Overview | Provider Detail | Connection health and remediation guidance |

## 7. Content Grouping Strategy
- Group operational content by lifecycle stage: **Detected**, **Scheduled**, **Due Soon**, **Failed**.
- Group configuration content by control frequency: high-frequency toggles first, advanced policies later.
- Keep diagnostic detail collapsed by default to avoid overwhelming primary users.
- Use consistent metadata clusters across event-centric screens: source email, extracted time, confidence, channel, status.

## 8. User Mental Model Considerations
- Users think in commitments, not records; therefore, labels should prioritize “upcoming event/reminder” language.
- Most users expect inbox automation to be mostly hands-off; manual review should feel exception-based.
- “Reminder sent” and “delivery acknowledged” are distinct concepts and need explicit labels.

## 9. Entry Points
- Post-login default: Dashboard.
- Notification deep links: Event Detail or Activity detail based on notification type.
- Email-based action links (future-ready): open specific event review page.
- Error banner action links: direct to Integrations or Preferences remediation screens.

## 10. Search / Filter / Discovery Structure
- **Events search:** title/keyword search, date range, status, extraction confidence.
- **Activity filters:** channel, delivery outcome, retry status, time window.
- **Saved views (future):** “Needs review”, “Failures in last 24h”, “Upcoming in 48h”.
- Filter states should be URL-addressable for QA reproducibility and shareable support workflows.

## 11. Breadcrumb / Orientation Strategy
- Dashboard: no breadcrumb.
- Detail screens: `Events > {Event Title}` and `Activity > {Reminder Reference}`.
- Sub-settings: `Settings > Integrations > {Provider}`.
- Mobile: replace full breadcrumb with compact back-link + page title pattern.

## 12. Open Questions / Gaps
1. Should Activity be top-level navigation in MVP or nested under Dashboard?
2. Is separate Integrations and Preferences navigation excessive for first release?
3. Do we need cross-workspace/account switching in navigation for future enterprise tenants?
4. Should search support raw email sender as a filter in V1?

**Related documents:** `screen-inventory.md`, `user-flows.md`, `docs/01-tech-spec/frontend-spec.md`.
