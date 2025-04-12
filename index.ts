import { config } from 'dotenv';
import express from 'express';
import { MongooseClient } from './src/database/mongooseClient';
import academyRoutes from './src/routes/academyRoutes';
import userRoutes from './src/routes/userRoutes';

const main = async () => {
  config();

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const port = process.env.PROJECT_PORT || 3000;

  await MongooseClient.connect();

  app.use('/user', userRoutes);
  app.use('/academy', academyRoutes);

  app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
};

main();
