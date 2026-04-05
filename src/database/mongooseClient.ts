import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const MongooseClient = {
  async connect(): Promise<void> {
    if (isConnected) return;

    let connectionString = '';
    const username = encodeURIComponent(process.env.MONGODB_USERNAME || '');
    const password = encodeURIComponent(process.env.MONGODB_PASSWORD || '');
    const host = process.env.MONGODB_HOST || '';
    const db = process.env.MONGODB_DB || 'gym-db';

    if (process.env.NODE_ENV === 'development') {
      connectionString = `mongodb://${host}/${db}`;
    }

    if (process.env.NODE_ENV === 'production') {
      connectionString = `mongodb+srv://${username}:${password}@${host}/${db}?retryWrites=true&w=majority`;
    }

    try {
      await mongoose.connect(connectionString);
      isConnected = true;
      console.log('✅ Connected to MongoDB with Mongoose');
    } catch (error) {
      console.error('❌ Mongoose connection error:', error);
      throw error;
    }
  },
};
