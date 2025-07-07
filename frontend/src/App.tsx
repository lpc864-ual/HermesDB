import { Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage/LandingPage';
import SignIn from './auth/sign-in';
import Connection from './connection/Connection';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/connection" element={<Connection />} />
    </Routes>
  );
}
