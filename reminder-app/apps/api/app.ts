import cors from 'cors';
import express from 'express';
import { dashboardRouter } from './routes/dashboard.routes.js';
import { eventsRouter } from './routes/events.routes.js';
import { systemRouter } from './routes/system.routes.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/events', eventsRouter);
app.use('/dashboard', dashboardRouter);
app.use('/system', systemRouter);
