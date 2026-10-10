import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const MongooseClient = {
  async connect(): Promise<void> {
    if (isConnected) return;

    const username = process.env.MONGODB_USERNAME || '';
    const password = process.env.MONGODB_PASSWORD || '';
    const host = process.env.MONGODB_HOST || 'localhost:27017';
    const db = process.env.MONGODB_DB || 'gym-db';
    const nodeEnv = process.env.NODE_ENV || 'development';

    // ─── Debug logs ───────────────────────────────────────────────────────────
    // Remove after confirming connection works
    console.log('🔧 [MongoDB] Connecting with:');
    console.log(` NODE_ENV : ${nodeEnv}`);
    console.log(` HOST : ${host}`);
    console.log(` DB : ${db}`);
    console.log(` USERNAME : ${username}`);
    console.log(` PASSWORD : ${password ? '***set***' : '❌ NOT SET'}`);

    // ─── Validate required vars ───────────────────────────────────────────────
    if (!username || !password || !host) {
      throw new Error(
        `❌ Missing MongoDB env vars: MONGODB_USERNAME: ${username ? '✅' : '❌ missing'} MONGODB_PASSWORD: ${password ? '✅' : '❌ missing'} MONGODB_HOST : ${host ? '✅' : '❌ missing'} `
      );
    }

    // ─── Build connection string ──────────────────────────────────────────────
    let connectionString = '';

    if (nodeEnv === 'production') {
      connectionString = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}/${db}?retryWrites=true&w=majority`;
    } else {
      // development
      if (username && password) {
        connectionString = `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}/${db}?authSource=admin`;
      } else {
        connectionString = `mongodb://${host}/${db}`;
      }
    }

    console.log(`🔧 [MongoDB] Connection string built for: ${nodeEnv}`);

    // ─── Connect ──────────────────────────────────────────────────────────────
    try {
      await mongoose.connect(connectionString, {
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });

      isConnected = true;
      console.log('✅ Connected to MongoDB with Mongoose');
      console.log(`📍 Database : ${db}`);
      console.log(`📍 Host : ${host}`);
    } catch (error) {
      isConnected = false;
      console.error('❌ Mongoose connection error:', error);
      throw error;
    }
  },

  async disconnect(): Promise<void> {
    if (!isConnected) return;
    await mongoose.disconnect();
    isConnected = false;
    console.log('🔌 Disconnected from MongoDB');
  },
};