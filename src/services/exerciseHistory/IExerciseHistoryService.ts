import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IExerciseHistory } from '@/models/exerciseHistory/IExerciseHistory';

export interface IExerciseHistoryService {
  getAll(req: AuthenticatedRequest): Promise<IExerciseHistory[]>;
  create(req: AuthenticatedRequest): Promise<IExerciseHistory>;
  update(req: AuthenticatedRequest): Promise<IExerciseHistory | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<IExerciseHistory | null>;
  getAllByUser(req: AuthenticatedRequest): Promise<IExerciseHistory[]>;
}
