import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Playerlist.css';

const Playerlist = () => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // 백엔드 API 상대경로 사용
        const res = await axios.get('http://localhost:3001/api/players');
        setPlayers(res.data);
      } catch (err) {
        console.error('선수 목록 불러오기 실패:', err);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="playerlist-container">
      <h2 className="playerlist-header">선수 목록</h2>

      {players.length === 0 ? (
        <div className="empty-list-message">선수 목록이 비었습니다.</div>
      ) : (
        <div>
          {players.map((player, index) => (
            <div key={index} className="playerlist-item">
              <h3>{player.name}</h3>
              <p>팀: {player.team}</p>
              <p>포지션: {player.position}</p>
              <p>주발: {player.dominantFoot}</p>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => navigate('/')}>선수 추가</button>
    </div>
  );
};

export default Playerlist;