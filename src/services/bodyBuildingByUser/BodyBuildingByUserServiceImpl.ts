
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { AppError } from '../../errors/AppError';
import { IBodyBuildingByUser } from '../../models/bodyBuildingByUser/IBodyBuildingByUser';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IBodyBuildingByUserService } from './IBodyBuildingByUserService';
import { IBodyBuildingByUserRepository } from 'src/repositories/bodyBuildingByUser/IBodyBuildingByUserRepository';


export class BodyBuildingByUserServiceImpl implements IBodyBuildingByUserService {
  constructor(private readonly bodyBuildingByUserRepository: IBodyBuildingByUserRepository) { }

  async getAllFromUser(req: AuthenticatedRequest): Promise<IBodyBuildingByUser[]> {

    if (!req.params?.id) {
      throw new AppError('User ID is required', HttpStatusCodeEnum.BAD_REQUEST);
    }

    const userId = req.params.id;

    return this.bodyBuildingByUserRepository.getAllFromUser(userId);
  }

  async create(req: AuthenticatedRequest<IBodyBuildingByUser>): Promise<IBodyBuildingByUser> {
    const bodyBuildingByUser = req.body;

    return this.bodyBuildingByUserRepository.create(bodyBuildingByUser);
  }

  async update(req: AuthenticatedRequest<IBodyBuildingByUser>): Promise<IBodyBuildingByUser | null> {
    const bodyBuildingByUser = req.body;

    return this.bodyBuildingByUserRepository.update(bodyBuildingByUser.id, bodyBuildingByUser);
  }

  async getById(req: AuthenticatedRequest): Promise<IBodyBuildingByUser | null> {
    const id = req.params.id;
    let bodyBuildingByUser: IBodyBuildingByUser | null = null;


    if (req.user?.isAdmin) {
      bodyBuildingByUser = await this.bodyBuildingByUserRepository.getById(id);
    }
    else {
      if (!req.user?.academyId) {
        throw new AppError('User not associated with Request academy', HttpStatusCodeEnum.FORBIDDEN);
      }

      bodyBuildingByUser = await this.bodyBuildingByUserRepository.getById(id, req.user.academyId);
    }

    if (!bodyBuildingByUser?.academyId?.toString()) {
      return bodyBuildingByUser
    }

    const academyId = (bodyBuildingByUser?.academyId?.toString() || '');

    // const academy = await this.academyRepository.getById(academyId);

    // if (!bodyBuildingByUser) {
    //   throw new AppError('Invalid exercise data', HttpStatusCodeEnum.BAD_REQUEST);
    // }

    // const exerciseWithAcademy: IBodyBuildingByUser = {
    //   ...bodyBuildingByUser,
    //   name: bodyBuildingByUser.name
    // };

    return bodyBuildingByUser;
  }

  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;
    const bodyBuildingByUser = await this.bodyBuildingByUserRepository.getById(id);

    if (req.user?.isAdmin) {
      await this.bodyBuildingByUserRepository.delete(id);
      return;
    }

    if (req.user?.academyId !== bodyBuildingByUser?.academyId.toString()) {
      throw new AppError('Cannot delete exercise from a different academy', HttpStatusCodeEnum.FORBIDDEN);
    }

    if (!bodyBuildingByUser) {
      throw new AppError('Exercise not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    await this.bodyBuildingByUserRepository.delete(id);
  }
}
