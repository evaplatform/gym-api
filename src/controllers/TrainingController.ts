import { Request, Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { TrainingRepositoryImpl } from '../repositories/training/TrainingRepositoryImpl';
import { TrainingServiceImpl } from '../services/training/TrainingServiceImpl';
import { ITraining } from '@/models/training/ITraining';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { ExerciseRepositoryImpl } from '@/repositories/exercise/ExerciseRepositoryImpl';

const trainingService = new TrainingServiceImpl(new TrainingRepositoryImpl(), new ExerciseRepositoryImpl);

export class TrainingController {
    @CatchErrors
    @Authenticate
    static async getAll(req: AuthenticatedRequest, res: Response) {
        const exerciseBlocks = await trainingService.getAll(req);
        res.json(exerciseBlocks);
    }

    @CatchErrors
    @Authenticate
    static async create(req: AuthenticatedRequest<ITraining>, res: Response) {
        const training = await trainingService.create(req);
        res.status(HttpStatusCodeEnum.CREATED).json(training);
    }

    @CatchErrors
    @Authenticate
    static async update(req: AuthenticatedRequest<ITraining>, res: Response) {
        const exerciseBlock = await trainingService.update(req);
        res.status(HttpStatusCodeEnum.OK).json(exerciseBlock);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: AuthenticatedRequest, res: Response) {
        await trainingService.delete(req);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'Exercise Block deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: AuthenticatedRequest, res: Response) {
        const exerciseBlock = await trainingService.getById(req);
        res.status(HttpStatusCodeEnum.OK).json(exerciseBlock);
    }
}
