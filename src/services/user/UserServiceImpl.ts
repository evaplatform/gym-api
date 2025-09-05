import { IUser } from '../../models/user/IUser';
import { IUserRepository } from '../../repositories/user/IUserRepository';
import { IUserService } from './IUserService';
import { encrypt } from '../../shared/utils/encrypt';
import { AppError } from '../../errors/AppError';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { deleteAWSFile } from '../../middlewares/multer-s3';
import { UserWithToken } from '../../shared/types/AuthResponse';

export class UserServiceImpl implements IUserService {
  // Constructor
  constructor(private readonly userRepository: IUserRepository) { }
  // Methods

  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.getById(id);
  }

  async getUsers(): Promise<IUser[]> {
    return this.userRepository.getAll();
  }

  async createUser(user: UserWithToken): Promise<IUser> {
    // const encryptedPassword = await encrypt(user.password);
    // user.password = encryptedPassword;

    return this.userRepository.create(user);
  }

  async updateUser(body: Partial<IUser>): Promise<IUser | null> {
    if (body.email) {
      throw new AppError('Email cannot be updated', HttpStatusCodeEnum.BAD_REQUEST);
    }

    if (!body.id) {
      throw new AppError('User ID is required for update', HttpStatusCodeEnum.BAD_REQUEST);
    }

    return this.userRepository.update(body.id, body);
  }

  async delete(id: string): Promise<void | null> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new AppError('User not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    await this.userRepository.delete(id);

    // try {
    //   if (user.profilePhoto) {
    //     await deleteAWSFile(user.profilePhoto)
    //   }
    // } catch (error) {
    //   throw new AppError('Image delete on database. Failed to delete image on AWS', HttpStatusCodeEnum.INTERNAL_SERVER_ERROR);
    // }
  }
}
