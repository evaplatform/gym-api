import { Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { ExerciseRepositoryImpl } from '../repositories/exercise/ExerciseRepositoryImpl';
import { ExerciseServiceImpl } from '../services/exercise/ExerciseServiceImpl';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IExercise } from '@/models/exercise/IExercise';


const exerciseService = new ExerciseServiceImpl(new ExerciseRepositoryImpl());

export class ExerciseController {
    @CatchErrors
    @Authenticate
    static async getAll(req: AuthenticatedRequest, res: Response) {
        const exercises = await exerciseService.getAll(req);
        return res.json(exercises);
    }

    @CatchErrors
    @Authenticate
    static async create(req: AuthenticatedRequest<IExercise>, res: Response) {
        const exercise = await exerciseService.create(req);
        res.status(HttpStatusCodeEnum.CREATED).json(exercise);
    }

    @CatchErrors
    @Authenticate
    static async update(req: AuthenticatedRequest<IExercise>, res: Response) {
        const exercise = await exerciseService.update(req);
        res.status(HttpStatusCodeEnum.OK).json(exercise);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: AuthenticatedRequest, res: Response) {
        await exerciseService.delete(req);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'Exercise deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: AuthenticatedRequest, res: Response) {
        const exercise = await exerciseService.getById(req);
        res.status(HttpStatusCodeEnum.OK).json(exercise);
    }

    @CatchErrors
    @Authenticate
    static async getAllByUserId(req: AuthenticatedRequest, res: Response) {
        const exercises = await exerciseService.getAllByUserId(req);
        return res.json(exercises);
    }
}
