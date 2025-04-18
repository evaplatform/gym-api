import { IUser } from '../../models/user/IUser';
import { UserWithToken } from '../../shared/types/AuthResponse';

export interface IAuthService {
  signinOurCreate(userInput: UserWithToken): Promise<UserWithToken>;
  signout(userInput: IUser): Promise<void>;
}
