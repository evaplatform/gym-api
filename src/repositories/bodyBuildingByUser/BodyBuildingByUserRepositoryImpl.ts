// src/repositories/UserRepository.ts

import { IBodyBuildingByUser } from '@/models/bodyBuildingByUser/IBodyBuildingByUser';
import { IdType } from '../../shared/types/IdType';
import { IBodyBuildingByUserRepository } from './IBodyBuildingByUserRepository';
import { BodyBuildingByUserModel } from '@/models/bodyBuildingByUser/mongo-schema';



export class BodyBuildingByUserRepositoryImpl implements IBodyBuildingByUserRepository {
    async update(id: IdType, bodyBuildingExercise: Partial<IBodyBuildingByUser>): Promise<IBodyBuildingByUser | null> {
        const updated = await BodyBuildingByUserModel.findByIdAndUpdate(
            id,
            { $set: bodyBuildingExercise },
            { new: true }
        ).exec();

        return updated ? updated.toJSON() : null;
    }


    async getById(id: IdType, academyId?: IdType): Promise<IBodyBuildingByUser | null> {
        const filter = academyId ? { _id: id, academyId } : { _id: id };
        const exercise = await BodyBuildingByUserModel.findOne(filter).exec();

        return exercise ? exercise.toJSON() : null;
    }

    async getAll(academyId?: IdType): Promise<IBodyBuildingByUser[]> {
        const filter = academyId ? { academyId } : {};
        const exercises = await BodyBuildingByUserModel.find(filter).exec();

        return exercises.map(exercise => exercise.toJSON());
    }

    async create(exercise: IBodyBuildingByUser): Promise<IBodyBuildingByUser> {
        return (await BodyBuildingByUserModel.create(exercise)).toObject();
    }

    async delete(id: IdType): Promise<void | null> {
        return BodyBuildingByUserModel.findByIdAndDelete(id);
    }
}
