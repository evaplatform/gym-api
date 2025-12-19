import { IdType } from '@/shared/types/IdType';
import { ITrainingByUser } from '../../models/trainingByUser/ITrainingByUser';

export interface ITrainingByUserRepository {
  getById(id: string, academyId?: IdType): Promise<ITrainingByUser | null>;
  getAll(academyId?: IdType): Promise<ITrainingByUser[]>;
  create(exerciseBlock: ITrainingByUser): Promise<ITrainingByUser>;
  update(id: IdType, exerciseBlock: Partial<ITrainingByUser>): Promise<ITrainingByUser | null>;
  delete(id: IdType): Promise<void | null>;
  getByIdList(ids: IdType[], academyId?: IdType): Promise<ITrainingByUser[]>;
}
