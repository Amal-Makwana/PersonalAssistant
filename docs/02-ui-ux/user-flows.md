# User Flows

## 1. Purpose
Define end-to-end interaction paths for major user goals, including success, alternate, empty, and failure outcomes.

## 2. Flow Design Principles
- Keep critical flows linear and short.
- Make system status visible at every transition.
- Provide clear rollback/recovery actions for failures.
- Ensure parity between keyboard and pointer/touch interactions.

## 3. Primary Flows

### Flow A: First-Time Onboarding and Channel Setup
- **Actor:** New authenticated user
- **Trigger:** User completes Google OAuth callback
- **Preconditions:** User account created; no delivery channels configured
- **Main steps:**
  1. Onboarding intro explains automation scope and permissions.
  2. User confirms timezone and default reminder lead time.
  3. User connects WhatsApp (required for MVP default path).
  4. Optional SMS and Calendar sync prompts shown.
  5. Success screen confirms monitoring is active and routes to Dashboard.
- **Alternate steps:** User skips optional integrations.
- **Failure paths:** OAuth scope mismatch, provider connect timeout, invalid phone verification.
- **Completion state:** `OnboardingComplete=true`, at least one channel enabled.

### Flow B: Review Newly Detected Event
- **Actor:** Returning user
- **Trigger:** New event appears with status `Detected`.
- **Preconditions:** Gmail integration healthy.
- **Main steps:**
  1. User opens Dashboard “Needs attention” card.
  2. User navigates to Event Detail.
  3. User verifies extracted title/date/time and reminder schedule.
  4. User confirms or edits reminder timing.
  5. Event transitions to `Scheduled` with confirmation toast.
- **Alternate steps:** User bulk-confirms from Events list when confidence is high.
- **Failure paths:** Event detail retrieval fails; save conflict due to concurrent update.
- **Completion state:** Reminder schedule persisted and visible in upcoming queue.

### Flow C: Adjust Global Preferences
- **Actor:** Authenticated user
- **Trigger:** User selects Preferences from global nav
- **Preconditions:** Active session
- **Main steps:**
  1. User updates default lead time and quiet hours.
  2. User toggles channel preferences.
  3. User saves changes and sees confirmation state.
  4. System displays effective-date behavior for existing vs new reminders.
- **Alternate steps:** User discards changes and keeps prior defaults.
- **Failure paths:** Validation error, stale version conflict, channel unavailable.
- **Completion state:** Preferences version incremented and audit entry created.

## 4. Secondary Flows

### Flow D: Reconnect Failed Integration
- **Actor:** User with disconnected provider
- **Trigger:** Banner indicates Gmail token expired
- **Preconditions:** Integration status `Degraded` or `Disconnected`
- **Main steps:** Navigate to Integrations > Gmail > Reconnect > OAuth complete > return with healthy state.
- **Alternate steps:** Defer reconnect and acknowledge warning.
- **Failure paths:** OAuth denied, repeated token exchange failure.
- **Completion state:** Integration health restored.

### Flow E: View Delivery Activity
- **Actor:** User or support analyst
- **Trigger:** User opens Activity page
- **Preconditions:** Reminder attempts exist
- **Main steps:** Filter by date/channel > inspect attempt detail > initiate retry where allowed.
- **Alternate steps:** Export/share filtered view (future).
- **Failure paths:** Activity API timeout; detail panel load failure.
- **Completion state:** User gains delivery confidence or initiates remediation.

## 5. Error and Recovery Flows
- Extraction ambiguity -> show confidence warning + editable fields + “mark for follow-up”.
- Delivery failure -> show reason, retry cooldown, and alternative channel suggestion.
- Session expiration -> preserve unsaved form input and redirect to login with return path.
- Concurrency conflict -> display diff summary and option to reload or overwrite.

## 6. Empty State Flows
- No events yet: educational state with “How it works” and integration health checklist.
- No failures in activity: positive reinforcement state with optional filter reset.
- No channels enabled: blocking callout to configure at least one delivery channel.

## 7. Authentication and Session Flows
- Login via Google OAuth only for MVP.
- Callback processing with success/failure branching.
- Idle timeout warning modal with extend-session action.
- Forced re-auth for sensitive actions (disconnect channel, delete account) when policy requires.

## 8. Notification / Confirmation Flows
- Toasts for quick success (saved preferences, retry queued).
- Persistent banners for unresolved issues (disconnected integration).
- Confirmation dialogs for destructive actions (disable last active channel).
- Inline validation messaging for form-level issues.

## 9. Mobile vs Desktop Flow Considerations
- Mobile uses single-column progression and sticky primary action bar in forms.
- Desktop supports split-view for list + detail in Events and Activity.
- Multi-step onboarding on mobile should avoid nested modals; use full-screen steps.
- Keyboard shortcuts (desktop) must have menu alternatives for accessibility.

## 10. Open Questions / Gaps
1. Should users be able to bypass manual review for high-confidence events automatically?
2. Is bulk remediation for repeated delivery failures needed in MVP?
3. Should push/email in-app notifications be configurable in V1 or deferred?

**Traceability:** Flow A and D map to Integrations screens in `screen-inventory.md`; Flow B maps to Events screens; Flow C maps to Preferences and component states in `components.md`.
