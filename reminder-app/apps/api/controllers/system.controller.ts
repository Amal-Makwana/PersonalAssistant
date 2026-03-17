import type { Request, Response } from 'express';
import { SystemService, ValidationError } from '../services/system.service.js';
import type { UpdateProfileRequest } from '../types/system.types.js';

const systemService = new SystemService();

export const getProfileController = async (_req: Request, res: Response) => {
  try {
    const data = await systemService.getProfile();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
  }
};

export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const payload = req.body as UpdateProfileRequest;
    const data = await systemService.updateProfile(payload);
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: 'Bad Request', message: error.message });
      return;
    }

    res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
  }
};

export const getIntegrationsStatusController = async (_req: Request, res: Response) => {
  try {
    const data = await systemService.getIntegrationsStatus();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
  }
};

export const getDiagnosticsActivityController = async (_req: Request, res: Response) => {
  try {
    const data = await systemService.getActivity();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
  }
};
