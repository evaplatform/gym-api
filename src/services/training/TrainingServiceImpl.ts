// src/services/UserService.ts
import { ValidateAcademy } from '@/shared/decorators/ValidateAcademy';
import { AppError } from '../../errors/AppError';
import { ITraining } from '../../models/training/ITraining';
import { ITrainingRepository } from '../../repositories/training/ITrainingRepository';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { ITrainingService } from './ITrainingService';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IExerciseRepository } from '@/repositories/exercise/IExerciseRepository';

export class TrainingServiceImpl implements ITrainingService {
  constructor(private readonly exerciseBlockRepository: ITrainingRepository, private readonly exerciseRepository: IExerciseRepository) { }

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<ITraining[]> {
    if (req.user?.isAdmin) {
      return this.exerciseBlockRepository.getAll();
    }

    return this.exerciseBlockRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<ITraining | null> {
    const id = req.params.id;
    let exercise: ITraining | null = null;

    if (req.user?.isAdmin) {
      exercise = await this.exerciseBlockRepository.getById(id);
    } else {
      exercise = await this.exerciseBlockRepository.getById(id, req.validatedAcademyId);
    }

    if (!exercise) {
      throw new AppError('Exercise block not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return exercise;
  }

  @ValidateAcademy
  async create(req: AuthenticatedRequest<ITraining>): Promise<ITraining> {
    const exercise = req.body;

    return this.exerciseBlockRepository.create(exercise);
  }

  @ValidateAcademy
  async update(req: AuthenticatedRequest<ITraining>): Promise<ITraining | null> {
    const exercise = req.body;

    return this.exerciseBlockRepository.update(exercise.id, exercise);
  }

  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;

    await this.getById(req);

    await this.exerciseBlockRepository.delete(id);
  }

  @ValidateAcademy
  async getAllByUser(req: AuthenticatedRequest): Promise<ITraining[]> {
    const userId = req.params.userId ?? req.user?.id as string;

    return this.exerciseBlockRepository.getAllByUser(userId, req.validatedAcademyId);
  }
}


