export interface UserProfileResponse {
  id: string;
  name: string;
  timezone: string;
  calendarSyncEnabled: boolean;
}

export interface IntegrationsStatusResponse {
  googleAuth: 'connected' | 'disconnected';
  gmailIngestion: 'healthy' | 'degraded';
  calendarSync: 'enabled' | 'disabled';
}

export interface ActivityLogEntryResponse {
  id: string;
  message: string;
  level: 'info' | 'warning' | 'error';
  createdAt: string;
}

export interface ActivityLogResponse {
  activity: ActivityLogEntryResponse[];
}

export interface UpdateProfileRequest {
  timezone: string;
  calendarSyncEnabled?: boolean;
}
