import { IUser } from '../../models/user/IUser';

export type UserWithToken = Partial<IUser> & { token: string };
