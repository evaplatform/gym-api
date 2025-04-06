import { IUser } from '../../models/user/IUser';
import { IUserRepository } from '../../repositories/user/IUserRepository';
import { IUserService } from './IUserService';
import { encrypt } from '../../shared/utils/encrypt';
import { AppError } from '../../errors/AppError';

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

  async updateUser(id: string, body: Partial<IUser>): Promise<IUser | null> {
    if (body.email) {
      throw new AppError('Email cannot be updated', 400);
    }

    if (body.password) {
      body.password = await encrypt(body.password);
    }

    return this.userRepository.update(id, body);

  }
}
