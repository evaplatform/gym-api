import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IGroup } from '../../models/group/IGroup';

export interface IGroupService {
  getAll(req: AuthenticatedRequest): Promise<IGroup[]>;
  create(req: AuthenticatedRequest): Promise<IGroup>;
  update(req: AuthenticatedRequest): Promise<IGroup | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<IGroup | null>;
}
