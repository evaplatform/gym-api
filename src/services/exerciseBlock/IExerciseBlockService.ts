import { IExerciseBlock } from '../../models/exerciseBlock/IExerciseBlock';

export interface IExerciseBlockService {
  getAll(): Promise<IExerciseBlock[]>;
  create(user: IExerciseBlock): Promise<IExerciseBlock>;
  update(user: IExerciseBlock): Promise<IExerciseBlock | null>;
  delete(id: string): Promise<void | null>;
  getById(id: string): Promise<IExerciseBlock | null>;
}
