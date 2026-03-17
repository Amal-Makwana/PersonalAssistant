import { SystemRepository } from '../repositories/system.repository.js';
import type {
  ActivityLogResponse,
  IntegrationsStatusResponse,
  UpdateProfileRequest,
  UserProfileResponse
} from '../types/system.types.js';

export class ValidationError extends Error {}

export class SystemService {
  constructor(private readonly systemRepository = new SystemRepository()) {}

  async getProfile(): Promise<UserProfileResponse> {
    return this.systemRepository.getProfile();
  }

  async updateProfile(payload: UpdateProfileRequest): Promise<UserProfileResponse> {
    if (!payload.timezone || typeof payload.timezone !== 'string') {
      throw new ValidationError('Validation failed: timezone is required.');
    }

    return this.systemRepository.updateProfile(payload);
  }

  async getIntegrationsStatus(): Promise<IntegrationsStatusResponse> {
    return this.systemRepository.getIntegrationsStatus();
  }

  async getActivity(): Promise<ActivityLogResponse> {
    return this.systemRepository.getActivity();
  }
}
