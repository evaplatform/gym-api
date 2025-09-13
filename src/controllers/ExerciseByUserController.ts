import { Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { IExerciseByUser } from '@/models/bodyBuildingByUser/IExerciseByUser';

import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { ExerciseByUserServiceImpl } from '@/services/exerciseByUser/ExerciseByUserServiceImpl';
import { ExerciseByUserRepositoryImpl } from '@/repositories/exerciseByUser/ExerciseByUserRepositoryImpl';


const exerciseByUserService = new ExerciseByUserServiceImpl(new ExerciseByUserRepositoryImpl());

export class ExerciseByUserController {
    @CatchErrors
    @Authenticate
    static async getAll(req: AuthenticatedRequest, res: Response) {
        const bodyBuildingByUser = await exerciseByUserService.getAll(req);
        return res.json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async create(req: AuthenticatedRequest<IExerciseByUser>, res: Response) {
        const bodyBuildingByUser = await exerciseByUserService.create(req);
        res.status(HttpStatusCodeEnum.CREATED).json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async update(req: AuthenticatedRequest<IExerciseByUser>, res: Response) {
        const bodyBuildingByUser = await exerciseByUserService.update(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: AuthenticatedRequest, res: Response) {
        await exerciseByUserService.delete(req);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'exercise by user deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: AuthenticatedRequest, res: Response) {
        const bodyBuildingByUser = await exerciseByUserService.getById(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async getByUserAndExerciseId(req: AuthenticatedRequest, res: Response) {
        const bodyBuildingPlanByUser = await exerciseByUserService.getByUserAndExerciseId(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingPlanByUser);
    }

    @CatchErrors
    @Authenticate
    static async getByUserId(req: AuthenticatedRequest, res: Response) {
        const bodyBuildingByUser = await exerciseByUserService.getByUserId(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingByUser);
    }
}
