import request from 'supertest';
import { afterEach, describe, expect, it } from 'vitest';
import { resetEventsInMemoryState } from '../controllers/events.controller';
import { app } from '../server';

afterEach(() => {
  resetEventsInMemoryState();
});

describe('Mock API endpoints', () => {
  it('GET /events returns events list from fixture', async () => {
    const response = await request(app).get('/events');

    expect(response.status).toBe(200);
    expect(response.body.events.length).toBe(2);
    expect(response.body.events[0].id).toBe('evt-1');
  });

  it('GET /events/:id returns event details', async () => {
    const response = await request(app).get('/events/evt-1');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: 'evt-1', title: 'Dentist Appointment' });
  });

  it('GET /events/:id returns 404 for unknown id', async () => {
    const response = await request(app).get('/events/missing-id');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found', message: 'Event not found.' });
  });

  it('PUT /events/:id/reminder-plan updates plan and returns deterministic success', async () => {
    const response = await request(app).put('/events/evt-1/reminder-plan').send({
      reminderPlan: [{ offset: '2h' }, { offset: '45m' }],
      channels: { push: true, email: true, sms: false }
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      eventId: 'evt-1',
      savedAt: '2026-03-15T10:00:00.000Z',
      totalReminders: 2,
      enabledChannels: ['push', 'email']
    });

    const detailResponse = await request(app).get('/events/evt-1');
    expect(detailResponse.body.reminderPlan).toEqual([{ offset: '2h' }, { offset: '45m' }]);
  });

  it('PUT /events/:id/reminder-plan returns validation error', async () => {
    const response = await request(app).put('/events/evt-1/reminder-plan').send({
      reminderPlan: [{ offset: 'tomorrow' }],
      channels: { push: true }
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Bad Request',
      message: 'Validation failed: reminderPlan requires offsets in Nh or Nm format.'
    });
  });

  it('GET /dashboard/summary returns deterministic summary', async () => {
    const response = await request(app).get('/dashboard/summary');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      upcomingCount: 2,
      needsReviewCount: 1,
      failedCount: 0,
      nextEventId: 'evt-1'
    });
  });

  it('GET /events/:id/notification-history returns history entries', async () => {
    const response = await request(app).get('/events/evt-1/notification-history');

    expect(response.status).toBe(200);
    expect(response.body.eventId).toBe('evt-1');
    expect(response.body.history.length).toBeGreaterThan(0);
    expect(response.body.history[0].status).toBe('Scheduled');
  });

  it('returns 500 for scenario=error where supported', async () => {
    const eventsError = await request(app).get('/events?scenario=error');
    const eventError = await request(app).get('/events/evt-1?scenario=error');
    const saveError = await request(app)
      .put('/events/evt-1/reminder-plan?scenario=error')
      .send({ reminderPlan: [{ offset: '1h' }], channels: { push: true } });
    const dashboardError = await request(app).get('/dashboard/summary?scenario=error');
    const historyError = await request(app).get('/events/evt-1/notification-history?scenario=error');

    expect(eventsError.status).toBe(500);
    expect(eventError.status).toBe(500);
    expect(saveError.status).toBe(500);
    expect(dashboardError.status).toBe(500);
    expect(historyError.status).toBe(500);
  });
});
