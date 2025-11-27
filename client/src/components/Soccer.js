import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Soccer.css';

const Soccer = () => {
  const navigate = useNavigate();

  return (
    <div className="soccer-menu-container">
      <h2>축구 선택 시스템</h2>

      <button onClick={() => navigate('/addplayer')}>선수 추가</button>
      <button onClick={() => navigate('/playerlist')}>선수 목록 보기</button>
    </div>
  );
};

export default Soccer;