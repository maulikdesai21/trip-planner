import React from 'react';
import Splash from './screens/Splash.jsx';
import Planner from './screens/Planner.jsx';
import TripPage from './screens/TripPage.jsx';
import { SEED_TRIPS, uid } from './data.js';

export default function App() {
  const [screen, setScreen] = React.useState('splash');
  const [trips, setTrips] = React.useState(() => SEED_TRIPS.map(t => ({ ...t })));
  const [current, setCurrent] = React.useState(null);
  const [navKey, setNavKey] = React.useState(0);
  const [animClass, setAnimClass] = React.useState('anim-screenIn');

  const go = (s, cls = 'anim-screenIn') => {
    setAnimClass(cls); setNavKey(k => k + 1); setScreen(s);
  };

  const openTrip  = (t) => { setCurrent({ trip: t, isNew: false, startInEdit: false }); go('trip', 'anim-slideUp'); };
  const editTrip  = (t) => { setCurrent({ trip: t, isNew: false, startInEdit: true });  go('trip', 'anim-slideUp'); };
  const newTrip   = ()  => {
    const draft = { id: uid(), city: '', country: '', cover: 'coral', start: '', end: '', notes: '' };
    setCurrent({ trip: draft, isNew: true, startInEdit: true });
    go('trip', 'anim-slideUp');
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
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#fbf3ec' }}>
      <div key={navKey} className={animClass} style={{ position: 'absolute', inset: 0 }}>
        {screen === 'splash' && <Splash onDone={() => go('planner')} />}
        {screen === 'planner' && (
          <Planner trips={trips} onOpen={openTrip} onNew={newTrip} onEdit={editTrip} onDelete={deleteTrip} />
        )}
        {screen === 'trip' && current && (
          <TripPage trip={current.trip} isNew={current.isNew} startInEdit={current.startInEdit}
            onBack={() => go('planner')} onSave={saveTrip} onDelete={deleteTrip} />
        )}
      </div>
    </div>
  );
}
