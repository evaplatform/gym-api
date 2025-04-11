import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import academyRoutes from './routes/academyRoutes';
import { MongooseClient } from './database/mongooseClient';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/authRoutes';
import { HttpStatusCode } from './shared/enums/HttpStatusCodeEnum';

const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const port = process.env.PROJECT_PORT || 3000;

  await MongooseClient.connect();

  app.use('/user', userRoutes);
  app.use('/academy', academyRoutes);
  app.use('/auth', authRoutes)

  app.get('/ping', async (_, res) => {
    const dbState = mongoose.connection.readyState;

    // Estados possíveis:
    // 0 = disconnected
    // 1 = connected
    // 2 = connecting
    // 3 = disconnecting

    if (dbState === 1) {
      res.status(HttpStatusCode.OK).json({ message: 'pong 🏓', database: 'connected' });
    } else {
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'pong 🏓', database: 'not connected', state: dbState });
    }
  });

  // middleware global de erros
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    errorHandler(err, req, res, next);
  });

  app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
};

main();
