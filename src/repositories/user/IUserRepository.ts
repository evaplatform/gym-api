import { IdType } from '@/shared/types/IdType';
import { IUser } from '../../models/user/IUser';

export interface IUserRepository {
  getById(id: IdType, academyId?: IdType): Promise<IUser | null>;
  getAll(academyId?: IdType): Promise<IUser[]>;
  create(user: Omit<IUser, 'id' | 'createdAt'>): Promise<IUser>;
  update(id: string, user: Partial<IUser>): Promise<IUser | null>;
  getByEmail(email: string): Promise<IUser | null>;
  delete(id: string): Promise<void | null>;
}
