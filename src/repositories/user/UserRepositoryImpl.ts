// src/repositories/UserRepository.ts
import { IdType } from '@/shared/types/IdType';
import { IUser } from '../../models/user/IUser';
import { UserModel } from '../../models/user/mongo-schema';
import { IUserRepository } from './IUserRepository';
import { updateId } from '@/shared/utils/updateId';

export class UserRepositoryImpl implements IUserRepository {

  async getByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email }).lean();
    return user ? updateId(user) : null;
  }

  async update(id: IdType, user: Partial<IUser>): Promise<IUser | null> {
    const updated = await UserModel.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true }
    ).exec();

    return updated ? updateId(updated.toObject()) : null;
  }

  async getById(id: IdType, academyId?: IdType): Promise<IUser | null> {
    const filter = academyId ? { _id: id, academyId } : { _id: id };
    const user = await UserModel.findOne(filter).exec();

    return user ? user.toJSON() : null;
  }

  async getAll(academyId?: IdType): Promise<IUser[]> {
    const filter = academyId ? { academyId } : {};
    const users = await UserModel.find(filter).exec();


    const updatedUsers = users.map(user => updateId(user.toObject()));

    return updatedUsers;
  }


  async create(user: Omit<IUser, 'id' | 'createdAt'>): Promise<IUser> {
    const created = await UserModel.create(user);
    const createdData = updateId(created.toObject());
    return createdData;
  }

  async delete(id: IdType): Promise<void | null> {
    return UserModel.findByIdAndDelete(id);
  }
}
