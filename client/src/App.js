import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginForm from './pages/LoginForm';
import Stock_In from './pages/Stock_In';
import Stock_Sell from './pages/Stock_Sell';
import NetStock from './pages/NetStock';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/homepage" element={<Homepage />} />
        <Route exact path="/Stock_In" element={<Stock_In />} />
        <Route exact path="/Stock_Sell" element={<Stock_Sell />} />
        <Route exact path="/NetStock" element={<NetStock/>} />
      </Routes>
    </Router>
  );
}

export default App;
