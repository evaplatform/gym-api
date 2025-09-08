import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { UserWithToken } from '../../shared/types/AuthResponse';

export interface IAuthService {
  signinOrCreate(userInput: UserWithToken): Promise<UserWithToken>;
  signout(req: AuthenticatedRequest): Promise<void>;
  generateTestToken(req: AuthenticatedRequest): Promise<any>;
}
