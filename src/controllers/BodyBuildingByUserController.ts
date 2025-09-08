import {  Response } from 'express-serve-static-core';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { AuthenticatedRequest } from 'interfaces/AuthenticatedRequest';
import { IBodyBuildingByUser } from 'bodyBuildingByUser/IBodyBuildingByUser';
import { BodyBuildingByUserRepositoryImpl } from 'bodyBuildingByUser/BodyBuildingByUserRepositoryImpl';
import { BodyBuildingByUserServiceImpl } from 'bodyBuildingByUser/BodyBuildingByUserServiceImpl';


const bodyBuildingByUserService = new BodyBuildingByUserServiceImpl(new BodyBuildingByUserRepositoryImpl());

export class BodyBuildingByUserController {
    @CatchErrors
    @Authenticate
    static async getAll(req: AuthenticatedRequest<IBodyBuildingByUser[]>, res: Response) {
        const bodyBuildingByUser = await bodyBuildingByUserService.getAllFromUser(req);
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
}
