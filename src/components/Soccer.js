import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Soccer.css';

const Soccer = () => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('맨유');
  const [position, setPosition] = useState('공격');
  const [dominantFoot, setDominantFoot] = useState('왼발');
  const [alertMessage, setAlertMessage] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const navigate = useNavigate();

  // 🔹 토스트 메시지 표시 함수
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 5000); // 5초 동안 표시
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !team || !position || !dominantFoot) {
      setAlertMessage('모든 필드를 입력해주세요!');
      return;
    }

    const playerData = { name, team, position, dominantFoot };

    try {
      await axios.post('http://localhost:3001/players', playerData);

      // 🔹 showToast 사용
      showToast('선수가 성공적으로 추가되었습니다!');

      // 상태 초기화
      setName('');
      setTeam('맨유');
      setPosition('공격');
      setDominantFoot('왼발');

      // 선수 목록 페이지로 이동
      navigate('/playerlist');

    } catch (err) {
      console.error(err);
      setAlertMessage('서버에 데이터 저장 실패');
    }
  };

  return (
    <div className="soccer-form-container">
      <h2>축구 선수 선택</h2>

      {alertMessage && <div className="alert">{alertMessage}</div>}
      {toastMessage && <div className="toast show">{toastMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>선수 이름</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>팀</label>
          <select value={team} onChange={e => setTeam(e.target.value)} required>
            <option value="맨유">맨유</option>
            <option value="맨시티">맨시티</option>
            <option value="첼시">첼시</option>
            <option value="리버풀">리버풀</option>
            <option value="아스날">아스날</option>
            <option value="토트넘">토트넘</option>
          </select>
        </div>

        <div>
          <label>포지션</label>
          <select value={position} onChange={e => setPosition(e.target.value)} required>
            <option value="공격">공격</option>
            <option value="미드필더">미드필더</option>
            <option value="수비">수비</option>
            <option value="골키퍼">골키퍼</option>
          </select>
        </div>

        <div>
          <label>주발</label>
          <select value={dominantFoot} onChange={e => setDominantFoot(e.target.value)} required>
            <option value="왼발">왼발</option>
            <option value="오른발">오른발</option>
            <option value="양발">양발</option>
          </select>
        </div>

        <button type="submit">선수 추가</button>
      </form>

      <button onClick={() => navigate('/playerlist')}>선수 목록 보기</button>
    </div>
  );
};

export default Soccer;