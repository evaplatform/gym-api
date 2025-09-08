import { IdType } from '@/shared/types/IdType';
import { IExerciseBlock } from '../../models/exerciseBlock/IExerciseBlock';

export interface IExerciseBlockRepository {
  getById(id: string, academyId?: IdType): Promise<IExerciseBlock | null>;
  getAll(academyId?: IdType): Promise<IExerciseBlock[]>;
  create(exerciseBlock: IExerciseBlock): Promise<IExerciseBlock>;
  update(id: IdType, exerciseBlock: Partial<IExerciseBlock>): Promise<IExerciseBlock | null>;
  delete(id: IdType): Promise<void | null>;
}
