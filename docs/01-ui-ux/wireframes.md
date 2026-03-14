# Wireframes (Figma-Ready Screen Specifications)

## MVP Channel Boundary Note
- Active MVP integrations represented in wireframes: Gmail ingest and Google Calendar sync.
- WhatsApp/SMS are post-MVP and must not be shown as active controls in any wireframe state.

## S01 — Login & Consent
**Reference:** `screen-inventory.md`
### 1. Screen Purpose
Authenticate user and request required permissions.
### 2. Primary User
First-time or returning user with expired session.
### 3. Entry Points
App launch, session timeout.
### 4. Exit Paths
S02 (first-time), S03 (returning), error retry.
### 5. Screen Layout
Top brand bar; centered auth panel; trust/support links footer.
### 6. Regions
- **R1 Top Bar**: orientation; top; logo + app name; nav/text; high.
- **R2 Auth Panel**: signin/consent; center; headline, consent text, primary button; card/form; critical.
- **R3 Feedback Strip**: permission errors; below CTA; inline alert; high.
### 7. Actual Wireframe Representation
```text
+--------------------------------------------------------------+
| Logo  Email-Driven Reminder Assistant                        |
+--------------------------------------------------------------+
|                                                              |
|                 +----------------------------------+         |
|                 | Welcome back                     |         |
|                 | Connect Google to continue       |         |
|                 | [ Continue with Google ]         |         |
|                 | [!] Permission required message  |         |
|                 +----------------------------------+         |
|                                                              |
|        Privacy | Terms | Need help?                           |
+--------------------------------------------------------------+
```
### 8. Interaction Zones
Primary CTA, legal links, retry action in error alert.
### 9. States
Default, OAuth loading, permission denied error, success redirect.
### 10. Responsive Behaviour
Desktop centered card; tablet wider card; mobile full-width sheet with sticky CTA.
### 11. Figma Build Notes
Frame: `S01_Login/{Desktop|Tablet|Mobile}/{State}`; auto layout vertical; 12/8/4 guides; reusable button + alert variants.

## S02 — Onboarding Wizard
**Reference:** `screen-inventory.md`
### 1. Screen Purpose
Collect defaults and activate Google Calendar sync for MVP.
**Trace:** FR-09, FR-11, US-03, US-09
### 2. Primary User
New user after first authentication.
### 3. Entry Points
S01 success.
### 4. Exit Paths
S03 dashboard.
### 5. Screen Layout
Progress header; two-column body (form + contextual tips); sticky footer actions.
### 6. Regions
- **R1 Step Header**: progress + title; top.
- **R2 Setup Form**: timezone, offsets, calendar sync preference; left/main.
- **R3 Tips Panel**: explanations; right rail.
- **R4 Sticky Action Bar**: back/next/finish; bottom.
### 7. Actual Wireframe Representation
```text
+--------------------------------------------------------------+
| Step 2 of 3  | Configure reminder defaults                   |
+-------------------------------+------------------------------+
| Timezone [UTC+05:30 v]        | Why this matters             |
| Default reminder [30m v]      | - Events use this baseline   |
| Quiet hours [22:00 - 07:00]   | - You can override per event |
| Calendar sync default: [x] Enable |                            |
| Test calendar sync [ Run test ] |                              |
+-------------------------------+------------------------------+
| [Back]                                      [Save & Continue] |
+--------------------------------------------------------------+
```
### 8. Interaction Zones
All form fields, test buttons, progress steps, sticky CTA.
### 9. States
Default, field validation, test loading, calendar sync error, save success.
### 10. Responsive Behaviour
Desktop 2-column; tablet tips panel below form; mobile single column + sticky bottom action.
### 11. Figma Build Notes
Use nested auto layout sections; footer pinned component; variants for stepper and test status.

## S03 — Dashboard
**Reference:** `screen-inventory.md`
### 1. Screen Purpose
Give operational snapshot and prioritize event actions.
### 2. Primary User
Returning active user.
### 3. Entry Points
Post-login, global nav.
### 4. Exit Paths
S04, S05, S06, S07, S08.
### 5. Screen Layout
Top app bar; left sidebar; page header; KPI cards; attention queue; upcoming reminders table; right rail health panel.
### 6. Regions
- **R1 App Bar**: search/profile/alerts; top.
- **R2 Side Nav**: primary navigation; left.
- **R3 Page Header**: title + primary CTA; top of content.
- **R4 KPI Row**: summary cards; upper main.
- **R5 Attention Queue**: actionable cards; main center.
- **R6 Upcoming Table**: reminder schedule list; lower main.
- **R7 Health Rail**: Google integration health; right.
### 7. Actual Wireframe Representation
```text
+----------------------+---------------------------------------------------+
| Logo Search Bell Me  | Dashboard                        [View All Events] |
+----------+-----------+-------------------+-------------------+-----------+
| Dashboard| [Card] Needs Review | [Card] Scheduled | [Card] Failures       |
| Events   +---------------------------------------------------------------+
| Prefs    | Attention Queue                                           (>) |
| Intg.    | [Event Card #1] [Review]                                     |
| Activity/Diag | [Event Card #2] [Review]                                     |
| Account  +---------------------------------------------------------------+
|          | Upcoming Reminders Table                                     |
|          | | Time | Event | Channel | Status | Action |                 |
|          +-------------------------------------------+-------------------+
|          |                                           | Integration Health |
+----------+-------------------------------------------+-------------------+
```
### 8. Interaction Zones
Sidebar nav, queue cards, table actions, health rail CTAs, page-level CTA.
### 9. States
Default, loading skeleton, empty queue, system error banner, success toast after actions.
### 10. Responsive Behaviour
Tablet icon rail + stacked right panel; mobile top summary cards then queue list and table-as-cards.
### 11. Figma Build Notes
Create AppShell component instance; 12-col grid desktop; queue cards auto layout vertical; table/card responsive variant.

## S04 — Events List
**Reference:** `screen-inventory.md`
### 1. Screen Purpose
Support bulk triage of extracted events with filters and sorting.
### 2. Primary User
Power users reviewing multiple events.
### 3. Entry Points
S03 CTA, global nav.
### 4. Exit Paths
S05 details, S03 dashboard.
### 5. Screen Layout
App shell; page header; filter bar with chips; data table/list; pagination/footer.
### 6. Regions
- **R1 Header**: title, result count, export disabled badge.
- **R2 Filter Toolbar**: search, status tabs, date range, reset.
- **R3 Results Table**: sortable columns + row actions.
- **R4 Pagination**: page controls.
### 7. Actual Wireframe Representation
```text
[Events]  124 results                              [Create Manual Reminder]
[Search.............][Status v][Date v][Sync State v][Reset]
+--------------------------------------------------------------------------+
| Event                | Time        | Confidence | Sync State | Status | ... |
| Client call summary  | Tue 10:00   | 92%        | Pending   | Review | >   |
| Team sync            | Wed 09:00   | 99%        | Synced    | Sched. | >   |
+--------------------------------------------------------------------------+
[< Prev] Page 1 of 13 [Next >]
```
### 8. Interaction Zones
Filter controls, sortable headers, row click target, pagination buttons.
### 9. States
Default, loading rows, no results, API error with retry, permission-restricted columns (if role-limited).
### 10. Responsive Behaviour
Desktop table; tablet reduced columns; mobile stacked event cards with inline actions.
### 11. Figma Build Notes
Use table component with density variant; mobile card-list variant shares same data fields.

## S05 — Event Detail
**Reference:** `screen-inventory.md`
### 1. Screen Purpose
Review extracted event context and finalize reminder settings.
**Trace:** FR-04, FR-06, FR-09, FR-10, US-05, US-07, US-08, US-09
### 2. Primary User
User validating one event.
### 3. Entry Points
S03 queue card, S04 row.
### 4. Exit Paths
S03/S04 after save; S08 diagnostics.
### 5. Screen Layout
Page header with status badge; split body with details left and reminder editor right; delivery history tab; sticky save bar.
### 6. Regions
- **R1 Context Header**: event name/time/source + badge.
- **R2 Detail Panel**: parsed metadata and confidence callouts.
- **R3 Reminder Panel**: timing/calendar-sync visibility/edit controls.
- **R4 History Tab**: delivery attempts list.
- **R5 Sticky Actions**: confirm, dismiss, cancel.
### 7. Actual Wireframe Representation
```text
[< Back] Event: Client QBR Invite        [Needs Review]   [View Diagnostics]
+--------------------------------------+-------------------------------------+
| Event Details                         | Reminder Settings                   |
| - Source email snippet                | Calendar Sync [Enabled v]            |
| - Extracted datetime [edit]           | Reminder offsets [4h, 1h, 15m]       |
| - Participants                        | Snooze policy [Allowed v]           |
| [!] Confidence low on date parsing    | [Preview next reminder]             |
+--------------------------------------+-------------------------------------+
| Tabs: [Overview] [Delivery History] [Audit]                                 |
| Delivery attempts list/table                                                |
+-----------------------------------------------------------------------------+
| [Dismiss Event]                                     [Confirm Reminder]      |
+-----------------------------------------------------------------------------+
```
### 8. Interaction Zones
Back nav, edit fields, tab switches, diagnostics CTA, sticky actions, confirm modal triggers.
### 9. States
Default, loading detail, low-confidence warning, validation error, save success, permission-restricted edit mode.
### 10. Responsive Behaviour
Desktop split view; tablet stacked panels; mobile accordion sections + fixed bottom action bar.
### 11. Figma Build Notes
Separate frame variants for `Editable` and `ReadOnly`; use tabs component with active-state variant; sticky action as reusable instance.

## S06 — Preferences
**Reference:** `screen-inventory.md`
### 1. Screen Purpose
Configure default reminder behavior for new events.
### 2. Primary User
Returning user updating global defaults.
### 3. Entry Points
Global nav, dashboard quick action.
### 4. Exit Paths
S03 dashboard.
### 5. Screen Layout
Page header; grouped settings cards; sticky save bar.
### 6. Regions
- **R1 Header**: title + last saved timestamp.
- **R2 Default Timing Card**: offsets and quiet hours.
- **R3 Calendar Sync Rules Card**: sync toggle, mode, and retry behavior.
- **R4 Notifications Card**: digest and alert preferences.
- **R5 Sticky Actions**: save/cancel/reset.
### 7. Actual Wireframe Representation
```text
[Preferences]                               Last saved: 2m ago
+--------------------------+--------------------------+
| Default Timing           | Calendar Sync Rules      |
| offset [30m v]           | [x] Google Calendar sync |
| quiet hrs [22:00-07:00]  | sync mode [Auto v]       |
| weekend behavior [Skip]  | retry policy [Standard]  |
+--------------------------+--------------------------+
+-----------------------------------------------------+
| Notification Preferences                             |
| [ ] Daily digest   [x] Failure alerts               |
+-----------------------------------------------------+
| [Reset to defaults]                  [Save Changes] |
+-----------------------------------------------------+
```
### 8. Interaction Zones
Form controls, save/cancel/reset actions.
### 9. States
Default, dirty, saving, validation errors, success toast, server error banner.
### 10. Responsive Behaviour
Desktop two-column cards; tablet mixed; mobile single-column stack with sticky save.
### 11. Figma Build Notes
Use card + form-field components only; consistent label widths desktop; one-column auto layout mobile.

## S07 — Integrations
**Reference:** `screen-inventory.md`
### 1. Screen Purpose
Show provider health and allow reconnect/test actions.
**Trace:** FR-02, FR-09, US-02, US-09
### 2. Primary User
Users troubleshooting Google integration and calendar sync issues.
### 3. Entry Points
Global nav, alerts on S03/S08, onboarding.
### 4. Exit Paths
S03/S08.
### 5. Screen Layout
Header with health summary; integrations list cards/table; action drawer/modal for reconnect and testing.
### 6. Regions
- **R1 Health Summary**: overall status chips.
- **R2 Integrations List**: provider rows with status + last checked.
- **R3 Action Panel**: reconnect, reauthorize, test.
### 7. Actual Wireframe Representation
```text
[Integrations] 2 healthy / 1 action needed
+----------------------------------------------------------------+
| Provider | Status    | Last check | Actions                    |
| Google OAuth   | Healthy   | 1m ago     | [Manage]            |
| Gmail API      | Healthy   | 2m ago     | [Reauthorize]       |
| Google Calendar| Expired   | 5m ago     | [Reconnect] [Test]  |
+----------------------------------------------------------------+
[Modal: Reconnect Google Calendar]
| Credentials fields / OAuth note |
| [Cancel]              [Reconnect] |
```
### 8. Interaction Zones
Row actions, modal form controls, test triggers.
### 9. States
Default, testing/loading, failed reconnect, success reconnect, permission denied.
### 10. Responsive Behaviour
Desktop table + modal; tablet compact table; mobile list cards with bottom-sheet actions.
### 11. Figma Build Notes
Table/list dual component; modal and bottom-sheet variants share same form content.

## S08 — Activity & Diagnostics
**Reference:** `screen-inventory.md`
### 1. Screen Purpose
Trace extraction and calendar sync attempts, identify failures, and trigger retries.
**Trace:** FR-09, FR-10, US-07, US-09
### 2. Primary User
Users/support-oriented operators.
### 3. Entry Points
Global nav, event detail diagnostics CTA, dashboard alerts.
### 4. Exit Paths
S07 for fixes, S05 event detail, S03 dashboard.
### 5. Screen Layout
Header; filter strip; timeline/table hybrid; details drawer; retry controls.
### 6. Regions
- **R1 Header**: title + export placeholder + time scope.
- **R2 Filter Strip**: status/sync state/date controls.
- **R3 Timeline/Table**: attempts list with state badges.
- **R4 Detail Drawer**: selected attempt metadata.
- **R5 Retry Actions**: contextual buttons.
### 7. Actual Wireframe Representation
```text
[Activity & Diagnostics]                       Last 7 days [v]
[Search attempts...][Status v][Sync State v][Date v][Reset]
+------------------------------------------------+-------------------+
| 10:02 Failed  Event: Client QBR    [View]      | Attempt Details   |
| 09:55 Sent    Event: Team Sync     [View]      | Error: Token exp. |
| 09:22 Retried Event: Client QBR    [View]      | Provider: Google Calendar |
+------------------------------------------------+-------------------+
| [Retry Failed Attempts] [Go to Integrations]                      |
+-------------------------------------------------------------------+
```
### 8. Interaction Zones
Filters, row selection, drawer links, retry buttons.
### 9. States
Default, loading timeline, empty period, error fetching logs, retry success/error.
### 10. Responsive Behaviour
Desktop split with drawer; tablet drawer collapses below list; mobile full-screen detail route.
### 11. Figma Build Notes
Build row states as variants (`Sent`, `Failed`, `Retried`); keep drawer as reusable component with open/closed states.

## S09 — Account & Session Settings
**Reference:** `screen-inventory.md`
### 1. Screen Purpose
Manage profile, timezone/account preferences, active sessions, and sign-out/security actions.
### 2. Primary User
Authenticated user managing account and session posture.
### 3. Entry Points
Profile menu from S03-S08.
### 4. Exit Paths
S03 dashboard, S01 after sign-out.
### 5. Screen Layout
Header with account identity; preferences form; active session list; security action zone.
### 6. Regions
- **R1 Header**: avatar, account email, last activity.
- **R2 Profile & Locale**: editable profile/timezone settings.
- **R3 Active Sessions**: device/session table with revoke actions.
- **R4 Security Actions**: sign-out all, password/account security controls.
### 7. Actual Wireframe Representation
```text
[Account & Session Settings]                           [Save Changes]
+--------------------------------------------------------------------+
| Profile: Name [........]   Email [readonly]   Timezone [UTC+05:30] |
+--------------------------------------------------------------------+
| Active Sessions                                                      |
| Device              | Location     | Last Active | Action           |
| Chrome / MacBook    | Bengaluru    | now         | [Revoke]         |
| Mobile App / iPhone | Bengaluru    | 2h ago      | [Revoke]         |
+--------------------------------------------------------------------+
| [Sign out all sessions]                               [Sign out]    |
+--------------------------------------------------------------------+
```
### 8. Interaction Zones
Profile fields, save action, session revoke controls, sign-out/sign-out-all controls.
### 9. States
Default, loading profile/sessions, validation error, revoke success/error, sign-out success.
### 10. Responsive Behaviour
Desktop table + form cards; tablet compact table; mobile stacked session cards with inline actions.
### 11. Figma Build Notes
Reuse settings-card and table/list components; keep security actions visually separated and high-emphasis.
