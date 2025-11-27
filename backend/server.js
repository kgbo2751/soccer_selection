// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// =====================
// 환경변수
// =====================
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// =====================
// MongoDB 연결
// =====================
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB error:", err));

// =====================
// MongoDB 모델
// =====================
const playerSchema = new mongoose.Schema({
  name: String,
  team: String,
  position: String,
  dominantFoot: String
}, { collection: 'players' });

const Player = mongoose.model('Player', playerSchema);

// =====================
// API 라우트
// =====================
app.get('/api/players', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/players', async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: "API working" });
});

// =====================
// React 정적 파일 제공
// =====================
// Render 기준: server.js가 backend 폴더 안에 있음
// 따라서 client/build 경로를 절대경로로 바꿔주는 게 안전
const clientBuildPath = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(clientBuildPath));

// 모든 React 라우팅 요청은 index.html로 fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// =====================
// 서버 시작
// =====================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});