import { IExercise } from '../../models/exercise/IExercise';
import { IdType } from '../../shared/types/IdType';

export interface IExerciseRepository {
  getById(id: IdType, academyId?: IdType): Promise<IExercise | null>;
  getAll(academyId?: IdType): Promise<IExercise[]>;
  create(exercise: IExercise): Promise<IExercise>;
  update(id: IdType, exercise: Partial<IExercise>): Promise<IExercise | null>;
  delete(id: IdType): Promise<void | null>;
  getAllByUserExercises(userId: IdType, academyId?: IdType): Promise<IExercise[]>;
}
