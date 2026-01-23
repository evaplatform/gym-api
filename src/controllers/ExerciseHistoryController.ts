import { Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { ExerciseHistoryServiceImpl } from '@/services/exerciseHistory/exerciseHistoryServiceImpl';
import { ExerciseHistoryRepositoryImpl } from '@/repositories/exerciseHistory/ExerciseHistoryRepositoryImpl';
import { IExerciseHistory } from '@/models/exerciseHistory/IExerciseHistory';


const exerciseHistoryService = new ExerciseHistoryServiceImpl(new ExerciseHistoryRepositoryImpl());

export class ExerciseHistoryController {
    @CatchErrors
    @Authenticate
    static async getAll(req: AuthenticatedRequest, res: Response) {
        const exercises = await exerciseHistoryService.getAll(req);
        return res.json(exercises);
    }

    @CatchErrors
    @Authenticate
    static async create(req: AuthenticatedRequest<IExerciseHistory>, res: Response) {
        const exercise = await exerciseHistoryService.create(req);
        res.status(HttpStatusCodeEnum.CREATED).json(exercise);
    }

    @CatchErrors
    @Authenticate
    static async update(req: AuthenticatedRequest<IExerciseHistory>, res: Response) {
        const exercise = await exerciseHistoryService.update(req);
        res.status(HttpStatusCodeEnum.OK).json(exercise);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: AuthenticatedRequest, res: Response) {
        await exerciseHistoryService.delete(req);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'Exercise history deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: AuthenticatedRequest, res: Response) {
        const exercise = await exerciseHistoryService.getById(req);
        res.status(HttpStatusCodeEnum.OK).json(exercise);
    }

    @CatchErrors
    @Authenticate
    static async getAllByUser(req: AuthenticatedRequest, res: Response) {
        const exercises = await exerciseHistoryService.getAllByUser(req);
        res.status(HttpStatusCodeEnum.OK).json(exercises);
    }

}
