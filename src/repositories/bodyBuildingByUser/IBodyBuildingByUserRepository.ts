import { IBodyBuildingByUser } from '@/models/bodyBuildingByUser/IBodyBuildingByUser';
import { IdType } from '../../shared/types/IdType';
import { IBodyBuildingPlanByUser } from '@/shared/interfaces/IBodyBuildingPlanByUser';

export interface IBodyBuildingByUserRepository {
  getById(id: IdType, academyId?: IdType): Promise<IBodyBuildingByUser | null>;
  getAll(academyId?: IdType): Promise<IBodyBuildingByUser[]>;
  create(bodyBuildingByUser: IBodyBuildingByUser): Promise<IBodyBuildingByUser>;
  update(id: IdType, bodyBuildingByUser: Partial<IBodyBuildingByUser>): Promise<IBodyBuildingByUser | null>;
  delete(id: IdType): Promise<void | null>;
  getByUserAndExerciseId(userId: IdType, exerciseId: IdType, academyId?: IdType): Promise<IBodyBuildingPlanByUser | null>;
  getByUserId(userId: IdType, academyId?: IdType): Promise<IBodyBuildingByUser | null>;
}
