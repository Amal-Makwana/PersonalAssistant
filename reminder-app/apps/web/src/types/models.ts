export type SyncStatus = 'synced' | 'pending' | 'failed';

export interface ReminderSettings {
  primaryMinutesBefore: number;
  secondaryMinutesBefore: number;
  timezone: string;
}

export interface EventItem {
  id: string;
  title: string;
  time: string;
  location?: string;
  status: 'scheduled' | 'needs-review' | 'failed';
  duplicate: boolean;
  syncStatus: SyncStatus;
  reminderSettings: ReminderSettings;
}

export interface UserProfile {
  id: string;
  name: string;
  timezone: string;
  calendarSyncEnabled: boolean;
}

export interface ActivityLog {
  id: string;
  message: string;
  level: 'info' | 'warning' | 'error';
}

export type Scenario = 'success' | 'empty' | 'error' | 'permission' | 'validation';

export interface DashboardSummary {
  upcomingCount: number;
  needsReviewCount: number;
  failedCount: number;
  nextEventId?: string;
}

export interface SaveReminderInput {
  eventId: string;
  reminderSettings: ReminderSettings;
}

export interface SaveReminderResult {
  eventId: string;
  savedAt: string;
}
