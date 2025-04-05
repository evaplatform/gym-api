import { IUser } from "../../models/user/IUser";

export interface IUserService {
  getUsers(): Promise<IUser[]>;
  createUser(user: IUser): Promise<IUser>;
}
