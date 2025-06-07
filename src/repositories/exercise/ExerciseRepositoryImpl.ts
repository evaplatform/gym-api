// src/repositories/UserRepository.ts
import { IExercise } from '../../models/exercise/IExercise';
import { ExerciseModel } from '../../models/exercise/mongo-schema';
import { IExerciseRepository } from './IExerciseRepository';

export class ExerciseRepositoryImpl implements IExerciseRepository {
    async update(id: string, user: Partial<IExercise>): Promise<IExercise | null> {
        return ExerciseModel.findByIdAndUpdate(id, { $set: user }, { new: true });
    }

    async getById(id: string): Promise<IExercise | null> {
        return ExerciseModel.findById(id);
    }

    async getAll(): Promise<IExercise[]> {
        return ExerciseModel.find();
    }

    async create(exercise: IExercise): Promise<IExercise> {
        return (await ExerciseModel.create(exercise)).toObject();
    }

    async delete(id: string): Promise<void | null> {
        return ExerciseModel.findByIdAndDelete(id);
    }
}
