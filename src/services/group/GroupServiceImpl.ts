
import { IGroupService } from './IGroupService';
import { IGroupRepository } from '../../repositories/group/IGroupRepository';
import { IGroup } from '../../models/group/IGroup';

export class GroupServiceImpl implements IGroupService {
    // Constructor
    constructor(private readonly groupRepository: IGroupRepository) { }

    // Methods

    getById(id: string): Promise<IGroup | null> {
        return this.groupRepository.getById(id);
    }
    create(group: IGroup): Promise<IGroup> {
        return this.groupRepository.create(group);
    }
}