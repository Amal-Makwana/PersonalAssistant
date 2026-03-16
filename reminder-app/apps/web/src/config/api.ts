const trimTrailingSlash = (url: string) => url.replace(/\/$/, '');

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL = configuredBaseUrl
  ? trimTrailingSlash(configuredBaseUrl)
  : window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : '';
