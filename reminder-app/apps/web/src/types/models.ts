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
  reminderOffsetsMinutes: number[];
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
  reminderOffsetsMinutes: number[];
  channels: ReminderChannelConfig;
}

export interface SaveReminderResult {
  eventId: string;
  savedAt: string;
  totalReminders: number;
  enabledChannels: Array<'push' | 'email' | 'sms'>;
}

export interface ReminderPlanOffsetConfig {
  id: string;
  label: string;
  minutesBefore: number;
}

export interface ReminderPlanEntry {
  id: string;
  label: string;
  remindAt: string;
  offsetMinutes: number;
}

export interface ReminderChannelConfig {
  push: boolean;
  email: boolean;
  sms: boolean;
}

export type NotificationStatus = 'Scheduled' | 'Sent' | 'Failed' | 'Cancelled';

export interface NotificationHistoryEntry {
  id: string;
  status: NotificationStatus;
  remindAt: string;
  channels: Array<'push' | 'email' | 'sms'>;
  direction: 'past' | 'upcoming';
}
