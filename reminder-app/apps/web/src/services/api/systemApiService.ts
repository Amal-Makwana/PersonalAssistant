import type { ActivityLog, UserProfile } from '../../types/models';
import { fetchJson } from './apiClient';

interface IntegrationsStatus {
  googleAuth: 'connected' | 'disconnected';
  gmailIngestion: 'healthy' | 'degraded';
  calendarSync: 'enabled' | 'disabled';
}

interface ActivityPayload {
  activity: Array<ActivityLog & { createdAt: string }>;
}

export class SystemApiService {
  async getProfile(): Promise<UserProfile> {
    return fetchJson<UserProfile>('/system/profile');
  }

  async updateProfile(payload: { timezone: string; calendarSyncEnabled: boolean }): Promise<UserProfile> {
    return fetchJson<UserProfile>('/system/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  async getIntegrationsStatus(): Promise<IntegrationsStatus> {
    return fetchJson<IntegrationsStatus>('/system/integrations/status');
  }

  async getActivity(): Promise<ActivityLog[]> {
    const payload = await fetchJson<ActivityPayload>('/system/diagnostics/activity');
    return payload.activity;
  }
}
