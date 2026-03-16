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

  it('saves reminders in success scenario', async () => {
    const service = new MockEventService('success');

    await service.saveReminderSettings({
      eventId: 'evt-1',
      reminderSettings: {
        primaryMinutesBefore: 30,
        secondaryMinutesBefore: 10,
        timezone: 'UTC'
      }
    });

    const event = await service.getEventById('evt-1');
    expect(event.reminderSettings.primaryMinutesBefore).toBe(30);
  });

  it('returns reminder plan preview based on deterministic offsets', async () => {
    const service = new MockEventService('success');

    const plan = await service.getReminderPlanPreview('evt-1');

    expect(plan).toHaveLength(2);
    expect(plan[0].label).toBe('24 hours before');
  });

  it('returns empty reminder preview in empty scenario', async () => {
    const service = new MockEventService('empty');

    const plan = await service.getReminderPlanPreview('evt-1');

    expect(plan).toEqual([]);
  });
});
