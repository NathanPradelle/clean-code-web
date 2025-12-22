import { getJson } from './httpClient';

export interface HealthResponse {
  status: 'ok';
}

export async function fetchHealth(): Promise<HealthResponse> {
  return getJson<HealthResponse>('/health');
}
