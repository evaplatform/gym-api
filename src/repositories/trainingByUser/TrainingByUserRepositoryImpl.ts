import { IdType } from '@/shared/types/IdType';
import { ITrainingByUser } from '../../models/trainingByUser/ITrainingByUser';
import { TrainingByUserModel } from '../../models/trainingByUser/mongo-schema';
import { ITrainingByUserRepository } from './ITrainingByUserRepository';

export class TrainingByUserRepositoryImpl implements ITrainingByUserRepository {
    async update(id: IdType, exercise: Partial<ITrainingByUser>): Promise<ITrainingByUser | null> {
        const updated = await TrainingByUserModel.findByIdAndUpdate(
            id,
            { $set: exercise },
            { new: true }
        ).exec();

        return updated ? updated.toJSON() : null;
    }

    async getById(id: IdType, academyId?: IdType): Promise<ITrainingByUser | null> {
        const filter = academyId ? { _id: id, academyId } : { _id: id };
        const exercise = await TrainingByUserModel.findOne(filter).exec();

        return exercise ? exercise.toJSON() : null;
    }

    async getAll(academyId?: IdType): Promise<ITrainingByUser[]> {
        const filter = academyId ? { academyId } : {};
        const exercises: any[] = await TrainingByUserModel.find(filter).exec();

        return exercises.map(exercise => exercise.toJSON());
    }

    async create(exercise: ITrainingByUser): Promise<ITrainingByUser> {
        const created = await TrainingByUserModel.create(exercise);
        return created.toJSON();
    }

    async delete(id: IdType): Promise<void | null> {
        await TrainingByUserModel.findByIdAndDelete(id);
    }

    async getByIdList(ids: IdType[], academyId?: IdType): Promise<ITrainingByUser[]> {
        const filter = academyId ? { _id: { $in: ids }, academyId } : { _id: { $in: ids } };
        const trainingList = await TrainingByUserModel.find(filter).exec();

        return trainingList.map(training => training.toJSON());
    }
}