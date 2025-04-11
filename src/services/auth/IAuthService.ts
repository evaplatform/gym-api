import { IAcademy } from '../../models/academy/IAcademy';
import { IUser } from '../../models/user/IUser';
import { AuthResponseType } from '../../shared/types/AuthResponse';

export interface IAuthService {
  signin(userInput: IUser): Promise<AuthResponseType>;
  signout(userInput: IUser): Promise<void>;
}
