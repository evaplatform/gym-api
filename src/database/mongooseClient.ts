import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// ─── Serverless-safe global cache ─────────────────────────────────────────────
declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

export const MongooseClient = {
  async connect(): Promise<void> {
    // ✅ Return cached connection if already connected
    if (global.mongooseCache.conn) {
      const state = global.mongooseCache.conn.connection.readyState;
      if (state === 1) {
        console.log('✅ [MongoDB] Using cached connection');
        return;
      }
      // Reset cache if connection is broken
      global.mongooseCache.conn = null;
      global.mongooseCache.promise = null;
    }

    const username = process.env.MONGODB_USERNAME || '';
    const password = process.env.MONGODB_PASSWORD || '';
    const host = process.env.MONGODB_HOST || '';
    const db = process.env.MONGODB_DB || 'gym-db';
    const nodeEnv = process.env.NODE_ENV || 'development';

    // ─── Debug logs ─────────────────────────────────────────────────────────
    console.log('🔧 [MongoDB] Connecting with:');
    console.log(` NODE_ENV : ${nodeEnv}`);
    console.log(` HOST     : ${host}`);
    console.log(` DB       : ${db}`);
    console.log(` USERNAME : ${username}`);
    console.log(` PASSWORD : ${password ? '***set***' : '❌ NOT SET'}`);

    // ─── Validate required vars ──────────────────────────────────────────────
    if (!username || !password || !host) {
      throw new Error(
        `❌ Missing MongoDB env vars:\n` +
        `  MONGODB_USERNAME : ${username ? '✅' : '❌ missing'}\n` +
        `  MONGODB_PASSWORD : ${password ? '✅' : '❌ missing'}\n` +
        `  MONGODB_HOST     : ${host     ? '✅' : '❌ missing'}`
      );
    }

    // ─── Build connection string ─────────────────────────────────────────────
    const encodedUser = encodeURIComponent(username);
    const encodedPass = encodeURIComponent(password);

    let connectionString = '';

    if (nodeEnv === 'production' || host.includes('mongodb.net')) {
      connectionString = `mongodb+srv://${encodedUser}:${encodedPass}@${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`;
    } else {
      connectionString = `mongodb://${encodedUser}:${encodedPass}@${host}/${db}?authSource=admin`;
    }

    console.log(`🔧 [MongoDB] Connection string built for: ${nodeEnv}`);

    // ─── Connect with global promise cache ──────────────────────────────────
    if (!global.mongooseCache.promise) {
      global.mongooseCache.promise = mongoose.connect(connectionString, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        minPoolSize: 1,
      });
    }

    try {
      // ✅ Always await the promise — ensures connection is FULLY established
      global.mongooseCache.conn = await global.mongooseCache.promise;
      console.log('✅ Connected to MongoDB with Mongoose');
      console.log(`📍 Database : ${db}`);
      console.log(`📍 Host     : ${host}`);
    } catch (error) {
      global.mongooseCache.promise = null;
      global.mongooseCache.conn = null;
      console.error('❌ Mongoose connection error:', error);
      throw error;
    }
  },

  async disconnect(): Promise<void> {
    if (!global.mongooseCache.conn) return;
    await mongoose.disconnect();
    global.mongooseCache.conn = null;
    global.mongooseCache.promise = null;
    console.log('🔌 Disconnected from MongoDB');
  },

  isConnected(): boolean {
    return (
      global.mongooseCache.conn !== null &&
      global.mongooseCache.conn.connection.readyState === 1
    );
  },
};