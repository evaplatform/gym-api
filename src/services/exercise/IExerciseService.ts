import { IExercise } from '../../models/exercise/IExercise';

export interface IExerciseService {
  getAll(): Promise<IExercise[]>;
  create(user: IExercise): Promise<IExercise>;
  update(user: IExercise): Promise<IExercise | null>;
  delete(id: string): Promise<void | null>;
  getById(id: string): Promise<IExercise | null>;
}
