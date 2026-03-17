import type { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service.js';

const dashboardService = new DashboardService();

export const getDashboardSummaryController = async (_req: Request, res: Response) => {
  try {
    const data = await dashboardService.getSummary();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: 'Internal Server Error',
      message: (error as Error).message
    });
  }
};
