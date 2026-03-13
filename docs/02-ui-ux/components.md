# UI Components

## 1. Purpose
Define conceptual component inventory, expected behavior, and reuse patterns to align design and frontend implementation.

## 2. Component Strategy
- Build from reusable primitives and composable feature components.
- Maintain consistent state handling contract (loading, empty, error, success).
- Separate domain logic from presentation; keep UI components declarative.
- Centralize accessibility expectations per component category.

## 3. Global Components

### AppShell
- **Purpose:** Provides persistent layout with global navigation and top utility controls.
- **Where used:** All authenticated screens.
- **Props/inputs (conceptual):** current route, nav items, notification counts.
- **States:** default, compact nav, loading nav.
- **Accessibility expectations:** landmark roles (`nav`, `main`), skip-to-content.
- **Responsive behavior:** collapsible nav on small screens.
- **Reuse guidance:** shared across modules; avoid feature-specific branching.

### PageHeader
- **Purpose:** Standardized title/context/action pattern.
- **Where used:** All primary screens.
- **Props:** title, subtitle, breadcrumb (optional), primary/secondary actions.
- **States:** default, with banner, loading placeholder.
- **Accessibility:** heading semantics and focus target on route load.
- **Responsive:** actions collapse to overflow menu on mobile.
- **Reuse guidance:** use as top content anchor for orientation.

## 4. Feature Components

### EventStatusCard
- **Purpose:** Summarize single event status and key metadata.
- **Where used:** Dashboard queue, Events list card mode.
- **Props:** event title/time/status/confidence/channel.
- **States:** normal, attention-required, failed, selected.
- **Accessibility:** full-card keyboard focus and descriptive status text.
- **Responsive:** compact metadata stack on mobile.
- **Reuse guidance:** status vocabulary must match backend lifecycle.

### ReminderEditorPanel
- **Purpose:** Edit reminder timing and channel at event level.
- **Where used:** Event Detail, quick-edit modal.
- **Props:** default schedule, current overrides, available channels.
- **States:** pristine, dirty, saving, validation error, saved.
- **Accessibility:** labeled controls and inline error associations.
- **Responsive:** stacked controls with sticky save action on mobile.
- **Reuse guidance:** same validation rules as Preferences defaults.

## 5. Layout Components
- SplitView (list/detail)
- SectionCard (grouped content with title and body)
- StickyActionBar (save/cancel container)
- EmptyStatePanel (illustration/text/action slot)

## 6. Form Components
- TextInput, SelectInput, DateTimeInput, ToggleSwitch, RadioGroup.
- Support helper text, validation message, optional/required markers.
- Support disabled/read-only states with clear semantics.

## 7. Feedback Components
- Toast (ephemeral confirmations)
- InlineAlert (localized warnings/errors)
- PersistentBanner (cross-page unresolved issues)
- ConfirmDialog (destructive or irreversible operations)
- ProgressIndicator (async operations)

## 8. Data Display Components
- StatusBadge
- MetricsCard
- DataTable / CardList responsive pair
- TimelineList for delivery attempts
- DetailKeyValueList for metadata panels

## 9. Navigation Components
- GlobalNav
- BreadcrumbTrail
- TabNav for sub-sections
- FilterBar with chips and reset controls
- Pagination / infinite-load trigger depending on context

## 10. Empty / Loading / Error Components
- **EmptyStatePanel:** contextual explanation + action.
- **LoadingSkeleton:** avoid layout shift and preserve content expectation.
- **ErrorStatePanel:** actionable recovery (`Retry`, `Go to Integrations`, `Contact Support`).
- **NoResultsState:** clarifies active filters and one-click reset.

## 11. Accessibility Notes
- All interactive elements require keyboard and screen reader support.
- `aria-live` regions for async save/retry outcomes.
- Focus trap in modal/dialog components.
- StatusBadge should have accessible labels independent of color.

## 12. State Variants
Every major component should document and support:
- idle/default
- loading
- empty
- validation error
- system error
- success confirmation
- disabled (where relevant)

## 13. Reuse Guidance
- Prefer composing existing shared components over adding feature-specific duplicates.
- Introduce new variants only when semantics or behavior differ materially.
- Maintain component naming aligned with domain language used in product docs.
- Keep presentation props stable to simplify QA coverage.

## 14. Mapping to Frontend Implementation
- Component implementation target: `apps/web` feature modules and shared UI package patterns described in `docs/01-tech-spec/frontend-spec.md`.
- Shared primitives should align with repository rule for reusable UI in `packages/ui`.
- Screen-to-component mapping:
  - Dashboard -> AppShell, PageHeader, MetricsCard, EventStatusCard, PersistentBanner
  - Events List -> FilterBar, DataTable/CardList, StatusBadge
  - Event Detail -> ReminderEditorPanel, DetailKeyValueList, ConfirmDialog
  - Preferences -> SectionCard, form components, StickyActionBar
  - Activity -> TimelineList, InlineAlert, ErrorStatePanel

## 15. Open Questions / Gaps
1. Which component APIs should be frozen for MVP to avoid churn during parallel feature development?
2. Do we need virtualization strategy for large event/activity datasets in V1?
3. Should status badges support localization in MVP or post-launch hardening?

**Cross references:** `screen-inventory.md`, `user-flows.md`, `wireframes.md`, `docs/01-tech-spec/frontend-spec.md`.
