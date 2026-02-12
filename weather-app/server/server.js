require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic Rate Limiting (In-memory)
const rateLimit = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!rateLimit[ip]) {
    rateLimit[ip] = { count: 1, startTime: now };
  } else {
    if (now - rateLimit[ip].startTime > RATE_LIMIT_WINDOW) {
      rateLimit[ip] = { count: 1, startTime: now };
    } else {
      rateLimit[ip].count += 1;
      if (rateLimit[ip].count > MAX_REQUESTS) {
        return res.status(429).json({ error: 'Too many requests, please try again later.' });
      }
    }
  }
  next();
};

app.get('/api/weather', rateLimiter, async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: API Key missing' });
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    if (error.response) {
      // API responded with an error (e.g., city not found)
      res.status(error.response.status).json({ error: error.response.data.message });
    } else if (error.request) {
      // No response received
      res.status(503).json({ error: 'No response from verification service' });
    } else {
      // Request setup error
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
