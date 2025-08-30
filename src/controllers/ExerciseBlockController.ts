import { Request, Response } from 'express';
import { CatchErrors } from '../shared/decorators/catch-errors';
import { Authenticate } from '../shared/decorators/authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { ExerciseBlockRepositoryImpl } from '../repositories/exerciseBlock/ExerciseBlockRepositoryImpl';
import { ExerciseBlockServiceImpl } from '../services/exerciseBlock/ExerciseBlockServiceImpl';

const exerciseBlockService = new ExerciseBlockServiceImpl(new ExerciseBlockRepositoryImpl());

export class ExerciseBlockController {
    @CatchErrors
    @Authenticate
    static async getAll(req: Request, res: Response) {
        const exerciseBlocks = await exerciseBlockService.getAll();
        res.json(exerciseBlocks);
    }

    @CatchErrors
    @Authenticate
    static async create(req: Request, res: Response) {
        const exerciseBlock = await exerciseBlockService.create(req.body);
        res.status(HttpStatusCodeEnum.CREATED).json(exerciseBlock);
    }

    @CatchErrors
    @Authenticate
    static async update(req: Request, res: Response) {
        const exerciseBlock = await exerciseBlockService.update(req.body);
        res.status(HttpStatusCodeEnum.OK).json(exerciseBlock);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: Request, res: Response) {
        await exerciseBlockService.delete(req.params.id);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'Exercise Block deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: Request, res: Response) {
        const exerciseBlock = await exerciseBlockService.getById(req.params.id);
        res.status(HttpStatusCodeEnum.OK).json(exerciseBlock);
    }
}
