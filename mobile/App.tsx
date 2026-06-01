import './global.css';
import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Trip, SEED_TRIPS, uid } from './src/data';
import SplashScreen from './src/screens/SplashScreen';
import PlannerScreen from './src/screens/PlannerScreen';
import TripPageScreen from './src/screens/TripPageScreen';

type Screen = 'splash' | 'planner' | 'trip';

interface CurrentTrip {
  trip: Trip;
  isNew: boolean;
  startInEdit: boolean;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [trips, setTrips] = useState<Trip[]>(() => SEED_TRIPS.map(t => ({ ...t })));
  const [current, setCurrent] = useState<CurrentTrip | null>(null);

  const openTrip  = (t: Trip) => { setCurrent({ trip: t, isNew: false, startInEdit: false }); setScreen('trip'); };
  const editTrip  = (t: Trip) => { setCurrent({ trip: t, isNew: false, startInEdit: true });  setScreen('trip'); };
  const newTrip   = () => {
    const draft: Trip = { id: uid(), city: '', country: '', cover: 'coral', start: '', end: '', notes: '' };
    setCurrent({ trip: draft, isNew: true, startInEdit: true });
    setScreen('trip');
  };
  const saveTrip  = (updated: Trip) => {
    setTrips(list => {
      const exists = list.some(t => t.id === updated.id);
      return exists ? list.map(t => t.id === updated.id ? updated : t) : [updated, ...list];
    });
    setCurrent(c => c ? { ...c, trip: updated, isNew: false, startInEdit: false } : null);
  };
  const deleteTrip = (id: string) => {
    setTrips(list => list.filter(t => t.id !== id));
    if (current?.trip.id === id) setScreen('planner');
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {screen === 'splash' && <SplashScreen onDone={() => setScreen('planner')} />}
      {screen === 'planner' && (
        <PlannerScreen trips={trips} onOpen={openTrip} onNew={newTrip} onEdit={editTrip} onDelete={deleteTrip} />
      )}
      {screen === 'trip' && current && (
        <TripPageScreen trip={current.trip} isNew={current.isNew} startInEdit={current.startInEdit}
          onBack={() => setScreen('planner')} onSave={saveTrip} onDelete={deleteTrip} />
      )}
    </SafeAreaProvider>
  );
}
