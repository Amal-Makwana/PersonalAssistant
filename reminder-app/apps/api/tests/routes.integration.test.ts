import request from 'supertest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { app } from '../app.js';
import { query } from '../lib/db.js';

vi.mock('../lib/db.js', () => {
  const queryMock = vi.fn();
  return {
    query: queryMock,
    withDbClient: async (handler: (client: { query: typeof queryMock; release: () => void }) => Promise<unknown>) =>
      handler({ query: queryMock, release: () => undefined }),
    closeDbPool: vi.fn()
  };
});

const mockedQuery = vi.mocked(query);

const TEST_IDS = {
  user: '11111111-1111-4111-8111-111111111111',
  eventOne: '22222222-2222-4222-8222-222222222222',
  sourceMessage: '44444444-4444-4444-8444-444444444444'
} as const;

beforeEach(() => {
  const preferences = new Map<string, { timezone: string; calendar_sync_enabled: boolean }>([
    [TEST_IDS.user, { timezone: 'UTC', calendar_sync_enabled: true }]
  ]);

  const events = new Map<string, {
    id: string;
    user_id: string;
    title: string;
    description: string;
    start_at: string;
    event_date: string;
    location: string | null;
    status: string;
    created_at: string;
  }>([
    [
      TEST_IDS.eventOne,
      {
        id: TEST_IDS.eventOne,
        user_id: TEST_IDS.user,
        title: 'DB Event One',
        description: 'Desk 2',
        start_at: '2026-03-20T09:00:00Z',
        event_date: '2026-03-20T09:00:00Z',
        location: null,
        status: 'ACTIVE',
        created_at: '2026-03-19T09:00:00Z'
      }
    ]
  ]);

  const reminders: Array<{
    id: string;
    user_id: string;
    event_id: string;
    channel: 'push' | 'email' | 'sms';
    scheduled_for: string;
    status: string;
  }> = [
    {
      id: '55555555-5555-4555-8555-555555555555',
      user_id: TEST_IDS.user,
      event_id: TEST_IDS.eventOne,
      channel: 'email',
      scheduled_for: '2026-03-20T08:00:00Z',
      status: 'PENDING'
    }
  ];

  const deliveryAttempts: Array<{
    id: string;
    reminder_id: string;
    status: string;
    requested_at: string;
  }> = [
    {
      id: '66666666-6666-4666-8666-666666666666',
      reminder_id: '55555555-5555-4555-8555-555555555555',
      status: 'SENT',
      requested_at: '2026-03-20T08:01:00Z'
    }
  ];

  mockedQuery.mockImplementation(async (sql: string, params?: unknown[]) => {
    if (sql === 'BEGIN' || sql === 'COMMIT' || sql === 'ROLLBACK') {
      return { rows: [] } as never;
    }

    if (sql.includes('SELECT id::text, name FROM users')) {
      return { rows: [{ id: TEST_IDS.user, name: 'Prototype User' }] } as never;
    }

    if (sql.includes('SELECT timezone, calendar_sync_enabled FROM user_preferences')) {
      const pref = preferences.get(String(params?.[0]));
      return { rows: pref ? [pref] : [] } as never;
    }

    if (sql.includes('INSERT INTO user_preferences')) {
      preferences.set(String(params?.[0]), {
        calendar_sync_enabled: Boolean(params?.[1]),
        timezone: String(params?.[2])
      });
      return { rows: [] } as never;
    }

    if (sql.includes('FROM source_messages') && sql.includes('ORDER BY created_at DESC')) {
      return {
        rows: [
          {
            id: TEST_IDS.sourceMessage,
            message: 'Message p-1 classified as PENDING',
            level: 'info',
            created_at: '2026-03-19T08:00:00Z'
          }
        ]
      } as never;
    }

    if (sql.includes('FROM events') && sql.includes('ORDER BY COALESCE(event_date, start_at) ASC') && !sql.includes('LIMIT 1')) {
      return {
        rows: [...events.values()].map((event) => ({
          id: event.id,
          title: event.title,
          description: event.description,
          event_date: event.event_date,
          start_at: event.start_at,
          location: event.location,
          status: event.status
        }))
      } as never;
    }

    if (sql.includes('FROM events') && sql.includes('WHERE id = $1::uuid') && sql.includes('LIMIT 1') && sql.includes('status::text AS status')) {
      const eventId = String(params?.[0]);
      const event = events.get(eventId);
      return {
        rows: event
          ? [{ id: event.id, title: event.title, description: event.description, event_date: event.event_date, start_at: event.start_at, location: event.location, status: event.status }]
          : []
      } as never;
    }

    if (sql.includes('SELECT id FROM events WHERE id = $1::uuid AND deleted_at IS NULL LIMIT 1')) {
      const id = String(params?.[0]);
      return { rows: events.get(id) ? [{ id }] : [] } as never;
    }

    if (sql.includes('SELECT id, user_id, event_date, start_at') && sql.includes('FROM events')) {
      const eventId = String(params?.[0]);
      const event = events.get(eventId);
      return { rows: event ? [{ id: event.id, user_id: event.user_id, event_date: event.event_date, start_at: event.start_at }] : [] } as never;
    }

    if (sql.includes('FROM reminders') && sql.includes('event_id = ANY')) {
      const eventIds = (params?.[0] as string[]) ?? [];
      return {
        rows: reminders.filter((item) => eventIds.includes(item.event_id)).map((item) => ({ event_id: item.event_id, scheduled_for: item.scheduled_for }))
      } as never;
    }

    if (sql.includes('SELECT DISTINCT channel::text AS channel')) {
      return { rows: reminders.filter((item) => item.event_id === String(params?.[0])).map((item) => ({ channel: item.channel })) } as never;
    }

    if (sql.includes('DELETE FROM reminders WHERE event_id = $1::uuid')) {
      const eventId = String(params?.[0]);
      for (let index = reminders.length - 1; index >= 0; index -= 1) {
        if (reminders[index].event_id === eventId) {
          reminders.splice(index, 1);
        }
      }
      return { rows: [] } as never;
    }

    if (sql.includes('INSERT INTO reminders (user_id, event_id, channel, scheduled_for, status)')) {
      reminders.push({
        id: `${Math.random()}`,
        user_id: String(params?.[0]),
        event_id: String(params?.[1]),
        channel: String(params?.[2]) as 'push' | 'email' | 'sms',
        scheduled_for: String(params?.[3]),
        status: 'PENDING'
      });
      return { rows: [] } as never;
    }

    if (sql.includes('INSERT INTO calendar_sync_records')) {
      return { rows: [] } as never;
    }

    if (sql.includes('FROM reminders') && sql.includes('channel::text AS channel')) {
      return {
        rows: reminders.filter((row) => row.event_id === String(params?.[0])).map((row) => ({ id: row.id, event_id: row.event_id, channel: row.channel, scheduled_for: row.scheduled_for, status: row.status }))
      } as never;
    }

    if (sql.includes('FROM delivery_attempts')) {
      const reminderIds = (params?.[0] as string[]) ?? [];
      return {
        rows: deliveryAttempts.filter((row) => reminderIds.includes(row.reminder_id)).map((row) => ({ id: row.id, reminder_id: row.reminder_id, status: row.status, requested_at: row.requested_at }))
      } as never;
    }

    if (sql.includes('FROM calendar_sync_records')) {
      return { rows: [] } as never;
    }

    if (sql.includes('upcoming_count') && sql.includes('FROM events')) {
      return { rows: [{ upcoming_count: '1', needs_review_count: '0', failed_count: '0' }] } as never;
    }

    if (sql.includes('SELECT id::text') && sql.includes('FROM events') && sql.includes('LIMIT 1')) {
      return { rows: [{ id: TEST_IDS.eventOne }] } as never;
    }

    throw new Error(`Unhandled SQL in test mock: ${sql}`);
  });
});

describe('API integration routes', () => {
  it('serves event list and detail', async () => {
    const list = await request(app).get('/events');
    expect(list.status).toBe(200);
    expect(list.body.events[0]).toMatchObject({ id: TEST_IDS.eventOne, title: 'DB Event One' });

    const detail = await request(app).get(`/events/${TEST_IDS.eventOne}`);
    expect(detail.status).toBe(200);
    expect(detail.body.id).toBe(TEST_IDS.eventOne);
  });

  it('validates invalid event UUID', async () => {
    const response = await request(app).get('/events/not-a-uuid');
    expect(response.status).toBe(400);
  });

  it('supports reminder channels and reminder plan write', async () => {
    const channels = await request(app).get(`/events/${TEST_IDS.eventOne}/reminder-channels`);
    expect(channels.status).toBe(200);
    expect(channels.body).toMatchObject({ email: true, sms: false });
    expect(typeof channels.body.push).toBe('boolean');

    const save = await request(app).put(`/events/${TEST_IDS.eventOne}/reminder-plan`).send({
      reminderPlan: [{ offset: '2h' }, { offset: '45m' }],
      channels: { push: true, email: true, sms: false }
    });
    expect(save.status).toBe(200);
    expect(save.body.success).toBe(true);
  });

  it('supports retry sync', async () => {
    const response = await request(app).post(`/events/${TEST_IDS.eventOne}/retry-sync`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ eventId: TEST_IDS.eventOne, status: 'synced' });
  });

  it('serves notification history and dashboard summary', async () => {
    const history = await request(app).get(`/events/${TEST_IDS.eventOne}/notification-history`);
    expect(history.status).toBe(200);
    expect(Array.isArray(history.body.history)).toBe(true);

    const dashboard = await request(app).get('/dashboard/summary');
    expect(dashboard.status).toBe(200);
    expect(dashboard.body.nextEventId).toBe(TEST_IDS.eventOne);
  });

  it('serves system profile, updates preferences, integrations, and diagnostics', async () => {
    const profile = await request(app).get('/system/profile');
    expect(profile.status).toBe(200);
    expect(profile.body).toMatchObject({ id: TEST_IDS.user, timezone: 'UTC', calendarSyncEnabled: true });

    const badUpdate = await request(app).put('/system/profile').send({});
    expect(badUpdate.status).toBe(400);

    const update = await request(app).put('/system/profile').send({ timezone: 'Asia/Kolkata', calendarSyncEnabled: false });
    expect(update.status).toBe(200);
    expect(update.body).toMatchObject({ timezone: 'Asia/Kolkata', calendarSyncEnabled: false });

    const integrations = await request(app).get('/system/integrations/status');
    expect(integrations.status).toBe(200);
    expect(integrations.body).toEqual({ googleAuth: 'connected', gmailIngestion: 'healthy', calendarSync: 'disabled' });

    const diagnostics = await request(app).get('/system/diagnostics/activity');
    expect(diagnostics.status).toBe(200);
    expect(Array.isArray(diagnostics.body.activity)).toBe(true);
  });
});
