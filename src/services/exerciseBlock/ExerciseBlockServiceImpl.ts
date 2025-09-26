// src/services/UserService.ts
import { ValidateAcademy } from '@/shared/decorators/ValidateAcademy';
import { AppError } from '../../errors/AppError';
import { IExerciseBlock } from '../../models/exerciseBlock/IExerciseBlock';
import { IExerciseBlockRepository } from '../../repositories/exerciseBlock/IExerciseBlockRepository';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IExerciseBlockService } from './IExerciseBlockService';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IExerciseRepository } from '@/repositories/exercise/IExerciseRepository';
import { i18n } from '@/i18n';
import { GeneralMessages } from '@/errors/GeneralMessages';
import { IExercise } from '@/models/exercise/IExercise';
export class ExerciseBlockServiceImpl implements IExerciseBlockService {
  constructor(private readonly exerciseBlockRepository: IExerciseBlockRepository, private readonly exerciseRepository: IExerciseRepository) { }

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<IExerciseBlock[]> {
    if (req.user?.isAdmin) {
      return this.exerciseBlockRepository.getAll();
    }

    return this.exerciseBlockRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<IExerciseBlock | null> {
    const id = req.params.id;
    let exercise: IExerciseBlock | null = null;

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
  async create(req: AuthenticatedRequest<IExerciseBlock>): Promise<IExerciseBlock> {
    const exercise = req.body;

    return this.exerciseBlockRepository.create(exercise);
  }

  @ValidateAcademy
  async update(req: AuthenticatedRequest<IExerciseBlock>): Promise<IExerciseBlock | null> {
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
  async getAllByUserWorkouts(req: AuthenticatedRequest): Promise<IExerciseBlock[]> {
    const user = req.user;

    if (!user) {
      throw new AppError(i18n.translate(GeneralMessages.USER_NOT_FOUND), HttpStatusCodeEnum.NOT_FOUND);
    }

    const exercisesByUser: IExercise[] = await this.exerciseRepository.getAllByUserId(user.id, req.validatedAcademyId);

    const exerciseBlockIds = exercisesByUser.map(exercise => exercise.exerciseBlockId).filter(id => id !== undefined) as string[];

    return this.exerciseBlockRepository.getByIdList(exerciseBlockIds, req.validatedAcademyId);
  }
}


