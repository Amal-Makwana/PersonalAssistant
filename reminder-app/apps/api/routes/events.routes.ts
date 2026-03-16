import { Router } from 'express';
import {
  getEventByIdController,
  getEventsController,
  getNotificationHistoryController,
  saveReminderPlanController
} from '../controllers/events.controller.js';

export const eventsRouter = Router();

eventsRouter.get('/', getEventsController);
eventsRouter.get('/:id', getEventByIdController);
eventsRouter.put('/:id/reminder-plan', saveReminderPlanController);
eventsRouter.get('/:id/notification-history', getNotificationHistoryController);
