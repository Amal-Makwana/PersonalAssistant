import { DashboardRepository } from '../repositories/dashboard.repository.js';
import type { DashboardSummaryResponse } from '../types/event.types.js';

export class DashboardService {
  constructor(private readonly dashboardRepository = new DashboardRepository()) {}

  async getSummary(): Promise<DashboardSummaryResponse> {
    return this.dashboardRepository.getSummary();
  }
}
