import { Router } from 'express';
import { getEventsController } from '../controllers/events.controller';

export const eventsRouter = Router();

eventsRouter.get('/', getEventsController);
