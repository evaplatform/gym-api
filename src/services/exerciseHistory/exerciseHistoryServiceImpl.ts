
import { AppError } from '../../errors/AppError';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { ValidateAcademy } from '../../shared/decorators/ValidateAcademy';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IExerciseHistoryService } from './IExerciseHistoryService';
import { IExerciseHistoryRepository } from '@/repositories/exerciseHistory/IExerciseHistoryRepository';
import { IExerciseHistory } from '@/models/exerciseHistory/IExerciseHistory';


export class ExerciseHistoryServiceImpl implements IExerciseHistoryService {
  constructor(private readonly exerciseRepository: IExerciseHistoryRepository) { }

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<IExerciseHistory[]> {
    if (req.user?.isAdmin) {
      return this.exerciseRepository.getAll();
    }

    return this.exerciseRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<IExerciseHistory | null> {
    const id = req.params.id;
    let exercise: IExerciseHistory | null = null;

    if (req.user?.isAdmin) {
      exercise = await this.exerciseRepository.getById(id);
    } else {
      exercise = await this.exerciseRepository.getById(id, req.validatedAcademyId);
    }

    if (!exercise) {
      throw new AppError('Exercise not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    return exercise;
  }

  @ValidateAcademy
  async create(req: AuthenticatedRequest<IExerciseHistory>): Promise<IExerciseHistory> {
    const exercise = req.body;

    return this.exerciseRepository.create(exercise);
  }

  @ValidateAcademy
  async update(req: AuthenticatedRequest<IExerciseHistory>): Promise<IExerciseHistory | null> {
    const exercise = req.body;

    return this.exerciseRepository.update(exercise.id, exercise);
  }

  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;

    await this.getById(req);

    await this.exerciseRepository.delete(id);
  }

  @ValidateAcademy
  async getAllByUser(req: AuthenticatedRequest): Promise<IExerciseHistory[]> {
    const userId = req.params.userId;
    const academyId = req.validatedAcademyId;

    return this.exerciseRepository.getAllByUser(userId, academyId);
  }
}
