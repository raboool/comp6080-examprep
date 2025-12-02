import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
