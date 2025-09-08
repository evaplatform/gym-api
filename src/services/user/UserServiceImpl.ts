import { IUser } from '../../models/user/IUser';
import { IUserRepository } from '../../repositories/user/IUserRepository';
import { IUserService } from './IUserService';
import { AppError } from '../../errors/AppError';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { UserWithToken } from '../../shared/types/AuthResponse';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { ValidateAcademy } from '@/shared/decorators/ValidateAcademy';

export class UserServiceImpl implements IUserService {
  // Constructor
  constructor(private readonly userRepository: IUserRepository) { }
  // Methods

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<IUser[]> {
    if (req.user?.isAdmin) {
      return this.userRepository.getAll();
    }

    return this.userRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<IUser | null> {
    const id = req.params.id;
    let user: IUser | null = null;

    if (req.user?.isAdmin) {
      user = await this.userRepository.getById(id);
    } else {
      user = await this.userRepository.getById(id, req.validatedAcademyId);
    }

    if (!user) {
      throw new AppError('User not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return user;
  }

  @ValidateAcademy
  async create(req: AuthenticatedRequest<IUser>): Promise<IUser> {
    // const encryptedPassword = await encrypt(user.password);
    // user.password = encryptedPassword;

    const user = req.body;

    return this.userRepository.create(user);
  }

  @ValidateAcademy
  async update(req: AuthenticatedRequest<IUser>): Promise<IUser | null> {
    const user = req.body;

    if (!user?.id) {
      throw new AppError('User ID is required for update', HttpStatusCodeEnum.BAD_REQUEST);
    }

    return this.userRepository.update(user.id, user);
  }

  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;

    await this.getById(req);

    await this.userRepository.delete(id);
  }
}
