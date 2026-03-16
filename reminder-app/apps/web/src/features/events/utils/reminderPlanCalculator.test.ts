import { describe, expect, it } from 'vitest';
import { calculateReminderPlan, formatReminderDateTime } from './reminderPlanCalculator';

describe('reminderPlanCalculator', () => {
  it('calculates reminder entries with deterministic offsets', () => {
    const entries = calculateReminderPlan('2026-06-25T10:00:00Z', [
      { id: 'a', label: '24 hours before', minutesBefore: 24 * 60 },
      { id: 'b', label: '1 hour before', minutesBefore: 60 }
    ]);

    expect(entries).toHaveLength(2);
    expect(entries[0].remindAt).toBe('2026-06-24T10:00:00.000Z');
    expect(entries[1].remindAt).toBe('2026-06-25T09:00:00.000Z');
  });

  it('returns empty list when event time missing', () => {
    const entries = calculateReminderPlan('', [{ id: 'a', label: '24 hours before', minutesBefore: 1440 }]);
    expect(entries).toEqual([]);
  });

  it('formats reminder datetime for readable preview', () => {
    expect(formatReminderDateTime('2026-06-24T10:00:00.000Z')).toBe('24 Jun 2026, 10:00');
  });
});
