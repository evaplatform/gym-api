// src/controllers/UserController.ts
import { Request, Response } from 'express';
import { UserServiceImpl } from '../services/user/UserServiceImpl';
import { UserRepositoryImpl } from '../repositories/user/UserRepositoryImpl';
import { CatchErrors } from '../shared/decorators/CatchErrors';
import { Authenticate } from '../shared/decorators/Authenticate';
import { HttpStatusCodeEnum } from '../shared/enums/HttpStatusCodeEnum';
import { AuthenticatedRequest } from '@/shared/interfaces/AuthenticatedRequest';
import { IUser } from '@/models/user/IUser';

const userService = new UserServiceImpl(new UserRepositoryImpl());
export class UserController {
  @CatchErrors
  @Authenticate
  static async getAll(req: AuthenticatedRequest, res: Response) {
    const users = await userService.getAll(req);
    res.json(users);
  }

  @CatchErrors
  @Authenticate
  static async getById(req: AuthenticatedRequest, res: Response) {
    const user = await userService.getById(req);
    if (user) {
      res.json(user);
    } else {
      res.status(HttpStatusCodeEnum.NOT_FOUND).send('User not found');
    }
  }

  @CatchErrors
  @Authenticate
  static async create(req: AuthenticatedRequest<IUser>, res: Response) {
    const user = await userService.create(req);
    res.status(HttpStatusCodeEnum.CREATED).json(user);
  }

  @CatchErrors
  @Authenticate
  static async update(req: AuthenticatedRequest<IUser>, res: Response) {
    const user = await userService.update(req);
    res.status(HttpStatusCodeEnum.OK).json(user);
  }

  @CatchErrors
  @Authenticate
  static async delete(req: AuthenticatedRequest, res: Response) {
    await userService.delete(req);
    res.status(HttpStatusCodeEnum.OK).json({ message: 'User deleted successfully' });
  }
}
