import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MockEventService, resetMockEventStore } from './mockEventService';

describe('MockEventService', () => {
  beforeEach(() => {
    resetMockEventStore();

    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: string | URL | Request) => {
        const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;

        if (url.includes('scenario=error')) {
          return {
            ok: false,
            json: async () => ({ error: 'Internal Server Error' })
          } as Response;
        }

        return {
          ok: true,
          json: async () => ({
            events: [
              {
                id: 'evt-001',
                title: 'Parent Teacher Meeting',
                date: '2026-05-14T10:00:00Z',
                location: 'School Hall',
                reminderPlan: [{ offset: '24h' }, { offset: '1h' }]
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

    expect(summary.upcomingCount).toBe(1);
    expect(summary.nextEventId).toBe('evt-001');
  });

  it('throws permission error for detail in permission scenario', async () => {
    const service = new MockEventService('permission');

    await expect(service.getEventById('evt-1')).rejects.toThrow('Permission denied for event detail.');
  });

  it('saves reminder schedule in success scenario', async () => {
    const service = new MockEventService('success');

    await service.listEvents();

    const result = await service.saveReminderSettings({
      eventId: 'evt-001',
      reminderOffsetsMinutes: [180, 60, 30],
      channels: { push: true, email: true, sms: false }
    });

    const event = await service.getEventById('evt-001');
    expect(event.reminderOffsetsMinutes).toEqual([180, 60, 30]);
    expect(result.totalReminders).toBe(3);
    expect(result.enabledChannels).toEqual(['push', 'email']);
  });

  it('fails reminder schedule save in error scenario', async () => {
    const service = new MockEventService('error');

    await expect(
      service.saveReminderSettings({
        eventId: 'evt-1',
        reminderOffsetsMinutes: [180, 60],
        channels: { push: true, email: true, sms: false }
      })
    ).rejects.toThrow('Mock save failed for reminder settings.');
  });

  it('returns reminder plan preview based on deterministic offsets', async () => {
    const service = new MockEventService('success');

    const plan = await service.getReminderPlanPreview('evt-1');

    expect(plan.length).toBeGreaterThan(0);
    expect(plan[0].offsetMinutes).toBe(60);
  });

  it('returns notification history preview', async () => {
    const service = new MockEventService('success');

    const history = await service.getNotificationHistoryPreview();

    expect(history.length).toBeGreaterThan(0);
    expect(history[0].status).toBe('Scheduled');
  });

  it('returns empty reminder preview and empty history in empty scenario', async () => {
    const service = new MockEventService('empty');

    const plan = await service.getReminderPlanPreview('evt-1');
    const history = await service.getNotificationHistoryPreview();

    expect(plan).toEqual([]);
    expect(history).toEqual([]);
  });
});
