import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import BlankoPage from "./pages/BlankoPage";
import SlidoPage from './pages/SlidoPage';
import TetroPage from './pages/TetroPage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/blanko" element={<BlankoPage />} />
          <Route path="/slido" element={<SlidoPage />} />
          <Route path="/tetro" element={<TetroPage />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
  );
}

export default App;
