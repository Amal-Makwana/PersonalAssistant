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
    expect(response.body.events[0].id).toBe('evt-001');
  });

  it('GET /events/:id success', async () => {
    const response = await request(app).get('/events/evt-001');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ id: 'evt-001', title: 'Dentist Appointment' });
  });

  it('GET /events/:id 404', async () => {
    const response = await request(app).get('/events/missing-id');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found', message: 'Event not found.' });
  });

  it('GET /events/:id?scenario=error returns 500', async () => {
    const response = await request(app).get('/events/evt-001?scenario=error');

    expect(response.status).toBe(500);
  });

  it('PUT /events/:id/reminder-plan success', async () => {
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

  it('PUT /events/:id/reminder-plan validation error', async () => {
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

  it('PUT /events/:id/reminder-plan?scenario=error returns 500', async () => {
    const response = await request(app)
      .put('/events/evt-001/reminder-plan?scenario=error')
      .send({ reminderPlan: [{ offset: '1h' }], channels: { push: true } });

    expect(response.status).toBe(500);
  });

  it('GET /dashboard/summary success', async () => {
    const response = await request(app).get('/dashboard/summary');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      upcomingCount: 2,
      needsReviewCount: 1,
      failedCount: 0,
      nextEventId: 'evt-001'
    });
  });

  it('GET /dashboard/summary?scenario=error returns 500', async () => {
    const response = await request(app).get('/dashboard/summary?scenario=error');

    expect(response.status).toBe(500);
  });

  it('GET /events/:id/notification-history success', async () => {
    const response = await request(app).get('/events/evt-001/notification-history');

    expect(response.status).toBe(200);
    expect(response.body.eventId).toBe('evt-001');
    expect(response.body.history.length).toBeGreaterThan(0);
    expect(response.body.history.map((entry: { status: string }) => entry.status)).toEqual(
      expect.arrayContaining(['Scheduled', 'Sent', 'Failed', 'Cancelled'])
    );
  });

  it('GET /events/:id/notification-history 404', async () => {
    const response = await request(app).get('/events/missing-id/notification-history');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found', message: 'Event not found.' });
  });

  it('GET /events/:id/notification-history?scenario=error returns 500', async () => {
    const response = await request(app).get('/events/evt-001/notification-history?scenario=error');

    expect(response.status).toBe(500);
  });
});
