import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IExerciseByUser } from '../../models/exerciseByUser/IExerciseByUser';

export interface IExerciseByUserService {
  getAll(req: AuthenticatedRequest): Promise<IExerciseByUser[]>;
  create(req: AuthenticatedRequest): Promise<IExerciseByUser>;
  update(req: AuthenticatedRequest): Promise<IExerciseByUser | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<IExerciseByUser | null>;
  getByUserAndExerciseId(req: AuthenticatedRequest): Promise<IExerciseByUser | null>;
  getByUserId(req: AuthenticatedRequest): Promise<IExerciseByUser | null>;
}

