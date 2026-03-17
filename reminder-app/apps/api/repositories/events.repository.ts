<<<<<<< codex/inspect-s05-event-detail-screen-issue
import { query, withDbClient } from '../lib/db.js';
=======
import { query } from '../lib/db.js';
>>>>>>> main
import type {
  CreateEventInput,
  EventRecord,
  EventsResponse,
  NotificationHistoryEntry,
  NotificationHistoryResponse,
  ReminderChannel,
  ReminderPlanUpdateRequest,
  ReminderPlanUpdateResponse
} from '../types/event.types.js';

<<<<<<< codex/inspect-s05-event-detail-screen-issue
=======
const cloneEvent = (event: EventRecord): EventRecord => ({
  ...event,
  reminderPlan: event.reminderPlan.map((item) => ({ ...item }))
});

>>>>>>> main
interface DbEventRow {
  id: string;
  title: string;
  description: string;
  event_date: string | null;
  start_at: string;
  location: string | null;
  status: string;
}

interface DbReminderPlanRow {
  event_id: string;
  scheduled_for: string;
}

<<<<<<< codex/inspect-s05-event-detail-screen-issue
interface DbReminderRow {
  id: string;
  event_id: string;
  channel: string;
  scheduled_for: string;
  status: string;
}

interface DbDeliveryAttemptRow {
  id: string;
  reminder_id: string;
  status: string;
  requested_at: string;
}

interface DbSyncStatusRow {
  event_id: string;
  sync_status: string;
}

const toBaseEventTime = (row: Pick<DbEventRow, 'event_date' | 'start_at'>) => row.event_date ?? row.start_at;

const toContractStatus = (status: string): EventRecord['status'] => {
  const normalized = status.toUpperCase();
  if (normalized === 'FAILED') {
    return 'failed';
  }

  if (normalized === 'NEEDS_REVIEW' || normalized === 'REVIEW_REQUIRED') {
    return 'needs-review';
  }

  return 'scheduled';
};

const toContractSyncStatus = (syncStatus?: string | null): EventRecord['syncStatus'] => {
  const normalized = (syncStatus ?? '').toUpperCase();
  if (normalized === 'SYNCED') {
    return 'synced';
  }

  if (normalized === 'FAILED' || normalized === 'FAILED_RETRYABLE' || normalized === 'FAILED_TERMINAL') {
    return 'failed';
  }

  return 'pending';
};

const mapOffsetToContract = (baseTime: string, scheduledFor: string) => {
  const diffMs = new Date(baseTime).getTime() - new Date(scheduledFor).getTime();
  const diffMinutes = Math.max(1, Math.round(diffMs / 60_000));

  if (diffMinutes >= 60 && diffMinutes % 60 === 0) {
    return { offset: `${diffMinutes / 60}h` };
  }

  return { offset: `${diffMinutes}m` };
};

const parseOffsetMinutes = (offset: string) => {
  if (offset.endsWith('h')) {
    return Number(offset.slice(0, -1)) * 60;
  }

  return Number(offset.slice(0, -1));
};

const mapReminderChannel = (channel: string): ReminderChannel => {
  if (channel === 'sms' || channel === 'email' || channel === 'push') {
    return channel;
  }

  return 'push';
};
=======
interface DbReminderPlanRow {
  event_id: string;
  offset: string;
  sort_order: number;
}

interface DbNotificationHistoryRow {
  id: string;
  event_id: string;
  status: NotificationHistoryEntry['status'];
  remind_at: string;
  channels: string[];
  direction: NotificationHistoryEntry['direction'];
}

const mapDbEventToContract = (row: DbEventRow, reminderPlan: EventRecord['reminderPlan']): EventRecord => ({
  id: row.id,
  title: row.title,
  date: row.event_date,
  location: row.description ?? undefined,
  status: 'scheduled',
  duplicate: false,
  syncStatus: 'pending',
  reminderPlan
});
>>>>>>> main

const parseOffsetMinutes = (offset: string) => {
  if (offset.endsWith('h')) {
    return Number(offset.slice(0, -1)) * 60;
  }

  return Number(offset.slice(0, -1));
};

export class EventsRepository {
<<<<<<< codex/inspect-s05-event-detail-screen-issue
  private async listReminderPlansByEventIds(eventIds: string[]) {
    if (!eventIds.length) {
      return new Map<string, EventRecord['reminderPlan']>();
    }

    const result = await query<DbReminderPlanRow>(
      `SELECT event_id, scheduled_for
       FROM reminders
       WHERE event_id = ANY($1::uuid[])
       ORDER BY scheduled_for ASC`,
      [eventIds]
    );

    const grouped = new Map<string, DbReminderPlanRow[]>();
    for (const row of result.rows) {
      const existing = grouped.get(row.event_id) ?? [];
      existing.push(row);
      grouped.set(row.event_id, existing);
    }

    return grouped;
  }

  private async getSyncStatusesByEventIds(eventIds: string[]) {
    if (!eventIds.length) {
      return new Map<string, string>();
    }

    const result = await query<DbSyncStatusRow>(
      `SELECT event_id, sync_status::text AS sync_status
       FROM calendar_sync_records
       WHERE event_id = ANY($1::uuid[])`,
      [eventIds]
    );

    return new Map(result.rows.map((row) => [row.event_id, row.sync_status]));
  }

  private mapEventRowToContract(row: DbEventRow, reminderRows: DbReminderPlanRow[], syncStatus?: string | null): EventRecord {
    const baseTime = toBaseEventTime(row);
    return {
      id: row.id,
      title: row.title,
      date: baseTime,
      location: row.location ?? row.description ?? undefined,
      status: toContractStatus(row.status),
      duplicate: false,
      syncStatus: toContractSyncStatus(syncStatus),
      reminderPlan: reminderRows.map((item) => mapOffsetToContract(baseTime, item.scheduled_for))
    };
  }

  async getAllEvents(): Promise<EventsResponse> {
    const result = await query<DbEventRow>(
      `SELECT id, title, description, event_date, start_at, location, status::text AS status
       FROM events
       WHERE deleted_at IS NULL
       ORDER BY COALESCE(event_date, start_at) ASC`
    );

    const eventIds = result.rows.map((row) => row.id);
    const remindersByEventId = await this.listReminderPlansByEventIds(eventIds);
    const syncStatuses = await this.getSyncStatusesByEventIds(eventIds);

    return {
      events: result.rows.map((row) => this.mapEventRowToContract(row, remindersByEventId.get(row.id) ?? [], syncStatuses.get(row.id)))
=======
  private async ensureEventSupportTables() {
    await query(`
      CREATE TABLE IF NOT EXISTS event_reminder_plans (
        id BIGSERIAL PRIMARY KEY,
        event_id TEXT NOT NULL,
        offset TEXT NOT NULL,
        sort_order INTEGER NOT NULL,
        channels JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS event_notification_history (
        id TEXT PRIMARY KEY,
        event_id TEXT NOT NULL,
        status TEXT NOT NULL,
        remind_at TIMESTAMPTZ NOT NULL,
        channels JSONB NOT NULL DEFAULT '[]'::jsonb,
        direction TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
  }

  private async getReminderPlansByEventIds(eventIds: string[]) {
    if (!eventIds.length) {
      return new Map<string, EventRecord['reminderPlan']>();
    }

    await this.ensureEventSupportTables();

    const result = await query<DbReminderPlanRow>(
      `SELECT event_id, offset, sort_order
       FROM event_reminder_plans
       WHERE event_id = ANY($1::text[])
       ORDER BY event_id ASC, sort_order ASC`,
      [eventIds]
    );

    const grouped = new Map<string, EventRecord['reminderPlan']>();
    for (const row of result.rows) {
      const existing = grouped.get(row.event_id) ?? [];
      existing.push({ offset: row.offset });
      grouped.set(row.event_id, existing);
    }

    return grouped;
  }

  async getAllEvents(): Promise<EventsResponse> {
    const result = await query<DbEventRow>('SELECT id, title, description, event_date, created_at FROM events ORDER BY event_date ASC');
    const plansByEventId = await this.getReminderPlansByEventIds(result.rows.map((row) => row.id));

    return {
      events: result.rows.map((row) => cloneEvent(mapDbEventToContract(row, plansByEventId.get(row.id) ?? [])))
>>>>>>> main
    };
  }

  async getEventById(eventId: string): Promise<EventRecord | null> {
    const result = await query<DbEventRow>(
<<<<<<< codex/inspect-s05-event-detail-screen-issue
      `SELECT id, title, description, event_date, start_at, location, status::text AS status
       FROM events
       WHERE id = $1::uuid AND deleted_at IS NULL
       LIMIT 1`,
=======
      'SELECT id, title, description, event_date, created_at FROM events WHERE id = $1 LIMIT 1',
>>>>>>> main
      [eventId]
    );

    const row = result.rows[0];
    if (!row) {
      return null;
    }

<<<<<<< codex/inspect-s05-event-detail-screen-issue
    const remindersByEventId = await this.listReminderPlansByEventIds([eventId]);
    const syncStatuses = await this.getSyncStatusesByEventIds([eventId]);

    return this.mapEventRowToContract(row, remindersByEventId.get(eventId) ?? [], syncStatuses.get(eventId));
=======
    return cloneEvent(mapDbEventToContract(row));
>>>>>>> main
  }

  async createEvent(payload: CreateEventInput) {
    const userResult = await query<{ id: string }>('SELECT id FROM users WHERE deleted_at IS NULL ORDER BY created_at ASC LIMIT 1');
    const user = userResult.rows[0];
    if (!user) {
      throw new Error('Cannot create event: no users exist in DB.');
    }

    const sourceMessageResult = await query<{ id: string }>(
      'SELECT id FROM source_messages WHERE user_id = $1::uuid ORDER BY created_at ASC LIMIT 1',
      [user.id]
    );

    let sourceMessageId = sourceMessageResult.rows[0]?.id;

    if (!sourceMessageId) {
      const inserted = await query<{ id: string }>(
        `INSERT INTO source_messages
           (user_id, provider_message_id, thread_id, subject, sender, received_at, classification_status, parse_confidence, raw_payload)
         VALUES ($1::uuid, $2, $3, $4, $5, $6::timestamptz, 'PENDING', 1, '{}'::jsonb)
         RETURNING id`,
        [user.id, `manual-${Date.now()}`, `manual-${Date.now()}`, payload.title, 'manual@local', payload.event_date]
      );
      sourceMessageId = inserted.rows[0].id;
    }

    const result = await query<{ id: string; title: string; description: string; event_date: string; created_at: string }>(
      `INSERT INTO events (user_id, source_message_id, title, description, start_at, event_date, timezone, status)
       VALUES ($1::uuid, $2::uuid, $3, $4, $5::timestamptz, $5::timestamptz, 'UTC', 'ACTIVE')
       RETURNING id::text, title, description, event_date, created_at`,
      [user.id, sourceMessageId, payload.title, payload.description, payload.event_date]
    );

    return result.rows[0];
  }

  async saveReminderPlan(eventId: string, payload: ReminderPlanUpdateRequest): Promise<ReminderPlanUpdateResponse | null> {
<<<<<<< codex/inspect-s05-event-detail-screen-issue
    return withDbClient(async (client) => {
      await client.query('BEGIN');

      try {
        const eventLookup = await client.query<{ id: string; user_id: string; event_date: string | null; start_at: string }>(
          `SELECT id, user_id, event_date, start_at
           FROM events
           WHERE id = $1::uuid AND deleted_at IS NULL
           LIMIT 1`,
          [eventId]
        );
=======
    const eventLookup = await query<{ id: string; event_date: string }>('SELECT id, event_date FROM events WHERE id = $1 LIMIT 1', [eventId]);
    const event = eventLookup.rows[0];
    if (!event) {
      return null;
    }

    await this.ensureEventSupportTables();

    await query('DELETE FROM event_reminder_plans WHERE event_id = $1', [eventId]);

    const normalizedPlan = payload.reminderPlan.map((entry) => ({ ...entry }));

    for (const [index, entry] of normalizedPlan.entries()) {
      await query(
        `INSERT INTO event_reminder_plans (event_id, offset, sort_order, channels)
         VALUES ($1, $2, $3, $4::jsonb)`,
        [eventId, entry.offset, index, JSON.stringify(payload.channels)]
      );
    }
>>>>>>> main

        const event = eventLookup.rows[0];
        if (!event) {
          await client.query('ROLLBACK');
          return null;
        }

<<<<<<< codex/inspect-s05-event-detail-screen-issue
        const eventTime = toBaseEventTime(event);
        await client.query('DELETE FROM reminders WHERE event_id = $1::uuid', [eventId]);

        const enabledChannels = (Object.keys(payload.channels) as ReminderChannel[]).filter((channel) => Boolean(payload.channels[channel]));
        const channels = enabledChannels.length ? enabledChannels : ['push'];

        let reminderCount = 0;
        for (const entry of payload.reminderPlan) {
          const minutes = parseOffsetMinutes(entry.offset);
          const scheduledFor = new Date(new Date(eventTime).getTime() - minutes * 60_000).toISOString();

          for (const channel of channels) {
            await client.query(
              `INSERT INTO reminders (user_id, event_id, channel, scheduled_for, status)
               VALUES ($1::uuid, $2::uuid, $3::reminder_channel_type, $4::timestamptz, 'PENDING')`,
              [event.user_id, eventId, channel, scheduledFor]
            );
          }

          reminderCount += 1;
        }

        await client.query('COMMIT');

        return {
          success: true,
          eventId,
          message: 'Reminder plan saved',
          reminderCount,
          channels,
          savedAt: new Date().toISOString(),
          totalReminders: reminderCount,
          enabledChannels: channels
        };
      } catch (error) {
        await client.query('ROLLBACK').catch(() => undefined);
        throw error;
      }
    });
  }

  async getNotificationHistory(eventId: string): Promise<NotificationHistoryResponse | null> {
    const eventLookup = await query<{ id: string }>('SELECT id FROM events WHERE id = $1::uuid AND deleted_at IS NULL LIMIT 1', [eventId]);
=======
    await query('DELETE FROM event_notification_history WHERE event_id = $1', [eventId]);

    const eventTime = new Date(event.event_date);
    for (const [index, entry] of normalizedPlan.entries()) {
      const remindAt = new Date(eventTime.getTime() - parseOffsetMinutes(entry.offset) * 60_000).toISOString();
      await query(
        `INSERT INTO event_notification_history (id, event_id, status, remind_at, channels, direction)
         VALUES ($1, $2, $3, $4, $5::jsonb, $6)`,
        [`${eventId}-scheduled-${index}`, eventId, 'Scheduled', remindAt, JSON.stringify(channels), 'upcoming']
      );
    }

    return {
      success: true,
      eventId,
      message: 'Reminder plan saved',
      reminderCount: normalizedPlan.length,
      channels,
      savedAt: new Date().toISOString(),
      totalReminders: normalizedPlan.length,
      enabledChannels: channels
    };
  }

  async getNotificationHistory(eventId: string): Promise<NotificationHistoryResponse | null> {
    const eventLookup = await query<{ id: string }>('SELECT id FROM events WHERE id = $1 LIMIT 1', [eventId]);
>>>>>>> main
    if (!eventLookup.rows[0]) {
      return null;
    }

<<<<<<< codex/inspect-s05-event-detail-screen-issue
    const remindersResult = await query<DbReminderRow>(
      `SELECT id, event_id, channel::text AS channel, scheduled_for, status::text AS status
       FROM reminders
       WHERE event_id = $1::uuid
       ORDER BY scheduled_for DESC`,
      [eventId]
    );

    const reminderIds = remindersResult.rows.map((row) => row.id);
    const attemptsResult = reminderIds.length
      ? await query<DbDeliveryAttemptRow>(
          `SELECT id::text, reminder_id::text, status::text AS status, requested_at
           FROM delivery_attempts
           WHERE reminder_id = ANY($1::uuid[])
           ORDER BY requested_at DESC`,
          [reminderIds]
        )
      : { rows: [] as DbDeliveryAttemptRow[] };

    const latestAttemptsByReminderId = new Map<string, DbDeliveryAttemptRow>();
    for (const attempt of attemptsResult.rows) {
      if (!latestAttemptsByReminderId.has(attempt.reminder_id)) {
        latestAttemptsByReminderId.set(attempt.reminder_id, attempt);
      }
    }

    const now = Date.now();
    const history = remindersResult.rows.map<NotificationHistoryEntry>((reminder) => {
      const latestAttempt = latestAttemptsByReminderId.get(reminder.id);
      const sourceStatus = latestAttempt?.status ?? reminder.status;
      const normalizedStatus = sourceStatus.toUpperCase();

      return {
        id: latestAttempt?.id ?? reminder.id,
        status:
          normalizedStatus === 'SENT'
            ? 'Sent'
            : normalizedStatus === 'FAILED'
              ? 'Failed'
              : normalizedStatus === 'CANCELLED'
                ? 'Cancelled'
                : 'Scheduled',
        remindAt: reminder.scheduled_for,
        channels: [mapReminderChannel(reminder.channel)],
        direction: new Date(reminder.scheduled_for).getTime() < now ? 'past' : 'upcoming'
      };
    });

    return {
      eventId,
      history
=======
    await this.ensureEventSupportTables();

    const historyResult = await query<DbNotificationHistoryRow>(
      `SELECT id, event_id, status, remind_at, channels, direction
       FROM event_notification_history
       WHERE event_id = $1
       ORDER BY remind_at DESC`,
      [eventId]
    );

    return {
      eventId,
      history: historyResult.rows.map((row) => ({
        id: row.id,
        status: row.status,
        remindAt: row.remind_at,
        channels: row.channels,
        direction: row.direction
      }))
>>>>>>> main
    };
  }

  async resetInMemoryState() {
<<<<<<< codex/inspect-s05-event-detail-screen-issue
    await Promise.resolve();
=======
    await query('DELETE FROM event_reminder_plans').catch(() => undefined);
    await query('DELETE FROM event_notification_history').catch(() => undefined);
>>>>>>> main
  }
}
