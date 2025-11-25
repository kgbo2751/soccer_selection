const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // CORS 허용

// MongoDB Atlas Connection String
const mongoURI = 'mongodb+srv://kgbo2751_db_user:1234@cluster0.xeajrhl.mongodb.net/soccer_selection';

// MongoDB 연결
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB Atlas 연결 성공'))
  .catch(err => console.error('MongoDB 연결 실패:', err));

// Player 모델
const playerSchema = new mongoose.Schema({
  name: String,
  team: String,
  position: String,
  dominantFoot: String
}, { collection: 'players' });

const Player = mongoose.model('Player', playerSchema);

// 선수 추가 API
app.post('/players', async (req, res) => {
  try {
    const player = new Player(req.body);
    await player.save();
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 선수 목록 조회 API
app.get('/players', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = 3001;
app.listen(port, () => console.log(`서버 실행 중: http://localhost:${port}`));