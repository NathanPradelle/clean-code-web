import { useEffect, useState } from 'react';

import { fetchHealth, HealthResponse } from '@/api/leitnerApi';

type State =
  | { status: 'idle' | 'loading' }
  | { status: 'success'; data: HealthResponse }
  | { status: 'error'; message: string };

export function useHealth() {
  const [state, setState] = useState<State>({ status: 'idle' });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setState({ status: 'loading' });

      try {
        const data = await fetchHealth();
        if (!cancelled) setState({ status: 'success', data });
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown error';
        if (!cancelled) setState({ status: 'error', message });
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
