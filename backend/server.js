const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Player 모델
const playerSchema = new mongoose.Schema({
  name: String,
  team: String,
  position: String,
  dominantFoot: String
});
const Player = mongoose.model('Player', playerSchema);

// API
app.get('/api/players', async (req, res) => { ... });
app.post('/api/players', async (req, res) => { ... });

// React build 제공
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));