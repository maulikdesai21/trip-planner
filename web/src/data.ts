export interface Trip {
  id: string;
  city: string;
  country: string;
  cover: string;
  start: string;
  end: string;
  notes: string;
}

export type TripStatusTone = 'neutral' | 'live' | 'hot' | 'cool';
export type TripStatusKey = 'draft' | 'past' | 'now' | 'soon' | 'planning';

export interface TripStatus {
  key: TripStatusKey;
  label: string;
  tone: TripStatusTone;
}

export const SEED_TRIPS: Trip[] = [
  { id: 't1', city: 'Lisbon', country: 'Portugal', cover: 'coral', start: '2026-06-12', end: '2026-06-19', notes: 'Tram 28 at sunrise, pastéis in Belém, a day trip out to Sintra. Find a rooftop in Alfama for the last night.' },
  { id: 't2', city: 'Kyoto', country: 'Japan', cover: 'rose', start: '2026-10-03', end: '2026-10-14', notes: 'Autumn leaves season. Book the ryokan early. Fushimi Inari before the crowds; tea in Uji.' },
  { id: 't3', city: 'Amalfi Coast', country: 'Italy', cover: 'amber', start: '2026-08-22', end: '2026-08-29', notes: 'Boat day to Capri, lemon everything, slow mornings on the terrace in Positano.' },
  { id: 't4', city: 'Reykjavík', country: 'Iceland', cover: 'sky', start: '2026-02-04', end: '2026-02-10', notes: 'Northern lights, the Blue Lagoon, and the long road around the Golden Circle.' },
];

const NOW = new Date('2026-05-31');
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function parseD(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function fmtRange(start: string, end: string): string {
  if (!start || !end) return 'Dates not set';
  const a = parseD(start), b = parseD(end);
  const sameMonth = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
  const left = `${MONTHS[a.getMonth()]} ${a.getDate()}`;
  const right = sameMonth ? `${b.getDate()}` : `${MONTHS[b.getMonth()]} ${b.getDate()}`;
  return `${left} – ${right}, ${b.getFullYear()}`;
}

export function nights(start: string, end: string): number {
  if (!start || !end) return 0;
  return Math.max(0, Math.round((parseD(end).getTime() - parseD(start).getTime()) / 86400000));
}

export function tripStatus(trip: Trip): TripStatus {
  if (!trip.start || !trip.end) return { key: 'draft', label: 'Draft', tone: 'neutral' };
  const s = parseD(trip.start), e = parseD(trip.end);
  if (e < NOW) return { key: 'past', label: 'Past trip', tone: 'neutral' };
  if (s <= NOW && NOW <= e) return { key: 'now', label: 'On the trip', tone: 'live' };
  const days = Math.ceil((s.getTime() - NOW.getTime()) / 86400000);
  if (days <= 45) return { key: 'soon', label: days === 1 ? 'Tomorrow' : `In ${days} days`, tone: 'hot' };
  return { key: 'planning', label: `In ${days} days`, tone: 'cool' };
}

export function initials(city: string): string {
  if (!city) return '–';
  const parts = city.trim().split(/\s+/);
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
}

export function uid(): string { return 't' + Math.random().toString(36).slice(2, 8); }
