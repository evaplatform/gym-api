import { AuthenticatedRequest } from 'interfaces/AuthenticatedRequest';
import { IUser } from '../../models/user/IUser';
import { UserWithToken } from '../../shared/types/AuthResponse';

export interface IAuthService {
  signinOrCreate(userInput: UserWithToken): Promise<UserWithToken>;
  signout(req: AuthenticatedRequest): Promise<void>;
  generateTestToken(req: any): Promise<any>;
}
