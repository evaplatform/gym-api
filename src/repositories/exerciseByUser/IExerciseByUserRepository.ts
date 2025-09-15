import { IExerciseByUser } from '@/models/exerciseByUser/IExerciseByUser';
import { IdType } from '../../shared/types/IdType';

export interface IExerciseByUserRepository {
  getById(id: IdType, academyId?: IdType): Promise<IExerciseByUser | null>;
  getAll(academyId?: IdType): Promise<IExerciseByUser[]>;
  create(bodyBuildingByUser: IExerciseByUser): Promise<IExerciseByUser>;
  update(id: IdType, bodyBuildingByUser: Partial<IExerciseByUser>): Promise<IExerciseByUser | null>;
  delete(id: IdType): Promise<void | null>;
  getByUserAndExerciseId(userId: IdType, exerciseId: IdType, academyId?: IdType): Promise<IExerciseByUser | null>;
  getByUserId(userId: IdType, academyId?: IdType): Promise<IExerciseByUser[] | null>;
}
