import { AuthenticatedRequest } from 'interfaces/AuthenticatedRequest';
import { IBodyBuildingByUser } from '../../models/bodyBuildingByUser/IBodyBuildingByUser';

export interface IBodyBuildingByUserService {
  getAllFromUser(req: AuthenticatedRequest): Promise<IBodyBuildingByUser[]>;
  create(req: AuthenticatedRequest): Promise<IBodyBuildingByUser>;
  update(req: AuthenticatedRequest): Promise<IBodyBuildingByUser | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<IBodyBuildingByUser | null>;
}
