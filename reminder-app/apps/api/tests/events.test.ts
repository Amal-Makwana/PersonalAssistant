import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetEventsInMemoryState } from '../controllers/events.controller.js';
import { query } from '../lib/db.js';
import dashboardFixture from '../fixtures/dashboard.fixture.js';
import notificationHistoryFixture from '../fixtures/notification-history.fixture.js';
import { app } from '../app.js';

vi.mock('../lib/db.js', () => ({
  query: vi.fn(),
  closeDbPool: vi.fn()
}));

const mockedQuery = vi.mocked(query);

afterEach(async () => {
  await resetEventsInMemoryState();
  vi.clearAllMocks();
});

beforeEach(() => {
  mockedQuery.mockImplementation(async (sql: string, params?: unknown[]) => {
    if (sql.includes('WHERE id = $1')) {
      const eventId = params?.[0];
      if (eventId === 'evt-db-001') {
        return {
          rows: [
            {
              id: 'evt-db-001',
              title: 'DB Event One',
              description: 'Desk 2',
              event_date: '2026-03-20T09:00:00Z',
              created_at: '2026-03-19T09:00:00Z'
            }
          ]
        } as never;
      }

      if (eventId === 'evt-001') {
        return {
          rows: [
            {
              id: 'evt-001',
              title: 'Fixture-Compatible Event',
              description: 'Smile Clinic',
              event_date: '2026-03-20T09:00:00Z',
              created_at: '2026-03-19T09:00:00Z'
            }
          ]
        } as never;
      }

      return { rows: [] } as never;
    }

    return {
      rows: [
        {
          id: 'evt-db-001',
          title: 'DB Event One',
          description: 'Desk 2',
          event_date: '2026-03-20T09:00:00Z',
          created_at: '2026-03-19T09:00:00Z'
        },
        {
          id: 'evt-db-002',
          title: 'DB Event Two',
          description: null,
          event_date: '2026-03-21T10:00:00Z',
          created_at: '2026-03-19T10:00:00Z'
        }
      ] as never[]
    } as never;
  });
});

describe('Mock API route integration', () => {
  describe('GET /events', () => {
    it('returns events list from DB mapped to existing frontend contract', async () => {
      const response = await request(app).get('/events');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        events: [
          {
            id: 'evt-db-001',
            title: 'DB Event One',
            date: '2026-03-20T09:00:00Z',
            location: 'Desk 2',
            status: 'scheduled',
            duplicate: false,
            syncStatus: 'pending',
            reminderPlan: []
          },
          {
            id: 'evt-db-002',
            title: 'DB Event Two',
            date: '2026-03-21T10:00:00Z',
            status: 'scheduled',
            duplicate: false,
            syncStatus: 'pending',
            reminderPlan: []
          }
        ]
      });
    });

    it('returns 500 when scenario=error is requested', async () => {
      const response = await request(app).get('/events?scenario=error');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Internal Server Error',
        message: 'Forced error scenario triggered.'
      });
    });
  });

  describe('POST /events', () => {
    it('creates an event in DB and returns created row', async () => {
      const response = await request(app).post('/events').send({
        title: 'Created Event',
        description: 'Description',
        event_date: '2026-04-01T12:00:00Z'
      });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 'evt-created-001',
        title: 'Created Event',
        description: 'Description',
        event_date: '2026-04-01T12:00:00Z',
        created_at: '2026-03-15T10:00:00Z'
      });
    });

    it('validates required create payload fields', async () => {
      const response = await request(app).post('/events').send({
        title: 'Missing fields'
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Bad Request',
        message: 'Validation failed: title, description, and event_date are required.'
      });
    });
  });

  describe('GET /events/:id', () => {
    it('returns event detail payload', async () => {
      const response = await request(app).get('/events/evt-db-001');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: 'evt-db-001',
        title: 'DB Event One',
        date: '2026-03-20T09:00:00Z',
        location: 'Desk 2',
        status: 'scheduled',
        duplicate: false,
        syncStatus: 'pending',
        reminderPlan: []
      });
    });

    it('returns 404 for missing event', async () => {
      const response = await request(app).get('/events/missing-id');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Not Found', message: 'Event not found.' });
    });

    it('returns 500 for scenario error', async () => {
      const response = await request(app).get('/events/evt-db-001?scenario=error');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Internal Server Error',
        message: 'Mock error scenario triggered.'
      });
    });
  });

  describe('PUT /events/:id/reminder-plan', () => {
    it('saves reminder plan in DB-backed tables and returns response', async () => {
      const response = await request(app).put('/events/evt-db-001/reminder-plan').send({
        reminderPlan: [{ offset: '2h' }, { offset: '45m' }],
        channels: { push: true, email: true, sms: false }
      });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        success: true,
        eventId: 'evt-db-001',
        message: 'Reminder plan saved',
        reminderCount: 2,
        channels: ['push', 'email'],
        totalReminders: 2,
        enabledChannels: ['push', 'email']
      });
      expect(typeof response.body.savedAt).toBe('string');

      const detailResponse = await request(app).get('/events/evt-db-001');
      expect(detailResponse.body.reminderPlan).toEqual([{ offset: '2h' }, { offset: '45m' }]);
    });

    it('returns 404 for missing event on save', async () => {
      const response = await request(app).put('/events/missing-id/reminder-plan').send({
        reminderPlan: [{ offset: '1h' }],
        channels: { push: true }
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Not Found', message: 'Event not found.' });
    });
  });

  describe('GET /events/:id/notification-history', () => {
    it('returns DB-backed notification history generated by reminder save', async () => {
      await request(app).put('/events/evt-db-001/reminder-plan').send({
        reminderPlan: [{ offset: '1h' }],
        channels: { push: true, email: false, sms: false }
      });

      const response = await request(app).get('/events/evt-db-001/notification-history');
      expect(response.status).toBe(200);
      expect(response.body.eventId).toBe('evt-db-001');
      expect(response.body.history).toHaveLength(1);
      expect(response.body.history[0]).toMatchObject({
        status: 'Scheduled',
        channels: ['push'],
        direction: 'upcoming'
      });
    });

    it('returns 404 for missing event notification history', async () => {
      const response = await request(app).get('/events/missing-id/notification-history');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Not Found', message: 'Event not found.' });
    });
  });

  describe('GET /dashboard/summary', () => {
    it('returns dashboard summary fixture shape', async () => {
      const response = await request(app).get('/dashboard/summary');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(dashboardFixture.summary);
    });
  });
});
