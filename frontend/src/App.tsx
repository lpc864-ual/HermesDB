import { Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import Chat from './pages/ChatScreen'
import Connection from './components/Connection';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/chat" element={<Chat/>} /> 
      <Route path="/connection" element={<Connection />} />
    </Routes>
  );
}
