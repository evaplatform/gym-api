import { IExerciseHistory } from '@/models/exerciseHistory/IExerciseHistory';
import { IdType } from '../../shared/types/IdType';

export interface IExerciseHistoryRepository {
  getById(id: IdType, academyId?: IdType): Promise<IExerciseHistory | null>;
  getAll(academyId?: IdType): Promise<IExerciseHistory[]>;
  create(exercise: IExerciseHistory): Promise<IExerciseHistory>;
  update(id: IdType, exercise: Partial<IExerciseHistory>): Promise<IExerciseHistory | null>;
  delete(id: IdType): Promise<void | null>;
  getAllByUser(userId: IdType, academyId?: IdType): Promise<IExerciseHistory[]>;
}
