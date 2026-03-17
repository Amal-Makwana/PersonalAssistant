import { query } from '../lib/db.js';
import type {
  CreateEventInput,
  EventRecord,
  EventsResponse,
  NotificationHistoryEntry,
  NotificationHistoryResponse,
  ReminderPlanUpdateRequest,
  ReminderPlanUpdateResponse
} from '../types/event.types.js';

const cloneEvent = (event: EventRecord): EventRecord => ({
  ...event,
  reminderPlan: event.reminderPlan.map((item) => ({ ...item }))
});

interface DbEventRow {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  created_at: string;
}

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

const parseOffsetMinutes = (offset: string) => {
  if (offset.endsWith('h')) {
    return Number(offset.slice(0, -1)) * 60;
  }

  return Number(offset.slice(0, -1));
};

export class EventsRepository {
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
    };
  }

  async getEventById(eventId: string): Promise<EventRecord | null> {
    const result = await query<DbEventRow>(
      'SELECT id, title, description, event_date, created_at FROM events WHERE id = $1 LIMIT 1',
      [eventId]
    );

    const row = result.rows[0];
    if (!row) {
      return null;
    }

    return cloneEvent(mapDbEventToContract(row));
  }

  async createEvent(payload: CreateEventInput): Promise<DbEventRow> {
    const result = await query<DbEventRow>(
      `INSERT INTO events (title, description, event_date)
       VALUES ($1, $2, $3)
       RETURNING id, title, description, event_date, created_at`,
      [payload.title, payload.description, payload.event_date]
    );

    return result.rows[0];
  }

  async saveReminderPlan(eventId: string, payload: ReminderPlanUpdateRequest): Promise<ReminderPlanUpdateResponse | null> {
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

    const channels = (Object.keys(payload.channels) as Array<'push' | 'email' | 'sms'>).filter(
      (channel) => Boolean(payload.channels[channel])
    );

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
    if (!eventLookup.rows[0]) {
      return null;
    }

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
    };
  }

  async resetInMemoryState() {
    await query('DELETE FROM event_reminder_plans').catch(() => undefined);
    await query('DELETE FROM event_notification_history').catch(() => undefined);
  }
}
