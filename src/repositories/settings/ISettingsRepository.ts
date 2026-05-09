import { ISettings } from '@/models/settings/ISettings';
import { IExercise } from '../../models/exercise/IExercise';
import { IdType } from '../../shared/types/IdType';

export interface ISettingsRepository {
  getById(id: IdType, academyId?: IdType): Promise<ISettings | null>;
  getAll(academyId?: IdType): Promise<ISettings[]>;
  create(settings: ISettings): Promise<ISettings>;
  update(id: IdType, settings: Partial<ISettings>): Promise<ISettings | null>;
  delete(id: IdType): Promise<void | null>;
}
