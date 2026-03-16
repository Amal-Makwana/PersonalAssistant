import type { ActivityLog } from '../types/models';

export const activityFixture: ActivityLog[] = [
  { id: 'a-1', message: 'Mock ingestion completed', level: 'info' },
  { id: 'a-2', message: 'Duplicate detected for evt-002', level: 'warning' }
];
