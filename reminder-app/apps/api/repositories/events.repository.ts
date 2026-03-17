import { query } from '../lib/db.js';
import eventsFixture from '../fixtures/events.fixture.js';
import notificationHistoryFixture from '../fixtures/notification-history.fixture.js';
import type {
  CreateEventInput,
  EventRecord,
  EventsResponse,
  NotificationHistoryResponse,
  ReminderPlanUpdateRequest,
  ReminderPlanUpdateResponse
} from '../types/event.types.js';

const inMemoryReminderPlans = new Map<string, EventRecord['reminderPlan']>();

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

const mapDbEventToContract = (row: DbEventRow): EventRecord => ({
  id: row.id,
  title: row.title,
  date: row.event_date,
  location: row.description ?? undefined,
  status: 'scheduled',
  duplicate: false,
  syncStatus: 'pending',
  reminderPlan: inMemoryReminderPlans.get(row.id) ?? []
});

export class EventsRepository {
  async getAllEvents(): Promise<EventsResponse> {
    const result = await query<DbEventRow>(
      'SELECT id, title, description, event_date, created_at FROM events ORDER BY event_date ASC'
    );

    return {
      events: result.rows.map((row) => cloneEvent(mapDbEventToContract(row)))
    };
  }

  getEventById(eventId: string): EventRecord | null {
    const event = eventsFixture.events.find((item) => item.id === eventId);
    if (!event) {
      return null;
    }

    const overrides = inMemoryReminderPlans.get(event.id);
    return cloneEvent({ ...event, reminderPlan: overrides ?? event.reminderPlan } as EventRecord);
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

  saveReminderPlan(eventId: string, payload: ReminderPlanUpdateRequest): ReminderPlanUpdateResponse | null {
    const event = eventsFixture.events.find((item) => item.id === eventId);
    if (!event) {
      return null;
    }

    const normalizedPlan = payload.reminderPlan.map((entry) => ({ ...entry }));
    inMemoryReminderPlans.set(eventId, normalizedPlan);

    const channels = (Object.keys(payload.channels) as Array<'push' | 'email' | 'sms'>).filter(
      (channel) => Boolean(payload.channels[channel])
    );

    return {
      success: true,
      eventId,
      message: 'Reminder plan saved',
      reminderCount: normalizedPlan.length,
      channels,
      savedAt: '2026-03-15T10:00:00.000Z',
      totalReminders: normalizedPlan.length,
      enabledChannels: channels
    };
  }

  getNotificationHistory(eventId: string): NotificationHistoryResponse | null {
    const eventExists = eventsFixture.events.some((event) => event.id === eventId);
    if (!eventExists) {
      return null;
    }

    const history = notificationHistoryFixture.historyByEventId[eventId as keyof typeof notificationHistoryFixture.historyByEventId] ?? [];
    return {
      eventId,
      history: history.map((entry) => ({ ...entry, channels: [...entry.channels] }))
    };
  }

  resetInMemoryState() {
    inMemoryReminderPlans.clear();
  }
}
