import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { ISettings } from '@/models/settings/ISettings';

export interface ISettingsService {
  getAll(req: AuthenticatedRequest): Promise<ISettings[]>;
  create(req: AuthenticatedRequest): Promise<ISettings>;
  update(req: AuthenticatedRequest): Promise<ISettings | null>;
  delete(req: AuthenticatedRequest): Promise<void | null>;
  getById(req: AuthenticatedRequest): Promise<ISettings | null>;
}
