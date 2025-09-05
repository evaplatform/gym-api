import { IUser } from '../../models/user/IUser';
import { UserWithToken } from '../../shared/types/AuthResponse';

export interface IAuthService {
  signinOrCreate(userInput: UserWithToken): Promise<UserWithToken>;
  signout(userInput: IUser): Promise<void>;
  generateTestToken(req: IUser & { userId: string }): Promise<any>;
}
