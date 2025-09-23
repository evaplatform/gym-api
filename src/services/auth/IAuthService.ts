import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { UserWithToken } from '../../shared/types/AuthResponse';
import { IRefreshToken } from '@/shared/interfaces/IRefreshToken';
import { IResponseRefreshToken } from '@/shared/interfaces/IResponseRefreshToken';

export interface IAuthService {
  signinOrCreate(userInput: UserWithToken): Promise<UserWithToken>;
  signout(req: AuthenticatedRequest): Promise<void>;
  generateTestToken(req: AuthenticatedRequest): Promise<any>;
  refreshToken(req: AuthenticatedRequest<IRefreshToken>): Promise<IResponseRefreshToken>
}



