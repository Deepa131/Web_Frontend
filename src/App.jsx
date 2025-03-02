import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/public/Login';
import Signup from './components/public/Signup';
import Homepage from './components/private/Homepage';
import DailyInsights from './components/private/DailyInsights';
import FavoriteDays from './components/private/FavoriteDays';
import MyEntries from './components/private/MyEntries';
import About from './components/private/About';
import TrackMoods from './components/private/TrackMoods';
import Contact from './components/private/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/reflect-now" element={<DailyInsights />} />
        <Route path="/favorite-moments" element={<FavoriteDays />} />
        <Route path="/my-entries" element={<MyEntries />} />
        <Route path="/about" element={<About />} />
        <Route path="/track-moods" element={<TrackMoods />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

