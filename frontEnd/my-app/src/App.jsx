import ShieldPage from './ShieldPage';
import IncidentReport from './IncidentReport';
import SuspectForm from './SuspectForm';
import Complaint from './Complaint';
import AuthForm from './AuthForm';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Routes>
      <Route path="/" element={<ShieldPage />} />
      <Route path="/incident" element={<IncidentReport />} />
      <Route path="/suspect" element={<SuspectForm />} />
      <Route path="/complaint" element={<Complaint />} />
      <Route path="/auth" element={<AuthForm />} />
    </Routes>
  );
}

export default App;