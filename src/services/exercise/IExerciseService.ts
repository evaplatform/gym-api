import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IExercise } from '../../models/exercise/IExercise';

export interface IExerciseService {
  getAll(req: AuthenticatedRequest): Promise<IExercise[]>;
  create(req: AuthenticatedRequest): Promise<IExercise>;
  update(req: AuthenticatedRequest): Promise<IExercise | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<IExercise | null>;
}
