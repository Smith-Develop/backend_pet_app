// src/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');  // Lo implementaremos después

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api/pets', petRoutes);

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;