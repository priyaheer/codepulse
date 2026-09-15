import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { config } from './config/index.js';
import { connectDB } from './services/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { message: 'Too many requests. Please slow down.', code: 'RATE_LIMITED' } },
});
app.use('/api', apiLimiter);
app.use('/api', apiRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'codepulse-backend', timestamp: new Date().toISOString() });
});

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(config.port, () => {
      console.log(`[server] CodePulse backend running on http://localhost:${config.port}`);
    });
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`[server] Port ${config.port} is already in use. Stop the existing backend process or choose another PORT.`);
        process.exit(1);
      }
      console.error('[server] Failed to listen:', err.message);
      process.exit(1);
    });
  } catch (err) {
    console.error('[server] Failed to start:', err.message);
    process.exit(1);
  }
};

startServer();
