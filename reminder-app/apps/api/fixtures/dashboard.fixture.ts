import type { DashboardSummaryResponse } from '../types/event.types.js';

interface DashboardFixture {
  summary: DashboardSummaryResponse;
  empty: DashboardSummaryResponse;
}

export const dashboardFixture: DashboardFixture = {
  summary: {
    upcomingCount: 2,
    needsReviewCount: 1,
    failedCount: 0,
    nextEventId: '22222222-2222-4222-8222-222222222222'
  },
  empty: {
    upcomingCount: 0,
    needsReviewCount: 0,
    failedCount: 0
  }
};

export default dashboardFixture;
