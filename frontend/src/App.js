import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DashboardHomePage from './components/DashboardHomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardHomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;