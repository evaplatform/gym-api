import { IdType } from '@/shared/types/IdType';
import { ITraining } from '../../models/training/ITraining';
import { TrainingModel } from '../../models/training/mongo-schema';
import { ITrainingRepository } from './ITrainingRepository';
import { TrainingByUserModel } from '@/models/trainingByUser/mongo-schema';

export class TrainingRepositoryImpl implements ITrainingRepository {
    async update(id: IdType, exercise: Partial<ITraining>): Promise<ITraining | null> {
        const updated = await TrainingModel.findByIdAndUpdate(
            id,
            { $set: exercise },
            { new: true }
        ).exec();

        return updated ? updated.toJSON() : null;
    }

    async getById(id: IdType, academyId?: IdType): Promise<ITraining | null> {
        const filter = academyId ? { _id: id, academyId } : { _id: id };
        const exercise = await TrainingModel.findOne(filter).exec();

        return exercise ? exercise.toJSON() : null;
    }

    async getAll(academyId?: IdType): Promise<ITraining[]> {
        const filter = academyId ? { academyId } : {};
        const exercises: any[] = await TrainingModel.find(filter).exec();

        return exercises.map(exercise => exercise.toJSON());
    }

    async create(exercise: ITraining): Promise<ITraining> {
        const created = await TrainingModel.create(exercise);
        return created.toJSON();
    }

    async delete(id: IdType): Promise<void | null> {
        await TrainingModel.findByIdAndDelete(id);
    }

    async getByIdList(ids: IdType[], academyId?: IdType): Promise<ITraining[]> {
        const filter = academyId ? { _id: { $in: ids }, academyId } : { _id: { $in: ids } };
        const exerciseBlocks = await TrainingModel.find(filter).exec();

        return exerciseBlocks.map(exerciseBlock => exerciseBlock.toJSON());
    }

    async getAllByUserWorkouts(userId: IdType, academyId?: IdType): Promise<ITraining[]> {
        const filter: any = { userId };
        if (academyId) {
            filter.academyId = academyId;
        }

        const trainingsByUser = await TrainingByUserModel.find(filter).exec();
        const trainingIds = trainingsByUser.map(training => training.trainingId);

        const trainingFilter: any = { _id: { $in: trainingIds } };
        if (academyId) {
            trainingFilter.academyId = academyId;
        }

        const trainings: any[] = await TrainingModel.find(trainingFilter).exec();

        return trainings.map(training => training.toJSON());
    }   
}