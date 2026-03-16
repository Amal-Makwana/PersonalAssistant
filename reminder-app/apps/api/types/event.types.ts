export type ReminderChannel = 'push' | 'email' | 'sms';

export type NotificationStatus = 'Scheduled' | 'Sent' | 'Failed' | 'Cancelled';

export interface ReminderOffset {
  offset: string;
}

export interface EventRecord {
  id: string;
  title: string;
  date: string;
  location?: string;
  status: 'scheduled' | 'needs-review' | 'failed';
  duplicate: boolean;
  syncStatus: 'synced' | 'pending' | 'failed';
  reminderPlan: ReminderOffset[];
}

export interface EventsResponse {
  events: EventRecord[];
}

export interface ReminderPlanUpdateRequest {
  reminderPlan: ReminderOffset[];
  channels: Partial<Record<ReminderChannel, boolean>>;
}

export interface ReminderPlanUpdateResponse {
  eventId: string;
  savedAt: string;
  totalReminders: number;
  enabledChannels: ReminderChannel[];
}

export interface NotificationHistoryEntry {
  id: string;
  status: NotificationStatus;
  remindAt: string;
  channels: ReminderChannel[];
  direction: 'past' | 'upcoming';
}

export interface NotificationHistoryResponse {
  eventId: string;
  history: NotificationHistoryEntry[];
}

export interface DashboardSummaryResponse {
  upcomingCount: number;
  needsReviewCount: number;
  failedCount: number;
  nextEventId?: string;
}
