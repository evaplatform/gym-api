import { IBodyBuildingByUser } from 'bodyBuildingByUser/IBodyBuildingByUser';
import { IdType } from '../../shared/types/IdType';

export interface IBodyBuildingByUserRepository {
  getById(id: string, academyId?: string): Promise<IBodyBuildingByUser | null>;
  getAllFromUser(userId: IdType): Promise<IBodyBuildingByUser[]>;
  create(user: IBodyBuildingByUser): Promise<IBodyBuildingByUser>;
  update(id: string, user: Partial<IBodyBuildingByUser>): Promise<IBodyBuildingByUser | null>;
  delete(id: string): Promise<void | null>;
}
