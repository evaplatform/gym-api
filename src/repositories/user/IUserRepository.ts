import { IUser } from '../../models/user/IUser';

export interface IUserRepository {
  getById(id: string): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  create(user: IUser): Promise<IUser>;
  update(id: string, user: Partial<IUser>): Promise<IUser | null>;
}
