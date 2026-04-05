import { IdType } from '../../shared/types/IdType';
import { IGroup } from '@/models/group/IGroup';
import { IGroupRepository } from './IGroupRepository';
import { GroupModel } from '@/models/group/mongo-schema';

export class GroupRepositoryImpl implements IGroupRepository {
    async update(id: IdType, group: Partial<IGroup>): Promise<IGroup | null> {
        const updated = await GroupModel.findByIdAndUpdate(
            id,
            { $set: group },
            { new: true }
        ).exec();

        return updated ? updated.toJSON() : null;
    }

    async getById(id: IdType, academyId?: IdType): Promise<IGroup | null> {
        const filter = academyId ? { _id: id, academyId } : { _id: id };
        const group = await GroupModel.findOne(filter).exec();

        return group ? group.toJSON() : null;
    }

    async getAll(academyId?: IdType): Promise<IGroup[]> {
        const filter = academyId ? { academyId } : {};
        const group = await GroupModel.find(filter).exec();

        return group.map((group: { toJSON: () => any; }) => group.toJSON());
    }

    async create(group: IGroup): Promise<IGroup> {
        const created = await GroupModel.create(group);
        return created.toJSON();
    }

    async delete(id: IdType): Promise<void | null> {
        await GroupModel.findByIdAndDelete(id);
    }

}