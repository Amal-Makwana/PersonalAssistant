# Business Requirements Document (BRD)
## Email-Driven Reminder Assistant (MVP)

## 1) Product Overview
The Email-Driven Reminder Assistant is a product that automatically turns important event emails into actionable reminders. It connects to a user’s Gmail account, identifies event-related emails, extracts key details, stores events, and sends reminders through WhatsApp (and optionally SMS).

This product is designed to solve a common problem: people receive important appointment or booking emails but still miss events because reminders are not reliably set.

The product is for individuals who depend on email confirmations and invitations to manage daily life and work.

## 2) Business Problem
Today, many users rely on a fragmented process: they receive an event email, manually add details to a calendar, and then remember to configure reminders. This process frequently fails because:

- Users are busy and delay calendar entry.
- Event details are buried in long email threads.
- Reminder setup is inconsistent or forgotten.
- Users depend on one channel (for example, email notifications) that may be overlooked.

As a result, appointments, meetings, classes, interviews, and travel events are missed, creating personal stress and business inefficiency.

## 3) Product Vision
Over time, this product aims to become a trusted personal event-capture and reminder layer built on top of users’ inbox behavior.

The long-term vision is simple: if an event arrives by email, the user should not need to manually process it. The system should automatically detect it, capture the event details, and ensure the user receives timely reminders through channels they actually notice.

## 4) Target Users
Primary target users include:

- Busy professionals balancing meetings, medical appointments, and personal commitments.
- Parents managing school communications, parent-teacher meetings, and activities.
- Students handling classes, exams, registrations, and deadlines.
- Freelancers managing client calls, interviews, and project-related appointments.
- Anyone who receives appointment or booking confirmations via email.

## 5) Key User Scenarios
Representative examples include:

- **Dentist appointment email:** A user receives a confirmation email with date/time and gets WhatsApp reminders before the visit.
- **School meeting email:** A parent receives a school notice and is reminded in advance.
- **Interview invitation:** A job seeker receives an interview invite and gets pre-event reminders.
- **Class registration confirmation:** A student receives class enrollment details and is reminded before the session.
- **Travel booking confirmation:** A traveler receives booking details and is reminded ahead of departure/check-in.

## 6) Product Scope (MVP)
The MVP will include the following capabilities:

- Users connect their Gmail account.
- The system reads event-related emails.
- The system extracts event details (title, date, time, and location when available).
- The system stores the event.
- The system optionally syncs the event to Google Calendar.
- The system sends reminders through WhatsApp.
- The system supports optional SMS reminders.

Default reminder schedule for each detected event:

- 4 hours before the event
- 1 hour before the event
- 15 minutes before the event

## 7) Out of Scope for MVP
The following items are explicitly out of scope for the first release:

- Advanced AI assistant conversations
- Recurring reminder rules
- Non-Gmail email providers
- Team or enterprise workflows
- Complex automation rules
- Voice reminders

## 8) User Journey
A typical user journey is:

1. The user signs up.
2. The user connects Gmail.
3. The user receives an event-related email.
4. The system detects and extracts event details.
5. A reminder schedule is created automatically.
6. The user receives WhatsApp reminder notifications (and SMS if enabled).

## 9) Business Value
Expected business and user value includes:

- Fewer missed appointments and events.
- Reduced manual effort for calendar management.
- Higher confidence that important commitments will not be forgotten.
- Better daily organization through proactive reminders.

## 10) Functional Requirements
The MVP must support these functional requirements:

1. Connect a user’s Gmail account.
2. Detect event-related emails.
3. Extract core event information (title, date, time, optional location).
4. Store event records for reminder scheduling.
5. Schedule reminders using default timing windows.
6. Send reminders through WhatsApp.
7. Support optional SMS reminders.
8. Prevent duplicate events and duplicate reminder scheduling.

## 11) Non-Functional Requirements
The product should meet these quality requirements:

- **Reliability:** Event detection and reminder delivery should be consistently dependable.
- **Privacy:** User email and event data must be handled with clear privacy protections.
- **Security:** Access and data handling must follow secure authentication and storage practices.
- **Scalability:** The service should handle increasing user and event volume without major degradation.
- **Usability:** Setup and daily usage should be simple for non-technical users.

## 12) Assumptions
This BRD assumes:

- Users are willing to connect Gmail to enable automated event detection.
- A meaningful portion of event emails contain parseable date/time information.
- WhatsApp is an effective and frequently checked reminder channel for the target audience.
- Users value automatic reminders more than manual calendar workflows.

## 13) Risks and Limitations
Key risks and limitations include:

- Some emails may be difficult to parse accurately due to unstructured content.
- Users may hesitate to grant inbox access because of privacy concerns.
- Third-party messaging channels (WhatsApp/SMS) may have occasional delivery delays or failures.
- Ambiguous or incomplete event details in emails may reduce extraction accuracy.

## 14) Success Criteria
The MVP will be considered successful when pilot outcomes show:

- A high percentage of reminders are delivered successfully.
- Users report fewer missed events after onboarding.
- A strong completion rate for Gmail account connection.
- A strong event extraction success rate from relevant emails.
- Positive user feedback on reminder usefulness and timeliness.

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
