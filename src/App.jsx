import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Blanko from './pages/Blanko';
import Slido from './pages/Slido';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
      <Router>
        <div className="m-0">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/blanko" element={<Blanko />} />
            <Route path="/slido" element={<Slido />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;