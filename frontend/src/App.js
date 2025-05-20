import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BuyTicketPage from './pages/BuyTicketPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comprar" element={<BuyTicketPage />} />
      </Routes>
    </Router>
  );
}

export default App;
