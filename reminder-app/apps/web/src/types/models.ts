export type SyncStatus = 'synced' | 'pending' | 'failed';

export interface EventItem {
  id: string;
  title: string;
  time: string;
  location?: string;
  status: 'scheduled' | 'needs-review' | 'failed';
  duplicate: boolean;
  syncStatus: SyncStatus;
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

export type Scenario = 'success' | 'empty' | 'error' | 'permission';
