
import { TrainingByUserModel } from '@/models/trainingByUser/mongo-schema';
import { IExercise } from '../../models/exercise/IExercise';
import { ExerciseModel } from '../../models/exercise/mongo-schema';
import { IdType } from '../../shared/types/IdType';
import { IExerciseRepository } from './IExerciseRepository';

export class ExerciseRepositoryImpl implements IExerciseRepository {
    async update(id: IdType, exercise: Partial<IExercise>): Promise<IExercise | null> {
        const updated = await ExerciseModel.findByIdAndUpdate(
            id,
            { $set: exercise },
            { new: true }
        ).exec();

        return updated ? updated.toJSON() : null;
    }

    async getById(id: IdType, academyId?: IdType): Promise<IExercise | null> {
        const filter = academyId ? { _id: id, academyId } : { _id: id };
        const exercise = await ExerciseModel.findOne(filter).exec();

        return exercise ? exercise.toJSON() : null;
    }

    async getAll(academyId?: IdType): Promise<IExercise[]> {
        const filter = academyId ? { academyId } : {};
        const exercises = await ExerciseModel.find(filter).exec();

        return exercises.map(exercise => exercise.toJSON());
    }

    async create(exercise: IExercise): Promise<IExercise> {
        const created = await ExerciseModel.create(exercise);
        return created.toJSON();
    }

    async delete(id: IdType): Promise<void | null> {
        await ExerciseModel.findByIdAndDelete(id);
    }

    async getAllByUserExercises(userId: IdType, academyId?: IdType): Promise<IExercise[]> {
        const filter: any = { userId };
        if (academyId) {
            filter.academyId = academyId;
        }

        const trainingsByUserList = await TrainingByUserModel.find({ userId }).exec();

        const filterExercise = {
            trainingIds: trainingsByUserList
                .map(t => t.trainingId)
                .filter(id => !!id)
        };

        const exercises: any[] = await ExerciseModel.find(filterExercise).exec();

        return exercises.map(exercise => exercise.toJSON());
    }
}