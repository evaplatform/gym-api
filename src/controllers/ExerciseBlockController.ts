import { Request, Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { ExerciseBlockRepositoryImpl } from '../repositories/exerciseBlock/ExerciseBlockRepositoryImpl';
import { ExerciseBlockServiceImpl } from '../services/exerciseBlock/ExerciseBlockServiceImpl';
import { IExerciseBlock } from '@/models/exerciseBlock/IExerciseBlock';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';

const exerciseBlockService = new ExerciseBlockServiceImpl(new ExerciseBlockRepositoryImpl());

export class ExerciseBlockController {
    @CatchErrors
    @Authenticate
    static async getAll(req: AuthenticatedRequest, res: Response) {
        const exerciseBlocks = await exerciseBlockService.getAll(req);
        res.json(exerciseBlocks);
    }

    @CatchErrors
    @Authenticate
    static async create(req: AuthenticatedRequest<IExerciseBlock>, res: Response) {
        const exerciseBlock = await exerciseBlockService.create(req);
        res.status(HttpStatusCodeEnum.CREATED).json(exerciseBlock);
    }

    @CatchErrors
    @Authenticate
    static async update(req: AuthenticatedRequest<IExerciseBlock>, res: Response) {
        const exerciseBlock = await exerciseBlockService.update(req);
        res.status(HttpStatusCodeEnum.OK).json(exerciseBlock);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: AuthenticatedRequest, res: Response) {
        await exerciseBlockService.delete(req);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'Exercise Block deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: AuthenticatedRequest, res: Response) {
        const exerciseBlock = await exerciseBlockService.getById(req);
        res.status(HttpStatusCodeEnum.OK).json(exerciseBlock);
    }
}
