import type { Request, Response } from 'express';
import { EventsService, NotFoundError, ValidationError } from '../services/events.service.js';
import type { ReminderPlanUpdateRequest } from '../types/event.types.js';

const eventsService = new EventsService();

const getScenario = (req: Request) => (typeof req.query.scenario === 'string' ? req.query.scenario : undefined);

export const getEventsController = async (req: Request, res: Response) => {
  try {
    const data = await eventsService.listEvents({
      scenario: getScenario(req),
      delay: req.query.delay === 'true' || req.query.delay === '1'
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: (error as Error).message
    });
  }
};

export const getEventByIdController = async (req: Request, res: Response) => {
  try {
    const data = await eventsService.getEventById(req.params.id, getScenario(req));
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: 'Not Found', message: error.message });
      return;
    }

    res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
  }
};

export const saveReminderPlanController = async (req: Request, res: Response) => {
  try {
    const payload = req.body as ReminderPlanUpdateRequest;
    const data = await eventsService.saveReminderPlan(req.params.id, payload, getScenario(req));
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: 'Bad Request', message: error.message });
      return;
    }

    if (error instanceof NotFoundError) {
      res.status(404).json({ error: 'Not Found', message: error.message });
      return;
    }

    res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
  }
};

export const getNotificationHistoryController = async (req: Request, res: Response) => {
  try {
    const data = await eventsService.getNotificationHistory(req.params.id, getScenario(req));
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: 'Not Found', message: error.message });
      return;
    }

    res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
  }
};

export const resetEventsInMemoryState = () => {
  eventsService.resetInMemoryState();
};
