# Product Requirements (MVP)

## PR-1 User Authentication
**Description:** Users can sign up and sign in with a Google account to access the assistant.

**User Value:** Fast onboarding with a familiar login flow and trusted account identity.

**Priority:** Must

## PR-2 Gmail Integration
**Description:** Users can connect Gmail and grant permission for the system to process relevant emails.

**User Value:** Enables automatic event detection without manual inbox management.

**Priority:** Must

## PR-3 Email Event Detection
**Description:** The product identifies event-related emails from incoming Gmail content.

**User Value:** Reduces cognitive load and prevents important event emails from being overlooked.

**Priority:** Must

## PR-4 Event Creation
**Description:** The product extracts event details (title, date, time, optional location) and creates event records.

**User Value:** Eliminates repetitive manual entry and creates a reliable reminder foundation.

**Priority:** Must

## PR-5 Reminder Scheduling
**Description:** The product automatically schedules default reminders for each detected event (4 hours, 1 hour, and 15 minutes before).

**User Value:** Ensures consistent pre-event awareness without user setup effort.

**Priority:** Must

## PR-6 WhatsApp Notification
**Description:** The product sends event reminders through WhatsApp.

**User Value:** Delivers reminders through a high-attention channel users check frequently.

**Priority:** Must

## PR-7 Optional SMS Notification
**Description:** Users can optionally enable SMS reminder delivery.

**User Value:** Provides an additional channel for users who prefer or require text notifications.

**Priority:** Should

## PR-8 Google Calendar Sync
**Description:** Users can optionally sync detected events to Google Calendar.

**User Value:** Keeps calendar visibility aligned with reminder workflows.

**Priority:** Should

## PR-9 Duplicate Prevention
**Description:** The product prevents duplicate event records and duplicate reminder schedules for the same email-derived event.

**User Value:** Avoids confusion, notification spam, and reduced trust in reminder accuracy.

**Priority:** Must

## PR-10 User Preferences
**Description:** Users can manage notification channel preferences, including enabling or disabling optional SMS.

**User Value:** Supports personalization and comfort with reminder delivery behavior.

**Priority:** Could
