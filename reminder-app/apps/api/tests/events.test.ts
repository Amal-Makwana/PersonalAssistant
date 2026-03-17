import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetEventsInMemoryState } from '../controllers/events.controller.js';
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

afterEach(async () => {
  await resetEventsInMemoryState();
  vi.clearAllMocks();
});

beforeEach(() => {
  const userId = '11111111-1111-4111-8111-111111111111';
  const eventOneId = '22222222-2222-4222-8222-222222222222';
  const eventTwoId = '33333333-3333-4333-8333-333333333333';
  const sourceMessageId = '44444444-4444-4444-8444-444444444444';

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
      eventOneId,
      {
        id: eventOneId,
        user_id: userId,
        title: 'DB Event One',
        description: 'Desk 2',
        start_at: '2026-03-20T09:00:00Z',
        event_date: '2026-03-20T09:00:00Z',
        location: null,
        status: 'ACTIVE',
        created_at: '2026-03-19T09:00:00Z'
      }
    ],
    [
      eventTwoId,
      {
        id: eventTwoId,
        user_id: userId,
        title: 'DB Event Two',
        description: 'Room A',
        start_at: '2026-03-21T10:00:00Z',
        event_date: '2026-03-21T10:00:00Z',
        location: null,
        status: 'ACTIVE',
        created_at: '2026-03-19T10:00:00Z'
      }
    ]
  ]);

  const reminders = new Array<{
    id: string;
    user_id: string;
    event_id: string;
    channel: string;
    scheduled_for: string;
    status: string;
  }>([
    {
      id: '55555555-5555-4555-8555-555555555555',
      user_id: userId,
      event_id: eventOneId,
      channel: 'email',
      scheduled_for: '2026-03-20T08:00:00Z',
      status: 'PENDING'
    }
  ]);

  const deliveryAttempts = new Array<{
    id: string;
    reminder_id: string;
    status: string;
    requested_at: string;
  }>([
    {
      id: '66666666-6666-4666-8666-666666666666',
      reminder_id: '55555555-5555-4555-8555-555555555555',
      status: 'SENT',
      requested_at: '2026-03-20T08:01:00Z'
    }
  ]);

  const sourceMessages = new Array<{ id: string; user_id: string }>([{ id: sourceMessageId, user_id: userId }]);

  mockedQuery.mockImplementation(async (sql: string, params?: unknown[]) => {
    if (sql === 'BEGIN' || sql === 'COMMIT' || sql === 'ROLLBACK') {
      return { rows: [] } as never;
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
          ? [
              {
                id: event.id,
                title: event.title,
                description: event.description,
                event_date: event.event_date,
                start_at: event.start_at,
                location: event.location,
                status: event.status
              }
            ]
          : []
      } as never;
    }

    if (sql.includes('FROM reminders') && sql.includes('event_id = ANY')) {
      const eventIds = (params?.[0] as string[]) ?? [];
      return {
        rows: reminders
          .filter((reminder) => eventIds.includes(reminder.event_id))
          .map((row) => ({ event_id: row.event_id, scheduled_for: row.scheduled_for }))
      } as never;
    }

    if (sql.includes('FROM calendar_sync_records')) {
      return { rows: [] } as never;
    }

    if (sql.includes('SELECT id FROM users')) {
      return { rows: [{ id: userId }] } as never;
    }

    if (sql.includes('SELECT id FROM source_messages')) {
      const found = sourceMessages.find((message) => message.user_id === String(params?.[0]));
      return { rows: found ? [{ id: found.id }] : [] } as never;
    }

    if (sql.includes('INSERT INTO source_messages')) {
      const id = '77777777-7777-4777-8777-777777777777';
      sourceMessages.push({ id, user_id: String(params?.[0]) });
      return { rows: [{ id }] } as never;
    }

    if (sql.includes('INSERT INTO events')) {
      const id = '88888888-8888-4888-8888-888888888888';
      const created = {
        id,
        user_id: String(params?.[0]),
        title: String(params?.[2]),
        description: String(params?.[3]),
        start_at: String(params?.[4]),
        event_date: String(params?.[4]),
        location: null,
        status: 'ACTIVE',
        created_at: '2026-03-15T10:00:00Z'
      };
      events.set(id, created);
      return {
        rows: [
          {
            id,
            title: created.title,
            description: created.description,
            event_date: created.event_date,
            created_at: created.created_at
          }
        ]
      } as never;
    }

    if (sql.includes('SELECT id, user_id, event_date, start_at') && sql.includes('FROM events')) {
      const event = events.get(String(params?.[0]));
      return {
        rows: event ? [{ id: event.id, user_id: event.user_id, event_date: event.event_date, start_at: event.start_at }] : []
      } as never;
    }

    if (sql.includes('DELETE FROM reminders WHERE event_id = $1::uuid')) {
      const eventId = String(params?.[0]);
      for (let i = reminders.length - 1; i >= 0; i -= 1) {
        if (reminders[i].event_id === eventId) {
          reminders.splice(i, 1);
        }
      }
      return { rows: [] } as never;
    }

    if (sql.includes('INSERT INTO reminders')) {
      reminders.push({
        id: `99999999-9999-4999-8999-99999999999${reminders.length}`,
        user_id: String(params?.[0]),
        event_id: String(params?.[1]),
        channel: String(params?.[2]),
        scheduled_for: String(params?.[3]),
        status: 'PENDING'
      });
      return { rows: [] } as never;
    }

    if (sql.includes('SELECT id FROM events WHERE id = $1::uuid')) {
      const event = events.get(String(params?.[0]));
      return { rows: event ? [{ id: event.id }] : [] } as never;
    }

    if (sql.includes('FROM reminders') && sql.includes('channel::text AS channel')) {
      return {
        rows: reminders
          .filter((row) => row.event_id === String(params?.[0]))
          .map((row) => ({
            id: row.id,
            event_id: row.event_id,
            channel: row.channel,
            scheduled_for: row.scheduled_for,
            status: row.status
          }))
      } as never;
    }

    if (sql.includes('FROM delivery_attempts')) {
      const reminderIds = (params?.[0] as string[]) ?? [];
      return {
        rows: deliveryAttempts
          .filter((row) => reminderIds.includes(row.reminder_id))
          .map((row) => ({ id: row.id, reminder_id: row.reminder_id, status: row.status, requested_at: row.requested_at }))
      } as never;
    }

    if (sql.includes('SELECT') && sql.includes('upcoming_count') && sql.includes('FROM events')) {
      return { rows: [{ upcoming_count: '2', needs_review_count: '0', failed_count: '0' }] } as never;
    }

    if (sql.includes('SELECT id::text') && sql.includes('FROM events') && sql.includes('LIMIT 1')) {
      return { rows: [{ id: eventOneId }] } as never;
    }

    throw new Error(`Unhandled SQL in test mock: ${sql}`);
  });
});

describe('API route integration (canonical schema aligned)', () => {
  const eventOneId = '22222222-2222-4222-8222-222222222222';

  it('GET /events returns DB-backed list mapped to frontend contract', async () => {
    const response = await request(app).get('/events');

    expect(response.status).toBe(200);
    expect(response.body.events[0]).toMatchObject({
      id: eventOneId,
      title: 'DB Event One',
      status: 'scheduled',
      syncStatus: 'pending'
    });
  });

  it('POST /events creates an event in DB schema and returns created row', async () => {
    const response = await request(app).post('/events').send({
      title: 'Created Event',
      description: 'Description',
      event_date: '2026-04-01T12:00:00Z'
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: '88888888-8888-4888-8888-888888888888',
      title: 'Created Event'
    });
  });

  it('GET /events/:id validates UUID format', async () => {
    const response = await request(app).get('/events/not-a-uuid');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Bad Request', message: 'Validation failed: event ID must be a UUID.' });
  });

  it('GET /events/:id returns event detail payload for UUID id', async () => {
    const response = await request(app).get(`/events/${eventOneId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(eventOneId);
  });

  it('PUT /events/:id/reminder-plan writes reminders and returns success contract', async () => {
    const response = await request(app).put(`/events/${eventOneId}/reminder-plan`).send({
      reminderPlan: [{ offset: '2h' }, { offset: '45m' }],
      channels: { push: true, email: true, sms: false }
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      eventId: eventOneId,
      reminderCount: 2,
      channels: ['push', 'email']
    });
  });

  it('GET /events/:id/notification-history derives history from reminders + delivery_attempts', async () => {
    await request(app).put(`/events/${eventOneId}/reminder-plan`).send({
      reminderPlan: [{ offset: '1h' }],
      channels: { push: true, email: false, sms: false }
    });

    const response = await request(app).get(`/events/${eventOneId}/notification-history`);

    expect(response.status).toBe(200);
    expect(response.body.eventId).toBe(eventOneId);
    expect(Array.isArray(response.body.history)).toBe(true);
    expect(response.body.history.length).toBeGreaterThan(0);
    expect(response.body.history[0]).toMatchObject({
      status: 'Scheduled'
    });
  });

  it('GET /dashboard/summary returns DB-backed UUID nextEventId and event detail resolves', async () => {
    const summaryResponse = await request(app).get('/dashboard/summary');

    expect(summaryResponse.status).toBe(200);
    expect(summaryResponse.body).toEqual({
      upcomingCount: 2,
      needsReviewCount: 0,
      failedCount: 0,
      nextEventId: eventOneId
    });
    expect(summaryResponse.body.nextEventId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );

    const eventDetailResponse = await request(app).get(`/events/${summaryResponse.body.nextEventId}`);
    expect(eventDetailResponse.status).toBe(200);
    expect(eventDetailResponse.body.id).toBe(summaryResponse.body.nextEventId);
  });
});
