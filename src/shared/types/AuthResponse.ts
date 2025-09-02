import { IUser } from '../../models/user/IUser';

export type UserWithToken = IUser & { token: string };
