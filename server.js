// backend/server.js
const express    = require('express');
const cors       = require('cors');
const bodyParser = require('body-parser');

const doctorRoutes = require('./routes/doctors');
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:5500', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use('/api/doctors', doctorRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: '🏥 MediCare API is running!',
    version: '1.0.0',
    endpoints: {
      doctors:      ['GET /api/doctors', 'GET /api/doctors/:id'],
      auth:         ['POST /api/auth/login', 'POST /api/auth/register'],
      appointments: ['GET /api/appointments', 'POST /api/appointments']
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏥 MediCare API Server`);
  console.log(`🚀 Running at http://localhost:${PORT}`);
  console.log(`📋 Endpoints: /api/doctors, /api/auth, /api/appointments\n`);
});
