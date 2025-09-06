import { IUser } from '../../models/user/IUser';

export interface IUserRepository {
  getById(id: string): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  create(user: Omit<IUser, 'id' | 'createdAt'>): Promise<IUser>;
  update(id: string, user: Partial<IUser>): Promise<IUser | null>;
  getByEmail(email: string): Promise<IUser | null>;
  delete(id: string): Promise<void | null>;
}
