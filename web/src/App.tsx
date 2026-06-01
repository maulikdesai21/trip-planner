import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TripProvider } from './context/TripContext';
import Splash from './screens/Splash';
import Planner from './screens/Planner';
import TripPage from './screens/TripPage';

export default function App() {
  return (
    <BrowserRouter>
      <TripProvider>
        <div className="fixed inset-0 overflow-hidden bg-cream">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/trip/:id" element={<TripPage />} />
            <Route path="*" element={<Navigate to="/planner" replace />} />
          </Routes>
        </div>
      </TripProvider>
    </BrowserRouter>
  );
}
