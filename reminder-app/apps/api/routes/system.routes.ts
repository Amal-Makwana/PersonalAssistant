import { Router } from 'express';
import {
  getDiagnosticsActivityController,
  getIntegrationsStatusController,
  getProfileController,
  updateProfileController
} from '../controllers/system.controller.js';

export const systemRouter = Router();

systemRouter.get('/profile', getProfileController);
systemRouter.put('/profile', updateProfileController);
systemRouter.get('/integrations/status', getIntegrationsStatusController);
systemRouter.get('/diagnostics/activity', getDiagnosticsActivityController);
