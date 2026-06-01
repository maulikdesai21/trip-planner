import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SEED_TRIPS, uid } from './src/data';
import SplashScreen from './src/screens/SplashScreen';
import PlannerScreen from './src/screens/PlannerScreen';
import TripPageScreen from './src/screens/TripPageScreen';

export default function App() {
  const [screen, setScreen] = React.useState('splash');
  const [trips, setTrips] = React.useState(() => SEED_TRIPS.map(t => ({ ...t })));
  const [current, setCurrent] = React.useState(null);

  const go = (s) => setScreen(s);

  const openTrip  = (t) => { setCurrent({ trip: t, isNew: false, startInEdit: false }); go('trip'); };
  const editTrip  = (t) => { setCurrent({ trip: t, isNew: false, startInEdit: true });  go('trip'); };
  const newTrip   = ()  => {
    const draft = { id: uid(), city: '', country: '', cover: 'coral', start: '', end: '', notes: '' };
    setCurrent({ trip: draft, isNew: true, startInEdit: true });
    go('trip');
  };
  const saveTrip  = (updated) => {
    setTrips(list => {
      const exists = list.some(t => t.id === updated.id);
      return exists ? list.map(t => t.id === updated.id ? updated : t) : [updated, ...list];
    });
    setCurrent(c => ({ ...c, trip: updated, isNew: false, startInEdit: false }));
  };
  const deleteTrip = (id) => {
    setTrips(list => list.filter(t => t.id !== id));
    if (current?.trip.id === id) go('planner');
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {screen === 'splash' && <SplashScreen onDone={() => go('planner')} />}
      {screen === 'planner' && (
        <PlannerScreen trips={trips} onOpen={openTrip} onNew={newTrip} onEdit={editTrip} onDelete={deleteTrip} />
      )}
      {screen === 'trip' && current && (
        <TripPageScreen trip={current.trip} isNew={current.isNew} startInEdit={current.startInEdit}
          onBack={() => go('planner')} onSave={saveTrip} onDelete={deleteTrip} />
      )}
    </SafeAreaProvider>
  );
}
