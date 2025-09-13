
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { AppError } from '../../errors/AppError';
import { IExerciseByUser } from '../../models/bodyBuildingByUser/IExerciseByUser';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IExerciseByUserService } from './IExerciseByUserService';
import { IExerciseByUserRepository } from '@/repositories/exerciseByUser/IExerciseByUserRepository';
import { ValidateAcademy } from '@/shared/decorators/ValidateAcademy';

export class ExerciseByUserServiceImpl implements IExerciseByUserService {
  constructor(private readonly exerciseByUserRepository: IExerciseByUserRepository) { }

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<IExerciseByUser[]> {
    if (req.user?.isAdmin) {
      return this.exerciseByUserRepository.getAll();
    }
    return this.exerciseByUserRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async create(req: AuthenticatedRequest<IExerciseByUser>): Promise<IExerciseByUser> {
    const bodyBuildingByUser = req.body;

    return this.exerciseByUserRepository.create(bodyBuildingByUser);
  }

  async update(req: AuthenticatedRequest<IExerciseByUser>): Promise<IExerciseByUser | null> {
    const bodyBuildingByUser = req.body;

    return this.exerciseByUserRepository.update(bodyBuildingByUser.id, bodyBuildingByUser);
  }


  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;

    await this.getById(req);

    await this.exerciseByUserRepository.delete(id);
  }

  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<IExerciseByUser | null> {
    const id = req.params.id;
    let bodyBuildingByUser: IExerciseByUser | null = null;

    if (req.user?.isAdmin) {
      bodyBuildingByUser = await this.exerciseByUserRepository.getById(id);
    } else {
      bodyBuildingByUser = await this.exerciseByUserRepository.getById(id, req.validatedAcademyId);
    }

    if (!bodyBuildingByUser) {
      throw new AppError('bodybuilding by user not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return bodyBuildingByUser;
  }

  @ValidateAcademy
  async getByUserId(req: AuthenticatedRequest): Promise<IExerciseByUser | null> {
    const userId = req.params.userId;

    return this.exerciseByUserRepository.getByUserId(userId, req.validatedAcademyId);
  }

  @ValidateAcademy
  async getByUserAndExerciseId(req: AuthenticatedRequest): Promise<IExerciseByUser | null> {
    const userId = req.params.userId;
    const exerciseId = req.params.exerciseId;

    let exerciseByUser: IExerciseByUser | null = null;

    if (req.user?.isAdmin) {
      exerciseByUser = await this.exerciseByUserRepository.getByUserAndExerciseId(userId, exerciseId);
    } else {
      exerciseByUser = await this.exerciseByUserRepository.getByUserAndExerciseId(userId, exerciseId, req.validatedAcademyId);
    }

    if (!exerciseByUser) {
      throw new AppError('plan by user not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return exerciseByUser;
  }
}
