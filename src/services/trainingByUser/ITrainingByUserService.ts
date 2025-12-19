import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { ITrainingByUser } from '../../models/trainingByUser/ITrainingByUser';

export interface ITrainingByUserService {
  getAll(req: AuthenticatedRequest): Promise<ITrainingByUser[]>;
  create(req: AuthenticatedRequest): Promise<ITrainingByUser>;
  update(req: AuthenticatedRequest): Promise<ITrainingByUser | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<ITrainingByUser | null>;
}
