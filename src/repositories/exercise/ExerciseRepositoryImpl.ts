import { ExerciseByUserModel } from '@/models/exerciseByUser/mongo-schema';
import { IExercise } from '../../models/exercise/IExercise';
import { ExerciseModel } from '../../models/exercise/mongo-schema';
import { IdType } from '../../shared/types/IdType';
import { IExerciseRepository } from './IExerciseRepository';
import { AppError } from '@/errors/AppError';
import { log } from '@/shared/utils/log';
import { UserModel } from '@/models/user/mongo-schema';
import { HttpStatusCodeEnum } from '@/shared/enums/HttpStatusCodeEnum';

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

    async getAllByUserId(userId: IdType, academyId?: IdType): Promise<IExercise[]> {

        if (!academyId) {
            const user = await UserModel.findOne({ _id: userId }).exec();
            if (!user) {
                throw new AppError('User not found', HttpStatusCodeEnum.NOT_FOUND);
            }
            academyId = user.academyId;
        }

        const exercises = await ExerciseModel.find({ academyId }).exec();


        const filter = academyId ? { userId, academyId } : { userId };
        const exercisesByUser = await ExerciseByUserModel.find(filter).exec();

        if (exercisesByUser.length === 0) {
            throw new AppError('Nenhum exercício encontrado para esse usuário', 404);
        }

        const filteredExercises = exercisesByUser.map(exByUser => {
            const exerciseDetails = exercises.find(ex => ex._id.toString() === exByUser.exerciseId.toString());
            return exerciseDetails ? exerciseDetails.toJSON() : null;
        });

        return filteredExercises.filter(exercise => exercise !== null);
    }
}