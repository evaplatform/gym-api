import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IBodyBuildingByUser } from '../../models/bodyBuildingByUser/IBodyBuildingByUser';

export interface IBodyBuildingByUserService {
  getAll(req: AuthenticatedRequest): Promise<IBodyBuildingByUser[]>;
  create(req: AuthenticatedRequest): Promise<IBodyBuildingByUser>;
  update(req: AuthenticatedRequest): Promise<IBodyBuildingByUser | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<IBodyBuildingByUser | null>;
  addPlan(req: AuthenticatedRequest): Promise<IBodyBuildingByUser>;
  updatePlan(req: AuthenticatedRequest): Promise<IBodyBuildingByUser>;
  removePlan(req: AuthenticatedRequest): Promise<IBodyBuildingByUser>;
}
