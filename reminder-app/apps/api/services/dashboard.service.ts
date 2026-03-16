import { DashboardRepository } from '../repositories/dashboard.repository.js';
import type { DashboardSummaryResponse } from '../types/event.types.js';

export class DashboardService {
  constructor(private readonly dashboardRepository = new DashboardRepository()) {}

  getSummary(scenario?: string): DashboardSummaryResponse {
    if (scenario === 'error') {
      throw new Error('Mock error scenario triggered.');
    }

    return this.dashboardRepository.getSummary(scenario);
  }
}
