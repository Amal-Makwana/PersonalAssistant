import type { Request, Response } from 'express';
import { EventsService } from '../services/events.service';

const eventsService = new EventsService();

export const getEventsController = async (req: Request, res: Response) => {
  try {
    const data = await eventsService.listEvents({
      scenario: typeof req.query.scenario === 'string' ? req.query.scenario : undefined,
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
