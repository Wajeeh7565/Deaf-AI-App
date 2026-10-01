import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { parseFlights } from '../src/data/parseFlights';
import { MOCK_FLIGHTS } from '../src/data/mockData';
import { flightStatusLabel } from '../src/data/flightStatusLabel';
import { LSQ_ANNOUNCEMENTS } from '../src/data/announcementMedia';
import { storage } from '../src/data/storage';

test('feed accepts both contracts and a legitimate empty departure list', () => {
  assert.deepEqual(parseFlights(MOCK_FLIGHTS), MOCK_FLIGHTS);
  assert.deepEqual(parseFlights({ flights: MOCK_FLIGHTS }), MOCK_FLIGHTS);
  assert.deepEqual(parseFlights({ flights: [] }), []);
});
test('feed rejects malformed rows, unknown statuses, and duplicate identifiers', () => {
  for (const value of [null, {}, [null], [{ ...MOCK_FLIGHTS[0], gate: 4 }], [{ ...MOCK_FLIGHTS[0], status: 'Unknown' }], [MOCK_FLIGHTS[0], MOCK_FLIGHTS[0]]]) {
    assert.throws(() => parseFlights(value));
  }
});
test('cancelled, boarding, and final-call flights cannot be described as on time', () => {
  assert.equal(flightStatusLabel('Cancelled', 'fr'), 'Annulé');
  assert.equal(flightStatusLabel('Boarding', 'en'), 'Boarding');
  assert.equal(flightStatusLabel('Final Call', 'es'), 'Última llamada');
});
test('all mapped local LSQ videos exist', () => {
  for (const item of Object.values(LSQ_ANNOUNCEMENTS)) assert.ok(existsSync(`public${item.src}`), item.src);
});
test('unavailable browser storage cannot crash the journey', () => {
  assert.equal(storage.getItem('preference'), null);
  assert.doesNotThrow(() => storage.setItem('preference', 'value'));
  assert.doesNotThrow(() => storage.removeItem('preference'));
});
