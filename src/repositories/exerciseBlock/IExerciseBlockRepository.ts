import { IdType } from '@/shared/types/IdType';
import { IExerciseBlock } from '../../models/exerciseBlock/IExerciseBlock';

export interface IExerciseBlockRepository {
  getById(id: string, academyId?: string): Promise<IExerciseBlock | null>;
  getAll(academyId?: IdType): Promise<IExerciseBlock[]>;
  create(user: IExerciseBlock): Promise<IExerciseBlock>;
  update(id: string, user: Partial<IExerciseBlock>): Promise<IExerciseBlock | null>;
  delete(id: string): Promise<void | null>;
}
