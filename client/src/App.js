import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Soccer from './components/Soccer';
import AddPlayer from './components/AddPlayer';
import Playerlist from './components/Playerlist';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Soccer />} />          {/* 홈 */}
      <Route path="/addplayer" element={<AddPlayer />} />  {/* 선수 추가 */}
      <Route path="/playerlist" element={<Playerlist />} /> {/* 선수 목록 */}
    </Routes>
  );
}

export default App;