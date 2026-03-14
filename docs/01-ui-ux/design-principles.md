# Design Principles

## 1. Purpose
Define the UI system rules that make screens consistent, readable, accessible, and directly executable in Figma and Dev Mode handoff.

## 2. Layout System
- Use a 12-column desktop grid (max content width 1280).
- Tablet uses 8 columns; mobile uses 4 columns.
- Standard page shell: top app bar + side navigation + content canvas.
- Content canvas uses modular regions: page header, summary region, controls region, primary content, contextual detail.

## 3. Spacing System
- Base unit: 4px.
- Common spacing tokens: 4, 8, 12, 16, 24, 32, 40, 48.
- Section gaps: 24 desktop, 20 tablet, 16 mobile.
- Card internal padding: 16 default, 20 for dense form panels.

## 4. Typography Hierarchy
- H1: page title and onboarding step title.
- H2: region heading.
- H3: card/group heading.
- Body: default reading text and form labels.
- Caption/meta: timestamps, status support text.
- Keep line length in dense pages below ~90 characters.

## 5. Color Role Guidance
- **Primary:** major CTA and active navigation.
- **Neutral:** surfaces, separators, low-fidelity wireframes.
- **Success/Warning/Error/Info:** feedback and state labels.
- Status colors must be accompanied by icon/text labels.

## 6. Elevation and Shadow Usage
- Base cards: subtle elevation only.
- Sticky bars and modals: stronger elevation to signal layered interaction.
- Avoid stacking multiple high-elevation containers in same viewport.

## 7. Borders and Radius Rules
- Default radius: 10-12px for cards/inputs.
- Small radius: 6-8px for chips and badges.
- Border emphasis over shadow in low-fidelity artifacts.
- Use 1px neutral border for most containers.

## 8. Icon Usage
- Use icons to reinforce actions/status, never as sole indicator.
- Keep icon set stylistically consistent.
- Pair icon + text in alerts, tabs, and row actions where ambiguity exists.

## 9. Content Density Rules
- Dashboard and activity can be data-dense but must preserve visual grouping.
- Forms should avoid more than two input columns on desktop and one on mobile.
- Prefer progressive disclosure for secondary diagnostics content.

## 10. Form Design Rules
- Labels always visible (no placeholder-only labels).
- Inline validation displayed near the field plus summary on submit if needed.
- Primary save action remains visible (desktop header or mobile sticky footer).
- Destructive actions require explicit confirmation modal.

## 11. Table/List Readability Rules
- Use sticky header for long tables on desktop.
- Keep key columns visible without horizontal scroll at baseline breakpoints.
- Mobile transforms row content into stacked key-value cards.
- Surface status and next action prominently in each row/card.

## 12. Responsive Principles
- Preserve task completion path, not exact visual parity.
- Collapse layout regions in this order: right rail -> multi-column body -> dense controls.
- Convert side navigation to drawer or icon rail.
- Prioritize CTA and state messaging at top of mobile viewport.

## 13. Accessibility Principles
- WCAG 2.1 AA contrast and keyboard navigation baseline.
- Logical heading order and landmark usage (`header`, `nav`, `main`, `aside`, `footer`).
- Focus states must be visible and consistent.
- Announce async updates via live regions.
- Minimum touch target size: 44x44.

## 14. Figma System Conventions

### 14.1 Figma Page Structure
- `00 Foundations` (type, color, spacing tokens)
- `01 Grid & Layout` (desktop/tablet/mobile guides)
- `02 Components` (primitives + composites)
- `03 Screens` (S01-S09 frames)
- `04 Flows` (F1-F5 sequences)
- `05 Handoff` (annotated edge cases)

### 14.2 Frame Naming Conventions
`{ScreenID}_{ScreenName}/{Breakpoint}/{State}`
- Example: `S05_EventDetail/Desktop/Default`
- Example: `S04_EventsList/Mobile/Empty`

### 14.3 Component Naming Conventions
`{Category}/{Component}/{Variant}`
- Example: `Navigation/TopNav/Authenticated`
- Example: `Input/TextField/WithHelper`

### 14.4 Variant Naming Conventions
- Use property axes: `State`, `Size`, `Emphasis`, `Icon`, `Density`.
- Keep property values consistent: `Default|Hover|Focus|Disabled|Loading|Error|Success`.

### 14.5 Variables/Styles/Tokens Naming
- Colors: `color.role.primary.default`
- Spacing: `space.16`, `space.24`
- Radius: `radius.md`, `radius.lg`
- Typography: `type.body.md`, `type.heading.h2`

### 14.6 Reusable Component Rules
- Build primitives first, then assemble feature composites.
- Do not detach instances in screen files unless documenting an exception.
- Keep component descriptions updated with usage constraints.

### 14.7 Auto Layout Rules
- Use auto layout for all repeatable stacks and rows.
- Avoid absolute positioning except overlays and annotation pins.
- Define min/max width on table cells, cards, and filters where needed.

### 14.8 Layout Guide Rules
- Apply guide sets per breakpoint frame.
- Align section starts to the same column grid lines.
- Keep page header, filters, and content edges consistent across screens.

### 14.9 Dev Mode Friendly Rules
- Name layers semantically (no `Rectangle 123`).
- Document interaction intent in frame descriptions.
- Include spacing/size token references where non-obvious.
- Keep variants complete so engineers can inspect state rules directly.
