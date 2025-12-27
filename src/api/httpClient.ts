const baseUrl = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function postJson<T>(path: string, body: any): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function patchJson<T>(path: string, body: any): Promise<T | void> {
  const res = await fetch(`${baseUrl}${path}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  if (res.status === 204) {
    return;
  }

  return (await res.json()) as T;
}

