# UI Mockups (High-Fidelity Intent Companion)

## 1. Purpose
Translate wireframe structures into high-fidelity guidance that a product designer can execute in Figma with clear hierarchy, component choices, and behavior expectations.

## 2. Mockup Specs by Screen

## S01 — Login & Consent
**Reference:** `screen-inventory.md`
- **Visual intent:** calm, trustworthy entry screen with single dominant CTA.
- **Information hierarchy:** app identity -> value proposition -> sign-in CTA -> legal/support links.
- **Visible regions:** minimal top bar, auth card, helper text footer.
- **Component mix:** button primary, text links, inline alert, optional loading spinner.
- **Headline/CTA placement:** centered card; CTA directly below consent copy.
- **State treatments:** disabled CTA during OAuth, inline permission error, success redirect indicator.
- **Responsive:** mobile card fills width with 16px gutters.
- **Figma notes:** keep this screen intentionally sparse; one reusable auth-card component.

## S02 — Onboarding Wizard
**Reference:** `screen-inventory.md`
- **Visual intent:** guided setup with strong progress clarity.
- **Hierarchy:** progress stepper -> section title -> form groups -> sticky actions.
- **Visible regions:** step header, form column, contextual guidance panel, sticky footer.
- **Component mix:** steppers, text/select inputs, toggles, inline helper, test action buttons.
- **Filter/search/sort:** not applicable.
- **State treatments:** field validation, calendar connectivity test success/error chips, completion toast.
- **Responsive:** right guidance panel collapses below form on tablet/mobile.
- **Figma notes:** design each step as variant of same frame shell.

## S03 — Dashboard
**Reference:** `screen-inventory.md`
- **Visual intent:** high-confidence command center; immediate visibility into actions needed.
- **Hierarchy:** page title/primary CTA -> KPI cards -> attention queue -> upcoming reminders -> Google integration health.
- **Visible regions:** app shell, KPI row, queue cards, table block, right health rail.
- **Component mix:** nav shell, metric cards, event cards, badges, alerts, table rows.
- **Headline/CTA placement:** top-right CTA "View All Events" or "Review Queue".
- **State treatments:** skeleton cards/table, empty queue panel, outage banner.
- **Responsive:** right rail moves beneath main content; table becomes card list on mobile.
- **Figma notes:** build dashboard with reusable region frames to support future widgets.

## S04 — Events List
**Reference:** `screen-inventory.md`
- **Visual intent:** efficient triage workspace.
- **Hierarchy:** title + result count -> filter/search toolbar -> sortable dataset -> pagination.
- **Visible regions:** header, toolbar, table/list body, pagination.
- **Component mix:** search bar, filter chips, tabs, table, badges, inline row actions.
- **Filter/search/sort placement:** persistent directly beneath header.
- **State treatments:** no results with clear reset action, API error row block.
- **Responsive:** mobile uses card list with status and primary action pinned per card.
- **Figma notes:** desktop and mobile should share one content schema.

## S05 — Event Detail
**Reference:** `screen-inventory.md`
- **Visual intent:** focused decision screen balancing context and action.
- **Hierarchy:** event context header -> details/reminder split -> history tab content -> sticky action.
- **Visible regions:** header with status, metadata panel, editor panel, tabbed history, sticky footer.
- **Component mix:** tabs, key-value lists, form controls, alerts, callout cards, confirmation modal.
- **CTA placement:** confirm/dismiss in persistent lower action zone.
- **State treatments:** low-confidence warning callout, edit validation, save success toast.
- **Responsive:** split view collapses to sequential sections with sticky bottom CTA.
- **Figma notes:** include read-only variant for permission-limited mode.

## S06 — Preferences
**Reference:** `screen-inventory.md`
- **Visual intent:** structured configuration panel emphasizing safe edits.
- **Hierarchy:** title/metadata -> grouped setting cards -> sticky save.
- **Visible regions:** timing rules, calendar sync defaults, notification settings.
- **Component mix:** inputs, toggles, grouped cards, alerts, sticky actions.
- **State treatments:** dirty indicator, inline validation, save success confirmation.
- **Responsive:** settings cards stack to single column with clear section dividers.
- **Figma notes:** all fields should map to reusable form component instances.

## S07 — Integrations
**Reference:** `screen-inventory.md`
- **Visual intent:** clear Google integration health board.
- **Hierarchy:** health summary -> Google provider list -> contextual action modal/drawer.
- **Visible regions:** status chips, integrations table/cards, reconnect/test surface for Google OAuth, Gmail, Calendar.
- **Component mix:** status badges, table rows, secondary action buttons, modal/drawer forms.
- **State treatments:** reconnect loading, invalid auth error, connection restored success.
- **Responsive:** action modal becomes bottom sheet on mobile.
- **Figma notes:** status indicators should use same tokens as dashboard/activity.

## S08 — Activity & Diagnostics
**Reference:** `screen-inventory.md`
- **Visual intent:** audit-centric timeline with actionable recovery.
- **Hierarchy:** scope controls -> event attempts list -> selected-attempt detail -> retry actions.
- **Visible regions:** header, filters, timeline/table, detail drawer, footer actions.
- **Component mix:** filters, badges, table/timeline entries, drawer, retry CTA buttons.
- **Filter/search/sort placement:** always visible at top of dataset region.
- **State treatments:** empty time range panel, log-fetch error alert, retry outcome toasts.
- **Responsive:** detail drawer becomes dedicated route/sheet on mobile.
- **Figma notes:** build reusable timeline row component with explicit state variants.

## S09 — Account & Session Settings
**Reference:** `screen-inventory.md`
- **Visual intent:** trustworthy account control surface with clear session risk visibility.
- **Hierarchy:** account identity -> editable profile/preferences -> active sessions -> security actions.
- **Visible regions:** profile card, locale/timezone form fields, sessions table/list, security action strip.
- **Component mix:** form inputs, table/list rows, badges, destructive and neutral action buttons, confirmation modal.
- **CTA placement:** primary save in header; sign-out actions separated at bottom.
- **State treatments:** session revoke success/error, save success toast, destructive confirm modal for sign-out-all.
- **Responsive:** sessions table becomes card list with device and last-active metadata prioritized.
- **Figma notes:** align typography and spacing with S06 settings patterns for consistency.

## 3. Traceability and MVP Scope Notes
- Calendar sync-focused UX states should be visible on S03, S05, S07, and S08. Trace: FR-09, US-09.
- Duplicate prevention context should be visually obvious in list/detail states. Trace: FR-10, US-07.
- Extraction confidence treatments remain explicit in detail/review surfaces. Trace: FR-04, US-05.
- WhatsApp/SMS mention is permitted only as disabled roadmap copy labeled Post-MVP.

## 4. Cross-Screen Visual Consistency Rules
- Keep page header structure consistent on S03-S08.
- Keep status badge color/text taxonomy identical across cards, tables, and timeline.
- Keep sticky save/retry patterns consistent for trust and muscle memory.
- Keep spacing rhythm (24/16/8) consistent across all major frames.
