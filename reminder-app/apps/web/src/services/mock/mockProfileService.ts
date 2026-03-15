import { userFixture } from '../../mocks/users.mock';
import type { UserProfile } from '../../types/models';
import { wait } from './delay';

export class MockProfileService {
  async getProfile(): Promise<UserProfile> {
    await wait();
    return userFixture;
  }

  async updateTimezone(timezone: string): Promise<UserProfile> {
    await wait(200);
    return { ...userFixture, timezone };
  }
}
