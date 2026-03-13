# UI Components (Figma-Ready Specification)

## 1. Purpose
Define reusable components, variants, and properties so screens can be assembled consistently in Figma and implemented with predictable behavior.

## 2. Component Index
- C01 Top Navigation
- C02 Button
- C03 Text Link
- C04 Text/Date Input
- C05 Select
- C06 Toggle / Checkbox / Radio controls
- C07 Side Navigation
- C08 Page Header
- C09 Event Card
- C10 Data Table / Card List
- C11 Search Bar
- C12 Info Card / Panel
- C13 Tabs
- C14 Filter Bar
- C15 Status Badge
- C16 Pagination
- C17 Sticky Action Bar
- C18 Alert (inline/banner)
- C19 Toast
- C20 Modal / Drawer
- C21 Empty State Panel

## 3. Specifications

### C02 — Button
- **Category:** Action
- **Purpose:** Primary and secondary task execution.
- **Usage locations:** All screens.
- **Anatomy:** container, label, optional icon, loading indicator.
- **Child elements:** icon-left/right optional.
- **Variants:** Primary, Secondary, Tertiary, Destructive.
- **Component properties:** `State`, `Size`, `Icon`, `FullWidth`.
- **Interaction states:** default, hover, focus, pressed, disabled, loading.
- **Content rules:** verb-first labels; max ~24 chars.
- **Accessibility:** focus ring, 44x44 minimum target.
- **Responsive:** full-width option on mobile forms.
- **Figma guidance:** one component set with property controls.
- **Screen mapping:** S01-S09.

### C04 — Text/Date Input
- **Category:** Form
- **Purpose:** Capture structured and freeform values.
- **Usage:** S02, S05, S06, S09.
- **Anatomy:** label, input field, helper/error text, optional prefix/suffix.
- **Variants:** Text, DateTime, ReadOnly.
- **Properties:** `State`, `HasHelper`, `HasError`, `Required`.
- **States:** default, focus, filled, disabled, error.
- **Content rules:** sentence-case labels; helper text concise.
- **Accessibility:** explicit label association and error announcement.
- **Responsive:** label above field on mobile.
- **Figma guidance:** avoid detached text layers; expose helper slot.
- **Screen mapping:** S02, S05, S06, S09.

### C05 — Select
- **Category:** Form
- **Purpose:** Controlled option selection.
- **Usage:** S02, S05, S06, S08.
- **Anatomy:** label, trigger field, chevron, options list.
- **Variants:** Single, Multi-select, Searchable.
- **Properties:** `State`, `SelectionCount`, `HasLabel`.
- **States:** default, open, selected, disabled, error.
- **Accessibility:** keyboard open/close and arrow navigation.
- **Responsive:** options panel becomes bottom sheet on mobile.
- **Screen mapping:** S02, S05, S06, S08.

### C06 — Toggle / Checkbox / Radio Group
- **Category:** Form selection controls
- **Purpose:** Binary and grouped preference decisions.
- **Usage:** S02, S06, S07.
- **Anatomy:** control, label, optional helper text.
- **Variants:** Toggle, Checkbox, Radio.
- **Properties:** `Checked`, `Disabled`, `Error`.
- **States:** default, hover, focus, checked, disabled.
- **Accessibility:** announce state and group labels.
- **Responsive:** preserve spacing and touch target size.
- **Screen mapping:** S02, S06, S07.

### C07 — Side Navigation
- **Category:** Navigation
- **Purpose:** Primary app section switching.
- **Usage:** S03-S08.
- **Anatomy:** logo area, nav items, active marker, collapse control.
- **Variants:** Expanded, Icon-only, Drawer.
- **Properties:** `ActiveItem`, `Collapsed`.
- **States:** default, hover, active, disabled item.
- **Accessibility:** `nav` landmark, active page semantics.
- **Responsive:** drawer mode on mobile.
- **Screen mapping:** S03-S08.

### C08 — Page Header
- **Category:** Layout
- **Purpose:** Screen-level orientation and key actions.
- **Usage:** S03-S08.
- **Anatomy:** title/subtitle, metadata, primary/secondary CTAs.
- **Variants:** Standard, WithStatus, WithBreadcrumb.
- **Properties:** `HasCTA`, `HasSubtitle`, `HasStatus`.
- **States:** default, compact, loading placeholder.
- **Screen mapping:** S03-S08.

### C09 — Event Card
- **Category:** Data display
- **Purpose:** Summarize event for queue/list contexts.
- **Usage:** S03, S04 mobile.
- **Anatomy:** title, time, confidence badge, status, quick action.
- **Variants:** ReviewNeeded, Scheduled, Failed.
- **Properties:** `Status`, `ConfidenceLevel`, `Selected`.
- **States:** default, hover, selected.
- **Screen mapping:** S03, S04.

### C10 — Data Table / Card List
- **Category:** Data display
- **Purpose:** Dense sortable datasets with fallback card mode.
- **Usage:** S04, S07, S08, S03 (upcoming list).
- **Anatomy:** header row, body rows/cards, action column.
- **Variants:** Table, Compact Table, Card List.
- **Properties:** `Density`, `HasSelection`, `HasPagination`.
- **States:** loading rows, empty, error row, populated.
- **Accessibility:** column headers, row focus, semantic table roles.
- **Responsive:** auto-switch to card list under mobile breakpoint.
- **Screen mapping:** S03, S04, S07, S08.

### C11 — Search Bar
- **Category:** Navigation/filter
- **Purpose:** Query within current data scope.
- **Usage:** S03, S04, S08.
- **Variants:** Inline, Expanded.
- **Properties:** `HasClear`, `HasSuggestions`.
- **States:** idle, typing, populated, no-result.
- **Screen mapping:** S03, S04, S08.

### C12 — Info Card / Panel
- **Category:** Layout/content
- **Purpose:** Group related metadata or guidance.
- **Usage:** S03, S05, S08.
- **Variants:** Neutral, Warning, Success.
- **Properties:** `Tone`, `HasAction`.
- **Screen mapping:** S03, S05, S08.

### C13 — Tabs
- **Category:** Navigation (local)
- **Purpose:** Switch between related sub-views.
- **Usage:** S05, S08.
- **Variants:** Underline, Pills.
- **Properties:** `ActiveTab`, `HasBadge`.
- **States:** default, hover, active, disabled.
- **Screen mapping:** S05, S08.

### C14 — Filter Bar
- **Category:** Filtering
- **Purpose:** Combine search, selects, and chips for quick narrowing.
- **Usage:** S04, S08.
- **Anatomy:** search slot, filter controls, active chips, reset action.
- **Variants:** Compact, Full.
- **Properties:** `FilterCount`, `HasChips`.
- **States:** default, filtered, no results.
- **Screen mapping:** S04, S08.

### C15 — Status Badge
- **Category:** Feedback
- **Purpose:** Communicate lifecycle state.
- **Usage:** S03-S08.
- **Variants:** NeedsReview, Scheduled, Sent, Failed, Retried.
- **Properties:** `Status`.
- **States:** static visual state per status.
- **Accessibility:** always pair icon/color with text.
- **Screen mapping:** S03, S04, S05, S07, S08.

### C16 — Pagination
- **Category:** Navigation/data
- **Purpose:** Navigate long datasets.
- **Usage:** S04, S08.
- **Variants:** Full, Compact.
- **Properties:** `CurrentPage`, `TotalPages`.
- **States:** default, disabled prev/next.
- **Screen mapping:** S04, S08.

### C17 — Sticky Action Bar
- **Category:** Layout/action
- **Purpose:** Keep critical save actions visible.
- **Usage:** S02, S05, S06.
- **Variants:** Dual action, Single primary.
- **Properties:** `Dirty`, `HasSecondary`.
- **States:** idle, saving, success, error.
- **Screen mapping:** S02, S05, S06.

### C18 — Alert
- **Category:** Feedback
- **Purpose:** Surface contextual warning/error/info.
- **Usage:** S01-S08.
- **Variants:** Inline, Banner.
- **Properties:** `Tone`, `Dismissible`, `HasCTA`.
- **States:** visible, dismissed.
- **Screen mapping:** S01-S08.

### C19 — Toast
- **Category:** Feedback
- **Purpose:** Ephemeral confirmation/error messaging.
- **Usage:** S02, S05, S06, S07, S09.
- **Variants:** Success, Error, Info.
- **Properties:** `Tone`, `Duration`.
- **Screen mapping:** S02, S05, S06, S07, S09.

### C20 — Modal / Drawer
- **Category:** Overlay
- **Purpose:** Blocking confirmations and contextual edits.
- **Usage:** S05, S07, S08, S09.
- **Variants:** Modal, Right Drawer, Bottom Sheet.
- **Properties:** `Size`, `Dismissible`, `HasFooterActions`.
- **States:** open, closing, loading.
- **Accessibility:** focus trap and escape behavior.
- **Screen mapping:** S05, S07, S08, S09.

### C21 — Empty State Panel
- **Category:** Feedback/placeholder
- **Purpose:** Explain absence of data with next action.
- **Usage:** S03, S04, S08.
- **Anatomy:** icon, title, helper text, action button.
- **Variants:** NoData, NoResults, NoAccess.
- **Properties:** `Type`, `HasAction`.
- **Screen mapping:** S03, S04, S08.

## 4. Figma Construction Rules
- Build component sets with explicit property controls.
- Keep text layers tokenized and named semantically.
- Create state variants before screen composition.
- Use instances in screens; do not redraw repeat patterns.

## 5. Screen Mapping Matrix
| Screen | Primary components |
|---|---|
| S01 | C02, C03, C18 |
| S02 | C04, C05, C06, C17, C19 |
| S03 | C01, C07, C08, C09, C10, C15, C18 |
| S04 | C08, C10, C11, C14, C15, C16, C21 |
| S05 | C08, C04, C05, C12, C13, C17, C18, C20 |
| S06 | C08, C04, C05, C06, C17, C19 |
| S07 | C08, C10, C15, C18, C19, C20 |
| S08 | C08, C10, C12, C14, C15, C16, C20, C21 |
| S09 | C04, C02, C19, C20 |
