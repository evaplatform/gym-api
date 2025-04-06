import { IUser } from "../../models/user/IUser";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { IUserService } from "./IUserService";
import { encrypt } from '../../shared/utils/encrypt';

export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) { }

    async getUsers(): Promise<IUser[]> {
        return this.userRepository.getAll();
    }

    async createUser(user: IUser): Promise<IUser> {
        const encryptedPassword = await encrypt(user.password);
        user.password = encryptedPassword;

        return this.userRepository.create(user);

    }
}
