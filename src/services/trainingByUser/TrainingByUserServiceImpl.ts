// src/services/UserService.ts
import { ValidateAcademy } from '@/shared/decorators/ValidateAcademy';
import { AppError } from '../../errors/AppError';
import { ITrainingByUser } from '../../models/trainingByUser/ITrainingByUser';
import { ITrainingByUserRepository } from '../../repositories/trainingByUser/ITrainingByUserRepository';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { ITrainingByUserService } from './ITrainingByUserService';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';


export class TrainingByUserServiceImpl implements ITrainingByUserService {
  constructor(private readonly trainingByUserRepository: ITrainingByUserRepository) { }

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<ITrainingByUser[]> {
    if (req.user?.isAdmin) {
      return this.trainingByUserRepository.getAll();
    }

    return this.trainingByUserRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<ITrainingByUser | null> {
    const id = req.params.id;
    let exercise: ITrainingByUser | null = null;

    if (req.user?.isAdmin) {
      exercise = await this.trainingByUserRepository.getById(id);
    } else {
      exercise = await this.trainingByUserRepository.getById(id, req.validatedAcademyId);
    }

    if (!exercise) {
      throw new AppError('Training by user not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return exercise;
  }

  @ValidateAcademy
  async create(req: AuthenticatedRequest<ITrainingByUser>): Promise<ITrainingByUser> {
    const exercise = req.body;

    return this.trainingByUserRepository.create(exercise);
  }

  @ValidateAcademy
  async update(req: AuthenticatedRequest<ITrainingByUser>): Promise<ITrainingByUser | null> {
    const training = req.body;
    const id = req.params.id;

    return this.trainingByUserRepository.update(id, training);
  }

  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;

    await this.getById(req);

    await this.trainingByUserRepository.delete(id);
  }
}


