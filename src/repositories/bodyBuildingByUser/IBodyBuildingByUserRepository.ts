import { IBodyBuildingByUser } from '@/models/bodyBuildingByUser/IBodyBuildingByUser';
import { IdType } from '../../shared/types/IdType';

export interface IBodyBuildingByUserRepository {
  getById(id: IdType, academyId?: IdType): Promise<IBodyBuildingByUser | null>;
  getAll(academyId?: IdType): Promise<IBodyBuildingByUser[]>;
  create(bodyBuildingByUser: IBodyBuildingByUser): Promise<IBodyBuildingByUser>;
  update(id: IdType, bodyBuildingByUser: Partial<IBodyBuildingByUser>): Promise<IBodyBuildingByUser | null>;
  delete(id: IdType): Promise<void | null>;
}
