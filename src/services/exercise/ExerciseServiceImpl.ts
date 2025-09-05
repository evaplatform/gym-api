// src/services/UserService.ts
import { AppError } from '../../errors/AppError';
import { IExercise } from '../../models/exercise/IExercise';
import { IAcademyRepository } from '../../repositories/academy/IAcademyRepository';
import { IExerciseRepository } from '../../repositories/exercise/IExerciseRepository';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IExerciseExtendedProps } from '../../shared/interfaces/IExerciseExtendedProps';
import { IdType } from '../../shared/types/IdType';
import { IExerciseService } from './IExerciseService';

export class ExerciseServiceImpl implements IExerciseService {
  constructor(private readonly exerciseRepository: IExerciseRepository, private readonly academyRepository: IAcademyRepository) { }

  async getAll(academyId?: IdType): Promise<IExercise[]> {
    return this.exerciseRepository.getAll(academyId);
  }

  async create(exercise: IExercise): Promise<IExercise> {
    return this.exerciseRepository.create(exercise);
  }

  async update(exercise: IExercise): Promise<IExercise | null> {
    return this.exerciseRepository.update(exercise.id, exercise);
  }

  async getById(id: string): Promise<IExerciseExtendedProps | null> {
    const exercise = await this.exerciseRepository.getById(id);
    const academyId = (exercise?.academyId?.toString() || '');
    const academy = await this.academyRepository.getById(academyId);
    if (!exercise) {
      throw new AppError('Invalid exercise data', HttpStatusCodeEnum.BAD_REQUEST);
    }

    const exerciseWithAcademy: IExerciseExtendedProps = {
      ...exercise,
      name: exercise.name,
      academyName: academy?.name || '',
    };

    return exerciseWithAcademy;
  }

  async delete(id: string): Promise<void | null> {
    const exercise = await this.exerciseRepository.getById(id);

    if (!exercise) {
      throw new AppError('Exercise not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    await this.exerciseRepository.delete(id);
  }


}
