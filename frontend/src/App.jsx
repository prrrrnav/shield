import { Routes, Route } from 'react-router-dom';
import ShieldPage from './ShieldPage';
import IncidentReport from './IncidentReport';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ShieldPage />} />
      <Route path="/incident" element={<IncidentReport />} />
    </Routes>
  );
}

export default App;
