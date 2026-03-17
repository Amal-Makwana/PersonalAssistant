import { API_BASE_URL } from '../../config/api';

interface ApiErrorResponse {
  message?: string;
}

const buildUrl = (path: string) => `${API_BASE_URL}${path}`;

export const fetchJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(buildUrl(path), init);
  if (!response.ok) {
    const maybeError = (await response.json().catch(() => ({}))) as ApiErrorResponse;
    throw new Error(maybeError.message ?? `Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
};
