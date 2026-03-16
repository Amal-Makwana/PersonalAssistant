import dashboardFixture from '../fixtures/dashboard.fixture.json';
import type { DashboardSummaryResponse } from '../types/event.types';

export class DashboardRepository {
  getSummary(scenario?: string): DashboardSummaryResponse {
    if (scenario === 'empty') {
      return { ...dashboardFixture.empty };
    }

    return { ...dashboardFixture.summary };
  }
}
