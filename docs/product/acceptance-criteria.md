# Acceptance Criteria (MVP)

## Feature: Authentication
**Given** a new user opens the product  
**When** they choose Google sign-in and complete authentication  
**Then** their account should be created or accessed successfully.

## Feature: Gmail Connection
**Given** an authenticated user is in onboarding or settings  
**When** they grant Gmail permission  
**Then** the system should be able to process relevant emails for event detection.

## Feature: Email Parsing
**Given** a connected user receives an event-related email  
**When** the system processes that email  
**Then** it should identify event intent and extract available title, date, time, and optional location.

## Feature: Event Creation
**Given** event details are extracted from an email  
**When** extraction is successful  
**Then** the system should create a stored event record associated with the user.

## Feature: Reminder Scheduling
**Given** an event record exists  
**When** reminder scheduling runs  
**Then** reminders should be created for default timing windows (4 hours, 1 hour, 15 minutes before event time).

## Feature: WhatsApp Delivery
**Given** a scheduled reminder reaches its trigger time  
**When** the user has WhatsApp reminders enabled  
**Then** a reminder notification should be sent via WhatsApp.

## Feature: SMS Delivery (Optional)
**Given** a scheduled reminder reaches its trigger time  
**When** the user has opted into SMS reminders  
**Then** a reminder notification should be sent via SMS.

## Feature: Duplicate Prevention
**Given** the system processes duplicate or repeated email inputs for the same event  
**When** event creation and scheduling are evaluated  
**Then** the system should avoid creating duplicate event records and duplicate reminders.
