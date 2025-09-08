// src/repositories/UserRepository.ts

import { IBodyBuildingByUser } from '@/models/bodyBuildingByUser/IBodyBuildingByUser';
import { IdType } from '../../shared/types/IdType';
import { IBodyBuildingByUserRepository } from './IBodyBuildingByUserRepository';
import { BodyBuildingByUserModel } from '@/models/bodyBuildingByUser/mongo-schema';



export class BodyBuildingByUserRepositoryImpl implements IBodyBuildingByUserRepository {
    async update(id: string, user: Partial<IBodyBuildingByUser>): Promise<IBodyBuildingByUser | null> {
        return BodyBuildingByUserModel.findByIdAndUpdate(id, { $set: user }, { new: true });
    }

    async getById(id: string, academyId?: string): Promise<IBodyBuildingByUser | null> {
        const filter = academyId ? { academyId } : {};
        return BodyBuildingByUserModel.findOne({ _id: id, ...filter }).lean();
    }

    async getAllFromUser(userId?: IdType): Promise<IBodyBuildingByUser[]> {
        const filter = userId ? { userId } : {};
        return BodyBuildingByUserModel.find(filter).lean();
    }

    async create(exercise: IBodyBuildingByUser): Promise<IBodyBuildingByUser> {
        return (await BodyBuildingByUserModel.create(exercise)).toObject();
    }

    async delete(id: string): Promise<void | null> {
        return BodyBuildingByUserModel.findByIdAndDelete(id);
    }
}
