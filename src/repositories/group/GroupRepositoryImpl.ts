import { IGroup } from "../../models/group/IGroup";
import { GroupModel } from "../../models/group/mongo-schema";
import { IGroupRepository } from "./IGroupRepository";

export class GroupRepositoryImpl implements IGroupRepository {
  create(group: IGroup): Promise<IGroup> {
    return GroupModel.create(group);
  }

  async getById(id: string): Promise<IGroup | null> {
    return GroupModel.findById(id);
  }
}