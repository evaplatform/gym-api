// src/controllers/GroupController.ts
import { Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { GroupServiceImpl } from '../services/group/GroupServiceImpl';
import { GroupRepositoryImpl } from '../repositories/group/GroupRepositoryImpl';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IGroup } from '@/models/group/IGroup';
import { HttpStatusCodeEnum } from '@/shared/enums/HttpStatusCodeEnum';

const groupService = new GroupServiceImpl(new GroupRepositoryImpl());
export class GroupController {
    @CatchErrors
    @Authenticate
    static async getAll(req: AuthenticatedRequest, res: Response) {
        const groups = await groupService.getAll(req);
        return res.json(groups);
    }

    @CatchErrors
    @Authenticate
    static async create(req: AuthenticatedRequest<IGroup>, res: Response) {
        const group = await groupService.create(req);
        res.status(HttpStatusCodeEnum.CREATED).json(group);
    }

    @CatchErrors
    @Authenticate
    static async update(req: AuthenticatedRequest<IGroup>, res: Response) {
        const group = await groupService.update(req);
        res.status(HttpStatusCodeEnum.OK).json(group);
    }

    @CatchErrors
    @Authenticate
    static async delete(req: AuthenticatedRequest, res: Response) {
        await groupService.delete(req);
        res.status(HttpStatusCodeEnum.OK).json({ message: 'Group deleted successfully' });
    }

    @CatchErrors
    @Authenticate
    static async getById(req: AuthenticatedRequest, res: Response) {
        const group = await groupService.getById(req);
        res.status(HttpStatusCodeEnum.OK).json(group);
    }

}
