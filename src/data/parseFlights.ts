import { Flight } from '../types';
const fields = ['id', 'airline', 'flightNumber', 'destination', 'destinationCode', 'departureTime', 'scheduledTime', 'gate', 'terminal', 'bagDropArea', 'carousel', 'lastUpdated'] as const;
const statuses = ['On Time', 'Delayed', 'Boarding', 'Final Call', 'Cancelled'];
export function parseFlights(payload: unknown): Flight[] {
  const rows = Array.isArray(payload) ? payload : (payload as { flights?: unknown } | null)?.flights;
  if (!Array.isArray(rows)) throw new Error('Invalid flight feed');
  const ids = new Set<string>();
  for (const row of rows) {
    if (!row || fields.some(key => typeof row[key] !== 'string') || !row.id.trim() ||
      !statuses.includes(row.status) || ids.has(row.id)) throw new Error('Invalid flight record');
    ids.add(row.id);
  }
  return rows as Flight[];
}
