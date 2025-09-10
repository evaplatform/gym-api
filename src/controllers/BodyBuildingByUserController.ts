import { Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { IBodyBuildingByUser } from '@/models/bodyBuildingByUser/IBodyBuildingByUser';

import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { BodyBuildingByUserServiceImpl } from '@/services/bodyBuildingByUser/BodyBuildingByUserServiceImpl';
import { BodyBuildingByUserRepositoryImpl } from '@/repositories/bodyBuildingByUser/BodyBuildingByUserRepositoryImpl';


const bodyBuildingByUserService = new BodyBuildingByUserServiceImpl(new BodyBuildingByUserRepositoryImpl());

export class BodyBuildingByUserController {
    @CatchErrors
    @Authenticate
    static async getAll(req: AuthenticatedRequest, res: Response) {
        const bodyBuildingByUser = await bodyBuildingByUserService.getAll(req);
        return res.json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async create(req: AuthenticatedRequest<IBodyBuildingByUser>, res: Response) {
        const bodyBuildingByUser = await bodyBuildingByUserService.create(req);
        res.status(HttpStatusCodeEnum.CREATED).json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async update(req: AuthenticatedRequest<IBodyBuildingByUser>, res: Response) {
        const bodyBuildingByUser = await bodyBuildingByUserService.update(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: AuthenticatedRequest, res: Response) {
        await bodyBuildingByUserService.delete(req);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'body building by user deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: AuthenticatedRequest, res: Response) {
        const bodyBuildingByUser = await bodyBuildingByUserService.getById(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async getByUserAndExerciseId(req: AuthenticatedRequest, res: Response) {
        const bodyBuildingPlanByUser = await bodyBuildingByUserService.getByUserAndExerciseId(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingPlanByUser);
    }

    @CatchErrors
    @Authenticate
    static async getByUserId(req: AuthenticatedRequest, res: Response) {
        const bodyBuildingByUser = await bodyBuildingByUserService.getByUserId(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async addPlan(req: AuthenticatedRequest<IBodyBuildingByUser>, res: Response) {
        const bodyBuildingByUser = await bodyBuildingByUserService.addPlan(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async updatePlan(req: AuthenticatedRequest<IBodyBuildingByUser>, res: Response) {
        const bodyBuildingByUser = await bodyBuildingByUserService.updatePlan(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingByUser);
    }

    @CatchErrors
    @Authenticate
    static async removePlan(req: AuthenticatedRequest<IBodyBuildingByUser>, res: Response) {
        const bodyBuildingByUser = await bodyBuildingByUserService.removePlan(req);
        res.status(HttpStatusCodeEnum.OK).json(bodyBuildingByUser);
    }
}
