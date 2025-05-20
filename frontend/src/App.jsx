// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyTicketPage from './pages/BuyTicketPage'; // importe a página de compra
import Home from './pages/Home'; // exemplo de outra página

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
