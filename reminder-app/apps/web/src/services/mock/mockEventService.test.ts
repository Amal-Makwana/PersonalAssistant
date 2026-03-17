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
            json: async () => ({ upcomingCount: 2, needsReviewCount: 1, failedCount: 0, nextEventId: CANONICAL_EVENT_UUIDS.primary })
          } as Response;
        }

        if (url.includes('/notification-history')) {
          return {
            ok: true,
            json: async () => ({
              eventId: CANONICAL_EVENT_UUIDS.primary,
              history: [{ id: 'n-1', status: 'Scheduled', remindAt: '2026-03-19T09:00:00Z', channels: ['push'], direction: 'upcoming' }]
            })
          } as Response;
        }

        if (url.includes(`/events/${CANONICAL_EVENT_UUIDS.primary}/reminder-plan`) && init?.method === 'PUT') {
          const parsedBody = JSON.parse((init.body as string) ?? '{}') as { reminderPlan?: Array<{ offset: string }> };
          reminderPlanState = parsedBody.reminderPlan ?? reminderPlanState;

          return {
            ok: true,
            json: async () => ({
              eventId: CANONICAL_EVENT_UUIDS.primary,
              savedAt: '2026-03-15T10:00:00.000Z',
              totalReminders: reminderPlanState.length,
              enabledChannels: ['push', 'email']
            })
          } as Response;
        }

        if (url.includes(`/events/${CANONICAL_EVENT_UUIDS.primary}`)) {
          return {
            ok: true,
            json: async () => ({
              id: CANONICAL_EVENT_UUIDS.primary,
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
                id: CANONICAL_EVENT_UUIDS.primary,
                title: 'Dentist Appointment',
                date: '2026-03-20T09:00:00Z',
                location: 'Smile Clinic',
                status: 'scheduled',
                duplicate: false,
                syncStatus: 'synced',
                reminderPlan: reminderPlanState
              },
              {
                id: CANONICAL_EVENT_UUIDS.secondary,
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
    expect(summary.nextEventId).toBe(CANONICAL_EVENT_UUIDS.primary);
  });

  it('throws permission error for detail in permission scenario', async () => {
    const service = new MockEventService('permission');

    await expect(service.getEventById(CANONICAL_EVENT_UUIDS.primary)).rejects.toThrow('Permission denied for event detail.');
  });

  it('saves reminder schedule in success scenario', async () => {
    const service = new MockEventService('success');

    await service.listEvents();

    const result = await service.saveReminderSettings({
      eventId: CANONICAL_EVENT_UUIDS.primary,
      reminderOffsetsMinutes: [180, 60, 30],
      channels: { push: true, email: true, sms: false }
    });

    const event = await service.getEventById(CANONICAL_EVENT_UUIDS.primary);
    expect(event.reminderOffsetsMinutes).toEqual([180, 60, 30]);
    expect(result.totalReminders).toBe(3);
    expect(result.enabledChannels).toEqual(['push', 'email']);
  });

  it('fails reminder schedule save in error scenario', async () => {
    const service = new MockEventService('error');

    await expect(
      service.saveReminderSettings({
        eventId: CANONICAL_EVENT_UUIDS.primary,
        reminderOffsetsMinutes: [180, 60],
        channels: { push: true, email: true, sms: false }
      })
    ).rejects.toThrow('Mock save failed for reminder settings.');
  });

  it('returns reminder plan preview based on deterministic offsets', async () => {
    const service = new MockEventService('success');

    const plan = await service.getReminderPlanPreview(CANONICAL_EVENT_UUIDS.primary);

    expect(plan.length).toBeGreaterThan(0);
    expect(plan[0].offsetMinutes).toBe(60);
  });

  it('returns notification history preview', async () => {
    const service = new MockEventService('success');

    const history = await service.getNotificationHistoryPreview(CANONICAL_EVENT_UUIDS.primary);

    expect(history.length).toBeGreaterThan(0);
    expect(history[0].status).toBe('Scheduled');
  });

  it('returns empty reminder preview and empty history in empty scenario', async () => {
    const service = new MockEventService('empty');

    const plan = await service.getReminderPlanPreview(CANONICAL_EVENT_UUIDS.primary);
    const history = await service.getNotificationHistoryPreview(CANONICAL_EVENT_UUIDS.primary);

    expect(plan).toEqual([]);
    expect(history).toEqual([]);
  });
});
