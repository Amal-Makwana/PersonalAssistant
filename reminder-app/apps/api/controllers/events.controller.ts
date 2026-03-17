import type { Request, Response } from 'express';
import { EventsService, NotFoundError, ValidationError } from '../services/events.service.js';
import type { ReminderPlanUpdateRequest } from '../types/event.types.js';

const eventsService = new EventsService();

const getEventId = (req: Request) => (typeof req.params.id === 'string' ? req.params.id : '');

export const getEventsController = async (req: Request, res: Response) => {
  try {
    const data = await eventsService.listEvents({
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

export const createEventController = async (req: Request, res: Response) => {
  try {
    const data = await eventsService.createEvent(req.body);
    res.status(201).json(data);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(400).json({ error: 'Bad Request', message: error.message });
      return;
    }

    res.status(500).json({ error: 'Internal Server Error', message: (error as Error).message });
  }
};

export const getEventByIdController = async (req: Request, res: Response) => {
  try {
    const data = await eventsService.getEventById(getEventId(req));
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

export const saveReminderPlanController = async (req: Request, res: Response) => {
  try {
    const payload = req.body as ReminderPlanUpdateRequest;
    const data = await eventsService.saveReminderPlan(getEventId(req), payload);
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


export const getReminderChannelsController = async (req: Request, res: Response) => {
  try {
    const data = await eventsService.getReminderChannels(getEventId(req));
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

export const retrySyncController = async (req: Request, res: Response) => {
  try {
    const data = await eventsService.retrySync(getEventId(req));
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
    const data = await eventsService.getNotificationHistory(getEventId(req));
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

