import { IExerciseBlock } from '../../models/exerciseBlock/IExerciseBlock';

export interface IExerciseBlockRepository {
  getById(id: string): Promise<IExerciseBlock | null>;
  getAll(): Promise<IExerciseBlock[]>;
  create(user: IExerciseBlock): Promise<IExerciseBlock>;
  update(id: string, user: Partial<IExerciseBlock>): Promise<IExerciseBlock | null>;
  delete(id: string): Promise<void | null>;
}
