import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import RegulatePage from './pages/RegulatePage';
import TracePage from './pages/TracePage';
import LinkPage from './pages/LinkPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/regulate" element={<RegulatePage />} />
          <Route path="/trace" element={<TracePage />} />
          <Route path="/link" element={<LinkPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;