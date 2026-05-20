import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import analyzeRoutes from './routes/analyze.js';
import uploadRoutes from './routes/upload.js';

// Load environment variables from .env.
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware.
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint.
app.get('/api/health', async (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'AI Resume Matcher API is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes.
app.use('/api/upload', uploadRoutes);
app.use('/api/analyze', analyzeRoutes);

// 404 handler for unknown routes.
app.use(async (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.originalUrl}`,
  });
});

// Global error handler.
app.use(async (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => {
  console.log(`AI Resume Matcher API is running on port ${PORT}`);
});
