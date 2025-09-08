// src/controllers/GroupController.ts
import { Request, Response } from 'express';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { GroupServiceImpl } from '../services/group/GroupServiceImpl';
import { GroupRepositoryImpl } from '../repositories/group/GroupRepositoryImpl';

const groupService = new GroupServiceImpl(new GroupRepositoryImpl());

export class GroupController {
  @CatchErrors
  @Authenticate
  static async getById(req: Request, res: Response) {
    const users = await groupService.getById(req.params.id);
    res.json(users);
  }

  @CatchErrors
  @Authenticate
  static async create(req: Request, res: Response) {
    const users = await groupService.create(req.body);
    res.json(users);
  }
}
