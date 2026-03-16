import request from 'supertest';
import { afterEach, describe, expect, it } from 'vitest';
import { resetEventsInMemoryState } from '../controllers/events.controller.js';
import dashboardFixture from '../fixtures/dashboard.fixture.json';
import eventsFixture from '../fixtures/events.fixture.json';
import historyFixture from '../fixtures/notification-history.fixture.json';
import { app } from '../app.js';

afterEach(() => {
  resetEventsInMemoryState();
});

describe('Mock API route integration', () => {
  describe('GET /events', () => {
    it('returns events list from fixture contract', async () => {
      const response = await request(app).get('/events');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(eventsFixture);
    });

    it('returns empty list when scenario=empty is requested', async () => {
      const response = await request(app).get('/events?scenario=empty');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(eventsFixture);
      expect(response.body.events).toHaveLength(2);
    });

    it('returns 500 when scenario=error is requested', async () => {
      const response = await request(app).get('/events?scenario=error');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Internal Server Error',
        message: 'Mock error scenario triggered.'
      });
    });
  });

  describe('GET /events/:id', () => {
    it('returns event detail payload', async () => {
      const response = await request(app).get('/events/evt-001');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(eventsFixture.events[0]);
    });

    it('returns 404 for missing event', async () => {
      const response = await request(app).get('/events/missing-id');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Not Found', message: 'Event not found.' });
    });

    it('returns 500 for scenario error', async () => {
      const response = await request(app).get('/events/evt-001?scenario=error');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Internal Server Error',
        message: 'Mock error scenario triggered.'
      });
    });
  });

  describe('PUT /events/:id/reminder-plan', () => {
    it('saves reminder plan and returns deterministic response', async () => {
      const response = await request(app).put('/events/evt-001/reminder-plan').send({
        reminderPlan: [{ offset: '2h' }, { offset: '45m' }],
        channels: { push: true, email: true, sms: false }
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        eventId: 'evt-001',
        message: 'Reminder plan saved',
        reminderCount: 2,
        channels: ['push', 'email'],
        savedAt: '2026-03-15T10:00:00.000Z',
        totalReminders: 2,
        enabledChannels: ['push', 'email']
      });

      const detailResponse = await request(app).get('/events/evt-001');
      expect(detailResponse.body.reminderPlan).toEqual([{ offset: '2h' }, { offset: '45m' }]);
    });

    it('returns validation error for malformed offset', async () => {
      const response = await request(app).put('/events/evt-001/reminder-plan').send({
        reminderPlan: [{ offset: 'tomorrow' }],
        channels: { push: true }
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: 'Bad Request',
        message: 'Validation failed: reminderPlan requires offsets in Nh or Nm format.'
      });
    });

    it('returns 500 for scenario error', async () => {
      const response = await request(app)
        .put('/events/evt-001/reminder-plan?scenario=error')
        .send({ reminderPlan: [{ offset: '1h' }], channels: { push: true } });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Internal Server Error',
        message: 'Mock error scenario triggered.'
      });
    });
  });

  describe('GET /dashboard/summary', () => {
    it('returns dashboard summary fixture shape', async () => {
      const response = await request(app).get('/dashboard/summary');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(dashboardFixture.summary);
    });

    it('returns empty summary for scenario=empty', async () => {
      const response = await request(app).get('/dashboard/summary?scenario=empty');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(dashboardFixture.empty);
    });

    it('returns 500 for scenario=error', async () => {
      const response = await request(app).get('/dashboard/summary?scenario=error');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Internal Server Error',
        message: 'Mock error scenario triggered.'
      });
    });
  });

  describe('GET /events/:id/notification-history', () => {
    it('returns notification history payload', async () => {
      const response = await request(app).get('/events/evt-001/notification-history');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        eventId: 'evt-001',
        history: historyFixture.historyByEventId['evt-001']
      });
    });

    it('returns 404 for missing event notification history', async () => {
      const response = await request(app).get('/events/missing-id/notification-history');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Not Found', message: 'Event not found.' });
    });

    it('returns 500 for notification history scenario error', async () => {
      const response = await request(app).get('/events/evt-001/notification-history?scenario=error');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: 'Internal Server Error',
        message: 'Mock error scenario triggered.'
      });
    });
  });
});
