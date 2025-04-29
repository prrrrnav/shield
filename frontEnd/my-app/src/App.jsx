import { Routes, Route } from 'react-router-dom';
import ShieldPage from './ShieldPage';
import IncidentReport from './IncidentReport';
import SuspectForm from './SuspectForm';
import Complaint from './Complaint';
function App() {
  return (
    <Routes>
      <Route path="/" element={<ShieldPage />} />
      <Route path="/incident" element={<IncidentReport />} />
      <Route path="/suspect" element={<SuspectForm />} />
      <Route path="/complaint" element={<Complaint />} />
    </Routes>
  );
}

export default App;

