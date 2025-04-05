// src/services/UserService.ts
import { IUser } from "../../models/user/IUser";
import { IUserRepository } from "../../repositories/user/IUserRepository";
import { IUserService } from "./IUserService";

export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) { }

    async getUsers(): Promise<IUser[]> {
        return this.userRepository.getAll();
    }

    async createUser(user: IUser): Promise<IUser> {
        // aqui poderia ter validações
        return this.userRepository.create(user);
    }
}
