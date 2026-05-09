import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;
export const MongooseClient = {
  async connect(): Promise<void> {
    if (isConnected) return;

    let connectionString = '';
    const username = process.env.MONGODB_USERNAME || '';
    const password = process.env.MONGODB_PASSWORD || '';
    const host = process.env.MONGODB_HOST || 'localhost:27017';
    const db = process.env.MONGODB_DB || 'gym-db';

    if (process.env.NODE_ENV === 'development') {
      // Se tem usuário e senha, usa autenticação
      if (username && password) {
        connectionString = `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}/${db}?authSource=admin`;
      } else {
        // Conexão sem autenticação (local)
        connectionString = `mongodb://${host}/${db}`;
      }
    }

    if (process.env.NODE_ENV === 'production') {
      connectionString = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}/${db}?retryWrites=true&w=majority`;
    }

    try {
      await mongoose.connect(connectionString);
      isConnected = true;
      console.log('✅ Connected to MongoDB with Mongoose');
      console.log(`📍 Database: ${db}`);
    } catch (error) {
      console.error('❌ Mongoose connection error:', error);
      throw error;
    }
  },
};
