import { query } from '../lib/db.js';
import type {
  ActivityLogResponse,
  IntegrationsStatusResponse,
  UpdateProfileRequest,
  UserProfileResponse
} from '../types/system.types.js';

interface DbUserRow {
  id: string;
  name: string | null;
}

interface DbPreferenceRow {
  timezone: string | null;
  calendar_sync_enabled: boolean;
}

interface DbActivityRow {
  id: string;
  message: string;
  level: 'info' | 'warning' | 'error';
  created_at: string;
}

const defaultProfile: UserProfileResponse = {
  id: 'unknown',
  name: 'User',
  timezone: 'UTC',
  calendarSyncEnabled: true
};

export class SystemRepository {
  async getProfile(): Promise<UserProfileResponse> {
    const userResult = await query<DbUserRow>(
      'SELECT id::text, name FROM users WHERE deleted_at IS NULL ORDER BY created_at ASC LIMIT 1'
    );

    const user = userResult.rows[0];
    if (!user) {
      return defaultProfile;
    }

    const prefsResult = await query<DbPreferenceRow>(
      'SELECT timezone, calendar_sync_enabled FROM user_preferences WHERE user_id = $1::uuid LIMIT 1',
      [user.id]
    );

    const prefs = prefsResult.rows[0];

    return {
      id: user.id,
      name: user.name ?? 'User',
      timezone: prefs?.timezone ?? 'UTC',
      calendarSyncEnabled: prefs?.calendar_sync_enabled ?? true
    };
  }

  async updateProfile(payload: UpdateProfileRequest): Promise<UserProfileResponse> {
    const current = await this.getProfile();

    if (current.id === 'unknown') {
      return { ...current, timezone: payload.timezone, calendarSyncEnabled: payload.calendarSyncEnabled ?? true };
    }

    await query(
      `INSERT INTO user_preferences (user_id, whatsapp_enabled, sms_enabled, calendar_sync_enabled, timezone, updated_at)
       VALUES ($1::uuid, false, false, $2::boolean, $3::text, NOW())
       ON CONFLICT (user_id)
       DO UPDATE SET calendar_sync_enabled = EXCLUDED.calendar_sync_enabled,
                     timezone = EXCLUDED.timezone,
                     updated_at = NOW()`,
      [current.id, payload.calendarSyncEnabled ?? current.calendarSyncEnabled, payload.timezone]
    );

    return this.getProfile();
  }

  async getIntegrationsStatus(): Promise<IntegrationsStatusResponse> {
    const profile = await this.getProfile();
    return {
      googleAuth: profile.id === 'unknown' ? 'disconnected' : 'connected',
      gmailIngestion: profile.id === 'unknown' ? 'degraded' : 'healthy',
      calendarSync: profile.calendarSyncEnabled ? 'enabled' : 'disabled'
    };
  }

  async getActivity(): Promise<ActivityLogResponse> {
    const result = await query<DbActivityRow>(
      `SELECT id::text,
              CONCAT('Message ', provider_message_id, ' classified as ', classification_status) AS message,
              CASE
                WHEN classification_status::text = 'FAILED' THEN 'error'
                WHEN classification_status::text IN ('REVIEW_REQUIRED', 'NEEDS_REVIEW') THEN 'warning'
                ELSE 'info'
              END::text AS level,
              created_at
       FROM source_messages
       ORDER BY created_at DESC
       LIMIT 20`
    );

    return {
      activity: result.rows.map((row) => ({
        id: row.id,
        message: row.message,
        level: row.level,
        createdAt: row.created_at
      }))
    };
  }
}
