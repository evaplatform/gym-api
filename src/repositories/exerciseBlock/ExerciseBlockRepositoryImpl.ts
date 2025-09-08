import { IdType } from '@/shared/types/IdType';
import { IExerciseBlock } from '../../models/exerciseBlock/IExerciseBlock';
import { ExerciseBlockModel } from '../../models/exerciseBlock/mongo-schema';
import { IExerciseBlockRepository } from './IExerciseBlockRepository';

export class ExerciseBlockRepositoryImpl implements IExerciseBlockRepository {
    async update(id: IdType, exercise: Partial<IExerciseBlock>): Promise<IExerciseBlock | null> {
        const updated = await ExerciseBlockModel.findByIdAndUpdate(
            id,
            { $set: exercise },
            { new: true }
        ).exec();

        return updated ? updated.toJSON() : null;
    }

    async getById(id: IdType, academyId?: IdType): Promise<IExerciseBlock | null> {
        const filter = academyId ? { _id: id, academyId } : { _id: id };
        const exercise = await ExerciseBlockModel.findOne(filter).exec();

        return exercise ? exercise.toJSON() : null;
    }

    async getAll(academyId?: IdType): Promise<IExerciseBlock[]> {
        const filter = academyId ? { academyId } : {};
        const exercises = await ExerciseBlockModel.find(filter).exec();

        return exercises.map(exercise => exercise.toJSON());
    }

    async create(exercise: IExerciseBlock): Promise<IExerciseBlock> {
        const created = await ExerciseBlockModel.create(exercise);
        return created.toJSON();
    }

    async delete(id: IdType): Promise<void | null> {
        await ExerciseBlockModel.findByIdAndDelete(id);
    }
}