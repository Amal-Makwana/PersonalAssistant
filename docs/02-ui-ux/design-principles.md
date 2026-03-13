# Design Principles

## 1. Purpose
Establish the decision framework for UI behavior, interaction quality, content strategy, and visual hierarchy across all product screens.

## 2. Core Design Principles
1. **Outcome-oriented design:** Every screen should clearly advance reminder confidence and commitment follow-through.
2. **Trust through transparency:** Show what the system did, what it will do next, and how users can intervene.
3. **Progressive complexity:** Optimize for common flows while preserving deeper controls for exception handling.

## 3. Clarity Principles
- Use direct, domain-consistent language.
- Keep one primary action per major panel.
- Distinguish system states with both labels and supportive context text.
- Avoid ambiguous timestamps; always include timezone context.

## 4. Consistency Principles
- Reuse layout scaffolds for list/detail screens.
- Keep badge taxonomy consistent (`Healthy`, `Needs Attention`, `Failed`, `Disconnected`).
- Preserve predictable CTA placement (primary action bottom-right desktop, sticky bottom mobile).
- Apply standardized form validation messaging patterns.

## 5. Efficiency Principles
- Support bulk actions for repetitive confirmations where risk is low.
- Minimize required fields in editable forms.
- Prefer inline edits for quick adjustments; use dedicated pages only for complex operations.
- Cache user filter preferences for frequent triage workflows.

## 6. Accessibility Principles
- Keyboard-operable navigation and controls.
- Minimum contrast ratios meeting WCAG 2.1 AA.
- Logical heading hierarchy and landmark usage.
- Error messages tied programmatically to input fields.
- Motion/animation kept subtle and reduced when user preference indicates.

## 7. Responsiveness Principles
- Start with mobile-safe single-column composition for critical flows.
- Reflow data tables into accessible card stacks on narrow screens.
- Preserve action availability regardless of viewport size.
- Keep touch targets >= 44x44 CSS pixels.

## 8. Feedback and Interaction Principles
- Immediate confirmation for completed actions (toast + inline state update).
- Persistent guidance for unresolved issues (banner/callout).
- Controlled confirmation for risky actions.
- Async operations must display progress and disable duplicate submissions.

## 9. Trust / Safety / Confidence Principles
- Clearly identify source of extracted data when confidence is low.
- Explain consequences before disabling channels or disconnecting providers.
- Provide audit visibility for preference changes and retries.
- Avoid overstating automation certainty; communicate when user review is needed.

## 10. Content and Microcopy Principles
- Keep microcopy short, action-focused, and non-technical.
- Use sentence case and plain language.
- Align verbs with user intent: `Review`, `Confirm`, `Retry`, `Reconnect`, `Save`.
- Replace blame language with guidance-oriented messaging.

## 11. Visual Hierarchy Principles
- Prioritize attention with size/contrast before color intensity.
- Place status summary above detailed metadata.
- Use spacing and grouping to express relationships.
- Reserve destructive color semantics for destructive actions only.

## 12. Open Questions / Gaps
1. Should a formal design token system be documented in `docs/03-design` before implementation starts?
2. What is the preferred iconography system and fallback strategy for accessibility?
3. Are there regulatory copy requirements for consent and data retention messaging in target regions?

**Related references:** `ui-overview.md`, `wireframes.md`, `components.md`, `docs/01-tech-spec/frontend-spec.md`.
