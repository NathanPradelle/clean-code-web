import { useHealth } from '@/features/health/hooks/useHealth';

export default function HealthPage() {
  const state = useHealth();

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>Leitner Web</h1>

      {state.status === 'idle' || state.status === 'loading' ? <p>Loading…</p> : null}

      {state.status === 'success' ? (
        <p>
          API status: <strong>{state.data.status}</strong>
        </p>
      ) : null}

      {state.status === 'error' ? (
        <p>
          API error: <strong>{state.message}</strong>
        </p>
      ) : null}
    </main>
  );
}
