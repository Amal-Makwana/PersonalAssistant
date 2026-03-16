import type { ReminderChannelConfig, ReminderPlanOffsetConfig } from '../types/models';

export const reminderPlanOffsetsFixture: ReminderPlanOffsetConfig[] = [
  {
    id: 'offset-24h',
    label: '24 hours before',
    minutesBefore: 24 * 60
  },
  {
    id: 'offset-1h',
    label: '1 hour before',
    minutesBefore: 60
  }
];

export const reminderChannelsFixture: Record<string, ReminderChannelConfig> = {
  default: {
    push: true,
    email: true,
    sms: false
  }
};
