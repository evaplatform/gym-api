// src/repositories/UserRepository.ts
import { IExercise } from '../../models/exercise/IExercise';
import { ExerciseModel } from '../../models/exercise/mongo-schema';
import { IdType } from '../../shared/types/IdType';
import { IExerciseRepository } from './IExerciseRepository';

export class ExerciseRepositoryImpl implements IExerciseRepository {
    async update(id: string, user: Partial<IExercise>): Promise<IExercise | null> {
        return ExerciseModel.findByIdAndUpdate(id, { $set: user }, { new: true });
    }

    async getById(id: string): Promise<IExercise | null> {
        return ExerciseModel.findById(id).lean();
    }

    async getAll(academyId?: IdType): Promise<IExercise[]> {
        const filter = academyId ? { academyId } : {};
        return ExerciseModel.find(filter);
    }

    // como o chat GPT sugeriu:
    // async getAll(academyId?: string, isAdmin = false): Promise<YourEntityType[]> {
    //     // Se for admin e não especificar academyId, retorna todos
    //     if (isAdmin && !academyId) {
    //       return this.model.find().exec();
    //     }
        
    //     // Se não for admin ou especificar academyId, filtra por academyId
    //     return this.model.find({ academyId }).exec();
    //   }
    async create(exercise: IExercise): Promise<IExercise> {
        return (await ExerciseModel.create(exercise)).toObject();
    }

    async delete(id: string): Promise<void | null> {
        return ExerciseModel.findByIdAndDelete(id);
    }
}
