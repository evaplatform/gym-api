import { IExercise } from '../../models/exercise/IExercise';
import { IdType } from '../../shared/types/IdType';

export interface IExerciseRepository {
  getById(id: string): Promise<IExercise | null>;
  getAll(academyId?: IdType): Promise<IExercise[]>;
  create(user: IExercise): Promise<IExercise>;
  update(id: string, user: Partial<IExercise>): Promise<IExercise | null>;
  delete(id: string): Promise<void | null>;
}
