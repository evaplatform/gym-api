// src/app.ts
import express from 'express';
import type { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import academyRoutes from './routes/academyRoutes';
import { MongooseClient } from './database/mongooseClient';
import authRoutes from './routes/authRoutes';
import groupRoutes from './routes/groupRoutes';
import exerciseRoutes from './routes/exerciseRoutes';
import exerciseBlockRoutes from './routes/exerciseBlockRoutes';
import paymentInfoRoutes from './routes/paymentInfoRoutes';
import bodyBuildingByUserRoutes from './routes/bodyBuildingByUserRoutes';
import { errorHandler } from './middlewares/error.middleware';
import { HttpStatusCodeEnum } from './shared/enums/HttpStatusCodeEnum';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// conecta banco
MongooseClient.connect();

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/academy', academyRoutes);
app.use('/group', groupRoutes);
app.use('/exercise', exerciseRoutes);
app.use('/exercise-block', exerciseBlockRoutes);
app.use('/payment-info', paymentInfoRoutes);
app.use('/bodybuilding-by-user', bodyBuildingByUserRoutes);

app.get('/ping', async (_, res) => {
  const dbState = mongoose.connection.readyState;
  res.status(HttpStatusCodeEnum.OK).json({
    message: 'pong 🏓',
    database: dbState === 1 ? 'connected' : 'not connected',
    state: dbState,
  });
});

// middleware global de erros
app.use(errorHandler as unknown as ErrorRequestHandler);

export default app;
