// src/repositories/UserRepository.ts
import { IUser } from "../../models/user/IUser";
import { UserModel } from "../../models/user/mongo-schema";
import { IUserRepository } from "./IUserRepository";

export class UserRepositoryImpl implements IUserRepository {
  async getAll(): Promise<IUser[]> {
    return UserModel.find();
  }

  async create(user: IUser): Promise<IUser> {
    return UserModel.create(user);
  }
}
