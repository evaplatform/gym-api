import { Request, Response } from 'express';
import { CatchErrors } from '../shared/decorators/catch-errors';
import { Authenticate } from '../shared/decorators/authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { ExerciseRepositoryImpl } from '../repositories/exercise/ExerciseRepositoryImpl';
import { ExerciseServiceImpl } from '../services/exercise/ExerciseServiceImpl';
import { AcademyRepositoryImpl } from '../repositories/academy/AcademyRepositoryImpl';
import { AppError } from '../errors/AppError';

const exerciseService = new ExerciseServiceImpl(new ExerciseRepositoryImpl(), new AcademyRepositoryImpl());

export class ExerciseController {
    @CatchErrors
    @Authenticate
    static async getAll(req: any, res: Response) {
        // const academyId = req.params?.academyId;
        // const exercises = await exerciseService.getAll(academyId);
        // res.json(exercises);

        if (req.user?.isAdmin) {
            const exercises = await exerciseService.getAll();
            return res.json(exercises);
        }

        if (!req.user?.academyId) {
            throw new AppError('User not associated with any academy', HttpStatusCodeEnum.FORBIDDEN);
        }

        const exercises = await exerciseService.getAll(req.user.academyId);
        return res.json(exercises);
    }

    @CatchErrors
    @Authenticate
    static async create(req: Request, res: Response) {
        const exercise = await exerciseService.create(req.body);
        res.status(HttpStatusCodeEnum.CREATED).json(exercise);
    }

    @CatchErrors
    @Authenticate
    static async update(req: Request, res: Response) {
        const exercise = await exerciseService.update(req.body);
        res.status(HttpStatusCodeEnum.OK).json(exercise);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: Request, res: Response) {
        await exerciseService.delete(req.params.id);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'Exercise deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: Request, res: Response) {
        const exercise = await exerciseService.getById(req.params.id);
        res.status(HttpStatusCodeEnum.OK).json(exercise);
    }
}
