import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Soccer from './components/Soccer';
import Playerlist from './components/Playerlist';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Soccer />} />
      <Route path="/playerlist" element={<Playerlist />} />
    </Routes>
  );
}

export default App;