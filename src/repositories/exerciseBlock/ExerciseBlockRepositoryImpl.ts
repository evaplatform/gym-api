// src/repositories/UserRepository.ts
import { IExerciseBlock } from '../../models/exerciseBlock/IExerciseBlock';
import { ExerciseBlockModel } from '../../models/exerciseBlock/mongo-schema';
import { IExerciseBlockRepository } from './IExerciseBlockRepository';

export class ExerciseBlockRepositoryImpl implements IExerciseBlockRepository {
    async update(id: string, user: Partial<IExerciseBlock>): Promise<IExerciseBlock | null> {
        return ExerciseBlockModel.findByIdAndUpdate(id, { $set: user }, { new: true });
    }

    async getById(id: string): Promise<IExerciseBlock | null> {
        return ExerciseBlockModel.findById(id);
    }

    async getAll(): Promise<IExerciseBlock[]> {
        return ExerciseBlockModel.find();
    }

    async create(exercise: IExerciseBlock): Promise<IExerciseBlock> {
        return (await ExerciseBlockModel.create(exercise)).toObject();
    }

    async delete(id: string): Promise<void | null> {
        return ExerciseBlockModel.findByIdAndDelete(id);
    }
}
