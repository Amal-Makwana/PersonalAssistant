import type { ActivityLog } from '../types/models';

export const activityFixture: ActivityLog[] = [
  { id: 'a-1', message: 'Mock ingestion completed', level: 'info' },
  { id: 'a-2', message: 'Duplicate detected for 33333333-3333-4333-8333-333333333333', level: 'warning' }
];
