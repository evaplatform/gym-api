import { IdType } from '@/shared/types/IdType';
import { IGroup } from '../../models/group/IGroup';

export interface IGroupRepository {
  getById(id: string, academyId?: IdType): Promise<IGroup | null>;
  create(group: IGroup): Promise<IGroup>;
  update(id: string, group: Partial<IGroup>): Promise<IGroup | null>;
  delete(id: string): Promise<void | null>;
  getAll(academyId?: IdType): Promise<IGroup[]>;
}
