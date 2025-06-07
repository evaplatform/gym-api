import { IGroup } from '../../models/group/IGroup';

export interface IGroupService {
  getById(id: string): Promise<IGroup | null>;
  create(group: IGroup): Promise<IGroup>;
}
