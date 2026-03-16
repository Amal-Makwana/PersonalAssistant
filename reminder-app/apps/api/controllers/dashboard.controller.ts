import type { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service.js';

const dashboardService = new DashboardService();

export const getDashboardSummaryController = (req: Request, res: Response) => {
  try {
    const scenario = typeof req.query.scenario === 'string' ? req.query.scenario : undefined;
    const data = dashboardService.getSummary(scenario);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: (error as Error).message
    });
  }
};
