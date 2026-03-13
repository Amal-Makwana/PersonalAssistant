# UI Mockups

## 1. Purpose
Provide text-based mockup definitions that describe intended visual structure and interactions for each core screen until high-fidelity design assets are finalized.

## 2. Mockup Coverage
Included: Login, Onboarding Wizard, Dashboard, Events List, Event Detail, Preferences, Integrations Overview, Activity.

## 3. Screen-by-Screen Mockup Definitions

### Mockup: Login
- **Screen title:** Secure Sign-In
- **Purpose:** Authenticate quickly and communicate trust.
- **Layout structure:** Centered auth panel over lightweight branded background.
- **Primary regions:** Header/value statement, primary sign-in CTA, legal/support links.
- **Controls:** Google sign-in button, help link.
- **Key actions:** Start authentication.
- **State variations:** Idle, sign-in in-progress, auth error.
- **Desktop/mobile considerations:** Maintain readable margins and full-width CTA on mobile.

### Mockup: Onboarding Wizard
- **Screen title:** Get Started
- **Purpose:** Configure minimum viable setup for reminders.
- **Layout structure:** Stepper header + form body + persistent action footer.
- **Primary regions:** Step indicator, config form, integration cards, summary confirmation.
- **Controls:** Toggles, selectors, connect buttons, continue/back controls.
- **Key actions:** Save step, connect channels, finish setup.
- **State variations:** Incomplete step, validation error, connected success state.
- **Desktop/mobile considerations:** Single-column steps on mobile; side contextual help on desktop.

### Mockup: Dashboard
- **Screen title:** Reminder Operations Overview
- **Purpose:** Prioritize user action based on urgency and risk.
- **Layout structure:** Top KPI row, middle attention queue, lower upcoming timeline.
- **Primary regions:** Metrics cards, action queue, integration health panel.
- **Controls:** Filters, quick actions, deep-link buttons.
- **Key actions:** Review event, reconnect provider, open activity detail.
- **State variations:** Healthy state, attention required state, partial load failure.
- **Desktop/mobile considerations:** KPI cards wrap into carousel/stack on mobile.

### Mockup: Events List
- **Screen title:** Events
- **Purpose:** Triage and manage event reminders.
- **Layout structure:** Sticky search/filter row + table/list results.
- **Primary regions:** Search, filters, list rows/cards, pagination.
- **Controls:** Search input, status/date filters, row action menu.
- **Key actions:** Open detail, bulk confirm.
- **State variations:** No results, loading skeleton, filter error.
- **Desktop/mobile considerations:** Table on desktop, card list with condensed metadata on mobile.

### Mockup: Event Detail
- **Screen title:** Event Detail
- **Purpose:** Validate extraction and adjust reminder plan.
- **Layout structure:** Two-column (summary left, actions right) desktop; stacked mobile.
- **Primary regions:** Event metadata, confidence card, reminder schedule editor, source snippet.
- **Controls:** Date/time controls, channel selector, save/confirm CTA.
- **Key actions:** Confirm, edit, retry.
- **State variations:** High-confidence auto-suggest, low-confidence warning, save conflict.
- **Desktop/mobile considerations:** Sticky action panel desktop; sticky footer CTA mobile.

### Mockup: Preferences
- **Screen title:** Reminder Preferences
- **Purpose:** Set defaults and global communication behavior.
- **Layout structure:** Sectioned settings cards with save bar.
- **Primary regions:** Timing defaults, channel toggles, quiet hours, timezone.
- **Controls:** Switches, selects, time inputs.
- **Key actions:** Save changes, reset section.
- **State variations:** Unsaved changes, validation errors, save success.
- **Desktop/mobile considerations:** Maintain grouped cards; collapse hints and help text on mobile.

### Mockup: Integrations Overview
- **Screen title:** Integrations
- **Purpose:** Display connection health and remediation actions.
- **Layout structure:** Provider card grid with health statuses.
- **Primary regions:** Provider status card, token/sync metadata, action controls.
- **Controls:** Connect/reconnect/disconnect buttons.
- **Key actions:** Reconnect provider.
- **State variations:** Connected, degraded, disconnected, reconnect in-progress.
- **Desktop/mobile considerations:** Single-column cards on mobile.

### Mockup: Activity & Diagnostics
- **Screen title:** Delivery Activity
- **Purpose:** Audit reminder outcomes and support recovery.
- **Layout structure:** Filter bar + timeline/list + detail drawer.
- **Primary regions:** Filters, activity rows, attempt detail panel.
- **Controls:** Channel filter, status filter, retry action.
- **Key actions:** Inspect and retry failed attempts.
- **State variations:** Empty range, all healthy, repeated failures.
- **Desktop/mobile considerations:** Inline drawer on desktop; full-screen detail on mobile.

## 4. Key Layout Regions
- Global navigation shell
- Page header with title and context actions
- Primary content region
- Supporting side panel/drawer where applicable
- Feedback layer (toasts, banners, modal dialogs)

## 5. Major UI States
- Loading (skeleton + progress indicators)
- Ready/default
- Empty (with guidance CTA)
- Validation error
- System error/retry
- Success confirmation

## 6. Interaction Notes
- Use optimistic UI only where rollback is low risk and clear.
- Disable duplicate-submit actions during async operations.
- Focus management: move focus to page heading on route changes.
- Preserve filter and scroll context when returning from detail to list.

## 7. Priority Screens
- Highest implementation priority: Onboarding Wizard, Dashboard, Events List, Event Detail, Preferences.
- Secondary priority: Integrations Overview, Activity, Account Settings.

## 8. MVP vs Future Screens
- **MVP:** All listed except advanced provider drill-down and support analytics export.
- **Future:** Saved views manager, admin role dashboards, advanced notification center.

## 9. Open Questions / Gaps
1. Are high-fidelity visual assets required before development kickoff for all MVP screens?
2. Should Activity detail support inline screenshot/log attachments for support workflows?
3. Is a dedicated “Needs Review” screen preferable to dashboard cards for high-volume users?

**References:** `wireframes.md`, `screen-inventory.md`, `design-principles.md`.
