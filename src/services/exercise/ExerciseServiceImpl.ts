
import { AppError } from '../../errors/AppError';
import { IExercise } from '../../models/exercise/IExercise';
import { IExerciseRepository } from '../../repositories/exercise/IExerciseRepository';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IExerciseService } from './IExerciseService';
import { ValidateAcademy } from '../../shared/decorators/ValidateAcademy';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';


export class ExerciseServiceImpl implements IExerciseService {
  constructor(private readonly exerciseRepository: IExerciseRepository) { }

  @ValidateAcademy
  async getAll(req: AuthenticatedRequest): Promise<IExercise[]> {
    if (req.user?.isAdmin) {
      return this.exerciseRepository.getAll();
    }

    return this.exerciseRepository.getAll(req.validatedAcademyId);
  }

  @ValidateAcademy
  async getById(req: AuthenticatedRequest): Promise<IExercise | null> {
    const id = req.params.id;
    let exercise: IExercise | null = null;

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
  async create(req: AuthenticatedRequest<IExercise>): Promise<IExercise> {
    const exercise = req.body;

    return this.exerciseRepository.create(exercise);
  }

  @ValidateAcademy
  async update(req: AuthenticatedRequest<IExercise>): Promise<IExercise | null> {
    const exercise = req.body;

    return this.exerciseRepository.update(exercise.id, exercise);
  }
  
  @ValidateAcademy
  async delete(req: AuthenticatedRequest): Promise<void | null> {
    const id = req.params.id;
   
    await this.getById(req);

    await this.exerciseRepository.delete(id);
  }
}
