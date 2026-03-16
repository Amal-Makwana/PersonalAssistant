import { beforeEach, describe, expect, it } from 'vitest';
import { MockEventService, resetMockEventStore } from './mockEventService';

describe('MockEventService', () => {
  beforeEach(() => {
    resetMockEventStore();
  });

  it('returns summary in success scenario', async () => {
    const service = new MockEventService('success');

    const summary = await service.getDashboardSummary();

    expect(summary.upcomingCount).toBe(2);
    expect(summary.nextEventId).toBe('evt-1');
  });

  it('throws permission error for detail in permission scenario', async () => {
    const service = new MockEventService('permission');

    await expect(service.getEventById('evt-1')).rejects.toThrow('Permission denied for event detail.');
  });

  it('saves reminder schedule in success scenario', async () => {
    const service = new MockEventService('success');

    const result = await service.saveReminderSettings({
      eventId: 'evt-1',
      reminderOffsetsMinutes: [180, 60, 30],
      channels: { push: true, email: true, sms: false }
    });

    const event = await service.getEventById('evt-1');
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
