import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
=======
import { resetEventsInMemoryState } from '../controllers/events.controller.js';
>>>>>>> main
import { app } from '../app.js';
import { resetEventsInMemoryState } from '../controllers/events.controller.js';
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
  eventTwo: '33333333-3333-4333-8333-333333333333',
  sourceMessage: '44444444-4444-4444-8444-444444444444'
} as const;

afterEach(async () => {
  await resetEventsInMemoryState();
  vi.clearAllMocks();
});

beforeEach(() => {
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
=======
  const userId = '11111111-1111-4111-8111-111111111111';
  const eventOneId = '22222222-2222-4222-8222-222222222222';
  const eventTwoId = '33333333-3333-4333-8333-333333333333';
  const sourceMessageId = '44444444-4444-4444-8444-444444444444';

>>>>>>> main
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
    ],
    [
      TEST_IDS.eventTwo,
      {
        id: TEST_IDS.eventTwo,
        user_id: TEST_IDS.user,
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
      user_id: TEST_IDS.user,
      event_id: TEST_IDS.eventOne,
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

  const sourceMessages = new Array<{ id: string; user_id: string }>([{ id: TEST_IDS.sourceMessage, user_id: TEST_IDS.user }]);

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
      return { rows: [{ id: TEST_IDS.user }] } as never;
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
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
        rows: [{ id, title: created.title, description: created.description, event_date: created.event_date, created_at: created.created_at }]
=======
        rows: [
          {
            id,
            title: created.title,
            description: created.description,
            event_date: created.event_date,
            created_at: created.created_at
          }
        ]
>>>>>>> main
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
          .map((row) => ({ id: row.id, event_id: row.event_id, channel: row.channel, scheduled_for: row.scheduled_for, status: row.status }))
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
      return { rows: [{ id: TEST_IDS.eventOne }] } as never;
    }

    throw new Error(`Unhandled SQL in test mock: ${sql}`);
  });
});

describe('API route integration (canonical schema aligned)', () => {
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
=======
  const eventOneId = '22222222-2222-4222-8222-222222222222';

>>>>>>> main
  it('GET /events returns DB-backed list mapped to frontend contract', async () => {
    const response = await request(app).get('/events');

    expect(response.status).toBe(200);
    expect(response.body.events[0]).toMatchObject({
      id: TEST_IDS.eventOne,
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

  it('GET /events/:id validates invalid UUID format', async () => {
    const response = await request(app).get('/events/not-a-uuid');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Bad Request', message: 'Validation failed: event ID must be a UUID.' });
  });

  it('GET /events/:id returns event detail for a valid UUID', async () => {
    const response = await request(app).get(`/events/${TEST_IDS.eventOne}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(TEST_IDS.eventOne);
  });

  it('PUT /events/:id/reminder-plan validates invalid UUID format', async () => {
    const response = await request(app).put('/events/not-a-uuid/reminder-plan').send({
      reminderPlan: [{ offset: '1h' }],
      channels: { push: true }
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Bad Request', message: 'Validation failed: event ID must be a UUID.' });
  });

  it('PUT /events/:id/reminder-plan writes reminders for a valid UUID', async () => {
    const response = await request(app).put(`/events/${TEST_IDS.eventOne}/reminder-plan`).send({
      reminderPlan: [{ offset: '2h' }, { offset: '45m' }],
      channels: { push: true, email: true, sms: false }
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      eventId: TEST_IDS.eventOne,
      reminderCount: 2,
      channels: ['push', 'email']
    });
  });

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
  it('GET /events/:id/notification-history validates invalid UUID format', async () => {
    const response = await request(app).get('/events/not-a-uuid/notification-history');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Bad Request', message: 'Validation failed: event ID must be a UUID.' });
  });

  it('GET /events/:id/notification-history returns derived history for a valid UUID', async () => {
    await request(app).put(`/events/${TEST_IDS.eventOne}/reminder-plan`).send({
=======
  it('GET /events/:id/notification-history derives history from reminders + delivery_attempts', async () => {
    await request(app).put(`/events/${eventOneId}/reminder-plan`).send({
>>>>>>> main
      reminderPlan: [{ offset: '1h' }],
      channels: { push: true, email: false, sms: false }
    });

    const response = await request(app).get(`/events/${TEST_IDS.eventOne}/notification-history`);

    expect(response.status).toBe(200);
    expect(response.body.eventId).toBe(TEST_IDS.eventOne);
    expect(Array.isArray(response.body.history)).toBe(true);
    expect(response.body.history.length).toBeGreaterThan(0);
    expect(response.body.history[0]).toMatchObject({ status: 'Scheduled' });
  });

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
  it('GET /dashboard/summary returns DB-backed UUID nextEventId', async () => {
    const response = await request(app).get('/dashboard/summary');
=======
  it('GET /dashboard/summary returns DB-backed UUID nextEventId and event detail resolves', async () => {
    const summaryResponse = await request(app).get('/dashboard/summary');
>>>>>>> main

    expect(summaryResponse.status).toBe(200);
    expect(summaryResponse.body).toEqual({
      upcomingCount: 2,
      needsReviewCount: 0,
      failedCount: 0,
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
      nextEventId: TEST_IDS.eventOne
=======
      nextEventId: eventOneId
>>>>>>> main
    });
    expect(summaryResponse.body.nextEventId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );

    const eventDetailResponse = await request(app).get(`/events/${summaryResponse.body.nextEventId}`);
    expect(eventDetailResponse.status).toBe(200);
    expect(eventDetailResponse.body.id).toBe(summaryResponse.body.nextEventId);
  });
});
