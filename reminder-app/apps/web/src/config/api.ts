const DEPLOYED_BACKEND_URL = 'https://<backend-vercel-url>';

const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

export const API_BASE_URL = hostname === 'localhost' ? 'http://localhost:3000' : DEPLOYED_BACKEND_URL;
