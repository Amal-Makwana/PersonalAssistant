import { activityFixture } from '../../mocks/diagnostics.mock';
import type { ActivityLog, Scenario } from '../../types/models';
import { wait } from './delay';

export class MockDiagnosticsService {
  constructor(private readonly scenario: Scenario = 'success') {}

  async getActivity(): Promise<ActivityLog[]> {
    await wait();
    if (this.scenario === 'error') {
      throw new Error('Failed to load diagnostics');
    }
    if (this.scenario === 'empty') {
      return [];
    }
    return activityFixture;
  }
}
