// src/repositories/UserRepository.ts

import { IBodyBuildingByUser } from '@/models/bodyBuildingByUser/IBodyBuildingByUser';
import { IdType } from '../../shared/types/IdType';
import { IBodyBuildingByUserRepository } from './IBodyBuildingByUserRepository';
import { BodyBuildingByUserModel } from '@/models/bodyBuildingByUser/mongo-schema';
import { IBodyBuildingPlanByUser } from '@/shared/interfaces/IBodyBuildingPlanByUser';



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

    async getByUserId(userId: IdType, academyId?: IdType): Promise<IBodyBuildingByUser | null> {
        const filter = academyId ? { userId, academyId } : { userId };
        const bodyBuildingByUser = await BodyBuildingByUserModel.findOne(filter).exec();

        return bodyBuildingByUser ? bodyBuildingByUser.toJSON() : null;
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

    async getByUserAndExerciseId(userId: IdType, exerciseId: IdType, academyId?: IdType): Promise<IBodyBuildingPlanByUser | null> {
        const filter = academyId ? { userId, exerciseId, academyId } : { userId, exerciseId };
        const bodyBuildingByUser = await BodyBuildingByUserModel.findOne(filter).exec();

        if (!bodyBuildingByUser) {
            return null;
        }

        const plan = bodyBuildingByUser.plan.find(planItem => planItem.exerciseId.toString() === exerciseId.toString());

        return plan ? plan : null;
    }

    async addPlan(userId: IdType, plan: IBodyBuildingPlanByUser, academyId?: IdType): Promise<IBodyBuildingByUser> {
        const filter = academyId ? { userId, academyId } : { userId };
        const bodyBuildingByUser = await BodyBuildingByUserModel.findOne(filter).exec();

        if (!bodyBuildingByUser) {
            const newBodyBuildingByUser = new BodyBuildingByUserModel({
                userId,
                academyId,
                plan: [plan],
            });
            return (await newBodyBuildingByUser.save()).toObject();
        }

        bodyBuildingByUser.plan.push(plan);
        return (await bodyBuildingByUser.save()).toObject();
    }
}
