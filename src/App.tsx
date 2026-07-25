import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import PatientHistory from './pages/PatientHistory';
import PredictiveAnalytics from './pages/PredictiveAnalytics';
import SchedulingLive from './pages/SchedulingLive';
import Reports from './pages/Reports';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="history" element={<PatientHistory />} />
          <Route path="predictive" element={<PredictiveAnalytics />} />
          <Route path="scheduling" element={<SchedulingLive />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
