import mongoose from 'mongoose';
import { config } from '../config/index.js';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(config.mongoUri, {
      dbName: 'codepulse',
    });
    isConnected = true;
    console.log('[db] MongoDB connected');
  } catch (err) {
    console.error('[db] Connection failed:', err.message);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error('[db] Mongoose error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('[db] Disconnected — will auto-reconnect');
    isConnected = false;
  });
}
