import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IExerciseBlock } from '../../models/exerciseBlock/IExerciseBlock';

export interface IExerciseBlockService {
  getAll(req: AuthenticatedRequest): Promise<IExerciseBlock[]>;
  create(req: AuthenticatedRequest): Promise<IExerciseBlock>;
  update(req: AuthenticatedRequest): Promise<IExerciseBlock | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<IExerciseBlock | null>;
  getAllByUserWorkouts(req: AuthenticatedRequest): Promise<IExerciseBlock[]>;
}
