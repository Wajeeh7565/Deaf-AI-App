import { useEffect, useState } from 'react';
import { Flight } from '../types';
import { MOCK_FLIGHTS } from '../data/mockData';
import { parseFlights } from '../data/parseFlights';
interface FlightFeedState { flights: Flight[]; mode: 'live' | 'demo'; loading: boolean; error?: string; }
/** Provider credentials belong on an approved backend, never in VITE_* variables. */
export const useFlightFeed = (): FlightFeedState => {
  const endpoint = import.meta.env.VITE_YKF_LIVE_FLIGHTS_ENDPOINT as string | undefined;
  const [state, setState] = useState<FlightFeedState>({ flights: MOCK_FLIGHTS, mode: 'demo', loading: Boolean(endpoint) });
  useEffect(() => {
    if (!endpoint) return;
    let disposed = false;
    let controller: AbortController;
    let timer: number;
    const load = async () => {
      controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 12_000);
      try {
        const response = await fetch(endpoint, { signal: controller.signal, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`Flight feed returned ${response.status}`);
        const flights = parseFlights(await response.json());
        if (!disposed) setState({ flights, mode: 'live', loading: false });
      } catch {
        if (!disposed) setState({ flights: MOCK_FLIGHTS, mode: 'demo', loading: false, error: 'Live flight feed unavailable' });
      } finally {
        window.clearTimeout(timeout);
        if (!disposed) timer = window.setTimeout(load, 60_000);
      }
    };
    void load();
    return () => { disposed = true; controller?.abort(); window.clearTimeout(timer); };
  }, [endpoint]);
  return state;
};
