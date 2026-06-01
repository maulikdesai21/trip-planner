import { createContext, useContext, useState, ReactNode } from 'react';
import { Trip, SEED_TRIPS } from '../data';

interface TripContextValue {
  trips: Trip[];
  saveTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
}

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(() => SEED_TRIPS.map(t => ({ ...t })));

  const saveTrip = (updated: Trip) => {
    setTrips(list => {
      const exists = list.some(t => t.id === updated.id);
      return exists ? list.map(t => t.id === updated.id ? updated : t) : [updated, ...list];
    });
  };

  const deleteTrip = (id: string) => {
    setTrips(list => list.filter(t => t.id !== id));
  };

  return (
    <TripContext.Provider value={{ trips, saveTrip, deleteTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips(): TripContextValue {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrips must be used inside TripProvider');
  return ctx;
}
