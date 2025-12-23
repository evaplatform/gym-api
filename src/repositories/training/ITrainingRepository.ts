import { IdType } from '@/shared/types/IdType';
import { ITraining } from '../../models/training/ITraining';

export interface ITrainingRepository {
  getById(id: string, academyId?: IdType): Promise<ITraining | null>;
  getAll(academyId?: IdType): Promise<ITraining[]>;
  create(exerciseBlock: ITraining): Promise<ITraining>;
  update(id: IdType, exerciseBlock: Partial<ITraining>): Promise<ITraining | null>;
  delete(id: IdType): Promise<void | null>;
  getByIdList(ids: IdType[], academyId?: IdType): Promise<ITraining[]>;
  getAllByUserWorkouts(userId: IdType, academyId?: IdType): Promise<ITraining[]>;
}
