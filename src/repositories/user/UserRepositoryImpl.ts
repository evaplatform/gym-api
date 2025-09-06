// src/repositories/UserRepository.ts
import { AppError } from '../../errors/AppError';
import { IUser } from '../../models/user/IUser';
import { UserModel } from '../../models/user/mongo-schema';
import { IUserRepository } from './IUserRepository';

export class UserRepositoryImpl implements IUserRepository {
  async getByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).lean();
  }

  async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, { $set: user }, { new: true });
  }

  async getById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  async getAll(): Promise<IUser[]> {
    return UserModel.find();
  }

  async create(user: Omit<IUser, 'id' | 'createdAt'>): Promise<IUser> {
    return (await UserModel.create(user)).toObject();
  }

  async delete(id: string): Promise<void | null> {
    return UserModel.findByIdAndDelete(id);
  }
}
