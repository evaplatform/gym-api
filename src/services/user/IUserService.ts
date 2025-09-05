import { IUser } from '../../models/user/IUser';
import { UserWithToken } from '../../shared/types/AuthResponse';

export interface IUserService {
  getUsers(): Promise<IUser[]>;
  createUser(user: UserWithToken): Promise<IUser>;
  updateUser(body: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<void | null>;
  getUserById(id: string): Promise<IUser | null>;
}
