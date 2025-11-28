// backend/server.js
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 10000;

// --- React build 제공 ---
app.use(express.static(path.join(__dirname, '../client/build')));

// React Router fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));