// src/repositories/UserRepository.ts

import { IExerciseByUser } from '@/models/exerciseByUser/IExerciseByUser';
import { IdType } from '../../shared/types/IdType';
import { IExerciseByUserRepository } from './IExerciseByUserRepository';
import { ExerciseByUserModel } from '@/models/exerciseByUser/mongo-schema';

export class ExerciseByUserRepositoryImpl implements IExerciseByUserRepository {
    async update(id: IdType, exerciseByUser: Partial<IExerciseByUser>): Promise<IExerciseByUser | null> {
        const updated = await ExerciseByUserModel.findByIdAndUpdate(
            id,
            { $set: exerciseByUser },
            { new: true }
        ).exec();

        return updated ? updated.toJSON() : null;
    }
    async getById(id: IdType, academyId?: IdType): Promise<IExerciseByUser | null> {
        const filter = academyId ? { _id: id, academyId } : { _id: id };
        const exercise = await ExerciseByUserModel.findOne(filter).exec();

        return exercise ? exercise.toJSON() : null;
    }

    async getAll(academyId?: IdType): Promise<IExerciseByUser[]> {
        const filter = academyId ? { academyId } : {};
        const exercises = await ExerciseByUserModel.find(filter).exec();

        return exercises.map(exercise => exercise.toJSON());
    }

    async create(exercise: IExerciseByUser): Promise<IExerciseByUser> {
        return (await ExerciseByUserModel.create(exercise)).toObject();
    }

    async delete(id: IdType): Promise<void | null> {
        return ExerciseByUserModel.findByIdAndDelete(id);
    }

    async getByUserId(userId: IdType, academyId?: IdType): Promise<IExerciseByUser | null> {
        const filter = academyId ? { userId, academyId } : { userId };
        const bodyBuildingByUser = await ExerciseByUserModel.findOne(filter).exec();

        return bodyBuildingByUser ? bodyBuildingByUser.toJSON() : null;
    }

    async getByUserAndExerciseId(userId: IdType, exerciseId: IdType, academyId?: IdType): Promise<IExerciseByUser | null> {
        const filter = academyId ? { userId, exerciseId, academyId } : { userId, exerciseId };
        const bodyBuildingByUser = await ExerciseByUserModel.findOne(filter).exec();

        return bodyBuildingByUser ? bodyBuildingByUser.toJSON() : null;
    }
}
