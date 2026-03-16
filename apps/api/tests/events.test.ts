import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../server';

describe('GET /events', () => {
  it('returns events list from fixture', async () => {
    const response = await request(app).get('/events');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      events: [
        {
          id: 'evt-001',
          title: 'Parent Teacher Meeting',
          date: '2026-05-14T10:00:00Z',
          location: 'School Hall',
          reminderPlan: [{ offset: '24h' }, { offset: '1h' }]
        }
      ]
    });
  });

  it('returns 500 when scenario=error', async () => {
    const response = await request(app).get('/events?scenario=error');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Internal Server Error',
      message: 'Mock error scenario triggered.'
    });
  });
});
