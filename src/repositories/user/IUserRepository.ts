import { IUser } from "../../models/user/IUser";


export interface IUserRepository {
  getAll(): Promise<IUser[]>;
  create(user: IUser): Promise<IUser>;
}
