
import { AuthenticatedRequest } from 'interfaces/AuthenticatedRequest';
import { AppError } from '../../errors/AppError';
import { IExercise } from '../../models/exercise/IExercise';
import { IAcademyRepository } from '../../repositories/academy/IAcademyRepository';
import { IExerciseRepository } from '../../repositories/exercise/IExerciseRepository';
import { HttpStatusCodeEnum } from '../../shared/enums/HttpStatusCodeEnum';
import { IExerciseExtendedProps } from '../../shared/interfaces/IExerciseExtendedProps';
import { IExerciseService } from './IExerciseService';


export class ExerciseServiceImpl implements IExerciseService {
  constructor(private readonly exerciseRepository: IExerciseRepository, private readonly academyRepository: IAcademyRepository) { }

  async getAll(req: any): Promise<IExercise[]> {
    if (req.user?.isAdmin) {
      const exercises = await this.exerciseRepository.getAll();
      return exercises;
    }

    if (!req.user?.academyId) {
      throw new AppError('User not associated with any academy', HttpStatusCodeEnum.FORBIDDEN);
    }

    const academyId = req.user.academyId;
    return this.exerciseRepository.getAll(academyId);
  }

  async create(req: any): Promise<IExercise> {
    const exercise = req.body;

    if (!req.user?.academyId) {
      throw new AppError('User not associated with any academy', HttpStatusCodeEnum.FORBIDDEN);
    }

    if (req.user?.isAdmin) {
      return this.exerciseRepository.create(exercise);
    }

    if (req.user?.academyId !==  exercise?.academyId.toString()) {
      throw new AppError('Cannot create exercise for a different academy', HttpStatusCodeEnum.FORBIDDEN);
    }

    return this.exerciseRepository.create(exercise);
  }

  async update(req: any): Promise<IExercise | null> {
    const exercise = req.body;

    if (!req.user?.academyId) {
      throw new AppError('User not associated with any academy', HttpStatusCodeEnum.FORBIDDEN);
    }

    if (req.user?.isAdmin) {
      return this.exerciseRepository.update(exercise.id, exercise);
    }

    if (req.user?.academyId !==  exercise?.academyId.toString()) {
      throw new AppError('Cannot update exercise for a different academy', HttpStatusCodeEnum.FORBIDDEN);
    }

    return this.exerciseRepository.update(exercise.id, exercise);
  }

  async getById(req: any): Promise<IExerciseExtendedProps | null> {

    const id = req.params.id;
    let exercise: IExercise | null = null;


    if (req.user?.isAdmin) {
      exercise = await this.exerciseRepository.getById(id);
    }
    else {
      if (!req.user?.academyId) {
        throw new AppError('User not associated with any academy', HttpStatusCodeEnum.FORBIDDEN);
      }

      exercise = await this.exerciseRepository.getById(id, req.user.academyId);
    }

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

  async delete(req: any): Promise<void | null> {
    const id = req.params.id;
    const exercise = await this.exerciseRepository.getById(id);

    if (req.user?.isAdmin) {
      await this.exerciseRepository.delete(id);
      return;
    }

    if (req.user?.academyId !== exercise?.academyId.toString()) {
      throw new AppError('Cannot delete exercise from a different academy', HttpStatusCodeEnum.FORBIDDEN);
    }

    if (!exercise) {
      throw new AppError('Exercise not found', HttpStatusCodeEnum.NOT_FOUND);
    }

    await this.exerciseRepository.delete(id);
  }
}
