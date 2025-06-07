import { IExercise } from '../../models/exercise/IExercise';

export interface IExerciseRepository {
  getById(id: string): Promise<IExercise | null>;
  getAll(): Promise<IExercise[]>;
  create(user: IExercise): Promise<IExercise>;
  update(id: string, user: Partial<IExercise>): Promise<IExercise | null>;
  delete(id: string): Promise<void | null>;
}
