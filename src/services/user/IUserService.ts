import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IUser } from '../../models/user/IUser';

export interface IUserService {
  getAll(req: AuthenticatedRequest): Promise<IUser[]>;
  create(user: AuthenticatedRequest): Promise<IUser>;
  update(req: AuthenticatedRequest): Promise<IUser | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<IUser | null>;
}
