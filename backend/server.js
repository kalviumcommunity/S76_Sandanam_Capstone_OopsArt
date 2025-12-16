const mongoose = require('mongoose');
const express = require('express');
const itemRoutes = require('./routes/itemRoutes');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve uploaded files
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')))

// Allow calls from the local frontend during development.
// - Accept explicit FRONTEND_ORIGIN when set (production/dev override)
// - Also accept any http://localhost:<port> origin to make local dev smoother
// NOTE: In production, set FRONTEND_ORIGIN to your deployed frontend and consider
// locking this down.
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true) // allow server-to-server or curl requests
      if (origin === process.env.FRONTEND_ORIGIN) return callback(null, true)
      try {
        const url = new URL(origin)
        if (url.hostname === 'localhost') return callback(null, true)
      } catch (e) {
        // fall through
      }
      return callback(new Error('Not allowed by CORS'), false)
    },
    credentials: true,
  })
);

app.use('/api', authRoutes);
app.use('/api', itemRoutes);
app.use('/api', productRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Connection failed', err);
  });

app.get('/', (req, res) => {
  res.send('Welcome to OopsArt!');
});

