// src/services/UserService.ts
import { AppError } from '../../errors/AppError';
import { IExerciseBlock } from '../../models/exerciseBlock/IExerciseBlock';
import { IExerciseBlockRepository } from '../../repositories/exerciseBlock/IExerciseBlockRepository';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IExerciseBlockService } from './IExerciseBlockService';

export class ExerciseBlockServiceImpl implements IExerciseBlockService {
  constructor(private readonly exerciseRepository: IExerciseBlockRepository) { }

  async getAll(): Promise<IExerciseBlock[]> {
    return this.exerciseRepository.getAll();
  }

  async create(exercise: IExerciseBlock): Promise<IExerciseBlock> {
    return this.exerciseRepository.create(exercise);
  }

  async update(exercise: IExerciseBlock): Promise<IExerciseBlock | null> {
    return this.exerciseRepository.update(exercise.id, exercise);
  }

  async getById(id: string): Promise<IExerciseBlock | null> {
    return this.exerciseRepository.getById(id);
  }

  async delete(id: string): Promise<void | null> {
    const exercise = await this.exerciseRepository.getById(id);

    if (!exercise) {
      throw new AppError('Exercise Block not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    await this.exerciseRepository.delete(id);
  }


}
