import { IUser } from '../../models/user/IUser';

export interface IUserService {
  getUsers(): Promise<IUser[]>;
  createUser(user: IUser): Promise<IUser>;
  updateUser(id: string, body: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<void | null>;
  getUserById(id: string): Promise<IUser | null>;
}
