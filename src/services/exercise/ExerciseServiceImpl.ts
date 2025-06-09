// src/services/UserService.ts
import { AppError } from '../../errors/AppError';
import { IExercise } from '../../models/exercise/IExercise';
import { IExerciseRepository } from '../../repositories/exercise/IExerciseRepository';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IExerciseService } from './IExerciseService';

export class ExerciseServiceImpl implements IExerciseService {
  constructor(private readonly exerciseRepository: IExerciseRepository) { }

  async getAll(): Promise<IExercise[]> {
    return this.exerciseRepository.getAll();
  }

  async create(exercise: IExercise): Promise<IExercise> {
    return this.exerciseRepository.create(exercise);
  }

  async update(exercise: IExercise): Promise<IExercise | null> {
    return this.exerciseRepository.update(exercise.id, exercise);
  }

  async getById(id: string): Promise<IExercise | null> {
    return this.exerciseRepository.getById(id);
  }

  async delete(id: string): Promise<void | null> {
    const exercise = await this.exerciseRepository.getById(id);

    if (!exercise) {
      throw new AppError('Academy not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    await this.exerciseRepository.delete(id);
  }


}
