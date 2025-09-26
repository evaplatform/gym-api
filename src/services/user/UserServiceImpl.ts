import { IUser } from '../../models/user/IUser';
import { IUserRepository } from '../../repositories/user/IUserRepository';
import { IUserService } from './IUserService';
import { AppError } from '../../errors/AppError';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { UserWithToken } from '../../shared/types/AuthResponse';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { ValidateAcademy } from '@/shared/decorators/ValidateAcademy';
import { i18n } from '@/i18n';
import { GeneralMessages } from '@/errors/GeneralMessages';
import { log } from '@/shared/utils/log';
import { isNumber } from '@/shared/utils/isNumber';

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
      throw new AppError(i18n.translate(GeneralMessages.USER_NOT_FOUND), HttpStatusCodeEnum.NOT_FOUND);
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
      throw new AppError(i18n.translate(GeneralMessages.USER_ID_REQUIRED_FOR_UPDATE), HttpStatusCodeEnum.BAD_REQUEST);
    }

    return this.userRepository.update(user.id, user);
  }

  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;

    await this.getById(req);

    await this.userRepository.delete(id);
  }

  @ValidateAcademy
  async getLoggedUser(req: AuthenticatedRequest): Promise<IUser | null> {
    log("Fetching logged-in user details");
    const userId = req.user?.id;

    log(`Logged-in user ID: ${userId}`);

    if (!userId) {
      log("User ID is not found in the request.");
      throw new AppError(i18n.translate(GeneralMessages.USER_NOT_FOUND), HttpStatusCodeEnum.NOT_FOUND);
    }

    const user = await this.userRepository.getById(userId);

    log(`Fetched user details: ${user ? JSON.stringify(user) : 'User not found'}`);

    if (!user) {
      throw new AppError(i18n.translate(GeneralMessages.USER_NOT_FOUND), HttpStatusCodeEnum.NOT_FOUND);
    }

    return user;
  }
}
