import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const MongooseClient = {
  async connect(): Promise<void> {
    const uri = process.env.MONGODB_URL || '';
    const username = process.env.MONGODB_USERNAME || '';
    const password = process.env.MONGODB_PASSWORD || '';

    const connectionString = uri.replace('<username>', username).replace('<password>', password);

    try {
      await mongoose.connect(connectionString);
      console.log(' Connected to MongoDB with Mongoose');
    } catch (error) {
      console.error(' Mongoose connection error:', error);
      process.exit(1);
    }
  },
};
