// src/index.ts (ou server.ts)
import { config } from 'dotenv';
import express, { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import academyRoutes from './routes/academyRoutes';
import { MongooseClient } from './database/mongooseClient';
import authRoutes from './routes/authRoutes';
import groupRoutes from './routes/groupRoutes';
import { HttpStatusCodeEnum } from './shared/enums/HttpStatusCodeEnum';
import exerciseRoutes from './routes/exerciseRoutes';
import exerciseBlockRoutes from './routes/exerciseBlockRoutes';
import paymentInfoRoutes from './routes/paymentInfoRoutes';
import { errorHandler } from './middlewares/error.middleware';

const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const port = process.env.PROJECT_PORT || 3000;

  await MongooseClient.connect();

  app.use('/user', userRoutes);
  app.use('/academy', academyRoutes);
  app.use('/auth', authRoutes);
  app.use('/group', groupRoutes);
  app.use('/exercise', exerciseRoutes);
  app.use('/exercise-block', exerciseBlockRoutes);
  app.use('/payment-info', paymentInfoRoutes);

  app.get('/ping', async (_, res) => {
    const dbState = mongoose.connection.readyState;
    if (dbState === 1) {
      res.status(HttpStatusCodeEnum.OK).json({ message: 'pong 🏓', database: 'connected' });
    } else {
      res.status(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR).json({
        message: 'pong 🏓',
        database: 'not connected',
        state: dbState,
      });
    }
  });

  // middleware global de erros (último)
  app.use(errorHandler as unknown as ErrorRequestHandler);

  app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
};

main();
