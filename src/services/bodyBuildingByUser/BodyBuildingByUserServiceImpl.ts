
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { AppError } from '../../errors/AppError';
import { IBodyBuildingByUser } from '../../models/bodyBuildingByUser/IBodyBuildingByUser';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IBodyBuildingByUserService } from './IBodyBuildingByUserService';
import { IBodyBuildingByUserRepository } from 'src/repositories/bodyBuildingByUser/IBodyBuildingByUserRepository';
import { ValidateAcademy } from '@/shared/decorators/ValidateAcademy';


export class BodyBuildingByUserServiceImpl implements IBodyBuildingByUserService {
  constructor(private readonly bodyBuildingByUserRepository: IBodyBuildingByUserRepository) { }

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<IBodyBuildingByUser[]> {
    if (req.user?.isAdmin) {
      return this.bodyBuildingByUserRepository.getAll();
    }
    return this.bodyBuildingByUserRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async create(req: AuthenticatedRequest<IBodyBuildingByUser>): Promise<IBodyBuildingByUser> {
    const bodyBuildingByUser = req.body;

    return this.bodyBuildingByUserRepository.create(bodyBuildingByUser);
  }

  async update(req: AuthenticatedRequest<IBodyBuildingByUser>): Promise<IBodyBuildingByUser | null> {
    const bodyBuildingByUser = req.body;

    return this.bodyBuildingByUserRepository.update(bodyBuildingByUser.id, bodyBuildingByUser);
  }


  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<IBodyBuildingByUser | null> {
    const id = req.params.id;
    let bodyBuildingByUser: IBodyBuildingByUser | null = null;

    if (req.user?.isAdmin) {
      bodyBuildingByUser = await this.bodyBuildingByUserRepository.getById(id);
    } else {
      bodyBuildingByUser = await this.bodyBuildingByUserRepository.getById(id, req.validatedAcademyId);
    }

    if (!bodyBuildingByUser) {
      throw new AppError('bodybuilding by user not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return bodyBuildingByUser;
  }


  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;
   
    await this.getById(req);

    await this.bodyBuildingByUserRepository.delete(id);
  }
}
