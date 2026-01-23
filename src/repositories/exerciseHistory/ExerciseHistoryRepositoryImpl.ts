
import { TrainingByUserModel } from '@/models/trainingByUser/mongo-schema';
import { IdType } from '../../shared/types/IdType';
import { IExerciseHistoryRepository } from './IExerciseHistoryRepository';
import { IExerciseHistory } from '@/models/exerciseHistory/IExerciseHistory';
import { ExerciseHistoryModel } from '@/models/exerciseHistory/mongo-schema';

export class ExerciseHistoryRepositoryImpl implements IExerciseHistoryRepository {
    async update(id: IdType, exercise: Partial<IExerciseHistory>): Promise<IExerciseHistory | null> {
        const updated = await ExerciseHistoryModel.findByIdAndUpdate(
            id,
            { $set: exercise },
            { new: true }
        ).exec();

        return updated ? updated.toJSON() : null;
    }

    async getById(id: IdType, academyId?: IdType): Promise<IExerciseHistory | null> {
        const filter = academyId ? { _id: id, academyId } : { _id: id };
        const exercise = await ExerciseHistoryModel.findOne(filter).exec();

        return exercise ? exercise.toJSON() : null;
    }

    async getAll(academyId?: IdType): Promise<IExerciseHistory[]> {
        const filter = academyId ? { academyId } : {};
        const exercises = await ExerciseHistoryModel.find(filter).exec();

        return exercises.map(exercise => exercise.toJSON());
    }

    async create(exercise:  IExerciseHistory): Promise<IExerciseHistory> {
        const created = await ExerciseHistoryModel.create(exercise);
        return created.toJSON();
    }

    async delete(id: IdType): Promise<void | null> {
        await ExerciseHistoryModel.findByIdAndDelete(id);
    }

    async getAllByUser(userId: IdType, academyId?: IdType): Promise<IExerciseHistory[]> {
        const filter: any = { userId };
        if (academyId) {
            filter.academyId = academyId;
        }

        const exercises: any[] = await ExerciseHistoryModel.find(filter).exec();

        return exercises.map(exercise => exercise.toJSON());
    }
}