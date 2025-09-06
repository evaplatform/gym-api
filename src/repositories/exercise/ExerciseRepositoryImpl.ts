// src/repositories/UserRepository.ts
import { IExercise } from '../../models/exercise/IExercise';
import { ExerciseModel } from '../../models/exercise/mongo-schema';
import { IdType } from '../../shared/types/IdType';
import { IExerciseRepository } from './IExerciseRepository';

export class ExerciseRepositoryImpl implements IExerciseRepository {
    async update(id: string, user: Partial<IExercise>): Promise<IExercise | null> {
        return ExerciseModel.findByIdAndUpdate(id, { $set: user }, { new: true });
    }

    async getById(id: string, academyId?: string): Promise<IExercise | null> {
        const filter = academyId ? { academyId } : {};
        return ExerciseModel.findOne({ _id: id, ...filter }).lean();
    }

    async getAll(academyId?: IdType): Promise<IExercise[]> {
        const filter = academyId ? { academyId } : {};
        return ExerciseModel.find(filter);
    }

    async create(exercise: IExercise): Promise<IExercise> {
        return (await ExerciseModel.create(exercise)).toObject();
    }

    async delete(id: string): Promise<void | null> {
        return ExerciseModel.findByIdAndDelete(id);
    }
}
