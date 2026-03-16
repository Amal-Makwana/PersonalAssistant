import { app } from './app.js';

const PORT = 3000;

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Mock API server running on http://localhost:${PORT}`);
  });
}
