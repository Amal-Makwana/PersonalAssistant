import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CANONICAL_EVENT_UUIDS } from '../../test/canonicalEventIds';
import { MockEventService, resetMockEventStore } from './mockEventService';

describe('MockEventService', () => {
  beforeEach(() => {
    resetMockEventStore();

    let reminderPlanState = [{ offset: '24h' }, { offset: '3h' }, { offset: '1h' }];

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

        if (url.includes('scenario=error')) {
          return {
            ok: false,
            json: async () => ({ error: 'Internal Server Error' })
          } as Response;
        }

        if (url.includes('/dashboard/summary')) {
          return {
            ok: true,
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
            json: async () => ({ upcomingCount: 2, needsReviewCount: 1, failedCount: 0, nextEventId: CANONICAL_EVENT_UUIDS.primary })
=======
            json: async () => ({ upcomingCount: 2, needsReviewCount: 1, failedCount: 0, nextEventId: '22222222-2222-4222-8222-222222222222' })
>>>>>>> main
          } as Response;
        }

        if (url.includes('/notification-history')) {
          return {
            ok: true,
            json: async () => ({
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
              eventId: CANONICAL_EVENT_UUIDS.primary,
=======
              eventId: '22222222-2222-4222-8222-222222222222',
>>>>>>> main
              history: [{ id: 'n-1', status: 'Scheduled', remindAt: '2026-03-19T09:00:00Z', channels: ['push'], direction: 'upcoming' }]
            })
          } as Response;
        }

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
        if (url.includes(`/events/${CANONICAL_EVENT_UUIDS.primary}/reminder-plan`) && init?.method === 'PUT') {
=======
        if (url.includes('/events/22222222-2222-4222-8222-222222222222/reminder-plan') && init?.method === 'PUT') {
>>>>>>> main
          const parsedBody = JSON.parse((init.body as string) ?? '{}') as { reminderPlan?: Array<{ offset: string }> };
          reminderPlanState = parsedBody.reminderPlan ?? reminderPlanState;

          return {
            ok: true,
            json: async () => ({
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
              eventId: CANONICAL_EVENT_UUIDS.primary,
=======
              eventId: '22222222-2222-4222-8222-222222222222',
>>>>>>> main
              savedAt: '2026-03-15T10:00:00.000Z',
              totalReminders: reminderPlanState.length,
              enabledChannels: ['push', 'email']
            })
          } as Response;
        }

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
        if (url.includes(`/events/${CANONICAL_EVENT_UUIDS.primary}`)) {
          return {
            ok: true,
            json: async () => ({
              id: CANONICAL_EVENT_UUIDS.primary,
=======
        if (url.includes('/events/22222222-2222-4222-8222-222222222222')) {
          return {
            ok: true,
            json: async () => ({
              id: '22222222-2222-4222-8222-222222222222',
>>>>>>> main
              title: 'Dentist Appointment',
              date: '2026-03-20T09:00:00Z',
              location: 'Smile Clinic',
              status: 'scheduled',
              duplicate: false,
              syncStatus: 'synced',
              reminderPlan: reminderPlanState
            })
          } as Response;
        }

        return {
          ok: true,
          json: async () => ({
            events: [
              {
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
                id: CANONICAL_EVENT_UUIDS.primary,
=======
                id: '22222222-2222-4222-8222-222222222222',
>>>>>>> main
                title: 'Dentist Appointment',
                date: '2026-03-20T09:00:00Z',
                location: 'Smile Clinic',
                status: 'scheduled',
                duplicate: false,
                syncStatus: 'synced',
                reminderPlan: reminderPlanState
              },
              {
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
                id: CANONICAL_EVENT_UUIDS.secondary,
=======
                id: '33333333-3333-4333-8333-333333333333',
>>>>>>> main
                title: 'Client Follow-up',
                date: '2026-03-21T13:30:00Z',
                status: 'needs-review',
                duplicate: true,
                syncStatus: 'pending',
                reminderPlan: [{ offset: '24h' }, { offset: '30m' }]
              }
            ]
          })
        } as Response;
      })
    );
  });

  it('returns summary in success scenario', async () => {
    const service = new MockEventService('success');

    const summary = await service.getDashboardSummary();

    expect(summary.upcomingCount).toBe(2);
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    expect(summary.nextEventId).toBe(CANONICAL_EVENT_UUIDS.primary);
=======
    expect(summary.nextEventId).toBe('22222222-2222-4222-8222-222222222222');
>>>>>>> main
  });

  it('throws permission error for detail in permission scenario', async () => {
    const service = new MockEventService('permission');

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    await expect(service.getEventById(CANONICAL_EVENT_UUIDS.primary)).rejects.toThrow('Permission denied for event detail.');
=======
    await expect(service.getEventById('22222222-2222-4222-8222-222222222222')).rejects.toThrow('Permission denied for event detail.');
>>>>>>> main
  });

  it('saves reminder schedule in success scenario', async () => {
    const service = new MockEventService('success');

    await service.listEvents();

    const result = await service.saveReminderSettings({
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
      eventId: CANONICAL_EVENT_UUIDS.primary,
=======
      eventId: '22222222-2222-4222-8222-222222222222',
>>>>>>> main
      reminderOffsetsMinutes: [180, 60, 30],
      channels: { push: true, email: true, sms: false }
    });

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    const event = await service.getEventById(CANONICAL_EVENT_UUIDS.primary);
=======
    const event = await service.getEventById('22222222-2222-4222-8222-222222222222');
>>>>>>> main
    expect(event.reminderOffsetsMinutes).toEqual([180, 60, 30]);
    expect(result.totalReminders).toBe(3);
    expect(result.enabledChannels).toEqual(['push', 'email']);
  });

  it('fails reminder schedule save in error scenario', async () => {
    const service = new MockEventService('error');

    await expect(
      service.saveReminderSettings({
<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
        eventId: CANONICAL_EVENT_UUIDS.primary,
=======
        eventId: '22222222-2222-4222-8222-222222222222',
>>>>>>> main
        reminderOffsetsMinutes: [180, 60],
        channels: { push: true, email: true, sms: false }
      })
    ).rejects.toThrow('Mock save failed for reminder settings.');
  });

  it('returns reminder plan preview based on deterministic offsets', async () => {
    const service = new MockEventService('success');

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    const plan = await service.getReminderPlanPreview(CANONICAL_EVENT_UUIDS.primary);
=======
    const plan = await service.getReminderPlanPreview('22222222-2222-4222-8222-222222222222');
>>>>>>> main

    expect(plan.length).toBeGreaterThan(0);
    expect(plan[0].offsetMinutes).toBe(60);
  });

  it('returns notification history preview', async () => {
    const service = new MockEventService('success');

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    const history = await service.getNotificationHistoryPreview(CANONICAL_EVENT_UUIDS.primary);
=======
    const history = await service.getNotificationHistoryPreview('22222222-2222-4222-8222-222222222222');
>>>>>>> main

    expect(history.length).toBeGreaterThan(0);
    expect(history[0].status).toBe('Scheduled');
  });

  it('returns empty reminder preview and empty history in empty scenario', async () => {
    const service = new MockEventService('empty');

<<<<<<< codex/sweep-legacy-ids-and-add-tests-bm2d5y
    const plan = await service.getReminderPlanPreview(CANONICAL_EVENT_UUIDS.primary);
    const history = await service.getNotificationHistoryPreview(CANONICAL_EVENT_UUIDS.primary);
=======
    const plan = await service.getReminderPlanPreview('22222222-2222-4222-8222-222222222222');
    const history = await service.getNotificationHistoryPreview('22222222-2222-4222-8222-222222222222');
>>>>>>> main

    expect(plan).toEqual([]);
    expect(history).toEqual([]);
  });
});
