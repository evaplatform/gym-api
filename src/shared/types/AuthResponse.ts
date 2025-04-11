import { IUser } from '../../models/user/IUser';

export type AuthResponseType = Partial<IUser> & { token: string };
