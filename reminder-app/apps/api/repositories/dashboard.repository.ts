import dashboardFixture from '../fixtures/dashboard.fixture.js';
import type { DashboardSummaryResponse } from '../types/event.types.js';

export class DashboardRepository {
  getSummary(scenario?: string): DashboardSummaryResponse {
    if (scenario === 'empty') {
      return { ...dashboardFixture.empty };
    }

    return { ...dashboardFixture.summary };
  }
}
