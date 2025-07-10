import { Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage/LandingPage';
import Auth from './auth/Auth';
import Chat from './chat/Chat'
import Connection from './connection/Connection';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/connection" element={<Connection />} />
      <Route path="/chat" element={<Chat/>} /> 
    </Routes>
  );
}
