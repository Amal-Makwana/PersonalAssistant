import cors from 'cors';
import express from 'express';
import { dashboardRouter } from './routes/dashboard.routes';
import { eventsRouter } from './routes/events.routes';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/events', eventsRouter);
app.use('/dashboard', dashboardRouter);

const PORT = 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Mock API server running on http://localhost:${PORT}`);
  });
}
