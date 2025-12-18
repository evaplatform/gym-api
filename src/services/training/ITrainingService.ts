import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { ITraining } from '../../models/training/ITraining';

export interface ITrainingService {
  getAll(req: AuthenticatedRequest): Promise<ITraining[]>;
  create(req: AuthenticatedRequest): Promise<ITraining>;
  update(req: AuthenticatedRequest): Promise<ITraining | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<ITraining | null>;
}
