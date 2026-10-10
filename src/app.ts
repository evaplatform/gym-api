// src/app.ts
import express from 'express';
import type { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { MongooseClient } from './database/mongooseClient';
import { errorHandler } from './middlewares/error.middleware';
import { HttpStatusCodeEnum } from './shared/enums/HttpStatusCodeEnum';
import userRoutes from './routes/userRoutes';
import academyRoutes from './routes/academyRoutes';
import authRoutes from './routes/authRoutes';
import groupRoutes from './routes/groupRoutes';
import exerciseRoutes from './routes/exerciseRoutes';
import trainingRoutes from './routes/trainingRoutes';
import paymentInfoRoutes from './routes/paymentInfoRoutes';
import trainingByUserRoutes from './routes/trainingByUserRoutes';
import exerciseHistoryRoutes from './routes/exerciseHistoryRoutes';
import settingsRoutes from './routes/settingsRoutes';
import paymentSubscriptionRoutes from './routes/paymentSubscriptionRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Connect to MongoDB ───────────────────────────────────────────────────────
// .catch() prevents unhandled rejection from crashing the process (exit 128)
MongooseClient.connect().catch((error) => {
  console.error('❌ Failed to connect to MongoDB on startup:', error.message);
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/academy', academyRoutes);
app.use('/group', groupRoutes);
app.use('/exercise', exerciseRoutes);
app.use('/exercise-history', exerciseHistoryRoutes);
app.use('/training', trainingRoutes);
app.use('/payment-info', paymentInfoRoutes);
app.use('/training-by-user', trainingByUserRoutes);
app.use('/settings', settingsRoutes);
app.use('/payment-subscription', paymentSubscriptionRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/ping', async (_, res) => {
  const dbState = mongoose.connection.readyState;
  const stateMap: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.status(HttpStatusCodeEnum.OK).json({
    message: 'pong 🏓',
    database: stateMap[dbState] ?? 'unknown',
    state: dbState,
    env: process.env.NODE_ENV,
    host: process.env.MONGODB_HOST,
    db: process.env.MONGODB_DB,
  });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use(errorHandler as unknown as ErrorRequestHandler);

export default app;