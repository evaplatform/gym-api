import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const MongooseClient = {
  async connect(): Promise<void> {
    if (isConnected) return;

    const uri = process.env.MONGODB_URL || '';
    const username = process.env.MONGODB_USERNAME || '';
    const password = process.env.MONGODB_PASSWORD || '';

    const connectionString = uri
      .replace('<username>', username)
      .replace('<password>', password);

    try {
      await mongoose.connect(connectionString);
      isConnected = true;
      console.log('✅ Connected to MongoDB with Mongoose');
    } catch (error) {
      console.error('❌ Mongoose connection error:', error);
      throw error;
    }
  }
};
