import { Router } from 'express';
import {
  createEventController,
  getEventByIdController,
  getEventsController,
  getNotificationHistoryController,
  getReminderChannelsController,
  retrySyncController,
  saveReminderPlanController
} from '../controllers/events.controller.js';

export const eventsRouter = Router();

eventsRouter.get('/', getEventsController);
eventsRouter.post('/', createEventController);
eventsRouter.get('/:id', getEventByIdController);
eventsRouter.put('/:id/reminder-plan', saveReminderPlanController);
eventsRouter.get('/:id/reminder-channels', getReminderChannelsController);
eventsRouter.post('/:id/retry-sync', retrySyncController);
eventsRouter.get('/:id/notification-history', getNotificationHistoryController);
