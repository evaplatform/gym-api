import { Request, Response } from 'express';
import { CatchErrors } from '../shared/decorators/catch-errors';
import { Authenticate } from '../shared/decorators/authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { ExerciseRepositoryImpl } from '../repositories/exercise/ExerciseRepositoryImpl';
import { ExerciseServiceImpl } from '../services/exercise/ExerciseServiceImpl';

const exerciseService = new ExerciseServiceImpl(new ExerciseRepositoryImpl());

export class ExerciseController {
    @CatchErrors
    @Authenticate
    static async getAll(req: Request, res: Response) {
        const users = await exerciseService.getAll();
        res.json(users);
    }

    @CatchErrors
    static async create(req: Request, res: Response) {
        const user = await exerciseService.create(req.body);
        res.status(HttpStatusCodeEnum.CREATED).json(user);
    }

    @CatchErrors
    @Authenticate
    static async update(req: Request, res: Response) {
        const user = await exerciseService.update(req.body);
        res.status(HttpStatusCodeEnum.OK).json(user);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: Request, res: Response) {
        await exerciseService.delete(req.params.id);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'User deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: Request, res: Response) {
        const user = await exerciseService.getById(req.params.id);
        res.status(HttpStatusCodeEnum.OK).json(user);
    }
}
