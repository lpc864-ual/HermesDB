import { Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage/LandingPage';
import Auth from './auth/auth';
import Connection from './connection/Connection';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/connection" element={<Connection />} />
    </Routes>
  );
}
