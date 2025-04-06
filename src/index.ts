import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import academyRoutes from './routes/academyRoutes';
import { MongooseClient } from './database/mongooseClient';

const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const port = process.env.PROJECT_PORT || 3000;

  await MongooseClient.connect();

  app.use('/user', userRoutes);
  app.use('/academy', academyRoutes);

  app.get('/ping', async (_, res) => {
    const dbState = mongoose.connection.readyState;

    // Estados possíveis:
    // 0 = disconnected
    // 1 = connected
    // 2 = connecting
    // 3 = disconnecting

    if (dbState === 1) {
      res.status(200).json({ message: 'pong 🏓', database: 'connected' });
    } else {
      res.status(500).json({ message: 'pong 🏓', database: 'not connected', state: dbState });
    }
  });

  app.use((err: any ,req: any, res: any, next: any) => {
    console.error('❌ Global Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  });

  app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
};

main();


