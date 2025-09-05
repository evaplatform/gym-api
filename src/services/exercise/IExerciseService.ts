import { IExercise } from '../../models/exercise/IExercise';
import { IdType } from '../../shared/types/IdType';

export interface IExerciseService {
  getAll(academyId?: IdType): Promise<IExercise[]>;
  create(user: IExercise): Promise<IExercise>;
  update(user: IExercise): Promise<IExercise | null>;
  delete(id: string): Promise<void | null>;
  getById(id: string): Promise<IExercise | null>;
}
